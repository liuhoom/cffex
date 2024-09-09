const xml2js = require('xml2js');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const axiosRetry = require('axios-retry');

// axiosRetry(axios, { retries: 3 });

const base_url = 'http://www.cffex.com.cn/sj/ccpm/';
const startDate = new Date(2024, 3, 24);
const endDate = new Date(); // 注意这里是4月，因为 JavaScript 中月份是从0开始的
let currentDate = new Date(startDate);

// 今天数据startDate和endDate都是 Date()即可;
// 如果历史数据,就修改Date(2024, 2, 1) 2024-3-1号即可;

const product = ['IH', 'IF', 'IC', 'IM'];
axios.defaults.timeout = 60 * 1000;

const parseData = (xmlString) => {
  // http://www.cffex.com.cn/sj/ccpm/202405/09/IF.xml?id=51
  // 0: 成交量排名;
  // 1: 多单排名;
  // 2: 空单排名;
  let dataObj = {}; // 存储计算后的和数据
  xml2js.parseString(xmlString, (err, result) => {
    if (err) throw err;

    const data = result.positionRank.data;

    let dataList = []; // 数据object,分券商存储

    data.forEach((element) => {
      const datatypeid = parseInt(element.datatypeid[0]);

      if (datatypeid === 0) {
        return;
      }

      const instrumentid = element.instrumentid[0];
      const varvolume = parseInt(element.varvolume[0]);
      const volume = parseInt(element.volume[0]);

      if (!(instrumentid in dataObj)) {
        dataObj[instrumentid] = {};
        dataObj[instrumentid][1] = {};
        dataObj[instrumentid][2] = {};
        dataObj[instrumentid][1]['v'] = 0;
        dataObj[instrumentid][2]['v'] = 0;
        dataObj[instrumentid][1]['vchg'] = 0;
        dataObj[instrumentid][2]['vchg'] = 0;
      }

      dataObj[instrumentid][datatypeid]['vchg'] += varvolume;
      dataObj[instrumentid][datatypeid]['v'] += volume;
    });
  });
  return dataObj;
};

const dbPut = async (dataList) => {
  const dbcreate = async () => {
    const result = await prisma.ccpm.createMany({
      data: dataList,
    });
  };

  dbcreate()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect);
};

const formatFun = (curDate, productid, dataObj) => {
  let dataList = [];

  for (let ins in dataObj) {
    if (dataObj.hasOwnProperty(ins)) {
      let dataTypes = dataObj[ins];

      for (let datatype in dataTypes) {
        if (dataTypes.hasOwnProperty(datatype)) {
          let values = dataTypes[datatype];
          let dataItem = {
            tradingday: curDate,
            productid,
            instrumentid: ins,
            datatypeid: parseInt(datatype),
            volume: values.v,
            varvolume: values.vchg,
          };
          dataList.push(dataItem);
        }
      }
    }
  }

  return dataList;
};

while (currentDate <= endDate) {
  // 判断当前日期是否为周六或周日
  if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
    const requestDate = new Date(currentDate);

    // 构建日期对应的 URL

    product.forEach((element) => {
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');

      const url = base_url + year + month + '/' + day + '/' + element + '.xml';

      console.log(url);

      // 发送 HTTP 请求并获取响应
      axios
        .get(url, {
          headers: {
            Accept: 'text/plain, */*; q=0.01',
            'Accept-Language':
              'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            Referer: 'http://www.cffex.com.cn/ccpm/',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
            'X-Requested-With': 'XMLHttpRequest',
          },
          timeout: 60000,
        })
        .then((response) => {
          if (response.status === 200) {
            // parseData(response.data);
            const resData = formatFun(
              requestDate,
              element,
              parseData(response.data)
            );
            dbPut(resData);
          } else {
            console.log(`${url} is not 200`);
          }
        })
        .catch((error) => {
          console.error('请求失败：', url, error);
        });
    });
  }

  // 日期加一天
  currentDate.setDate(currentDate.getDate() + 1);
}

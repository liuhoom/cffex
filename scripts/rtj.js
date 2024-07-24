const xml2js = require("xml2js");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

const base_url = "http://www.cffex.com.cn/sj/hqsj/rtj/";
const startDate = new Date(); // 注意这里是1月，因为 JavaScript 中月份是从0开始的
const endDate = new Date();
let currentDate = new Date(startDate);

// 今天数据startDate和endDate都是 Date()即可;
// 如果历史数据,就修改Date(2024, 2, 1) 2024-3-1号即可;

const product = ["IH", "IF", "IC", "IM"];
axios.defaults.timeout = 30000;

const parseData = (xmlString) => {
  xml2js.parseString(xmlString, (err, result) => {
    if (err) throw err;

    const data = result.dailydatas.dailydata;

    dailyList = []; // 数据object
    productids = []; // instrumentid的集合,方便做下月/当月/下季等

    data.forEach((element) => {
      const productid = element.productid[0];
      if (product.includes(productid)) {
        const instrumentid = element.instrumentid[0];

        productids[productid] ??= [];
        productids[productid].push(instrumentid);
      }
    });

    data.forEach((element) => {
      const tradingday = element.tradingday[0];
      const productid = element.productid[0];
      const instrumentid = element.instrumentid[0];

      const openprice = parseFloat(element.openprice[0]);
      const closeprice = parseFloat(element.closeprice[0]);
      const highestprice = parseFloat(element.highestprice[0]);
      const lowestprice = parseFloat(element.lowestprice[0]);

      const openinterest = parseInt(element.openinterest[0]); // 持仓量
      const volume = parseInt(element.volume[0]); // 成交量

      if (product.includes(productid)) {
        dailyList.push({
          tradingday: new Date(
            parseInt(tradingday.substring(0, 4)),
            parseInt(tradingday.substring(4, 6)) - 1,
            parseInt(tradingday.substring(6, 8)),
            8,
            0,
            0
          ),
          productid: productid,
          instrumentid: instrumentid,
          season4: productids[productid].indexOf(instrumentid),

          openprice: openprice,
          closeprice: closeprice,
          highestprice: highestprice,
          lowestprice: lowestprice,
          openinterest: openinterest,
          volume: volume,
        });

        // console.log(
        //   tradingday,
        //   productid,
        //   instrumentid,
        //   openprice,
        //   highestprice,
        //   lowestprice,
        //   closeprice,
        //   openinterest,
        //   volume
        // );
      }
    });
  });

  // 多条一起插入,使用createMany方法  data: dataList
  const dbcreate = async () => {
    const result = await prisma.rtj.createMany({
      data: dailyList,
    });
  };

  dbcreate()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect);
  console.log(dailyList.length);
};

while (currentDate <= endDate) {
  // 判断当前日期是否为周六或周日
  if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
    // 构建日期对应的 URL
    const url =
      base_url +
      currentDate.getFullYear() +
      (currentDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      currentDate.getDate().toString().padStart(2, "0") +
      "/index.xml";

    // 发送 HTTP 请求并获取响应
    axios
      .get(url, {
        headers: {
          Accept: "text/plain, */*; q=0.01",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          Connection: "keep-alive",
          Referer: "http://www.cffex.com.cn/ccpm/",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/539.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          parseData(response.data);
        } else {
          console.log(response.status);
          console.log(`${url} is not 200`);
        }
      })
      .catch((error) => {
        console.error("请求失败：", error);
      });

    console.log(url);
  }

  // 日期加一天
  currentDate.setDate(currentDate.getDate() + 1);
}

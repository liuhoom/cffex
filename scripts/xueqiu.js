const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

// 创建一个新的 CookieJar 实例
const cookieJar = new CookieJar();
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));

// need to change: to IH\IF\IC\IM
symbolList = ['SH000016', 'SH000300', 'SH000905', 'SH000852'];

const startDate = Date.now(); // 当前时间的时间戳
const count = -285; // kline的个数, -1就是当天数据; 历史数据-360, 360天的数据;

const parseData = (elem, jsonData) => {
  data = jsonData.data.item;

  dataList = []; // 数据object

  if (elem === 'SH000016') {
    elemSymbol = 'IH';
  }
  if (elem === 'SH000300') {
    elemSymbol = 'IF';
  }
  if (elem === 'SH000905') {
    elemSymbol = 'IC';
  }
  if (elem === 'SH000852') {
    elemSymbol = 'IM';
  }

  data.forEach((element) => {
    const timestamp = parseInt(element[0]);
    const volume = parseInt(element[1]);
    const open = parseFloat(element[2]);
    const high = parseFloat(element[3]);
    const low = parseFloat(element[4]);
    const close = parseFloat(element[5]);
    const chg = parseFloat(element[6]);

    dataList.push({
      tradingday: new Date(timestamp + 8 * 3600 * 1000),
      instrumentid: elemSymbol,
      volume: volume,
      open: open,
      high: high,
      low: low,
      close: close,
      chg: chg,
    });
  });

  const dbcreate = async () => {
    const result = await prisma.ind.createMany({
      data: dataList,
    });
  };

  dbcreate()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect);

  // console.log(dataList);
};

async function loginToXueqiu() {
  try {
    const response = await client.get('https://xueqiu.com');
    const cookies = await cookieJar.getCookies('https://xueqiu.com');
  } catch (error) {
    console.error('登录失败:', error.message);
  }
}

async function fetchStockData() {
  await loginToXueqiu();

  symbolList.forEach((element) => {
    const url = `https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=${element}&begin=${startDate}&period=day&type=before&count=${count}&indicator=kline`;

    client
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          parseData(element, response.data);
        } else {
          console.log(`${url} is not 200`);
        }
      })
      .catch((error) => {
        console.error('请求失败：', error);
      });
  });
}

fetchStockData();

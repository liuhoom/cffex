const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

symbolList = ["SH000016", "SH000300", "SH000905", "SH000852"];

const startDate = Date.now(); // 当前时间的时间戳
const count = -1; // kline的个数, -1就是当天数据; 历史数据-360, 360天的数据;

const parseData = (elem, jsonData) => {
  data = jsonData.data.item;

  dataList = []; // 数据object

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
      instrumentid: elem,
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

  console.log(dataList);
};

symbolList.forEach((element) => {
  const url = `https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=${element}&begin=${startDate}&period=day&type=before&count=${count}&indicator=kline`;
  axios
    .get(url, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7",
        cookie:
          "cookiesu=191706674557162; device_id=f2b80b50a2cd48eb1c80cc90950f30f3; u=191706674557162; Hm_lvt_1db88642e346389874251b5a1eded6e3=1718094085; xq_a_token=64274d77bec17c39d7ef1934b7a3588572463436; xqat=64274d77bec17c39d7ef1934b7a3588572463436; xq_r_token=3f3592acdffbaaee3a7ea110c5d151d2710b7318; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTcyMjczMjcyOCwiY3RtIjoxNzIwNDkzMzc3NTYzLCJjaWQiOiJkOWQwbjRBWnVwIn0.oJd0Q1vUrnRr-cTTBHZkbScqUYqsxybEfDQa2pGcx184ZmGvKrKA-r938qnmNGvCohOmc6CTUhLGWdcbDESO8hmwsmFx_6HUEHvE7bvXLAvMmd_I_pm-a1tHPzYWYSNfvz1KANxdX5zrWLkF7iabqK8iPw8_MOar0_dghDdwJTWxjyS-f0NRpkIsBeBZK6G6sclIi6KtxotcB98otKhqRouHP4nlkUh-7PrU8-EXl-Tmj6ZD_3QX7vdoZMNcup8n8jvd05tBSlAVpT7-GtKDB_chox_mKNkC5sZeKPtllJWR7FYYmhM6a4p6ANUIzhRDgaRBLU_dmVdcMF_bfYlMww; is_overseas=0; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1720493386; HMACCOUNT=080F4A32445306D4",
        origin: "https://xueqiu.com",
        priority: "u=1, i",
        referer: "https://xueqiu.com/S/SH000300",
        "sec-ch-ua":
          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        parseData(element, response.data);
      } else {
        console.log(`${url} is not 200`);
      }
    })
    .catch((error) => {
      console.error("请求失败：", url);
    });
});

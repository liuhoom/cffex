const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// need to change: to IH\IF\IC\IM
symbolList = ['SH000016', 'SH000300', 'SH000905', 'SH000852'];

const startDate = Date.now(); // 当前时间的时间戳
const count = -200; // kline的个数, -1就是当天数据; 历史数据-360, 360天的数据;

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
        accept: 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7',
        cookie:
          'cookiesu=931693891931098; device_id=f176a1555fce22965bcf6f371890731a; s=ai15jxw1z0; u=931693891931098; HMACCOUNT=FAB9216CB113FA28; xq_a_token=aeb5755652c41b7828c9412ee90b26e08840b0c8; xqat=aeb5755652c41b7828c9412ee90b26e08840b0c8; xq_r_token=9ee9347bb54fea0445403de921297a01af9f4646; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTcyNDAyODc2OCwiY3RtIjoxNzIyNDk4OTY5NzI1LCJjaWQiOiJkOWQwbjRBWnVwIn0.G7dta1IqQXuE0Iz45LxYW6OfWvxWpKxDpkv9kKWP0tQrCh_ubDYHG9Omu1qBKUBlXJSYAzmGbu-Y-0zzkJR7Z7zGL5PFIEgxtet5y_RcHsSHlgrTq4foQ6b89qNS04CdstV4sjehh-ACGPrmYgqYnCAIk_u1sqhZAOd_f9sJM2skNYNTzYQV3p1W_hS3nzuH1BI88sUexwwbxVVMPKOJFOw_7q3DFydlsk5g3jWonAY0_zkzemz59TD9b323GZJiUPuc6c79sJBWflBpx0cDcjKBkM_5uSXJfXmNJyDazI9C4kEcJyjNlVu0BBXc9xC0eFajLNYAZOZZAmwX6_PUXw; acw_tc=0bd17c0617224990019815462e8eb303ef6b772633f74a8caad1e617a4c961; Hm_lvt_1db88642e346389874251b5a1eded6e3=1720493368,1722499002; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1722499002; ssxmod_itna=QqfhGKYKBIxGhmDzxmxB+ubpQ3ZDmqAT+w5x55DsoADSxGKidDqxBmmlxDttaIeGiia0xbB6GY4aYazipqAamDB3DEx06xk9oxii9DCeDIDWeDiDG4Gm04GtDpxG=DjCU1CgExYPGWUqGCFx0ClZ5D7xyOhxYDhxDC07PDw=A8tDDztjEqGBaYVxDrFxYCTS9DhIi4vxG1q40HeDLqvZ7juSG1hISfZEb7DlF0DCIC399mFAKzucHPNZhe/irHrguDD7T4qA=POXDYbj0xej04WQi45m+NTBDDigwM4D; ssxmod_itna2=QqfhGKYKBIxGhmDzxmxB+ubpQ3ZDmqAT+w5x5ikEtDlp4QId08D+gYD=',
        origin: 'https://xueqiu.com',
        priority: 'u=1, i',
        referer: 'https://xueqiu.com/S/SH000300',
        'sec-ch-ua':
          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
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
      console.error('请求失败：', url);
    });
});

1. 上证50收盘数据: 
  curl 'https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=SH000016&begin=1717749601214&period=day&type=before&count=-284&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7' \
  -H 'cookie: cookiesu=931693891931098; device_id=f176a1555fce22965bcf6f371890731a; s=ai15jxw1z0; xq_a_token=0518d12486f7876b2f98097d9ec9214afa97c2a0; xqat=0518d12486f7876b2f98097d9ec9214afa97c2a0; xq_r_token=fc7d679707be09bbf6da361632fe9a5facb99f94; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTcyMDE0MDcyMCwiY3RtIjoxNzE3NjQ5NjE1NzA2LCJjaWQiOiJkOWQwbjRBWnVwIn0.lefReMqvqOwo-XqLQgMhTrG2-4ONquNi_BSF6cO6C_HdHDZxIJ5R5HeAamd7Nnymdo4FYzrQgtXgjgs_N2RJCW02Ik8yZlVB4rpYXvkC5gCPbq-P7JRpqRyRzIUJ3FGwWb5GVxMAiElbd8Kjs3h8X2LL6DeM8RqTax7gmx-9eVUs8qvlZ6yi-2-HISY_ONtOQPd4bf5EnS6JorZTeOv0l1wNaqBEjlx60ncAZRtMT_k3jdBWV0Nam3N8TD024kufxP5aFlYnr0eXmcG_O34GvBnT0TVWjGmbbI9wGIWTgnUUc9-gzesQjD1V4-5GpDySXiJRZtkbM0pbFJIrbcVAag; u=931693891931098; Hm_lvt_1db88642e346389874251b5a1eded6e3=1715754225,1717649665; is_overseas=0; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1717663193' \
  -H 'origin: https://xueqiu.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://xueqiu.com/S/SH000016' \
  -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'


grafana:
净仓位语句:
select tradingday, productid, sum(volume) from ccpm group by tradingday,productid order by tradingday

SELECT
  tradingday AS 'time',
  instrumentid AS 'metric',
  SUM(
    CASE
      WHEN datatypeid = 1 THEN volume
      ELSE 0
    END
  ) - SUM(
    CASE
      WHEN datatypeid = 2 THEN volume
      ELSE 0
    END
  ) AS 'value'
FROM
  ccpm
WHERE
  datatypeid IN (1, 2)
  AND productid = "$productid"
  AND tradingday >=  DATE_SUB(NOW(), INTERVAL 60 DAY)
GROUP BY
  tradingday,
  instrumentid
ORDER BY
  tradingday


SELECT 
    t1.tradingday AS 'time', 
    t1.productid AS 'metric', 
    t1.value AS 'value',
    COALESCE(t2.value, 0) - t1.value AS 'value_chg'
FROM 
    (SELECT 
        tradingday, 
        productid, 
        SUM(CASE WHEN datatypeid = 1 THEN volume ELSE 0 END) - 
        SUM(CASE WHEN datatypeid = 2 THEN volume ELSE 0 END) AS value
     FROM ccpm 
     WHERE datatypeid IN (1, 2)
     GROUP BY tradingday, productid) t1
LEFT JOIN 
    (SELECT 
        tradingday, 
        productid, 
        SUM(CASE WHEN datatypeid = 1 THEN volume ELSE 0 END) - 
        SUM(CASE WHEN datatypeid = 2 THEN volume ELSE 0 END) AS value
     FROM ccpm 
     WHERE datatypeid IN (1, 2)
     GROUP BY tradingday, productid) t2
ON t1.productid = t2.productid AND t2.tradingday = DATE_SUB(t1.tradingday, INTERVAL 1 DAY)
ORDER BY t1.tradingday;


WITH PreviousDays AS (
    SELECT
        tradingday,
        productid,
        LAG(tradingday) OVER (PARTITION BY productid ORDER BY tradingday) AS prev_tradingday
    FROM ccpm
    WHERE datatypeid IN (1, 2)
    GROUP BY tradingday, productid
),
AggregatedValues AS (
    SELECT
        tradingday,
        productid,
        SUM(CASE WHEN datatypeid = 1 THEN volume ELSE 0 END) - 
        SUM(CASE WHEN datatypeid = 2 THEN volume ELSE 0 END) AS value
    FROM ccpm
    WHERE datatypeid IN (1, 2)
    GROUP BY tradingday, productid
)
SELECT 
    a.tradingday AS 'time', 
    a.productid AS 'metric', 
    a.value AS 'value',
    COALESCE(b.value, 0) - a.value AS 'value_change'
FROM 
    AggregatedValues a
LEFT JOIN 
    (SELECT 
        tradingday,
        productid,
        value
     FROM AggregatedValues) b
ON a.productid = b.productid AND a.tradingday = (SELECT prev_tradingday FROM PreviousDays WHERE tradingday = a.tradingday AND productid = a.productid)
ORDER BY a.tradingday;



## 问题1
>>> SyntaxError: Unexpected token 'export'

解决: 在next.config.js配置里面添加[ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table", ]


## 问题2
>>> 连表查询
https://geek-docs.com/mysql/mysql-ask-answer/842_mysql_left_joins_and_aggregation_in_a_single_prisma_query.html


## 产品涨什么样子
header;
上侧是四个产品
左侧是基差/ccpm/大盘信息等;
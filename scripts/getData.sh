#!/bin/bash
cd  /data/workspace/cffex/scripts;
now=`date +%F`

echo "ccpm ${now}\n" >> logs/ccpm.log
/data/soft/node-v20.14.0-linux-x64/bin/node ccpm.js >> logs/ccpm.log 2>&1

echo "rtj ${now}\n" >> logs/rtj.log
/data/soft/node-v20.14.0-linux-x64/bin/node rtj.js >> logs/rtj.log 2>&1

echo "xueqiu ${now}\n" >> logs/ind.log
/data/soft/node-v20.14.0-linux-x64/bin/node xueqiu.js >> logs/ind.log 2>&1

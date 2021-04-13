#Vue2.6.12源码学习

## 目录

## 入口
入口文件，由打包命令`"dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev"`得到，
即`scripts/config.js`中对应环境变量`ARGET:web-full-dev`对应的文件。

### src/platforms/web/entry-runtime-with-compiler.js

1. 重写了Vue中的$mount方法

### 批量下载购买的TG账号、批量提取重命名

data.json存放购买的链接

运行 npm i 下载依赖

运行 node index.js 自动下载

下载完手动把zip文件复制在ZIP文件夹

然后运行 node extractZip.js

会把解压好的文件以 "0001 原文件名" 的方式放入output中

最大支持1000条，也可以在代码中修改


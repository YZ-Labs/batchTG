const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// 定义输入和输出目录
const inputDir = path.join(__dirname, 'ZIP');
const outputDir = path.join(__dirname, 'output');

// 创建输出目录（如果不存在）
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// 获取 ZIP 文件列表
const files = fs.readdirSync(inputDir).filter(file => path.extname(file) === '.zip');

let index = 1; // 起始序号

files.forEach(file => {
    // 构建完整的文件路径
    const zipFilePath = path.join(inputDir, file);
    const zip = new AdmZip(zipFilePath);

    // 解压到一个临时目录
    const tempDir = path.join(outputDir, `temp_${index}`);
    fs.mkdirSync(tempDir, { recursive: true });

    // 解压 ZIP 文件到临时目录
    zip.extractAllTo(tempDir, true);

    // 重命名临时目录
    const newDirName = path.join(outputDir, `${String(index).padStart(4, '0')} ${path.basename(file, '.zip')}`);
    fs.renameSync(tempDir, newDirName);

    // 更新序号
    index += 1;
});

console.log('解压和重命名完成');

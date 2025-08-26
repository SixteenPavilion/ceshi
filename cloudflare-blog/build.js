const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 创建dist目录
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// 复制必要的文件
const filesToCopy = ['index.html', 'styles.css', '404.html', 'index.js'];
filesToCopy.forEach(file => {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(distDir, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`已复制 ${file} 到 dist 目录`);
    }
});

// 复制images目录
const imagesSrc = path.join(__dirname, 'images');
const imagesDest = path.join(distDir, 'images');
if (fs.existsSync(imagesSrc)) {
    if (!fs.existsSync(imagesDest)) {
        fs.mkdirSync(imagesDest, { recursive: true });
    }
    
    // 获取images目录下的所有文件
    const imageFiles = fs.readdirSync(imagesSrc);
    imageFiles.forEach(file => {
        const srcPath = path.join(imagesSrc, file);
        const destPath = path.join(imagesDest, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`已复制 images/${file} 到 dist/images 目录`);
    });
}

console.log('构建完成！请将dist目录部署到Cloudflare Pages。');
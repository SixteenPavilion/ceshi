const fs = require('fs');
const path = require('path');

console.log('生成Cloudflare Pages静态部署文件...');

// 创建dist目录
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('已创建dist目录');
}

// 简化版index.js（不包含Worker功能，仅作为静态页面）
const simpleIndexJs = `// 静态版本的index.js
// 此文件仅作为占位符，Cloudflare Pages将主要提供静态HTML文件
console.log('Blog is running!');`;

// 复制必要的文件
const filesToCopy = ['index.html', 'styles.css', '404.html'];
filesToCopy.forEach(file => {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(distDir, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`已复制 ${file} 到dist目录`);
    }
});

// 写入简化版index.js
fs.writeFileSync(path.join(distDir, 'index.js'), simpleIndexJs);
console.log('已写入简化版index.js到dist目录');

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

console.log('\n静态部署文件已准备就绪！');
console.log('\n下一步操作：');
console.log('1. 访问 https://dash.cloudflare.com/ 并登录您的Cloudflare账户');
console.log('2. 导航到 "Pages" 部分');
console.log('3. 点击 "Create a project"');
console.log('4. 选择 "Direct upload" 选项');
console.log('5. 为您的项目命名（例如：cloudflare-blog）');
console.log('6. 点击 "Upload assets" 按钮');
console.log('7. 上传整个dist目录的内容（或直接拖放dist文件夹）');
console.log('8. 点击 "Deploy site" 按钮完成部署');
console.log('\n通过这种方法，您可以绕过wrangler CLI的配置问题，直接将静态网站部署到Cloudflare Pages。');
console.log('部署成功后，您将获得一个Cloudflare提供的域名，可以通过它访问您的博客。');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('使用Cloudflare API直接部署项目...');

// 检查是否安装了cloudflare npm包
try {
    require('cloudflare');
    console.log('已检测到cloudflare包');
} catch (error) {
    console.log('未检测到cloudflare包，正在安装...');
    execSync('npm install cloudflare', { stdio: 'inherit' });
}

// 提示用户输入Cloudflare API令牌
console.log('\n请按照提示输入您的Cloudflare API令牌和账户信息。');
console.log('注意：请确保您的API令牌具有Pages编辑权限。');
console.log('您可以在Cloudflare仪表板上生成API令牌：https://dash.cloudflare.com/profile/api-tokens');
console.log('\n请在下方文件中填写您的Cloudflare信息：');
console.log(path.join(__dirname, 'cloudflare_credentials.json'));

// 创建示例凭证文件
const credentialsFilePath = path.join(__dirname, 'cloudflare_credentials.json');
if (!fs.existsSync(credentialsFilePath)) {
    const sampleCredentials = {
        "apiToken": "您的Cloudflare API令牌",
        "accountId": "您的Cloudflare账户ID",
        "projectName": "cloudflare-blog",
        "productionBranch": "main"
    };
    fs.writeFileSync(credentialsFilePath, JSON.stringify(sampleCredentials, null, 2));
    console.log('已创建示例凭证文件，请填写您的实际信息后重新运行此脚本。');
}

console.log('\n创建了直接使用Cloudflare API的部署脚本。\n下一步：\n1. 打开cloudflare_credentials.json文件并填写您的Cloudflare API令牌和账户信息\n2. 运行以下命令进行部署：node deploy_cloudflare_api.js\n\n如果您仍然希望使用wrangler CLI，可以尝试以下简化命令：\nnpx wrangler deploy index.js --assets=./ --name=cloudflare-blog --compatibility-date=2025-08-26\n');
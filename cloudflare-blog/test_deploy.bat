@echo off

REM 测试极简Cloudflare Worker部署脚本

REM 确保Node.js已安装
where node >nul 2>nul
if %errorlevel% neq 0 (
echo 错误：未找到Node.js。请先安装Node.js。
pause
exit /b 1
)

REM 确保npm已安装
where npm >nul 2>nul
if %errorlevel% neq 0 (
echo 错误：未找到npm。请先安装Node.js和npm。
pause
exit /b 1
)

REM 尝试部署极简Worker脚本
npx wrangler deploy minimal-worker.js --name=cloudflare-test-worker --compatibility-date=2025-08-26 --verbose

REM 检查部署是否成功
if %errorlevel% neq 0 (
echo 错误：极简Worker部署失败。这表明可能存在环境或配置问题。
echo 建议检查以下几点：
echo 1. 确保您已登录Cloudflare：npx wrangler login
 echo 2. 检查您的Cloudflare账户是否有Worker部署权限
 echo 3. 查看详细错误信息以获取更多线索
) else (
echo 成功：极简Worker部署成功！这表明基本部署功能正常。
echo 问题可能出在原始脚本或资源配置上。
echo 建议：
echo 1. 检查index.js中是否有语法错误或不兼容的代码
 echo 2. 尝试简化原始脚本，逐步添加功能进行测试
)

pause
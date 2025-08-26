@echo off

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

REM 安装依赖
npm install
if %errorlevel% neq 0 (
echo 错误：npm依赖安装失败。
pause
exit /b 1
)

REM 运行构建脚本
npm run build
if %errorlevel% neq 0 (
echo 错误：构建失败。
pause
exit /b 1
)

REM 检查dist目录是否存在
if not exist dist (
echo 警告：dist目录不存在，正在创建...
mkdir dist
)

REM 直接执行wrangler部署命令，指定所有必要参数
npx wrangler deploy index.js --assets=./ --name=cloudflare-blog --compatibility-date=2025-08-26 --verbose

REM 检查部署是否成功
if %errorlevel% neq 0 (
echo 错误：部署失败。请检查错误信息并尝试修复问题。
echo 您可以尝试手动运行以下命令：
echo npx wrangler deploy index.js --assets=./ --name=cloudflare-blog --compatibility-date=2025-08-26 --verbose
) else (
echo 部署成功！
)

pause
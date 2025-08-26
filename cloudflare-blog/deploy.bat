@echo off

REM 直接执行完整的部署命令，明确指定入口点和资源目录
npx wrangler deploy index.js --assets=./

pause
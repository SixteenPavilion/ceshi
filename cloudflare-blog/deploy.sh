#!/bin/bash

# 确保脚本有执行权限
# chmod +x deploy.sh

# 直接执行完整的部署命令，明确指定入口点和资源目录
npx wrangler deploy index.js --assets=./
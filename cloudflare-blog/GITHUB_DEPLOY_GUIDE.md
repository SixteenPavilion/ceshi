# GitHub到Cloudflare Pages自动部署指南

本指南将帮助您设置GitHub与Cloudflare Pages的自动部署，实现代码推送到GitHub后自动部署到Cloudflare Pages。

## 前提条件

1. 已有GitHub账号和项目仓库
2. 已有Cloudflare账号
3. 已在本地安装Git和Node.js

## 步骤1：配置项目

确保您的项目包含以下文件：
- `.github/workflows/deploy.yml`（已自动创建）：GitHub Actions工作流配置
- `package.json`：包含`build`脚本（已存在）
- `build.js`：构建脚本（已修复）

## 步骤2：创建Cloudflare API Token

1. 登录您的[Cloudflare账户](https://dash.cloudflare.com/)
2. 点击右上角头像，选择"My Profile"
3. 点击左侧"API Tokens"选项卡
4. 点击"Create Token"按钮
5. 选择"Create Custom Token"选项
6. 输入Token名称（例如：`GitHub Actions Pages Deployment`）
7. 设置以下权限：
   - Account -> Cloudflare Pages -> Edit
   - Account -> Account Settings -> Read
8. 点击"Continue to Summary"，然后点击"Create Token"
9. **复制生成的API Token并妥善保存**（关闭后无法再次查看）

## 步骤3：获取Cloudflare Account ID

1. 在Cloudflare仪表板中，点击左侧菜单的"Account"
2. 在右侧页面的右下角，您将看到"Account ID"，点击旁边的复制按钮

## 步骤4：在GitHub仓库中配置密钥

1. 访问您的GitHub项目仓库
2. 点击"Settings"选项卡
3. 在左侧菜单中，点击"Secrets and variables" -> "Actions"
4. 点击"New repository secret"
5. 创建两个密钥：
   - **名称**: `CLOUDFLARE_API_TOKEN`，**值**: 粘贴步骤2中复制的API Token
   - **名称**: `CLOUDFLARE_ACCOUNT_ID`，**值**: 粘贴步骤3中复制的Account ID

## 步骤5：在Cloudflare Pages中创建项目

1. 登录您的Cloudflare账户
2. 点击左侧菜单的"Pages"
3. 点击"Create a project"
4. 选择"Connect to Git"
5. 选择"GitHub"作为Git提供商
6. 授予Cloudflare访问您GitHub仓库的权限
7. 选择您的项目仓库
8. 在"Set up builds and deployments"部分：
   - Framework preset: 选择"None"
   - Build command: `npm run build`
   - Build output directory: `dist`
9. 点击"Save and Deploy"

## 步骤6：推送代码到GitHub

使用现有的`push_to_github.bat`脚本将代码推送到GitHub：

```bash
# 在命令提示符中运行
push_to_github.bat
```

或者手动运行以下命令：

```bash
git add .
git commit -m "配置GitHub Actions自动部署"
git push -u origin master
```

## 步骤7：检查GitHub Actions工作流

1. 访问您的GitHub项目仓库
2. 点击"Actions"选项卡
3. 您将看到正在运行或已完成的"Deploy to Cloudflare Pages"工作流
4. 点击工作流名称查看详细日志

## 验证部署

部署成功后，您可以通过Cloudflare Pages提供的域名访问您的网站。在Cloudflare Pages仪表板中，您可以查看部署状态和访问链接。

## 常见问题排查

1. **GitHub Actions工作流失败**
   - 检查工作流日志中的错误信息
   - 确保GitHub Secrets中的API Token和Account ID正确
   - 确保项目能够在本地成功构建（运行`npm run build`）

2. **Cloudflare Pages部署失败**
   - 检查Cloudflare Pages仪表板中的构建日志
   - 确保`dist`目录包含所有必要的文件
   - 验证`build.js`脚本正确复制了所有文件

3. **网站图片不显示**
   - 确保您运行了`copy_images.bat`脚本，将所有图片复制到`images`目录
   - 检查HTML文件中的图片路径是否正确

## 其他说明

- 每次推送到master分支时，GitHub Actions将自动触发部署
- 您可以在`.github/workflows/deploy.yml`文件中修改工作流配置
- 如需更改部署分支，修改工作流文件中的`branches: [master]`部分
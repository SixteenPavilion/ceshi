# Cloudflare Workers 静态博客

这是一个简单的静态博客网站，部署在Cloudflare Workers上。网站包含两篇文章，支持电脑和手机端适配。

## 网站内容

1. **呆瓜项目，五五分**
   - 内容：五五分，单号50-100+
   - 图片：代挂文件夹中的两张图片

2. **QQ群不定期分享羊毛**
   - 内容：8.26号部分大毛
   - 图片：羊毛文件夹中的九张图片

## 技术栈

- HTML5
- CSS3 (响应式设计)
- JavaScript
- Cloudflare Workers

## 图片处理

在部署或上传之前，您需要将图片文件复制到项目的images目录中：

1. 双击运行项目根目录下的`copy_images.bat`文件
2. 该脚本会自动将代挂和羊毛文件夹中的图片复制到项目的images目录

## 部署指南

1. 确保已完成图片处理步骤
2. 安装[Cloudflare Wrangler](https://developers.cloudflare.com/workers/wrangler/)
   ```bash
   npm install -g @cloudflare/wrangler
   ```

3. 登录Cloudflare账户
   ```bash
   wrangler login
   ```

4. 在wrangler.toml文件中填写您的Cloudflare账户ID

5. 部署网站
   ```bash
   wrangler publish
   ```

## 本地预览

您可以直接在浏览器中打开index.html文件进行本地预览。
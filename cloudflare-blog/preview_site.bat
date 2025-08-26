@echo off
REM 这个批处理文件用于在本地预览网站效果

REM 首先复制图片文件
echo 正在复制图片文件...
call copy_images.bat

if %errorlevel% neq 0 (
    echo 图片复制失败。请手动将代挂和羊毛文件夹中的图片复制到images目录。
    pause
    exit /b 1
)

REM 在默认浏览器中打开网站
echo 正在打开网站进行预览...
start index.html

if %errorlevel% neq 0 (
    echo 无法自动打开网站。请手动在浏览器中打开index.html文件。
    pause
    exit /b 1
) else (
    echo 网站已在浏览器中打开。
    echo 注意：这是本地预览模式，某些功能可能与部署到Cloudflare Workers后的效果有所不同。
    echo 按任意键关闭...
    pause >nul
    exit /b 0
)
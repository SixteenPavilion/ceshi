@echo off
REM 这个批处理文件用于将项目推送到GitHub的ceshi仓库

REM 检查Git是否安装
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误：未安装Git。请先安装Git，然后重试。
    pause
    exit /b 1
)

REM 提示用户先处理图片
echo 重要提示：请确保您已经运行了copy_images.bat文件，将所有图片复制到images目录。
echo 这一步骤对于网站正确显示图片至关重要！
pause

REM 提示用户输入GitHub凭据（可选）
echo 注意：如果需要输入GitHub凭据，请确保输入正确。

REM 添加所有更改
echo 正在添加所有修改...
git add .

REM 提交更改
echo 正在提交修改...
git commit -m "更新项目文件"

if %errorlevel% neq 0 (
    echo 提交失败。可能没有需要提交的修改。
    echo 继续尝试推送代码...
)

echo 正在推送代码到GitHub...
git push -u origin master

if %errorlevel% neq 0 (
    echo 推送失败。请检查网络连接或GitHub凭据，然后重试。
    echo 您也可以手动运行以下命令：
    echo git push -u origin master
    pause
    exit /b 1
) else (
    echo 代码已成功推送到GitHub的ceshi仓库！
    pause
    exit /b 0
)
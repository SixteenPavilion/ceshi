@echo off
REM 这个批处理文件用于将图片从代挂和羊毛文件夹复制到项目的images目录

REM 设置源目录和目标目录
set "SOURCE_DIR=..\代挂\"
set "TARGET_DIR=images\"

REM 创建目标目录（如果不存在）
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"

REM 复制代挂文件夹中的图片
echo 正在复制代挂文件夹中的图片...
copy "%SOURCE_DIR%微信图片_20250826215159_33.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_34.jpg" "%TARGET_DIR%"

REM 复制羊毛文件夹中的图片
set "SOURCE_DIR=..\羊毛\"
echo 正在复制羊毛文件夹中的图片...
copy "%SOURCE_DIR%微信图片_20250826215159_24.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_25.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_26.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_27.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_28.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_29.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_30.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_31.jpg" "%TARGET_DIR%"
copy "%SOURCE_DIR%微信图片_20250826215159_32.jpg" "%TARGET_DIR%"

if %errorlevel% neq 0 (
    echo 图片复制失败。请手动将代挂和羊毛文件夹中的图片复制到images目录。
    pause
    exit /b 1
) else (
    echo 所有图片已成功复制到images目录！
    pause
    exit /b 0
)
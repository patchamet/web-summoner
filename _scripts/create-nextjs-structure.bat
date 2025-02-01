@echo off
:: Set the target directory for the project
set TARGET_DIR=..

:: Create the directory structure
cd %TARGET_DIR%

:: Create main folders
mkdir my-nextjs-project
cd my-nextjs-project

:: Create public folder
mkdir public
mkdir public\images

:: Create src folder and subfolders
mkdir src
mkdir src\assets
mkdir src\assets\styles
mkdir src\components
mkdir src\hooks
mkdir src\lib
mkdir src\context
mkdir src\services
mkdir src\state
mkdir src\types
mkdir src\utils

:: Create tests folder and subfolders
mkdir tests
mkdir tests\components
mkdir tests\pages

:: Create config and root files
echo. > .eslintrc.json
echo. > .gitignore
echo. > next.config.js
echo. > package.json
echo. > tsconfig.json

echo Folder structure created successfully!
pause

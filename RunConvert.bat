@echo off
chcp 65001

:start
cls

echo Game version
echo   Type -1 to generate for all versions detected
echo   Example: 3.0.0
echo.
set /p ver=::
cls

echo Output filter
echo   Type -1 to list filter ids
echo   Leave it blank to generate all files
echo.
set /p filter=::
cls

setlocal enableextensions
if "%ver%" neq "-1" (
  if not exist ".\InputData\%ver%" (
    md ".\InputData\%ver%"
    echo Put your resources in ".\InputData\%ver%" then press enter to continue.
    echo File structure:
    echo   .\InputData\%ver%
    echo   ├─BinOutput
    echo   ├─ExcelBinOutput
    echo   └─Scripts
    pause >nul
    cls
  )
)
endlocal

node ./build -mode:3 -ver:%ver% -filter:%filter%
pause
goto start
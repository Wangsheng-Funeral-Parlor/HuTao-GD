@echo off

set /p ver=Game Version:

node ./build -mode:1 -ver:%ver%
pause
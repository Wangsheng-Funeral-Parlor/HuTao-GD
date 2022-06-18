@echo off

set /p ver=Game Version:

node ./build -mode:2 -ver:%ver%
pause
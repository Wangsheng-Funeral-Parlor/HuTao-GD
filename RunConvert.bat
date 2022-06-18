@echo off

set /p ver=Game Version:

node ./build -mode:3 -ver:%ver%
pause
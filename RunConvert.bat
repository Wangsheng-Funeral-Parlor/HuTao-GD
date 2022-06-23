@echo off

set /p ver=Game Version:
set /p filter=Filter:

node ./build -mode:3 -ver:%ver% -filter:%filter%
pause
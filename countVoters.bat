@echo off
cd .\test-data\votes
dir /b /a-d | find /c /v ""
echo users have voted on this machine
pause

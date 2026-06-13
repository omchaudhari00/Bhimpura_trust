@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\npm.cmd" run dev -- --host 0.0.0.0 > frontend-server.log 2> frontend-server.err.log

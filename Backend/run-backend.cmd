@echo off
cd /d "%~dp0"
"%~dp0.codex-venv\Scripts\python.exe" manage.py runserver > backend-server.log 2> backend-server.err.log

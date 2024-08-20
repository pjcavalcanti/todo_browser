CREATE USER IF NOT EXISTS 'todo@browser' IDENTIFIED BY 'todo';
GRANT ALL PRIVILEGES ON todo_browser.* TO 'todo@browser';

FLUSH PRIVILEGES;


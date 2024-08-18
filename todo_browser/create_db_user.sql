CREATE USER 'todo@browser' IDENTIFIED BY 'todo_browser_server';
GRANT ALL PRIVILEGES ON todo_browser.* TO 'todo@browser';

FLUSH PRIVILEGES;


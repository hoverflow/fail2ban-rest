# fail2ban-rest
fail2ban REST API written in Node.JS

config files must be copied:
- fail2ban_rest.conf in /etc/fail2ban/jail.d/
-  fail2ban-filter-rest.conf in /etc/fail2ban/filter.d/
after copy the files fail2ban must be reloaded in order to work.

install dependencies by running "npm install"  
please use pm2 (http://pm2.keymetrics.io/) as process manager to control the service

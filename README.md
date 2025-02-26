# Nginx as Webserver, Reverse proxy and Load Balancer


## Install Nginx Ubuntu

## Table of Contents
- [Installation](#installation)
- [Video](#video)


## Installation
1. Install Nginx:

```bash
sudo apt update
```

```bash
sudo apt install nginx
```

```bash
sudo systemctl start nginx
```

```bash
sudo systemctl enable nginx
```

```bash
sudo systemctl status nginx
```

### Nginx as Web Server

1. Create index.html file and paste a html code file:

```bash
sudo nano -p /var/www/html/index.html
```

2. Paste your index.html code:

3. Restart nginx:

```bash
sudo systemctl restart nginx
```

### Nginx as Reverse Proxy

1. Install node.js:

```bash
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - 
sudo apt install -y nodejs
```

2. Create a Node.js Application:

```bash
sudo mkdir /var/www/myapp
```

```bash
cd /var/www/myapp
```

```bash
sudo npm install express
```

```bash
sudo npm init -y
```

```bash
sudo nano index.js
```

Paste the sample index.js file above:

3. Run the Node.js application:

```bash
node index.js
```

Your Node.js application should now be running on port 3000. You can test it by navigating to http://your-server-ip:3000

### Configure Node.js file to run Nginx as reverse proxy


1. Configure default file

```bash
sudo nano /etc/nginx/sites-available/default
```

1. Paste the configuration in server part

```bash
location / {
        proxy_pass http://localhost:3000;  # Proxy to Node.js app on port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

#### Configure Node.js file to run in pm2

1. Install pm2

```bash
sudo npm install -g pm2
```
2. Run Node.js using pm2:

```bash
pm2 start index.js --name "myapp"
```

3. Stop the previous nginx running in the port 3000

```bash
sudo lsof -i :3000
```

This will show something like:

COMMAND   PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node     1234  user   21u  IPv4  12345      0t0  TCP *:3000 (LISTEN)

```bash
sudo kill -9 1234
```

4. Restart pm2 myapp and nginx

```bash
pm2 restart myapp
```

```bash
pm2 logs
```

```bash
sudo systemctl restart nginx
```

### Nginx as Load Balancer

1. Configure default file

```bash
sudo nano /etc/nginx/sites-available/default
```

1. edit the following file


```bash
        upstream nodeapp { # put above the server
        server localhost:3001; 
        server localhost:3002;
        server localhost:3003;
    }
```


```bash
location / {
        proxy_pass http://nodeapp;  # change the proxy_pass http://localhost:3000;
    }
```



# Get Started with Dockerfile and docker-compose:

### Docker

1. Install docker 

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

2. Build the docker image

```bash
docker build -t myapp1:1.0 . #docker build -t <image_name>:<tag> <path_to_dockerfile>
```

3. Create or import a Dockerfile

4. Run the docker image

```bash
docker run -d -p 3001:3001 myapp1:1.0 #docker run -d -p <host_port>:<container_port> <image_name>:<tag>
```

```bash
docker ps
```

5. Stop and Remove the Container

```bash
docker stop <container_id>
```

```bash
docker rm <container_id>
```

```bash
docker rmi <image_name>:<tag>
```

### docker-compose

1. Install docker-compose

```bash
# Download the latest version of Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Set the correct permissions
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

2. run docker-compose file

```bash
docker-compose up -d
```

3. run docker-compose file

```bash
docker-compose down
```

## Video

### How to use Nginx as a Webserver, Reverse proxy and load balancer: https://youtu.be/whZWj2XN9MI?si=bTNzKoYXMV5yV315

### How to use dockerfile and docker-compose: https://youtu.be/i_Q0bczGDzQ?si=7X5ug5_LfZcClsH9

### How to deploy an application using Nginx and Docker: https://youtu.be/LM-vV1CsoLc?si=WUQNlueF6o9cHMfI

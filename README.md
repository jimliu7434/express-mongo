# express-mongo

## 建置 MongoDB

```bash
docker-compose -f ./mongodb/docker-compose.yml up -d
```

## 安裝 Node.js

Node.js v.14
[https://nodejs.org/en/](https://nodejs.org/en/)

## 初始化 Project

```bash
npm init -y
```

## 安裝 Dependency Modules

```bash
npm install express mongodb dotenv
```

## Debug

```json
{
    "type": "node",
    "request": "launch",
    "name": "Launch WebServer",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "program": "${workspaceFolder}\\index.js"
}
```

```bash
node index.js
# or 
npm run start
```

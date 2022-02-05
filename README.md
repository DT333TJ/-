# 💖微前端测试功能代码总集:

## 👍😭🤢🤢项目进度
- [x] 完成主应用和微应用的搭建
- [x] 完成主应用和微应用nginx的配置、并能够通过localhost路径进行访问
- [ ] 添加qiankun微前端框架相关内容
- [ ] 添加京东MicroApp微前端框架相关内容
- [ ] 添加阿里icestark微前端框架相关内容
---
## 🤣包含项目
- 主应用: vue-cli4配置项目
- 微应用:
  - vue-cli2创建的vue2项目
  - vite创建的vue3+ts项目
  - Create React App创建的react17项目
---  
## 😍Nginx目录及配置

| 配置项  |  描述  |
| :----: | :----: |
| html | nginx服务器存储前端代码的文件夹名称 |
| server | 在server对象中配置具体的代码入口目录 |
| listen |  监听的端口号 |
| server_name | 用来设置主机服务名称 |
| location | 配置url访问路径 |
| root      | location + root为真实的访问资源路径   |
| alias   | 替换location路径访问资源路径   |
| try_files  | $uri $uri/  location路径/index.html 用来配置vue react项目刷新时资源的内部重定向       |

---
## 👌Nginx配置代码范例：

```
server {
  listen       8080;
  server_name  localhost;

  #charset koi8-r;

  #access_log  logs/host.access.log  main;

  location /test {
      alias   html/children/;
      index  index.html index.htm;
  }

  location /father {
      alias  html/dist/;
      index  index.html index.htm;
      try_files $uri $uri/ /father/index.html;
  }

  location /father/vue-cli2 {
      alias  html/children/vue-cli2/dist/;
      index  index.html index.htm;
      try_files $uri $uri/ /father/vue-cli2/index.html;
  }

  location /father/react {
      alias  html/children/react/build/;
      index  index.html index.htm;
      try_files $uri $uri/ /father/react/index.html;
  }

  location /father/vite-vue {
      alias  html/children/vite/dist/;
      index  index.html index.htm;
      try_files $uri $uri/ /father/vite-vue/index.html;
  }


  # redirect server error pages to the static page /50x.html
  #
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }

  # proxy the PHP scripts to Apache listening on 127.0.0.1:80
  #
  #location ~ \.php$ {
  #    proxy_pass   http://127.0.0.1;
  #}

  # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
  #
  #location ~ \.php$ {
  #    root           html;
  #    fastcgi_pass   127.0.0.1:9000;
  #    fastcgi_index  index.php;
  #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
  #    include        fastcgi_params;
  #}

  # deny access to .htaccess files, if Apache's document root
  # concurs with nginx's one
  #
  #location ~ /\.ht {
  #    deny  all;
  #}
}
```

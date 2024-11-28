#!/bin/bash

# 切换到 Dockerfile 所在的目录
cd ~/PycharmProjects/kotaemon

# Build Docker 镜像
#echo "镜像创建..."
#docker build -t kotaemon:latest .

#if [ $? -ne 0 ]; then
#  echo "创建失败"
#  exit 1
#fi

# 保存镜像为 tar 文件
echo "打包镜像为tar文件..."
docker save -o kotaemon.tar kotaemon:latest

if [ $? -ne 0 ]; then
  echo "打包失败"
  exit 1
fi

# 上传 tar 文件至阿里云服务器
echo "将文件上传至阿里云..."
scp -i ~/.ssh/docker_test.pem ~/PycharmProjects/kotaemon/kotaemon.tar root@47.96.97.179:/home

if [ $? -ne 0 ]; then
  echo "上传失败"
  exit 1
fi


echo "连接至阿里云服务器..."
ssh -i ~/.ssh/docker_test.pem root@47.96.97.179 <<'EOF' 
 	cd /home
 	echo "停止所有运行中的容器..."
    	docker ps -q | xargs -r docker stop
	#echo "将文件解压导入镜像..."
	#docker load -i kotaemon.tar
	if [ $? -ne 0 ]; then
  		echo "更新失败"
  		exit 1
	fi

	#启动容器
	echo "运行容器..."
	CONTAINER_ID=$(docker run -e GRADIO_SERVER_NAME=0.0.0.0 -e GRADIO_SERVER_PORT=7860 -p 8081:7860 -d --rm kotaemon:latest)
	echo "保持容器运行..."
	docker attach "$CONTAINER_ID"
EOF
if [ $? -ne 0 ]; then
  echo "连接失败"
  exit 1
fi

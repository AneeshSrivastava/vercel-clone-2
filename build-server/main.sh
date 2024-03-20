#!/bin/dash

export GIT_REPOSITORY_URL="$GIT_REPOSITORY_URL"

echo "Repo URL is: $GIT_REPOSITORY_URL"

git clone "$GIT_REPOSITORY_URL" /home/app/output

pm2 start script.js --name myapp --no-daemon

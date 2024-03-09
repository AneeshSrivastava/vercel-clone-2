#!/bin/bash

export GIT_REPOSOTRY_URL="$GIT_RESPOSITORY_URL"

git clone "$GIT_REPOSITORY_URL" /home/app/ouput

exec node script.js

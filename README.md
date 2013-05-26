# Runkeeper Report

A lightweight reporting dashboard of your Runkeeper activities.

## Install

> brew install redis

> redis-server &

> git clone git://github.com/ednapiranha/runkeeper-report.git

> cp local.json-dist local.json

> npm install

## Register your application

Sign into Runkeeper and register an app [http://runkeeper.com/partner/applications](http://runkeeper.com/partner/applications)

Copy your client id and secret to local.json under rk_client_id and rk_client_secret.

For the url on your local machine, set it to `http://127.0.0.1:3000` and set the callback url to ``http://127.0.0.1:3000/auth/runkeeper/callback`

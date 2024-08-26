# Notes

```bash
mongosh

test> show dbs
admin    40.00 KiB
config   96.00 KiB
local    72.00 KiB
todoapp  72.00 KiB
test>

test> use todos
switched to db todos
todos> show collections # like tables in SQL

db.help()
# Ctrl-l to clear

todos> db.createCollection('items')
{ ok: 1 }
todos> show collections
items
todos>
```

Install Compass via Homebrew
Open Compass via Spotlight

Connect to local host

Click on todos db

connect.js to set up Mongoose connection

test.js

➜ ~ brew services list

Name Status User File
caddy none  
dnsmasq none root  
mongodb-community started cazaresmr ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community.plist
mysql none  
nginx none root  
php none root  
postgresql@14 none  
redis none  
➜ ~

<hr>

mongod --version

db version v7.0.14
Build Info: {
    "version": "7.0.14",
    "gitVersion": "ce59cfc6a3c5e5c067dca0d30697edd68d4f5188",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}

<hr>

➜  42-intro-mongo-db git:(master) ✗ npm list mongoose
intro-to-mongodb@1.0.0 /Users/cazaresmr/Desktop/trueCoders/repos/frontendMasters/42-intro-mongo-db
└─┬ mongoose@5.13.22
  └─┬ mongoose-legacy-pluralize@1.0.2
    └── mongoose@5.13.22 deduped

➜  42-intro-mongo-db git:(master) ✗ 

<hr>

```bash
yarn test exercises/models/__test__/ --watch
```

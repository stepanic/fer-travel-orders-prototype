# Sails.js Backend App

## After git clone of this repo:

Copy file /config/local.js.bak to /config/local.js

##How to run app on localhost?
```sh
$ sudo npm install sails -g
$ npm install
$ sails lift
$ app is served on http://localhost:1337
```

##How to run tests?
```sh
$ sudo npm install mocha -g
$ sudo npm install grunt -g
$ npm install (if not before)
$ grunt mochaTest
```

After `grunt mochaTest` app will have data in database!!!


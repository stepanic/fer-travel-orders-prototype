# Sails.js Backend App
```sh
$ cd backend
$ sudo npm install sails -g
$ sudo npm install grunt-cli -g
```

## Prepare app:
```sh
$ cp config/local.js.bak config/local.js
$ npm install
```

##How to run app on localhost?
```sh
$ sails lift --verbose
```

##How to run E2E tests?
```sh
$ grunt test:e2e
```

After `grunt test:e2e` app will have data in database!!!


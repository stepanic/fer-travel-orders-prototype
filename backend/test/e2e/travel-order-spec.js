require('./sails-test-e2e-pre-config.js');

describe('TravelOrder CRUD', function() {

  share.travelorders = []


  it('create-travel-order with budgetsourcecode, countrycode param, owner user [2]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder",
      method: 'POST',
      headers: {
        username: share.users[2].username,
        password: share.users[2].password
      },
      form: {
        budgetsourcecode: share.budgetsources[0].code,
        countrycode: share.countries[1].code,
        datetimeStart: moment.tz("2014-11-29 11:45:21", "Europe/Zagreb").toISOString(),
        datetimeFinish: moment.tz("2014-12-7 21:00", "Europe/Zagreb").toISOString(),
        items: [
          {
            name: 'Smještaj',
            quantity: 7,
            price: 58.99,
            currency: 'EUR'
          },
          {
            name: 'TAXI',
            price: 23.78,
            currency: 'EUR'
          },
          {
            name: 'Autobusna karta',
            quantity: 4,
            price: 317,
            currency: 'HRK'
          },
          {
            name: 'Kotizacija',
            quantity: 4,
            price: 79.95,
            currency: 'USD'
          }
        ]
      }
    }).then(function(response){

      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      console.log.verbose("body.datetimeStart UTC", body.datetimeStart);
      console.log.verbose("body.datetimeStart Europe/Zagreb", moment(body.datetimeStart).tz("Europe/Zagreb").format("YYYY-MM-DD HH:mm:ss"));

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.datetimeStart).to.equal(moment.tz("2014-11-29 11:45:21", "Europe/Zagreb").toISOString());
      expect(body.datetimeFinish).to.equal(moment.tz("2014-12-7 21:00", "Europe/Zagreb").toISOString());

      var date = moment.tz("2014-11-29 11:45:21", "Europe/Zagreb");
      for(var i = 0; i < body.dailyAllowances.length; i++) {
        if (i === 0) {
          expect(body.dailyAllowances[i].size).to.equal(1);
        } else if (i === (body.dailyAllowances.length - 1)) {
          date = moment.tz("2014-12-7 21:00", "Europe/Zagreb");
          expect(body.dailyAllowances[i].size).to.equal(1);
        } else {
          expect(body.dailyAllowances[i].size).to.equal(1);
        }

        expect(body.dailyAllowances[i].datetime).to.equal(date.toISOString());
        date.add(1, "days");
      }

      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;

      share.travelorders[0] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order with budgetsourcecode, countrycode param 2 for user [0]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder",
      method: 'POST',
      headers: {
        username: share.users[0].username,
        password: share.users[0].password
      },
      form: {
        budgetsourcecode: share.budgetsources[0].code,
        countrycode: share.countries[1].code,
        datetimeStart: moment.tz("2014-11-29 14:45:21", "Europe/Zagreb").toISOString(),
        datetimeFinish: moment.tz("2014-12-7 21:00", "Europe/Zagreb").toISOString()
      }
    }).then(function(response){

      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      console.log.verbose("body.datetimeStart UTC", body.datetimeStart);
      console.log.verbose("body.datetimeStart Europe/Zagreb", moment(body.datetimeStart).tz("Europe/Zagreb").format("YYYY-MM-DD HH:mm:ss"));

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.datetimeStart).to.equal(moment.tz("2014-11-29 14:45:21", "Europe/Zagreb").toISOString());
      expect(body.datetimeFinish).to.equal(moment.tz("2014-12-7 21:00", "Europe/Zagreb").toISOString());

      var date = moment.tz("2014-11-29 14:45:21", "Europe/Zagreb");
      for(var i = 0; i < body.dailyAllowances.length; i++) {
        if (i === 0) {
          expect(body.dailyAllowances[i].size).to.equal(0.5);
        } else if (i === (body.dailyAllowances.length - 1)) {
          date = moment.tz("2014-12-7 21:00", "Europe/Zagreb");
          expect(body.dailyAllowances[i].size).to.equal(1);
        } else {
          expect(body.dailyAllowances[i].size).to.equal(1);
        }

        expect(body.dailyAllowances[i].datetime).to.equal(date.toISOString());
        date.add(1, "days");
      }

      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;

      share.travelorders[2] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order with budgetsourcecode, countrycode param 2 for user [2]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder",
      method: 'POST',
      headers: {
        username: share.users[2].username,
        password: share.users[2].password
      },
      form: {
        budgetsourcecode: share.budgetsources[0].code,
        countrycode: share.countries[1].code,
        datetimeStart: moment.tz("2014-11-29 14:45:21", "Europe/Zagreb").toISOString(),
        datetimeFinish: moment.tz("2014-12-7 21:00", "Europe/Zagreb").toISOString()
      }
    }).then(function(response){

      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      console.log.verbose("body.datetimeStart UTC", body.datetimeStart);
      console.log.verbose("body.datetimeStart Europe/Zagreb", moment(body.datetimeStart).tz("Europe/Zagreb").format("YYYY-MM-DD HH:mm:ss"));

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.datetimeStart).to.equal(moment.tz("2014-11-29 14:45:21", "Europe/Zagreb").toISOString());
      expect(body.datetimeFinish).to.equal(moment.tz("2014-12-7 21:00", "Europe/Zagreb").toISOString());

      var date = moment.tz("2014-11-29 14:45:21", "Europe/Zagreb");
      for(var i = 0; i < body.dailyAllowances.length; i++) {
        if (i === 0) {
          expect(body.dailyAllowances[i].size).to.equal(0.5);
        } else if (i === (body.dailyAllowances.length - 1)) {
          date = moment.tz("2014-12-7 21:00", "Europe/Zagreb");
          expect(body.dailyAllowances[i].size).to.equal(1);
        } else {
          expect(body.dailyAllowances[i].size).to.equal(1);
        }

        expect(body.dailyAllowances[i].datetime).to.equal(date.toISOString());
        date.add(1, "days");
      }

      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;

      share.travelorders[2] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order, with budget, countrycode params', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder",
      method: 'POST',
      headers: {
        username: share.users[0].username,
        password: share.users[0].password
      },
      form: {
        budget: share.budgetsources[0].id,
        countrycode: share.countries[2].code,
        datetimeStart: moment.tz("2013-5-6 10:41:51", "Europe/Zagreb").toISOString(),
        datetimeFinish: moment.tz("2013-5-17 9:00", "Europe/Zagreb").toISOString()
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      console.log.verbose("body.datetimeStart UTC", body.datetimeStart);
      console.log.verbose("body.datetimeStart Europe/Zagreb", moment(body.datetimeStart).tz("Europe/Zagreb").format("YYYY-MM-DD HH:mm:ss"));

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.datetimeStart).to.equal(moment.tz("2013-5-6 10:41:51", "Europe/Zagreb").toISOString());
      expect(body.datetimeFinish).to.equal(moment.tz("2013-5-17 9:00", "Europe/Zagreb").toISOString());

      var date = moment.tz("2013-5-6 10:41:51", "Europe/Zagreb");
      for(var i = 0; i < body.dailyAllowances.length; i++) {
        if (i === 0) {
          expect(body.dailyAllowances[i].size).to.equal(1);
        } else if (i === (body.dailyAllowances.length - 1)) {
          date = moment.tz("2013-5-17 9:00", "Europe/Zagreb");
          expect(body.dailyAllowances[i].size).to.equal(0.5);
        } else {
          expect(body.dailyAllowances[i].size).to.equal(1);
        }

        expect(body.dailyAllowances[i].datetime).to.equal(date.toISOString());
        date.add(1, "days");
      }

      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;

      share.travelorders[2] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order, with budget, country params, datetimeStart and datetimeFinish with dailyAllowance 0', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder",
      method: 'POST',
      headers: {
        username: share.users[0].username,
        password: share.users[0].password
      },
      form: {
        budget: share.budgetsources[0].id,
        country: share.countries[2].id,
        datetimeStart: moment.tz("2013-5-6 2:41:51", "Europe/Zagreb").toISOString(),
        datetimeFinish: moment.tz("2013-5-17 4:34", "Europe/Zagreb").toISOString()
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      console.log.verbose("body.datetimeStart UTC", body.datetimeStart);
      console.log.verbose("body.datetimeStart Europe/Zagreb", moment(body.datetimeStart).tz("Europe/Zagreb").format("YYYY-MM-DD HH:mm:ss"));

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.datetimeStart).to.equal(moment.tz("2013-5-6 2:41:51", "Europe/Zagreb").toISOString());
      expect(body.datetimeFinish).to.equal(moment.tz("2013-5-17 4:34", "Europe/Zagreb").toISOString());

      var date = moment.tz("2013-5-6 2:41:51", "Europe/Zagreb");
      for(var i = 0; i < body.dailyAllowances.length; i++) {
        if (i === 0) {
          expect(body.dailyAllowances[i].size).to.equal(1);
        } else if (i === (body.dailyAllowances.length - 1)) {
          date = moment.tz("2013-5-17 4:34", "Europe/Zagreb");
          expect(body.dailyAllowances[i].size).to.equal(0);
        } else {
          expect(body.dailyAllowances[i].size).to.equal(1);
        }

        expect(body.dailyAllowances[i].datetime).to.equal(date.toISOString());
        date.add(1, "days");
      }

      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;

      share.travelorders[3] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order, with errors, not correct blueprint request', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder",
      method: 'POST',
      headers: {
        username: share.users[0].username,
        password: share.users[0].password
      },
      form: {
        budget: share.budgetsources[0].id,
        id: 7043 // error 403 because id is automatic attribute is forbidden by outside setup
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(403);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Error, policy failed, travelorderid is required, try to allow travel order [0] by user [1]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/allow",
      method: 'PUT',
      headers: {
        username: share.users[1].username,
        password: share.users[1].password
      },
      form: {
        // travelorderid: share.travelorders[0].id
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(403);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Should NOT be travel order [0] allowed by user [1] DEAN', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/" + share.travelorders[0].id,
      method: 'GET',
      headers: {
        username: share.users[1].username,
        password: share.users[1].password,
        token: 'mastersecret'
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.isAllowedByDean).to.equal(false);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('allow travel order [0] by user DEAN [1]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/allow",
      method: 'PUT',
      headers: {
        username: share.users[1].username,
        password: share.users[1].password
      },
      form: {
        travelorderid: share.travelorders[0].id
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);


      expect(result.statusCode).to.equal(200);
      expect(body.summary).to.exist;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Error: Try twice to allow travel order [0] by user [1]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/allow",
      method: 'PUT',
      headers: {
        username: share.users[1].username,
        password: share.users[1].password
      },
      form: {
        travelorderid: share.travelorders[0].id
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(403);
      expect(body.summary).to.exist;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Should be travel order [0] allowed by user [1] DEAN', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/" + share.travelorders[0].id,
      method: 'GET',
      headers: {
        username: share.users[2].username,
        password: share.users[2].password
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.isAllowedByDean).to.equal(true);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Generate TravelOrder [0] PDF, should be isAllowedByDepartmentHead===false', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/pdf",
      method: 'PUT',
      headers: {
        token: 'mastersecret'
      },
      form: {
        travelorderid: share.travelorders[0].id
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.summary).to.equal('TravelOrder PDF is generated!');

      setTimeout(function() {
        done();
      }, 1500);
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Error: allow travel order [0] is by ZPM user by user HEAD ZPR [3]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/allow",
      method: 'PUT',
      headers: {
        username: share.users[3].username,
        password: share.users[3].password
      },
      form: {
        travelorderid: share.travelorders[0].id
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(400);
      expect(body.summary).to.exist;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Should NOT be travel order [0] allowed by user [4] ZPM Department HEAD', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/" + share.travelorders[0].id,
      method: 'GET',
      headers: {
        username: share.users[2].username,
        password: share.users[2].password
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.isAllowedByDepartmentHead).to.equal(false);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Should NOT be travel order [0] allowed to read by user [3] ZPR Department HEAD', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/" + share.travelorders[0].id,
      method: 'GET',
      headers: {
        username: share.users[3].username,
        password: share.users[3].password
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(400);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Should be travel order [0] allowed to read by user [4] ZPM Department HEAD', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/" + share.travelorders[0].id,
      method: 'GET',
      headers: {
        username: share.users[4].username,
        password: share.users[4].password
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Allow travel order [0] is by ZPM Department HEAD [4]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/allow",
      method: 'PUT',
      headers: {
        username: share.users[4].username,
        password: share.users[4].password
      },
      form: {
        travelorderid: share.travelorders[0].id
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.summary).to.exist;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Should be travel order [0] allowed by user [4] ZPM Department HEAD', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/" + share.travelorders[0].id,
      method: 'GET',
      headers: {
        username: share.users[4].username,
        password: share.users[4].password
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.isAllowedByDepartmentHead).to.equal(true);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Allow user [2] username: user to Update travel order [0], which are owner', function(done) {
    // Add on end of array one new element
    share.travelorders[0].items.push ({
      name: "Promotivni materijali",
      price: 1235.65,
      currency: 'HRK'
    });

    request({
      url: "http://localhost:1337/api/travelorder/" + share.travelorders[0].id,
      method: 'PUT',
      headers: {
        username: share.users[2].username,
        password: share.users[2].password
      },
      form: {
        items: share.travelorders[0].items
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.items[4].price).to.equal('1235.65');
      expect(body.items[4].currency).to.equal('HRK');

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('NOT Allow user [3] username: user to Update travel order [0], which are NOT owner', function(done) {
    // Add on end of array one new element
    share.travelorders[0].items.push ({
      name: "Nabavka promotivnih materijala",
      price: 1235.65,
      currency: 'HRK'
    });

    request({
      url: "http://localhost:1337/api/travelorder/" + share.travelorders[0].id,
      method: 'PUT',
      headers: {
        username: share.users[3].username,
        password: share.users[3].password
      },
      form: {
        items: share.travelorders[0].items
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);

      expect(result.statusCode).to.equal(400);

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Should read all travelorders by user [2]', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/myall",
      method: 'GET',
      headers: {
        username: share.users[2].username,
        password: share.users[2].password
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);

      expect(result.statusCode).to.equal(200);
      for (var i = 0; i < body.length; i++) {
        expect(share.users[2].id).to.equal(body[i].owner.id);
      }

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Generate TravelOrder [0] PDF', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/pdf",
      method: 'PUT',
      headers: {
        token: 'mastersecret'
      },
      form: {
        travelorderid: share.travelorders[0].id
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.summary).to.equal('TravelOrder PDF is generated!');

      setTimeout(function() {
        done();
      }, 1500);
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Generate TravelOrder [0] PDF report', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/pdf",
      method: 'PUT',
      headers: {
        token: 'mastersecret'
      },
      form: {
        travelorderid: share.travelorders[0].id,
        type: 'report'
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.summary).to.equal('TravelOrder PDF is generated!');

      setTimeout(function() {
        done();
      }, 1500);
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('Generate TravelOrder [0] PDF report on more :)', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder/pdf",
      method: 'PUT',
      headers: {
        token: 'mastersecret'
      },
      form: {
        travelorderid: share.travelorders[0].id,
        type: 'report'
      }
    }).then(function(response){
      var result = response[0].toJSON();
      var body = parseJSON(result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.summary).to.equal('TravelOrder PDF is generated!');

      setTimeout(function() {
        done();
      }, 1500);
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });
});

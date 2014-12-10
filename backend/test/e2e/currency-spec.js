require('./sails-test-e2e-pre-config.js');

describe('Currency CRUD', function() {

  share.currencies = []

  it('create-currencies HRK, EUR, USD', function(done) {
    console.log.verbose("Create HRK");
    request({
      url: "http://localhost:1337/api/currency",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'HRK',
        exchangeRateToHRK: 1.0
      }
    }).then(function(response){

      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;
      expect(body.name).to.equal('HRK');
      expect(body.exchangeRateToHRK).to.equal(1.0);

      share.currencies[0] = body;

    }).then(function() {
      console.log.verbose("Create EUR");

      return request({
        url: "http://localhost:1337/api/currency",
        method: 'POST',
        headers: {
          token: 'mastersecret'
        },
        form: {
          name: 'EUR',
          exchangeRateToHRK: 7.67
        }
      });
    }).then(function(response){

      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;
      expect(body.name).to.equal('EUR');
      expect(body.exchangeRateToHRK).to.equal(7.67);

      share.currencies[1] = body;

    }).then(function() {
      console.log.verbose("Create USD");

      return request({
        url: "http://localhost:1337/api/currency",
        method: 'POST',
        headers: {
          token: 'mastersecret'
        },
        form: {
          name: 'USD',
          exchangeRateToHRK: 6.26
        }
      });
    }).then(function(response){

      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;
      expect(body.name).to.equal('USD');
      expect(body.exchangeRateToHRK).to.equal(6.26);

      share.currencies[2] = body;

      done();

    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('add-new value for USD currency, error because of duplicate name attribute', function (done) {
    request({
      url: "http://localhost:1337/api/currency",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'USD',
        exchangeRateToHRK: 6.07
      }
    }).then(function(response){

      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      expect(result.statusCode).to.equal(400);

      done();

    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

});

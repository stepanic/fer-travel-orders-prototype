require('./sails-test-e2e-pre-config.js');

describe('Country CRUD', function() {

  share.countries = []

  it('create-countries Hrvatska, Njemačka, SAD', function(done) {
    console.log.verbose("Create Hrvatska");
    request({
      url: "http://localhost:1337/api/country",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        code: 'HR',
        name: 'Hrvatska',
        dailyAllowanceCurrency: 'HRK',
        dailyAllowanceSize: 170
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
      expect(body.code).to.equal('HR');
      expect(body.name).to.equal('Hrvatska');
      expect(body.dailyAllowanceCurrency).to.equal('HRK');
      expect(body.dailyAllowanceSize).to.equal(170);

      share.countries[0] = body;

    }).then(function() {
      console.log.verbose("Create Njemačka");

      return request({
        url: "http://localhost:1337/api/country",
        method: 'POST',
        headers: {
          token: 'mastersecret'
        },
        form: {
          code: 'DE',
          name: 'Njemačka',
          dailyAllowanceCurrency: 'EUR',
          dailyAllowanceSize: 70
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
      expect(body.code).to.equal('DE');
      expect(body.name).to.equal('Njemačka');
      expect(body.dailyAllowanceCurrency).to.equal('EUR');
      expect(body.dailyAllowanceSize).to.equal(70);

      share.countries[1] = body;

    }).then(function() {
      console.log.verbose("Create SAD");

      return request({
        url: "http://localhost:1337/api/country",
        method: 'POST',
        headers: {
          token: 'mastersecret'
        },
        form: {
          code: 'US',
          name: 'SAD',
          dailyAllowanceCurrency: 'USD',
          dailyAllowanceSize: 95
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
      expect(body.code).to.equal('US');
      expect(body.name).to.equal('SAD');
      expect(body.dailyAllowanceCurrency).to.equal('USD');
      expect(body.dailyAllowanceSize).to.equal(95);

      share.countries[2] = body;

      done();

    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('get currency instance from country', function(done) {
    request({
      url: "http://localhost:1337/api/currency",
      method: 'GET',
      headers: {
        username: share.users[0].username,
        password: share.users[0].password
      },
      qs: {
        name: share.countries[2].dailyAllowanceCurrency
      }
    }).then(function(response){

      var result = response[0].toJSON();
      var body = parseJSON(result.body);
      console.log.verbose("body", body);
      console.log.verbose("result", result);
      console.log.verbose("result.body", result.body);

      body = body[0];

      expect(result.statusCode).to.equal(200);
      expect(body.id).to.exist;
      expect(body.createdAt).to.exist;
      expect(body.updatedAt).to.exist;
      expect(body.name).to.equal('USD');
      expect(body.exchangeRateToHRK).to.exist;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-country Austria', function(done) {
    console.log.verbose("Create Austria");
    request({
      url: "http://localhost:1337/api/country",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        code: 'AT',
        name: 'Austria',
        dailyAllowanceCurrency: 'EUR',
        dailyAllowanceSize: 70
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
      expect(body.code).to.equal('AT');
      expect(body.name).to.equal('Austria');
      expect(body.dailyAllowanceCurrency).to.equal('EUR');
      expect(body.dailyAllowanceSize).to.equal(70);

      share.countries[3] = body;

      done();

    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });
});

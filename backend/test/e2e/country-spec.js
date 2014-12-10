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
        dailyAllowanceCurrency: 'HRK'
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
          dailyAllowanceCurrency: 'EUR'
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
          dailyAllowanceCurrency: 'USD'
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

      share.countries[2] = body;

      done();

    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });
});

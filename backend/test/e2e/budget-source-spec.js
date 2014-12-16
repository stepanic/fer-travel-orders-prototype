require('./sails-test-e2e-pre-config.js');

describe('BudgetSource CRUD', function() {

  share.budgetsources = []

  it('create-budget-source FER', function(done) {
    request({
      url: "http://localhost:1337/api/budgetsource",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'FER',
        code: '007'
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
      expect(body.name).to.equal('FER');
      expect(body.code).to.equal("007");

      share.budgetsources[0] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-budget-source MZOS', function(done) {
    request({
      url: "http://localhost:1337/api/budgetsource",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'MZOS',
        code: '001'
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
      expect(body.name).to.equal('MZOS');
      expect(body.code).to.equal("001");

      share.budgetsources[1] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });
});

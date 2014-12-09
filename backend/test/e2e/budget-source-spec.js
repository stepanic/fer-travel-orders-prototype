require('./sails-test-e2e-pre-config.js');

describe('BudgetSource CRUD', function() {

  share.budgetsources = []

  it('create-budget-source', function(done) {
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
});

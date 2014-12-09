require('./sails-test-e2e-pre-config.js');

describe('TravelOrder CRUD', function() {

  share.travelorders = []

  it('create-travel-order with budgetsourcecode param', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder",
      method: 'POST',
      headers: {
        username: share.user.username,
        password: share.user.password
      },
      form: {
        budgetsourcecode: share.budgetsources[0].code
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

      share.travelorders[0] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order, with budget param', function(done) {
    request({
      url: "http://localhost:1337/api/travelorder",
      method: 'POST',
      headers: {
        username: share.user.username,
        password: share.user.password
      },
      form: {
        budget: share.budgetsources[0].id
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

      share.travelorders[1] = body;

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
        username: share.user.username,
        password: share.user.password
      },
      form: {
        budget: share.budgetsources[0].id,
        id: 7043
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
});

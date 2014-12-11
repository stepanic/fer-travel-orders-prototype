require('./sails-test-e2e-pre-config.js');

describe('TravelOrderItem CRUD', function() {

  share.travelorderitems = []

  it('create-travel-order-item Smještaj', function(done) {
    request({
      url: "http://localhost:1337/api/travelorderitem",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'Smještaj'
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
      expect(body.name).to.equal('Smještaj');

      share.travelorderitems[0] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order-item TAXI', function(done) {
    request({
      url: "http://localhost:1337/api/travelorderitem",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'TAXI'
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
      expect(body.name).to.equal('TAXI');

      share.travelorderitems[1] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order-item Automobil', function(done) {
    request({
      url: "http://localhost:1337/api/travelorderitem",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'Automobil'
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
      expect(body.name).to.equal('Automobil');

      share.travelorderitems[1] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order-item Vlak', function(done) {
    request({
      url: "http://localhost:1337/api/travelorderitem",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'Vlak'
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
      expect(body.name).to.equal('Vlak');

      share.travelorderitems[1] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-travel-order-item Kotizacija', function(done) {
    request({
      url: "http://localhost:1337/api/travelorderitem",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        name: 'Kotizacija'
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
      expect(body.name).to.equal('Kotizacija');

      share.travelorderitems[1] = body;

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });
});

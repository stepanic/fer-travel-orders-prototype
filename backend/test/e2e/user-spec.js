require('./sails-test-e2e-pre-config.js');

describe('User CRUD', function() {

  share.users = []

  it('create-user ADMIN', function(done) {
    request({
      url: "http://localhost:1337/api/user",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        username:         'ferko',
        password:         'ferko123',
        title:            "prof. dr. sc.",
        confirmPassword:  'ferko123',
        firstName:        'Ferko',
        lastName:         'Ferkić',
        roles:            ['USER', 'ADMIN'],
        email:            'ferko@fer.hr',
        department:       'ZPR'
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
      expect(body.username).to.equal('ferko');
      expect(body.password).to.be.undefined;
      expect(body.confirmPassword).to.be.undefined;
      expect(body.firstName).to.equal('Ferko');
      expect(body.lastName).to.equal('Ferkić');
      expect(body.roles).include('USER');
      expect(body.roles).include('ADMIN');
      expect(body.email).to.equal('ferko@fer.hr');
      expect(body.department).to.equal('ZPR');

      share.users[0] = body;
      share.users[0].password = "ferko123"

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-user DEAN', function(done) {
    request({
      url: "http://localhost:1337/api/user",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        username:         'dean',
        password:         'dean123',
        title:            "prof. dr. sc.",
        confirmPassword:  'dean123',
        firstName:        'Dean',
        lastName:         'Dean lastName',
        roles:            ['USER', 'DEAN'],
        email:            'dean@fer.hr',
        department:       'ZEMRIS'
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
      expect(body.username).to.equal('dean');
      expect(body.password).to.be.undefined;
      expect(body.confirmPassword).to.be.undefined;
      expect(body.firstName).to.equal('Dean');
      expect(body.lastName).to.equal('Dean lastName');
      expect(body.roles).include('USER');
      expect(body.roles).include('DEAN');
      expect(body.email).to.equal('dean@fer.hr');
      expect(body.department).to.equal('ZEMRIS');

      share.users[1] = body;
      share.users[1].password = "dean123"

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });

  it('create-user USER, regular user', function(done) {
    request({
      url: "http://localhost:1337/api/user",
      method: 'POST',
      headers: {
        token: 'mastersecret'
      },
      form: {
        username:         'user',
        password:         'user123',
        title:            "doc. dr. sc.",
        confirmPassword:  'user123',
        firstName:        'User',
        lastName:         'Djelatnik FER-a',
        // roles:            ['USER'],
        email:            'user@fer.hr',
        department:       'ZPM'
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
      expect(body.username).to.equal('user');
      expect(body.password).to.be.undefined;
      expect(body.confirmPassword).to.be.undefined;
      expect(body.firstName).to.equal('User');
      expect(body.lastName).to.equal('Djelatnik FER-a');
      expect(body.roles).include('USER');
      expect(body.email).to.equal('user@fer.hr');
      expect(body.department).to.equal('ZPM');

      share.users[2] = body;
      share.users[2].password = "user123"

      done();
    }).catch(function(e){
      console.log.verbose("Error", e);
      done(e);
    });
  });
});

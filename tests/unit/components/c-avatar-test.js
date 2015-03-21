import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('c-avatar', {
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('network is alias of namespace', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('network', 'bestest_network');

  assert.equal(component.get('namespace'), 'bestest_network');
});

test('user is alias of media', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('user', 'bestest_user');

  assert.equal(component.get('media'), 'bestest_user');
});

test('profile getter is [network, user]', function(assert) {
  assert.expect(2);

  var component = this.subject();
  component.setProperties({
    network: 'twitter_name',
    user: 'iamdevloper'
  });
  var profile = component.get('profile');

  assert.equal(profile[0], 'twitter_name');
  assert.equal(profile[1], 'iamdevloper');
});

test('profile setter changes network and user', function(assert) {
  assert.expect(2);

  var component = this.subject();
  component.set('profile', ['twitter_name', 'iamdevloper']);

  assert.equal(component.get('network'), 'twitter_name');
  assert.equal(component.get('user'), 'iamdevloper');
});

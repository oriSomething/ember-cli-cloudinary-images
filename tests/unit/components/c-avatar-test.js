import { moduleForComponent } from 'ember-qunit';
import { skip } from 'qunit';

moduleForComponent('c-avatar', 'Unit | Helper | c avatar', {
  needs: []
});

skip('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

skip('network is alias of namespace', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('network', 'bestest_network');

  assert.equal(component.get('namespace'), 'bestest_network');
});

skip('user is alias of media', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('user', 'bestest_user');

  assert.equal(component.get('media'), 'bestest_user');
});

skip('profile getter is [network, user]', function(assert) {
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

skip('profile setter changes network and user', function(assert) {
  assert.expect(2);

  var component = this.subject();
  component.set('profile', ['twitter_name', 'iamdevloper']);

  assert.equal(component.get('network'), 'twitter_name');
  assert.equal(component.get('user'), 'iamdevloper');
});

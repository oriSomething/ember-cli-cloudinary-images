import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('c-img', {
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

test('src has correct result without filters', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    namespace: 'happysale',
    media: 'cdn/common/logo',
    filters: ''
  });

  assert.equal(component.get('src'), '//res.cloudinary.com/happysale/image/upload/cdn/common/logo');
});

test('src has correct result with filters', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    namespace: 'happysale',
    media: 'cdn/common/logo',
    filters: 'f_auto'
  });

  assert.equal(component.get('src'), '//res.cloudinary.com/happysale/image/upload/f_auto/cdn/common/logo');
});

test('src in null when namespace or media is empty', function(assert) {
  assert.expect(2);

  var component = this.subject();

  /** Test #1 */
  component.setProperties({
    namespace: '',
    media: 'cdn/common/logo',
  });

  assert.equal(component.get('src'), null);

  /** Test #2 */
  component.setProperties({
    namespace: 'happysale',
    media: '',
  });

  assert.equal(component.get('src'), null);
});

test('src applied to the DOM', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    namespace: 'happysale',
    media: 'cdn/common/logo',
    filters: 'f_auto'
  });

  var $component = this.render();

  assert.equal($component.attr('src'), '//res.cloudinary.com/happysale/image/upload/f_auto/cdn/common/logo');
});

test('alt applied to the DOM', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    alt: 'this is alt',
  });

  var $component = this.render();

  assert.equal($component.attr('alt'), 'this is alt');
});

test('width and height applied to the DOM', function(assert) {
  assert.expect(2);

  var component = this.subject();
  component.setProperties({
    width: '100',
    height: '200'
  });

  var $component = this.render();

  assert.equal($component.attr('width'), '100');
  assert.equal($component.attr('height'), '200');
});

test('width and height not applied to the DOM when empty', function(assert) {
  assert.expect(2);

  var component = this.subject();
  var $component = this.render();

  assert.equal($component.attr('width'), undefined);
  assert.equal($component.attr('height'), undefined);
});

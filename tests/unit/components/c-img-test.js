import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('c-img', 'Unit | Helper | c-img', {
  needs: []
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

test('allFilters identical to filters', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('filters', 'fl_progressive,c_fill');

  assert.equal(component.get('allFilters'), 'fl_progressive,c_fill');
});

test('allFilters can handle array filters', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('filters', ['c_fill' , 'fl_progressive']);

  assert.equal(component.get('allFilters'), 'c_fill,fl_progressive');
});

test('allFilters includes w and h', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    filters: 'fl_progressive',
    w: 100,
    h: 50
  });

  assert.equal(component.get('allFilters'), 'fl_progressive,w_100,h_50');
});

test('src prefer cdn than account attribute', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    cdn: 'www.cdn.com',
    account: 'happysale',
    media: 'cdn/common/logo',
    filters: ''
  });

  assert.equal(component.get('src'), '//www.cdn.com/image/upload/cdn/common/logo');
});

test('protocol added when defined', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    protocol: 'https',
    cdn: 'www.cdn.com',
    account: 'happysale',
    media: 'cdn/common/logo',
    filters: ''
  });

  assert.equal(component.get('src'), 'https://www.cdn.com/image/upload/cdn/common/logo');
});

test('src has correct result without filters', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    account: 'happysale',
    media: 'cdn/common/logo',
    filters: ''
  });

  assert.equal(component.get('src'), '//res.cloudinary.com/happysale/image/upload/cdn/common/logo');
});

test('src has correct result with filters', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    account: 'happysale',
    media: 'cdn/common/logo',
    filters: 'f_auto'
  });

  assert.equal(component.get('src'), '//res.cloudinary.com/happysale/image/upload/f_auto/cdn/common/logo');
});

test('src has correct result with version', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    account: 'happysale',
    media: 'cdn/common/logo',
    version: '1423562701',
    filters: 'f_auto'
  });

  assert.equal(component.get('src'), '//res.cloudinary.com/happysale/image/upload/f_auto/v1423562701/cdn/common/logo');
});

test('src in null when account or namespace or media is empty', function(assert) {
  assert.expect(4);

  var component = this.subject();

  /** Test #1 */
  component.setProperties({
    cdn: '',
    account: '',
    namespace: 'upload',
    media: 'cdn/common/logo'
  });
  assert.equal(component.get('src'), null);

  /** Test #2 */
  component.setProperties({
    cdn: '',
    account: 'happysale',
    namespace: '',
    media: 'cdn/common/logo'
  });
  assert.equal(component.get('src'), null);

  /** Test #3 */
  component.setProperties({
    cdn: '',
    account: 'happysale',
    namespace: 'upload',
    media: ''
  });
  assert.equal(component.get('src'), null);

  /** Test #4 */
  component.setProperties({
    cdn: 'www.cdn.com',
    account: '',
    namespace: 'upload',
    media: 'cdn/common/logo'
  });
  assert.notEqual(component.get('src'), null);
});

test('src applied to the DOM', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    account: 'happysale',
    media: 'cdn/common/logo',
    filters: 'f_auto'
  });

  this.render();
  var $component = this.$();

  assert.equal($component.attr('src'), '//res.cloudinary.com/happysale/image/upload/f_auto/cdn/common/logo');
});

test('alt applied to the DOM', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    alt: 'this is alt',
  });

  this.render();
  var $component = this.$();

  assert.equal($component.attr('alt'), 'this is alt');
});

test('title applied to the DOM', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    title: 'this is title',
  });

  this.render();
  var $component = this.$();

  assert.equal($component.attr('title'), 'this is title');
});

test('width and height applied to the DOM', function(assert) {
  assert.expect(2);

  var component = this.subject();
  component.setProperties({
    width: 100,
    height: 200
  });

  this.render();
  var $component = this.$();

  assert.equal($component.attr('width'), 100);
  assert.equal($component.attr('height'), 200);
});

test('width and height not applied to the DOM when empty', function(assert) {
  assert.expect(2);

  this.subject();
  this.render();
  var $component = this.$();

  assert.equal($component.attr('width'), undefined);
  assert.equal($component.attr('height'), undefined);
});

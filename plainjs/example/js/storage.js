function Storage() {
  this.storage = window.localStorage;
  this.storageName = 'decision-maker';
  this.db = JSON.parse(this.storage.getItem(this.storageName) || '{}');
}

Storage.prototype.save = function() {
  this.storage.setItem(this.storageName, JSON.stringify(this.db));
};

Storage.prototype.update = function(key, data) {
  this.db[key] = data;
  this.save();
};

Storage.prototype.remove = function(key, data) {
  delete this.db[key];
  this.save();
};
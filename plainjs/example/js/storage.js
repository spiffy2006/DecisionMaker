/**
 * wrapper for localStorage
 */
function Storage() {
  // set localStorage to a class variable (bad practice to use globals generally)
  // If it were a perfect world and I wanted to spend more time on this localStorage would be passed as a param called storageEngine
  // that param would have to have the same interface as localStorage does
  // but I am lazy and that is too much work
  this.storage = window.localStorage;
  // this.storageName is the key to the data stored in localStorage
  this.storageName = 'decision-maker';
  // parse the stuff from localStorage and if it is falsey (falsey: null, undefined, '', 0, etc) give it an empty obejct
  this.db = JSON.parse(this.storage.getItem(this.storageName) || '{}');
}

/**
 * Save the current state of this.db into localStorage as a JSON string.
 */
Storage.prototype.save = function() {
  this.storage.setItem(this.storageName, JSON.stringify(this.db));
};

/**
 * update data for a specific key in this.db then save it to localStorage
 */
Storage.prototype.update = function(key, data) {
  this.db[key] = data;
  this.save();
};

/**
 * Remove data at a specific key from this.db and save it to localStorage
 */
Storage.prototype.remove = function(key, data) {
  delete this.db[key];
  this.save();
};
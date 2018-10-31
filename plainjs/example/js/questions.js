/**
 * This takes care of all of the storing logic for questions
 * @param {Storage} storage instance of the Storage class
 */
function Questions(storage) {
  this.storage = storage;
  // this is the name of they key in storage that points to all of the questions kind of like the name of a collection
  this.storageName = 'QUESTIONS'
  // if there is nothing in the storage db yet default to empty array
  this.questions = this.storage.db[this.storageName] || [];
}

/**
 * Adds a question to the storage
 * @param {String} question the question to be added
 * @param {Array<String>} options the array of options that are associated with the question
 */
Questions.prototype.add = function(question, options) {
  // push the question to the questions
  this.questions.push({question: question, options: options || [], create: new Date()});
  // update the storage
  this.storage.update(this.storageName, this.questions);
};

/**
 * Deletes a question by name
 * @param {String} question the question to delete
 */
Questions.prototype.remove = function(question) {
  // filter out the question that needs to be removed
  var removed = this.questions.filter(function(q) {
    if (q.question === question.question) {
      return false;
    } else {
      return true;
    }
  });
  // update the storage
  this.storage.update(this.storageName, removed);
  this.questions = removed;
}

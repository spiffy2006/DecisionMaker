function Questions(storage) {
  this.storage = storage;
  this.storageName = 'QUESTIONS'
  this.questions = this.storage.db[this.storageName] || [];
}

Questions.prototype.add = function(question, options) {
  this.questions.push({question: question, options: options || [], create: new Date()});
  this.storage.update(this.storageName, this.questions);
};

Questions.prototype.remove = function(question) {
  var removed = this.questions.filter(function(question) {
    if (question.question === question) {
      return false;
    } else {
      return true;
    }
  });
  this.storage.update(this.storageName, removed);
}
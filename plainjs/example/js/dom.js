function DecisionDOM(entrypoint) {
  this.entrypoint = entrypoint;
  this.storage = new Storage();
  this.questions = new Questions(this.storage);
  this.questionEl = document.createElement('div');
  this.questionListEl = document.createElement('div');
}

DecisionDOM.prototype.init = function() {
  this.questionEl.setAttribute('class', 'question');
  this.questionListEl.setAttribute('class', 'question-list');
  this.entrypoint.appendChild(this.questionListEl);
  this.entrypoint.appendChild(this.questionEl);
  this.showQuestionInput();
  this.updateQuestionList();
}

DecisionDOM.prototype.showQuestionInput = function() {
  var _this = this;
  var input = document.createElement('input');
  var saveBtn = document.createElement('button');
  input.setAttribute('type', 'text');
  saveBtn.setAttribute('type', 'button');
  saveBtn.appendChild(document.createTextNode('Add'));
  saveBtn.addEventListener('click', function(e) {
    _this.questions.add(input.value);
    _this.updateQuestionList();
    input.value = '';
  });
  this.questionEl.appendChild(input);
  this.questionEl.appendChild(saveBtn);
}

DecisionDOM.prototype.updateQuestionList = function() {
  this.questionListEl.innerHTML = '';
  var _this = this;
  var items = this.questions.questions.forEach(function(question) {
    var item = document.createElement('div');
    item.setAttribute('class', 'question-list-item');
    var itemText = document.createTextNode(question.question);
    item.appendChild(itemText);
    _this.questionListEl.appendChild(item);
  });
}
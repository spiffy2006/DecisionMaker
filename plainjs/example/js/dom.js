/**
 * This takes care of the interaction with the dom
 *  - inserts elements, creates elements, adds their event listeners, etc.
 *  - this will eventually be abstracted, but does what it needs to now and is small enough.
 * @param {HTMLElement} entrypoint This is the DOM element that will have things appended to it
 */
function DecisionDOM(entrypoint) {
  this.entrypoint = entrypoint;
  // create instance of the storage class to pass to the Questions class
  this.storage = new Storage();
  // create instance of questions class and pass the storage instance to it
  this.questions = new Questions(this.storage);
  // create a couple div elements and set them as a class properties, because they will be used in the class
  this.questionEl = document.createElement('div');
  this.questionListEl = document.createElement('div');
}

/**
 * Initializes the DOM with the starting DOM elements
 */
DecisionDOM.prototype.init = function() {
  // set some classes for our elements
  this.questionEl.setAttribute('class', 'question');
  this.questionListEl.setAttribute('class', 'question-list');
  // add our class elements to the entrypoint in the DOM
  this.entrypoint.appendChild(this.questionEl);
  this.entrypoint.appendChild(this.questionListEl);
  this.showQuestionInput();
  this.updateQuestionList();
}

/**
 * Generates and injects the question input and button with event listeners and whatnot
 */
DecisionDOM.prototype.showQuestionInput = function() {
  // _this is so any anonymous functions in the scope of this function can have access to the DecisionDOM class
  var _this = this;
  var input = document.createElement('input');
  var saveBtn = document.createElement('button');
  var saveQuestion = function() {
    _this.questions.add(input.value);
    _this.updateQuestionList();
    input.value = '';
  };
  input.setAttribute('type', 'text');
  saveBtn.setAttribute('type', 'button');
  saveBtn.appendChild(document.createTextNode('Add'));
  saveBtn.addEventListener('click', function(e) {
    saveQuestion();
  });
  input.addEventListener('keyup', function(e) {
    if (e.key === 'Enter'){
      saveQuestion();
    }
  });

  // append the input and save button to the questionEl element created in the constructor
  this.questionEl.appendChild(input);
  this.questionEl.appendChild(saveBtn);
}

/**
 * Adds all of the questions created to a list
 */
DecisionDOM.prototype.updateQuestionList = function() {
  // clear out all of the html that was there so there aren't duplicates
  // this is not efficient, but it can be changed later.
  this.questionListEl.innerHTML = '';
  // scope access to the class
  var _this = this;
  // loop through all of the questions saved and add them to the DOM
  this.questions.questions.forEach(function(question) {
    // create list item and append it to the questionListEl
    var item = document.createElement('div');
    item.setAttribute('class', 'question-list-item');
    var itemText = document.createTextNode(question.question);
    var itemDeleteButton = document.createElement('button');
    itemDeleteButton.setAttribute('class', 'question-list-item');
    itemDeleteButton.appendChild(document.createTextNode('X'));
    item.appendChild(itemDeleteButton);
    item.appendChild(itemText);
    _this.questionListEl.appendChild(item);

    itemDeleteButton.addEventListener('click', function(e) {
      _this.questions.remove(question);
      // alert(question.question);
      _this.updateQuestionList();
    });


  });
}

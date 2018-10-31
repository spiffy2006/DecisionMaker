// this is the first executed script so it has to go at the very bottom of all of the loaded scripts
(function() {
  // create an instance of the DecisionDOM
  // and pass in the "entrypoint" which is just document.body which is what our code will append elements to
  var decisionMaker = new DecisionDOM(document.body);
  decisionMaker.init();
})()

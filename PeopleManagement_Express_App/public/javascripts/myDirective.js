app.directive('helloDir', function() {
  return {
    template: 'Hello {{user.fName}} {{user.lName}}'
  };
});

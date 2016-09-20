require(['settings'], function(settings) {

  settings.sync('featured-categories', $('#featured-categories'));

  $('#save').click( function (event) {
    function checkIfAllElementsUnique() {
      function checkIfUnique(selectElement) {
        var count = 0;
        for(var i = 0; i <= $('#featured-categories select option:selected').length; i++) {
          if ($($('#featured-categories select option:selected')[i]).val() == $(selectElement).val()) {
            count++;
          }
        }
        if(count > 1) {
          return false;
        }
        return true;
      }
      var count = 0;
      for(var i = 0; i <= $('#featured-categories select').length; i++) {
        if(checkIfUnique($('#featured-categories select')[i]) == false) {
          count++;
        }
      }
      if(count > 1) {
        return false;
      }
      return true;
    }

    if(checkIfAllElementsUnique() == true) {
      event.preventDefault();
      settings.persist('featured-categories', $('#featured-categories'), function(){
        socket.emit('admin.settings.syncfeaturedCategories');
      });
    } else {
      event.preventDefault();
      bootbox.alert("There should not be duplicate categories.");
    }
  });
});
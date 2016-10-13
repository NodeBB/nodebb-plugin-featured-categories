function getCategories() {
  $.getJSON(config.relative_path + '/api/categories', function(data) {
    var html = '';
    for(var i = 0; i < data.categories.length; i++) {
      html += '<option data-id="' + data.categories[i].cid + '" value="' + data.categories[i].cid + '">' + data.categories[i].name + '</option>';
      if(data.categories[i].children.length) {
        for(var j = 0; j < data.categories[i].children.length; j++) {
          html += '<option data-id="' + data.categories[i].children[j].cid + '" value="' + data.categories[i].children[j].cid + '"> ' + data.categories[i].name + ' > ' + data.categories[i].children[j].name + '</option>';
        }
      }
    }
    $("#category_1_select, #category_2_select, #category_3_select, #category_4_select").html(html);
    $("#category_1_select :selected, #category_2_select :selected, #category_3_select :selected, #category_4_select :selected").each(function() {
      $(this).select($(this).parent().parent().find($("input[type=text]")).val());
    });
    $("select").change(function() {
      $("#category_1_select :selected, #category_2_select :selected, #category_3_select :selected, #category_4_select :selected").each(function() {
        checkSelect($(this));
      });
    });
    function checkSelect(element) {
      element.parent().parent().find($("input[type=text]")).val(element.data("id"));
    }
    socket.emit('admin.featuredCategories.getFeatured', {}, function (err, data) {
      var category_1_option = '#category_1_select option[value=' + data.info.category_1 + ']',
      category_2_option = '#category_2_select option[value=' + data.info.category_2 + ']',
      category_3_option = '#category_3_select option[value=' + data.info.category_3 + ']',
      category_4_option = '#category_4_select option[value=' + data.info.category_4 + ']';
      if($(category_1_option).length) {
        $('#category_1_select').val(data.info.category_1);
      }
      if($(category_2_option).length) {
        $('#category_2_select').val(data.info.category_2);
      }
      if($(category_3_option).length) {
        $('#category_3_select').val(data.info.category_3);
      }
      if($(category_4_option).length) {
        $('#category_4_select').val(data.info.category_4);
      }
    });
  });
}


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
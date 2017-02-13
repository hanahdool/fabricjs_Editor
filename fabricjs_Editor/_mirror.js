/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {

  console.log("_mirror.js load");


  $('#mirror .checkbox').on('click', function(e) {
    if (e.target.checked) {
      $('#mirror .settings').show();
    } else {
      $('#mirror .settings').hide();
    }

  });

});


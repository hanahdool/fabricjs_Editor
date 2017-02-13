/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {

  console.log("_shadow.js load");


  /* 그림자 */
  $('#shadow #blur_range, #shadow #blur_number').on("input change", function(e) {
    set_attr_attr_active('shadow', 'blur', e.target.value);
    canvas.renderAll();
  });
  $('#shadow #offsetX_range, #shadow #offsetX_number').on("input change", function(e) {
    set_attr_attr_active('shadow', 'offsetX', e.target.value);
    canvas.renderAll();
  });
  $('#shadow #offsetY_range, #shadow #offsetY_number').on("input change", function(e) {
    set_attr_attr_active('shadow', 'offsetY', e.target.value);
    canvas.renderAll();
  });

//  $('#shadow #opacity_range, #shadow #opacity_number').on("input change", function(e) {
////    canvas.getActiveObject().shadow.color = e.target.value;
//    var active = canvas.getActiveObject();
////    active.shadow.color = (active.shadow.color).replace(//);
//    // rgba()일 수도, #ffffff 일 수도..  다 변환해가면서 해야하나?ㅜㅜㅜㅜㅜㅜ 255 <-> 16진수 ㅜㅜㅜㅜ
//
//    canvas.renderAll();
//  });

  $('#shadow #color').on("input change", function(e) {
    set_attr_attr_active('shadow', 'color', e.target.value);
//    canvas.getActiveObject().shadow.color = e.target.value;
    canvas.renderAll();
  });








  var init_shadow = {
    blur: 5,
    offsetX: 10,
    offsetY: 10,
    opacity: 100,
    color: '#333333'
  };

  $('#shadow .checkbox').on('click', function(e) {
    if (e.target.checked) {
      $('#shadow .settings').show();
      var blur = 5, offsetX = 10, offsetY = 10, opacity = 100, color = "#333333";
      set_shadow_html(blur, offsetX, offsetY, opacity, color);
      set_shadow_active(blur, offsetX, offsetY, opacity, color);
    } else {
      $('#shadow .settings').hide();
      unset_shadow_active();
    }
    canvas.renderAll();
  });

});



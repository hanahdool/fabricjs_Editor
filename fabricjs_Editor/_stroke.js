/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {

  console.log("_stroke.js load");

  /* 테두리 */
  $('#stroke .range, #stroke .number').on("input change", function(e) {
    set_attribute_active('strokeWidth', parseInt(e.target.value));
//    canvas.getActiveObject().strokeWidth = parseInt(e.target.value);
    canvas.renderAll();
  });

  $('#stroke .color').on("input change", function(e) {
    set_attribute_active('stroke', e.target.value);
//    canvas.getActiveObject().set('stroke', e.target.value);
    canvas.renderAll();
  });




  $('#stroke #stroke_style').on("change", function(e) {
    set_attribute_active('strokeDashArray', stroke_dash_ary[ e.target.value ]);
//    canvas.getActiveObject().set("strokeDashArray", stroke_dash_ary[ e.target.value ]);
    canvas.renderAll();
  });













  var init_stroke = {
    style: 0,
    width: 2,
    color: '#000000'
  };

  $('#stroke .checkbox').on('click', function(e) {
    if (e.target.checked) {
      $('#stroke .settings').show();
      var style = 0, width = 2, color = "#000000";
      set_stroke_html(style, width, color);
      set_stroke_active(style, width, color);
    } else {
      $('#stroke .settings').hide();
      unset_stroke_active();
    }
    canvas.renderAll();
  });
});



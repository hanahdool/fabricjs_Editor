/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {

  console.log("_fill.js load");

  /* 채우기 */
  $('#fill .opacity_range, #fill .opacity_number').on("input change", function(e) {
    set_attribute_active('opacity', e.target.value * 0.01);
    canvas.renderAll();
  });

  $('#fill .color').on("input change", function(e) {
    set_attribute_active('fill', e.target.value);
    canvas.renderAll();
  });

//  no_fill_btn
  $('#fill #no_fill_btn').on("click", function(e) {
    set_attribute_active('fill');
    canvas.renderAll();
  });

});

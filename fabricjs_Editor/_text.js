/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {

  console.log("_text.js load");

  /* 부분적용 가능
   * 참고 https://jsfiddle.net/4nzygs8a/
   * */

  var text_style_ary = ["Helvetica", "Cursive", "Comic Sans", "Delicious", "Hoefler Text", "Impact"];

  $('#textStyle').on("change", function(e) {
    set_attribute_active_forText('fontFamily', text_style_ary[e.target.value]);
    canvas.renderAll();
  });


// 색깔
//  var textColor = document.getElementById("textColor");
//  textColor.addEventListener("input", function() {
//    canvas.getActiveObject().setColor(textColor.value);
//    canvas.renderAll();
//  });
  $('#textColor').on('input', function(e) {
    set_attribute_active_forText('fill', e.target.value);
    canvas.renderAll();
  });

// 글씨배경 색깔
  $('#textBackgroundColor').on('input', function(e) {
    set_attribute_active_forText('textBackgroundColor', e.target.value);
    canvas.renderAll();
  });

// 글자 크기
  $('#textSize').on('input', function(e) {
    set_attribute_active_forText('fontSize', e.target.value);
    canvas.renderAll();
  });

// 글자 테두리 - 색깔 -xxxxxxxxxxxx
  $('#textStrokeColor').on('input', function(e) {
    var val = e.target.value, active = canvas.getActiveObject();
    if (active.setSelectionStyles && active.isEditing) active.setSelectionStyles({ stroke: val }).setCoords();
    else active.setStroke(val).setCoords(); // active.stroke = val; //_setStrokeStyles
    canvas.renderAll();
  });

// 글자 테두리 - 두께 -xxxxxxxxxxxx
  $('#textStrokeWidth').on('input', function(e) {
    var val = e.target.value, active = canvas.getActiveObject();
    console.log(e.target.value);
    if (active.setSelectionStyles && active.isEditing) active.setSelectionStyles({ strokeWidth: val }).setCoords();
    else active.setStrokeWidth(val).setCoords(); // active.strokeWidth = val; //_setStrokeStyles
    canvas.renderAll();
  });



// 스타일
//  function fontWeight_bold() {
//    var text = canvas.getActiveObject();
//    if (text.setSelectionStyles && text.isEditing) text.setSelectionStyles({ fontWeight: (text.getSelectionStyles().fontWeight == "bold") ? "normal" : "bold" }).setCoords();
//    else text.setFontWeight((text.fontWeight == "bold") ? "normal" : "bold").setCoords(); // text.fontWeight = (text.fontWeight == "bold") ? "normal" : "bold";
////    set_attribute_active_forText('fontWeight', );
//    canvas.renderAll();
//  }
  $('#text #bold').on('click', function(e) {
    if (e.target.getAttribute('checking') == "true") { // $(e.target).attr('checking')
      set_attribute_active_forText('fontWeight', 'normal');
      e.target.setAttribute('checking', 'false')
    } else {
      set_attribute_active_forText('fontWeight', 'bold');
      e.target.setAttribute('checking', 'true');
    }
    canvas.renderAll();
  });

//  function fontStyle_italic() { //"oblique", "normal", ""
//    var text = canvas.getActiveObject();
//    if (text.setSelectionStyles && text.isEditing) text.setSelectionStyles({ fontStyle: (text.getSelectionStyles().fontWeight == "italic") ? "normal" : "italic" }).setCoords();
//    else text.setFontStyle((text.fontStyle == "italic") ? "normal" : "italic").setCoords(); // text.fontStyle = (text.fontStyle == "italic") ? "normal" : "italic"; //_setStrokeStyles
//    canvas.renderAll();
//  } // fontStyle에도 bold가 있나??
  $('#text #italic').on('click', function(e) {
    if (e.target.getAttribute('checking') == "true") {
      set_attribute_active_forText('fontStyle', 'normal');
      e.target.setAttribute('checking', 'false')
    } else {
      set_attribute_active_forText('fontStyle', 'italic');
      e.target.setAttribute('checking', 'true');
    }
    canvas.renderAll();
  });


// 라인

  $('#text #underLine').on('click', function(e) {
    if (e.target.getAttribute('checking') == "true") {
      set_attribute_active_forText('textDecoration', '');
      e.target.setAttribute('checking', 'false')
    } else {
      set_attribute_active_forText('textDecoration', 'underline');
      $('#text .text_line').attr('checking', 'false'); // 일단 line들 다 false 만들어줘야 함!
      e.target.setAttribute('checking', 'true');
    }
    canvas.renderAll();
  });

  $('#text #middleLine').on('click', function(e) {
    if (e.target.getAttribute('checking') == "true") {
      set_attribute_active_forText('textDecoration', '');
      e.target.setAttribute('checking', 'false')
    } else {
      set_attribute_active_forText('textDecoration', 'line-through');
      $('#text .text_line').attr('checking', 'false'); // 일단 line들 다 false 만들어줘야 함!
      e.target.setAttribute('checking', 'true');
    }
    canvas.renderAll();
  });

  $('#text #overLine').on('click', function(e) {
    if (e.target.getAttribute('checking') == "true") {
      set_attribute_active_forText('textDecoration', '');
      e.target.setAttribute('checking', 'false')
    } else {
      set_attribute_active_forText('textDecoration', 'overline');
      $('#text .text_line').attr('checking', 'false'); // 일단 line들 다 false 만들어줘야 함!
      e.target.setAttribute('checking', 'true');
    }
    canvas.renderAll();

  });




  /* 부분적용 불가능 */

// 전체배경 색깔
  $('#text #backgroundColor').on('input', function(e) {
    set_attribute_active('backgroundColor', e.target.value);
    canvas.renderAll();
  });

// 정렬 - 부분적용 안됨
  $('#text #left').on('click', function() {
    set_attribute_active('textAlign', 'left');
    canvas.renderAll();
  });

  $('#text #center').on('click', function() {
    set_attribute_active('textAlign', 'center');
    canvas.renderAll();
  });

  $('#text #right').on('click', function() {
    set_attribute_active('textAlign', 'right');
    canvas.renderAll();
  });



  $('#lineHeight').on('input', function(e) {
    set_attribute_active('lineHeight', e.target.value);
    canvas.renderAll();
  });

  $('#padding').on('input', function(e) { // 이거 필요 없는 듯!! - xxxxxxxxxxxxxxxxxxxx
    set_attribute_active('padding', e.target.value);
    canvas.renderAll();
  });



  $('#text #pattern').on('click', function() {
    fabric.util.loadImage('image/pattern.png', function(img) {
      canvas.getActiveObject().fill = new fabric.Pattern({
        source: img,
        repeat: 'repeat'
      });
      canvas.renderAll();
    });
  });

});

/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {

  console.log("_wordArt.js load");


  ////////////////// 나중에 지울 부분? /////////////////////////////
  var CurvedText = new fabric.CurvedText('aaaaaaaaa',{
//        width: 100,
//        height: 20,
    left: 400,
    top: 350,
    textAlign: 'center',
    fill: '#0000FF',
    radius: 200,
    fontSize: 50,
    spacing: 20,
    angle: 0
//        fontFamily: 'Arial'
  });
  canvas.add(CurvedText).renderAll();
//  canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));


  ////////////////// 나중에 지울 부분? /////////////////////////////

  $('#text_input').keyup(function(){
    var obj = canvas.getActiveObject();
    if (obj) {
      obj.setText(this.value);
      canvas.renderAll();
    }
  });
  $('#reverse').click(function(){
    var obj = canvas.getActiveObject();
    if (obj) {
      obj.set('reverse',$(this).is(':checked'));
      canvas.renderAll();
    }
  });

//  $('#radius, #spacing, #fill').change(function(){
//    var obj = canvas.getActiveObject();
//    if(obj){
//      var angle = obj.get('angle');
//      obj.set('angle', 0);
//      obj.set($(this).attr('id'),$(this).val());
//      obj.set('angle', angle);
//    }
//    canvas.renderAll();
//  });

  $('#radius').on('input', function(e) {
    canvas.getActiveObject().setRadius(e.target.value);
    canvas.renderAll();
  });

  $('#spacing').on('input', function(e) {
    canvas.getActiveObject().setSpacing(e.target.value);
    canvas.renderAll();
  });

  $('#angle').on('input', function(e) {
    canvas.getActiveObject().setAngle(e.target.value); // $(this).val()
    canvas.renderAll();
  });

//  $('#fill').change(function(){ // 중복
//    var obj = canvas.getActiveObject();
//    if(obj){
//      obj.setFill($(this).val());
//    }
//    canvas.renderAll();
//  });

  $('#convert').click(function(){
    var props = {};
    var obj = canvas.getActiveObject();
    if (obj) {
      var default_text = obj.getText();
      if (/curvedText/.test(obj.type)) {
//        default_text = obj.getText();
        props = obj.toObject();
        delete props['type'];
        var textSample = new fabric.Text(default_text, props);
      } else if (/text/.test(obj.type)) {
//        default_text = obj.getText();
        props = obj.toObject();
        delete props['type'];
        props['textAlign'] = 'center';
        props['radius'] = 50;
        props['spacing'] = 20;
        var textSample = new fabric.CurvedText(default_text, props);
      }
      canvas.remove(obj);
      canvas.add(textSample).renderAll();
      canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));
    }
  });
//  });


});




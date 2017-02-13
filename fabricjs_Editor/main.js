/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {
  console.log("main.js load");




// textbox, IText
  var text = new fabric.IText('가나다라마바사\nMARPPLE\n123450\npattern text', {
    fontSize: 50,
    left: 100,
    top: 100,
    fill: "#000000",
    lineHeight: 1,
    originX: 'left',
    fontFamily: 'Helvetica',   // "Cursive"
    fontWeight: 'bold',
    statefullCache: true
  });
  text.setShadow({
    color:'#999999',//"rgba(255,0,0,0.3)",
    blur: 5, // 주로 0 ~ 20
    offsetX: 5, // 주로 0.00001 ? ~ 20
    offsetY: 5
  });
  canvas.add(text);

// 텍스트 추가
  function createText() {
    var text = new fabric.IText('글씨를 입력해주세요.', {
      fontSize: 50,
      left: 250,
      top: 150,
      lineHeight: 1,
      originX: 'left',
      fontFamily: 'Helvetica',   // "Cursive"
      fontWeight: 'bold',
      statefullCache: true,
    });
    text.globalCompositeOperation = "source-atop";
    canvas.add(text);
  }

  function createCurvedText() {
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

  }

// 사각형 추가
  var rect = new fabric.Rect({
    width: 100,
    height: 100,
    top: 400,
    left: 100,
    fill: '#9999ff',//'rgba(150, 150, 255, 1)',
    // opacity: 1, // default


    stroke: "#000000",
    strokeWidth: 3,
//    strokeLineCap: "square", // "buff" "round" "square"  이 두개는 뭔지 모르겠음
//    strokeLineCap: "square", // "buff" "round" "square"  이 두개는 뭔지 모르겠음a
//    strokeLineJoin: "bevil", // "bevil" "round" "miter"

  });

  rect.setShadow({
    color: '#555555',//"rgba(0,0,0,0.5)", // 그림자의 불투명도는 적당히 fix 시켜두기? 바꿀때마다.. fix가 되나? - fix 안됨 1로됨 ㅜㅜ// 불투명도 0 ~ 100
    blur: 10, // 0 ~ 100
    offsetX: 10, // -50 ~ 50
    offsetY: 10
  });
  canvas.add(rect);








  canvas.on({
    'selection:cleared': onDeSelected,
    'object:selected': onSelected,

    'object:rotating': rotating,
    'object:scaling': scaling,
    'object:moving': moving,

    'object:modified': obj_modified,

  });

  canvas.oncontextmenu = function(e) {

  }

  function obj_modified(e) {
    moving(e);
  }

  function rotating(e) {
    $('#alignment #angle_range, #alignment #angle_number').val(e.target.angle);
    console.log("moving!", e.target.left, e.target.top, ", originX : ",e.target.originX, "!!!!");
    //moving(e);
  }
  function scaling(e) {
    $('#alignment #width_range, #alignment #width_number').val(e.target.width * e.target.scaleX);
    $('#alignment #height_range, #alignment #height_number').val(e.target.height * e.target.scaleY);
  }
  function moving(e) {
    $('#alignment #left_range, #alignment #left_number').val(e.target.left);
    $('#alignment #top_range, #alignment #top_number').val(e.target.top);
  }


  var obj; // 어딘가에서 쓰여서 밖으로 뺀 거였는데 ㅜㅜ..
  function onSelected() {
    obj = canvas.getActiveObject() || canvas.getActiveGroup();
    if (!obj) return;


    // 정렬
    set_angle_html(obj.angle);
    set_left_html(obj.left);
    set_top_html(obj.top);
    set_width_html(obj.width);
    set_height_html(obj.height);


    // 채우기
    set_fill_html(obj.fill, obj.opacity * 100);

    // 테두리
    if (obj.stroke) {
      set_stroke_html(_.findKey(stroke_dash_ary, obj.strokeDashArray), obj.strokeWidth, obj.stroke); // style, width, color
      $('#stroke .settings').show();
      $('#stroke .checkbox').prop("checked", true);
    } else {
      $('#stroke .checkbox').prop("checked", false);
      $('#stroke .settings').hide();
    }

    // 그림자
    if (obj.shadow) {
      var o = obj.shadow;
      set_shadow_html(o.blur, o.offsetX, o.offsetY, o.color); // blur, offsetX, offsetY, color
      $('#shadow .settings').show();
      $('#shadow .checkbox').prop("checked", true);
    } else {
      $('#shadow .checkbox').prop("checked", false);
      $('#shadow .settings').hide();
    }

    // 반사


    if (obj.type == 'curvedText') {
      $('#wordArt').show();
    } else {
      $('#wordArt').hide();
    }

    if (obj.type == 'curvedText' || obj.type == 'i-text') {
      $('#text').show();
    } else {
      $('#text').hide();
    }

    /*
     $('#text_input').val(obj.getText());
     $('#reverse').prop('checked', obj.get('reverse'));
     $('#radius').val(obj.get('radius'));
     $('#angle').val(obj.get('angle'));
     $('#spacing').val(obj.get('spacing'));
     */
//    $('#fill').val(obj.getFill());
  }


  function onDeSelected(){ // 아무것도 안눌렸을 때 - 아예 다 감춰야 하나?
    $('.checkbox').prop("checked", false);
    $('.settings').hide();
    $('#wordArt').hide();
    $('#text').hide();

//    $('#basic').hide();
//    $('#editor').hide();

    /*
     $('#text_input').val('');
     $('#reverse').prop('checked', false);
     $('#angle').val(obj.get(0));
     $('#radius').val(50);
     $('#spacing').val(20);
     */
//    $('#fill').val('#0000FF');
  }




// 정렬
  synchronization('#alignment #angle_range', '#alignment #angle_number');
  synchronization('#alignment #left_range', '#alignment #left_number');
  synchronization('#alignment #top_range', '#alignment #top_number');
  synchronization('#alignment #width_range', '#alignment #width_number');
  synchronization('#alignment #height_range', '#alignment #height_number');

// 채우기
  synchronization('#fill .opacity_range', '#fill .opacity_number');

// 테두리
  synchronization('#stroke .range', '#stroke .number');

// 그림자
  synchronization('#shadow #blur_range', '#shadow #blur_number');
  synchronization('#shadow #offsetX_range', '#shadow #offsetX_number');
  synchronization('#shadow #offsetY_range', '#shadow #offsetY_number');
  synchronization('#shadow #opacity_range', '#shadow #opacity_number');

// 반사
  synchronization('#mirror .range', '#mirror .number');

  function synchronization(a, b) {
    $(a).on("input change", function(e) {
      $(b).val(e.target.value);
    });
    $(b).on("input change", function(e) {
      $(a).val(e.target.value);
    });
  }



});


/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {
  console.log("_add_object.js load");


  /* 이벤트 */

// 도형 추가
  $('#add_rect').on('click', function() {
    var rect = new fabric.Rect({
      width: 100,
      height: 100,
      top: 100,
      left: 100,
      fill: 'rgba(100, 100, 255, 1)'
    });
    canvas.add(rect).setActiveObject(rect).renderAll();
  });
  $('#add_triangle').on('click', function() {
    var triangle = new fabric.Triangle({
      width: 120,
      height: 100,
      top: 100,
      left: 100,
      fill: 'rgba(255, 100, 100, 1)'
    });
    canvas.add(triangle).setActiveObject(triangle).renderAll();
  });
  $('#add_circle').on('click', function() {
    var circle = new fabric.Circle({
      top: 100,
      left: 100,
      radius: 70,
      fill: 'rgba(255, 255, 100, 1)'
    });
    canvas.add(circle).setActiveObject(circle).renderAll();
  });

  $('#add_text').on('click', function() { // createText() 함수와 동
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
    //text.globalCompositeOperation = "source-atop"; // 이거 왜 한거더라..
    canvas.add(text).setActiveObject(text).renderAll();
  });

  $('#add_wordArt').on('click', function() {
    var CurvedText = new fabric.CurvedText('aaaaaaaaa',{
//        width: 100,
//        height: 20,
      left: 300,
      top: 250,
      textAlign: 'center',
      //fill: '#0000FF',
      radius: 200,
      fontSize: 50,
      spacing: 20,
      angle: 0
//        fontFamily: 'Arial'
    });
    canvas.add(CurvedText).setActiveObject(CurvedText).renderAll();
//  canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));

  });

  $('#add_image').on('click', function() {


    //addImage('image/background.png', 400, 100);
    addImage('image/monoon.png', 400, 100);

/*
    fabric.Image.fromURL('image/background.png', function(img) {
      img.set({
        left: 220,
        top: 270,
//        lockScalingFlip: true // 이거 하면 상하, 좌우 반전 안됨 +  크기 더 못작아짐
      });
      //img.globalCompositeOperation = "source-atop"; // 이것땜에 그룹묶으면 안보여 ㅜㅜ
//      img.globalCompositeOperation = "lighter"; // 이것땜에 그룹묶으면 안보여 ㅜㅜ
//      img.center(); img.setCoords(); // 이건 왜 안먹지

      canvas.add(img).setActiveObject(img).renderAll();
    });
 */

  });
  function addImage(src, x, y) {

    /* 원본 */
    fabric.Image.fromURL(src, function(origin) { // fabric image 객체

      /* cropped */
      var tmp = { // crop 정보
        top: 0,
        left: 0,
        width: origin.width,
        height: origin.height,
        //        multiplier: 2 // scale
//        flipX: false,
//        flipY: false
      };
      fabric.Image.fromURL(origin.toDataURL(tmp), function(cropped) {
        cropped.set({
          left: x,
          top: y,
          lockScalingFlip: true,
//          flipX: origin.flipX,
//          flipY: origin.flipY,
          /*, angle:origin.angle */
        });
        canvas.add(cropped).setActiveObject(cropped);
        cropped._data.crop_info = tmp;
        cropped._data.crop_info.index = canvas.getObjects().indexOf(cropped);

        /* cropper */
        var cropper = new fabric.Rect({
          top: cropped.top,
          left: cropped.left,
          width: cropped.width,
          height: cropped.height,
          fill: 'rgba(100, 100, 100, 0.2)',
//          fill: 'rgba(0,0,0,0)',
//          scaleX: img.scaleX,
//          scaleY: img.scaleY,
          borderColor: 'black',
          cornerColor: 'black',
          cornerSize: 8,
          borderDashArray: [5, 5],
          transparentCorners: false,
          hasRotatingPoint: false,
          globalCompositeOperation: 'lighter'
        });

        cropped._data.origin = origin;
        cropped._data.cropper = cropper;


      });


    }); // 이미지 로드(+ 콜백) 끝

  } // add Image 함수 끝






});


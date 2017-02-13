/**
 * Created by marpple on 2017. 2. 10..
 */

$(function() {

  $('#image #cropMode_btn').on('click', function() {
    cropMode();
  });

  $('#image #crop_btn').on('click', function() {
    crop()
  });

  $('#image #cropCancel_btn').on('click', function() {
    cancelCrop();
  });

/*
  $('#image #initialize_btn').on('click', function() {
    initialize();
  });
*/

  function crop() {
    console.log("crop!");

    var cropper = canvas.getActiveObject();
    var origin = cropper._data.origin;
    var cropped = cropper._data.cropped;
    var sX = cropped.scaleX, sY = cropped.scaleY; // 나중에 더 깔끔하게 없애버리기

    origin.set({
      angle: 0, // crop할 때에는 다시 원위치로 시켜줘야 pattern이 이 origin 사용해서 알아서 잘 매핑함
      scaleX: sX,
      scaleY: sY,
//      flipX: cropped.flipX,
//      flipY: cropped.flipY,

    }); // 안해주면 패턴 씌울 때 기운 채로 매핑됨. (각도*2) 만큼

    // cropper 세팅
    cropper.set({
      width: cropper.width * cropper.scaleX, //this.width * this.scaleX
      height: cropper.height * cropper.scaleY,
      scaleX: 1,
      scaleY: 1
    });

    canvas.remove(cropped); //cropped = null;



    // origin 크기 원래대로 되돌려 놓고, left, top 등등 계산해서 crop한 다음 다시 돌려놓기?
    origin.scaleX = 1, origin.scaleY = 1; // angle은 0인 상태인데..

    var np = rotational_displacement({ x: cropper.left, y: cropper.top}, -cropper.angle, { x: origin.left, y: origin.top});
    var crop_info = {
//      top: (np.y - origin.top),
//      left: np.x - origin.left,
      top: (np.y - origin.top) / sY,
      left:(np.x - origin.left) / sX,
      width: cropper.width / cropped.scaleX, // 이건 맞는것 같음
      height: cropper.height / cropped.scaleY
    };

    fabric.Image.fromURL(origin.toDataURL(crop_info), function(cropped) {
      cropped.set({
        left: cropper.left,
        top: cropper.top,
        angle: cropper.angle,
        lockScalingFlip: true,
//        flipX: origin.flipX,
//        flipY: origin.flipY,
        scaleX: sX,
        scaleY: sY,
        width: cropper.width/sX, // width*sX = cropper.width // width = cropper.width/sX
        height: cropper.height/sY
      });
//      canvas.add(cropped).setActiveObject(cropped);
      canvas.insertAt(cropped, cropper._data.crop_info.index, false).setActiveObject(cropped); // obj, num, nonSplicing

      origin.scaleX = sX;
      origin.scaleY = sY;


      cropped._data.cropper = cropper;
      cropped._data.origin = origin;

      // 추가

      crop_info.index = cropper._data.crop_info.index;
      cropped._data.crop_info = crop_info;


      canvas.remove(cropper);
      canvas.remove(origin);
      canvas.setActiveObject(cropped);
      canvas.renderAll();

      console.log("crop 완료!");

    }) // 이미지 잘라서 가져오기 끝

  }


  function cropMode() {
    console.log("crop mode!");


    var cropped = canvas.getActiveObject();


    var origin = cropped._data.origin;
    var cropper = cropped._data.cropper;
    var crop_info = cropped._data.crop_info;
//    crop_info.index = canvas.getObjects().indexOf(cropped);

    canvas.remove(cropped);


    var np = rotational_displacement({ x: cropped.left - crop_info.left * cropped.scaleX, y: cropped.top - crop_info.top * cropped.scaleY }, (cropped.angle - origin.angle), { x: cropped.left, y: cropped.top });

    origin.set({
      left: np.x,
      top: np.y,
      scaleX: cropped.scaleX,
      scaleY: cropped.scaleY,
      angle: cropped.angle,
    });

    cropper.set({
      top: cropped.top,
      left: cropped.left,
      width: cropped.width, // 여기는 상관x. 어짜피 다시 셋팅해줄 거니까
      height: cropped.height,
      scaleX: cropped.scaleX,
      scaleY: cropped.scaleY,

      angle: cropped.angle // 왜 안먹지?
    });


    if (crop_info.flipX) {
      console.log("좌우 뒤집힌 상태!");
      var angle = cropper.angle;

      cropper.angle = 0;
      var op = rotational_displacement({ x: origin.left, y: origin.top }, -angle, { x: cropper.left, y: cropper.top });
      origin.left = op.x; origin.top = op.y; origin.angle = 0;

      origin.left = cropper.left - ((origin.left+origin.width*origin.scaleX) - (cropper.left+cropper.width*cropper.scaleX));

      op = rotational_displacement({ x: origin.left, y: origin.top }, angle, { x: cropper.left, y: cropper.top });
      origin.left = op.x; origin.top = op.y;

      origin.angle = angle;
      cropper.angle = angle;
    }

    if (crop_info.flipY) {
      console.log("위아래 뒤집힌 상태!");

      var angle = cropper.angle;

      cropper.angle = 0;
      var op = rotational_displacement({ x: origin.left, y: origin.top }, -angle, { x: cropper.left, y: cropper.top });
      origin.left = op.x; origin.top = op.y; origin.angle = 0;

      origin.top = cropper.top - ((origin.top+origin.height*origin.scaleY) - (cropper.top+cropper.height*cropper.scaleY));

      op = rotational_displacement({ x: origin.left, y: origin.top }, angle, { x: cropper.left, y: cropper.top });
      origin.left = op.x; origin.top = op.y;

      origin.angle = angle;
      cropper.angle = angle;
    }

    cropper._data.cropped = cropped;
    cropper._data.origin = origin;
    cropper._data.crop_info = crop_info;

    canvas.add(origin);
    canvas.add(cropper);
    canvas.setActiveObject(cropper);
    canvas.renderAll();

  }




  function rotational_displacement(point, angle, center) { // 이동할 점, 각도, 중심점
    // 점center를 중심으로 점point를 angle만큼 회전시킨 결과를 리턴
    if (!center) center = { x: 0, y: 0 }; // 아니면 캔버스의 중심으로?
    angle = Math.PI/180*angle;

    return {
      x: (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle) + center.x,
      y: (point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle) + center.y
    }
  }


  /*
   function initialize() { // 이미지 처음 가져올 때랑 똑같음! - cropper 설정하고, flip, angle값만 바꾸고 다시 크롭!?!!!
   console.log("이미지 원상태로 복구이미지 원상태로 복구!");
   var cropped = canvas.getActiveObject();
   // 첨에 addImage하는거랑 똑같음!
   }
   */

  function cancelCrop() {
    console.log("crop 취소!");

    var cropper = canvas.getActiveObject();
    var origin = cropper._data.origin;
    var cropped = cropper._data.cropped;

    canvas.remove(cropper);
    canvas.remove(origin);
    canvas.add(cropped);
    canvas.setActiveObject(cropped);

  }





















  /* flipX, flipY
   1. 그룹, 그룹객체 처리하기
   2. 정렬 부분으로 옮기기

   기능 함수로 분리 해야하나.....?

   */

  $('#image #flipX_btn').on('click', function() {
    console.log('flipX');
    var active = canvas.getActiveObject();
    if (!active) return;
    set_attribute_active('flipX', active.flipX ? false : true);

    if (active.type == 'image') { // 자를수 있는 경우 - crop 정보도 같이 수정
      var origin = active._data.origin, crop_info = active._data.crop_info;
      origin.flipX = origin.flipX ? false : true;
      crop_info.flipX = crop_info.flipX ? false : true;
//    active._data.crop_info.flipX = origin.flipX; // 이렇게 하면 안되요!
    }

    return canvas.renderAll();
  });

  $('#image #flipY_btn').on('click', function() {
    console.log('flipY');
    var active = canvas.getActiveObject();
    if (!active) return;
    set_attribute_active('flipY', active.flipY ? false : true);

    if (active.type == 'image') {
      var origin = active._data.origin, crop_info = active._data.crop_info;
      origin.flipY = origin.flipY ? false: true;
      crop_info.flipY = crop_info.flipY ? false : true;
    }

    return canvas.renderAll();
  });



});




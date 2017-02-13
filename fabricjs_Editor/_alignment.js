/**
 * Created by marpple on 2017. 2. 6..
 */

$(function() {

  console.log("_alignment.js load");

  $('#alignment #angle_range, #alignment #angle_number').on('input change', function(e) { // 이 상 해 ㅜㅜㅜㅜ

    var active = (canvas.getActiveObject() || canvas.getActiveGroup());
    active.originX = active.originY = "center"; // 그럼 center의 값 다시 지정해줘야 함
    active.left = ((active.oCoords.mt.x + active.oCoords.mb.x)/2); active.top = ((active.oCoords.mt.y + active.oCoords.mb.y)/2);
    active.angle = parseInt(e.target.value);

//    canvas.renderAll();


//    active.originX = "left"; active.originY = "top";
//    active.left = active.oCoords.tl.x; active.top = active.oCoords.tl.y;
    // dom에 위치 update
//    $('#left_range, #left_number').val(parseInt(active.left));
    $('#top_range, #top_number').val(parseInt(active.top));

//    active.setCoords(); // 뭐얔ㅋㅋㅋㅋㅋㅋㅋㅋㅋ
    canvas.renderAll();
  });
  $('#left_range, #left_number').on('input change', function(e) {
    (canvas.getActiveObject() || canvas.getActiveGroup()).left = parseInt(e.target.value);
    canvas.renderAll();
  });
  $('#top_range, #top_number').on('input change', function(e) {
    (canvas.getActiveObject() || canvas.getActiveGroup()).top = parseInt(e.target.value);
    canvas.renderAll();
  });
  $('#width_range, #width_number').on('input change', function(e) { // scale로 할 것, 보여줄 때는 당연 계산된 값.
    var active = canvas.getActiveObject();
    active.scaleX = parseInt(e.target.value) / active.width;
    canvas.renderAll();
  });
  $('#height_range, #height_number').on('input change', function(e) {
    var active = canvas.getActiveObject();
    active.scaleY = parseInt(e.target.value) / active.height;
    canvas.renderAll();
  });



  // 정렬 상단 버튼들

  // canvas.renderAll() 안해도 되나?
  $('#alignment #bringBack').on('click', function() {
    (canvas.getActiveObject() || canvas.getActiveGroup()).sendBackwards();
  });
  $('#alignment #bringFront').on('click', function() {
    (canvas.getActiveObject() || canvas.getActiveGroup()).bringForward();
  });
  $('#alignment #bringVeryBack').on('click', function() {
    (canvas.getActiveObject() || canvas.getActiveGroup()).sendToBack();
  });
  $('#alignment #bringVeryFront').on('click', function() {
    (canvas.getActiveObject() || canvas.getActiveGroup()).bringForward();
  });


  $('#alignment #group_btn').on('click', function() {
    grouping();
  });

  $('#alignment #ungroup_btn').on('click', function() {
    ungrouping();
  });



  function grouping() {
//    var activegroup = canvas.getActiveGroup();
//    if (!activegroup) return;
//    var objectsInGroup = activegroup.getObjects();
//    activegroup.clone(function(newgroup) { // clone하는 부분에서 문제가 발생하는 듯!
//      canvas.discardActiveGroup();
//      objectsInGroup.forEach(function(object) {
//        canvas.remove(object);
//      });
////      newgroup._objects.forEach(function(o) {
//      newgroup.getObjects().forEach(function(o) {
//        console.log("돌긴 하나", o.globalCompositeOperation);
////        각각의 o는 다 source-atop으로 되어 있음 이미..
//      });
//      newgroup.globalCompositeOperation = "source-atop"; // 해도 소용없어 ㅜㅜ...
//
//      canvas.add(newgroup);
//      //      canvas.setActiveObject(newgroup); // 그룹 묶고 그 그룹 선택되어있게
//    });

    var activegroup = canvas.getActiveGroup();
    if (!activegroup) return;
    var objectsInGroup = activegroup.getObjects();
    activegroup.clone(function(newgroup) {
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function(object) {
        canvas.remove(object);
      });
      canvas.add(newgroup).setActiveObject(newgroup);
    });

  }

  function ungrouping() {
    var activeObject = canvas.getActiveObject();
    if (activeObject.type == "group") {
      var items = activeObject._objects;
      activeObject._restoreObjectsState();
      canvas.remove(activeObject);
      for (var i = 0; i < items.length; i++) {
        canvas.add(items[i]);
        canvas.item(canvas.size() - 1).hasControls = true;
      }
      canvas.renderAll();
    }
  }




});

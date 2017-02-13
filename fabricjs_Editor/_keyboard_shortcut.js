/**
 * Created by marpple on 2017. 2. 6..
 */


// 정리좀 ㅎㅎㅎㅎㅎㅎㅎㅎㅎ 하기 ㅎㅎㅎ!!!!


// 상하좌우 이동
var movementDelta = 2;
Mousetrap.bind('left', function(e) {
  e.preventDefault();
  var active = canvas.getActiveObject() || canvas.getActiveGroup();
  if (!active) return;
  active.set('left', active.get('left') - movementDelta);
  active.setCoords() && canvas.renderAll();
});
Mousetrap.bind('right', function(e) {
  e.preventDefault();
  var active = canvas.getActiveObject() || canvas.getActiveGroup();
  if (!active) return;
  active.set('left', active.get('left') + movementDelta);
  active.setCoords() && canvas.renderAll();
});
Mousetrap.bind('up', function(e) {
  e.preventDefault();
  var active = canvas.getActiveObject() || canvas.getActiveGroup();
  if (!active) return;
  active.set('top', active.get('top') - movementDelta);
  active.setCoords() && canvas.renderAll();
});
Mousetrap.bind('down', function(e) {
  e.preventDefault();
  var active = canvas.getActiveObject() || canvas.getActiveGroup();
  if (!active) return;
  active.set('top', active.get('top') + movementDelta);
  active.setCoords() && canvas.renderAll();
});



// 타입이 group인(그룹으로 묶어놓은 여러개의 object들) object도 되는지 체크
//var tmp, type, cnt=0, interval=10; // index.html(전역)으로 이동

Mousetrap.bind(['command+c', 'ctrl+c'], function(e) {
  console.log("복사");
  e.preventDefault();
  var active = canvas.getActiveObject() || canvas.getActiveGroup();
  if (!active) return;

  tmp = active; cnt = 0, type = canvas.getActiveGroup() ? "group" : "object";
});

Mousetrap.bind(['command+v', 'ctrl+v'], function(e) {
  console.log("붙여넣기");
  e.preventDefault();
  if (!tmp) return;
  cnt++;

  //return paste();
  return base(tmp, cnt);
});

Mousetrap.bind(['command+x', 'ctrl+x'], function(e) {
  console.log("잘라내기");
  e.preventDefault();
  var active = canvas.getActiveObject() || canvas.getActiveGroup();
  if (!active) return;

  tmp = active; cnt = 0; type = canvas.getActiveGroup() ? "group" : "object";
  tmp.set({ left: tmp.left - interval, top: tmp.top - interval }); //
  remove_obj_or_group();

  // 감췄다가 다시보여주면 되는거 아닌가ㅏㅏㅏ 가 아닌뎅
});

Mousetrap.bind('del', function(e) {
  console.log("삭제/제거");
  e.preventDefault();
  var active = canvas.getActiveObject() || canvas.getActiveGroup();
  if (!active) return;

  remove_obj_or_group();
});

Mousetrap.bind(['command+d', 'ctrl+d'], function(e) {
  console.log("복제하기");
  e.preventDefault();
  var active = canvas.getActiveObject() || canvas.getActiveGroup();
  if (!active) return;

  //return dubplicate_active(active);
  return base(active, 1);
});

function paste() { // 객체,
  if (type !== 'group') {
  //if (!tmp._objects) { // curvedText 객체는  undefined가 아님..
    console.log("객체인 경우");
    if (tmp.type == 'image') {
      tmp.clone(function(cloned) {
        canvas.add(cloned.set({ left: cloned.left + interval * cnt, top: cloned.top + interval * cnt }));
        canvas.setActiveObject(cloned);
      }, '_data');
    } else {
      var cloned = tmp.clone();
      canvas.add(cloned.set({ left: cloned.left + interval * cnt, top: cloned.top + interval * cnt }))
        .setActiveObject(cloned);
        //.renderAll(); // renderAll() 안해도 되는뎅
    }

  } else { // type이 'group'일 경우
    console.log("그룹인 경우");
    canvas.setActiveGroup(tmp);
    grouping(function(newgroup) {
//        canvas.getActiveObject().clone(function(cloned) {
      newgroup.clone(function(cloned) {
        canvas.add(cloned.set({ left: cloned.left + interval * cnt, top: cloned.top + interval * cnt }));
        ungrouping();

        canvas.discardActiveGroup(); // 이거 하고나서 아랫줄 해줘야 안문제!!!!
        canvas.setActiveObject(cloned);
        ungrouping();

        canvas.renderAll();
      }, '_data');
    });
  }
}

function dubplicate_active(active) {
  if (canvas.getActiveObject()) {
    if (active.type == 'image') {
      active.clone(function(cloned) {
        canvas.add(cloned.set({ left: cloned.left + interval, top: cloned.top + interval }));
        canvas.setActiveObject(cloned);
      }, '_data'); // propertiesToInclude: 복제할 요소!
    } else {
      var cloned = active.clone();
      canvas.add(cloned.set({ left: cloned.left + interval, top: cloned.top + interval }))
        .setActiveObject(cloned);
      //.renderAll(); // renderAll() 안해도 되는뎅
    }

  } else { // canvas.getActiveGroup()일 경우
    grouping(function(newgroup) {
//        canvas.getActiveObject().clone(function(cloned) {
      newgroup.clone(function(cloned) {
        canvas.add(cloned.set({ left: cloned.left + interval, top: cloned.top + interval }));
        ungrouping();

        canvas.discardActiveGroup(); // 이거 하고나서 아랫줄 해줘야 안문제!!!!
        canvas.setActiveObject(cloned);
        ungrouping();

        canvas.renderAll();
      }, '_data');
    });
  }
}

function base(obj/*tmp||canvas.getActiveObject()*/, cnt/*cnt || 1*/) { //paste, duplicate_active 공통
  if (obj.type !== 'group') {
    if (obj.type == 'image') {
      obj.clone(function(cloned) {
        canvas.add(cloned.set({ left: cloned.left + interval * cnt, top: cloned.top + interval * cnt }));
        canvas.setActiveObject(cloned);
      }, '_data'); // propertiesToInclude: 복제할 요소!
    } else {
      var cloned = obj.clone(); // 그냥 clone에서는 _data 안보내도 되나
      canvas.add(cloned.set({ left: cloned.left + interval * cnt, top: cloned.top + interval * cnt }))
        .setActiveObject(cloned);
      //.renderAll(); // renderAll() 안해도 되넹?
    }

  }  else { // 그룹인 경우만 와야 함 ㅜㅜ (그룹객체 x)
    grouping(function(newgroup) { //callback 함수 - grouping하는거 생략할수도 있어야 하는데...
      console.log("===============================================");
      console.log(newgroup, newgroup.clone);
      newgroup.clone(function(cloned) {
        console.log('그룹객체, 그룹 복제 됨!!', cloned); // - 그룹 객체인 경우 여기 안옴 ㅠㅠ
        canvas.add(cloned.set({ left: cloned.left + interval * cnt, top: cloned.top + interval * cnt }));
        ungrouping();

        canvas.discardActiveGroup(); // 이거 하고나서 아랫줄 해줘야 안문제!!!!
        canvas.setActiveObject(cloned);
        ungrouping();

        canvas.renderAll();
      }, '_data');
    });
  }

}


// 붙여넣기, 잘라내기, 복제하기 하나로 통일하기!



/*
 // undo, redo
 Mousetrap.bind(['command+z', 'ctrl+z'], function() { // crop mode 상태일때랑 구분되게 돌아가야 될것 같음..

 console.log("undo");
 });
 Mousetrap.bind(['command+shift+z', 'ctrl+shift+z'], function() {
 var active = canvas.getActiveObject();
 console.log("redo");
 });
 */


Mousetrap.bind(['command+a', 'ctrl+a'], function(e) {
  console.log("전체선택");
  e.preventDefault();

//    selectAllCanvasObjects();
  canvas.discardActiveObject().discardActiveGroup();
  var items = _.map(canvas.getObjects(), function(o) { o.active = true; return o;});
//    canvas._activeObject = null; // 이건 왜넣는거지??
  canvas.setActiveGroup((new fabric.Group(items)).setCoords()).renderAll();
//    canvas.setActiveGroup(new fabric.Group(items)).renderAll();
//    canvas.setActiveGroup(group.setCoords()).renderAll();
//    canvas.renderAll();
});


Mousetrap.bind(['command+g', 'ctrl+g'], function(e) {
  console.log("그룹핑");
  e.preventDefault();
  if (!canvas.getActiveGroup()) return;

  grouping();
});

Mousetrap.bind(['command+shift+g', 'ctrl+shift+g'], function(e) {
  console.log("언그룹핑");
  e.preventDefault();
  if (!canvas.getActiveObject()) return;
  if (!(canvas.getActiveObject().type == 'group')) return;

  ungrouping();
});




////////////////////////////////////////////////////////////////////////////////////////////////////////


function remove_obj_or_group() { // 완벽한 removing
  console.log(canvas);
  // getActiveObject() || getActiveGroup() 있는 경우에만 와야함!
  if (canvas.getActiveGroup() || canvas.getActiveObject().isType('group')) { // 여러개의 객체를 선택하고 한꺼번에 지우려는 경우 안됨!! // 그룹핑된 객체는 됨
    var o = canvas.getActiveGroup() || canvas.getActiveObject();
    console.log(o);
    o._objects.forEach(function(obj) {
      canvas.remove(obj);
      o.removeWithUpdate(obj); // 뭐지? group.addWithUpdate() 도 있는데
    });
    canvas.remove(o); // 내가 추가한 거. 이게 있어야 깔끔하게 제거됨 - object group일 경우만
    canvas.discardActiveGroup();
    canvas.renderAll();
  }
  else if (canvas.getActiveObject()) {
    canvas.getActiveObject().remove();
  }
}


function remove_obj_or_group() { // 완벽한 removing
  // getActiveObject() || getActiveGroup() 있는 경우에만 와야함! - 아직 상관 없음
  if (canvas.getActiveObject() && canvas.getActiveObject().isType('group')) { // 그룹 객체인 경우
    var o = canvas.getActiveObject();
    o._objects.forEach(function(obj) {
      canvas.remove(obj);
      o.removeWithUpdate(obj); // 뭐지? group.addWithUpdate() 도 있는데
    });
    canvas.remove(o); // 내가 추가한 거. 이게 있어야 깔끔하게 제거됨 - object group일 경우만
    canvas.discardActiveGroup();
    canvas.renderAll();
  } else if (canvas.getActiveObject()) { // 객체인 경우
    canvas.remove(canvas.getActiveObject());
  } else if (canvas.getActiveGroup()) { // 그룹인 경우
    // 여러개의 객체를 선택하고 한꺼번에 지우려는 경우 안됨!! // 그룹핑된 객체는 됨
    var group = canvas.getActiveGroup();

//      group._objects.forEach(function(obj) { // 왜 한번밖에 안돌지?
//        console.log("몇번 도나", obj);
//        group.removeWithUpdate(obj); // 뭐지? group.addWithUpdate() 도 있는데 - 여기서는 이거 먼저하면 안에러!
//        canvas.remove(obj);
//      });

    _.clone(group._objects).forEach(function(obj) { // clone으로 싸야지 됨!
      group.removeWithUpdate(obj);
      canvas.remove(obj);
    });

  }
  // canvas.renderAll() x
}



//  function clone_obj_or_group(cnt) {
//    cnt = cnt || 0;
//
//    // 붙여넣기
//    tmp.clone(function(cloned) {
//      cnt++;
//      canvas.add(cloned.set({ left: cloned.left + cnt*interval, top: cloned.top + cnt*interval }));
//      canvas.setActiveObject(cloned);
//    });
//
//    // 복제
//    active.clone(function(cloned) {
//    canvas.add(cloned.set({ left: cloned.left + interval, top: cloned.top + interval }));
//    canvas.setActiveObject(cloned);
//    });
//
//  }

function grouping(cb) { // 비동기 지원, 날아오는 객체가 있으면 그것을 그룹화..?
  console.log("grouping!");
  //if (canvas.getActiveObject() && canvas.getActiveObject().type=='group') {
  //  if (cb) return cb(canvas.getActiveGroup());
  //  return ;
  //}
  var activegroup = canvas.getActiveGroup();
  if (!activegroup) return;
  var objectsInGroup = activegroup.getObjects();
  activegroup.clone(function(newgroup) {
    canvas.discardActiveGroup();
    objectsInGroup.forEach(function(object) {
      canvas.remove(object);
    });
    canvas.add(newgroup);
    canvas.setActiveObject(newgroup);
    if (cb) cb(newgroup);
  });
}

function ungrouping() {
  console.log("ungrouping!");
  var activeObject = canvas.getActiveObject();
  if (activeObject.type == "group") {
    var items = activeObject._objects;
    activeObject._restoreObjectsState(); // remove the original group & add all items back to the canvas - 그룹핑 전 객체들의 정보를 다시 넣는건가봄 ㅇㅅㅇ
    canvas.remove(activeObject);
    for (var i = 0; i < items.length; i++) {
      canvas.add(items[i]);
      canvas.item(canvas.size() - 1).hasControls = true; // 이거 뭐하는거지???
      items[i].active = true;
    }

    var group = new fabric.Group(items); // ungroup 후 각각의 객체들 선택된 상태로 두는 것
    canvas.setActiveGroup(group.setCoords()).renderAll();
//      canvas.setActiveGroup(group).renderAll();

  }
}




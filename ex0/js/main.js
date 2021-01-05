// 添加相机
let sc = new SphereCamera(1000, 60);
scene.addChild(sc);
let mainCamera = sc.getChildByName('sphere_camera');

// 添加八大行星
scene.addChild(new Orbital(parameter.mercury, 'mercury'));
scene.addChild(new Orbital(parameter.venus, 'venus'));
let earth = new Orbital(parameter.earth, 'earth')
scene.addChild(earth);
earth.getChildByName('planet_earth').addChild(new Orbital(parameter.moon, 'moon'));
scene.addChild(new Orbital(parameter.mars, 'mars'));
scene.addChild(new Orbital(parameter.jupiter, 'jupiter'));
let saturn = new Orbital(parameter.saturn, 'saturn');
scene.addChild(saturn);
saturn.getChildByName('planet_saturn').addChild(new Ring(55,80));
scene.addChild(new Orbital(parameter.uranus, 'uranus'));
scene.addChild(new Orbital(parameter.neptune, 'neptune'));

// 添加太阳
scene.addChild(new Sun(parameter.sun));

// UFO
let ufo = new UFO('UFO');
scene.addChild(ufo);
let otherCamera = new Camera();
ufo.addChild(otherCamera);
otherCamera.active = false;
let sp = new Space(5000,2500);
sp.Move(0,0,2500);
otherCamera.addChild(sp);

// 设置环境光亮
scene.ambient = [0.1,0.1,0.1];

// 特殊事件监听
document.addEventListener('keypress', ev=>{
    if(ev.key == 'y' || ev.key == 'Y') {
        mainCamera.active = !mainCamera.active;
        otherCamera.active = !otherCamera.active;
        if(otherCamera.active) {
            // scene.timeSpeed = 0.1;
            ufo.visible = false;
        }
        else {
            // scene.timeSpeed = 1;
            ufo.visible = true;
        }
    }
})


//虚拟跟踪球

function calLength(x){
    return Math.sqrt(x[0]*x[0] + x[1]*x[1] + x[2]*x[2])
}
function calAngle(x,y){
    var tmp = x[0] * y[0] + x[1] * y[1] + x[2] * y[2];
    tmp /= ( calLength(x) * calLength(y) ) ;
    return Math.acos(tmp)
}
let displayWidth  = canvas.clientWidth;
let displayHeight = canvas.clientHeight;
var lastX,lastZ,r = 1000; 
var isClicked = 0;
document.addEventListener("mousedown",event=>{
    lastX = event.clientX/displayWidth
    lastZ = event.clientY/displayHeight
    lastY = Math.sqrt(2 - lastX*lastX - lastZ*lastZ)
    isClicked = 1;
})

document.addEventListener("mousemove",event=>{
    if(isClicked == 1){
        var curX = event.clientX/displayWidth
        var curZ = event.clientY/displayHeight
        var curY = Math.sqrt(2 - curX*curX - curZ*curZ)

        var angleY = Math.atan2(curX,curY) - Math.atan2(lastX,lastY);
        sc.RotateY(-angleY*50);

        var cur = [curX,curY,curZ];
        var last = [lastX,lastY,lastZ];
        var n = [0,1,0];

        var angleX = calAngle(cur,n) - calAngle(last,n);
        // console.log(angleX);
        sc.getChildByName("archi").rotate(angleX*50);

        lastX = curX;lastY = curY;lastZ = curZ;
    }
})

document.addEventListener("mouseup",event=>{
    isClicked = 0;
})

document.addEventListener("DOMMouseScroll",event=>{
    console.log("hello");
    var dis = 0;
    if(event.wheelDelta > 0){
        dis = 10;
    }
    else if(event.wheelDelta < 0){
        dis = -10;
    }
    sc.getChildByName("archi").getChildByName("sphere_camera").move(0,0,dis);
})





var scrollFunc = function (e) {  
    e = e || window.event;  
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
        console.log("hello")
        if (e.wheelDelta > 0) { //当滑轮向上滚动时  
            
            sc.getChildByName("archi").getChildByName("sphere_camera").Move(0,0,20);
        }  
        if (e.wheelDelta < 0) { //当滑轮向下滚动时  
             sc.getChildByName("archi").getChildByName("sphere_camera").Move(0,0,-20);
        }  
    }
}

//Safari与Chrome属于同一类型
window.onmousewheel = document.onmousewheel = scrollFunc;
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

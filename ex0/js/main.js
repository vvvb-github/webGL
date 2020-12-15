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
// let earthCamera = new Camera();
// earthCamera.active = false;
// earthCamera.Move(0,0,parameter.earth.radius+1);
// earth.children[0].addChild(earthCamera);
scene.addChild(new Orbital(parameter.mars, 'mars'));
scene.addChild(new Orbital(parameter.jupiter, 'jupiter'));
scene.addChild(new Orbital(parameter.saturn, 'saturn'));
scene.addChild(new Orbital(parameter.uranus, 'uranus'));
scene.addChild(new Orbital(parameter.neptune, 'neptune'));

// 添加太阳
scene.addChild(new Sun(parameter.sun));

// 设置环境光亮
scene.ambient = [0.1,0.1,0.1];

// 特殊事件监听
// document.addEventListener('keypress', ev=>{
//     if(ev.key == '1') {
//         mainCamera.active = !mainCamera.active;
//         earthCamera.active = !earthCamera.active;
//         if(earthCamera.active) scene.timeSpeed = 0.1;
//         else scene.timeSpeed = 1;
//     }
// })

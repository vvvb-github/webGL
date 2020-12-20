camera.destroy();
//第一人称视角的相机
//相机实现了视角的上下旋转
let camera_1 = new YggCamera("camera_1");
//观察者身体（虚空）
//身体实现相机的左右移动
let body = new YggBody("body");
scene.addChild(body);
body.addChild(camera_1);
body.Move(0,-20,0);

for(let i = 0; i < 6; ++i){
    for(let j = 0; j < 6 - i; ++j){
        let bar = new GoldBar('gold');
        bar.RotateY(90);
        bar.Move(20,-50 + 3.1 * i,1.5 * i + 3 * j);
        scene.addChild(bar);
    }
}

let house = new House();
house.Scale(100,50,100);
scene.addChild(house);

let yggLamp = new Lamp();
yggLamp.Move(0,30,0);
scene.addChild(yggLamp);
scene.ambient = [0.2, 0.2, 0.2];

document.addEventListener('keypress', ev=>{
    if(ev.key == 'y' || ev.key == 'Y') {
        yggLamp.light.active = !yggLamp.light.active;
        yggLamp.white.active = !yggLamp.white.active;
    }
});
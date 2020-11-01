class Player extends Cube {
    constructor(name) {
        super(name);
        this.moveSpeed = 100;
        this.rotateSpeed = 90;

        this.Resize(40,50,40);
    }

    update(dt) {
        // 前进与后退
        if(event_sys.keyBoard.W()) {
            this.Move(0,0,this.moveSpeed*dt/1000);
        } else if(event_sys.keyBoard.S()) {
            this.Move(0,0,-this.moveSpeed*dt/1000);
        }
        // 转体
        if(event_sys.keyBoard.A()) {
            this.RotateY(this.rotateSpeed*dt/1000);
        } else if(event_sys.keyBoard.D()) {
            this.RotateY(-this.rotateSpeed*dt/1000);
        }
    }
}

class Arm extends Cube {
    constructor(name) {
        super(name);
        this.Resize(10,10,60);

        // 射击间隔1s，设置射击音效
        this.shotTime = 1000;
        this.audio = document.createElement('audio');
        this.audio.src = './audios/shot.wav';
    }

    update(dt) {
        if(this.shotTime<1000) this.shotTime += dt;
        else if(event_sys.keyBoard.Space()) {
            let bullet = new Bullet();
            // 使子弹保持与手臂相同位置与角度
            bullet.addTransform(this.getTransform());
            // 前移臂长（从手臂前端射出）
            bullet.Move(0,0,60);
            // 子弹不应当随着小人改变方向而转向，因此不作为小人子物体
            scene.addChild(bullet);
            // 更新射击间隔，播放音效
            this.shotTime = 0;
            this.audio.play();
        }
    }
}
// 调整摄像机视角，后移400，上移200，20°俯视视角
camera.Move(0,200,-400);
camera.RotateX(20);
// 小人身体
let player = new Player('player');
scene.addChild(player);
// 头部
let head = new Cube('head');
head.Resize(25,25,25);
head.Move(0,75,0);
player.addChild(head);
// 左臂
let larm = new Arm('larm');
larm.Move(-55,30,40);
player.addChild(larm);
// 右臂
let rarm = new Arm('rarm');
rarm.Move(55,30,40);
player.addChild(rarm);

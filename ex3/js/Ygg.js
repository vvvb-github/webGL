class YggBody extends Node {
    constructor(name) {
        super(name);
        //移动速度
        this.moveSpeed = 20;
    }

    //场景漫游
    update(dt) {
        // //w键前进
        // if(event_sys.keyBoard.W()) {
        //     this.Move(0,0, this.moveSpeed*dt/1000);
        // }
        // //s键后退
        // else if(event_sys.keyBoard.S()) {
        //     this.Move(0,0, -this.moveSpeed*dt/1000);
        // }
        // //a键左移
        // else if(event_sys.keyBoard.A()){
        //     this.Move(-this.moveSpeed*dt/1000,0,0);
        // }
        // //d键右移
        // else if(event_sys.keyBoard.D()){
        //     this.Move(this.moveSpeed*dt/1000,0,0);
        // }
    }
}

class YggNeck extends Node{
    constructor(name) {
        super(name);
        //旋转速度
        this.rotateSpeed = 50;
    }

    //场景漫游
    update(dt) {
        //按←向左看
        if(event_sys.keyBoard.LeftArrow()){
            this.RotateY(this.rotateSpeed*dt/1000);
        }
        //按→向右看
        else if(event_sys.keyBoard.RightArrow()){
            this.RotateY(-this.rotateSpeed*dt/1000);
        }
    }
}

class YggCamera extends Camera{
    constructor(name) {
        super(name);
        //旋转速度
        this.rotateSpeed = 50;
    }

    //场景漫游
    update(dt) {
        //按↑抬头看
        if(event_sys.keyBoard.UpArrow()){
            this.RotateX(-this.rotateSpeed*dt/1000);
        }
        //按↓低头看
        else if(event_sys.keyBoard.DownArrow()){
            this.RotateX(this.rotateSpeed*dt/1000);
        }
    }
}

camera.destroy();
//第一人称视角的相机
//相机实现了视角的上下旋转
let camera_1 = new YggCamera("camera_1");
//观察者身体（虚空）
//身体实现相机的左右移动
let body = new YggBody("body");
//脖子实现相机的视角左右旋转
let neck = new YggNeck("neck");
scene.addChild(body);
body.addChild(neck);
neck.addChild(camera_1);
body.Move(0,20,0);
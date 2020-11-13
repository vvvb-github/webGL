class Player extends Cube {
    constructor(name) {
        super(name);
        this.moveSpeed = 50;
        this.rotateSpeed = 180;
        this.f = 0.025;
        this.curSpeed = 0;
        this.heightSpeed = 0;
        this.jumping = false;
        this.curRotate = 0;
        this.Resize(40,50,40);
    }

    update(dt) {
        if (this.jumping) {
            const g = 1;
            let  mat = this.getTransform();
            let height = mat[13];
            if (height > 0 || this.heightSpeed > 0) {
                if(this.heightSpeed < -height) {
                    this.heightSpeed = 0;
                    this.jumping = false;
                    player.Move(0, -height, 0);
                } else {
                    player.Move(0, Math.max(this.heightSpeed, -height), 0);
                    this.heightSpeed -= g;
                }
            } else {
                this.heightSpeed = 0;
                this.jumping = false;
            }
        }
        let adjSpeed = 0.7;
        // 前进与后退
        if (event_sys.keyBoard.Shift()) {
            adjSpeed = 2;
        }
        if(!this.jumping && event_sys.keyBoard.W()) {
            this.curSpeed = Math.min(this.curSpeed / adjSpeed + this.moveSpeed/1000, 1) * adjSpeed;
        } else if(!this.jumping && event_sys.keyBoard.S()) {
            this.curSpeed = Math.max(this.curSpeed / adjSpeed - this.moveSpeed/1000, -1) * adjSpeed;
        }
        let oldSpeed = this.curSpeed;
        this.curSpeed -= this.curSpeed > 0 ? this.f : -this.f;
        if (oldSpeed * this.curSpeed <= 0) {
            this.curSpeed = 0;
        }
        if (this.curSpeed != 0) {
            this.Move(0,0,this.curSpeed*dt);
        }
        adjSpeed = 1;
        if (event_sys.keyBoard.Shift()) {
            adjSpeed = 3;
        }
        if (this.jumping) {
            this.RotateY(player.curRotate * dt);
            return;
        }
        // 转体
        if(event_sys.keyBoard.A()) {
            this.RotateY(this.rotateSpeed*dt/1000 * adjSpeed);
            this.curRotate = this.rotateSpeed/1000 * adjSpeed;
        } else if(event_sys.keyBoard.D()) {
            this.RotateY(-this.rotateSpeed*dt/1000 * adjSpeed);
            this.curRotate = -this.rotateSpeed/1000 * adjSpeed;
        } else this.curRotate = 0;
    }
}

class Arm extends Cube {
    constructor(name) {
        super(name);
        this.fired = 0;
        this.Resize(10,10,60);
        // 射击间隔1s，设置射击音效
        this.shotTime = 1000;
        
    }

    update(dt) {
        if (this.shotTime < 300) {
            this.shotTime += dt;
        }
        else if(this.fired === 1) {
            this.fired = 0;
            let bullet = new Bullet();
            // 使子弹保持与手臂相同位置与角度
            bullet.addTransform(this.getTransform());
            // 前移臂长（从手臂前端射出）
            bullet.Move(0,0,60);
            // 子弹不应当随着小人改变方向而转向，因此不作为小人子物体
            scene.addChild(bullet);
            // 更新射击间隔，播放音效
            this.shotTime = 0;
            this.audio = document.createElement('audio');
            this.audio.src = '../ex2/audios/shot.wav';
            this.audio.play();

            let mat = multiMat(moveMat(0, 0, bullet.speed), bullet.getTransform());
            let vx = mat[12], vz = mat[14];

            mat = bullet.getTransform();
            let lx = mat[12], lz = mat[14];
            let id = -1,op = -1;
            for(let i=0;i<TargetList.length;i++){
                let tmp = TargetList[i].calHitTime(lx,lz,vx,vz);
                if(tmp<0)continue;
                tmp += 200;
                if(tmp<bullet.deadTime){
                    bullet.deadTime = tmp;
                    id = i;
                    op = 0;
                }
            }
            for(let i=0;i<ballonList.length;i++){
                let tmp = ballonList[i].calHitTime(lx,lz,vx,vz);
                if(tmp<0)continue;
                tmp += 200;
                if(tmp<bullet.deadTime){
                    bullet.deadTime = tmp;
                    id = i;
                    op = 1;
                }
            }



            this.parent.curSpeed -= 0.3;
            this.parent.jumping = true;
            this.parent.heightSpeed = 1;
            // console.log(bullet.deadTime);
            if(op == 0)
                TargetList[id].hitedTime =  bullet.deadTime;
            if(op == 1)
                ballonList[id].hitedTime = bullet.deadTime;
            // console.log(mat);

        }
    }
}
class HeadRing extends Node {
    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_color', this.colors, 4);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length / 3);
    }
    constructor(name) {
        super(name);
        // this.vertices = drawSphereY(-1,1,50);
        this.vertices = drawRingY3D([0,20,0],20,[0,18,0],20);
        let n = this.vertices.length / 3;
        for(let i=0;i<n;i++){
            let color = [255.0/256,215.0/256,0,1];
            this.colors.push(color[0],color[1],color[2],color[3]);
        }
        //  this.Resize(5,5,5);
    }
}
// 调整摄像机视角，后移400，上移200，20°俯视视角
camera_3.Move(0,200,-400);
camera_3.RotateX(20);
// 小人身体
let player = new Player('player');
scene.addChild(player);
// 头部
let head = new Cube('head');
head.Resize(25,25,25);
head.Move(0,75,0);
player.addChild(head);
// 左臂
let larm = new Cube('larm');
larm.Resize(10,40,10);
larm.Move(-55,15,0);
player.addChild(larm);
// 右臂
let rarm = new Arm('rarm');
rarm.Move(55,30,40);
player.addChild(rarm);
player.BindCamera(camera_1,[0,80,20])
camera_3.enabled = true;

let headring = new HeadRing("headring");
head.addChild(headring);
headring.Resize(1.2,1.2,1.2);
headring.Move(0,25,0);

document.addEventListener('keypress', event=> {
    if (event.key.toLowerCase() === 'y') {
        camera_1.enabled = !camera_1.enabled;
        camera_3.enabled = !camera_3.enabled;
        head.visible = !head.visible;
    } 
    
    else if(event.key.toLowerCase() === 'j') {
        if (player.jumping) return;
        player.jumping = true;
        player.heightSpeed = 15;
    }
});

player.RotateX(2);


document.addEventListener('click',event=> {
    console.log("clicked");
    rarm.fired = 1;
});
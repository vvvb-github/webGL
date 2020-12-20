class YggBody extends Node {
    constructor(name) {
        super(name);
        //移动速度
        this.moveSpeed = 20;
        this.rotateSpeed = 50;
    }

    //场景漫游
    update(dt) {
        //i键前进
        if(event_sys.keyBoard.I()) {
            this.Move(0,0, this.moveSpeed*dt/1000);
        }
        //k键后退
        else if(event_sys.keyBoard.K()) {
            this.Move(0,0, -this.moveSpeed*dt/1000);
        }
        //j键左移
        else if(event_sys.keyBoard.J()){
            this.Move(-this.moveSpeed*dt/1000,0,0);
        }
        //l键右移
        else if(event_sys.keyBoard.L()){
            this.Move(this.moveSpeed*dt/1000,0,0);
        }
        //按←向左看
        else if(event_sys.keyBoard.LeftArrow()){
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
        this.curangle = 0;
    }

    //场景漫游
    update(dt) {
        //按↑抬头看
        if(event_sys.keyBoard.UpArrow()){
            if(this.curangle > -60){
                this.curangle -= this.rotateSpeed*dt/1000;
                this.RotateX(-this.rotateSpeed*dt/1000);
            }
        }
        //按↓低头看
        else if(event_sys.keyBoard.DownArrow()){
            if(this.curangle < 60){
                this.curangle += this.rotateSpeed*dt/1000;
                this.RotateX(this.rotateSpeed*dt/1000);
            }
        }
    }
}

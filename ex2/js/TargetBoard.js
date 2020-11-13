class TargetBoard extends Node {
    constructor(name) {
        super(name);
        this.vertices = geo_Cube(1);
        this.Resize(75,75,1);
        for(let i=0;i<6;++i) {
            let color = [124.0/256,64.0/256,0,1];
            for(let j=0;j<6;++j)
                this.colors.push(color[0],color[1],color[2],color[3]);
        }
    }
}
class Stick extends Node {
    constructor(name) {
        super(name);
        this.vertices = geo_Cube(1);
        this.Resize(5,75,1);
        for(let i=0;i<6;++i) {
            let color = [124.0/256,64.0/256,0,1];
            for(let j=0;j<6;++j)
                this.colors.push(color[0],color[1],color[2],color[3]);
        }
    }
}
class WhitePlane extends Node {
    constructor(name) {
        super(name);
        this.vertices = geo_Cube(1);
        this.Resize(60,60,1);
        for(let i=0;i<6;++i) {
            let color = [1,1,1,0];
            for(let j=0;j<6;++j)
                this.colors.push(color[0],color[1],color[2],color[3]);
        }
    }
}

class BlackRring extends Node{
    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_color', this.colors, 4);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length / 3);
    }
    constructor(name) {
        super(name);
        this.vertices = drawCircleZ(0,360,[0,0,0],1);
        //console.log(this.vertices.length/3);
        let color = [0,0,0,1];
        let N = 1 + 361;
        for(let i=0;i<N;i++)
            this.colors.push(color[0],color[1],color[2],color[3]);
    }
}
class WhiteRring extends Node{
    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_color', this.colors, 4);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length / 3);
    }
    constructor(name) {
        super(name);
        this.vertices = drawCircleZ(0,360,[0,0,0],1);
        //console.log(this.vertices.length/3);
        let color = [1,1,1,1];
        let N = 1 + 361;
        for(let i=0;i<N;i++)
            this.colors.push(color[0],color[1],color[2],color[3]);
    }
}
class Target extends Node {
    constructor(name) {
        super(name);
        this.hitedTime = -100000000;
        this.curAngle = 0;
        this.rotateSpeed = 3.14/2/1000;
        this.layTime = 0;
        this.curTime = 0;
        this.vertices = geo_Cube(1);
        this.Resize(0.01,0.01,0.01);
        for(let i=0;i<6;++i) {
            let color = [1,1,1,0];
            for(let j=0;j<6;++j)
                this.colors.push(color[0],color[1],color[2],color[3]);
        }

        let board = new TargetBoard("board");
        this.addChild(board);
        board.Move(0,150,0);

        let stick = new Stick("stick");
        stick.Move(0,-100,0);
        //scene.addChild(stick1);
        board.addChild(stick);

        let whiteplane = new WhitePlane("whiteplane");
        board.addChild(whiteplane);

        let blackRing1_1 = new BlackRring("blackRing1_1");
        board.addChild(blackRing1_1);
        blackRing1_1.Resize(55,55,1);
        blackRing1_1.Move(0,0,-1);

        let whiteRing1_1 = new WhiteRring("whiteRing1_1");
        blackRing1_1.addChild(whiteRing1_1);
        whiteRing1_1.Resize(40,40,1);
        whiteRing1_1.Move(0,0,-0.01);

        let blackRing1_2 = new BlackRring("blackRing1_2");
        whiteRing1_1.addChild(blackRing1_2);
        blackRing1_2.Resize(30,30,1);
        blackRing1_2.Move(0,0,-0.01);

        let whiteRing1_2 = new WhiteRring("whiteRing1_2");
        blackRing1_2.addChild(whiteRing1_2);
        whiteRing1_2.Resize(20,20,1);
        whiteRing1_2.Move(0,0,-0.01);

        let blackRing1_3 = new BlackRring("blackRing1_3");
        whiteRing1_2.addChild(blackRing1_3);
        blackRing1_3.Resize(10,10,1);
        blackRing1_3.Move(0,0,-0.01);

        this.Scale(0.6, 0.6, 0.6);
        this.Move(0,-50,0);
    }
    update(dt){
        this.hitedTime += dt;
        this.curTime += dt;
        if(this.hitedTime>=0){
            let add = this.hitedTime*this.rotateSpeed;
            let left = 90-this.curAngle;
            if(add>left){
                this.layTime  += add-left;
                add = left;
            }
            this.curAngle += add;
            if(add>0)this.RotateX(add);
            if(this.layTime>=5000){
                this.layTime = 0;
                this.RotateX(270);
                this.hitedTime = -100000000;
                this.curAngle = 0;
            }


        }
    }
    calLocation(time){
        let mat = this.getTransform();
        let locationX = mat[12];
        return locationX;
    }
    calHitTime(lx, lz, vx, vz){
        if(this.hitedTime>=-100000)return -1;
        let mat = this.getTransform();
        let locationZ = mat[14];
        let time = (locationZ - lz) / vz;
        let locationX = this.calLocation(this.curTime + time);
        // console.log(lx,lz,vx,vz,time);
        if(time<0)return time;
        lx += vx * time;
        if(Math.abs(lx-locationX)<=55){
            //this.hitedTime = -time*1000;
            return time*1000;
        }
        return -1;
    }
}

class MovingTarget extends Target{
    constructor(name) {
        super(name);
        this.curLocation = 0;
        this.dispX = 0;
    }
    calLocation(time){
        let steps = Math.floor(time/2000);
        time -= steps * 2000;
        //console.log(time);
        if(time<=1000)
            return time * 0.5 + this.dispX;
        else 
            return 1000 - time * 0.5 + this.dispX;
    }
    update(dt){
        this.hitedTime += dt;
        this.curTime += dt;
        if(this.hitedTime>=0){
            let add = this.hitedTime*this.rotateSpeed;
            let left = 90-this.curAngle;
            if(add>left){
                this.layTime  += add-left;
                add = left;
                this.curTime -= add-left;
            }
            this.curAngle += add;
            if(add>0)this.RotateX(add);
            if(this.layTime>=5000){
                this.layTime = 0;
                this.RotateX(270);
                this.hitedTime = -100000000;
                this.curAngle = 0;
            }
        }
        else{
            let lastLocation = this.curLocation;
            this.curLocation = this.calLocation(this.curTime) - this.dispX;
            //console.log(this.curTime,this.curLocation)
            this.Move(this.curLocation-lastLocation,0,0);   
        }
    }


}

let TargetList = new Array();
let Target1 = new Target("Target1");
scene.addChild(Target1);
Target1.Move(0,0,300);
TargetList.push(Target1);

let Target2 = new Target("Target2");
scene.addChild(Target2);
Target2.Move(300,0,300);
TargetList.push(Target2);

let Target3 = new Target("Target3");
scene.addChild(Target3);
Target3.Move(-300,0,300);
TargetList.push(Target3);

let Target4 = new MovingTarget("Target4");
scene.addChild(Target4);
Target4.Move(-250,0,150);
Target4.dispX = -250;
TargetList.push(Target4);


// let ground = new Cube("ground");
// scene.addChild(ground);
// ground.Resize(10000,10000,10000);
// ground.Resize(10000,10,10000);
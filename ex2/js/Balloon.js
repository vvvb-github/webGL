class Balloon extends Node {
    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_color', this.colors, 4);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length / 3);
    }
    constructor(name) {
        super(name);
        this.hitedTime = -100000000;
        this.vertices = drawBallon();
        this.layTime = 0;
        // this.vertices = drawRingY3D([0,20,0],20,[0,19,0],20);
        let n = this.vertices.length / 3;
        // console.log("the total length of Sphere is: " + n);
        let color = [0.0/256,0.0/256,80/256,0.5];
        for(let i=0;i<n;i++){
            if(i%74 == 0){
                color[1] += 2/256;
                color[1] += 2/256;
                color[2] += 5/256;
                // console.log(color);
            }
            this.colors.push(color[0],color[1],color[2],color[3]);
        }
        // console.log("the total length of Colors is: " + this.colors.length);
        this.Resize(5,5,5);
    }
    update(dt){
        this.hitedTime += dt;
        if(this.hitedTime>=0){
            // console.log(this.layTime);
            this.layTime += dt;
            if(this.visible)this.visible = 0;
            if(this.layTime>=5000){
                this.layTime = 0;
                this.hitedTime = -100000000;
                this.curAngle = 0;
                this.visible = 1;
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
        if(Math.abs(lx-locationX)<=50){
            //this.hitedTime = -time*1000;
            return time*1000;
        }
        return -1;
    }
}
let ballonList = new Array();
let balloon1 = new Balloon("balloon1");
scene.addChild(balloon1);
balloon1.Move(150,20,200);
ballonList.push(balloon1);

let balloon2 = new Balloon("balloon2");
scene.addChild(balloon2);
balloon2.Move(-150,20,200);
ballonList.push(balloon2);
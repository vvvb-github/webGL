class Cube extends Node {
    constructor(name) {
        super(name);

        for(let i=0;i<6;++i){
            let clr = [Math.random(), Math.random(), Math.random()];
            for(let j=0;j<6;++j){
                this.colors.push(clr[0], clr[1], clr[2], 1);
            }
        }
        
        this.rotate_speed = 60;
        this.rx = 0;
        this.ry = 0;
    }

    update(dt) {
        this.RotateX(this.rx * this.rotate_speed * dt /1000);
        this.RotateY(this.ry * this.rotate_speed * dt /1000);
    }
}

let c1 = new Cube('c1');
let c2 = new Cube('c2');
c1.vertices = geo_Cube(1);
c2.vertices = geo_Cube(1);
c1.Resize(300, 300, 300);
c2.Resize(100, 100, 100);
c2.Move(400, 400, 400);
c1.Move(0, 0, 500);
document.onkeydown = ev=>{
    if(!ev) return;
    if(ev.keyCode == 87) c1.rx=c2.rx=-1;
    else if(ev.keyCode == 83) c1.rx=c2.rx=1;
    else if(ev.keyCode == 65) c1.ry=c2.ry=-1;
    else if(ev.keyCode == 68) c1.ry=c2.ry=1;
}

document.onkeyup = ev=>{
    if(ev){
        c1.rx=c1.ry=c2.rx=c2.ry=0;
    }
}

c1.addChild(c2);
scene.addChild(c1);

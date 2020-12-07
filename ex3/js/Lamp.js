class Lamp extends Node{
    constructor() {
        super();
        this.moveSpeed = 96;
        this.drawWay = gl.TRIANGLE_STRIP;

        this.beta = 1;

        this.vertices = drawSphereY(0,1,10)
        for(let i = 0; i < this.vertices.length ; ++i){
            this.normals.push(-this.vertices[i]);
        }

        for(let i = 0; i < this.vertices.length/3 ; ++i){
            this.ambient.push(0.25,0.20725, 0.20725);
            this.specular.push(0.508273, 0.508273, 0.508273);
            this.diffuse.push(1.0, 0.829, 0.829);
        }
    }

    update(dt){
        //w键前进
        if(event_sys.keyBoard.W()) {
            this.Move(0,0, this.moveSpeed*dt/1000);
        }
        //s键后退
        else if(event_sys.keyBoard.S()) {
            this.Move(0,0, -this.moveSpeed*dt/1000);
        }
        //a键左移
        else if(event_sys.keyBoard.A()){
            this.Move(-this.moveSpeed*dt/1000,0,0);
        }
        //d键右移
        else if(event_sys.keyBoard.D()){
            this.Move(this.moveSpeed*dt/1000,0,0);
        }
        else if(event_sys.keyBoard.G()){
            this.Move(0,this.moveSpeed*dt/1000,0);
        }
        else if(event_sys.keyBoard.H()){
            this.Move(0,-this.moveSpeed*dt/1000,0);
        }
    }

}

let yggLight = new PointLight([1.0,1.0,1.0],[1.2, 1.2, 1.2]);
let yggLamp = new Lamp();
yggLamp.addChild(yggLight);
yggLamp.Move(0,30,0);
scene.addChild(yggLamp);
scene.ambient = [0.2, 0.2, 0.2];
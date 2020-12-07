class Lamp extends PointLight{
    constructor() {
        super();
        this.diffuse = [1.2, 1.2, 1.2];
        this.specular = [1.0, 1.0, 1.0];
        this.moveSpeed = 96;
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
    }

    draw(){}
}

let yggLight = new Lamp();
yggLight.Move(0,50,0);
scene.addChild(yggLight);
scene.ambient = [0.2, 0.2, 0.2];
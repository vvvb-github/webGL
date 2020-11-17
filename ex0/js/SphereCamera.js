class Archi extends Node {
    constructor(r, spd) {
        super('archi');

        this.rotspeed = spd;

        camera.destroy();
        let c = new Camera();
        c.Move(0, 0, -r);
        this.addChild(c);
    }

    update(dt) {
        if(event_sys.keyBoard.W()) this.RotateX(this.rotspeed*dt/1000);
        if(event_sys.keyBoard.S()) this.RotateX(-this.rotspeed*dt/1000); 
    }

    draw() {}
}

class SphereCamera extends Node {
    constructor(r, spd) {
        super('spherecamera');

        this.rotspeed = spd;
        this.addChild(new Archi(r, spd));
    }

    update(dt) {
        if(event_sys.keyBoard.D()) this.RotateY(this.rotspeed*dt/1000);
        if(event_sys.keyBoard.A()) this.RotateY(-this.rotspeed*dt/1000); 
    }

    draw() {}
}

class SCamera extends Camera {
    constructor(speed) {
        super('sphere_camera');

        this.moveSpeed = speed;
    }

    update(dt) {
        let d = this.moveSpeed*dt/1000;

        if(event_sys.keyBoard.UpArrow()) {
            this.Move(0,0,d);
        }
        else if(event_sys.keyBoard.DownArrow()) {
            this.Move(0,0,-d);
        }
    }
}

class Archi extends Node {
    constructor(r, spd) {
        super('archi');

        this.rotspeed = spd;
        this.rot = 0;

        camera.destroy();
        let c = new SCamera(100);
        c.Move(0, 0, -r);
        this.addChild(c);

        let space = new Space(4*r, 2*r, 20);
        space.Move(0,0,2*r);
        c.addChild(space);
    }

    update(dt) {
        let angle = this.rotspeed*dt/1000;
        if(event_sys.keyBoard.W() && this.rot < 60) {
            this.RotateX(angle);
            this.rot += angle;
        }
        else if(event_sys.keyBoard.S() && this.rot > -60) {
            this.RotateX(-angle);
            this.rot -= angle;
        }
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
        else if(event_sys.keyBoard.A()) this.RotateY(-this.rotspeed*dt/1000); 
    }

    draw() {}
}

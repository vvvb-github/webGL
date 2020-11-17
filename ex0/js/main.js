class Room extends Node {
    constructor(name) {
        super(name);

        this.vertices = geo_Cube(1);
        this.normals = normal_Cube();
        for(let i=0;i<this.normals.length;++i) this.normals[i] *= -1;
        let color = [0,0,0.3,1];
        for(let i=0;i<6;++i)  {
            for(let j=0;j<6;++j)
                this.colors.push(color[0],color[1],color[2],color[3]);
        }
        this.Resize(500,250,500);
        this.Move(0,250,0);

        this.smooth = 0.1;
    }
}

class MyCamera extends Camera {
    constructor() {
        super();

        this.rotspeed = 180;
    }

    update(dt) {
        if(event_sys.keyBoard.D()) this.RotateY(this.rotspeed*dt/1000);
        if(event_sys.keyBoard.A()) this.RotateY(-this.rotspeed*dt/1000);
        if(event_sys.keyBoard.W()) this.RotateX(-this.rotspeed*dt/1000);
        if(event_sys.keyBoard.S()) this.RotateX(this.rotspeed*dt/1000);
    }
}

let room = new Room('cube');
scene.addChild(room);
camera.destroy();
let m_camera = new MyCamera();
m_camera.Move(0,50,0);
scene.addChild(m_camera);

let light = new PointLight([1,1,1],1);
room.addChild(light);
light.Move(0,240,250);

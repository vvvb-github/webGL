class Cube extends Node {
    constructor() {
        super('name');
        this.vertices = drawSphereY(-1,1,1000);
        this.normals = this.vertices;
        this.beta = 1;
        this.drawWay = gl.TRIANGLE_STRIP;

        // for(let i=0;i<6;++i){
        //     for(let j=0;j<6;++j){
        //         this.ambient.push(0,1,0);
        //         this.specular.push(1,1,1);
        //         this.diffuse.push(0,1,0);
        //     }
        // }

        for(let i=0;i<this.vertices.length/3;++i){
            // this.ambient.push(0,1,0);
            this.specular.push(0,0,0);
            this.diffuse.push(0,0,0);
        }

        this.texcoords = SphereAngle(-1, 1, 1000);
        for(let i=0;i<this.texcoords.length;++i) this.texcoords[i]*=3;
        this.loadTexture('http://www.kxhome.xyz:8085/ex0/images/space.jpg');

        this.rotSpeed = 60;
        this.moveSpeed = 50;
    }

    update(dt) {
        dt/=1000;
        if(event_sys.keyBoard.W()) {
            this.RotateX(this.rotSpeed*dt);
        }else if(event_sys.keyBoard.S()) {
            this.RotateX(-this.rotSpeed*dt);
        }else if(event_sys.keyBoard.A()) {
            this.RotateY(-this.rotSpeed*dt);
        }else if(event_sys.keyBoard.D()) {
            this.RotateY(this.rotSpeed*dt);
        }else if(event_sys.keyBoard.Q()) {
            this.Move(0,0,this.moveSpeed*dt);
        }else if(event_sys.keyBoard.E()) {
            this.Move(0,0,-this.moveSpeed*dt);
        }
    }
}
class Planet extends Node {
    constructor(src, r, spd_self, name) {
        super(name);

        this.vertices = drawSphereY(-1, 1, r);
        this.normals = this.vertices;
        
        this.texture = new Image();
        this.texture.crossOrigin = 'anonymous';
        this.texture.src = src;
        this.texcoords = SphereAngle(-1, 1, r);
        console.log(this.texcoords);
        this.drawWay = gl.TRIANGLE_STRIP;

        this.self_rotspeed = spd_self;
    }

    update(dt) {
        this.RotateY(this.self_rotspeed*dt/1000);
    }
}

class Orbital extends Node {
    constructor(r, spd, planet, name) {
        super(name);

        this.vertices = drawRingY3D([0,-1,0],r,[0,1,0],r);
        for(let i=0;i<this.vertices.length/3;++i) {
            this.colors.push(1,1,1,1);
        }
        this.vertices.forEach(num=>{
            this.normals.push(-num);
        });

        this.addChild(planet);
        planet.Move(0, 0, -r);

        this.rotspeed = spd;
    }

    draw() {
        // setAttrib('a_position', this.vertices, 3);
        // setAttrib('a_color', this.colors, 4);
        // setAttrib('a_normal', this.normals, 3);
        // gl.uniform1f(gl.getUniformLocation(program,'u_smooth'), this.smooth);

        // gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length/3);
    }

    update(dt) {
        this.RotateY(this.rotspeed*dt/1000);
    }
}

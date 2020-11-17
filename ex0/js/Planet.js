class Planet extends Node {
    constructor(r, spd_self, name) {
        super(name);

        this.vertices = drawSphereY(-1, 1, r);
        this.normals = this.vertices;
        for(let i=0;i<this.vertices.length;i+=3) {
            this.colors.push(0,0,1,1);
        }
        // this.smooth = 1;

        this.self_rotspeed = spd_self;
    }

    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_color', this.colors, 4);
        setAttrib('a_normal', this.normals, 3);
        gl.uniform1f(gl.getUniformLocation(program,'u_smooth'), this.smooth);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length/3);
    }

    update(dt) {
        this.RotateY(this.self_rotspeed*dt/1000);
    }
}

class Orbital extends Node {
    constructor(r, spd, planet, name) {
        super(name);

        this.addChild(planet);
        planet.Move(0, 0, -r);

        this.rotspeed = spd;
    }

    draw() {}

    update(dt) {
        this.RotateY(this.rotspeed*dt/1000);
    }
}

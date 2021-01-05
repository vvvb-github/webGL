class Planet extends Node {
    constructor(param, name) {
        super('planet_'+name);

        this.vertices = drawSphereY(-1, 1, param.radius);
        this.normals = this.vertices;
        for(let i=0;i<this.vertices.length/3;++i) {
            this.specular.push(0.1,0.1,0.1);
        }
        this.beta = 20;
        
        this.loadTexture(param.texture);
        this.texcoords = SphereAngle(-1, 1, param.radius);
        this.drawWay = gl.TRIANGLE_STRIP;

        this.self_rotspeed = param.rotation;
        this.RotateY(param.startAngle)
    }

    update(dt) {
        this.RotateY(this.self_rotspeed*dt/1000);
    }
}

class Orbital extends Node {
    constructor(param, name) {
        super(name);

        let planet = new Planet(param, name);
        this.addChild(planet);
        planet.Move(0, 0, -param.orbitRadius);

        this.rotspeed = param.revolution;
    }

    draw() {}

    update(dt) {
        this.RotateY(this.rotspeed*dt/1000);
    }
}

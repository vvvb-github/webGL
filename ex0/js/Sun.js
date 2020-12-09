class Sun extends Node {
    constructor(r) {
        super('sun');

        this.vertices = drawSphereY(-1, 1, r);
        this.vertices.forEach(num=>{
            this.normals.push(-num);
        });
        for(let i=0;i<this.vertices.length/3;++i){
            // this.ambient.push(1,0.5,0);
            // this.diffuse.push(1,0.5,0);
            this.specular.push(1,0.8,0);
        }
        this.beta = 1;
        this.drawWay = gl.TRIANGLE_STRIP;

        this.loadTexture(url + 'sun.jpg');
        this.texcoords = this.texcoords = SphereAngle(-1, 1, r);

        this.light = new PointLight([1,1,1],[1,1,1]);
        this.addChild(this.light);

        this.brightness = 1;
        this.dir = 0.2;
    }

    update(dt) {
        this.brightness += this.dir*dt/1000;
        if(this.brightness > 1.3 || this.brightness < 0.9) this.dir *= -1;
        this.light.l_specular = [this.brightness,this.brightness,this.brightness];
        this.light.l_diffuse = [this.brightness,this.brightness,this.brightness];
    }
}
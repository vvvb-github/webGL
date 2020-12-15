class Space extends Node {
    constructor(w, h, b) {
        super('spaceUnit');

        this.vertices = [
            -1, -1, 0,
            -1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, -1, 0,
            -1, -1, 0
        ];
        for(let i=0;i<6;++i) {
            this.normals.push(0,0,-1);
            this.specular.push(1,0.5,0);
        }
        this.emissive = [1,1,1];
        this.beta = b;

        this.loadTexture(url + 'space.jpg');
        this.texcoords = [
            0, 0,
            0, 1,
            1, 1,
            1, 1,
            1, 0,
            0, 0
        ];

        this.Resize(w, h, 1);

        this.brightness = 1;
        this.dir = 0.5;
    }

    update(dt) {
        this.brightness += this.dir*dt/1000;
        if(this.brightness > 1.5 || this.brightness < 0) this.dir *= -1;
        this.emissive = [this.brightness,this.brightness,this.brightness];
    }
}

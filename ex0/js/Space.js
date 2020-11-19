class Space extends Node {
    constructor(r) {
        super('space');

        this.vertices = drawSphereY(-1, 1, r);
        this.vertices.forEach(num=>{
            this.normals.push(-num);
        });
        this.smooth = 0.03;
        this.drawWay = gl.TRIANGLE_STRIP;
        this.texture = new Image();
        this.texture.crossOrigin = 'anonymous';
        this.texture.src = 'http://www.kxhome.xyz:8085/space.png';
        this.texcoords = SphereAngle(-1, 1, r);
        // for(let i=0;i<this.texcoords.length;++i) this.texcoords[i]*=5;
    }
}
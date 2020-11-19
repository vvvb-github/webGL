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
        
        let tpi = 2*Math.PI;
        for(let i=0;i<this.vertices.length;i+=3) {
            let x=this.vertices[i], y=this.vertices[i+1], z=this.vertices[i+2];
            let c = Math.acos(y/Math.sqrt(x*x+y*y+z*z));
            c = Math.acos(z/r/Math.sin(c));
            if(!c) c=0;
            if(x<0) c = tpi - c;
            this.texcoords.push(c/tpi);
            this.texcoords.push(y/2*r+0.5);
        }
    }
}
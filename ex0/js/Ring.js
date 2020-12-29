function ring(r,R) {
    let vertices = [];
    for(let i=0;i<=360;++i){
        let angle = i/180*Math.PI;
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        vertices.push(R*c,R*s,0);
        vertices.push(r*c,r*s,0);
    }
    return vertices;
}

function tex(r,R) {
    let texcoords = [];
    for(let i=0;i<=360;++i){
        texcoords.push(0,i/360);
        texcoords.push(1,i/360);
    }
    return texcoords;
}

class Ring extends Node {
    constructor(r, R) {
        super('ring');

        this.drawWay = gl.TRIANGLE_STRIP;
        this.vertices = ring(r, R);
        this.normals = this.vertices;
        this.texcoords = tex(r, R);
        // this.emissive = [1,1,1];
        this.loadTexture(url + 'saturn_ring.png');
        for(let i=0;i<this.vertices.length/3;++i){
            this.specular.push(0.1,0.1,0.1);
        }

        this.RotateX(90);
    }
}
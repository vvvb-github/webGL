class Sun extends Node {
    constructor(r) {
        super('sun');

        this.vertices = drawSphereY(-1, 1, r);
        this.vertices.forEach(num=>{
            this.normals.push(-num);
        });
        for(let i=0;i<this.vertices.length/3;++i){
            this.colors.push(1, 0.5, 0, 1);
        }
        this.smooth = 1;
        this.drawWay = gl.TRIANGLE_STRIP;

        this.addChild(new PointLight([1,0.5,0],1));
    }
}
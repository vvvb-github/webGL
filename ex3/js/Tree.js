class Tree extends Cube {
    constructor(name) {
        super(name);
        this.vertices = [
            1,1,1,
            2,2,2,
        ];
        this.normals = [];
        this.colors = [
            1,0,0,1,// red
        ];
        this.drawWay = gl.TRIANGLES;
    }
}
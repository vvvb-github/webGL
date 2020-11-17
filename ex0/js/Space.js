class Space extends Node {
    constructor() {
        super('space');

        this.vertices = drawSphereY(-1, 1, 1000);
        this.vertices.forEach(num=>{
            this.normals.push(-num);
        });
        for(let i=0;i<this.vertices.length/3;++i){
            this.colors.push(0, 0, 0.1, 1);
        }
        this.smooth = 0.03;
    }

    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_color', this.colors, 4);
        setAttrib('a_normal', this.normals, 3);
        gl.uniform1f(gl.getUniformLocation(program,'u_smooth'), this.smooth);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length/3);
    }
}
class Camera extends Node {
    constructor(gl) {
        super('camera');

        this.gl = gl;
        this.reverse = unitMat();
    }

    Move(x, y, z) {
        super.Move(x, y, z);
        this.reverse = multiMat(this.reverse, moveMat(-x, -y, -z));
    }

    RotateX(angle) {
        super.RotateX(angle);
        this.reverse = multiMat(this.reverse, rotateMatX(-angle));
    }

    RotateY(angle) {
        super.RotateY(angle);
        this.reverse = multiMat(this.reverse, rotateMatY(-angle));
    }

    RotateZ(angle) {
        super.RotateZ(angle);
        this.reverse = multiMat(this.reverse, rotateMatZ(-angle));
    }

    updateFrame(dt, trans) {
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'u_camera'), false, this.reverse);
    }
}
class Camera extends Node {
    constructor(name='camera') {
        super(name);
        // this.reverse = unitMat();
    }

    // Move(x, y, z) {
    //     super.Move(x, y, z);
    //     // this.reverse = multiMat(this.reverse, moveMat(-x, -y, -z));
    // }

    // RotateX(angle) {
    //     super.RotateX(angle);
    //     // this.reverse = multiMat(this.reverse, rotateMatX(-angle));
    // }

    // RotateY(angle) {
    //     super.RotateY(angle);
    //     // this.reverse = multiMat(this.reverse, rotateMatY(-angle));
    // }

    // RotateZ(angle) {
    //     super.RotateZ(angle);
    //     // this.reverse = multiMat(this.reverse, rotateMatZ(-angle));
    // }

    updateFrame(dt, trans) {
        if(!this.active) return;
        // 帧更新
        this.update(dt);
        // 计算总变换矩阵
        let mat = this.transform;
        mat = multiMat(mat, trans);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'u_camera'), false, inverse(mat));
        // 子节点递归更新
        this.children.forEach((child,index)=>{
            if(!child.live) this.children.splice(index,1);
            else child.updateFrame(dt, mat);
        });
    }

}
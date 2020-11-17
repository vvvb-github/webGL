class Camera extends Node {
    constructor(name='camera') {
        super(name);
    }

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
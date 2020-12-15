class Scene extends Node {
    constructor() {
        super('scene');

        this.ambient = [1,1,1]; //环境光默认是白色
        this.timeSpeed = 1;
    }

    updateFrame(dt, trans) {
        clearCanvas(gl);
        this.children.forEach((child,index)=>{
            if(!child.live) this.children.splice(index,1);
            else child.updateFrame(dt*this.timeSpeed, trans);
        });
        gl.uniform3fv(gl.getUniformLocation(program,'u_La'),new Float32Array(this.ambient));
    }
}
let ltcnt = 0;

class PointLight extends Node {
    constructor(specular, diffuse, distance=0, name='pointlight') {
        super(name);
        
        this.l_specular = specular; //光源镜面反射量
        this.l_diffuse = diffuse;  //光源漫反射量
        this.distance = distance;
        this.idx = ltcnt++;
        gl.uniform1i(gl.getUniformLocation(program,'u_Count'), ltcnt);
    }

    updateFrame(dt, trans) {
        if(!this.active) return;
        this.update(dt);
        // 计算总变换矩阵
        let mat = multiMat(this.transform, trans);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'u_lightMat['+String(this.idx)+']'), false, mat);
        gl.uniform3fv(gl.getUniformLocation(program,'u_Ls['+String(this.idx)+']'),new Float32Array(this.l_specular));
        gl.uniform3fv(gl.getUniformLocation(program,'u_Ld['+String(this.idx)+']'),new Float32Array(this.l_diffuse));
        gl.uniform1f(gl.getUniformLocation(program,'b['+String(this.idx),+']'), this.distance);

        // 子节点递归更新
        this.children.forEach((child,index)=>{
            if(!child.live) this.children.splice(index,1);
            else child.updateFrame(dt, mat);
        });
    }
}
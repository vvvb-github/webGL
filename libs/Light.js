let lightCount = 0;

class PointLight extends Node {
    constructor(color, brightness, name='pointlight') {
        super(name);
        
        this.color = color;
        this.brightness = brightness;
        this.idx = '['+String(lightCount)+']';
        lightCount++;
        gl.uniform1i(gl.getUniformLocation(program,'u_lightCount'), lightCount);
    }

    updateFrame(dt, trans) {
        if(!this.active) return;
        this.update(dt);
        // 计算总变换矩阵
        let mat = multiMat(this.transform, trans);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'u_lightMat'+this.idx), false, mat);
        gl.uniform1f(gl.getUniformLocation(program,'u_brightness'+this.idx), this.brightness);
        gl.uniform3fv(gl.getUniformLocation(program,'u_lightColor'+this.idx), this.color);
        // 子节点递归更新
        this.children.forEach((child,index)=>{
            if(!child.live) this.children.splice(index,1);
            else child.updateFrame(dt, mat);
        });
    }
}
class Sun extends Node {
    constructor(sun) {
        super('sun');

        this.vertices = drawSphereY(-1, 1, sun.radius);
        this.vertices.forEach(num=>{
            this.normals.push(-num);
        });
        for(let i=0;i<this.vertices.length/3;++i){
            // this.ambient.push(1,0.5,0);
            // this.diffuse.push(1,0.5,0);
            this.specular.push(1,0.8,0);
        }
        this.beta = 1;
        this.drawWay = gl.TRIANGLE_STRIP;

        this.loadTexture(sun.texture);
        this.texcoords = this.texcoords = SphereAngle(-1, 1, sun.radius);

        this.light = new PointLight([1,1,1],[1,1,1]);
        this.addChild(this.light);

        this.brightness = 1;
        this.dir = 0.2;
    }

    update(dt) {
        this.brightness += this.dir*dt/1000;
        if(this.brightness > 1.3 || this.brightness < 0.9) this.dir *= -1;
        this.light.l_specular = [this.brightness,this.brightness,this.brightness];
        this.light.l_diffuse = [this.brightness,this.brightness,this.brightness];
    }

    draw() {
        gl.uniform1i(gl.getUniformLocation(program,'u_usetexture'), 1);
        setAttrib('a_texcoord', this.texcoords, 2);

        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, this.texture);
        
        // 检查每个维度是否是 2 的幂
        if ((this.texture.width & (this.texture.width - 1)) == 0 && 
            (this.texture.height & (this.texture.height - 1)) == 0) {
            // 是 2 的幂，一般用贴图
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // 不是 2 的幂，关闭贴图并设置包裹模式为到边缘
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_normal', this.normals, 3);
        setAttrib('a_specular',this.specular,3);
        setAttrib('a_diffuse',this.diffuse,3);
        gl.uniform1f(gl.getUniformLocation(program,'u_beta'),this.beta);
        gl.uniform3fv(gl.getUniformLocation(program, 'u_Em'),new Float32Array(this.emissive),0);

        gl.uniform1i(gl.getUniformLocation(program,'u_Count'),1);
        gl.drawArrays(this.drawWay, 0, this.vertices.length / 3);
        gl.uniform1i(gl.getUniformLocation(program,'u_Count'),2);
    }
}
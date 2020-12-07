class Node {
    constructor(name) {
        this.children = [];
        this.scale = {
            x: 1,
            y: 1,
            z: 1
        };
        this.size = {
            x: 1,
            y: 1,
            z: 1
        }
        this.transform = unitMat();
        this.parent = null;
        this.vertices = [];
        this.normals = [];
        this.active = true;
        this.live = true;
        this.name = name;
        this.visible = true;
        this.drawWay = gl.TRIANGLES;

        this.ambient = [];  //物体环境光
        this.specular = []; //物体镜面反射
        this.diffuse = [];  //物体漫反射
        this.beta = 10;
    }

    addChild(node) {
        node.parent = this;
        this.children.push(node);
    }

    getChildByName(name) {
        if(this.name === name) return this;
        else {
            for(let i=0;i<this.children.length;++i) {
                let res = this.children[i].getChildByName(name);
                if(res) return res;
            }
        }
        return null;
    }

    destroy() {
        this.live = false;
    }

    Resize(x, y, z) {
        this.size.x *= x;
        this.size.y *= y;
        this.size.z *= z;
    }

    Scale(x, y, z) {
        this.scale.x *= x;
        this.scale.y *= y;
        this.scale.z *= z;
    }

    Move(x, y, z) {
        this.transform = multiMat(moveMat(x, y, z), this.transform);
    }

    RotateX(angle) {
        this.transform = multiMat(rotateMatX(angle), this.transform);
    }

    RotateY(angle) {
        this.transform = multiMat(rotateMatY(angle), this.transform);
    }

    RotateZ(angle) {
        this.transform = multiMat(rotateMatZ(angle), this.transform);
    }

    getTransform() {
        if(!this.parent) return this.transform;
        else {
            let trans = this.parent.getTransform();
            let mat = scaleMat(this.scale.x, this.scale.y, this.scale.z);
            mat = multiMat(mat, this.transform);
            return multiMat(mat, trans);
        }
    }

    addTransform(trans) {
        this.transform = multiMat(this.transform, trans);
    }

    setTransform(trans) {
        this.transform = trans;
    }

    updateFrame(dt, trans) {
        if(!this.active) return;
        // 帧更新
        this.update(dt);
        // 计算总变换矩阵
        let mat = scaleMat(this.scale.x, this.scale.y, this.scale.z);
        mat = multiMat(mat, this.transform);
        mat = multiMat(mat, trans);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'u_matrix'), false, 
                multiMat(scaleMat(this.size.x, this.size.y, this.size.z), mat));
        if (this.visible) this.draw();
        // 子节点递归更新
        this.children.forEach((child,index)=>{
            if(!child.live) this.children.splice(index,1);
            else child.updateFrame(dt, mat);
        });
    }

    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_normal', this.normals, 3);
        setAttrib('a_ambient',this.ambient,3);
        setAttrib('a_specular',this.specular,3);
        setAttrib('a_diffuse',this.diffuse,3);
        gl.uniform1f(gl.getUniformLocation(program,'u_beta'),this.beta);

        gl.drawArrays(this.drawWay, 0, this.vertices.length / 3);
    }

    update(dt) {}
}
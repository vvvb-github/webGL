class Node {
    constructor(name='node') {
        this.children = [];
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };
        this.scale = {
            x: 1,
            y: 1,
            z: 1
        };
        this.parent = null;
        this.vertices = [];
        this.colors = [];
        this.active = true;
        this.name = name;

        this.start();
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

    updateFrame(dt, trans) {
        if(!this.active) return;
        // 帧更新
        this.update(dt);
        // 计算总变换矩阵
        let mat = scaleMat(this.scale.x, this.scale.y, this.scale.z);
        mat = multiMat(mat, rotateMatX(this.rotation.x));
        mat = multiMat(mat, rotateMatY(this.rotation.y));
        mat = multiMat(mat, rotateMatZ(this.rotation.z));
        mat = multiMat(mat, moveMat(this.position.x, this.position.y, this.position.z));
        mat = multiMat(mat, trans);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'u_matrix'), false, 
                multiMat(mat, projectMat(gl.canvas.width, gl.canvas.height, gl.canvas.width)));
        this.draw();
        // 子节点递归更新
        this.children.forEach(child=>{child.updateFrame(dt, mat)});
    }

    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_color', this.colors, 4);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    start() {}

    update(dt) {}
}
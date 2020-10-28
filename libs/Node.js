class Node {
    constructor() {
        this.children = [];
        this.position = {
            x: 0,
            y: 0
        };
        this.rotation = {
            rx: 0,
            ry: 0,
            rz: 0
        };
        this.parent = null;
        this.vertices = [];
        this.colors = [];
        this.active = true;
        this.name = 'node';

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

    updateFrame(dt) {
        if(!this.active) return;
        // 帧更新
        this.update(dt);
        // 帧重绘
    }

    start() {}

    update(dt) {}
}
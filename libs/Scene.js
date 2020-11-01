class Scene extends Node {
    constructor() {
        super('scene');
    }

    updateFrame(dt, trans) {
        clearCanvas(gl);
        this.children.forEach((child,index)=>{
            if(!child.live) this.children.splice(index,1);
            else child.updateFrame(dt, trans);
        });
    }
}
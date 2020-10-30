class Scene extends Node {
    constructor() {
        super('scene');
    }

    updateFrame(dt, trans) {
        clearCanvas(gl);
        this.children.forEach(child=>{child.updateFrame(dt, trans)});
    }
}
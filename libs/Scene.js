class Scene extends Node {
    start() {
        console.log(gl);
    }

    updateFrame(dt, trans) {
        clearCanvas(gl);
        this.children.forEach(child=>{child.updateFrame(dt, trans)});
    }
}
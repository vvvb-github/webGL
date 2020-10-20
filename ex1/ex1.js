const canvas = document.createElement('canvas');
document.querySelector('#canvas-div').appendChild(canvas);
canvas.style.width = '100%';
canvas.style.height = '100%';
const gl = canvas.getContext('webgl');
let program = null;

window.onload = ()=>{
    if(!gl) return;
    program = createProgramFromScripts(gl, 'vertex-shader', 'fragment-shader');
    resizeCanvasAndFit(gl);
    gl.useProgram(program);
    setVec2([gl.canvas.clientWidth, gl.canvas.clientHeight], 'u_screen');
    setMat(unitMat(), 'u_matrix');

    clearCanvas(gl);
}

document.querySelector('#smile').onclick = ()=>{
    smile();
}
document.querySelector('#angry').onclick = ()=>{
    angry();
}
document.querySelector('#sad').onclick = ()=>{
    sad();
}
document.querySelector('#suprice').onclick = ()=>{
    suprice();
}
document.querySelector('#gg').onclick = ()=>{
    gg();
}

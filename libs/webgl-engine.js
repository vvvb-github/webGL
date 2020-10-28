const canvas = document.createElement('canvas');
document.querySelector('body').appendChild(canvas);
canvas.style.width = '100%';
canvas.style.height = '100%';
const gl = canvas.getContext('webgl');
let program = null;
const scene = new Scene();
const camera = new Camera(gl);
scene.addChild(camera);
let then = 0;

const vertexSource = `
    precision mediump float;
    attribute vec4 a_position;
    attribute vec4 a_color;
    uniform mat4 u_matrix;
    varying vec4 v_color;

    void main() {
        vec4 pos = u_matrix * a_position;
        pos.w = 1.0 + pos.z;
        v_color = a_color;

        gl_Position = pos;
    }
`;
const fragmentSource = `
    precision mediump float;
    varying vec4 v_color;

    void main() {
        gl_FragColor = v_color;
    }
`;


function drawScene(now) {
    scene.updateFrame(now - then, unitMat());
    then = now;
    requestAnimationFrame(drawScene);
}

function setAttrib(attribName, data, stride) {
    let positionLocation = gl.getAttribLocation(program, attribName);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.vertexAttribPointer(positionLocation, stride, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
}


window.onload = ()=>{
    if(!gl){
        console.log('Cannot support webgl!');
        return;
    }
    program = createProgramFromText(gl, vertexSource, fragmentSource);
    resizeCanvasAndFit(gl);
    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);

    requestAnimationFrame(drawScene);
}

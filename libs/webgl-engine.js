const canvas = document.createElement('canvas');
document.querySelector('body').appendChild(canvas);
canvas.style.width = '100%';
canvas.style.height = '100%';
const gl = canvas.getContext('webgl');
let program = null;
const scene = new Scene();
const camera_3 = new Camera(gl);
const camera_1 = new Camera(gl);
const event_sys = new EventSystem();
scene.addChild(camera_3);
scene.addChild(camera_1);
let then = 0;

const vertexSource = `
    precision mediump float;
    attribute vec4 a_position;
    attribute vec4 a_color;
    uniform mat4 u_matrix;
    uniform mat4 u_project;
    uniform mat4 u_camera;
    varying vec4 v_color;

    void main() {
        v_color = a_color;
        vec4 pos = u_camera * u_matrix * a_position;

        if(pos.z <= 0.0) {
            gl_Position = u_project * vec4(pos.x * 10000.0, pos.y * 10000.0, pos.zw);
        } else {
            gl_Position = u_project * vec4(pos.x/pos.z, pos.y/pos.z, pos.zw);
        }
    }
`;
const fragmentSource = `
    precision mediump float;
    varying vec4 v_color;

    void main() {
        gl_FragColor = v_color;
    }
`;

// let allVec = [];
// let allColor = [];

// function addDrawTask(vectex, color) {
//     for(let x of vectex) allVec.push(x);
//     for(let x of color) allColor.push(x);
// }

// function applyDrawTask() {
//     setAttrib('a_position', allVec, 3);
//     setAttrib('a_color', allColor, 4);
//     gl.drawArrays(gl.TRIANGLES, 0, allVec.length / 3);
//     allVec = [];
//     allColor = [];
// }


function drawScene(now) {
    scene.updateFrame(now - then, unitMat(), false);
    // applyDrawTask();
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
    gl.uniformMatrix4fv(gl.getUniformLocation(program,'u_project'),false,
                projectMat(60,gl.canvas.width,gl.canvas.height,0,10000));

    requestAnimationFrame(drawScene);
}

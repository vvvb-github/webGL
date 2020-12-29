const canvas = document.createElement('canvas');
document.querySelector('body').appendChild(canvas);
canvas.style.width = '100%';
canvas.style.height = '100%';
const gl = canvas.getContext('webgl');

const shaderSource = lightShader;
const program = createProgramFromText(gl, shaderSource.vertexSource, shaderSource.fragmentSource);
gl.useProgram(program);
resizeCanvasAndFit(gl);
gl.enable(gl.DEPTH_TEST);
gl.uniform1i(gl.getUniformLocation(program,'u_lightCount'), 0);
gl.uniformMatrix4fv(gl.getUniformLocation(program,'u_project'),false,
            projectMat(90,gl.canvas.width/gl.canvas.height,1,10000));
gl.uniform1i(gl.getUniformLocation(program,'u_Count'), 0);

const scene = new Scene();
const camera = new Camera();
const event_sys = new EventSystem();
scene.addChild(camera);
let then = 0;

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

    requestAnimationFrame(drawScene);
}

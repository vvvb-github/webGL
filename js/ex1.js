let gl = null;
let program = null;

window.onload = ()=>{
    let canvas = document.querySelector('#canvas');
    gl = canvas.getContext('webgl');
    if(!gl) return;
    program = createProgramFromScripts(gl, 'vertex-shader', 'fragment-shader');
    resizeCanvasAndFit(gl);
    gl.useProgram(program);

    let vertice_bg = [
        -1,-1,
        -1,1,
        1,-1,
        1,-1,
        1,1,
        -1,1
    ];
    let color_bg = [0,0,0,1];
    let stretch = canvas.clientHeight / canvas.clientWidth;
    let vertice_center = [
        -0.5*stretch,-0.5,
        -0.5*stretch,0.5,
        0.5*stretch,-0.5,
        0.5*stretch,-0.5,
        0.5*stretch,0.5,
        -0.5*stretch,0.5,
    ];
    let color_center = [1,1,1,1];

    clearCanvas(gl);
    draw(vertice_bg, color_bg);
    draw(vertice_center, color_center);
}

function draw(vertices, color) {
    let positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let colorLocation = gl.getUniformLocation(program, "u_color");
    gl.uniform4fv(colorLocation, new Float32Array(color));

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

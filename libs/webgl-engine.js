// 简易引擎


let gl = null;
let program = null;
let previous = 0;


function main() {
    // 获取画布并创建着色器程序
    let canvas = document.querySelector("#canvas");
    gl = canvas.getContext("webgl");
    if(!gl) return;
    program = createProgramFromScripts(gl, "webgl-vertex", "webgl-fragment");

    // 剔除背面三角形
    gl.enable(gl.CULL_FACE);

    // 调整画布
    resizeCanvasAndFit(gl);

    // 运行着色器程序
    gl.useProgram(program);

    // 初始化scene.js中每个场景物体
    for(let i=0;i<objList.length;++i) {
        objList[i].start();
    }

    // 开启监听，每帧更新scene.js中每个场景物体
    requestAnimationFrame(updateFrame);
}


function updateFrame(now) {
    for(let i=0;i<objList.length;++i) {
        objList[i].update(now-previous);
    }

    previous = now;
    drawScene();

    requestAnimationFrame(updateFrame);
}


function drawScene() {
    // 清空画布
    clearCanvas(gl);

    // 绘制scene.js中每个场景物体
    for(let i=0;i<objList.length;++i) {
        // 设置顶点着色器缓存数据
        let positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objList[i].vertexArray), gl.STATIC_DRAW);

        // 设置变换矩阵
        let matLocation = gl.getUniformLocation(program, "u_matrix");
        let pmat = projectMat(gl.canvas.width, gl.canvas.height, gl.canvas.height);
        let trans = multiMat(pmat, objList[i].transformMat);
        gl.uniformMatrix4fv(matLocation, false, trans);

        // 设置颜色缓存数据
        let colorLocation = gl.getAttribLocation(program, "a_color");
        gl.enableVertexAttribArray(colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, true, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objList[i].colorArray), gl.STATIC_DRAW);

        // 绘制
        gl.drawArrays(gl.TRIANGLES, 0, objList[i].vertexArray.length/3);
    }
}


main();
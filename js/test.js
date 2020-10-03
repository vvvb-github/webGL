/**
 * 测试用demo，绘制嵌套正方形
 */


function main() {
    // 获取画布并创建着色器程序
    let canvas = document.querySelector("#canvas");
    let gl = canvas.getContext("webgl");
    if(!gl) return;
    let program = createProgramFromScripts(gl, "test-vertex", "test-fragment");

    // 调整并清空画布
    resizeCanvasAndFit(gl);
    clearCanvas(gl);

    // 运行着色器程序
    gl.useProgram(program);

    // 为顶点着色器提供缓存数据
    let positionLocation = gl.getAttribLocation(program, "a_position");
    
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

    // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
    var size = 2;          // 每次迭代运行提取两个单位数据
    var type = gl.FLOAT;   // 每个单位的数据类型是32位浮点型
    var normalize = false; // 不需要归一化数据
    var stride = 0;        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type）每次迭代运行运动多少内存到下一个数据开始点
    var offset = 0;        // 从缓冲起始位置开始读取

    gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

    // 开始绘制，一共绘制5对嵌套正方形
    let colorLocation = gl.getUniformLocation(program, "u_color");
    let a = 1.0;
    for(let i = 0; i < 5; ++i) {
        generateRectangle(gl, colorLocation, a);
        a /= 2;
    }
}


// 画给定正方形
function drawRectangle(gl, vertexs) {
    let positions = [
        vertexs[0], vertexs[1],
        vertexs[2], vertexs[3],
        vertexs[4], vertexs[5],
        vertexs[4], vertexs[5],
        vertexs[6], vertexs[7],
        vertexs[0], vertexs[1],
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // 绘制
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}


// 生成一组给定边长的嵌套正方形对
function generateRectangle(gl, colorLocation, a) {
    let vertex1 = [
        -a, -a,
        a, -a,
        a, a,
        -a, a
    ], vertex2 = [
        -a, 0,
        0, -a,
        a, 0,
        0, a
    ];
    // 设置随机颜色
    gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
    drawRectangle(gl, vertex1);

    gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
    drawRectangle(gl, vertex2);
}

main();

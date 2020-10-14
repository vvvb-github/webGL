const canvas = document.createElement('canvas');
document.querySelector('body').appendChild(canvas);
canvas.style.width = '100%';
canvas.style.height = '100%';
const gl = canvas.getContext('webgl');
let program = null;

function setVec2(vec2, varname) {
    gl.uniform2fv(gl.getUniformLocation(program, varname), new Float32Array(vec2));
}

function setVec4(vec4, varname) {
    gl.uniform4fv(gl.getUniformLocation(program, varname), new Float32Array(vec4));
}

function setFloat(float, varname) {
    gl.uniform1f(gl.getUniformLocation(program, varname), float);
}

window.onload = ()=>{
    if(!gl) return;
    program = createProgramFromScripts(gl, 'vertex-shader', 'fragment-shader');
    resizeCanvasAndFit(gl);
    gl.useProgram(program);
    setVec2([gl.canvas.clientWidth, gl.canvas.clientHeight], 'u_screen');

    clearCanvas(gl);

    drawFace();
    drawEyes();
    drawNose();
    drawMouth();
    drawOutline();
}

function drawFace() {
    drawCircleWithBorder(0,360,[0,0],[600,600],[0,0,0.9,0.8]);
    drawCircleWithBorder(0,360,[0,-130],[500,480],[1,1,1,1]);
}

function drawEyes() {
    drawCircleWithBorder(0,360,[-170,330],[135,150],[1,1,1,1]);
    drawCircle(0,360,[-70,330],[25,30],[0,0,0,1]);
    drawCircleWithBorder(0,360,[170,330],[135,150],[1,1,1,1]);
    drawCircle(0,360,[70,330],[25,30],[0,0,0,1]);
}

function drawNose() {
    drawCircleWithBorder(0,360,[0,170],[50,50],[1,0,0,1]);
}

function drawMouth() {
    drawCircleWithBorder(180,360,[0,-150],[350,300],[1,0,0,0.8]);
}

function drawOutline() {
    drawLine([-355,-150], [355,-150]);
    drawLine([0,-150], [0,120]);
    drawLine([-340,100], [-550,250]);
    drawLine([-400,0], [-700, 10]);
    drawLine([-370,-100], [-600, -200]);
    drawLine([340,100], [550,250]);
    drawLine([400,0], [700, 10]);
    drawLine([370,-100], [600, -200]);
}

/**
 * 绘制黑线
 * @param {Number} start    起始点 
 * @param {Number} end      终止点
 */
function drawLine(start, end) {
    setFloat(1, 'u_stretch');
    let vertices = [
        start[0], start[1],
        end[0], end[1]
    ];

    let positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    setVec4([0,0,0,1], 'u_color');

    gl.drawArrays(gl.LINES, 0, 2);
}

/**
 * 逆时针绘制椭圆（带廓线）
 * @param {Number} start    起始角度 
 * @param {Number} end      终止角度
 * @param {Array(2)} center 圆心
 * @param {Array(2)} range  长轴与短轴
 * @param {Array(4)} color  颜色
 */
function drawCircleWithBorder(start, end, center, range, color) {
    drawCircle(start, end, center, [range[0]+5,range[1]+5], [0,0,0,1]);
    drawCircle(start, end, center, range, color);
}

function drawCircle(start, end, center, range, color) {
    setFloat(range[0]/range[1], 'u_stretch');
    let vertices = new Array();
    let a = [center[0] + range[1], center[1]];
    let b = null;
    let angle1 = 1/180*Math.PI;
    a = rotate(a, center, start*angle1);
    let frequency = end - start;

    for(let i=0;i<frequency;++i) {
        b = rotate(a, center, angle1);
        vertices.push(center[0]);
        vertices.push(center[1]);
        vertices.push(a[0]);
        vertices.push(a[1]);
        vertices.push(b[0]);
        vertices.push(b[1]);
        a = b;
    }

    let positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    setVec4(color, 'u_color');

    gl.drawArrays(gl.TRIANGLES, 0, frequency * 3);
}

function rotate(raw, center, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let p = [raw[0] - center[0], raw[1] - center[1]];
    let np = [p[0]*c-p[1]*s, p[0]*s+p[1]*c];
    return [np[0] + center[0], np[1] + center[1]];
}

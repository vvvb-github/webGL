function drawStar4(center, range, color) {
    setFloat(range[0]/range[1], 'u_stretch');

    let vertices = [
        0, 0,
        0, range[1],
        -range[1]/4, range[1]/4,
        -range[1], 0,
        -range[1]/4, -range[1]/4,
        0, -range[1],
        range[1]/4, -range[1]/4,
        range[1], 0,
        range[1]/4, range[1]/4,
        0, range[1]
    ];
    for(let i=0;i<10;++i) {
        vertices[2*i] += center[0];
        vertices[2*i+1] += center[1];
    }

    let positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    setVec4(color, 'u_color');

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 10);
}


/**
 * 绘制矩形
 * @param {Array} vertices  顶点（四个）
 * @param {Array} color     颜色
 */
function drawRectangle(vertices, color) {
    setFloat(1, 'u_stretch');

    let v = [
        vertices[0], vertices[1], 
        vertices[2], vertices[3], 
        vertices[4], vertices[5],
        vertices[0], vertices[1],
        vertices[4], vertices[5],
        vertices[6], vertices[7],
    ];

    let positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);

    setVec4(color, 'u_color');

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}


/**
 * 绘制黑线
 * @param {Number} start    起始点 
 * @param {Number} end      终止点
 */
function drawLine(start, end) {
    let angle = null;
    let dx = end[0]-start[0], dy = end[1]-start[1];

    if(dx != 0) {
        angle = Math.atan(dy/dx);
        if(dx<0) angle += Math.PI;
    } else {
        angle = Math.PI / 2;
        if(dy<0) angle += Math.PI;
    }

    let length = Math.sqrt(dx*dx + dy*dy);
    let vertices = [
        start[0], start[1]+2.5,
        start[0], start[1]-2.5,
        start[0]+length, start[1]+2.5,
        start[0]+length, start[1]-2.5,
    ];

    for(let i=0;i<8;i+=2) {
        let p = [vertices[i], vertices[i+1]];
        let q = rotate(p, start, angle);
        vertices[i] = q[0]; vertices[i+1] = q[1];
    }

    drawRectangle(vertices, [0,0,0,1]);
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


/**
 * 逆时针绘制椭圆
 * @param {Number} start    起始角度 
 * @param {Number} end      终止角度
 * @param {Array(2)} center 圆心
 * @param {Array(2)} range  长轴与短轴
 * @param {Array(4)} color  颜色
 */
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


/**
 * 点raw绕center逆时针旋转angle角度
 * @param {Array} raw       被旋转点
 * @param {Array} center    旋转中心
 * @param {Number} angle    旋转角
 */
function rotate(raw, center, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let p = [raw[0] - center[0], raw[1] - center[1]];
    let np = [p[0]*c-p[1]*s, p[0]*s+p[1]*c];
    return [np[0] + center[0], np[1] + center[1]];
}

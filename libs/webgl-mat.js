// 对于变换矩阵的简易封装


const angle1 = Math.PI / 180;
/**
 * 位移矩阵
 * 
 * @param {number} dx x轴位移量
 * @param {number} dy y轴位移量
 * @param {number} dz z轴位移量
 * @return {Mat} 矩阵
 */
function moveMat(dx, dy, dz) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        dx,dy,dz,1
    ];
}


/**
 * x轴旋转矩阵
 * 
 * @param {number} angle 旋转角度
 * @return {Mat} 矩阵
 */
function rotateMatX(angle) {
    angle = angle * angle1;
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    return [
        1, 0, 0, 0,
        0, c, s, 0,
        0,-s, c, 0,
        0, 0, 0, 1
    ];
}


/**
 * y轴旋转矩阵
 * 
 * @param {number} angle 旋转角度
 * @return {Mat} 矩阵
 */
function rotateMatY(angle) {
    angle = angle * angle1;
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    return [
        c, 0, s, 0,
        0, 1, 0, 0,
        -s, 0, c, 0,
        0, 0, 0, 1
    ];
}


/**
 * x轴旋转矩阵
 * 
 * @param {number} angle 旋转角度
 * @return {Mat} 矩阵
 */
function rotateMatZ(angle) {
    angle = angle * angle1;
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    return [
        c, s, 0, 0,
        -s,c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}


/**
 * 放缩矩阵
 * 
 * @param {number} scaleX x轴拉伸比例
 * @param {number} scaleY y轴拉伸比例
 * @param {number} scaleZ z轴拉伸比例
 * @return {Mat} 矩阵
 */
function scaleMat(scaleX, scaleY, scaleZ) {
    return [
        scaleX,0,0,0,
        0,scaleY,0,0,
        0,0,scaleZ,0,
        0,0,0,1
    ];
}


/**
 * 矩阵乘法（4阶）
 * 
 * @param {Mat} a 原矩阵
 * @param {Mat} b 所乘矩阵
 * @return {Mat} 矩阵
 */
function multiMat(a, b) {
    let rt = new Array();
    for(let r=0;r<a.length/4;++r) {
        for(let c=0;c<4;++c) {
            let tmp = 0;
            for(let i=0;i<4;++i) {
                tmp += a[r*4+i] * b[i*4+c];
            }
            rt.push(tmp);
        }
    }
    return rt;
}


/**
 * 返回投影映射矩阵
 * 
 * @return {Mat} 矩阵
 */
function projectMat(theta, width, height, near, far) {
    let t = 1 / Math.tan(theta/180*Math.PI);
    let f = 2 / (far - near);

    return [
        height/width*t,0,0,0,
        0,t,0,0,
        0,0,f,0,
        0,0,-f*near-1,1
    ];
}


/**
 * 返回单位矩阵
 * 
 * @return {Mat} 矩阵
 */
function unitMat() {
    return [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
    ];
}

/**
 * 向量数乘
 * 
 * @return {Vector} 向量
 */
function numMul(x, y) {
    return x.map(x => x * y);
}

/**
 * Computes the inverse of a matrix.
 * @param {Matrix4} m matrix to compute inverse of
 * @return {Matrix4} a inverse matrix
 */
function inverse(m) {
    let dst = new Array(16);
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0  = m22 * m33;
    var tmp_1  = m32 * m23;
    var tmp_2  = m12 * m33;
    var tmp_3  = m32 * m13;
    var tmp_4  = m12 * m23;
    var tmp_5  = m22 * m13;
    var tmp_6  = m02 * m33;
    var tmp_7  = m32 * m03;
    var tmp_8  = m02 * m23;
    var tmp_9  = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;

    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
            (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
            (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
            (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
            (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
            (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
            (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
            (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
            (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
            (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
            (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

    return dst;
}
// 对于变换矩阵的简易封装


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
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    return [
        c, 0,-s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
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
    for(let r=0;r<4;++r) {
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
function projectMat(width, height, depth) {
    return [
        2 / width, 0, 0, 0,
        0, 2 / height, 0, 0,
        0, 0, 2 / depth, 0,
        0, 0, 0, 1,
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

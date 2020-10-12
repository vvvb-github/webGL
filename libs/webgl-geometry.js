// 常用几何体顶点着色器封装


/**
 * 正方体
 * 
 * @return {Array} 顶点序列
 */
function Cube() {
    return [
        // z=-1
        -1,-1,-1,
        1,1,-1,
        -1,1,-1,
        -1,-1,-1,
        1,-1,-1,
        1,1,-1,
        // z=1
        -1,-1,1,
        1,1,1,
        1,-1,1,
        -1,-1,1,
        -1,1,1,
        1,1,1,
        //y=-1
        -1,-1,-1,
        -1,-1,1,
        1,-1,1,
        -1,-1,-1,
        1,-1,1,
        1,-1,-1,
        //y=1
        -1,1,-1,
        1,1,1,
        -1,1,1,
        -1,1,-1,
        1,1,-1,
        1,1,1,
        //x=-1
        -1,-1,-1,
        -1,1,1,
        -1,-1,1,
        -1,-1,-1,
        -1,1,-1,
        -1,1,1,
        //x=1
        1,-1,-1,
        1,-1,1,
        1,1,1,
        1,-1,-1,
        1,1,1,
        1,1,-1,
    ];
}
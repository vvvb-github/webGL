// 常用几何体顶点着色器封装


/**
 * 正方体
 * 
 * @return {Array} 顶点序列
 */
function geo_Cube(a) {
    return [
        // z=-a
        -a,-a,-a,
        a,a,-a,
        -a,a,-a,
        -a,-a,-a,
        a,-a,-a,
        a,a,-a,
        // z=a
        -a,-a,a,
        a,a,a,
        a,-a,a,
        -a,-a,a,
        -a,a,a,
        a,a,a,
        //y=-a
        -a,-a,-a,
        -a,-a,a,
        a,-a,a,
        -a,-a,-a,
        a,-a,a,
        a,-a,-a,
        //y=a
        -a,a,-a,
        a,a,a,
        -a,a,a,
        -a,a,-a,
        a,a,-a,
        a,a,a,
        //x=-a
        -a,-a,-a,
        -a,a,a,
        -a,-a,a,
        -a,-a,-a,
        -a,a,-a,
        -a,a,a,
        //x=a
        a,-a,-a,
        a,-a,a,
        a,a,a,
        a,-a,-a,
        a,a,a,
        a,a,-a,
    ];
}
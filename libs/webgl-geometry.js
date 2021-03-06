// 常用几何体顶点着色器封装


/**
 * 立方体
 * @param {Number} a 边长
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
/**
 * 立方体法向量
 * @param {Number} dir 法向量方向，1朝外，-1朝内 
 */
function normal_Cube(dir) {
    return [
        0,0,-dir,
        0,0,-dir,
        0,0,-dir,
        0,0,-dir,
        0,0,-dir,
        0,0,-dir,
        0,0,dir,
        0,0,dir,
        0,0,dir,
        0,0,dir,
        0,0,dir,
        0,0,dir,
        0,-dir,0,
        0,-dir,0,
        0,-dir,0,
        0,-dir,0,
        0,-dir,0,
        0,-dir,0,
        0,dir,0,
        0,dir,0,
        0,dir,0,
        0,dir,0,
        0,dir,0,
        0,dir,0,
        -dir,0,0,
        -dir,0,0,
        -dir,0,0,
        -dir,0,0,
        -dir,0,0,
        -dir,0,0,
        dir,0,0,
        dir,0,0,
        dir,0,0,
        dir,0,0,
        dir,0,0,
        dir,0,0,
    ]
}


function rotate(raw, center, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let p = [raw[0] - center[0], raw[1] - center[1]];
    let np = [p[0]*c-p[1]*s, p[0]*s+p[1]*c];
    return [np[0] + center[0], np[1] + center[1]];
}
let RingAgle = [10,12,15,18,20,30];
function calRingAngle(range){
    let k = Math.round(range/10);
    if(k>4) k = 4;
    k = 4-k;
    ////.log(range,k,RingAgle[k]);
    return RingAgle[k];
}
function calSphereStep(range){//0~100 => 10~30
    return 10 + Math.round(range/5);
}
function drawCircleRingY(start, end, center, range,k){
    ////.log(range)
    let vertices = new Array();
    let a = [center[0] + range, center[2]];
    ////.log(range);
    let angle1 = 1/180*Math.PI * k;
    a = rotate(a, center, start*angle1);
    let frequency = (end - start) / k;
    for(let i=0;i<=frequency;++i) {
        vertices.push(a[0]);
        vertices.push(center[1]);
        vertices.push(a[1]);
        a = rotate(a, [center[0],center[2]], angle1);
        ////.log(sum);
    }
    ////.log("end:"+sum);
    return vertices;
}
function drawRingY3D(centerA, rangeA, centerB, rangeB,k){
    let verticesA = drawCircleRingY(0,360,centerA,rangeA,k);
    let verticesB = drawCircleRingY(0,360,centerB,rangeB,k);
    let n = verticesA.length;
    let vertices = new Array();
    for(let i=0;i<n;i+=3){
        vertices.push(verticesA[i]);
        vertices.push(verticesA[i+1]);
        vertices.push(verticesA[i+2]);
        vertices.push(verticesB[i]);
        vertices.push(verticesB[i+1]);
        vertices.push(verticesB[i+2]);
    }
    return vertices;
}
/**
 * 沿y轴用圆环堆成球体，球心为原点
 * @param {Number} start y轴起始位置，[-1,1] 
 * @param {*} end  y轴终止位置，[-1,1]
 * @param {*} range 半径
 */
function drawSphereY(start, end, range){//沿着y轴用圆环堆砌成圆 start,end ∈[-1,1]
    let l = start * range, r = end * range;
    let step = (r-l) / calSphereStep(range);
    let vertices = new Array();
    let k = calRingAngle(range/2);
    for(let y = l;y < r; y += step){
        let rangeA = Math.sqrt(Math.max(range * range - y*y,0));
        let ny = y + step;
        let rangeB = Math.sqrt(Math.max(range * range - ny*ny,0));
        let temp = drawRingY3D([0,y,0], rangeA, [0,ny,0], rangeB, k);
        for(let i = 0;i < temp.length;i++)
            vertices.push(temp[i]);
    }
    return vertices;
}
function CircleRingYAngle(start, end, center, range,k){
    let vertices = new Array();
    let curAngle = 0;
    let angle = 1/180*Math.PI * k;
    let frequency = (end - start) / k;
    for(let i=0;i<=frequency;++i) {
        vertices.push(curAngle);
        curAngle += angle;
    }
    return vertices;
}
function RingY3DAngle(centerA, rangeA, centerB, rangeB,k){
    let verticesA = CircleRingYAngle(0,360,centerA,rangeA,k);
    let verticesB = CircleRingYAngle(0,360,centerB,rangeB,k);
    let n = verticesA.length;
    let vertices = new Array();
    for(let i=0;i<n;i++){
        vertices.push(verticesA[i]);
        vertices.push(verticesB[i]);
    }
    return vertices;
}
function SphereAngle(start, end, range){
    //.log(range);
    let l = start * range, r = end * range;
    let step = (r-l) / calSphereStep(range);
    let vertices = new Array();
    let k = calRingAngle(range/2);
    for(let y = l;y < r; y += step){
        let rangeA = Math.sqrt(range * range - y*y);
        let AngleA = Math.acos(y/range);
        let ny = y + step;
        let rangeB = Math.sqrt(range * range - ny*ny);
        let AngleB = Math.acos(ny/range);
        let temp = RingY3DAngle([0,y,0], rangeA, [0,ny,0], rangeB,k);
        let invPi = 1/Math.PI;
        for(let i = 0;i < temp.length;i+=2){
            vertices.push(temp[i]*invPi*0.5);
            vertices.push(AngleA*invPi);
            vertices.push(temp[i+1]*invPi*0.5);
            vertices.push(AngleB*invPi);
        }   
    }
    return vertices;
}

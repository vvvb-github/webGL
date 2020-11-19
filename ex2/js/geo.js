function rotate(raw, center, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let p = [raw[0] - center[0], raw[1] - center[1]];
    let np = [p[0]*c-p[1]*s, p[0]*s+p[1]*c];
    return [np[0] + center[0], np[1] + center[1]];
}

function drawCircleZ(start, end, center, range) {//在xoy平面画圆

    let vertices = new Array();

    let a = [center[0] + range, center[1]];
    let b = null;
    let angle1 = 1/180*Math.PI;
    a = rotate(a, center, start*angle1);
    let frequency = end - start;
    vertices.push(center[0]);
    vertices.push(center[1]);
    vertices.push(center[2]);
    for(let i=0;i<=frequency;++i) {
        vertices.push(a[0]);
        vertices.push(a[1]);
        vertices.push(center[2]);
        a = rotate(a, center, angle1);
    }
    return vertices;
}

function drawCircleRingY(start, end, center, range){//在zox平面画环

    let vertices = new Array();

    let a = [center[0] + range, center[2]];
    let b = null;
    let k = 10;
    let angle1 = 1/180*Math.PI * k;
    a = rotate(a, center, start*angle1);
    let frequency = (end - start) / k;
    for(let i=0;i<=frequency;++i) {
        vertices.push(a[0]);
        vertices.push(center[1]);
        vertices.push(a[1]);
        a = rotate(a, [center[0],center[2]], angle1);
    }
    return vertices;
}
function drawRingY3D(centerA, rangeA, centerB, rangeB){
    let verticesA = drawCircleRingY(0,360,centerA,rangeA);
    let verticesB = drawCircleRingY(0,360,centerB,rangeB);
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
function drawSphereY(start, end, range){//沿着y轴用圆环堆砌成圆 start,end ∈[-1,1]
    let l = start * range, r = end * range;
    let step = (r-l) / 40;
    // console.log(step);
    let vertices = new Array();
    for(let y = l;y < r; y += step){
        
        let rangeA = Math.sqrt(range * range - y*y);
        console.log(y + ": " , rangeA);
        let ny = y + step;
        let rangeB = Math.sqrt(range * range - ny*ny);
        let temp = drawRingY3D([0,y,0], rangeA, [0,ny,0], rangeB);
        // console.log(temp);
        // console.log(temp.length/3);
        for(let i = 0;i < temp.length;i++)
            vertices.push(temp[i]);
    }
    // console.log(vertices);
    return vertices;
}
function ballonSkeleton(y){
    if(y<=10)return Math.sqrt(y) * Math.sqrt(10);
    if(y<=10.5)return 10;
    y -= 10.5;
    return Math.sqrt(100 - y*y);
}
function drawBallon(){
    let height = 20.5;
    let step = height / 30;
    let vertices = new Array();
    for(let y = 0; y < height; y += step){
        let rangeA = ballonSkeleton(y);
        let ny = y + step;
        let rangeB = ballonSkeleton(ny);
        let temp = drawRingY3D([0,y,0], rangeA, [0,ny,0], rangeB);
        for(let i = 0;i < temp.length;i++)
            vertices.push(temp[i]);
    }
    return vertices;
}
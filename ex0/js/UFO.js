function ballonSkeleton(y){
    let k = 30,gap = 2.3;
    let r = Math.sqrt(100 - gap*gap );
    if(y<=k-gap)return r*y/(k-gap);
    y -= k;
    return Math.sqrt( Math.max(100 - y*y,0) );
}
function drawBallon(){
    let height = 40;
    let step = height / 30;
    let vertices = new Array();
    for(let y = 0; y < height; y += step){
        let rangeA = ballonSkeleton(y);
        let ny = y + step;
        let rangeB = ballonSkeleton(ny);
        let temp = drawRingY3D([0,y,0], rangeA, [0,ny,0], rangeB, 30);
        for(let i = 0;i < temp.length;i++)
            vertices.push(temp[i]);
    }
    return vertices;
}
class UFO extends Node {
    constructor(name) {
        super(name);
        let vs = drawBallon();
        for(let i=0;i<vs.length;i+=3) {
            let v = multiMat([vs[i],vs[i+1],vs[i+2],1], rotateMatX(90));
            this.vertices.push(v[0],v[1],v[2]);
        }

        this.normals = this.vertices;
        let n = this.vertices.length;
        for(let i = 0; i < n; ++i){
            this.ambient.push(0, 1, 1);
            this.specular.push(0, 0, 0);
            this.diffuse.push(0, 0, 0);
        }
        this.drawWay = gl.TRIANGLE_STRIP;
        this.beta = 10;
        this.emissive = [1,1,1];

        this.Move(200,0,-750);
        this.addChild(new PointLight([1,1,1],[1,1,1],0.01));

        this.mSpeed = 300;
        this.rSpeed = 90;
    }

    //场景漫游
    update(dt) {
        dt/=1000;
        if(event_sys.keyBoard.W()) {
            this.Move(0,0,this.mSpeed*dt);
        }else if(event_sys.keyBoard.S()) {
            this.Move(0,0,-this.mSpeed*dt);
        }
        if(event_sys.keyBoard.A()) {
            this.RotateY(this.rSpeed*dt);
        }else if(event_sys.keyBoard.D()) {
            this.RotateY(-this.rSpeed*dt);
        }
    }
}
function crossDot(x, y){
    return [
        x[1]*y[2]-x[2]*y[1],
        x[2]*y[0]-x[0]*y[2],
        x[0]*y[1]-x[1]*y[0]
    ]       
}
function minus(x,y){
    return [
        x[0] - y[0],
        x[1] - y[1],
        x[2] - y[2]
    ]
}
class GoldBar extends Node {
    constructor(name) {
        super(name)
        let s = 5,l = 6, y = 3, z = 1;
        let tmp = [];
        tmp.push([0,0,0])
        tmp.push([-s,y,-z]);
        tmp.push([-s,y,z]);
        tmp.push([s,y,z]);
        tmp.push([s,y,-z]);
        tmp.push([-l,0,-z]);
        tmp.push([-l,0,z]);
        tmp.push([l,0,z]);
        tmp.push([l,0,-z]);
        this.vertices = this.vertices.concat(tmp[2]);//顶面
        this.vertices = this.vertices.concat(tmp[1]);
        this.vertices =  this.vertices.concat(tmp[4]);
        this.vertices = this.vertices.concat(tmp[4]);
        this.vertices = this.vertices.concat(tmp[3]);
        this.vertices = this.vertices.concat(tmp[2]);

        this.vertices = this.vertices.concat(tmp[5]);//顶面
        this.vertices = this.vertices.concat(tmp[6]);
        this.vertices = this.vertices.concat(tmp[7]);
        this.vertices = this.vertices.concat(tmp[7]);
        this.vertices = this.vertices.concat(tmp[8]);
        this.vertices = this.vertices.concat(tmp[5]);

        this.vertices = this.vertices.concat(tmp[1]);//正面
        this.vertices = this.vertices.concat(tmp[5]);
        this.vertices = this.vertices.concat(tmp[8]);
        this.vertices = this.vertices.concat(tmp[8]);
        this.vertices = this.vertices.concat(tmp[4]);
        this.vertices = this.vertices.concat(tmp[1]);

        this.vertices = this.vertices.concat(tmp[2]);//后面
        this.vertices = this.vertices.concat(tmp[3]);
        this.vertices = this.vertices.concat(tmp[7]);
        this.vertices = this.vertices.concat(tmp[7]);
        this.vertices = this.vertices.concat(tmp[6]);
        this.vertices = this.vertices.concat(tmp[2]);

        this.vertices = this.vertices.concat(tmp[2]);//左面
        this.vertices = this.vertices.concat(tmp[6]);
        this.vertices = this.vertices.concat(tmp[5]);
        this.vertices = this.vertices.concat(tmp[5]);
        this.vertices = this.vertices.concat(tmp[1]);
        this.vertices = this.vertices.concat(tmp[2]);

        this.vertices = this.vertices.concat(tmp[3]);//右面
        this.vertices = this.vertices.concat(tmp[4]);
        this.vertices = this.vertices.concat(tmp[8]);
        this.vertices = this.vertices.concat(tmp[8]);
        this.vertices = this.vertices.concat(tmp[7]);
        this.vertices = this.vertices.concat(tmp[3]);        
        
        let n = this.vertices.length
        // console.log(n);
        this.normals = [];
        for(let i = 0; i < n;i += 9){
            let a = this.vertices.slice(i,i+3);
            let b = this.vertices.slice(i+3,i+6);
            let c = this.vertices.slice(i+6,i+9);
            // console.log(a,b,c)
            // console.log(minus(b,a),minus(c,b))
            let buff = crossDot(minus(b,a),minus(c,b));
            buff = [-buff[0],-buff[1],-buff[2]]
            // console.log(buff)
            this.normals = this.normals.concat(buff);
            this.normals = this.normals.concat(buff);
            this.normals = this.normals.concat(buff);
        }
        
        this.beta = 1.2;

        for(let i = 0; i < n; ++i){
            this.ambient.push(0.24725, 0.1995, 0.0745);
            this.specular.push(0.628281, 0.555802, 0.366065);
            this.diffuse.push(0.75164, 0.60648, 0.22648);
        }
    }
}

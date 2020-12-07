class Cube extends Node {
    constructor(name) {
        super(name);

        this.vertices = geo_Cube(10);
        this.normals = normal_Cube(1);
        this.beta = 1;

        for(let i = 0; i < 6; ++i){
            for(let j = 0; j < 6 ;++j){
                this.ambient.push(0.24725, 0.1995, 0.0745);
                this.specular.push(0.628281, 0.555802, 0.366065);
                this.diffuse.push(0.75164, 0.60648, 0.22648);
            }
        }
    }
}

let cube = new Cube("cube");
cube.Move(0,0,20);
scene.addChild(cube);


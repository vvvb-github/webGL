class House extends Node {
    constructor(name) {
        super(name);

        this.vertices = geo_Cube(1);
        this.Resize(100,50,100)
        this.normals = normal_Cube(-1);
        this.beta = 0.5;

        for(let i = 0; i < 6; ++i){
            for(let j = 0; j < 6 ;++j){
                this.ambient.push(0.135, 0.2225, 0.1575);
                this.specular.push(0.316228, 0.316228, 0.316228);
                this.diffuse.push(0.54, 0.89, 0.63);
            }
        }
    }
}

let YggHouse = new House("house");
YggHouse.Move(0,0,0);
scene.addChild(YggHouse);


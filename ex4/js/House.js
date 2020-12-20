class Wall extends Node {
    constructor() {
        super('wall');

        this.vertices = [
            -1,-1,1,
            -1,1,1,
            1,-1,1,
            -1,1,1,
            1,-1,1,
            1,1,1,
            1,-1,1,
            1,1,1,
            1,-1,-1,
            1,1,1,
            1,-1,-1,
            1,1,-1,
            1,-1,-1,
            1,1,-1,
            -1,-1,-1,
            1,1,-1,
            -1,-1,-1,
            -1,1,-1,
            -1,-1,-1,
            -1,1,-1,
            -1,-1,1,
            -1,1,-1,
            -1,-1,1,
            -1,1,1
        ];
        this.normals = [
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            -1,0,0,
            -1,0,0,
            -1,0,0,
            -1,0,0,
            -1,0,0,
            -1,0,0,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            1,0,0,
            1,0,0,
            1,0,0,
            1,0,0,
            1,0,0,
            1,0,0,
        ];
        this.beta = 0.5;
        for(let i=0;i<24;++i){
            this.specular.push(0.5, 0.5, 0.5);
        }
        this.loadTexture(url + 'wall.png');
        for(let i=0;i<6;++i) {
            this.texcoords.push(
                0,0,
                0,1,
                1,0,
                0,1,
                1,0,
                1,1
            );
        };
    }
}

class Board extends Node {
    constructor() {
        super('board');

        this.vertices = [
            -1,1,-1,
            -1,1,1,
            1,1,-1,
            1,1,1
        ];
        this.drawWay = gl.TRIANGLE_STRIP;
        this.normals = [
            0,-1,0,
            0,-1,0,
            0,-1,0,
            0,-1,0,
        ];
        this.beta = 0.5;
        for(let i=0;i<4;++i){
            this.specular.push(0.5,0.5,0.5);
        }
        this.loadTexture(url + 'board.png');
        this.texcoords = [
            0,0,
            0,1,
            1,0,
            1,1
        ];

        this.addChild(new Wall());
    }
}

class House extends Node {
    constructor() {
        super('house');

        this.vertices = [
            -1,-1,-1,
            -1,-1,1,
            1,-1,-1,
            1,-1,1
        ];
        this.drawWay = gl.TRIANGLE_STRIP;
        this.normals = [
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,
        ];
        this.beta = 0.5;
        for(let i=0;i<4;++i){
            this.specular.push(0.316228, 0.316228, 0.316228);
        }
        this.loadTexture(url + 'ground.png');
        this.texcoords = [
            0,0,
            0,1,
            1,0,
            1,1
        ];

        this.addChild(new Wall());
        this.addChild(new Board());
    }
}

class Lamp extends Node{
    constructor() {
        super();
        this.moveSpeed = 96;
        this.drawWay = gl.TRIANGLE_STRIP;

        this.beta = 1;
        this.vertices = drawSphereY(-1,1,10)
        for(let i = 0; i < this.vertices.length; ++i){
            this.normals.push(-this.vertices[i]);
        }
        for(let i = 0; i < this.vertices.length/3; ++i){
            this.ambient.push(1.2,1.2,1.2);
            this.specular.push(0,0,0);
            this.diffuse.push(0,0,0);
        }

        this.texcoords = SphereAngle(-1, 1, 10);
        this.loadTexture(url + 'crystal-16.jpg');
        for(let i=0;i<this.texcoords.length;i+=2) this.texcoords[i] *= 3;

        this.emissive = [1,0,0];
        this.clr = [255,0,0];
        this.state = 0;
        this.light = new PointLight(this.emissive, this.emissive);
        this.addChild(this.light);
        this.light.active = false;
        this.white = new PointLight([1,1,1],[1,1,1]);
        this.addChild(this.white);
    }

    update(dt){
        switch(this.state%6) {
            case 0:
                this.clr[2]++;
                if(this.clr[2]===255) this.state++;
                break;
            case 1:
                this.clr[0]--;
                if(this.clr[0]===0) this.state++;
                break;
            case 2:
                this.clr[1]++;
                if(this.clr[1]===255) this.state++;
                break;
            case 3:
                this.clr[2]--;
                if(this.clr[2]===0) this.state++;
                break;
            case 4:
                this.clr[0]++;
                if(this.clr[0]===255) this.state++;
                break;
            case 5:
                this.clr[1]--;
                if(this.clr[1]===0) this.state++;
                break;
        }
        if(this.light.active) this.emissive = [this.clr[0]/255, this.clr[1]/255, this.clr[2]/255];
        else this.emissive = [1,1,1];
        this.light.l_diffuse = this.emissive;
        this.light.l_specular = this.emissive;
        //w键前进
        if(event_sys.keyBoard.W()) {
            this.Move(0,0, this.moveSpeed*dt/1000);
        }
        //s键后退
        else if(event_sys.keyBoard.S()) {
            this.Move(0,0, -this.moveSpeed*dt/1000);
        }
        //a键左移
        else if(event_sys.keyBoard.A()){
            this.Move(-this.moveSpeed*dt/1000,0,0);
        }
        //d键右移
        else if(event_sys.keyBoard.D()){
            this.Move(this.moveSpeed*dt/1000,0,0);
        }
        else if(event_sys.keyBoard.G()){
            this.Move(0,this.moveSpeed*dt/1000,0);
        }
        else if(event_sys.keyBoard.H()){
            this.Move(0,-this.moveSpeed*dt/1000,0);
        }
    }
}

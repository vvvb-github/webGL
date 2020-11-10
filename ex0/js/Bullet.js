class Bullet extends Node {
    constructor() {
        super('bullet');

        this.vertices = geo_Cube(2.5);
        this.deadTime = 3000;
        this.Resize(1,1,2);
        for(let i=0;i<this.vertices.length;++i) {
            this.colors.push(1,0,0,1);
        }
        this.speed = 1000;
        this.lifetime = 0;
    }

    update(dt) {
        // 子弹3s后自动消失
        this.lifetime += dt;
        if(this.lifetime >= this.deadTime) {
            this.destroy();
            return;
        }
        // 子弹向前飞，速度1000 /s
        this.Move(0,0,this.speed*dt/1000);
    }
}
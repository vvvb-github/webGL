class Cube extends Node {
    constructor(name) {
        super(name);

        this.vertices = geo_Cube(1);
        let color = [Math.random(),Math.random(),Math.random(),1];
        for(let i=0;i<6;++i)  {
            for(let j=0;j<6;++j)
                this.colors.push(color[0],color[1],color[2],color[3]);
        }
    }
}

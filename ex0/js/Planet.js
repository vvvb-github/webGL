class Planet extends Node {
    constructor(src, r, spd_self, name) {
        super(name);

        this.vertices = drawSphereY(-1, 1, r);
        this.normals = this.vertices;
        
        this.texture = new Image(16,16);
        this.texture.crossOrigin = 'anonymous';
        this.texture.src = src;
        
        let tpi = 2*Math.PI;
        for(let i=0;i<this.vertices.length;i+=3) {
            let x=this.vertices[i], y=this.vertices[i+1], z=this.vertices[i+2];
            let c = Math.acos(y/Math.sqrt(x*x+y*y+z*z));
            c = Math.acos(z/r/Math.sin(c));
            if(!c) c=0;
            if(x<0) c = tpi - c;
            this.texcoords.push(c/tpi);
            c = Math.acos(-y/Math.sqrt(x*x+y*y+z*z));
            this.texcoords.push(c/Math.PI);
        }

        this.self_rotspeed = spd_self;
    }

    draw() {
        setAttrib('a_position', this.vertices, 3);

        if(this.texture) {
            setAttrib('a_texcoord', this.texcoords, 2);
            gl.uniform1i(gl.getUniformLocation(program,'u_usetexture'), 1);

            gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, this.texture);
            
            let w = this.texture.width, h = this.texture.height;
            if ((w&(w-1)==0) && (h&(h-1)==0)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        } else {
            setAttrib('a_color', this.colors, 4);
            gl.uniform1i(gl.getUniformLocation(program,'u_usetexture'), 0);
        }

        setAttrib('a_normal', this.normals, 3);
        gl.uniform1f(gl.getUniformLocation(program,'u_smooth'), this.smooth);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length / 3);
    }

    update(dt) {
        this.RotateY(this.self_rotspeed*dt/1000);
    }
}

class Orbital extends Node {
    constructor(r, spd, planet, name) {
        super(name);

        this.vertices = drawRingY3D([0,-1,0],r,[0,1,0],r);
        for(let i=0;i<this.vertices.length/3;++i) {
            this.colors.push(1,1,1,1);
        }
        this.vertices.forEach(num=>{
            this.normals.push(-num);
        });

        this.addChild(planet);
        planet.Move(0, 0, -r);

        this.rotspeed = spd;
    }

    draw() {
        // setAttrib('a_position', this.vertices, 3);
        // setAttrib('a_color', this.colors, 4);
        // setAttrib('a_normal', this.normals, 3);
        // gl.uniform1f(gl.getUniformLocation(program,'u_smooth'), this.smooth);

        // gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length/3);
    }

    update(dt) {
        this.RotateY(this.rotspeed*dt/1000);
    }
}

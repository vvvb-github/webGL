const normalShader = {
    vertexSource: `
        precision mediump float;
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_matrix;
        uniform mat4 u_project;
        uniform mat4 u_camera;
        varying vec4 v_color;

        void main() {
            v_color = a_color;
            vec4 pos = u_camera * u_matrix * a_position;

            if(pos.z <= 0.0) {
                gl_Position = u_project * vec4(pos.x * 10000.0, pos.y * 10000.0, pos.zw);
            } else {
                gl_Position = u_project * vec4(pos.x/pos.z, pos.y/pos.z, pos.zw);
            }
            
        }
    `,
    fragmentSource: `
        precision mediump float;
        varying vec4 v_color;

        void main() {
            gl_FragColor = v_color;
        }
    `
};

const lightShader = {
    vertexSource: `
        precision mediump float;
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec4 a_normal;
        uniform mat4 u_matrix;
        uniform mat4 u_project;
        uniform mat4 u_camera;

        uniform float u_smooth;
        uniform mat4 u_lightMat[10];
        uniform vec3 u_lightColor[10];
        uniform float u_brightness[10];
        uniform int u_lightCount;

        varying vec4 v_color;

        void main() {
            v_color = a_color;
            vec4 pos = u_camera * u_matrix * a_position;

            if(pos.z <= 0.0) {
                gl_Position = u_project * vec4(pos.x * 10000.0, pos.y * 10000.0, pos.zw);
            } else {
                gl_Position = u_project * vec4(pos.x/pos.z, pos.y/pos.z, pos.zw);
            }
            
            vec4 clr = vec4(0.0, 0.0, 0.0, 1.0);
            for(int i=0;i<10;i++) {
                if(i>=u_lightCount) break;
                v_color = a_color;
                vec4 lightpos = u_camera * u_lightMat[i] * vec4(0.0, 0.0, 0.0, 1.0);
                vec3 lightdir = normalize(lightpos.xyz - pos.xyz);
                vec4 normals = u_camera * u_matrix * a_normal;
                normals -= u_camera * u_matrix * vec4(0.0, 0.0, 0.0, 1.0);
                vec3 normal = normalize(normals.xyz);

                float light = dot(lightdir, normal);
                v_color.rgb *= light * u_brightness[i] * u_lightColor[i];

                vec3 cameradir = -normalize(pos.xyz);
                vec3 middle = normalize(cameradir + lightdir);
                float highlight = dot(middle, normal);
                if(u_smooth<0.001) {
                    highlight = 0.0;
                } else {
                    if(highlight<=0.0) {
                        highlight = pow(-highlight, 1.0 / u_smooth);
                        highlight = -highlight;
                    } else {
                        highlight = pow(highlight, 1.0 / u_smooth);
                    }
                }
                v_color.rgb += highlight * u_brightness[i] * u_lightColor[i];

                if(clr.r<v_color.r) clr.r=v_color.r;
                if(clr.g<v_color.g) clr.g=v_color.g;
                if(clr.b<v_color.b) clr.b=v_color.b;
            }

            v_color = clr;
        }
    `,
    fragmentSource: `
        precision mediump float;
        varying vec4 v_color;

        void main() {
            gl_FragColor = v_color;
        }
    `
};

const lightShader = {
    vertexSource: `
        precision mediump float;
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec4 a_normal;
        uniform mat4 u_matrix;
        uniform mat4 u_project;
        uniform mat4 u_camera;

        attribute vec2 a_texcoord;
        uniform sampler2D u_texture;
        uniform int u_usetexture;

        uniform float u_smooth;
        uniform mat4 u_lightMat[10];
        uniform vec3 u_lightColor[10];
        uniform float u_brightness[10];
        uniform int u_lightCount;

        varying vec4 v_color;

        void main() {
            vec4 pos = u_camera * u_matrix * a_position;

            gl_Position = u_project * vec4(pos.xy, -pos.z, pos.w);

            vec4 color;
            if(u_usetexture == 0) color = a_color;
            else color = texture2D(u_texture, a_texcoord);
            v_color = color;

            if(u_lightCount <= 0) return;
            vec4 clr = vec4(0.0, 0.0, 0.0, 1.0);
            for(int i=0;i<10;i++) {
                if(i>=u_lightCount) break;
                v_color = color;
                vec4 lightpos = u_camera * u_lightMat[i] * vec4(0.0, 0.0, 0.0, 1.0);
                vec3 lightdir = normalize(lightpos.xyz - pos.xyz);
                vec4 normals = u_camera * u_matrix * a_normal;
                normals -= u_camera * u_matrix * vec4(0.0, 0.0, 0.0, 1.0);
                vec3 normal = normalize(normals.xyz);

                float light = dot(lightdir, normal);
                v_color.rgb *= light * u_brightness[i];

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

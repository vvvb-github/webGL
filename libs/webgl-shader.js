const lightShader = {
    vertexSource: `
        precision mediump float;
        attribute vec4 a_position;
        attribute vec4 a_normal;
        attribute vec3 a_ambient;
        attribute vec3 a_specular;
        attribute vec3 a_diffuse;
        uniform mat4 u_matrix;
        uniform mat4 u_project;
        uniform mat4 u_camera;

        varying vec4 v_position;
        varying vec4 v_normal;
        varying vec3 v_Ka;
        varying vec3 v_Ks;
        varying vec3 v_Kd;
        varying mat4 v_camera;

        attribute vec2 a_texcoord;
        uniform int u_usetexture;
        varying vec2 v_texcoord;

        void main() {
            vec4 pos = u_camera * u_matrix * a_position;

            gl_Position = u_project * vec4(pos.xy, -pos.z, pos.w);

            if(u_usetexture < 1) {
                v_Ka = a_ambient;
                v_Kd = a_diffuse;
                v_texcoord = vec2(-1.0, -1.0);
            } else {
                v_texcoord = a_texcoord;
            }

            v_Ks = a_specular;
            v_Kd = a_diffuse;
            
            v_position = pos; 
            v_normal = (u_camera * u_matrix * a_normal) - (u_camera * u_matrix * vec4(0.0,0.0,0.0,1.0));
            v_camera = u_camera;
        }
    `,
    fragmentSource: `
        precision mediump float;
        varying vec4 v_position;
        varying vec4 v_normal;
        
        uniform float u_beta;
        uniform mat4 u_lightMat;
        uniform vec3 u_Em;
        uniform vec3 u_Ld;
        uniform vec3 u_Ls;
        uniform vec3 u_La;
        varying vec3 v_Kd;
        varying vec3 v_Ks;
        varying vec3 v_Ka;
        varying mat4 v_camera;

        uniform sampler2D u_texture;
        varying vec2 v_texcoord;

        void main() {
            vec3 Ka = v_Ka;
            vec3 Kd = v_Kd;
            float a = 1.0;
            float b = 0.0;
            float c = 0.0;

            if(v_texcoord.x >= 0.0) {
                Ka = vec3(texture2D(u_texture, v_texcoord).rgb);
                Kd = Ka;
            }

            vec3 l = vec3((v_camera * u_lightMat * vec4(0.0,0.0,0.0,1.0) - v_position).xyz);
            float d2 = dot(l, l);
            l = normalize(l);
            vec3 v = vec3((-v_position).xyz);
            v = normalize(v);
            vec3 h = l + v;
            h = normalize(h);
            vec3 n = normalize(vec3(v_normal.xyz));
            
            float temp1 = dot(l, n);
            if (temp1 < 0.0)
                temp1 = 0.0;
            
            float temp2 = dot(n, h);
            if(temp2 < 0.0)
                temp2 = 0.0;
            
            vec3 I = u_Em * Ka + Ka * u_La + (Kd * u_Ld * 
                temp1 + v_Ks * u_Ls * pow(temp2, u_beta))/(a + b * sqrt(d2) + c * d2);
        
            gl_FragColor = vec4(I.xyz, 1.0);
        }
    `
};

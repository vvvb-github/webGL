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
        varying vec4 v_color;
        varying vec4 v_normal;
        varying vec3 u_Ka;
        varying vec3 u_Ks;
        varying vec3 u_Kd;
        varying mat4 v_camera;

        void main() {
            vec4 pos = u_camera * u_matrix * a_position;

            gl_Position = u_project * vec4(pos.xy, -pos.z, pos.w);
            
            u_Ka = a_ambient;
            u_Ks = a_specular;
            u_Kd = a_diffuse;
            
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
        uniform vec3 u_Ld;
        uniform vec3 u_Ls;
        uniform vec3 u_La;
        varying vec3 u_Kd;
        varying vec3 u_Ks;
        varying vec3 u_Ka;
        varying mat4 v_camera;

        void main() {
            float a = 1.0;
            float b = 0.0;
            float c = 0.0;
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
            
            vec3 I = u_Ka * u_La + (u_Kd * u_Ld * 
                temp1 + u_Ks * u_Ls * pow(temp2, u_beta))/(a + b * sqrt(d2) + c * d2);
        
            gl_FragColor = vec4(I.xyz, 1.0);
        }
    `
};

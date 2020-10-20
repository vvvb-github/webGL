function setVec2(vec2, varname) {
    gl.uniform2fv(gl.getUniformLocation(program, varname), new Float32Array(vec2));
}


function setVec4(vec4, varname) {
    gl.uniform4fv(gl.getUniformLocation(program, varname), new Float32Array(vec4));
}


function setFloat(float, varname) {
    gl.uniform1f(gl.getUniformLocation(program, varname), float);
}

function setMat(mat, varname) {
    gl.uniformMatrix4fv(gl.getUniformLocation(program, varname), false, mat);
}
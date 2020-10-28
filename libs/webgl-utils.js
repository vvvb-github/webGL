// 对于webgl的一些简易封装


/**
 * 调整画布大小为显示大小
 * 
 * @param {!HtmlElement} canvas 用于绘制的画布
 */
function resize(canvas) {
    // 获取浏览器中画布的显示尺寸
    let displayWidth  = canvas.clientWidth;
    let displayHeight = canvas.clientHeight;
   
    // 检尺寸是否相同
    if (canvas.width  != displayWidth || canvas.height != displayHeight) {   
        // 设置为相同的尺寸
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }
}


/**
 * 清空画布
 * 
 * @param {!HtmlElement} canvas 用于绘制的画布
 */
function clearCanvas(gl) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}


/**
 * 设置gl画布大小并适应
 * 
 * @param {!WebGLRenderingContext} gl WebGL上下文 
 */
function resizeCanvasAndFit(gl) {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}


/**
 * 创建并编译一个着色器
 *
 * @param {!WebGLRenderingContext} gl WebGL上下文。
 * @param {string} shaderSource GLSL 格式的着色器代码
 * @param {number} shaderType 着色器类型, VERTEX_SHADER 或
 *     FRAGMENT_SHADER。
 * @return {!WebGLShader} 着色器。
 */
function compileShader(gl, shaderSource, shaderType) {
    // 创建着色器程序
    let shader = gl.createShader(shaderType);
   
    // 设置着色器的源码
    gl.shaderSource(shader, shaderSource);
   
    // 编译着色器
    gl.compileShader(shader);
   
    // 检测编译是否成功
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        // 编译过程出错，获取错误信息。
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }
   
    return shader;
}


/**
 * 用 script 标签的内容创建着色器
 *
 * @param {!WebGLRenderingContext} gl WebGL上下文。
 * @param {string} scriptId script标签的id。
 * @param {string} opt_shaderType. 要创建的着色器类型。
 *     如果没有定义，就使用script标签的type属性。
 *     
 * @return {!WebGLShader} 着色器。
 */
function createShaderFromScript(gl, scriptId, opt_shaderType) {
    // 通过id找到script标签
    let shaderScript = document.getElementById(scriptId);
    if (!shaderScript) {
      throw("*** Error: unknown script element" + scriptId);
    }
   
    // 提取标签内容。
    let shaderSource = shaderScript.text;
   
    // 如果没有传着色器类型，就使用标签的 ‘type’ 属性
    if (!opt_shaderType) {
        if (shaderScript.type == "x-shader/x-vertex") {
            opt_shaderType = gl.VERTEX_SHADER;
        } else if (shaderScript.type == "x-shader/x-fragment") {
            opt_shaderType = gl.FRAGMENT_SHADER;
        } else if (!opt_shaderType) {
            throw("*** Error: shader type not set");
        }
    }
   
    return compileShader(gl, shaderSource, opt_shaderType);
}


/**
 * 从 2 个着色器中创建一个程序
 *
 * @param {!WebGLRenderingContext} gl WebGL上下文。
 * @param {!WebGLShader} vertexShader 一个顶点着色器。
 * @param {!WebGLShader} fragmentShader 一个片断着色器。
 * @return {!WebGLProgram} 程序
 */
function createProgram(gl, vertexShader, fragmentShader) {
    // 创建一个程序
    let program = gl.createProgram();

    // 附上着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 链接到程序
    gl.linkProgram(program);

    // 检查链接是否成功
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // 链接过程出现问题
        throw ("program failed to link:" + gl.getProgramInfoLog (program));
    }

    return program;
};


/**
 * 通过两个 script 标签创建程序。
 *
 * @param {!WebGLRenderingContext} gl WebGL上下文。
 * @param {string} vertexShaderId 顶点着色器的标签id。
 * @param {string} fragmentShaderId 片断着色器的标签id。
 * @return {!WebGLProgram} 程序。
 */
function createProgramFromScripts(gl, vertexShaderId, fragmentShaderId) {
    let vertexShader = createShaderFromScript(gl, vertexShaderId, gl.VERTEX_SHADER);
    let fragmentShader = createShaderFromScript(gl, fragmentShaderId, gl.FRAGMENT_SHADER);
    return createProgram(gl, vertexShader, fragmentShader);
}


/**
 * 通过两段代码文本创建程序
 * 
 * @param {!WebGLRenderingContext} gl WebGL上下文。
 * @param {string} vertexSource 顶点着色器的代码。
 * @param {string} fragmentSource 片断着色器的代码。
 * @return {!WebGLProgram} 程序。
 */
function createProgramFromText(gl, vertexSource, fragmentSource) {
    let vertexShader = compileShader(gl, vertexSource, gl.VERTEX_SHADER);
    let fragmentShader = compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
    return createProgram(gl, vertexShader, fragmentShader);
}

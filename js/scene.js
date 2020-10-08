// 设置场景中各物体


let objList = [
    {
        // 顶点着色器数据
        vertexArray: null,
        // 变换矩阵
        transformMat: null,
        // 片段着色器数据
        colorArray: null,
        // 一些自定义属性
        properties: {
            rx: 0,
            ry: 0,
            rz: 0,
            dx: 0,
            dy: 0,
            dz: 0
        },
        // 初始化函数，在启动时自动执行一次
        start: function() {
            // 设置着色器相关数据
            this.vertexArray = Cube();
            this.transformMat = scaleMat(100,100,100);
            this.colorArray = new Array();
            for(let i=0;i<6;++i) {
                let color = [Math.random(), Math.random(), Math.random(), 1];
                for(let j=0;j<6;++j) {
                    this.colorArray.push(color[0], color[1], color[2], color[3]);
                }
            }

            // 设置按钮监听事件
            document.querySelector("#x-rotate").onmousedown = ()=>{this.properties.rx = 1;}
            document.querySelector("#x-rotate").onmouseup = ()=>{this.properties.rx = 0;}
            document.querySelector("#y-rotate").onmousedown = ()=>{this.properties.ry = 1;}
            document.querySelector("#y-rotate").onmouseup = ()=>{this.properties.ry = 0;}
            document.querySelector("#z-rotate").onmousedown = ()=>{this.properties.rz = 1;}
            document.querySelector("#z-rotate").onmouseup = ()=>{this.properties.rz = 0;}
            document.querySelector("#up").onmousedown = ()=>{this.properties.dy = 1;}
            document.querySelector("#up").onmouseup = ()=>{this.properties.dy = 0;}
            document.querySelector("#down").onmousedown = ()=>{this.properties.dy = -1;}
            document.querySelector("#down").onmouseup = ()=>{this.properties.dy = 0;}
            document.querySelector("#right").onmousedown = ()=>{this.properties.dx = 1;}
            document.querySelector("#right").onmouseup = ()=>{this.properties.dx = 0;}
            document.querySelector("#left").onmousedown = ()=>{this.properties.dx = -1;}
            document.querySelector("#left").onmouseup = ()=>{this.properties.dx = 0;}
            document.querySelector("#front").onmousedown = ()=>{this.properties.dz = 1;}
            document.querySelector("#front").onmouseup = ()=>{this.properties.dz = 0;}
            document.querySelector("#back").onmousedown = ()=>{this.properties.dz = -1;}
            document.querySelector("#back").onmouseup = ()=>{this.properties.dz = 0;}
        },
        /**
         * 更新函数，每一帧均会被调用
         * @param {number} dt 帧时间
         */
        update: function(dt) {
            // 设置旋转角速度为 pi rad/s
            if(this.properties.rx != 0) {
                this.transformMat = multiMat(this.transformMat, rotateMatX(this.properties.rx*Math.PI*dt/1000));
            } else if (this.properties.ry != 0) {
                this.transformMat = multiMat(this.transformMat, rotateMatY(this.properties.ry*Math.PI*dt/1000));
            } else if (this.properties.rz != 0) {
                this.transformMat = multiMat(this.transformMat, rotateMatZ(this.properties.rz*Math.PI*dt/1000));
            } 
            this.transformMat = multiMat(this.transformMat, moveMat(this.properties.dx*300*dt/1000,
                this.properties.dy*300*dt/1000, this.properties.dz*300*dt/1000));
        }
    },
    // {   // 模板代码
    //     // 顶点着色器数据
    //     vertexArray: null,
    //     // 变换矩阵
    //     transformMat: null,
    //     // 片段着色器数据
    //     colorArray: null,
    //     // 一些自定义属性
    //     properties: {},
    //     // 初始化函数，在启动时自动执行一次
    //     start: function() {
    //         // 初始化逻辑
    //     },
    //     /**
    //      * 更新函数，每一帧均会被调用
    //      * @param {number} dt 帧时间
    //      */
    //     update: function(dt) {
    //         // 更新逻辑
    //     }
    // },
];
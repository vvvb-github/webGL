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
            rz: 0
        },
        // 初始化函数，在启动时自动执行一次
        start: function() {
            // 设置着色器相关数据
            this.vertexArray = Cube();
            this.transformMat = scaleMat(300,300,300);
            this.colorArray = new Array();
            for(let i=0;i<6;++i) {
                let color = [Math.random(), Math.random(), Math.random(), 1];
                for(let j=0;j<6;++j) {
                    this.colorArray.push(color[0], color[1], color[2], color[3]);
                }
            }

            // 开启键盘监听事件
            document.onkeydown = event=>{
                if(event.keyCode == 87) this.properties.rx = 1;
                if(event.keyCode == 83) this.properties.rx = -1;
                if(event.keyCode == 65) this.properties.ry = 1;
                if(event.keyCode == 68) this.properties.ry = -1;
                if(event.keyCode == 32) this.properties.rz = 1;
            };

            document.onkeyup = event=>{
                if(event.keyCode == 87) this.properties.rx = 0;
                if(event.keyCode == 83) this.properties.rx = 0;
                if(event.keyCode == 65) this.properties.ry = 0;
                if(event.keyCode == 68) this.properties.ry = 0;
                if(event.keyCode == 32) this.properties.rz = 0;
            };
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
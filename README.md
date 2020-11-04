# 图形学课程设计

### github远程仓库
- [webGL](https://github.com/vvvb-github/webGL)

### 参考资源
- [webGL教程](https://webglfundamentals.org/)
- [html/css/javascript教程](https://www.runoob.com/)
- [RGB表](http://www.ilikeseo.cn/wangzhanyingxiaozhishi_30.html)

### 项目结构说明
- assets ：存放各类资源，如图片、模型、音效等
- ex0-ex4 ：分别对应5次实验
- libs ：存放一些手搓的简易封装脚本
- index.html ：网页主页
- index.css ：主页样式表
- index.js ：主页业务代码

### 环境配置
- [Git](https://git-scm.com/downloads) git管理工具，官网免费下载安装
- [vscode](https://code.visualstudio.com/) 推荐使用，轻量便捷、插件丰富，官网免费下载安装
- 推荐插件（在vscode插件商店中搜索即可）：
  1. **vscode-icons** 美化文件/文件夹图标
  2. **open in browser** 在html文档中右击选择open in default browser即可直接在默认浏览器打开预览你的html文档
  3. **Braket Pair Colorizer** 更漂亮的括号高亮匹配
  4. **One Dark Pro** 更改vscode主题
  5. **Markdown All in One** markdown高亮支持与预览

### 简易引擎手册

#### 快速上手
想要使用手搓简易引擎，请将以下模板代码复制粘贴至你的html文档：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>综合实验</title>
    <!-- 引入你的CSS样式表 -->
    <script src="../libs/webgl-utils.js"></script>
    <script src="../libs/webgl-mat.js"></script>
    <script src="../libs/webgl-geometry.js"></script>
    <script src="../libs/Event.js"></script>
    <script src="../libs/Node.js"></script>
    <script src="../libs/Scene.js"></script>
    <script src="../libs/Camera.js"></script>
</head>
<body>
    <script src="../libs/webgl-engine.js"></script>
    <!-- 引入你的js脚本 -->
</body>
</html>
```
理论上，你的html文档除了引入js脚本外不需要做任何修改，引擎将会自动生成canvas画布并加入到body中，默认的canvas宽高均为100%。
***请注意***，引擎默认的启动入口即为`window.onload`，因此请千万不要在你自己的js代码中重设`window.onload`，否则引擎将会失效。

#### 节点树
引擎将整个场景构建为一棵节点树，根节点为整个场景，场景中的每一个物体都是场景节点的子节点。引擎已经创建了全局场景节点`scene`，你可以通过如下代码将物体节点加入到场景中
```javascript
scene.addChild(myObject)
```
你也可以将节点加入到其它节点中作为该节点的子节点，这通常是为了实现某个物体与父物体之间存在组合关系，例如对一个小人而言，头与身体就是一种组合关系，你可以将头节点作为身体节点的子节点从而确保小人头身不会分离。请注意，父节点的所有变换均会等同地作用到子节点上，因此当你构建节点的父子关系时，请确保你希望子节点应当跟随父节点进行所有的变换。

#### 创建节点代码
本质上，场景中的一切对象（相机、物体等）都是节点树上的一个节点，接下来为了避免不必要的混淆，场景中的物体不再用“节点”进行称呼，还是用“物体”进行称呼更加直观，但你应当明白它的本质。
引擎已经封装了基本的节点类`Node`，你所创建的所有物体都应当继承自`Node`，以保证一些基本API的封装。你可以使用如下代码定义一个物体类
```javascript
class MyObject extends Node {
    constructor(name)
    {
        super(name);

        this.vertices = [...];  // 顶点序列
        this.colors = [...];  // 颜色序列
        // 其它初始化操作
    }

    update(dt)
    {
        // 帧更新逻辑
    }

    draw()
    {
        // 绘制方法
    }
}
```
上述模板中，你会看到三个可覆盖的函数。下面分别解释一下其作用：
1. `constructor(name)` 是物体的构造函数，通过一个名称参数给该物体命名。在构造函数中，你必须做的事情有三件：`super(name)`调用父类的构造函数；对`this.vertices`赋值，代表该物体的顶点序列，用于传递给顶点着色器；对`this.colors`赋值，代表该物体各顶点的颜色，用于传递给片元着色器。***请注意，你应当确保你的顶点数目与颜色数目应当保持一致***。除了上述三件事，你应当将你需要的一些初始化操作写在构造函数中，例如
   ```javascript
   this.member = value;  // 定义成员
   this.Resize(...);  // 重设自身大小
   ...
   ```
2. `update(dt)`是物体的帧更新函数，引擎将会自动在每一帧调用该函数实现物体的逻辑更新。参数`dt`为当前帧时间，***单位为毫秒***，更新函数可以不重写覆盖，默认的 `update`逻辑为空，即每帧不做任何变换。
3. `draw()`是物体的绘制方法。你可以重写该方法来实现自定义的绘制方法并覆盖默认的绘制方法。默认绘制方法为
   ```javascript
    draw() {
        setAttrib('a_position', this.vertices, 3);
        setAttrib('a_color', this.colors, 4);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }
    ```
该方法将顶点与颜色序列均传给着色器，并使用`gl.TRIANGLES`方法进行绘制。
当然，你的物体并非必须严格继承自`Node`，也可以继承自你自定义的其它物品类，你所需要确保的是物体最底层的基类是`Node`即可。
#### 锚点
锚点简单的理解即为物体的中心，在引擎中你对某个物体所做的所有变换都是基于锚点进行的，因此锚点的选定非常重要。引擎中，为了简化顶点坐标的计算，我们规定了所有物体的初始锚点坐标始终位于原点。因此在给物体的`vertices`初始化时应当确保所有顶点都是以原点作为锚点的相对坐标。例如，一个以体中心为锚点的边长为2的立方体，其顶点坐标为(±1,±1,±1)，而以底面中心为锚点的立方体顶点坐标则变为(±1,±1,0|2)。
**相对坐标系**
在引擎中，所有物体的坐标系都是相对坐标系，是 ***以父物体锚点作为坐标原点*** 的坐标系。简单来说，场景中存在两个物体A与B，其中B为A的子物体。那么当A发生变换时，可以看作B的相对坐标系绑定在了A上，坐标系进行了与A同样的变换；因此对于B来说，其在相对坐标系中并没有发生任何的改变，因此当你在编写某个物体的代码时，唯一需要关心的仅仅是它本身的更新逻辑以及它与父物体之间的相对关系，而不需要考虑其他场景、物体变换对其产生的影响。你可以认为每个物体的父物体都是静止的，因此只需考虑物体运动相对于父物体是如何的即可。
#### API
`Node`保障了场景中每个物体都有一套基本的API便于用户访问与使用。目前暴露的API参考如下
```javascript
    Node.vertices;  // 顶点序列
    Node.colors;  // 颜色序列
    Node.active;  // 是否处于激活状态，若为false则自身包括所有子物体均不会被绘制
    Node.name;  // 物体名称

    addChild(node);  // 添加子物体

    getChildByName(name);  // 根据名称查找子物体

    destroy();  // 销毁自身

    Resize(x, y, z);  // 将自身大小沿三个轴方向放缩相应倍数

    Scale(x, y, z);  // 将自身包括所有子物体大小沿三个轴方向放缩相应倍数

    Move(x, y, z);  // 平移

    RotateX(angle);  // 绕x轴旋转

    RotateY(angle);  // 绕y轴旋转

    RotateZ(angle);  // 绕z轴旋转

    getTransform();  // 获取当前累积的所有变换，该函数得到的变换是相对于绝对坐标系的，而非相对坐标系

    addTransform(trans);  // 添加变换

    setTransform(trans);  // 重设变换
```
当然，如果你研究`Node.js`中的代码，你会发现不只有这些API。但是为了保障引擎的正常运行，除了上述提到的API外，如无特殊情况，请勿在子类中重写覆盖其它的API。上述暴露的API应当足以支撑完成绝大多数变换。

#### 相机
与普通的物体相同，相机也可以进行平移、旋转等变换，唯一的区别是相机的变换会对视角产生影响。引擎已经为你封装了一个基本的相机类`Camera`，并在场景中加入了一台默认相机，你可以通过`camera`来访问到默认的相机对象。
你可以自定义自己的相机，但请注意务必继承自基础相机类`Camera`，确保相机视角切换的正常工作。注意，若你使用了自定义的相机，请执行以下操作
```javascript
camera.destroy();  // 销毁默认相机
scene.addChild(new MyCamera('camera'));  // 添加你的相机
```
***你需要确保场景中有且仅有一台相机***。
你可能会需要将相机绑定到某个物体上，例如第一人称射击游戏中，枪应当类似主角的手臂一般绑定到主角身上。但请注意，永远 ***不要把相机作为除了`scene`以外任何节点的子节点***，你可以为相机添加子节点，但请不要将相机本身添加其它节点之中。

#### 事件系统
1. 键盘事件
引擎已经封装了一套相对完善的键盘响应系统。你可以通过全局变量`event_sys`获取事件系统，并通过`event_sys.keyBoard.Key()`来获取按键`Key`是否处于按下状态。请注意此处`Key`代指接口函数名，其可选值请参考`libs/Event.js`中`keyBoard`的定义。
2. 鼠标事件
尚未封装。

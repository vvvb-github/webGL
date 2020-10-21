function smile() {
    // 画脸
    drawCircleWithBorder(0,360,[0,0],[600,600],[0,0,0.9,0.8]);
    drawCircleWithBorder(0,360,[0,-130],[500,480],[1,1,1,1]);

    // 眼睛
    drawCircleWithBorder(0,360,[-170,330],[135,150],[1,1,1,1]);
    drawCircle(0,360,[-70,330],[25,30],[0,0,0,1]);
    drawCircleWithBorder(0,360,[170,330],[135,150],[1,1,1,1]);
    drawCircle(0,360,[70,330],[25,30],[0,0,0,1]);

    // 鼻子
    drawCircleWithBorder(0,360,[0,170],[50,50],[1,0,0,1]);

    // 嘴巴
    drawCircleWithBorder(200,340,[0,-150],[350,150],[0,0,0,0]);

    // 胡子及廓线
    drawLine([0,-300], [0,120]);
    drawLine([-340,100], [-550,250]);
    drawLine([-400,0], [-700, 10]);
    drawLine([-370,-100], [-600, -200]);
    drawLine([340,100], [550,250]);
    drawLine([400,0], [700, 10]);
    drawLine([370,-100], [600, -200]);
}


function angry() {
    // 画脸
    drawCircleWithBorder(0,360,[0,0],[600,600],[0,0,0.9,0.8]);
    drawCircleWithBorder(0,360,[0,-130],[500,480],[1,1,1,1]);

    // 眼睛
    drawCircleWithBorder(0,360,[-170,330],[135,150],[1,1,1,1]);
    drawLine([-290,370], [-15,330]);
    drawCircle(173,353,[-70,340],[25,30],[0,0,0,1]);
    drawCircleWithBorder(0,360,[170,330],[135,150],[1,1,1,1]);
    drawLine([290,370], [15,330]);
    drawCircle(187,367,[70,340],[25,30],[0,0,0,1]);

    // 鼻子
    drawCircleWithBorder(0,360,[0,170],[50,50],[1,0,0,1]);

    // 嘴巴
    drawLine([0,-150],[-200,-250]);
    drawLine([-200,-250],[200,-250]);
    drawLine([200,-250],[0,-150]);
    drawLine([-150,-225],[-150,-250]);
    drawLine([-50,-175],[-50,-250]);
    drawLine([150,-225],[150,-250]);
    drawLine([50,-175],[50,-250]);

    // 胡子及廓线
    drawLine([0,-150], [0,120]);
    drawLine([-340,100], [-550,250]);
    drawLine([-400,0], [-700, 10]);
    drawLine([-370,-100], [-600, -200]);
    drawLine([340,100], [550,250]);
    drawLine([400,0], [700, 10]);
    drawLine([370,-100], [600, -200]);
}


function sad() {
    // 画脸
    drawCircleWithBorder(0,360,[0,0],[600,600],[0,0,0.9,0.8]);
    drawCircleWithBorder(0,360,[0,-130],[500,480],[1,1,1,1]);

    // 眼睛
    drawCircleWithBorder(0,360,[-170,330],[135,150],[1,1,1,1]);
    drawLine([-290,330], [-15,370]);
    drawCircle(187,367,[-70,360],[25,30],[0,0,0,1]);
    drawCircleWithBorder(0,360,[170,330],[135,150],[1,1,1,1]);
    drawLine([290,330], [15,370]);
    drawCircle(173,353,[70,360],[25,30],[0,0,0,1]);

    // 鼻子
    drawCircleWithBorder(0,360,[0,170],[50,50],[1,0,0,1]);

    // 嘴巴
    drawCircleWithBorder(30,150,[0,-350],[300,150],[0,0,0,0]);

    // 胡子及廓线
    drawLine([0,-200], [0,120]);
    drawLine([-340,100], [-550,250]);
    drawLine([-400,0], [-700, 10]);
    drawLine([-370,-100], [-600, -200]);
    drawLine([340,100], [550,250]);
    drawLine([400,0], [700, 10]);
    drawLine([370,-100], [600, -200]);
}


function suprice() {
    // 画脸
    drawCircleWithBorder(0,360,[0,0],[600,600],[0,0,0.9,0.8]);
    drawCircleWithBorder(0,360,[0,-130],[500,480],[1,1,1,1]);

    // 眼睛
    drawCircleWithBorder(0,360,[-170,330],[135,150],[1,1,1,1]);
    drawStar4([-200,330],[30,50],[1,1,0,1]);
    drawCircleWithBorder(0,360,[170,330],[135,150],[1,1,1,1]);
    drawStar4([200,330],[30,50],[1,1,0,1]);

    // 鼻子
    drawCircleWithBorder(0,360,[0,170],[50,50],[1,0,0,1]);

    // 嘴巴
    drawCircleWithBorder(180,360,[0,-150],[350,300],[1,0,0,0.8]);
    drawLine([-355,-150], [355,-150]);

    // 胡子及廓线
    drawLine([0,-150], [0,120]);
    drawLine([-340,100], [-550,250]);
    drawLine([-400,0], [-700, 10]);
    drawLine([-370,-100], [-600, -200]);
    drawLine([340,100], [550,250]);
    drawLine([400,0], [700, 10]);
    drawLine([370,-100], [600, -200]);
}


function gg() {
    // 画脸
    drawCircleWithBorder(0,360,[0,0],[600,600],[0,0,0.9,0.8]);
    drawCircleWithBorder(0,360,[0,-130],[500,480],[1,1,1,1]);

    // 眼睛
    drawCircleWithBorder(0,360,[-170,330],[135,150],[1,1,1,1]);
    drawLine([-150,355],[-100,305]);
    drawLine([-150,305],[-100,355]);
    drawCircleWithBorder(0,360,[170,330],[135,150],[1,1,1,1]);
    drawLine([150,355],[100,305]);
    drawLine([150,305],[100,355]);

    // 鼻子
    drawCircleWithBorder(0,360,[0,170],[50,50],[1,0,0,1]);

    // 嘴巴
    drawLine([-355,-150], [355,-150]);
    drawRectangle([150,-150,150,-300,300,-300,300,-150],[1,0,0,0.8]);
    drawCircleWithBorder(180,360,[225,-300],[72.5,72.5],[1,0,0,0.8]);
    drawLine([150,-150],[150,-300]);
    drawLine([300,-150],[300,-300]);
    drawLine([225,-150],[225,-375]);

    // 胡子及廓线
    drawLine([0,-150], [0,120]);
    drawLine([-340,100], [-550,250]);
    drawLine([-400,0], [-700, 10]);
    drawLine([-370,-100], [-600, -200]);
    drawLine([340,100], [550,250]);
    drawLine([400,0], [700, 10]);
    drawLine([370,-100], [600, -200]);
}
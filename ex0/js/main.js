scene.addChild(new SphereCamera(900, 60));
scene.addChild(new Orbital(700, 60, new Planet(url + 'earth.jpg', 100, 180, 'earth'), 'earth_orbital'));
// scene.addChild(new Space(1000));
scene.addChild(new Sun(200));
scene.ambient = [0.1,0.1,0.1];

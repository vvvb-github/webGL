// scene.addChild(new Sun(50));
scene.addChild(new SphereCamera(900, 180));
scene.addChild(new Orbital(700, 60, new Planet(100, 180, 'earth'), 'earth_orbital'));
scene.addChild(new Space());
scene.addChild(new Sun(200));

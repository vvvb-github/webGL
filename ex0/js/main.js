scene.addChild(new SphereCamera(900, 180));
scene.addChild(new Orbital(700, 60, new Planet('http://www.kxhome.xyz:8085/earth.png', 100, 180, 'earth'), 'earth_orbital'));
scene.addChild(new Space(1000));
scene.addChild(new Sun(200));

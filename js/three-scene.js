/**
 * SpeedUp 3D Cinematic Scroll Experience
 * =======================================
 * A premium, scroll-driven 3D journey using Three.js.
 * Scenes tell the story of SpeedUp: Fast Code -> Digital Marketing -> Growth -> Results
 *
 * Architecture:
 *  - One persistent WebGL canvas, fixed/sticky to viewport
 *  - Scroll progress (0-1) drives all scene transitions
 *  - 5 narrative scenes, each with unique geometry + lighting + text
 *  - Mouse parallax adds depth and responsiveness
 *  - LERP interpolation on all animated values for cinematic smoothness
 */

(function SpeedUp3DCinematic() {
  'use strict';

  /* =========================================================================
     CONFIG
     ========================================================================= */
  var CFG = {
    SCENE_COUNT: 5,
    PARTICLE_COUNT: window.innerWidth < 768 ? 600 : 1600,
    MOBILE_QUALITY: window.innerWidth < 768,
    ORANGE: 0xf8841f,
    ORANGE_LIGHT: 0xffaa5b,
    CYAN: 0x00b4d8,
    NAVY: 0x003764,
  };

  /* =========================================================================
     STATE
     ========================================================================= */
  var renderer, scene, camera, clock;
  var mouseX = 0, mouseY = 0;
  var targetMouseX = 0, targetMouseY = 0;
  var currentScene = 0;
  var scrollProgress = 0;
  var sceneProgress = 0;
  var isInitialized = false;
  var animFrameId = null;

  // Scene object references
  var heroCore = null;
  var heroRings = [];
  var heroParticles = null;
  var heroDataNodes = [];
  var codeWire = null;
  var codeStreams = [];
  var codePlane = null;
  var networkNodes = [];
  var networkLines = null;
  var networkPulses = [];
  var growthBars = [];
  var growthRocket = null;
  var burstCore = null;
  var burstRings = [];
  var burstParticles = null;

  // Lights
  var ambientLight, pointLightOrange, pointLightCyan;

  // Groups per scene
  var g0, g1, g2, g3, g4;

  /* =========================================================================
     SCENE DATA — Text panels
     ========================================================================= */
  var SCENE_DATA = [
    {
      tag: 'SpeedUp \u2022 Tech Engine',
      title_ar: '\u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u062a\u064a \u062a\u064f\u0633\u0631\u0651\u0639 \u0646\u062c\u0627\u062d\u0643',
      title_en: 'The Tech Engine\nPowering Your Growth',
      sub_ar: '\u0646\u0648\u0627\u0629 \u0628\u0631\u0645\u062c\u064a\u0629 \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0629 \u062a\u0639\u0645\u0644 \u0628\u0623\u062d\u062f\u062b \u062a\u0642\u0646\u064a\u0627\u062a \u0627\u0644\u0648\u064a\u0628',
      sub_en: 'An exceptional code core powered by the latest web technologies',
      icon: '\u26a1',
    },
    {
      tag: 'Fast Code \u2022 \u0646\u0638\u064a\u0641 \u0648\u0633\u0631\u064a\u0639',
      title_ar: '\u0643\u0648\u062f \u0646\u0638\u064a\u0641.\n\u0623\u062f\u0627\u0621 \u0641\u0627\u0626\u0642 \u0627\u0644\u0633\u0631\u0639\u0629.',
      title_en: 'Clean Code.\nLightning Performance.',
      sub_ar: '\u0646\u0628\u0646\u064a \u0628\u0646\u064a\u062a\u0643 \u0627\u0644\u062a\u0642\u0646\u064a\u0629 \u0639\u0644\u0649 \u0623\u0633\u0627\u0633 \u0631\u0627\u0633\u062e \u0645\u0646 \u0627\u0644\u062f\u0642\u0629 \u0648\u0627\u0644\u0643\u0641\u0627\u0621\u0629',
      sub_en: 'We build your technical foundation on precision and efficiency',
      icon: '</>'
    },
    {
      tag: 'Digital Marketing \u2022 \u0646\u0645\u0648 \u0631\u0642\u0645\u064a',
      title_ar: '\u0634\u0628\u0643\u0629 \u062a\u0633\u0648\u064a\u0642\u064a\u0629\n\u062a\u0635\u0644 \u0644\u062c\u0645\u0647\u0648\u0631\u0643',
      title_en: 'A Marketing Network\nThat Reaches Your Audience',
      sub_ar: '\u0627\u0633\u062a\u0647\u062f\u0627\u0641 \u062f\u0642\u064a\u0642\u060c \u0645\u062d\u062a\u0648\u0649 \u0645\u0624\u062b\u0631\u060c \u0648\u0639\u0648\u0627\u0626\u062f \u0645\u0636\u0627\u0639\u0641\u0629',
      sub_en: 'Precise targeting, impactful content, and multiplied returns',
      icon: '\ud83d\udce1'
    },
    {
      tag: 'Fast Growth \u2022 \u0646\u0645\u0648 \u0645\u062a\u0633\u0627\u0631\u0639',
      title_ar: '\u0646\u0645\u0648 \u062d\u0642\u064a\u0642\u064a.\n\u0623\u0631\u0642\u0627\u0645 \u062a\u062a\u062d\u062f\u062b \u0639\u0646 \u0646\u0641\u0633\u0647\u0627.',
      title_en: 'Real Growth.\nNumbers That Speak for Themselves.',
      sub_ar: '3.5x \u0645\u062a\u0648\u0633\u0637 \u0645\u0636\u0627\u0639\u0641\u0629 \u0639\u0648\u0627\u0626\u062f \u0627\u0644\u062d\u0645\u0644\u0627\u062a \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u064a\u0629',
      sub_en: '3.5x average campaign revenue multiplication',
      icon: '\ud83d\ude80'
    },
    {
      tag: 'SpeedUp \u2022 \u0627\u0628\u062f\u0623 \u0627\u0644\u0622\u0646',
      title_ar: '\u0645\u0634\u0631\u0648\u0639\u0643 \u0627\u0644\u0642\u0627\u062f\u0645\n\u064a\u0628\u062f\u0623 \u0647\u0646\u0627.',
      title_en: 'Your Next Project\nStarts Here.',
      sub_ar: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0627\u0644\u064a\u0648\u0645 \u0648\u0627\u0646\u0637\u0644\u0642 \u0646\u062d\u0648 \u0627\u0644\u0642\u0645\u0629',
      sub_en: 'Contact us today and launch toward the top',
      icon: '\u2736',
      cta: true
    }
  ];

  /* =========================================================================
     DOM SETUP
     ========================================================================= */
  function createDOM() {
    var wrapper = document.createElement('section');
    wrapper.id = 'cinematic-3d-section';
    wrapper.setAttribute('aria-label', 'SpeedUp 3D Cinematic Experience');

    var sticky = document.createElement('div');
    sticky.id = 'cinematic-sticky';

    var canvas = document.createElement('canvas');
    canvas.id = 'cinematic-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    sticky.appendChild(canvas);

    var textContainer = document.createElement('div');
    textContainer.id = 'cinematic-text-container';

    SCENE_DATA.forEach(function(panel, i) {
      var panelEl = document.createElement('div');
      panelEl.className = 'cinematic-panel' + (i === 0 ? ' active' : '');
      panelEl.id = 'cinematic-panel-' + i;
      panelEl.setAttribute('data-scene', i);

      var ctaHTML = panel.cta ? [
        '<div class="cinematic-cta-group">',
        '  <a href="contact.html" class="cinematic-cta-btn" id="cinematic-cta-main">',
        '    <span class="cta-text" data-ar="\u0627\u0628\u062f\u0623 \u0645\u0634\u0631\u0648\u0639\u0643 \u0627\u0644\u0622\u0646" data-en="Start Your Project Now">\u0627\u0628\u062f\u0623 \u0645\u0634\u0631\u0648\u0639\u0643 \u0627\u0644\u0622\u0646</span>',
        '    <i class="fa-solid fa-arrow-left"></i>',
        '  </a>',
        '  <a href="portfolio.html" class="cinematic-cta-outline" id="cinematic-cta-secondary">',
        '    <span class="cta-text" data-ar="\u0627\u0633\u062a\u0643\u0634\u0641 \u0623\u0639\u0645\u0627\u0644\u0646\u0627" data-en="Explore Our Work">\u0627\u0633\u062a\u0643\u0634\u0641 \u0623\u0639\u0645\u0627\u0644\u0646\u0627</span>',
        '  </a>',
        '</div>'
      ].join('') : '';

      panelEl.innerHTML = [
        '<div class="cinematic-panel-inner">',
        '  <div class="cinematic-panel-icon">' + panel.icon + '</div>',
        '  <span class="cinematic-scene-tag">' + panel.tag + '</span>',
        '  <h2 class="cinematic-panel-title" data-ar="' + panel.title_ar + '" data-en="' + panel.title_en + '">' + panel.title_ar + '</h2>',
        '  <p class="cinematic-panel-sub" data-ar="' + panel.sub_ar + '" data-en="' + panel.sub_en + '">' + panel.sub_ar + '</p>',
        ctaHTML,
        '</div>'
      ].join('');

      textContainer.appendChild(panelEl);
    });

    sticky.appendChild(textContainer);

    // Progress bar
    var progressBar = document.createElement('div');
    progressBar.id = 'cinematic-progress-bar';
    sticky.appendChild(progressBar);

    // Scene dots
    var dotsNav = document.createElement('div');
    dotsNav.id = 'cinematic-dots';
    dotsNav.setAttribute('aria-label', 'Scene navigation');
    for (var d = 0; d < CFG.SCENE_COUNT; d++) {
      (function(idx) {
        var dot = document.createElement('button');
        dot.className = 'cinematic-dot' + (idx === 0 ? ' active' : '');
        dot.id = 'cinematic-dot-' + idx;
        dot.setAttribute('aria-label', 'Scene ' + (idx + 1));
        dot.addEventListener('click', function() { scrollToScene(idx); });
        dotsNav.appendChild(dot);
      })(d);
    }
    sticky.appendChild(dotsNav);

    // WebGL fallback
    var fallback = document.createElement('div');
    fallback.id = 'cinematic-fallback';
    fallback.style.display = 'none';
    fallback.innerHTML = [
      '<div class="fallback-inner">',
      '  <i class="fa-solid fa-rocket" style="color:var(--primary-orange);font-size:3rem;margin-bottom:1rem;"></i>',
      '  <h3>SpeedUp \u2022 Fast Code. Fast Growth.</h3>',
      '  <p>\u062a\u062c\u0631\u0628\u0629 \u062b\u0644\u0627\u062b\u064a\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062f \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u0639\u0644\u0649 \u0645\u062a\u0635\u0641\u062d\u0643. \u064a\u0631\u062c\u0649 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0645\u062a\u0635\u0641\u062d \u062d\u062f\u064a\u062b.</p>',
      '</div>'
    ].join('');
    sticky.appendChild(fallback);

    wrapper.appendChild(sticky);

    // Insert section after hero
    var heroSection = document.getElementById('home');
    if (heroSection && heroSection.parentNode) {
      heroSection.parentNode.insertBefore(wrapper, heroSection.nextSibling);
    } else {
      document.querySelector('main').prepend(wrapper);
    }

    return canvas;
  }

  /* =========================================================================
     THREE.JS INIT
     ========================================================================= */
  function initThreeJS(canvas) {
    if (typeof THREE === 'undefined') { showFallback(); return false; }

    try {
      var testCtx = document.createElement('canvas').getContext('webgl');
      if (!testCtx) { showFallback(); return false; }
    } catch(e) { showFallback(); return false; }

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: !CFG.MOBILE_QUALITY,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, CFG.MOBILE_QUALITY ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x051322, 0.02);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 0, 22);

    clock = new THREE.Clock();

    setupLighting();
    buildScene0();
    buildScene1();
    buildScene2();
    buildScene3();
    buildScene4();

    activateScene(0);

    return true;
  }

  /* =========================================================================
     LIGHTING
     ========================================================================= */
  function setupLighting() {
    ambientLight = new THREE.AmbientLight(0x0a1a2e, 0.8);
    scene.add(ambientLight);

    pointLightOrange = new THREE.PointLight(0xf8841f, 4, 90);
    pointLightOrange.position.set(12, 8, 15);
    scene.add(pointLightOrange);

    pointLightCyan = new THREE.PointLight(0x00b4d8, 3, 70);
    pointLightCyan.position.set(-12, -5, 10);
    scene.add(pointLightCyan);

    var pointLightTop = new THREE.PointLight(0xffffff, 1.5, 50);
    pointLightTop.position.set(0, 18, 6);
    scene.add(pointLightTop);
  }

  /* =========================================================================
     SCENE 0: HERO — Tech Core Icosahedron
     ========================================================================= */
  function buildScene0() {
    g0 = new THREE.Group();

    // Main icosahedron
    var coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
    var coreMat = new THREE.MeshPhongMaterial({
      color: 0x003764,
      emissive: 0xf8841f,
      emissiveIntensity: 0.18,
      wireframe: false,
      transparent: true,
      opacity: 0.88,
      shininess: 140
    });
    heroCore = new THREE.Mesh(coreGeo, coreMat);
    g0.add(heroCore);

    // Wireframe overlay
    var wGeo = new THREE.IcosahedronGeometry(4.2, 1);
    var wMat = new THREE.MeshBasicMaterial({ color: 0xf8841f, wireframe: true, transparent: true, opacity: 0.3 });
    var wMesh = new THREE.Mesh(wGeo, wMat);
    wMesh.scale.setScalar(1.015);
    g0.add(wMesh);

    // Orbiting rings
    var ringDefs = [
      { r: 6.8, tube: 0.055, col: 0xf8841f, op: 0.7, rx: 0, ry: Math.PI/5, spd: 0.38 },
      { r: 8.5, tube: 0.04,  col: 0x00b4d8, op: 0.5, rx: Math.PI/3, ry: 0, spd: -0.28 },
      { r: 10.2, tube: 0.032, col: 0xffaa5b, op: 0.35, rx: Math.PI/6, ry: Math.PI/3, spd: 0.2 }
    ];
    ringDefs.forEach(function(def) {
      var geo = new THREE.TorusGeometry(def.r, def.tube, 12, 120);
      var mat = new THREE.MeshBasicMaterial({ color: def.col, transparent: true, opacity: def.op });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = def.rx;
      mesh.rotation.y = def.ry;
      mesh.userData.spd = def.spd;
      g0.add(mesh);
      heroRings.push(mesh);
    });

    // Orbiting nodes
    var nodeCount = CFG.MOBILE_QUALITY ? 6 : 10;
    for (var i = 0; i < nodeCount; i++) {
      var theta = (i / nodeCount) * Math.PI * 2;
      var orbitR = 7.5 + Math.random() * 2.5;
      var geo = new THREE.OctahedronGeometry(0.22 + Math.random() * 0.14, 0);
      var mat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0xf8841f : 0x00b4d8,
        emissive: i % 2 === 0 ? 0xf8841f : 0x00b4d8,
        emissiveIntensity: 0.6, shininess: 200
      });
      var node = new THREE.Mesh(geo, mat);
      node.position.set(orbitR * Math.cos(theta), (Math.random() - 0.5) * 4, orbitR * Math.sin(theta));
      node.userData = { orbitR: orbitR, theta: theta, phi: Math.random() * Math.PI, spd: 0.25 + Math.random() * 0.3 };
      g0.add(node);
      heroDataNodes.push(node);
    }

    // Particle cloud
    var pCount = CFG.PARTICLE_COUNT;
    var pPos = new Float32Array(pCount * 3);
    var pCol = new Float32Array(pCount * 3);
    for (var p = 0; p < pCount; p++) {
      var r = 13 + Math.random() * 22;
      var th = Math.random() * Math.PI * 2;
      var ph = Math.acos(2 * Math.random() - 1);
      pPos[p*3]   = r * Math.sin(ph) * Math.cos(th);
      pPos[p*3+1] = r * Math.sin(ph) * Math.sin(th) * 0.5;
      pPos[p*3+2] = r * Math.cos(ph);
      var mix = Math.random();
      pCol[p*3]   = mix * 0.97;
      pCol[p*3+1] = mix * 0.51 + (1-mix) * 0.71;
      pCol[p*3+2] = mix * 0.12 + (1-mix) * 0.85;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    var pMat = new THREE.PointsMaterial({ vertexColors: true, size: 0.16, transparent: true, opacity: 0.75, sizeAttenuation: true });
    heroParticles = new THREE.Points(pGeo, pMat);
    g0.add(heroParticles);

    scene.add(g0);
  }

  /* =========================================================================
     SCENE 1: FAST CODE — Wireframe globe + data streams
     ========================================================================= */
  function buildScene1() {
    g1 = new THREE.Group();

    var sGeo = new THREE.SphereGeometry(5.5, CFG.MOBILE_QUALITY ? 16 : 26, CFG.MOBILE_QUALITY ? 16 : 26);
    codeWire = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({
      color: 0x00b4d8, wireframe: true, transparent: true, opacity: 0.4
    }));
    g1.add(codeWire);

    var innerGeo = new THREE.SphereGeometry(4.6, CFG.MOBILE_QUALITY ? 12 : 20, CFG.MOBILE_QUALITY ? 12 : 20);
    g1.add(new THREE.Mesh(innerGeo, new THREE.MeshPhongMaterial({
      color: 0x051322, emissive: 0x003764, emissiveIntensity: 0.45, transparent: true, opacity: 0.75
    })));

    var streamCount = CFG.MOBILE_QUALITY ? 8 : 16;
    for (var i = 0; i < streamCount; i++) {
      var angle = (i / streamCount) * Math.PI * 2;
      var radius = 7 + Math.random() * 4;
      var streamLen = 5 + Math.random() * 7;
      var startY = 7 + Math.random() * 3;
      var pts = [];
      for (var j = 0; j <= 20; j++) {
        pts.push(new THREE.Vector3(
          radius * Math.cos(angle) + (Math.random() - 0.5) * 0.4,
          startY - (j / 20) * streamLen,
          radius * Math.sin(angle) + (Math.random() - 0.5) * 0.4
        ));
      }
      var streamGeo = new THREE.BufferGeometry().setFromPoints(pts);
      var streamMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xf8841f : (i % 3 === 1 ? 0x00b4d8 : 0xffaa5b),
        transparent: true, opacity: 0.7
      });
      var stream = new THREE.Line(streamGeo, streamMat);
      stream.userData = { phase: Math.random() * Math.PI * 2, spd: 0.3 + Math.random() * 0.5 };
      g1.add(stream);
      codeStreams.push(stream);
    }

    var grid = new THREE.GridHelper(18, 12, 0x003764, 0x001a33);
    grid.position.y = -7;
    // GridHelper may have a material array in Three.js r128
    var gridMats = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMats.forEach(function(m) { m.transparent = true; m.opacity = 0.5; });
    g1.add(grid);
    codePlane = grid;

    g1.visible = false;
    scene.add(g1);
  }

  /* =========================================================================
     SCENE 2: MARKETING — Network graph
     ========================================================================= */
  function buildScene2() {
    g2 = new THREE.Group();

    var nodeCount = CFG.MOBILE_QUALITY ? 12 : 22;
    var nodePositions = [];

    for (var i = 0; i < nodeCount; i++) {
      var r = 3.5 + Math.random() * 8.5;
      var th = Math.random() * Math.PI * 2;
      var ph = (Math.random() * 0.65 + 0.18) * Math.PI;
      var pos = new THREE.Vector3(
        r * Math.sin(ph) * Math.cos(th),
        r * Math.sin(ph) * Math.sin(th) * 0.6,
        r * Math.cos(ph)
      );
      nodePositions.push(pos);

      var isHub = i < 3;
      var nSize = (isHub ? 0.5 : 0.2) + Math.random() * 0.15;
      var geo = new THREE.SphereGeometry(nSize, 8, 8);
      var col = isHub ? 0xf8841f : (Math.random() > 0.5 ? 0x00b4d8 : 0xffaa5b);
      var mat = new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: isHub ? 0.7 : 0.4, shininess: 180 });
      var node = new THREE.Mesh(geo, mat);
      node.position.copy(pos);
      node.userData = { floatPhase: Math.random() * Math.PI * 2, isHub: isHub };
      g2.add(node);
      networkNodes.push(node);
    }

    // Connection lines
    var linePoints = [];
    for (var a = 0; a < nodePositions.length; a++) {
      for (var b = a + 1; b < nodePositions.length; b++) {
        if (nodePositions[a].distanceTo(nodePositions[b]) < 9) {
          linePoints.push(nodePositions[a]);
          linePoints.push(nodePositions[b]);
        }
      }
    }
    if (linePoints.length > 0) {
      var lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      networkLines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x00b4d8, transparent: true, opacity: 0.28 }));
      g2.add(networkLines);
    }

    // Pulse rings
    var pulseCount = CFG.MOBILE_QUALITY ? 4 : 8;
    for (var pp = 0; pp < pulseCount; pp++) {
      var pGeo = new THREE.TorusGeometry(0.4, 0.04, 8, 32);
      var pMat = new THREE.MeshBasicMaterial({ color: 0xf8841f, transparent: true, opacity: 0.9 });
      var pulse = new THREE.Mesh(pGeo, pMat);
      pulse.userData = {
        t: Math.random(),
        spd: 0.4 + Math.random() * 0.5,
        nA: Math.floor(Math.random() * nodePositions.length),
        nB: Math.floor(Math.random() * nodePositions.length)
      };
      g2.add(pulse);
      networkPulses.push(pulse);
    }

    g2.visible = false;
    scene.add(g2);
  }

  /* =========================================================================
     SCENE 3: GROWTH — Bar chart + rocket
     ========================================================================= */
  function buildScene3() {
    g3 = new THREE.Group();

    var barData = [0.25, 0.38, 0.52, 0.65, 0.78, 0.88, 1.0];
    var bW = 1.0, bGap = 0.3;
    var totalW = barData.length * (bW + bGap);
    var startX = -totalW / 2 + bW / 2;

    barData.forEach(function(h, i) {
      var bH = h * 10;
      var geo = new THREE.BoxGeometry(bW, bH, bW * 0.7);
      var hue = 0.07 + (1 - h) * 0.08;
      var mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(hue, 0.9, 0.55),
        emissive: new THREE.Color().setHSL(hue, 0.9, 0.35),
        emissiveIntensity: 0.2 + h * 0.35,
        shininess: 80, transparent: true, opacity: 0.92
      });
      var bar = new THREE.Mesh(geo, mat);
      bar.position.set(startX + i * (bW + bGap), bH / 2 - 5, 0);
      bar.userData = { ph: i * 0.35 };
      g3.add(bar);
      growthBars.push(bar);
    });

    // Base
    var baseGeo = new THREE.BoxGeometry(totalW + 2, 0.08, 1.2);
    var baseMesh = new THREE.Mesh(baseGeo, new THREE.MeshBasicMaterial({ color: 0x003764 }));
    baseMesh.position.y = -5;
    g3.add(baseMesh);

    // Trend line
    var trendPts = barData.map(function(h, i) {
      return new THREE.Vector3(startX + i * (bW + bGap), h * 10 - 5 + 1.6, 1);
    });
    var curve = new THREE.CatmullRomCurve3(trendPts);
    var tGeo = new THREE.TubeGeometry(curve, 60, 0.06, 8, false);
    var tMat = new THREE.MeshBasicMaterial({ color: 0x00b4d8, transparent: true, opacity: 0.85 });
    g3.add(new THREE.Mesh(tGeo, tMat));

    // Rocket
    var rGroup = new THREE.Group();
    var bodyGeo = new THREE.CylinderGeometry(0.32, 0.32, 1.8, 10);
    rGroup.add(new THREE.Mesh(bodyGeo, new THREE.MeshPhongMaterial({ color: 0xf8841f, emissive: 0xf8841f, emissiveIntensity: 0.25, shininess: 150 })));
    var noseGeo = new THREE.ConeGeometry(0.32, 0.9, 10);
    var nose = new THREE.Mesh(noseGeo, new THREE.MeshPhongMaterial({ color: 0xffaa5b, shininess: 160 }));
    nose.position.y = 1.35;
    rGroup.add(nose);
    [-0.5, 0, 0.5].forEach(function(side) {
      var finGeo = new THREE.ConeGeometry(0.22, 0.55, 4);
      finGeo.rotateZ(Math.PI);
      var fin = new THREE.Mesh(finGeo, new THREE.MeshPhongMaterial({ color: 0x003764 }));
      fin.position.set(side * 0.4, -0.9, 0);
      fin.rotation.z = side * Math.PI / 5;
      rGroup.add(fin);
    });
    rGroup.position.set(startX + 6 * (bW + bGap) + 1.8, -1.5, 0);
    rGroup.rotation.z = -Math.PI / 8;
    rGroup.userData = { baseY: -1.5 };
    g3.add(rGroup);
    growthRocket = rGroup;

    g3.visible = false;
    scene.add(g3);
  }

  /* =========================================================================
     SCENE 4: CTA BURST
     ========================================================================= */
  function buildScene4() {
    g4 = new THREE.Group();

    var cGeo = new THREE.SphereGeometry(3.5, CFG.MOBILE_QUALITY ? 16 : 30, CFG.MOBILE_QUALITY ? 16 : 30);
    burstCore = new THREE.Mesh(cGeo, new THREE.MeshPhongMaterial({
      color: 0xf8841f, emissive: 0xf8841f, emissiveIntensity: 0.5, shininess: 200, transparent: true, opacity: 0.93
    }));
    g4.add(burstCore);

    var ringCount = CFG.MOBILE_QUALITY ? 4 : 7;
    for (var i = 0; i < ringCount; i++) {
      var geo = new THREE.TorusGeometry(4 + i * 2.3, 0.065 - i * 0.005, 8, 80);
      var mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xf8841f : 0x00b4d8,
        transparent: true, opacity: 0.55 - i * 0.06
      });
      var ring = new THREE.Mesh(geo, mat);
      ring.rotation.set((Math.random()-0.5)*Math.PI, (Math.random()-0.5)*Math.PI, 0);
      ring.userData = { idx: i };
      g4.add(ring);
      burstRings.push(ring);
    }

    var bCount = CFG.MOBILE_QUALITY ? 500 : 1200;
    var bPos = new Float32Array(bCount * 3);
    var bCol = new Float32Array(bCount * 3);
    for (var pp = 0; pp < bCount; pp++) {
      var rr = 8 + Math.random() * 18;
      var th = Math.random() * Math.PI * 2;
      var ph = Math.acos(2 * Math.random() - 1);
      bPos[pp*3]   = rr * Math.sin(ph) * Math.cos(th);
      bPos[pp*3+1] = rr * Math.sin(ph) * Math.sin(th);
      bPos[pp*3+2] = rr * Math.cos(ph);
      var isOr = pp % 3 !== 0;
      bCol[pp*3]   = isOr ? 0.97 : 0.0;
      bCol[pp*3+1] = isOr ? 0.51 : 0.71;
      bCol[pp*3+2] = isOr ? 0.12 : 0.85;
    }
    var bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
    bGeo.setAttribute('color', new THREE.BufferAttribute(bCol, 3));
    burstParticles = new THREE.Points(bGeo, new THREE.PointsMaterial({ vertexColors: true, size: 0.22, transparent: true, opacity: 0.8, sizeAttenuation: true }));
    g4.add(burstParticles);

    g4.visible = false;
    scene.add(g4);
  }

  /* =========================================================================
     SCENE ACTIVATION
     ========================================================================= */
  function activateScene(idx) {
    var groups = [g0, g1, g2, g3, g4];
    groups.forEach(function(g, i) { if(g) g.visible = (i === idx); });

    document.querySelectorAll('.cinematic-panel').forEach(function(el, i) {
      el.classList.toggle('active', i === idx);
    });
    document.querySelectorAll('.cinematic-dot').forEach(function(dot, i) {
      dot.classList.toggle('active', i === idx);
    });
  }

  /* =========================================================================
     ANIMATION LOOP
     ========================================================================= */
  function animate() {
    animFrameId = requestAnimationFrame(animate);
    var t = clock.getElapsedTime();

    // Smooth mouse
    mouseX += (targetMouseX - mouseX) * 0.055;
    mouseY += (targetMouseY - mouseY) * 0.055;

    // Camera parallax
    camera.position.x += (mouseX * 2.8 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 1.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    // Determine scene
    var rawScene = scrollProgress * CFG.SCENE_COUNT;
    var newScene = Math.min(Math.floor(rawScene), CFG.SCENE_COUNT - 1);
    sceneProgress = rawScene - Math.floor(rawScene);

    if (newScene !== currentScene) {
      currentScene = newScene;
      activateScene(currentScene);
    }

    // Progress bar
    var pb = document.getElementById('cinematic-progress-bar');
    if (pb) pb.style.transform = 'scaleX(' + scrollProgress + ')';

    // Animate lights
    pointLightOrange.position.x = Math.cos(t * 0.5) * 14;
    pointLightOrange.position.y = Math.sin(t * 0.3) * 8;
    pointLightCyan.position.x = Math.cos(t * 0.4 + Math.PI) * 12;
    pointLightCyan.position.z = Math.sin(t * 0.35) * 10;

    // Run scene animation
    switch(currentScene) {
      case 0: animS0(t); break;
      case 1: animS1(t); break;
      case 2: animS2(t); break;
      case 3: animS3(t); break;
      case 4: animS4(t); break;
    }

    renderer.render(scene, camera);
  }

  function animS0(t) {
    if (!heroCore) return;
    heroCore.rotation.x = t * 0.18 + mouseY * 0.3;
    heroCore.rotation.y = t * 0.3 + mouseX * 0.35;

    heroRings.forEach(function(r) {
      r.rotation.z += r.userData.spd * 0.016;
      r.rotation.x += r.userData.spd * 0.007;
    });

    heroDataNodes.forEach(function(node, i) {
      node.userData.theta += node.userData.spd * 0.016;
      var th = node.userData.theta;
      var r = node.userData.orbitR;
      node.position.set(r * Math.cos(th), Math.sin(t * 0.8 + i) * 2, r * Math.sin(th));
      node.scale.setScalar(1 + Math.sin(t * 2.2 + i) * 0.2);
    });

    if (heroParticles) {
      heroParticles.rotation.y = t * 0.04;
      heroParticles.rotation.x = Math.sin(t * 0.025) * 0.18;
    }

    var targetZ = 22 - sceneProgress * 5;
    camera.position.z += (targetZ - camera.position.z) * 0.03;
  }

  function animS1(t) {
    if (!codeWire) return;
    codeWire.rotation.y = t * 0.25;
    codeWire.rotation.x = Math.sin(t * 0.12) * 0.3;

    codeStreams.forEach(function(s) {
      s.userData.phase += s.userData.spd * 0.016;
      s.position.y = Math.sin(s.userData.phase) * 2;
      s.material.opacity = 0.4 + Math.sin(s.userData.phase) * 0.3;
    });

    if (codePlane) {
      var mats = Array.isArray(codePlane.material) ? codePlane.material : [codePlane.material];
      mats.forEach(function(m) { m.opacity = 0.3 + Math.sin(t * 0.8) * 0.2; });
    }

    var targetZ = 20 + Math.sin(sceneProgress * Math.PI) * 3;
    camera.position.z += (targetZ - camera.position.z) * 0.025;
  }

  function animS2(t) {
    if (g2) {
      g2.rotation.y = t * 0.14 + mouseX * 0.4;
      g2.rotation.x += (mouseY * 0.2 - g2.rotation.x) * 0.04;
    }

    networkNodes.forEach(function(node, i) {
      node.position.y += Math.sin(t * 1.5 + node.userData.floatPhase) * 0.006;
      if (node.userData.isHub) node.material.emissiveIntensity = 0.5 + Math.sin(t * 2.2 + i) * 0.4;
    });

    networkPulses.forEach(function(pulse) {
      pulse.userData.t += pulse.userData.spd * 0.012;
      if (pulse.userData.t > 1) pulse.userData.t = 0;
      var a = networkNodes[pulse.userData.nA] && networkNodes[pulse.userData.nA].position;
      var b = networkNodes[pulse.userData.nB] && networkNodes[pulse.userData.nB].position;
      if (a && b) {
        pulse.position.lerpVectors(a, b, pulse.userData.t);
        pulse.material.opacity = Math.sin(pulse.userData.t * Math.PI) * 0.9;
      }
    });

    var targetZ = 20 - sceneProgress * 2;
    camera.position.z += (targetZ - camera.position.z) * 0.02;
  }

  function animS3(t) {
    growthBars.forEach(function(bar, i) {
      bar.material.emissiveIntensity = 0.2 + Math.sin(t * 1.2 + bar.userData.ph) * 0.15 + sceneProgress * 0.25;
    });

    if (growthRocket) {
      growthRocket.position.y = growthRocket.userData.baseY + Math.sin(t * 1.5) * 0.45 + sceneProgress * 5;
      growthRocket.rotation.z = -Math.PI / 8 - sceneProgress * 0.25;
    }

    if (g3) g3.rotation.y += (mouseX * 0.3 - g3.rotation.y) * 0.05;

    var targetZ = 26 - sceneProgress * 8;
    camera.position.z += (targetZ - camera.position.z) * 0.03;
  }

  function animS4(t) {
    if (!burstCore) return;
    burstCore.rotation.y = t * 0.6;
    burstCore.scale.setScalar(1 + Math.sin(t * 2.5) * 0.09);
    burstCore.material.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.28;

    burstRings.forEach(function(ring, i) {
      ring.rotation.x += 0.007 + i * 0.003;
      ring.rotation.y += 0.01 - i * 0.002;
      ring.scale.setScalar(1 + Math.sin(t * 1.5 + i * 0.8) * 0.05);
    });

    if (burstParticles) {
      burstParticles.rotation.y = t * 0.07;
      burstParticles.rotation.x = Math.sin(t * 0.04) * 0.3;
    }

    var targetZ = 18 - sceneProgress * 9;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
  }

  /* =========================================================================
     SCROLL TRACKING
     ========================================================================= */
  function setupScrollTracking() {
    function update() {
      var section = document.getElementById('cinematic-3d-section');
      if (!section) return;
      var rect = section.getBoundingClientRect();
      var sectionHeight = section.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;
      var scrolled = -rect.top;
      scrollProgress = Math.max(0, Math.min(1, scrolled / sectionHeight));
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function scrollToScene(idx) {
    var section = document.getElementById('cinematic-3d-section');
    if (!section) return;
    var top = section.offsetTop;
    var h = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (idx / CFG.SCENE_COUNT) * h, behavior: 'smooth' });
  }

  /* =========================================================================
     RESIZE + INTERACTION
     ========================================================================= */
  function setupResize() {
    window.addEventListener('resize', function() {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  function setupInteraction() {
    window.addEventListener('mousemove', function(e) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    window.addEventListener('touchmove', function(e) {
      var t = e.touches[0];
      targetMouseX = (t.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (t.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* =========================================================================
     LANGUAGE SYNC
     ========================================================================= */
  function syncLang() {
    var lang = document.documentElement.lang || 'ar';
    document.querySelectorAll('.cinematic-panel [data-ar]').forEach(function(el) {
      el.textContent = lang === 'ar' ? el.dataset.ar : (el.dataset.en || el.dataset.ar);
    });
  }

  /* =========================================================================
     FALLBACK
     ========================================================================= */
  function showFallback() {
    var c = document.getElementById('cinematic-canvas');
    if (c) c.style.display = 'none';
    var f = document.getElementById('cinematic-fallback');
    if (f) f.style.display = 'flex';
  }

  /* =========================================================================
     PUBLIC API
     ========================================================================= */
  window.SpeedUp3D = {
    init: function() {
      if (isInitialized) return;
      isInitialized = true;

      var canvas = createDOM();
      if (!canvas) return;

      var ok = initThreeJS(canvas);
      if (!ok) return;

      setupScrollTracking();
      setupResize();
      setupInteraction();
      animate();

      // Sync lang panels when language button is clicked
      var langBtn = document.getElementById('lang-toggle-btn');
      if (langBtn) {
        langBtn.addEventListener('click', function() {
          setTimeout(syncLang, 120);
        });
      }
      // Initial language sync (delay so main.js initLanguage runs first)
      setTimeout(syncLang, 150);
    }
  };

})();

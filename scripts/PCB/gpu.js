// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};

/**
 * Anything physics and graphics related.
 */
PCB.gpu = {
	/** registers */
	'game_stage_canvas': null,
	/** renderer related */
	'camera': null,
	'controls': null,
	'scene': null,
	'renderer': null,
	'light': null,
	/** oimo physics */
	'world': null,
	/** parameters */
	// screen camera position
	'camera_position': {
		x: 0,
		y: 100,
		z: 570
	},
	'control_default':[0,670,480,0,43,47],
	'allow_control': true,
	'debug_mode': false,
	// oimo params
	'oimo_gravity': -22,
	/** init. called from boot */
	init: function () {
		/**
		 * Canvas
		 */
		this.game_stage_canvas = document.getElementById("container");
		/**
		 * Graphics
		 */
		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
		// def angles
		this.camera.position.set( this.camera_position.x, this.camera_position.y, this.camera_position.z );
		this.camera.rotation.set(-1,0,0);
		// controls
		if(this.allow_control == true) {
		   // control / set def angles
			this.controls = new THREE.OrbitControls( this.camera, this.game_stage_canvas );
			this.controls.target.set( 0,this.camera_position.y,0 );
			// if debug mode on, remove pan control limits
			if(this.debug_mode == false) {
				// this.controls.minPolarAngle = 0;
				this.controls.maxPolarAngle = 1.8;
				// horizontal pan limit
				this.controls.minAzimuthAngle = -1;
				this.controls.maxAzimuthAngle = 1;
				// zoom
				this.controls.minDistance = 400;
				this.controls.maxDistance = 1850;
			} else {
				// console.log(this.controls);
			}
			PCB.gpu.resetCameraControlPosition();
		}

		this.scene = new THREE.Scene();

		if(!Detector.webgl) Detector.addGetWebGLMessage();

		this.renderer = new THREE.WebGLRenderer({ canvas:this.game_stage_canvas, precision: "mediump", antialias:true });
		this._setRenderSize();

		if(!PCB.init.is_mobile){

			this.scene.add( new THREE.AmbientLight( 0x888888 ) );
			this.light = new THREE.DirectionalLight( 0xffffff , 0.45);
			this.light.position.set( 0, 800, 500 );
			this.light.target.position.set( 0, 0, 0 );
			this.light.castShadow = true;

			var d = 300;
			this.light.shadow.camera = new THREE.OrthographicCamera( -d, d, d, -d,  500, 1600 );
			this.light.shadow.bias = 0.0001;
			this.light.shadow.mapSize.width = this.light.shadow.mapSize.height = 512;

			this.scene.add( this.light );

			this.renderer.shadowMap.enabled = true;
			this.renderer.shadowMap.type = THREE.PCFShadowMap;//THREE.BasicShadowMap;
		}

		this._setSkyBox();

		// events
		window.addEventListener( 'resize', this._onWindowResize, false );

		// physics init
		this._initOimoPhysics();
	},
	resetCameraControlPosition: function () {
		PCB.gpu.controls.object.position.x = PCB.gpu.control_default[0];
		PCB.gpu.controls.object.position.y = PCB.gpu.control_default[1];
		PCB.gpu.controls.object.position.z = PCB.gpu.control_default[2];
		PCB.gpu.controls.target.x = PCB.gpu.control_default[3];
		PCB.gpu.controls.target.y = PCB.gpu.control_default[4];
		PCB.gpu.controls.target.z = PCB.gpu.control_default[5];
		PCB.gpu.controls.update();
	},
	/* private methods */
	_initOimoPhysics: function (){
		this.world = new OIMO.World({info:true, worldscale:100} );
		this.world.gravity = new OIMO.Vec3(0, this.oimo_gravity, 0);
		PCB.gpu.world.clear();
	},
	_setSkyBox: function () {
		if(!PCB.d_sprite.textures.skybox) {
			var buffgeoBack = new THREE.BufferGeometry();
			buffgeoBack.fromGeometry( new THREE.IcosahedronGeometry(3000,2) );
			var back = new THREE.Mesh( buffgeoBack, new THREE.MeshBasicMaterial( { map:PCB.d_sprite.gradTexture([[0.75,0.6,0.4,0.25], ['#1B1D1E','#3D4143','#72797D', '#b0babf']]), side:THREE.BackSide, depthWrite: false, fog:false }  ));
			back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15*1.6));
			this.scene.add( back );
		} else {
			var _textureLoader = new THREE.TextureLoader(this.loadingManager);
			_textureLoader.crossOrigin = '';
			var _sphere = new THREE.Mesh(
				new THREE.SphereGeometry(3000, 32, 32),
				new THREE.MeshBasicMaterial({
					map: PCB.d_sprite.textures.skybox
				})
			);
			_sphere.scale.x = -1;
			this.scene.add( _sphere );
		}
	},
	/**
	 * Screen management
	 */
	_setRenderSize: function () {
		var _cabinet_element = document.getElementById("cabinet");
		this.renderer.setSize( _cabinet_element.clientWidth, _cabinet_element.clientHeight );
		this._onWindowResize();
	},
	_onWindowResize: function () {
		PCB.gpu.camera.aspect = window.innerWidth / window.innerHeight;
		PCB.gpu.camera.updateProjectionMatrix();
		PCB.gpu.renderer.setSize( window.innerWidth, window.innerHeight );
	},
	_setCanvasToWindowSize: function () {
		PCB.gpu.camera.aspect = window.innerWidth / window.innerHeight;
		PCB.gpu.camera.updateProjectionMatrix();
		PCB.gpu.renderer.setSize( window.innerWidth, window.innerHeight );
	},
	fullScreen: function (){
		this._setCanvasToWindowSize();
		var _canvas = this.game_stage_canvas;
		_canvas.setAttribute('height', window.innerHeight);
		if(_canvas.requestFullScreen)
			_canvas.requestFullScreen();
		else if(_canvas.webkitRequestFullScreen)
			_canvas.webkitRequestFullScreen();
		else if(_canvas.mozRequestFullScreen)
			_canvas.mozRequestFullScreen();
	}
};

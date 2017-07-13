// boot with the boot rom.
//
// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};

PCB.boot = {
	/* instances */
	'loadingManager': null,
	'soundFileExtension': null,
	/* methods */
	init: function () {
		/* enqueue sound files */
		ROM.sound.enqueue();
		// see https://threejs.org/docs/#api/loaders/managers/LoadingManager
		this.loadingManager = new THREE.LoadingManager();
		this.loadingManager.onProgress = function ( item, loaded, total ) {
			// this gets called after an object has been loaded
			// console.log(item, loaded, total);
		};
		this.loadingManager.onError = function ( url ) {
			// this gets called after an object has been loaded
			console.log(url);
		};
		this.loadingManager.onLoad = function () {
			PCB.init.init();
			ROM.boot.placeObjects();
		};

		this.loadTextures(ROM.boot.textures);
		this.loadModels(ROM.boot.models);
	},
	/**
	 * Loads image textures in jason format
	 *
	 * @param      {string}  imageUrls  The image urls
	 */
	loadTextures: function (imageUrls) {
		var _textureLoader = new THREE.TextureLoader(this.loadingManager);
		/* do not set crossorigin property at all otherwise images would not load in SAFARI + Nginx (images are sent with a wrong mime type, text/html) */
		for (var _key in imageUrls) {
			PCB.d_sprite.textures[_key] = _textureLoader.load(imageUrls[_key]);
		}
	},
	/**
	 * Loads models in jason format
	 *
	 * @param      {string}  imageUrls  The image urls
	 */
	loadModels: function (jsonUrls) {
		for (var _key in jsonUrls) {
			this.enqueueJsonLoad(_key,jsonUrls[_key]);
		}
	},
	enqueueJsonLoad: function (key,jsonUrl) {
		PCB.d_sprite.models[key] = {};
		var _jsonLoader = new THREE.JSONLoader(this.loadingManager);
		_jsonLoader.load(jsonUrl,function (geometry, materials ){
			PCB.d_sprite.models[key].geometry = geometry;
			PCB.d_sprite.models[key].materials = materials;
		});
	}
}

PCB.boot.init();
// Make ROM if it does not exist yet (to deal with load order issue here).
if(!ROM) var ROM = {};

// burn ROM
if(!ROM.d_sprite_geometries) ROM.d_sprite_geometries = {};

ROM.d_sprite_geometries = {
	'sphere': new THREE.BufferGeometry().fromGeometry( new THREE.SphereGeometry(1,16,10)),
	'box': new THREE.BufferGeometry().fromGeometry( new THREE.BoxGeometry(1,1,1)),
	'cylinder': new THREE.BufferGeometry().fromGeometry(new THREE.CylinderGeometry(1,1,1)),
	'cylinder_fine': new THREE.BufferGeometry().fromGeometry(new THREE.CylinderGeometry(1,1,1,32)),
	'circle': new THREE.CircleGeometry(1,30),
	'plane': new THREE.PlaneGeometry(1,1,1),
	// http://gupuru.hatenablog.jp/entry/2013/12/24/202207
	'rectangle_torus': new THREE.TorusGeometry( 1, 0.1, 3, 4 ),
	'longBumper': function () {
		// https://stackoverflow.com/questions/36414092/how-to-draw-only-falling-half-of-spline-in-three-js
		// https://stackoverflow.com/questions/42921751/u-shaped-magnet-geometry-in-three-js
		// https://en.wikipedia.org/wiki/Spline_(mathematics)
		// http://markun.cs.shinshu-u.ac.jp/learn/cg/cg3/index5.html
		var _curve = new THREE.CatmullRomCurve3( [
			new THREE.Vector3( -4.3,0,0 ),
			new THREE.Vector3( -4.4,5,0 ),
			new THREE.Vector3( -4,9,0 ),
			new THREE.Vector3( 0,11,0),
			new THREE.Vector3( 4,9,0 ),
			new THREE.Vector3( 4.4,5,0 ),
			new THREE.Vector3( 4.4,0,0 ),
			] );
		return new THREE.TubeGeometry(_curve, 20, 0.6, 8, false);
	},
	'shortBumper': function () {
		var _curve = new THREE.CatmullRomCurve3( [
			new THREE.Vector3( -4.5,3.5,0 ),
			new THREE.Vector3( -4.6,5,0 ),
			new THREE.Vector3( -4,9,0 ),
			new THREE.Vector3( 0,11,0),
			new THREE.Vector3( 4,9,0 ),
			new THREE.Vector3( 4.6,5,0 ),
			new THREE.Vector3( 4.5,3.5,0 ),
			] );
		return new THREE.TubeGeometry(_curve, 20, 0.6, 8, false);
	},
}
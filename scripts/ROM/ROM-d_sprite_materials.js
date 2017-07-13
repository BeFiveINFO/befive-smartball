// Make ROM if it does not exist yet (to deal with load order issue here).
if(!ROM) var ROM = {};

// burn ROM
if(!ROM.d_sprite_materials) ROM.d_sprite_materials = {};

ROM.d_sprite_materials = {
	'ball': new THREE.MeshPhongMaterial( {shininess: 20, color: 0xFFFFFF, name:'ball' } ),
	'box': new THREE.MeshPhongMaterial( {shininess: 10, map: PCB.d_sprite.basicTexture('#AA6538'), name:'box' } ),
	'cyl': new THREE.MeshPhongMaterial( {shininess: 10, map: PCB.d_sprite.basicTexture('#AAAA38'), name:'cyl' } ),
	'ssph': new THREE.MeshPhongMaterial( {shininess: 10, map: PCB.d_sprite.basicTexture('#61686B'), name:'ssph' } ),
	'layout_foundation': new THREE.MeshPhongMaterial( {shininess: 0,color: 0xfff1c6, name:'layout_foundation' } ),
	'cabinet_frames': new THREE.MeshPhongMaterial( {shininess: 0,color: 0xfcf9e3, name:'cabinet_frames' } ),
	'transparent_plastic_green': new THREE.MeshLambertMaterial( {color: 0x00ff00, transparent: true, opacity: 0.5, name:'transparent_plastic_green' } ),
	'hole': new THREE.MeshBasicMaterial({color: 0x181818,lights:false,name:'hole'}),
	'hole_debug': new THREE.MeshBasicMaterial({color: 0xff0000,lights:false,name:'hole'}),
	'flipHole_foundation': new THREE.MeshPhongMaterial( {shininess: 1,color: 0x6c6c6c, name:'flipHole_foundation' } ),
	'logo_lettering': new THREE.MeshPhongMaterial( {shininess: 1,color: 0x3884AA, name:'logo_lettering' } ),
	'lettering_red': new THREE.MeshPhongMaterial( {shininess: 1,color: 0x9c0404, name:'lettering_red' } ),
	'lettering_green': new THREE.MeshPhongMaterial( {color: 0x003100, name:'lettering_green' } ),
	'lettering_yellow': new THREE.MeshPhongMaterial( {color: 0xf2be1b, name:'lettering_yellow' } ),
	'black': new THREE.MeshPhongMaterial( {shininess: 1,color: 0x232323, name:'black' } ),
	'dummy': new THREE.Material({lights:false,name:'hole'}),
	'metal': new THREE.MeshStandardMaterial( {side: THREE.FrontSide, color: 0xffffff,roughness:0.53, metalness:0.79 , emissive: 0x757575, emissiveIntensity: 0.3, name:'metal' } ),
	'metal_bright': new THREE.MeshPhongMaterial( {side: THREE.FrontSide, color: 0xefefef, shininess: 13, specular: 0xc0b3b3, emissive: 0x646464, emissiveIntensity: 0.3, name:'metal_bright' } ),
	// 'needle': new THREE.MeshStandardMaterial( {side: THREE.FrontSide, color: 0xefefef,roughness:0.5, metalness:0.5 , name:'metal' } ),
	'needle': new THREE.MeshPhongMaterial( {shininess: 10,color: 0xacacac,name:'needle' } ),
	'flipHole': function () {
		var _materialArray = [];
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x545454 } )); // right side
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x545454 } ));  // left side
		_materialArray.push(new THREE.MeshPhongMaterial( { map: PCB.d_sprite.textures.flipHole_head })); // top
		_materialArray.push(new THREE.MeshPhongMaterial( { map: PCB.d_sprite.textures.flipHole_tail })); // bottom
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x545454 } )); // front
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x545454 })); // rear
		return _materialArray;
	},
	'rear_box': function () {
		var _materialArray = [];
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0xbcac91 } )); // right side
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0xbcac91 } ));  // left side
		_materialArray.push(new THREE.MeshPhongMaterial( {side: THREE.FrontSide, color: 0xcecece, shininess: 10, specular: 0xc0b3b3, emissive: 0x646464, emissiveIntensity: 0.3, name:'metal_bright' } )); // top
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x545454 })); // bottom
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0xe8b22c } )); // front
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x7a6f5e })); // rear
		return _materialArray;
	},
	'rail_guide_top': new THREE.MeshPhongMaterial( {color: 0x542224, name:'rail_guide_top' } ),
	'rail_guide': function () {
		var _materialArray = [];
		_materialArray.push(new THREE.MeshPhongMaterial( {side: THREE.FrontSide, color: 0xefefef, shininess: 10, specular: 0xc0b3b3, emissive: 0x646464, emissiveIntensity: 0.3, name:'metal_bright' } )); // right side
		_materialArray.push(new THREE.MeshPhongMaterial( {side: THREE.FrontSide, color: 0xefefef, shininess: 10, specular: 0xc0b3b3, emissive: 0x646464, emissiveIntensity: 0.3, name:'metal_bright' } ));  // left side
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x542224 })); // top
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x000000 })); // bottom
		_materialArray.push(new THREE.MeshPhongMaterial( {side: THREE.FrontSide, color: 0xcecece, shininess: 10, specular: 0xc0b3b3, emissive: 0x646464, emissiveIntensity: 0.3, name:'metal_bright' } ) ); // front
		_materialArray.push(new THREE.MeshPhongMaterial( { color: 0x000000 })); // rear
		return _materialArray;
	},
	'testPngMaterial': function () {
		PCB.d_sprite.textures.logo.magFilter = THREE.NearestFilter;
		PCB.d_sprite.textures.logo.minFilter = THREE.LinearMipMapLinearFilter;
		return new THREE.MeshBasicMaterial( { map: PCB.d_sprite.textures.logo, alphaTest: 0.2, transparent: true,side: THREE.DoubleSide} );
	},
	'shoot_button': new THREE.MeshStandardMaterial( {side: THREE.FrontSide,color: 0xFFFFFF, emissive: 0x000000, name:'shoot_button' } ),
	'wireframe': new THREE.MeshPhongMaterial( {shininess: 10, map: PCB.d_sprite.basicTexture(1), wireframe: true, name:'wireframe' } ),
	'ground': new THREE.MeshPhongMaterial( {shininess: 5, color:0x888888, transparent:false} ),
	'ground_transparent': new THREE.MeshPhongMaterial( {color: 0x3D4143, transparent:true, opacity:0.0 } ),
}

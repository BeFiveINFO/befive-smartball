// Make rame
if(!RAM) var RAM = {};

// Make rame for d sprite
RAM.d_sprite = {
	bodies: {},
	meshes: {},
	groups: {},
};

// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};


/**
 * 3d Sprite Manager
 *
 * @param      object   context  	id				id of the sprite
 * 									arguments		object of arguments to be passed to sprites or commands
 * 									destroy			destroy the sprite specified with id
 * 									destroy_all		destroy all registered sprite instances.
 */
PCB.d_sprite = {
	/** image texture */
	'textures': {},
	/** models */
	'models': {},
	/** paramters */
	'oimo_object_config': [
		1, // The density of the shape.
		0.4, // The coefficient of friction of the shape.
		0.2, // The coefficient of restitution of the shape.
		1, // The bits of the collision groups to which the shape belongs.
		0xffffffff // The bits of the collision groups with which the shape collides.
	],
	/** init. called from boot */
	init: function () {
	},
	/**
	 * Groups. supports mesh objects only for now
	 */
	addToGroup: function (groupID,objectMeshID,position,rotation,size) {
		if(!RAM.d_sprite.groups[groupID]) {
			RAM.d_sprite.groups[groupID] = new THREE.Group();
			PCB.gpu.scene.add(RAM.d_sprite.groups[groupID]);
		}
		RAM.d_sprite.groups[groupID].add(RAM.d_sprite.meshes[objectMeshID]);
		if(position) this.moveGroup(groupID,position);
		if(rotation) this.rotateGroup(groupID,rotation);
		if(size) this.resizeGroup(groupID,size);
	},
	moveGroup: function (groupID,position) {
		var _group = RAM.d_sprite.groups[groupID];
		_group.position.set( position[0], position[1], position[2] );
	},
	rotateGroup: function (groupID,rotation) {
		var _group = RAM.d_sprite.groups[groupID];
		_group.rotation.set( rotation[0], rotation[1], rotation[2] );
	},
	resizeGroup: function (groupID,size) {
		var _group = RAM.d_sprite.groups[groupID];
		_group.scale.set(size[0],size[1],size[2]);
	},
	updatePositionRotation: function (id,position,rotation) {
		if(RAM.d_sprite.meshes[id]) {
			var _mesh = RAM.d_sprite.meshes[id];
			var _ToRad = 0.0174532925199432957;
			if(position) _mesh.position.set( position[0], position[1], position[2] );
			if(rotation) _mesh.rotation.set( rotation[0]*_ToRad, rotation[1]*_ToRad, rotation[2]*_ToRad );
		}
		if(RAM.d_sprite.bodies[id]) {
			var _body = RAM.d_sprite.bodies[id];
			// var _pos = _body.getPosition();
			// var _quat = _body.getQuaternion();
			if(position) {
				position = {x:position[0],y:position[1],z:position[2]};
				_body.setPosition(position);
			}
			if(rotation) {
				_body.setQuaternion(_mesh.quaternion);
			}
		}
		// update the physics world
		// PCB.dsp_balls.wakeOimoPhysics();
		// PCB.dsp_balls.updateOimoPhysics();
	},
	destroy: function (id) {
		if(RAM.d_sprite.meshes[id]) {
			PCB.gpu.scene.remove(RAM.d_sprite.meshes[id]);
			delete RAM.d_sprite.meshes[id];
		}
		if(RAM.d_sprite.bodies[id]) {
			PCB.gpu.world.removeRigidBody(RAM.d_sprite.bodies[id]);
			delete RAM.d_sprite.bodies[id];
		}
	},
	destroyAll: function () {
		// meshes
		for (var _key in RAM.d_sprite.meshes) {
			PCB.gpu.scene.remove(RAM.d_sprite.meshes[_key]);
		}
		// body (physics)
		for (var _key in RAM.d_sprite.bodies) {
			PCB.gpu.world.removeRigidBody(RAM.d_sprite.bodies[_key]);
		}
		// empty RAM
		RAM.d_sprite.meshes = {};
		RAM.d_sprite.bodies = {};
	},
	/**
	 * Do tween for position
	 *
	 * @param      {<type>}    id        The d sprite identifier
	 * @param      {array}    position  The position. x, y, z.
	 * @param      {number}    duration  The duration in mms.
	 * @param      {Function}  easing    The easing. Default is TWEEN.Easing.Elastic.Out
	 */
	tween_position:function(id,targetPosition,duration,easing,onComplete) {
		// obj targeted
		var _mesh = RAM.d_sprite.meshes[id];
		var _body = RAM.d_sprite.bodies[id];
		// set coordinates
		targetPosition = {x:targetPosition[0],y:targetPosition[1],z:targetPosition[2]};
		// default settings
		easing = (easing) ? easing : TWEEN.Easing.Quadratic.In;
		duration = (duration) ? duration : 1000;
		// set up tween
		var _tween = new TWEEN.Tween(_mesh.position).to(targetPosition,duration).easing(easing).onUpdate(
			function (d) {
				var _position = new THREE.Vector3(_mesh.position.x,_mesh.position.y,_mesh.position.z);
				_body.setPosition(_position);
			}
		).onComplete(function(){
			var _position = new THREE.Vector3(_mesh.position.x,_mesh.position.y,_mesh.position.z);
			_body.setPosition(_position);PCB.event.trigger(onComplete);}).start();
		// update the physics world
		// PCB.dsp_balls.wakeOimoPhysics();
		// PCB.dsp_balls.updateOimoPhysics();

	},
	tweenBack_position:function(id,originalPosition,targetPosition,duration,duration_back,easing,onComplete,onComplete_back) {
		// obj targeted
		var _mesh = RAM.d_sprite.meshes[id];
		var _body = RAM.d_sprite.bodies[id];
		// set coordinates
		originalPosition = {x:originalPosition[0],y:originalPosition[1],z:originalPosition[2]};
		targetPosition = {x:targetPosition[0],y:targetPosition[1],z:targetPosition[2]};
		// default settings
		easing = (easing) ? easing : TWEEN.Easing.Quadratic.In;
		duration = (duration) ? duration : 1000;
		duration_back = (duration_back) ? duration_back : 1000;
		// set up tween
		var _tween = new TWEEN.Tween(_mesh.position).to(targetPosition,duration).easing(easing).onUpdate(
			function (d) {
				var _position = new THREE.Vector3(_mesh.position.x,_mesh.position.y,_mesh.position.z);
				_body.setPosition(_position);
			}
		).onComplete(function(){PCB.event.trigger(onComplete);});
		var _tweenBack = new TWEEN.Tween(_mesh.position).to(originalPosition,duration_back).easing(easing).onUpdate(
			function (d) {
				var _position = new THREE.Vector3(_mesh.position.x,_mesh.position.y,_mesh.position.z);
				_body.setPosition(_position);
			}
		).onComplete(function(){
			var _position = new THREE.Vector3(_mesh.position.x,_mesh.position.y,_mesh.position.z);
				_body.setPosition(_position);
			PCB.event.trigger(onComplete_back);
		});
		_tween.chain(_tweenBack).start();
		// update the physics world
		// PCB.dsp_balls.wakeOimoPhysics();
		// PCB.dsp_balls.updateOimoPhysics();
	},
	/**
	 * public utility methods
	 */
	basicTexture: function (color,checkPattern){
		checkPattern = checkPattern || false;
		var canvas = document.createElement("canvas");
		canvas.width = canvas.height = 64;
		var ctx = canvas.getContext( '2d' );
		ctx.fillStyle = color;
		if(checkPattern) {
			ctx.fillRect(0, 0, 64, 64);
			ctx.fillStyle = "rgba(0,0,0,0.2)";
			ctx.fillRect(0, 0, 32, 32);
			ctx.fillRect(32, 32, 32, 32);
		} else {
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
		var tx = new THREE.Texture(canvas);
		tx.needsUpdate = true;

		return tx;
	},
	gradTexture: function (color) {
		var canvas = document.createElement("canvas");
		var ct = canvas.getContext("2d");
		var size = 1024;
		canvas.width = 16; canvas.height = size;
		var gradient = ct.createLinearGradient(0,0,0,size);
		var i = color[0].length;
		while(i--){ gradient.addColorStop(color[0][i],color[1][i]); }
		ct.fillStyle = gradient;
		ct.fillRect(0,0,16,size);
		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		return texture;
	},
	/**
	 * Adds a box with or without physics.
	 *
	 * @uses		PCB.d_sprite._addStaticObject()
	 *
	 * @param      {string}  id        The identifier
	 * @param      {array}  size      The size. x,y,z.
	 * @param      {array}  position  The position, x,y,z.
	 * @param      {array}  rotation  The rotation, x,y,z.
	 * @param      {string}  material  The material.
	 * 									invisible: hide physics only
	 * 									ghost: hide the graphic only
	 * 									ground: use ground material
	 * 									any others: use transparent ground material
	 */
	addBox: function (id,size,position,rotation,material,disable_body,disable_mesh,is_moveable) {
		is_moveable = (is_moveable) ? true : false;
		var _id, _partParameter, _type, _partModule;
		if(id.constructor === Array) {
			_id =id[0];
			_type = id[1] || _id;
			_partModule = id[2] || _type;
			_partParameter = id[3] || '';
		} else {
			_id = _type = id;
			_partParameter = _partModule = '';
		}
		// oimo physical engine
		if(disable_body != true) {
			RAM.d_sprite.bodies[_id] = PCB.gpu.world.add({size:size, pos:position, rot:rotation, world:PCB.gpu.world,config:this.oimo_object_config,move:is_moveable,name:_type});
			RAM.d_sprite.bodies[_id].partID = _id;
			RAM.d_sprite.bodies[_id].partModule = _partModule;
			RAM.d_sprite.bodies[_id].partParameter = _partParameter;
		}
		// set material
		material = (material) ? material : 'ground';
		// add to the three js graphic renderer engine
		if(typeof ROM.d_sprite_materials[material] === 'function') {
			material = ROM.d_sprite_materials[material]();
		} else {
			material = ROM.d_sprite_materials[material];
		}
		if(disable_mesh != true) {
			RAM.d_sprite.meshes[_id] = this._addStaticObject(_id,size,position,rotation,ROM.d_sprite_geometries.box,material);
		}
	},
	/**
	 * Adds a cylynder with physics.
	 *
	 * @uses		PCB.d_sprite._addStaticObject()
	 *
	 * @param      {string}  id        The identifier
	 * @param      {array}  size      The size. x,y,z.
	 * @param      {array}  position  The position, x,y,z.
	 * @param      {array}  rotation  The rotation, x,y,z.
	 * @param      {string}  material  The material.
	 * 									invisible: hide physics only
	 * 									ghost: hide the graphic only
	 * 									ground: use ground material
	 * 									any others: use transparent ground material
	 */
	addCylynder: function (id,size,position,rotation,material,disable_body,disable_mesh,cylinderResolution) {
		cylinderResolution = (cylinderResolution) ? 'cylinder_fine' : 'cylinder';
		var _id, _partParameter, _type, _partModule;
		if(id.constructor === Array) {
			_id =id[0];
			_type = id[1] || _id;
			_partModule = id[2] || _type;
			_partParameter = id[3] || '';
		} else {
			_id = _type = id;
			_partParameter = '';
		}
		// oimo physical engine
		if(disable_body != true) {
			RAM.d_sprite.bodies[_id] = PCB.gpu.world.add({size:size, pos:position, rot:rotation, world:PCB.gpu.world,config:this.oimo_object_config,name:_type});
			RAM.d_sprite.bodies[_id].partID = _id;
			RAM.d_sprite.bodies[_id].partModule = _partModule;
			RAM.d_sprite.bodies[_id].partParameter = _partParameter;
		}
		// set material
		material = (material) ? material : 'ground';
		// add to the three js graphic renderer engine
		if(typeof ROM.d_sprite_materials[material] === 'function') {
			material = ROM.d_sprite_materials[material]();
		} else {
			material = ROM.d_sprite_materials[material];
		}
		if(disable_mesh != true) {
			RAM.d_sprite.meshes[_id] = this._addStaticObject(_id,size,position,rotation,ROM.d_sprite_geometries[cylinderResolution],material);
		}
	},
	/**
	 * Adds a circle with / without physics.
	 *
	 * @uses		PCB.d_sprite._addStaticObject()
	 *
	 * @param      {string}  id        The identifier
	 * @param      {array}  size      The size. x,y,z.
	 * @param      {array}  position  The position, x,y,z.
	 * @param      {array}  rotation  The rotation, x,y,z.
	 * @param      {string}  material  The material.
	 * 									invisible: hide physics only
	 * 									ghost: hide the graphic only
	 * 									ground: use ground material
	 * 									any others: use transparent ground material
	 */
	addCircle: function (id,size,position,rotation,material,disable_body,disable_mesh,is_moveable) {
		is_moveable = (is_moveable) ? true : false;
		// oimo physical engine
		if(disable_body != true) {
			RAM.d_sprite.bodies[id] = PCB.gpu.world.add({size:size, pos:position, rot:rotation, world:PCB.gpu.world,config:this.oimo_object_config,move:is_moveable,name:id});
		}
		// set material
		material = (material) ? material : 'ground';
		// add to the three js graphic renderer engine
		if(typeof ROM.d_sprite_materials[material] === 'function') {
			material = ROM.d_sprite_materials[material]();
		} else {
			material = ROM.d_sprite_materials[material];
		}
		if(disable_mesh != true) {
			RAM.d_sprite.meshes[id] = this._addStaticObject(id,size,position,rotation,ROM.d_sprite_geometries.circle,material);
		}
	},
	/**
	 * Adds a plane without physics.
	 *
	 * @uses		PCB.d_sprite._addStaticObject()
	 *
	 * @param      {string}  id        The identifier
	 * @param      {array}  size      The size. x,y,z.
	 * @param      {array}  position  The position, x,y,z.
	 * @param      {array}  rotation  The rotation, x,y,z.
	 * @param      {string}  material  The material.
	 */
	addPlane: function (id,size,position,rotation,material) {
		// set material
		material = (material) ? material : 'ground';
		// add to the three js graphic renderer engine
		if(typeof ROM.d_sprite_materials[material] === 'function') {
			material = ROM.d_sprite_materials[material]();
		} else {
			material = ROM.d_sprite_materials[material];
		}
		RAM.d_sprite.meshes[id] = this._addStaticObject(id,size,position,rotation,ROM.d_sprite_geometries.plane,material);
	},
	/**
	 * Adds a plane without physics.
	 *
	 * @uses		PCB.d_sprite._addStaticObject()
	 *
	 * @param      {string}  id        The identifier
	 * @param      {array}  size      The size. x,y,z.
	 * @param      {array}  position  The position, x,y,z.
	 * @param      {array}  rotation  The rotation, x,y,z.
	 * @param      {string}  material  The material.
	 */
	addAnObject: function (id,size,position,rotation,material,geometry) {
		// set material
		material = (material) ? material : 'ground';
		geometry = (geometry) ? geometry : 'rectangle_torus';
		// add to the three js graphic renderer engine
		if(typeof ROM.d_sprite_materials[material] === 'function') {
			material = ROM.d_sprite_materials[material]();
		} else {
			material = ROM.d_sprite_materials[material];
		}
		RAM.d_sprite.meshes[id] = this._addStaticObject(id,size,position,rotation,ROM.d_sprite_geometries[geometry],material);
	},
	/**
	 * Adds a bumper (2 types) without physics.
	 *
	 * @uses		PCB.d_sprite._addStaticObject()
	 *
	 * @param      {string}  id        The identifier
	 * @param      {array}  size      The size. x,y,z.
	 * @param      {array}  position  The position, x,y,z.
	 * @param      {array}  rotation  The rotation, x,y,z.
	 * @param      {string}  material  The material.
	 * 									invisible: hide physics only
	 * 									ghost: hide the graphic only
	 * 									ground: use ground material
	 * 									any others: use transparent ground material
	 */
	addBumperMesh: function (id,type,size,position,rotation,material) {
		// geometry
		var _geometry = (type === 'longBumper') ? ROM.d_sprite_geometries.longBumper() : ROM.d_sprite_geometries.shortBumper();
		// add to the three js graphic renderer engine
		if(typeof ROM.d_sprite_materials[material] === 'function') {
			material = ROM.d_sprite_materials[material]();
		} else {
			material = ROM.d_sprite_materials[material];
		}
		RAM.d_sprite.meshes[id] = this._addStaticObject(id,size,position,rotation,_geometry,material);
	},
	/**
	 * Adds a json object mesh without physics.
	 *
	 * @uses		PCB.d_sprite._addStaticObject()
	 *
	 * @param      {string}  id        The identifier
	 * @param      {array}  size      The size. x,y,z.
	 * @param      {array}  position  The position, x,y,z.
	 * @param      {array}  rotation  The rotation, x,y,z.
	 * @param      {string}  material  The material.
	 * 									invisible: hide physics only
	 * 									ghost: hide the graphic only
	 * 									ground: use ground material
	 * 									any others: use transparent ground material
	 */
	addJsonObjectMesh: function (id,size,position,rotation,material) {
		var _id, _type;
		if(id.constructor === Array) {
			_id =id[0];
			_type = id[1] || _id;
		} else {
			_id = _type = id;
		}
		// geometry
		var _geometry = PCB.d_sprite.models[_type].geometry;
		// add to the three js graphic renderer engine
		if(typeof ROM.d_sprite_materials[material] === 'function') {
			material = ROM.d_sprite_materials[material]();
		} else {
			material = ROM.d_sprite_materials[material];
		}
		RAM.d_sprite.meshes[_id] = this._addStaticObject(_id,size,position,rotation,_geometry,material);
	},
	/**
	 * private methods
	 */
	/*
	 * Add Static Box for panels
	 *
	 * @see        PCB.d_sprite.addPanel()
	 *
	 * @param      {array}  size      The size. x,y,z.
	 * @param      {array}  position  The position, x,y,z.
	 * @param      {array}  rotation  The rotation, x,y,z.
	 * @param      {string}  material  The material.
	 * @return     {THREE}   { object received from the three.js library. }
	 */
	_addStaticObject: function (id,size,position,rotation,geometry,material) {
		var _castShadow = true;
		var _ToRad = 0.0174532925199432957;
		// make a mesh
		var _mesh = new THREE.Mesh(geometry, material);
		_mesh.name = id;
		_mesh.scale.set( size[0], size[1], size[2] );
		_mesh.position.set( position[0], position[1], position[2] );
		_mesh.rotation.set( rotation[0]*_ToRad, rotation[1]*_ToRad, rotation[2]*_ToRad );
		PCB.gpu.scene.add( _mesh );
		_mesh.castShadow = _castShadow;
		_mesh.receiveShadow = true;
		return _mesh;
	},
};

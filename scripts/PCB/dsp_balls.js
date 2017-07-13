// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};


/**
 * Anything related to balls.
 * It also has the rendering loop. see PCB.dsp_balls._ballMonitor().
 */
PCB.dsp_balls = {
	/** private properties */
	'bodies': [],
	'meshes': [],
	'release_ball_counter': 0,
	'dispense_timer_instance': null,
	/** sensors */
	// ball id number is set
	'sensor_at_shooter': false,
	/** paramters */
	'oimo_object_config': [
		1, // The density of the shape.
		0.1, // The coefficient of friction of the shape.
		0.2, // The coefficient of restitution of the shape.
		1, // The bits of the collision groups to which the shape belongs.
		0xffffffff // The bits of the collision groups with which the shape collides.
	],
	/** methods */
	init: function () {
		this._ballMonitor();
	},
	releaseBalls: function () {
		// fail safe. When there are more than 20 requests at once, something wrong must be going on.
		if(PCB.dsp_balls.release_ball_counter > 25) {
			clearInterval(PCB.dsp_balls.dispense_timer_instance);
			PCB.dsp_balls.dispense_timer_instance = null;
			PCB.dsp_balls.release_ball_counter = 0;
			PCB.dsp_balls.clearBalls();
			PCB.init.updateCreditsCounter(100);
			var $_modalAlert = $('[data-remodal-id=modal_alert]');
			$_modalAlert.find('.modal_content').html('Sorry there was an malfunction with dispenser. 100 credits added as a compensation.');
			var $_remodal_inst = $_modalAlert.remodal();
			$_remodal_inst.open();
			return false;
		}
		var ballNum = 5;
		//add object
		var _x, _y, _z;
		var _w = 25 * 0.5;
		var _length = PCB.dsp_balls.bodies.length;
		var _total_num = _length + ballNum;
		for ( var _i = _length; _i < _total_num; _i++ ) {
			_x = 94 + Math.random()*30;
			_z = -280 + Math.random()*10;
			_y = 210;

			PCB.dsp_balls.bodies[_i] = PCB.gpu.world.add({type:'sphere', friction: 0.01, size:[_w], pos:[_x,_y,_z], move:true, world:PCB.gpu.world,config:PCB.dsp_balls.oimo_object_config,name: 'ball_' + _i});
			PCB.dsp_balls.bodies[_i].prevPosition = null;
			PCB.dsp_balls.meshes[_i] = new THREE.Mesh( ROM.d_sprite_geometries.sphere, ROM.d_sprite_materials.ball );
			PCB.dsp_balls.meshes[_i].scale.set( _w, _w, _w );
			PCB.dsp_balls.meshes[_i].castShadow = true;
			PCB.dsp_balls.meshes[_i].receiveShadow = false;
			PCB.gpu.scene.add(PCB.dsp_balls.meshes[_i]);
		}
		PCB.dsp_balls.release_ball_counter -= 1;
		// play dipenser sound
		var _ballNum = PCB.dsp_balls.bodies.length;
		// console.log(_ballNum);
		var _ballNumRate = (_ballNum > 250 ) ? 0 : _ballNum / 250;
		var _soundID = 'ball_dispensed_' + (Math.floor(Math.random() * 2) + 1);
		// console.log(_ballNum,_soundID);
		PCB.audio.play(_soundID,1,null);
		// clear timer if the coutner reaches 0.
		if(PCB.dsp_balls.release_ball_counter < 1) {
			clearInterval(PCB.dsp_balls.dispense_timer_instance);
			PCB.dsp_balls.dispense_timer_instance = null;
		}
	},
	clearBalls(){
		var _i=this.meshes.length;
		while (_i--) PCB.gpu.scene.remove(this.meshes[ _i ]);
		_i=this.bodies.length;
		while (_i--) PCB.gpu.world.removeRigidBody(this.bodies[_i]);
		this.meshes = [];
		this.bodies = [];
	},
	/**
	 * Adds a ball dispense schedule.
	 *
	 * @param      {number}  counts  The counts. 5 balls dispensed at a time.
	 */
	addBallDispenseSchedule: function( counts ) {
		// important to convert the type to number otherwise it might be interpreted as string causing
		// unwanted results
		this.release_ball_counter += Number(counts);
		// console.log(this.release_ball_counter, counts);
		if(this.dispense_timer_instance === null) {
			this.dispense_timer_instance = setInterval(PCB.dsp_balls.releaseBalls,350);
		}
	},
	/**
	 * Shoot a ball
	 *
	 * @param      {number} strength Range is 0 ~ 15.
	 */
	shootBall: function (strength) {
		var _sensor_at_shooter = this.sensor_at_shooter;
		if(_sensor_at_shooter) {
			_sensor_at_shooter.linearVelocity.z = -5 - strength;
			this.sensor_at_shooter = null;
		}
	},
	/**
	* Public Core Methods
	*/
	updateOimoPhysics: function() {
		if(PCB.gpu.world==null) return;

		PCB.gpu.world.step();

		var _x, _y, _z, _mesh, _body, _i = _bodies_num = this.bodies.length;
		var _shootSensorVacant = true;
		var _detectedInstance;
		var _removeList = [];

		while (_i--){
			_body = this.bodies[_i];
			_body.name = 'ball_'+_i;
			/**
			 * Sensors
			 */
			// shooter sensor
			if(_detectedInstance = PCB.gpu.world.getContact('sensor', _body.name)) {
				var _targetObject = _detectedInstance.body1;
				var _partModule = _targetObject.partModule;

				/**
				 * Part modules ordered by use frequencies.
				 */
				switch(_partModule) {
					case 'laneEndSpring':
						var _collisionShock = (Math.abs(_body.linearVelocity.x) + Math.abs(_body.linearVelocity.y) + Math.abs(_body.linearVelocity.z));
						_collisionShock = (_collisionShock > 6 ) ? 1 : (_collisionShock < 0.5 ) ? 0 : _collisionShock / 6;
						_body.linearVelocity.z = 0 - 7 * _collisionShock;
						_body.linearVelocity.x = 0 - 2 * _collisionShock;
						_detectedInstance = _targetObject = null;
						break;
					case 'ballShooter':
						this.sensor_at_shooter = _body;
						_shootSensorVacant = false;
						// _detectedInstance = _targetObject = null;
						break;
					case 'hole':
						var _partParameter = _targetObject.partParameter;
						PCB.dsp_balls.addBallDispenseSchedule(_partParameter);
						_removeList.push(_i);
						// console.log('hole_sensor_',_partParameter,_detectedInstance,_body.name,_removeList);
						_body.name = '';
						PCB.audio.play('ball_in_mech_1',1);
						// _detectedInstance = _targetObject = null;
						continue;
						break;
					case 'flipHole':
						var _partParameter = _targetObject.partParameter;
						if(ROM.d_sprite.cabinet['flipHole_accepts_' + _partParameter] === true) {
							ROM.d_sprite.cabinet.flipFlipHole(_partParameter);
							// console.log('flipHole',_partParameter);
							_removeList.push(_i);
							_body.name = '';
							PCB.audio.play('ball_in_mech_2',1);
						}
						// _detectedInstance = _targetObject = null;
						continue;
						break;
					case 'rensho':
						var _partParameter = _targetObject.partParameter;
						// console.log("Rensho",_body,_body.isStatic,_i,_partParameter);
						// stop the ball movement
						if(_partParameter === '1'){
							// set coords right in the middle, lower a bit
							_body.setPosition({x:63, y:-70, z:100});
							// // rename sensor so that it will no bother the loop
							_targetObject.name = '';
							// set the register to keep the ball
							ROM.d_sprite.cabinet.rensho_1.body = _body;
							ROM.d_sprite.cabinet.rensho_1.body.isDynamic = false;
							ROM.d_sprite.cabinet.rensho_1.body.isKinematic = false;
							ROM.d_sprite.cabinet.rensho_1.accepts = false;
							// console.log(_i);
						} else {
							// set coords right in the middle, lower a bit
							_body.setPosition({x:-63, y:-70, z:100});
							// // rename sensor so that it will no bother the loop
							_targetObject.name = '';
							// set the register to keep the ball
							ROM.d_sprite.cabinet.rensho_2.body = _body;
							ROM.d_sprite.cabinet.rensho_2.body.isDynamic = false;
							ROM.d_sprite.cabinet.rensho_2.body.isKinematic = false;
							ROM.d_sprite.cabinet.rensho_2.accepts = false;
							// console.log(_i);
						}
						_body.type = 2;
						// if the both registers are true, release rewards (4 * 5 balls) = 20 pts and remove the ball
						if(ROM.d_sprite.cabinet.rensho_1.accepts === false && ROM.d_sprite.cabinet.rensho_2.accepts === false) {
							// reset rensho
							window.setTimeout( function () {
								// console.log(PCB.dsp_balls.bodies);
								// make them moveable objects
								ROM.d_sprite.cabinet.rensho_1.body.type = 1;
								ROM.d_sprite.cabinet.rensho_2.body.type = 1;
								ROM.d_sprite.cabinet.rensho_1.body.isDynamic = true;
								ROM.d_sprite.cabinet.rensho_2.body.isDynamic = true;
								// relocate the balls
								ROM.d_sprite.cabinet.rensho_1.body.setPosition({x:59, y:-85, z:280});
								ROM.d_sprite.cabinet.rensho_2.body.setPosition({x:-59, y:-85, z:280});
								// sound
								PCB.audio.play('ball_in_mech_2',1);
								// timer on timer
								window.setTimeout( function () {
									// award the player with 20 balls
									PCB.dsp_balls.addBallDispenseSchedule(4);
									// let them move
									ROM.d_sprite.cabinet.rensho_1.body.isKinematic = false;
									ROM.d_sprite.cabinet.rensho_2.body.isKinematic = false;
									// set rensho sensor states
									ROM.d_sprite.cabinet.rensho_1.accepts = true;
									ROM.d_sprite.cabinet.rensho_1.accepts = true;
									// enable rensho sensors
									RAM.d_sprite.bodies.rensho_hole_sensor_right.name = 'sensor';
									RAM.d_sprite.bodies.rensho_hole_sensor_left.name = 'sensor';
									// console.log(PCB.dsp_balls.bodies);
								},200);
							},1000);
							// console.log("rensho",ROM.d_sprite.cabinet.rensho_1.body,ROM.d_sprite.cabinet.rensho_2.body);
						}
						// _detectedInstance = _targetObject = null;
						continue;
						break;
					case 'needle':
						var _objectSpeed = (_body.prevPosition === null ) ? 2 : this.__findDistanceVector(_body.position,_body.prevPosition);
						if(_objectSpeed > 0.5){
							_body.prevPosition = JSON.parse(JSON.stringify(_body.position));
							var _collisionShock = (Math.abs(_body.linearVelocity.x) + Math.abs(_body.linearVelocity.y) + Math.abs(_body.linearVelocity.z));
							_collisionShock = (_collisionShock > 4 ) ? 1 : _collisionShock / 4;
							PCB.audio.play('needle',_collisionShock);
						}
						_detectedInstance = _targetObject = null;
						break;
					default:
						console.log("Unknown partModule");
						_detectedInstance = null;
						break;
				}
			}

			// no more collision detection
			// Without resetting the name of body, it will occasionally keep on matching when the ball is deleted
			_body.name = '';

			/**
			 * Update mesh according to the body location
			 */
			if(_body.sleeping !== true){
				_mesh = this.meshes[_i];
				_mesh.position.copy(_body.getPosition());
				_mesh.quaternion.copy(_body.getQuaternion());

				// reset position Or the ball can be destroyed (@todo)
				if(_mesh.position.y<-130){
					_x = -100 + Math.random()*300;
					_z = -100 + Math.random()*200;
					_y = 100 + Math.random()*1000;
					if(_bodies_num > 0) {
						// remove right after this loop
						_removeList.push(_i);
					} else {
						_body.resetPosition(_x,_y,_z);
					}
				}
			}
		} // end while loop

		if(_shootSensorVacant === true) {
			this.sensor_at_shooter = null;
		}

		if(_removeList.length > 0) {
			_i = 0;
			var _removeListLength = _removeList.length;
			this.sensor_at_shooter = null;
			while (_i < _removeListLength){
				var _removalTarget = _removeList[_i];
				// remove body
				if(this.bodies[_removalTarget]) {
					PCB.gpu.world.removeRigidBody(this.bodies[_removalTarget]);
					this.bodies.splice(_removalTarget,1);
				}
				// remove meshes
				if(this.meshes[_removalTarget]) {
					PCB.gpu.scene.remove(this.meshes[_removalTarget]);
					this.meshes.splice(_removalTarget,1);
				}
				// increment
				_i=(_i+1)|0;
			}
			// reindex
			this.bodies.filter(val => val);
			this.meshes.filter(val => val);
		}
	},
	wakeOimoPhysics: function () {
		var _i = this.bodies.length, _body;
		while (_i--){
			_body = this.bodies[_i];
			_body.sleeping = false;
		}
	},
	/**
	 * Private methods
	 */
	_ballMonitor: function () {
        PCB.dsp_balls.updateOimoPhysics();
        PCB.gpu.renderer.render( PCB.gpu.scene, PCB.gpu.camera );
        TWEEN.update();
        // requestAnimationFrame is simiar to setTimeout but the interval is decided by the browser.
        requestAnimationFrame( PCB.dsp_balls._ballMonitor);
	},
	/**
	 * Three.js - How can I calculate the distance between two 3D positions?
	 *
	 * @see        https://stackoverflow.com/questions/22845995/three-js-how-can-i-calculate-the-distance-between-two-3d-positions
	 *
	 * @param      {<type>}  v1      The v 1
	 * @param      {<type>}  v2      The v 2
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	__findDistanceVector: function ( v1, v2 ) {
		var dx = v1.x - v2.x;
		var dy = v1.y - v2.y;
		var dz = v1.z - v2.z;
		return Math.sqrt( dx * dx + dy * dy + dz * dz );
	}
}
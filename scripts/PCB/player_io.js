// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};


/**
 * Player I/O
 */
PCB.player_io = {
	/**
	 * Properties
	 */
	'clickOrTouch': '',
	'prevMouseX': null,
	'prevMouseY': null,
	/**
	 * Methods
	 */
	init: function () {
		this.clickOrTouch = (window.ontouchstart === undefined)? 'click' : 'touch';
		var _mousedown = (this.clickOrTouch === 'click') ? 'mousedown' : 'touchstart';

		// window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
		document.addEventListener('keydown', PCB.player_io.isKeyDown, false);
		document.addEventListener('keyup', PCB.player_io.isKeyUp, false);
		document.addEventListener( _mousedown, PCB.player_io.onMouseDown, false );
	},
	_addMouseActionEndEvents: function () {
		var _mouseup = (PCB.player_io.clickOrTouch === 'click') ? 'mouseup' : 'touchend';
		var _mouseleave = (PCB.player_io.clickOrTouch === 'click') ? 'mouseleave' : 'touchleave';
		var _mousemove = (PCB.player_io.clickOrTouch === 'click') ? 'mousemove' : 'touchmove';
		document.addEventListener( _mouseup, PCB.player_io.onMouseUp, false );
		document.addEventListener( _mouseleave, PCB.player_io.onMouseUp, false );
		document.addEventListener( _mousemove, PCB.player_io.onMouseMove, false );
	},
	_removeMouseActionEndEvents: function () {
		var _mouseup = (PCB.player_io.clickOrTouch === 'click') ? 'mouseup' : 'touchend';
		var _mouseleave = (PCB.player_io.clickOrTouch === 'click') ? 'mouseleave' : 'touchleave';
		var _mousemove = (PCB.player_io.clickOrTouch === 'click') ? 'mousemove' : 'touchmove';
		document.removeEventListener( _mouseup, PCB.player_io.onMouseUp, false );
		document.removeEventListener( _mouseleave, PCB.player_io.onMouseUp, false );
		document.removeEventListener( _mousemove, PCB.player_io.onMouseMove, false );
	},
	/**
	 * Determines if key down.
	 *
	 * @see        http://keycode.info/
	 *
	 * @param      {object}  event   The event
	 */
	isKeyDown: function(event) {
		switch(event.keyCode) {
			case 70: // F
				PCB.gpu.fullScreen();
				break;
			case 83: // S
				PCB.player_io.animatePressButton(RAM.d_sprite.meshes.start_button);
				ROM.d_sprite.buttons.dispenseBalls();
				break;
			case 80: // P
				PCB.player_io.animatePressButton(RAM.d_sprite.meshes.payout_button);
				ROM.d_sprite.buttons.exhangeBalls();
				break;
			case 84: // T
				PCB.init.toggleControlPanel();
				break;
			case 67: // c
				PCB.gpu.resetCameraControlPosition();
				break;
			case 32: // SPACE BAR
				ROM.d_sprite.plunger.pullPlunger();
				break;
		}
	},
	isKeyUp: function(event) {
		switch(event.keyCode) {
			case 32: // SPACE BAR
				ROM.d_sprite.plunger.shootBall();
				break;
		}
	},
	/**
	 * Get objects touching the mouse cursor
	 *
	 * @see        http://qiita.com/edo_m18/items/5aff5c5e4f421ddd97dc
	 *
	 * @param      {object}  e
	 */
	onMouseDown: function (e) {
		var _rect = e.target.getBoundingClientRect();

		// get the mouse position in the screen
		var _mouseX = e.clientX - _rect.left;
		var _mouseY = e.clientY - _rect.top;

		// convert to -1 ~ 1
		_mouseX =  (_mouseX/window.innerWidth)  * 2 - 1;
		_mouseY = -(_mouseY/window.innerHeight) * 2 + 1;

		// Vector of mouse position
		var _mousePosition = new THREE.Vector3(_mouseX, _mouseY, 1);

		// convert to coordinate of object
		_mousePosition.unproject(PCB.gpu.camera);

		// Make ray
		var _ray = new THREE.Raycaster(PCB.gpu.camera.position, _mousePosition.sub(PCB.gpu.camera.position).normalize());

		// Find any objects intersected.
		var _objects = _ray.intersectObjects(PCB.gpu.scene.children,true);

		if (_objects.length > 0) {
			// object length will be more than 0 if there are any objects intersected.
			switch(_objects[0].object.name) {
				case 'start_button':
					PCB.player_io.animatePressButton(RAM.d_sprite.meshes.start_button);
					ROM.d_sprite.buttons.dispenseBalls();
					break;
				case 'payout_button':
					PCB.player_io.animatePressButton(RAM.d_sprite.meshes.payout_button);
					ROM.d_sprite.buttons.exhangeBalls();
					break;
				case 'shoot_button':
					ROM.d_sprite.plunger.pullPlunger();
					break;
				default:
					// console.log(_objects[0].object);
					break;
			}
		}
		PCB.player_io._addMouseActionEndEvents();
	},
	onMouseMove: function (e) {
		e.preventDefault();
		var _rect = e.target.getBoundingClientRect();
		var _self = PCB.player_io;
		var _mouseX = e.clientX - _rect.left;
		var _mouseY = e.clientY - _rect.top;
		if(_self.prevMouseX !== null && _self.prevMouseY !== null) {
			// console.log(Math.abs(_mouseX-_self.prevMouseX),Math.abs(_mouseY-_self.prevMouseY));
			// X
			var _moveX = _mouseX-_self.prevMouseX;
			var _absMoveX = Math.abs(_moveX);
			var _strengthX = (_absMoveX > 20) ? 0.1 : _moveX / 80;
			// Y
			var _moveY = _mouseY-_self.prevMouseY;
			var _absMoveY = Math.abs(_moveY);
			var _strengthY = (_absMoveY > 20) ? 0.1 : _moveY / 80;
			// loop
			var _dsp_balls = PCB.dsp_balls;
			var _i = _dsp_balls.bodies.length;
			while (_i--) {
				_dsp_balls.bodies[_i].linearVelocity.x += _strengthX;
				_dsp_balls.bodies[_i].linearVelocity.y += _strengthY;
			}

		}
		_self.prevMouseX = _mouseX;
		_self.prevMouseY = _mouseY;
	},
	onMouseUp: function () {
		var _self = PCB.player_io;
		if(ROM.d_sprite.plunger.plunger_state !== null) {
			ROM.d_sprite.plunger.shootBall();
		}
		_self._removeMouseActionEndEvents();
		_self.prevMouseX = null;
		_self.prevMouseY = null;
	},
	animatePressButton: function ($buttonInstance) {
		$buttonInstance.position.z = 0;
		var _tween = new TWEEN.Tween($buttonInstance.position).to({z:-4},300).easing(TWEEN.Easing.Back.Out).start();
	}
}
// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};

var Register = {};

/**
 * Init
 */
PCB.init = {
	/** registers */
	'is_mobile': false,
	'gui': null,
	'gameObserver': null,
	/** DOM elements */
	'$creditCountsDisplay': null,
	'$closeButtonCreditDisplay': null,
	/** init */
	init: function () {
		// mobile detection
		var n = navigator.userAgent;
		if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i) || n.match(/Windows Phone/i)){
			this.is_mobile = true;
		}

		// init
		Register.initial_credits = 100;
		Register.replenishment_credits = 100;
		Register.replenishment_every = 600;
		Register.replenishment_max = 200;

		// init GUI
		this._setUpDatGUI();

		// DOM elements caching
		this.$creditCountsDisplay = $('span.property-name:contains("You have")').parent().find('div.c div.button');
		this.$closeButtonCreditDisplay = $('.close-button.close-bottom');

		// init Register
		Rom.nvram.init();
		// init PCBs
		// renderer and physics engine
		PCB.gpu.init();
		PCB.d_sprite.init();
		PCB.player_io.init();
		PCB.dsp_balls.init();

		/**
		 * Observer Event.
		 *
		 * Mainly used to keep track of replenishment
		 */
		this.gameObserver = window.setInterval(function(){
			var _message = '';
			var _unixTime = PCB.init.___unixTime();
			var _replenishmentTime = Register.replenishmentTime;
			var _replenishment_max = Number(Register.replenishment_max);

			if ( _unixTime > _replenishmentTime ) {
				Rom.nvram.updateReplenishment();
				PCB.init.updateCreditMessageDisplay();
			}

			if (Rom.nvram.specialReplenishmentMessageCounter > 0) {
				var _specialReplenishmentMessage = Rom.nvram.specialReplenishmentMessage;
				_message = _specialReplenishmentMessage;
				Rom.nvram.specialReplenishmentMessageCounter -= 1;
				PCB.init.updateCreditMessageDisplay(_message);
			} else if (Register.creditCount < _replenishment_max) {
				var _excessTime = Math.abs(_unixTime - _replenishmentTime);
				_message = 'Service Credits in ' + PCB.init.___convertUnixTimeToHMS(_excessTime);
				PCB.init.updateCreditMessageDisplay(_message);
			} else {
				PCB.init.updateCreditsCounter();
			}
		}, 1000);
	},
	_setUpDatGUI: function () {
		var _gui_container = document.getElementById("gui_container");
		var _dummy = new function() {
			this.gameName = function () {};
			this.gameCurrentCredits = function () {};
			this.gamePrice = function () {};
			this.gameInstruction = function () {};
			this.gameReplenishment = function () {};
			this.gameAbout = function () {};
		}
		this.gui = new dat.GUI({ autoPlace: false });
		this.gui.domElement.id = 'gui';
		_gui_container.appendChild(this.gui.domElement);
		// set default text.
		PCB.init.gui.constructor.TEXT_OPEN = '...';
		PCB.init.gui.constructor.TEXT_CLOSED = '... Close';
		// add menu items
		this.gui.add(_dummy, 'gameName').name('Smart Ball');
		this.gui.add(_dummy, 'gameCurrentCredits').name('You have');
		this.gui.add(_dummy, 'gamePrice').name('1 Play');
		this.gui.add(_dummy, 'gameReplenishment').name('Replenished every');
		// instruction card linked button
		// this.gui.add(_dummy, 'gamePrice').name('How to Play');

		// update the description
		var $_target = $('span.property-name:contains("Smart Ball")').parent();
		$_target.find('div.c div.button').text('(C) 2017 Befive');
		// Current credits
		$_target = $('span.property-name:contains("You have")').parent();
		$_target.find('div.c div.button').text('');
		// play rate
		$_target = $('span.property-name:contains("1 Play")').parent();
		$_target.find('div.c div.button').text('50 credits for 20 balls');
		// gameReplenishment
		$_target = $('span.property-name:contains("Replenished every")').parent();
		$_target.find('div.c div.button').text(Math.floor(Register.replenishment_every/60) + ' minutes');
		// instruction card
		// $_target = $('span.property-name:contains("How to Play")').parent();
		// $_target.find('div.c div.button').html('<a class="gui-link" data-remodal-target="modal">See Instruction Card</a>');

		// close on startup
		PCB.init.gui.close();

		// modal event
		$(document).on('confirmation', '.remodal', function () {
			// set url for the instruction card linked button
			window.open('', '_blank');
		});
	},
	updateCreditsCounter: function (amount) {
		if(amount) {
			Register.creditCount += amount;
			Rom.nvram.updateCredit(Register.creditCount);
		}
		if(amount && amount > 0) {
			Rom.nvram.specialReplenishmentMessageCounter = 3;
			Rom.nvram.specialReplenishmentMessage = amount + ' credits paid out.';
		} else {
			PCB.init.gui.constructor.TEXT_OPEN = Register.creditCount + ' credits';
			PCB.init.gui.constructor.TEXT_CLOSED = Register.creditCount + ' credits ... Close Info';
			var _label = (PCB.init.gui.closed === false) ? PCB.init.gui.constructor.TEXT_CLOSED : PCB.init.gui.constructor.TEXT_OPEN;
			this.updateCreditMessageDisplay(_label);
		}
	},
	updateCreditMessageDisplay: function (textString) {
		var _creditCountsDisplay_text = this.$creditCountsDisplay.text();
		if(_creditCountsDisplay_text != Register.creditCount+' credits') {
			this.$creditCountsDisplay.text(Register.creditCount+' credits');
		}
		var _closeButtonCreditDisplay_text = this.$closeButtonCreditDisplay.text();
		if(_closeButtonCreditDisplay_text != textString) {
			this.$closeButtonCreditDisplay.text(textString);
		}
	},
	toggleControlPanel: function() {
		if(PCB.init.gui.closed === false){
			PCB.init.gui.close();
		} else {
			PCB.init.gui.open();
		}
	},
	/**
	 * Returns unixtime
	 *
	 * @return     number  the current unixtime
	 */
	___unixTime: function () {
		return Math.round(+new Date()/1000);
	},
	/**
	 * Converts unix time into 0:00:00 format
	 *
	 * @param      number|string seconds The seconds
	 * @return     string Formatted time in string
	 */
	___convertUnixTimeToHMS: function (seconds) {
		var sec_num = parseInt(seconds, 10);
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return minutes+':'+seconds;
	}
}

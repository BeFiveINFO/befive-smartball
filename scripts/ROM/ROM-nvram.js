/*
	logic: nvram
*/
// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!Rom) var Rom = {};


/**
 * Has nvram routines
 *
 * @uses	Register of properties: user_id, creditCount, mute_sound, pending_current_credits
 * 			Register of configs:replenishment_every, replenishmentTime, replenishment_credits
 */
Rom.nvram = {
	/**
	 * Properties
	 */
	'specialReplenishmentMessageCounter': 0, // in second
	'specialReplenishmentMessage': '', // string
	/**
	 * Methods
	 */
	init: function() {
		/**
		 * Credit count
		 */
		 if(Register.free_play) {
			// set creditCount to zero if free play
			Register.creditCount = 0;
		} else {
			// read cookie and restore or init
			Register.creditCount = Number(PCB.nvramController.cookie_read('creditCount',Register.initial_credits,712));
			Register.replenishmentTime = PCB.nvramController.cookie_read('replenishmentTime',this.___unixTime() + Register.replenishment_every,712);
			this.updateReplenishment();
		}
		/**
		 * Settings
		 */
		 /* mute state */
		 PCB.audio.mute(this.readMuteState());

		 // User ID (if not found in cookie). Assigned only through remote server.
		 Register.user_id = PCB.nvramController.cookie_read('userID_SB','');

		 // update credit counter display
		 PCB.init.updateCreditsCounter();
	},
	/**
	 * Read the current mute state. Key is 'soundMuteState'
	 *
	 * Note: Register.mute_sound is string.
	 *
	 * @return      boolean Muted when True
	 */
	readMuteState: function() {
		var _soundMuteState = PCB.nvramController.cookie_read('soundMuteState',false);
		if(_soundMuteState === 'false' || !_soundMuteState) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * Updates the current mute state. Key is 'soundMuteState'
	 *
	 * @param      boolean Muted when True
	 */
	updateMuteState: function( _muteState ) {
		PCB.nvramController.cookie_write('soundMuteState',String(_muteState));
	},
	/**
	* Updates the current user id. Key is 'userID_SB'
	*
	* @param      string user id to be saved
	*/
	updateUserID: function( _userID ) {
		PCB.nvramController.cookie_write('userID_SB',String(_userID));
	},
	/**
	 * Saves the credit count. This method does not refresh the dynamic text in the screen.
	 * @param      {<type>}  _creditCount  The credit count
	 */
	updateCredit: function( _creditCount ) {
		PCB.nvramController.cookie_write('creditCount',_creditCount);
		PCB.nvramController.cookie_write('replenishmentTime',Register.replenishmentTime);
	},
	/**
	 * dynamic_text_game_replenishment
	 */
	updateReplenishment: function () {
		var _creditCount = Register.creditCount;
		/**
		 * current time in unix timestamp
		 */
		var _unixTime = this.___unixTime();
		// replenishment time
		var _replenishment_every = Register.replenishment_every;
		/**
		 * replenishmentTime
		 */
		var _replenishmentTime = Register.replenishmentTime;
		// remaining
		var _excessTime = Math.abs(_unixTime - _replenishmentTime);
		// maximum replenishment credit balance
		var _replenishment_max = Number(Register.replenishment_max);
		/**
		 * Calculate Replenishments while away
		 */
		 if(
		 	_creditCount < _replenishment_max &&
		 	_unixTime >= _replenishmentTime
		 ) {
		 	var _replenishment_credits = Number(Register.replenishment_credits);
		 	// calcurated
		 	var _excessRepemishmentUnits = Math.ceil( _excessTime / _replenishment_every );
		 	var _maxReplenishmentUnits = Math.ceil( _replenishment_every / _replenishment_max);
		 	var _awardedReplenishmentUnits = (_maxReplenishmentUnits < _excessRepemishmentUnits) ? _maxReplenishmentUnits : _excessRepemishmentUnits;

		 	if(_awardedReplenishmentUnits > 0) {
		 		// award credits _replenishment_max
		 		var _awardedCredits = Number(_replenishment_credits * _awardedReplenishmentUnits);
		 		if( Number(Register.creditCount) + _awardedCredits > _replenishment_max) {
		 			_awardedCredits = _replenishment_max - Number(Register.creditCount);
		 		}
		 		Register.pending_current_credits = Register.creditCount = Number(Register.creditCount) + _awardedCredits;
		 		PCB.nvramController.cookie_write('creditCount',Register.creditCount,712);
		 		Register.replenishmentTime = PCB.nvramController.cookie_write('replenishmentTime',_unixTime + _replenishment_every,712);
		 		this.specialReplenishmentMessageCounter = 3;
		 		this.specialReplenishmentMessage = _awardedCredits + ' credits awarded.';
		 	}
		 } else if (
		 	_creditCount >= _replenishment_max &&
		 	_unixTime > _replenishmentTime
		 ) {
			Register.replenishmentTime = PCB.nvramController.cookie_write('replenishmentTime',_unixTime + _replenishment_every,712);
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
};

/*
	logic: audio
	routines used for audio
*/
// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};

// print PCB

PCB.audio = {
	/**
	 * uses Register.audioInstances for holding each instance. You need to play once to register in there.
	 * also handles audio sprites (requires _marker to be set)
	 */
	play: function ( soundID, soundVolume, duration) {
		soundVolume = soundVolume || 1;
		duration = duration || null;
		var _instance = createjs.Sound.createInstance(soundID,null,duration);
		_instance.setVolume(soundVolume);
		_instance.play();
	},
	stop: function ( soundID ) {
		if(!soundID ) {
			// soundID is not specified. stop all at once
			createjs.Sound.stop();
		} else {
			createjs.Sound.stop(soundID);
		}
	},
	/*
	 * fades out works for just one sound instance. global fade out if sound id is not valid
	 * duration in millisecond, set _volume value between 0 and 1.
	 * fades out in 1 second if _duration, _volume are omitted.
	 */
	fadeTo: function ( soundID , _duration, _volume) {
	},
	/*
	 * Pause / resume. Played when it is not either paused or played. loop mode by default
	 * Note: Phase does not really seem to support audio sprite (looped) well.
	 */
	pause: function ( soundID , _marker, _isLooped , _volume ) {
	},
	/**
	 * mute globally
	 *
	 * @params boolean _mute_sound. Toggle the current state if omitted.
	 */
	mute: function ( _mute_sound ) {
	}
};
// Make ROM if it does not exist yet (to deal with load order issue here).
if(!ROM) var ROM = {};

// burn ROM
if(!ROM.sound) ROM.sound = {};

/**
 * Called from ROM.boot.init()
 */
ROM.sound = {
	enqueue: function () {
		/* wav is used. because this sound effect is really important for the shooting pleasure and sensation. */
		createjs.Sound.registerSound("sound/shoot_ball.wav", "shoot_ball");
		createjs.Sound.registerSound("sound/needle.mp3", "needle");
		createjs.Sound.registerSound("sound/ball_dispensed_1.mp3", "ball_dispensed_1");
		createjs.Sound.registerSound("sound/ball_dispensed_2.mp3", "ball_dispensed_2");
		createjs.Sound.registerSound("sound/ball_in_mech_1.mp3", "ball_in_mech_1");
		createjs.Sound.registerSound("sound/ball_in_mech_2.mp3", "ball_in_mech_2");
	}
}
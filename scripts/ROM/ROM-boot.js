// Make ROM if it does not exist yet (to deal with load order issue here).
if(!ROM) var ROM = {};

// burn ROM
if(!ROM.boot) ROM.boot = {};

ROM.boot = {
	'textures': {
		'flipHole_head': 'images/flipHole_head.png',
		'flipHole_tail': 'images/flipHole_tail.png',
		/*
		set path to skybox image to useskybox.
		'skybox': 'images/',
		*/
	},
	'models': {
		'five': 'models/5.json',
		'fifteen': 'models/15.json',
		'twenty': 'models/20.json',
		'logo': 'models/logo.json',
		'rensho': 'models/rensho.json',
		'smartball': 'models/smartball.json',
		'start': 'models/start.json',
		'payout': 'models/payout.json',
	},
	placeObjects: function () {
		ROM.d_sprite.cabinet.add();
		ROM.d_sprite.plunger.add();
		ROM.d_sprite.layout.add();
		ROM.d_sprite.buttons.add();
	}
}


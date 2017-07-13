/*
	logic: event
	global events manager
*/

// Make rame
if(!RAM) var RAM = {};

// Make Ram for event
RAM.events = {};

// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};

// print PCB
PCB.event = {
	trigger: function( _eventName, _context ) {
		if(RAM.events.hasOwnProperty(_eventName)) {
			RAM.events[_eventName](_context);
		} else {
			return false;
		};
	},
	add: function( _eventName , _eventFunction ) {
		if(_eventFunction !== undefined && typeof _eventFunction === 'function') {
			if(RAM.events.hasOwnProperty(_eventName)) {
				delete RAM.events[_eventName];
			};
			RAM.events[_eventName] = _eventFunction;
		} else {
			return false;
		};
	},
	remove: function( _eventName ) {
		if( RAM.events.hasOwnProperty(_eventName)) {
			delete RAM.events[_eventName];
		} else {
			return false;
		};
	},
	removeAll: function() {
		RAM.events = {};
	},
};
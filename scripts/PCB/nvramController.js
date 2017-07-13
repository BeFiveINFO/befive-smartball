/*
	logic: nvramController (cookie manager)
*/
// Make Printed circuit board if it does not exist yet (to deal with load order issue here).
if(!PCB) var PCB = {};

// print PCB
PCB.nvramController = {
	/**
	 * Read cookie value. If it does not exist, create one automatically.
	 *
	 * @param      {string}  name            The name
	 * @param      {<type>}  defaultValue    The default value
	 * @param      {<type>}  expirationDays  The expiration days
	 * @return     {string}  { description_of_the_return_value }
	 */
	cookie_read: function (name, defaultValue, expirationDays) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		this.cookie_write(name, defaultValue, expirationDays);
		return defaultValue;
	},
	cookie_write: function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";

		return value;
	},
	cookie_erase: function (name) {
		this.cookie_write(name,"",-1);
	}
};
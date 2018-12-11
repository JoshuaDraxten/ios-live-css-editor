/**
 * Live CSS Editor Based on http://barberboy.github.com/css-terminal/
 */
let terminal = document.getElementById('css-terminal');
if (terminal) {
  terminal.focus();
} else {

	const cookieValue = (requested = 'css-terminal', defaultValue = '/** Add CSS rules here */\n') => {
	  document.cookie.split(';').forEach( cookie => {
	    c = cookie.split('=');
	    if (c[0].replace(/^\s+/, "") === requested) {
	    	return unescape(c[1]);
	    };
		});
		return defaultValue
	};
	
	const newElement = (tagname, properties) => {
	  el = document.createElement(tagname);
	  Object.keys( properties ).forEach( name => el[name] = properties[name] );
	  return el;
	}
	
	const key = {enter: 13, escape: 27, semicolon: 59}
	
	const head = document.getElementsByTagName('head')[0];
	const body = document.getElementsByTagName('body')[0];
	
	previousStyles = cookieValue();
	
	terminal = newElement( 'textarea', {
	  id : 'css-terminal',
	  value : previousStyles,
	  autocorrect : 'off',
	  autocapitalize : 'off',
	  style: "font-family: monospace;position: fixed;z-index: 10000;border: 0;background-color: rgba(0, 0, 0, .75);border: 2px solid rgba(0, 0, 0, .1);color: white;padding: 0;width: 500px;height: 300px;overflow: auto;"
	});
	body.appendChild(terminal);
	
	const output = newElement('style', {
	  id : 'css-terminal-output',
	  innerHTML : previousStyles
	});
	body.appendChild(output);
	
	const interceptKey = ( key, replaceWith, ev ) => {
		console.log( ev.key );
		if ( ev.key === key ) {
	  	ev.preventDefault();
	  	var start = this.selectionStart;
	    var end = this.selectionEnd;
	    console.log( start, end );
			console.log(
				"---",
				terminal.value.substring(0, start),
				replaceWith,
				terminal.value.substring(end),
				"---"
			);
	    terminal.value =
	    						terminal.value.substring(0, start)
	                + replaceWith
	                + terminal.value.substring(end);
	    this.selectionStart = "";
	    this.selectionEnd = start + replaceWith.length;
	  }
	}
	
	terminal.addEventListener('keydown', function( ev ){
		interceptKey("Tab", "  ", ev);
		interceptKey("\"", "\"", ev);
	})
	
	terminal.addEventListener('keyup', function(ev){
	  ev.stopPropagation();
	  const css = this.value;
	  const oneYearFromNow = new Date(+new Date()+31536E6).toGMTString();
	  output.innerHTML = css;
	  document.cookie = `css-terminal=${escape(css)}; expires=${oneYearFromNow}; path=/`;
	});
	
	terminal.focus();
}
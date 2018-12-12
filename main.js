const newElement = (tagname, properties) => {
  el = document.createElement(tagname);
  Object.keys( properties ).forEach( name => el[name] = properties[name] );
  return el;
}

let terminal = document.getElementById('css-terminal');
if (terminal) {
  terminal.focus();
} else {
	const head = document.getElementsByTagName('head')[0];
	const body = document.getElementsByTagName('body')[0];
	
	requiredStyles = newElement("style", {});
	requiredStyles.innerHTML = 
		`.css-editor {position: fixed; z-index: 10000; width: 400px; height: 300px; border-radius: 4px; overflow: auto;}
		 .css-editor textarea { font-family: monospace;border: 0;background-color: rgba(0, 0, 0, .75);border: 2px solid rgba(0, 0, 0, .1);color: white;padding: 0;overflow: auto; width: 100%; height: 100%; font-size: 16px; }
		 .css-editor input[type="button"] { margin-top: -28px; width: 25%; background: #eeeeee; border-radius: 0; border: none; line-height: 28px;-webkit-appearance: none; font-size: 16px;}`;
	head.appendChild(requiredStyles);
	
	const cssEditor = newElement( 'div', {
		className: 'css-editor',
		style: 'display: block !important; left: 16px;top: 16px;'
	});
	const left = newElement( 'input', { type: "button", value: "LEFT" });
	left.onclick = () => {
		cssEditor.style.left = '20px';
		cssEditor.style.right = 'initial';
	}
	const up = newElement( 'input', { type: "button", value: "UP" });
	up.onclick = () => {
		cssEditor.style.top = '20px';
		cssEditor.style.bottom = 'initial';
	}
	const down = newElement( 'input', { type: "button", value: "DOWN" });
	down.onclick = () => {
		cssEditor.style.top = 'initial';
		cssEditor.style.bottom = '80px';
	}
	const right = newElement( 'input', { type: "button", value: "RIGHT" });
	right.onclick = () => {
		cssEditor.style.left = 'initial';
		cssEditor.style.right = '20px';
	}
	const terminal = newElement( 'textarea', {
	  id : 'css-terminal',
	  value : '/** Add CSS rules here */\n',
	  autocorrect : 'off',
	  autocapitalize : 'off',
	  style: "display: block !important;"
	});
	cssEditor.appendChild(terminal);
	cssEditor.appendChild(left);
	cssEditor.appendChild(up);
	cssEditor.appendChild(down);
	cssEditor.appendChild(right);
	body.appendChild(cssEditor);
	
	const output = newElement('style', {
	  id : 'css-terminal-output',
	  innerHTML : ''
	});
	body.appendChild(output);
	
	const interceptKey = ( key, replaceWith, ev ) => {
		if ( ev.key === key ) {
	  	ev.preventDefault();
	  	var start = terminal.selectionStart;
	    var end = terminal.selectionEnd;
	    terminal.value =
	    						terminal.value.substring(0, start)
	                + replaceWith
	                + terminal.value.substring(end);
	    terminal.selectionStart = start + replaceWith.length;
	    terminal.selectionEnd = terminal.selectionStart;
	  }
	}
	
	terminal.addEventListener('keydown', function( ev ){
		interceptKey("Tab", "  ", ev);
		// Bypass the curly quotes
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
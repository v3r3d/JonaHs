(function($, undefined) {
    $.format = function(format) {
        if (format === undefined)
            return null;
        var continu = true;
        var form = /%[cdieEfgGosuxX%]/g;
        var res = null
        while ((res = form.exec(str)) != null) {
            return;
        };
    }

    String.prototype.format = function(format) {
        $.format(format, this);
    }

    $.fn.dimensions = function(dimension, value) {
        if (typeof dimension == 'object') {//dimension = {'width': w, 'height': h}
            this.width(dimension.width);
            this.height(dimension.height);
            return this;
        }
        else if (typeof dimension == 'number') {//dimension = n
            this.width(dimension);
            this.height(dimension);
            return this;
        }
        else if (typeof dimension == 'string') {
            if (dimension == 'width')
                return this.width(value);
            else if (dimension == 'height')
                return this.height(value);
        }
        else return {
            width: this.width(),
            height: this.height(),
        };
    },
    $.fn.carret = function(pos) {//   !!!!!!!!!! DEPRECATED !!!!!!!!!!
        if (pos === undefined) {// Get carret position
            return { start: this.selectionStart(), end: this.selectionEnd() };
        }
        else // Set carret position
            if (typeof pos == 'number')// set cursor position, without selection
                this.selectionStart(pos).selectionEnd(pos);
            else if (typeof pos == 'object' && pos.start !== undefined && pos.end !== undefined)
                this.selectionStart(pos.start).selectionEnd(pos.end);
            return this;
    };

    $.fn.selection = function(selection) {
        if (selection === undefined) {// Get selection
            return { start: this.selectionStart(), end: this.selectionEnd() };
        }
        else // Set selection
            if (typeof selection == 'number')// set collapsed selection
                this.selectionStart(selection).selectionEnd(selection);
            else if (typeof selection == 'object' && selection.start !== undefined && selection.end !== undefined)
                this.selectionStart(selection.start).selectionEnd(selection.end);
            return this;
    };

    $.fn.selectionStart = function(pos) {
        var node = this.get(0);
        var sel = document.getSelection();
        if (pos === undefined){// Get selection start
            if (typeof node.selectionStart != 'undefined')
                return node.selectionStart;
            else if (sel)
                return document.getSelection().anchorOffset;
            else if (document.selection)
            {
                var r = document.selection.createRange(); 
                if (r == null) { 
                  return 0; 
                } 

                r.focus();
                r.moveStart('character', -this.val().length);
                return r.text.length;

                // -- Deprecated
                var tr = node.createTextRange();
                var tr_bis = tr.duplicate();
                tr.moveToBookmark(r.getBookmark());
                tr_bis.setEndPoint('EndToStart', tr);
                return tr_bis.text.length;
                // --
            }
            else
                return -1;
        }
        else {// Set selection start
            if (node.selectionStart != 'undefined')
                node.selectionStart = pos;
            else if (document.selection) {
                var r = node.createTextRange();
                if (r == null)
                  return -1;
                else {
                    r.focus();
                    r.moveStart('character', pos - this.val().length);
                }
            }
            return this;
        }
    };

    $.fn.selectionEnd = function(pos) {
        var node = this.get(0);
        var sel = document.getSelection();
        if (pos === undefined){// Get selection end
            if (typeof node.selectionEnd != 'undefined')
                return node.selectionEnd;
            else if (sel)
                return document.getSelection().focusOffset;
            else if (document.selection) {
                var r = node.createRange();
                if (r == null)
                  return -1;
                else
                    return r.text.length;
            }
            else
                return -1;
        }
        else {// Set selection end
            if (node.selectionEnd != 'undefined')
                node.selectionEnd = pos;
            else if (document.selection) {
                var r = node.createTextRange();
                if (r == null)
                  return -1;
                else {
                    r.focus();
                    r.moveStart('character', -this.val().length);
                    r.moveEnd('character', pos);
                }
            }
            return this;
        }
    };

	// Insert this in a certain position of the childnodes list of node
	$.fn.insertTo = function(node, index) {
		node.insert(this, index);
		return this;
	}
    
  String.prototype.pad = function(len, pad) {
      var p = "";
      var _pad = pad || '0';
      for (var i = this.length; i < len; i++) {
          p += _pad;
      }
      return p + this;
  }

  var STRING_TRIM_LEFT = 0,
      STRING_TRIM_RIGHT = 1,
      STRING_TRIM_BOTH = 2;
  String.prototype.trim = function(c, side) {
      c = (typeof c == 'undefined') ? ' ' : c;
      side = (typeof side == 'undefined') ? STRING_TRIM_BOTH : side;
      var str = this.valueOf();
      if ((side == STRING_TRIM_LEFT) || (side == STRING_TRIM_BOTH))
          str = str.replace(eval('/^' + c + '+/'), '');
      if ((side == STRING_TRIM_RIGHT) || (side == STRING_TRIM_BOTH))
          str = str.replace(eval('/' + c + '+$/'), '');
      return str;
  }
//	var keycode = $.ui.keyCode;
/*     console.log("'" + '    ttt    '+"'");
    console.log("'" + '    ttt    '.trim()+"'");
    console.log("'" + '    ttt    '.trim('t')+"'");
    console.log("'" + '    ttt    '.trim(' ', STRING_TRIM_LEFT)+"'");
    console.log("'" + '    ttt    '.trim(' ', STRING_TRIM_RIGHT)+"'");
    console.log("'" + '    ttt    '.trim(' ', STRING_TRIM_BOTH)+"'");
 */
 
  $.fn.tagName = function() {
    return ((this.get(0).tagName.toLowerCase() == "input")
          ? (this.get(0).tagName.toLowerCase() + ":" + this.get(0).type.toLowerCase())
          : this.get(0).tagName.toLowerCase());
  }
  
  String.prototype.toCamelCase = function(type) {//Type is "upper" or "lower"
    var str = this.split(/[ \-_.:]/);
    var CCStr = ((type == "lower") ? str[0].charAt(0).toUpperCase() + str[0].slice(1) : str[0]);
    for (var i = 1; i < str.length; i++)
      CCStr += str[i].charAt(0).toUpperCase() + str[i].slice(1);
    return CCStr;
  }
})(jQuery);
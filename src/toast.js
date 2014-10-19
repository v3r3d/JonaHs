/*

"div#.[]{}": {
  _ctor: function() {
  }
  "$h1": {
    id: "",
    class: "",
  }
}

*/
(function($, undefined) {
//  const reNAME = "[a-zA-Z](?:[a-zA-Z0-9-_])*";//TODO: handle special chars in names when backslashed
  const reSPECIALS = "#\\.\\[\\]\\{\\}\\$"
  const reNAME = "(?:\\\\["+reSPECIALS+"]|[^"+reSPECIALS+"])+";//TODO: handle special chars in names when backslashed
  const reINPUT = "^input:([a-zA-Z]+)";
  const reTYPE = "^([a-zA-Z0-9]*)";
  const reID = "#("+reNAME+")[^#]*$";
  const reCLASS = "\\.("+reNAME+")";
  const reREF = "\\$("+reNAME+")(?:[^$]*)$";
  const reATTRS = "\\[([^\\]]*)\\]";
  const reATTR = "("+reNAME+")=([^;]*);?";
  const reSTYLES = "\\{([^\\}]*)\\}";
  const reSTYLE = "("+reNAME+"):([^;]*);?";

  const ROOT = 'html';
  const LOG = 0;


  var getType = function(elt) {
    var reInput = new RegExp(reINPUT);
    var reType = new RegExp(reTYPE);
    var matchInput = reInput.exec(elt);
    var type = "";

    if (matchInput != null)
        type = "input:"+matchInput[1].replace('default', 'text');//$("<input type='"++"'>");
    else
    {
      var matchType = reType.exec(elt);
 
      if (matchType != null)
          type = matchType[1] != "" ? matchType[1] : "div";//$("<"+(matchType[1] != "" ? matchType[1] : "div")+">");

    }
    return type;
  };
  
  var newElement = function(elt) {
    var node = null;
    var type = getType(elt).split(":");//split is for subtypes

    if (type[0] == "")
      console.log("invalid type name");
    else
      node = document.createElement(type[0]);

    if (type[0] == "input")
      if (type[1] == "")
        console.log("invalid input type");
      else
        node.type = type[1] || "text";

      if (LOG)
        console.log("  Type: " + ((node.tagName.toLowerCase() == "input") ? (node.tagName.toLowerCase() + ":" + node.type.toLowerCase()) : node.tagName.toLowerCase()));

    return node;
  }
  
  var setId = function(node, elt) {
    var reId = new RegExp(reID, "g");// Find the last id
    console.log(reId);
    var matchId = reId.exec(elt);
    if (matchId != null) {
      if (LOG) console.log("  Id : " + matchId[1]);
      node.id = matchId[1];
    }
    return node.id != "";
  }
  
  var setClasses = function(node, elt) {
    var reClass = new RegExp(reCLASS, "g");
    while (null != (matchClass = reClass.exec(elt))) {
      if (LOG) console.log("  Class : " + matchClass[1]);
      node.className = matchClass[1] + " " + node.className;
    }
    node.className = node.className.slice(0, -1);
    return node.className != "";
  }
  
  var setAttributes = function(node, elt) {
    var reAttributes = new RegExp(reATTRS, "g");
    var reAttribute = new RegExp(reATTR, "g");
    var matched = false;
    while (null != (matchAttrs = reAttributes.exec(elt))) {
      while (null != (matchAttr = reAttribute.exec(matchAttrs[1]))) {
        if (LOG) console.log("  Attribute : " + matchAttr[1] + " = " + matchAttr[2]);
        node[matchAttr[1]] = matchAttr[2];
        matched = true;
      }
    }
    return matched;
  }
  
  var setStyle = function(node, elt) {
    var reStyles = new RegExp(reSTYLES, "g");
    var reStyle = new RegExp(reSTYLE, "g");
    while (null != (matchStyles = reStyles.exec(elt))) {
      while (null != (matchStyle = reStyle.exec(matchStyles[1]))) {
        var style = matchStyle[1].split('-');
        var jsStyle = style[0];
        for (var i = 1; i < style.length; i++)
          jsStyle += style[i].charAt(0).toUpperCase() + style[i].slice(1);
        if (LOG) console.log("  Style : " + jsStyle + " = " + matchStyle[2]);
        node.style[jsStyle] = matchStyle[2];
      }
    }
    return node.style.length > 0;
  }

  var setRef = function(node, elt, o) {
    var reRef = new RegExp(reREF, "g");// Find the last ref name
    var matchRef = reRef.exec(elt);
    if (matchRef != null) {
      if (LOG) console.log("  Reference : " + matchRef[1]);
      node.reference = matchRef[1];
      o["$" + node.reference] = node;
    }
    return (node.reference != null) && (node.reference != "");
  }

  var buildElement = function(elt, ctn, parent) {
    var node = null;
    var matched = false;

    if (typeof(ctn) == 'function')
      ctn = ctn.call(o);

    if (LOG) console.log("Node : " +elt);

    switch (elt) {
      case "id":
        parent.id = ctn + "";
        break;
      case "class":
      case "classes":
        parent.className = ctn + "";
        break;
      case "attribute":
      case "attributes":
      case "attr":
      case "attrs":
        for (var attr in ctn)
          parent[attr] = ctn[attr];
        break;
      case "style":
      case "styles":
      case "css":
        for (var style in ctn) {
          var stl = style.split('-');
          var jsStyle = stl[0];
          for (var i = 1; i < stl.length; i++)
            jsStyle += stl[i].charAt(0).toUpperCase() + stl[i].slice(1);
          parent.style[jsStyle] = ctn[style];
        }
        break;
      default:
        var node = newElement(elt);
        if (node == null)
          return;

        matched = setId(node, elt);
        matched = setClasses(node, elt) || matched;
        matched = setAttributes(node, elt) || matched;
        matched = setStyle(node, elt) || matched;

        if (matched)
          $.each(ctn, function(e, c) {
            buildElement(e, c, node);
          });
        else
          console.log("invalid entry: " + elt);

        parent.appendChild(node);
        break;
    }
    return parent;
  };

  $.toast = function(elt, parent) {
    if (parent == null)
      parent = newElement("div");

    $.each(elt, function(e, c) {
      buildElement(e, c, parent);
    });
    
    return $(parent);
  };
}(window.jQuery));
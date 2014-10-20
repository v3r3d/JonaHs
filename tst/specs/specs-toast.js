(function($) {
  describe("Toast", function() {
    var toast = null;

    afterEach(function() {
      toast.remove();
    });

    it("detects and returns errors", function() {
      var html = {
            "#": {},
            "##": {},
            "######": {},
            "#.": {},
            "#[": {},
            "#]": {},
            "#{": {},
            "#}": {},
      };
      toast = $.toast(html).appendTo('body');

      //"h2#star#*": {}
      expect(toast).toBeNull();
      expect("errors").toBe("detected and returned");
    });

    it("sets the last id found to the node", function() {
      var html = {
        "#test": {},
        "#test#id1": {},
        "div#test#id2": {},
        "h1#test#id3#id3": {},
        "h1#test.class#id4": {},
        "h1#test.class[foo=bar]#id4": {},
        "h1#test#id4.class": {},
        "h1#test#id4[foo=bar]": {},
      };
      toast = $.toast(html).appendTo('body');

      //"#test": {}
      expect(document.getElementById("test")).not.toBeNull();
      expect(document.getElementById("test").tagName).toEqual("DIV");
      //"#test1#id1": {}
      expect(document.getElementById("id1")).not.toBeNull();
      expect(document.getElementById("id1").tagName).toEqual("DIV");
      //"div#test2#id2": {}
      expect(document.getElementById("id2")).not.toBeNull();
      expect(document.getElementById("id2").tagName).toEqual("DIV");
      //"h1#test3#d3#test3": {}
      expect(document.getElementById("test3")).not.toBeNull();
      expect(document.getElementById("test3").tagName).toEqual("H1");
    });
    
    it("accepts any special chars in names if backslashed", function() {
      var html = {
        "div#\\#foo": {},
        "div#\\:foo": {},
        "div#\\.foo": {},
        "div#\\[foo": {},
        "div#\\]foo": {},
        "div#\\{foo": {},
        "div#\\}foo": {},
        "div#id\\#foo": {},
        "div#id\\:foo": {},
        "div#id\\.foo": {},
        "div#id\\[foo": {},
        "div#id\\]foo": {},
        "div#id\\{foo": {},
        "div#id\\}foo": {},
      };
      toast = $.toast(html).appendTo('body');

      // "div#\\#foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#\\:foo": {},
      expect(document.getElementById(":foo")).not.toBeNull();
      expect(document.getElementById(":foo").tagName).toEqual("DIV");
      // "div#\\.foo": {},
      expect(document.getElementById(".foo")).not.toBeNull();
      expect(document.getElementById(".foo").tagName).toEqual("DIV");
      // "div#\\[foo": {},
      expect(document.getElementById("[foo")).not.toBeNull();
      expect(document.getElementById("[foo").tagName).toEqual("DIV");
      // "div#\\]foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#\\{foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#\\}foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#id\\#foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#id\\:foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#id\\.foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#id\\[foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#id\\]foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#id\\{foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
      // "div#id\\}foo": {},
      expect(document.getElementById("#foo")).not.toBeNull();
      expect(document.getElementById("#foo").tagName).toEqual("DIV");
    });
    
    it("add classes defined", function() {
      var html = {
        div: {},
        "#test": {},
        "#test-t.t": {},
        "#test-advanced.t-34545er": {},
        ".t": {},
        "#test-ab.a.b#re-ab": {},
        "div#divtest-ab.a#divre-ab.b": {},
        "h1#test-h1.a.b#re-h1": {},
        "#*.star": {},
      }
      toast = $.toast(html).appendTo('body');

      //div: {}
      //"#test": {}
      expect(document.getElementById("test")).not.toBeNull();
      expect(document.getElementById("test").className).toEqual("");
      //"#test-t.t": {}
      expect(document.getElementById("test-t")).not.toBeNull();
      expect(document.getElementById("test-t").className).toEqual("t");
      //"#test-advanced.t-34545er": {}
      expect(document.getElementById("test-advanced")).not.toBeNull();
      expect(document.getElementById("test-advanced").className).toEqual("t-34545er");
      //".t": {}
      expect($(".t").get(0)).not.toBeNull();
      expect($(".t").get(0).className).toEqual("t");
      //"#test-ab.a.b#re-ab": {}
      expect(document.getElementById("test-ab")).toBeNull();
      expect(document.getElementById("re-ab")).not.toBeNull();
      expect(document.getElementById("re-ab").className).toEqual("b a");
      //"div#divtest-ab.a#divre-ab.b": {}
      expect(document.getElementById("divtest-ab")).toBeNull();
      expect(document.getElementById("divre-ab")).not.toBeNull();
      expect(document.getElementById("divre-ab").tagName).toEqual("DIV");
      expect(document.getElementById("divre-ab").className).toEqual("b a");
      //"h1#test-h1.a.b#re-h1": {}
      expect(document.getElementById("test-h1")).toBeNull();
      expect(document.getElementById("re-h1")).not.toBeNull();
      expect(document.getElementById("re-h1").tagName).toEqual("H1");
      expect(document.getElementById("re-h1").className).toEqual("b a");
      //"#*.star": {}
      expect(document.getElementById("*")).toBeNull();
      expect($(".star").get(0)).not.toBeNull();
      expect($(".star").get(0).id).toEqual("");
    });

    it("creates a default div element if no type is given", function() {
      var html = {
        "#test": {}
      }
      toast = $.toast(html).appendTo('body');

      //"#test": {}
      expect($("#test").get(0)).not.toBeNull();
      expect($("#test").tagName()).toBe("div");
    });

    it("creates a element of the given type", function() {
      var html = {
        //http://www.w3.org/TR/html5/sections.html
        "h1#h1-test": {},
        "h2#h2-test": {},
        "h3#h3-test": {},
        "h4#h4-test": {},
        "h5#h5-test": {},
        "h6#h6-test": {},
        //http://www.w3.org/TR/html5/grouping-content.html
        "p#p-test": {},
        "hr#hr-test": {},
        "pre#pre-test": {},
        "blockquote#blockquote-test": {},
        "ol#ol-test": {},
        "ul#ul-test": {},
        "li#li-test": {},
        "dl#dl-test": {},
        "dt#dt-test": {},
        "dd#dd-test": {},
        "figure#figure-test": {},
        "figcaption#figcaption-test": {},
        "div#div-test": {},
        "main#main-test": {},
        //http://www.w3.org/TR/html5/text-level-semantics.html
        "a#a-test": {},//Hyperlinks
        "em#em-test": {},//Stress emphasis
        "strong#strong-test": {},//Importance
        "small#small-test": {},//Side comments
        "s#s-test": {},//Inaccurate text
        "cite#cite-test": {},//Titles of works
        "q#q-test": {},//Quotations
        "dfn#dfn-test": {},//Defining instance
        "abbr#abbr-test": {},//Abbreviations
        "data#data-test": {},//Machine-readable equivalent
        "time#time-test": {},//Machine-readable equivalent of date- or time-related data
        "code#code-test": {},//Computer code
        "var#var-test": {},//Variables
        "samp#samp-test": {},//Computer output
        "kbd#kbd-test": {},//User input
        "sub#sub-test": {},//Subscripts
        "sup#sup-test": {},//Superscripts
        "i#i-test": {},//Alternative voice
        "b#b-test": {},//Keywords
        "u#u-test": {},//Annotations
        "mark#mark-test": {},//Highlight
        "ruby#ruby-test": {},//Ruby annotations
        "rt#rt-test": {},//Ruby annotations
        "rp#rp-test": {},//Ruby annotations
        "bdi#bdi-test": {},//Text directionality isolation
        "bdo#bdo-test": {},//Text directionality formatting
        "span#span-test": {},//Other
        "br#br-test": {},//Line break
        "wbr#wbr-test": {},//Line breaking opportunity
        //http://www.w3.org/TR/html5/edits.html
        "ins#ins-test": {},
        "del#del-test": {},
        //http://www.w3.org/TR/html5/embedded-content-0.html
        "img#img-test": {},
        "iframe#iframe-test": {},
        "embed#embed-test": {},
        "object#object-test": {},
        "param#param-test": {},
        "video#video-test": {},
        "audio#audio-test": {},
        "source#source-test": {},
        "track#track-test": {},
        "canvas#canvas-test": {},
        "map#map-test": {},
        "area#area-test": {},
        "math#math-test": {},
        "svg#svg-test": {},
        //http://www.w3.org/TR/html5/tabular-data.html
        "table#table-test": {},
        "caption#caption-test": {},
        "colgroup#colgroup-test": {},
        "col#col-test": {},
        "tbody#tbody-test": {},
        "thead#thead-test": {},
        "tfoot#tfoot-test": {},
        "tr#tr-test": {},
        "td#td-test": {},
        "th#th-test": {},
        //http://www.w3.org/TR/html5/forms.html
        "form#form-test": {},
        "fieldset#fieldset-test": {},
        "legend#legend-test": {},
        "label#label-test": {},
        "input:default#input-default-test": {},//Default is text input
        "input:hidden#input-hidden-test": {},//Hidden
        "input:text#input-text-test": {},//Text
        //Unsupported by jQuery "input:search#input-search-test": {},//Search
        //Unsupported by jQuery "input:tel#input-tel-test": {},//Telephone
        //Unsupported by jQuery "input:url#input-url-test": {},//URL
        //Unsupported by jQuery "input:email#input-email-test": {},//E-mail
        "input:password#input-password-test": {},//Password
        //Unsupported by jQuery "input:datetime#input-datetime-test": {},//Date and Time
        //Unsupported by jQuery "input:date#input-date-test": {},//Date
        //Unsupported by jQuery "input:month#input-month-test": {},//Month
        //Unsupported by jQuery "input:week#input-week-test": {},//Week
        //Unsupported by jQuery "input:time#input-time-test": {},//Time
        //Unsupported by jQuery "input:datetime-local#input-datetime-local-test": {},//Local Date and Time
        //Unsupported by jQuery "input:number#input-number-test": {},//Number
        //Unsupported by jQuery "input:range#input-range-test": {},//Range
        //Unsupported by jQuery "input:color#input-color-test": {},//Color
        "input:checkbox#input-checkbox-test": {},//Checkbox
        "input:radio#input-radio-test": {},//Radio Button
        "input:file#input-file-test": {},//File Upload
        "input:submit#input-submit-test": {},//Submit Button
        "input:image#input-image-test": {},//Image Button
        "input:reset#input-reset-test": {},//Reset Button
        "input:button#input-button-test": {},//Button
        "button#button-test": {},
        "select#select-test": {},
        "datalist#datalist-test": {},
        "optgroup#optgroup-test": {},
        "option#option-test": {},
        "textarea#textarea-test": {},
        "keygen#keygen-test": {},
        "output#output-test": {},
        "progress#progress-test": {},
        //http://www.w3.org/TR/html5/interactive-elements.html
        "details#details-test": {},
        "summary#summary-test": {},
        "dialog#dialog-test": {},
        //http://www.w3.org/TR/html5/links.html
        "a#a-test": {},
        //"area#area-test": {}
      };
      var elts = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "pre", "blockquote", "ol", "ul",
                       "li", "dl", "dt", "dd", "figure", "figcaption", "div", "main", "a", "em",
                       "strong", "small", "s", "cite", "q", "dfn", "abbr", "data", "time", "code",
                       "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "ruby", "rt", "rp", "bdi",
                       "bdo", "span", "br", "wbr", "ins", "del", "img", "iframe", "embed", "object",
                       "param", "video", "audio", "source", "track", "canvas", "map", "area", "math",
                       "svg", "table", "caption", "colgroup", "col", "tbody", "thead", "tfoot", "tr",
                       "td", "th", "form", "fieldset", "legend", "label", "input-default", "input-hidden",
                       "input-text",
                       "input-password",
                       //unsupported by jQuery
                       //"input-search", "input-tel", "input-url", "input-email", "input-datetime",
                       //"input-date", "input-month", "input-week", "input-time", "input-datetime-local",
                       //"input-number", "input-range", "input-color",
                       //-
                       "input-checkbox",  "input-radio", "input-file", "input-submit", "input-image",
                       "input-reset", "input-button", "button", "select", "datalist", "optgroup", "option",
                       "textarea", "keygen", "output", "progress", "details", "summary", "dialog", "a"];
      toast = $.toast(html).appendTo('body');

      $.each(elts, function(key, val) {
        expect($("#" + val + "-test").get(0)).not.toBeNull();
        if (val.match(/input-.*/))
          expect($("#" + val + "-test").tagName()).toBe(val.replace('-', ':').replace('default', 'text'));
        else
          expect($("#" + val + "-test").tagName()).toBe(val);
      });
    });
  
    it("creates input node with no type given as the defaut text input", function() {
      var html = {
        "input#input-test": {}
      }
      toast = $.toast(html).appendTo('body');

      //"input#input-test": {}
      expect(document.getElementById("input-test")).not.toBeNull();
      expect(document.getElementById("input-test").tagName).toBe("INPUT");
      expect(document.getElementById("input-test").type).toBe("text");
    });

    it("handles multi-level", function() {
      var html = {
        "#test-parent": {
          "#test-child": {},
          "#test-child1": {
            "#test-child11": {},
          },
          "#test-child2": {
            "#test-child21": {},
            "#test-child22": {},
            "#test-child23": {}
          }
        }
      }
      toast = $.toast(html).appendTo('body');

      //"#test-parent": {
      expect(document.getElementById("test-parent")).not.toBeNull();
      //  "#test-child": {}
      expect(document.getElementById("test-child")).not.toBeNull();
      //    "#test-child11": {}
      expect(document.getElementById("test-child1")).not.toBeNull();
      expect(document.getElementById("test-child11")).not.toBeNull();
      //  "#test-child2": {
      expect(document.getElementById("test-child2")).not.toBeNull();
      //    "#test-child21": {}
      expect(document.getElementById("test-child21")).not.toBeNull();
      //    "#test-child22": {}
      expect(document.getElementById("test-child22")).not.toBeNull();
      //    "#test-child23": {}
      expect(document.getElementById("test-child23")).not.toBeNull();
    });
    
    it("sets specified attributes on element", function() {
      var html = {
        "div#test-alt[alt=alt text]": {},
        "div#test-multiple[alt=alt text].classname[alt=another alt text;value=34;][custom=1234custom]": {},
        "div#test-empty[].classname[;;;;][]": {},
        "input:text#test-input[value=text of input;type=checkbox]": {},
      }
      toast = $.toast(html).appendTo('body');

      //"div#test-alt[alt=alt text]": {}
      expect($("#test-alt").get(0)).not.toBeNull();
      expect($("#test-alt").get(0).alt).toEqual("alt text");
      //"div#test-multiple[alt=alt text].classname[alt=another alt text;value=34;][custom=1234custom]": {}
      expect($("#test-multiple").get(0)).not.toBeNull();
      expect($("#test-multiple").get(0)).not.toBeNull();
      expect($("#test-multiple").get(0).alt).toEqual("another alt text");
      expect($("#test-multiple").get(0).value).toEqual("34");
      expect($("#test-multiple").get(0).custom).toEqual("1234custom");
      //"div#test-empty[].classname[;;;;][]": {}
      expect($("#test-empty").get(0)).not.toBeNull();
      //"input:text#test-input[value=text of input;type=checkbox]": {}
      expect($("#test-input").get(0)).not.toBeNull();
      expect($("#test-input").tagName()).toEqual("input:checkbox");
    });
    
    it("sets specified style on element", function() {
      var html = {
        "div#test{width:42px;height:23px}": {},
        "div#test-multidefinition{width:42px;height:23px}{width:23px;height:42px}": {},
      }
      toast = $.toast(html).appendTo('body');

      //"div#test{width:42px;height:23px}": {}
      expect(document.getElementById("test")).not.toBeNull();
      expect(document.getElementById("test").style.width).toEqual("42px");
      expect(document.getElementById("test").style.height).toEqual("23px");
      //"div#test-multidefinition{width:42px;height:23px}{width:23px;height:42px}": {}
      expect(document.getElementById("test-multidefinition")).not.toBeNull();
      expect(document.getElementById("test-multidefinition").style.width).toEqual("23px");
      expect(document.getElementById("test-multidefinition").style.height).toEqual("42px");
    });

    it("sets properties specified by property", function() {
      var html = {
        "$div-id": {id: "test-id"},
        "$div-class": {id: "test-class", class: "a"},
        "$div-classes": {id: "test-classes", classes: "a b"},
        "$div-classClasses": {id: "test-classClasses", class: "a b"},
        "$div-attribute": {id: "test-attribute", attribute: {alt: "alt text"}},
        "$div-attributes": {id: "test-attributes", attributes: {alt: "alt text"}},
        "$div-attr": {id: "test-attr", attr: {alt: "alt text"}},
        "$div-attrs": {id: "test-attrs", attrs: {alt: "alt text"}},
        "$div-style": {id: "test-style", style: {width: "42px"}},
        "$div-styles": {id: "test-styles", styles: {width: "42px"}},
        "$div-css": {id: "test-css", css: {"background-color": "red"}},
        "$div-ref": {id: "test-ref", ref: "div-ref"},
        "$div-reference": {id: "test-reference", reference: "div-reference"},
      }
      toast = $.toast(html).appendTo('body');

      //"div": {id: "test-div"}
      expect(document.getElementById("test-id")).not.toBeNull();
      expect(document.getElementById("test-id").reference).toEqual("div-id");
      //"div": {id: "test-class", class: "a"}
      expect(document.getElementById("test-class")).not.toBeNull();
      expect(document.getElementById("test-class").className).toEqual("a");
      expect(document.getElementById("test-class").reference).toEqual("div-class");
      //"$div-classes": {id: "test-classes", classes: "a b"}
      expect(document.getElementById("test-classes")).not.toBeNull();
      expect(document.getElementById("test-classes").className).toEqual("a b");
      expect(document.getElementById("test-classes").reference).toEqual("div-classes");
      //"$div-classClasses": {id: "test-classClasses", class: "a b"}
      expect(document.getElementById("test-classClasses")).not.toBeNull();
      expect(document.getElementById("test-classClasses").className).toEqual("a b");
      expect(document.getElementById("test-classClasses").reference).toEqual("div-classClasses");
      //"$div-attribute": {id: "test-attribute", attribute: {alt: "alt text"}}
      expect(document.getElementById("test-attribute")).not.toBeNull();
      expect(document.getElementById("test-attribute").alt).toEqual("alt text");
      expect(document.getElementById("test-attribute").reference).toEqual("div-attribute");
      //"$div-attributes": {id: "test-attributes", attributes: {alt: "alt text"}},
      expect(document.getElementById("test-attributes")).not.toBeNull();
      expect(document.getElementById("test-attributes").alt).toEqual("alt text");
      expect(document.getElementById("test-attributes").reference).toEqual("div-attributes");
      //"$div-attr": {id: "test-attr", attr: {alt: "alt text"}},
      expect(document.getElementById("test-attr")).not.toBeNull();
      expect(document.getElementById("test-attr").alt).toEqual("alt text");
      expect(document.getElementById("test-attr").reference).toEqual("div-attr");
      //"$div-attrs": {id: "test-attrs", attrs: {alt: "alt text"}},
      expect(document.getElementById("test-attrs")).not.toBeNull();
      expect(document.getElementById("test-attrs").alt).toEqual("alt text");
      expect(document.getElementById("test-attrs").reference).toEqual("div-attrs");
      //"$div-style": {id: "test-style", style: {width: "42px"}},
      expect(document.getElementById("test-style")).not.toBeNull();
      expect(document.getElementById("test-style").style.width).toEqual("42px");
      expect(document.getElementById("test-style").reference).toEqual("div-style");
      //"$div-styles": {id: "test-styles", styles: {width: "42px"}},
      expect(document.getElementById("test-styles")).not.toBeNull();
      expect(document.getElementById("test-styles").style.width).toEqual("42px");
      expect(document.getElementById("test-styles").reference).toEqual("div-styles");
      //"$div-css": {id: "test-css", css: {"background-color": "red"}},
      expect(document.getElementById("test-css")).not.toBeNull();
      expect(document.getElementById("test-css").style.backgroundColor).toEqual("red");
      expect(document.getElementById("test-css").reference).toEqual("div-css");
      //"$div-ref": {id: "test-ref", ref: "div-ref"}
      expect(document.getElementById("test-ref")).not.toBeNull();
      expect(document.getElementById("test-ref").reference).toEqual("div-ref");
      //"$div-reference": {id: "test-reference", reference: "div-reference"}
      expect(document.getElementById("test-reference")).not.toBeNull();
      expect(document.getElementById("test-reference").reference).toEqual("div-reference");
    });

    it("accepts multiplier", function() {
      var html = {
      }
      toast = $.toast(html).appendTo('body');
      expect("To do").toBe("done");
    });
  });
}(jQuery));
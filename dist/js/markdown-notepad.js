/*! markdown-notepad v0.1.0 2016-05-23 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery","showdown"],a):"object"==typeof exports?a(require("jquery"),require("showdown")):window.jQuery&&a(window.jQuery,showdown)}(function(a,b){var c=function(c,d){var e=this;e._el=c,e._opt=d;var f=new b.Converter({strikethrough:!0,tables:!0}),g={};e._converter=f,e._adapter=a("textarea",c).ntadapter({data:a.proxy(e._data,e)}).markdown({language:d.locale,autofocus:!1,parser:function(b){var c=f.makeHtml(b),d=/\ssrc=('|")?(\S+\.(png|jpg|gif|jpeg|svg))\1/gi,h=function(b,c){return function(){var d=URL.createObjectURL(b.response);g[c]=d,a('img[data-src="'+c+'"]',e._el).prop("src",d)}};if("undefined"!=typeof chrome&&chrome.storage){c=f.makeHtml(b).replace(d,function(a,b,c){var d="img/image-96x96.png";return g[c]?d=g[c]:g[c]="",' src="'+d+'" data-src="'+c+'"'});for(var i in g){var j=new XMLHttpRequest;j.open("GET",i),j.responseType="blob",j.onload=h(j,i),j.send()}}return c},onChange:a.proxy(e._change,e),additionalButtons:[[{name:"groupCustom",data:[{name:"cmdLocalImg",toggle:!0,title:d.lblLocalimg||"Local Image",icon:"glyphicon glyphicon-picture",btnText:d.lblLocalimg||"Local",callback:function(){a(e._el).notes("openLocal",function(a){e.insertImage(a.name,a.d)})}}]}]]})[0],a(c).notes({adapter:e._adapter,suffix:"md",mime:"text/markdown",msgbox:d.msgbox}).on("cmd.nts",a.proxy(e._cmd,e))};c.prototype={constructor:c,_change:function(){var b=this,c=a(b._adapter);c.trigger("edit.ntadapter",c.data("markdown").getContent())},_data:function(b){var c=this,d=a(c._adapter).data("markdown");return b?(d.setContent(b.d||""),b.d=d.getContent(),b.readOnly?(d.hidePreview(),d.showPreview()):d.$isPreview&&b.d&&!b.unsaved?(d.hidePreview(),d.showPreview()):d.hidePreview(),void 0):d.getContent()},preview:function(){var b=this,c=a(b._adapter).data("markdown"),d=c.$isPreview;d?c.hidePreview():c.showPreview()},save2LocalStore:function(){var b=this;a(b._el).notes("save2LocalStore")},insertImage:function(b,c){var d,e,f=this,g=f._opt,h=a(f._adapter).data("markdown"),i=h.getSelection();d=g.imgNotRef?"!["+b+"]("+c+")":"!["+b+"][]",h.replaceSelection(d),g.imgNotRef||h.setContent(h.getContent()+"\n ["+b+"]: "+c),e=i.start,h.setSelection(e,e+d.length)},_cmd:function(b,c){var d=this,e=d._el;switch(c){case"print":d.print();break;case"export":var f=a(e).data("notes"),g=f.activeFile(),h=d._converter;g&&f.saveLocal({d:h.makeHtml(g.d),name:g.name.replace(/([^\.]+)(\.\w+)?$/i,"$1.html")})}},print:function(){var b=this,c=b._opt,d=a(c.print),e=b._printContent();e&&(d.html(b._printContent()),window.print())},_printContent:function(){var b=this,c=b._el,d=a(b._adapter).data("markdown"),e=d.$isPreview;return e?a(".md-preview",c).html():"<pre>"+d.getContent()+"</pre>"}},a.fn.mdnotepad=function(b){var d=arguments;return this.each(function(){var e=a(this),f=e.data("mdnotepad"),g="object"==typeof b?b:{};f||"string"==typeof b?"string"==typeof b&&f[b].apply(f,Array.prototype.slice.call(d,1)):e.data("mdnotepad",new c(this,a.extend(g,e.data())))})},a(document).ready(function(){var b=a(".notes").mdnotepad({msgbox:a("#myMsgBox").msgbox()[0],print:a(".notes-print")[0]}),c=b.data("notes"),d=b.height();a(document).on("click","a",function(c){var d=a(c.currentTarget)[0],e=d.href,f=d.pathname.split("/").pop(),g=f.lastIndexOf("."),h=-1!==g?f.substring(g+1).toLowerCase():null;h&&/(md|markdown|txt|text|json)$/i.test(h)?(b.notes("openRemote",e),c.preventDefault()):d.pathname!==window.location.pathname&&"_self"!==d.target&&(d.target="_blank")}),a(".md-editor textarea",b).height(d-a(".md-editor textarea",b).offset().top-1),a(".md-editor .md-preview",b).css({height:d-a(".md-editor .md-preview",b).offset().top-1});var e="0.1.0",f=c._localStorage();f.get("__ver",function(c){e!==c&&(f.set("__ver",e),a("a[name=welcome]",b).click())});var g=a(window).on("keydown",function(b){switch(b.which){case 116:a(".notes").mdnotepad("preview"),b.preventDefault(),b.stopPropagation();break;case 80:b.ctrlKey&&(a(".notes").mdnotepad("print"),b.preventDefault(),b.stopPropagation());break;default:a(".notes").notes("hotkey",b)}}).on("paste",function(b){var c=b.originalEvent,d=(c.clipboardData||c.originalEvent.clipboardData).items,e=null;if(d){for(var f=0;f<d.length;f++)0===d[f].type.indexOf("image")&&(e=d[f].getAsFile());if(null!==e){var g=new FileReader;g.onload=function(b){a(".notes").mdnotepad("insertImage",(new Date).getTime(),b.target.result)},g.readAsDataURL(e)}}}).on("resize",function(){var b=a(".notes"),c=b.width(),d=b.height();a(".md-editor textarea",b).height(d-72-50),a(".md-editor .md-preview",b).css({height:d-a(".md-editor .md-preview",b).offset().top-1,width:c})});"undefined"!=typeof chrome&&chrome.storage||g.bind("beforeunload",function(){return window.localStorage?void a(".notes").mdnotepad("save2LocalStore"):"Do you really want to close?"})})});
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cookies-eventlistener-hovermq-ie8compat-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function i(){var e,n,t,i,s,r,a;for(var l in u)if(u.hasOwnProperty(l)){if(e=[],n=u[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(i=o(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)r=e[s],a=r.split("."),1===a.length?Modernizr[a[0]]=i:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=i),c.push((i?"":"no-")+a.join("-"))}}function s(e){var n=p.className,t=Modernizr._config.classPrefix||"";if(h&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),h?p.className.baseVal=n:p.className=n)}function r(e,n){if("object"==typeof e)for(var t in e)v(e,t)&&r(t,e[t]);else{e=e.toLowerCase();var o=e.split("."),i=Modernizr[o[0]];if(2==o.length&&(i=i[o[1]]),"undefined"!=typeof i)return Modernizr;n="function"==typeof n?n():n,1==o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),s([(n&&0!=n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):h?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(){var e=n.body;return e||(e=a(h?"svg":"body"),e.fake=!0),e}function f(e,t,o,i){var s,r,f,c,u="modernizr",d=a("div"),h=l();if(parseInt(o,10))for(;o--;)f=a("div"),f.id=i?i[o]:u+(o+1),d.appendChild(f);return s=a("style"),s.type="text/css",s.id="s"+u,(h.fake?h:d).appendChild(s),h.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=u,h.fake&&(h.style.background="",h.style.overflow="hidden",c=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),r=t(d,e),h.fake?(h.parentNode.removeChild(h),p.style.overflow=c,p.offsetHeight):d.parentNode.removeChild(d),!!r}var c=[],u=[],d={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){u.push({name:e,fn:n,options:t})},addAsyncTest:function(e){u.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr,Modernizr.addTest("cookies",function(){try{n.cookie="cookietest=1";var e=-1!=n.cookie.indexOf("cookietest=");return n.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(t){return!1}}),Modernizr.addTest("eventlistener","addEventListener"in e),Modernizr.addTest("ie8compat",!e.addEventListener&&!!n.documentMode&&7===n.documentMode);var p=n.documentElement,h="svg"===p.nodeName.toLowerCase(),m=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=m;var v;!function(){var e={}.hasOwnProperty;v=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),d._l={},d.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},d._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,o;for(e=0;e<t.length;e++)(o=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){d.addTest=r});var g=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return f("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();d.mq=g,Modernizr.addTest("hovermq",g("(hover)"));var y=d.testStyles=f;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",m.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");y(o,function(e){t=9===e.offsetTop})}return t}),i(),s(c),delete d.addTest,delete d.addAsyncTest;for(var _=0;_<Modernizr._q.length;_++)Modernizr._q[_]();e.Modernizr=Modernizr}(window,document);
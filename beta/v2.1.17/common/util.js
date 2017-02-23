function isTick(a){return-1!=a.indexOf("t")}function isDotType(a){return"dot"===a}function isLineDotType(a){return"linedot"===a}function isAffiliates(){return getParameterByName("affiliates")===!0||"true"==(getParameterByName("affiliates")+"").toLowerCase()}function isHideOverlay(){return getParameterByName("hideOverlay")===!0||"true"==(getParameterByName("hideOverlay")+"").toLowerCase()}function isHideShare(){return getParameterByName("hideShare")===!0||"true"==(getParameterByName("hideShare")+"").toLowerCase()}function isHideFooter(){return getParameterByName("hideFooter")===!0||"true"==(getParameterByName("hideFooter")+"").toLowerCase()}function convertToTimeperiodObject(a){return{intValue:function(){return parseInt(a.toLowerCase().replace("t","").replace("h","").replace("d","").trim())},suffix:function(){return a.toLowerCase().replace(""+this.intValue(),"").trim().charAt(0)},timeInMillis:function(){var a=0;switch(this.suffix()){case"t":a=0;break;case"m":a=60*this.intValue()*1e3;break;case"h":a=60*this.intValue()*60*1e3;break;case"d":a=24*this.intValue()*60*60*1e3}return a},timeInSeconds:function(){return this.timeInMillis()/1e3},humanReadableString:function(){var a="";switch(this.suffix()){case"t":a="tick";break;case"m":a="minute(s)";break;case"h":a="hour(s)";break;case"d":a="day(s)"}return this.intValue()+" "+a}}}function isDataTypeClosePriceOnly(a){return!("candlestick"===a||"ohlc"===a)}function isSmallView(){var a=!1;return Modernizr&&(Modernizr.mq("all and (max-width: 600px)")||Modernizr.mq("all and (max-device-width: 600px)"))&&(a=!0),a}function getParameterByNameFromURL(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),c=b.exec(location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))}function getParameterByName(a){return window[a]?window[a]:getParameterByNameFromURL(a)}function getObjects(a,b,c){var d=[];for(var e in a)a.hasOwnProperty(e)&&("object"==typeof a[e]?d=d.concat(getObjects(a[e],b,c)):e==b&&a[b]==c&&d.push(a));return d}function validateParameters(){var a=getParameterByName("instrument"),b=getParameterByName("timePeriod");if(!a||!b)return!1;var c=null;try{c=convertToTimeperiodObject(b)}catch(d){}if(!c)return!1;var e="t"===c.suffix()&&1===c.intValue(),f=-1!=c.suffix().indexOf("m")&&-1!=[1,2,3,5,10,15,30].indexOf(c.intValue()),g=-1!=c.suffix().indexOf("h")&&-1!=[1,2,4,8].indexOf(c.intValue()),h=-1!=c.suffix().indexOf("d")&&1===c.intValue();return e||f||g||h}function epoch_to_string(a,b){var c=b&&b.utc?"getUTC":"get",d=new Date(1e3*a);return d[c+"FullYear"]()+"-"+("00"+(d[c+"Month"]()+1)).slice(-2)+"-"+("00"+d[c+"Date"]()).slice(-2)+" "+("00"+d[c+"Hours"]()).slice(-2)+":"+("00"+d[c+"Minutes"]()).slice(-2)+":"+("00"+d[c+"Seconds"]()).slice(-2)}function yyyy_mm_dd_to_epoch(a,b){var c=a.split("-"),d=1*c[0],e=1*c[1],f=1*c[2];return b&&b.utc?Date.UTC(d,e-1,f)/1e3:new Date(d,e-1,f).getTime()/1e3}function formatPrice(a,b){var c=(local_storage.get("i18n")||{value:"en"}).value,d={USD:"$",EUR:"€",CRC:"₡",GBP:"£",ILS:"₪",INR:"₹",JPY:"¥",KRW:"₩",NGN:"₦",PHP:"₱",PLN:"zł",PYG:"₲",THB:"฿",UAH:"₴",VND:"₫"};return a=new Intl.NumberFormat(c.replace("_","-"),{style:"decimal",minimumFractionDigits:2}).format(a),b&&(a=(d[b]||b)+a),a}function sortAlphaNum(a){"use strict";var b=/[^a-zA-Z]/g,c=/[^0-9]/g;return function(d,e){var f=d[a].replace(b,""),g=e[a].replace(b,"");if(f===g){var h=parseInt(d[a].replace(c,""),10),i=parseInt(e[a].replace(c,""),10);return h===i?0:h>i?1:-1}return f>g?1:-1}}function toFixed(a,b){return $.isNumeric(a)&&(a=Math.round(a*Math.pow(10,b))/Math.pow(10,b)),a}function uuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}function setLongTimeout(a,b,c){if(b>2147483647){var d=setTimeout(function(){setLongTimeout(a,b-2147483647,c)},2147483647);c(d)}else{var d=setTimeout(a,b);c&&c(d)}}function validateEmail(a){var b=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return b.test(a)}function isLangSupported(a){return a=(a||"").trim().toLowerCase(),"ar"===a||"de"===a||"en"===a||"es"===a||"fr"===a||"id"===a||"it"===a||"ja"===a||"pl"===a||"pt"===a||"ru"===a||"vi"===a||"zn_cn"===a||"zh_tw"===a}function setup_i18n_translation(a){function b(a){var c,d=a.childNodes?a.childNodes:a,e=d.length;for(c=0;e>c;c++)3==d[c].nodeType&&d[c].textContent&&(d[c].textContent=d[c].textContent.i18n()),1==d[c].nodeType&&(d[c].getAttribute("data-balloon")&&d[c].setAttribute("data-balloon",d[c].getAttribute("data-balloon").i18n()),b(d[c]))}var c=Object.keys(a).filter(function(a){return""!==a&&" "!==a});c=c.sort(function(a,b){return b.length-a.length});var d=c.map(function(a){return a.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")});d[0]=/[\?\.]$/.test(d[0])?d[0]+"|":d[0]+"\\b|";var e=new RegExp("\\b("+d.reduce(function(a,b){return/[\?\.]$/.test(b)?a+b+"|":a+b+"\\b|"})+")","g"),f=function(b,c){return a[c]&&a[c][1]||c};String.prototype.i18n=function(){return this.replace(e,f)},$.fn.i18n=function(){return b(this),this},b(document.body)}function getAppURL(){return window.location.href.split("/v")[0]}function download_file_in_browser(a,b,c){var d=new Blob([c],{type:b});if(navigator.msSaveBlob)navigator.msSaveBlob(d,a);else{var e=document.createElement("a");if(void 0!==e.download){var f=URL.createObjectURL(d);e.setAttribute("href",f),e.setAttribute("download",a),e.style.visibility="hidden",document.body.appendChild(e),e.click(),document.body.removeChild(e)}}}function guessDigits(a){var b=0;return(a||[]).forEach(function(a){var c=a+"",d=c.split(".")||[];if(d.length>1){var e=d[1].length;e>b&&(b=e)}}),b||4}String.prototype.replaceAll=function(a,b){return this.split(a).join(b)},String.prototype.format=function(){var a=arguments;return this.replace(/{(\d+)}/g,function(b,c){return"undefined"!=typeof a[c]?a[c]:b})},"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(a){return 0===this.lastIndexOf(a,0)},String.prototype.endsWith=function(a){return-1!==this.indexOf(a,this.length-a.length)}),String.prototype.includes||(String.prototype.includes=function(a,b){"use strict";return"number"!=typeof b&&(b=0),b+a.length>this.length?!1:-1!==this.indexOf(a,b)}),Array.prototype.includes||(Array.prototype.includes=function(a){"use strict";if(null==this)throw new TypeError("Array.prototype.includes called on null or undefined");var b=Object(this),c=parseInt(b.length,10)||0;if(0===c)return!1;var d,e=parseInt(arguments[1],10)||0;e>=0?d=e:(d=c+e,0>d&&(d=0));for(var f;c>d;){if(f=b[d],a===f||a!==a&&f!==f)return!0;d++}return!1});var is_beta=function(){var a=-1!==window.location.href.indexOf("/beta")||-1!==window.location.href.indexOf("localhost");return function(){return a}}(),local_storage={get:function(a){a="_webtrader_"+a+(is_beta()?"_beta":"_live");var b=localStorage.getItem(a);return b&&JSON.parse(b)},set:function(a,b){return a="_webtrader_"+a+(is_beta()?"_beta":"_live"),localStorage.setItem(a,JSON.stringify(b))},remove:function(a){return a="_webtrader_"+a+(is_beta()?"_beta":"_live"),localStorage.removeItem(a)}},Cookies={get_by_name:function(a){var b=document.cookie,c=b.match("(^|;)\\s*"+a+"\\s*=\\s*([^;]+)");return c?c.pop():""},loginids:function(){var a=Cookies.get_by_name("loginid_list");a=decodeURIComponent(a).split("+"),a=a.map(function(a){var b=a.split(":");return{id:b[0],is_real:"R"===b[1],is_disabled:"D"===b[2],is_mf:/MF/gi.test(b[0]),is_mlt:/MLT/gi.test(b[0]),is_mx:/MX/gi.test(b[0]),is_cr:/CR|CH/gi.test(b[0])}});var b=(local_storage.get("oauth")||[]).map(function(a){return{id:a.id,is_real:!a.is_virtual,is_disabled:!1,is_mf:/MF/gi.test(a.id),is_mlt:/MLT/gi.test(a.id),is_mx:/MX/gi.test(a.id),is_cr:/CR|CH/gi.test(a.id)}}).filter(function(b){return-1===a.map(function(a){return a.id}).indexOf(b.id)});return b&&b.length>0?b:a},residence:function(){return Cookies.get_by_name("residence")}};
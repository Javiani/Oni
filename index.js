!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Oni",[],t):"object"==typeof exports?exports.Oni=t():n.Oni=t()}(this,(()=>(()=>{"use strict";var n={};return(()=>{var t=n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(n,t){var i=[],a=[],r=e(n),c=function(){return r},u=function(n){n.call&&i.push(n)},f=function(n){i=i.filter((function(t){return t!=n}))},s=function(n,t){return a.push({action:n,payload:t}),new Promise((function(e){return o((function(o){return l({action:n,payload:t},e)}))}))},l=function(n,e){var o=n.action,l=n.payload,p=void 0===l?{}:l;a.forEach((function(n){var e=n.action,o=n.payload,i=void 0===o?{}:o;if(e in t){var a=t[e].call(null,r,i,{getState:c,subscribe:u,unsubscribe:f,dispatch:s});Object.assign(r,a)}else console.log("[Oni] Error -> No action [ ".concat(e," ] found."))})),a.length&&(i.forEach((function(n){n(r,{action:o,payload:p})})),a=[]),e(r)};return{getState:c,subscribe:u,unsubscribe:f,dispatch:s,patternMatch:function(n){u((function(t,e){var o=e.action,i=e.payload;o in n&&n[o].call(null,t,{action:o,payload:i})}))}}};var e=function(n){return JSON.parse(JSON.stringify(n))},o=function(n){return requestAnimationFrame?requestAnimationFrame(n):0}})(),n})()));
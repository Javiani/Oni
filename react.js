(()=>{"use strict";var t={n:e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{createStore:()=>u});const r=require("onijs");var n=t.n(r);const o=require("react");function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var u=function(t,e){var r=n()(t,e);return{store:r,useStore:function(){var t,e,n=(t=(0,o.useState)({state:r.getState(),action:"",payload:null}),e=2,function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a=[],u=!0,i=!1;try{for(r=r.call(t);!(u=(n=r.next()).done)&&(a.push(n.value),!e||a.length!==e);u=!0);}catch(t){i=!0,o=t}finally{try{u||null==r.return||r.return()}finally{if(i)throw o}}return a}}(t,e)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=n[0],i=n[1],l=function(t,e){var r=e.action,n=e.payload;i({state:t,action:r,payload:n})};return(0,o.useEffect)((function(){return r.subscribe(l),function(){r.unsubscribe(l)}}),[]),{state:u.state,action:u.action,payload:u.payload,dispatch:r.dispatch,getState:r.getState}}}};module.exports=e})();
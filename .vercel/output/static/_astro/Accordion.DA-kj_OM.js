import{r as a}from"./index.NEDEFKed.js";var f={exports:{}},c={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p=a,u=Symbol.for("react.element"),d=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,y=p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_={key:!0,ref:!0,__self:!0,__source:!0};function x(t,e,o){var r,s={},n=null,i=null;o!==void 0&&(n=""+o),e.key!==void 0&&(n=""+e.key),e.ref!==void 0&&(i=e.ref);for(r in e)m.call(e,r)&&!_.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:u,type:t,key:n,ref:i,props:s,_owner:y.current}}c.Fragment=d;c.jsx=x;c.jsxs=x;f.exports=c;var l=f.exports;function j({title:t,children:e}){const[o,r]=a.useState(!1),s=o?"block":"hidden",n=o?"transform rotate-180":"";return l.jsxs("div",{className:"w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-300 text-gray-600",children:[l.jsxs("button",{className:"flex items-center justify-between w-full text-lg",onClick:()=>r(!o),children:[t,l.jsx("svg",{className:`${n} transition w-4 h-4 text-gray-600`,x:"0px",y:"0px",viewBox:"0 0 512 512",children:l.jsx("path",{fill:"currentColor",d:"M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"})})]}),l.jsx("div",{className:s,children:e})]})}export{j as Accordion};

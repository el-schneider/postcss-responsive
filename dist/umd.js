(function(o,a){typeof exports=="object"&&typeof module<"u"?module.exports=a(require("postcss-value-parser")):typeof define=="function"&&define.amd?define(["postcss-value-parser"],a):(o=typeof globalThis<"u"?globalThis:o||self,o["postcss-responsive"]=a(o["postcss-value-parser"]))})(this,function(o){"use strict";const S=(i=>i&&typeof i=="object"&&"default"in i?i:{default:i})(o),h=(i={})=>({postcssPlugin:"postcss-responsive",Declaration:r=>{var $;let w=r.value,l=($=i.funcName)!=null?$:"responsive",T=`(^|[^\\w-])(${l})\\(`;if(!new RegExp(T,"i").test(w.toLowerCase()))return;let v=S.default(w),u=(e,n)=>{if(e===void 0||n===void 0)return;let t;if(typeof e=="number"?(t="px",e=`${e}${t}`):t=e.replace(/(-)?\d+(\.\d+)?/g,""),!["px","em","rem"].includes(t))throw r.error(`Invalid unit ${t}. Try to use px or rem.`,{word:t});let s=parseFloat(e);return t==="px"?s/n:s},x=e=>parseFloat(e.toFixed(4)),f=e=>!Number.isFinite(e);v.walk(e=>{var z,M,N,b;if(e.type!=="function"||e.value!==l)return;let n=e.nodes.filter(d=>d.type==="word").map(d=>d.value),t=(z=i.root)!=null?z:16,s=u(n[0],t),m=u(n[1],t),p=u((M=n[2])!=null?M:i.minWidth,t),c=u((N=n[3])!=null?N:i.maxWidth,t),W=(b=n[4])!=null?b:i.noClamp;if(f(p))throw r.error(`Missing min width in ${l} function.`);if(f(c))throw r.error(`Missing max width in ${l} function.`);if(f(s))throw r.error(`Missing min font size in ${l} function.`);if(f(m))throw r.error(`Missing max font size in ${l} function.`);if(c<p)throw r.error("Max width must be greater than the minimum.");let g=(m-s)/(c-p),y=`${x(-p*g+s)}rem + ${x(g*100)}vw`,_=W?`calc(${y})`:`clamp(${s}rem, ${y}, ${m}rem)`,F=e;F.type="word",F.value=_}),r.cloneBefore({value:v.toString()}),r.remove()}});return h.postcss=!0,h});

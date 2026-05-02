(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const vu=()=>{};var Qo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ja=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Tu=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],u=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Xa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,u=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,m=o>>2,_=(o&3)<<4|u>>4;let v=(u&15)<<2|d>>6,R=d&63;h||(R=64,a||(v=64)),r.push(e[m],e[_],e[v],e[R])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Ja(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Tu(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],u=s<n.length?e[n.charAt(s)]:0;++s;const d=s<n.length?e[n.charAt(s)]:64;++s;const _=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||u==null||d==null||_==null)throw new Au;const v=o<<2|u>>4;if(r.push(v),d!==64){const R=u<<4&240|d>>2;if(r.push(R),_!==64){const S=d<<6&192|_;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Au extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Iu=function(n){const t=Ja(n);return Xa.encodeByteArray(t,!0)},fr=function(n){return Iu(n).replace(/\./g,"")},wu=function(n){try{return Xa.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu=()=>bu().__FIREBASE_DEFAULTS__,Pu=()=>{if(typeof process>"u"||typeof Qo>"u")return;const n=Qo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ru=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&wu(n[1]);return t&&JSON.parse(t)},zs=()=>{try{return vu()||Cu()||Pu()||Ru()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Su=n=>{var t,e;return(e=(t=zs())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},ku=n=>{const t=Su(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Za=()=>{var n;return(n=zs())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hs(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Du(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[fr(JSON.stringify(e)),fr(JSON.stringify(a)),""].join(".")}const fn={};function Mu(){const n={prod:[],emulator:[]};for(const t of Object.keys(fn))fn[t]?n.emulator.push(t):n.prod.push(t);return n}function Lu(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let Uo=!1;function xu(n,t){if(typeof window>"u"||typeof document>"u"||!Hs(window.location.host)||fn[n]===t||fn[n]||Uo)return;fn[n]=t;function e(v){return`__firebase__banner__${v}`}const r="__firebase__banner",o=Mu().prod.length>0;function a(){const v=document.getElementById(r);v&&v.remove()}function u(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function h(v,R){v.setAttribute("width","24"),v.setAttribute("id",R),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function d(){const v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{Uo=!0,a()},v}function m(v,R){v.setAttribute("id",R),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function _(){const v=Lu(r),R=e("text"),S=document.getElementById(R)||document.createElement("span"),M=e("learnmore"),V=document.getElementById(M)||document.createElement("a"),G=e("preprendIcon"),U=document.getElementById(G)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){const $=v.element;u($),m(V,M);const nt=d();h(U,G),$.append(U,S,V,nt),document.body.appendChild($)}o?(S.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",_):_()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ou(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Fu(){var n;const t=(n=zs())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Cp(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Qu(){return!Fu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Uu(){try{return typeof indexedDB=="object"}catch{return!1}}function Bu(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}function Pp(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu="FirebaseError";class Qe extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=qu,Object.setPrototypeOf(this,Qe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,tl.prototype.create)}}class tl{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?ju(o,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new Qe(s,u,r)}}function ju(n,t){return n.replace(Gu,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Gu=/\{\$([^}]+)}/g;function mr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Bo(o)&&Bo(a)){if(!mr(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Bo(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $u=1e3,zu=2,Hu=14400*1e3,Wu=.5;function Rp(n,t=$u,e=zu){const r=t*Math.pow(e,n),s=Math.round(Wu*r*(Math.random()-.5)*2);return Math.min(Hu,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(n){return n&&n._delegate?n._delegate:n}class _n{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Vu;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Ju(t))try{this.getOrInitializeService({instanceIdentifier:ge})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=ge){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ge){return this.instances.has(t)}getOptions(t=ge){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(s)}return s}onInit(t,e){var r;const s=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&t(a,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Yu(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=ge){return this.component?this.component.multipleInstances?t:ge:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Yu(n){return n===ge?void 0:n}function Ju(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Ku(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(j||(j={}));const Zu={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},th=j.INFO,eh={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},nh=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=eh[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class el{constructor(t){this.name=t,this._logLevel=th,this._logHandler=nh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in j))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Zu[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...t),this._logHandler(this,j.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...t),this._logHandler(this,j.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,j.INFO,...t),this._logHandler(this,j.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,j.WARN,...t),this._logHandler(this,j.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...t),this._logHandler(this,j.ERROR,...t)}}const rh=(n,t)=>t.some(e=>n instanceof e);let qo,jo;function sh(){return qo||(qo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ih(){return jo||(jo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const nl=new WeakMap,ws=new WeakMap,rl=new WeakMap,ps=new WeakMap,Ws=new WeakMap;function oh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Xt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&nl.set(e,n)}).catch(()=>{}),Ws.set(t,n),t}function ah(n){if(ws.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});ws.set(n,t)}let bs={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return ws.get(n);if(t==="objectStoreNames")return n.objectStoreNames||rl.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Xt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function lh(n){bs=n(bs)}function ch(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(gs(this),t,...e);return rl.set(r,t.sort?t.sort():[t]),Xt(r)}:ih().includes(n)?function(...t){return n.apply(gs(this),t),Xt(nl.get(this))}:function(...t){return Xt(n.apply(gs(this),t))}}function uh(n){return typeof n=="function"?ch(n):(n instanceof IDBTransaction&&ah(n),rh(n,sh())?new Proxy(n,bs):n)}function Xt(n){if(n instanceof IDBRequest)return oh(n);if(ps.has(n))return ps.get(n);const t=uh(n);return t!==n&&(ps.set(n,t),Ws.set(t,n)),t}const gs=n=>Ws.get(n);function hh(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),u=Xt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Xt(a.result),h.oldVersion,h.newVersion,Xt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const dh=["get","getKey","getAll","getAllKeys","count"],fh=["put","add","delete","clear"],ys=new Map;function Go(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(ys.get(t))return ys.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=fh.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||dh.includes(e)))return;const o=async function(a,...u){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[e](...u),s&&h.done]))[0]};return ys.set(t,o),o}lh(n=>({...n,get:(t,e,r)=>Go(t,e)||n.get(t,e,r),has:(t,e)=>!!Go(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(ph(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function ph(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Cs="@firebase/app",$o="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt=new el("@firebase/app"),gh="@firebase/app-compat",yh="@firebase/analytics-compat",_h="@firebase/analytics",Eh="@firebase/app-check-compat",vh="@firebase/app-check",Th="@firebase/auth",Ah="@firebase/auth-compat",Ih="@firebase/database",wh="@firebase/data-connect",bh="@firebase/database-compat",Ch="@firebase/functions",Ph="@firebase/functions-compat",Rh="@firebase/installations",Sh="@firebase/installations-compat",kh="@firebase/messaging",Vh="@firebase/messaging-compat",Dh="@firebase/performance",Nh="@firebase/performance-compat",Mh="@firebase/remote-config",Lh="@firebase/remote-config-compat",xh="@firebase/storage",Oh="@firebase/storage-compat",Fh="@firebase/firestore",Qh="@firebase/ai",Uh="@firebase/firestore-compat",Bh="firebase",qh="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps="[DEFAULT]",jh={[Cs]:"fire-core",[gh]:"fire-core-compat",[_h]:"fire-analytics",[yh]:"fire-analytics-compat",[vh]:"fire-app-check",[Eh]:"fire-app-check-compat",[Th]:"fire-auth",[Ah]:"fire-auth-compat",[Ih]:"fire-rtdb",[wh]:"fire-data-connect",[bh]:"fire-rtdb-compat",[Ch]:"fire-fn",[Ph]:"fire-fn-compat",[Rh]:"fire-iid",[Sh]:"fire-iid-compat",[kh]:"fire-fcm",[Vh]:"fire-fcm-compat",[Dh]:"fire-perf",[Nh]:"fire-perf-compat",[Mh]:"fire-rc",[Lh]:"fire-rc-compat",[xh]:"fire-gcs",[Oh]:"fire-gcs-compat",[Fh]:"fire-fst",[Uh]:"fire-fst-compat",[Qh]:"fire-vertex","fire-js":"fire-js",[Bh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=new Map,Gh=new Map,Rs=new Map;function zo(n,t){try{n.container.addComponent(t)}catch(e){jt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function gr(n){const t=n.name;if(Rs.has(t))return jt.debug(`There were multiple attempts to register component ${t}.`),!1;Rs.set(t,n);for(const e of pr.values())zo(e,n);for(const e of Gh.values())zo(e,n);return!0}function $h(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function zh(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Zt=new tl("app","Firebase",Hh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new _n("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Zt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=qh;function Yh(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Ps,automaticDataCollectionEnabled:!0},t),s=r.name;if(typeof s!="string"||!s)throw Zt.create("bad-app-name",{appName:String(s)});if(e||(e=Za()),!e)throw Zt.create("no-options");const o=pr.get(s);if(o){if(mr(e,o.options)&&mr(r,o.config))return o;throw Zt.create("duplicate-app",{appName:s})}const a=new Xu(s);for(const h of Rs.values())a.addComponent(h);const u=new Wh(e,r,a);return pr.set(s,u),u}function Jh(n=Ps){const t=pr.get(n);if(!t&&n===Ps&&Za())return Yh();if(!t)throw Zt.create("no-app",{appName:n});return t}function De(n,t,e){var r;let s=(r=jh[n])!==null&&r!==void 0?r:n;e&&(s+=`-${e}`);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const u=[`Unable to register library "${s}" with version "${t}":`];o&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&u.push("and"),a&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),jt.warn(u.join(" "));return}gr(new _n(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh="firebase-heartbeat-database",Zh=1,En="firebase-heartbeat-store";let _s=null;function sl(){return _s||(_s=hh(Xh,Zh,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(En)}catch(e){console.warn(e)}}}}).catch(n=>{throw Zt.create("idb-open",{originalErrorMessage:n.message})})),_s}async function td(n){try{const e=(await sl()).transaction(En),r=await e.objectStore(En).get(il(n));return await e.done,r}catch(t){if(t instanceof Qe)jt.warn(t.message);else{const e=Zt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});jt.warn(e.message)}}}async function Ho(n,t){try{const r=(await sl()).transaction(En,"readwrite");await r.objectStore(En).put(t,il(n)),await r.done}catch(e){if(e instanceof Qe)jt.warn(e.message);else{const r=Zt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});jt.warn(r.message)}}}function il(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed=1024,nd=30;class rd{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new id(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Wo();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>nd){const a=od(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){jt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Wo(),{heartbeatsToSend:r,unsentEntries:s}=sd(this._heartbeatsCache.heartbeats),o=fr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return jt.warn(e),""}}}function Wo(){return new Date().toISOString().substring(0,10)}function sd(n,t=ed){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Ko(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Ko(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class id{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Uu()?Bu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await td(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ho(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ho(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Ko(n){return fr(JSON.stringify({version:2,heartbeats:n})).length}function od(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ad(n){gr(new _n("platform-logger",t=>new mh(t),"PRIVATE")),gr(new _n("heartbeat",t=>new rd(t),"PRIVATE")),De(Cs,$o,n),De(Cs,$o,"esm2017"),De("fire-js","")}ad("");var ld="firebase",cd="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */De(ld,cd,"app");var Yo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var te,ol;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(A,p){function y(){}y.prototype=p.prototype,A.D=p.prototype,A.prototype=new y,A.prototype.constructor=A,A.C=function(E,T,w){for(var g=Array(arguments.length-2),Qt=2;Qt<arguments.length;Qt++)g[Qt-2]=arguments[Qt];return p.prototype[T].apply(E,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,p,y){y||(y=0);var E=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)E[T]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(T=0;16>T;++T)E[T]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=A.g[0],y=A.g[1],T=A.g[2];var w=A.g[3],g=p+(w^y&(T^w))+E[0]+3614090360&4294967295;p=y+(g<<7&4294967295|g>>>25),g=w+(T^p&(y^T))+E[1]+3905402710&4294967295,w=p+(g<<12&4294967295|g>>>20),g=T+(y^w&(p^y))+E[2]+606105819&4294967295,T=w+(g<<17&4294967295|g>>>15),g=y+(p^T&(w^p))+E[3]+3250441966&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(w^y&(T^w))+E[4]+4118548399&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(T^p&(y^T))+E[5]+1200080426&4294967295,w=p+(g<<12&4294967295|g>>>20),g=T+(y^w&(p^y))+E[6]+2821735955&4294967295,T=w+(g<<17&4294967295|g>>>15),g=y+(p^T&(w^p))+E[7]+4249261313&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(w^y&(T^w))+E[8]+1770035416&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(T^p&(y^T))+E[9]+2336552879&4294967295,w=p+(g<<12&4294967295|g>>>20),g=T+(y^w&(p^y))+E[10]+4294925233&4294967295,T=w+(g<<17&4294967295|g>>>15),g=y+(p^T&(w^p))+E[11]+2304563134&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(w^y&(T^w))+E[12]+1804603682&4294967295,p=y+(g<<7&4294967295|g>>>25),g=w+(T^p&(y^T))+E[13]+4254626195&4294967295,w=p+(g<<12&4294967295|g>>>20),g=T+(y^w&(p^y))+E[14]+2792965006&4294967295,T=w+(g<<17&4294967295|g>>>15),g=y+(p^T&(w^p))+E[15]+1236535329&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(T^w&(y^T))+E[1]+4129170786&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^T&(p^y))+E[6]+3225465664&4294967295,w=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(w^p))+E[11]+643717713&4294967295,T=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(T^w))+E[0]+3921069994&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^w&(y^T))+E[5]+3593408605&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^T&(p^y))+E[10]+38016083&4294967295,w=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(w^p))+E[15]+3634488961&4294967295,T=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(T^w))+E[4]+3889429448&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^w&(y^T))+E[9]+568446438&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^T&(p^y))+E[14]+3275163606&4294967295,w=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(w^p))+E[3]+4107603335&4294967295,T=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(T^w))+E[8]+1163531501&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^w&(y^T))+E[13]+2850285829&4294967295,p=y+(g<<5&4294967295|g>>>27),g=w+(y^T&(p^y))+E[2]+4243563512&4294967295,w=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(w^p))+E[7]+1735328473&4294967295,T=w+(g<<14&4294967295|g>>>18),g=y+(w^p&(T^w))+E[12]+2368359562&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(y^T^w)+E[5]+4294588738&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^T)+E[8]+2272392833&4294967295,w=p+(g<<11&4294967295|g>>>21),g=T+(w^p^y)+E[11]+1839030562&4294967295,T=w+(g<<16&4294967295|g>>>16),g=y+(T^w^p)+E[14]+4259657740&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^w)+E[1]+2763975236&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^T)+E[4]+1272893353&4294967295,w=p+(g<<11&4294967295|g>>>21),g=T+(w^p^y)+E[7]+4139469664&4294967295,T=w+(g<<16&4294967295|g>>>16),g=y+(T^w^p)+E[10]+3200236656&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^w)+E[13]+681279174&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^T)+E[0]+3936430074&4294967295,w=p+(g<<11&4294967295|g>>>21),g=T+(w^p^y)+E[3]+3572445317&4294967295,T=w+(g<<16&4294967295|g>>>16),g=y+(T^w^p)+E[6]+76029189&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^w)+E[9]+3654602809&4294967295,p=y+(g<<4&4294967295|g>>>28),g=w+(p^y^T)+E[12]+3873151461&4294967295,w=p+(g<<11&4294967295|g>>>21),g=T+(w^p^y)+E[15]+530742520&4294967295,T=w+(g<<16&4294967295|g>>>16),g=y+(T^w^p)+E[2]+3299628645&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(T^(y|~w))+E[0]+4096336452&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~T))+E[7]+1126891415&4294967295,w=p+(g<<10&4294967295|g>>>22),g=T+(p^(w|~y))+E[14]+2878612391&4294967295,T=w+(g<<15&4294967295|g>>>17),g=y+(w^(T|~p))+E[5]+4237533241&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~w))+E[12]+1700485571&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~T))+E[3]+2399980690&4294967295,w=p+(g<<10&4294967295|g>>>22),g=T+(p^(w|~y))+E[10]+4293915773&4294967295,T=w+(g<<15&4294967295|g>>>17),g=y+(w^(T|~p))+E[1]+2240044497&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~w))+E[8]+1873313359&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~T))+E[15]+4264355552&4294967295,w=p+(g<<10&4294967295|g>>>22),g=T+(p^(w|~y))+E[6]+2734768916&4294967295,T=w+(g<<15&4294967295|g>>>17),g=y+(w^(T|~p))+E[13]+1309151649&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~w))+E[4]+4149444226&4294967295,p=y+(g<<6&4294967295|g>>>26),g=w+(y^(p|~T))+E[11]+3174756917&4294967295,w=p+(g<<10&4294967295|g>>>22),g=T+(p^(w|~y))+E[2]+718787259&4294967295,T=w+(g<<15&4294967295|g>>>17),g=y+(w^(T|~p))+E[9]+3951481745&4294967295,A.g[0]=A.g[0]+p&4294967295,A.g[1]=A.g[1]+(T+(g<<21&4294967295|g>>>11))&4294967295,A.g[2]=A.g[2]+T&4294967295,A.g[3]=A.g[3]+w&4294967295}r.prototype.u=function(A,p){p===void 0&&(p=A.length);for(var y=p-this.blockSize,E=this.B,T=this.h,w=0;w<p;){if(T==0)for(;w<=y;)s(this,A,w),w+=this.blockSize;if(typeof A=="string"){for(;w<p;)if(E[T++]=A.charCodeAt(w++),T==this.blockSize){s(this,E),T=0;break}}else for(;w<p;)if(E[T++]=A[w++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=p},r.prototype.v=function(){var A=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);A[0]=128;for(var p=1;p<A.length-8;++p)A[p]=0;var y=8*this.o;for(p=A.length-8;p<A.length;++p)A[p]=y&255,y/=256;for(this.u(A),A=Array(16),p=y=0;4>p;++p)for(var E=0;32>E;E+=8)A[y++]=this.g[p]>>>E&255;return A};function o(A,p){var y=u;return Object.prototype.hasOwnProperty.call(y,A)?y[A]:y[A]=p(A)}function a(A,p){this.h=p;for(var y=[],E=!0,T=A.length-1;0<=T;T--){var w=A[T]|0;E&&w==p||(y[T]=w,E=!1)}this.g=y}var u={};function h(A){return-128<=A&&128>A?o(A,function(p){return new a([p|0],0>p?-1:0)}):new a([A|0],0>A?-1:0)}function d(A){if(isNaN(A)||!isFinite(A))return _;if(0>A)return V(d(-A));for(var p=[],y=1,E=0;A>=y;E++)p[E]=A/y|0,y*=4294967296;return new a(p,0)}function m(A,p){if(A.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(A.charAt(0)=="-")return V(m(A.substring(1),p));if(0<=A.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(p,8)),E=_,T=0;T<A.length;T+=8){var w=Math.min(8,A.length-T),g=parseInt(A.substring(T,T+w),p);8>w?(w=d(Math.pow(p,w)),E=E.j(w).add(d(g))):(E=E.j(y),E=E.add(d(g)))}return E}var _=h(0),v=h(1),R=h(16777216);n=a.prototype,n.m=function(){if(M(this))return-V(this).m();for(var A=0,p=1,y=0;y<this.g.length;y++){var E=this.i(y);A+=(0<=E?E:4294967296+E)*p,p*=4294967296}return A},n.toString=function(A){if(A=A||10,2>A||36<A)throw Error("radix out of range: "+A);if(S(this))return"0";if(M(this))return"-"+V(this).toString(A);for(var p=d(Math.pow(A,6)),y=this,E="";;){var T=nt(y,p).g;y=G(y,T.j(p));var w=((0<y.g.length?y.g[0]:y.h)>>>0).toString(A);if(y=T,S(y))return w+E;for(;6>w.length;)w="0"+w;E=w+E}},n.i=function(A){return 0>A?0:A<this.g.length?this.g[A]:this.h};function S(A){if(A.h!=0)return!1;for(var p=0;p<A.g.length;p++)if(A.g[p]!=0)return!1;return!0}function M(A){return A.h==-1}n.l=function(A){return A=G(this,A),M(A)?-1:S(A)?0:1};function V(A){for(var p=A.g.length,y=[],E=0;E<p;E++)y[E]=~A.g[E];return new a(y,~A.h).add(v)}n.abs=function(){return M(this)?V(this):this},n.add=function(A){for(var p=Math.max(this.g.length,A.g.length),y=[],E=0,T=0;T<=p;T++){var w=E+(this.i(T)&65535)+(A.i(T)&65535),g=(w>>>16)+(this.i(T)>>>16)+(A.i(T)>>>16);E=g>>>16,w&=65535,g&=65535,y[T]=g<<16|w}return new a(y,y[y.length-1]&-2147483648?-1:0)};function G(A,p){return A.add(V(p))}n.j=function(A){if(S(this)||S(A))return _;if(M(this))return M(A)?V(this).j(V(A)):V(V(this).j(A));if(M(A))return V(this.j(V(A)));if(0>this.l(R)&&0>A.l(R))return d(this.m()*A.m());for(var p=this.g.length+A.g.length,y=[],E=0;E<2*p;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<A.g.length;T++){var w=this.i(E)>>>16,g=this.i(E)&65535,Qt=A.i(T)>>>16,$e=A.i(T)&65535;y[2*E+2*T]+=g*$e,U(y,2*E+2*T),y[2*E+2*T+1]+=w*$e,U(y,2*E+2*T+1),y[2*E+2*T+1]+=g*Qt,U(y,2*E+2*T+1),y[2*E+2*T+2]+=w*Qt,U(y,2*E+2*T+2)}for(E=0;E<p;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=p;E<2*p;E++)y[E]=0;return new a(y,0)};function U(A,p){for(;(A[p]&65535)!=A[p];)A[p+1]+=A[p]>>>16,A[p]&=65535,p++}function $(A,p){this.g=A,this.h=p}function nt(A,p){if(S(p))throw Error("division by zero");if(S(A))return new $(_,_);if(M(A))return p=nt(V(A),p),new $(V(p.g),V(p.h));if(M(p))return p=nt(A,V(p)),new $(V(p.g),p.h);if(30<A.g.length){if(M(A)||M(p))throw Error("slowDivide_ only works with positive integers.");for(var y=v,E=p;0>=E.l(A);)y=Ft(y),E=Ft(E);var T=lt(y,1),w=lt(E,1);for(E=lt(E,2),y=lt(y,2);!S(E);){var g=w.add(E);0>=g.l(A)&&(T=T.add(y),w=g),E=lt(E,1),y=lt(y,1)}return p=G(A,T.j(p)),new $(T,p)}for(T=_;0<=A.l(p);){for(y=Math.max(1,Math.floor(A.m()/p.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),w=d(y),g=w.j(p);M(g)||0<g.l(A);)y-=E,w=d(y),g=w.j(p);S(w)&&(w=v),T=T.add(w),A=G(A,g)}return new $(T,A)}n.A=function(A){return nt(this,A).h},n.and=function(A){for(var p=Math.max(this.g.length,A.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)&A.i(E);return new a(y,this.h&A.h)},n.or=function(A){for(var p=Math.max(this.g.length,A.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)|A.i(E);return new a(y,this.h|A.h)},n.xor=function(A){for(var p=Math.max(this.g.length,A.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)^A.i(E);return new a(y,this.h^A.h)};function Ft(A){for(var p=A.g.length+1,y=[],E=0;E<p;E++)y[E]=A.i(E)<<1|A.i(E-1)>>>31;return new a(y,A.h)}function lt(A,p){var y=p>>5;p%=32;for(var E=A.g.length-y,T=[],w=0;w<E;w++)T[w]=0<p?A.i(w+y)>>>p|A.i(w+y+1)<<32-p:A.i(w+y);return new a(T,A.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,ol=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,te=a}).apply(typeof Yo<"u"?Yo:typeof self<"u"?self:typeof window<"u"?window:{});var nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var al,cn,ll,ar,Ss,cl,ul,hl;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,l,c){return i==Array.prototype||i==Object.prototype||(i[l]=c.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof nr=="object"&&nr];for(var l=0;l<i.length;++l){var c=i[l];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function s(i,l){if(l)t:{var c=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var I=i[f];if(!(I in c))break t;c=c[I]}i=i[i.length-1],f=c[i],l=l(f),l!=f&&l!=null&&t(c,i,{configurable:!0,writable:!0,value:l})}}function o(i,l){i instanceof String&&(i+="");var c=0,f=!1,I={next:function(){if(!f&&c<i.length){var b=c++;return{value:l(b,i[b]),done:!1}}return f=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(i){return i||function(){return o(this,function(l,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function h(i){var l=typeof i;return l=l!="object"?l:i?Array.isArray(i)?"array":l:"null",l=="array"||l=="object"&&typeof i.length=="number"}function d(i){var l=typeof i;return l=="object"&&i!=null||l=="function"}function m(i,l,c){return i.call.apply(i.bind,arguments)}function _(i,l,c){if(!i)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,f),i.apply(l,I)}}return function(){return i.apply(l,arguments)}}function v(i,l,c){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:_,v.apply(null,arguments)}function R(i,l){var c=Array.prototype.slice.call(arguments,1);return function(){var f=c.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function S(i,l){function c(){}c.prototype=l.prototype,i.aa=l.prototype,i.prototype=new c,i.prototype.constructor=i,i.Qb=function(f,I,b){for(var k=Array(arguments.length-2),W=2;W<arguments.length;W++)k[W-2]=arguments[W];return l.prototype[I].apply(f,k)}}function M(i){const l=i.length;if(0<l){const c=Array(l);for(let f=0;f<l;f++)c[f]=i[f];return c}return[]}function V(i,l){for(let c=1;c<arguments.length;c++){const f=arguments[c];if(h(f)){const I=i.length||0,b=f.length||0;i.length=I+b;for(let k=0;k<b;k++)i[I+k]=f[k]}else i.push(f)}}class G{constructor(l,c){this.i=l,this.j=c,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function U(i){return/^[\s\xa0]*$/.test(i)}function $(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function nt(i){return nt[" "](i),i}nt[" "]=function(){};var Ft=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function lt(i,l,c){for(const f in i)l.call(c,i[f],f,i)}function A(i,l){for(const c in i)l.call(void 0,i[c],c,i)}function p(i){const l={};for(const c in i)l[c]=i[c];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(i,l){let c,f;for(let I=1;I<arguments.length;I++){f=arguments[I];for(c in f)i[c]=f[c];for(let b=0;b<y.length;b++)c=y[b],Object.prototype.hasOwnProperty.call(f,c)&&(i[c]=f[c])}}function T(i){var l=1;i=i.split(":");const c=[];for(;0<l&&i.length;)c.push(i.shift()),l--;return i.length&&c.push(i.join(":")),c}function w(i){u.setTimeout(()=>{throw i},0)}function g(){var i=$r;let l=null;return i.g&&(l=i.g,i.g=i.g.next,i.g||(i.h=null),l.next=null),l}class Qt{constructor(){this.h=this.g=null}add(l,c){const f=$e.get();f.set(l,c),this.h?this.h.next=f:this.g=f,this.h=f}}var $e=new G(()=>new Qc,i=>i.reset());class Qc{constructor(){this.next=this.g=this.h=null}set(l,c){this.h=l,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let ze,He=!1,$r=new Qt,Fi=()=>{const i=u.Promise.resolve(void 0);ze=()=>{i.then(Uc)}};var Uc=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(c){w(c)}var l=$e;l.j(i),100>l.h&&(l.h++,i.next=l.g,l.g=i)}He=!1};function Ht(){this.s=this.s,this.C=this.C}Ht.prototype.s=!1,Ht.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ht.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ft(i,l){this.type=i,this.g=this.target=l,this.defaultPrevented=!1}ft.prototype.h=function(){this.defaultPrevented=!0};var Bc=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,l=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};u.addEventListener("test",c,l),u.removeEventListener("test",c,l)}catch{}return i})();function We(i,l){if(ft.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var c=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=l,l=i.relatedTarget){if(Ft){t:{try{nt(l.nodeName);var I=!0;break t}catch{}I=!1}I||(l=null)}}else c=="mouseover"?l=i.fromElement:c=="mouseout"&&(l=i.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:qc[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&We.aa.h.call(this)}}S(We,ft);var qc={2:"touch",3:"pen",4:"mouse"};We.prototype.h=function(){We.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var On="closure_listenable_"+(1e6*Math.random()|0),jc=0;function Gc(i,l,c,f,I){this.listener=i,this.proxy=null,this.src=l,this.type=c,this.capture=!!f,this.ha=I,this.key=++jc,this.da=this.fa=!1}function Fn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Qn(i){this.src=i,this.g={},this.h=0}Qn.prototype.add=function(i,l,c,f,I){var b=i.toString();i=this.g[b],i||(i=this.g[b]=[],this.h++);var k=Hr(i,l,f,I);return-1<k?(l=i[k],c||(l.fa=!1)):(l=new Gc(l,this.src,b,!!f,I),l.fa=c,i.push(l)),l};function zr(i,l){var c=l.type;if(c in i.g){var f=i.g[c],I=Array.prototype.indexOf.call(f,l,void 0),b;(b=0<=I)&&Array.prototype.splice.call(f,I,1),b&&(Fn(l),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Hr(i,l,c,f){for(var I=0;I<i.length;++I){var b=i[I];if(!b.da&&b.listener==l&&b.capture==!!c&&b.ha==f)return I}return-1}var Wr="closure_lm_"+(1e6*Math.random()|0),Kr={};function Qi(i,l,c,f,I){if(Array.isArray(l)){for(var b=0;b<l.length;b++)Qi(i,l[b],c,f,I);return null}return c=qi(c),i&&i[On]?i.K(l,c,d(f)?!!f.capture:!1,I):$c(i,l,c,!1,f,I)}function $c(i,l,c,f,I,b){if(!l)throw Error("Invalid event type");var k=d(I)?!!I.capture:!!I,W=Jr(i);if(W||(i[Wr]=W=new Qn(i)),c=W.add(l,c,f,k,b),c.proxy)return c;if(f=zc(),c.proxy=f,f.src=i,f.listener=c,i.addEventListener)Bc||(I=k),I===void 0&&(I=!1),i.addEventListener(l.toString(),f,I);else if(i.attachEvent)i.attachEvent(Bi(l.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return c}function zc(){function i(c){return l.call(i.src,i.listener,c)}const l=Hc;return i}function Ui(i,l,c,f,I){if(Array.isArray(l))for(var b=0;b<l.length;b++)Ui(i,l[b],c,f,I);else f=d(f)?!!f.capture:!!f,c=qi(c),i&&i[On]?(i=i.i,l=String(l).toString(),l in i.g&&(b=i.g[l],c=Hr(b,c,f,I),-1<c&&(Fn(b[c]),Array.prototype.splice.call(b,c,1),b.length==0&&(delete i.g[l],i.h--)))):i&&(i=Jr(i))&&(l=i.g[l.toString()],i=-1,l&&(i=Hr(l,c,f,I)),(c=-1<i?l[i]:null)&&Yr(c))}function Yr(i){if(typeof i!="number"&&i&&!i.da){var l=i.src;if(l&&l[On])zr(l.i,i);else{var c=i.type,f=i.proxy;l.removeEventListener?l.removeEventListener(c,f,i.capture):l.detachEvent?l.detachEvent(Bi(c),f):l.addListener&&l.removeListener&&l.removeListener(f),(c=Jr(l))?(zr(c,i),c.h==0&&(c.src=null,l[Wr]=null)):Fn(i)}}}function Bi(i){return i in Kr?Kr[i]:Kr[i]="on"+i}function Hc(i,l){if(i.da)i=!0;else{l=new We(l,this);var c=i.listener,f=i.ha||i.src;i.fa&&Yr(i),i=c.call(f,l)}return i}function Jr(i){return i=i[Wr],i instanceof Qn?i:null}var Xr="__closure_events_fn_"+(1e9*Math.random()>>>0);function qi(i){return typeof i=="function"?i:(i[Xr]||(i[Xr]=function(l){return i.handleEvent(l)}),i[Xr])}function mt(){Ht.call(this),this.i=new Qn(this),this.M=this,this.F=null}S(mt,Ht),mt.prototype[On]=!0,mt.prototype.removeEventListener=function(i,l,c,f){Ui(this,i,l,c,f)};function vt(i,l){var c,f=i.F;if(f)for(c=[];f;f=f.F)c.push(f);if(i=i.M,f=l.type||l,typeof l=="string")l=new ft(l,i);else if(l instanceof ft)l.target=l.target||i;else{var I=l;l=new ft(f,i),E(l,I)}if(I=!0,c)for(var b=c.length-1;0<=b;b--){var k=l.g=c[b];I=Un(k,f,!0,l)&&I}if(k=l.g=i,I=Un(k,f,!0,l)&&I,I=Un(k,f,!1,l)&&I,c)for(b=0;b<c.length;b++)k=l.g=c[b],I=Un(k,f,!1,l)&&I}mt.prototype.N=function(){if(mt.aa.N.call(this),this.i){var i=this.i,l;for(l in i.g){for(var c=i.g[l],f=0;f<c.length;f++)Fn(c[f]);delete i.g[l],i.h--}}this.F=null},mt.prototype.K=function(i,l,c,f){return this.i.add(String(i),l,!1,c,f)},mt.prototype.L=function(i,l,c,f){return this.i.add(String(i),l,!0,c,f)};function Un(i,l,c,f){if(l=i.i.g[String(l)],!l)return!0;l=l.concat();for(var I=!0,b=0;b<l.length;++b){var k=l[b];if(k&&!k.da&&k.capture==c){var W=k.listener,ct=k.ha||k.src;k.fa&&zr(i.i,k),I=W.call(ct,f)!==!1&&I}}return I&&!f.defaultPrevented}function ji(i,l,c){if(typeof i=="function")c&&(i=v(i,c));else if(i&&typeof i.handleEvent=="function")i=v(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(i,l||0)}function Gi(i){i.g=ji(()=>{i.g=null,i.i&&(i.i=!1,Gi(i))},i.l);const l=i.h;i.h=null,i.m.apply(null,l)}class Wc extends Ht{constructor(l,c){super(),this.m=l,this.l=c,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Gi(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ke(i){Ht.call(this),this.h=i,this.g={}}S(Ke,Ht);var $i=[];function zi(i){lt(i.g,function(l,c){this.g.hasOwnProperty(c)&&Yr(l)},i),i.g={}}Ke.prototype.N=function(){Ke.aa.N.call(this),zi(this)},Ke.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Zr=u.JSON.stringify,Kc=u.JSON.parse,Yc=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function ts(){}ts.prototype.h=null;function Hi(i){return i.h||(i.h=i.i())}function Wi(){}var Ye={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function es(){ft.call(this,"d")}S(es,ft);function ns(){ft.call(this,"c")}S(ns,ft);var de={},Ki=null;function Bn(){return Ki=Ki||new mt}de.La="serverreachability";function Yi(i){ft.call(this,de.La,i)}S(Yi,ft);function Je(i){const l=Bn();vt(l,new Yi(l))}de.STAT_EVENT="statevent";function Ji(i,l){ft.call(this,de.STAT_EVENT,i),this.stat=l}S(Ji,ft);function Tt(i){const l=Bn();vt(l,new Ji(l,i))}de.Ma="timingevent";function Xi(i,l){ft.call(this,de.Ma,i),this.size=l}S(Xi,ft);function Xe(i,l){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},l)}function Ze(){this.g=!0}Ze.prototype.xa=function(){this.g=!1};function Jc(i,l,c,f,I,b){i.info(function(){if(i.g)if(b)for(var k="",W=b.split("&"),ct=0;ct<W.length;ct++){var z=W[ct].split("=");if(1<z.length){var pt=z[0];z=z[1];var gt=pt.split("_");k=2<=gt.length&&gt[1]=="type"?k+(pt+"="+z+"&"):k+(pt+"=redacted&")}}else k=null;else k=b;return"XMLHTTP REQ ("+f+") [attempt "+I+"]: "+l+`
`+c+`
`+k})}function Xc(i,l,c,f,I,b,k){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+I+"]: "+l+`
`+c+`
`+b+" "+k})}function we(i,l,c,f){i.info(function(){return"XMLHTTP TEXT ("+l+"): "+tu(i,c)+(f?" "+f:"")})}function Zc(i,l){i.info(function(){return"TIMEOUT: "+l})}Ze.prototype.info=function(){};function tu(i,l){if(!i.g)return l;if(!l)return null;try{var c=JSON.parse(l);if(c){for(i=0;i<c.length;i++)if(Array.isArray(c[i])){var f=c[i];if(!(2>f.length)){var I=f[1];if(Array.isArray(I)&&!(1>I.length)){var b=I[0];if(b!="noop"&&b!="stop"&&b!="close")for(var k=1;k<I.length;k++)I[k]=""}}}}return Zr(c)}catch{return l}}var qn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Zi={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},rs;function jn(){}S(jn,ts),jn.prototype.g=function(){return new XMLHttpRequest},jn.prototype.i=function(){return{}},rs=new jn;function Wt(i,l,c,f){this.j=i,this.i=l,this.l=c,this.R=f||1,this.U=new Ke(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new to}function to(){this.i=null,this.g="",this.h=!1}var eo={},ss={};function is(i,l,c){i.L=1,i.v=Hn(Ut(l)),i.m=c,i.P=!0,no(i,null)}function no(i,l){i.F=Date.now(),Gn(i),i.A=Ut(i.v);var c=i.A,f=i.R;Array.isArray(f)||(f=[String(f)]),yo(c.i,"t",f),i.C=0,c=i.j.J,i.h=new to,i.g=Lo(i.j,c?l:null,!i.m),0<i.O&&(i.M=new Wc(v(i.Y,i,i.g),i.O)),l=i.U,c=i.g,f=i.ca;var I="readystatechange";Array.isArray(I)||(I&&($i[0]=I.toString()),I=$i);for(var b=0;b<I.length;b++){var k=Qi(c,I[b],f||l.handleEvent,!1,l.h||l);if(!k)break;l.g[k.key]=k}l=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,l)):(i.u="GET",i.g.ea(i.A,i.u,null,l)),Je(),Jc(i.i,i.u,i.A,i.l,i.R,i.m)}Wt.prototype.ca=function(i){i=i.target;const l=this.M;l&&Bt(i)==3?l.j():this.Y(i)},Wt.prototype.Y=function(i){try{if(i==this.g)t:{const gt=Bt(this.g);var l=this.g.Ba();const Pe=this.g.Z();if(!(3>gt)&&(gt!=3||this.g&&(this.h.h||this.g.oa()||wo(this.g)))){this.J||gt!=4||l==7||(l==8||0>=Pe?Je(3):Je(2)),os(this);var c=this.g.Z();this.X=c;e:if(ro(this)){var f=wo(this.g);i="";var I=f.length,b=Bt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){fe(this),tn(this);var k="";break e}this.h.i=new u.TextDecoder}for(l=0;l<I;l++)this.h.h=!0,i+=this.h.i.decode(f[l],{stream:!(b&&l==I-1)});f.length=0,this.h.g+=i,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=c==200,Xc(this.i,this.u,this.A,this.l,this.R,gt,c),this.o){if(this.T&&!this.K){e:{if(this.g){var W,ct=this.g;if((W=ct.g?ct.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(W)){var z=W;break e}}z=null}if(c=z)we(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,as(this,c);else{this.o=!1,this.s=3,Tt(12),fe(this),tn(this);break t}}if(this.P){c=!0;let St;for(;!this.J&&this.C<k.length;)if(St=eu(this,k),St==ss){gt==4&&(this.s=4,Tt(14),c=!1),we(this.i,this.l,null,"[Incomplete Response]");break}else if(St==eo){this.s=4,Tt(15),we(this.i,this.l,k,"[Invalid Chunk]"),c=!1;break}else we(this.i,this.l,St,null),as(this,St);if(ro(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),gt!=4||k.length!=0||this.h.h||(this.s=1,Tt(16),c=!1),this.o=this.o&&c,!c)we(this.i,this.l,k,"[Invalid Chunked Response]"),fe(this),tn(this);else if(0<k.length&&!this.W){this.W=!0;var pt=this.j;pt.g==this&&pt.ba&&!pt.M&&(pt.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),fs(pt),pt.M=!0,Tt(11))}}else we(this.i,this.l,k,null),as(this,k);gt==4&&fe(this),this.o&&!this.J&&(gt==4?Vo(this.j,this):(this.o=!1,Gn(this)))}else _u(this.g),c==400&&0<k.indexOf("Unknown SID")?(this.s=3,Tt(12)):(this.s=0,Tt(13)),fe(this),tn(this)}}}catch{}finally{}};function ro(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function eu(i,l){var c=i.C,f=l.indexOf(`
`,c);return f==-1?ss:(c=Number(l.substring(c,f)),isNaN(c)?eo:(f+=1,f+c>l.length?ss:(l=l.slice(f,f+c),i.C=f+c,l)))}Wt.prototype.cancel=function(){this.J=!0,fe(this)};function Gn(i){i.S=Date.now()+i.I,so(i,i.I)}function so(i,l){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Xe(v(i.ba,i),l)}function os(i){i.B&&(u.clearTimeout(i.B),i.B=null)}Wt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Zc(this.i,this.A),this.L!=2&&(Je(),Tt(17)),fe(this),this.s=2,tn(this)):so(this,this.S-i)};function tn(i){i.j.G==0||i.J||Vo(i.j,i)}function fe(i){os(i);var l=i.M;l&&typeof l.ma=="function"&&l.ma(),i.M=null,zi(i.U),i.g&&(l=i.g,i.g=null,l.abort(),l.ma())}function as(i,l){try{var c=i.j;if(c.G!=0&&(c.g==i||ls(c.h,i))){if(!i.K&&ls(c.h,i)&&c.G==3){try{var f=c.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var I=f;if(I[0]==0){t:if(!c.u){if(c.g)if(c.g.F+3e3<i.F)Zn(c),Jn(c);else break t;ds(c),Tt(18)}}else c.za=I[1],0<c.za-c.T&&37500>I[2]&&c.F&&c.v==0&&!c.C&&(c.C=Xe(v(c.Za,c),6e3));if(1>=ao(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else pe(c,11)}else if((i.K||c.g==i)&&Zn(c),!U(l))for(I=c.Da.g.parse(l),l=0;l<I.length;l++){let z=I[l];if(c.T=z[0],z=z[1],c.G==2)if(z[0]=="c"){c.K=z[1],c.ia=z[2];const pt=z[3];pt!=null&&(c.la=pt,c.j.info("VER="+c.la));const gt=z[4];gt!=null&&(c.Aa=gt,c.j.info("SVER="+c.Aa));const Pe=z[5];Pe!=null&&typeof Pe=="number"&&0<Pe&&(f=1.5*Pe,c.L=f,c.j.info("backChannelRequestTimeoutMs_="+f)),f=c;const St=i.g;if(St){const er=St.g?St.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(er){var b=f.h;b.g||er.indexOf("spdy")==-1&&er.indexOf("quic")==-1&&er.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(cs(b,b.h),b.h=null))}if(f.D){const ms=St.g?St.g.getResponseHeader("X-HTTP-Session-Id"):null;ms&&(f.ya=ms,Y(f.I,f.D,ms))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-i.F,c.j.info("Handshake RTT: "+c.R+"ms")),f=c;var k=i;if(f.qa=Mo(f,f.J?f.ia:null,f.W),k.K){lo(f.h,k);var W=k,ct=f.L;ct&&(W.I=ct),W.B&&(os(W),Gn(W)),f.g=k}else So(f);0<c.i.length&&Xn(c)}else z[0]!="stop"&&z[0]!="close"||pe(c,7);else c.G==3&&(z[0]=="stop"||z[0]=="close"?z[0]=="stop"?pe(c,7):hs(c):z[0]!="noop"&&c.l&&c.l.ta(z),c.v=0)}}Je(4)}catch{}}var nu=class{constructor(i,l){this.g=i,this.map=l}};function io(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function oo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function ao(i){return i.h?1:i.g?i.g.size:0}function ls(i,l){return i.h?i.h==l:i.g?i.g.has(l):!1}function cs(i,l){i.g?i.g.add(l):i.h=l}function lo(i,l){i.h&&i.h==l?i.h=null:i.g&&i.g.has(l)&&i.g.delete(l)}io.prototype.cancel=function(){if(this.i=co(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function co(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let l=i.i;for(const c of i.g.values())l=l.concat(c.D);return l}return M(i.i)}function ru(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var l=[],c=i.length,f=0;f<c;f++)l.push(i[f]);return l}l=[],c=0;for(f in i)l[c++]=i[f];return l}function su(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var l=[];i=i.length;for(var c=0;c<i;c++)l.push(c);return l}l=[],c=0;for(const f in i)l[c++]=f;return l}}}function uo(i,l){if(i.forEach&&typeof i.forEach=="function")i.forEach(l,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,l,void 0);else for(var c=su(i),f=ru(i),I=f.length,b=0;b<I;b++)l.call(void 0,f[b],c&&c[b],i)}var ho=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function iu(i,l){if(i){i=i.split("&");for(var c=0;c<i.length;c++){var f=i[c].indexOf("="),I=null;if(0<=f){var b=i[c].substring(0,f);I=i[c].substring(f+1)}else b=i[c];l(b,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function me(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof me){this.h=i.h,$n(this,i.j),this.o=i.o,this.g=i.g,zn(this,i.s),this.l=i.l;var l=i.i,c=new rn;c.i=l.i,l.g&&(c.g=new Map(l.g),c.h=l.h),fo(this,c),this.m=i.m}else i&&(l=String(i).match(ho))?(this.h=!1,$n(this,l[1]||"",!0),this.o=en(l[2]||""),this.g=en(l[3]||"",!0),zn(this,l[4]),this.l=en(l[5]||"",!0),fo(this,l[6]||"",!0),this.m=en(l[7]||"")):(this.h=!1,this.i=new rn(null,this.h))}me.prototype.toString=function(){var i=[],l=this.j;l&&i.push(nn(l,mo,!0),":");var c=this.g;return(c||l=="file")&&(i.push("//"),(l=this.o)&&i.push(nn(l,mo,!0),"@"),i.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&i.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(nn(c,c.charAt(0)=="/"?lu:au,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",nn(c,uu)),i.join("")};function Ut(i){return new me(i)}function $n(i,l,c){i.j=c?en(l,!0):l,i.j&&(i.j=i.j.replace(/:$/,""))}function zn(i,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);i.s=l}else i.s=null}function fo(i,l,c){l instanceof rn?(i.i=l,hu(i.i,i.h)):(c||(l=nn(l,cu)),i.i=new rn(l,i.h))}function Y(i,l,c){i.i.set(l,c)}function Hn(i){return Y(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function en(i,l){return i?l?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function nn(i,l,c){return typeof i=="string"?(i=encodeURI(i).replace(l,ou),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function ou(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var mo=/[#\/\?@]/g,au=/[#\?:]/g,lu=/[#\?]/g,cu=/[#\?@]/g,uu=/#/g;function rn(i,l){this.h=this.g=null,this.i=i||null,this.j=!!l}function Kt(i){i.g||(i.g=new Map,i.h=0,i.i&&iu(i.i,function(l,c){i.add(decodeURIComponent(l.replace(/\+/g," ")),c)}))}n=rn.prototype,n.add=function(i,l){Kt(this),this.i=null,i=be(this,i);var c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(l),this.h+=1,this};function po(i,l){Kt(i),l=be(i,l),i.g.has(l)&&(i.i=null,i.h-=i.g.get(l).length,i.g.delete(l))}function go(i,l){return Kt(i),l=be(i,l),i.g.has(l)}n.forEach=function(i,l){Kt(this),this.g.forEach(function(c,f){c.forEach(function(I){i.call(l,I,f,this)},this)},this)},n.na=function(){Kt(this);const i=Array.from(this.g.values()),l=Array.from(this.g.keys()),c=[];for(let f=0;f<l.length;f++){const I=i[f];for(let b=0;b<I.length;b++)c.push(l[f])}return c},n.V=function(i){Kt(this);let l=[];if(typeof i=="string")go(this,i)&&(l=l.concat(this.g.get(be(this,i))));else{i=Array.from(this.g.values());for(let c=0;c<i.length;c++)l=l.concat(i[c])}return l},n.set=function(i,l){return Kt(this),this.i=null,i=be(this,i),go(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[l]),this.h+=1,this},n.get=function(i,l){return i?(i=this.V(i),0<i.length?String(i[0]):l):l};function yo(i,l,c){po(i,l),0<c.length&&(i.i=null,i.g.set(be(i,l),M(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],l=Array.from(this.g.keys());for(var c=0;c<l.length;c++){var f=l[c];const b=encodeURIComponent(String(f)),k=this.V(f);for(f=0;f<k.length;f++){var I=b;k[f]!==""&&(I+="="+encodeURIComponent(String(k[f]))),i.push(I)}}return this.i=i.join("&")};function be(i,l){return l=String(l),i.j&&(l=l.toLowerCase()),l}function hu(i,l){l&&!i.j&&(Kt(i),i.i=null,i.g.forEach(function(c,f){var I=f.toLowerCase();f!=I&&(po(this,f),yo(this,I,c))},i)),i.j=l}function du(i,l){const c=new Ze;if(u.Image){const f=new Image;f.onload=R(Yt,c,"TestLoadImage: loaded",!0,l,f),f.onerror=R(Yt,c,"TestLoadImage: error",!1,l,f),f.onabort=R(Yt,c,"TestLoadImage: abort",!1,l,f),f.ontimeout=R(Yt,c,"TestLoadImage: timeout",!1,l,f),u.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else l(!1)}function fu(i,l){const c=new Ze,f=new AbortController,I=setTimeout(()=>{f.abort(),Yt(c,"TestPingServer: timeout",!1,l)},1e4);fetch(i,{signal:f.signal}).then(b=>{clearTimeout(I),b.ok?Yt(c,"TestPingServer: ok",!0,l):Yt(c,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(I),Yt(c,"TestPingServer: error",!1,l)})}function Yt(i,l,c,f,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),f(c)}catch{}}function mu(){this.g=new Yc}function pu(i,l,c){const f=c||"";try{uo(i,function(I,b){let k=I;d(I)&&(k=Zr(I)),l.push(f+b+"="+encodeURIComponent(k))})}catch(I){throw l.push(f+"type="+encodeURIComponent("_badmap")),I}}function Wn(i){this.l=i.Ub||null,this.j=i.eb||!1}S(Wn,ts),Wn.prototype.g=function(){return new Kn(this.l,this.j)},Wn.prototype.i=(function(i){return function(){return i}})({});function Kn(i,l){mt.call(this),this.D=i,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(Kn,mt),n=Kn.prototype,n.open=function(i,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=l,this.readyState=1,on(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(l.body=i),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,sn(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,on(this)),this.g&&(this.readyState=3,on(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_o(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function _o(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var l=i.value?i.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!i.done}))&&(this.response=this.responseText+=l)}i.done?sn(this):on(this),this.readyState==3&&_o(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,sn(this))},n.Qa=function(i){this.g&&(this.response=i,sn(this))},n.ga=function(){this.g&&sn(this)};function sn(i){i.readyState=4,i.l=null,i.j=null,i.v=null,on(i)}n.setRequestHeader=function(i,l){this.u.append(i,l)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],l=this.h.entries();for(var c=l.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=l.next();return i.join(`\r
`)};function on(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Kn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Eo(i){let l="";return lt(i,function(c,f){l+=f,l+=":",l+=c,l+=`\r
`}),l}function us(i,l,c){t:{for(f in c){var f=!1;break t}f=!0}f||(c=Eo(c),typeof i=="string"?c!=null&&encodeURIComponent(String(c)):Y(i,l,c))}function Z(i){mt.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(Z,mt);var gu=/^https?$/i,yu=["POST","PUT"];n=Z.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,l,c,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);l=l?l.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():rs.g(),this.v=this.o?Hi(this.o):Hi(rs),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(l,String(i),!0),this.B=!1}catch(b){vo(this,b);return}if(i=c||"",c=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var I in f)c.set(I,f[I]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const b of f.keys())c.set(b,f.get(b));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(c.keys()).find(b=>b.toLowerCase()=="content-type"),I=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(yu,l,void 0))||f||I||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,k]of c)this.g.setRequestHeader(b,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Io(this),this.u=!0,this.g.send(i),this.u=!1}catch(b){vo(this,b)}};function vo(i,l){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=l,i.m=5,To(i),Yn(i)}function To(i){i.A||(i.A=!0,vt(i,"complete"),vt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,vt(this,"complete"),vt(this,"abort"),Yn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Yn(this,!0)),Z.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ao(this):this.bb())},n.bb=function(){Ao(this)};function Ao(i){if(i.h&&typeof a<"u"&&(!i.v[1]||Bt(i)!=4||i.Z()!=2)){if(i.u&&Bt(i)==4)ji(i.Ea,0,i);else if(vt(i,"readystatechange"),Bt(i)==4){i.h=!1;try{const k=i.Z();t:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var c;if(!(c=l)){var f;if(f=k===0){var I=String(i.D).match(ho)[1]||null;!I&&u.self&&u.self.location&&(I=u.self.location.protocol.slice(0,-1)),f=!gu.test(I?I.toLowerCase():"")}c=f}if(c)vt(i,"complete"),vt(i,"success");else{i.m=6;try{var b=2<Bt(i)?i.g.statusText:""}catch{b=""}i.l=b+" ["+i.Z()+"]",To(i)}}finally{Yn(i)}}}}function Yn(i,l){if(i.g){Io(i);const c=i.g,f=i.v[0]?()=>{}:null;i.g=null,i.v=null,l||vt(i,"ready");try{c.onreadystatechange=f}catch{}}}function Io(i){i.I&&(u.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Bt(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Bt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var l=this.g.responseText;return i&&l.indexOf(i)==0&&(l=l.substring(i.length)),Kc(l)}};function wo(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function _u(i){const l={};i=(i.g&&2<=Bt(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(U(i[f]))continue;var c=T(i[f]);const I=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const b=l[I]||[];l[I]=b,b.push(c)}A(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function an(i,l,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||l}function bo(i){this.Aa=0,this.i=[],this.j=new Ze,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=an("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=an("baseRetryDelayMs",5e3,i),this.cb=an("retryDelaySeedMs",1e4,i),this.Wa=an("forwardChannelMaxRetries",2,i),this.wa=an("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new io(i&&i.concurrentRequestLimit),this.Da=new mu,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=bo.prototype,n.la=8,n.G=1,n.connect=function(i,l,c,f){Tt(0),this.W=i,this.H=l||{},c&&f!==void 0&&(this.H.OSID=c,this.H.OAID=f),this.F=this.X,this.I=Mo(this,null,this.W),Xn(this)};function hs(i){if(Co(i),i.G==3){var l=i.U++,c=Ut(i.I);if(Y(c,"SID",i.K),Y(c,"RID",l),Y(c,"TYPE","terminate"),ln(i,c),l=new Wt(i,i.j,l),l.L=2,l.v=Hn(Ut(c)),c=!1,u.navigator&&u.navigator.sendBeacon)try{c=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!c&&u.Image&&(new Image().src=l.v,c=!0),c||(l.g=Lo(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Gn(l)}No(i)}function Jn(i){i.g&&(fs(i),i.g.cancel(),i.g=null)}function Co(i){Jn(i),i.u&&(u.clearTimeout(i.u),i.u=null),Zn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function Xn(i){if(!oo(i.h)&&!i.s){i.s=!0;var l=i.Ga;ze||Fi(),He||(ze(),He=!0),$r.add(l,i),i.B=0}}function Eu(i,l){return ao(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=l.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Xe(v(i.Ga,i,l),Do(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const I=new Wt(this,this.j,i);let b=this.o;if(this.S&&(b?(b=p(b),E(b,this.S)):b=this.S),this.m!==null||this.O||(I.H=b,b=null),this.P)t:{for(var l=0,c=0;c<this.i.length;c++){e:{var f=this.i[c];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=c;break t}if(l===4096||c===this.i.length-1){l=c+1;break t}}l=1e3}else l=1e3;l=Ro(this,I,l),c=Ut(this.I),Y(c,"RID",i),Y(c,"CVER",22),this.D&&Y(c,"X-HTTP-Session-Id",this.D),ln(this,c),b&&(this.O?l="headers="+encodeURIComponent(String(Eo(b)))+"&"+l:this.m&&us(c,this.m,b)),cs(this.h,I),this.Ua&&Y(c,"TYPE","init"),this.P?(Y(c,"$req",l),Y(c,"SID","null"),I.T=!0,is(I,c,null)):is(I,c,l),this.G=2}}else this.G==3&&(i?Po(this,i):this.i.length==0||oo(this.h)||Po(this))};function Po(i,l){var c;l?c=l.l:c=i.U++;const f=Ut(i.I);Y(f,"SID",i.K),Y(f,"RID",c),Y(f,"AID",i.T),ln(i,f),i.m&&i.o&&us(f,i.m,i.o),c=new Wt(i,i.j,c,i.B+1),i.m===null&&(c.H=i.o),l&&(i.i=l.D.concat(i.i)),l=Ro(i,c,1e3),c.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),cs(i.h,c),is(c,f,l)}function ln(i,l){i.H&&lt(i.H,function(c,f){Y(l,f,c)}),i.l&&uo({},function(c,f){Y(l,f,c)})}function Ro(i,l,c){c=Math.min(i.i.length,c);var f=i.l?v(i.l.Na,i.l,i):null;t:{var I=i.i;let b=-1;for(;;){const k=["count="+c];b==-1?0<c?(b=I[0].g,k.push("ofs="+b)):b=0:k.push("ofs="+b);let W=!0;for(let ct=0;ct<c;ct++){let z=I[ct].g;const pt=I[ct].map;if(z-=b,0>z)b=Math.max(0,I[ct].g-100),W=!1;else try{pu(pt,k,"req"+z+"_")}catch{f&&f(pt)}}if(W){f=k.join("&");break t}}}return i=i.i.splice(0,c),l.D=i,f}function So(i){if(!i.g&&!i.u){i.Y=1;var l=i.Fa;ze||Fi(),He||(ze(),He=!0),$r.add(l,i),i.v=0}}function ds(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Xe(v(i.Fa,i),Do(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,ko(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Xe(v(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Tt(10),Jn(this),ko(this))};function fs(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function ko(i){i.g=new Wt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var l=Ut(i.qa);Y(l,"RID","rpc"),Y(l,"SID",i.K),Y(l,"AID",i.T),Y(l,"CI",i.F?"0":"1"),!i.F&&i.ja&&Y(l,"TO",i.ja),Y(l,"TYPE","xmlhttp"),ln(i,l),i.m&&i.o&&us(l,i.m,i.o),i.L&&(i.g.I=i.L);var c=i.g;i=i.ia,c.L=1,c.v=Hn(Ut(l)),c.m=null,c.P=!0,no(c,i)}n.Za=function(){this.C!=null&&(this.C=null,Jn(this),ds(this),Tt(19))};function Zn(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function Vo(i,l){var c=null;if(i.g==l){Zn(i),fs(i),i.g=null;var f=2}else if(ls(i.h,l))c=l.D,lo(i.h,l),f=1;else return;if(i.G!=0){if(l.o)if(f==1){c=l.m?l.m.length:0,l=Date.now()-l.F;var I=i.B;f=Bn(),vt(f,new Xi(f,c)),Xn(i)}else So(i);else if(I=l.s,I==3||I==0&&0<l.X||!(f==1&&Eu(i,l)||f==2&&ds(i)))switch(c&&0<c.length&&(l=i.h,l.i=l.i.concat(c)),I){case 1:pe(i,5);break;case 4:pe(i,10);break;case 3:pe(i,6);break;default:pe(i,2)}}}function Do(i,l){let c=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(c*=2),c*l}function pe(i,l){if(i.j.info("Error code "+l),l==2){var c=v(i.fb,i),f=i.Xa;const I=!f;f=new me(f||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||$n(f,"https"),Hn(f),I?du(f.toString(),c):fu(f.toString(),c)}else Tt(2);i.G=0,i.l&&i.l.sa(l),No(i),Co(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function No(i){if(i.G=0,i.ka=[],i.l){const l=co(i.h);(l.length!=0||i.i.length!=0)&&(V(i.ka,l),V(i.ka,i.i),i.h.i.length=0,M(i.i),i.i.length=0),i.l.ra()}}function Mo(i,l,c){var f=c instanceof me?Ut(c):new me(c);if(f.g!="")l&&(f.g=l+"."+f.g),zn(f,f.s);else{var I=u.location;f=I.protocol,l=l?l+"."+I.hostname:I.hostname,I=+I.port;var b=new me(null);f&&$n(b,f),l&&(b.g=l),I&&zn(b,I),c&&(b.l=c),f=b}return c=i.D,l=i.ya,c&&l&&Y(f,c,l),Y(f,"VER",i.la),ln(i,f),f}function Lo(i,l,c){if(l&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=i.Ca&&!i.pa?new Z(new Wn({eb:c})):new Z(i.pa),l.Ha(i.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function xo(){}n=xo.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function tr(){}tr.prototype.g=function(i,l){return new wt(i,l)};function wt(i,l){mt.call(this),this.g=new bo(l),this.l=i,this.h=l&&l.messageUrlParams||null,i=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(i?i["X-WebChannel-Content-Type"]=l.messageContentType:i={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(i?i["X-WebChannel-Client-Profile"]=l.va:i={"X-WebChannel-Client-Profile":l.va}),this.g.S=i,(i=l&&l.Sb)&&!U(i)&&(this.g.m=i),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!U(l)&&(this.g.D=l,i=this.h,i!==null&&l in i&&(i=this.h,l in i&&delete i[l])),this.j=new Ce(this)}S(wt,mt),wt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},wt.prototype.close=function(){hs(this.g)},wt.prototype.o=function(i){var l=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.u&&(c={},c.__data__=Zr(i),i=c);l.i.push(new nu(l.Ya++,i)),l.G==3&&Xn(l)},wt.prototype.N=function(){this.g.l=null,delete this.j,hs(this.g),delete this.g,wt.aa.N.call(this)};function Oo(i){es.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var l=i.__sm__;if(l){t:{for(const c in l){i=c;break t}i=void 0}(this.i=i)&&(i=this.i,l=l!==null&&i in l?l[i]:void 0),this.data=l}else this.data=i}S(Oo,es);function Fo(){ns.call(this),this.status=1}S(Fo,ns);function Ce(i){this.g=i}S(Ce,xo),Ce.prototype.ua=function(){vt(this.g,"a")},Ce.prototype.ta=function(i){vt(this.g,new Oo(i))},Ce.prototype.sa=function(i){vt(this.g,new Fo)},Ce.prototype.ra=function(){vt(this.g,"b")},tr.prototype.createWebChannel=tr.prototype.g,wt.prototype.send=wt.prototype.o,wt.prototype.open=wt.prototype.m,wt.prototype.close=wt.prototype.close,hl=function(){return new tr},ul=function(){return Bn()},cl=de,Ss={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},qn.NO_ERROR=0,qn.TIMEOUT=8,qn.HTTP_ERROR=6,ar=qn,Zi.COMPLETE="complete",ll=Zi,Wi.EventType=Ye,Ye.OPEN="a",Ye.CLOSE="b",Ye.ERROR="c",Ye.MESSAGE="d",mt.prototype.listen=mt.prototype.K,cn=Wi,Z.prototype.listenOnce=Z.prototype.L,Z.prototype.getLastError=Z.prototype.Ka,Z.prototype.getLastErrorCode=Z.prototype.Ba,Z.prototype.getStatus=Z.prototype.Z,Z.prototype.getResponseJson=Z.prototype.Oa,Z.prototype.getResponseText=Z.prototype.oa,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Ha,al=Z}).apply(typeof nr<"u"?nr:typeof self<"u"?self:typeof window<"u"?window:{});const Jo="@firebase/firestore",Xo="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}_t.UNAUTHENTICATED=new _t(null),_t.GOOGLE_CREDENTIALS=new _t("google-credentials-uid"),_t.FIRST_PARTY=new _t("first-party-uid"),_t.MOCK_USER=new _t("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ue="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ve=new el("@firebase/firestore");function Re(){return ve.logLevel}function N(n,...t){if(ve.logLevel<=j.DEBUG){const e=t.map(Ks);ve.debug(`Firestore (${Ue}): ${n}`,...e)}}function Gt(n,...t){if(ve.logLevel<=j.ERROR){const e=t.map(Ks);ve.error(`Firestore (${Ue}): ${n}`,...e)}}function ne(n,...t){if(ve.logLevel<=j.WARN){const e=t.map(Ks);ve.warn(`Firestore (${Ue}): ${n}`,...e)}}function Ks(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,dl(n,r,e)}function dl(n,t,e){let r=`FIRESTORE (${Ue}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Gt(r),new Error(r)}function H(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||dl(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Qe{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class ud{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(_t.UNAUTHENTICATED)))}shutdown(){}}class hd{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class dd{constructor(t){this.t=t,this.currentUser=_t.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new qt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new qt,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},u=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>u(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new qt)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string",31837,{l:r}),new fl(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string",2055,{h:t}),new _t(t)}}class fd{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=_t.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class md{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new fd(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(_t.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Zo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pd{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,zh(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){H(this.o===void 0,3512);const r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>r(o)))};const s=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Zo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(H(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Zo(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ml(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=gd(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function Q(n,t){return n<t?-1:n>t?1:0}function ks(n,t){let e=0;for(;e<n.length&&e<t.length;){const r=n.codePointAt(e),s=t.codePointAt(e);if(r!==s){if(r<128&&s<128)return Q(r,s);{const o=ml(),a=yd(o.encode(ta(n,e)),o.encode(ta(t,e)));return a!==0?a:Q(r,s)}}e+=r>65535?2:1}return Q(n.length,t.length)}function ta(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function yd(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return Q(n[e],t[e]);return Q(n.length,t.length)}function Me(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="__name__";class Dt{constructor(t,e,r){e===void 0?e=0:e>t.length&&x(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&x(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Dt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Dt?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Dt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return Q(t.length,e.length)}static compareSegments(t,e){const r=Dt.isNumericId(t),s=Dt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Dt.extractNumericId(t).compare(Dt.extractNumericId(e)):ks(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return te.fromString(t.substring(4,t.length-2))}}class K extends Dt{construct(t,e,r){return new K(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new D(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new K(e)}static emptyPath(){return new K([])}}const _d=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ht extends Dt{construct(t,e,r){return new ht(t,e,r)}static isValidIdentifier(t){return _d.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ht.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ea}static keyField(){return new ht([ea])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new D(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new D(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new D(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(o(),s++)}if(o(),a)throw new D(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ht(e)}static emptyPath(){return new ht([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(t){this.path=t}static fromPath(t){return new L(K.fromString(t))}static fromName(t){return new L(K.fromString(t).popFirst(5))}static empty(){return new L(K.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&K.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return K.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new L(new K(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pl(n,t,e){if(!e)throw new D(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Ed(n,t,e,r){if(t===!0&&r===!0)throw new D(C.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function na(n){if(!L.isDocumentKey(n))throw new D(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ra(n){if(L.isDocumentKey(n))throw new D(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function gl(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Rr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":x(12329,{type:typeof n})}function Rt(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new D(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Rr(n);throw new D(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function vd(n,t){if(t<=0)throw new D(C.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(n,t){const e={typeString:n};return t&&(e.value=t),e}function Sn(n,t){if(!gl(n))throw new D(C.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new D(C.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa=-62135596800,ia=1e6;class J{static now(){return J.fromMillis(Date.now())}static fromDate(t){return J.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*ia);return new J(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<sa)throw new D(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ia}_compareTo(t){return this.seconds===t.seconds?Q(this.nanoseconds,t.nanoseconds):Q(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:J._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Sn(t,J._jsonSchema))return new J(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-sa;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}J._jsonSchemaVersion="firestore/timestamp/1.0",J._jsonSchema={type:it("string",J._jsonSchemaVersion),seconds:it("number"),nanoseconds:it("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{static fromTimestamp(t){return new O(t)}static min(){return new O(new J(0,0))}static max(){return new O(new J(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn=-1;function Td(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=O.fromTimestamp(r===1e9?new J(e+1,0):new J(e,r));return new re(s,L.empty(),t)}function Ad(n){return new re(n.readTime,n.key,vn)}class re{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new re(O.min(),L.empty(),vn)}static max(){return new re(O.max(),L.empty(),vn)}}function Id(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=L.comparator(n.documentKey,t.documentKey),e!==0?e:Q(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class bd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Be(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==wd)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new P(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof P?e:P.resolve(e)}catch(e){return P.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):P.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):P.reject(e)}static resolve(t){return new P(((e,r)=>{e(t)}))}static reject(t){return new P(((e,r)=>{r(t)}))}static waitFor(t){return new P(((e,r)=>{let s=0,o=0,a=!1;t.forEach((u=>{++s,u.next((()=>{++o,a&&o===s&&e()}),(h=>r(h)))})),a=!0,o===s&&e()}))}static or(t){let e=P.resolve(!1);for(const r of t)e=e.next((s=>s?P.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,o)=>{r.push(e.call(this,s,o))})),this.waitFor(r)}static mapArray(t,e){return new P(((r,s)=>{const o=t.length,a=new Array(o);let u=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next((m=>{a[d]=m,++u,u===o&&r(a)}),(m=>s(m)))}}))}static doWhile(t,e){return new P(((r,s)=>{const o=()=>{t()===!0?e().next((()=>{o()}),s):r()};o()}))}}function Cd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function qe(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this._e(r),this.ae=r=>e.writeSequenceNumber(r))}_e(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ae&&this.ae(t),t}}Sr.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Js=-1;function kr(n){return n==null}function yr(n){return n===0&&1/n==-1/0}function Pd(n){return typeof n=="number"&&Number.isInteger(n)&&!yr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl="";function Rd(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=oa(t)),t=Sd(n.get(e),t);return oa(t)}function Sd(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case yl:e+="";break;default:e+=o}}return e}function oa(n){return n+yl+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function ue(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function _l(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(t,e){this.comparator=t,this.root=e||ut.EMPTY}insert(t,e){return new X(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(t){return new X(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ut.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new rr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new rr(this.root,t,this.comparator,!1)}getReverseIterator(){return new rr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new rr(this.root,t,this.comparator,!0)}}class rr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ut{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ut.RED,this.left=s??ut.EMPTY,this.right=o??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ut(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ut.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw x(27949);return t+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ut(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.comparator=t,this.data=new X(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new la(this.data.getIterator())}getIteratorFrom(t){return new la(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new ot(this.comparator);return e.data=t,e}}class la{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this.fields=t,t.sort(ht.comparator)}static empty(){return new bt([])}unionWith(t){let e=new ot(ht.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new bt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Me(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new El("Invalid base64 string: "+o):o}})(t);return new dt(e)}static fromUint8Array(t){const e=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(t);return new dt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Q(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}dt.EMPTY_BYTE_STRING=new dt("");const kd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function se(n){if(H(!!n,39018),typeof n=="string"){let t=0;const e=kd.exec(n);if(H(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:tt(n.seconds),nanos:tt(n.nanos)}}function tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ie(n){return typeof n=="string"?dt.fromBase64String(n):dt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl="server_timestamp",Tl="__type__",Al="__previous_value__",Il="__local_write_time__";function Xs(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[Tl])===null||e===void 0?void 0:e.stringValue)===vl}function Vr(n){const t=n.mapValue.fields[Al];return Xs(t)?Vr(t):t}function Tn(n){const t=se(n.mapValue.fields[Il].timestampValue);return new J(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(t,e,r,s,o,a,u,h,d,m){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=m}}const _r="(default)";class An{constructor(t,e){this.projectId=t,this.database=e||_r}static empty(){return new An("","")}get isDefaultDatabase(){return this.database===_r}isEqual(t){return t instanceof An&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl="__type__",Dd="__max__",sr={mapValue:{}},bl="__vector__",Er="value";function oe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Xs(n)?4:Md(n)?9007199254740991:Nd(n)?10:11:x(28295,{value:n})}function Ot(n,t){if(n===t)return!0;const e=oe(n);if(e!==oe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Tn(n).isEqual(Tn(t));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=se(s.timestampValue),u=se(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,o){return ie(s.bytesValue).isEqual(ie(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,o){return tt(s.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(s.geoPointValue.longitude)===tt(o.geoPointValue.longitude)})(n,t);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return tt(s.integerValue)===tt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=tt(s.doubleValue),u=tt(o.doubleValue);return a===u?yr(a)===yr(u):isNaN(a)&&isNaN(u)}return!1})(n,t);case 9:return Me(n.arrayValue.values||[],t.arrayValue.values||[],Ot);case 10:case 11:return(function(s,o){const a=s.mapValue.fields||{},u=o.mapValue.fields||{};if(aa(a)!==aa(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!Ot(a[h],u[h])))return!1;return!0})(n,t);default:return x(52216,{left:n})}}function In(n,t){return(n.values||[]).find((e=>Ot(e,t)))!==void 0}function Le(n,t){if(n===t)return 0;const e=oe(n),r=oe(t);if(e!==r)return Q(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,t.booleanValue);case 2:return(function(o,a){const u=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(n,t);case 3:return ca(n.timestampValue,t.timestampValue);case 4:return ca(Tn(n),Tn(t));case 5:return ks(n.stringValue,t.stringValue);case 6:return(function(o,a){const u=ie(o),h=ie(a);return u.compareTo(h)})(n.bytesValue,t.bytesValue);case 7:return(function(o,a){const u=o.split("/"),h=a.split("/");for(let d=0;d<u.length&&d<h.length;d++){const m=Q(u[d],h[d]);if(m!==0)return m}return Q(u.length,h.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,a){const u=Q(tt(o.latitude),tt(a.latitude));return u!==0?u:Q(tt(o.longitude),tt(a.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return ua(n.arrayValue,t.arrayValue);case 10:return(function(o,a){var u,h,d,m;const _=o.fields||{},v=a.fields||{},R=(u=_[Er])===null||u===void 0?void 0:u.arrayValue,S=(h=v[Er])===null||h===void 0?void 0:h.arrayValue,M=Q(((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0,((m=S==null?void 0:S.values)===null||m===void 0?void 0:m.length)||0);return M!==0?M:ua(R,S)})(n.mapValue,t.mapValue);case 11:return(function(o,a){if(o===sr.mapValue&&a===sr.mapValue)return 0;if(o===sr.mapValue)return 1;if(a===sr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),d=a.fields||{},m=Object.keys(d);h.sort(),m.sort();for(let _=0;_<h.length&&_<m.length;++_){const v=ks(h[_],m[_]);if(v!==0)return v;const R=Le(u[h[_]],d[m[_]]);if(R!==0)return R}return Q(h.length,m.length)})(n.mapValue,t.mapValue);default:throw x(23264,{le:e})}}function ca(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return Q(n,t);const e=se(n),r=se(t),s=Q(e.seconds,r.seconds);return s!==0?s:Q(e.nanos,r.nanos)}function ua(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Le(e[s],r[s]);if(o)return o}return Q(e.length,r.length)}function xe(n){return Vs(n)}function Vs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=se(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return ie(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return L.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Vs(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Vs(e.fields[a])}`;return s+"}"})(n.mapValue):x(61005,{value:n})}function lr(n){switch(oe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Vr(n);return t?16+lr(t):16;case 5:return 2*n.stringValue.length;case 6:return ie(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,o)=>s+lr(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return ue(r.fields,((o,a)=>{s+=o.length+lr(a)})),s})(n.mapValue);default:throw x(13486,{value:n})}}function ha(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Ds(n){return!!n&&"integerValue"in n}function Zs(n){return!!n&&"arrayValue"in n}function da(n){return!!n&&"nullValue"in n}function fa(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function cr(n){return!!n&&"mapValue"in n}function Nd(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[wl])===null||e===void 0?void 0:e.stringValue)===bl}function mn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return ue(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=mn(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=mn(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Md(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Dd}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(t){this.value=t}static empty(){return new It({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!cr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=mn(e)}setAll(t){let e=ht.emptyPath(),r={},s=[];t.forEach(((a,u)=>{if(!e.isImmediateParentOf(u)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=u.popLast()}a?r[u.lastSegment()]=mn(a):s.push(u.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());cr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ot(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];cr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){ue(e,((s,o)=>t[s]=o));for(const s of r)delete t[s]}clone(){return new It(mn(this.value))}}function Cl(n){const t=[];return ue(n.fields,((e,r)=>{const s=new ht([e]);if(cr(r)){const o=Cl(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)})),new bt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t,e,r,s,o,a,u){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(t){return new Et(t,0,O.min(),O.min(),O.min(),It.empty(),0)}static newFoundDocument(t,e,r,s){return new Et(t,1,e,O.min(),r,s,0)}static newNoDocument(t,e){return new Et(t,2,e,O.min(),O.min(),It.empty(),0)}static newUnknownDocument(t,e){return new Et(t,3,e,O.min(),O.min(),It.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(O.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=O.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Et&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(t,e){this.position=t,this.inclusive=e}}function ma(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),e.key):r=Le(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function pa(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ot(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(t,e="asc"){this.field=t,this.dir=e}}function Ld(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{}class st extends Pl{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Od(t,e,r):e==="array-contains"?new Ud(t,r):e==="in"?new Bd(t,r):e==="not-in"?new qd(t,r):e==="array-contains-any"?new jd(t,r):new st(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Fd(t,r):new Qd(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Le(e,this.value)):e!==null&&oe(this.value)===oe(e)&&this.matchesComparison(Le(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vt extends Pl{constructor(t,e){super(),this.filters=t,this.op=e,this.he=null}static create(t,e){return new Vt(t,e)}matches(t){return Rl(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Rl(n){return n.op==="and"}function Sl(n){return xd(n)&&Rl(n)}function xd(n){for(const t of n.filters)if(t instanceof Vt)return!1;return!0}function Ns(n){if(n instanceof st)return n.field.canonicalString()+n.op.toString()+xe(n.value);if(Sl(n))return n.filters.map((t=>Ns(t))).join(",");{const t=n.filters.map((e=>Ns(e))).join(",");return`${n.op}(${t})`}}function kl(n,t){return n instanceof st?(function(r,s){return s instanceof st&&r.op===s.op&&r.field.isEqual(s.field)&&Ot(r.value,s.value)})(n,t):n instanceof Vt?(function(r,s){return s instanceof Vt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,a,u)=>o&&kl(a,s.filters[u])),!0):!1})(n,t):void x(19439)}function Vl(n){return n instanceof st?(function(e){return`${e.field.canonicalString()} ${e.op} ${xe(e.value)}`})(n):n instanceof Vt?(function(e){return e.op.toString()+" {"+e.getFilters().map(Vl).join(" ,")+"}"})(n):"Filter"}class Od extends st{constructor(t,e,r){super(t,e,r),this.key=L.fromName(r.referenceValue)}matches(t){const e=L.comparator(t.key,this.key);return this.matchesComparison(e)}}class Fd extends st{constructor(t,e){super(t,"in",e),this.keys=Dl("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Qd extends st{constructor(t,e){super(t,"not-in",e),this.keys=Dl("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Dl(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map((r=>L.fromName(r.referenceValue)))}class Ud extends st{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Zs(e)&&In(e.arrayValue,this.value)}}class Bd extends st{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&In(this.value.arrayValue,e)}}class qd extends st{constructor(t,e){super(t,"not-in",e)}matches(t){if(In(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!In(this.value.arrayValue,e)}}class jd extends st{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Zs(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>In(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(t,e=null,r=[],s=[],o=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=u,this.Pe=null}}function ga(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Gd(n,t,e,r,s,o,a)}function ti(n){const t=F(n);if(t.Pe===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>Ns(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),kr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>xe(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>xe(r))).join(",")),t.Pe=e}return t.Pe}function ei(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Ld(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!kl(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!pa(n.startAt,t.startAt)&&pa(n.endAt,t.endAt)}function Ms(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(t,e=null,r=[],s=[],o=null,a="F",u=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=h,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function $d(n,t,e,r,s,o,a,u){return new je(n,t,e,r,s,o,a,u)}function Dr(n){return new je(n)}function ya(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Nl(n){return n.collectionGroup!==null}function pn(n){const t=F(n);if(t.Te===null){t.Te=[];const e=new Set;for(const o of t.explicitOrderBy)t.Te.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new ot(ht.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((d=>{d.isInequality()&&(u=u.add(d.field))}))})),u})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Te.push(new wn(o,r))})),e.has(ht.keyField().canonicalString())||t.Te.push(new wn(ht.keyField(),r))}return t.Te}function Nt(n){const t=F(n);return t.Ie||(t.Ie=zd(t,pn(n))),t.Ie}function zd(n,t){if(n.limitType==="F")return ga(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new wn(s.field,o)}));const e=n.endAt?new vr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new vr(n.startAt.position,n.startAt.inclusive):null;return ga(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ls(n,t){const e=n.filters.concat([t]);return new je(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function Tr(n,t,e){return new je(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Nr(n,t){return ei(Nt(n),Nt(t))&&n.limitType===t.limitType}function Ml(n){return`${ti(Nt(n))}|lt:${n.limitType}`}function Se(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>Vl(s))).join(", ")}]`),kr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>xe(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>xe(s))).join(",")),`Target(${r})`})(Nt(n))}; limitType=${n.limitType})`}function Mr(n,t){return t.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,t)&&(function(r,s){for(const o of pn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(a,u,h){const d=ma(a,u,h);return a.inclusive?d<=0:d<0})(r.startAt,pn(r),s)||r.endAt&&!(function(a,u,h){const d=ma(a,u,h);return a.inclusive?d>=0:d>0})(r.endAt,pn(r),s))})(n,t)}function Hd(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ll(n){return(t,e)=>{let r=!1;for(const s of pn(n)){const o=Wd(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Wd(n,t,e){const r=n.field.isKeyField()?L.comparator(t.key,e.key):(function(o,a,u){const h=a.data.field(o),d=u.data.field(o);return h!==null&&d!==null?Le(h,d):x(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){ue(this.inner,((e,r)=>{for(const[s,o]of r)t(s,o)}))}isEmpty(){return _l(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd=new X(L.comparator);function $t(){return Kd}const xl=new X(L.comparator);function un(...n){let t=xl;for(const e of n)t=t.insert(e.key,e);return t}function Ol(n){let t=xl;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function ye(){return gn()}function Fl(){return gn()}function gn(){return new Ae((n=>n.toString()),((n,t)=>n.isEqual(t)))}const Yd=new X(L.comparator),Jd=new ot(L.comparator);function B(...n){let t=Jd;for(const e of n)t=t.add(e);return t}const Xd=new ot(Q);function Zd(){return Xd}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:yr(t)?"-0":t}}function Ql(n){return{integerValue:""+n}}function Ul(n,t){return Pd(t)?Ql(t):ni(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(){this._=void 0}}function tf(n,t,e){return n instanceof bn?(function(s,o){const a={fields:{[Tl]:{stringValue:vl},[Il]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Xs(o)&&(o=Vr(o)),o&&(a.fields[Al]=o),{mapValue:a}})(e,t):n instanceof Cn?ql(n,t):n instanceof Pn?jl(n,t):(function(s,o){const a=Bl(s,o),u=_a(a)+_a(s.Ee);return Ds(a)&&Ds(s.Ee)?Ql(u):ni(s.serializer,u)})(n,t)}function ef(n,t,e){return n instanceof Cn?ql(n,t):n instanceof Pn?jl(n,t):e}function Bl(n,t){return n instanceof Rn?(function(r){return Ds(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(t)?t:{integerValue:0}:null}class bn extends Lr{}class Cn extends Lr{constructor(t){super(),this.elements=t}}function ql(n,t){const e=Gl(t);for(const r of n.elements)e.some((s=>Ot(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Pn extends Lr{constructor(t){super(),this.elements=t}}function jl(n,t){let e=Gl(t);for(const r of n.elements)e=e.filter((s=>!Ot(s,r)));return{arrayValue:{values:e}}}class Rn extends Lr{constructor(t,e){super(),this.serializer=t,this.Ee=e}}function _a(n){return tt(n.integerValue||n.doubleValue)}function Gl(n){return Zs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(t,e){this.field=t,this.transform=e}}function nf(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof Cn&&s instanceof Cn||r instanceof Pn&&s instanceof Pn?Me(r.elements,s.elements,Ot):r instanceof Rn&&s instanceof Rn?Ot(r.Ee,s.Ee):r instanceof bn&&s instanceof bn})(n.transform,t.transform)}class rf{constructor(t,e){this.version=t,this.transformResults=e}}class Ct{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ct}static exists(t){return new Ct(void 0,t)}static updateTime(t){return new Ct(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ur(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class xr{}function zl(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Or(n.key,Ct.none()):new kn(n.key,n.data,Ct.none());{const e=n.data,r=It.empty();let s=new ot(ht.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new he(n.key,r,new bt(s.toArray()),Ct.none())}}function sf(n,t,e){n instanceof kn?(function(s,o,a){const u=s.value.clone(),h=va(s.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,t,e):n instanceof he?(function(s,o,a){if(!ur(s.precondition,o))return void o.convertToUnknownDocument(a.version);const u=va(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Hl(s)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,t,e):(function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function yn(n,t,e,r){return n instanceof kn?(function(o,a,u,h){if(!ur(o.precondition,a))return u;const d=o.value.clone(),m=Ta(o.fieldTransforms,h,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(n,t,e,r):n instanceof he?(function(o,a,u,h){if(!ur(o.precondition,a))return u;const d=Ta(o.fieldTransforms,h,a),m=a.data;return m.setAll(Hl(o)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((_=>_.field)))})(n,t,e,r):(function(o,a,u){return ur(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(n,t,e)}function of(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=Bl(r.transform,s||null);o!=null&&(e===null&&(e=It.empty()),e.set(r.field,o))}return e||null}function Ea(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Me(r,s,((o,a)=>nf(o,a)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class kn extends xr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class he extends xr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Hl(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function va(n,t,e){const r=new Map;H(n.length===e.length,32656,{Ae:e.length,Re:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,u=t.data.field(o.field);r.set(o.field,ef(a,u,e[s]))}return r}function Ta(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,tf(o,a,t))}return r}class Or extends xr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class af extends xr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&sf(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=yn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=yn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Fl();return this.mutations.forEach((s=>{const o=t.get(s.key),a=o.overlayedDocument;let u=this.applyToLocalView(a,o.mutatedFields);u=e.has(s.key)?null:u;const h=zl(a,u);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(O.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),B())}isEqual(t){return this.batchId===t.batchId&&Me(this.mutations,t.mutations,((e,r)=>Ea(e,r)))&&Me(this.baseMutations,t.baseMutations,((e,r)=>Ea(e,r)))}}class ri{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){H(t.mutations.length===r.length,58842,{Ve:t.mutations.length,me:r.length});let s=(function(){return Yd})();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new ri(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rt,q;function hf(n){switch(n){case C.OK:return x(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return x(15467,{code:n})}}function Wl(n){if(n===void 0)return Gt("GRPC error has no .code"),C.UNKNOWN;switch(n){case rt.OK:return C.OK;case rt.CANCELLED:return C.CANCELLED;case rt.UNKNOWN:return C.UNKNOWN;case rt.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case rt.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case rt.INTERNAL:return C.INTERNAL;case rt.UNAVAILABLE:return C.UNAVAILABLE;case rt.UNAUTHENTICATED:return C.UNAUTHENTICATED;case rt.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case rt.NOT_FOUND:return C.NOT_FOUND;case rt.ALREADY_EXISTS:return C.ALREADY_EXISTS;case rt.PERMISSION_DENIED:return C.PERMISSION_DENIED;case rt.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case rt.ABORTED:return C.ABORTED;case rt.OUT_OF_RANGE:return C.OUT_OF_RANGE;case rt.UNIMPLEMENTED:return C.UNIMPLEMENTED;case rt.DATA_LOSS:return C.DATA_LOSS;default:return x(39323,{code:n})}}(q=rt||(rt={}))[q.OK=0]="OK",q[q.CANCELLED=1]="CANCELLED",q[q.UNKNOWN=2]="UNKNOWN",q[q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",q[q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",q[q.NOT_FOUND=5]="NOT_FOUND",q[q.ALREADY_EXISTS=6]="ALREADY_EXISTS",q[q.PERMISSION_DENIED=7]="PERMISSION_DENIED",q[q.UNAUTHENTICATED=16]="UNAUTHENTICATED",q[q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",q[q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",q[q.ABORTED=10]="ABORTED",q[q.OUT_OF_RANGE=11]="OUT_OF_RANGE",q[q.UNIMPLEMENTED=12]="UNIMPLEMENTED",q[q.INTERNAL=13]="INTERNAL",q[q.UNAVAILABLE=14]="UNAVAILABLE",q[q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const df=new te([4294967295,4294967295],0);function Aa(n){const t=ml().encode(n),e=new ol;return e.update(t),new Uint8Array(e.digest())}function Ia(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new te([e,r],0),new te([s,o],0)]}class si{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new hn(`Invalid padding: ${e}`);if(r<0)throw new hn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new hn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new hn(`Invalid padding when bitmap length is 0: ${e}`);this.fe=8*t.length-e,this.ge=te.fromNumber(this.fe)}pe(t,e,r){let s=t.add(e.multiply(te.fromNumber(r)));return s.compare(df)===1&&(s=new te([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.fe===0)return!1;const e=Aa(t),[r,s]=Ia(e);for(let o=0;o<this.hashCount;o++){const a=this.pe(r,s,o);if(!this.ye(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new si(o,s,e);return r.forEach((u=>a.insert(u))),a}insert(t){if(this.fe===0)return;const e=Aa(t),[r,s]=Ia(e);for(let o=0;o<this.hashCount;o++){const a=this.pe(r,s,o);this.we(a)}}we(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class hn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Vn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Fr(O.min(),s,new X(Q),$t(),B())}}class Vn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Vn(r,e,B(),B(),B())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(t,e,r,s){this.Se=t,this.removedTargetIds=e,this.key=r,this.be=s}}class Kl{constructor(t,e){this.targetId=t,this.De=e}}class Yl{constructor(t,e,r=dt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class wa{constructor(){this.ve=0,this.Ce=ba(),this.Fe=dt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(t){t.approximateByteSize()>0&&(this.xe=!0,this.Fe=t)}Le(){let t=B(),e=B(),r=B();return this.Ce.forEach(((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:x(38017,{changeType:o})}})),new Vn(this.Fe,this.Me,t,e,r)}ke(){this.xe=!1,this.Ce=ba()}qe(t,e){this.xe=!0,this.Ce=this.Ce.insert(t,e)}Qe(t){this.xe=!0,this.Ce=this.Ce.remove(t)}$e(){this.ve+=1}Ue(){this.ve-=1,H(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class ff{constructor(t){this.We=t,this.Ge=new Map,this.ze=$t(),this.je=ir(),this.Je=ir(),this.He=new X(Q)}Ye(t){for(const e of t.Se)t.be&&t.be.isFoundDocument()?this.Ze(e,t.be):this.Xe(e,t.key,t.be);for(const e of t.removedTargetIds)this.Xe(e,t.key,t.be)}et(t){this.forEachTarget(t,(e=>{const r=this.tt(e);switch(t.state){case 0:this.nt(e)&&r.Be(t.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(t.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(e);break;case 3:this.nt(e)&&(r.Ke(),r.Be(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),r.Be(t.resumeToken));break;default:x(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ge.forEach(((r,s)=>{this.nt(s)&&e(s)}))}it(t){const e=t.targetId,r=t.De.count,s=this.st(e);if(s){const o=s.target;if(Ms(o))if(r===0){const a=new L(o.path);this.Xe(e,a,Et.newNoDocument(a,O.min()))}else H(r===1,20013,{expectedCount:r});else{const a=this.ot(e);if(a!==r){const u=this._t(t),h=u?this.ut(u,t,a):1;if(h!==0){this.rt(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(e,d)}}}}}_t(t){const e=t.De.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,u;try{a=ie(r).toUint8Array()}catch(h){if(h instanceof El)return ne("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new si(a,s,o)}catch(h){return ne(h instanceof hn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.fe===0?null:u}ut(t,e,r){return e.De.count===r-this.ht(t,e.targetId)?0:2}ht(t,e){const r=this.We.getRemoteKeysForTarget(e);let s=0;return r.forEach((o=>{const a=this.We.lt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(u)||(this.Xe(e,o,null),s++)})),s}Pt(t){const e=new Map;this.Ge.forEach(((o,a)=>{const u=this.st(a);if(u){if(o.current&&Ms(u.target)){const h=new L(u.target.path);this.Tt(h).has(a)||this.It(a,h)||this.Xe(a,h,Et.newNoDocument(h,t))}o.Ne&&(e.set(a,o.Le()),o.ke())}}));let r=B();this.Je.forEach(((o,a)=>{let u=!0;a.forEachWhile((h=>{const d=this.st(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(r=r.add(o))})),this.ze.forEach(((o,a)=>a.setReadTime(t)));const s=new Fr(t,e,this.He,this.ze,r);return this.ze=$t(),this.je=ir(),this.Je=ir(),this.He=new X(Q),s}Ze(t,e){if(!this.nt(t))return;const r=this.It(t,e.key)?2:0;this.tt(t).qe(e.key,r),this.ze=this.ze.insert(e.key,e),this.je=this.je.insert(e.key,this.Tt(e.key).add(t)),this.Je=this.Je.insert(e.key,this.dt(e.key).add(t))}Xe(t,e,r){if(!this.nt(t))return;const s=this.tt(t);this.It(t,e)?s.qe(e,1):s.Qe(e),this.Je=this.Je.insert(e,this.dt(e).delete(t)),this.Je=this.Je.insert(e,this.dt(e).add(t)),r&&(this.ze=this.ze.insert(e,r))}removeTarget(t){this.Ge.delete(t)}ot(t){const e=this.tt(t).Le();return this.We.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.tt(t).$e()}tt(t){let e=this.Ge.get(t);return e||(e=new wa,this.Ge.set(t,e)),e}dt(t){let e=this.Je.get(t);return e||(e=new ot(Q),this.Je=this.Je.insert(t,e)),e}Tt(t){let e=this.je.get(t);return e||(e=new ot(Q),this.je=this.je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}st(t){const e=this.Ge.get(t);return e&&e.Oe?null:this.We.Et(t)}rt(t){this.Ge.set(t,new wa),this.We.getRemoteKeysForTarget(t).forEach((e=>{this.Xe(t,e,null)}))}It(t,e){return this.We.getRemoteKeysForTarget(t).has(e)}}function ir(){return new X(L.comparator)}function ba(){return new X(L.comparator)}const mf={asc:"ASCENDING",desc:"DESCENDING"},pf={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gf={and:"AND",or:"OR"};class yf{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function xs(n,t){return n.useProto3Json||kr(t)?t:{value:t}}function Ar(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Jl(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function _f(n,t){return Ar(n,t.toTimestamp())}function Mt(n){return H(!!n,49232),O.fromTimestamp((function(e){const r=se(e);return new J(r.seconds,r.nanos)})(n))}function ii(n,t){return Os(n,t).canonicalString()}function Os(n,t){const e=(function(s){return new K(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function Xl(n){const t=K.fromString(n);return H(rc(t),10190,{key:t.toString()}),t}function Fs(n,t){return ii(n.databaseId,t.path)}function Es(n,t){const e=Xl(t);if(e.get(1)!==n.databaseId.projectId)throw new D(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new D(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new L(tc(e))}function Zl(n,t){return ii(n.databaseId,t)}function Ef(n){const t=Xl(n);return t.length===4?K.emptyPath():tc(t)}function Qs(n){return new K(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function tc(n){return H(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ca(n,t,e){return{name:Fs(n,t),fields:e.value.mapValue.fields}}function vf(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:x(39313,{state:d})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=(function(d,m){return d.useProto3Json?(H(m===void 0||typeof m=="string",58123),dt.fromBase64String(m||"")):(H(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),dt.fromUint8Array(m||new Uint8Array))})(n,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&(function(d){const m=d.code===void 0?C.UNKNOWN:Wl(d.code);return new D(m,d.message||"")})(a);e=new Yl(r,s,o,u||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Es(n,r.document.name),o=Mt(r.document.updateTime),a=r.document.createTime?Mt(r.document.createTime):O.min(),u=new It({mapValue:{fields:r.document.fields}}),h=Et.newFoundDocument(s,o,a,u),d=r.targetIds||[],m=r.removedTargetIds||[];e=new hr(d,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Es(n,r.document),o=r.readTime?Mt(r.readTime):O.min(),a=Et.newNoDocument(s,o),u=r.removedTargetIds||[];e=new hr([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Es(n,r.document),o=r.removedTargetIds||[];e=new hr([],o,s,null)}else{if(!("filter"in t))return x(11601,{At:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new uf(s,o),u=r.targetId;e=new Kl(u,a)}}return e}function Tf(n,t){let e;if(t instanceof kn)e={update:Ca(n,t.key,t.value)};else if(t instanceof Or)e={delete:Fs(n,t.key)};else if(t instanceof he)e={update:Ca(n,t.key,t.data),updateMask:kf(t.fieldMask)};else{if(!(t instanceof af))return x(16599,{Rt:t.type});e={verify:Fs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(o,a){const u=a.transform;if(u instanceof bn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Cn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Pn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Rn)return{fieldPath:a.field.canonicalString(),increment:u.Ee};throw x(20930,{transform:a.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:_f(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:x(27497)})(n,t.precondition)),e}function Af(n,t){return n&&n.length>0?(H(t!==void 0,14353),n.map((e=>(function(s,o){let a=s.updateTime?Mt(s.updateTime):Mt(o);return a.isEqual(O.min())&&(a=Mt(o)),new rf(a,s.transformResults||[])})(e,t)))):[]}function If(n,t){return{documents:[Zl(n,t.path)]}}function wf(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Zl(n,s);const o=(function(d){if(d.length!==0)return nc(Vt.create(d,"and"))})(t.filters);o&&(e.structuredQuery.where=o);const a=(function(d){if(d.length!==0)return d.map((m=>(function(v){return{field:ke(v.field),direction:Pf(v.dir)}})(m)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=xs(n,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(t.endAt)),{Vt:e,parent:s}}function bf(n){let t=Ef(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){H(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=(function(_){const v=ec(_);return v instanceof Vt&&Sl(v)?v.getFilters():[v]})(e.where));let a=[];e.orderBy&&(a=(function(_){return _.map((v=>(function(S){return new wn(Ve(S.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(S.direction))})(v)))})(e.orderBy));let u=null;e.limit&&(u=(function(_){let v;return v=typeof _=="object"?_.value:_,kr(v)?null:v})(e.limit));let h=null;e.startAt&&(h=(function(_){const v=!!_.before,R=_.values||[];return new vr(R,v)})(e.startAt));let d=null;return e.endAt&&(d=(function(_){const v=!_.before,R=_.values||[];return new vr(R,v)})(e.endAt)),$d(t,s,a,o,u,"F",h,d)}function Cf(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function ec(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Ve(e.unaryFilter.field);return st.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ve(e.unaryFilter.field);return st.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ve(e.unaryFilter.field);return st.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ve(e.unaryFilter.field);return st.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}})(n):n.fieldFilter!==void 0?(function(e){return st.create(Ve(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return Vt.create(e.compositeFilter.filters.map((r=>ec(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return x(1026)}})(e.compositeFilter.op))})(n):x(30097,{filter:n})}function Pf(n){return mf[n]}function Rf(n){return pf[n]}function Sf(n){return gf[n]}function ke(n){return{fieldPath:n.canonicalString()}}function Ve(n){return ht.fromServerFormat(n.fieldPath)}function nc(n){return n instanceof st?(function(e){if(e.op==="=="){if(fa(e.value))return{unaryFilter:{field:ke(e.field),op:"IS_NAN"}};if(da(e.value))return{unaryFilter:{field:ke(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(fa(e.value))return{unaryFilter:{field:ke(e.field),op:"IS_NOT_NAN"}};if(da(e.value))return{unaryFilter:{field:ke(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ke(e.field),op:Rf(e.op),value:e.value}}})(n):n instanceof Vt?(function(e){const r=e.getFilters().map((s=>nc(s)));return r.length===1?r[0]:{compositeFilter:{op:Sf(e.op),filters:r}}})(n):x(54877,{filter:n})}function kf(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function rc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(t,e,r,s,o=O.min(),a=O.min(),u=dt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(t){return new Jt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(t){this.gt=t}}function Df(n){const t=bf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Tr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(){this.Dn=new Mf}addToCollectionParentIndex(t,e){return this.Dn.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.Dn.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(re.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(re.min())}updateCollectionGroup(t,e,r){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}}class Mf{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ot(K.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ot(K.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},sc=41943040;class At{static withCacheSize(t){return new At(t,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At.DEFAULT_COLLECTION_PERCENTILE=10,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,At.DEFAULT=new At(sc,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),At.DISABLED=new At(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(t){this._r=t}next(){return this._r+=2,this._r}static ar(){return new Oe(0)}static ur(){return new Oe(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ra="LruGarbageCollector",Lf=1048576;function Sa([n,t],[e,r]){const s=Q(n,e);return s===0?Q(t,r):s}class xf{constructor(t){this.Tr=t,this.buffer=new ot(Sa),this.Ir=0}dr(){return++this.Ir}Er(t){const e=[t,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Sa(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Of{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(t){N(Ra,`Garbage collection scheduled in ${t}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){qe(e)?N(Ra,"Ignoring IndexedDB error during garbage collection: ",e):await Be(e)}await this.Rr(3e5)}))}}class Ff{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.mr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return P.resolve(Sr.ue);const r=new xf(e);return this.Vr.forEachTarget(t,(s=>r.Er(s.sequenceNumber))).next((()=>this.Vr.gr(t,(s=>r.Er(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Pa)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Pa):this.pr(t,e)))}getCacheSize(t){return this.Vr.getCacheSize(t)}pr(t,e){let r,s,o,a,u,h,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((_=>(_>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),s=this.params.maximumSequenceNumbersToCollect):s=_,a=Date.now(),this.nthSequenceNumber(t,s)))).next((_=>(r=_,u=Date.now(),this.removeTargets(t,r,e)))).next((_=>(o=_,h=Date.now(),this.removeOrphanedDocuments(t,r)))).next((_=>(d=Date.now(),Re()<=j.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${_} documents in `+(d-h)+`ms
Total Duration: ${d-m}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:_}))))}}function Qf(n,t){return new Ff(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(){this.changes=new Ae((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Et.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?P.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&yn(r.mutation,s,bt.empty(),J.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,B()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=B()){const s=ye();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((o=>{let a=un();return o.forEach(((u,h)=>{a=a.insert(u,h.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const r=ye();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,B())))}populateOverlays(t,e,r){const s=[];return r.forEach((o=>{e.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(t,s).next((o=>{o.forEach(((a,u)=>{e.set(a,u)}))}))}computeViews(t,e,r,s){let o=$t();const a=gn(),u=(function(){return gn()})();return e.forEach(((h,d)=>{const m=r.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof he)?o=o.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),yn(m.mutation,d,m.mutation.getFieldMask(),J.now())):a.set(d.key,bt.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((d,m)=>a.set(d,m))),e.forEach(((d,m)=>{var _;return u.set(d,new Bf(m,(_=a.get(d))!==null&&_!==void 0?_:null))})),u)))}recalculateAndSaveOverlays(t,e){const r=gn();let s=new X(((a,u)=>a-u)),o=B();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const u of a)u.keys().forEach((h=>{const d=e.get(h);if(d===null)return;let m=r.get(h)||bt.empty();m=u.applyToLocalView(d,m),r.set(h,m);const _=(s.get(u.batchId)||B()).add(h);s=s.insert(u.batchId,_)}))})).next((()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),d=h.key,m=h.value,_=Fl();m.forEach((v=>{if(!o.has(v)){const R=zl(e.get(v),r.get(v));R!==null&&_.set(v,R),o=o.add(v)}})),a.push(this.documentOverlayCache.saveOverlays(t,d,_))}return P.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return(function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Nl(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):P.resolve(ye());let u=vn,h=o;return a.next((d=>P.forEach(d,((m,_)=>(u<_.largestBatchId&&(u=_.largestBatchId),o.get(m)?P.resolve():this.remoteDocumentCache.getEntry(t,m).next((v=>{h=h.insert(m,v)}))))).next((()=>this.populateOverlays(t,d,o))).next((()=>this.computeViews(t,h,d,B()))).next((m=>({batchId:u,changes:Ol(m)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new L(e)).next((r=>{let s=un();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=un();return this.indexManager.getCollectionParents(t,o).next((u=>P.forEach(u,(h=>{const d=(function(_,v){return new je(v,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next((m=>{m.forEach(((_,v)=>{a=a.insert(_,v)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s)))).next((a=>{o.forEach(((h,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,Et.newInvalidDocument(m)))}));let u=un();return a.forEach(((h,d)=>{const m=o.get(h);m!==void 0&&yn(m.mutation,d,bt.empty(),J.now()),Mr(e,d)&&(u=u.insert(h,d))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(t){this.serializer=t,this.Br=new Map,this.Lr=new Map}getBundleMetadata(t,e){return P.resolve(this.Br.get(e))}saveBundleMetadata(t,e){return this.Br.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Mt(s.createTime)}})(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Lr.get(e))}saveNamedQuery(t,e){return this.Lr.set(e.name,(function(s){return{name:s.name,query:Df(s.bundledQuery),readTime:Mt(s.readTime)}})(e)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(){this.overlays=new X(L.comparator),this.kr=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){const r=ye();return P.forEach(e,(s=>this.getOverlay(t,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,o)=>{this.wt(t,e,o)})),P.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.kr.delete(r)),P.resolve()}getOverlaysForCollection(t,e,r){const s=ye(),o=e.length+1,a=new L(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return P.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new X(((d,m)=>d-m));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let m=o.get(d.largestBatchId);m===null&&(m=ye(),o=o.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const u=ye(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((d,m)=>u.set(d,m))),!(u.size()>=s)););return P.resolve(u)}wt(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new cf(e,r));let o=this.kr.get(e);o===void 0&&(o=B(),this.kr.set(e,o)),this.kr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(){this.sessionToken=dt.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(){this.qr=new ot(at.Qr),this.$r=new ot(at.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(t,e){const r=new at(t,e);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Wr(new at(t,e))}Gr(t,e){t.forEach((r=>this.removeReference(r,e)))}zr(t){const e=new L(new K([])),r=new at(e,t),s=new at(e,t+1),o=[];return this.$r.forEachInRange([r,s],(a=>{this.Wr(a),o.push(a.key)})),o}jr(){this.qr.forEach((t=>this.Wr(t)))}Wr(t){this.qr=this.qr.delete(t),this.$r=this.$r.delete(t)}Jr(t){const e=new L(new K([])),r=new at(e,t),s=new at(e,t+1);let o=B();return this.$r.forEachInRange([r,s],(a=>{o=o.add(a.key)})),o}containsKey(t){const e=new at(t,0),r=this.qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class at{constructor(t,e){this.key=t,this.Hr=e}static Qr(t,e){return L.comparator(t.key,e.key)||Q(t.Hr,e.Hr)}static Ur(t,e){return Q(t.Hr,e.Hr)||L.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.er=1,this.Yr=new ot(at.Qr)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new lf(o,e,r,s);this.mutationQueue.push(a);for(const u of s)this.Yr=this.Yr.add(new at(u.key,o)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return P.resolve(a)}lookupMutationBatch(t,e){return P.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Xr(r),o=s<0?0:s;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Js:this.er-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new at(e,0),s=new at(e,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([r,s],(a=>{const u=this.Zr(a.Hr);o.push(u)})),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ot(Q);return e.forEach((s=>{const o=new at(s,0),a=new at(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,a],(u=>{r=r.add(u.Hr)}))})),P.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;L.isDocumentKey(o)||(o=o.child(""));const a=new at(new L(o),0);let u=new ot(Q);return this.Yr.forEachWhile((h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(u=u.add(h.Hr)),!0)}),a),P.resolve(this.ei(u))}ei(t){const e=[];return t.forEach((r=>{const s=this.Zr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){H(this.ti(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return P.forEach(e.mutations,(s=>{const o=new at(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Yr=r}))}rr(t){}containsKey(t,e){const r=new at(e,0),s=this.Yr.firstAfterOrEqual(r);return P.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}ti(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(t){this.ni=t,this.docs=(function(){return new X(L.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ni(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return P.resolve(r?r.document.mutableCopy():Et.newInvalidDocument(e))}getEntries(t,e){let r=$t();return e.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Et.newInvalidDocument(s))})),P.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=$t();const a=e.path,u=new L(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:d,value:{document:m}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Id(Ad(m),r)<=0||(s.has(m.key)||Mr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(t,e,r,s){x(9500)}ri(t,e){return P.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new Wf(this)}getSize(t){return P.resolve(this.size)}}class Wf extends Uf{constructor(t){super(),this.Or=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Or.addEntry(t,s)):this.Or.removeEntry(r)})),P.waitFor(e)}getFromCache(t,e){return this.Or.getEntry(t,e)}getAllFromCache(t,e){return this.Or.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(t){this.persistence=t,this.ii=new Ae((e=>ti(e)),ei),this.lastRemoteSnapshotVersion=O.min(),this.highestTargetId=0,this.si=0,this.oi=new oi,this.targetCount=0,this._i=Oe.ar()}forEachTarget(t,e){return this.ii.forEach(((r,s)=>e(s))),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.si)}allocateTargetId(t){return this.highestTargetId=this._i.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.si&&(this.si=e),P.resolve()}hr(t){this.ii.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this._i=new Oe(e),this.highestTargetId=e),t.sequenceNumber>this.si&&(this.si=t.sequenceNumber)}addTargetData(t,e){return this.hr(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.hr(e),P.resolve()}removeTargetData(t,e){return this.ii.delete(e.target),this.oi.zr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ii.forEach(((a,u)=>{u.sequenceNumber<=e&&r.get(u.targetId)===null&&(this.ii.delete(a),o.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)})),P.waitFor(o).next((()=>s))}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){const r=this.ii.get(e)||null;return P.resolve(r)}addMatchingKeys(t,e,r){return this.oi.Kr(e,r),P.resolve()}removeMatchingKeys(t,e,r){this.oi.Gr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach((a=>{o.push(s.markPotentiallyOrphaned(t,a))})),P.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.oi.zr(e),P.resolve()}getMatchingKeysForTargetId(t,e){const r=this.oi.Jr(e);return P.resolve(r)}containsKey(t,e){return P.resolve(this.oi.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(t,e){this.ai={},this.overlays={},this.ui=new Sr(0),this.ci=!1,this.ci=!0,this.li=new $f,this.referenceDelegate=t(this),this.hi=new Kf(this),this.indexManager=new Nf,this.remoteDocumentCache=(function(s){return new Hf(s)})((r=>this.referenceDelegate.Pi(r))),this.serializer=new Vf(e),this.Ti=new jf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Gf,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ai[t.toKey()];return r||(r=new zf(e,this.referenceDelegate),this.ai[t.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);const s=new Yf(this.ui.next());return this.referenceDelegate.Ii(),r(s).next((o=>this.referenceDelegate.di(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Ei(t,e){return P.or(Object.values(this.ai).map((r=>()=>r.containsKey(t,e))))}}class Yf extends bd{constructor(t){super(),this.currentSequenceNumber=t}}class ai{constructor(t){this.persistence=t,this.Ai=new oi,this.Ri=null}static Vi(t){return new ai(t)}get mi(){if(this.Ri)return this.Ri;throw x(60996)}addReference(t,e,r){return this.Ai.addReference(r,e),this.mi.delete(r.toString()),P.resolve()}removeReference(t,e,r){return this.Ai.removeReference(r,e),this.mi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.mi.add(e.toString()),P.resolve()}removeTarget(t,e){this.Ai.zr(e.targetId).forEach((s=>this.mi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((o=>this.mi.add(o.toString())))})).next((()=>r.removeTargetData(t,e)))}Ii(){this.Ri=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.mi,(r=>{const s=L.fromPath(r);return this.fi(t,s).next((o=>{o||e.removeEntry(s,O.min())}))})).next((()=>(this.Ri=null,e.apply(t))))}updateLimboDocument(t,e){return this.fi(t,e).next((r=>{r?this.mi.delete(e.toString()):this.mi.add(e.toString())}))}Pi(t){return 0}fi(t,e){return P.or([()=>P.resolve(this.Ai.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class Ir{constructor(t,e){this.persistence=t,this.gi=new Ae((r=>Rd(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Qf(this,e)}static Vi(t,e){return new Ir(t,e)}Ii(){}di(t){return P.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}mr(t){const e=this.yr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}yr(t){let e=0;return this.gr(t,(r=>{e++})).next((()=>e))}gr(t,e){return P.forEach(this.gi,((r,s)=>this.Sr(t,r,s).next((o=>o?P.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ri(t,(a=>this.Sr(t,a,e).next((u=>{u||(r++,o.removeEntry(a,O.min()))})))).next((()=>o.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}removeReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}updateLimboDocument(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}Pi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=lr(t.data.value)),e}Sr(t,e,r){return P.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.gi.get(e);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Is=r,this.ds=s}static Es(t,e){let r=B(),s=B();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new li(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=(function(){return Qu()?8:Cd(Ou())>0?6:4})()}initialize(t,e){this.gs=t,this.indexManager=e,this.As=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.ps(t,e).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.ys(t,e,s,r).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new Jf;return this.ws(t,e,a).next((u=>{if(o.result=u,this.Rs)return this.Ss(t,e,a,u.size)}))})).next((()=>o.result))}Ss(t,e,r,s){return r.documentReadCount<this.Vs?(Re()<=j.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Se(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(Re()<=j.DEBUG&&N("QueryEngine","Query:",Se(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(Re()<=j.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Se(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Nt(e))):P.resolve())}ps(t,e){if(ya(e))return P.resolve(null);let r=Nt(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=Tr(e,null,"F"),r=Nt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((o=>{const a=B(...o);return this.gs.getDocuments(t,a).next((u=>this.indexManager.getMinOffset(t,r).next((h=>{const d=this.bs(e,u);return this.Ds(e,d,a,h.readTime)?this.ps(t,Tr(e,null,"F")):this.vs(t,d,e,h)}))))})))))}ys(t,e,r,s){return ya(e)||s.isEqual(O.min())?P.resolve(null):this.gs.getDocuments(t,r).next((o=>{const a=this.bs(e,o);return this.Ds(e,a,r,s)?P.resolve(null):(Re()<=j.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Se(e)),this.vs(t,a,e,Td(s,vn)).next((u=>u)))}))}bs(t,e){let r=new ot(Ll(t));return e.forEach(((s,o)=>{Mr(t,o)&&(r=r.add(o))})),r}Ds(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ws(t,e,r){return Re()<=j.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Se(e)),this.gs.getDocumentsMatchingQuery(t,e,re.min(),r)}vs(t,e,r,s){return this.gs.getDocumentsMatchingQuery(t,r,s).next((o=>(e.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci="LocalStore",Zf=3e8;class tm{constructor(t,e,r,s){this.persistence=t,this.Cs=e,this.serializer=s,this.Fs=new X(Q),this.Ms=new Ae((o=>ti(o)),ei),this.xs=new Map,this.Os=t.getRemoteDocumentCache(),this.hi=t.getTargetCache(),this.Ti=t.getBundleCache(),this.Ns(r)}Ns(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new qf(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Fs)))}}function em(n,t,e,r){return new tm(n,t,e,r)}async function oc(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,e.Ns(t),e.mutationQueue.getAllMutationBatches(r)))).next((o=>{const a=[],u=[];let h=B();for(const d of s){a.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}for(const d of o){u.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next((d=>({Bs:d,removedBatchIds:a,addedBatchIds:u})))}))}))}function nm(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),o=e.Os.newChangeBuffer({trackRemovals:!0});return(function(u,h,d,m){const _=d.batch,v=_.keys();let R=P.resolve();return v.forEach((S=>{R=R.next((()=>m.getEntry(h,S))).next((M=>{const V=d.docVersions.get(S);H(V!==null,48541),M.version.compareTo(V)<0&&(_.applyToRemoteDocument(M,d),M.isValidDocument()&&(M.setReadTime(d.commitVersion),m.addEntry(M)))}))})),R.next((()=>u.mutationQueue.removeMutationBatch(h,_)))})(e,r,t,o).next((()=>o.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let h=B();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(h=h.add(u.batch.mutations[d].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function ac(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.hi.getLastRemoteSnapshotVersion(e)))}function rm(n,t){const e=F(n),r=t.snapshotVersion;let s=e.Fs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=e.Os.newChangeBuffer({trackRemovals:!0});s=e.Fs;const u=[];t.targetChanges.forEach(((m,_)=>{const v=s.get(_);if(!v)return;u.push(e.hi.removeMatchingKeys(o,m.removedDocuments,_).next((()=>e.hi.addMatchingKeys(o,m.addedDocuments,_))));let R=v.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(_)!==null?R=R.withResumeToken(dt.EMPTY_BYTE_STRING,O.min()).withLastLimboFreeSnapshotVersion(O.min()):m.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(m.resumeToken,r)),s=s.insert(_,R),(function(M,V,G){return M.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=Zf?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0})(v,R,m)&&u.push(e.hi.updateTargetData(o,R))}));let h=$t(),d=B();if(t.documentUpdates.forEach((m=>{t.resolvedLimboDocuments.has(m)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))})),u.push(sm(o,a,t.documentUpdates).next((m=>{h=m.Ls,d=m.ks}))),!r.isEqual(O.min())){const m=e.hi.getLastRemoteSnapshotVersion(o).next((_=>e.hi.setTargetsMetadata(o,o.currentSequenceNumber,r)));u.push(m)}return P.waitFor(u).next((()=>a.apply(o))).next((()=>e.localDocuments.getLocalViewOfDocuments(o,h,d))).next((()=>h))})).then((o=>(e.Fs=s,o)))}function sm(n,t,e){let r=B(),s=B();return e.forEach((o=>r=r.add(o))),t.getEntries(n,r).next((o=>{let a=$t();return e.forEach(((u,h)=>{const d=o.get(u);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),h.isNoDocument()&&h.version.isEqual(O.min())?(t.removeEntry(u,h.readTime),a=a.insert(u,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),a=a.insert(u,h)):N(ci,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",h.version)})),{Ls:a,ks:s}}))}function im(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=Js),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function om(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.hi.getTargetData(r,t).next((o=>o?(s=o,P.resolve(s)):e.hi.allocateTargetId(r).next((a=>(s=new Jt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.hi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Fs=e.Fs.insert(r.targetId,r),e.Ms.set(t,r.targetId)),r}))}async function Us(n,t,e){const r=F(n),s=r.Fs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!qe(a))throw a;N(ci,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Fs=r.Fs.remove(t),r.Ms.delete(s.target)}function ka(n,t,e){const r=F(n);let s=O.min(),o=B();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,d,m){const _=F(h),v=_.Ms.get(m);return v!==void 0?P.resolve(_.Fs.get(v)):_.hi.getTargetData(d,m)})(r,a,Nt(t)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,u.targetId).next((h=>{o=h}))})).next((()=>r.Cs.getDocumentsMatchingQuery(a,t,e?s:O.min(),e?o:B()))).next((u=>(am(r,Hd(t),u),{documents:u,qs:o})))))}function am(n,t,e){let r=n.xs.get(t)||O.min();e.forEach(((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)})),n.xs.set(t,r)}class Va{constructor(){this.activeTargetIds=Zd()}Gs(t){this.activeTargetIds=this.activeTargetIds.add(t)}zs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class lm{constructor(){this.Fo=new Va,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Fo.Gs(t),this.Mo[t]||"not-current"}updateQueryState(t,e,r){this.Mo[t]=e}removeLocalQueryTarget(t){this.Fo.zs(t)}isLocalQueryTarget(t){return this.Fo.activeTargetIds.has(t)}clearQueryState(t){delete this.Mo[t]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(t){return this.Fo.activeTargetIds.has(t)}start(){return this.Fo=new Va,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm{xo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="ConnectivityMonitor";class Na{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(t){this.ko.push(t)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){N(Da,"Network connectivity changed: AVAILABLE");for(const t of this.ko)t(0)}Lo(){N(Da,"Network connectivity changed: UNAVAILABLE");for(const t of this.ko)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let or=null;function Bs(){return or===null?or=(function(){return 268435456+Math.round(2147483648*Math.random())})():or++,"0x"+or.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vs="RestConnection",um={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class hm{get Qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=e+"://"+t.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===_r?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(t,e,r,s,o){const a=Bs(),u=this.Go(t,e.toUriEncodedString());N(vs,`Sending RPC '${t}' ${a}:`,u,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(h,s,o);const{host:d}=new URL(u),m=Hs(d);return this.jo(t,u,h,r,m).then((_=>(N(vs,`Received RPC '${t}' ${a}: `,_),_)),(_=>{throw ne(vs,`RPC '${t}' ${a} failed with error: `,_,"url: ",u,"request:",r),_}))}Jo(t,e,r,s,o,a){return this.Wo(t,e,r,s,o)}zo(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ue})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,o)=>t[o]=s)),r&&r.headers.forEach(((s,o)=>t[o]=s))}Go(t,e){const r=um[t];return`${this.$o}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(t){this.Ho=t.Ho,this.Yo=t.Yo}Zo(t){this.Xo=t}e_(t){this.t_=t}n_(t){this.r_=t}onMessage(t){this.i_=t}close(){this.Yo()}send(t){this.Ho(t)}s_(){this.Xo()}o_(){this.t_()}__(t){this.r_(t)}a_(t){this.i_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt="WebChannelConnection";class fm extends hm{constructor(t){super(t),this.u_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}jo(t,e,r,s,o){const a=Bs();return new Promise(((u,h)=>{const d=new al;d.setWithCredentials(!0),d.listenOnce(ll.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case ar.NO_ERROR:const _=d.getResponseJson();N(yt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(_)),u(_);break;case ar.TIMEOUT:N(yt,`RPC '${t}' ${a} timed out`),h(new D(C.DEADLINE_EXCEEDED,"Request time out"));break;case ar.HTTP_ERROR:const v=d.getStatus();if(N(yt,`RPC '${t}' ${a} failed with status:`,v,"response text:",d.getResponseText()),v>0){let R=d.getResponseJson();Array.isArray(R)&&(R=R[0]);const S=R==null?void 0:R.error;if(S&&S.status&&S.message){const M=(function(G){const U=G.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(U)>=0?U:C.UNKNOWN})(S.status);h(new D(M,S.message))}else h(new D(C.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new D(C.UNAVAILABLE,"Connection failed."));break;default:x(9055,{c_:t,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{N(yt,`RPC '${t}' ${a} completed.`)}}));const m=JSON.stringify(s);N(yt,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",m,r,15)}))}P_(t,e,r){const s=Bs(),o=[this.$o,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=hl(),u=ul(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.zo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");N(yt,`Creating RPC '${t}' stream ${s}: ${m}`,h);const _=a.createWebChannel(m,h);this.T_(_);let v=!1,R=!1;const S=new dm({Ho:V=>{R?N(yt,`Not sending because RPC '${t}' stream ${s} is closed:`,V):(v||(N(yt,`Opening RPC '${t}' stream ${s} transport.`),_.open(),v=!0),N(yt,`RPC '${t}' stream ${s} sending:`,V),_.send(V))},Yo:()=>_.close()}),M=(V,G,U)=>{V.listen(G,($=>{try{U($)}catch(nt){setTimeout((()=>{throw nt}),0)}}))};return M(_,cn.EventType.OPEN,(()=>{R||(N(yt,`RPC '${t}' stream ${s} transport opened.`),S.s_())})),M(_,cn.EventType.CLOSE,(()=>{R||(R=!0,N(yt,`RPC '${t}' stream ${s} transport closed`),S.__(),this.I_(_))})),M(_,cn.EventType.ERROR,(V=>{R||(R=!0,ne(yt,`RPC '${t}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),S.__(new D(C.UNAVAILABLE,"The operation could not be completed")))})),M(_,cn.EventType.MESSAGE,(V=>{var G;if(!R){const U=V.data[0];H(!!U,16349);const $=U,nt=($==null?void 0:$.error)||((G=$[0])===null||G===void 0?void 0:G.error);if(nt){N(yt,`RPC '${t}' stream ${s} received error:`,nt);const Ft=nt.status;let lt=(function(y){const E=rt[y];if(E!==void 0)return Wl(E)})(Ft),A=nt.message;lt===void 0&&(lt=C.INTERNAL,A="Unknown error status: "+Ft+" with message "+nt.message),R=!0,S.__(new D(lt,A)),_.close()}else N(yt,`RPC '${t}' stream ${s} received:`,U),S.a_(U)}})),M(u,cl.STAT_EVENT,(V=>{V.stat===Ss.PROXY?N(yt,`RPC '${t}' stream ${s} detected buffering proxy`):V.stat===Ss.NOPROXY&&N(yt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{S.o_()}),0),S}terminate(){this.u_.forEach((t=>t.close())),this.u_=[]}T_(t){this.u_.push(t)}I_(t){this.u_=this.u_.filter((e=>e===t))}}function Ts(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(n){return new yf(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Fi=t,this.timerId=e,this.d_=r,this.E_=s,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();const e=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,e-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),t()))),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma="PersistentStream";class cc{constructor(t,e,r,s,o,a,u,h){this.Fi=t,this.w_=r,this.S_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new lc(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(Gt(e.toString()),Gt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.n_(e)}U_(){}auth(){this.state=1;const t=this.K_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===e&&this.W_(r,s)}),(r=>{t((()=>{const s=new D(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}W_(t,e){const r=this.K_(this.b_);this.stream=this.z_(t,e),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.e_((()=>{r((()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.e_())))})),this.stream.n_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.C_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(t){return N(Ma,`close with error: ${t}`),this.stream=null,this.close(4,t)}K_(t){return e=>{this.Fi.enqueueAndForget((()=>this.b_===t?e():(N(Ma,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class mm extends cc{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=vf(this.serializer,t),r=(function(o){if(!("targetChange"in o))return O.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?O.min():a.readTime?Mt(a.readTime):O.min()})(t);return this.listener.J_(e,r)}H_(t){const e={};e.database=Qs(this.serializer),e.addTarget=(function(o,a){let u;const h=a.target;if(u=Ms(h)?{documents:If(o,h)}:{query:wf(o,h).Vt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Jl(o,a.resumeToken);const d=xs(o,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(O.min())>0){u.readTime=Ar(o,a.snapshotVersion.toTimestamp());const d=xs(o,a.expectedCount);d!==null&&(u.expectedCount=d)}return u})(this.serializer,t);const r=Cf(this.serializer,t);r&&(e.labels=r),this.k_(e)}Y_(t){const e={};e.database=Qs(this.serializer),e.removeTarget=t,this.k_(e)}}class pm extends cc{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return H(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){H(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();const e=Af(t.writeResults,t.commitTime),r=Mt(t.commitTime);return this.listener.ta(r,e)}na(){const t={};t.database=Qs(this.serializer),this.k_(t)}X_(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>Tf(this.serializer,r)))};this.k_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{}class ym extends gm{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new D(C.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Wo(t,Os(e,r),s,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(C.UNKNOWN,o.toString())}))}Jo(t,e,r,s,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.Jo(t,Os(e,r),s,a,u,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(C.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}class _m{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Gt(e),this._a=!1):N("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Te="RemoteStore";class Em{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo((a=>{r.enqueueAndForget((async()=>{Ie(this)&&(N(Te,"Restarting streams for network reachability change."),await(async function(h){const d=F(h);d.Ia.add(4),await Dn(d),d.Aa.set("Unknown"),d.Ia.delete(4),await Ur(d)})(this))}))})),this.Aa=new _m(r,s)}}async function Ur(n){if(Ie(n))for(const t of n.da)await t(!0)}async function Dn(n){for(const t of n.da)await t(!1)}function uc(n,t){const e=F(n);e.Ta.has(t.targetId)||(e.Ta.set(t.targetId,t),fi(e)?di(e):Ge(e).x_()&&hi(e,t))}function ui(n,t){const e=F(n),r=Ge(e);e.Ta.delete(t),r.x_()&&hc(e,t),e.Ta.size===0&&(r.x_()?r.B_():Ie(e)&&e.Aa.set("Unknown"))}function hi(n,t){if(n.Ra.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(O.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Ge(n).H_(t)}function hc(n,t){n.Ra.$e(t),Ge(n).Y_(t)}function di(n){n.Ra=new ff({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>n.Ta.get(t)||null,lt:()=>n.datastore.serializer.databaseId}),Ge(n).start(),n.Aa.aa()}function fi(n){return Ie(n)&&!Ge(n).M_()&&n.Ta.size>0}function Ie(n){return F(n).Ia.size===0}function dc(n){n.Ra=void 0}async function vm(n){n.Aa.set("Online")}async function Tm(n){n.Ta.forEach(((t,e)=>{hi(n,t)}))}async function Am(n,t){dc(n),fi(n)?(n.Aa.la(t),di(n)):n.Aa.set("Unknown")}async function Im(n,t,e){if(n.Aa.set("Online"),t instanceof Yl&&t.state===2&&t.cause)try{await(async function(s,o){const a=o.cause;for(const u of o.targetIds)s.Ta.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ta.delete(u),s.Ra.removeTarget(u))})(n,t)}catch(r){N(Te,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await wr(n,r)}else if(t instanceof hr?n.Ra.Ye(t):t instanceof Kl?n.Ra.it(t):n.Ra.et(t),!e.isEqual(O.min()))try{const r=await ac(n.localStore);e.compareTo(r)>=0&&await(function(o,a){const u=o.Ra.Pt(a);return u.targetChanges.forEach(((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ta.get(d);m&&o.Ta.set(d,m.withResumeToken(h.resumeToken,a))}})),u.targetMismatches.forEach(((h,d)=>{const m=o.Ta.get(h);if(!m)return;o.Ta.set(h,m.withResumeToken(dt.EMPTY_BYTE_STRING,m.snapshotVersion)),hc(o,h);const _=new Jt(m.target,h,d,m.sequenceNumber);hi(o,_)})),o.remoteSyncer.applyRemoteEvent(u)})(n,e)}catch(r){N(Te,"Failed to raise snapshot:",r),await wr(n,r)}}async function wr(n,t,e){if(!qe(t))throw t;n.Ia.add(1),await Dn(n),n.Aa.set("Offline"),e||(e=()=>ac(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{N(Te,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await Ur(n)}))}function fc(n,t){return t().catch((e=>wr(n,e,t)))}async function Br(n){const t=F(n),e=ae(t);let r=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:Js;for(;wm(t);)try{const s=await im(t.localStore,r);if(s===null){t.Pa.length===0&&e.B_();break}r=s.batchId,bm(t,s)}catch(s){await wr(t,s)}mc(t)&&pc(t)}function wm(n){return Ie(n)&&n.Pa.length<10}function bm(n,t){n.Pa.push(t);const e=ae(n);e.x_()&&e.Z_&&e.X_(t.mutations)}function mc(n){return Ie(n)&&!ae(n).M_()&&n.Pa.length>0}function pc(n){ae(n).start()}async function Cm(n){ae(n).na()}async function Pm(n){const t=ae(n);for(const e of n.Pa)t.X_(e.mutations)}async function Rm(n,t,e){const r=n.Pa.shift(),s=ri.from(r,t,e);await fc(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Br(n)}async function Sm(n,t){t&&ae(n).Z_&&await(async function(r,s){if((function(a){return hf(a)&&a!==C.ABORTED})(s.code)){const o=r.Pa.shift();ae(r).N_(),await fc(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s))),await Br(r)}})(n,t),mc(n)&&pc(n)}async function La(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),N(Te,"RemoteStore received new credentials");const r=Ie(e);e.Ia.add(3),await Dn(e),r&&e.Aa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Ur(e)}async function km(n,t){const e=F(n);t?(e.Ia.delete(2),await Ur(e)):t||(e.Ia.add(2),await Dn(e),e.Aa.set("Unknown"))}function Ge(n){return n.Va||(n.Va=(function(e,r,s){const o=F(e);return o.ia(),new mm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:vm.bind(null,n),e_:Tm.bind(null,n),n_:Am.bind(null,n),J_:Im.bind(null,n)}),n.da.push((async t=>{t?(n.Va.N_(),fi(n)?di(n):n.Aa.set("Unknown")):(await n.Va.stop(),dc(n))}))),n.Va}function ae(n){return n.ma||(n.ma=(function(e,r,s){const o=F(e);return o.ia(),new pm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Cm.bind(null,n),n_:Sm.bind(null,n),ea:Pm.bind(null,n),ta:Rm.bind(null,n)}),n.da.push((async t=>{t?(n.ma.N_(),await Br(n)):(await n.ma.stop(),n.Pa.length>0&&(N(Te,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new qt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,u=new mi(t,e,a,s,o);return u.start(r),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function pi(n,t){if(Gt("AsyncQueue",`${t}: ${n}`),qe(n))return new D(C.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{static emptySet(t){return new Ne(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||L.comparator(e.key,r.key):(e,r)=>L.comparator(e.key,r.key),this.keyedMap=un(),this.sortedSet=new X(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ne)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Ne;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(){this.fa=new X(L.comparator)}track(t){const e=t.doc.key,r=this.fa.get(e);r?t.type!==0&&r.type===3?this.fa=this.fa.insert(e,t):t.type===3&&r.type!==1?this.fa=this.fa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.fa=this.fa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.fa=this.fa.remove(e):t.type===1&&r.type===2?this.fa=this.fa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):x(63341,{At:t,ga:r}):this.fa=this.fa.insert(e,t)}pa(){const t=[];return this.fa.inorderTraversal(((e,r)=>{t.push(r)})),t}}class Fe{constructor(t,e,r,s,o,a,u,h,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach((u=>{a.push({type:0,doc:u})})),new Fe(t,e,Ne.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Nr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some((t=>t.ba()))}}class Dm{constructor(){this.queries=Oa(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=Oa(),o.forEach(((a,u)=>{for(const h of u.wa)h.onError(r)}))})(this,new D(C.ABORTED,"Firestore shutting down"))}}function Oa(){return new Ae((n=>Ml(n)),Nr)}async function gi(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.Sa()&&t.ba()&&(r=2):(o=new Vm,r=t.ba()?0:1);try{switch(r){case 0:o.ya=await e.onListen(s,!0);break;case 1:o.ya=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=pi(a,`Initialization of query '${Se(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,o),o.wa.push(t),t.va(e.onlineState),o.ya&&t.Ca(o.ya)&&_i(e)}async function yi(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.wa.indexOf(t);a>=0&&(o.wa.splice(a,1),o.wa.length===0?s=t.ba()?0:1:!o.Sa()&&t.ba()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Nm(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const u of a.wa)u.Ca(s)&&(r=!0);a.ya=s}}r&&_i(e)}function Mm(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.wa)o.onError(e);r.queries.delete(t)}function _i(n){n.Da.forEach((t=>{t.next()}))}var qs,Fa;(Fa=qs||(qs={})).Fa="default",Fa.Cache="cache";class Ei{constructor(t,e,r){this.query=t,this.Ma=e,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Fe(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.xa?this.Na(t)&&(this.Ma.next(t),e=!0):this.Ba(t,this.onlineState)&&(this.La(t),e=!0),this.Oa=t,e}onError(t){this.Ma.error(t)}va(t){this.onlineState=t;let e=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,t)&&(this.La(this.Oa),e=!0),e}Ba(t,e){if(!t.fromCache||!this.ba())return!0;const r=e!=="Offline";return(!this.options.ka||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Na(t){if(t.docChanges.length>0)return!0;const e=this.Oa&&this.Oa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}La(t){t=Fe.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.xa=!0,this.Ma.next(t)}ba(){return this.options.source!==qs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(t){this.key=t}}class yc{constructor(t){this.key=t}}class Lm{constructor(t,e){this.query=t,this.Ha=e,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=B(),this.mutatedKeys=B(),this.Xa=Ll(t),this.eu=new Ne(this.Xa)}get tu(){return this.Ha}nu(t,e){const r=e?e.ru:new xa,s=e?e.eu:this.eu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((m,_)=>{const v=s.get(m),R=Mr(this.query,_)?_:null,S=!!v&&this.mutatedKeys.has(v.key),M=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let V=!1;v&&R?v.data.isEqual(R.data)?S!==M&&(r.track({type:3,doc:R}),V=!0):this.iu(v,R)||(r.track({type:2,doc:R}),V=!0,(h&&this.Xa(R,h)>0||d&&this.Xa(R,d)<0)&&(u=!0)):!v&&R?(r.track({type:0,doc:R}),V=!0):v&&!R&&(r.track({type:1,doc:v}),V=!0,(h||d)&&(u=!0)),V&&(R?(a=a.add(R),o=M?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{eu:a,ru:r,Ds:u,mutatedKeys:o}}iu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.eu;this.eu=t.eu,this.mutatedKeys=t.mutatedKeys;const a=t.ru.pa();a.sort(((m,_)=>(function(R,S){const M=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{At:V})}};return M(R)-M(S)})(m.type,_.type)||this.Xa(m.doc,_.doc))),this.su(r),s=s!=null&&s;const u=e&&!s?this.ou():[],h=this.Za.size===0&&this.current&&!s?1:0,d=h!==this.Ya;return this.Ya=h,a.length!==0||d?{snapshot:new Fe(this.query,t.eu,o,a,t.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:u}:{_u:u}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new xa,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(t){return!this.Ha.has(t)&&!!this.eu.has(t)&&!this.eu.get(t).hasLocalMutations}su(t){t&&(t.addedDocuments.forEach((e=>this.Ha=this.Ha.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ha=this.Ha.delete(e))),this.current=t.current)}ou(){if(!this.current)return[];const t=this.Za;this.Za=B(),this.eu.forEach((r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))}));const e=[];return t.forEach((r=>{this.Za.has(r)||e.push(new yc(r))})),this.Za.forEach((r=>{t.has(r)||e.push(new gc(r))})),e}uu(t){this.Ha=t.qs,this.Za=B();const e=this.nu(t.documents);return this.applyChanges(e,!0)}cu(){return Fe.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const vi="SyncEngine";class xm{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Om{constructor(t){this.key=t,this.lu=!1}}class Fm{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Ae((u=>Ml(u)),Nr),this.Tu=new Map,this.Iu=new Set,this.du=new X(L.comparator),this.Eu=new Map,this.Au=new oi,this.Ru={},this.Vu=new Map,this.mu=Oe.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function Qm(n,t,e=!0){const r=Ic(n);let s;const o=r.Pu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.cu()):s=await _c(r,t,e,!0),s}async function Um(n,t){const e=Ic(n);await _c(e,t,!0,!1)}async function _c(n,t,e,r){const s=await om(n.localStore,Nt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let u;return r&&(u=await Bm(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&uc(n.remoteStore,s),u}async function Bm(n,t,e,r,s){n.gu=(_,v,R)=>(async function(M,V,G,U){let $=V.view.nu(G);$.Ds&&($=await ka(M.localStore,V.query,!1).then((({documents:A})=>V.view.nu(A,$))));const nt=U&&U.targetChanges.get(V.targetId),Ft=U&&U.targetMismatches.get(V.targetId)!=null,lt=V.view.applyChanges($,M.isPrimaryClient,nt,Ft);return Ua(M,V.targetId,lt._u),lt.snapshot})(n,_,v,R);const o=await ka(n.localStore,t,!0),a=new Lm(t,o.qs),u=a.nu(o.documents),h=Vn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),d=a.applyChanges(u,n.isPrimaryClient,h);Ua(n,e,d._u);const m=new xm(t,e,a);return n.Pu.set(t,m),n.Tu.has(e)?n.Tu.get(e).push(t):n.Tu.set(e,[t]),d.snapshot}async function qm(n,t,e){const r=F(n),s=r.Pu.get(t),o=r.Tu.get(s.targetId);if(o.length>1)return r.Tu.set(s.targetId,o.filter((a=>!Nr(a,t)))),void r.Pu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Us(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&ui(r.remoteStore,s.targetId),js(r,s.targetId)})).catch(Be)):(js(r,s.targetId),await Us(r.localStore,s.targetId,!0))}async function jm(n,t){const e=F(n),r=e.Pu.get(t),s=e.Tu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),ui(e.remoteStore,r.targetId))}async function Gm(n,t,e){const r=Jm(n);try{const s=await(function(a,u){const h=F(a),d=J.now(),m=u.reduce(((R,S)=>R.add(S.key)),B());let _,v;return h.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let S=$t(),M=B();return h.Os.getEntries(R,m).next((V=>{S=V,S.forEach(((G,U)=>{U.isValidDocument()||(M=M.add(G))}))})).next((()=>h.localDocuments.getOverlayedDocuments(R,S))).next((V=>{_=V;const G=[];for(const U of u){const $=of(U,_.get(U.key).overlayedDocument);$!=null&&G.push(new he(U.key,$,Cl($.value.mapValue),Ct.exists(!0)))}return h.mutationQueue.addMutationBatch(R,d,G,u)})).next((V=>{v=V;const G=V.applyToLocalDocumentSet(_,M);return h.documentOverlayCache.saveOverlays(R,V.batchId,G)}))})).then((()=>({batchId:v.batchId,changes:Ol(_)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,u,h){let d=a.Ru[a.currentUser.toKey()];d||(d=new X(Q)),d=d.insert(u,h),a.Ru[a.currentUser.toKey()]=d})(r,s.batchId,e),await Nn(r,s.changes),await Br(r.remoteStore)}catch(s){const o=pi(s,"Failed to persist write");e.reject(o)}}async function Ec(n,t){const e=F(n);try{const r=await rm(e.localStore,t);t.targetChanges.forEach(((s,o)=>{const a=e.Eu.get(o);a&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?H(a.lu,14607):s.removedDocuments.size>0&&(H(a.lu,42227),a.lu=!1))})),await Nn(e,r,t)}catch(r){await Be(r)}}function Qa(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Pu.forEach(((o,a)=>{const u=a.view.va(t);u.snapshot&&s.push(u.snapshot)})),(function(a,u){const h=F(a);h.onlineState=u;let d=!1;h.queries.forEach(((m,_)=>{for(const v of _.wa)v.va(u)&&(d=!0)})),d&&_i(h)})(r.eventManager,t),s.length&&r.hu.J_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function $m(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Eu.get(t),o=s&&s.key;if(o){let a=new X(L.comparator);a=a.insert(o,Et.newNoDocument(o,O.min()));const u=B().add(o),h=new Fr(O.min(),new Map,new X(Q),a,u);await Ec(r,h),r.du=r.du.remove(o),r.Eu.delete(t),Ti(r)}else await Us(r.localStore,t,!1).then((()=>js(r,t,e))).catch(Be)}async function zm(n,t){const e=F(n),r=t.batch.batchId;try{const s=await nm(e.localStore,t);Tc(e,r,null),vc(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Nn(e,s)}catch(s){await Be(s)}}async function Hm(n,t,e){const r=F(n);try{const s=await(function(a,u){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let m;return h.mutationQueue.lookupMutationBatch(d,u).next((_=>(H(_!==null,37113),m=_.keys(),h.mutationQueue.removeMutationBatch(d,_)))).next((()=>h.mutationQueue.performConsistencyCheck(d))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(d,m,u))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m))).next((()=>h.localDocuments.getDocuments(d,m)))}))})(r.localStore,t);Tc(r,t,e),vc(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Nn(r,s)}catch(s){await Be(s)}}function vc(n,t){(n.Vu.get(t)||[]).forEach((e=>{e.resolve()})),n.Vu.delete(t)}function Tc(n,t,e){const r=F(n);let s=r.Ru[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.Ru[r.currentUser.toKey()]=s}}function js(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Tu.get(t))n.Pu.delete(r),e&&n.hu.pu(r,e);n.Tu.delete(t),n.isPrimaryClient&&n.Au.zr(t).forEach((r=>{n.Au.containsKey(r)||Ac(n,r)}))}function Ac(n,t){n.Iu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(ui(n.remoteStore,e),n.du=n.du.remove(t),n.Eu.delete(e),Ti(n))}function Ua(n,t,e){for(const r of e)r instanceof gc?(n.Au.addReference(r.key,t),Wm(n,r)):r instanceof yc?(N(vi,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,t),n.Au.containsKey(r.key)||Ac(n,r.key)):x(19791,{yu:r})}function Wm(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Iu.has(r)||(N(vi,"New document in limbo: "+e),n.Iu.add(r),Ti(n))}function Ti(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Iu.values().next().value;n.Iu.delete(t);const e=new L(K.fromString(t)),r=n.mu.next();n.Eu.set(r,new Om(e)),n.du=n.du.insert(e,r),uc(n.remoteStore,new Jt(Nt(Dr(e.path)),r,"TargetPurposeLimboResolution",Sr.ue))}}async function Nn(n,t,e){const r=F(n),s=[],o=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach(((u,h)=>{a.push(r.gu(h,t,e).then((d=>{var m;if((d||e)&&r.isPrimaryClient){const _=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,_?"current":"not-current")}if(d){s.push(d);const _=li.Es(h.targetId,d);o.push(_)}})))})),await Promise.all(a),r.hu.J_(s),await(async function(h,d){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(_=>P.forEach(d,(v=>P.forEach(v.Is,(R=>m.persistence.referenceDelegate.addReference(_,v.targetId,R))).next((()=>P.forEach(v.ds,(R=>m.persistence.referenceDelegate.removeReference(_,v.targetId,R)))))))))}catch(_){if(!qe(_))throw _;N(ci,"Failed to update sequence numbers: "+_)}for(const _ of d){const v=_.targetId;if(!_.fromCache){const R=m.Fs.get(v),S=R.snapshotVersion,M=R.withLastLimboFreeSnapshotVersion(S);m.Fs=m.Fs.insert(v,M)}}})(r.localStore,o))}async function Km(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){N(vi,"User change. New user:",t.toKey());const r=await oc(e.localStore,t);e.currentUser=t,(function(o,a){o.Vu.forEach((u=>{u.forEach((h=>{h.reject(new D(C.CANCELLED,a))}))})),o.Vu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Nn(e,r.Bs)}}function Ym(n,t){const e=F(n),r=e.Eu.get(t);if(r&&r.lu)return B().add(r.key);{let s=B();const o=e.Tu.get(t);if(!o)return s;for(const a of o){const u=e.Pu.get(a);s=s.unionWith(u.view.tu)}return s}}function Ic(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ec.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ym.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=$m.bind(null,t),t.hu.J_=Nm.bind(null,t.eventManager),t.hu.pu=Mm.bind(null,t.eventManager),t}function Jm(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=zm.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Hm.bind(null,t),t}class br{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Qr(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Du(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Cu(t,this.localStore),this.indexBackfillerScheduler=this.Fu(t,this.localStore)}Cu(t,e){return null}Fu(t,e){return null}vu(t){return em(this.persistence,new Xf,t.initialUser,this.serializer)}Du(t){return new ic(ai.Vi,this.serializer)}bu(t){return new lm}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}br.provider={build:()=>new br};class Xm extends br{constructor(t){super(),this.cacheSizeBytes=t}Cu(t,e){H(this.persistence.referenceDelegate instanceof Ir,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Of(r,t.asyncQueue,e)}Du(t){const e=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new ic((r=>Ir.Vi(r,e)),this.serializer)}}class Gs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Qa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Km.bind(null,this.syncEngine),await km(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Dm})()}createDatastore(t){const e=Qr(t.databaseInfo.databaseId),r=(function(o){return new fm(o)})(t.databaseInfo);return(function(o,a,u,h){return new ym(o,a,u,h)})(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,o,a,u){return new Em(r,s,o,a,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>Qa(this.syncEngine,e,0)),(function(){return Na.C()?new Na:new cm})())}createSyncEngine(t,e){return(function(s,o,a,u,h,d,m){const _=new Fm(s,o,a,u,h,d);return m&&(_.fu=!0),_})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const o=F(s);N(Te,"RemoteStore shutting down."),o.Ia.add(5),await Dn(o),o.Ea.shutdown(),o.Aa.set("Unknown")})(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}Gs.provider={build:()=>new Gs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.xu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.xu(this.observer.error,t):Gt("Uncaught Error in snapshot listener:",t.toString()))}Ou(){this.muted=!0}xu(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le="FirestoreClient";class Zm{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=_t.UNAUTHENTICATED,this.clientId=Ys.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async a=>{N(le,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(N(le,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new qt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=pi(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function As(n,t){n.asyncQueue.verifyOperationInProgress(),N(le,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await oc(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>{ne("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then((()=>{N("Terminating Firestore due to IndexedDb database deletion completed successfully")})).catch((s=>{ne("Terminating Firestore due to IndexedDb database deletion failed",s)}))})),n._offlineComponents=t}async function Ba(n,t){n.asyncQueue.verifyOperationInProgress();const e=await tp(n);N(le,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>La(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>La(t.remoteStore,s))),n._onlineComponents=t}async function tp(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(le,"Using user provided OfflineComponentProvider");try{await As(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;ne("Error using user provided cache. Falling back to memory cache: "+e),await As(n,new br)}}else N(le,"Using default OfflineComponentProvider"),await As(n,new Xm(void 0));return n._offlineComponents}async function wc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(le,"Using user provided OnlineComponentProvider"),await Ba(n,n._uninitializedComponentsProvider._online)):(N(le,"Using default OnlineComponentProvider"),await Ba(n,new Gs))),n._onlineComponents}function ep(n){return wc(n).then((t=>t.syncEngine))}async function Cr(n){const t=await wc(n),e=t.eventManager;return e.onListen=Qm.bind(null,t.syncEngine),e.onUnlisten=qm.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Um.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=jm.bind(null,t.syncEngine),e}function np(n,t,e={}){const r=new qt;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,u,h,d){const m=new Ai({next:v=>{m.Ou(),a.enqueueAndForget((()=>yi(o,_)));const R=v.docs.has(u);!R&&v.fromCache?d.reject(new D(C.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&v.fromCache&&h&&h.source==="server"?d.reject(new D(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(v)},error:v=>d.reject(v)}),_=new Ei(Dr(u.path),m,{includeMetadataChanges:!0,ka:!0});return gi(o,_)})(await Cr(n),n.asyncQueue,t,e,r))),r.promise}function rp(n,t,e={}){const r=new qt;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,u,h,d){const m=new Ai({next:v=>{m.Ou(),a.enqueueAndForget((()=>yi(o,_))),v.fromCache&&h.source==="server"?d.reject(new D(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(v)},error:v=>d.reject(v)}),_=new Ei(u,m,{includeMetadataChanges:!0,ka:!0});return gi(o,_)})(await Cr(n),n.asyncQueue,t,e,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc="firestore.googleapis.com",ja=!0;class Ga{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new D(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Cc,this.ssl=ja}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:ja;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=sc;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Lf)throw new D(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Ed("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=bc((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new D(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new D(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new D(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class qr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ga({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ga(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new ud;switch(r.type){case"firstParty":return new md(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=qa.get(e);r&&(N("ComponentProvider","Removing Datastore"),qa.delete(e),r.terminate())})(this),Promise.resolve()}}function sp(n,t,e,r={}){var s;n=Rt(n,qr);const o=Hs(t),a=n._getSettings(),u=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(Du(`https://${h}`),xu("Firestore",!0)),a.host!==Cc&&a.host!==h&&ne("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!mr(d,u)&&(n._setSettings(d),r.mockUserToken)){let m,_;if(typeof r.mockUserToken=="string")m=r.mockUserToken,_=_t.MOCK_USER;else{m=Nu(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const v=r.mockUserToken.sub||r.mockUserToken.user_id;if(!v)throw new D(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new _t(v)}n._authCredentials=new hd(new fl(m,_))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new zt(this.firestore,t,this._query)}}class et{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ee(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new et(this.firestore,t,this._key)}toJSON(){return{type:et._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(Sn(e,et._jsonSchema))return new et(t,r||null,new L(K.fromString(e.referencePath)))}}et._jsonSchemaVersion="firestore/documentReference/1.0",et._jsonSchema={type:it("string",et._jsonSchemaVersion),referencePath:it("string")};class ee extends zt{constructor(t,e,r){super(t,e,Dr(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new et(this.firestore,null,new L(t))}withConverter(t){return new ee(this.firestore,t,this._path)}}function kp(n,t,...e){if(n=kt(n),pl("collection","path",t),n instanceof qr){const r=K.fromString(t,...e);return ra(r),new ee(n,null,r)}{if(!(n instanceof et||n instanceof ee))throw new D(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(K.fromString(t,...e));return ra(r),new ee(n.firestore,null,r)}}function Vp(n,t,...e){if(n=kt(n),arguments.length===1&&(t=Ys.newId()),pl("doc","path",t),n instanceof qr){const r=K.fromString(t,...e);return na(r),new et(n,null,new L(r))}{if(!(n instanceof et||n instanceof ee))throw new D(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(K.fromString(t,...e));return na(r),new et(n.firestore,n instanceof ee?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a="AsyncQueue";class za{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new lc(this,"async_queue_retry"),this.oc=()=>{const r=Ts();r&&N($a,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=t;const e=Ts();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;const e=Ts();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise((()=>{}));const e=new qt;return this.uc((()=>this.Xu&&this.rc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Zu.push(t),this.cc())))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!qe(t))throw t;N($a,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_((()=>this.cc()))}}uc(t){const e=this._c.then((()=>(this.nc=!0,t().catch((r=>{throw this.tc=r,this.nc=!1,Gt("INTERNAL UNHANDLED ERROR: ",Ha(r)),r})).then((r=>(this.nc=!1,r))))));return this._c=e,e}enqueueAfterDelay(t,e,r){this.ac(),this.sc.indexOf(t)>-1&&(e=0);const s=mi.createAndSchedule(this,t,e,r,(o=>this.lc(o)));return this.ec.push(s),s}ac(){this.tc&&x(47125,{hc:Ha(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(const e of this.ec)if(e.timerId===t)return!0;return!1}Ic(t){return this.Pc().then((()=>{this.ec.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.ec)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Pc()}))}dc(t){this.sc.push(t)}lc(t){const e=this.ec.indexOf(t);this.ec.splice(e,1)}}function Ha(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wa(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1})(n,["next","error","complete"])}class ce extends qr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new za,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new za(t),this._firestoreClient=void 0,await t}}}function Dp(n,t){const e=typeof n=="object"?n:Jh(),r=typeof n=="string"?n:_r,s=$h(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=ku("firestore");o&&sp(s,...o)}return s}function Mn(n){if(n._terminated)throw new D(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ip(n),n._firestoreClient}function ip(n){var t,e,r;const s=n._freezeSettings(),o=(function(u,h,d,m){return new Vd(u,h,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,bc(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)})(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new Zm(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&(function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Pt(dt.fromBase64String(t))}catch(e){throw new D(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Pt(dt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Pt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Sn(t,Pt._jsonSchema))return Pt.fromBase64String(t.bytes)}}Pt._jsonSchemaVersion="firestore/bytes/1.0",Pt._jsonSchema={type:it("string",Pt._jsonSchemaVersion),bytes:it("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ht(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return Q(this._lat,t._lat)||Q(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Lt._jsonSchemaVersion}}static fromJSON(t){if(Sn(t,Lt._jsonSchema))return new Lt(t.latitude,t.longitude)}}Lt._jsonSchemaVersion="firestore/geoPoint/1.0",Lt._jsonSchema={type:it("string",Lt._jsonSchemaVersion),latitude:it("number"),longitude:it("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:xt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Sn(t,xt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new xt(t.vectorValues);throw new D(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}xt._jsonSchemaVersion="firestore/vectorValue/1.0",xt._jsonSchema={type:it("string",xt._jsonSchemaVersion),vectorValues:it("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const op=/^__.*__$/;class ap{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new he(t,this.data,this.fieldMask,e,this.fieldTransforms):new kn(t,this.data,e,this.fieldTransforms)}}class Pc{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new he(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Rc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{Ec:n})}}class Ii{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(t){return new Ii(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Rc({path:r,mc:!1});return s.fc(t),s}gc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(t){return this.Rc({path:void 0,mc:!0})}wc(t){return Pr(t,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.fc(this.path.get(t))}fc(t){if(t.length===0)throw this.wc("Document fields must not be empty");if(Rc(this.Ec)&&op.test(t))throw this.wc('Document fields cannot begin and end with "__"')}}class lp{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Qr(t)}Dc(t,e,r,s=!1){return new Ii({Ec:t,methodName:e,bc:r,path:ht.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function wi(n){const t=n._freezeSettings(),e=Qr(n._databaseId);return new lp(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Sc(n,t,e,r,s,o={}){const a=n.Dc(o.merge||o.mergeFields?2:0,t,e,s);Pi("Data must be an object, but it was:",a,r);const u=kc(r,a);let h,d;if(o.merge)h=new bt(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const _ of o.mergeFields){const v=$s(t,_,e);if(!a.contains(v))throw new D(C.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Dc(m,v)||m.push(v)}h=new bt(m),d=a.fieldTransforms.filter((_=>h.covers(_.field)))}else h=null,d=a.fieldTransforms;return new ap(new It(u),h,d)}class Gr extends Ln{_toFieldTransform(t){if(t.Ec!==2)throw t.Ec===1?t.wc(`${this._methodName}() can only appear at the top level of your update data`):t.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Gr}}class bi extends Ln{_toFieldTransform(t){return new $l(t.path,new bn)}isEqual(t){return t instanceof bi}}class Ci extends Ln{constructor(t,e){super(t),this.Cc=e}_toFieldTransform(t){const e=new Rn(t.serializer,Ul(t.serializer,this.Cc));return new $l(t.path,e)}isEqual(t){return t instanceof Ci&&this.Cc===t.Cc}}function cp(n,t,e,r){const s=n.Dc(1,t,e);Pi("Data must be an object, but it was:",s,r);const o=[],a=It.empty();ue(r,((h,d)=>{const m=Ri(t,h,e);d=kt(d);const _=s.gc(m);if(d instanceof Gr)o.push(m);else{const v=xn(d,_);v!=null&&(o.push(m),a.set(m,v))}}));const u=new bt(o);return new Pc(a,u,s.fieldTransforms)}function up(n,t,e,r,s,o){const a=n.Dc(1,t,e),u=[$s(t,r,e)],h=[s];if(o.length%2!=0)throw new D(C.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<o.length;v+=2)u.push($s(t,o[v])),h.push(o[v+1]);const d=[],m=It.empty();for(let v=u.length-1;v>=0;--v)if(!Dc(d,u[v])){const R=u[v];let S=h[v];S=kt(S);const M=a.gc(R);if(S instanceof Gr)d.push(R);else{const V=xn(S,M);V!=null&&(d.push(R),m.set(R,V))}}const _=new bt(d);return new Pc(m,_,a.fieldTransforms)}function hp(n,t,e,r=!1){return xn(e,n.Dc(r?4:3,t))}function xn(n,t){if(Vc(n=kt(n)))return Pi("Unsupported field value:",t,n),kc(n,t);if(n instanceof Ln)return(function(r,s){if(!Rc(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.mc&&t.Ec!==4)throw t.wc("Nested arrays are not supported");return(function(r,s){const o=[];let a=0;for(const u of r){let h=xn(u,s.yc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}})(n,t)}return(function(r,s){if((r=kt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ul(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=J.fromDate(r);return{timestampValue:Ar(s.serializer,o)}}if(r instanceof J){const o=new J(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ar(s.serializer,o)}}if(r instanceof Lt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Pt)return{bytesValue:Jl(s.serializer,r._byteString)};if(r instanceof et){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:ii(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof xt)return(function(a,u){return{mapValue:{fields:{[wl]:{stringValue:bl},[Er]:{arrayValue:{values:a.toArray().map((d=>{if(typeof d!="number")throw u.wc("VectorValues must only contain numeric values.");return ni(u.serializer,d)}))}}}}}})(r,s);throw s.wc(`Unsupported field value: ${Rr(r)}`)})(n,t)}function kc(n,t){const e={};return _l(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ue(n,((r,s)=>{const o=xn(s,t.Vc(r));o!=null&&(e[r]=o)})),{mapValue:{fields:e}}}function Vc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof J||n instanceof Lt||n instanceof Pt||n instanceof et||n instanceof Ln||n instanceof xt)}function Pi(n,t,e){if(!Vc(e)||!gl(e)){const r=Rr(e);throw r==="an object"?t.wc(n+" a custom object"):t.wc(n+" "+r)}}function $s(n,t,e){if((t=kt(t))instanceof jr)return t._internalPath;if(typeof t=="string")return Ri(n,t);throw Pr("Field path arguments must be of type string or ",n,!1,void 0,e)}const dp=new RegExp("[~\\*/\\[\\]]");function Ri(n,t,e){if(t.search(dp)>=0)throw Pr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new jr(...t.split("."))._internalPath}catch{throw Pr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Pr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new D(C.INVALID_ARGUMENT,u+n+h)}function Dc(n,t){return n.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new fp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Si("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class fp extends Nc{data(){return super.data()}}function Si(n,t){return typeof t=="string"?Ri(n,t):t instanceof jr?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ki{}class Vi extends ki{}function Np(n,t,...e){let r=[];t instanceof ki&&r.push(t),r=r.concat(e),(function(o){const a=o.filter((h=>h instanceof Ni)).length,u=o.filter((h=>h instanceof Di)).length;if(a>1||a>0&&u>0)throw new D(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Di extends Vi{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Di(t,e,r)}_apply(t){const e=this._parse(t);return Lc(t._query,e),new zt(t.firestore,t.converter,Ls(t._query,e))}_parse(t){const e=wi(t.firestore);return(function(o,a,u,h,d,m,_){let v;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new D(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Ya(_,m);const S=[];for(const M of _)S.push(Ka(h,o,M));v={arrayValue:{values:S}}}else v=Ka(h,o,_)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Ya(_,m),v=hp(u,a,_,m==="in"||m==="not-in");return st.create(d,m,v)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class Ni extends ki{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Ni(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:Vt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,o){let a=s;const u=o.getFlattenedFilters();for(const h of u)Lc(a,h),a=Ls(a,h)})(t._query,e),new zt(t.firestore,t.converter,Ls(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Mi extends Vi{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Mi(t,e)}_apply(t){const e=(function(s,o,a){if(s.startAt!==null)throw new D(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new wn(o,a)})(t._query,this._field,this._direction);return new zt(t.firestore,t.converter,(function(s,o){const a=s.explicitOrderBy.concat([o]);return new je(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(t._query,e))}}function Mp(n,t="asc"){const e=t,r=Si("orderBy",n);return Mi._create(r,e)}class Li extends Vi{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new Li(t,e,r)}_apply(t){return new zt(t.firestore,t.converter,Tr(t._query,this._limit,this._limitType))}}function Lp(n){return vd("limit",n),Li._create("limit",n,"F")}function Ka(n,t,e){if(typeof(e=kt(e))=="string"){if(e==="")throw new D(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Nl(t)&&e.indexOf("/")!==-1)throw new D(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(K.fromString(e));if(!L.isDocumentKey(r))throw new D(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ha(n,new L(r))}if(e instanceof et)return ha(n,e._key);throw new D(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Rr(e)}.`)}function Ya(n,t){if(!Array.isArray(n)||n.length===0)throw new D(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Lc(n,t){const e=(function(s,o){for(const a of s)for(const u of a.getFlattenedFilters())if(o.indexOf(u.op)>=0)return u.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new D(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class mp{convertValue(t,e="none"){switch(oe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ie(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw x(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return ue(t,((s,o)=>{r[s]=this.convertValue(o,e)})),r}convertVectorValue(t){var e,r,s;const o=(s=(r=(e=t.fields)===null||e===void 0?void 0:e[Er].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map((a=>tt(a.doubleValue)));return new xt(o)}convertGeoPoint(t){return new Lt(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Vr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Tn(t));default:return null}}convertTimestamp(t){const e=se(t);return new J(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=K.fromString(t);H(rc(r),9688,{name:t});const s=new An(r.get(1),r.get(3)),o=new L(r.popFirst(5));return s.isEqual(e)||Gt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class dn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class _e extends Nc{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new dr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Si("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=_e._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}_e._jsonSchemaVersion="firestore/documentSnapshot/1.0",_e._jsonSchema={type:it("string",_e._jsonSchemaVersion),bundleSource:it("string","DocumentSnapshot"),bundleName:it("string"),bundle:it("string")};class dr extends _e{data(t={}){return super.data(t)}}class Ee{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new dn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new dr(this._firestore,this._userDataWriter,r.key,r,new dn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{const h=new dr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new dn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>o||u.type!==3)).map((u=>{const h=new dr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new dn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),m=a.indexOf(u.doc.key)),{type:pp(u.type),doc:h,oldIndex:d,newIndex:m}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Ee._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Ys.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function pp(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xp(n){n=Rt(n,et);const t=Rt(n.firestore,ce);return np(Mn(t),n._key).then((e=>Oc(t,n,e)))}Ee._jsonSchemaVersion="firestore/querySnapshot/1.0",Ee._jsonSchema={type:it("string",Ee._jsonSchemaVersion),bundleSource:it("string","QuerySnapshot"),bundleName:it("string"),bundle:it("string")};class xi extends mp{constructor(t){super(),this.firestore=t}convertBytes(t){return new Pt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new et(this.firestore,null,e)}}function Op(n){n=Rt(n,zt);const t=Rt(n.firestore,ce),e=Mn(t),r=new xi(t);return Mc(n._query),rp(e,n._query).then((s=>new Ee(t,r,n,s)))}function Fp(n,t,e){n=Rt(n,et);const r=Rt(n.firestore,ce),s=xc(n.converter,t,e);return Oi(r,[Sc(wi(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Ct.none())])}function Qp(n){return Oi(Rt(n.firestore,ce),[new Or(n._key,Ct.none())])}function Up(n,...t){var e,r,s;n=kt(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||Wa(t[a])||(o=t[a++]);const u={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(Wa(t[a])){const _=t[a];t[a]=(e=_.next)===null||e===void 0?void 0:e.bind(_),t[a+1]=(r=_.error)===null||r===void 0?void 0:r.bind(_),t[a+2]=(s=_.complete)===null||s===void 0?void 0:s.bind(_)}let h,d,m;if(n instanceof et)d=Rt(n.firestore,ce),m=Dr(n._key.path),h={next:_=>{t[a]&&t[a](Oc(d,n,_))},error:t[a+1],complete:t[a+2]};else{const _=Rt(n,zt);d=Rt(_.firestore,ce),m=_._query;const v=new xi(d);h={next:R=>{t[a]&&t[a](new Ee(d,v,_,R))},error:t[a+1],complete:t[a+2]},Mc(n._query)}return(function(v,R,S,M){const V=new Ai(M),G=new Ei(R,V,S);return v.asyncQueue.enqueueAndForget((async()=>gi(await Cr(v),G))),()=>{V.Ou(),v.asyncQueue.enqueueAndForget((async()=>yi(await Cr(v),G)))}})(Mn(d),m,u,h)}function Oi(n,t){return(function(r,s){const o=new qt;return r.asyncQueue.enqueueAndForget((async()=>Gm(await ep(r),s,o))),o.promise})(Mn(n),t)}function Oc(n,t,e){const r=e.docs.get(t._key),s=new xi(n);return new _e(n,s,t._key,r,new dn(e.hasPendingWrites,e.fromCache),t.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=wi(t)}set(t,e,r){this._verifyNotCommitted();const s=Is(t,this._firestore),o=xc(s.converter,e,r),a=Sc(this._dataReader,"WriteBatch.set",s._key,o,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,Ct.none())),this}update(t,e,r,...s){this._verifyNotCommitted();const o=Is(t,this._firestore);let a;return a=typeof(e=kt(e))=="string"||e instanceof jr?up(this._dataReader,"WriteBatch.update",o._key,e,r,s):cp(this._dataReader,"WriteBatch.update",o._key,e),this._mutations.push(a.toMutation(o._key,Ct.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Is(t,this._firestore);return this._mutations=this._mutations.concat(new Or(e._key,Ct.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(C.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Is(n,t){if((n=kt(n)).firestore!==t)throw new D(C.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Bp(){return new bi("serverTimestamp")}function qp(n){return new Ci("increment",n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(n){return Mn(n=Rt(n,ce)),new gp(n,(t=>Oi(n,t)))}(function(t,e=!0){(function(s){Ue=s})(Kh),gr(new _n("firestore",((r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),u=new ce(new dd(r.getProvider("auth-internal")),new pd(a,r.getProvider("app-check-internal")),(function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new D(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new An(d.options.projectId,m)})(a,s),a);return o=Object.assign({useFetchStreams:e},o),u._setSettings(o),u}),"PUBLIC").setMultipleInstances(!0)),De(Jo,Xo,t),De(Jo,Xo,"esm2017")})();const Gp={apiKey:"AIzaSyAa8LdqJRdzruFxEHQdCAGm9VRs6AdlzSM",authDomain:"om-study-dashboard.firebaseapp.com",projectId:"om-study-dashboard",storageBucket:"om-study-dashboard.firebasestorage.app",messagingSenderId:"896410534030",appId:"1:896410534030:web:374ad6cf6dc2ccf407c9df",measurementId:"G-09WV7E2F4T"};function yp(n){return typeof n=="number"&&Number.isFinite(n)?n:n!=null&&typeof n.toMillis=="function"?n.toMillis():0}const _p=["Physics","Chemistry","Mathematics"];function $p(n,t=_p){if(!n||typeof n!="object")return!1;const e=yp(n.startedAtMs);return n.isActive===!0&&typeof n.subject=="string"&&t.includes(n.subject)&&e>0}const zp=[{week:1,month:"May 2026",theme:"The Reset — Basic algebra & physics vectors",startDate:"2025-05-03",math:{topic:"Basic Maths, Inequalities, Modulus, Wavy Curve Method",book:"Cengage Algebra Ch 1–2",task:"Read theory Ch 1–2, solve CAE Q1–30. Focus on modulus inequalities.",targets:[{lbl:"CAE Questions",n:30},{lbl:"Modulus/Inequality Sums",n:10}],totalQ:40},phy:{topic:"Vectors, Basic Calculus for Physics",book:"DC Pandey Mechanics Part 1 Ch 1",task:"Read Chapter 1 fully. Solve Level 1 exercises Q1–30.",targets:[{lbl:"Level 1 Questions",n:30}],totalQ:30},chem:{topic:"Mole Concept: Stoichiometry, limiting reagent",book:"N Awasthi Physical Chemistry Ch 1",task:"Chapter 1, Q1–60 (odd numbered). Write all formulas in notebook.",targets:[{lbl:"N Awasthi Q1–60 (odd)",n:30},{lbl:"NCERT Inorganic (30 min)",n:0}],totalQ:60},pyq:{topic:"Mole Concept PYQs",task:"Exam Goals: filter Mole Concept JEE Advanced PYQs, solve 15 questions timed (20 min).",targets:[{lbl:"JEE Adv PYQs (timed)",n:15}],totalQ:15}},{week:2,month:"May 2026",theme:"Quadratic equations & kinematics 1D",startDate:"2025-05-10",math:{topic:"Basic Maths, Inequalities, Modulus, Wavy Curve Method",book:"Cengage Algebra Ch 1–2",task:"Read theory Ch 1–2, solve CAE Q1–30. Focus on modulus inequalities.",targets:[{lbl:"CAE Questions",n:30},{lbl:"Modulus/Inequality Sums",n:10}],totalQ:40},phy:{topic:"Vectors, Basic Calculus for Physics",book:"DC Pandey Mechanics Part 1 Ch 1",task:"Read Chapter 1 fully. Solve Level 1 exercises Q1–30.",targets:[{lbl:"Level 1 Questions",n:30}],totalQ:30},chem:{topic:"Mole Concept: Stoichiometry, limiting reagent",book:"N Awasthi Physical Chemistry Ch 1",task:"Chapter 1, Q1–60 (odd numbered). Write all formulas in notebook.",targets:[{lbl:"N Awasthi Q1–60 (odd)",n:30},{lbl:"NCERT Inorganic (30 min)",n:0}],totalQ:60},pyq:{topic:"Mole Concept PYQs",task:"Exam Goals: filter Mole Concept JEE Advanced PYQs, solve 15 questions timed (20 min).",targets:[{lbl:"JEE Adv PYQs (timed)",n:15}],totalQ:15}},{week:2,month:"June 2026",theme:"Quadratic equations & kinematics 1D",math:{topic:"Quadratic Equations: roots, location, common roots",book:"Cengage Algebra Ch 3",task:"Theory + all illustrations. Single Correct exercises — odd numbered Q1–79.",targets:[{lbl:"Illustrations",n:20},{lbl:"Single Correct (odd)",n:20}],totalQ:40},phy:{topic:"Kinematics 1D: motion under gravity, variable acceleration",book:"DC Pandey Mechanics Part 1 Ch 3",task:"Level 1 Q1–40 fully.",targets:[{lbl:"Level 1 Q1–40",n:40}],totalQ:40},chem:{topic:"Mole Concept: concentration terms, redox basics",book:"N Awasthi Ch 1",task:"Q61–120. Verify all answers. Mark wrong ones.",targets:[{lbl:"N Awasthi Q61–120",n:60}],totalQ:60},pyq:{topic:"Kinematics PYQs",task:"Exam Goals: Kinematics 1D PYQs from JEE Advanced 2010–2024. Solve 20 questions timed.",targets:[{lbl:"JEE Adv PYQs (timed)",n:20}],totalQ:20}},{week:3,month:"June 2026",theme:"Sequence & series + kinematics 2D",math:{topic:"Sequence & Series: AP, GP, HP, AM-GM-HM inequality",book:"Cengage Algebra Ch 4",task:"All CAEs + Single Correct (odd Q). Focus on AM-GM applications.",targets:[{lbl:"CAE Questions",n:25},{lbl:"Single Correct (odd)",n:15}],totalQ:40},phy:{topic:"Kinematics 2D: projectile motion, relative velocity",book:"DC Pandey Mechanics Part 1 Ch 4",task:"Level 1 fully, Level 2 Q1–20.",targets:[{lbl:"Level 1 (all)",n:30},{lbl:"Level 2 Q1–20",n:20}],totalQ:50},chem:{topic:"Atomic Structure: Bohr model, de Broglie, quantum numbers",book:"N Awasthi Ch 2",task:"Level 1 Q1–50. Make a formula sheet for Bohr model.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},pyq:{topic:"Atomic Structure + Kinematics PYQs",task:"Exam Goals: 10 Atomic Structure + 10 Kinematics PYQs timed.",targets:[{lbl:"Atomic Structure PYQs",n:10},{lbl:"Kinematics PYQs",n:10}],totalQ:20}},{week:4,month:"June 2026",theme:"Logarithms + NLM + periodic table",math:{topic:"Logarithms, Compound Angles",book:"Cengage Algebra + Trigonometry Ch 1",task:"Logarithm: all CAEs. Compound Angles: illustrations only.",targets:[{lbl:"Logarithm CAEs",n:25},{lbl:"Compound Angles",n:10}],totalQ:35},phy:{topic:"Newton's Laws of Motion: FBDs, constraint equations",book:"DC Pandey Mechanics Part 1 Ch 5",task:"Level 1 Q1–50. Draw every FBD on paper.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},chem:{topic:"Periodic Classification & IUPAC Nomenclature",book:"PW Modules + NCERT Ch 3",task:"NCERT exercises fully + 40 MCQs from Exam Goals.",targets:[{lbl:"NCERT Exercises",n:20},{lbl:"Exam Goals MCQs",n:20}],totalQ:40},pyq:{topic:"Part Test 1 Prep",task:"Exam Goals: Mixed PYQs from Weeks 1–3 all subjects. 20 questions per subject.",targets:[{lbl:"Mixed PYQs",n:20}],totalQ:20}},{week:5,month:"July 2026",theme:"Determinants + friction + chemical bonding",math:{topic:"Determinants: Cramer's rule, properties",book:"Cengage Algebra Ch 7",task:"Theory + all CAEs + Single Correct odd Q.",targets:[{lbl:"CAEs",n:20},{lbl:"Single Correct (odd)",n:20}],totalQ:40},phy:{topic:"Friction, Dynamics of Circular Motion",book:"DC Pandey Mechanics Part 1",task:"Friction: Level 1 + Level 2 Q1–20. Circular motion: Level 1.",targets:[{lbl:"Friction L1+L2",n:30},{lbl:"Circular Motion L1",n:20}],totalQ:50},chem:{topic:"Chemical Bonding: VBT, hybridization, VSEPR",book:"PW Modules + NCERT Ch 4",task:"PW theory + MS Chauhan GOC Ch 1 Q1–30.",targets:[{lbl:"NCERT Bonding",n:15},{lbl:"MS Chauhan GOC Q1–30",n:30}],totalQ:45},pyq:{topic:"Chemical Bonding PYQs",task:"Exam Goals: Chemical Bonding JEE Advanced PYQs. 20 questions timed.",targets:[{lbl:"JEE Adv PYQs (timed)",n:20}],totalQ:20}},{week:6,month:"July 2026",theme:"Matrices + WEP + MOT/VSEPR",math:{topic:"Matrices: adjoint, inverse, system of linear equations",book:"Cengage Algebra Ch 6",task:"All CAEs + Single Correct (odd Q). Verify matrix inverse by multiplication.",targets:[{lbl:"CAEs + Single Correct",n:40}],totalQ:40},phy:{topic:"Work, Energy, Power: work-energy theorem, conservative forces",book:"DC Pandey Mechanics Part 1 Ch 6",task:"Level 1 Q1–50 fully.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},chem:{topic:"Chemical Bonding: MOT, dipole moment, hydrogen bonding",book:"PW Modules + NCERT",task:"MOT theory PW. NCERT exercises Ch 4 fully. 45 MCQs.",targets:[{lbl:"NCERT Exercises",n:20},{lbl:"Exam Goals MCQs",n:25}],totalQ:45},pyq:{topic:"Matrices + WEP PYQs",task:"Exam Goals: 10 Matrices + 10 WEP PYQs. Timed 25 minutes.",targets:[{lbl:"Matrices PYQs",n:10},{lbl:"WEP PYQs",n:10}],totalQ:20}},{week:7,month:"July 2026",theme:"Trig equations + vertical circular motion + GOC",math:{topic:"Trigonometric Equations and General Solutions",book:"Cengage Trigonometry Ch 3",task:"All CAEs. Focus on principal value vs general solution.",targets:[{lbl:"CAE Questions",n:35}],totalQ:35},phy:{topic:"Vertical Circular Motion, Conservation of Mechanical Energy",book:"DC Pandey Mechanics Part 1 Ch 7 L2",task:"Chapter 7 Level 2. Q1–30.",targets:[{lbl:"Level 2 Q1–30",n:30}],totalQ:45},chem:{topic:"GOC: Inductive, resonance, hyperconjugation effects",book:"MS Chauhan Ch 1",task:"Level 1 Q1–50. Make resonance structure cards.",targets:[{lbl:"MS Chauhan L1 Q1–50",n:50}],totalQ:50},pyq:{topic:"GOC PYQs",task:"Exam Goals: GOC JEE Advanced PYQs. 25 questions timed.",targets:[{lbl:"GOC JEE Adv PYQs",n:25}],totalQ:25}},{week:8,month:"July 2026",theme:"Solution of triangles + COM + GOC acidity/basicity",math:{topic:"Solution of Triangles: sine/cosine rules, half-angle",book:"Cengage Trigonometry Ch 4",task:"All CAEs + illustrations. 35 problems.",targets:[{lbl:"CAEs + Illustrations",n:35}],totalQ:35},phy:{topic:"Centre of Mass: position, motion of COM, collisions",book:"DC Pandey Mechanics Part 2 Ch 1",task:"Level 1 Q1–45.",targets:[{lbl:"Level 1 Q1–45",n:45}],totalQ:45},chem:{topic:"GOC: Acidity, basicity, carbocations, carbanions stability",book:"MS Chauhan Ch 2",task:"Level 1 Q1–30 + Level 2 Q1–25.",targets:[{lbl:"L1 Q1–30",n:30},{lbl:"L2 Q1–25",n:25}],totalQ:55},pyq:{topic:"Part Test 2 Prep (Weeks 5–7)",task:"Exam Goals: comprehensive mixed test all subjects. 60 questions timed.",targets:[{lbl:"Mixed test (timed 3hr)",n:60}],totalQ:60}},{week:9,month:"July–Aug 2026",theme:"Functions + momentum + structural isomerism",math:{topic:"Functions: domain, range, types, composite functions",book:"Cengage Calculus Ch 1",task:"All CAEs. Domain-range practice 40 problems.",targets:[{lbl:"CAE Questions",n:40}],totalQ:40},phy:{topic:"Momentum conservation, elastic & inelastic collisions",book:"DC Pandey Mechanics Part 2 Ch 2",task:"Level 1 + Level 2 Q1–20.",targets:[{lbl:"Level 1 (all)",n:30},{lbl:"Level 2 Q1–20",n:20}],totalQ:50},chem:{topic:"Structural Isomerism (chain, position, functional, metamerism)",book:"MS Chauhan Ch 3",task:"Level 1 Q1–45.",targets:[{lbl:"L1 Q1–45",n:45}],totalQ:45},pyq:{topic:"Functions + Collision PYQs",task:"Exam Goals: 10 Functions + 10 Collision PYQs timed.",targets:[{lbl:"Functions PYQs",n:10},{lbl:"Collision PYQs",n:10}],totalQ:20}},{week:10,month:"August 2026",theme:"ITF + variable mass + stereoisomerism",math:{topic:"Inverse Trig Functions: properties, principal values, graphs",book:"Cengage Trigonometry Ch 5",task:"All CAEs. Graphs on paper for each ITF. 40 problems.",targets:[{lbl:"CAE Questions",n:40}],totalQ:40},phy:{topic:"Variable mass systems, rocket propulsion",book:"DC Pandey Mechanics Part 2",task:"Variable mass theory + 20 problems.",targets:[{lbl:"Variable Mass Problems",n:20}],totalQ:40},chem:{topic:"Stereoisomerism: geometrical, optical, chirality, R/S",book:"MS Chauhan Ch 4",task:"Level 1 Q1–50. Draw all stereocentres.",targets:[{lbl:"L1 Q1–50",n:50}],totalQ:50},pyq:{topic:"Stereoisomerism PYQs",task:"Exam Goals: Stereoisomerism JEE Advanced PYQs. 20 questions timed.",targets:[{lbl:"Stereo PYQs (timed)",n:20}],totalQ:20}},{week:11,month:"August 2026",theme:"Limits + rotational kinematics + stereoisomerism advanced",math:{topic:"Limits: standard limits, L'Hôpital, series expansions",book:"Cengage Calculus Ch 2",task:"All CAEs + Single Correct odd Q. 45 problems total.",targets:[{lbl:"CAEs",n:25},{lbl:"Single Correct (odd)",n:20}],totalQ:45},phy:{topic:"Rotational kinematics, moment of inertia, theorems",book:"DC Pandey Mechanics Part 2 Ch 4",task:"Level 1 Q1–45.",targets:[{lbl:"Level 1 Q1–45",n:45}],totalQ:45},chem:{topic:"Stereoisomerism: conformational analysis, enantiomers vs diastereomers",book:"MS Chauhan Ch 4 Level 2",task:"Level 2 Q1–45.",targets:[{lbl:"L2 Q1–45",n:45}],totalQ:45},pyq:{topic:"Limits + Rotational PYQs",task:"Exam Goals: 12 Limits + 10 Rotation PYQs timed.",targets:[{lbl:"Limits PYQs",n:12},{lbl:"Rotation PYQs",n:10}],totalQ:22}},{week:12,month:"August 2026",theme:"Continuity & differentiability + torque + gaseous state",math:{topic:"Continuity & Differentiability: LHL/RHL, non-differentiable points",book:"Cengage Calculus Ch 3",task:"All CAEs. Draw every non-differentiable function. 50 problems.",targets:[{lbl:"CAE Questions",n:50}],totalQ:50},phy:{topic:"Torque, angular momentum, pure rolling motion",book:"DC Pandey Mechanics Part 2 Ch 5",task:"Level 1 Q1–50.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},chem:{topic:"Gaseous State: ideal gas laws, Van der Waals real gas, KTG",book:"N Awasthi Ch 3",task:"Level 1 Q1–50.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},pyq:{topic:"Gaseous State + Rolling Motion PYQs",task:"Exam Goals: 12 Gaseous State + 12 Rolling Motion PYQs timed.",targets:[{lbl:"Gaseous PYQs",n:12},{lbl:"Rolling PYQs",n:12}],totalQ:24}},{week:13,month:"August 2026",theme:"MEGA REVISION — End of Phase 1",math:{topic:"Revise ALL Phase 1 Maths chapters",book:"Cengage (all Phase 1 volumes)",task:"Re-solve every question marked wrong in notebook. Review all CAE solutions. NO new questions.",targets:[{lbl:"Error Log Re-solve",n:50}],totalQ:50},phy:{topic:"Revise ALL Phase 1 Physics chapters",book:"DC Pandey Mechanics Part 1 & 2",task:"Re-solve error log questions from every chapter.",targets:[{lbl:"Error Log Re-solve",n:40}],totalQ:40},chem:{topic:"Revise ALL Phase 1 Chemistry chapters",book:"N Awasthi + MS Chauhan",task:"Redo all incorrects. Make 1-page summary for each chapter.",targets:[{lbl:"Error Log Re-solve",n:40}],totalQ:40},pyq:{topic:"End of Phase 1 Full Mock",task:"Exam Goals: 3-hour comprehensive Phase 1 mock test. Analyse every mistake.",targets:[{lbl:"Full Mock (3hr)",n:54}],totalQ:54}},{week:14,month:"Sep 2026",theme:"MOD + rotational dynamics advanced + hydrocarbons",math:{topic:"Method of Differentiation: chain rule, implicit, parametric",book:"Cengage Calculus Ch 4",task:"All CAEs + Single Correct odd Q. 50 problems.",targets:[{lbl:"CAEs",n:25},{lbl:"Single Correct (odd)",n:25}],totalQ:50},phy:{topic:"Advanced rolling, toppling, angular momentum conservation",book:"DC Pandey Mechanics Part 2 Ch 5 L2",task:"Level 2 Q1–30.",targets:[{lbl:"Level 2 Q1–30",n:30}],totalQ:50},chem:{topic:"Hydrocarbons: Alkanes, Alkenes — preparation & reactions",book:"MS Chauhan Ch 5",task:"Level 1 Q1–50. Write all named reactions.",targets:[{lbl:"L1 Q1–50",n:50}],totalQ:50},pyq:{topic:"MOD + Hydrocarbons PYQs",task:"Exam Goals: 12 MOD + 12 Hydrocarbons PYQs timed.",targets:[{lbl:"MOD PYQs",n:12},{lbl:"Hydrocarbons PYQs",n:12}],totalQ:24}},{week:15,month:"Sep 2026",theme:"AOD (tangents/normals) + gravitation + alkynes/aromaticity",math:{topic:"AOD: tangents, normals, angle between curves",book:"Cengage Calculus Ch 5",task:"All CAEs. Tangent-normal problems on graph paper. 50 problems.",targets:[{lbl:"CAEs + Problems",n:50}],totalQ:50},phy:{topic:"Gravitation: Kepler's laws, escape velocity, satellite motion",book:"DC Pandey Mechanics Part 2 Ch 6",task:"Level 1 Q1–50.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},chem:{topic:"Hydrocarbons: Alkynes, Aromaticity, EAS reactions",book:"MS Chauhan Ch 5–6",task:"Level 1 + Level 2 Q1–30 each.",targets:[{lbl:"L1 Q1–30",n:30},{lbl:"L2 Q1–30",n:25}],totalQ:55},pyq:{topic:"Gravitation + Aromaticity PYQs",task:"Exam Goals: 12 Gravitation + 12 Aromaticity PYQs timed.",targets:[{lbl:"Gravitation PYQs",n:12},{lbl:"Aromaticity PYQs",n:12}],totalQ:24}},{week:16,month:"Sep 2026",theme:"AOD (maxima/minima) + SHM + thermodynamics",math:{topic:"AOD: monotonicity, maxima-minima, Rolle's theorem, LMVT",book:"Cengage Calculus Ch 5",task:"Single Correct exercises (all). 55 problems.",targets:[{lbl:"Single Correct (all)",n:55}],totalQ:55},phy:{topic:"SHM: kinematics, dynamics, pendulums, spring combinations",book:"DC Pandey Mechanics Part 2 Ch 7",task:"Level 1 + Level 2 Q1–25.",targets:[{lbl:"Level 1 (all)",n:30},{lbl:"Level 2 Q1–25",n:25}],totalQ:55},chem:{topic:"Thermodynamics: First Law, work done, enthalpy, Hess's law",book:"N Awasthi Ch 4",task:"Level 1 Q1–50.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},pyq:{topic:"Part Test: AOD + Rotation + Thermodynamics",task:"Exam Goals: 3-hour Part Test on these topics. Analyse immediately.",targets:[{lbl:"Part Test Questions",n:54}],totalQ:54}},{week:17,month:"Sep 2026",theme:"Indefinite integration + fluid statics + thermodynamics 2nd law",math:{topic:"Indefinite Integration: substitution, IBP (ILATE rule)",book:"Cengage Calculus Ch 6",task:"All CAEs. 55 problems. Verify every answer by differentiating.",targets:[{lbl:"CAE Questions",n:55}],totalQ:55},phy:{topic:"Elasticity, Hooke's Law, Fluid Statics, Archimedes' principle",book:"DC Pandey Heat & Fluid Ch 1–2",task:"Level 1 Q1–45.",targets:[{lbl:"Level 1 Q1–45",n:45}],totalQ:45},chem:{topic:"Thermodynamics: Second Law, entropy, Gibbs free energy, spontaneity",book:"N Awasthi Ch 4",task:"Level 2 Q1–30.",targets:[{lbl:"Level 2 Q1–30",n:30}],totalQ:50},pyq:{topic:"Integration + Thermodynamics PYQs",task:"Exam Goals: 12 Integration + 12 Thermodynamics PYQs timed.",targets:[{lbl:"Integration PYQs",n:12},{lbl:"Thermodynamics PYQs",n:12}],totalQ:24}},{week:18,month:"Sep–Oct 2026",theme:"Integration partial fractions + fluid dynamics + equilibrium",math:{topic:"Indefinite Integration: partial fractions, special trig substitutions",book:"Cengage Calculus Ch 6",task:"Single Correct exercises (odd Q). 55 problems.",targets:[{lbl:"Single Correct (odd Q)",n:55}],totalQ:55},phy:{topic:"Fluid dynamics: Bernoulli's theorem, viscosity, surface tension",book:"DC Pandey Heat & Fluid Ch 3",task:"Level 1 + Level 2 Q1–20.",targets:[{lbl:"Level 1 + L2 Q1–20",n:50}],totalQ:50},chem:{topic:"Chemical Equilibrium: Le Chatelier's principle, Kp/Kc relations",book:"N Awasthi Ch 5",task:"Level 1 Q1–50.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},pyq:{topic:"Fluid + Equilibrium PYQs",task:"Exam Goals: 12 Fluid + 12 Equilibrium PYQs timed.",targets:[{lbl:"Fluid PYQs",n:12},{lbl:"Equilibrium PYQs",n:12}],totalQ:24}},{week:19,month:"October 2026",theme:"Definite integration + Heat & KTG + ionic equilibrium",math:{topic:"Definite Integration: properties, Newton-Leibniz, Leibniz rule",book:"Cengage Calculus Ch 7",task:"All CAEs + Single Correct odd Q. 60 problems.",targets:[{lbl:"CAEs",n:30},{lbl:"Single Correct (odd)",n:30}],totalQ:60},phy:{topic:"Heat & KTG: specific heats, 1st law processes (isothermal, adiabatic)",book:"DC Pandey Heat & Fluid Ch 4–5",task:"Level 1 Q1–55.",targets:[{lbl:"Level 1 Q1–55",n:55}],totalQ:55},chem:{topic:"Ionic Equilibrium: pH, buffer solutions, Henderson-Hasselbalch",book:"N Awasthi Ch 6",task:"Level 1 Q1–55.",targets:[{lbl:"Level 1 Q1–55",n:55}],totalQ:55},pyq:{topic:"Definite Integration + KTG PYQs",task:"Exam Goals: 15 Definite Integration + 12 KTG PYQs timed.",targets:[{lbl:"Definite Int PYQs",n:15},{lbl:"KTG PYQs",n:12}],totalQ:27}},{week:20,month:"October 2026",theme:"Area under curve + calorimetry + ionic equilibrium advanced",math:{topic:"Definite Integration (limit of sum) + Area Under Curve",book:"Cengage Calculus Ch 7–8",task:"Area under curve CAEs + Single Correct. 60 problems.",targets:[{lbl:"Area Under Curve",n:60}],totalQ:60},phy:{topic:"Calorimetry, heat transfer: conduction, radiation, Stefan-Boltzmann law",book:"DC Pandey Heat & Fluid Ch 6",task:"Level 1 Q1–50.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},chem:{topic:"Ionic Equilibrium: Ksp, salt hydrolysis, solubility product",book:"N Awasthi Ch 6",task:"Level 2 Q1–40.",targets:[{lbl:"Level 2 Q1–40",n:40}],totalQ:55},pyq:{topic:"Area + Calorimetry + Ionic Eq PYQs",task:"Exam Goals: 10 each subject PYQs timed.",targets:[{lbl:"Mixed PYQs (timed)",n:30}],totalQ:30}},{week:21,month:"October 2026",theme:"Differential equations + waves + alkyl halides",math:{topic:"Differential Equations: variable separable, homogeneous, linear 1st order",book:"Cengage Calculus Ch 9",task:"All CAEs. 55 problems.",targets:[{lbl:"CAE Questions",n:55}],totalQ:55},phy:{topic:"Waves: wave equation, interference, standing waves on string",book:"DC Pandey Waves Ch 1",task:"Level 1 Q1–50.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},chem:{topic:"Alkyl & Aryl Halides: SN1, SN2, E1, E2 mechanisms",book:"MS Chauhan Ch 7",task:"Level 1 + Level 2 Q1–30.",targets:[{lbl:"L1 (all)",n:25},{lbl:"L2 Q1–30",n:30}],totalQ:55},pyq:{topic:"Part Test: Integration + Heat + Alkyl Halides",task:"Exam Goals: 3-hour Part Test. Analyse immediately.",targets:[{lbl:"Part Test",n:54}],totalQ:54}},{week:22,month:"Oct–Nov 2026",theme:"Straight lines + sound waves + alcohols/phenols",math:{topic:"Straight Lines: all standard forms, family of lines, distance formulas",book:"Cengage Coordinate Geometry Ch 1",task:"All CAEs + Single Correct odd Q. 50 problems.",targets:[{lbl:"CAEs + Single Correct",n:50}],totalQ:50},phy:{topic:"Sound waves: Doppler effect, organ pipes, beats",book:"DC Pandey Waves Ch 2",task:"Level 1 + Level 2 Q1–25.",targets:[{lbl:"Level 1 + L2 Q1–25",n:55}],totalQ:55},chem:{topic:"Alcohols, Phenols, Ethers: preparation, reactions, named reactions",book:"MS Chauhan Ch 8",task:"Level 1 + Level 2 Q1–30.",targets:[{lbl:"L1 + L2 Q1–30",n:55}],totalQ:55},pyq:{topic:"Straight Lines + Doppler + Alcohols PYQs",task:"Exam Goals: 12 Straight Lines + 10 Sound + 10 Alcohols PYQs timed.",targets:[{lbl:"Mixed PYQs",n:32}],totalQ:32}},{week:23,month:"November 2026",theme:"Circles + electrostatics (Gauss) + electrochemistry",math:{topic:"Circles: tangents, normals, radical axis, family of circles",book:"Cengage Coordinate Geometry Ch 2",task:"All CAEs + Single Correct. 50 problems.",targets:[{lbl:"CAEs + Single Correct",n:50}],totalQ:50},phy:{topic:"Electrostatics: Coulomb's law, electric field, Gauss's Law, flux",book:"DC Pandey Electricity Ch 1",task:"Level 1 Q1–55.",targets:[{lbl:"Level 1 Q1–55",n:55}],totalQ:55},chem:{topic:"Electrochemistry: galvanic cells, EMF, Nernst equation",book:"N Awasthi Ch 7",task:"Level 1 Q1–55.",targets:[{lbl:"Level 1 Q1–55",n:55}],totalQ:55},pyq:{topic:"Circles + Electrostatics + Electrochemistry PYQs",task:"Exam Goals: 10 each subject PYQs timed.",targets:[{lbl:"Mixed PYQs (10 each)",n:30}],totalQ:30}},{week:24,month:"November 2026",theme:"Parabola + electrostatics advanced + electrochemistry advanced",math:{topic:"Parabola: standard equations, parametric forms, normals",book:"Cengage Coordinate Geometry Ch 3",task:"All CAEs + Single Correct. 50 problems.",targets:[{lbl:"CAEs + Single Correct",n:50}],totalQ:50},phy:{topic:"Electrostatics: electric potential, dipoles, conductors, energy",book:"DC Pandey Electricity Ch 2",task:"Level 2 Q1–35.",targets:[{lbl:"Level 2 Q1–35",n:35}],totalQ:55},chem:{topic:"Electrochemistry: electrolysis, Faraday's laws, conductance, Kohlrausch",book:"N Awasthi Ch 7",task:"Level 2 Q1–40.",targets:[{lbl:"Level 2 Q1–40",n:40}],totalQ:55},pyq:{topic:"Parabola + Potential PYQs",task:"Exam Goals: 12 Parabola + 12 Electrostatic Potential PYQs timed.",targets:[{lbl:"Parabola PYQs",n:12},{lbl:"E-Potential PYQs",n:12}],totalQ:24}},{week:25,month:"November 2026",theme:"Ellipse + capacitors + aldehydes/ketones",math:{topic:"Ellipse: properties, tangents, normals, director circle, foci",book:"Cengage Coordinate Geometry Ch 4",task:"All CAEs + Single Correct. 50 problems.",targets:[{lbl:"CAEs + Single Correct",n:50}],totalQ:50},phy:{topic:"Capacitors: parallel plate, dielectrics, RC circuits, energy",book:"DC Pandey Electricity Ch 3",task:"Level 1 + Level 2 Q1–25.",targets:[{lbl:"Level 1 + L2 Q1–25",n:55}],totalQ:55},chem:{topic:"Aldehydes & Ketones: nucleophilic addition, Aldol, Cannizzaro, Clemmensen",book:"MS Chauhan Ch 9",task:"Level 1 Q1–55.",targets:[{lbl:"Level 1 Q1–55",n:55}],totalQ:55},pyq:{topic:"Ellipse + Capacitors + Carbonyl PYQs",task:"Exam Goals: 10 each timed.",targets:[{lbl:"Mixed PYQs (timed)",n:30}],totalQ:30}},{week:26,month:"Nov–Dec 2026",theme:"Hyperbola + current electricity + carboxylic acids",math:{topic:"Hyperbola: asymptotes, rectangular hyperbola, conjugate hyperbola",book:"Cengage Coordinate Geometry Ch 5",task:"All CAEs + Single Correct. 50 problems.",targets:[{lbl:"CAEs + Single Correct",n:50}],totalQ:50},phy:{topic:"Current Electricity: Ohm's law, Kirchhoff's laws, Wheatstone bridge",book:"DC Pandey Electricity Ch 4",task:"Level 1 + Level 2 Q1–30.",targets:[{lbl:"Level 1 + L2 Q1–30",n:60}],totalQ:60},chem:{topic:"Aldehydes/Ketones advanced + Carboxylic Acids & derivatives",book:"MS Chauhan Ch 9–10",task:"Level 2 Q1–55.",targets:[{lbl:"Level 2 Q1–55",n:55}],totalQ:55},pyq:{topic:"Hyperbola + Current Electricity PYQs",task:"Exam Goals: 12 Hyperbola + 15 Current Electricity PYQs timed.",targets:[{lbl:"Hyperbola PYQs",n:12},{lbl:"Current Elec PYQs",n:15}],totalQ:27}},{week:27,month:"December 2026",theme:"Coord geometry review + magnetic effects + amines",math:{topic:"Full Coordinate Geometry review — re-solve all error log problems",book:"Cengage Coordinate Geometry (all chapters)",task:"Re-solve every marked wrong question from weeks 22–26. No new questions.",targets:[{lbl:"Error Log Re-solve",n:50}],totalQ:50},phy:{topic:"Magnetic Effects: Biot-Savart law, Ampere's law, force on charges/wires",book:"DC Pandey Electricity Ch 5",task:"Level 1 + Level 2 Q1–30.",targets:[{lbl:"Level 1 + L2 Q1–30",n:60}],totalQ:60},chem:{topic:"Amines & Diazonium Salts: basicity, reactions, coupling reactions",book:"MS Chauhan Ch 11",task:"Level 1 + Level 2 Q1–55.",targets:[{lbl:"L1 + L2 Q1–55",n:55}],totalQ:55},pyq:{topic:"Coord Geometry + Magnetic Effects PYQs",task:"Exam Goals: 15 Coord Geo + 15 Magnetic Effects PYQs timed.",targets:[{lbl:"Coord Geo PYQs",n:15},{lbl:"Magnetic PYQs",n:15}],totalQ:30}},{week:28,month:"December 2026",theme:"Phase 2 culmination — EMI/AC + kinetics",math:{topic:"Cengage Multiple Correct: Calculus + Coordinate Geometry",book:"Cengage (all volumes)",task:"Multiple Correct exercises. 45 problems.",targets:[{lbl:"Multiple Correct",n:45}],totalQ:45},phy:{topic:"EMI: Faraday, Lenz, LR circuits + AC: phasors, resonance",book:"DC Pandey Electricity Ch 6–7",task:"Level 1 + Level 2 Q1–30.",targets:[{lbl:"Level 1 + L2 Q1–30",n:60}],totalQ:60},chem:{topic:"Chemical Kinetics: rate laws, integrated rate equations, Arrhenius equation",book:"N Awasthi Ch 8",task:"Level 1 + Level 2 Q1–60.",targets:[{lbl:"Level 1 + L2 Q1–60",n:60}],totalQ:60},pyq:{topic:"Phase 2 Full Syllabus Mock",task:"Exam Goals: 3-hour Full Syllabus Mock Test. Benchmark performance.",targets:[{lbl:"Full Mock (3hr)",n:54}],totalQ:54}},{week:29,month:"January 2027",theme:"JEE Main mock mode — intensive",math:{topic:"MathonGo mock test sets + timed Cengage revision",book:"MathonGo + Cengage",task:"1 full Maths section mock (30 Q, 60 min) in morning. Analyse in afternoon.",targets:[{lbl:"Mock Section (timed)",n:30}],totalQ:30},phy:{topic:"MathonGo mock test sets + DC Pandey revision",book:"MathonGo + DC Pandey",task:"1 full Physics section mock (30 Q, 60 min). Analyse.",targets:[{lbl:"Mock Section (timed)",n:30}],totalQ:30},chem:{topic:"NCERT Inorganic (s,p,d,f blocks) 1 hr daily + Exam Goals PYQs",book:"NCERT Ch 6–10 + Exam Goals",task:"NCERT Inorganic: 1 full block reading + 30 MCQs from Exam Goals.",targets:[{lbl:"NCERT Reading",n:0},{lbl:"JEE Main MCQs",n:30}],totalQ:60},pyq:{topic:"JEE Main PYQs daily",task:"Exam Goals: Complete JEE Main paper 2023–2026. Filter by date, solve timed.",targets:[{lbl:"Full JEE Main Paper",n:90}],totalQ:90}},{week:30,month:"January 2027",theme:"JEE Main mock mode — week 2",math:{topic:"Cengage Multiple Correct exercises — all volumes",book:"Cengage all volumes",task:"Multiple Correct exercises from Algebra + Calculus. 45 problems.",targets:[{lbl:"Multiple Correct",n:45}],totalQ:45},phy:{topic:"Modern Physics: photoelectric, nuclear, radioactivity",book:"DC Pandey Optics & Modern Physics Ch 4–6",task:"Level 1 Q1–50.",targets:[{lbl:"Level 1 Q1–50",n:50}],totalQ:50},chem:{topic:"NCERT Inorganic: d-block, f-block, coordination compounds",book:"NCERT Ch 8–9 + Exam Goals",task:"NCERT reading + 40 MCQs from Exam Goals.",targets:[{lbl:"NCERT Reading",n:0},{lbl:"Exam Goals MCQs",n:40}],totalQ:40},pyq:{topic:"JEE Main PYQs — Modern Physics + Inorganic",task:"Exam Goals: 20 Modern Physics + 20 Inorganic PYQs timed.",targets:[{lbl:"Modern Physics PYQs",n:20},{lbl:"Inorganic PYQs",n:20}],totalQ:40}},{week:31,month:"January 2027",theme:"JEE Main mock mode — week 3",math:{topic:"Probability, Complex Numbers, Permutation & Combination",book:"Cengage Algebra Ch 8–10",task:"All CAEs + Single Correct. 50 problems.",targets:[{lbl:"CAEs + Single Correct",n:50}],totalQ:50},phy:{topic:"Semiconductors, Communication Systems, Dual Nature",book:"DC Pandey Optics & Modern Physics Ch 7–9",task:"Level 1 Q1–45.",targets:[{lbl:"Level 1 Q1–45",n:45}],totalQ:45},chem:{topic:"Biomolecules, Polymers, Chemistry in Everyday Life",book:"NCERT Ch 14–16 + Exam Goals",task:"NCERT reading + 30 MCQs from Exam Goals.",targets:[{lbl:"NCERT Reading",n:0},{lbl:"Exam Goals MCQs",n:30}],totalQ:30},pyq:{topic:"Full JEE Main Mock Paper",task:"Exam Goals: Complete JEE Main 2024 paper timed (3 hrs). Full analysis.",targets:[{lbl:"Full JEE Main Paper",n:90}],totalQ:90}},{week:32,month:"January–February 2027",theme:"JEE Main final push + Advanced preview",math:{topic:"Vectors & 3D Geometry — full coverage",book:"Cengage Vectors & 3D",task:"All CAEs + Single Correct. 55 problems.",targets:[{lbl:"CAEs + Single Correct",n:55}],totalQ:55},phy:{topic:"Full Physics revision — all chapters rapid fire",book:"DC Pandey all volumes",task:"Re-solve error log from all chapters. 50 problems.",targets:[{lbl:"Error Log Re-solve",n:50}],totalQ:50},chem:{topic:"Full Chemistry revision — Organic + Inorganic + Physical",book:"All books",task:"Re-solve error log. 1-page summary per chapter.",targets:[{lbl:"Error Log Re-solve",n:50}],totalQ:50},pyq:{topic:"JEE Main 2025 full paper + JEE Advanced preview",task:"Exam Goals: JEE Main 2025 paper timed. Then 20 JEE Advanced PYQs.",targets:[{lbl:"JEE Main 2025",n:90},{lbl:"JEE Adv Preview",n:20}],totalQ:110}},{week:33,month:"February 2027",theme:"Advanced return — Vectors/3D + Optics + Solutions",math:{topic:"Vectors & 3D, Probability, Complex Numbers — Advanced level",book:"Cengage Vectors + Probability",task:"Multiple Correct + Linked Comprehension exercises. 55 problems.",targets:[{lbl:"Multiple Correct",n:30},{lbl:"Comprehension",n:25}],totalQ:55},phy:{topic:"Ray Optics + Wave Optics — full coverage",book:"DC Pandey Optics & Modern Physics Ch 1–3",task:"Level 1 + Level 2 fully.",targets:[{lbl:"Level 1 + Level 2",n:55}],totalQ:55},chem:{topic:"Liquid Solutions, Solid State, Surface Chemistry, Metallurgy",book:"N Awasthi + PW Modules",task:"N Awasthi: Solid State + Solutions Level 1 fully. Surface Chemistry: 30 MCQs.",targets:[{lbl:"Solid State + Solutions",n:40},{lbl:"Surface Chemistry MCQs",n:30}],totalQ:55},pyq:{topic:"JEE Advanced PYQs (multi-correct, comprehension)",task:"Exam Goals: Filter JEE Advanced questions. 20 per subject timed.",targets:[{lbl:"JEE Adv PYQs (timed)",n:60}],totalQ:60}},{week:37,month:"March 2027",theme:"Allen AITS — The Testing Crucible",math:{topic:"Cengage Multiple Correct + weak chapters from mock analysis",book:"Cengage all volumes",task:"Mock analysis → 3 weakest chapters → 20 problems each.",targets:[{lbl:"Weak Chapter Problems",n:60}],totalQ:60},phy:{topic:"PW Advanced DPPs + Cengage Advanced exercises",book:"PW Advanced DPPs",task:"2 DPP sets per day. Timed. Analyse immediately.",targets:[{lbl:"DPP Questions (×2)",n:55}],totalQ:55},chem:{topic:"N Awasthi Level 2 + MS Chauhan Advanced exercises",book:"N Awasthi + MS Chauhan",task:"Level 2 from weak chapters. 55 problems.",targets:[{lbl:"Level 2 (weak chapters)",n:55}],totalQ:55},pyq:{topic:"Allen AITS",task:"2 full Allen AITS mock tests per week. Paper 1 + Paper 2 same day (6 hrs). Full analysis next day.",targets:[{lbl:"AITS Paper 1",n:54},{lbl:"AITS Paper 2",n:54}],totalQ:108}},{week:45,month:"April–May 2027",theme:"Final conditioning — Peak performance",math:{topic:"Active recall — re-solve biggest error patterns only",book:"Personal error log + Cengage",task:"Only re-solve previously wrong questions. No new material. 45 problems max.",targets:[{lbl:"Error Log Re-solve",n:45}],totalQ:45},phy:{topic:"Taper: high-confidence chapters only, no new material",book:"Personal error log + DC Pandey",task:"Re-solve error log only. Focus on full-length mock endurance.",targets:[{lbl:"Error Log Re-solve",n:45}],totalQ:45},chem:{topic:"NCERT Inorganic final pass + Organic named reaction sheet",book:"NCERT + personal notes",task:"NCERT Inorganic: 1 full reading pass. Named reactions: revise handwritten sheet.",targets:[{lbl:"NCERT Reading",n:0}],totalQ:0},pyq:{topic:"Allen AITS final mocks",task:"3–4 full Allen AITS per week. Stop all studying 3 days before JEE Advanced. Sleep 7.5 hours mandatory.",targets:[{lbl:"AITS Mocks",n:54}],totalQ:54}}],Ep=[{start:"06:30",end:"08:30"},{start:"09:15",end:"11:15"},{start:"11:45",end:"13:15"},{start:"15:30",end:"17:30"},{start:"18:00",end:"20:00"}],vp={start:"20:15",end:"22:00"};function Fc(n){const t=String(n).split("-").map(Number);return t.length!==3?new Date:new Date(t[0],t[1]-1,t[2],0,0,0,0)}function Tp(n){const t=String(n).split("-").map(Number);return t.length!==3?new Date:new Date(t[0],t[1]-1,t[2],23,59,59,999)}function Ap(n,t){const e=Tp(n);return Math.max(0,Math.ceil((e-t)/864e5))}function Ip(n){const t=n&&n.timetableFixedBlocks;return Array.isArray(t)&&t.length?t.map(e=>({start:String(e.start||"").trim(),end:String(e.end||"").trim()})):Ep.map(e=>({...e}))}function wp(n,t,e){const r=Ip(n).map(u=>({...u})),s=Fc(t),o=Ap(e,s);return(!n||n.timetableAutoEveningSlot!==!1)&&o<=45&&r.push({...vp}),r}function bp(n,t,e){const r=n&&n.timetableMode==="daily"?"daily":"fixed",o=(n&&n.timetableDailyOverrides&&typeof n.timetableDailyOverrides=="object"?n.timetableDailyOverrides:{})[t];return r==="daily"&&Array.isArray(o)&&o.length>0?o.map(u=>({start:String(u.start||"").trim(),end:String(u.end||"").trim()})):wp(n,t,e)}function Hp(n,t,e,r=["Physics","Chemistry","Mathematics"]){const s=bp(n,t,e),o=Fc(t),a=Math.floor(o.getTime()/864e5);return s.map((u,h)=>({start:u.start,end:u.end,subject:r[(a+h)%r.length],focus:"Deep work on one subject. Take a short break between blocks."}))}export{qp as A,Bp as B,_n as C,Ep as D,tl as E,Qe as F,Hp as G,Yh as H,Dp as I,Gp as J,el as L,gr as _,$h as a,Uu as b,Rp as c,Pp as d,Jh as e,mr as f,kt as g,Vp as h,Cp as i,xp as j,Op as k,kp as l,Qp as m,zp as n,hh as o,Up as p,Np as q,De as r,Lp as s,Mp as t,wp as u,Bu as v,jp as w,Fp as x,yp as y,$p as z};

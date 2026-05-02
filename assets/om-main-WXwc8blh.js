import{r as yt,_ as bt,C as wt,a as It,E as fe,o as In,F as pe,L as Tn,g as ge,i as he,b as ye,v as be,c as ne,d as we,e as Sn,f as An,h as T,j,k as ht,l as V,m as nt,w as ct,n as N,p as K,q as $n,s as xn,t as Dn,u as Bn,x as M,y as se,z as pt,A as _t,D as _n,B as H,G as ae,H as Cn,I as Mn,J as gt}from"./timetable-utils-BZjoTWl5.js";const ve="@firebase/installations",Pt="0.6.18";/**
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
 */const ke=1e4,Ee=`w:${Pt}`,Ie="FIS_v2",Ln="https://firebaseinstallations.googleapis.com/v1",jn=3600*1e3,Rn="installations",qn="Installations";/**
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
 */const Fn={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},J=new fe(Rn,qn,Fn);function Te(t){return t instanceof pe&&t.code.includes("request-failed")}/**
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
 */function Se({projectId:t}){return`${Ln}/projects/${t}/installations`}function Ae(t){return{token:t.token,requestStatus:2,expiresIn:Nn(t.expiresIn),creationTime:Date.now()}}async function $e(t,n){const l=(await n.json()).error;return J.create("request-failed",{requestName:t,serverCode:l.code,serverMessage:l.message,serverStatus:l.status})}function xe({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Pn(t,{refreshToken:n}){const i=xe(t);return i.append("Authorization",On(n)),i}async function De(t){const n=await t();return n.status>=500&&n.status<600?t():n}function Nn(t){return Number(t.replace("s","000"))}function On(t){return`${Ie} ${t}`}/**
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
 */async function Hn({appConfig:t,heartbeatServiceProvider:n},{fid:i}){const l=Se(t),u=xe(t),m=n.getImmediate({optional:!0});if(m){const E=await m.getHeartbeatsHeader();E&&u.append("x-firebase-client",E)}const p={fid:i,authVersion:Ie,appId:t.appId,sdkVersion:Ee},b={method:"POST",headers:u,body:JSON.stringify(p)},v=await De(()=>fetch(l,b));if(v.ok){const E=await v.json();return{fid:E.fid||i,registrationStatus:2,refreshToken:E.refreshToken,authToken:Ae(E.authToken)}}else throw await $e("Create Installation",v)}/**
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
 */function Be(t){return new Promise(n=>{setTimeout(n,t)})}/**
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
 */function Un(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Wn=/^[cdef][\w-]{21}$/,Rt="";function Kn(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const i=Gn(t);return Wn.test(i)?i:Rt}catch{return Rt}}function Gn(t){return Un(t).substr(0,22)}/**
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
 */function Tt(t){return`${t.appName}!${t.appId}`}/**
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
 */const _e=new Map;function Ce(t,n){const i=Tt(t);Me(i,n),Vn(i,n)}function Me(t,n){const i=_e.get(t);if(i)for(const l of i)l(n)}function Vn(t,n){const i=zn();i&&i.postMessage({key:t,fid:n}),Jn()}let G=null;function zn(){return!G&&"BroadcastChannel"in self&&(G=new BroadcastChannel("[Firebase] FID Change"),G.onmessage=t=>{Me(t.data.key,t.data.fid)}),G}function Jn(){_e.size===0&&G&&(G.close(),G=null)}/**
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
 */const Yn="firebase-installations-database",Qn=1,Y="firebase-installations-store";let Ct=null;function Nt(){return Ct||(Ct=In(Yn,Qn,{upgrade:(t,n)=>{switch(n){case 0:t.createObjectStore(Y)}}})),Ct}async function vt(t,n){const i=Tt(t),u=(await Nt()).transaction(Y,"readwrite"),m=u.objectStore(Y),p=await m.get(i);return await m.put(n,i),await u.done,(!p||p.fid!==n.fid)&&Ce(t,n.fid),n}async function Le(t){const n=Tt(t),l=(await Nt()).transaction(Y,"readwrite");await l.objectStore(Y).delete(n),await l.done}async function St(t,n){const i=Tt(t),u=(await Nt()).transaction(Y,"readwrite"),m=u.objectStore(Y),p=await m.get(i),b=n(p);return b===void 0?await m.delete(i):await m.put(b,i),await u.done,b&&(!p||p.fid!==b.fid)&&Ce(t,b.fid),b}/**
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
 */async function Ot(t){let n;const i=await St(t.appConfig,l=>{const u=Xn(l),m=Zn(t,u);return n=m.registrationPromise,m.installationEntry});return i.fid===Rt?{installationEntry:await n}:{installationEntry:i,registrationPromise:n}}function Xn(t){const n=t||{fid:Kn(),registrationStatus:0};return je(n)}function Zn(t,n){if(n.registrationStatus===0){if(!navigator.onLine){const u=Promise.reject(J.create("app-offline"));return{installationEntry:n,registrationPromise:u}}const i={fid:n.fid,registrationStatus:1,registrationTime:Date.now()},l=ts(t,i);return{installationEntry:i,registrationPromise:l}}else return n.registrationStatus===1?{installationEntry:n,registrationPromise:es(t)}:{installationEntry:n}}async function ts(t,n){try{const i=await Hn(t,n);return vt(t.appConfig,i)}catch(i){throw Te(i)&&i.customData.serverCode===409?await Le(t.appConfig):await vt(t.appConfig,{fid:n.fid,registrationStatus:0}),i}}async function es(t){let n=await oe(t.appConfig);for(;n.registrationStatus===1;)await Be(100),n=await oe(t.appConfig);if(n.registrationStatus===0){const{installationEntry:i,registrationPromise:l}=await Ot(t);return l||i}return n}function oe(t){return St(t,n=>{if(!n)throw J.create("installation-not-found");return je(n)})}function je(t){return ns(t)?{fid:t.fid,registrationStatus:0}:t}function ns(t){return t.registrationStatus===1&&t.registrationTime+ke<Date.now()}/**
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
 */async function ss({appConfig:t,heartbeatServiceProvider:n},i){const l=as(t,i),u=Pn(t,i),m=n.getImmediate({optional:!0});if(m){const E=await m.getHeartbeatsHeader();E&&u.append("x-firebase-client",E)}const p={installation:{sdkVersion:Ee,appId:t.appId}},b={method:"POST",headers:u,body:JSON.stringify(p)},v=await De(()=>fetch(l,b));if(v.ok){const E=await v.json();return Ae(E)}else throw await $e("Generate Auth Token",v)}function as(t,{fid:n}){return`${Se(t)}/${n}/authTokens:generate`}/**
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
 */async function Ht(t,n=!1){let i;const l=await St(t.appConfig,m=>{if(!Re(m))throw J.create("not-registered");const p=m.authToken;if(!n&&rs(p))return m;if(p.requestStatus===1)return i=os(t,n),m;{if(!navigator.onLine)throw J.create("app-offline");const b=ls(m);return i=is(t,b),b}});return i?await i:l.authToken}async function os(t,n){let i=await ie(t.appConfig);for(;i.authToken.requestStatus===1;)await Be(100),i=await ie(t.appConfig);const l=i.authToken;return l.requestStatus===0?Ht(t,n):l}function ie(t){return St(t,n=>{if(!Re(n))throw J.create("not-registered");const i=n.authToken;return ds(i)?Object.assign(Object.assign({},n),{authToken:{requestStatus:0}}):n})}async function is(t,n){try{const i=await ss(t,n),l=Object.assign(Object.assign({},n),{authToken:i});return await vt(t.appConfig,l),i}catch(i){if(Te(i)&&(i.customData.serverCode===401||i.customData.serverCode===404))await Le(t.appConfig);else{const l=Object.assign(Object.assign({},n),{authToken:{requestStatus:0}});await vt(t.appConfig,l)}throw i}}function Re(t){return t!==void 0&&t.registrationStatus===2}function rs(t){return t.requestStatus===2&&!cs(t)}function cs(t){const n=Date.now();return n<t.creationTime||t.creationTime+t.expiresIn<n+jn}function ls(t){const n={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:n})}function ds(t){return t.requestStatus===1&&t.requestTime+ke<Date.now()}/**
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
 */async function us(t){const n=t,{installationEntry:i,registrationPromise:l}=await Ot(n);return l?l.catch(console.error):Ht(n).catch(console.error),i.fid}/**
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
 */async function ms(t,n=!1){const i=t;return await fs(i),(await Ht(i,n)).token}async function fs(t){const{registrationPromise:n}=await Ot(t);n&&await n}/**
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
 */function ps(t){if(!t||!t.options)throw Mt("App Configuration");if(!t.name)throw Mt("App Name");const n=["projectId","apiKey","appId"];for(const i of n)if(!t.options[i])throw Mt(i);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Mt(t){return J.create("missing-app-config-values",{valueName:t})}/**
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
 */const qe="installations",gs="installations-internal",hs=t=>{const n=t.getProvider("app").getImmediate(),i=ps(n),l=It(n,"heartbeat");return{app:n,appConfig:i,heartbeatServiceProvider:l,_delete:()=>Promise.resolve()}},ys=t=>{const n=t.getProvider("app").getImmediate(),i=It(n,qe).getImmediate();return{getId:()=>us(i),getToken:u=>ms(i,u)}};function bs(){bt(new wt(qe,hs,"PUBLIC")),bt(new wt(gs,ys,"PRIVATE"))}bs();yt(ve,Pt);yt(ve,Pt,"esm2017");/**
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
 */const kt="analytics",ws="firebase_id",vs="origin",ks=60*1e3,Es="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ut="https://www.googletagmanager.com/gtag/js";/**
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
 */const R=new Tn("@firebase/analytics");/**
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
 */const Is={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},F=new fe("analytics","Analytics",Is);/**
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
 */function Ts(t){if(!t.startsWith(Ut)){const n=F.create("invalid-gtag-resource",{gtagURL:t});return R.warn(n.message),""}return t}function Fe(t){return Promise.all(t.map(n=>n.catch(i=>i)))}function Ss(t,n){let i;return window.trustedTypes&&(i=window.trustedTypes.createPolicy(t,n)),i}function As(t,n){const i=Ss("firebase-js-sdk-policy",{createScriptURL:Ts}),l=document.createElement("script"),u=`${Ut}?l=${t}&id=${n}`;l.src=i?i==null?void 0:i.createScriptURL(u):u,l.async=!0,document.head.appendChild(l)}function $s(t){let n=[];return Array.isArray(window[t])?n=window[t]:window[t]=n,n}async function xs(t,n,i,l,u,m){const p=l[u];try{if(p)await n[p];else{const v=(await Fe(i)).find(E=>E.measurementId===u);v&&await n[v.appId]}}catch(b){R.error(b)}t("config",u,m)}async function Ds(t,n,i,l,u){try{let m=[];if(u&&u.send_to){let p=u.send_to;Array.isArray(p)||(p=[p]);const b=await Fe(i);for(const v of p){const E=b.find(C=>C.measurementId===v),_=E&&n[E.appId];if(_)m.push(_);else{m=[];break}}}m.length===0&&(m=Object.values(n)),await Promise.all(m),t("event",l,u||{})}catch(m){R.error(m)}}function Bs(t,n,i,l){async function u(m,...p){try{if(m==="event"){const[b,v]=p;await Ds(t,n,i,b,v)}else if(m==="config"){const[b,v]=p;await xs(t,n,i,l,b,v)}else if(m==="consent"){const[b,v]=p;t("consent",b,v)}else if(m==="get"){const[b,v,E]=p;t("get",b,v,E)}else if(m==="set"){const[b]=p;t("set",b)}else t(m,...p)}catch(b){R.error(b)}}return u}function _s(t,n,i,l,u){let m=function(...p){window[l].push(arguments)};return window[u]&&typeof window[u]=="function"&&(m=window[u]),window[u]=Bs(m,t,n,i),{gtagCore:m,wrappedGtag:window[u]}}function Cs(t){const n=window.document.getElementsByTagName("script");for(const i of Object.values(n))if(i.src&&i.src.includes(Ut)&&i.src.includes(t))return i;return null}/**
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
 */const Ms=30,Ls=1e3;class js{constructor(n={},i=Ls){this.throttleMetadata=n,this.intervalMillis=i}getThrottleMetadata(n){return this.throttleMetadata[n]}setThrottleMetadata(n,i){this.throttleMetadata[n]=i}deleteThrottleMetadata(n){delete this.throttleMetadata[n]}}const Pe=new js;function Rs(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function qs(t){var n;const{appId:i,apiKey:l}=t,u={method:"GET",headers:Rs(l)},m=Es.replace("{app-id}",i),p=await fetch(m,u);if(p.status!==200&&p.status!==304){let b="";try{const v=await p.json();!((n=v.error)===null||n===void 0)&&n.message&&(b=v.error.message)}catch{}throw F.create("config-fetch-failed",{httpStatus:p.status,responseMessage:b})}return p.json()}async function Fs(t,n=Pe,i){const{appId:l,apiKey:u,measurementId:m}=t.options;if(!l)throw F.create("no-app-id");if(!u){if(m)return{measurementId:m,appId:l};throw F.create("no-api-key")}const p=n.getThrottleMetadata(l)||{backoffCount:0,throttleEndTimeMillis:Date.now()},b=new Os;return setTimeout(async()=>{b.abort()},ks),Ne({appId:l,apiKey:u,measurementId:m},p,b,n)}async function Ne(t,{throttleEndTimeMillis:n,backoffCount:i},l,u=Pe){var m;const{appId:p,measurementId:b}=t;try{await Ps(l,n)}catch(v){if(b)return R.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${b} provided in the "measurementId" field in the local Firebase config. [${v==null?void 0:v.message}]`),{appId:p,measurementId:b};throw v}try{const v=await qs(t);return u.deleteThrottleMetadata(p),v}catch(v){const E=v;if(!Ns(E)){if(u.deleteThrottleMetadata(p),b)return R.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${b} provided in the "measurementId" field in the local Firebase config. [${E==null?void 0:E.message}]`),{appId:p,measurementId:b};throw v}const _=Number((m=E==null?void 0:E.customData)===null||m===void 0?void 0:m.httpStatus)===503?ne(i,u.intervalMillis,Ms):ne(i,u.intervalMillis),C={throttleEndTimeMillis:Date.now()+_,backoffCount:i+1};return u.setThrottleMetadata(p,C),R.debug(`Calling attemptFetch again in ${_} millis`),Ne(t,C,l,u)}}function Ps(t,n){return new Promise((i,l)=>{const u=Math.max(n-Date.now(),0),m=setTimeout(i,u);t.addEventListener(()=>{clearTimeout(m),l(F.create("fetch-throttle",{throttleEndTimeMillis:n}))})})}function Ns(t){if(!(t instanceof pe)||!t.customData)return!1;const n=Number(t.customData.httpStatus);return n===429||n===500||n===503||n===504}class Os{constructor(){this.listeners=[]}addEventListener(n){this.listeners.push(n)}abort(){this.listeners.forEach(n=>n())}}async function Hs(t,n,i,l,u){if(u&&u.global){t("event",i,l);return}else{const m=await n,p=Object.assign(Object.assign({},l),{send_to:m});t("event",i,p)}}/**
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
 */async function Us(){if(ye())try{await be()}catch(t){return R.warn(F.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return R.warn(F.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Ws(t,n,i,l,u,m,p){var b;const v=Fs(t);v.then(k=>{i[k.measurementId]=k.appId,t.options.measurementId&&k.measurementId!==t.options.measurementId&&R.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${k.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(k=>R.error(k)),n.push(v);const E=Us().then(k=>{if(k)return l.getId()}),[_,C]=await Promise.all([v,E]);Cs(m)||As(m,_.measurementId),u("js",new Date);const O=(b=p==null?void 0:p.config)!==null&&b!==void 0?b:{};return O[vs]="firebase",O.update=!0,C!=null&&(O[ws]=C),u("config",_.measurementId,O),_.measurementId}/**
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
 */class Ks{constructor(n){this.app=n}_delete(){return delete lt[this.app.options.appId],Promise.resolve()}}let lt={},re=[];const ce={};let Lt="dataLayer",Gs="gtag",le,Oe,de=!1;function Vs(){const t=[];if(he()&&t.push("This is a browser extension environment."),we()||t.push("Cookies are not available."),t.length>0){const n=t.map((l,u)=>`(${u+1}) ${l}`).join(" "),i=F.create("invalid-analytics-context",{errorInfo:n});R.warn(i.message)}}function zs(t,n,i){Vs();const l=t.options.appId;if(!l)throw F.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)R.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw F.create("no-api-key");if(lt[l]!=null)throw F.create("already-exists",{id:l});if(!de){$s(Lt);const{wrappedGtag:m,gtagCore:p}=_s(lt,re,ce,Lt,Gs);Oe=m,le=p,de=!0}return lt[l]=Ws(t,re,ce,n,le,Lt,i),new Ks(t)}function Js(t=Sn()){t=ge(t);const n=It(t,kt);return n.isInitialized()?n.getImmediate():Ys(t)}function Ys(t,n={}){const i=It(t,kt);if(i.isInitialized()){const u=i.getImmediate();if(An(n,i.getOptions()))return u;throw F.create("already-initialized")}return i.initialize({options:n})}async function Qs(){if(he()||!we()||!ye())return!1;try{return await be()}catch{return!1}}function Xs(t,n,i,l){t=ge(t),Hs(Oe,lt[t.app.options.appId],n,i,l).catch(u=>R.error(u))}const ue="@firebase/analytics",me="0.10.17";function Zs(){bt(new wt(kt,(n,{options:i})=>{const l=n.getProvider("app").getImmediate(),u=n.getProvider("installations-internal").getImmediate();return zs(l,u,i)},"PUBLIC")),bt(new wt("analytics-internal",t,"PRIVATE")),yt(ue,me),yt(ue,me,"esm2017");function t(n){try{const i=n.getProvider(kt).getImmediate();return{logEvent:(l,u,m)=>Xs(i,l,u,m)}}catch(i){throw F.create("interop-component-reg-failed",{reason:i})}}}Zs();const y={settings:"settings",general:"general",live:"live",session:"session",dailyTotals:"dailyTotals",tasks:"tasks",studySessions:"studySessions",doubts:"doubts",questionTracking:"questionTracking",blockCompletions:"blockCompletions"},ta=40,z=[],dt=[];let U=!1,qt=null,Ft=null;function Q(){qt&&(qt.disabled=z.length===0||U),Ft&&(Ft.disabled=dt.length===0||U)}function ea(t,n){qt=t,Ft=n,Q()}function tt(t){U||(z.push(t),z.length>ta&&z.shift(),dt.length=0,Q())}async function na(){const t=z.pop();if(t){U=!0,Q();try{await t.undo()}finally{U=!1,dt.push(t),Q()}}}async function sa(){const t=dt.pop();if(t){U=!0,Q();try{await t.redo()}finally{U=!1,z.push(t),Q()}}}function aa(){z.length=0,dt.length=0,Q()}function rt(){return U}const Et=450;async function et(t,n){const l=(await ht(V(t,n))).docs;for(let u=0;u<l.length;u+=Et){const m=ct(t);l.slice(u,u+Et).forEach(p=>m.delete(p.ref)),await m.commit()}}async function oa(t){const n={settingsGeneral:null,liveSession:null,dailyTotals:[],tasks:[],studySessions:[]},i=T(t,y.settings,y.general),l=await j(i);l.exists()&&(n.settingsGeneral=l.data());const u=T(t,y.live,y.session),m=await j(u);return m.exists()&&(n.liveSession=m.data()),(await ht(V(t,y.dailyTotals))).forEach(E=>{n.dailyTotals.push({id:E.id,data:E.data()})}),(await ht(V(t,y.tasks))).forEach(E=>{n.tasks.push({id:E.id,data:E.data()})}),(await ht(V(t,y.studySessions))).forEach(E=>{n.studySessions.push({id:E.id,data:E.data()})}),n}async function jt(t,n=!1){await et(t,y.studySessions),await et(t,y.tasks),await et(t,y.dailyTotals),await et(t,y.doubts),await et(t,y.blockCompletions),await et(t,y.questionTracking);const i=T(t,y.live,y.session);try{await nt(i)}catch{}if(!n){const l=T(t,y.settings,y.general);try{await nt(l)}catch{}}}async function ia(t,n){if(!n)return;const i=[];n.settingsGeneral&&i.push({ref:T(t,y.settings,y.general),data:n.settingsGeneral}),n.liveSession&&i.push({ref:T(t,y.live,y.session),data:n.liveSession}),n.dailyTotals.forEach(l=>{i.push({ref:T(t,y.dailyTotals,l.id),data:l.data})}),n.tasks.forEach(l=>{i.push({ref:T(t,y.tasks,l.id),data:l.data})}),n.studySessions.forEach(l=>{i.push({ref:T(t,y.studySessions,l.id),data:l.data})});for(let l=0;l<i.length;l+=Et){const u=ct(t);i.slice(l,l+Et).forEach(m=>{u.set(m.ref,m.data)}),await u.commit()}}const L=["Physics","Chemistry","Mathematics"];function ra(t,n="home"){let i=[],l=null,u=null,m=!1,p=!1,b=!1,v=!1,E=!1,_=!1,C=!1,O=null;function k(e){const s=document.getElementById("toast");s&&(s.textContent=e,s.classList.add("show"),setTimeout(()=>s.classList.remove("show"),2800))}function st(e){return String(e).padStart(2,"0")}function q(e){return`${e.getFullYear()}-${st(e.getMonth()+1)}-${st(e.getDate())}`}function X(e){const s=e.split("-").map(Number);return s.length!==3?new Date:new Date(s[0],s[1]-1,s[2],23,59,59,999)}function at(e){const s=Math.max(0,Math.floor(e)),o=Math.floor(s/3600),a=Math.floor(s%3600/60),r=s%60;return o>0?`${o} hours, ${a} minutes, ${r} seconds`:a>0?`${a} minutes, ${r} seconds`:`${r} seconds`}function Wt(e){const s=Math.max(0,Math.floor(e));if(s<60)return`${s}s`;const o=Math.floor(s/60),a=Math.floor(o/60);return a>0?`${a}h ${o%60}m`:`${o}m`}function Kt(e){let s=Number(e&&e.currentPrepWeek);return N.some(o=>o.week===s)||(s=N[0].week),N.find(o=>o.week===s)||N[0]}function Gt(e,s){return e?s==="Mathematics"?e.math:s==="Physics"?e.phy:s==="Chemistry"?e.chem:null:null}function ot(e){const s=Math.max(0,Math.floor(e/1e3)),o=Math.floor(s/86400),a=Math.floor(s%86400/3600),r=Math.floor(s%3600/60),c=s%60;return`${o} days, ${st(a)} hours, ${st(r)} minutes, ${st(c)} seconds`}function He(e,s,o,a){const r=document.getElementById("count-trial"),c=document.getElementById("count-final"),d=document.getElementById("count-mains1"),g=document.getElementById("count-mains2"),f=document.getElementById("days-remaining");if(!r||!c)return;const h=o,A=a,B=e,I=s,S=()=>{const x=Date.now();if(d&&(d.textContent=ot(X(h).getTime()-x)),g&&(g.textContent=ot(X(A).getTime()-x)),r.textContent=ot(X(B).getTime()-x),c.textContent=ot(X(I).getTime()-x),f){const Z=Math.max(0,Math.ceil((X(I).getTime()-x)/864e5));f.textContent=Z}};S(),window.__countdownTimer&&clearInterval(window.__countdownTimer),window.__countdownTimer=setInterval(S,1e3)}function Vt(e){const s=document.getElementById("mains-countdowns");if(!s)return;if(!e||!e.length){s.innerHTML="<p class='section-desc'>No Joint Entrance Examination Main dates added yet.</p>";return}const o=Date.now();s.innerHTML=e.map(a=>{const r=X(a.date).getTime(),c=ot(r-o);return`<div class='count-card'><div class='count-card-label'>${w(a.title)}</div><div class='count-card-value'>${c}</div></div>`}).join("")}function w(e){const s=document.createElement("div");return s.textContent=e,s.innerHTML}function Ue(e){const s=document.getElementById("schedule-blocks");if(!s)return;const o=e.jeeAdvancedFinalDate||"2027-05-17",a=q(new Date),r=ae(e,a,o,L),c=Kt(e),d=document.getElementById("weekly-plan-banner");d&&(d.innerHTML=`<div class="week-banner__text"><p class="week-banner__meta">Week ${c.week} · ${w(c.month)}</p><p class="week-banner__theme">${w(c.theme||"")}</p></div><a class="week-banner__link btn btn-ghost" href="./plan.html">Edit week</a>`);const g=h=>h==="Mathematics"?"mathematics":h==="Physics"?"physics":"chemistry";s.innerHTML=r.map(h=>{const A=Gt(c,h.subject),B=A&&A.topic?`<p class="study-block__topic">${w(A.topic)}</p>`:"",I=A&&A.task?`<p class="study-block__task">${w(A.task)}</p>`:"",S=A&&A.book?`<p class="study-block__book">${w(A.book)}</p>`:"",x=(A&&A.targets?A.targets:[]).filter(P=>P&&(Number(P.n)>0||String(P.lbl||"").length)).slice(0,4).map(P=>`<span class="study-chip">${w(P.lbl)}${Number(P.n)>0?` · ${P.n}`:""}</span>`).join(""),Z=x?`<div class="study-block__chips">${x}</div>`:"",W=w(h.subject);return`<article class="study-block study-block--${g(h.subject)}"><div class="study-block__head"><span class="study-block__time">${w(h.start)}–${w(h.end)}</span><span class="study-block__subject">${W}</span></div><div class="study-block__plan">${B}${I}${S}${Z}</div><div class="study-block__timer"><span class="study-block__live" data-running-live="${W}">—</span><div class="study-block__timer-btns"><button type="button" class="btn btn-timer-start timer-subject-start" data-subject="${W}">Start</button><button type="button" class="btn btn-timer-stop timer-subject-stop" data-subject="${W}" disabled>Stop</button></div><span class="study-block__today">Today <strong data-today-total="${W}">0s</strong></span></div></article>`}).join("");const f=document.getElementById("schedule-pyq");if(f){const h=c.pyq;if(h&&(h.topic||h.task)){f.hidden=!1;const A=h.topic?`<p class="study-pyq__topic">${w(h.topic)}</p>`:"",B=h.task?`<p class="study-pyq__task">${w(h.task)}</p>`:"",I=(h.targets||[]).map(S=>`<span class="study-chip">${w(S.lbl)}${Number(S.n)>0?` · ${S.n}`:""}</span>`).join("");f.innerHTML=`<h3 class="study-pyq__title">Previous-year &amp; mocks</h3>${A}${B}`+(I?`<div class="study-block__chips">${I}</div>`:"")}else f.hidden=!0,f.innerHTML=""}Qt()}function We(e){const s=e.jeeAdvancedTrialDate||"2026-05-17",o=e.jeeAdvancedFinalDate||"2027-05-17",a=e.jeeMains1Date||"2026-01-29",r=e.jeeMains2Date||"2026-04-08",c=document.getElementById("input-trial"),d=document.getElementById("input-final"),g=document.getElementById("input-mains1"),f=document.getElementById("input-mains2");if(c&&(c.value=s),d&&(d.value=o),g&&(g.value=a),f&&(f.value=r),He(s,o,a,r),Ue(e),Vt(e.jeeMainsList||[]),n==="home"){un(e);const h=document.getElementById("mains-section");h&&(h.style.display=e.jeeMainsList&&e.jeeMainsList.length?"":"none")}}async function Ke(e,s,o){const a=await j(e),r=a.exists(),c=r?a.data():null;await M(e,s),!rt()&&(tt({undo:async()=>{r?await M(e,c):await nt(e)},redo:async()=>{await M(e,s)}}),o&&k(o))}async function D(e,s){const o=T(t,y.settings,y.general),a=await j(o),c={...a.exists()?a.data():{},...e};await Ke(o,c,s)}function zt(e){const s=String(e||"").split(":");return s.length<2?NaN:Number(s[0])*60+Number(s[1])}function At(e){if(!e.length)return"Add at least one time block.";for(const s of e){if(!s.start||!s.end)return"Every block needs a start and end time.";if(zt(s.end)<=zt(s.start))return"Each block’s end time must be after its start time."}return null}function $t(e){if(!e)return[];const s=[];return e.querySelectorAll(".timetable-block-row").forEach(o=>{var c,d,g,f;const a=(d=(c=o.querySelector(".timetable-start"))==null?void 0:c.value)==null?void 0:d.trim(),r=(f=(g=o.querySelector(".timetable-end"))==null?void 0:g.value)==null?void 0:f.trim();a&&r&&s.push({start:a,end:r})}),s}function it(e,s,o){const a=document.createElement("div");a.className="timetable-block-row",a.innerHTML=`<div class="field"><label>Start</label><input type="time" class="timetable-start" value="${w(s)}" /></div><div class="field"><label>End</label><input type="time" class="timetable-end" value="${w(o)}" /></div><div><button type="button" class="btn btn-ghost timetable-remove-row">Remove</button></div>`,a.querySelector(".timetable-remove-row").addEventListener("click",()=>{const r=a.parentElement;a.remove(),r&&r.id==="timetable-fixed-rows"&&r.dispatchEvent(new Event("change",{bubbles:!1}))}),e.appendChild(a)}function xt(){const e=document.getElementById("timetable-daily-rows"),s=document.getElementById("timetable-override-date");if(!e||!s)return;const o=window.__lastSettings||{},a=s.value||q(new Date),r=o.jeeAdvancedFinalDate||"2027-05-17",c=o.timetableDailyOverrides||{},d=o.timetableMode==="daily"?"daily":"fixed";let g;d==="daily"&&Array.isArray(c[a])&&c[a].length?g=c[a].map(f=>({start:String(f.start),end:String(f.end)})):g=Bn(o,a,r),e.innerHTML="",g.forEach(f=>it(e,f.start,f.end))}function Ge(e){const s=document.getElementById("timetable-fixed-rows");if(s){C=!0;try{const o=document.getElementById("timetable-mode-fixed"),a=document.getElementById("timetable-mode-daily"),r=document.getElementById("timetable-auto-evening"),c=document.getElementById("timetable-daily-panel"),d=e.timetableMode==="daily"?"daily":"fixed";o&&(o.checked=d==="fixed"),a&&(a.checked=d==="daily"),r&&(r.checked=e.timetableAutoEveningSlot!==!1),c&&c.classList.toggle("hidden",d!=="daily");const g=Array.isArray(e.timetableFixedBlocks)&&e.timetableFixedBlocks.length?e.timetableFixedBlocks:_n;s.innerHTML="",g.forEach(h=>it(s,String(h.start),String(h.end))),g.length||it(s,"06:30","08:30");const f=document.getElementById("timetable-override-date");f&&!f.value&&(f.value=q(new Date)),xt()}finally{C=!1}}}function Ve(){if(_)return;const e=document.getElementById("timetable-fixed-rows"),s=document.getElementById("timetable-mode-fixed"),o=document.getElementById("timetable-mode-daily"),a=document.getElementById("timetable-auto-evening"),r=document.getElementById("timetable-daily-panel"),c=document.getElementById("timetable-override-date"),d=document.getElementById("timetable-daily-rows"),g=document.getElementById("btn-timetable-add-fixed"),f=document.getElementById("btn-timetable-add-daily"),h=document.getElementById("btn-timetable-save-daily"),A=document.getElementById("btn-timetable-clear-daily");if(!e||!s||!o||!a||!r||!c||!d||!g||!f||!h||!A)return;_=!0;function B(){if(C)return;const I=o.checked;r.classList.toggle("hidden",!I),D({timetableMode:I?"daily":"fixed"},"Timetable mode saved.").catch(S=>{k("Could not save timetable mode."),console.error(S)})}s.addEventListener("change",B),o.addEventListener("change",B),a.addEventListener("change",()=>{C||D({timetableAutoEveningSlot:a.checked},"Timetable option saved.").catch(I=>{k("Could not save option."),console.error(I)})}),e.addEventListener("change",()=>{if(C)return;const I=$t(e),S=At(I);if(S){k(S);return}D({timetableFixedBlocks:I},"Default timetable blocks saved.").catch(x=>{k("Could not save blocks."),console.error(x)})}),g.addEventListener("click",()=>{if(it(e,"09:00","10:30"),C)return;const I=$t(e),S=At(I);if(S){k(S);return}D({timetableFixedBlocks:I},null).catch(console.error)}),c.addEventListener("change",()=>{xt()}),h.addEventListener("click",()=>{const I=c.value;if(!I){k("Pick a date first.");return}const S=$t(d),x=At(S);if(x){k(x);return}const W={...(window.__lastSettings||{}).timetableDailyOverrides||{},[I]:S};D({timetableDailyOverrides:W},"Saved blocks for that day.").catch(P=>{k("Could not save this day."),console.error(P)})}),A.addEventListener("click",()=>{const I=c.value;if(!I)return;const x={...(window.__lastSettings||{}).timetableDailyOverrides||{}};delete x[I],D({timetableDailyOverrides:x},"Cleared custom day.").then(()=>xt()).catch(Z=>{k("Could not clear."),console.error(Z)})}),f.addEventListener("click",()=>{it(d,"09:00","10:30")})}async function ut(e,s){const o=T(t,y.tasks,e),a=await j(o),r=a.exists(),c=r?a.data():null,d={items:s,updatedAt:H()};await M(o,d),!rt()&&tt({undo:async()=>{r?await M(o,c):await nt(o)},redo:async()=>{await M(o,{items:s,updatedAt:H()})}})}function ze(){if(m)return;const e=document.getElementById("input-trial"),s=document.getElementById("input-final"),o=document.getElementById("input-mains1"),a=document.getElementById("input-mains2");!e||!s||(m=!0,e.addEventListener("change",()=>{D({jeeAdvancedTrialDate:e.value},"JEE Advanced 2026 date saved.").catch(r=>{k("Could not save. Check internet and Firebase rules."),console.error(r)})}),s.addEventListener("change",()=>{D({jeeAdvancedFinalDate:s.value},"JEE Advanced 2027 date saved.").catch(r=>{k("Could not save. Check internet and Firebase rules."),console.error(r)})}),o&&o.addEventListener("change",()=>{D({jeeMains1Date:o.value},"JEE Mains Session 1 date saved.").catch(r=>{k("Could not save. Check internet and Firebase rules."),console.error(r)})}),a&&a.addEventListener("change",()=>{D({jeeMains2Date:a.value},"JEE Mains Session 2 date saved.").catch(r=>{k("Could not save. Check internet and Firebase rules."),console.error(r)})}))}function Je(e){const s=document.getElementById("mains-editor");if(!s)return;const o=e||[];s.innerHTML=o.map(a=>`<div class='mains-item' data-id='${w(a.id)}'><input type='text' class='mains-title' value='${w(a.title)}' placeholder='Example: Joint Entrance Examination Main, January attempt' aria-label='Exam name' /><input type='date' class='mains-date' value='${w(a.date)}' aria-label='Exam date' /><button type='button' class='btn btn-ghost mains-remove' data-id='${w(a.id)}'>Remove this exam row</button></div>`).join(""),s.querySelectorAll(".mains-title").forEach(a=>{a.addEventListener("change",Jt)}),s.querySelectorAll(".mains-date").forEach(a=>{a.addEventListener("change",Jt)}),s.querySelectorAll(".mains-remove").forEach(a=>{a.addEventListener("click",()=>{const r=a.getAttribute("data-id"),d=(window.__lastSettings&&window.__lastSettings.jeeMainsList||[]).filter(g=>g.id!==r);D({jeeMainsList:d},null).catch(console.error)})})}function Jt(){const e=document.getElementById("mains-editor"),s=[];e.querySelectorAll(".mains-item").forEach(o=>{const a=o.getAttribute("data-id"),r=o.querySelector(".mains-title").value.trim(),c=o.querySelector(".mains-date").value;r&&c&&s.push({id:a,title:r,date:c})}),D({jeeMainsList:s},null).catch(console.error)}function Ye(){if(v)return;const e=document.getElementById("btn-add-mains");e&&(v=!0,e.addEventListener("click",()=>{const s=`mains_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,o=window.__lastSettings&&window.__lastSettings.jeeMainsList?window.__lastSettings.jeeMainsList.slice():[];o.push({id:s,title:"Joint Entrance Examination Main",date:q(new Date)}),D({jeeMainsList:o},null).catch(console.error)}))}function Qe(){const e=T(t,y.settings,y.general),s=K(e,o=>{const a=o.exists()?o.data():{};window.__lastSettings=a,a.jeeAdvancedTrialDate||(a.jeeAdvancedTrialDate="2026-05-17"),a.jeeAdvancedFinalDate||(a.jeeAdvancedFinalDate="2027-05-17"),We(a),Je(a.jeeMainsList||[]),Vt(a.jeeMainsList||[]),l&&l(a),document.getElementById("timetable-fixed-rows")&&Ge(a)});i.push(s)}function Yt(e){const s=T(t,y.dailyTotals,e),o=K(s,a=>{const r=a.exists()?a.data():{};L.forEach(c=>{const d=Number(r[c]||0),g=Wt(d);document.querySelectorAll(`[data-today-total="${c}"]`).forEach(h=>{h.textContent=g});const f=document.getElementById(`today-${c}`);f&&!f.hasAttribute("data-today-total")&&(f.textContent=at(d))})});i.push(o)}function Dt(){const e=new Date,s=new Date(e);s.setDate(e.getDate()-e.getDay()),s.setHours(0,0,0,0);const o=new Date(e.getFullYear(),e.getMonth(),1);function a(d){const g={Physics:0,Chemistry:0,Mathematics:0};return d.forEach(f=>{if(!f.exists())return;const h=f.data();L.forEach(A=>{g[A]+=Number(h[A]||0)})}),g}const r=[];for(let d=0;d<7;d++){const g=new Date(s);g.setDate(s.getDate()+d),r.push(q(g))}const c=[];for(let d=new Date(o);d<=e;d.setDate(d.getDate()+1))c.push(q(new Date(d)));Promise.all(r.map(d=>j(T(t,y.dailyTotals,d)))).then(d=>{const g=a(d);L.forEach(f=>{const h=document.getElementById(`week-${f}`);h&&(h.textContent=at(g[f]))})}),Promise.all(c.map(d=>j(T(t,y.dailyTotals,d)))).then(d=>{const g=a(d);L.forEach(f=>{const h=document.getElementById(`month-${f}`);h&&(h.textContent=at(g[f]))})})}function Xe(e,s){u&&clearInterval(u),u=setInterval(()=>{const o=Math.floor((Date.now()-s)/1e3),a=at(o),r=Wt(o);document.querySelectorAll(`[data-running-live="${e}"]`).forEach(g=>{g.textContent=a});const c=document.getElementById(`running-${e}`);c&&(c.textContent=a);const d=document.getElementById("home-live-timer");d&&(d.textContent=r)},500)}function Ze(){u&&(clearInterval(u),u=null),L.forEach(e=>{document.querySelectorAll(`[data-running-live="${e}"]`).forEach(o=>{o.textContent="—"});const s=document.getElementById(`running-${e}`);s&&(s.textContent="—")})}function Bt(e){const s=pt(e,L);s?Xe(e.subject,se(e.startedAtMs)):Ze(),L.forEach(o=>{const a=s&&e.subject===o;document.querySelectorAll(`.timer-subject-start[data-subject="${o}"]`).forEach(d=>{d.disabled=s}),document.querySelectorAll(`.timer-subject-stop[data-subject="${o}"]`).forEach(d=>{d.disabled=!a});const r=document.getElementById(`start-${o}`),c=document.getElementById(`stop-${o}`);r&&(r.disabled=s),c&&(c.disabled=!a)})}function tn(){const e=T(t,y.live,y.session),s=K(e,o=>{const a=o.exists()?o.data():{};Bt(a)});i.push(s)}function Qt(){j(T(t,y.live,y.session)).then(e=>{const s=e.exists()?e.data():{};Bt(s)}).catch(()=>{})}function en(e){const s=T(t,y.live,y.session);return j(s).then(o=>{const a=o.exists(),r=a?{...o.data()}:{isActive:!1,subject:null,startedAtMs:null},c={isActive:!0,subject:e,startedAtMs:Date.now()};return M(s,c).then(()=>{rt()||tt({undo:async()=>{a?await M(s,r):await nt(s)},redo:async()=>{await M(s,c)}}),k(`Timer · ${e}`)})}).catch(o=>{const a=o&&o.code==="permission-denied"?"Firebase blocked the write. Check Firestore rules.":"Could not start timer.";k(a),console.error(o)})}function nn(e){const s=T(t,y.live,y.session),o=T(t,y.dailyTotals,q(new Date));return j(s).then(a=>{const r=a.data()||{},c=se(r.startedAtMs);if(!pt(r,L)||r.subject!==e)return Promise.resolve();const d=Math.max(1,Math.floor((Date.now()-c)/1e3)),g={...r},f=T(V(t,y.studySessions)),h={isActive:!1,subject:null,startedAtMs:null},A={dateKey:q(new Date),subject:e,durationSeconds:d,endedAt:H()},B=ct(t);return B.set(o,{[e]:_t(d)},{merge:!0}),B.set(f,A),B.set(s,h,{merge:!0}),B.commit().then(()=>{rt()||tt({undo:async()=>{const I=ct(t);I.delete(f),I.set(o,{[e]:_t(-d)},{merge:!0}),I.set(s,g),await I.commit()},redo:async()=>{const I=ct(t);I.set(o,{[e]:_t(d)},{merge:!0}),I.set(f,{...A,endedAt:H()}),I.set(s,h,{merge:!0}),await I.commit()}}),k(`Saved · ${e}`),Dt()})}).catch(a=>{k("Could not stop timer."),console.error(a)})}function Xt(){p||(p=!0,document.body.addEventListener("click",e=>{const s=e.target.closest(".timer-subject-start"),o=e.target.closest(".timer-subject-stop");if(s&&!s.disabled){const a=s.getAttribute("data-subject");L.includes(a)&&en(a)}if(o&&!o.disabled){const a=o.getAttribute("data-subject");L.includes(a)&&nn(a)}}))}function Zt(){if(b)return;const e=document.getElementById("btn-add-task");e&&(b=!0,e.addEventListener("click",()=>{const s=document.getElementById("new-task-text"),o=s.value.trim();if(!o){k("Type a task first.");return}const a=q(new Date),r=T(t,y.tasks,a);j(r).then(c=>{const g=[...c.exists()&&c.data().items?c.data().items:[],{id:`t_${Date.now()}`,text:o,done:!1,completedAt:null}];return ut(a,g).then(()=>{s.value=""})}).catch(console.error)}))}function te(e){if(!document.getElementById("task-list"))return;const s=T(t,y.tasks,e),o=K(s,a=>{const r=a.exists()&&a.data().items?a.data().items:[];sn(e,r)});i.push(o)}function sn(e,s){const o=document.getElementById("task-list");if(o){if(!s.length){o.innerHTML="<p class='empty-state'>No tasks yet. Add one below.</p>";return}o.innerHTML=s.map((a,r)=>`<div class='task-row ${a.done?"done":""}' data-index='${r}'><input type='checkbox' ${a.done?"checked":""} aria-label='Mark done' /><label class="task-text">${w(a.text)}</label><div class="task-actions"><button class="task-edit-btn" data-index="${r}" title="Edit task">✏️</button><button class="task-delete-btn" data-index="${r}" title="Delete task">🗑️</button></div></div>`).join(""),o.querySelectorAll(".task-row").forEach(a=>{const r=Number(a.getAttribute("data-index")),c=a.querySelector("input[type=checkbox]");c.addEventListener("change",()=>{const d=s.slice();d[r]={...d[r],done:c.checked,completedAt:c.checked?Date.now():null},ut(e,d).catch(console.error)})}),o.querySelectorAll(".task-edit-btn").forEach(a=>{a.addEventListener("click",()=>{const r=Number(a.getAttribute("data-index")),c=s[r],d=prompt("Edit task:",c.text);if(d&&d.trim()&&d.trim()!==c.text){const g=s.slice();g[r]={...g[r],text:d.trim()},ut(e,g).catch(console.error)}})}),o.querySelectorAll(".task-delete-btn").forEach(a=>{a.addEventListener("click",()=>{const r=Number(a.getAttribute("data-index"));if(confirm("Delete this task?")){const c=s.filter((d,g)=>g!==r);ut(e,c).catch(console.error)}})})}}function an(){const e=document.getElementById("history-body");if(!e)return;const s=$n(V(t,y.studySessions),Dn("endedAt","desc"),xn(120)),o=K(s,a=>{if(a.empty){e.innerHTML="<tr><td colspan='4' class='empty-state'>No sessions yet.</td></tr>";return}e.innerHTML=a.docs.map(r=>{const c=r.data(),d=c.endedAt&&c.endedAt.toDate?c.endedAt.toDate().toLocaleString():"";return`<tr><td>${w(c.dateKey||"")}</td><td>${w(c.subject||"")}</td><td>${at(Number(c.durationSeconds||0))}</td><td>${w(d)}</td></tr>`}).join("")});i.push(o)}function on(){if(E)return;const e=document.getElementById("btn-undo"),s=document.getElementById("btn-redo"),o=document.getElementById("btn-reset-database");!e||!s||!o||(E=!0,ea(e,s),e.addEventListener("click",()=>{na().then(()=>k("Undid the last change.")).catch(a=>{k("Undo failed."),console.error(a)})}),s.addEventListener("click",()=>{sa().then(()=>k("Redid the change.")).catch(a=>{k("Redo failed."),console.error(a)})}),o.addEventListener("click",()=>{window.confirm(`This will delete all timer logs, daily totals, tasks, doubts, and session history.

Your exam dates and timetable settings will be KEPT.

Are you sure?`)&&oa(t).then(async r=>{aa(),await jt(t,!0),tt({undo:async()=>{await jt(t,!0),await ia(t,r)},redo:async()=>{await jt(t,!0)}}),k("✅ Study data cleared. Exam dates kept. Use Undo to restore.")}).catch(r=>{k("Reset failed. Check the browser console."),console.error(r)})}))}function mt(e,s){if(!s)return"";const o=s.book?`<p class="plan-book section-desc"><strong>Book:</strong> ${w(s.book)}</p>`:"",a=(s.targets||[]).map(c=>`<li>${w(c.lbl)} — <strong>${c.n}</strong></li>`).join(""),r=a?`<ul class="plan-targets">${a}</ul>`:"";return`<article class="plan-subject-card"><h3 class="plan-subject-title">${w(e)}</h3><p>${w(s.topic||"")}</p>${o}<p class="section-desc">${w(s.task||"")}</p>${r}<p class="plan-totalq section-desc"><strong>Total questions (planned):</strong> ${Number(s.totalQ)||0}</p></article>`}function rn(e){const s=`<div class="plan-week-theme"><p><strong>Theme:</strong> ${w(e.theme||"")}</p></div>`,o=`<div class="plan-subject-grid">${mt("Mathematics",e.math)}${mt("Physics",e.phy)}${mt("Chemistry",e.chem)}${mt("Previous-year questions",e.pyq)}</div>`;return s+o}function cn(){const e=document.getElementById("plan-week-select"),s=document.getElementById("plan-week-meta"),o=document.getElementById("plan-detail-root");if(!e||!s||!o)return;e.innerHTML=N.map(r=>`<option value="${r.week}">Week ${r.week} — ${w(r.theme)} (${w(r.month)})</option>`).join("");function a(r){const c=N.find(d=>d.week===r)||N[0];e.value=String(c.week),s.textContent=`${c.month} · Week ${c.week}`,o.innerHTML=rn(c)}l=r=>{let c=Number(r.currentPrepWeek);N.some(d=>d.week===c)||(c=N[0].week),a(c)},e.addEventListener("change",()=>{const r=Number(e.value);a(r),D({currentPrepWeek:r},"Active week saved.").catch(c=>{k("Could not save week. Check internet and Firebase rules."),console.error(c)})})}function ln(){const e=document.getElementById("greeting-text");if(!e)return;const s=new Date().getHours();s<12?e.textContent="Good morning,":s<17?e.textContent="Good afternoon,":e.textContent="Good evening,"}function dn(e){const s=document.getElementById("home-live-bar"),o=document.getElementById("home-live-text"),a=document.getElementById("home-live-timer");if(!s||!o)return;pt(e,L)?(s.classList.add("home-live-bar--active"),o.textContent=`Studying ${e.subject}`,a&&(a.style.display="")):(s.classList.remove("home-live-bar--active"),o.textContent="No session running — tap Start on a block below",a&&(a.style.display="none",a.textContent=""))}function un(e){const s=document.getElementById("home-schedule-blocks");if(!s)return;const o=e.jeeAdvancedFinalDate||"2027-05-17",a=q(new Date),r=ae(e,a,o,L),c=Kt(e),d=document.getElementById("home-week-line");d&&(d.textContent=`Week ${c.week} · ${c.month} — ${c.theme||""}`);const g=f=>f==="Mathematics"?"mathematics":f==="Physics"?"physics":"chemistry";s.innerHTML=r.map(f=>{const h=Gt(c,f.subject),A=h&&h.topic?`<p class="study-block__topic">${w(h.topic)}</p>`:"",B=h&&h.task?`<p class="study-block__task">${w(h.task)}</p>`:"",I=h&&h.totalQ?h.totalQ:0,S=w(f.subject);return`<article class="study-block study-block--${g(f.subject)}" data-subject="${S}" data-start="${w(f.start)}" data-end="${w(f.end)}" data-target-q="${I}"><div class="study-block__head"><span class="study-block__time">${w(f.start)}–${w(f.end)}</span><span class="study-block__subject">${S}</span></div><div class="study-block__plan">${A}${B}</div><div class="study-block__timer"><span class="study-block__live" data-running-live="${S}">—</span><div class="study-block__timer-btns"><button type="button" class="btn btn-timer-start timer-subject-start" data-subject="${S}">▶ Start</button><button type="button" class="btn btn-timer-stop timer-subject-stop" data-subject="${S}" disabled>■ Stop</button><button type="button" class="btn btn-complete-block" data-subject="${S}">✓ Complete</button></div><span class="study-block__today">Today <strong data-today-total="${S}">0s</strong></span></div></article>`}).join(""),Qt(),yn()}function mn(){const e=T(t,y.live,y.session),s=K(e,o=>{const a=o.exists()?o.data():{};Bt(a),dn(a);const r=document.getElementById("home-live-timer");r&&pt(a,L)&&(r.style.display="")});i.push(s)}function fn(e){if(!document.getElementById("doubt-list"))return;const o=T(t,y.doubts,e),a=K(o,r=>{const c=r.exists()&&r.data().items?r.data().items:[];pn(e,c)});i.push(a)}function pn(e,s){const o=document.getElementById("doubt-list"),a=document.getElementById("doubt-count");if(o){if(a&&(a.textContent=`${s.length} ${s.length===1?"entry":"entries"}`),!s.length){o.innerHTML="<p class='empty-state'>No doubts recorded today. Keep going! 💪</p>";return}o.innerHTML=s.map((r,c)=>{const d=r.timestamp?new Date(r.timestamp).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"";return`
        <div class="doubt-item" data-index="${c}">
          <div class="doubt-item-head">
            <span class="doubt-subject-tag doubt-subject-tag--${w(r.subject)}">${w(r.subject)}</span>
            <span class="doubt-time">${d}</span>
          </div>
          <p class="doubt-text">${w(r.text)}</p>
          <button class="doubt-delete" data-index="${c}">🗑️ Delete</button>
        </div>
      `}).join(""),o.querySelectorAll(".doubt-delete").forEach(r=>{r.addEventListener("click",()=>{const c=Number(r.getAttribute("data-index")),d=s.filter((g,f)=>f!==c);ee(e,d).catch(console.error)})})}}async function ee(e,s){const o=T(t,y.doubts,e),a=await j(o),r=a.exists(),c=r?a.data():null,d={items:s,updatedAt:H()};await M(o,d),!rt()&&tt({undo:async()=>{r?await M(o,c):await nt(o)},redo:async()=>{await M(o,{items:s,updatedAt:H()})}})}function gn(){const e=document.getElementById("btn-add-doubt");!e||e.dataset.wired||(e.dataset.wired="true",e.addEventListener("click",()=>{const s=document.getElementById("doubt-subject"),o=document.getElementById("doubt-text"),a=s.value,r=o.value.trim();if(!r){k("Please describe the doubt or mistake.");return}const c=q(new Date),d=T(t,y.doubts,c);j(d).then(g=>{const h=[...g.exists()&&g.data().items?g.data().items:[],{id:`doubt_${Date.now()}`,subject:a,text:r,timestamp:Date.now()}];return ee(c,h).then(()=>{o.value="",k("💡 Doubt saved!")})}).catch(console.error)}))}function hn(){[{id:"reset-mains1",label:"JEE Mains 2026 Session 1",defaultDate:"2026-01-29",settingsKey:"jeeMains1Date",display:"Jan 29, 2026"},{id:"reset-mains2",label:"JEE Mains 2026 Session 2",defaultDate:"2026-04-08",settingsKey:"jeeMains2Date",display:"Apr 8, 2026"},{id:"reset-trial",label:"JEE Advanced 2026",defaultDate:"2026-05-17",settingsKey:"jeeAdvancedTrialDate",display:"May 17, 2026"},{id:"reset-final",label:"JEE Advanced 2027",defaultDate:"2027-05-17",settingsKey:"jeeAdvancedFinalDate",display:"May 17, 2027"}].forEach(({id:s,label:o,defaultDate:a,settingsKey:r,display:c})=>{const d=document.getElementById(s);!d||d.dataset.wired||(d.dataset.wired="true",d.addEventListener("click",()=>{confirm(`Reset ${o} countdown to ${c}?`)&&D({[r]:a},`${o} reset to ${c}.`).catch(g=>{k("Could not reset. Check internet and Firebase rules."),console.error(g)})}))})}let $=null;function yn(){document.querySelectorAll(".btn-complete-block").forEach(e=>{e.dataset.wired||(e.dataset.wired="true",e.addEventListener("click",()=>{const s=e.getAttribute("data-subject"),o=e.closest(".study-block"),a=o.getAttribute("data-start"),r=o.getAttribute("data-end"),c=Number(o.getAttribute("data-target-q"))||0,d=o.querySelector(`[data-today-total="${s}"]`),g=d?d.textContent:"0s";$={subject:s,startTime:a,endTime:r,targetQ:c,timeSpent:g,dateKey:q(new Date)},bn()}))})}function bn(){const e=document.getElementById("block-completion-modal"),s=document.getElementById("modal-subject-info"),o=document.getElementById("modal-time-info");!e||!$||(s.innerHTML=`Subject: <strong>${w($.subject)}</strong> (${$.startTime}–${$.endTime})`,o.innerHTML=`Time spent: <strong>${w($.timeSpent)}</strong>`,document.getElementById("questions-total").value="",document.getElementById("questions-correct").value="",document.getElementById("questions-wrong").value="",document.getElementById("questions-remaining").value="",document.getElementById("block-notes").value="",$.targetQ>0&&(document.getElementById("questions-total").placeholder=`Target: ${$.targetQ} questions`),e.classList.add("modal-open"),document.body.style.overflow="hidden")}function ft(){const e=document.getElementById("block-completion-modal");e&&(e.classList.remove("modal-open"),document.body.style.overflow="",$=null)}async function wn(){if(!$)return;const e=Number(document.getElementById("questions-total").value)||0,s=Number(document.getElementById("questions-correct").value)||0,o=Number(document.getElementById("questions-wrong").value)||0,a=Number(document.getElementById("questions-remaining").value)||0,r=document.getElementById("block-notes").value.trim();if(e===0){k("Please enter the total questions attempted.");return}if(s+o>e){k("Correct + Wrong cannot exceed Total questions.");return}const c={id:`block_${Date.now()}`,dateKey:$.dateKey,subject:$.subject,startTime:$.startTime,endTime:$.endTime,timeSpent:$.timeSpent,questionsTotal:e,questionsCorrect:s,questionsWrong:o,questionsRemaining:a,accuracy:e>0?Math.round(s/e*100):0,notes:r,completedAt:H()};try{const d=T(V(t,y.blockCompletions));await M(d,c),a>0&&await vn($.subject,a,$.dateKey),k(`✅ Block completed! Accuracy: ${c.accuracy}%`),ft()}catch(d){k("Could not save block completion."),console.error(d)}}async function vn(e,s,o){const a=T(t,y.questionTracking,"carryover"),r=await j(a),c=r.exists()?r.data().items||[]:[],d={id:`carry_${Date.now()}`,subject:e,count:s,fromDateKey:o,addedAt:Date.now()};await M(a,{items:[...c,d],updatedAt:H()})}function kn(){const e=document.getElementById("close-block-modal"),s=document.getElementById("cancel-block-modal"),o=document.getElementById("save-block-completion"),a=document.getElementById("block-completion-modal");e&&!e.dataset.wired&&(e.dataset.wired="true",e.addEventListener("click",ft)),s&&!s.dataset.wired&&(s.dataset.wired="true",s.addEventListener("click",ft)),o&&!o.dataset.wired&&(o.dataset.wired="true",o.addEventListener("click",wn)),a&&!a.dataset.wired&&(a.dataset.wired="true",a.addEventListener("click",r=>{r.target===a&&ft()}))}function En(){i.forEach(a=>{typeof a=="function"&&a()}),i=[];const e=q(new Date),s=["home","schedule","settings","plan"].includes(n);ln();const o=document.getElementById("today-label");o&&(o.textContent=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})),n==="plan"&&cn(),s&&Qe(),n==="settings"&&(Ve(),ze(),Ye(),on()),(n==="timers"||n==="schedule")&&(Yt(e),Dt(),tn(),Xt(),O&&clearInterval(O),O=setInterval(()=>Dt(),6e4)),n==="home"&&(Yt(e),mn(),Xt(),Zt(),te(e),fn(e),gn(),hn(),kn()),n==="tasks"&&(Zt(),te(e)),n==="history"&&an()}En()}if(!gt.apiKey||!gt.projectId){const t=document.getElementById("setup-alert"),n=document.getElementById("main-app");t&&(t.classList.remove("hidden"),t.textContent="Add your Firebase keys inside src/firebase-config.js, run npm run build, then open the built site."),n&&n.classList.add("hidden")}else{const t=Cn(gt),n=Mn(t);Qs().then(l=>{l&&gt.measurementId&&Js(t)}).catch(()=>{});const i=document.body.dataset.omPage||"home";ra(n,i)}

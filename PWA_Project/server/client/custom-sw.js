try{self["workbox:core:7.0.0"]&&_()}catch{}const J=(s,...e)=>{let t=s;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},X=J;class l extends Error{constructor(e,t){const n=X(e,t);super(n),this.name=e,this.details=t}}const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},T=s=>[f.prefix,s,f.suffix].filter(e=>e&&e.length>0).join("-"),Y=s=>{for(const e of Object.keys(f))s(e)},E={updateDetails:s=>{Y(e=>{typeof s[e]=="string"&&(f[e]=s[e])})},getGoogleAnalyticsName:s=>s||T(f.googleAnalytics),getPrecacheName:s=>s||T(f.precache),getPrefix:()=>f.prefix,getRuntimeName:s=>s||T(f.runtime),getSuffix:()=>f.suffix};function K(s,e){const t=e();return s.waitUntil(t),t}try{self["workbox:precaching:7.0.0"]&&_()}catch{}const Z="__WB_REVISION__";function ee(s){if(!s)throw new l("add-to-cache-list-unexpected-type",{entry:s});if(typeof s=="string"){const r=new URL(s,location.href);return{cacheKey:r.href,url:r.href}}const{revision:e,url:t}=s;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:s});if(!e){const r=new URL(t,location.href);return{cacheKey:r.href,url:r.href}}const n=new URL(t,location.href),a=new URL(t,location.href);return n.searchParams.set(Z,e),{cacheKey:n.href,url:a.href}}class te{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:n})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const a=t.originalRequest.url;n?this.notUpdatedURLs.push(a):this.updatedURLs.push(a)}return n}}}class se{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:n})=>{const a=(n==null?void 0:n.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return a?new Request(a,{headers:t.headers}):t},this._precacheController=e}}let y;function ne(){if(y===void 0){const s=new Response("");if("body"in s)try{new Response(s.body),y=!0}catch{y=!1}y=!1}return y}async function ae(s,e){let t=null;if(s.url&&(t=new URL(s.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const n=s.clone(),a={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=e?e(a):a,i=ne()?n.body:await n.blob();return new Response(i,r)}const re=s=>new URL(String(s),location.href).href.replace(new RegExp(`^${location.origin}`),"");function O(s,e){const t=new URL(s);for(const n of e)t.searchParams.delete(n);return t.href}async function ie(s,e,t,n){const a=O(e.url,t);if(e.url===a)return s.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await s.keys(e,r);for(const c of i){const o=O(c.url,t);if(a===o)return s.match(c,n)}}class ce{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const H=new Set;async function oe(){for(const s of H)await s()}function he(s){return new Promise(e=>setTimeout(e,s))}try{self["workbox:strategies:7.0.0"]&&_()}catch{}function C(s){return typeof s=="string"?new Request(s):s}class le{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new ce,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const n of this._plugins)this._pluginStateMap.set(n,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let n=C(e);if(n.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const i=await t.preloadResponse;if(i)return i}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const i of this.iterateCallbacks("requestWillFetch"))n=await i({request:n.clone(),event:t})}catch(i){if(i instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const r=n.clone();try{let i;i=await fetch(n,n.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const c of this.iterateCallbacks("fetchDidSucceed"))i=await c({event:t,request:r,response:i});return i}catch(i){throw a&&await this.runCallbacks("fetchDidFail",{error:i,event:t,originalRequest:a.clone(),request:r.clone()}),i}}async fetchAndCachePut(e){const t=await this.fetch(e),n=t.clone();return this.waitUntil(this.cachePut(e,n)),t}async cacheMatch(e){const t=C(e);let n;const{cacheName:a,matchOptions:r}=this._strategy,i=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},r),{cacheName:a});n=await caches.match(i,c);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))n=await o({cacheName:a,matchOptions:r,cachedResponse:n,request:i,event:this.event})||void 0;return n}async cachePut(e,t){const n=C(e);await he(0);const a=await this.getCacheKey(n,"write");if(!t)throw new l("cache-put-with-no-response",{url:re(a.url)});const r=await this._ensureResponseSafeToCache(t);if(!r)return!1;const{cacheName:i,matchOptions:c}=this._strategy,o=await self.caches.open(i),h=this.hasCallback("cacheDidUpdate"),w=h?await ie(o,a.clone(),["__WB_REVISION__"],c):null;try{await o.put(a,h?r.clone():r)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await oe(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:i,oldResponse:w,newResponse:r.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){const n=`${e.url} | ${t}`;if(!this._cacheKeys[n]){let a=e;for(const r of this.iterateCallbacks("cacheKeyWillBeUsed"))a=C(await r({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[n]=a}return this._cacheKeys[n]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const n of this.iterateCallbacks(e))await n(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const n=this._pluginStateMap.get(t);yield r=>{const i=Object.assign(Object.assign({},r),{state:n});return t[e](i)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,n=!1;for(const a of this.iterateCallbacks("cacheWillUpdate"))if(t=await a({request:this.request,response:t,event:this.event})||void 0,n=!0,!t)break;return n||t&&t.status!==200&&(t=void 0),t}}class v{constructor(e={}){this.cacheName=E.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,n=typeof e.request=="string"?new Request(e.request):e.request,a="params"in e?e.params:void 0,r=new le(this,{event:t,request:n,params:a}),i=this._getResponse(r,n,t),c=this._awaitComplete(i,r,n,t);return[i,c]}async _getResponse(e,t,n){await e.runCallbacks("handlerWillStart",{event:n,request:t});let a;try{if(a=await this._handle(t,e),!a||a.type==="error")throw new l("no-response",{url:t.url})}catch(r){if(r instanceof Error){for(const i of e.iterateCallbacks("handlerDidError"))if(a=await i({error:r,event:n,request:t}),a)break}if(!a)throw r}for(const r of e.iterateCallbacks("handlerWillRespond"))a=await r({event:n,request:t,response:a});return a}async _awaitComplete(e,t,n,a){let r,i;try{r=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:a,request:n,response:r}),await t.doneWaiting()}catch(c){c instanceof Error&&(i=c)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:n,response:r,error:i}),t.destroy(),i)throw i}}class g extends v{constructor(e={}){e.cacheName=E.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(g.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const n=await t.cacheMatch(e);return n||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let n;const a=t.params||{};if(this._fallbackToNetwork){const r=a.integrity,i=e.integrity,c=!i||i===r;n=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?i||r:void 0})),r&&c&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,n.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return n}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const n=await t.fetch(e);if(!await t.cachePut(e,n.clone()))throw new l("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[n,a]of this.plugins.entries())a!==g.copyRedirectedCacheableResponsesPlugin&&(a===g.defaultPrecacheCacheabilityPlugin&&(e=n),a.cacheWillUpdate&&t++);t===0?this.plugins.push(g.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}g.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:s}){return!s||s.status>=400?null:s}};g.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:s}){return s.redirected?await ae(s):s}};class ue{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:n=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new g({cacheName:E.getPrecacheName(e),plugins:[...t,new se({precacheController:this})],fallbackToNetwork:n}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const n of e){typeof n=="string"?t.push(n):n&&n.revision===void 0&&t.push(n.url);const{cacheKey:a,url:r}=ee(n),i=typeof n!="string"&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==a)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:a});if(typeof n!="string"&&n.integrity){if(this._cacheKeysToIntegrities.has(a)&&this._cacheKeysToIntegrities.get(a)!==n.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(a,n.integrity)}if(this._urlsToCacheKeys.set(r,a),this._urlsToCacheModes.set(r,i),t.length>0){const c=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(c)}}}install(e){return K(e,async()=>{const t=new te;this.strategy.plugins.push(t);for(const[r,i]of this._urlsToCacheKeys){const c=this._cacheKeysToIntegrities.get(i),o=this._urlsToCacheModes.get(r),h=new Request(r,{integrity:c,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:i},request:h,event:e}))}const{updatedURLs:n,notUpdatedURLs:a}=t;return{updatedURLs:n,notUpdatedURLs:a}})}activate(e){return K(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),n=await t.keys(),a=new Set(this._urlsToCacheKeys.values()),r=[];for(const i of n)a.has(i.url)||(await t.delete(i),r.push(i.url));return{deletedURLs:r}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n)return(await self.caches.open(this.strategy.cacheName)).match(n)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return n=>(n.request=new Request(e),n.params=Object.assign({cacheKey:t},n.params),this.strategy.handle(n))}}let L;const M=()=>(L||(L=new ue),L);try{self["workbox:routing:7.0.0"]&&_()}catch{}const q="GET",x=s=>s&&typeof s=="object"?s:{handle:s};class d{constructor(e,t,n=q){this.handler=x(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=x(e)}}class de extends d{constructor(e,t,n){const a=({url:r})=>{const i=e.exec(r.href);if(i&&!(r.origin!==location.origin&&i.index!==0))return i.slice(1)};super(a,t,n)}}class fe{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,n=Promise.all(t.urlsToCache.map(a=>{typeof a=="string"&&(a=[a]);const r=new Request(...a);return this.handleRequest({request:r,event:e})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return;const a=n.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:n});let c=i&&i.handler;const o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;let h;try{h=c.handle({url:n,request:e,event:t,params:r})}catch(u){h=Promise.reject(u)}const w=i&&i.catchHandler;return h instanceof Promise&&(this._catchHandler||w)&&(h=h.catch(async u=>{if(w)try{return await w.handle({url:n,request:e,event:t,params:r})}catch(A){A instanceof Error&&(u=A)}if(this._catchHandler)return this._catchHandler.handle({url:n,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:n,event:a}){const r=this._routes.get(n.method)||[];for(const i of r){let c;const o=i.match({url:e,sameOrigin:t,request:n,event:a});if(o)return c=o,(Array.isArray(c)&&c.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(c=void 0),{route:i,params:c}}return{}}setDefaultHandler(e,t=q){this._defaultHandlerMap.set(t,x(e))}setCatchHandler(e){this._catchHandler=x(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let R;const pe=()=>(R||(R=new fe,R.addFetchListener(),R.addCacheListener()),R);function m(s,e,t){let n;if(typeof s=="string"){const r=new URL(s,location.href),i=({url:c})=>c.href===r.href;n=new d(i,e,t)}else if(s instanceof RegExp)n=new de(s,e,t);else if(typeof s=="function")n=new d(s,e,t);else if(s instanceof d)n=s;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return pe().registerRoute(n),n}function ge(s,e=[]){for(const t of[...s.searchParams.keys()])e.some(n=>n.test(t))&&s.searchParams.delete(t);return s}function*me(s,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(s,location.href);r.hash="",yield r.href;const i=ge(r,e);if(yield i.href,t&&i.pathname.endsWith("/")){const c=new URL(i.href);c.pathname+=t,yield c.href}if(n){const c=new URL(i.href);c.pathname+=".html",yield c.href}if(a){const c=a({url:r});for(const o of c)yield o.href}}class we extends d{constructor(e,t){const n=({request:a})=>{const r=e.getURLsToCacheKeys();for(const i of me(a.url,t)){const c=r.get(i);if(c){const o=e.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:o}}}};super(n,e.strategy)}}function ye(s){const e=M(),t=new we(e,s);m(t)}function _e(s){return M().createHandlerBoundToURL(s)}function Re(s){M().precache(s)}function be(s,e){Re(s),ye(e)}class Ce extends d{constructor(e,{allowlist:t=[/./],denylist:n=[]}={}){super(a=>this._match(a),e),this._allowlist=t,this._denylist=n}_match({url:e,request:t}){if(t&&t.mode!=="navigate")return!1;const n=e.pathname+e.search;for(const a of this._denylist)if(a.test(n))return!1;return!!this._allowlist.some(a=>a.test(n))}}class V extends v{async _handle(e,t){let n=await t.cacheMatch(e),a;if(!n)try{n=await t.fetchAndCachePut(e)}catch(r){r instanceof Error&&(a=r)}if(!n)throw new l("no-response",{url:e.url,error:a});return n}}const xe={cacheWillUpdate:async({response:s})=>s.status===200||s.status===0?s:null};class $ extends v{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(xe),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){const n=[],a=[];let r;if(this._networkTimeoutSeconds){const{id:o,promise:h}=this._getTimeoutPromise({request:e,logs:n,handler:t});r=o,a.push(h)}const i=this._getNetworkPromise({timeoutId:r,request:e,logs:n,handler:t});a.push(i);const c=await t.waitUntil((async()=>await t.waitUntil(Promise.race(a))||await i)());if(!c)throw new l("no-response",{url:e.url});return c}_getTimeoutPromise({request:e,logs:t,handler:n}){let a;return{promise:new Promise(i=>{a=setTimeout(async()=>{i(await n.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:a}}async _getNetworkPromise({timeoutId:e,request:t,logs:n,handler:a}){let r,i;try{i=await a.fetchAndCachePut(t)}catch(c){c instanceof Error&&(r=c)}return e&&clearTimeout(e),(r||!i)&&(i=await a.cacheMatch(t)),i}}function G(s){s.then(()=>{})}const Ee=(s,e)=>e.some(t=>s instanceof t);let W,B;function De(){return W||(W=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Te(){return B||(B=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Q=new WeakMap,I=new WeakMap,z=new WeakMap,U=new WeakMap,S=new WeakMap;function Le(s){const e=new Promise((t,n)=>{const a=()=>{s.removeEventListener("success",r),s.removeEventListener("error",i)},r=()=>{t(p(s.result)),a()},i=()=>{n(s.error),a()};s.addEventListener("success",r),s.addEventListener("error",i)});return e.then(t=>{t instanceof IDBCursor&&Q.set(t,s)}).catch(()=>{}),S.set(e,s),e}function Ue(s){if(I.has(s))return;const e=new Promise((t,n)=>{const a=()=>{s.removeEventListener("complete",r),s.removeEventListener("error",i),s.removeEventListener("abort",i)},r=()=>{t(),a()},i=()=>{n(s.error||new DOMException("AbortError","AbortError")),a()};s.addEventListener("complete",r),s.addEventListener("error",i),s.addEventListener("abort",i)});I.set(s,e)}let N={get(s,e,t){if(s instanceof IDBTransaction){if(e==="done")return I.get(s);if(e==="objectStoreNames")return s.objectStoreNames||z.get(s);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return p(s[e])},set(s,e,t){return s[e]=t,!0},has(s,e){return s instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in s}};function ke(s){N=s(N)}function Pe(s){return s===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=s.call(k(this),e,...t);return z.set(n,e.sort?e.sort():[e]),p(n)}:Te().includes(s)?function(...e){return s.apply(k(this),e),p(Q.get(this))}:function(...e){return p(s.apply(k(this),e))}}function Ie(s){return typeof s=="function"?Pe(s):(s instanceof IDBTransaction&&Ue(s),Ee(s,De())?new Proxy(s,N):s)}function p(s){if(s instanceof IDBRequest)return Le(s);if(U.has(s))return U.get(s);const e=Ie(s);return e!==s&&(U.set(s,e),S.set(e,s)),e}const k=s=>S.get(s);function Ne(s,e,{blocked:t,upgrade:n,blocking:a,terminated:r}={}){const i=indexedDB.open(s,e),c=p(i);return n&&i.addEventListener("upgradeneeded",o=>{n(p(i.result),o.oldVersion,o.newVersion,p(i.transaction),o)}),t&&i.addEventListener("blocked",o=>t(o.oldVersion,o.newVersion,o)),c.then(o=>{r&&o.addEventListener("close",()=>r()),a&&o.addEventListener("versionchange",h=>a(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}function ve(s,{blocked:e}={}){const t=indexedDB.deleteDatabase(s);return e&&t.addEventListener("blocked",n=>e(n.oldVersion,n)),p(t).then(()=>{})}const Me=["get","getKey","getAll","getAllKeys","count"],Se=["put","add","delete","clear"],P=new Map;function j(s,e){if(!(s instanceof IDBDatabase&&!(e in s)&&typeof e=="string"))return;if(P.get(e))return P.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,a=Se.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(a||Me.includes(t)))return;const r=async function(i,...c){const o=this.transaction(i,a?"readwrite":"readonly");let h=o.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),a&&o.done]))[0]};return P.set(e,r),r}ke(s=>({...s,get:(e,t,n)=>j(e,t)||s.get(e,t,n),has:(e,t)=>!!j(e,t)||s.has(e,t)}));try{self["workbox:expiration:7.0.0"]&&_()}catch{}const Ae="workbox-expiration",b="cache-entries",F=s=>{const e=new URL(s,location.href);return e.hash="",e.href};class Ke{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(b,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&ve(this._cacheName)}async setTimestamp(e,t){e=F(e);const n={url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)},r=(await this.getDb()).transaction(b,"readwrite",{durability:"relaxed"});await r.store.put(n),await r.done}async getTimestamp(e){const n=await(await this.getDb()).get(b,this._getId(e));return n==null?void 0:n.timestamp}async expireEntries(e,t){const n=await this.getDb();let a=await n.transaction(b).store.index("timestamp").openCursor(null,"prev");const r=[];let i=0;for(;a;){const o=a.value;o.cacheName===this._cacheName&&(e&&o.timestamp<e||t&&i>=t?r.push(a.value):i++),a=await a.continue()}const c=[];for(const o of r)await n.delete(b,o.id),c.push(o.url);return c}_getId(e){return this._cacheName+"|"+F(e)}async getDb(){return this._db||(this._db=await Ne(Ae,1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class Oe{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new Ke(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),n=await self.caches.open(this._cacheName);for(const a of t)await n.delete(a,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,G(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),n=Date.now()-this._maxAgeSeconds*1e3;return t!==void 0?t<n:!0}else return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}function We(s){H.add(s)}class D{constructor(e={}){this.cachedResponseWillBeUsed=async({event:t,request:n,cacheName:a,cachedResponse:r})=>{if(!r)return null;const i=this._isResponseDateFresh(r),c=this._getCacheExpiration(a);G(c.expireEntries());const o=c.updateTimestamp(n.url);if(t)try{t.waitUntil(o)}catch{}return i?r:null},this.cacheDidUpdate=async({cacheName:t,request:n})=>{const a=this._getCacheExpiration(t);await a.updateTimestamp(n.url),await a.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&We(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===E.getRuntimeName())throw new l("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new Oe(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(t===null)return!0;const n=Date.now();return t>=n-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),a=new Date(t).getTime();return isNaN(a)?null:a}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}const Be=new d(({url:s})=>s.pathname==="/tours",new $({cacheName:"tours-cache",plugins:[new D({maxAgeSeconds:60*60*24*1})],cacheableResponse:{statuses:[0,200]}}));m(Be);const je=new d(({url:s})=>s.pathname.startsWith("/tours/"),new $({cacheName:"TourDetail-cache",plugins:[new D({maxAgeSeconds:60*60*24*1})],cacheableResponse:{statuses:[0,200]}}));m(je);const Fe=new d(({url:s})=>/.*images\/.*.jpg/.test(s.pathname),new V({cacheName:"card-images-cache",plugins:[new D({maxAgeSeconds:60*60*24*1})],cacheableResponse:{statuses:[0,200]}}));m(Fe);const He=new d(({url:s})=>/.*staticImages\/.*.*/.test(s.pathname),new V({cacheName:"staticImages-cache",plugins:[new D({maxAgeSeconds:60*60*24*1})],cacheableResponse:{statuses:[0,200]}}));m(He);be([{"revision":null,"url":"assets/index-_92IGH4l.css"},{"revision":null,"url":"assets/index--HD6zTsV.js"},{"revision":null,"url":"assets/index-0q0bsHtn.css"},{"revision":null,"url":"assets/index-0SGinyKC.css"},{"revision":null,"url":"assets/index-10fPnfWD.js"},{"revision":null,"url":"assets/index-26htzO8l.js"},{"revision":null,"url":"assets/index-3g_gGH7D.js"},{"revision":null,"url":"assets/index-3YuQU4kE.css"},{"revision":null,"url":"assets/index-4Z1qqeit.js"},{"revision":null,"url":"assets/index-578lF8oN.js"},{"revision":null,"url":"assets/index-5AS25Xfq.js"},{"revision":null,"url":"assets/index-5BbJs3s9.css"},{"revision":null,"url":"assets/index-5CBsO8Qy.js"},{"revision":null,"url":"assets/index-5jw1p6_d.js"},{"revision":null,"url":"assets/index-66_SBKUr.js"},{"revision":null,"url":"assets/index-6bA-ppBf.js"},{"revision":null,"url":"assets/index-6l9N29SX.js"},{"revision":null,"url":"assets/index-7_wkS7gk.css"},{"revision":null,"url":"assets/index-7aMGbg7I.js"},{"revision":null,"url":"assets/index-81NBAfNW.js"},{"revision":null,"url":"assets/index-8xFJQ2Em.js"},{"revision":null,"url":"assets/index-96G6oHhS.js"},{"revision":null,"url":"assets/index-98hTiXbw.js"},{"revision":null,"url":"assets/index-9kVFwkr1.js"},{"revision":null,"url":"assets/index-aellLfnR.js"},{"revision":null,"url":"assets/index-AIYkOApV.js"},{"revision":null,"url":"assets/index-aMWhyg8P.js"},{"revision":null,"url":"assets/index-AQRHET38.css"},{"revision":null,"url":"assets/index-B4bt3gAX.js"},{"revision":null,"url":"assets/index-CG5_hTbf.js"},{"revision":null,"url":"assets/index-DB7PrSbd.css"},{"revision":null,"url":"assets/index-dcfc8Ppq.js"},{"revision":null,"url":"assets/index-dcYJkBqC.css"},{"revision":null,"url":"assets/index-dY6CzCzQ.js"},{"revision":null,"url":"assets/index-EJf9abZ6.js"},{"revision":null,"url":"assets/index-EnBvbJvy.js"},{"revision":null,"url":"assets/index-F2VrZ99b.css"},{"revision":null,"url":"assets/index-fYRGutr1.js"},{"revision":null,"url":"assets/index-GGVpVWMO.js"},{"revision":null,"url":"assets/index-gGyDE6OM.js"},{"revision":null,"url":"assets/index-gZfoafBQ.js"},{"revision":null,"url":"assets/index-hCug58H9.js"},{"revision":null,"url":"assets/index-heBdomC4.css"},{"revision":null,"url":"assets/index-hFrZ1d-6.js"},{"revision":null,"url":"assets/index-i19a_vqA.js"},{"revision":null,"url":"assets/index-IDvChD34.js"},{"revision":null,"url":"assets/index-iZFHIxan.js"},{"revision":null,"url":"assets/index-J7eZwhYV.js"},{"revision":null,"url":"assets/index-k7FcnGqR.css"},{"revision":null,"url":"assets/index-KdmSTb9P.js"},{"revision":null,"url":"assets/index-KjuDu-uL.js"},{"revision":null,"url":"assets/index-kYi8lFPx.js"},{"revision":null,"url":"assets/index-lD_407xn.js"},{"revision":null,"url":"assets/index-lh6-MY-u.js"},{"revision":null,"url":"assets/index-Lj0J1uXO.js"},{"revision":null,"url":"assets/index-lk1kGoqo.js"},{"revision":null,"url":"assets/index-lqZ6Cogx.js"},{"revision":null,"url":"assets/index-MOv_PVWI.js"},{"revision":null,"url":"assets/index-MyjYJFeH.css"},{"revision":null,"url":"assets/index-N1yUyf-1.js"},{"revision":null,"url":"assets/index-NKt7dEui.css"},{"revision":null,"url":"assets/index-nt476Bb4.js"},{"revision":null,"url":"assets/index-nU7YJBPV.css"},{"revision":null,"url":"assets/index-nVzdxazD.js"},{"revision":null,"url":"assets/index-O2uP-cZk.css"},{"revision":null,"url":"assets/index-OgtrQyTu.js"},{"revision":null,"url":"assets/index-OjhW1rdi.js"},{"revision":null,"url":"assets/index-OOBbPCyT.js"},{"revision":null,"url":"assets/index-Ots3azkY.js"},{"revision":null,"url":"assets/index-OYQmINen.js"},{"revision":null,"url":"assets/index-prqjrWjH.css"},{"revision":null,"url":"assets/index-Q3o8x85J.css"},{"revision":null,"url":"assets/index-QoJHdMmu.js"},{"revision":null,"url":"assets/index-QzM-V2AQ.js"},{"revision":null,"url":"assets/index-r7SyHe_w.js"},{"revision":null,"url":"assets/index-Remslpux.js"},{"revision":null,"url":"assets/index-rrBnmMr2.js"},{"revision":null,"url":"assets/index-rXsFViA-.js"},{"revision":null,"url":"assets/index-SblUFT8M.js"},{"revision":null,"url":"assets/index-TDziU24R.css"},{"revision":null,"url":"assets/index-tGzW5lYa.js"},{"revision":null,"url":"assets/index-TiNvLrgj.js"},{"revision":null,"url":"assets/index-TQhz4yK3.js"},{"revision":null,"url":"assets/index-Tr_twfZF.js"},{"revision":null,"url":"assets/index-TumzuRVK.js"},{"revision":null,"url":"assets/index-uw0kGcHT.js"},{"revision":null,"url":"assets/index-UWNbBI6F.css"},{"revision":null,"url":"assets/index-v35Nt4gy.js"},{"revision":null,"url":"assets/index-vnLsSQGM.js"},{"revision":null,"url":"assets/index-vvNStyxR.js"},{"revision":null,"url":"assets/index-WEWz0-Vi.js"},{"revision":null,"url":"assets/index-wwv01gCd.js"},{"revision":null,"url":"assets/index-x8aMUB-g.css"},{"revision":null,"url":"assets/index-x9Kyw9oE.js"},{"revision":null,"url":"assets/index-Xk9XBPH-.js"},{"revision":null,"url":"assets/index-xZ3dyeYz.js"},{"revision":null,"url":"assets/index-Y4gviYXc.js"},{"revision":null,"url":"assets/index-ZKdOnte6.js"},{"revision":null,"url":"assets/index-zo5rai5l.css"},{"revision":null,"url":"assets/index-ZUCSttbr.js"},{"revision":null,"url":"assets/index-zUFqEQck.css"},{"revision":"6051c91f51c901a720c8b5c53d1383f6","url":"index.html"},{"revision":"956eaddb42494cf290f40c9b3916747c","url":"registerSW.js"},{"revision":"53dc36d5488bec3a4773bd8e32ed9ac7","url":"images/icons/android-chrome-192x192.png"},{"revision":"8101dc7ba127ac15c9f6bb8fa49440c1","url":"images/icons/android-chrome-512x512.png"},{"revision":"fb8b59fd0a37a74112eb1c060f65f3d7","url":"favicon.ico"},{"revision":"8542332d447afbd1e6939befcfa883aa","url":"fonts/LibreBodoni/LibreBodoni-Regular.ttf"},{"revision":"cc0ab33debdec5285adb952c8fcd6bf4","url":"fonts/Lora/Lora-Regular.ttf"},{"revision":"34de1239b12123b85ff1a68b58835a1f","url":"fonts/Montserrat/Montserrat-Regular.ttf"},{"revision":"3028486fb37cd8605b1548508eb750ee","url":"images/icons/apple-touch-icon.png"},{"revision":"ea6bf9188ca7626266f8d0d34f3e570f","url":"images/icons/favicon-16x16.png"},{"revision":"28158beb4c5ebdb07db2c3864b4169fe","url":"images/icons/favicon-32x32.png"},{"revision":"1dafa87820e6ac6f3c79295d5a9597dd","url":"images/icons/favicon.ico"},{"revision":"a9a9a50dedb508b91395a34e41afcda2","url":"images/icons/mstile-150x150.png"},{"revision":"c63945b7e3e01722d491186b423871cc","url":"images/icons/safari-pinned-tab.svg"},{"revision":"88f5a124c6eb9a71437bf67faf904f79","url":"manifest.webmanifest"}]);m(new Ce(_e("index.html")));console.debug("SW loaded");self.addEventListener("message",s=>{var e;((e=s.data)==null?void 0:e.type)==="SKIP_WAITING"&&self.skipWaiting()});self.addEventListener("install",()=>{console.debug("SW install event"),caches.delete("roberts-employees")});self.addEventListener("activate",function(){return console.debug("SW activate event, claiming control"),self.clients.claim()});

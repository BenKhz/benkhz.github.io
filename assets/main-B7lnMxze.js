import{i as _}from"./init-D167z9Mp.js";import{_ as x}from"./preload-helper-D7HrI6pR.js";const y=`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
  canvas {
    position: absolute;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: 0;
  }
  canvas.visible { opacity: 0.45; }
  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgb(255 255 255 / 0.85) 40%, rgb(255 255 255 / 0) 80%);
    pointer-events: none;
    z-index: 1;
  }
  :host-context(.dark) .scrim {
    background: linear-gradient(to right, rgb(17 24 39 / 0.85) 40%, rgb(17 24 39 / 0) 80%);
  }
  .scrim[hidden] { display: none !important; }
  .content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
`,w=window.matchMedia("(hover: none)").matches;class k extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"}),e=this.hasAttribute("no-scrim");t.innerHTML=`<style>${y}</style><canvas></canvas><div class="scrim"${e?" hidden":""}></div><div class="content"><slot></slot></div>`,this._canvas=t.querySelector("canvas"),this._ctrl=null,this._fadeTimer=null,this._io=null,this.hasAttribute("always-on")?(this._canvas.classList.add("visible"),requestAnimationFrame(()=>this._start())):w?(this._io=new IntersectionObserver(([i])=>{i.isIntersecting?(clearTimeout(this._fadeTimer),this._canvas.classList.add("visible"),this._start()):(this._canvas.classList.remove("visible"),this._fadeTimer=setTimeout(()=>{var s;return(s=this._ctrl)==null?void 0:s.stop()},350))},{threshold:.3}),this._io.observe(this)):(this._enter=()=>{clearTimeout(this._fadeTimer),this._canvas.classList.add("visible"),this._start()},this._leave=()=>{this._canvas.classList.remove("visible"),this._fadeTimer=setTimeout(()=>{var i;return(i=this._ctrl)==null?void 0:i.stop()},350)},this.addEventListener("mouseenter",this._enter),this.addEventListener("mouseleave",this._leave),this.addEventListener("focusin",this._enter),this.addEventListener("focusout",this._leave)),this._ro=new ResizeObserver(()=>{this._ctrl&&this._ctrl.resize(this.offsetWidth,this.offsetHeight)}),this._ro.observe(this)}async _getCtrl(){if(this._ctrl)return this._ctrl;const{buildScene:t}=await x(async()=>{const{buildScene:e}=await import("./bento-scenes-B60DM6cw.js");return{buildScene:e}},[]);return this._ctrl=t(this.getAttribute("scene"),this._canvas,this.offsetWidth||400,this.offsetHeight||200),this._ctrl}async _start(){const t=await this._getCtrl();t==null||t.start()}disconnectedCallback(){var t,e,i;this._enter&&(this.removeEventListener("mouseenter",this._enter),this.removeEventListener("focusin",this._enter)),this._leave&&(this.removeEventListener("mouseleave",this._leave),this.removeEventListener("focusout",this._leave)),(t=this._io)==null||t.disconnect(),(e=this._ro)==null||e.disconnect(),(i=this._ctrl)==null||i.dispose(),clearTimeout(this._fadeTimer)}}customElements.define("bento-overlay",k);const E={github:"radial-gradient(circle, #0d1117 50%, #24292e 60%, #2ea44f 100%)",linkedin:"linear-gradient(135deg, #0077B5 0%, #00A0DC 100%)",instagram:"linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)",email:"#4f46e5"},L=a=>{const t=a.toLowerCase();for(const[e,i]of Object.entries(E))if(t.includes(e))return i;return"#3b82f6"},T=`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: inherit;
    touch-action: pan-y;
    cursor: grab;
  }
  :host(:active) { cursor: grabbing; }

  slot { display: none; }

  .track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .slide {
    flex: 0 0 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: var(--color, #3b82f6);
  }

  .circle-link {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-decoration: none;
    color: inherit;
  }

  .circle {
    width: var(--sz, 120px);
    height: var(--sz, 120px);
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.3);
    box-shadow:
      0 4px 24px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--icon-sz, 46px);
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .circle-link:hover .circle { transform: scale(1.07); }

  .dots {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* Reset <button> defaults */
  .dot {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    padding: 0;
    margin: 0;
    height: 6px;
    width: 6px;
    border-radius: 3px;
    background: rgba(255,255,255,0.35);
    cursor: pointer;
    transition:
      width  0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
      background 0.3s ease;
  }

  .dot:hover { background: rgba(255,255,255,0.6); }

  .dot:focus-visible {
    outline: 2px solid rgba(255,255,255,0.9);
    outline-offset: 3px;
    border-radius: 3px;
  }

  .dot.active {
    width: 22px;
    background: rgba(255,255,255,0.9);
    cursor: default;
  }
`;class z extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=`<style>${T}</style><div class="track"></div><div class="dots" role="group" aria-label="Social links"></div><slot></slot>`,this._track=t.querySelector(".track"),this._dotsEl=t.querySelector(".dots"),this._slot=t.querySelector("slot"),this._idx=0,this._timer=null,this._focusTimer=null,this._onSlotChange=()=>this._build(),this._slot.addEventListener("slotchange",this._onSlotChange),this.addEventListener("mouseenter",()=>clearInterval(this._timer)),this.addEventListener("mouseleave",()=>this._tick()),this.addEventListener("focusin",()=>{clearTimeout(this._focusTimer),clearInterval(this._timer)}),this.addEventListener("focusout",()=>{this._focusTimer=setTimeout(()=>{var e;(e=this.shadowRoot)!=null&&e.activeElement||this._tick()},100)}),requestAnimationFrame(()=>this._build())}_build(){const t=this._slot.assignedElements();if(!t.length)return;const e=Math.min((this.offsetWidth||400)*.38,(this.offsetHeight||200)*.62,140),i=Math.round(e*.4);this.style.setProperty("--sz",e+"px"),this.style.setProperty("--icon-sz",i+"px"),this._count=t.length,this._track.innerHTML="",this._dotsEl.innerHTML="",t.forEach((s,o)=>{const h=s.getAttribute("href")||"#",l=s.dataset.color||L(h),p=s.getAttribute("aria-label")||`Slide ${o+1}`,u=`icon-carousel-slide-${o}-${this._uid}`,d=document.createElement("div");d.className="slide",d.id=u,d.style.setProperty("--color",l);const r=document.createElement("a");r.className="circle-link",r.href=h,r.target=s.getAttribute("target")||"_blank",r.rel="noopener noreferrer",r.setAttribute("aria-hidden","true"),r.setAttribute("tabindex","-1");const m=document.createElement("span");m.className="circle",m.innerHTML=s.innerHTML,r.appendChild(m),d.appendChild(r),this._track.appendChild(d);const c=document.createElement("button");c.className="dot"+(o===0?" active":""),c.type="button",c.setAttribute("tabindex",o===0?"0":"-1"),c.setAttribute("aria-label",p),c.setAttribute("aria-controls",u),c.addEventListener("click",()=>r.click()),c.addEventListener("keydown",n=>{n.key==="ArrowLeft"&&(n.preventDefault(),this._nav(-1)),n.key==="ArrowRight"&&(n.preventDefault(),this._nav(1))}),this._dotsEl.appendChild(c)}),this._goto(0),this._tick(),this._bindSwipe()}get _uid(){return this.__uid||(this.__uid=Math.random().toString(36).slice(2,7)),this.__uid}_goto(t){this._idx=(t%this._count+this._count)%this._count,this._track.style.transform=`translateX(-${this._idx*100}%)`,this._dotsEl.querySelectorAll(".dot").forEach((e,i)=>{const s=i===this._idx;e.classList.toggle("active",s),e.setAttribute("tabindex",s?"0":"-1")})}_nav(t){var e;this._goto(this._idx+t),this._tick(),(e=this._dotsEl.querySelectorAll(".dot")[this._idx])==null||e.focus()}_bindSwipe(){if(this._swipeBound)return;this._swipeBound=!0;let t=null,e=!1,i=!1;this.addEventListener("pointerdown",s=>{t=s.clientX,e=!1,i=!1,this.setPointerCapture(s.pointerId),this._track.style.transition="none"}),this.addEventListener("pointermove",s=>{if(t===null)return;const o=s.clientX-t;Math.abs(o)>4&&(e=!0),e&&(this._track.style.transform=`translateX(calc(-${this._idx*100}% + ${o}px))`)}),this.addEventListener("pointerup",s=>{if(t===null)return;const o=s.clientX-t;t=null,this._track.style.transition="",this._track.getBoundingClientRect(),e&&Math.abs(o)>this.offsetWidth*.25?(i=!0,this._goto(o<0?this._idx+1:this._idx-1),this._tick()):this._goto(this._idx),e=!1}),this.addEventListener("pointercancel",()=>{t!==null&&(t=null,e=!1,this._track.style.transition="",this._track.getBoundingClientRect(),this._goto(this._idx))}),this.addEventListener("click",s=>{i&&(s.preventDefault(),i=!1)},{capture:!0})}_tick(){clearInterval(this._timer),this._timer=setInterval(()=>this._goto(this._idx+1),3e3)}disconnectedCallback(){var t;(t=this._slot)==null||t.removeEventListener("slotchange",this._onSlotChange),clearInterval(this._timer),clearTimeout(this._focusTimer)}}customElements.define("icon-carousel",z);const v=[{name:"JavaScript",icon:"logos:javascript"},{name:"TypeScript",icon:"logos:typescript-icon"},{name:"React",icon:"logos:react"},{name:"Vue",icon:"logos:vue"},{name:"Node.js",icon:"logos:nodejs-icon"},{name:"NestJS",icon:"logos:nestjs"},{name:"Redux",icon:"logos:redux"},{name:"Next.js",icon:"logos:nextjs-icon"},{name:"PostgreSQL",icon:"logos:postgresql"},{name:"MongoDB",icon:"logos:mongodb-icon"},{name:"Docker",icon:"logos:docker-icon"},{name:"Git",icon:"logos:git-icon"},{name:"AWS",icon:"logos:aws"},{name:"Vite",icon:"logos:vitejs"},{name:"Tailwind",icon:"logos:tailwindcss-icon"},{name:"Flutter",icon:"logos:flutter"},{name:"GraphQL",icon:"logos:graphql"},{name:"Playwright",icon:"logos:playwright"},{name:"Webpack",icon:"logos:webpack"},{name:"Pinia",icon:"logos:pinia"}],S=`
  :host {
    display: block;
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    z-index: 0;
  }

  slot { display: none; }

  .tile {
    position: absolute;
    width: 52px;
    height: 52px;
    border-radius: 8px;
    background: #fdf8f0;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow:
      1px 2px 6px rgba(0,0,0,0.13),
      0 0 0 1px rgba(0,0,0,0.03);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: default;
    user-select: none;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.2s ease,
                z-index 0s;
  }

  .tile:hover {
    transform: rotate(0deg) scale(1.18) !important;
    box-shadow:
      2px 6px 16px rgba(0,0,0,0.18),
      0 0 0 1px rgba(0,0,0,0.04);
    z-index: 20;
  }
`,g=(a,t)=>a+Math.random()*(t-a);class M extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=`<style>${S}</style><slot></slot>`,this._shadow=t,requestAnimationFrame(()=>this._build())}_build(){const t=this.offsetWidth||300,e=this.offsetHeight||300,i=72,s=4,o=t/s,h=e/Math.ceil(v.length/s);v.forEach((l,p)=>{const u=p%s,d=Math.floor(p/s),r=u*o+g(o*.1,o*.9)-i/2,m=d*h+g(h*.1,h*.9)-i/2,c=g(-22,22),n=Math.floor(g(1,6)),b=document.createElement("div");b.className="tile",b.setAttribute("aria-label",l.name),b.style.cssText=`left:${r}px;top:${m}px;transform:rotate(${c}deg);z-index:${n}`,b.innerHTML=`<iconify-icon icon="${l.icon}" aria-hidden="true"></iconify-icon>`,this._shadow.appendChild(b)})}disconnectedCallback(){}}customElements.define("tech-tiles",M);const C=`
  :host {
    display: contents;
  }
  .playback-accent {
    background: rgb(10, 224, 2);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    border-radius: 0 0 3em 3em;
    width: 1em;
    bottom: calc(100% - 50%);
    height: 100%;
  }
  .playback-image {
    z-index: 2;
    position: absolute;
    right: 0;
    background: url('/assets/images/listening-placeholder.jpg') center center / cover no-repeat;
    border-radius: 50% 0 0 50%;
    width: 66%;
    top: -16px;
    height: 100%;
    transition: opacity 0.3s ease;
  }
  .playback-scrim {
    position: absolute;
    inset: 0;
    z-index: 3;
    background: linear-gradient(to right, rgb(255 255 255) 30%, rgb(255 255 255 / 0) 68%);
    pointer-events: none;
  }
  :host-context(.dark) .playback-scrim {
    background: linear-gradient(to right, rgb(31 41 55 / 0.95) 30%, rgb(31 41 55 / 0) 68%);
  }
  .playback-text {
    position: relative;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* indent text to start at the right edge of the accent bar */
    padding-left: calc(1em + 0.5rem);
    padding-bottom: 2rem;
    max-width: 48%;
  }
  ::slotted(.playback-label) {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.5;
    margin: 0 0 0.25rem;
  }
  ::slotted(.playback-title) {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin: 0;
  }
  ::slotted(.playback-tracks) {
    margin: 0.375rem 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.8125rem;
    line-height: 1.5;
    opacity: 0.65;
  }
  ::slotted(.playback-album) {
    font-size: 0.75rem;
    opacity: 0.5;
    margin: 0.2rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ::slotted(.playback-explicit) {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    background: currentColor;
    color: inherit;
    border-radius: 3px;
    padding: 1px 4px;
    margin-left: 0.4rem;
    vertical-align: middle;
    opacity: 0.45;
  }
  .playback-preview {
    position: absolute;
    bottom: 12px;
    left: calc(1em + 0.5rem);
    z-index: 6;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgb(10, 224, 2);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    transition: transform 0.15s ease, opacity 0.15s ease;
  }
  .playback-preview:hover { transform: scale(1.1); }
  .playback-preview svg { width: 12px; height: 12px; fill: #000; }
  .playback-wave {
    width: var(--wave-from, 200px);
    height: 25px;
    overflow: hidden;
    position: absolute;
    bottom: 16px;
    z-index: 4;
    border-radius: 9999px;
    animation: playback-grow var(--playback-duration, 420s) linear forwards;
  }
  .playback-wave::before {
    content: "InvisibleContentToScaffoldTextDecorationUnderline";
    position: absolute;
    top: -1em;
    text-decoration-line: underline;
    color: transparent;
    font-size: 4em;
    text-decoration-style: wavy;
    text-decoration-color: rgb(10, 224, 2);
    text-decoration-thickness: 4px;
    white-space: nowrap;
    animation: playback-wave 1s linear infinite;
  }
  .playback-wave::after {
    content: '';
    position: absolute;
    border-radius: 1000px;
    left: calc(100% - 18px);
    background: rgb(10, 224, 2);
    width: 18px;
    height: 18px;
    top: 4px;
  }
  @keyframes playback-wave {
    from { transform: translateX(0); }
    to   { transform: translateX(-53px); }
  }
  @keyframes playback-grow {
    from { width: var(--wave-from, 200px); }
    to   { width: var(--wave-to, 400px); }
  }
`,f='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',A='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',$=`
  <div class="playback-accent"></div>
  <div class="playback-scrim"></div>
  <div class="playback-text">
    <slot></slot>
  </div>
  <div class="playback-image"></div>
  <div class="playback-wave"></div>
  <button class="playback-preview" aria-label="Preview">${f}</button>
`;function H(a){const t=Math.floor((Date.now()-new Date(a))/6e4);if(t<1)return"just now";if(t<60)return`${t}m ago`;const e=Math.floor(t/60);return e<24?`${e}h ago`:`${Math.floor(e/24)}d ago`}class I extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=$+`<style>${C}</style>`,this._shadow=t,this._hydrate()}async _hydrate(){const t=await this._fetchRecentTracks();if(!(t!=null&&t.length))return;const[e]=t,i=this.querySelector(".playback-title"),s=this.querySelector(".playback-label"),o=this.querySelector(".playback-tracks"),h=this._shadow.querySelector(".playback-image"),l=this._shadow.querySelector(".playback-preview");if(i&&(i.textContent=e.name,e.explicit)){const n=document.createElement("span");n.className="playback-explicit",n.textContent="E",i.append(n)}const p=document.createElement("p");if(p.className="playback-album",p.textContent=`${e.artists[0]} · ${e.album.name}`,i==null||i.after(p),s&&(s.textContent=H(e.playedAt)),o==null||o.remove(),h&&e.album.image&&(h.style.backgroundImage=`url('${e.album.image}')`),l&&e.previewUrl){const n=new Audio(e.previewUrl);l.addEventListener("click",()=>{n.paused?(n.play(),l.innerHTML=A):(n.pause(),l.innerHTML=f)}),n.addEventListener("ended",()=>{l.innerHTML=f})}else l&&l.remove();const u=this._shadow.querySelector(".playback-wave"),d=400,r=Math.random()*.6+.1,m=Math.round(r*d),c=Math.round((1-r)*(e.durationMs/1e3))*3;u.style.setProperty("--wave-from",`${m}px`),u.style.setProperty("--wave-to",`${d}px`),u.style.setProperty("--playback-duration",`${c}s`)}async _fetchRecentTracks(){try{return(await(await fetch("https://backend-utj7y3c5ba-uc.a.run.app/api/spotify/recent?limit=1")).json()).tracks??null}catch{return null}}}customElements.define("bento-listening",I);const P=`
  :host {
    display: contents;
  }

  /* ── Map canvas ─────────────────────────────────────── */
  .map-wrap {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    border-radius: inherit;
  }

  .map-wrap iframe {
    position: absolute;
    /* Oversized + offset to crop Google Maps UI chrome (controls, attribution) */
    width: 140%;
    height: 140%;
    top: -20%;
    left: -20%;
    border: 0;

  }

  /* ── Pin ─────────────────────────────────────────────── */
  .map-pin {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -100%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pin-pulse {
    position: absolute;
    bottom: 2px;
    left: 50%;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(234, 67, 53, 0.25);
    transform: translateX(-50%) scale(0.5);
    animation: pin-pulse 2.2s ease-out infinite;
  }

  @keyframes pin-pulse {
    0%   { transform: translateX(-50%) scale(0.5); opacity: 0.9; }
    100% { transform: translateX(-50%) scale(2.4); opacity: 0; }
  }

  .pin-icon {
    position: relative;
    z-index: 1;
    width: 28px;
    height: 36px;
    filter: drop-shadow(0 2px 5px rgba(0 0 0 / 0.35));
  }

  /* ── Bottom scrim + text slot ────────────────────────── */
  .map-scrim {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 65%;
    z-index: 2;
    background: linear-gradient(to top, rgb(255 255 255) 35%, rgb(255 255 255 / 0) 100%);
    pointer-events: none;
  }
  :host-context(.dark) .map-scrim {
    background: linear-gradient(to top, rgb(31 41 55 / 0.98) 35%, rgb(31 41 55 / 0) 100%);
  }

  .location-text {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    z-index: 3;
    padding: 0 1.25rem 1.1rem;
    display: flex;
    flex-direction: column;
  }

  ::slotted(.location-label) {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.5;
    margin: 0 0 0.2rem;
  }

  ::slotted(.location-city) {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0;
  }
`,j=`
  <div class="map-wrap">
    <iframe
      src="https://maps.google.com/maps?q=San+Diego,+CA&t=&z=13&ie=UTF8&iwloc=&output=embed"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      aria-hidden="true"
      tabindex="-1"
    ></iframe>
  </div>
  <div class="map-pin">
    <div class="pin-pulse"></div>
    <svg class="pin-icon" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20S24 21 24 12C24 5.373 18.627 0 12 0z" fill="#ea4335"/>
      <circle cx="12" cy="12" r="4.5" fill="white"/>
    </svg>
  </div>
  <div class="map-scrim"></div>
  <div class="location-text">
    <slot></slot>
  </div>
`;class q extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=j+`<style>${P}</style>`}}customElements.define("bento-location",q);_(()=>{const a=document.getElementById("bento-ai");if(!a)return;const t=new IntersectionObserver(([e])=>{e.isIntersecting&&(t.disconnect(),x(()=>import("./bento-chat-agent-CF9CQkOv.js"),[]))},{threshold:.1});t.observe(a)});

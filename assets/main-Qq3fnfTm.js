import{i as v}from"./init-Vg4QXP8g.js";import{_ as x}from"./preload-helper-D7HrI6pR.js";const _=`
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
  }
  canvas.visible { opacity: 1; }
`,y=window.matchMedia("(hover: none)").matches;class k extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=`<style>${_}</style><slot></slot><canvas></canvas>`,this._canvas=t.querySelector("canvas"),this._ctrl=null,this._fadeTimer=null,this._io=null,this.hasAttribute("always-on")?(this._canvas.classList.add("visible"),requestAnimationFrame(()=>this._start())):y?(this._io=new IntersectionObserver(([e])=>{e.isIntersecting?(clearTimeout(this._fadeTimer),this._canvas.classList.add("visible"),this._start()):(this._canvas.classList.remove("visible"),this._fadeTimer=setTimeout(()=>{var s;return(s=this._ctrl)==null?void 0:s.stop()},350))},{threshold:.3}),this._io.observe(this)):(this._enter=()=>{clearTimeout(this._fadeTimer),this._canvas.classList.add("visible"),this._start()},this._leave=()=>{this._canvas.classList.remove("visible"),this._fadeTimer=setTimeout(()=>{var e;return(e=this._ctrl)==null?void 0:e.stop()},350)},this.addEventListener("mouseenter",this._enter),this.addEventListener("mouseleave",this._leave),this.addEventListener("focusin",this._enter),this.addEventListener("focusout",this._leave)),this._ro=new ResizeObserver(()=>{this._ctrl&&this._ctrl.resize(this.offsetWidth,this.offsetHeight)}),this._ro.observe(this)}async _getCtrl(){if(this._ctrl)return this._ctrl;const{buildScene:t}=await x(async()=>{const{buildScene:e}=await import("./bento-scenes-D_yKIvh9.js");return{buildScene:e}},[]);return this._ctrl=t(this.getAttribute("scene"),this._canvas,this.offsetWidth||400,this.offsetHeight||200),this._ctrl}async _start(){const t=await this._getCtrl();t==null||t.start()}disconnectedCallback(){var t,e,s;this._enter&&(this.removeEventListener("mouseenter",this._enter),this.removeEventListener("focusin",this._enter)),this._leave&&(this.removeEventListener("mouseleave",this._leave),this.removeEventListener("focusout",this._leave)),(t=this._io)==null||t.disconnect(),(e=this._ro)==null||e.disconnect(),(s=this._ctrl)==null||s.dispose(),clearTimeout(this._fadeTimer)}}customElements.define("bento-overlay",k);const w={github:"radial-gradient(circle, #0d1117 50%, #24292e 60%, #2ea44f 100%)",linkedin:"linear-gradient(135deg, #0077B5 0%, #00A0DC 100%)",instagram:"linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)",email:"#4f46e5"},L=r=>{const t=r.toLowerCase();for(const[e,s]of Object.entries(w))if(t.includes(e))return s;return"#3b82f6"},E=`
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
`;class T extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=`<style>${E}</style><div class="track"></div><div class="dots" role="group" aria-label="Social links"></div><slot></slot>`,this._track=t.querySelector(".track"),this._dotsEl=t.querySelector(".dots"),this._slot=t.querySelector("slot"),this._idx=0,this._timer=null,this._focusTimer=null,this._onSlotChange=()=>this._build(),this._slot.addEventListener("slotchange",this._onSlotChange),this.addEventListener("mouseenter",()=>clearInterval(this._timer)),this.addEventListener("mouseleave",()=>this._tick()),this.addEventListener("focusin",()=>{clearTimeout(this._focusTimer),clearInterval(this._timer)}),this.addEventListener("focusout",()=>{this._focusTimer=setTimeout(()=>{var e;(e=this.shadowRoot)!=null&&e.activeElement||this._tick()},100)}),requestAnimationFrame(()=>this._build())}_build(){const t=this._slot.assignedElements();if(!t.length)return;const e=Math.min((this.offsetWidth||400)*.38,(this.offsetHeight||200)*.62,140),s=Math.round(e*.4);this.style.setProperty("--sz",e+"px"),this.style.setProperty("--icon-sz",s+"px"),this._count=t.length,this._track.innerHTML="",this._dotsEl.innerHTML="",t.forEach((i,n)=>{const c=i.getAttribute("href")||"#",g=i.dataset.color||L(c),u=i.getAttribute("aria-label")||`Slide ${n+1}`,m=`icon-carousel-slide-${n}-${this._uid}`,l=document.createElement("div");l.className="slide",l.id=m,l.style.setProperty("--color",g);const a=document.createElement("a");a.className="circle-link",a.href=c,a.target=i.getAttribute("target")||"_blank",a.rel="noopener noreferrer",a.setAttribute("aria-hidden","true"),a.setAttribute("tabindex","-1");const h=document.createElement("span");h.className="circle",h.innerHTML=i.innerHTML,a.appendChild(h),l.appendChild(a),this._track.appendChild(l);const o=document.createElement("button");o.className="dot"+(n===0?" active":""),o.type="button",o.setAttribute("tabindex",n===0?"0":"-1"),o.setAttribute("aria-label",u),o.setAttribute("aria-controls",m),o.addEventListener("click",()=>a.click()),o.addEventListener("keydown",d=>{d.key==="ArrowLeft"&&(d.preventDefault(),this._nav(-1)),d.key==="ArrowRight"&&(d.preventDefault(),this._nav(1))}),this._dotsEl.appendChild(o)}),this._goto(0),this._tick(),this._bindSwipe()}get _uid(){return this.__uid||(this.__uid=Math.random().toString(36).slice(2,7)),this.__uid}_goto(t){this._idx=(t%this._count+this._count)%this._count,this._track.style.transform=`translateX(-${this._idx*100}%)`,this._dotsEl.querySelectorAll(".dot").forEach((e,s)=>{const i=s===this._idx;e.classList.toggle("active",i),e.setAttribute("tabindex",i?"0":"-1")})}_nav(t){var e;this._goto(this._idx+t),this._tick(),(e=this._dotsEl.querySelectorAll(".dot")[this._idx])==null||e.focus()}_bindSwipe(){if(this._swipeBound)return;this._swipeBound=!0;let t=null,e=!1,s=!1;this.addEventListener("pointerdown",i=>{t=i.clientX,e=!1,s=!1,this.setPointerCapture(i.pointerId),this._track.style.transition="none"}),this.addEventListener("pointermove",i=>{if(t===null)return;const n=i.clientX-t;Math.abs(n)>4&&(e=!0),e&&(this._track.style.transform=`translateX(calc(-${this._idx*100}% + ${n}px))`)}),this.addEventListener("pointerup",i=>{if(t===null)return;const n=i.clientX-t;t=null,this._track.style.transition="",this._track.getBoundingClientRect(),e&&Math.abs(n)>this.offsetWidth*.25?(s=!0,this._goto(n<0?this._idx+1:this._idx-1),this._tick()):this._goto(this._idx),e=!1}),this.addEventListener("pointercancel",()=>{t!==null&&(t=null,e=!1,this._track.style.transition="",this._track.getBoundingClientRect(),this._goto(this._idx))}),this.addEventListener("click",i=>{s&&(i.preventDefault(),s=!1)},{capture:!0})}_tick(){clearInterval(this._timer),this._timer=setInterval(()=>this._goto(this._idx+1),3e3)}disconnectedCallback(){var t;(t=this._slot)==null||t.removeEventListener("slotchange",this._onSlotChange),clearInterval(this._timer),clearTimeout(this._focusTimer)}}customElements.define("icon-carousel",T);const f=[{name:"JavaScript",icon:"logos:javascript"},{name:"TypeScript",icon:"logos:typescript-icon"},{name:"React",icon:"logos:react"},{name:"Vue",icon:"logos:vue"},{name:"Node.js",icon:"logos:nodejs-icon"},{name:"NestJS",icon:"logos:nestjs"},{name:"Redux",icon:"logos:redux"},{name:"Next.js",icon:"logos:nextjs-icon"},{name:"PostgreSQL",icon:"logos:postgresql"},{name:"MongoDB",icon:"logos:mongodb-icon"},{name:"Docker",icon:"logos:docker-icon"},{name:"Git",icon:"logos:git-icon"},{name:"AWS",icon:"logos:aws"},{name:"Vite",icon:"logos:vitejs"},{name:"Tailwind",icon:"logos:tailwindcss-icon"},{name:"Flutter",icon:"logos:flutter"},{name:"GraphQL",icon:"logos:graphql"},{name:"Playwright",icon:"logos:playwright"},{name:"Webpack",icon:"logos:webpack"},{name:"Pinia",icon:"logos:pinia"}],S=`
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
`,b=(r,t)=>r+Math.random()*(t-r);class z extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=`<style>${S}</style><slot></slot>`,this._shadow=t,requestAnimationFrame(()=>this._build())}_build(){const t=this.offsetWidth||300,e=this.offsetHeight||300,s=72,i=4,n=t/i,c=e/Math.ceil(f.length/i);f.forEach((g,u)=>{const m=u%i,l=Math.floor(u/i),a=m*n+b(n*.1,n*.9)-s/2,h=l*c+b(c*.1,c*.9)-s/2,o=b(-22,22),d=Math.floor(b(1,6)),p=document.createElement("div");p.className="tile",p.setAttribute("aria-label",g.name),p.style.cssText=`left:${a}px;top:${h}px;transform:rotate(${o}deg);z-index:${d}`,p.innerHTML=`<iconify-icon icon="${g.icon}" aria-hidden="true"></iconify-icon>`,this._shadow.appendChild(p)})}disconnectedCallback(){}}customElements.define("tech-tiles",z);const M=`
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
  .playback-wave {
    width: 200px;
    height: 25px;
    overflow: hidden;
    position: absolute;
    bottom: 16px;
    z-index: 4;
    border-radius: 9999px;
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
`,C=`
  <div class="playback-accent"></div>
  <div class="playback-scrim"></div>
  <div class="playback-text">
    <slot></slot>
  </div>
  <div class="playback-image"></div>
  <div class="playback-wave"></div>
`;class A extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=C+`<style>${M}</style>`,this._shadow=t,this._hydrate()}async _hydrate(){const t=await this._fetchNowPlaying();if(!t)return;const e=this.querySelector(".playback-title"),s=this.querySelector(".playback-tracks"),i=this._shadow.querySelector(".playback-image");e&&(e.textContent=t.show),s&&(s.innerHTML=t.episodes.map(n=>`<li>${n}</li>`).join("")),i&&t.imageUrl&&(i.style.backgroundImage=`url('${t.imageUrl}')`)}async _fetchNowPlaying(){return await new Promise(t=>setTimeout(t,800)),{show:"Darknet Diaries",episodes:["The Beirut Bank Job","Ep 160: SpyApp"],imageUrl:"/assets/images/listening-placeholder.jpg"}}}customElements.define("bento-listening",A);const H=`
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
    background-color: #f2e8d4;
  }
  :host-context(.dark) .map-wrap {
    background-color: #242424;
  }

  /* Pacific Ocean — bleeds in from the left (west) */
  .map-ocean {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 42%;
    background: linear-gradient(to right, #8ec5e0 0%, #b4d8ee 75%, transparent 100%);
    clip-path: polygon(0 0, 100% 8%, 78% 55%, 92% 100%, 0 100%);
  }
  :host-context(.dark) .map-ocean {
    background: linear-gradient(to right, #1a3d52 0%, #1f4d66 75%, transparent 100%);
  }

  /* Green park area — nod to Balboa Park */
  .map-park {
    position: absolute;
    right: 22%;
    top: 20%;
    width: 18%;
    height: 22%;
    background: #c8dfa0;
    border-radius: 3px;
    opacity: 0.8;
  }
  :host-context(.dark) .map-park {
    background: #2a4a1a;
  }

  /* Street grid */
  .map-grid {
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent 0, transparent 22px,
        rgba(255 255 255 / 0.55) 22px, rgba(255 255 255 / 0.55) 24px
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0, transparent 30px,
        rgba(255 255 255 / 0.55) 30px, rgba(255 255 255 / 0.55) 32px
      );
  }
  :host-context(.dark) .map-grid {
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent 0, transparent 22px,
        rgba(255 255 255 / 0.07) 22px, rgba(255 255 255 / 0.07) 24px
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0, transparent 30px,
        rgba(255 255 255 / 0.07) 30px, rgba(255 255 255 / 0.07) 32px
      );
  }

  /* ── Pin ─────────────────────────────────────────────── */
  .map-pin {
    position: absolute;
    left: 58%;
    top: 42%;
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
`,$=`
  <div class="map-wrap">
    <div class="map-ocean"></div>
    <div class="map-park"></div>
    <div class="map-grid"></div>
    <div class="map-pin">
      <div class="pin-pulse"></div>
      <svg class="pin-icon" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20S24 21 24 12C24 5.373 18.627 0 12 0z" fill="#ea4335"/>
        <circle cx="12" cy="12" r="4.5" fill="white"/>
      </svg>
    </div>
  </div>
  <div class="map-scrim"></div>
  <div class="location-text">
    <slot></slot>
  </div>
`;class P extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=$+`<style>${H}</style>`}}customElements.define("bento-location",P);v(()=>{});

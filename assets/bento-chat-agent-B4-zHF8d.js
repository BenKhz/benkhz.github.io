class k{constructor(){this._handlers=new Map}on(e,t){return this._handlers.has(e)||this._handlers.set(e,new Set),this._handlers.get(e).add(t),this}off(e,t){var s;return(s=this._handlers.get(e))==null||s.delete(t),this}once(e,t){const s=o=>{t(o),this.off(e,s)};return this.on(e,s)}emit(e,t){var s;return(s=this._handlers.get(e))==null||s.forEach(o=>o(t)),this}async emitAsync(e,t){const s=this._handlers.get(e);return s&&await Promise.all([...s].map(o=>o(t))),this}}const x=10,C=8e4,M=6;class T{constructor(e={}){const{endpoint:t,model:s,maxTokens:o,contextLimit:n=C,compactKeepLast:r=M,headers:i={},hooks:a={}}=e;if(!t)throw new Error("AIContextManager: config.endpoint is required");if(!a.formatRequest)throw new Error("AIContextManager: hooks.formatRequest is required");if(!a.parseResponse)throw new Error("AIContextManager: hooks.parseResponse is required");this._config={endpoint:t,model:s,maxTokens:o,contextLimit:n,compactKeepLast:r,headers:i},this._hooks=a,this._messages=[],this._summary=null,this._tools=new Map,this._emitter=new k,this._state=new Map,this._subscribers=new Map}async send(e,t={}){var n,r,i,a;const s={role:"user",content:e};if(this._messages.push(s),this._emitter.emit("message:sent",{message:s}),this._hooks.beforeSend){const c=await this._hooks.beforeSend([...this._messages]);Array.isArray(c)&&(this._messages=c)}const o=this._charCount();if(o>this._config.contextLimit){const c=((r=(n=this._hooks).onContextLimit)==null?void 0:r.call(n,o,this._config.contextLimit))??"compact";if(c==="compact")await this.compact();else if(c==="truncate")this._truncate();else throw new Error(`AIContextManager: context limit exceeded (${o} chars)`)}try{const c=await this._runLoop(t.system);return this._messages.push(c),this._emitter.emit("message:received",{message:c}),c}catch(c){throw(a=(i=this._hooks).onError)==null||a.call(i,c,"send"),this._emitter.emit("error",{error:c,phase:"send"}),c}}async compact(){var o,n;const e=this._config.compactKeepLast,t=this._messages.slice(0,-e);if(!t.length)return;this._emitter.emit("context:compact",{messageCount:t.length});let s=await((n=(o=this._hooks).onCompact)==null?void 0:n.call(o,t,this._summary));s||(s=await this._summarise(t)),this._summary=s,this._messages=this._messages.slice(-e),this._emitter.emit("context:compacted",{summary:s})}addTool(e,t,s){return this._tools.set(e,{schema:t,handler:s}),this}removeTool(e){return this._tools.delete(e),this}on(e,t){return this._emitter.on(e,t),this}off(e,t){return this._emitter.off(e,t),this}once(e,t){return this._emitter.once(e,t),this}setState(e,t){var o,n,r;const s=this._state.get(e);return this._state.set(e,t),(n=(o=this._hooks).onStateChange)==null||n.call(o,e,s,t),this._emitter.emit("state:change",{key:e,oldValue:s,newValue:t}),(r=this._subscribers.get(e))==null||r.forEach(i=>i(t,s)),this}getState(e){return this._state.get(e)}subscribe(e,t){return this._subscribers.has(e)||this._subscribers.set(e,new Set),this._subscribers.get(e).add(t),()=>this._subscribers.get(e).delete(t)}getMessages(){return[...this._messages]}getSummary(){return this._summary}getTools(){return[...this._tools.entries()].map(([e,{schema:t}])=>({name:e,schema:t}))}getContext(){return{messages:this.getMessages(),summary:this._summary,tools:this.getTools()}}reset(){return this._messages=[],this._summary=null,this._state=new Map,this._subscribers=new Map,this}async _runLoop(e,t=0){var a,c,p,u,b,f,_;if(t>=x)throw new Error(`AIContextManager: tool loop exceeded ${x} iterations`);const s=this.getContext(),o=this._hooks.formatRequest(s,{...this._config,system:e}),n=await this._fetch(o);let r=this._hooks.parseResponse(n);if(this._hooks.afterReceive&&(r=await this._hooks.afterReceive(r)??r),!((a=r.toolCalls)!=null&&a.length))return{role:"assistant",content:r.content??""};const i={role:"assistant",content:r.content??"",toolCalls:r.toolCalls};this._messages.push(i);for(const d of r.toolCalls){const v=this._tools.get(d.name);if(!v)throw new Error(`AIContextManager: unknown tool "${d.name}"`);let g=d.args;this._emitter.emit("tool:call",{name:d.name,args:g});const y=await((p=(c=this._hooks).onToolCall)==null?void 0:p.call(c,d.name,g));y!==void 0&&(g=y);let h;try{h=await v.handler(g)}catch(m){throw(b=(u=this._hooks).onError)==null||b.call(u,m,"tool"),this._emitter.emit("error",{error:m,phase:"tool"}),m}const w=await((_=(f=this._hooks).onToolResult)==null?void 0:_.call(f,d.name,h));w!==void 0&&(h=w),this._emitter.emit("tool:result",{name:d.name,result:h}),this._messages.push({role:"tool",content:JSON.stringify(h),toolCallId:d.id})}return this._runLoop(e,t+1)}async _summarise(e){const s={messages:[...this._summary?[{role:"system",content:`Previous summary:
${this._summary}`}]:[],{role:"user",content:["Summarise the conversation below. Preserve all key facts, decisions, and context. Be concise.","",...e.map(i=>`${i.role.toUpperCase()}: ${i.content}`)].join(`
`)}],tools:[],summary:null},o=this._hooks.formatRequest(s,this._config),n=await this._fetch(o);return this._hooks.parseResponse(n).content}async _fetch(e){const t=await fetch(this._config.endpoint,{method:"POST",headers:{"Content-Type":"application/json",...this._config.headers},body:JSON.stringify(e)});if(!t.ok){const s=await t.text().catch(()=>"");throw new Error(`AIContextManager: HTTP ${t.status} — ${s}`)}return t.json()}_charCount(){return this._messages.reduce((e,t)=>{var s;return e+(((s=t.content)==null?void 0:s.length)??0)},0)}_truncate(){this._messages=this._messages.slice(-this._config.compactKeepLast)}}const S={formatRequest(l,e){var n;const t=[],s=[e.system,l.summary?`[Conversation history]
${l.summary}`:null].filter(Boolean);s.length&&t.push({role:"system",content:s.join(`

`)});for(const r of l.messages)r.role==="tool"?t.push({role:"tool",tool_call_id:r.toolCallId,content:r.content}):(n=r.toolCalls)!=null&&n.length?t.push({role:"assistant",content:r.content||null,tool_calls:r.toolCalls.map(i=>({id:i.id,type:"function",function:{name:i.name,arguments:JSON.stringify(i.args)}}))}):t.push({role:r.role,content:r.content});const o={model:e.model,messages:t};return e.maxTokens&&(o.max_tokens=e.maxTokens),l.tools.length&&(o.tools=l.tools.map(r=>({type:"function",function:{name:r.name,description:r.schema.description,parameters:r.schema.parameters}}))),o},parseResponse(l){var s,o;const e=(s=l.choices)==null?void 0:s[0],t=(e==null?void 0:e.message)??{};return{content:t.content??"",stopReason:e==null?void 0:e.finish_reason,toolCalls:(o=t.tool_calls)==null?void 0:o.map(n=>({id:n.id,name:n.function.name,args:JSON.parse(n.function.arguments)}))}}},E=`You are an AI assistant on Ben Bernardy's portfolio website. Ben is a full-stack engineer with 7 years of experience specialising in AI systems, LLM integrations, and MCP Protocol. He has built production agentic workflows, multi-provider LLM systems, and was among the first to implement MCP in the ServiceNow ecosystem. Be helpful, concise, and friendly. Answer questions about Ben's work, skills, and background honestly.

You have access to tools that let you drive the UI directly — use them proactively when relevant:
- Use createNavigation when a user asks about a page or section (projects, writing, contact).
- Use scrollToSection to bring a section into view on the current page.
- Use createDownload when a user asks for the resume or CV.
- Use showContact when a user asks how to get in touch.`,L={formatRequest(l,e){return{...S.formatRequest(l,e),stream:!1}},parseResponse(l){var e,t;return{content:l.content??"",stopReason:(e=l.toolCalls)!=null&&e.length?"tool_use":"stop",toolCalls:((t=l.toolCalls)==null?void 0:t.map(s=>({id:s.id,name:s.function.name,args:JSON.parse(s.function.arguments)})))??[]}}},A=`
  :host { display: block; }
  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.6rem 1rem;
    margin-top: 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid rgb(99 102 241 / 0.35);
    background: rgb(99 102 241 / 0.12);
    color: rgb(199 210 254);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .trigger:hover {
    background: rgb(99 102 241 / 0.25);
    border-color: rgb(99 102 241 / 0.6);
  }
  .trigger svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }
`,q=`
  [hidden] { display: none !important; }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(0 0 0 / 0.6);
    backdrop-filter: blur(4px);
    padding: 1rem;
    /* dvh updates when the virtual keyboard appears */
    height: 100dvh;
  }
  .window {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 480px;
    height: min(600px, 80dvh);
    border-radius: 1.25rem;
    background: rgb(10 14 30);
    border: 1px solid rgb(99 102 241 / 0.25);
    box-shadow: 0 24px 80px rgb(0 0 0 / 0.6), 0 0 0 1px rgb(99 102 241 / 0.1);
    overflow: hidden;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgb(255 255 255 / 0.06);
    flex-shrink: 0;
  }
  .header-info { display: flex; align-items: center; gap: 0.75rem; }
  .avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, rgb(99 102 241), rgb(6 182 212));
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 700; color: white; flex-shrink: 0;
  }
  .header-name { font-size: 0.9rem; font-weight: 600; color: rgb(224 231 255); margin: 0; }
  .header-sub  { font-size: 0.7rem; color: rgb(99 102 241 / 0.7); margin: 0; }
  .header-actions { display: flex; align-items: center; gap: 0.25rem; }
  .model-select {
    background: rgb(255 255 255 / 0.06); border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 0.5rem; color: rgb(148 163 184); font-size: 0.7rem;
    padding: 0.25rem 0.5rem; cursor: pointer; outline: none; font-family: inherit;
    transition: border-color 0.15s;
  }
  .model-select:hover, .model-select:focus { border-color: rgb(99 102 241 / 0.5); color: rgb(199 210 254); }
  .model-select option { background: rgb(15 23 42); }
  .icon-btn {
    background: none; border: none; color: rgb(148 163 184);
    cursor: pointer; padding: 0.3rem; line-height: 1;
    border-radius: 0.375rem; transition: color 0.15s, background 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .icon-btn:hover { color: white; background: rgb(255 255 255 / 0.08); }
  .icon-btn svg { width: 15px; height: 15px; fill: currentColor; }
  .messages {
    flex: 1; overflow-y: auto; padding: 1.25rem;
    display: flex; flex-direction: column; gap: 0.75rem; scroll-behavior: smooth;
  }
  .messages::-webkit-scrollbar { width: 4px; }
  .messages::-webkit-scrollbar-track { background: transparent; }
  .messages::-webkit-scrollbar-thumb { background: rgb(99 102 241 / 0.3); border-radius: 2px; }
  .message {
    max-width: 82%; padding: 0.6rem 0.9rem; border-radius: 1rem;
    font-size: 0.875rem; line-height: 1.55; white-space: pre-wrap; word-break: break-word;
  }
  .message--user {
    align-self: flex-end; background: rgb(99 102 241); color: white;
    border-bottom-right-radius: 0.25rem;
  }
  .message--assistant {
    align-self: flex-start; background: rgb(255 255 255 / 0.06); color: rgb(203 213 225);
    border: 1px solid rgb(255 255 255 / 0.07); border-bottom-left-radius: 0.25rem;
  }
  .message--error {
    align-self: flex-start; background: rgb(239 68 68 / 0.15); color: rgb(252 165 165);
    border: 1px solid rgb(239 68 68 / 0.2); border-bottom-left-radius: 0.25rem;
  }
  .message--tool {
    align-self: flex-start; background: rgb(6 182 212 / 0.08); color: rgb(103 232 249);
    border: 1px solid rgb(6 182 212 / 0.2); border-radius: 0.5rem;
    font-size: 0.75rem; display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem;
  }
  .message--tool svg { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }
  .message--tool strong { font-weight: 600; color: rgb(165 243 252); }
  .message--action {
    align-self: flex-start; background: transparent; border: none;
    padding: 0.1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; max-width: 100%;
  }
  .action-btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.45rem 0.9rem; border-radius: 0.625rem; font-size: 0.8rem;
    font-weight: 500; cursor: pointer; text-decoration: none; border: 1px solid;
    transition: background 0.15s, transform 0.1s; font-family: inherit;
  }
  .action-btn:active { transform: scale(0.96); }
  .action-btn svg { width: 13px; height: 13px; fill: currentColor; flex-shrink: 0; }
  .action-btn--nav {
    background: rgb(99 102 241 / 0.15); color: rgb(199 210 254); border-color: rgb(99 102 241 / 0.35);
  }
  .action-btn--nav:hover { background: rgb(99 102 241 / 0.28); }
  .action-btn--download {
    background: rgb(16 185 129 / 0.12); color: rgb(110 231 183); border-color: rgb(16 185 129 / 0.3);
  }
  .action-btn--download:hover { background: rgb(16 185 129 / 0.22); }
  .contact-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .contact-chip {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.4rem 0.75rem; border-radius: 9999px; font-size: 0.75rem;
    font-weight: 500; text-decoration: none; color: rgb(203 213 225);
    background: rgb(255 255 255 / 0.06); border: 1px solid rgb(255 255 255 / 0.1);
    transition: background 0.15s;
  }
  .contact-chip:hover { background: rgb(255 255 255 / 0.12); }
  .contact-chip svg { width: 13px; height: 13px; fill: currentColor; }
  .typing { display: flex; align-items: center; gap: 4px; padding: 0.75rem 1rem; }
  .typing span {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgb(99 102 241 / 0.6); animation: bounce 1.2s infinite;
  }
  .typing span:nth-child(2) { animation-delay: 0.2s; }
  .typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
    40%           { transform: translateY(-6px); opacity: 1; }
  }
  .input-row {
    display: flex; align-items: flex-end; gap: 0.5rem;
    padding: 0.875rem 1.25rem; border-top: 1px solid rgb(255 255 255 / 0.06); flex-shrink: 0;
  }
  .input {
    flex: 1; background: rgb(255 255 255 / 0.05); border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 0.75rem; color: rgb(226 232 240); font-size: 0.875rem;
    padding: 0.6rem 0.875rem; resize: none; max-height: 120px; line-height: 1.5;
    font-family: inherit; transition: border-color 0.15s; field-sizing: content;
  }
  .input::placeholder { color: rgb(100 116 139); }
  .input:focus { outline: none; border-color: rgb(99 102 241 / 0.5); }
  .send {
    width: 36px; height: 36px; border-radius: 50%; background: rgb(99 102 241);
    border: none; color: white; cursor: pointer; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; transition: background 0.15s, transform 0.1s;
  }
  .send:hover:not(:disabled) { background: rgb(79 70 229); }
  .send:active:not(:disabled) { transform: scale(0.92); }
  .send:disabled { background: rgb(99 102 241 / 0.35); cursor: not-allowed; }
  .send svg { width: 16px; height: 16px; fill: currentColor; }
`,I='<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',H='<svg viewBox="0 0 20 20"><path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>',R=`
  <div class="overlay" hidden>
    <div class="window" role="dialog" aria-label="AI chat">
      <div class="header">
        <div class="header-info">
          <div class="avatar">AI</div>
          <div>
            <p class="header-name">Ben's AI</p>
          </div>
        </div>
        <div class="header-actions">
          <select class="model-select" aria-label="Model">
            <option value="gpt-4o-mini">gpt-4o-mini</option>
            <option value="gpt-4o">gpt-4o</option>
          </select>
          <button class="icon-btn btn-clear" aria-label="Clear conversation">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
          <button class="icon-btn btn-close" aria-label="Close">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
      </div>
      <div class="messages" role="log" aria-live="polite"></div>
      <div class="input-row">
        <textarea class="input" placeholder="Ask me anything about Ben…" rows="1"></textarea>
        <button class="send" aria-label="Send">${I}</button>
      </div>
    </div>
  </div>
`;class z extends HTMLElement{connectedCallback(){this._backendUrl=this.getAttribute("backend-url")||"https://backend-utj7y3c5ba-uc.a.run.app",this._manager=null,this._loading=!1,this._model="gpt-4o-mini";const e=this.attachShadow({mode:"open"});e.innerHTML=`<style>${A}</style>
      <button class="trigger" aria-label="Open AI chat">${H} Ask me anything</button>`,e.querySelector(".trigger").addEventListener("click",()=>this._open()),this._portalHost=document.createElement("div"),document.body.appendChild(this._portalHost),this._portal=this._portalHost.attachShadow({mode:"open"}),this._portal.innerHTML=`<style>${q}</style>${R}`,this._portal.querySelector(".btn-close").addEventListener("click",()=>this._close()),this._portal.querySelector(".btn-clear").addEventListener("click",()=>this._clearConversation()),this._portal.querySelector(".overlay").addEventListener("click",t=>{t.target===t.currentTarget&&this._close()}),this._portal.querySelector(".model-select").addEventListener("change",t=>{this._model=t.target.value,this._manager&&(this._manager._config.model=this._model)}),this._portal.querySelector(".send").addEventListener("click",()=>this._send()),this._portal.querySelector(".input").addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this._send())}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this._close()})}disconnectedCallback(){var e;(e=this._portalHost)==null||e.remove()}_getManager(){return this._manager?this._manager:(this._manager=new T({endpoint:`${this._backendUrl}/api/chat`,model:this._model,hooks:L}),this._manager.addTool("createNavigation",{description:"Renders a clickable navigation button in the chat. Use when the user asks about a page or wants to go somewhere on the site.",parameters:{type:"object",properties:{label:{type:"string",description:'Button label, e.g. "View Projects"'},url:{type:"string",description:'Relative URL, e.g. "/projects.html"'}},required:["label","url"]}},({label:e,url:t})=>(this._appendAction("nav",e,t),{success:!0})),this._manager.addTool("createDownload",{description:"Renders a download button for the resume/CV in the chat.",parameters:{type:"object",properties:{},required:[]}},()=>(this._appendAction("download","Download Resume","/assets/ben-bernardy-resume.pdf",!0),{success:!0})),this._manager.addTool("scrollToSection",{description:"Smoothly scrolls the page to a section. Available sections: bento-bio, bento-ai, tools, bento-listening.",parameters:{type:"object",properties:{sectionId:{type:"string",description:"The element ID to scroll to"}},required:["sectionId"]}},({sectionId:e})=>{const t=document.getElementById(e);return t?(t.scrollIntoView({behavior:"smooth",block:"center"}),{success:!0}):{success:!1,error:"Section not found"}}),this._manager.addTool("showContact",{description:"Renders clickable contact links in the chat. Use when the user asks how to reach Ben or get in touch.",parameters:{type:"object",properties:{},required:[]}},()=>(this._appendContact(),{success:!0})),this._manager.on("tool:call",({name:e})=>{this._appendToolCall(e)}),this._manager)}_open(){this._portal.querySelector(".overlay").removeAttribute("hidden"),this._portal.querySelector(".input").focus()}_close(){this._portal.querySelector(".overlay").setAttribute("hidden","")}async _send(){const e=this._portal.querySelector(".input"),t=e.value.trim();if(!(!t||this._loading)){e.value="",this._appendMessage("user",t),this._setLoading(!0);try{const s=await this._getManager().send(t,{system:E});this._appendMessage("assistant",s.content)}catch(s){this._appendMessage("error",this._errorMessage(s))}finally{this._setLoading(!1),this._portal.querySelector(".input").focus()}}}_appendToolCall(e){const t=this._portal.querySelector(".messages"),s=document.createElement("div");s.className="message message--tool",s.innerHTML=`<svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>calling tool: <strong>${e}</strong>`,t.appendChild(s),t.scrollTop=t.scrollHeight}_errorMessage(e){var o;const t=(e==null?void 0:e.message)??"";if(!t||t.includes("Failed to fetch")||t.includes("NetworkError"))return"Unable to reach the server — please check your connection and try again.";const s=(o=t.match(/HTTP (\d+)/))==null?void 0:o[1];return s==="429"?"Rate limit reached — please wait a moment before sending another message.":s==="502"?"The AI provider returned an error. Please try again shortly.":s>="500"?"A server error occurred. Please try again.":s==="401"?(fetch(`${this._backendUrl}/api/notify`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reason:"Chat 401 — invalid API key",detail:"OpenAI returned 401 for a chat request on the portfolio."})}).catch(()=>{}),"There's an authentication issue with the AI. An email has been sent to Ben so he can fix it — sorry for the inconvenience!"):"Something went wrong. Please try again."}_clearMessages(){this._portal.querySelector(".messages").innerHTML=""}_clearConversation(){var e;(e=this._manager)==null||e.reset(),this._clearMessages()}_appendAction(e,t,s,o=!1){const n=this._portal.querySelector(".messages"),r=document.createElement("div");r.className="message message--action";const i=e==="download"?'<svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M10 6v2H5v11h11v-5h2v7H3V6h7zm11-3v8l-3-3-6 6-1.5-1.5 6-6L13 3h8z"/></svg>',a=document.createElement("a");a.className=`action-btn action-btn--${e}`,a.href=s,a.innerHTML=`${i}${t}`,o?a.download="":a.addEventListener("click",()=>this._close()),r.appendChild(a),n.appendChild(r),n.scrollTop=n.scrollHeight}_appendContact(){const e=this._portal.querySelector(".messages"),t=document.createElement("div");t.className="message message--action";const s=[{label:"Email",href:"mailto:benbernardy@gmail.com",icon:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>'},{label:"GitHub",href:"https://github.com/BenKhz",icon:'<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>'},{label:"LinkedIn",href:"https://linkedin.com/in/ben-bernardy",icon:'<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>'}],o=document.createElement("div");o.className="contact-row",s.forEach(({label:n,href:r,icon:i})=>{const a=document.createElement("a");a.className="contact-chip",a.href=r,a.target="_blank",a.rel="noopener noreferrer",a.innerHTML=`${i}${n}`,o.appendChild(a)}),t.appendChild(o),e.appendChild(t),e.scrollTop=e.scrollHeight}_appendMessage(e,t){const s=this._portal.querySelector(".messages"),o=document.createElement("div");o.className=`message message--${e}`,o.textContent=t,s.appendChild(o),s.scrollTop=s.scrollHeight}_setLoading(e){this._loading=e,this._portal.querySelector(".send").disabled=e;const t=this._portal.querySelector(".typing");if(e&&!t){const s=document.createElement("div");s.className="message message--assistant typing",s.innerHTML="<span></span><span></span><span></span>";const o=this._portal.querySelector(".messages");o.appendChild(s),o.scrollTop=o.scrollHeight}else!e&&t&&t.remove()}}customElements.define("bento-chat-agent",z);

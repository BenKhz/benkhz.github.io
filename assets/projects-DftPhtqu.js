import{i as o}from"./init-DTbCGpgv.js";const a=[{id:"1",title:"Amaze",description:"On Platform Knowledge Management Solution for ServiceNow, featuring a drag-and-drop article builder, customizable templates, and an intuitive interface to streamline content creation and management.",technologies:["Vue","Vuetify","Grapesjs","ServiceNow"],image:"/assets/images/amaze_logo.svg",liveUrl:"https://intellective.co/amaze-knowledge-builder-for-servicenow",status:"featured",date:"2024-01"},{id:"2",title:"DM's Friend",description:"Open source tool for Dungeons & Dragons players to enchance remote play by sharing collaborative virtual table tops, character sheets, and campaign management features.",technologies:["Redis","PostgreSQL","Node.js","Express","Socket.io"],image:"/assets/images/DMF_icon.png",status:"coming-soon",date:"2023-11"},{id:"3",title:"JSON Util on Servicenow",description:"A utility created after teams shared frustration manipulating coplex json structures in servicenow string fields, such as system_properties and custom table fields.",technologies:["JavaScript","ServiceNow","JSON"],image:"/assets/images/jsnow_logo.png",date:"2023-09"}];o(l);function l(){if(!a||a.length===0)return;const s=a,i=document.getElementById("projects-container");i.innerHTML="",s.forEach((e,n)=>{const t=document.createElement("article");t.className="card group",t.dataset.animate="true",t.dataset.animation="fadeIn",n<5&&t.style.setProperty("--animate-delay",`${n*100}ms`),t.innerHTML=`
      <div class="flex flex-col h-full">
        ${e.image?`
          <div class="mb-4 -mx-4 -mt-4 md:-mx-6 md:-mt-6 overflow-hidden rounded-t-lg ${e.image.endsWith(".svg")?"bg-gray-50 dark:bg-gray-700/30":""}">
            <img src="${e.image}"
                 alt="${e.title}"
                 class="w-full h-48 ${e.image.endsWith(".svg")?"object-contain p-8":"object-cover"} group-hover:scale-105 transition-transform duration-300"
                 loading="lazy">
          </div>
        `:""}

        ${e.status==="featured"?'<span class="inline-block bg-accent text-white text-xs px-2 py-1 rounded mb-3 w-fit">Featured</span>':""}
        ${e.status==="coming-soon"?'<span class="inline-block bg-gray-400 dark:bg-gray-600 text-white text-xs px-2 py-1 rounded mb-3 w-fit">Coming Soon</span>':""}

        <h3 class="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          ${e.title}
        </h3>

        <p class="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
          ${e.description}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
          ${e.technologies.map(r=>`
            <span class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              ${r}
            </span>
          `).join("")}
        </div>

        <div class="flex gap-4 mt-auto">
          ${e.liveUrl?`
            <a href="${e.liveUrl}"
               target="_blank"
               rel="noopener noreferrer"
               class="text-primary hover:text-primary-dark font-medium inline-flex items-center group">
              Live Demo
              <iconify-icon icon="heroicons:arrow-top-right-on-square-20-solid" class="w-4 h-4 ml-1"></iconify-icon>
            </a>
          `:""}
          ${e.githubUrl?`
            <a href="${e.githubUrl}"
               target="_blank"
               rel="noopener noreferrer"
               class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium inline-flex items-center group">
              GitHub
              <iconify-icon icon="mdi:github" class="w-4 h-4 ml-1"></iconify-icon>
            </a>
          `:""}
        </div>
      </div>
    `,i.appendChild(t)})}

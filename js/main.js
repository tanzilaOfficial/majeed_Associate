$(function(){
  $("#year").text(new Date().getFullYear());

  function sticky(){
    if($(window).scrollTop()>70) $("#header").addClass("sticky");
    else $("#header").removeClass("sticky");
    $("#backTop").toggle($(window).scrollTop()>450);
  }
  $(window).on("scroll", sticky); sticky();

  $("#backTop").on("click",()=>$("html,body").animate({scrollTop:0},500));

  const projects=[
    {area:"Karachi",name:"Allied Bank Gulshan",meta:"Allied Bank · Karachi",img:"assets/project-1.jpg",text:"Commercial banking project delivered with coordinated architectural and construction services."},
    {area:"Lahore",name:"FBL DHA Phase-VII",meta:"Faysal Bank · Lahore",img:"assets/project-2.jpg",text:"A modern banking facility focused on efficient customer flow and high-quality finishes."},
    {area:"Lahore",name:"FBL Faisal",meta:"Faysal Bank Limited · Lahore",img:"assets/project-3.jpg",text:"A customer-facing branch built with a strong emphasis on durability and presentation."},
    {area:"Karachi",name:"Naim Khan Gym",meta:"Commercial Development · Karachi",img:"assets/project-4.jpg",text:"A contemporary commercial development with coordinated civil and finishing works."},
    {area:"Sahiwal",name:"United Bank Arifnagar",meta:"United Bank · Sahiwal",img:"assets/project-5.jpg",text:"Branch development completed with integrated construction and finishing packages."},
    {area:"Lahore",name:"Allied Bank Expo Centre",meta:"Allied Bank · Lahore",img:"assets/project-6.jpg",text:"A prominent banking facility delivered as part of the company's nationwide portfolio."},
    {area:"Karachi",name:"HBL Prestige Branch",meta:"HBL · Karachi",img:"assets/project-7.jpg",text:"High-finish banking environment with attention to detail and customer experience."},
    {area:"Sahiwal",name:"Allied Bank Warehouse",meta:"Allied Bank · Sahiwal",img:"assets/project-8.jpg",text:"Warehouse and support facility delivered for dependable long-term operations."},
    {area:"Islamabad",name:"Corporate Office Development",meta:"Commercial · Islamabad",img:"assets/project-6.jpg",text:"A planned corporate development with integrated engineering and construction."}
  ];
  let active="all", visible=6;

  function render(){
    const q=($("#projectSearch").val()||"").toLowerCase();
    const filtered=projects.filter(p=>(active==="all"||p.area===active)&&((p.name+" "+p.area+" "+p.meta).toLowerCase().includes(q)));
    const shown=filtered.slice(0,visible);
    $("#projectGrid").html(shown.map((p,i)=>`
      <div class="col-6 col-md-4 project-item">
        <article class="project-card" data-index="${projects.indexOf(p)}">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <div class="pbody"><small>${p.area.toUpperCase()}</small><h3>${p.name}</h3><p>${p.meta}</p></div>
        </article>
      </div>`).join(""));
    $("#loadMore").toggle(filtered.length>visible);
  }
  render();

  $(".filter").on("click",function(){
    $(".filter").removeClass("active"); $(this).addClass("active");
    active=$(this).data("filter"); visible=6; render();
  });
  $("#projectSearch").on("input",function(){visible=6;render()});
  $("#loadMore").on("click",function(){visible+=3;render()});

  $(document).on("click",".project-card",function(){
    const p=projects[$(this).data("index")];
    $("#modalImg").attr("src",p.img).attr("alt",p.name);
    $("#modalArea").text(p.area.toUpperCase());
    $("#modalTitle").text(p.name);
    $("#modalText").text(p.text);
    new bootstrap.Modal("#projectModal").show();
  });

  const teamProfiles={
    shahid:{name:"Shahid Majeed",role:"Founder & Technical Director",img:"assets/teamMember/shahid_Majeed.jpg",bio:"Shahid Majeed is the Founder and Technical Director of Majeed Associates (Pvt.) Ltd. (MAPL). A Civil Engineering graduate of NED University of Engineering & Technology, he brings more than 45 years of extensive experience in the construction industry.",expertise:"Construction leadership, project execution, quality assurance, and strategic company growth."},
    zain:{name:"Zain-ul-Abideen",role:"Director – Projects",img:"assets/teamMember/Zain_ul_Abideen.jpg",bio:"Zain-ul-Abideen serves as Director – Projects at MAPL and has more than 15 years of professional experience in construction and project management. He holds a bachelor’s degree in Civil Engineering from Sir Syed University of Engineering & Technology and a master’s degree in Project Management from the University of Melbourne.",expertise:"Project planning, construction management, coordination, quality control, and fast-track delivery."},
    taha:{name:"Muhammad Taha Shahid",role:"Director – Planning & Coordination",img:"assets/teamMember/Muhammad_Taha_shahid.jpg",bio:"Muhammad Taha Shahid is the Director – Planning & Coordination at MAPL, with more than 15 years of experience in construction management, organizational planning, and business development. He holds a bachelor’s degree in Civil Engineering from Sir Syed University of Engineering & Technology and a master’s degree in Engineering Management from Central Queensland University, Australia.",expertise:"Strategic planning, resource coordination, stakeholder management, and business growth."},
    ali:{name:"Muhammad Ali Shahid",role:"Director – Finance",img:"assets/profile-pic.jfif",bio:"Muhammad Ali Shahid serves as Director – Finance at MAPL. He holds an MBA in Finance and has more than 25 years of experience in financial management, corporate administration and commercial operations.",expertise:"Financial planning, budgeting, cash-flow management, taxation, compliance, and corporate financial oversight."},
    mehak:{name:"Mehak Khalid",role:"Head of MEP",img:"assets/profile-pic.jfif",bio:"Mehak Khalid leads the Mechanical, Electrical and Plumbing (MEP) Department at MAPL. She holds a bachelor’s degree in Electrical Engineering from NED University of Engineering & Technology and an MBA from the Institute of Business Administration (IBA), Karachi.",expertise:"MEP planning, coordination, project delivery, subcontractor alignment, and quality control."},
    imran:{name:"Imran Majeed",role:"Senior Accountant",img:"assets/profile-pic.jfif",bio:"Imran Majeed serves as Senior Accountant at MAPL and has been associated with the company for approximately six years. Before joining MAPL, he gained valuable professional experience at Pakistan Telecommunication Company Limited (PTCL).",expertise:"Accounting, payments, receivables, reconciliations, documentation, and project financial support."},
    kashif:{name:"Kashif Mughal",role:"Head of Administration & HSE",img:"assets/teamMember/Kashif_Mughal.jpg",bio:"Kashif Mughal leads the Administration and Health, Safety and Environment (HSE) functions at MAPL. He holds an MBA in Finance, is NEBOSH certified, and has more than 15 years of professional experience.",expertise:"Administration, HSE planning, regulatory compliance, workforce coordination, and safety management."},
    fahad:{name:"Fahad",role:"Senior QA/QC & Quantity Surveying Professional",img:"assets/teamMember/Fahad.jpg",bio:"Fahad has more than 17 years of professional experience in quality assurance, quality control and quantity surveying. Before joining MAPL, he worked with Halcrow, where he gained valuable experience in consultancy standards, project controls and construction quality management.",expertise:"Quality inspections, compliance monitoring, quantity verification, cost control, and technical coordination."}
  };
  $("#teamModal").on("show.bs.modal",function(event){
    const profile=teamProfiles[$(event.relatedTarget).data("team")];
    $("#teamModalImg").attr("src",profile.img).attr("alt",profile.name);
    $("#teamModalTitle").text(profile.name); $("#teamModalRole").text(profile.role);
    $("#teamModalBio").text(profile.bio); $("#teamModalExpertise").text(profile.expertise);
  });

  $(".counter").each(function(){
    const el=$(this), end=Number(el.data("count")); let started=false;
    const obs=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting&&!started){
        started=true; $({n:0}).animate({n:end},{duration:1000,step:function(){el.text(Math.floor(this.n))},complete:function(){el.text(end)}});
        obs.disconnect();
      }
    });
    obs.observe(this);
  });

  $('a[href^="#"]').on("click",function(e){
    const id=$(this).attr("href");
    if(id.length>1&&$(id).length){e.preventDefault();$("html,body").animate({scrollTop:$(id).offset().top-65},500);$(".navbar-collapse").collapse("hide")}
  });
});
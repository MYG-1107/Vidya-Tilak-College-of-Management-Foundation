document.addEventListener("DOMContentLoaded", () => {
  const load = async (id, file) => {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Unable to load ${file}`);
      el.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
    }
  };

  Promise.all([
    load("site-header", "includes/header.html"),
    load("site-footer", "includes/footer.html")
  ]).then(() => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileNav = document.getElementById("mobile-nav");
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener("click", () => {
        const open = mobileNav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      });
    }
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach(link => {
      if (link.getAttribute("href") === current) link.classList.add("active");
    });
  });

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(`Enquiry — Vidya Tilak College of Management Foundation`);
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nOrganisation: ${data.get("organisation") || ""}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || ""}\n\nMessage:\n${data.get("message")}`
      );
      window.location.href = `mailto:vidyatilakcollege@gmail.com?subject=${subject}&body=${body}`;
      const status = document.getElementById("form-status");
      if (status) status.textContent = "Your email client should open with the enquiry prepared.";
    });
  }

  const detail = document.getElementById("program-detail");
  if (detail) {
    const programs = {
      faculty: {title:"Faculty Development", kicker:"Academic development", intro:"Structured faculty development experiences that combine academic practice, research capability and professional learning.", points:["Faculty development workshops and training sessions","Teaching, assessment and academic practice themes","Research capability and knowledge-sharing sessions","Custom formats for departments or institutions"], delivery:"A focused workshop, multi-session series or institution-wide development program depending on the audience and objectives."},
      research: {title:"Research & Publication Support", kicker:"Research ecosystem", intro:"A structured support layer for institutions and researchers planning academic events, review workflows and research dissemination.", points:["Research theme and track planning","Paper submission and coordination workflows","Reviewer coordination and feedback management","Proceedings and knowledge-dissemination support"], delivery:"A project-based engagement with clearly defined academic scope, review process, deliverables and responsible publication requirements."},
      conferences: {title:"Conferences & Summits", kicker:"Academic events", intro:"End-to-end planning support for seminars, conferences, summits and multidisciplinary forums.", points:["Theme, tracks and event architecture","Speaker and academic coordination","Participant registration and communication support","Certificates, reports and post-event documentation"], delivery:"A one-day event, multi-day conference or recurring academic forum, based on scale and institutional requirements."},
      students: {title:"Student Skill Initiatives", kicker:"Student development", intro:"Practical learning experiences that expose students to current professional knowledge, communication and applied skills.", points:["Expert sessions and master classes","Career-oriented knowledge sessions","Project and presentation activities","Industry and professional exposure"], delivery:"Short workshops, master classes, bootcamps or a structured student development series."},
      partnerships: {title:"Institutional Partnerships", kicker:"Collaboration", intro:"Longer-term collaboration models for institutions that want to jointly develop academic, research or professional initiatives.", points:["Joint workshops and academic events","Faculty and researcher exchange activities","Research collaboration opportunities","Mentoring and capacity-building programs"], delivery:"A partnership roadmap with agreed objectives, roles, activities, governance and review points."},
      consulting: {title:"Academic Advisory & Support", kicker:"Advisory", intro:"A structured sounding board for institutions planning academic initiatives, events, research programs or capability-building projects.", points:["Initiative design and planning","Academic event strategy","Research and knowledge-program planning","Documentation, workflows and implementation support"], delivery:"An advisory sprint, defined project or ongoing institutional support arrangement."}
    };
    const key = new URLSearchParams(location.search).get("program") || "faculty";
    const item = programs[key] || programs.faculty;
    document.getElementById("detail-kicker").textContent = item.kicker;
    document.getElementById("detail-title").textContent = item.title;
    document.getElementById("detail-intro").textContent = item.intro;
    document.getElementById("detail-delivery").textContent = item.delivery;
    document.getElementById("detail-points").innerHTML = item.points.map((p, i) => `<div><b>${String(i+1).padStart(2,"0")}</b><span>${p}</span></div>`).join("");
  }
});
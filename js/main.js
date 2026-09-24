
document.addEventListener("DOMContentLoaded",()=>{
 const btn=document.querySelector(".menu-toggle"), mobile=document.querySelector(".mobile");
 if(btn&&mobile){btn.addEventListener("click",()=>{mobile.classList.toggle("open");btn.setAttribute("aria-expanded",mobile.classList.contains("open"));});}
 const path=location.pathname.split("/").pop()||"index.html";
 document.querySelectorAll("[data-page]").forEach(a=>{if(a.getAttribute("data-page")===path)a.classList.add("active");});
 const form=document.querySelector("#contact-form");
 if(form){form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);const body=`Name: ${d.get("name")}\nOrganisation: ${d.get("organisation")||""}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone")||""}\nInterest: ${d.get("interest")||""}\n\nMessage:\n${d.get("message")}`;location.href=`mailto:vidyatilakcollege@gmail.com?subject=${encodeURIComponent("Website enquiry — Vidya Tilak College of Management Foundation")}&body=${encodeURIComponent(body)}`;const s=document.querySelector("#form-status");if(s)s.textContent="Your email client should open with the enquiry details.";});}
});

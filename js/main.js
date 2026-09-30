
document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.getElementById('menu-toggle'),panel=document.getElementById('mobile-panel');
 if(toggle&&panel){toggle.addEventListener('click',()=>{panel.classList.toggle('open');toggle.setAttribute('aria-expanded',panel.classList.contains('open'));});}
 const current=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('[data-nav]').forEach(a=>{if(a.getAttribute('data-nav')===current)a.classList.add('active');});
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
 function wireForm(id,statusId){const form=document.getElementById(id);if(!form)return;form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const lines=[];for(const [k,v] of d.entries()) lines.push(k+': '+v);const subject='Website enquiry — Vidya Tilak College of Management Foundation';window.location.href='mailto:vidyatilakcollege@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));const s=document.getElementById(statusId);if(s)s.textContent='Your email client should open with the enquiry details.';});}
 wireForm('lead-form','lead-status');wireForm('contact-form','contact-status');
});

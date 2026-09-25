
document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('.menu-toggle'),mobile=document.querySelector('.mobile');
 if(toggle&&mobile){toggle.addEventListener('click',()=>{mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',mobile.classList.contains('open'));});}
 const current=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('[data-page]').forEach(a=>{if(a.getAttribute('data-page')===current)a.classList.add('active');});
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const form=document.querySelector('#contact-form');
 if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const subject='Website enquiry — Vidya Tilak College of Management Foundation';const body=['Name: '+(d.get('name')||''),'Organisation: '+(d.get('organisation')||''),'Email: '+(d.get('email')||''),'Phone: '+(d.get('phone')||''),'Interest: '+(d.get('interest')||''),'Message: '+(d.get('message')||'')].join('\n');window.location.href='mailto:vidyatilakcollege@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);const s=document.querySelector('#form-status');if(s)s.textContent='Your email application should open in your default mail client.';});}
});

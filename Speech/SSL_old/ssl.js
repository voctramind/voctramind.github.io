// VoctraMind SSL page — lightweight section reveal + active navigation
const sections=[...document.querySelectorAll('.article-section')];
const links=[...document.querySelectorAll('.map-item')];
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(x=>x.classList.remove('active'));const a=document.querySelector(`.map-item[href="#${e.target.id}"]`);if(a)a.classList.add('active')}}),{rootMargin:'-30% 0px -60% 0px'});
sections.forEach(s=>obs.observe(s));

import { showDetail } from './lightbox.js';

function renderTiles(items,id){
  const grid=document.getElementById(id);
  items.forEach((item,index)=>{
    const button=document.createElement('button');button.className='tile';
    button.setAttribute('aria-haspopup','dialog');
    if(id==='experience-grid'){
      const initials=item.initials;
      button.innerHTML=`<span class="company-mark" aria-hidden="true">${initials}</span><span class="experience-info"><h3>${item.summary}</h3><p>${item.title}</p></span><span class="experience-date">${item.category}<span class="view">View details ↗</span></span>`;
    }else{
      button.innerHTML=`<span class="card-media"><span class="tag">${item.label}</span><span class="card-fact">${item.fact}</span></span><span class="card-body"><span class="eyebrow">${item.category}</span><h3>${item.title}</h3><p>${item.summary}</p><span class="view">View project ↗</span></span>`;
    }
    button.addEventListener('click',()=>showDetail(items,index));grid.append(button);
  });
}
const toggle=document.querySelector('.menu-toggle'),links=document.querySelector('#nav-links');
toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!expanded));links.classList.toggle('open',!expanded);});
links.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');links.classList.remove('open');}));
const navbar=document.querySelector('.navbar');
function updateNav(){navbar.classList.toggle('scrolled',window.scrollY>40);}
window.addEventListener('scroll',updateNav,{passive:true});updateNav();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.querySelectorAll('a').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px'});
document.querySelectorAll('header[id],main section[id],footer[id]').forEach(section=>observer.observe(section));

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
  return response.json();
}
function renderEducation(schools) {
  document.querySelector('#education-list').innerHTML = schools.map(school => `
    <article class="education-row">
      <div class="school-mark" aria-hidden="true">${escapeHtml(school.initials)}</div>
      <div><p class="eyebrow">${escapeHtml(school.date)} · ${escapeHtml(school.location)}</p>
        <h3>${escapeHtml(school.institution)}</h3><p class="degree">${escapeHtml(school.degree)}</p>
        <p>${escapeHtml(school.summary)}</p>
        <div class="course-columns">${school.courseGroups.map(group => `<div><h4>${escapeHtml(group.name)}</h4><p>${group.courses.map(escapeHtml).join(' · ')}</p></div>`).join('')}</div>
      </div>
    </article>`).join('');
}
function renderSkills(data) {
  document.querySelector('#skills-groups').innerHTML = data.categories.map(category => `<article><h3>${escapeHtml(category.name)}</h3><p>${category.skills.map(skill => escapeHtml(skill.label)).join(' · ')}</p><p class="skill-note">${escapeHtml(category.note)}</p></article>`).join('');
  document.querySelector('#tools-list').innerHTML = data.tools.map(tool => `<span>${escapeHtml(tool)}</span>`).join('');
}
async function init() {
  const sections = [
    ['data/projects.json', '#project-grid', data => renderTiles(data.projects, 'project-grid')],
    ['data/work-experience.json', '#experience-grid', data => renderTiles(data.experiences, 'experience-grid')],
    ['data/education.json', '#education-list', data => renderEducation(data.education)],
    ['data/skills.json', '#skills-groups', renderSkills],
    ['data/highlights.json', '#stats-grid', data => {
      document.querySelector('#stats-grid').innerHTML = data.highlights.map(stat => `<div><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span><small>${escapeHtml(stat.organization)}</small></div>`).join('');
    }]
  ];
  await Promise.all(sections.map(async ([path, selector, render]) => {
    try { render(await loadJson(path)); }
    catch (error) {
      console.error(error);
      const message = document.createElement('p');
      message.setAttribute('role', 'alert');
      message.textContent = 'This section could not load. Please refresh the page or download my resume.';
      document.querySelector(selector).replaceChildren(message);
    }
  }));
}
init();

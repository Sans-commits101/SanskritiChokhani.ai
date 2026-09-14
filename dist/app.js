const projects = [
  {category:'CLIENT PROJECT · OPEN SESAME',title:'Lead Conversion & Growth',summary:'An interpretable benchmark, a stronger model, and 2× conversion among flagged leads.',subtitle:'Data Science Apprentice, Growth · Jan – May 2026',body:'<h3>The question</h3><p>Which leads are more likely to convert, and how can that inform growth decisions?</p><h3>The approach</h3><p>Benchmarked XGBoost against L1-regularized logistic regression, with class-weighted training for a dataset with approximately 16% positive outcomes. Used SHAP to surface key conversion drivers.</p><h3>The outcome</h3><p>Flagged leads achieved 2× higher conversion. Segmentation analysis identified high-value accounts to inform channel routing and marketing budget allocation, evaluated through win rate and deal value.</p>'},
  {category:'OPTIMIZATION · COLUMBIA',title:'NYC Childcare Deserts',summary:'Two integer programming models to examine the cost of expanding childcare access.',subtitle:'Optimization Under Constraints · Spring 2026',body:'<h3>The question</h3><p>What investment would be required to eliminate NYC childcare deserts under different planning assumptions?</p><h3>The approach</h3><p>Built two Gurobi-based integer programming models: one idealized and one with more realistic constraints and piecewise costs.</p><h3>What mattered</h3><p>Compared the investment gap between the models and tested sensitivity to imputation methods and cost assumptions. The work made the tradeoff between simplified planning and practical constraints explicit.</p>'},
  {category:'PRODUCT & ANALYTICS · COLUMBIA',title:'Goodreads Book Club Matcher',summary:'Turning a need for post-reading discussion into a prioritized product concept.',subtitle:'Product Management · Group project · Spring 2026',body:'<h3>Discovery</h3><p>Combined primary user research with app reviews and community forums to investigate the need for post-reading discussion.</p><h3>Prioritization & design</h3><p>Evaluated six ideas with RICE scoring and selected Book Club Matcher. Defined data flows, a five-epic agile plan, and a Now–Next–Later roadmap.</p><h3>Measuring success</h3><p>Proposed Weekly Active Discussion Rate as the North Star metric, connecting the product concept to meaningful participation.</p>'},
  {category:'LLMs & EMBEDDINGS · COURSE CASE',title:'Making CRM Data Model-Ready',summary:'Exploring how language models and embeddings support name reconciliation.',subtitle:'Blend 360 case · Foundations of AI / Modern AI coursework',body:'<h3>The case</h3><p>Studied how LLMs and embeddings can reconcile inconsistent CRM names before the data feeds a churn model.</p><h3>The connection to agentic AI</h3><p>Coursework covered tool calling, structured outputs, MCP, retrieval-augmented generation, and the LLM inference pipeline. These form the foundation for my current exploration of agentic workflows in operations research and finance.</p><p>This is coursework and an area of continued development.</p>'},
  {category:'OPERATIONS RESEARCH · COLUMBIA',title:'Routing & Scheduling',summary:'From a 220-node Columbia crown to the constraints behind NBA scheduling.',subtitle:'Optimization Models & Methods · Course projects',body:'<h3>TSP art</h3><p>Formulated a traveling salesperson problem around a 220-node Columbia crown, using a Gurobi exact solver and K-nearest-neighbor sparse graphs.</p><h3>NBA scheduling</h3><p>Explored scheduling as a constrained optimization problem and used irreducible inconsistent subsystem (IIS) analysis to diagnose infeasibility.</p><h3>The takeaway</h3><p>A useful optimization model needs more than an objective: its constraints must express the real problem, and infeasibility is something to diagnose.</p>'},
  {category:'PUBLISHED STUDY · STATISTICS',title:'Economic Variables & Fertility',summary:'A regression study examining fertility patterns across 181 countries.',subtitle:'Co-authored · May 2022 · ISBN 978-93-91248-57-4',body:'<h3>The study</h3><p>Analyzed World Bank data across 181 countries using multiple linear regression in R, examining relationships between fertility and variables including life expectancy, education, and health expenditure.</p><h3>Statistical foundation</h3><p>Checked heteroscedasticity, multicollinearity, and autocorrelation assumptions to assess the model. The project strengthened my foundation in econometrics and interpreting relationships in observational data.</p>'}
];
const experience = [
  {category:'JAN – MAY 2026 · NEW YORK',title:'OpenSesame',summary:'Data Science Apprentice, Growth',subtitle:'Conversion modeling & account segmentation',body:'<ul><li>Achieved 2× higher conversion among flagged leads by benchmarking XGBoost against L1-regularized logistic regression.</li><li>Used SHAP to identify conversion drivers and segmentation to surface high-value accounts.</li><li>Informed channel routing and marketing budget allocation through win rate and deal value.</li></ul>'},
  {category:'JAN – MAY 2026 · NEW YORK',title:'Zoetis',summary:'Process Improvement Consultant',subtitle:'Process analysis & repair strategy',body:'<ul><li>Mapped process bottlenecks and modeled in-house, OEM, and third-party repair alternatives.</li><li>Recommended an optimal repair strategy using turnaround time and cost as decision criteria.</li></ul>'},
  {category:'DEC 2024 – JUN 2025 · GURUGRAM',title:'Spinny',summary:'Business Analyst, Auctions',subtitle:'Marketplace pricing, fraud detection & dealer growth',body:'<ul><li>Built an auction bidding model around price elasticity, bid distributions, and demand–supply gaps. Threshold optimization experiments delivered a 45% margin increase and reduced inventory turnaround by 17 hours.</li><li>Trained a fraud detection model on device and geolocation signals across 11K+ records, reducing margin leakage from 8% to 5%.</li><li>Designed a cohort-based campaign that reactivated 1,000+ dormant dealers and drove 20% month-over-month revenue growth.</li></ul>'},
  {category:'SEP 2022 – MAY 2024 · GURUGRAM',title:'DecisionTree Analytics',summary:'Data Analyst',subtitle:'US FMCG client · Customer lifecycle & reporting',body:'<ul><li>Built customer lifecycle segments spanning activation, retention, churn risk, and cross-sell to guide commercial strategy.</li><li>Optimized SQL pipelines through indexing and partitioning, reducing query runtime from 45 to 20 minutes.</li><li>Automated reporting to save cross-functional teams 5–7 hours per week.</li></ul>'}
];
const dialog = document.querySelector('#detail-dialog');
let currentItems = [], currentIndex = 0;
function showDetail(items,index){
  currentItems=items;currentIndex=(index+items.length)%items.length;
  const item=items[currentIndex];
  document.querySelector('#detail-category').textContent=item.category;
  document.querySelector('#detail-title').textContent=item.title;
  document.querySelector('#detail-subtitle').textContent=item.subtitle;
  document.querySelector('#detail-body').innerHTML=item.body;
  document.querySelector('#detail-count').textContent=`${currentIndex+1} / ${items.length}`;
  if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');}
  dialog.scrollTop=0;
}
function renderTiles(items,id){
  const grid=document.getElementById(id);
  items.forEach((item,index)=>{
    const button=document.createElement('button');button.className='tile';
    button.setAttribute('aria-haspopup','dialog');
    if(id==='experience-grid'){
      const initials=['OS','Z','S','DT'][index];
      button.innerHTML=`<span class="company-mark" aria-hidden="true">${initials}</span><span class="experience-info"><h3>${item.summary}</h3><p>${item.title}</p></span><span class="experience-date">${item.category}<span class="view">View details ↗</span></span>`;
    }else{
      const labels=['Growth analytics','Integer programming','Product strategy','LLMs & embeddings','Operations research','Statistical research'];
      const facts=['2× conversion','NYC childcare','Book Club Matcher','CRM reconciliation','220-node TSP','181 countries'];
      button.innerHTML=`<span class="card-media"><span class="tag">${labels[index]}</span><span class="card-fact">${facts[index]}</span></span><span class="card-body"><span class="eyebrow">${item.category}</span><h3>${item.title}</h3><p>${item.summary}</p><span class="view">View project ↗</span></span>`;
    }
    button.addEventListener('click',()=>showDetail(items,index));grid.append(button);
  });
}
renderTiles(projects,'project-grid');renderTiles(experience,'experience-grid');
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#previous-detail').addEventListener('click',()=>showDetail(currentItems,currentIndex-1));
document.querySelector('#next-detail').addEventListener('click',()=>showDetail(currentItems,currentIndex+1));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')showDetail(currentItems,currentIndex-1);if(event.key==='ArrowRight')showDetail(currentItems,currentIndex+1);});
const toggle=document.querySelector('.menu-toggle'),links=document.querySelector('#nav-links');
toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!expanded));links.classList.toggle('open',!expanded);});
links.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');links.classList.remove('open');}));
const navbar=document.querySelector('.navbar');
function updateNav(){navbar.classList.toggle('scrolled',window.scrollY>40);}
window.addEventListener('scroll',updateNav,{passive:true});updateNav();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.querySelectorAll('a').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px'});
document.querySelectorAll('header[id],main section[id],footer[id]').forEach(section=>observer.observe(section));

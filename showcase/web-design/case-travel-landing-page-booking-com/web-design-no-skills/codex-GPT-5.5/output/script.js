const dataSets = {
  trip: {
    'Festivals & Events': [['Pasadena','6 mi away'],['Los Angeles','12 mi away'],['Long Beach','26 mi away'],['Palm Springs','89 mi away'],['Santa Barbara','97 mi away'],['San Francisco','351 mi away']],
    'Theme Parks': [['Anaheim','24 mi away'],['Buena Park','20 mi away'],['Orlando','2,190 mi away'],['San Diego','120 mi away'],['Valencia','39 mi away'],['Carlsbad','89 mi away']],
    'Beaches & Relaxation': [['Malibu','34 mi away'],['Laguna Beach','54 mi away'],['Santa Monica','16 mi away'],['Santa Barbara','97 mi away'],['San Diego','120 mi away'],['Monterey','321 mi away']],
    'Cultural Trips': [['Los Angeles','12 mi away'],['Pasadena','6 mi away'],['Santa Fe','790 mi away'],['San Francisco','351 mi away'],['New Orleans','1,890 mi away'],['Chicago','2,015 mi away']],
    'Food & Cooking': [['Los Angeles','12 mi away'],['San Diego','120 mi away'],['San Francisco','351 mi away'],['Portland','963 mi away'],['Austin','1,375 mi away'],['New York','2,789 mi away']],
    'City Exploration': [['New York','2,789 mi away'],['Chicago','2,015 mi away'],['Seattle','1,135 mi away'],['Boston','2,980 mi away'],['Las Vegas','228 mi away'],['Denver','1,016 mi away']],
    'Wine Tastings': [['Santa Barbara','97 mi away'],['Paso Robles','213 mi away'],['Napa','394 mi away'],['Sonoma','405 mi away'],['Temecula','84 mi away'],['Healdsburg','420 mi away']],
    'Outdoor Adventures': [['Palm Springs','89 mi away'],['Lake Tahoe','443 mi away'],['Moab','720 mi away'],['Sedona','473 mi away'],['Yosemite','311 mi away'],['Mammoth Lakes','310 mi away']],
    'Nature Adventures': [['Joshua Tree','130 mi away'],['Big Sur','295 mi away'],['Zion National Park','430 mi away'],['Grand Canyon','490 mi away'],['Sequoia','220 mi away'],['Lake Tahoe','443 mi away']],
    'Historical Tours': [['San Diego','120 mi away'],['Santa Barbara','97 mi away'],['Boston','2,980 mi away'],['Philadelphia','2,710 mi away'],['Washington, D.C.','2,650 mi away'],['Savannah','2,300 mi away']]
  },
  popular: {
    'Domestic cities': ['Las Vegas hotels','New York hotels','Los Angeles hotels','Orlando hotels','San Diego hotels','San Francisco hotels','Fort Lauderdale hotels','Miami hotels','Chicago hotels','Houston hotels'],
    'International cities': ['Malé hotels','Tokyo hotels','Bangkok hotels','Amsterdam hotels','Paris hotels','Barcelona hotels','Rome hotels','Tulum hotels'],
    'Regions': ['Kyoto','Santorini','Oahu','Yosemite National Park','Lake Tahoe','Caribbean Islands','Florida Keys'],
    'Countries': ['United States','Japan','Italy','Mexico','Canada','United Kingdom','Spain','France','Thailand'],
    'Places to stay': ['Cheap hotels','Pet-Friendly Hotels','Resorts','Hostels','Beach Hotels','5-Star Hotels','Boutique Hotels','Luxury Hotels']
  },
  carDest: {
    'Cities in the US': [['New York','235 car rental locations','$69.73 per day'],['Atlanta','74 car rental locations','$39.76 per day'],['San Francisco','124 car rental locations','$58.18 per day'],['Las Vegas','136 car rental locations','$50.45 per day'],['Los Angeles','220 car rental locations','$57.09 per day'],['Miami','105 car rental locations','$68.77 per day'],['Orlando','206 car rental locations','$58.41 per day'],['Houston','140 car rental locations','$34.03 per day'],['Chicago','86 car rental locations','$57.22 per day'],['San Diego','86 car rental locations','$49.68 per day']],
    'Airports in the US': [['LAX Airport','68 rental desks','$57.09 per day'],['JFK Airport','41 rental desks','$69.73 per day'],['MIA Airport','44 rental desks','$68.77 per day'],['ORD Airport','38 rental desks','$57.22 per day']],
    'Regions': [['California','860 rental locations','$55.40 per day'],['Florida','720 rental locations','$61.20 per day'],['Nevada','210 rental locations','$48.90 per day'],['Texas','510 rental locations','$39.80 per day']],
    'Cities worldwide': [['London','310 car rental locations','$47.60 per day'],['Paris','280 car rental locations','$52.10 per day'],['Tokyo','198 car rental locations','$63.40 per day'],['Rome','142 car rental locations','$44.90 per day']],
    'Airports worldwide': [['Heathrow Airport','76 rental desks','$48.30 per day'],['Charles de Gaulle','63 rental desks','$51.20 per day'],['Narita Airport','54 rental desks','$62.80 per day'],['Fiumicino Airport','49 rental desks','$45.30 per day']]
  },
  regions: {
    'Europe': [['London','3943 things to do'],['Istanbul','2602 things to do'],['Paris','3898 things to do'],['Hamburg','369 things to do'],['Amsterdam','2092 things to do'],['Lisbon','3727 things to do'],['Rome','6726 things to do'],['Athens','3415 things to do'],['Berlin','865 things to do'],['Barcelona','2565 things to do'],['Venice','1785 things to do'],['Málaga','812 things to do']],
    'North America': [['New York','2201 things to do'],['Las Vegas','1063 things to do'],['San Diego','472 things to do'],['Miami','928 things to do'],['New Orleans','611 things to do'],['Vancouver','514 things to do']],
    'Asia': [['Tokyo','2840 things to do'],['Bangkok','1975 things to do'],['Singapore','1054 things to do'],['Kyoto','880 things to do'],['Seoul','1420 things to do'],['Bali','2210 things to do']],
    'Africa': [['Cape Town','934 things to do'],['Marrakesh','1102 things to do'],['Cairo','862 things to do'],['Nairobi','390 things to do']],
    'Oceania': [['Sydney','1180 things to do'],['Melbourne','840 things to do'],['Auckland','530 things to do'],['Queenstown','402 things to do']],
    'Middle East': [['Dubai','1920 things to do'],['Abu Dhabi','640 things to do'],['Doha','285 things to do'],['Jerusalem','510 things to do']],
    'Caribbean': [['Punta Cana','537 things to do'],['San Juan','420 things to do'],['Aruba','260 things to do'],['Nassau','310 things to do']],
    'South America': [['Rio de Janeiro','970 things to do'],['Buenos Aires','840 things to do'],['Lima','780 things to do'],['Santiago','510 things to do']],
    'Central America': [['Cancun','697 things to do'],['San José','240 things to do'],['Panama City','360 things to do'],['Antigua Guatemala','290 things to do']]
  },
  things: {
    'Tours': ['Cultural tours New York','Walking tours New York','Bus tours New York','Boat tours New York','Bike tours New York','Bus tours Las Vegas','Adventure tours Las Vegas','Boat tours Miami'],
    'City tours': ['Hollywood city tours','New York skyline tours','Chicago architecture tours','San Francisco bay tours','Miami city tours','New Orleans history tours'],
    'Museums': ['Art museums New York','History museums New York','Science museums New York','Art galleries New York','Museum tickets Las Vegas','Art museums Los Angeles'],
    'Entertainment and tickets': ['Broadway tickets','Comedy shows Las Vegas','Theme park tickets Orlando','Concert experiences','Movie studio tickets'],
    'Activities and games': ['Escape rooms','Scavenger hunts','Cooking classes','Photography walks','Family games'],
    'Travel and transportation services': ['Airport transfers','Rail passes','Private drivers','Hop-on hop-off buses','Ferry tickets'],
    'Food and drinks': ['Food tours New York','Wine tastings Napa','Craft beer walks','Cooking classes Rome','Market tours Paris'],
    'Outdoor activities': ['Hiking tours','Bike rentals','Kayaking trips','Desert adventures','National park day trips'],
    'Water and amusement parks': ['Universal Studios Hollywood','Water park tickets','Theme parks Anaheim','Family amusement passes'],
    'Nightlife': ['Rooftop bars','Jazz clubs New Orleans','Las Vegas nightlife','Pub crawls London','Dinner cruises']
  }
};
function setActive(button){button.parentElement.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));button.classList.add('active')}
function renderCardGrid(target, rows, type='dest'){
  const el=document.querySelector(target); if(!el) return;
  el.innerHTML=rows.map(r=> type==='links'
    ? `<a href="#">${r}</a>`
    : `<div class="destination-card"><div><strong>${r[0]}</strong><span>${r[1]||''}</span>${r[2]?`<div class="mini-stat">${r[2]}</div>`:''}</div><div class="arrow-circle">›</div></div>`).join('');
}
document.addEventListener('click', e=>{
  const btn=e.target.closest('[data-tab]');
  if(btn){
    setActive(btn);
    const group=btn.dataset.group, tab=btn.dataset.tab;
    if(group==='trip') renderCardGrid('#trip-grid', dataSets.trip[tab]);
    if(group==='popular') renderCardGrid('#popular-grid', dataSets.popular[tab], 'links');
    if(group==='carDest') renderCardGrid('#car-dest-grid', dataSets.carDest[tab]);
    if(group==='regions') renderCardGrid('#region-grid', dataSets.regions[tab]);
    if(group==='things') renderCardGrid('#things-grid', dataSets.things[tab], 'links');
  }
  const faq=e.target.closest('.faq-q');
  if(faq){
    const item=faq.parentElement;
    document.querySelectorAll('.faq-item').forEach(i=>{ if(i!==item) i.classList.remove('open') });
    item.classList.toggle('open');
  }
  const car=e.target.closest('[data-scroll]');
  if(car){
    const scroller=document.querySelector(car.dataset.scroll);
    scroller?.scrollBy({left: car.dataset.dir==='next'? 320:-320, behavior:'smooth'});
  }
});
document.addEventListener('change', e=>{
  if(e.target.name==='packageType'){
    const note=document.querySelector('#package-note');
    if(note) note.textContent=`Search fields updated for ${e.target.value}.`;
  }
});
document.addEventListener('submit', e=>{
  if(e.target.matches('.search-form')){
    e.preventDefault();
    const alert=e.target.querySelector('.alert');
    if(alert){ alert.style.display='block'; alert.textContent='Great choice — showing trusted StayQuest results for your search.'; }
  }
});
document.addEventListener('DOMContentLoaded',()=>{
  renderCardGrid('#trip-grid', dataSets.trip['Festivals & Events']);
  renderCardGrid('#popular-grid', dataSets.popular['Domestic cities'], 'links');
  renderCardGrid('#car-dest-grid', dataSets.carDest['Cities in the US']);
  renderCardGrid('#region-grid', dataSets.regions['Europe']);
  renderCardGrid('#things-grid', dataSets.things['Tours'], 'links');
});

function orchardHeader(active){
  var a = function(href, label, key){
    var cls = (active === key) ? 'active' : '';
    return '<a class="'+cls+'" href="'+href+'">'+label+'</a>';
  };
  return (
    '<div class="topbar">'
    +'<div class="container">'
    +  '<div class="nav">'
    +    '<div class="brand"><span class="logo" aria-hidden="true"></span><span>Orchard</span></div>'
    +    '<div class="navlinks" aria-label="Primary">'
    +      a('index.html','Home','home')
    +      a('store.html','Store','store')
    +      a('shop-laptops.html','Laptops','laptops')
    +      a('shop-tablets.html','Tablets','tablets')
    +    '</div>'
    +  '</div>'
    +'</div>'
    +'</div>'
  );
}

function orchardFooter(){
  var groups = [
    { title:'Shop and Learn', links:['Store','Laptop','Tablet','Phone','Smartwatch','Headphones','Streaming Box','Smart Speaker','Tracker','Accessories','Gift Cards']},
    { title:'Orchard Wallet', links:['Wallet','Orchard Card','Orchard Pay','Orchard Cash']},
    { title:'Account', links:['Manage Your Account','Orchard Store Account','Cloud Account']},
    { title:'Entertainment', links:['Orchard One','Orchard TV','Orchard Music','Orchard Arcade','Orchard Fitness+','Orchard News+','Orchard Podcasts']},
    { title:'Orchard Store', links:['Find a Store','Genius Bar','Today at Orchard','Certified Refurbished','Orchard Trade In','Financing','Order Status','Shopping Help']},
    { title:'For Business', links:['Orchard and Business','Shop for Business']},
    { title:'For Education', links:['Orchard and Education','Shop for Education']},
  ];

  function linkToHref(label){
    // Basic internal mapping for key nav entries
    if(label === 'Store') return 'store.html';
    if(label === 'Laptop') return 'shop-laptops.html';
    if(label === 'Tablet') return 'shop-tablets.html';
    return '#';
  }

  function col(g){
    var items = g.links.map(function(l){
      return '<a href="'+linkToHref(l)+'">'+l+'</a>';
    }).join('');
    return '<div class="footer-col"><h5>'+g.title+'</h5>'+items+'</div>';
  }

  function accItem(g){
    var items = g.links.map(function(l){
      return '<a href="'+linkToHref(l)+'">'+l+'</a>';
    }).join('');
    return (
      '<div class="accordion-item">'
      + '<button class="accordion-btn" type="button">'
      +   '<span>'+g.title+'</span>'
      +   '<span aria-hidden="true">+</span>'
      + '</button>'
      + '<div class="accordion-panel">'+items+'</div>'
      +'</div>'
    );
  }

  return (
    '<footer class="footer">'
    +'<div class="container">'
    +  '<div class="footer-inner">'
    +    '<div class="footer-grid">'+groups.map(col).join('')+'</div>'
    +    '<div class="footer-accordion" data-footer-accordion>'+groups.map(accItem).join('')+'</div>'
    +    '<div class="legal">'
    +      'Financing available to qualified customers and requires acceptance of installment terms; 0% APR options subject to credit approval. Trade-in values vary by condition and eligibility. Entertainment services may require a subscription and are subject to availability.'
    +    '</div>'
    +  '</div>'
    +'</div>'
    +'</footer>'
  );
}

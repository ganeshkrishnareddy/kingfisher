(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const smooth = n => { n = clamp(n); return n * n * (3 - 2 * n); };
  const lerp = (a, b, t) => a + (b - a) * t;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = motionQuery.matches;
  const products = [
    {id:'strong',name:'Strong',type:'Strong premium beer',group:'strong',tone:'#c8102e',file:'strong.jpg',size:[900,900],box:[330,8,240,883],path:'M410 10 Q448 3 483 14 Q493 18 490 51 L500 80 L514 260 Q520 304 551 368 Q562 390 562 430 L564 829 Q563 876 536 882 Q450 899 365 880 Q343 872 342 827 L339 427 Q335 398 347 366 Q378 297 383 259 L400 72 Q392 46 403 20 Z',description:'The familiar red-label classic. Kingfisher Strong brings a full-bodied character, crisp finish and distinct aftertaste to the family.',style:'Strong lager',character:'Full-bodied & crisp'},
    {id:'premium',name:'Premium',type:'Premium lager beer',group:'lager',tone:'#b29144',file:'premium.png',size:[1000,1406],box:[315,150,350,1165],description:'The classic Kingfisher lager. Golden in colour, with gentle malt notes and a balanced, refreshing bitterness.',style:'Premium lager',character:'Balanced & refreshing'},
    {id:'ultra',name:'Ultra',type:'Premium lager',group:'lager',tone:'#d6ba69',file:'ultra.png',size:[600,600],box:[229,55,142,506],description:'A smooth, light-bodied premium lager. Kingfisher Ultra combines a clean character with a dry finish.',style:'Premium lager',character:'Smooth & light-bodied'},
    {id:'max',name:'Ultra Max',type:'Premium strong beer',group:'strong',tone:'#a68a40',file:'max.webp',size:[1999,2999],box:[627,124,745,2751],description:'The strong expression of the Ultra family, with its distinctive black-and-gold identity. A premium strong beer with an unmistakable Kingfisher character.',style:'Premium strong lager',character:'Bold & premium'},
    {id:'witbier',name:'Ultra Witbier',type:'Belgian-style wheat beer',group:'wheat',tone:'#dfbc80',file:'witbier.webp',size:[2188,3283],box:[656,0,874,3283],description:'Kingfisher’s Belgian-style wheat beer. A different side of the family, with a softer wheat-beer profile and a classic white-beer identity.',style:'Belgian-style wheat',character:'Soft & distinctive'},
    {id:'storm',name:'Storm',type:'Premium strong beer',group:'strong',tone:'#456aa0',file:'storm.jpg',size:[900,1200],box:[290,30,305,1120],path:'M393 42 Q431 27 474 43 Q487 49 486 66 L482 83 Q494 112 477 143 L517 370 Q524 407 564 478 Q580 498 579 538 L583 1056 Q580 1117 565 1130 Q438 1156 319 1132 Q300 1106 301 1050 L299 537 Q295 506 305 480 Q338 419 349 380 L386 144 Q371 124 382 88 L380 64 Z',description:'The Kingfisher strong beer in a distinctive electric-blue bottle. Storm brings another bold expression to the range.',style:'Premium strong lager',character:'Bold & distinctive'},
    {id:'blue',name:'Blue',type:'Premium beer',group:'strong',tone:'#00879b',file:'blue.jpg',size:[550,1500],box:[88,29,374,1400],path:'M211 39 Q270 20 338 36 Q363 39 360 74 L350 88 Q356 103 351 137 L385 456 Q390 506 420 563 Q451 614 453 660 L457 1295 Q453 1363 423 1388 Q394 1417 273 1420 Q157 1413 119 1380 Q93 1359 94 1295 L95 668 Q94 620 118 571 Q151 512 165 451 L196 141 Q205 105 199 83 Q188 75 200 48 Z',description:'An unmistakable blue identity within the Kingfisher family. Explore the regional range and check your local pack for product information.',style:'Premium beer',character:'Distinctive blue identity'},
    {id:'mango',name:'Mango Berry Twist',type:'Flavoured beer',group:'flavour',tone:'#e8b91f',file:'mango.png',size:[934,1625],box:[303,348,335,1230],description:'An Indian-inspired flavour expression, combining a mango-and-berry identity with the familiar Kingfisher bird. Part of the Street Flavours range.',style:'Flavoured beer',character:'Mango & berry'},
    {id:'lemon',name:'Lemon Masala',type:'Flavoured beer',group:'flavour',tone:'#79912b',file:'lemon.png',size:[934,1625],box:[305,346,336,1230],description:'A lemon-and-masala expression in the Kingfisher Street Flavours family. A familiar Indian flavour pairing, reimagined as a flavoured beer.',style:'Flavoured beer',character:'Lemon & masala'}
  ];
  let svgIndex = 0;
  function bottle(p, label = '') {
    const id = `bottle-clip-${++svgIndex}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${p.box.join(' ')}" width="${p.box[2]}" height="${p.box[3]}" role="img" aria-label="${label || `Kingfisher ${p.name} bottle`}">${p.path ? `<defs><clipPath id="${id}"><path d="${p.path}"/></clipPath></defs>` : ''}<image href="assets/${p.file}" width="${p.size[0]}" height="${p.size[1]}" ${p.path ? `clip-path="url(#${id})"` : ''}/></svg>`;
  }
  $('#hero-bottle').innerHTML = bottle(products[0]);
  $('#product-grid').innerHTML = products.map(p => `<button class="product" data-product="${p.id}" data-group="${p.group}" style="--product-color:${p.tone}" aria-label="Explore Kingfisher ${p.name}"><span class="product-visual">${bottle(p)}</span><span class="product-name">${p.name}</span><span class="product-type">${p.type}</span><span class="product-arrow" aria-hidden="true">↗</span></button>`).join('');
  $('#flavour-art').innerHTML = bottle(products[8]) + bottle(products[7]);

  // The artwork remains intact; SVG viewBoxes and clipping paths only control page presentation.
  const modal = $('#detail-dialog');
  const modalContent = $('#dialog-content');
  let lastFocus = null;
  function openDialog(content) {
    closeMenu();
    lastFocus = document.activeElement;
    modalContent.innerHTML = content;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
    $('.dialog-close').focus();
  }
  function closeDialog() { modal.close(); }
  $('.dialog-close').addEventListener('click', closeDialog);
  modal.addEventListener('close', () => { document.body.style.overflow = ''; lastFocus?.focus({preventScroll:true}); });
  modal.addEventListener('click', e => { if (e.target === modal) { const r = modal.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDialog(); } });
  function showProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    openDialog(`<div class="detail-layout"><div class="detail-art">${bottle(p)}</div><div class="detail-copy"><span class="eyebrow">THE KINGFISHER FAMILY</span><h2 class="display">${p.name}.</h2><p>${p.description}</p><div class="detail-meta"><div><small>STYLE</small><strong>${p.style}</strong></div><div><small>CHARACTER</small><strong>${p.character}</strong></div></div><p class="detail-fine">Availability, pack design and alcohol content vary by region. Check the local product label. This is a brand showcase; products cannot be purchased here.</p><button class="button dark" data-back-range>Back to the family <span>↗</span></button></div></div>`);
    $('[data-back-range]', modal).addEventListener('click', closeDialog);
  }
  $$('.product').forEach(el => el.addEventListener('click', () => showProduct(el.dataset.product)));
  function filterProducts(group) {
    $$('.filters button').forEach(b => { const active = b.dataset.filter === group; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    $$('.product').forEach(el => { el.hidden = group !== 'all' && el.dataset.group !== group; });
    metricsDirty = true;
    requestTick();
  }
  $$('.filters button').forEach(b => b.addEventListener('click', () => filterProducts(b.dataset.filter)));
  $('[data-show-flavours]').addEventListener('click', () => { filterProducts('flavour'); $('#range').scrollIntoView({behavior:reducedMotion?'instant':'smooth'}); });

  const menu = $('#menu'), menuButton = $('.menu-toggle');
  function closeMenu() {
    document.body.classList.remove('menu-open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open navigation'); menu.inert = true;
  }
  menuButton.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open?'Close navigation':'Open navigation'); menu.inert = !open;
    if (open) $('a',menu).focus({preventScroll:true});
  });
  $$('a',menu).forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {closeMenu(); menuButton.focus();} });
  $$('[data-open-story]').forEach(b => b.addEventListener('click', () => openDialog(`<article class="dialog-text"><span class="script">The story behind the bird.</span><h2 class="display">AN INDIAN ICON.<br>A FAMILIAR SPIRIT.</h2><p>Kingfisher’s brewing heritage can be traced to 1857. The brand is part of United Breweries, and its familiar bird has become a recognisable part of the Indian beer landscape.</p><h3>ONE FAMILY. MANY EXPRESSIONS.</h3><p>The portfolio includes Premium, Strong, Ultra, Ultra Max, Ultra Witbier, Storm and Blue. Lemon Masala and Mango Berry Twist bring Indian-inspired flavours to a newer chapter.</p><h3>A PLACE AT THE TABLE.</h3><p>This concept celebrates the familiar things: food with character, conversations that wander, and the distinctly Indian spirit behind the brand.</p><a href="https://www.unitedbreweries.com/" target="_blank" rel="noopener">Explore United Breweries ↗</a></article>`)));
  const pairings = [
    {name:'Tandoori',beer:'Premium or Strong',text:'Smoky tandoori paneer or chicken brings plenty of char and spice. Try the balanced character of Premium, or the fuller-bodied Strong.'},
    {name:'Chaat',beer:'Ultra or Lemon Masala',text:'Tangy chutneys, crispy textures and bright citrus: try a smooth lager like Ultra, or explore the Indian-inspired Lemon Masala.'},
    {name:'Coastal',beer:'Premium or Ultra Witbier',text:'Coconut, curry leaves and coastal flavours invite a clean lager or a softer wheat-beer profile. Try Premium or Ultra Witbier.'},
    {name:'Grilled',beer:'Ultra Max or Storm',text:'Rich grilled dishes and boldly spiced vegetables call for plenty of character. Explore the premium strong styles of Ultra Max and Storm.'}
  ];
  $('#pairings-button').addEventListener('click', () => {
    openDialog(`<div class="dialog-text"><span class="script">Something for the table.</span><h2 class="display">FIND YOUR<br>GOOD COMPANY.</h2><p>Choose a flavour you enjoy. These are editorial pairing ideas to explore.</p><div class="pairing-options" role="group" aria-label="Choose a food pairing">${pairings.map((p,i)=>`<button data-pair="${i}" aria-pressed="${i===0}" class="${i===0?'active':''}">${p.name}</button>`).join('')}</div><div class="pairing-result" aria-live="polite"></div><p class="detail-fine" style="margin-top:20px">For adults of legal drinking age. Enjoy responsibly.</p></div>`);
    const update = i => { const p=pairings[i]; $('.pairing-result',modal).innerHTML=`<h3>${p.beer}</h3><p>${p.text}</p>`; $$('[data-pair]',modal).forEach(b=>{b.classList.toggle('active',Number(b.dataset.pair)===i);b.setAttribute('aria-pressed',String(Number(b.dataset.pair)===i));}); };
    $$('[data-pair]',modal).forEach(b=>b.addEventListener('click',()=>update(Number(b.dataset.pair)))); update(0);
  });
  $('#sources-button').addEventListener('click', () => openDialog(`<article class="dialog-text"><span class="eyebrow">CREDITS & PRODUCT INFORMATION</span><h2 class="display">BEHIND<br>THE CONCEPT.</h2><p>An independent website design concept, adapted from the supplied motion reference. This is not the official Kingfisher website. It does not sell alcohol.</p><div class="credit-list"><p><a href="https://www.unitedbreweries.com/our-brands" target="_blank" rel="noopener">United Breweries</a> — India product portfolio; Lemon Masala and Mango Berry Twist pack artwork.</p><p><a href="https://kingfisherdrinks.com/brands/kingfisher/" target="_blank" rel="noopener">Kingfisher Drinks</a> — brand mark, Premium and Ultra artwork, brewing heritage and tasting information. Pack appearance and specifications may differ by market.</p><p><a href="https://sipdirect.com/products/kingfisher-ultra-max-premium-strong-beer" target="_blank" rel="noopener">SipDirect</a> — Ultra Max and Ultra Witbier pack photography.</p><p><a href="https://www.tallidrinks.com/strong-beer" target="_blank" rel="noopener">Talli Drinks</a> — Strong and Storm pack photography.</p><p><a href="https://www.behance.net/gallery/943148/Packaging" target="_blank" rel="noopener">Ashwin KN / Behance</a> — archival Blue packaging artwork.</p><p><a href="https://www.hotpepper.jp/strJ001273019/" target="_blank" rel="noopener">Curry India Tabla / Hot Pepper Gourmet</a> — food photograph. <a href="https://www.365drinks.co.uk/collections/pints" target="_blank" rel="noopener">365 Drinks</a> — Kingfisher glass photograph.</p><p>Fonts: Anton, Barlow Condensed and DM Sans, distributed through Google Fonts.</p></div><p class="detail-fine">All trademarks and product imagery remain the property of their respective owners. No prices, live availability or universal alcohol percentages are asserted. Blue artwork is archival. Check your local pack for current information.</p></article>`));

  // One scroll coordinator handles the bottle, its move into the lineup, and rail progress.
  const heroBottle = $('#hero-bottle'), header = $('.header'), railProgress = $('.rail-progress span');
  const range = $('#range'), details = $('#beer'), story = $('#story'), notes = $('.notes');
  const scenes = $$('.scene[data-page]');
  let metricsDirty = true, metrics = {}, ticking = false;
  function readMetrics() {
    const y = window.scrollY;
    const mobile = window.innerWidth <= 700;
    metrics = {
      h:window.innerHeight,w:window.innerWidth,mobile,rail:mobile?38:54,
      details:details.getBoundingClientRect().top+y,story:story.getBoundingClientRect().top+y,
      notes:notes.getBoundingClientRect().top+y,range:range.getBoundingClientRect().top+y,
      bottleH:heroBottle.offsetHeight,
      sectionPositions:scenes.map(s=>({top:s.getBoundingClientRect().top+y,page:s.dataset.page})),
      maxScroll:Math.max(1,document.documentElement.scrollHeight-window.innerHeight)
    };
    metricsDirty=false;
  }
  function render() {
    ticking=false;
    if(metricsDirty)readMetrics();
    const m=metrics,y=window.scrollY;
    const first=smooth(y/(m.details*.75));
    let x=0,dy=0,scale=1,rotation=lerp(14,0,first);
    if(m.mobile){
      const inStory=smooth((y-m.story+m.h*.25)/(m.h*.75));
      const inNotes=smooth((y-m.notes+m.h*.3)/(m.h*.7));
      x=lerp((m.w-m.rail)*.235,-(m.w-m.rail)*.20,inStory)*first;
      x=lerp(x,0,inNotes);
      dy=lerp(-m.h*.12,0,inStory)*first;
      scale=lerp(1,.77,first);
      rotation=lerp(rotation,lerp(-3,5,inNotes),inStory);
    }
    const entry=smooth((y-m.range+m.h*.7)/(m.h*.65));
    let opacity=1;
    const destination=$('[data-product="strong"] .product-visual');
    const targetProduct=$('[data-product="strong"]');
    if(entry>0){
      if(!targetProduct.hidden){
        const r=destination.getBoundingClientRect();
        const centerX=m.rail+(m.w-m.rail)/2;
        const centerY=m.h*(m.mobile?.46:.5);
        x=lerp(x,r.left+r.width/2-centerX,entry);
        dy=lerp(dy,r.top+r.height/2-centerY,entry);
        scale=lerp(scale,r.height/m.bottleH,entry);
        rotation=lerp(rotation,0,entry);
      }
      opacity=1-smooth((entry-.88)/.12);
    }
    if(y>m.range+m.h)opacity=0;
    heroBottle.style.transform=`translate3d(${x.toFixed(2)}px,${dy.toFixed(2)}px,0) rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    heroBottle.style.opacity=String(opacity);
    destination.style.opacity=entry>0&&entry<.99?String(1-opacity):'1';
    header.classList.toggle('scrolled',y>60);
    railProgress.style.transform=`scaleY(${clamp(y/m.maxScroll)})`;
    let page='01';for(const s of m.sectionPositions){if(y+m.h*.4>=s.top)page=s.page;}
    $('.page-number').textContent=page;
  }
  function requestTick(){if(!ticking){ticking=true;requestAnimationFrame(render);}}
  window.addEventListener('scroll',requestTick,{passive:true});
  window.addEventListener('resize',()=>{metricsDirty=true;requestTick();},{passive:true});
  window.addEventListener('load',()=>{metricsDirty=true;requestTick();});
  document.fonts.ready.then(()=>{metricsDirty=true;requestTick();});
  motionQuery.addEventListener('change',e=>{reducedMotion=e.matches;requestTick();});
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08,rootMargin:'0px 0px 25px 0px'});
    $$('.reveal').forEach(el=>observer.observe(el));
    document.documentElement.classList.add('js');
  }
  requestTick();
})();

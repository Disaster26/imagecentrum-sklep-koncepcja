(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  var rok=document.getElementById('rok');if(rok)rok.textContent=new Date().getFullYear();
  var S='https://profesja.imagecentrum.pl/';
  /* [id, nazwa, dzial, marka/kategoria, cena brutto, sciezka, grupy] - dane z obecnego sklepu, 18.11.2026 */
  var U=[
   ['1268','TULURAY - laser tulowy','Lasery i IPL',94900,'glowna/1268-tuluray-laser-tulowy'],
   ['1284','LightSpeed New Generation - laser diodowy','Lasery i IPL',84900,'laseryipl/1284-lightspeed-new-generation-laser-diodowy'],
   ['1259','DVPico Medical Laser New Generation - laser pikosekundowy','Lasery i IPL',129900,'laseryipl/1259-dvpico-medical-laser-new-generation-laser-pikosekundowy'],
   ['1207','HIFU 5D Exclusive','Aparatura',56900,'aparatura/1207-hifu-5d-exclusive'],
   ['1210','Magnetic Sculp - elektromagnetostymulacja','Aparatura',49900,'aparatura/1210-magnetic-sculp-elektromagnetostymulacja']
  ];
  var K=[
   ['1214','BCN Balance - prebiotic serum','Institute BCN · Prebiotyki',124,'prebiotyki/1214-bcn-balance-prebiotic-serum','bcn'],
   ['1126','BCN Peel 02 Anti-Ageing','Institute BCN · Peelingi chemiczne',242.65,'peelingi-chemiczne/1126-bcn-peel-02-anti-ageing','bcn'],
   ['1277','BCN Mimik Peptides','Institute BCN · Peptydy',110,'peptydy/1277-bcn-mimik-peptides','bcn ak'],
   ['194','Vitamin C 20% (10 ampułek)','Institute BCN · Ampułki',98.44,'ampulki/194-vitamin-c-20-1-op-10-szt-ampulek','bcn ak'],
   ['700','24k Gold Mask - maska z 24-karatowego złota','MedBeauty · 24k Gold Treatment',136.27,'24k-gold-treatment/700-24k-gold-mask-maska-z-24-karatowego-zlota','mb'],
   ['1096','Beauty Pearls Lifting z argireliną (25 szt.)','MedBeauty · Perły młodości',63,'perly-mlodosci/1096-beauty-pearls-lifting-with-argireline-perly-liftingujace-z-argirelina-25-szt','mb'],
   ['39','Algaplast Tomato Mask - maska algowa z pomidorem 190 g','MedBeauty · Maski algowe',26.74,'maski-algowe-owocowo-warzywne/39-algaplast-tomato-mask-maska-algowa-z-pomidorem-190g','mb'],
   ['1271','Hydreo Detox - kapsułki z efektem Bohra','Zestawy Hydreo',280,'glowna/1271-hydreo-detox-kapsulki-z-efektem-bohra','ak']
  ];
  function zl(v){var s=v.toFixed(v%1?2:0).replace('.',',');var p=s.split(',');p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,' ');return p.join(',')+' zł'}
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
  function karta(p,u){return '<article class="prod"><a href="'+S+p[4]+'.html" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;display:contents"><figure><img src="img/p_'+p[0]+'.webp" width="458" height="344" alt="'+esc(p[1])+'" loading="lazy"></figure></a><div class="op"><small>'+esc(p[2])+'</small><h3>'+esc(p[1])+'</h3><div class="cena"><b>'+zl(p[3])+'<em>brutto</em></b><button type="button" class="dk" data-n="'+esc(p[1])+'">'+(u?'Zapytaj':'Do koszyka')+'</button></div></div></article>'}
  document.getElementById('torU').innerHTML=U.map(function(p){return karta(p,1)}).join('');
  var siatka=document.getElementById('siatka'),zak=[].slice.call(document.querySelectorAll('#zak button'));
  function pokaz(z){siatka.innerHTML=K.filter(function(p){return !z||p[5].split(' ').indexOf(z)>-1}).map(function(p){return karta(p,0)}).join('');zak.forEach(function(b){b.setAttribute('aria-selected',b.dataset.z===z)})}
  pokaz('');
  zak.forEach(function(b){b.addEventListener('click',function(){pokaz(b.dataset.z)})});
  document.querySelectorAll('a[data-z]').forEach(function(a){a.addEventListener('click',function(){pokaz(a.dataset.z)})});
  document.querySelectorAll('.kmenu a').forEach(function(a){a.addEventListener('click',function(){zamknij()})});
  /* koszyk - demonstracja */
  var ile=0,ileEl=document.getElementById('ile'),toast=document.getElementById('toast'),tt;
  document.addEventListener('click',function(e){var b=e.target.closest('.dk');if(!b)return;
    if(b.textContent==='Zapytaj'){toast.innerHTML='Podgląd: w sklepie otworzy się formularz zapytania o <b>'+esc(b.dataset.n)+'</b>'}
    else{ile++;ileEl.textContent=ile;b.classList.add('ok');b.textContent='W koszyku';toast.innerHTML='Dodano do koszyka: <b>'+esc(b.dataset.n)+'</b>'}
    toast.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('on')},2600)});
  /* wyszukiwarka z podpowiedziami */
  var W=U.concat(K);
  function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l')}
  document.querySelectorAll('.szuk').forEach(function(l){var i=l.querySelector('input'),d=l.querySelector('.podp');
    i.addEventListener('input',function(){var q=norm(i.value.trim());if(q.length<2){d.classList.remove('on');return}
      var w=W.filter(function(p){return norm(p[1]+' '+p[2]).indexOf(q)>-1}).slice(0,6);
      d.innerHTML=w.length?w.map(function(p){return '<a href="'+S+p[4]+'.html" target="_blank" rel="noopener"><img src="img/p_'+p[0]+'.webp" alt="" width="56" height="42">'+esc(p[1])+'<em>'+zl(p[3])+'</em></a>'}).join(''):'<a href="#kontakt">Brak w podglądzie - w sklepie wyszuka wszystkie produkty</a>';d.classList.add('on')});
    i.addEventListener('blur',function(){setTimeout(function(){d.classList.remove('on')},200)})});
  /* tory: przeciaganie myszka + strzalki */
  document.querySelectorAll('[data-tor]').forEach(function(t){var x0,s0,dn=false,mv=false;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;mv=false;x0=e.clientX;s0=t.scrollLeft});
    addEventListener('pointermove',function(e){if(!dn)return;var dx=e.clientX-x0;if(Math.abs(dx)>5){mv=true;t.classList.add('drag')}t.scrollLeft=s0-dx});
    addEventListener('pointerup',function(){if(!dn)return;dn=false;t.classList.remove('drag')});
    t.addEventListener('click',function(e){if(mv){e.preventDefault();e.stopPropagation();mv=false}},true);
    t.addEventListener('dragstart',function(e){e.preventDefault()})});
  document.querySelectorAll('[data-nav]').forEach(function(n){var t=document.getElementById(n.dataset.nav);
    n.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){var c=t.firstElementChild;t.scrollBy({left:(+b.dataset.k)*(c?c.getBoundingClientRect().width+18:300),behavior:'smooth'})})})});
})();

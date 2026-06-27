/* ============================================================
   LineX — Logique de l'application (vanilla JS, sans dépendance)
   ============================================================ */
'use strict';

/* ---------------- État ---------------- */
const STORE = {
  get lang(){ return localStorage.getItem('linex_lang') || 'fr'; },
  set lang(v){ localStorage.setItem('linex_lang', v); },
  get cart(){ try{ return JSON.parse(localStorage.getItem('linex_cart')) || []; }catch(e){ return []; } },
  set cart(v){ localStorage.setItem('linex_cart', JSON.stringify(v)); },
  get users(){ try{ return JSON.parse(localStorage.getItem('linex_users')) || []; }catch(e){ return []; } },
  set users(v){ localStorage.setItem('linex_users', JSON.stringify(v)); },
  get user(){ try{ return JSON.parse(localStorage.getItem('linex_user')) || null; }catch(e){ return null; } },
  set user(v){ v ? localStorage.setItem('linex_user', JSON.stringify(v)) : localStorage.removeItem('linex_user'); },
};

/* ---------------- Helpers ---------------- */
function t(key){ const d = I18N[STORE.lang] || I18N.fr; return d[key] != null ? d[key] : (I18N.fr[key] || key); }
function tl(field){ return field[STORE.lang] || field.fr; } // champ multilingue {fr,en,es}
function fmt(n){
  const d = I18N[STORE.lang] || I18N.fr;
  try{ return new Intl.NumberFormat(d.locale, { style:'currency', currency:d.currency }).format(n); }
  catch(e){ return n.toFixed(2) + ' €'; }
}
function product(id){ return PRODUCTS.find(p => p.id === id); }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function el(html){ const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

function starsHtml(rating, reviews){
  const full = Math.round(rating);
  let s = '';
  for(let i=1;i<=5;i++) s += (i<=full ? '★' : '☆');
  const rev = reviews != null ? ` <span>(${reviews} ${t('product.reviews')})</span>` : '';
  return `<span class="stars"><span class="s">${s}</span> ${rating.toFixed(1)}${rev}</span>`;
}

/* ---------------- Cartes produit ---------------- */
function productCard(p){
  const price = salePrice(p.cost);
  const badge = p.badge ? `<span class="badge ${p.badge}">${t('badge.'+p.badge)}</span>` : '';
  return `
  <article class="card reveal" data-id="${p.id}">
    <div class="thumb" data-nav="product:${p.id}">
      ${p.image}
      ${badge}
      <button class="wish" aria-label="favori" data-wish="${p.id}">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
    </div>
    <div class="body">
      <span class="cat-tag">${t('cat.'+p.category)}</span>
      <h3 class="name" data-nav="product:${p.id}">${escapeHtml(tl(p.name))}</h3>
      ${starsHtml(p.rating, p.reviews)}
      <div class="price-row"><span class="price">${fmt(price)}</span></div>
      <div class="actions">
        <button class="add" data-add="${p.id}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          ${t('product.add')}
        </button>
      </div>
    </div>
  </article>`;
}

/* ---------------- Vues ---------------- */
const view = () => document.getElementById('view');

function renderHome(){
  const cats = CATEGORIES.map(c => `
    <div class="cat-card reveal" data-nav="category:${c.id}">
      <div class="art">${c.icon}</div>
      <h3>${t('cat.'+c.id)}</h3>
      <p>${t('cat.'+c.id+'.sub')}</p>
    </div>`).join('');

  const featured = PRODUCTS.filter(p => p.badge === 'best').concat(PRODUCTS.filter(p=>p.badge==='new')).slice(0,4);
  const featuredHtml = featured.map(productCard).join('');
  const allHtml = PRODUCTS.map(productCard).join('');

  const testimonials = TESTIMONIALS.map(r => `
    <div class="review-card reveal">
      <div class="s">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      <p>“${escapeHtml(tl(r.text))}”</p>
      <div class="who"><div class="av">${r.name[0]}</div><div><b>${escapeHtml(r.name)}</b></div></div>
    </div>`).join('');

  view().innerHTML = `
  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <div class="hero-text">
        <span class="hero-tag">🎣 ${t('hero.tag')}</span>
        <h1>${t('hero.title')}</h1>
        <p>${t('hero.sub')}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" data-nav="category:rods">${t('hero.cta')}</a>
          <a class="btn btn-ghost btn-lg" data-scroll="featured" style="cursor:pointer">${t('hero.cta2')}</a>
        </div>
        <div class="hero-stats">
          <div><b>4.8★</b><span>+12 000 ${t('product.reviews')}</span></div>
          <div><b>1-3 sem.</b><span>${t('trust.delivery.sub')}</span></div>
          <div><b>30j</b><span>${t('trust.return.sub')}</span></div>
        </div>
      </div>
      <div class="hero-art">
        <div class="hero-card">
          <div class="pgrid">
            ${PRODUCTS.filter(p=>p.badge).slice(0,4).map(p=>`
              <div class="hero-thumb" data-nav="product:${p.id}" style="cursor:pointer">
                ${p.image}<div class="n">${escapeHtml(tl(p.name).split(' ').slice(0,2).join(' '))}</div>
                <div class="p">${fmt(salePrice(p.cost))}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="wave"><svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,40 C240,80 480,0 720,30 C960,60 1200,20 1440,45 L1440,70 L0,70 Z" fill="#f6f9fb"/></svg></div>
  </section>

  <!-- CONFIANCE -->
  <section class="trust">
    <div class="container">
      ${[['delivery','M16 3H1v13h15M16 8h4l3 3v5h-7M5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'],
         ['secure','M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4'],
         ['return','M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.4 2.6L3 8 M3 3v5h5'],
         ['support','M21 11.5a8.4 8.4 0 0 1-9 8.5 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.2A8.5 8.5 0 1 1 21 11.5z']]
        .map(([k,path])=>`
        <div class="trust-item reveal">
          <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg></div>
          <div><b>${t('trust.'+k)}</b><span>${t('trust.'+k+'.sub')}</span></div>
        </div>`).join('')}
    </div>
  </section>

  <!-- CATEGORIES -->
  <section class="section">
    <div class="container">
      <div class="section-head"><span class="eyebrow">BJMordix</span><h2>${t('cats.title')}</h2></div>
      <div class="cat-grid">${cats}</div>
    </div>
  </section>

  <!-- BEST SELLERS -->
  <section class="section" id="featured" style="padding-top:0">
    <div class="container">
      <div class="section-head"><span class="eyebrow">★ Top</span><h2>${t('featured.title')}</h2><p>${t('featured.sub')}</p></div>
      <div class="prod-grid">${featuredHtml}</div>
    </div>
  </section>

  <!-- POURQUOI -->
  <section class="section" style="background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
    <div class="container">
      <div class="section-head"><h2>${t('why.title')}</h2></div>
      <div class="why-grid">
        ${[['1','M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
           ['2','M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
           ['3','M16 3H1v13h15M16 8h4l3 3v5h-7M5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z']]
          .map(([n,path])=>`
          <div class="why-card reveal">
            <div class="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg></div>
            <h3>${t('why.'+n+'.t')}</h3><p>${t('why.'+n+'.d')}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- TOUS LES PRODUITS -->
  <section class="section">
    <div class="container">
      <div class="section-head"><span class="eyebrow">Catalogue</span><h2>${t('all.title')}</h2></div>
      <div class="prod-grid">${allHtml}</div>
    </div>
  </section>

  <!-- AVIS -->
  <section class="section reviews">
    <div class="container">
      <div class="section-head"><h2>${t('reviews.title')}</h2></div>
      <div class="review-grid">${testimonials}</div>
    </div>
  </section>

  <!-- NEWSLETTER -->
  <section class="news">
    <div class="container">
      <h2>${t('news.title')}</h2><p>${t('news.sub')}</p>
      <form id="news-form">
        <input type="email" placeholder="${t('news.placeholder')}" aria-label="email" required>
        <button class="btn btn-primary" type="submit">${t('news.cta')}</button>
      </form>
    </div>
  </section>`;

  const f = document.getElementById('news-form');
  if(f) f.addEventListener('submit', e => { e.preventDefault(); f.reset(); toast(t('news.ok'),'ok'); });
  observeReveals();
}

function renderCategory(catId){
  const list = PRODUCTS.filter(p => p.category === catId);
  view().innerHTML = `
  <div class="container">
    <a class="pd-back" data-nav="home">${t('product.back')}</a>
    <div class="section-head" style="text-align:left;margin:10px 0 26px;max-width:none">
      <span class="eyebrow">${t('nav.shop')}</span>
      <h2>${t('cat.'+catId)}</h2><p>${t('cat.'+catId+'.sub')}</p>
    </div>
    <div class="prod-grid">${list.map(productCard).join('')}</div>
  </div>
  <div style="height:60px"></div>`;
  observeReveals();
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderProduct(id){
  const p = product(id);
  if(!p){ location.hash = '#/'; return; }
  const price = salePrice(p.cost);
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0,4);
  const longText = escapeHtml(tl(p.long));

  view().innerHTML = `
  <div class="container">
    <a class="pd-back" data-nav="home">${t('product.back')}</a>
    <div class="pd">
      <div class="pd-gallery">
        <div class="pd-main">${p.badge?`<span class="badge ${p.badge}" style="top:18px;left:18px">${t('badge.'+p.badge)}</span>`:''}<img id="pd-main-img" src="photos/${p.photos[0]}" alt="${escapeHtml(tl(p.name))}"></div>
        ${p.photos.length>1 ? `<div class="pd-thumbs">${p.photos.map((f,i)=>`<div class="t ${i===0?'active':''}" data-pg="${f}"><img src="photos/${f}" alt="" loading="lazy"></div>`).join('')}</div>` : ''}
      </div>
      <div class="pd-info">
        <span class="cat-tag">${t('cat.'+p.category)}</span>
        <h1>${escapeHtml(tl(p.name))}</h1>
        <div class="pd-meta">
          ${starsHtml(p.rating, p.reviews)}
          <span class="instock"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg> ${t('product.instock')}</span>
        </div>
        <div class="pd-price"><span class="now">${fmt(price)}</span></div>
        <p class="pd-desc">${escapeHtml(tl(p.desc))}</p>
        <div class="pd-buy">
          <div class="qty" id="pd-qty">
            <button data-q="-1">−</button><span id="pd-qty-val">1</span><button data-q="1">+</button>
          </div>
          <button class="btn btn-dark btn-lg" id="pd-add">${t('product.add')}</button>
          <button class="btn btn-primary btn-lg" id="pd-buy">${t('product.buy')}</button>
        </div>
        <div class="pd-tabs">
          <div class="pd-tab-head">
            <button class="active" data-tab="desc">${t('product.desc')}</button>
            <button data-tab="ship">${t('product.ship')}</button>
          </div>
          <div class="pd-tab-body" id="pd-tab-body"><p>${longText}</p></div>
        </div>
      </div>
    </div>

    <section class="section" style="padding:30px 0 60px">
      <div class="section-head" style="text-align:left;margin-bottom:24px;max-width:none"><h2 style="font-size:24px">${t('product.related')}</h2></div>
      <div class="prod-grid">${related.map(productCard).join('')}</div>
    </section>
  </div>`;

  // quantité
  let qty = 1;
  const qtyVal = document.getElementById('pd-qty-val');
  document.getElementById('pd-qty').addEventListener('click', e => {
    const b = e.target.closest('[data-q]'); if(!b) return;
    qty = Math.max(1, qty + parseInt(b.dataset.q,10)); qtyVal.textContent = qty;
  });
  document.getElementById('pd-add').addEventListener('click', () => { addToCart(p.id, qty); });
  document.getElementById('pd-buy').addEventListener('click', () => { addToCart(p.id, qty, true); });

  // galerie : clic sur une miniature change l'image principale
  document.querySelectorAll('.pd-thumbs .t').forEach(th => th.addEventListener('click', () => {
    document.querySelectorAll('.pd-thumbs .t').forEach(x => x.classList.remove('active'));
    th.classList.add('active');
    const m = document.getElementById('pd-main-img'); if(m) m.src = 'photos/' + th.dataset.pg;
  }));

  // onglets
  document.querySelectorAll('.pd-tab-head button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.pd-tab-head button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const body = document.getElementById('pd-tab-body');
    body.innerHTML = btn.dataset.tab === 'ship'
      ? `<ul><li>${t('product.shipinfo')}</li></ul>`
      : `<p>${longText}</p>`;
  }));

  observeReveals();
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderSearch(q){
  const term = (q||'').toLowerCase();
  const list = PRODUCTS.filter(p =>
    tl(p.name).toLowerCase().includes(term) ||
    tl(p.desc).toLowerCase().includes(term) ||
    t('cat.'+p.category).toLowerCase().includes(term));
  view().innerHTML = `
  <div class="container">
    <a class="pd-back" data-nav="home">${t('product.back')}</a>
    <div class="section-head" style="text-align:left;margin:10px 0 26px;max-width:none">
      <h2>“${escapeHtml(q)}” — ${list.length}</h2>
    </div>
    <div class="prod-grid">${list.map(productCard).join('') || `<p style="color:var(--muted)">…</p>`}</div>
  </div><div style="height:60px"></div>`;
  observeReveals();
}

/* ---------------- Routeur ---------------- */
function router(){
  const hash = location.hash.replace(/^#\/?/, '');
  const [name, param] = hash.split('/');
  setActiveNav(name === 'category' && param ? `category:${param}` : (name || 'home'));
  if(name === 'category' && param) return renderCategory(param);
  if(name === 'product' && param) return renderProduct(param);
  if(name === 'search') return renderSearch(decodeURIComponent(param||''));
  return renderHome();
}
function navTo(target){
  // target = "home" | "category:rods" | "product:rod-x"
  const [k,v] = target.split(':');
  if(k==='home') location.hash = '#/';
  else location.hash = `#/${k}/${v}`;
}
function setActiveNav(key){
  document.querySelectorAll('.nav a[data-route]').forEach(a => {
    a.classList.toggle('active', a.dataset.route === key);
  });
}

/* ---------------- Panier ---------------- */
function addToCart(id, qty=1, openAfter=true){
  const cart = STORE.cart;
  const item = cart.find(c => c.id === id);
  if(item) item.qty += qty; else cart.push({ id, qty });
  STORE.cart = cart;
  updateCartCount();
  toast(t('product.added'), 'ok');
  renderCart();
  if(openAfter) openCart();
}
function setQty(id, delta){
  let cart = STORE.cart;
  const item = cart.find(c => c.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){ cart = cart.filter(c => c.id !== id); toast(t('toast.removed')); }
  STORE.cart = cart; updateCartCount(); renderCart();
}
function removeFromCart(id){ STORE.cart = STORE.cart.filter(c => c.id !== id); updateCartCount(); renderCart(); toast(t('toast.removed')); }
function cartTotal(){ return STORE.cart.reduce((s,c)=>{ const p=product(c.id); return p ? s + salePrice(p.cost)*c.qty : s; },0); }
function cartCount(){ return STORE.cart.reduce((s,c)=>s+c.qty,0); }
function updateCartCount(){
  const n = cartCount();
  const badge = document.getElementById('cart-count');
  badge.textContent = n; badge.classList.toggle('hidden', n === 0);
}
function renderCart(){
  const body = document.getElementById('cart-body');
  const foot = document.getElementById('cart-foot');
  const cart = STORE.cart;
  if(cart.length === 0){
    body.innerHTML = `<div class="cart-empty">
      <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
      <p>${t('cart.empty')}</p>
      <button class="btn btn-ghost" style="margin-top:14px" data-nav="home" data-close-cart>${t('cart.empty.cta')}</button>
    </div>`;
    foot.classList.add('hidden');
    return;
  }
  body.innerHTML = cart.map(c => {
    const p = product(c.id); if(!p) return '';
    return `<div class="cart-item">
      <div class="ci-thumb">${p.image}</div>
      <div class="ci-info">
        <div class="ci-name">${escapeHtml(tl(p.name))}</div>
        <div class="ci-price">${fmt(salePrice(p.cost)*c.qty)}</div>
        <div class="qty"><button data-dec="${c.id}">−</button><span>${c.qty}</span><button data-inc="${c.id}">+</button></div>
        <div><button class="ci-remove" data-rm="${c.id}">${t('cart.remove')}</button></div>
      </div>
    </div>`;
  }).join('');
  const sub = cartTotal();
  foot.classList.remove('hidden');
  foot.innerHTML = `
    <div class="sum-row"><span>${t('cart.subtotal')}</span><span>${fmt(sub)}</span></div>
    <div class="sum-row"><span>${t('cart.shipping')}</span><span>${sub>=60?t('cart.free'):fmt(4.90)}</span></div>
    <div class="sum-row total"><span>${t('cart.total')}</span><span>${fmt(sub>=60?sub:sub+4.90)}</span></div>
    <button class="btn btn-primary btn-block btn-lg" id="checkout">${t('cart.checkout')}</button>
    <p class="drawer-note">${t('cart.note')}</p>`;
  const co = document.getElementById('checkout');
  if(co) co.addEventListener('click', () => {
    STORE.cart = []; updateCartCount(); renderCart(); closeCart(); toast(t('order.ok'),'ok');
  });
}
function openCart(){ document.getElementById('cart-drawer').classList.add('show'); document.getElementById('overlay').classList.add('show'); }
function closeCart(){ document.getElementById('cart-drawer').classList.remove('show'); document.getElementById('overlay').classList.remove('show'); }

/* ---------------- Authentification (démo locale) ---------------- */
function openAuth(){ renderAuth('login'); document.getElementById('auth-modal').classList.add('show'); }
function closeAuth(){ document.getElementById('auth-modal').classList.remove('show'); }
function validEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function renderAuth(mode){
  const card = document.getElementById('auth-card');
  const u = STORE.user;
  if(u){ // déjà connecté → vue compte
    card.innerHTML = `
      <button class="close-btn modal-close" data-close-auth>✕</button>
      <h3>${t('auth.account')}</h3>
      <p class="sub">${t('auth.welcome')}</p>
      <div class="account-row">
        <div class="av">${(u.name||u.email)[0].toUpperCase()}</div>
        <div><b>${t('auth.hello')}, ${escapeHtml(u.name||'')}</b><span>${escapeHtml(u.email)}</span></div>
      </div>
      <button class="btn btn-ghost btn-block" id="logout-btn">${t('auth.logout')}</button>`;
    document.getElementById('logout-btn').addEventListener('click', () => {
      STORE.user = null; updateAuthUI(); renderAuth('login');
    });
    return;
  }
  const isLogin = mode === 'login';
  card.innerHTML = `
    <button class="close-btn modal-close" data-close-auth>✕</button>
    <div class="brand">${LOGO_MARK}</div>
    <h3>${isLogin ? t('auth.login') : t('auth.signup')}</h3>
    <p class="sub">${t('auth.welcome')}</p>
    <div class="tabs">
      <button class="${isLogin?'active':''}" data-mode="login">${t('auth.login')}</button>
      <button class="${!isLogin?'active':''}" data-mode="signup">${t('auth.signup')}</button>
    </div>
    <div class="form-err hidden" id="auth-err"></div>
    <form id="auth-form">
      ${isLogin ? '' : `<div class="field"><label>${t('auth.name')}</label><input type="text" id="f-name" autocomplete="name"></div>`}
      <div class="field"><label>${t('auth.email')}</label><input type="email" id="f-email" autocomplete="email"></div>
      <div class="field"><label>${t('auth.pass')}</label><input type="password" id="f-pass" autocomplete="${isLogin?'current-password':'new-password'}"></div>
      <button class="btn btn-primary btn-block btn-lg" type="submit">${isLogin ? t('auth.login.cta') : t('auth.signup.cta')}</button>
    </form>
    <div class="modal-switch">
      ${isLogin
        ? `<button data-mode="signup">${t('auth.toSignup')}</button>`
        : `<button data-mode="login">${t('auth.toLogin')}</button>`}
    </div>`;

  card.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => renderAuth(b.dataset.mode)));
  document.getElementById('auth-form').addEventListener('submit', e => {
    e.preventDefault();
    isLogin ? doLogin() : doSignup();
  });
}
function showAuthErr(msg){ const e = document.getElementById('auth-err'); e.textContent = msg; e.classList.remove('hidden'); }

function doSignup(){
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim().toLowerCase();
  const pass = document.getElementById('f-pass').value;
  if(!name || !email || !pass) return showAuthErr(t('auth.err.fields'));
  if(!validEmail(email)) return showAuthErr(t('auth.err.email'));
  if(pass.length < 6) return showAuthErr(t('auth.err.pass'));
  const users = STORE.users;
  if(users.some(u => u.email === email)) return showAuthErr(t('auth.err.exists'));
  users.push({ name, email, pass }); STORE.users = users; // démo : mot de passe local seulement
  STORE.user = { name, email };
  updateAuthUI(); closeAuth(); toast(t('auth.created'),'ok');
}
function doLogin(){
  const email = document.getElementById('f-email').value.trim().toLowerCase();
  const pass = document.getElementById('f-pass').value;
  if(!email || !pass) return showAuthErr(t('auth.err.fields'));
  const u = STORE.users.find(x => x.email === email && x.pass === pass);
  if(!u) return showAuthErr(t('auth.err.nouser'));
  STORE.user = { name: u.name, email: u.email };
  updateAuthUI(); closeAuth(); toast(t('auth.logged'),'ok');
}
function updateAuthUI(){
  const u = STORE.user;
  const label = document.getElementById('account-label');
  label.textContent = u ? (u.name ? u.name.split(' ')[0] : t('auth.account')) : t('auth.login');
}

/* ---------------- Toasts ---------------- */
let toastTimer;
function toast(msg, type=''){
  const wrap = document.getElementById('toasts');
  const node = el(`<div class="toast ${type}">${escapeHtml(msg)}</div>`);
  wrap.appendChild(node);
  setTimeout(() => { node.style.opacity='0'; node.style.transform='translateY(10px)'; }, 2200);
  setTimeout(() => node.remove(), 2600);
}

/* ---------------- Reveal au défilement ---------------- */
let revObserver;
function observeReveals(){
  const els = document.querySelectorAll('.reveal:not(.in)');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
  if(!revObserver){
    revObserver = new IntersectionObserver((entries)=>{
      entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); revObserver.unobserve(en.target); } });
    }, { threshold:.12 });
  }
  els.forEach(e => revObserver.observe(e));
}

/* ---------------- i18n des éléments statiques ---------------- */
function applyStaticI18n(){
  document.querySelectorAll('[data-i18n]').forEach(n => n.textContent = t(n.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(n => n.setAttribute('placeholder', t(n.dataset.i18nPh)));
  document.documentElement.lang = STORE.lang;
}
function setLang(lang){
  STORE.lang = lang;
  document.getElementById('lang-select').value = lang;
  applyStaticI18n(); updateAuthUI(); renderCart(); router(); // re-render vue courante
}

/* ---------------- Logo ---------------- */
const LOGO_MARK = `<svg class="mark" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#18b4c4"/><stop offset="1" stop-color="#0e7c86"/></linearGradient></defs>
  <circle cx="24" cy="24" r="22" fill="url(#lg)"/>
  <path d="M16 10 v17 a8 8 0 1 0 5 0 V14" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <circle cx="18.5" cy="33.5" r="3.2" fill="#fff"/>
  <path d="M30 14 q6 4 0 9" stroke="#cfe9ec" stroke-width="2.4" fill="none" stroke-linecap="round"/>
</svg>`;

/* ---------------- Init ---------------- */
function bindGlobalClicks(){
  document.body.addEventListener('click', e => {
    const nav = e.target.closest('[data-nav]');
    if(nav){ e.preventDefault(); navTo(nav.dataset.nav); if(nav.hasAttribute('data-close-cart')) closeCart(); closeMobileNav(); return; }
    const scr = e.target.closest('[data-scroll]');
    if(scr){ const tgt = document.getElementById(scr.dataset.scroll); if(tgt) tgt.scrollIntoView({behavior:'smooth'}); return; }
    if(e.target.closest('[data-add]')){ addToCart(e.target.closest('[data-add]').dataset.add, 1); return; }
    if(e.target.closest('[data-wish]')){ toast('❤'); return; }
    if(e.target.closest('[data-inc]')){ setQty(e.target.closest('[data-inc]').dataset.inc, 1); return; }
    if(e.target.closest('[data-dec]')){ setQty(e.target.closest('[data-dec]').dataset.dec, -1); return; }
    if(e.target.closest('[data-rm]')){ removeFromCart(e.target.closest('[data-rm]').dataset.rm); return; }
    if(e.target.closest('[data-close-cart]')){ closeCart(); return; }
    if(e.target.closest('[data-close-auth]')){ closeAuth(); return; }
  });
}

function init(){
  // injecte logos
  document.querySelectorAll('[data-logo]').forEach(n => n.insertAdjacentHTML('afterbegin', LOGO_MARK));
  // langue
  const sel = document.getElementById('lang-select');
  sel.value = STORE.lang;
  sel.addEventListener('change', () => setLang(sel.value));
  applyStaticI18n();
  updateAuthUI();
  updateCartCount();
  renderCart();

  // panier / compte
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('account-btn').addEventListener('click', openAuth);
  document.getElementById('overlay').addEventListener('click', closeCart);
  document.getElementById('auth-modal').addEventListener('click', e => { if(e.target.id==='auth-modal') closeAuth(); });
  document.querySelectorAll('[data-open-cart]').forEach(b=>b.addEventListener('click', openCart));

  // recherche
  const search = document.getElementById('search-input');
  let deb;
  const go = () => { const q = search.value.trim(); location.hash = q ? `#/search/${encodeURIComponent(q)}` : '#/'; };
  search.addEventListener('input', () => { clearTimeout(deb); deb = setTimeout(go, 350); });
  search.addEventListener('keydown', e => { if(e.key==='Enter'){ clearTimeout(deb); go(); } });

  // menu mobile
  document.getElementById('burger').addEventListener('click', openMobileNav);
  document.getElementById('mn-close').addEventListener('click', closeMobileNav);

  // échap ferme tout
  document.addEventListener('keydown', e => { if(e.key==='Escape'){ closeCart(); closeAuth(); closeMobileNav(); } });

  bindGlobalClicks();
  window.addEventListener('hashchange', router);
  router();
}

function openMobileNav(){ document.getElementById('mobile-nav').classList.add('show'); }
function closeMobileNav(){ document.getElementById('mobile-nav').classList.remove('show'); }

document.addEventListener('DOMContentLoaded', init);

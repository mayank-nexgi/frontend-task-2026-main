/* =========================================
   Nook Studio landing page scripts
   ========================================= */

(function () {
  const grid = document.getElementById('product-grid');
  const loadMoreBtn = document.getElementById('load-more');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cartCountEl = document.getElementById('cart-count');
  const toast = document.getElementById('toast');

  let currentCategory = 'all';
  let currentPage = 1;

  /* ---------- Products ---------- */

  function productCard(p) {
    return (
      '<article class="product-card">' +
        '<div class="product-image" style="background:' + p.color + '"></div>' +
        '<div class="product-body">' +
          '<span class="product-category">' + p.category + '</span>' +
          '<h3>' + p.name + '</h3>' +
          '<p>' + p.description + '</p>' +
          '<div class="product-footer">' +
            '<span class="price">&#8377;' + p.price.toLocaleString('en-IN') + '</span>' +
            '<button class="btn btn-small add-to-cart" data-id="' + p.id + '">Add to cart</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderProducts(items, append) {
    const html = items.map(productCard).join('');

    if (append) {
      grid.insertAdjacentHTML('beforeend', html);
    } else {
      grid.innerHTML = html;
    }

    bindAddToCart();
  }

  function bindAddToCart() {
    document.querySelectorAll('.add-to-cart').forEach(function (btn) {
      btn.addEventListener('click', async function () {
        const res = await NookAPI.addToCart(btn.dataset.id);
        cartCountEl.textContent = res.count;

        const name = btn.closest('.product-card').querySelector('h3').textContent;
        showToast(name + ' added to cart');
      });
    });
  }

  async function loadProducts(append) {
    const data = await NookAPI.getProducts({
      category: currentCategory,
      page: currentPage
    });

    renderProducts(data.items, append);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      currentCategory = btn.dataset.category;
      loadProducts(false);
    });
  });

  loadMoreBtn.addEventListener('click', function () {
    currentPage++;
    loadProducts(true);
  });

  loadProducts(false);

  /* ---------- Toast ---------- */

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');

    setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2500);
  }

  /* ---------- FAQ accordion ---------- */

  var faqButtons = document.querySelectorAll('.faq-question');
  var faqItems = document.querySelectorAll('.faq-item');

  for (var i = 0; i < faqButtons.length; i++) {
    faqButtons[i].addEventListener('click', function () {
      faqItems[i].classList.toggle('is-open');
    });
  }

  /* ---------- Mobile menu ---------- */

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');

  menuToggle.addEventListener('click', function () {
    mainNav.classList.toggle('is-open');
  });

  /* ---------- Newsletter ---------- */

  const subscribeBtn = document.getElementById('subscribe-btn');
  const emailInput = document.getElementById('email');
  const formMessage = document.getElementById('form-message');

  subscribeBtn.addEventListener('click', async function () {
    await NookAPI.subscribe(emailInput.value);

    formMessage.textContent = 'Thanks for subscribing! Check your inbox for your code.';
    emailInput.value = '';
  });
})();

// 샘플 데이터 생성 (총 40개: 10개씩 4페이지)
const products = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    brand: `브랜드 ${Math.floor(i/5) + 1}`,
    name: `마스크팩 연습 제품 ${i + 1} - 수분 진정 타입`,
    price: (1000 + (i * 100)).toLocaleString(),
    img: `P000${i + 1}`
}));

const ITEMS_PER_PAGE = 10;
let totalLikes = 0;
let totalCart = 0;

// URL에서 현재 페이지 번호 가져오기
function getCurrentPage() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('pageIdx')) || 1;
}

// 제품 렌더링
function renderProducts(page) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pagedItems = products.slice(start, start + ITEMS_PER_PAGE);

    pagedItems.forEach(item => {
        const article = document.createElement('article');
        article.className = 'item-card';
        article.innerHTML = `
            <div class="thumbnail">이미지 ${item.id}</div>
            <span class="brand-name">${item.brand}</span>
            <strong class="product-name">${item.name}</strong>
            <div class="price-container">
                <span class="sale-price">${item.price}원</span>
            </div>
            <div class="action-buttons">
                <button onclick="updateCount('like')">❤️</button>
                <button onclick="updateCount('cart')">🛒</button>
            </div>
        `;
        grid.appendChild(article);
    });
}

// 페이지네이션 생성
function renderPagination(currentPage) {
    const nav = document.getElementById('pagination-list');
    nav.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="?pageIdx=${i}" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
        
        // 페이지 클릭 시 파라미터 변경 및 리렌더링 방지(연습용이므로 실제 이동 대신 pushState 활용 가능)
        li.querySelector('a').addEventListener('click', (e) => {
            // 실제 이동을 하도록 기본 동작을 유지하거나, 
            // SPA처럼 작동하게 하려면 e.preventDefault()를 사용합니다.
        });
        nav.appendChild(li);
    }
}

// 카운트 업데이트
function updateCount(type) {
    if (type === 'like') {
        totalLikes++;
        document.getElementById('total-likes').innerText = totalLikes;
    } else {
        totalCart++;
        document.getElementById('total-cart').innerText = totalCart;
    }
}

// 초기화
window.onload = () => {
    const currentPage = getCurrentPage();
    renderProducts(currentPage);
    renderPagination(currentPage);
};

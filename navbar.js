// [시스템 분석] navbar.js - 구글 계정 동기화 메뉴 고정 삽입 및 단일 주입 엔진
(function() {
    function injectGlobalNavbarEngine() {
        if (document.getElementById('dynamic-global-nav-bar')) return;

        // 동적 스타일시트 단일 주입
        if (!document.getElementById('dynamic-navbar-styles')) {
            document.head.insertAdjacentHTML('beforeend', `
                <style id="dynamic-navbar-styles">
                    .global-nav-bar { background-color: #2b1a1a; border-bottom: 2px solid #cd9b33; display: flex; justify-content: flex-end; padding: 0 30px; overflow: hidden; position: relative; z-index: 9999; }
                    .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; align-items: center; }
                    .nav-menu-item a { display: block; color: #bbbbbb; text-decoration: none; padding: 14px 20px; font-size: 13px; font-weight: bold; white-space: nowrap; transition: color 0.15s ease; }
                    .nav-menu-item:hover a { color: #ffffff; }
                    .nav-menu-item.active { background-color: #1c1111; border-bottom: 3px solid #cd9b33; margin-bottom: -2px; }
                    .nav-menu-item.active a { color: #ffcc00; }
                    .nav-sync-btn { background: #f97316; color: #ffffff !important; border-radius: 4px; padding: 6px 14px !important; margin-left: 10px; cursor: pointer; border: none; font-weight: bold; font-size: 13px; transition: opacity 0.15s ease; }
                    .nav-sync-btn:hover { opacity: 0.85; }
                </style>
            `);
        }

        const globalMenuItems = [
            { name: "나의 장수/전법", url: "index.html" },
            { name: "덱 구성", url: "deck.html" },
            { name: "장수 도감", url: "dogam.html" },
            { name: "전법 도감", url: "tactic_dogam.html" }
        ];

        const locationPath = window.location.pathname;
        const currentFile = locationPath.split('/').pop().split('?')[0].split('#')[0] || "index.html";
        
        // 시스템 가이드 바로 위에 '구글 계정 동기화' 버튼 컴포넌트 삽입
        const navHtml = `
            <nav id="dynamic-global-nav-bar" class="global-nav-bar">
                <ul class="nav-menu-list">
                    ${globalMenuItems.map(item => `
                        <li class="nav-menu-item ${currentFile.trim() === item.url.trim() ? 'active' : ''}">
                            <a href="${item.url}">${item.name}</a>
                        </li>`).join('')}
                    <li>
                        <button id="global-google-sync-btn" class="action-btn nav-sync-btn">☁️ 구글 계정 동기화</button>
                    </li>
                    <li class="nav-menu-item ${currentFile.trim() === 'guide.html' ? 'active' : ''}">
                        <a href="guide.html">시스템 가이드</a>
                    </li>
                </ul>
            </nav>
        `;

        const standardTarget = document.querySelector('.top-title-header') || document.querySelector('header');
        if (standardTarget) {
            standardTarget.insertAdjacentHTML('afterend', navHtml);
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHtml);
        }

        // 동기화 버튼 이벤트 바인딩 (Firestore 연동 모듈과 연계)
        const syncBtn = document.getElementById('global-google-sync-btn');
        if (syncBtn) {
            syncBtn.addEventListener('click', async () => {
                if (window.handleGoogleSync) {
                    await window.handleGoogleSync();
                } else {
                    alert("구글 동기화 모듈이 아직 로드되지 않았습니다.");
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    } else {
        injectGlobalNavbarEngine();
    }
})();

// [시스템 분석] navbar.js - 구글 계정 동기화 버튼 헤더 우측 고정 및 단일 주입 엔진
(function() {
    function injectGlobalNavbarEngine() {
        if (document.getElementById('dynamic-global-nav-bar')) return;

        // 동적 스타일시트 단일 주입 (버튼 헤더 우측 고정 스타일 포함)
        if (!document.getElementById('dynamic-navbar-styles')) {
            document.head.insertAdjacentHTML('beforeend', `
                <style id="dynamic-navbar-styles">
                    .global-nav-bar { background-color: #2b1a1a; border-bottom: 2px solid #cd9b33; display: flex; justify-content: flex-end; padding: 0 30px; overflow: hidden; position: relative; z-index: 9999; }
                    .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; align-items: center; }
                    .nav-menu-item a { display: block; color: #bbbbbb; text-decoration: none; padding: 14px 20px; font-size: 13px; font-weight: bold; white-space: nowrap; transition: color 0.15s ease; }
                    .nav-menu-item:hover a { color: #ffffff; }
                    .nav-menu-item.active { background-color: #1c1111; border-bottom: 3px solid #cd9b33; margin-bottom: -2px; }
                    .nav-menu-item.active a { color: #ffcc00; }
                    
                    /* [신규] 헤더 우측 고정 동기화 버튼 스타일 */
                    .header-sync-btn { background: #f97316; color: #ffffff !important; border-radius: 4px; padding: 8px 16px !important; cursor: pointer; border: none; font-weight: bold; font-size: 13px; transition: opacity 0.15s ease; margin-left: auto; align-self: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
                    .header-sync-btn:hover { opacity: 0.85; transform: translateY(-1px); }
                </style>
            `);
        }

        const globalMenuItems = [
            { name: "나의 장수/전법", url: "index.html" },
            { name: "덱 구성", url: "deck.html" },
            { name: "장수 도감", url: "dogam.html" },
            { name: "전법 도감", url: "tactic_dogam.html" },
            { name: "시스템 가이드", url: "guide.html" }
        ];

        const locationPath = window.location.pathname;
        const currentFile = locationPath.split('/').pop().split('?')[0].split('#')[0] || "index.html";
        
        const navHtml = `
            <nav id="dynamic-global-nav-bar" class="global-nav-bar">
                <ul class="nav-menu-list">
                    ${globalMenuItems.map(item => `
                        <li class="nav-menu-item ${currentFile.trim() === item.url.trim() ? 'active' : ''}">
                            <a href="${item.url}">${item.name}</a>
                        </li>`).join('')}
                </ul>
            </nav>
        `;

        const standardTarget = document.querySelector('.top-title-header') || document.querySelector('header');
        
        if (standardTarget) {
            // 1. 내비게이션 바는 헤더 아래에 주입
            standardTarget.insertAdjacentHTML('afterend', navHtml);
            
            // 2. [위치 이동] 구글 계정 동기화 버튼은 헤더 내부 우측 끝(beforeend)에 주입
            if (!document.getElementById('global-google-sync-btn')) {
                standardTarget.insertAdjacentHTML('beforeend', `<button id="global-google-sync-btn" class="action-btn header-sync-btn">☁️ 구글 계정 동기화</button>`);
            }
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

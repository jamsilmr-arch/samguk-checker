// [시스템 분석] navbar.js - 구글 계정 동기화 버튼 헤더 우측 고정 및 타임아웃 해제 엔진
(function() {
    function injectGlobalNavbarEngine() {
        if (document.getElementById('dynamic-global-nav-bar')) return;

        if (!document.getElementById('dynamic-navbar-styles')) {
            document.head.insertAdjacentHTML('beforeend', `
                <style id="dynamic-navbar-styles">
                    .global-nav-bar { background-color: #2b1a1a; border-bottom: 2px solid #cd9b33; display: flex; justify-content: flex-end; padding: 0 30px; overflow: hidden; position: relative; z-index: 9999; }
                    .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; align-items: center; }
                    .nav-menu-item a { display: block; color: #bbbbbb; text-decoration: none; padding: 14px 20px; font-size: 13px; font-weight: bold; white-space: nowrap; transition: color 0.15s ease; }
                    .nav-menu-item:hover a { color: #ffffff; }
                    .nav-menu-item.active { background-color: #1c1111; border-bottom: 3px solid #cd9b33; margin-bottom: -2px; }
                    .nav-menu-item.active a { color: #ffcc00; }
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
            standardTarget.insertAdjacentHTML('afterend', navHtml);
            if (!document.getElementById('global-google-sync-btn')) {
                standardTarget.insertAdjacentHTML('beforeend', `<button id="global-google-sync-btn" class="action-btn header-sync-btn" onclick="executeGoogleSync(event)">☁️ 구글 계정 동기화</button>`);
            }
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHtml);
        }
    }

    window.executeGoogleSync = async function(e) {
        if (e) e.preventDefault();
        const btn = document.getElementById('global-google-sync-btn');
        
        if (!window.handleGoogleSync) {
            alert("⚠️ 구글 동기화 모듈이 누락되었습니다. (HTML 파일 내부를 확인하세요)");
            return;
        }
        
        const originalText = btn.innerText;
        btn.innerText = "⏳ 통신 중...";
        btn.style.opacity = "0.7";
        btn.style.pointerEvents = "none";
        
        try {
            // [오류 수정] 8초 타임아웃 제한을 완전히 삭제하여 구글 로그인 대기 시간 무제한 허용
            await window.handleGoogleSync();
        } catch (error) {
            alert("❌ 동기화 실패: " + error.message);
        } finally {
            btn.innerText = originalText;
            btn.style.opacity = "1";
            btn.style.pointerEvents = "auto";
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    } else {
        injectGlobalNavbarEngine();
    }
})();

// [시스템 분석] navbar.js - 구글 계정 동기화 버튼 헤더 우측 고정 및 타임아웃 방어 엔진
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
            // onclick을 인라인으로 강제 결선하여 이벤트 유실 원천 차단
            if (!document.getElementById('global-google-sync-btn')) {
                standardTarget.insertAdjacentHTML('beforeend', `<button id="global-google-sync-btn" class="action-btn header-sync-btn" onclick="executeGoogleSync(event)">☁️ 구글 계정 동기화</button>`);
            }
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHtml);
        }
    }

    // 글로벌 환경에 동기화 함수 강제 할당 (무한 대기 방지 로직 포함)
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
            // Firebase가 멈출 경우를 대비한 8초 타임아웃 강제 브레이커
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("서버 응답 시간 초과 (설정값이 틀렸거나 네트워크가 불안정합니다)")), 8000));
            await Promise.race([window.handleGoogleSync(), timeout]);
        } catch (error) {
            alert("❌ 동기화 실패: " + error.message + "\n\n※ HTML 파일 소스의 firebaseConfig(apiKey, projectId 등)가 본인의 것인지 반드시 확인하십시오.");
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

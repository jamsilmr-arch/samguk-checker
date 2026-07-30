// [시스템 분석] navbar.js - 구글 계정 동기화, 글로벌 네비게이션, 다크/라이트 테마 제어 엔진
(function() {
    // 1. 테마 초기화 로직 (화면 깜빡임 방지를 위해 최우선 실행)
    const savedTheme = localStorage.getItem('samguk_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    function injectGlobalNavbarEngine() {
        if (document.getElementById('dynamic-global-nav-bar')) return;

        // 2. 글로벌 동적 스타일시트 주입 (테마 변수 + 점선 강제 제거 + 버튼 UI)
        if (!document.getElementById('dynamic-navbar-styles')) {
            document.head.insertAdjacentHTML('beforeend', `
                <style id="dynamic-navbar-styles">
                    /* --- CSS 테마 변수 (다크 모드 기본) --- */
                    :root {
                        --bg-main: #111827;
                        --bg-panel: #1f2937;
                        --text-main: #f3f4f6;
                        --border-main: #374151;
                        --unowned-bg: transparent;
                        --unowned-border: #475569;
                    }
                    /* --- CSS 테마 변수 (라이트 모드) --- */
                    [data-theme="light"] {
                        --bg-main: #f8fafc;
                        --bg-panel: #ffffff;
                        --text-main: #111827;
                        --border-main: #cbd5e1;
                        --unowned-bg: #f1f5f9;
                        --unowned-border: #94a3b8;
                    }
                    
                    /* 글로벌 색상 동기화 (부드러운 전환 효과 포함) */
                    body { background-color: var(--bg-main) !important; color: var(--text-main) !important; transition: background-color 0.3s, color 0.3s; }
                    .section-box, .deck-card, .guide-content-area, aside { background-color: var(--bg-panel) !important; border-color: var(--border-main) !important; transition: background-color 0.3s; }
                    .author-text { color: var(--text-main) !important; opacity: 0.7; }
                    h1, h2, h3 { color: var(--text-main) !important; }
                    
                    /* 🚨 [핵심 가독성 개선] 기존 인라인 점선(dashed)을 찾아 강제 실선(solid) 및 투명도 처리 */
                    [style*="dashed"], .grid-item:not(.owned), .tactic-btn:not(.owned) {
                        border-style: solid !important;
                        border-color: var(--unowned-border) !important;
                        background-color: var(--unowned-bg) !important;
                        opacity: 0.4 !important; /* 미보유 항목 가독성을 위한 불투명도 조절 */
                        color: var(--text-main) !important;
                        transition: opacity 0.2s, background-color 0.3s;
                    }
                    /* 보유 항목 명확화 (오버라이드 방어) */
                    [style*="solid #cd9b33"], [style*="solid #4ade80"], .owned {
                        opacity: 1 !important;
                        border-style: solid !important;
                    }

                    /* 네비게이션 바 스타일 */
                    .global-nav-bar { background-color: #2b1a1a; border-bottom: 2px solid #cd9b33; display: flex; justify-content: flex-end; padding: 0 30px; overflow: hidden; position: relative; z-index: 9999; }
                    .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; align-items: center; }
                    .nav-menu-item a { display: block; color: #bbbbbb; text-decoration: none; padding: 14px 20px; font-size: 13px; font-weight: bold; white-space: nowrap; transition: color 0.15s ease; }
                    .nav-menu-item:hover a { color: #ffffff; }
                    .nav-menu-item.active { background-color: #1c1111; border-bottom: 3px solid #cd9b33; margin-bottom: -2px; }
                    .nav-menu-item.active a { color: #ffcc00; }
                    .header-sync-btn { background: #f97316; color: #ffffff !important; border-radius: 4px; padding: 8px 16px !important; cursor: pointer; border: none; font-weight: bold; font-size: 13px; transition: opacity 0.15s ease; margin-left: auto; align-self: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
                    .header-sync-btn:hover { opacity: 0.85; transform: translateY(-1px); }

                    /* 🌙☀️ 우측 하단 플로팅 테마 변경 버튼 스타일 */
                    #global-theme-toggle {
                        position: fixed;
                        bottom: 25px;
                        right: 25px;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background-color: var(--text-main);
                        color: var(--bg-main);
                        border: 2px solid var(--border-main);
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                        cursor: pointer;
                        font-size: 22px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    #global-theme-toggle:hover { transform: scale(1.1) rotate(15deg); }
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
        
        // 3. 네비게이션 바 HTML 렌더링
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

        // 4. 우측 하단 테마 토글 버튼 주입 및 이벤트 바인딩
        if (!document.getElementById('global-theme-toggle')) {
            document.body.insertAdjacentHTML('beforeend', `<button id="global-theme-toggle" title="테마 변경">${savedTheme === 'light' ? '🌙' : '☀️'}</button>`);
            
            document.getElementById('global-theme-toggle').addEventListener('click', function() {
                const root = document.documentElement;
                const currentTheme = root.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                // 테마 속성 변경 및 이모티콘 스왑
                root.setAttribute('data-theme', newTheme);
                this.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
                
                // 로컬 스토리지에 영구 저장
                localStorage.setItem('samguk_theme', newTheme);
            });
        }
    }

    // 구글 동기화 실행 우회 함수 (타임아웃 로직 제거판 유지)
    window.executeGoogleSync = async function(e) {
        if (e) e.preventDefault();
        const btn = document.getElementById('global-google-sync-btn');
        
        if (!window.handleGoogleSync) {
            alert("⚠️ 구글 동기화 모듈이 누락되었습니다. (firebase_core.js 호출 확인)");
            return;
        }
        
        const originalText = btn.innerText;
        btn.innerText = "⏳ 통신 중...";
        btn.style.opacity = "0.7";
        btn.style.pointerEvents = "none";
        
        try {
            await window.handleGoogleSync();
        } catch (error) {
            alert("❌ 동기화 실패: " + error.message);
        } finally {
            if(btn) {
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.style.pointerEvents = "auto";
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    } else {
        injectGlobalNavbarEngine();
    }
})();

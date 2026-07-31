// [시스템 분석] navbar.js - 글로벌 테마 변수 매트릭스 및 가독성 100% 보장 엔진
(function() {
    const savedTheme = localStorage.getItem('samguk_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    function injectGlobalNavbarEngine() {
        if (document.getElementById('dynamic-global-nav-bar')) return;

        if (!document.getElementById('dynamic-navbar-styles')) {
            document.head.insertAdjacentHTML('beforeend', `
                <style id="dynamic-navbar-styles">
                    /* --- 글로벌 CSS 테마 변수 (다크 모드) --- */
                    :root {
                        --bg-main: #111827;
                        --bg-panel: #1f2937;
                        --bg-card: #111827;
                        --bg-inner: #0f172a;
                        --bg-input: #1e293b;
                        --bg-header: #151515; 
                        --bg-nav: #2b1a1a;    
                        
                        --text-main: #f8fafc;
                        --text-desc: #cbd5e1;
                        --text-muted: #94a3b8;
                        --text-highlight: #feca57;
                        
                        --border-main: #374151;
                        --border-input: #475569;
                        --border-accent: #cd9b33;
                        
                        --unowned-bg: #2d3748;
                        --unowned-border: #4a5568;
                        --unowned-text: #a0aec0;
                        
                        --nav-text: #bbbbbb;
                        --nav-hover: #ffffff;
                        --nav-active-bg: #1c1111;
                        --nav-active-text: #ffcc00;
                        
                        --success-text: #4ade80;
                        --success-bg: rgba(74, 222, 128, 0.15);
                    }
                    /* --- 글로벌 CSS 테마 변수 (화이트 모드) --- */
                    [data-theme="light"] {
                        --bg-main: #f1f5f9;
                        --bg-panel: #ffffff;
                        --bg-card: #f8fafc;
                        --bg-inner: #f1f5f9;
                        --bg-input: #ffffff;
                        --bg-header: #ffffff; 
                        --bg-nav: #f8fafc;    
                        
                        --text-main: #0f172a;
                        --text-desc: #334155;
                        --text-muted: #64748b;
                        --text-highlight: #d97706; 
                        
                        --border-main: #cbd5e1;
                        --border-input: #94a3b8;
                        --border-accent: #d97706;
                        
                        --unowned-bg: #e2e8f0;
                        --unowned-border: #cbd5e1;
                        --unowned-text: #64748b;
                        
                        --nav-text: #475569;
                        --nav-hover: #0f172a;
                        --nav-active-bg: #ffffff;
                        --nav-active-text: #d97706;
                        
                        --success-text: #16a34a;
                        --success-bg: rgba(34, 197, 94, 0.1);
                    }
                    
                    body { background-color: var(--bg-main) !important; color: var(--text-main) !important; transition: background-color 0.3s, color 0.3s; }
                    .section-box, .guide-content-area, aside { background-color: var(--bg-panel) !important; border-color: var(--border-main) !important; transition: background-color 0.3s, border-color 0.3s; }
                    
                    /* 🚨 가이드 페이지 하드코딩 강제 오버라이드 (블랙 박스 제거) */
                    .guide-content-area div[style*="background"], .guide-content-area div[style*="background-color"] { background-color: var(--bg-inner) !important; border-color: var(--border-main) !important; color: var(--text-desc) !important; }
                    .guide-content-area span, .guide-content-area p, .guide-content-area li, .guide-content-area td, .guide-content-area th { color: var(--text-desc) !important; }
                    
                    .top-title-header { background-color: var(--bg-header) !important; border-bottom: 1px solid var(--border-main) !important; }
                    .top-title-header h1 { color: var(--text-main) !important; }
                    .author-text { color: var(--text-muted) !important; }
                    h1, h2, h3, .group-title { color: var(--text-main) !important; }
                    
                    .global-nav-bar { background-color: var(--bg-nav) !important; border-bottom: 2px solid var(--border-accent) !important; display: flex; justify-content: flex-end; padding: 0 30px; }
                    .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; align-items: center; }
                    .nav-menu-item a { display: block; color: var(--nav-text) !important; text-decoration: none; padding: 14px 20px; font-size: 13px; font-weight: bold; }
                    .nav-menu-item:hover a { color: var(--nav-hover) !important; }
                    .nav-menu-item.active { background-color: var(--nav-active-bg) !important; border-bottom: 3px solid var(--border-accent) !important; margin-bottom: -2px; }
                    .nav-menu-item.active a { color: var(--nav-active-text) !important; }
                    
                    [style*="dashed"], .grid-item:not(.owned), .tactic-btn:not(.owned) { border: 1px solid var(--unowned-border) !important; background-color: var(--unowned-bg) !important; color: var(--unowned-text) !important; opacity: 1 !important; }
                    [style*="solid #cd9b33"], [style*="solid #4ade80"], .owned { opacity: 1 !important; }

                    .header-sync-btn { background: #f97316; color: #ffffff !important; border-radius: 4px; padding: 8px 16px !important; cursor: pointer; border: none; font-weight: bold; font-size: 13px; margin-left: auto; align-self: center; }
                    
                    #global-theme-toggle { position: fixed; bottom: 25px; right: 25px; width: 50px; height: 50px; border-radius: 50%; background-color: var(--text-main); color: var(--bg-main); border: 2px solid var(--border-main); box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer; font-size: 22px; display: flex; align-items: center; justify-content: center; z-index: 10000; transition: transform 0.2s; }
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
                standardTarget.insertAdjacentHTML('beforeend', `<button id="global-google-sync-btn" class="action-btn header-sync-btn" onclick="executeGoogleSync(event)">☁️ 구글 계정 동기화 (OFF)</button>`);
            }
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHtml);
        }

        if (!document.getElementById('global-theme-toggle')) {
            document.body.insertAdjacentHTML('beforeend', `<button id="global-theme-toggle" title="테마 변경">${savedTheme === 'light' ? '🌙' : '☀️'}</button>`);
            document.getElementById('global-theme-toggle').addEventListener('click', function() {
                const root = document.documentElement;
                const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
                root.setAttribute('data-theme', newTheme);
                this.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
                localStorage.setItem('samguk_theme', newTheme);
            });
        }
    }

    window.executeGoogleSync = async function(e) {
        if (e) e.preventDefault();
        const btn = document.getElementById('global-google-sync-btn');
        if (!window.handleGoogleSync) return alert("⚠️ 구글 동기화 모듈 누락");
        
        const originalText = btn.innerText;
        btn.innerText = "⏳ 통신 중...";
        btn.style.opacity = "0.7";
        btn.style.pointerEvents = "none";
        
        try { await window.handleGoogleSync(); } 
        catch (error) { alert("❌ 동기화 실패: " + error.message); } 
        finally {
            if(btn) {
                btn.style.opacity = "1";
                btn.style.pointerEvents = "auto";
                if(!btn.innerText.includes("ON")) btn.innerText = originalText;
            }
        }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    else injectGlobalNavbarEngine();
})();

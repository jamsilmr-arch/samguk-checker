// [시스템 분석] navbar.js - 글로벌 테마 변수 매트릭스 및 다크모드 하드코딩 강제 소거 엔진
(function() {
    const savedTheme = localStorage.getItem('samguk_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    function injectGlobalNavbarEngine() {
        if (document.getElementById('dynamic-global-nav-bar')) return;

        if (!document.getElementById('dynamic-navbar-styles')) {
            document.head.insertAdjacentHTML('beforeend', `
                <style id="dynamic-navbar-styles">
                    :root {
                        --bg-main: #111827; --bg-panel: #1f2937; --bg-card: #111827; --bg-inner: #0f172a; --bg-input: #1e293b; --bg-header: #151515; --bg-nav: #2b1a1a;    
                        --text-main: #f8fafc; --text-desc: #cbd5e1; --text-muted: #94a3b8; --text-highlight: #feca57;
                        --border-main: #374151; --border-input: #475569; --border-accent: #cd9b33;
                        --unowned-bg: #2d3748; --unowned-border: #4a5568; --unowned-text: #a0aec0;
                        --nav-text: #bbbbbb; --nav-hover: #ffffff; --nav-active-bg: #1c1111; --nav-active-text: #ffcc00;
                        --success-text: #4ade80; --success-bg: rgba(74, 222, 128, 0.15);
                        --danger-text: #f87171; --danger-bg: rgba(248, 113, 113, 0.05);
                    }
                    [data-theme="light"] {
                        --bg-main: #f1f5f9; --bg-panel: #ffffff; --bg-card: #f8fafc; --bg-inner: #f1f5f9; --bg-input: #ffffff; --bg-header: #e2e8f0; --bg-nav: #ffffff;    
                        --text-main: #0f172a; --text-desc: #334155; --text-muted: #64748b; --text-highlight: #d97706; 
                        --border-main: #cbd5e1; --border-input: #94a3b8; --border-accent: #d97706;
                        --unowned-bg: #e2e8f0; --unowned-border: #94a3b8; --unowned-text: #64748b;
                        --nav-text: #475569; --nav-hover: #0f172a; --nav-active-bg: #f8fafc; --nav-active-text: #d97706;
                        --success-text: #16a34a; --success-bg: rgba(34, 197, 94, 0.1);
                        --danger-text: #dc2626; --danger-bg: rgba(220, 38, 38, 0.05);
                    }
                    
                    /* 🚨 [핵심 교정] 하드코딩된 어두운 색상 강제 초기화 및 테마 동기화 (우선순위 최상단) */
                    body { background-color: var(--bg-main) !important; color: var(--text-main) !important; transition: background-color 0.3s, color 0.3s; }
                    .section-box, .guide-content-area, aside, .deck-card, .info-card, .data-table-wrapper { background-color: var(--bg-panel) !important; border-color: var(--border-main) !important; transition: background-color 0.3s, border-color 0.3s; }
                    
                    /* 1. 덱 구성 페이지 (deck.html) 어두운 배경 제거 */
                    .officer-slot { background-color: var(--bg-inner) !important; border: 1px solid var(--border-main) !important; border-radius: 6px; padding: 10px; }
                    
                    /* 2. 장수 도감 페이지 (dogam.html) 검은 필터 버튼 강제 조정 */
                    .filter-btn, .faction-btn, .group-btn, .tier-btn { 
                        background-color: var(--bg-input) !important; 
                        color: var(--text-muted) !important; 
                        border: 1px solid var(--border-main) !important; 
                        transition: background-color 0.3s, color 0.3s; 
                    }
                    .filter-btn.active, .faction-btn.active, .group-btn.active, .tier-btn.active { 
                        background-color: var(--text-main) !important; 
                        color: var(--bg-main) !important; 
                    }
                    
                    /* 3. 시스템 가이드 페이지 (guide.html) 검은 테이블 강제 조정 */
                    table, .data-table { border-color: var(--border-main) !important; background-color: var(--bg-panel) !important; }
                    th, .data-table th { background-color: var(--bg-header) !important; color: var(--text-main) !important; border-color: var(--border-main) !important; }
                    td, .data-table td { background-color: var(--bg-panel) !important; color: var(--text-desc) !important; border-color: var(--border-main) !important; }
                    tr:nth-child(even) td, .data-table tr:nth-child(even) td { background-color: var(--bg-inner) !important; }
                    
                    /* 무식하게 박힌 인라인 다크모드 스타일 강제 소거 */
                    [style*="background: #111"], [style*="background-color: #111"],
                    [style*="background: #1a1"], [style*="background-color: #1a1"],
                    [style*="background: #0f1"], [style*="background-color: #0f1"],
                    [style*="background: #1e2"], [style*="background-color: #1e2"] {
                        background-color: var(--bg-inner) !important;
                    }

                    /* 텍스트 가독성 통일 */
                    .top-title-header { background-color: var(--bg-header) !important; border-bottom: 1px solid var(--border-main) !important; }
                    .top-title-header h1 { color: var(--text-main) !important; }
                    .author-text { color: var(--text-muted) !important; }
                    h1, h2, h3, h4, h5, .group-title, .guide-section-title, .p-title { color: var(--text-main) !important; }
                    
                    /* 네비게이션 레이아웃 */
                    .global-nav-bar { background-color: var(--bg-nav) !important; border-bottom: 2px solid var(--border-accent) !important; display: flex; justify-content: flex-end; padding: 0 30px; }
                    .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; align-items: center; }
                    .nav-menu-item a { display: block; color: var(--nav-text) !important; text-decoration: none; padding: 14px 20px; font-size: 13px; font-weight: bold; }
                    .nav-menu-item:hover a { color: var(--nav-hover) !important; }
                    .nav-menu-item.active { background-color: var(--nav-active-bg) !important; border-bottom: 3px solid var(--border-accent) !important; margin-bottom: -2px; }
                    .nav-menu-item.active a { color: var(--nav-active-text) !important; }
                    
                    /* 동기화 버튼 */
                    .header-sync-btn { background: #f97316; color: #ffffff !important; border-radius: 4px; padding: 8px 16px !important; cursor: pointer; border: none; font-weight: bold; font-size: 13px; margin-left: auto; align-self: center; transition: background-color 0.3s; }
                    .header-sync-btn.sync-on { background: #10b981 !important; } 
                    
                    /* 테마 토글 버튼 */
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
            { name: "메타 덱", url: "meta_deck.html" },
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
                const cachedSyncEmail = localStorage.getItem('samguk_sync_email');
                const syncBtnClass = cachedSyncEmail ? 'sync-on' : '';
                const syncBtnText = cachedSyncEmail ? `☁️ 동기화 ON (${cachedSyncEmail.split('@')[0]})` : `☁️ 구글 계정 동기화 (OFF)`;
                standardTarget.insertAdjacentHTML('beforeend', `<button id="global-google-sync-btn" class="action-btn header-sync-btn ${syncBtnClass}" onclick="executeGoogleSync(event)">${syncBtnText}</button>`);
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

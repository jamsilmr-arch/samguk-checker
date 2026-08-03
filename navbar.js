// [시스템 분석] navbar.js - 글로벌 테마 변수 매트릭스 및 패치 히스토리 연동 엔진 (디자인 패치 내역 누락분 반영 완료)
(function() {
    const savedTheme = localStorage.getItem('samguk_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 🚨 히스토리 데이터베이스 (수정 내역 완벽 동기화)
    const patchHistoryData = [
        {
            date: "2026-08-03",
            logs: [
                "가정지전/강유겸제 무지성 리턴 버그 완전 픽스 (역할군 다이나믹 탐색 로직 이식)",
                "전법 선택 드롭다운 목록(select option)의 텍스트 색상 상속 버그 픽스 및 다크테마 가독성 100% 개선",
                "AI 덱 자동 완성 알고리즘 강화 (중복 점수 시 구형 덱이 아닌 최신 메타 덱을 우선 덮어쓰도록 픽스)",
                "천공의 일검 랭킹 메타덱 데이터 최신화",
                "(발끈님 의견 반영)나의 장수/전법 진영(국가)별 UI 원색 배경 제거 및 모던 컬러링 전면 개편",
                "네비게이션 바 우측에 불필요하게 생성되던 브라우저 강제 스크롤바(▲●▼) 버그 완벽 제거"
            ]
        },
        {
            date: "2026-08-02",
            logs: [
                "무의미한 전법 상세 설명 팝업 기능 완전 삭제 (더미 텍스트 제거)",
                "장료 종결 덱(기형창병) 메타 덱 신규 편입 및 전투매(삭풍-설조) 매핑",
                "유저 배치 순서를 최적의 전/후열로 자동 재배열하는 스마트 포지셔닝 엔진 탑재",
                "대체 무장 추천 시 '가후'만 무지성 리턴하던 하드코딩 버그 수정 (다이나믹 스코어링 적용)",
                "나의 장수/전법 로컬 파일 백업(저장/불러오기) 기능 app.js 추가",
                "메타 덱 신규 5종(오리지널 및 변형) 아카이브 최신화",
                "전체 UI 및 가이드 다크모드 하드코딩 색상 강제 소거 및 테마 100% 동기화"
            ]
        }
    ];

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
                    
                    body { background-color: var(--bg-main) !important; color: var(--text-main) !important; transition: background-color 0.3s, color 0.3s; }
                    .section-box, .guide-content-area, aside, .deck-card, .info-card, .data-table-wrapper { background-color: var(--bg-panel) !important; border-color: var(--border-main) !important; transition: background-color 0.3s, border-color 0.3s; }
                    
                    .officer-slot { background-color: var(--bg-inner) !important; border: 1px solid var(--border-main) !important; border-radius: 6px; padding: 10px; }
                    
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
                    
                    table, .data-table { border-color: var(--border-main) !important; background-color: var(--bg-panel) !important; }
                    th, .data-table th { background-color: var(--bg-header) !important; color: var(--text-main) !important; border-color: var(--border-main) !important; }
                    td, .data-table td { background-color: var(--bg-panel) !important; color: var(--text-desc) !important; border-color: var(--border-main) !important; }
                    tr:nth-child(even) td, .data-table tr:nth-child(even) td { background-color: var(--bg-inner) !important; }
                    
                    [style*="background: #111"], [style*="background-color: #111"],
                    [style*="background: #1a1"], [style*="background-color: #1a1"],
                    [style*="background: #0f1"], [style*="background-color: #0f1"],
                    [style*="background: #1e2"], [style*="background-color: #1e2"] {
                        background-color: var(--bg-inner) !important;
                    }

                    .top-title-header { background-color: var(--bg-header) !important; border-bottom: 1px solid var(--border-main) !important; }
                    .top-title-header h1 { color: var(--text-main) !important; }
                    .author-text { color: var(--text-muted) !important; }
                    h1, h2, h3, h4, h5, .group-title, .guide-section-title, .p-title { color: var(--text-main) !important; }
                    
                    .global-nav-bar { background-color: var(--bg-nav) !important; border-bottom: 2px solid var(--border-accent) !important; display: flex; justify-content: flex-end; padding: 0 30px; align-items: center; overflow-y: hidden !important; overflow-x: auto; -ms-overflow-style: none; scrollbar-width: none; }
                    .global-nav-bar::-webkit-scrollbar { display: none; }
                    
                    .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; align-items: center; }
                    .nav-menu-item a { display: block; color: var(--nav-text) !important; text-decoration: none; padding: 14px 20px; font-size: 13px; font-weight: bold; white-space: nowrap; }
                    .nav-menu-item:hover a { color: var(--nav-hover) !important; }
                    
                    .nav-menu-item.active { background-color: var(--nav-active-bg) !important; border-bottom: 3px solid var(--border-accent) !important; }
                    
                    .header-sync-btn, .header-history-btn { border-radius: 4px; padding: 8px 16px !important; cursor: pointer; border: none; font-weight: bold; font-size: 13px; margin-left: 10px; transition: background-color 0.3s; white-space: nowrap; }
                    .header-history-btn { background: #6366f1; color: #ffffff !important; margin-left: auto; }
                    .header-history-btn:hover { background: #4f46e5; }
                    .header-sync-btn { background: #f97316; color: #ffffff !important; }
                    .header-sync-btn.sync-on { background: #10b981 !important; } 
                    
                    #global-theme-toggle { position: fixed; bottom: 25px; right: 25px; width: 50px; height: 50px; border-radius: 50%; background-color: var(--text-main); color: var(--bg-main); border: 2px solid var(--border-main); box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer; font-size: 22px; display: flex; align-items: center; justify-content: center; z-index: 10000; transition: transform 0.2s; }
                    #global-theme-toggle:hover { transform: scale(1.1) rotate(15deg); }

                    .history-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); display: none; justify-content: center; align-items: center; z-index: 20000; backdrop-filter: blur(3px); }
                    .history-modal { background: var(--bg-panel); border: 1px solid var(--border-main); border-radius: 8px; width: 90%; max-width: 600px; max-height: 80vh; display: flex; flex-direction: column; box-shadow: 0 10px 25px rgba(0,0,0,0.5); overflow: hidden; }
                    .history-modal-header { padding: 15px 20px; border-bottom: 1px solid var(--border-main); display: flex; justify-content: space-between; align-items: center; background: var(--bg-header); }
                    .history-modal-header h2 { margin: 0; font-size: 18px; color: var(--text-main); }
                    .history-modal-close { background: none; border: none; color: var(--text-muted); font-size: 20px; cursor: pointer; padding: 0; transition: color 0.2s; }
                    .history-modal-close:hover { color: var(--danger-text); }
                    .history-modal-body { padding: 20px; overflow-y: auto; color: var(--text-desc); font-size: 13px; line-height: 1.6; }
                    .history-block { margin-bottom: 20px; }
                    .history-block:last-child { margin-bottom: 0; }
                    .history-date { font-weight: bold; color: var(--text-highlight); margin-bottom: 8px; font-size: 14px; border-bottom: 1px dashed var(--border-main); padding-bottom: 4px; }
                    .history-list { margin: 0; padding-left: 20px; }
                    .history-list li { margin-bottom: 6px; }
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
            
            const navBarEl = document.getElementById('dynamic-global-nav-bar');
            if (navBarEl && !document.getElementById('global-history-btn')) {
                const cachedSyncEmail = localStorage.getItem('samguk_sync_email');
                const syncBtnClass = cachedSyncEmail ? 'sync-on' : '';
                const syncBtnText = cachedSyncEmail ? `☁️ 동기화 ON (${cachedSyncEmail.split('@')[0]})` : `☁️ 구글 계정 동기화 (OFF)`;
                
                navBarEl.insertAdjacentHTML('beforeend', `
                    <button id="global-history-btn" class="action-btn header-history-btn" onclick="window.toggleHistoryModal()">📜 패치 히스토리</button>
                    <button id="global-google-sync-btn" class="action-btn header-sync-btn ${syncBtnClass}" onclick="window.executeGoogleSync(event)">${syncBtnText}</button>
                `);
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
        
        if (!document.getElementById('history-modal-overlay')) {
            const historyBlocksHtml = patchHistoryData.map(patch => `
                <div class="history-block">
                    <div class="history-date">📅 [${patch.date}] 업데이트 내역</div>
                    <ul class="history-list">
                        ${patch.logs.map(log => `<li>${log}</li>`).join('')}
                    </ul>
                </div>
            `).join('');

            document.body.insertAdjacentHTML('beforeend', `
                <div id="history-modal-overlay" class="history-overlay" onclick="window.toggleHistoryModal(false)">
                    <div class="history-modal" onclick="event.stopPropagation()">
                        <div class="history-modal-header">
                            <h2>🔄 시스템 패치 히스토리</h2>
                            <button class="history-modal-close" onclick="window.toggleHistoryModal(false)">✖</button>
                        </div>
                        <div class="history-modal-body">
                            ${historyBlocksHtml}
                        </div>
                    </div>
                </div>
            `);
        }
    }

    window.toggleHistoryModal = function(forceState) {
        const overlay = document.getElementById('history-modal-overlay');
        if (!overlay) return;
        if (forceState === false) {
            overlay.style.display = 'none';
        } else {
            overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
        }
    };

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

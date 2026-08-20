// [시스템 분석] navbar.js - 글로벌 테마 변수 매트릭스 및 패치 히스토리 연동 엔진 (패치 히스토리 스크롤 및 모달창 높이 고정 픽스 완료)
(function() {
    const savedTheme = localStorage.getItem('samguk_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const patchHistoryData = [
        {
            date: "2026-08-20",
            logs: [
                "주조소 절품 내용 추가"
            ]
        },
        {
            date: "2026-08-08",
            logs: [
                "유저가 수동으로 슬롯에 올린 장수는 변경되지 않고 AI 교정되도록 픽스",
                "딜러에게는 어떠한 방어/힐링 전법 추천되지 않도록 픽스",
                "커스텀 덱 0점 매칭 시 1/2위 메타 가중치(+2)가 강제 합산되는 알고리즘 오작동 픽스",
                "방어력이 낮은 기동형 물리 딜러(마초 등 PCm) 스마트 포지셔닝 강제 후열(Back) 배치 적용",
                "강유·관우·유비 기반 도원기병 덱 변형 메타 아카이브 정식 편입",
                "시스템 가이드 라이트 모드 세부 본문(li, p) 텍스트 흐림 현상 강제 오버라이드 (가독성 100% 픽스)",
                "PC 환경 네비게이션 바 세로 스크롤바 붕괴 버그 박멸 및 렌더링 증발 로직 픽스",
                "3위 이하 메타 덱 서열화 폐지 및 전법 무충돌 세트화(Set A~I) 개편 완료",
                "단일 전법 추천 한계 돌파 ➔ 최대 3개 대체 전법 동시 추천 리스트업 엔진 탑재"
            ]
        },
        {
            date: "2026-08-04",
            logs: [
                "시스템 가이드 세부 본문(li, p) 텍스트 흐림 현상 강제 오버라이드 (가독성 100% 픽스)",
                "PC 버전 네비게이션 바 세로 스크롤바(▲▼) 부활 버그 완벽 박멸 (flex-nowrap 강제 적용)",
                "라이트 모드(White Theme) 전용 컬러 팔레트 전면 수정 (텍스트 가독성 및 명도 대비 개선)",
                "네비게이션 바(GNB) 테마 독립화: 라이트 모드에서도 탭 시인성이 묻히지 않도록 컬러 재설계",
                "PC 버전 네비게이션 바 렌더링 증발 버그 완벽 픽스 (강제 초기화 및 재주입 로직 적용)",
                "관우/장비 물리 딜러 전용 대체 추천 알고리즘 긴급 수정",
                "3위 이하 메타 덱 세트화(Set A~I) 개편 및 신규 10종 덱 아카이빙 완료",
                "단일 전법 추천으로 인한 덱 분배 오류 해결 (최대 3개 대체 전법 리스트업)"
            ]
        },
        {
            date: "2026-08-03",
            logs: [
                "나의 장수/전법 진영(국가)별 UI 원색 배경 제거 및 모던 컬러링 전면 개편",
                "안드로이드 모바일 브라우저 네비바(GNB) 스와이프 먹통 버그 완벽 픽스"
            ]
        },
        {
            date: "2026-08-02",
            logs: [
                "유저 배치 순서를 최적의 전/후열로 자동 재배열하는 스마트 포지셔닝 엔진 탑재",
                "대체 무장 추천 시 '가후'만 무지성 리턴하던 하드코딩 버그 수정",
                "로컬 백업(저장/불러오기) 기능 추가 및 전체 테마 동기화"
            ]
        }
    ];

    function injectGlobalNavbarEngine() {
        const oldStyles = document.getElementById('dynamic-navbar-styles');
        if (oldStyles) oldStyles.remove();

        document.head.insertAdjacentHTML('beforeend', `
            <style id="dynamic-navbar-styles">
                :root {
                    --bg-main: #111827; --bg-panel: #1f2937; --bg-card: #111827; --bg-inner: #0f172a; --bg-input: #1e293b; --bg-header: #151515; --bg-nav: #2b1a1a;    
                    --text-main: #f8fafc; --text-desc: #cbd5e1; --text-muted: #94a3b8; --text-highlight: #feca57; --text-accent: #38bdf8;
                    --border-main: #374151; --border-input: #475569; --border-accent: #cd9b33;
                    --unowned-bg: #2d3748; --unowned-border: #4a5568; --unowned-text: #a0aec0;
                    --nav-text: #bbbbbb; --nav-hover: #ffffff; --nav-active-bg: #1c1111; --nav-active-text: #ffcc00;
                    --success-text: #4ade80; --success-bg: rgba(74, 222, 128, 0.15);
                    --danger-text: #f87171; --danger-bg: rgba(248, 113, 113, 0.05);
                }
                
                [data-theme="light"] {
                    --bg-main: #f8fafc; --bg-panel: #ffffff; --bg-card: #f1f5f9; --bg-inner: #f1f5f9; --bg-input: #ffffff; --bg-header: #e2e8f0; --bg-nav: #1e293b; 
                    --text-main: #0f172a; --text-desc: #1e293b; --text-muted: #475569; --text-highlight: #d97706; --text-accent: #0284c7;
                    --border-main: #cbd5e1; --border-input: #94a3b8; --border-accent: #f59e0b;
                    --unowned-bg: #e2e8f0; --unowned-border: #94a3b8; --unowned-text: #64748b;
                    --nav-text: #94a3b8; --nav-hover: #ffffff; --nav-active-bg: #0f172a; --nav-active-text: #f59e0b;
                    --success-text: #15803d; --success-bg: rgba(34, 197, 94, 0.1);
                    --danger-text: #b91c1c; --danger-bg: rgba(220, 38, 38, 0.05);
                }
                
                body { background-color: var(--bg-main) !important; color: var(--text-main) !important; transition: background-color 0.3s, color 0.3s; }
                .section-box, .guide-content-area, aside, .deck-card, .info-card, .data-table-wrapper { background-color: var(--bg-panel) !important; border-color: var(--border-main) !important; transition: background-color 0.3s, border-color 0.3s; }
                
                .info-card { color: var(--text-desc) !important; line-height: 1.6; }
                .info-card p, .info-card ul, .info-card li, .info-card span, .info-card div { color: var(--text-desc) !important; }
                .info-card strong, .info-card b { color: var(--text-main) !important; font-weight: bold; }
                .info-card h3, .guide-section-title { color: var(--text-main) !important; font-weight: bold; }
                
                .officer-slot { background-color: var(--bg-inner) !important; border: 1px solid var(--border-main) !important; border-radius: 6px; padding: 10px; }
                .filter-btn, .faction-btn, .group-btn, .tier-btn { background-color: var(--bg-input) !important; color: var(--text-muted) !important; border: 1px solid var(--border-main) !important; transition: background-color 0.3s, color 0.3s; }
                .filter-btn.active, .faction-btn.active, .group-btn.active, .tier-btn.active { background-color: var(--text-main) !important; color: var(--bg-main) !important; }
                
                table, .data-table { border-color: var(--border-main) !important; background-color: var(--bg-panel) !important; width: 100%; border-collapse: collapse; }
                th, .data-table th { background-color: var(--bg-header) !important; color: var(--text-main) !important; border-color: var(--border-main) !important; font-weight: bold; text-align: left; padding: 10px; }
                td, .data-table td { background-color: var(--bg-panel) !important; color: var(--text-desc) !important; border-color: var(--border-main) !important; padding: 10px; border-bottom: 1px solid var(--border-main); }
                tr:nth-child(even) td, .data-table tr:nth-child(even) td { background-color: var(--bg-inner) !important; }
                
                [style*="background: #111"], [style*="background-color: #111"], [style*="background: #1a1"], [style*="background-color: #1a1"], [style*="background: #0f1"], [style*="background-color: #0f1"], [style*="background: #1e2"], [style*="background-color: #1e2"] { background-color: var(--bg-inner) !important; }

                .top-title-header { background-color: var(--bg-header) !important; border-bottom: 1px solid var(--border-main) !important; }
                .top-title-header h1 { color: var(--text-main) !important; }
                .author-text { color: var(--text-muted) !important; }
                
                .global-nav-bar { 
                    background-color: var(--bg-nav) !important; 
                    border-bottom: 2px solid var(--border-accent) !important; 
                    display: flex !important; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 0 15px; 
                    min-height: 52px !important; 
                    flex-wrap: nowrap !important; 
                    width: 100% !important; 
                    box-sizing: border-box !important;
                    flex-shrink: 0 !important;
                    position: relative;
                    z-index: 9999;
                    overflow-y: hidden !important; 
                    overflow-x: auto !important; 
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                }
                .global-nav-bar::-webkit-scrollbar { display: none !important; }
                
                .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; align-items: center; flex-wrap: nowrap; }
                .nav-menu-item { flex-shrink: 0; }
                .nav-menu-item a { display: block; color: var(--nav-text) !important; text-decoration: none; padding: 14px 20px; font-size: 13.5px; font-weight: bold; white-space: nowrap; transition: color 0.2s; }
                .nav-menu-item:hover a { color: var(--nav-hover) !important; }
                .nav-menu-item.active { background-color: var(--nav-active-bg) !important; border-bottom: 3px solid var(--border-accent) !important; }
                .nav-menu-item.active a { color: var(--nav-active-text) !important; }
                
                .nav-actions-container { display: flex; align-items: center; gap: 8px; padding: 6px 0; margin-left: auto; flex-shrink: 0; }
                .header-history-btn, .header-sync-btn { border-radius: 4px; padding: 8px 14px !important; cursor: pointer; border: none; font-weight: bold; font-size: 13px; transition: background-color 0.2s; white-space: nowrap; flex-shrink: 0; }
                .header-history-btn { background: #6366f1; color: #ffffff !important; }
                .header-history-btn:hover { background: #4f46e5; }
                .header-sync-btn { background: #f97316; color: #ffffff !important; }
                .header-sync-btn.sync-on { background: #10b981 !important; } 

                @media (max-width: 850px) {
                    .global-nav-bar { justify-content: flex-start; -webkit-overflow-scrolling: touch; }
                    .nav-actions-container { margin-left: 20px; padding-right: 15px; }
                }
                
                #global-theme-toggle { position: fixed; bottom: 25px; right: 25px; width: 50px; height: 50px; border-radius: 50%; background-color: var(--text-main); color: var(--bg-main); border: 2px solid var(--border-main); box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer; font-size: 22px; display: flex; align-items: center; justify-content: center; z-index: 10000; transition: transform 0.2s; }
                #global-theme-toggle:hover { transform: scale(1.1) rotate(15deg); }
                .history-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); display: none; justify-content: center; align-items: center; z-index: 20000; backdrop-filter: blur(3px); }
                
                /* 🚨 [핵심 교정] 히스토리 모달 높이 고정 및 스크롤바 디자인 추가 */
                .history-modal { background: var(--bg-panel); border: 1px solid var(--border-main); border-radius: 8px; width: 90%; max-width: 600px; height: 70vh; min-height: 400px; max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 10px 25px rgba(0,0,0,0.5); overflow: hidden; }
                .history-modal-header { padding: 15px 20px; border-bottom: 1px solid var(--border-main); display: flex; justify-content: space-between; align-items: center; background: var(--bg-header); flex-shrink: 0; }
                .history-modal-header h2 { margin: 0; font-size: 18px; color: var(--text-main); }
                .history-modal-close { background: none; border: none; color: var(--text-muted); font-size: 20px; cursor: pointer; padding: 0; transition: color 0.2s; }
                .history-modal-close:hover { color: var(--danger-text); }
                .history-modal-body { padding: 20px; overflow-y: auto; color: var(--text-desc); font-size: 13px; line-height: 1.6; flex-grow: 1; }
                
                /* 🚨 웹킷 기반 커스텀 스크롤바 주입 (테마 연동) */
                .history-modal-body::-webkit-scrollbar { width: 8px; }
                .history-modal-body::-webkit-scrollbar-track { background: var(--bg-inner); border-radius: 4px; }
                .history-modal-body::-webkit-scrollbar-thumb { background: var(--border-input); border-radius: 4px; border: 1px solid var(--bg-inner); }
                .history-modal-body::-webkit-scrollbar-thumb:hover { background: var(--border-main); }

                .history-block { margin-bottom: 20px; }
                .history-block:last-child { margin-bottom: 0; }
                .history-date { font-weight: bold; color: var(--text-highlight); margin-bottom: 8px; font-size: 14px; border-bottom: 1px dashed var(--border-main); padding-bottom: 4px; }
                .history-list { margin: 0; padding-left: 20px; }
                .history-list li { margin-bottom: 6px; }
            </style>
        `);

        const existingNav = document.getElementById('dynamic-global-nav-bar');
        if (existingNav) existingNav.remove();

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
        
        const cachedSyncEmail = localStorage.getItem('samguk_sync_email');
        const syncBtnClass = cachedSyncEmail ? 'sync-on' : '';
        const syncBtnText = cachedSyncEmail ? `☁️ 동기화 ON (${cachedSyncEmail.split('@')[0]})` : `☁️ 구글 계정 동기화 (OFF)`;

        const navHtml = `
            <nav id="dynamic-global-nav-bar" class="global-nav-bar">
                <ul class="nav-menu-list">
                    ${globalMenuItems.map(item => `
                        <li class="nav-menu-item ${currentFile.trim() === item.url.trim() ? 'active' : ''}">
                            <a href="${item.url}">${item.name}</a>
                        </li>`).join('')}
                </ul>
                <div class="nav-actions-container">
                    <button id="global-history-btn" class="action-btn header-history-btn" onclick="window.toggleHistoryModal()">📜 패치 히스토리</button>
                    <button id="global-google-sync-btn" class="action-btn header-sync-btn ${syncBtnClass}" onclick="window.executeGoogleSync(event)">${syncBtnText}</button>
                </div>
            </nav>
        `;

        let target = document.querySelector('.top-title-header') || document.querySelector('header');
        if (!target) {
            const h1El = document.querySelector('h1');
            if (h1El) target = h1El.parentElement; 
        }

        if (target) {
            target.insertAdjacentHTML('afterend', navHtml);
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHtml);
        }

        const existingThemeBtn = document.getElementById('global-theme-toggle');
        if (existingThemeBtn) existingThemeBtn.remove();
        document.body.insertAdjacentHTML('beforeend', `<button id="global-theme-toggle" title="테마 변경">${savedTheme === 'light' ? '🌙' : '☀️'}</button>`);
        document.getElementById('global-theme-toggle').addEventListener('click', function() {
            const root = document.documentElement;
            const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', newTheme);
            this.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
            localStorage.setItem('samguk_theme', newTheme);
        });
        
        const existingModal = document.getElementById('history-modal-overlay');
        if (existingModal) existingModal.remove();
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    } else {
        injectGlobalNavbarEngine();
    }
})();

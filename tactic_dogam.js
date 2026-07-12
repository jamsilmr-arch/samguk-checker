console.log("[시스템 분석] tactic_dogam.js 전법 도감 마스터 허브 및 브릿지 엔진 기동");

// ==========================================================================
// LAYER 1: 전법 마스터 데이터베이스 구역 (deck_core.js에서 완전 이관됨)
// ==========================================================================
const coreAllTacticsList = [
    "가정지전", "강유겸제", "견불가최", "견진연봉", "공기불비", "과하탁교", "교취호탈", "극적제승", "금낭묘계", "금적금왕", "금창신", "금철교명", "기문둔갑", "낙정하석", "동구적개", "동장철벽", "동촉기선", "만부막적", "만전제발", "만천과해", "문치무공", "미우주무", "반객위주", "병량촌단", "분성지계", "비사주석", "사면초가", "사생취의", "선등함진", "수상개화", "순수견양", "심모원려", "안영찰채", "암전난방", "양의화생", "양초선행", "여자동포", "요사여신", "용맹무쌍", "용왕직전", "운주유악", "원성재도", "위위구조", "유좌유용", "이간계", "이아환아", "이일대로", "이퇴위진", "일고작기", "인세이도", "전위위안", "제곤부위", "중정기고", "지인선임", "진퇴유도", "진화타겁", "질풍노도", "천리추격", "천시지리", "체천행도", "축세대발", "축호과간", "태청단경", "토적격문", "현호제세", "호령삼군", "혼수모어", "홍수첨향", "화소적벽", "횡소천군", "횡징폭렴", "휴양생식"
];

// ==========================================================================
// LAYER 2: deck_core.js 연동을 위한 전역 API 브릿지 개방 구역
// ==========================================================================
window.getAllTacticsFromDogam = function() {
    return [...coreAllTacticsList].sort((a, b) => a.localeCompare(b, 'ko'));
};

// ==========================================================================
// LAYER 3: 도감 UI 렌더링 및 LocalStorage 데이터 관리 구역
// ==========================================================================
let currentTacticState = [];

function loadTacticData() {
    const defaultNames = [...coreAllTacticsList].sort((a, b) => a.localeCompare(b, 'ko'));
    let savedTactics = [];
    
    try {
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) {
            const parsed = JSON.parse(rawData);
            if (parsed && Array.isArray(parsed.tactics)) {
                savedTactics = parsed.tactics;
            }
        }
    } catch (e) {
        console.error("전법 도감 데이터 로드 실패:", e);
    }

    currentTacticState = defaultNames.map(name => {
        const found = savedTactics.find(t => t.name === name);
        return {
            name: name,
            isOwned: found ? !!found.isOwned : false
        };
    });
}

function saveTacticData() {
    try {
        let rootData = { heroes: [], tactics: [] };
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) {
            rootData = JSON.parse(rawData);
        }
        
        // 기존 heroes 배열은 보존하고 tactics 배열만 병합(Merge) 덮어쓰기
        rootData.tactics = currentTacticState.map(t => ({
            name: t.name,
            isOwned: t.isOwned
        }));
        
        localStorage.setItem('samguk_hobby_data', JSON.stringify(rootData));
    } catch (e) {
        console.error("전법 도감 데이터 세이브 실패:", e);
    }
}

function toggleTacticOwnership(tacticName) {
    const target = currentTacticState.find(t => t.name === tacticName);
    if (target) {
        target.isOwned = !target.isOwned;
        saveTacticData();
        renderTacticDogamUI();
    }
}

function renderTacticDogamUI() {
    const container = document.getElementById('tactic-dogam-container');
    // 컨테이너가 없는 페이지에서는 UI 렌더링 루프 강제 종료
    if (!container) return; 

    container.innerHTML = '';
    
    const ownedCount = currentTacticState.filter(t => t.isOwned).length;
    const totalCount = currentTacticState.length;
    
    const headerHtml = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0;">전법 도감 마스터 보드</h2>
            <span style="color: #aaa; font-weight: bold;">보유율: <span style="color: #38bdf8;">${ownedCount}</span> / ${totalCount}</span>
        </div>
        <div class="tactic-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px;"></div>
    `;
    container.innerHTML = headerHtml;
    
    const gridContainer = container.querySelector('.tactic-grid');

    currentTacticState.forEach(tactic => {
        const card = document.createElement('div');
        card.style.cssText = `
            background-color: ${tactic.isOwned ? '#1c251d' : '#1a1a1a'};
            border: 1px solid ${tactic.isOwned ? '#28a745' : '#333'};
            border-radius: 6px;
            padding: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        `;
        
        if (!tactic.isOwned) {
            card.style.opacity = '0.5';
        }

        card.innerHTML = `
            <div style="font-size: 14px; font-weight: bold; color: ${tactic.isOwned ? '#fff' : '#888'};">${tactic.name}</div>
        `;

        card.addEventListener('click', () => toggleTacticOwnership(tactic.name));
        gridContainer.appendChild(card);
    });
}

function initTacticDogamEngine() {
    loadTacticData();
    renderTacticDogamUI();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTacticDogamEngine);
} else {
    initTacticDogamEngine();
}

console.log("[시스템 분석] tactic_dogam.js 마스터 허브 및 오토 UI 렌더링 엔진 기동");

// ==========================================================================
// LAYER 1: 전법 마스터 데이터베이스 구역
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
// LAYER 3: 도감 UI 강제 렌더링 및 데이터 세이브 구역
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
        if (rawData) rootData = JSON.parse(rawData);
        
        rootData.tactics = currentTacticState.map(t => ({ name: t.name, isOwned: t.isOwned }));
        localStorage.setItem('samguk_hobby_data', JSON.stringify(rootData));
    } catch (e) {
        console.error("전법 도감 세이브 실패:", e);
    }
}

function toggleTacticOwnership(tacticName) {
    const target = currentTacticState.find(t => t.name === tacticName);
    if (target) {
        target.isOwned = !target.isOwned;
        saveTacticData();
        renderTacticGrid();
    }
}

function renderTacticDogamUI() {
    let container = document.getElementById('tactic-dogam-container') || document.querySelector('.tactic-dogam-container');
    
    // HTML에 도화지가 없으면 강제로 DOM을 생성하여 부착
    if (!container) {
        container = document.createElement('div');
        container.id = 'tactic-dogam-container';
        container.style.padding = '20px 40px';
        container.style.maxWidth = '1400px';
        container.style.margin = '0 auto';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0; font-size: 22px;">전법 도감 마스터 보드</h2>
            <span id="tactic-count-badge" style="color: #aaa; font-weight: bold; font-size: 15px;">보유율: </span>
        </div>
        <div id="tactic-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px;"></div>
    `;
    
    renderTacticGrid();
}

function renderTacticGrid() {
    const gridContainer = document.getElementById('tactic-card-grid');
    const countBadge = document.getElementById('tactic-count-badge');
    if(!gridContainer) return;

    gridContainer.innerHTML = '';
    
    const ownedCount = currentTacticState.filter(t => t.isOwned).length;
    const totalCount = currentTacticState.length;
    
    if(countBadge) {
        countBadge.innerHTML = `보유율: <span style="color: #38bdf8; font-size: 18px;">${ownedCount}</span> / ${totalCount}`;
    }

    currentTacticState.forEach(tactic => {
        const card = document.createElement('div');
        card.style.cssText = `
            background-color: ${tactic.isOwned ? '#1c251d' : '#141414'};
            border: 1px solid ${tactic.isOwned ? '#28a745' : '#333'};
            border-radius: 6px;
            padding: 15px 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        `;
        
        if (!tactic.isOwned) {
            card.style.opacity = '0.5';
            card.style.filter = 'grayscale(100%)';
        }

        card.innerHTML = `<div style="font-size: 15px; font-weight: bold; color: ${tactic.isOwned ? '#fff' : '#888'};">${tactic.name}</div>`;
        card.addEventListener('click', () => toggleTacticOwnership(tactic.name));
        gridContainer.appendChild(card);
    });
}

function initTacticDogamEngine() {
    loadTacticData();
    setTimeout(renderTacticDogamUI, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTacticDogamEngine);
} else {
    initTacticDogamEngine();
}

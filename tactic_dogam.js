console.log("[시스템 분석] tactic_dogam.js 전법 그리드 가독성 최적화 및 성급(1~5성) DB 엔진 기동");

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
// LAYER 3: 도감 UI 강제 렌더링 및 성급 데이터 세이브 구역
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
            isOwned: found ? !!found.isOwned : false,
            star: (found && found.star) ? parseInt(found.star) : 1
        };
    });
}

function saveTacticData() {
    try {
        let rootData = { heroes: [], tactics: [] };
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) rootData = JSON.parse(rawData);
        
        rootData.tactics = currentTacticState.map(t => ({ name: t.name, isOwned: t.isOwned, star: t.star }));
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

// 이벤트 버블링 방지 및 전법 성급 개별 업데이트 로직
window.updateTacticStar = function(event, tacticName, starValue) {
    event.stopPropagation(); // 부모 DOM의 토글 이벤트를 강제 중단
    const target = currentTacticState.find(t => t.name === tacticName);
    if (target) {
        target.star = parseInt(starValue);
        saveTacticData();
    }
};

function renderTacticDogamUI() {
    let container = document.getElementById('tactic-dogam-container') || document.querySelector('.tactic-dogam-container');
    
    if (!container) {
        container = document.createElement('div');
        container.id = 'tactic-dogam-container';
        container.style.padding = '20px 40px';
        container.style.maxWidth = '1400px';
        container.style.margin = '0 auto';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0; font-size: 20px;">전법 도감 마스터 보드</h2>
            <span id="tactic-count-badge" style="color: #aaa; font-weight: bold; font-size: 14px;">보유율: </span>
        </div>
        <div id="tactic-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px;"></div>
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
        countBadge.innerHTML = `보유율: <span style="color: #38bdf8; font-size: 16px;">${ownedCount}</span> / ${totalCount}`;
    }

    currentTacticState.forEach(tactic => {
        const card = document.createElement('div');
        // 한눈에 여러 전법을 파악하기 좋은 콤팩트 그리드 디자인 채택
        card.style.cssText = `
            background-color: ${tactic.isOwned ? '#1c251d' : '#141414'};
            border: 1px solid ${tactic.isOwned ? '#28a745' : '#333'};
            border-radius: 6px;
            padding: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 75px;
        `;
        
        if (!tactic.isOwned) {
            card.style.opacity = '0.4';
            card.style.filter = 'grayscale(100%)';
        }

        const starSelectHtml = tactic.isOwned ? `
            <div style="margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
                <select onclick="event.stopPropagation();" onchange="updateTacticStar(event, '${tactic.name}', this.value)" style="width: 100%; padding: 4px; background: rgba(0,0,0,0.4); color: #feca57; border: 1px solid #555; border-radius: 4px; font-size: 11px; font-weight: bold; outline: none; cursor: pointer;">
                    <option value="1" ${tactic.star === 1 ? 'selected' : ''}>⭐ 1성</option>
                    <option value="2" ${tactic.star === 2 ? 'selected' : ''}>⭐⭐ 2성</option>
                    <option value="3" ${tactic.star === 3 ? 'selected' : ''}>⭐⭐⭐ 3성</option>
                    <option value="4" ${tactic.star === 4 ? 'selected' : ''}>⭐⭐⭐⭐ 4성</option>
                    <option value="5" ${tactic.star === 5 ? 'selected' : ''}>⭐⭐⭐⭐⭐ 5성</option>
                </select>
            </div>
        ` : '';

        card.innerHTML = `
            <div style="font-size: 14px; font-weight: bold; color: ${tactic.isOwned ? '#fff' : '#888'};">${tactic.name}</div>
            ${starSelectHtml}
        `;

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

console.log("[시스템 분석] dogam.js 장수 그리드 가독성 최적화 및 성급(1~5성) DB 엔진 기동");
console.log("[시스템 분석] dogam.js 장수 도감 마스터 허브 및 브릿지 엔진 기동");

// ==========================================================================
// LAYER 1: 무장 마스터 데이터베이스
// LAYER 1: 무장 마스터 데이터베이스 구역 (deck_core.js에서 완전 이관됨)
// ==========================================================================
const coreOfficerRoleMap = {
"조조": "지휘 (100%)", "순욱": "능동 (50%)", "곽가": "능동 (50%)", "장합": "지휘 (100%)", 
@@ -37,13 +37,6 @@ const coreOfficerUniqueTacticMap = {
"화타": "청낭제세", "장녕": "천의난위"
};

const coreOfficerFactionMap = {
    "조조": "위나라", "순욱": "위나라", "곽가": "위나라", "장합": "위나라", "하후돈": "위나라", "악진": "위나라", "전위": "위나라", "정욱": "위나라", "장료": "위나라", "사마의": "위나라", "하후연": "위나라", "조조(제왕)": "위나라", "가후": "위나라",
    "유비": "촉나라", "마대": "촉나라", "관우": "촉나라", "위연": "촉나라", "장비": "촉나라", "황충": "촉나라", "황월영": "촉나라", "제갈량": "촉나라", "유비(제왕)": "촉나라", "조운": "촉나라", "마초": "촉나라", "서서": "촉나라", "강유": "촉나라",
    "손권": "오나라", "손견": "오나라", "주유": "오나라", "대교": "오나라", "황개": "오나라", "여몽": "오나라", "육손": "오나라", "소교": "오나라", "손상향": "오나라", "육항": "오나라", "손책": "오나라", "제)손권": "오나라", "주태": "오나라", "정보": "오나라", "노숙": "오나라",
    "사마가": "군웅", "동탁": "군웅", "좌자": "군웅", "여포": "군웅", "우길": "군웅", "초선": "군웅", "안량": "군웅", "장각": "군웅", "원소": "군웅", "장보": "군웅", "채문희": "군웅", "화타": "군웅", "장녕": "군웅"
};

// ==========================================================================
// LAYER 2: deck_core.js 연동을 위한 전역 API 브릿지 개방 구역
// ==========================================================================
@@ -59,10 +52,9 @@ window.getOfficerDataFromDogam = function(officerName) {
};

// ==========================================================================
// LAYER 3: 도감 UI 강제 렌더링 및 성급(Star) 데이터 병합 구역
// LAYER 3: 도감 UI 렌더링 및 LocalStorage 데이터 관리 구역
// ==========================================================================
let currentDogamState = [];
let currentFactionFilter = '전체';

function loadDogamData() {
const defaultNames = Object.keys(coreOfficerRoleMap).sort((a, b) => a.localeCompare(b, 'ko'));
@@ -84,9 +76,7 @@ function loadDogamData() {
const found = savedHeroes.find(h => h.name === name);
return {
name: name,
            faction: coreOfficerFactionMap[name] || "기타",
isOwned: found ? !!found.isOwned : false,
            star: (found && found.star) ? parseInt(found.star) : 1, // 성급 파싱 (기본 1성)
role: coreOfficerRoleMap[name],
tactic: coreOfficerUniqueTacticMap[name]
};
@@ -97,13 +87,19 @@ function saveDogamData() {
try {
let rootData = { heroes: [], tactics: [] };
const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) rootData = JSON.parse(rawData);
        if (rawData) {
            rootData = JSON.parse(rawData);
        }
        
        // 기존 tactics 배열은 보존하고 heroes 배열만 병합(Merge) 덮어쓰기
        rootData.heroes = currentDogamState.map(h => ({
            name: h.name,
            isOwned: h.isOwned
        }));

        // 보유 상태와 성급(star) 데이터를 동시에 직렬화하여 저장
        rootData.heroes = currentDogamState.map(h => ({ name: h.name, isOwned: h.isOwned, star: h.star }));
localStorage.setItem('samguk_hobby_data', JSON.stringify(rootData));
} catch (e) {
        console.error("장수 도감 세이브 실패:", e);
        console.error("장수 도감 데이터 세이브 실패:", e);
}
}

@@ -112,137 +108,56 @@ function toggleOfficerOwnership(officerName) {
if (target) {
target.isOwned = !target.isOwned;
saveDogamData();
        renderDogamGrid(); 
        renderDogamUI();
}
}

// 이벤트 버블링을 방지하며 성급만 변경하는 오토 핸들러
window.updateOfficerStar = function(event, officerName, starValue) {
    event.stopPropagation(); // 카드 토글 클릭 이벤트 차단
    const target = currentDogamState.find(h => h.name === officerName);
    if (target) {
        target.star = parseInt(starValue);
        saveDogamData();
    }
};
function renderDogamUI() {
    const container = document.getElementById('dogam-container');
    // 컨테이너가 없는 페이지(예: 덱 편성창)에서는 UI 렌더링 루프를 강제 종료하여 에러 방어
    if (!container) return; 

function bindFilterButtons() {
    const buttons = document.querySelectorAll('button');
    const filterKeywords = ['전체', '위나라', '촉나라', '오나라', '군웅'];
    container.innerHTML = '';

    buttons.forEach(btn => {
        const txt = btn.innerText.trim();
        if (filterKeywords.includes(txt)) {
            btn.style.cursor = 'pointer';
            btn.onclick = (e) => {
                currentFactionFilter = txt;
                buttons.forEach(b => {
                    if(filterKeywords.includes(b.innerText.trim())) {
                        b.style.backgroundColor = 'transparent';
                        b.style.color = '#888';
                        b.style.border = '1px solid #444';
                    }
                });
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#000';
                
                renderDogamGrid();
            };
        }
    });
}

function renderDogamUI() {
    let container = document.getElementById('dogam-container') || document.querySelector('.dogam-container');
    const ownedCount = currentDogamState.filter(h => h.isOwned).length;
    const totalCount = currentDogamState.length;

    if (!container) {
        container = document.createElement('div');
        container.id = 'dogam-container';
        container.style.padding = '20px 40px';
        container.style.maxWidth = '1400px';
        container.style.margin = '0 auto';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <div id="dogam-stats-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0; font-size: 20px;">장수 도감 마스터 보드</h2>
            <span id="dogam-count-badge" style="color: #aaa; font-weight: bold; font-size: 14px;">보유율: </span>
    const headerHtml = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0;">장수 도감 마스터 보드</h2>
            <span style="color: #aaa; font-weight: bold;">보유율: <span style="color: #38bdf8;">${ownedCount}</span> / ${totalCount}</span>
       </div>
        <div id="dogam-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;"></div>
        <div class="dogam-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;"></div>
   `;
    container.innerHTML = headerHtml;

    bindFilterButtons();
    renderDogamGrid();
}

function renderDogamGrid() {
    const gridContainer = document.getElementById('dogam-card-grid');
    const countBadge = document.getElementById('dogam-count-badge');
    if(!gridContainer) return;
    const gridContainer = container.querySelector('.dogam-grid');

    gridContainer.innerHTML = '';
    
    const filteredHeroes = currentDogamState.filter(h => currentFactionFilter === '전체' || h.faction === currentFactionFilter);
    const ownedCount = filteredHeroes.filter(h => h.isOwned).length;
    const totalCount = filteredHeroes.length;
    
    if(countBadge) {
        countBadge.innerHTML = `[${currentFactionFilter}] 보유율: <span style="color: #38bdf8; font-size: 16px;">${ownedCount}</span> / ${totalCount}`;
    }

    filteredHeroes.forEach(hero => {
    currentDogamState.forEach(hero => {
const card = document.createElement('div');
        // 가독성 높은 다중 열 그리드를 위한 콤팩트 카드 디자인
card.style.cssText = `
            background-color: ${hero.isOwned ? '#1c251d' : '#141414'};
            background-color: ${hero.isOwned ? '#1c251d' : '#1a1a1a'};
           border: 1px solid ${hero.isOwned ? '#28a745' : '#333'};
           border-radius: 8px;
           padding: 15px;
           cursor: pointer;
           transition: all 0.2s ease;
           position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 120px;
            overflow: hidden;
       `;

if (!hero.isOwned) {
            card.style.opacity = '0.5';
            card.style.filter = 'grayscale(100%)';
            card.style.opacity = '0.6';
            card.style.filter = 'grayscale(80%)';
}

        let factionColor = "#aaa";
        if(hero.faction === '위나라') factionColor = "#3b82f6";
        if(hero.faction === '촉나라') factionColor = "#22c55e";
        if(hero.faction === '오나라') factionColor = "#ef4444";
        if(hero.faction === '군웅') factionColor = "#a855f7";

        // 보유 상태일 때만 렌더링되며, 클릭 시 카드 토글(버블링)을 막는 성급 드롭다운 UI
        const starSelectHtml = hero.isOwned ? `
            <div style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                <select onclick="event.stopPropagation();" onchange="updateOfficerStar(event, '${hero.name}', this.value)" style="width: 100%; padding: 4px 6px; background: rgba(0,0,0,0.4); color: #feca57; border: 1px solid #555; border-radius: 4px; font-size: 12px; font-weight: bold; outline: none; cursor: pointer;">
                    <option value="1" ${hero.star === 1 ? 'selected' : ''}>⭐ 1성 (기본)</option>
                    <option value="2" ${hero.star === 2 ? 'selected' : ''}>⭐⭐ 2성</option>
                    <option value="3" ${hero.star === 3 ? 'selected' : ''}>⭐⭐⭐ 3성</option>
                    <option value="4" ${hero.star === 4 ? 'selected' : ''}>⭐⭐⭐⭐ 4성</option>
                    <option value="5" ${hero.star === 5 ? 'selected' : ''}>⭐⭐⭐⭐⭐ 5성 (풀강)</option>
                </select>
            </div>
        ` : '';

card.innerHTML = `
            <div>
                <div style="font-size: 11px; font-weight: bold; color: ${factionColor}; margin-bottom: 4px;">[${hero.faction}]</div>
                <div style="font-size: 18px; font-weight: bold; color: ${hero.isOwned ? '#fff' : '#888'}; margin-bottom: 8px;">${hero.name}</div>
                <div style="font-size: 11px; color: #ccc; margin-bottom: 4px;">🎯 ${hero.role}</div>
                <div style="font-size: 11px; color: #cd9b33; font-weight: bold;">⭐ ${hero.tactic}</div>
                <div style="position: absolute; top: 12px; right: 12px; font-size: 10px; padding: 3px 6px; border-radius: 4px; background-color: ${hero.isOwned ? '#28a745' : '#333'}; color: ${hero.isOwned ? '#fff' : '#777'}; font-weight: bold;">
                    ${hero.isOwned ? '보유' : '미보유'}
                </div>
            <div style="font-size: 18px; font-weight: bold; color: ${hero.isOwned ? '#fff' : '#888'}; margin-bottom: 8px;">${hero.name}</div>
            <div style="font-size: 12px; color: #aaa; margin-bottom: 4px;">🎯 역할: ${hero.role}</div>
            <div style="font-size: 12px; color: #cd9b33;">⭐ 고유: ${hero.tactic}</div>
            <div style="position: absolute; top: 15px; right: 15px; font-size: 11px; padding: 3px 6px; border-radius: 4px; background-color: ${hero.isOwned ? '#28a745' : '#444'}; color: #fff; font-weight: bold;">
                ${hero.isOwned ? '보유' : '미보유'}
           </div>
            ${starSelectHtml}
       `;

card.addEventListener('click', () => toggleOfficerOwnership(hero.name));
@@ -252,7 +167,7 @@ function renderDogamGrid() {

function initDogamEngine() {
loadDogamData();
    setTimeout(renderDogamUI, 100); 
    renderDogamUI();
}

if (document.readyState === 'loading') {

console.log("[시스템 분석] dogam.js 마스터 데이터 허브 및 오토 UI 렌더링 엔진 기동");

// ==========================================================================
// LAYER 1: 무장 마스터 데이터베이스 (역할, 전법, 진영 3중 매핑 완결)
// ==========================================================================
const coreOfficerRoleMap = {
    "조조": "지휘 (100%)", "순욱": "능동 (50%)", "곽가": "능동 (50%)", "장합": "지휘 (100%)", 
    "하후돈": "패시브 (50%)", "악진": "능동 (70%)", "전위": "패시브 (100%)", "정욱": "추격 (50%)", 
    "장료": "패시브 (100%)", "사마의": "능동 (60%)", "하후연": "능동 (50%)", "조조(제왕)": "지휘 (100%)", 
    "가후": "능동 (65%)", "유비": "지휘 (100%)", "마대": "능동 (35%)", "관우": "능동 (50%)", 
    "위연": "패시브 (70%)", "장비": "패시브 (50%)", "사마가": "추격 (35%)", "황충": "패시브 (100%)", 
    "황월영": "지휘 (100%)", "제갈량": "지휘 (100%)", "유비(제왕)": "지휘 (100%)", "조운": "패시브 (100%)", 
    "마초": "패시브 (100%)", "서서": "지휘 (100%)", "강유": "추격 (50%)", "손권": "지휘 (100%)", 
    "손견": "지휘 (100%)", "주유": "패시브 (80%)", "대교": "지휘 (100%)", "황개": "능동 (50%)", 
    "여몽": "지휘 (100%)", "육손": "추격 (50%)", "소교": "능동 (70%)", "손상향": "능동 (50%)", 
    "육항": "능동 (60%)", "손책": "능동 (50%)", "제)손권": "지휘 (100%)", "주태": "지휘 (100%)", 
    "정보": "지휘 (100%)", "노숙": "지휘 (100%)", "동탁": "지휘 (100%)", "좌자": "패시브 (100%)", 
    "여포": "패시브 (100%)", "우길": "지휘 (70%)", "초선": "능동 (50%)", "안량": "능동 (50%)", 
    "장각": "능동 (50%)", "원소": "지휘 (100%)", "장보": "능동 (50%)", "채문희": "능동 (70%)", 
    "화타": "능동 (50%)", "장녕": "능동 (50%)"
};

const coreOfficerUniqueTacticMap = {
    "조조": "효웅", "순욱": "거중지중", "곽가": "산무유책", "장합": "교변병기", 
    "하후돈": "발시담정", "악진": "분용당선", "전위": "축호과간", "정욱": "십면매복", 
    "장료": "함진살적", "사마의": "응시낭고", "하후연": "충용", "조조(제왕)": "군령여산", 
    "가후": "경달권변", "유비": "인정", "마대": "습참", "관우": "무성", 
    "위연": "실병제위", "장비": "연인노호", "사마가": "만왕", "황충": "적혈도", 
    "황월영": "묘산천기", "제갈량": "초선차전", "유비(제왕)": "재주복주", "조운": "칠진칠출", 
    "마초": "출수법", "서서": "절절학문", "강유": "담대여두", "손권": "웅거", 
    "손견": "강동맹호", "주유": "봉화연천", "대교": "정수유심", "황개": "요원지화", 
    "여몽": "백의도강", "육손": "지변규려", "소교": "화용욕모", "손상향": "효희", 
    "육항": "청백충근", "손책": "강동패주", "제)손권": "겸권상계", "주태": "청라산개", 
    "정보": "칠척사모", "노숙": "탑상책", "동탁": "전권난정", "좌자": "화겁생기", 
    "여포": "천하무쌍", "우길": "태평경", "초선": "폐월", "안량": "효장", 
    "장각": "황천당립", "원소": "사소도", "장보": "요풍사기", "채문희": "비분시", 
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
window.getAllOfficerNamesFromDogam = function() {
    return Object.keys(coreOfficerRoleMap);
};

window.getOfficerDataFromDogam = function(officerName) {
    return {
        role: coreOfficerRoleMap[officerName] || "보조, 버퍼",
        uniqueTactic: coreOfficerUniqueTacticMap[officerName] || "고유 전법 누락"
    };
};

// ==========================================================================
// LAYER 3: 도감 UI 강제 렌더링 및 필터 오토 바인딩 구역
// ==========================================================================
let currentDogamState = [];
let currentFactionFilter = '전체';

function loadDogamData() {
    const defaultNames = Object.keys(coreOfficerRoleMap).sort((a, b) => a.localeCompare(b, 'ko'));
    let savedHeroes = [];
    
    try {
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) {
            const parsed = JSON.parse(rawData);
            if (parsed && Array.isArray(parsed.heroes)) {
                savedHeroes = parsed.heroes;
            }
        }
    } catch (e) {
        console.error("장수 도감 데이터 로드 실패:", e);
    }

    currentDogamState = defaultNames.map(name => {
        const found = savedHeroes.find(h => h.name === name);
        return {
            name: name,
            faction: coreOfficerFactionMap[name] || "기타",
            isOwned: found ? !!found.isOwned : false,
            role: coreOfficerRoleMap[name],
            tactic: coreOfficerUniqueTacticMap[name]
        };
    });
}

function saveDogamData() {
    try {
        let rootData = { heroes: [], tactics: [] };
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) rootData = JSON.parse(rawData);
        
        rootData.heroes = currentDogamState.map(h => ({ name: h.name, isOwned: h.isOwned }));
        localStorage.setItem('samguk_hobby_data', JSON.stringify(rootData));
    } catch (e) {
        console.error("장수 도감 세이브 실패:", e);
    }
}

function toggleOfficerOwnership(officerName) {
    const target = currentDogamState.find(h => h.name === officerName);
    if (target) {
        target.isOwned = !target.isOwned;
        saveDogamData();
        renderDogamGrid(); // 전체 렌더링 대신 그리드만 갱신
    }
}

// 필터 버튼을 자동으로 추적하여 클릭 이벤트를 강제 연결하는 오토 바인딩 엔진
function bindFilterButtons() {
    const buttons = document.querySelectorAll('button');
    const filterKeywords = ['전체', '위나라', '촉나라', '오나라', '군웅'];
    
    buttons.forEach(btn => {
        const txt = btn.innerText.trim();
        if (filterKeywords.includes(txt)) {
            btn.style.cursor = 'pointer';
            btn.onclick = (e) => {
                currentFactionFilter = txt;
                // 버튼 시각적 활성화 토글 (스크린샷 기반 CSS 강제 주입)
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

// 메인 렌더링 파이프라인 (컨테이너가 없으면 스스로 창조)
function renderDogamUI() {
    let container = document.getElementById('dogam-container') || document.querySelector('.dogam-container');
    
    // 타겟 DOM이 HTML에 존재하지 않으면 강제로 생성하여 문서 최하단에 부착
    if (!container) {
        container = document.createElement('div');
        container.id = 'dogam-container';
        container.style.padding = '20px 40px';
        container.style.maxWidth = '1400px';
        container.style.margin = '0 auto';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <div id="dogam-stats-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0; font-size: 22px;">장수 도감 마스터 보드</h2>
            <span id="dogam-count-badge" style="color: #aaa; font-weight: bold; font-size: 15px;">보유율: </span>
        </div>
        <div id="dogam-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 15px;"></div>
    `;
    
    bindFilterButtons();
    renderDogamGrid();
}

function renderDogamGrid() {
    const gridContainer = document.getElementById('dogam-card-grid');
    const countBadge = document.getElementById('dogam-count-badge');
    if(!gridContainer) return;

    gridContainer.innerHTML = '';
    
    const filteredHeroes = currentDogamState.filter(h => currentFactionFilter === '전체' || h.faction === currentFactionFilter);
    const ownedCount = filteredHeroes.filter(h => h.isOwned).length;
    const totalCount = filteredHeroes.length;
    
    if(countBadge) {
        countBadge.innerHTML = `[${currentFactionFilter}] 보유율: <span style="color: #38bdf8; font-size: 18px;">${ownedCount}</span> / ${totalCount}`;
    }

    filteredHeroes.forEach(hero => {
        const card = document.createElement('div');
        card.style.cssText = `
            background-color: ${hero.isOwned ? '#1c251d' : '#141414'};
            border: 1px solid ${hero.isOwned ? '#28a745' : '#333'};
            border-radius: 8px;
            padding: 18px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            box-shadow: ${hero.isOwned ? '0 0 10px rgba(40, 167, 69, 0.2)' : 'none'};
        `;
        
        if (!hero.isOwned) {
            card.style.opacity = '0.4';
            card.style.filter = 'grayscale(100%)';
        }

        let factionColor = "#aaa";
        if(hero.faction === '위나라') factionColor = "#3b82f6";
        if(hero.faction === '촉나라') factionColor = "#22c55e";
        if(hero.faction === '오나라') factionColor = "#ef4444";
        if(hero.faction === '군웅') factionColor = "#a855f7";

        card.innerHTML = `
            <div style="font-size: 11px; font-weight: bold; color: ${factionColor}; margin-bottom: 6px;">[${hero.faction}]</div>
            <div style="font-size: 20px; font-weight: bold; color: ${hero.isOwned ? '#fff' : '#888'}; margin-bottom: 12px; letter-spacing: 1px;">${hero.name}</div>
            <div style="font-size: 12px; color: #ccc; margin-bottom: 6px;">🎯 역할: ${hero.role}</div>
            <div style="font-size: 12px; color: #cd9b33; font-weight: bold;">⭐ 고유: ${hero.tactic}</div>
            <div style="position: absolute; top: 15px; right: 15px; font-size: 11px; padding: 4px 8px; border-radius: 4px; background-color: ${hero.isOwned ? '#28a745' : '#333'}; color: ${hero.isOwned ? '#fff' : '#777'}; font-weight: bold;">
                ${hero.isOwned ? '보유' : '미보유'}
            </div>
        `;

        card.addEventListener('click', () => toggleOfficerOwnership(hero.name));
        gridContainer.appendChild(card);
    });
}

function initDogamEngine() {
    loadDogamData();
    // DOM 트리가 완성된 후 UI 렌더링 강제 개시
    setTimeout(renderDogamUI, 100); 
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDogamEngine);
} else {
    initDogamEngine();
}

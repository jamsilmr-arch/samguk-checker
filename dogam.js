console.log("[시스템 분석] dogam.js 장수 도감 마스터 허브 및 브릿지 엔진 기동");

// ==========================================================================
// LAYER 1: 무장 마스터 데이터베이스 구역 (deck_core.js에서 완전 이관됨)
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
// LAYER 3: 도감 UI 렌더링 및 LocalStorage 데이터 관리 구역
// ==========================================================================
let currentDogamState = [];

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
        if (rawData) {
            rootData = JSON.parse(rawData);
        }
        
        // 기존 tactics 배열은 보존하고 heroes 배열만 병합(Merge) 덮어쓰기
        rootData.heroes = currentDogamState.map(h => ({
            name: h.name,
            isOwned: h.isOwned
        }));
        
        localStorage.setItem('samguk_hobby_data', JSON.stringify(rootData));
    } catch (e) {
        console.error("장수 도감 데이터 세이브 실패:", e);
    }
}

function toggleOfficerOwnership(officerName) {
    const target = currentDogamState.find(h => h.name === officerName);
    if (target) {
        target.isOwned = !target.isOwned;
        saveDogamData();
        renderDogamUI();
    }
}

function renderDogamUI() {
    const container = document.getElementById('dogam-container');
    // 컨테이너가 없는 페이지(예: 덱 편성창)에서는 UI 렌더링 루프를 강제 종료하여 에러 방어
    if (!container) return; 

    container.innerHTML = '';
    
    const ownedCount = currentDogamState.filter(h => h.isOwned).length;
    const totalCount = currentDogamState.length;
    
    const headerHtml = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0;">장수 도감 마스터 보드</h2>
            <span style="color: #aaa; font-weight: bold;">보유율: <span style="color: #38bdf8;">${ownedCount}</span> / ${totalCount}</span>
        </div>
        <div class="dogam-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;"></div>
    `;
    container.innerHTML = headerHtml;
    
    const gridContainer = container.querySelector('.dogam-grid');

    currentDogamState.forEach(hero => {
        const card = document.createElement('div');
        card.style.cssText = `
            background-color: ${hero.isOwned ? '#1c251d' : '#1a1a1a'};
            border: 1px solid ${hero.isOwned ? '#28a745' : '#333'};
            border-radius: 8px;
            padding: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
        `;
        
        if (!hero.isOwned) {
            card.style.opacity = '0.6';
            card.style.filter = 'grayscale(80%)';
        }

        card.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; color: ${hero.isOwned ? '#fff' : '#888'}; margin-bottom: 8px;">${hero.name}</div>
            <div style="font-size: 12px; color: #aaa; margin-bottom: 4px;">🎯 역할: ${hero.role}</div>
            <div style="font-size: 12px; color: #cd9b33;">⭐ 고유: ${hero.tactic}</div>
            <div style="position: absolute; top: 15px; right: 15px; font-size: 11px; padding: 3px 6px; border-radius: 4px; background-color: ${hero.isOwned ? '#28a745' : '#444'}; color: #fff; font-weight: bold;">
                ${hero.isOwned ? '보유' : '미보유'}
            </div>
        `;

        card.addEventListener('click', () => toggleOfficerOwnership(hero.name));
        gridContainer.appendChild(card);
    });
}

function initDogamEngine() {
    loadDogamData();
    renderDogamUI();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDogamEngine);
} else {
    initDogamEngine();
}

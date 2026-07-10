// 7종 공식 진형 효과 매핑 테이블
const formationEffects = {
    "일자진": "전열: 받는 피해 감소 6.0% | 후열: -",
    "구행진": "전열: 받는 피해 감소 5.0% | 후열: 가하는 피해 증가 12.0%",
    "추형진": "전열: 받는 피해 감소 6.0% | 후열: 가하는 피해 증가 8.0%",
    "기형진": "전열: 가하는 피해 증가 12.0% | 후열: 받는 피해 감소 5.0%",
    "어린진": "전열: 반격률 증가 20.0% | 후열: 받는 피해 감소 6.0%",
    "방원진": "전열: 받는 피해 감소 5.0% | 후열: 연격률 증가 28.0%",
    "안행진": "전열: 받는 피해 감소 5.0% | 후열: 강공 및 기습 증가 12.0%"
};

// 핵심 로직 추가: 요청하신 진형별 무장 전열/후열 위치 정밀 매핑 테이블
const formationPositions = {
    "일자진": ["front", "front", "front"],
    "구행진": ["front", "back", "front"],
    "추형진": ["back", "front", "back"],
    "기형진": ["back", "back", "front"],
    "어린진": ["front", "back", "back"],
    "방원진": ["front", "front", "back"],
    "안행진": ["back", "front", "front"]
};

// 54명 무장별 고유 역할 자동 맵핑 데이터 테이블 (스프레드시트 스펙 동기화)
const officerRoleMap = {
    "조조": "지휘 (100%)", "순욱": "능동 (50%)", "곽가": "능동 (50%)", "장합": "지휘 (100%)", 
    "하후돈": "패시브 (50%)", "악진": "능동 (70%)", "전위": "패시브 (100%)", "정욱": "추격 (50%)", 
    "장료": "패시브 (100%)", "사마의": "능동 (60%)", "하후연": "능동 (50%)", "제)조조": "지휘 (100%)", 
    "가후": "능동 (65%)", "유비": "지휘 (100%)", "마대": "능동 (35%)", "관우": "능동 (50%)", 
    "위연": "패시브 (70%)", "장비": "패시브 (50%)", "사마가": "추격 (35%)", "황충": "패시브 (100%)", 
    "황월영": "지휘 (100%)", "제갈량": "지휘 (100%)", "제)유비": "지휘 (100%)", "조운": "패시브 (100%)", 
    "마초": "패시브 (100%)", "서서": "지휘 (100%)", "강유": "추격 (50%)", "손권": "지휘 (100%)", 
    "손견": "지휘 (100%)", "주유": "패시브 (80%)", "대교": "지휘 (100%)", "황개": "능동 (50%)", 
    "여몽": "지휘 (100%)", "육손": "추격 (50%)", "소교": "능동 (70%)", "손상향": "능동 (50%)", 
    "육항": "능동 (60%)", "손책": "능동 (50%)", "제)손권": "지휘 (100%)", "주태": "지휘 (100%)", 
    "정보": "지휘 (100%)", "노숙": "지휘 (100%)", "동탁": "지휘 (100%)", "좌자": "패시브 (100%)", 
    "여포": "패시브 (100%)", "우길": "지휘 (70%)", "초선": "능동 (50%)", "안량": "능동 (50%)", 
    "장각": "능동 (50%)", "원소": "지휘 (100%)", "장보": "능동 (50%)", "채문희": "능동 (70%)", 
    "화타": "능동 (50%)", "장녕": "능동 (50%)"
};

// 26종 공식 인연 효과 자동 검증용 데이터 세트
const bondRules = [
    { name: "연환계", req: 3, heroes: ["동탁", "여포", "초선", "황충"], effect: "부대 내 인연 무장의 가하는 피해와 치유 효과 4% 증가, 해제 불가." },
    { name: "도법자연", req: 2, heroes: ["좌자", "장각", "우길"], effect: "부대 내 유대 무장의 모략과 공심 4% 상승, 해제 불가." },
    { name: "가모정세", req: 2, heroes: ["조조", "제)조조", "곽가"], effect: "부대 내 인연 무장의 가하는 모략 피해 4% 증가, 받는 무용 피해 4% 감소, 해제 불가." },
    { name: "위실주석", req: 2, heroes: ["하후돈", "하후연"], effect: "부대 내 인연 무장의 파갑 8% 증가, 해제 불가." },
    { name: "지계강동", req: 2, heroes: ["손견", "손책", "손권", "제)손권", "손상향"], effect: "부대 내 인연 무장의 첫 3년 주동 전법 발동률 4% 증가, 해제 불가." },
    { name: "고육지계", req: 2, heroes: ["주유", "황개"], effect: "부대 내 인연 무장은 2턴에 행동 시, 적군 1개 대상에게 화상을 부여(행동 시작 시 90% 모략 피해), 2턴 지속." },
    { name: "금슬화명", req: 2, heroes: ["주유", "소교"], effect: "부대 내 인연 무장의 모략 및 속도가 4% 상승하며, 해제할 수 없습니다." },
    { name: "주련벽합", req: 2, heroes: ["유비", "제)유비", "손상향"], effect: "부대 내 인연 무장이 받는 모략 피해 8% 감소, 해제 불가." },
    { name: "형향조두", req: 2, heroes: ["손책", "대교"], effect: "부대 내 인연 무장의 가하는 무용 피해 8% 증가, 해제 불가." },
    { name: "도원결의", req: 3, heroes: ["유비", "제)유비", "관우", "장비"], effect: "부대 내 인연 무장은 3, 6턴 시작 시 1중첩 저항을 획득." },
    { name: "백제탁고", req: 2, heroes: ["제갈량", "조운"], effect: "부대 내 인연 무장의 배반과 공심 8% 증가, 해제 불가." },
    { name: "와룡봉추", req: 2, heroes: ["제갈량", "황월영"], effect: "부대 내 인연 무장은 전투 첫 3턴 동안 받는 피해가 4% 감소, 해제 불가." },
    { name: "호소백문", req: 2, heroes: ["여포", "장료"], effect: "부대 내 인연 무장의 연격률 12% 증가, 해제 불가." },
    { name: "황천기의", req: 2, heroes: ["장각", "장보"], effect: "부대 내 인연 무장의 고략 6% 증가, 해제 불가." },
    { name: "호위경주", req: 2, heroes: ["조조", "제)조조", "전위"], effect: "부대 내 인연 무장의 무용과 통솔이 4% 증가하며, 해제할 수 없습니다." },
    { name: "오모신", req: 2, heroes: ["순욱", "정욱", "곽가", "가후"], effect: "부대 내 인연 무장의 기술 8% 증가, 해제 불가." },
    { name: "국지동량", req: 2, heroes: ["제갈량", "주유"], effect: "부대 내 인연 무장은 매번 행동 시, 35% 확률로 적군 1개 대상에게 45% 모략 피해." },
    { name: "군신상기", req: 2, heroes: ["조조", "제)조조", "사마의"], effect: "부대 내 인연 무장의 고략 및 공심이 4% 증가하며 해제 불가합니다." },
    { name: "오자양장", req: 2, heroes: ["장료", "악진", "장합"], effect: "부대 내 인연 무장은 첫 2회차 동안 배반이 18% 상승하며, 해제할 수 없습니다." },
    { name: "동오대도독", req: 2, heroes: ["주유", "육손", "여몽", "육항"], effect: "부대 내 인연 무장의 가하는 모략 피해 7% 증가, 해제 불가." },
    { name: "유한탁고", req: 2, heroes: ["손권", "제)손권", "육항"], effect: "부대 내 인연 무장이 선후 시작 시, 각성 1중첩 및 저항 1중첩을 획득합니다." },
    { name: "오호상장", req: 3, heroes: ["관우", "장비", "조운", "황충", "마초"], effect: "부대 내 인연 무장이 장공 8% 증가, 해제 불가." },
    { name: "서량철기", req: 2, heroes: ["마초", "마대"], effect: "부대 내 인연 무장의 무용 및 장공이 4% 증가하며 해제 불가합니다." },
    { name: "촉한사모", req: 2, heroes: ["제갈량", "서서"], effect: "부대 내 인연 무장의 모략 및 치료 효과 5% 상승, 해제 불가." },
    { name: "역사역부", req: 2, heroes: ["제갈량", "강유"], effect: "부대 내 인연 무장의 무용 및 모략 4% 상승, 해제 불가." },
    { name: "강동호신", req: 2, heroes: ["황개", "정보", "주태", "능통", "정봉"], effect: "부대 내 인연 무장의 통솔 7% 상승, 해제 불가." }
];

// 오리지널 초기 프리셋 정보
const defaultPresetDecks = [
    {
        title: "위무 방패병 [T0]", specialization: "방 득화", formation: "추형진",
        officers: [
            { name: "조조", recommendations: ["휴양생식", "교취호탈", "병량촌단"] },
            { name: "하후돈", recommendations: ["독구격퇴", "이아환아", "전불가퇴", "교취호탈"] },
            { name: "곽가", recommendations: ["요사여신", "공기불비", "낙정하석"] }
        ]
    },
    {
        title: "신속창·2 [T0]", specialization: "창 득화", formation: "기형진",
        officers: [
            { name: "장료", recommendations: ["만전제발", "사생취의", "강다"] },
            { name: "조조(제왕)", recommendations: ["형초풍패", "교취호탈", "병량촌단", "동장철벽"] },
            { name: "악진", recommendations: ["기문둔갑", "교취호탈", "병량촌단", "선등함진"] }
        ]
    }
];

let dynamicPresetDecks = [];

window.onload = function() {
    loadDeckTextData();
    renderDeckBuilder();
};

function loadDeckTextData() {
    const savedText = localStorage.getItem('samguk_deck_text');
    if (savedText) {
        dynamicPresetDecks = JSON.parse(savedText);
        dynamicPresetDecks.forEach((deck, idx) => {
            if (!deck.formation) {
                if (deck.footerLeft && deck.footerLeft.includes('|')) {
                    const parts = deck.footerLeft.split('|');
                    deck.specialization = parts[0].trim();
                    deck.formation = parts[1].trim();
                } else {
                    deck.specialization = deck.footerLeft || (idx === 0 ? "방 득화" : "창 득화");
                    deck.formation = idx === 0 ? "추형진" : "기형진";
                }
            }
        });
    } else {
        dynamicPresetDecks = JSON.parse(JSON.stringify(defaultPresetDecks));
    }
}

function saveEditedText(deckIdx, propertyName, element) {
    let textValue = element.innerText.trim();
    if (textValue.length === 0) {
        textValue = defaultPresetDecks[deckIdx][propertyName];
        element.innerText = textValue;
    }
    dynamicPresetDecks[deckIdx][propertyName] = textValue;
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
}

function changeFormation(deckIdx, selectElement) {
    dynamicPresetDecks[deckIdx].formation = selectElement.value;
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    renderDeckBuilder();
}

function changeOfficer(deckIdx, officerIdx, selectElement) {
    dynamicPresetDecks[deckIdx].officers[officerIdx].name = selectElement.value;
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    renderDeckBuilder(); 
}

function calculateActivatedBond(officers) {
    const currentOfficerNames = officers.map(o => o.name.trim());
    let matchedBonds = [];

    bondRules.forEach(rule => {
        const uniqueMatches = [...new Set(currentOfficerNames.filter(name => rule.heroes.includes(name)))];
        const totalMatches = currentOfficerNames.filter(name => rule.heroes.includes(name)).length;
        
        if (totalMatches >= rule.req && uniqueMatches.length >= (rule.req === 3 ? 2 : 1)) {
            matchedBonds.push(`<strong>[${rule.name}]</strong> ${rule.effect}`);
        }
    });

    return matchedBonds.length > 0 ? matchedBonds.join(" / ") : "활성화된 부대 인연 효과 없음";
}

function renderDeckBuilder() {
    const container = document.getElementById('deck-container');
    if (!container) return;
    container.innerHTML = '';

    const savedData = localStorage.getItem('samguk_hobby_data');
    let ownedTactics = [];

    if (savedData) {
        const parsed = JSON.parse(savedData);
        ownedTactics = parsed.tactics ? parsed.tactics.filter(x => x.isOwned).map(x => x.name) : [];
    }

    const sortedHeroNames = Object.keys(officerRoleMap).sort((a, b) => a.localeCompare(b, 'ko'));

    dynamicPresetDecks.forEach((deck, deckIdx) => {
        const deckCard = document.createElement('div');
        deckCard.className = 'deck-card';

        const computedBondText = calculateActivatedBond(deck.officers);

        // 핵심 로직 변경: 현재 부대의 진형명에 대응하는 포지션 배열을 실시간 추출 (매핑 실패 시 안전 폴백 작동)
        const currentPositions = formationPositions[deck.formation] || ["front", "front", "front"];

        let officersHtml = '';
        deck.officers.forEach((off, offIdx) => {
            let tacticRowsHtml = '';
            off.recommendations.forEach(recTactic => {
                const isOwned = ownedTactics.includes(recTactic);
                if (isOwned) {
                    tacticRowsHtml += `<div class="tactic-row owned"><span>✓ ${recTactic}</span><span>장착 완료</span></div>`;
                } else {
                    tacticRowsHtml += `<div class="tactic-row missing"><span>${recTactic}</span><span>미보유</span></div>`;
                }
            });

            // 핵심 로직 변경: 기존의 고정 배치 정보를 버리고, 진형 조건 테이블에서 도출된 인덱스 위치를 강제 동기화
            const currentPos = currentPositions[offIdx] || "front";
            const posLabel = currentPos === 'front' ? '전열' : '후열';
            const posClass = currentPos === 'front' ? 'front' : 'back';

            let officerOptionsHtml = '';
            sortedHeroNames.forEach(hName => {
                const isSelected = off.name === hName ? 'selected' : '';
                officerOptionsHtml += `<option value="${hName}" ${isSelected}>${hName}</option>`;
            });

            const currentComputedRole = officerRoleMap[off.name] || "보조, 버퍼";

            officersHtml += `
                <div class="officer-slot">
                    <div class="officer-meta">
                        <span class="position-badge ${posClass}">${posLabel}</span>
                        <div class="officer-select-container">
                            <select class="officer-dropdown" onchange="changeOfficer(${deckIdx}, ${offIdx}, this)">
                                ${officerOptionsHtml}
                            </select>
                        </div>
                    </div>
                    <div class="officer-role-label">${currentComputedRole}</div>
                    <div class="tactic-status-box">
                        ${tacticRowsHtml}
                    </div>
                </div>
            `;
        });

        let formationOptionsHtml = '';
        Object.keys(formationEffects).forEach(fName => {
            const isSelected = deck.formation === fName ? 'selected' : '';
            formationOptionsHtml += `<option value="${fName}" ${isSelected}>${fName}</option>`;
        });

        const currentEffectText = formationEffects[deck.formation] || formationEffects["추형진"];

        deckCard.innerHTML = `
            <div class="deck-title" contenteditable="true" onblur="saveEditedText(${deckIdx}, 'title', this)">${deck.title}</div>
            <div class="bond-box">
                <span class="bond-highlight">부대 인연 효과 :</span> 
                <span style="display:inline-block; outline:none;">${computedBondText}</span>
            </div>
            <div class="officers-row">
                ${officersHtml}
            </div>
            <div class="deck-footer-bar">
                <div class="footer-left">
                    <span contenteditable="true" onblur="saveEditedText(${deckIdx}, 'specialization', this)">${deck.specialization}</span>
                    <span style="color:#444; margin:0 8px;">|</span>
                    <select class="formation-select" onchange="changeFormation(${deckIdx}, this)">
                        ${formationOptionsHtml}
                    </select>
                </div>
                <div class="footer-right">${currentEffectText}</div>
            </div>
        `;
        container.appendChild(deckCard);
    });
}

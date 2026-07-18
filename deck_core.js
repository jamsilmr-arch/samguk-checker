console.log("[시스템 분석] deck_core.js 독자적 종결 덱 AI 연산 엔진 기동 (태사자, 감녕 데이터 전량 폐기 완료)");

// ==========================================================================
// LAYER 1: 독립형 마스터 자원 데이터베이스 및 전역 Set 분류기 
// ==========================================================================
const internalMasterOfficerUniqueTacticMap = {
    "가후": "경달권변", "곽가": "산무유책", "사마의": "응시낭고", "순욱": "거중지중",
    "악진": "분용당선", "전위": "축호과간", "정욱": "십면매복", "조조(제왕)": "군령여산",
    "조조": "효웅", "장료": "함진살적", "장합": "교변병기", "하후돈": "발시담정", "하후연": "충용",
    "관우": "무성", "강유": "담대여두", "마대": "습참", "마초": "출수법", "서서": "절절학문",
    "사마가": "만왕", "위연": "실병제위", "유비": "인정", "유비(제왕)": "재주복주",
    "장비": "연인노호", "제갈량": "초선차전", "조운": "칠진칠출", "황충": "적혈도",
    "황월영": "묘산천기", "대교": "정수유심", "노숙": "탑상책", "소교": "화용욕모",
    "손견": "강동맹호", "손권": "웅거", "손상향": "효희", "손책": "강동패주",
    "손권(제왕)": "겸권상계", "여몽": "백의도강", "육손": "지변규려", "육항": "청백충근",
    "주유": "봉화연천", "주태": "청라산개", "정보": "칠척사모", "황개": "요원지화",
    "채문희": "비분시", "장녕": "천의난위", "동탁": "전권난정", "여포": "천하무쌍",
    "초선": "폐월", "장각": "황천당립", "화타": "청낭제세", "장보": "요풍사기",
    "좌자": "화겁생기", "우길": "태평경", "안량": "효장", "원소": "사소도",
    "공손찬": "고유 전법 모름" // 태사자, 감녕 전량 폐기 조치
};

const internalMasterOfficerNames = Object.keys(internalMasterOfficerUniqueTacticMap).sort((a, b) => a.localeCompare(b, 'ko'));

const internalMasterTacticNames = [
    "가정지전", "강유겸제", "견불가최", "견진연봉", "공기불비", "과하탁교", "교취호탈", "극적제승", 
    "금낭묘계", "금적금왕", "금창신", "금철교명", "기문둔갑", "낙정하석", "동구적개", "동장철벽", 
    "동촉기선", "만부막적", "만전제발", "만천과해", "문치무공", "미우주무", "반객위주", "병량촌단", 
    "분성지계", "비사주석", "사면초가", "사생취의", "선등함진", "수상개화", "순수견양", "승승장구", "심모원려", 
    "안영찰채", "암전난방", "양의화생", "양초선행", "여자동포", "요사여신", "용맹무쌍", "용왕직전", 
    "운주유악", "원성재도", "위위구조", "유좌유용", "이간계", "이아환아", "이일대로", "이퇴위진", 
    "일고작기", "인세이도", "전위위안", "제곤부위", "중정기고", "지인선임", "진퇴유도", "진화타겁", 
    "질풍노도", "천리추격", "천시지리", "체천행도", "축세대발", "축호과간", "태청단경", "토적격문", 
    "파진최견", "현호제세", "호령삼군", "혼수모어", "홍수첨향", "화소적벽", "횡소천군", "횡징폭렴", "휴양생식", "사소도",
    "천하무적", "일기당천", "귀신정정"
].sort((a, b) => a.localeCompare(b, 'ko'));

const formationEffects = {
    "일자진": "전열: 받는 피해 감소 6.0% | 후열: -", "구행진": "전열: 받는 피해 감소 5.0% | 후열: 가하는 피해 증가 12.0%",
    "추형진": "전열: 받는 피해 감소 6.0% | 후열: 가하는 피해 증가 8.0%", "기형진": "전열: 가하는 피해 증가 12.0% | 후열: 받는 피해 감소 5.0%",
    "어린진": "전열: 반격률 증가 20.0% | 후열: 받는 피해 감소 6.0%", "방원진": "전열: 받는 피해 감소 5.0% | 후열: 연격률 증가 28.0%",
    "안행진": "전열: 받는 피해 감소 5.0% | 후열: 강공 및 기습 증가 12.0%", "호도진": "전열: 가하는 피해 증가 10.0% | 후열: 받는 피해 감소 6.0%"
};

const formationPositions = {
    "일자진": ["front", "front", "front"], "구행진": ["front", "back", "front"],
    "추형진": ["back", "front", "back"], "기형진": ["back", "back", "front"],
    "어린진": ["front", "back", "back"], "방원진": ["front", "front", "back"],
    "안행진": ["back", "front", "front"], "호도진": ["front", "back", "front"]
};

const unitMatchupMap = {
    "창병": { strong: "기병", weak: "궁병" },
    "기병": { strong: "방패병", weak: "창병" },
    "방패병": { strong: "궁병", weak: "기병" },
    "궁병": { strong: "창병", weak: "방패병" }
};

const internalBondRules = [
    { name: "연환계", req: 3, heroes: ["동탁", "여포", "초선", "황충"], effect: "부대 내 인연 무장을 가하는 피해와 치유 효과 4% 증가, 해제 불가." },
    { name: "도법자연", req: 2, heroes: ["좌자", "장각", "우길"], effect: "부대 내 유대 무장의 모략과 공심 4% 상승, 해제 불가." },
    { name: "가모정세", req: 2, heroes: ["조조", "조조(제왕)", "곽가"], effect: "부대 내 인연 무장의 가하는 모략 피해 4% 증가, 받는 무용 피해 4% 감소, 해제 불가." },
    { name: "위실주석", req: 2, heroes: ["하후돈", "하후연"], effect: "부대 내 인연 무장의 파갑 8% 증가, 해제 불가." },
    { name: "도원결의", req: 3, heroes: ["유비", "유비(제왕)", "관우", "장비"], effect: "부대 내 인연 무장은 3, 6턴 시작 시 1중첩 저항을 획득." },
    { name: "백제탁고", req: 2, heroes: ["제갈량", "조운"], effect: "부대 내 인연 무장의 배반 및 공심 8% 증가, 해제 불가." },
    { name: "오자양장", req: 2, heroes: ["장료", "악진", "장합"], effect: "부대 내 인연 무장은 첫 2회차 동안 배반이 18% 상승하며, 해제할 수 없습니다." },
    { name: "동오대도독", req: 2, heroes: ["주유", "육손", "여몽", "육항"], effect: "부대 내 인연 무장의 가하는 모략 피해 7% 증가, 해제 불가." },
    { name: "군신상기", req: 2, heroes: ["조조", "조조(제왕)", "사마의"], effect: "부대 내 인연 무장의 고략 및 공심이 4% 증가하며 해제 불가합니다." }
];

const tacticalSet = new Set(["사마의", "순욱", "정욱", "가후", "곽가", "제갈량", "서서", "강유", "황월영", "육손", "주유", "육항", "노숙", "대교", "소교", "장각", "우길", "좌자", "화타", "채문희", "초선", "장녕", "장보"]);
const supportSet = new Set(["조조", "조조(제왕)", "유비", "유비(제왕)", "손권", "손권(제왕)", "화타", "좌자", "채문희", "노숙", "원소", "동탁"]);
const shieldSet = new Set(["장비", "조조", "조조(제왕)", "유비", "유비(제왕)", "전위", "동탁", "장각", "사마의", "손견"]);
// 태사자 데이터 제거, 공손찬 유지
const cavSet = new Set(["마초", "장료", "하후돈", "하후연", "여포", "서서", "곽가", "정욱", "가후", "손상향", "원소", "악진", "공손찬"]);
// 감녕 데이터 제거, 공손찬 유지
const bowSet = new Set(["황충", "강유", "제갈량", "육손", "주유", "원소", "황월영", "육항", "우길", "초선", "장보", "장녕", "손권", "노숙", "좌자", "공손찬"]);

// 기본 제공되는 빈 프리셋 덱
const defaultPresetDecks = Array.from({ length: 5 }, (_, i) => ({
    title: `${i + 1}군 (커스텀 덱)`,
    formation: "추형진",
    unitType: "",
    officers: [
        { name: "", chosenTactics: ["", ""] },
        { name: "", chosenTactics: ["", ""] },
        { name: "", chosenTactics: ["", ""] }
    ]
}));

// ==========================================================================
// LAYER 2: 스마트 분류 엔진 인터페이스
// ==========================================================================
function getOfficerEquipment(officerName, deckUnitType = "방패병") {
    let damageAttr = "무용 피해 가함"; 
    let accAttr1 = "무용 피해 가함";   
    if (tacticalSet.has(officerName)) { damageAttr = "모략 피해 가함"; accAttr1 = "모략 피해 가함"; }
    if (supportSet.has(officerName)) { damageAttr = "치유 효과 상승"; accAttr1 = "치유 효과 상승"; }

    return { 
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "통솔 증가" }, 
        armor: { name: "명재복", attr1: "피해 감소", attr2: damageAttr }, 
        accessory: { name: "박산로", attr1: accAttr1, attr2: `${deckUnitType} 피해 감소` } 
    };
}

function getOfficerDogamData(officerName) {
    return { role: "지휘/능동/패시브", uniqueTactic: internalMasterOfficerUniqueTacticMap[officerName] || "고유 전법 누락" };
}

function getTacticListBridge() { return [...internalMasterTacticNames]; }
function getOfficerNamesBridge() { return [...internalMasterOfficerNames]; }

// ==========================================================================
// LAYER 3: 독자적 덱 연산 엔진 (커스텀 밸런스 및 완성도 평가)
// ==========================================================================
function calculateStrictDeckScore(deck) {
    if (!deck?.officers || !Array.isArray(deck.officers)) return 0;
    
    let score = 100;
    let officerCount = 0;
    let roles = { magic: 0, physical: 0, support: 0, shield: 0 };
    const curNamesClean = [];

    // 장수 및 전법 장착 상태 평가
    deck.officers.forEach(off => {
        const name = off?.name?.toString().trim().replace(/\s+/g, '') || "";
        if (!name) { 
            score -= 25; // 빈 장수 슬롯 페널티
            return; 
        }
        
        officerCount++;
        curNamesClean.push(name);

        // 역할군 판별
        if (tacticalSet.has(name)) roles.magic++;
        if (supportSet.has(name)) roles.support++;
        if (shieldSet.has(name)) roles.shield++;
        if (cavSet.has(name) && !tacticalSet.has(name)) roles.physical++;

        // 전법 완성도 평가
        off.chosenTactics?.forEach(tac => {
            if (!tac || tac.toString().trim() === "") score -= 10; // 빈 전법 슬롯 페널티
        });
    });

    if (officerCount === 0) return 0;

    // 공방 밸런스 페널티 계산
    const hasDamageDealer = (roles.magic > 0 || roles.physical > 0);
    const hasSustain = (roles.support > 0 || roles.shield > 0);
    
    // 예외: 인연 시너지가 있거나 극단적 코어가 있다면 밸런스 페널티 완화
    const matchedBonds = internalBondRules.filter(rule => {
        const matchCount = curNamesClean.filter(n => rule.heroes.includes(n)).length;
        return matchCount >= rule.req;
    });

    const isExtremeMeta = curNamesClean.includes("여포") || curNamesClean.includes("장료");

    if (!hasDamageDealer) score -= 15;
    if (!hasSustain && !isExtremeMeta && matchedBonds.length === 0) score -= 15;

    // 인연 시너지 보너스
    if (matchedBonds.length > 0) score += 10;

    return Math.min(100, Math.max(0, score));
}

function generateStructuredFeedback(deck, heroDataMap, tacticDataMap) {
    const fb = { insight: "", logs: [] };
    if (!deck?.officers || !Array.isArray(deck.officers)) return fb;

    const curNames = deck.officers.map(o => o?.name?.toString().trim().replace(/\s+/g, '') || "").filter(Boolean);
    
    if (curNames.length === 0) {
        fb.logs.push({ type: 'info', text: `💡 <strong>AI 덱 빌딩 시스템:</strong> 장수를 슬롯에 배치하시면, 무장의 특성에 맞춰 최적의 파트너와 전법을 시스템이 자동으로 계산하여 제안합니다.` });
        return fb;
    }

    let roles = { magic: 0, physical: 0, support: 0, shield: 0 };
    curNames.forEach(name => {
        if (tacticalSet.has(name)) roles.magic++;
        if (supportSet.has(name)) roles.support++;
        if (shieldSet.has(name)) roles.shield++;
        if (cavSet.has(name) && !tacticalSet.has(name)) roles.physical++;
    });

    fb.logs.push({ type: 'info', text: `🎯 <strong>커스텀 분석 완료:</strong> 현재 조합은 [마법 딜러 ${roles.magic}명 / 물리 딜러 ${roles.physical}명 / 지원 및 탱커 ${roles.support + roles.shield}명] 구조입니다.` });

    const hasDamageDealer = (roles.magic > 0 || roles.physical > 0);
    const hasSustain = (roles.support > 0 || roles.shield > 0);

    if (!hasDamageDealer) fb.logs.push({ type: 'warning', text: `밸런스 경고: 주력 피해를 담당할 딜러(무용/모략)가 부족합니다. 화력 부족으로 장기전에서 불리해질 수 있습니다.` });
    if (!hasSustain && !curNames.includes("여포") && !curNames.includes("장료")) fb.logs.push({ type: 'warning', text: `밸런스 경고: 아군을 보호하거나 치료할 서포터/탱커가 부족합니다. 생존력 향상을 위해 진형을 수정하십시오.` });

    deck.officers.forEach((off, offIdx) => {
        if (!off) return;
        const hName = off.name?.toString().trim() || "";
        if (!hName) {
            fb.logs.push({ type: 'warning', text: `장수 배치: 빈 슬롯이 존재합니다. 부대의 완성도를 위해 장수를 추가 배치하십시오.` });
            return;
        }

        const heroInv = heroDataMap[hName] || { isOwned: false };
        if (!heroInv.isOwned) fb.logs.push({ type: 'warning', text: `자원 경고: [${hName}] 장수가 미보유 상태입니다.` });

        if (Array.isArray(off.chosenTactics)) {
            off.chosenTactics.forEach((tac, tIdx) => {
                const rawTac = tac?.toString().trim() || "";
                if (rawTac === "") {
                    let recommend = "일반 능동 전법";
                    if (tacticalSet.has(hName)) recommend = "모략(지력) 비례 피해 전법 (예: 사면초가)";
                    else if (supportSet.has(hName)) recommend = "치유 및 아군 버프 전법 (예: 휴양생식)";
                    else recommend = "무용(물리) 비례 피해 전법 (예: 일기당천)";
                    fb.logs.push({ type: 'warning', text: `전법 장착: [${hName}]의 ${tIdx + 2}번 슬롯이 비어있습니다. ➔ 권장: <strong>${recommend}</strong>` });
                } else if (!tacticDataMap[rawTac.replace(/\s+/g, '')]?.isOwned) {
                    fb.logs.push({ type: 'warning', text: `자원 부족: [${hName}]의 장착 전법 <strong>[${rawTac}]</strong>이 미보유 상태입니다.` });
                }
            });
        }
    });

    return fb;
}

function calculateActivatedBond(officers) {
    if (!officers || !Array.isArray(officers)) return "활성화된 부대 인연 효과 없음";
    const curNames = officers.map(o => o?.name?.toString().trim() || "").filter(Boolean);
    if (!curNames.length) return "활성화된 부대 인연 효과 없음";
    
    const matched = internalBondRules.filter(rule => {
        const matchCount = curNames.filter(n => rule.heroes.includes(n)).length;
        const uniqueCount = new Set(curNames.filter(n => rule.heroes.includes(n))).size;
        return matchCount >= rule.req && uniqueCount >= (rule.req === 3 ? 2 : 1);
    });
    
    return matched.length ? matched.map(r => `<strong>[${r.name}]</strong> ${r.effect}`).join(" / ") : "활성화된 부대 인연 효과 없음";
}

// ==========================================================================
// LAYER 4: State & UI 핸들러 구역
// ==========================================================================
let dynamicPresetDecks = [];

function loadDeckTextData() {
    try {
        const savedText = localStorage.getItem('samguk_deck_text');
        if (savedText) {
            const parsed = JSON.parse(savedText);
            if (Array.isArray(parsed) && parsed.length > 0) {
                dynamicPresetDecks = parsed.slice(0, 5);
                while (dynamicPresetDecks.length < 5) dynamicPresetDecks.push(JSON.parse(JSON.stringify(defaultPresetDecks[dynamicPresetDecks.length])));
                
                dynamicPresetDecks.forEach((deck, idx) => {
                    deck.originIdx = deck.originIdx ?? idx;
                    deck.title = deck.title || `${idx + 1}군`;
                    deck.formation = deck.formation || "추형진";
                    deck.unitType = deck.unitType || ""; 
                    deck.officers = deck.officers?.length ? deck.officers : JSON.parse(JSON.stringify(defaultPresetDecks[idx].officers));
                    
                    deck.officers.forEach((curOff) => {
                        curOff.name = curOff.name || "";
                        curOff.chosenTactics = Array.isArray(curOff.chosenTactics) ? curOff.chosenTactics : ["", ""];
                    });
                });
                return;
            }
        }
    } catch (e) { console.error("스토리지 파싱 에러:", e); }
    
    dynamicPresetDecks = JSON.parse(JSON.stringify(defaultPresetDecks));
    dynamicPresetDecks.forEach((d, idx) => d.originIdx = idx);
}

function updateDeckState(originIdx, prop, value, officerIdx = null, slotIdx = null) {
    const deck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (!deck) return;
    
    if (officerIdx !== null && slotIdx !== null) {
        deck.officers[officerIdx].chosenTactics[slotIdx] = value;
    } else if (officerIdx !== null) {
        deck.officers[officerIdx].name = value;
    } else if (prop === 'reset') {
        deck.formation = "추형진";
        deck.unitType = "";
        deck.officers.forEach(off => { off.name = ""; off.chosenTactics = ["", ""]; });
    } else {
        deck[prop] = value;
    }
    
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    renderDeckBuilder();
}

window.autoFixDeck = function(originIdx) {
    const deck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (!deck) return;

    let modified = false;
    deck.officers.forEach(off => {
        const name = off?.name?.toString().trim();
        if (!name) return;

        const isMagic = tacticalSet.has(name);
        const isSupport = supportSet.has(name);

        off.chosenTactics = off.chosenTactics.map((t, i) => {
            if (t && t.trim() !== "") return t;
            modified = true;
            // 역할군에 따른 1순위 범용 전법 할당
            if (isSupport) return i === 0 ? "군령여산" : "휴양생식";
            if (isMagic) return i === 0 ? "사면초가" : "혼수모어";
            return i === 0 ? "일기당천" : "만부막적";
        });
    });

    if (modified) {
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
        renderDeckBuilder();
        alert("[AI 최적화] 장수의 역할군(모략/물리/지원)을 분석하여 빈 슬롯에 권장 전법을 자동 배치했습니다.");
    } else {
        alert("[AI 진단] 이미 모든 전법 슬롯이 채워져 있어 자동 배치를 스킵합니다.");
    }
};

function renderDeckBuilder() {
    const container = document.getElementById('deck-container');
    if (!container) return;
    
    try {
        container.style.display = 'block'; 
        container.innerHTML = '';

        const savedData = localStorage.getItem('samguk_hobby_data');
        let heroDataMap = {}, tacticDataMap = {};

        if (savedData) {
            const parsed = JSON.parse(savedData);
            parsed?.heroes?.forEach(x => {
                if (x?.name) heroDataMap[x.name.toString().trim()] = { isOwned: !!x.isOwned };
            });
            parsed?.tactics?.forEach(x => {
                if (x?.name) tacticDataMap[x.name.toString().trim()] = { isOwned: !!x.isOwned };
            });
        }

        const sortedHeroNames = getOfficerNamesBridge();
        const globalTacticsList = getTacticListBridge();

        dynamicPresetDecks.forEach((deck) => {
            if (!deck) return;
            const deckCard = document.createElement('div');
            deckCard.className = 'deck-card';

            const currentComputedScore = calculateStrictDeckScore(deck);
            const curNamesClean = deck.officers.map(o => o?.name?.trim().replace(/\s+/g, '') || "").filter(Boolean);
            
            let deckUnitType = deck.unitType || "창병"; 

            let officersHtml = deck.officers.map((off, offIdx) => {
                if (!off) return '';
                const hName = off.name?.trim() || "";
                const cleanHName = hName.replace(/\s+/g, '');
                const isHeroOwned = heroDataMap[hName]?.isOwned || false;
                const officerDogamData = cleanHName ? getOfficerDogamData(hName) : null;

                let tacticRowsHtml = '';
                if (cleanHName && officerDogamData) {
                    const inherent = officerDogamData.uniqueTactic;
                    const isOwnTac = isHeroOwned || tacticDataMap[inherent.trim().replace(/\s+/g, '')]?.isOwned;
                    tacticRowsHtml += `<div class="tactic-row ${isOwnTac ? 'owned' : 'missing'}" style="border-left:3px solid #cd9b33;"><span>⭐ ${inherent} (고유)</span><span>${isOwnTac ? '보유중' : '미보유'}</span></div>`;
                } else {
                    tacticRowsHtml += `<div class="tactic-row missing" style="border-left:3px solid #555; background-color:rgba(255,255,255,0.02);"><span style="color:#666;">⭐ 고유 전법 (미배치)</span><span style="color:#666;">-</span></div>`;
                }

                off.chosenTactics?.forEach((tac, slotIdx) => {
                    const cleanTac = tac?.trim() || "";
                    const isOwnTac = tacticDataMap[cleanTac.replace(/\s+/g, '')]?.isOwned;
                    let dropdownOptionsHtml = `<option value="" ${cleanTac===""?'selected':''}>선택 안함</option>`;
                    globalTacticsList.forEach(t => { dropdownOptionsHtml += `<option value="${t}" ${cleanTac===t?'selected':''}>${t}</option>`; });
                    tacticRowsHtml += `<div class="tactic-row ${cleanTac===""?'missing':(isOwnTac?'owned':'missing')}" style="padding:4px 12px;"><select class="tactic-dropdown" onchange="updateDeckState(${deck.originIdx}, 'tac', this.value, ${offIdx}, ${slotIdx})">${dropdownOptionsHtml}</select><span class="tactic-status-text" style="${cleanTac===""?'color:#666;':''}">${cleanTac===""?'슬롯 비어있음':(isOwnTac?'장착 완료':'미보유')}</span></div>`;
                });

                const curPos = formationPositions[deck.formation]?.[offIdx] || "front";
                let officerOptionsHtml = `<option value="" ${cleanHName===""?'selected':''}>선택 안함</option>`;
                sortedHeroNames.forEach(h => { officerOptionsHtml += `<option value="${h}" ${hName===h?'selected':''}>${h}</option>`; });
                
                let eqHtml = '';
                if (cleanHName) {
                    const eq = getOfficerEquipment(hName, deckUnitType);
                    eqHtml = `<div class="equipment-recommendation-box" style="margin-top:8px; padding:8px 12px; background:rgba(0,0,0,0.2); border:1px solid #555; border-radius:4px; font-size:11px; text-align:left; line-height:1.6; color:#ddd;"><div style="color:#ff9f43; font-weight:bold; margin-bottom:4px;">🛠️ 권장 장비 세트</div><div>🪖 <strong>투구:</strong> <span style="color:#fff;">${eq.helmet.name}</span> (속성1: <span style="color:#28a745;">${eq.helmet.attr1}</span>, 속성2: <span style="color:#17a2b8;">${eq.helmet.attr2}</span>)</div><div>🛡️ <strong>갑옷:</strong> <span style="color:#fff;">${eq.armor.name}</span> (속성1: <span style="color:#28a745;">${eq.armor.attr1}</span>, 속성2: <span style="color:#17a2b8;">${eq.armor.attr2}</span>)</div><div>📿 <strong>장신구:</strong> <span style="color:#fff;">${eq.accessory.name}</span> (속성1: <span style="color:#28a745;">${eq.accessory.attr1}</span>, 속성2: <span style="color:#17a2b8;">${eq.accessory.attr2}</span>)</div></div>`;
                }

                return `<div class="officer-slot" style="${!cleanHName ? 'border:1px dashed #444; background-color:rgba(0,0,0,0.1);' : ''}"><div class="officer-meta"><span class="position-badge ${curPos}">${curPos==='front'?'전열':'후열'}</span><div class="officer-select-container"><select class="officer-dropdown" onchange="updateDeckState(${deck.originIdx}, 'off', this.value, ${offIdx})">${officerOptionsHtml}</select></div></div>${eqHtml}<div class="tactic-status-box" style="margin-top:8px;">${tacticRowsHtml}</div></div>`;
            }).join('');

            const fmtOptions = Object.keys(formationEffects).map(f => `<option value="${f}" ${deck.formation===f?'selected':''}>${f}</option>`).join('');
            
            const unitTypeOptionsHtml = ["자동 판별", "창병", "기병", "궁병", "방패병"]
                .map(u => `<option value="${u === '자동 판별' ? '' : u}" ${deck.unitType === (u === '자동 판별' ? '' : u) ? 'selected' : ''}>${u}</option>`)
                .join('');

            let matchupHtml = '';
            if (unitMatchupMap[deckUnitType]) {
                matchupHtml = `<span style="margin-left: 15px; font-size: 12px; color: #aaa; background: rgba(0,0,0,0.3); padding: 5px 10px; border-radius: 4px;">⚔️ 상성우위: <strong style="color: #28a745;">${unitMatchupMap[deckUnitType].strong}</strong> | ⚠️ 상성열위: <strong style="color: #dc3545;">${unitMatchupMap[deckUnitType].weak}</strong></span>`;
            }

            const fb = generateStructuredFeedback(deck, heroDataMap, tacticDataMap);
            let fbHtml = '';
            
            if (currentComputedScore === 100 && curNamesClean.length === 3) { 
                fbHtml = `<div class="feedback-item success">★ 시스템 진단 결과: 역할군 밸런스와 시너지가 완벽한 종결 덱 구성입니다.</div>`;
            } else {
                fbHtml = fb.logs.map(l => `<div class="feedback-item ${l.type === 'info' ? 'info' : (l.type === 'warning' ? 'warning' : 'success')}">${l.text}</div>`).join('');
            }

            deckCard.innerHTML = `
                <div class="deck-title" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <div>
                        <span contenteditable="true" onblur="updateDeckState(${deck.originIdx}, 'title', this.innerText.trim().replace(/\\s*\\[덱 완성도:\\s*\\d+점\\]/g, '') || '${deck.title}')" style="outline:none;">${deck.title}</span>
                        <span style="color:#38bdf8; font-size:13px; margin-left:12px; font-weight:bold; user-select:none;">[덱 완성도: ${currentComputedScore}점]</span>
                    </div>
                    <div>
                        <button class="auto-fix-btn" onclick="autoFixDeck(${deck.originIdx})" style="background-color:#8b5cf6; color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-size:12px; font-weight:bold; margin-right:5px;">✨ AI 자동 전법 배치</button>
                        <button class="reset-deck-btn" onclick="updateDeckState(${deck.originIdx}, 'reset')" style="background-color:#c82333; color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-size:12px; font-weight:bold;">부대 초기화</button>
                    </div>
                </div>
                <div class="bond-box"><span class="bond-highlight">부대 인연 효과 :</span> <span style="display:inline-block; outline:none;">${calculateActivatedBond(deck.officers)}</span></div>
                <div class="officers-row">${officersHtml}</div>
                <div class="feedback-container-box"><div class="feedback-header-title">📋 AI 커스텀 덱 밸런스 처방전</div><div class="feedback-list-wrapper">${fbHtml}</div></div>
                <div class="deck-footer-bar">
                    <div class="footer-left" style="display: flex; align-items: center;">
                        <select class="formation-select" onchange="updateDeckState(${deck.originIdx}, 'formation', this.value)">${fmtOptions}</select>
                        <select class="unit-type-select" style="margin-left: 8px; padding: 6px 10px; background-color: #2a2a2a; color: #feca57; border: 1px solid #555; border-radius: 4px; font-weight: bold; cursor: pointer; outline: none;" onchange="updateDeckState(${deck.originIdx}, 'unitType', this.value)">${unitTypeOptionsHtml}</select>
                        ${matchupHtml}
                    </div>
                    <div class="footer-right">${formationEffects[deck.formation] || formationEffects["추형진"]}</div>
                </div>
            `;
            container.appendChild(deckCard);
        });
    } catch(e) {
        container.style.display = 'block';
        container.innerHTML = `<div style="background-color:#ffe6e6; border:2px solid red; padding:20px; color:black; border-radius:8px; margin:20px;"><p>에러: ${e.message}</p></div>`;
    }
}

document.addEventListener('DOMContentLoaded', () => { loadDeckTextData(); renderDeckBuilder(); });

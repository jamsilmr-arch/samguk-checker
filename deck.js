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

// 7종 진형별 무장 전열/후열 위치 정밀 매핑 테이블
const formationPositions = {
    "일자진": ["front", "front", "front"],
    "구행진": ["front", "back", "front"],
    "추형진": ["back", "front", "back"],
    "기형진": ["back", "back", "front"],
    "어린진": ["front", "back", "back"],
    "방원진": ["front", "front", "back"],
    "안행진": ["back", "front", "front"]
};

// 54명 무장별 고유 역할 데이터 테이블
const officerRoleMap = {
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

// 무장별 고유 전법 1:1 매핑 데이터베이스
const officerUniqueTacticMap = {
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

// 가나다 순 정렬 72종 선택형 전법 풀
const allTacticsList = [
    "가정지전", "강유겸제", "견불가최", "견진연봉", "공기불비", "과하탁교", "교취호탈", "극적제승", "금낭묘계", "금적금왕", "금창신", "금철교명", "기문둔갑", "낙정하석", "동구적개", "동장철벽", "동촉기선", "만부막적", "만전제발", "만천과해", "문치무공", "미우주무", "반객위주", "병량촌단", "분성지계", "비사주석", "사면초가", "사생취의", "선등함진", "수상개화", "순수견양", "심모원려", "안영찰채", "암전난방", "양의화생", "양초선행", "여자동포", "요사여신", "용맹무쌍", "용왕직전", "운주유악", "원성재도", "위위구조", "유좌유용", "이간계", "이아환아", "이일대로", "이퇴위진", "일고작기", "인세이도", "전위위안", "제곤부위", "중정기고", "지인선임", "진퇴유도", "진화타겁", "질풍노도", "천리추격", "천시지리", "체천행도", "축세대발", "축호과간", "태청단경", "토적격문", "현호제세", "호령삼군", "혼수모어", "홍수첨향", "화소적벽", "횡소천군", "횡징폭렴", "휴양생식"
];

// 26종 공식 인연 효과 데이터 세트
const bondRules = [
    { name: "연환계", req: 3, heroes: ["동탁", "여포", "초선", "황충"], effect: "부대 내 인연 무장의 가하는 피해와 치유 효과 4% 증가, 해제 불가." },
    { name: "도법자연", req: 2, heroes: ["좌자", "장각", "우길"], effect: "부대 내 유대 무장의 모략과 공심 4% 상승, 해제 불가." },
    { name: "가모정세", req: 2, heroes: ["조조", "조조(제왕)", "곽가"], effect: "부대 내 인연 무장의 가하는 모략 피해 4% 증가, 받는 무용 피해 4% 감소, 해제 불가." },
    { name: "위실주석", req: 2, heroes: ["하후돈", "하후연"], effect: "부대 내 인연 무장의 파갑 8% 증가, 해제 불가." },
    { name: "지계강동", req: 2, heroes: ["손견", "손책", "손권", "제)손권", "손상향"], effect: "부대 내 인연 무장의 첫 3년 주동 전법 발동률 4% 증가, 해제 불가." },
    { name: "고육지계", req: 2, heroes: ["주유", "황개"], effect: "부대 내 인연 무장은 2턴에 행동 시, 적군 1개 대상에게 화상을 부여(행동 시작 시 90% 모략 피해), 2턴 지속." },
    { name: "금슬화명", req: 2, heroes: ["주유", "소교"], effect: "부대 내 인연 무장의 모략 및 속도가 4% 상승하며, 해제할 수 없습니다." },
    { name: "주련벽합", req: 2, heroes: ["유비", "유비(제왕)", "손상향"], effect: "부대 내 인연 무장이 받는 모략 피해 8% 감소, 해제 불가." },
    { name: "형향조두", req: 2, heroes: ["손책", "대교"], effect: "부대 내 인연 무장의 가하는 무용 피해 8% 증가, 해제 불가." },
    { name: "도원결의", req: 3, heroes: ["유비", "유비(제왕)", "관우", "장비"], effect: "부대 내 인연 무장은 3, 6턴 시작 시 1중첩 저항을 획득." },
    { name: "백제탁고", req: 2, heroes: ["제갈량", "조운"], effect: "부대 내 인연 무장의 배반과 공심 8% 증가, 해제 불가." },
    { name: "와룡봉추", req: 2, heroes: ["제갈량", "황월영"], effect: "부대 내 인연 무장은 전투 첫 3턴 동안 받는 피해가 4% 감소, 해제 불가." },
    { name: "호소백문", req: 2, heroes: ["여포", "장료"], effect: "부대 내 인연 무장의 연격률 12% 증가, 해제 불가." },
    { name: "황천기의", req: 2, heroes: ["장각", "장보"], effect: "부대 내 인연 무장의 고략 6% 증가, 해제 불가." },
    { name: "호위경주", req: 2, heroes: ["조조", "조조(제왕)", "전위"], effect: "부대 내 인연 무장의 무용과 통솔이 4% 증가하며, 해제할 수 없습니다." },
    { name: "오모신", req: 2, heroes: ["순욱", "정욱", "곽가", "가후"], effect: "부대 내 인연 무장의 기술 8% 증가, 해제 불가." },
    { name: "국지동량", req: 2, heroes: ["제갈량", "주유"], effect: "부대 내 인연 무장은 매번 행동 시, 35% 확률로 적군 1개 대상에게 45% 모략 피해." },
    { name: "군신상기", req: 2, heroes: ["조조", "조조(제왕)", "사마의"], effect: "부대 내 인연 무장의 고략 및 공심이 4% 증가하며 해제 불가합니다." },
    { name: "오자양장", req: 2, heroes: ["장료", "악진", "장합"], effect: "부대 내 인연 무장은 첫 2회차 동안 배반이 18% 상승하며, 해제할 수 없습니다." },
    { name: "동오대도독", req: 2, heroes: ["주유", "육손", "여몽", "육항"], effect: "부대 내 인연 무장의 가하는 모략 피해 7% 증가, 해제 불가." },
    { name: "유한탁고", req: 2, heroes: ["손권", "제)손권", "육항"], effect: "부대 내 인연 무장이 선후 시작 시, 각성 1중첩 및 저항 1중첩을 획득합니다." },
    { name: "오호상장", req: 3, heroes: ["관우", "장비", "조운", "황충", "마초"], effect: "부대 내 인연 무장이 장공 8% 증가, 해제 불가." },
    { name: "서량철기", req: 2, heroes: ["마초", "마대"], effect: "부대 내 인연 무장의 무용 및 장공이 4% 증가하며 해제 불가합니다." },
    { name: "촉한사모", req: 2, heroes: ["제갈량", "서서"], effect: "부대 내 인연 무장의 모략 및 치료 효과 5% 상승, 해제 불가." },
    { name: "역사역부", req: 2, heroes: ["제갈량", "강유"], effect: "부대 내 인연 무장의 무용 및 모략 4% 상승, 해제 불가." },
    { name: "강동호신", req: 2, heroes: ["황개", "정보", "주태", "능통", "정봉"], effect: "부대 내 인연 무장의 통솔 7% 상승, 해제 불가." }
];

// 종결 프리셋 마스터 데이터
const defaultPresetDecks = [
    {
        title: "위무 방패병 [1군]", formation: "추형진",
        officers: [
            { name: "조조", chosenTactics: ["교취호탈", "병량촌단"] },
            { name: "하후돈", chosenTactics: ["이아환아", "교취호탈"] },
            { name: "곽가", chosenTactics: ["공기불비", "낙정하석"] }
        ]
    },
    {
        title: "신속창 [2군]", formation: "기형진",
        officers: [
            { name: "장료", chosenTactics: ["사생취의", "만전제발"] },
            { name: "조조(제왕)", chosenTactics: ["교취호탈", "동장철벽"] },
            { name: "악진", chosenTactics: ["교취호탈", "선등함진"] }
        ]
    },
    {
        title: "도원 방패병 [3군]", formation: "방원진",
        officers: [
            { name: "유비", chosenTactics: ["유좌유용", "동장철벽"] },
            { name: "관우", chosenTactics: ["만전제발", "사생취의"] },
            { name: "장비", chosenTactics: ["이아환아", "교취호탈"] }
        ]
    },
    {
        title: "동오 대도독 [4군]", formation: "안행진",
        officers: [
            { name: "주유", chosenTactics: ["분성지계", "화소적벽"] },
            { name: "육손", chosenTactics: ["공기불비", "낙정하석"] },
            { name: "여몽", chosenTactics: ["동구적개", "동장철벽"] }
        ]
    },
    {
        title: "오모신 계책 [5군]", formation: "구행진",
        officers: [
            { name: "순욱", chosenTactics: ["강유겸제", "미우주무"] },
            { name: "가후", chosenTactics: ["이간계", "혼수모어"] },
            { name: "정욱", chosenTactics: ["공기불비", "낙정하석"] }
        ]
    }
];

let dynamicPresetDecks = [];
let currentSortMode = 'default'; 

window.onload = function() {
    loadDeckTextData();
    renderDeckBuilder();
};

function loadDeckTextData() {
    try {
        const savedText = localStorage.getItem('samguk_deck_text');
        if (savedText) {
            const parsed = JSON.parse(savedText);
            if (Array.isArray(parsed) && parsed.length > 0) {
                dynamicPresetDecks = parsed;
                
                if (dynamicPresetDecks.length < defaultPresetDecks.length) {
                    for (let i = dynamicPresetDecks.length; i < defaultPresetDecks.length; i++) {
                        dynamicPresetDecks.push(JSON.parse(JSON.stringify(defaultPresetDecks[i])));
                    }
                }

                dynamicPresetDecks.forEach((deck, idx) => {
                    if (!deck || typeof deck !== 'object') {
                        dynamicPresetDecks[idx] = JSON.parse(JSON.stringify(defaultPresetDecks[idx] || defaultPresetDecks[0]));
                    }
                    const d = dynamicPresetDecks[idx];
                    d.originIdx = (d.originIdx !== undefined) ? d.originIdx : idx;
                    if (!d.title) d.title = defaultPresetDecks[idx]?.title || `부대 ${idx + 1}`;
                    if (!d.formation) d.formation = defaultPresetDecks[idx]?.formation || "추형진";
                    if (!Array.isArray(d.officers) || d.officers.length === 0) {
                        d.officers = JSON.parse(JSON.stringify(defaultPresetDecks[idx]?.officers || defaultPresetDecks[0].officers));
                    }
                    d.officers.forEach(off => {
                        if (off.name === "제)조조") off.name = "조조(제왕)";
                        if (off.name === "제)유비") off.name = "유비(제왕)";
                        if (!off.name) off.name = "조조";
                        if (!Array.isArray(off.chosenTactics) || off.chosenTactics.length < 2) {
                            off.chosenTactics = ["교취호탈", "병량촌단"];
                        }
                    });
                });

                localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
                return;
            }
        }
    } catch (e) {
        console.error("스토리지 구조 복구 가동:", e);
    }
    dynamicPresetDecks = JSON.parse(JSON.stringify(defaultPresetDecks));
    dynamicPresetDecks.forEach((d, idx) => { d.originIdx = idx; });
}

// 핵심 로직 개정: 무장 보유 시 고유 전법 가산 연산 동적 승인 (OR 결선)
function calculateDeckScore(deck, ownedHeroes, ownedTactics) {
    if (!deck || !Array.isArray(deck.officers)) return 0;
    
    let heroMatchCount = 0;
    let tacticMatchCount = 0;
    const totalTacticSlots = 9;

    const cleanOwnedHeroes = ownedHeroes.map(h => h.replace(/\s+/g, ''));
    const cleanOwnedTactics = ownedTactics.map(t => t.replace(/\s+/g, ''));

    deck.officers.forEach(off => {
        if (!off || !off.name) return;
        const hName = off.name.toString().trim();
        const cleanHName = hName.replace(/\s+/g, '');
        if (!cleanHName) return;
        
        const isHeroOwned = cleanOwnedHeroes.includes(cleanHName);
        if (isHeroOwned) {
            heroMatchCount += 1;
        }
        
        const inherentTactic = officerUniqueTacticMap[hName];
        if (inherentTactic) {
            const cleanInherent = inherentTactic.toString().trim().replace(/\s+/g, '');
            // 무장이 보유 중이거나, 전법 창에 체크되어 있다면 무조건 보유한 것으로 인정
            if (isHeroOwned || cleanOwnedTactics.includes(cleanInherent)) {
                tacticMatchCount += 1;
            }
        }
        
        if (Array.isArray(off.chosenTactics)) {
            off.chosenTactics.forEach(tac => {
                if (tac) {
                    const cleanTac = tac.toString().trim().replace(/\s+/g, '');
                    if (cleanOwnedTactics.includes(cleanTac)) {
                        tacticMatchCount += 1;
                    }
                }
            });
        }
    });

    const finalHeroScore = heroMatchCount * 20;
    const finalTacticScore = (tacticMatchCount / totalTacticSlots) * 40;

    return Math.round(finalHeroScore + finalTacticScore);
}

// 핵심 로직 개정 2단계: 처방전 텍스트 생성기 내 고유 전법 검사 구역 무장 보유 종속 필터 적용
function generateDeckFeedback(deck, ownedHeroes, ownedTactics) {
    const idealDeck = defaultPresetDecks[deck?.originIdx];
    if (!idealDeck) return [];

    let feedbackList = [];
    
    const cleanOwnedHeroes = ownedHeroes.map(h => h.replace(/\s+/g, ''));
    const cleanOwnedTactics = ownedTactics.map(t => t.replace(/\s+/g, ''));

    const currentFormation = (deck?.formation || "").toString().trim();
    const idealFormation = (idealDeck?.formation || "").toString().trim();

    if (currentFormation.replace(/\s+/g, '') !== idealFormation.replace(/\s+/g, '')) {
        feedbackList.push(`진형 변경 필요: 현재 설정된 [${currentFormation}]을(를) 매칭 종결 진형인 <strong>[${idealFormation}]</strong>(으)로 변경하세요.`);
    }

    if (Array.isArray(deck?.officers)) {
        deck.officers.forEach((off, offIdx) => {
            const idealOff = idealDeck?.officers?.[offIdx];
            if (!idealOff) return;

            const hName = (off?.name || "").toString().trim();
            const idealHName = (idealOff?.name || "").toString().trim();
            const cleanHName = hName.replace(/\s+/g, '');
            const cleanIdealHName = idealHName.replace(/\s+/g, '');
            if (!cleanHName || !cleanIdealHName) return;

            const isHeroOwned = cleanOwnedHeroes.includes(cleanHName);

            if (cleanHName !== cleanIdealHName) {
                feedbackList.push(`무장 복구 권고: 현재 배치된 [${hName}]을(를) 종결 핵심 장수인 <strong>[${idealHName}]</strong>(으)로 교체하세요.`);
            }
            
            if (!isHeroOwned) {
                feedbackList.push(`장수 결핍 경고: 현재 장수 [${hName}]은(는) 미보유 상태입니다. 나의 장수 탭에서 체크하거나 보유 장수로 우회 배치하세요.`);
            }

            const inherentTactic = officerUniqueTacticMap[hName];
            if (inherentTactic) {
                const cleanInherent = inherentTactic.toString().trim().replace(/\s+/g, '');
                // 장수도 없고 전법도 체크 안 된 '진짜 미보유' 상태일 때만 처방전 경고 출력
                if (!isHeroOwned && !cleanOwnedTactics.includes(cleanInherent)) {
                    feedbackList.push(`고유 전법 누락: 무장 [${hName}]의 핵심 고유 전법 <strong>[${inherentTactic.toString().trim()}]</strong>이 미보유 상태입니다.`);
                }
            }

            if (Array.isArray(off?.chosenTactics)) {
                off.chosenTactics.forEach((tac, tacIdx) => {
                    const idealTac = (idealOff?.chosenTactics?.[tacIdx] || "").toString().trim();
                    const cleanTac = (tac || "").toString().trim();
                    
                    const cleanIdealTac = idealTac.replace(/\s+/g, '');
                    const cleanUserTac = cleanTac.replace(/\s+/g, '');
                    if (!cleanUserTac || !cleanIdealTac) return;

                    if (cleanUserTac !== cleanIdealTac) {
                        feedbackList.push(`전법 오장착 픽스: [${hName}]의 ${tacIdx + 2}번째 칸 전법 [${cleanTac}] 대신 졸업 전법인 <strong>[${idealTac}]</strong>을(를) 탑재하세요.`);
                    }
                    if (!cleanOwnedTactics.includes(cleanUserTac)) {
                        feedbackList.push(`전법 자원 부족: [${hName}]의 ${tacIdx + 2}번째 칸 전법 <strong>[${cleanTac}]</strong>은(는) 현재 미보유 중입니다. 보유 전법 드롭다운에서 다른 전법을 선별하세요.`);
                    }
                });
            }
        });
    }

    return feedbackList;
}

function toggleSortMode(mode) {
    currentSortMode = mode;
    
    document.querySelectorAll('.control-sort-btn').forEach(btn => btn.classList.remove('active'));
    if (mode === 'default') document.getElementById('sort-default-btn').classList.add('active');
    else document.getElementById('sort-score-btn').classList.add('active');
    
    renderDeckBuilder();
}

function saveEditedText(originIdx, propertyName, element) {
    let textValue = element.innerText.trim();
    textValue = textValue.replace(/\s*\[추천도:\s*\d+점\]/g, "").trim();

    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        if (textValue.length === 0) {
            textValue = defaultPresetDecks[originIdx] ? defaultPresetDecks[originIdx][propertyName] : "부대 명칭";
        }
        targetDeck[propertyName] = textValue;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder();
}

function changeFormation(originIdx, selectElement) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        targetDeck.formation = selectElement.value;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder();
}

function changeOfficer(originIdx, officerIdx, selectElement) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        targetDeck.officers[officerIdx].name = selectElement.value;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder(); 
}

function changeTactic(originIdx, officerIdx, slotIdx, selectElement) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        targetDeck.officers[officerIdx].chosenTactics[slotIdx] = selectElement.value;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder(); 
}

function calculateActivatedBond(officers) {
    if (!Array.isArray(officers)) return "활성화된 부대 인연 효과 없음";
    const currentOfficerNames = officers.map(o => (o && o.name) ? o.name.toString().trim() : "");
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
    let ownedHeroes = [];
    let ownedTactics = [];

    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            ownedHeroes = parsed.heroes ? parsed.heroes.filter(x => x.isOwned).map(x => {
                let name = (x.name || "").toString().trim();
                if (name === "제)조조") name = "조조(제왕)";
                if (name === "제)유비") name = "유비(제왕)";
                return name;
            }) : [];
            ownedTactics = parsed.tactics ? parsed.tactics.filter(x => x.isOwned).map(x => (x.name || "").toString().trim()) : [];
        } catch (e) {
            console.error("인벤토리 자원 파싱 실패 수집 차단:", e);
        }
    }

    let displayDecks = [...dynamicPresetDecks];
    
    if (currentSortMode === 'score') {
        displayDecks.sort((a, b) => {
            const scoreA = calculateDeckScore(a, ownedHeroes, ownedTactics);
            const scoreB = calculateDeckScore(b, ownedHeroes, ownedTactics);
            return scoreB - scoreA;
        });
    } else {
        displayDecks.sort((a, b) => (a.originIdx || 0) - (b.originIdx || 0));
    }

    const sortedHeroNames = Object.keys(officerRoleMap).sort((a, b) => a.localeCompare(b, 'ko'));

    displayDecks.forEach((deck) => {
        const deckCard = document.createElement('div');
        deckCard.className = 'deck-card';

        const currentComputedScore = calculateDeckScore(deck, ownedHeroes, ownedTactics);
        const computedBondText = calculateActivatedBond(deck.officers);
        const currentPositions = formationPositions[deck.formation] || ["front", "front", "front"];

        let officersHtml = '';
        if (Array.isArray(deck.officers)) {
            deck.officers.forEach((off, offIdx) => {
                let tacticRowsHtml = '';
                const hName = (off?.name || "").toString().trim();
                const cleanHName = hName.replace(/\s+/g, '');
                const cleanOwnedHeroes = ownedHeroes.map(h => h.replace(/\s+/g, ''));
                const cleanOwnedTactics = ownedTactics.map(t => t.replace(/\s+/g, ''));

                const isHeroOwned = cleanOwnedHeroes.includes(cleanHName);

                const inherentTactic = officerUniqueTacticMap[hName] || "효웅";
                const cleanInherent = inherentTactic.trim().replace(/\s+/g, '');
                
                // UI 바인더 동기화 개정: 장수가 소정 보유 상태라면 무조건 전법을 보유중(true) 상태로 반환
                const isInherentOwned = isHeroOwned || cleanOwnedTactics.includes(cleanInherent);

                tacticRowsHtml += `
                    <div class="tactic-row ${isInherentOwned ? 'owned' : 'missing'}" style="border-left: 3px solid #cd9b33;">
                        <span>⭐ ${inherentTactic} (고유)</span>
                        <span>${isInherentOwned ? '보유중' : '미보유'}</span>
                    </div>
                `;

                if (Array.isArray(off?.chosenTactics)) {
                    off.chosenTactics.forEach((tacticName, slotIdx) => {
                        const cleanTac = (tacticName || "").toString().trim();
                        const isOwned = cleanOwnedTactics.includes(cleanTac.replace(/\s+/g, ''));
                        
                        let optionsHtml = '';
                        allTacticsList.forEach(tName => {
                            const isSelected = cleanTac === tName ? 'selected' : '';
                            optionsHtml += `<option value="${tName}" ${isSelected}>${tName}</option>`;
                        });
                        
                        tacticRowsHtml += `
                            <div class="tactic-row ${isOwned ? 'owned' : 'missing'}" style="padding: 4px 12px;">
                                <select class="tactic-dropdown" onchange="changeTactic(${deck.originIdx}, ${offIdx}, ${slotIdx}, this)">
                                    ${optionsHtml}
                                </select>
                                <span class="tactic-status-text">${isOwned ? '장착 완료' : '미보유'}</span>
                            </div>
                        `;
                    });
                }

                const currentPos = currentPositions[offIdx] || "front";
                const posLabel = currentPos === 'front' ? '전열' : '후열';
                const posClass = currentPos === 'front' ? 'front' : 'back';

                let officerOptionsHtml = '';
                sortedHeroNames.forEach(hKey => {
                    const isSelected = hName === hKey ? 'selected' : '';
                    officerOptionsHtml += `<option value="${hKey}" ${isSelected}>${hKey}</option>`;
                });

                const currentComputedRole = officerRoleMap[hName] || "보조, 버퍼";

                officersHtml += `
                    <div class="officer-slot">
                        <div class="officer-meta">
                            <span class="position-badge ${posClass}">${posLabel}</span>
                            <div class="officer-select-container">
                                <select class="officer-dropdown" onchange="changeOfficer(${deck.originIdx}, ${offIdx}, this)">
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
        }

        let formationOptionsHtml = '';
        Object.keys(formationEffects).forEach(fName => {
            const isSelected = deck.formation === fName ? 'selected' : '';
            formationOptionsHtml += `<option value="${fName}" ${isSelected}>${fName}</option>`;
        });

        const currentEffectText = formationEffects[deck.formation] || formationEffects["추형진"];

        const feedbackArr = generateDeckFeedback(deck, ownedHeroes, ownedTactics);
        let feedbackHtml = '';
        
        if (currentComputedScore === 100 && feedbackArr.length === 0) {
            feedbackHtml = `<div class="feedback-item success">★ 축하합니다! 종결 무장 및 졸업 전법 연산 스펙이 100% 일치하는 무결성 군단입니다.</div>`;
        } else if (currentComputedScore === 100 && feedbackArr.length > 0) {
            feedbackHtml = `<div class="feedback-item success">✓ 현재 보유 자원으로 구성을 완비하여 추천도 100점을 확보했습니다.</div>`;
            feedbackArr.forEach(fb => { feedbackHtml += `<div class="feedback-item info">${fb}</div>`; });
        } else {
            feedbackArr.forEach(fb => { feedbackHtml += `<div class="feedback-item warning">${fb}</div>`; });
            if (feedbackArr.length === 0) {
                feedbackHtml += `<div class="feedback-item warning">알림: 현재 구성된 장수/전법의 매칭 자원 중 미보유 자원이 섞여 감정되었습니다. 나의 장수 탭을 확인하세요.</div>`;
            }
        }

        deckCard.innerHTML = `
            <div class="deck-title">
                <span contenteditable="true" onblur="saveEditedText(${deck.originIdx}, 'title', this)" style="outline: none;">${deck.title}</span> 
                <span style="color: #ff9f43; font-size: 13px; margin-left: 12px; font-weight: bold; user-select: none;">[추천도: ${currentComputedScore}점]</span>
            </div>
            <div class="bond-box">
                <span class="bond-highlight">부대 인연 효과 :</span> 
                <span style="display:inline-block; outline:none;">${computedBondText}</span>
            </div>
            <div class="officers-row">
                ${officersHtml}
            </div>
            
            <div class="feedback-container-box">
                <div class="feedback-header-title">📋 100점 종결 부대 달성을 위한 AI 실시간 맞춤 처방전</div>
                <div class="feedback-list-wrapper">${feedbackHtml}</div>
            </div>

            <div class="deck-footer-bar">
                <div class="footer-left">
                    <select class="formation-select" onchange="changeFormation(${deck.originIdx}, this)">
                        ${formationOptionsHtml}
                    </select>
                </div>
                <div class="footer-right">${currentEffectText}</div>
            </div>
        `;
        container.appendChild(deckCard);
    });
}

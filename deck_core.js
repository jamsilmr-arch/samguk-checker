console.log("[시스템 분석] deck_core.js 실존 전법 기반 0티어 메타 및 다중 티어 대체망 기동");

// ==========================================================================
// LAYER 1: 독립형 마스터 자원 데이터베이스 (중복 제거 및 정적 데이터 전역 승격)
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
    "좌자": "화겁생기", "우길": "태평경", "안량": "효장", "원소": "사소도"
};

const internalMasterOfficerNames = Object.keys(internalMasterOfficerUniqueTacticMap).sort((a, b) => a.localeCompare(b, 'ko'));

const internalMasterTacticNames = [
    "가정지전", "강유겸제", "견불가최", "견진연봉", "공기불비", "과하탁교", "교취호탈", "극적제승", 
    "금낭묘계", "금적금왕", "금창신", "금철교명", "기문둔갑", "낙정하석", "동구적개", "동장철벽", 
    "동촉기선", "만부막적", "만전제발", "만천과해", "문치무공", "미우주무", "반객위주", "병량촌단", 
    "분성지계", "비사주석", "사면초가", "사생취의", "선등함진", "수상개화", "순수견양", "심모원려", 
    "안영찰채", "암전난방", "양의화생", "양초선행", "여자동포", "요사여신", "용맹무쌍", "용왕직전", 
    "운주유악", "원성재도", "위위구조", "유좌유용", "이간계", "이아환아", "이일대로", "이퇴위진", 
    "일고작기", "인세이도", "전위위안", "제곤부위", "중정기고", "지인선임", "진퇴유도", "진화타겁", 
    "질풍노도", "천리추격", "천시지리", "체천행도", "축세대발", "축호과간", "태청단경", "토적격문", 
    "현호제세", "호령삼군", "혼수모어", "홍수첨향", "화소적벽", "횡소천군", "횡징폭렴", "휴양생식"
].sort((a, b) => a.localeCompare(b, 'ko'));

// [신규 패치]: 조운(만부/횡소)과 여포(천리/암전)의 2, 3순위 대체 전법 유기적 결선
const tacticAlternativesMap = {
    "횡징폭렴": ["동구적개", "동장철벽"], "이퇴위진": ["미우주무", "천시지리"],
    "용맹무쌍": ["만부막적", "비사주석"], "질풍노도": ["암전난방", "교취호탈"],
    "문치무공": ["양초선행", "중정기고"], "혼수모어": ["사면초가", "이간계"],
    "반객위주": ["일고작기", "사생취의"], "유좌유용": ["휴양생식", "제곤부위"],
    "선등함진": ["만천과해", "만전제발"], "강유겸제": ["동장철벽", "천시지리"],
    "진퇴유도": ["위위구조", "동구적개"], "견진연봉": ["동장철벽", "순수견양"],
    "위위구조": ["태청단경", "현호제세"], "용왕직전": ["만부막적", "과하탁교"],
    "전위위안": ["태청단경", "현호제세"], "안영찰채": ["위위구조", "미우주무"],
    "일고작기": ["사생취의", "용맹무쌍"], "여자동포": ["동구적개", "천시지리"],
    "양의화생": ["기문둔갑", "화소적벽"], "수상개화": ["요사여신", "사생취의"],
    "요사여신": ["수상개화", "사생취의"], "견불가최": ["동장철벽", "동구적개"],
    "분성지계": ["화소적벽", "기문둔갑"], "운주유악": ["태청단경", "미우주무"],
    "동구적개": ["안영찰채", "위위구조"], "사생취의": ["일고작기", "용맹무쌍"],
    "양초선행": ["문치무공", "휴양생식"], "휴양생식": ["양초선행", "현호제세"],
    "동장철벽": ["견불가최", "천시지리"], "사면초가": ["기문둔갑", "화소적벽"],
    "만부막적": ["용맹무쌍", "동장철벽"], "횡소천군": ["용왕직전", "강유겸제"], 
    "천리추격": ["극적제승", "용맹무쌍"], "암전난방": ["극적제승", "질풍노도"]
};

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

// [신규 패치]: 조운과 여포의 0티어 메타 전법을 실제 분석 데이터(만부막적, 횡소천군, 천리추격, 암전난방)로 하드코딩
const analyzedMetaArchetypes = [
    { id: "wei_nuke", name: "위나라 방패 핵폭탄 덱", concept: "사마의의 후반 캐리력과 조조(제왕)의 버프를 결합한 0티어 장기전 특화 방패병 조합", formation: "추형진", officers: [{ name: "하후돈", chosenTactics: ["견불가최", "유좌유용"] }, { name: "조조(제왕)", chosenTactics: ["횡징폭렴", "동구적개"] }, { name: "사마의", chosenTactics: ["운주유악", "반객위주"] }] },
    { id: "shu_perfect", name: "촉나라 무상성 창병 덱", concept: "상대는 제어기에 걸려 아무것도 못 하고, 우리는 면역과 힐을 두르고 일방적으로 패는 0티어 무결점 조합", formation: "방원진", officers: [{ name: "조운", chosenTactics: ["만부막적", "횡소천군"] }, { name: "제갈량", chosenTactics: ["혼수모어", "전위위안"] }, { name: "유비", chosenTactics: ["안영찰채", "동구적개"] }] },
    { id: "qun_evasion", name: "군웅 무쌍 궁병 덱", concept: "아군이 죽기 전에 여포가 제어기에 걸리지 않고 1~2턴 만에 적 주장을 썰어버리는 0티어 1턴킬 조합", formation: "어린진", officers: [{ name: "여포", chosenTactics: ["천리추격", "암전난방"] }, { name: "화타", chosenTactics: ["동구적개", "동장철벽"] }, { name: "좌자", chosenTactics: ["운주유악", "횡징폭렴"] }] },
    { id: "shu_combo", name: "촉 연격 폭딜덱", concept: "마초의 광역 폭딜과 서서의 버프를 극대화하는 1티어 안정성 조합", formation: "구행진", officers: [{ name: "위연", chosenTactics: ["횡징폭렴", "이퇴위진"] }, { name: "마초", chosenTactics: ["용맹무쌍", "질풍노도"] }, { name: "서서", chosenTactics: ["문치무공", "혼수모어"] }] },
    { id: "wei_burst", name: "제왕 위 암살덱", concept: "장료의 적 주장 정밀 저격과 악진/조조(제왕)의 전능 스탯 펌핑을 결합한 속전속결 조합", formation: "호도진", officers: [{ name: "장료", chosenTactics: ["질풍노도", "반객위주"] }, { name: "조조(제왕)", chosenTactics: ["유좌유용", "혼수모어"] }, { name: "악진", chosenTactics: ["선등함진", "강유겸제"] }] },
    { id: "wu_magic_bow", name: "오 모략 궁병덱", concept: "손권의 버프 중첩과 육항의 크리티컬 지원, 노숙의 스탯 펌핑을 합친 대기만성 조합", formation: "구행진", officers: [{ name: "손권", chosenTactics: ["여자동포", "진퇴유도"] }, { name: "육항", chosenTactics: ["요사여신", "수상개화"] }, { name: "노숙", chosenTactics: ["분성지계", "혼수모어"] }] }
];

const metaDeckUnitTypeMap = {
    "wei_nuke": "방패병",
    "shu_perfect": "창병",
    "qun_evasion": "궁병",
    "shu_combo": "기병",
    "wei_burst": "기병",
    "wu_magic_bow": "궁병"
};

const defaultPresetDecks = analyzedMetaArchetypes.slice(0, 5).map((d, i) => ({ ...JSON.parse(JSON.stringify(d)), title: `${i + 1}군` }));

const internalBondRules = [
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
    { name: "백제탁고", req: 2, heroes: ["제갈량", "조운"], effect: "부대 내 인연 무장의 배반 및 공심 8% 증가, 해제 불가." },
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

// ==========================================================================
// LAYER 2: 3중 도감 복구 및 스마트 분류 엔진 인터페이스
// ==========================================================================
function getOfficerEquipment(officerName, deckUnitType = "방패병") {
    if (typeof window.getEquipmentRecommendationFromGuide === 'function') {
        const extEq = window.getEquipmentRecommendationFromGuide(officerName);
        if (extEq && extEq.helmet) return extEq;
    }

    const tacticalList = ["사마의", "순욱", "정욱", "가후", "곽가", "제갈량", "서서", "강유", "황월영", "육손", "주유", "육항", "노숙", "대교", "소교", "장각", "우길", "좌자", "화타", "채문희", "초선", "장녕", "장보"];
    const supportList = ["조조", "조조(제왕)", "유비", "유비(제왕)", "손권", "손권(제왕)", "화타", "좌자", "채문희", "노숙"];
    
    let damageAttr = "무용 피해 가함";
    if (tacticalList.includes(officerName)) damageAttr = "모략 피해 가함";
    if (supportList.includes(officerName)) damageAttr = "치유 효과 상승"; 

    return { 
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "피해 가함" }, 
        armor: { name: "명재복", attr1: "피해 감소", attr2: damageAttr }, 
        accessory: { name: "박산로", attr1: "치유 효과 상승", attr2: `${deckUnitType} 피해 감소` } 
    };
}

function getOfficerDogamData(officerName) {
    if (typeof window.getOfficerDataFromDogam === 'function') {
        const data = window.getOfficerDataFromDogam(officerName);
        if (data && data.uniqueTactic && data.uniqueTactic !== "고유 전법 누락") return data;
    }
    return { role: "지휘/능동/패시브", uniqueTactic: internalMasterOfficerUniqueTacticMap[officerName] || "고유 전법 누락" };
}

function getTacticListBridge() {
    if (typeof window.getAllTacticsFromDogam === 'function') {
        const extList = window.getAllTacticsFromDogam();
        if (extList && extList.length > 5) return extList;
    }
    return [...internalMasterTacticNames];
}

function getOfficerNamesBridge() {
    if (typeof window.getAllOfficerNamesFromDogam === 'function') {
        const extList = window.getAllOfficerNamesFromDogam();
        if (extList && extList.length > 5) return extList.sort((a, b) => a.localeCompare(b, 'ko'));
    }
    return [...internalMasterOfficerNames];
}

const metaHawkRecommendationMap = {
    "wei_nuke": { name: "진시 (SSR / 능소)", skill: "전투 시작 시 아군 [절극] 부여. 매 턴 아군 전체 피해 30% 감소 (장기전 특화)" },
    "shu_perfect": { name: "감로 (SSR / 결운)", skill: "전투 시작 시 아군 [치유] 및 1중첩 [각성] 주입하여 제어기 면역 및 안정성 극대화" },
    "qun_evasion": { name: "전광 (SSR / 열공)", skill: "턴 시작 시 아군 무용/통솔 30% 증가. 여포의 1턴 킬 확률 극대화" },
    "shu_combo": { name: "설조 (SSR / 삭풍)", skill: "턴 종료 시 무용 최고 아군 물리피해 15% 버프 유지 및 적 2명에게 160% 물리 타격 즉시 격발" },
    "wei_burst": { name: "전광 (SSR / 열공)", skill: "턴 시작 시 아군 전체의 무용 30% 및 통솔 30% 증가 (턴 종료 시까지 지속하여 선공 체급 확보)" },
    "wu_magic_bow": { name: "감로 (SSR / 결운)", skill: "전투 시작 시 아군 [치유] (피격 시 100% 자가 복구) 및 1중첩 [각성] 확정 주입하여 통제기 면역" }
};

const systemGuideInsights = {
    "wei_nuke": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 전투 초중반을 압도적인 맷집과 힐링으로 버텨낸 뒤, 후반 턴에 사마의(응시낭고)로 적을 지워버리는 장기전 특화 방패병 덱입니다. 4턴 이후까지 버티는 것이 핵심이므로 진시 매를 활용하십시오.",
    "shu_perfect": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 제갈량의 차단/혼란 제어, 조운의 면역과 폭딜, 유비의 확정 힐이 완벽하게 맞물리는 0티어 덱입니다. <strong>[전술 노트]:</strong> 부대를 '창병'으로 편성하십시오. 유비의 적성이 A급으로 패널티를 받지만, 메인 딜러인 제갈량/조운의 파괴력 극대화(S급)가 부대 전체 승률에 압도적으로 유리합니다.",
    "qun_evasion": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 좌자/화타의 회피와 극한 뎀감으로 생존을 보장받은 뒤, 여포의 돌격 전법 연타로 1턴 만에 주장을 베는 폭딜 덱입니다. <strong>[전술 노트]:</strong> 부대를 '궁병'으로 편성하십시오. 좌자의 적성이 C급으로 급락하나, 그의 '회피율 버프'는 스탯의 영향을 받지 않는 고정 확률이므로 파괴력은 훼손되지 않습니다.",
    "shu_combo": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 이 부대는 <strong>[연격률]</strong>과 <strong>[확산 피해]</strong> 기반의 무용 딜이 핵심입니다. 설조 매 스킬과 조합하십시오.",
    "wei_burst": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 적 주장을 선제 타격하는 속전속결 부대로 <strong>[속도]</strong> 스탯이 생명입니다.",
    "wu_magic_bow": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 구행진을 활용해 후열의 가하는 피해를 증폭시키는 덱입니다. 손권의 버프 중첩이 중요하므로 <strong>[통찰]</strong>을 보조할 수 있도록 감로 매를 조합하면 안정성이 비약적으로 상승합니다."
};

// ==========================================================================
// LAYER 3: 코어 연산 엔진 구역
// ==========================================================================
function calculateStrictDeckScore(deck) {
    if (!deck?.officers || !Array.isArray(deck.officers)) return 0;
    const currentNames = deck.officers.map(o => o?.name?.toString().trim() || "").filter(Boolean);
    if (!currentNames.length) return 0;

    let bestMeta = analyzedMetaArchetypes[0], maxMatch = -1;

    analyzedMetaArchetypes.forEach(meta => {
        let matchCount = 0;
        meta.officers.forEach((mo, idx) => {
            if (currentNames.includes(mo.name)) matchCount += 1;
            if (deck.officers[idx]?.name === mo.name) matchCount += 0.5;
        });
        if (matchCount > maxMatch) { maxMatch = matchCount; bestMeta = meta; }
    });

    let score = 100;
    if (deck.formation !== bestMeta.formation) score -= 10;

    bestMeta.officers.forEach((metaOff, idx) => {
        const userOff = deck.officers[idx];
        if (!userOff?.name) return score -= 30;
        if (userOff.name !== metaOff.name) score -= 20;

        const metaTacs = metaOff.chosenTactics.map(t => t.trim());
        if (Array.isArray(userOff.chosenTactics)) {
            userOff.chosenTactics.forEach((userTac, tIdx) => {
                if ((userTac?.trim() || "") !== metaTacs[tIdx]) score -= 5;
            });
        } else {
            score -= 10;
        }
    });

    return Math.max(score, 0);
}

function generateStructuredFeedback(deck, heroDataMap, tacticDataMap) {
    const fb = { insight: "", logs: [] };
    if (!deck?.officers || !Array.isArray(deck.officers)) return fb;

    const curNames = deck.officers.map(o => o?.name?.toString().trim().replace(/\s+/g, '') || "").filter(Boolean);
    if (!curNames.length) return fb;

    let bestMatchDeck = analyzedMetaArchetypes[0], maxMatchScore = -1;

    analyzedMetaArchetypes.forEach(metaDeck => {
        let matchScore = 0;
        metaDeck.officers.forEach((metaOff, idx) => {
            const mName = metaOff.name.replace(/\s+/g, '');
            if (curNames.includes(mName)) matchScore += 1; 
            if (curNames[idx] === mName) matchScore += 0.5;
        });
        if (matchScore > maxMatchScore) { maxMatchScore = matchScore; bestMatchDeck = metaDeck; }
    });

    fb.logs.push({ type: 'info', text: `🎯 <strong>분석 완료:</strong> 현재 덱은 랭커 메타인 <strong>[${bestMatchDeck.name}]</strong> 기반으로 세팅하는 것이 수학적 고점이 가장 높습니다. (${bestMatchDeck.concept})` });
    if (systemGuideInsights[bestMatchDeck.id]) fb.insight = systemGuideInsights[bestMatchDeck.id];

    const curFmt = deck.formation?.toString().trim() || "";
    const idealFmt = bestMatchDeck.formation.trim();
    if (curFmt.replace(/\s+/g, '') !== idealFmt.replace(/\s+/g, '')) {
        fb.logs.push({ type: 'warning', text: `진형 교정: [${curFmt}] ➔ <strong>[${idealFmt}]</strong> (해당 메타의 핵심 시너지 포지셔닝을 위해 변경을 권장합니다.)` });
    }

    let missingMeta = bestMatchDeck.officers.filter(mo => !curNames.includes(mo.name.replace(/\s+/g, '')));

    deck.officers.forEach((off, offIdx) => {
        if (!off) return;
        const hName = off.name?.toString().trim() || "";
        const cleanHName = hName.replace(/\s+/g, '');
        
        if (!cleanHName) {
            if (missingMeta.length) fb.logs.push({ type: 'warning', text: `장수 배치: <strong>[빈 슬롯]</strong> ➔ <strong>[${missingMeta.shift().name}]</strong> 투입 (시너지 복구를 위한 강력 추천 코어 무장)` });
            return;
        }

        const heroInv = heroDataMap[hName] || { isOwned: false, star: 0, transcend: false };
        if (!heroInv.isOwned) fb.logs.push({ type: 'warning', text: `자원 경고: [${hName}] 장수가 미보유 상태입니다. (장수 도감 확인 요망)` });

        const metaIdx = bestMatchDeck.officers.findIndex(mo => mo.name.replace(/\s+/g, '') === cleanHName);

        if (metaIdx !== -1) {
            const metaOff = bestMatchDeck.officers[metaIdx];
            const curRow = formationPositions[curFmt]?.[offIdx] || "front";
            const idealRow = formationPositions[idealFmt]?.[metaIdx] || "front";

            if (curRow !== idealRow) {
                fb.logs.push({ type: 'warning', text: `배치 교정: <strong>[${hName}]</strong> 장수는 메타 아키텍처상 <strong>${idealRow === 'front' ? '전열' : '후열'}</strong> 포지션이어야 하나, 현재 <strong>${curRow === 'front' ? '전열' : '후열'}</strong> 슬롯에 가 있습니다.` });
            }

            const metaTacsClean = metaOff.chosenTactics.map(t => t.trim().replace(/\s+/g, ''));
            let unmatchTac = [...metaOff.chosenTactics];

            if (Array.isArray(off.chosenTactics)) {
                off.chosenTactics.forEach(tac => {
                    const cleanTac = tac?.toString().trim().replace(/\s+/g, '') || "";
                    if (unmatchTac.includes(cleanTac)) unmatchTac.splice(unmatchTac.indexOf(cleanTac), 1);
                });

                off.chosenTactics.forEach((tac, tIdx) => {
                    const rawTac = tac?.toString().trim() || "";
                    const cleanTac = rawTac.replace(/\s+/g, '');

                    if (cleanTac === "") {
                        if (unmatchTac.length) {
                            const primaryTac = unmatchTac.shift();
                            const alts = tacticAlternativesMap[primaryTac] || ["유사 역할 A급 전법", "유사 역할 B급 전법"];
                            fb.logs.push({ 
                                type: 'warning', 
                                text: `전법 장착: [${hName}]의 ${tIdx + 2}번 슬롯이 비어있습니다. ➔ 🥇1순위: <strong>[${primaryTac}]</strong> / 🥈2순위: <strong>[${alts[0]}]</strong> / 🥉3순위: <strong>[${alts[1]}]</strong> 장착 권장` 
                            });
                        }
                    } else {
                        if (!metaTacsClean.includes(cleanTac) && unmatchTac.length) {
                            const primaryTac = unmatchTac.shift();
                            const alts = tacticAlternativesMap[primaryTac] || ["유사 역할 A급 전법", "유사 역할 B급 전법"];
                            fb.logs.push({ 
                                type: 'warning', 
                                text: `전법 튜닝: [${hName}]의 ${tIdx + 2}번 슬롯 [${rawTac}] 교체 요망 ➔ 🥇1순위: <strong>[${primaryTac}]</strong> / 🥈2순위: <strong>[${alts[0]}]</strong> / 🥉3순위: <strong>[${alts[1]}]</strong> 권장` 
                            });
                        }

                        if (!tacticDataMap[cleanTac]?.isOwned) {
                            fb.logs.push({ type: 'warning', text: `자원 부족: [${hName}]의 ${tIdx + 2}번 슬롯 전법 <strong>[${rawTac}]</strong>이 미보유 상태입니다.` });
                        }
                    }
                });
            }
        } else {
            if (missingMeta.length) {
                const replaceWith = missingMeta.shift();
                const metaHeroInv = heroDataMap[replaceWith.name] || { isOwned: false, star: 0, transcend: false };
                if (heroInv.isOwned && heroInv.star > metaHeroInv.star) {
                    fb.logs.push({ type: 'info', text: `⚖️ <strong>화력 보정 분석:</strong> 원래 메타 추천 무장은 <strong>[${replaceWith.name}]</strong>이나, 현재 배치된 <strong>[${hName}]</strong>의 성급이 더 높으므로(<strong>${heroInv.star}성</strong> > ${metaHeroInv.star}성), 실전 화력 체급을 고려하여 현재는 <strong>[${hName}]</strong>을 그대로 기용하는 것을 더 추천합니다.` });
                } else {
                    fb.logs.push({ type: 'warning', text: `🚀 <strong>화력 보정 추천:</strong> 메타 코어 장수 <strong>[${replaceWith.name}]</strong>의 돌파 체급이 현재 배치된 [${hName}] 이상이므로(<strong>${metaHeroInv.star}성</strong> >= ${heroInv.star}성), 지금 즉시 <strong>[${replaceWith.name}]</strong>으로 교체하여 화력과 시너지를 동시에 보정하십시오.` });
                }
            } else {
                fb.logs.push({ type: 'warning', text: `장수 잉여: [${hName}] 장수는 현재 타겟 메타 시너지에 포함되지 않습니다.` });
            }
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
let dynamicPresetDecks = [], currentSortMode = 'default'; 

function loadDeckTextData() {
    try {
        const savedText = localStorage.getItem('samguk_deck_text');
        if (savedText) {
            const parsed = JSON.parse(savedText);
            if (Array.isArray(parsed) && parsed.length > 0) {
                dynamicPresetDecks = parsed.slice(0, 5);
                while (dynamicPresetDecks.length < 5) dynamicPresetDecks.push(JSON.parse(JSON.stringify(defaultPresetDecks[dynamicPresetDecks.length])));
                
                dynamicPresetDecks.forEach((d, idx) => {
                    if (!d || typeof d !== 'object') dynamicPresetDecks[idx] = JSON.parse(JSON.stringify(defaultPresetDecks[idx] || defaultPresetDecks[0]));
                    const deck = dynamicPresetDecks[idx];
                    deck.originIdx = deck.originIdx ?? idx;
                    deck.title = deck.title || defaultPresetDecks[idx]?.title || `${idx + 1}군`;
                    deck.formation = deck.formation || defaultPresetDecks[idx]?.formation || "추형진";
                    deck.officers = deck.officers?.length ? deck.officers : JSON.parse(JSON.stringify(defaultPresetDecks[idx]?.officers || defaultPresetDecks[0].officers));
                    
                    deck.officers.forEach((off, oIdx) => {
                        if (!off || typeof off !== 'object') deck.officers[oIdx] = { name: "", chosenTactics: ["", ""] };
                        const curOff = deck.officers[oIdx];
                        if (curOff.name === "제)조조") curOff.name = "조조(제왕)";
                        if (curOff.name === "제)유비") curOff.name = "유비(제왕)";
                        curOff.name = curOff.name || "";
                        curOff.chosenTactics = Array.isArray(curOff.chosenTactics) ? curOff.chosenTactics : ["", ""];
                    });
                });
                localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
                return;
            }
        }
    } catch (e) { console.error("스토리지 복구 가동:", e); }
    
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
        deck.officers.forEach(off => { off.name = ""; off.chosenTactics = ["", ""]; });
    } else {
        deck[prop] = value;
    }
    
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    renderDeckBuilder();
}

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
                if (x?.name) {
                    let name = x.name.toString().trim();
                    if (name === "제)조조") name = "조조(제왕)";
                    if (name === "제)유비") name = "유비(제왕)";
                    heroDataMap[name] = { isOwned: !!x.isOwned, star: parseInt(x.star || 0), transcend: !!x.transcend };
                }
            });
            parsed?.tactics?.forEach(x => {
                if (x?.name) tacticDataMap[x.name.toString().trim()] = { isOwned: !!x.isOwned, star: parseInt(x.star || 0) };
            });
        }

        if (currentSortMode === 'default') dynamicPresetDecks.sort((a, b) => (a.originIdx || 0) - (b.originIdx || 0));

        const sortedHeroNames = getOfficerNamesBridge();
        const globalTacticsList = getTacticListBridge();

        dynamicPresetDecks.forEach((deck) => {
            if (!deck) return;
            const deckCard = document.createElement('div');
            deckCard.className = 'deck-card';

            const currentComputedScore = calculateStrictDeckScore(deck);
            const curNamesClean = deck.officers.map(o => o?.name?.trim().replace(/\s+/g, '') || "").filter(Boolean);
            
            let matchScoreMax = -1, currentBestMetaId = "shu_combo"; 
            if (curNamesClean.length > 0) {
                analyzedMetaArchetypes.forEach(meta => {
                    let mScore = 0;
                    meta.officers.forEach((mo, idx) => {
                        const mName = mo.name.replace(/\s+/g, '');
                        if (curNamesClean.includes(mName)) mScore += 1; 
                        if (curNamesClean[idx] === mName) mScore += 0.5;
                    });
                    if (mScore > matchScoreMax) { matchScoreMax = mScore; currentBestMetaId = meta.id; }
                });
            }

            const deckUnitType = metaDeckUnitTypeMap[currentBestMetaId] || "방패병";

            let hawkHtml = '';
            if (curNamesClean.length > 0) {
                const hawkData = metaHawkRecommendationMap[currentBestMetaId] || { name: "데이터 없음", skill: "누락" };
                hawkHtml = `<div class="hawk-recommend-box" style="margin-top:10px; padding:12px 15px; background:linear-gradient(90deg, rgba(56,189,248,0.15) 0%, rgba(20,20,20,0) 100%); border-left:4px solid #38bdf8; border-radius:4px; display:flex; flex-direction:column; gap:5px;"><div style="font-size:13px; font-weight:bold; color:#38bdf8; letter-spacing:-0.5px;">🦅 메타 최적화 전투매 : ${hawkData.name}</div><div style="font-size:12px; color:#ddd; line-height:1.4;">${hawkData.skill}</div></div>`;
            }

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
                    const options = `<option value="" ${cleanTac===""?'selected':''}>선택 안함</option>` + globalTacticsList.map(t => `<option value="${t}" ${cleanTac===t?'selected':''}>${t}</option>`).join('');
                    tacticRowsHtml += `<div class="tactic-row ${cleanTac===""?'missing':(isOwnTac?'owned':'missing')}" style="padding:4px 12px;"><select class="tactic-dropdown" onchange="updateDeckState(${deck.originIdx}, 'tac', this.value, ${offIdx}, ${slotIdx})">${options}</select><span class="tactic-status-text" style="${cleanTac===""?'color:#666;':''}">${cleanTac===""?'슬롯 비어있음':(isOwnTac?'장착 완료':'미보유')}</span></div>`;
                });

                const curPos = formationPositions[deck.formation]?.[offIdx] || "front";
                const officerOptions = `<option value="" ${cleanHName===""?'selected':''}>선택 안함</option>` + sortedHeroNames.map(h => `<option value="${h}" ${hName===h?'selected':''}>${h}</option>`).join('');
                
                let eqHtml = '';
                if (cleanHName) {
                    const eq = getOfficerEquipment(hName, deckUnitType);
                    eqHtml = `<div class="equipment-recommendation-box" style="margin-top:8px; padding:8px 12px; background:rgba(0,0,0,0.2); border:1px solid #555; border-radius:4px; font-size:11px; text-align:left; line-height:1.6; color:#ddd;"><div style="color:#ff9f43; font-weight:bold; margin-bottom:4px;">🛠️ 시스템 권장 장비 세트</div><div>🪖 <strong>투구:</strong> <span style="color:#fff;">${eq.helmet.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eq.helmet.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eq.helmet.attr2}</span>)</div><div>🛡️ <strong>갑옷:</strong> <span style="color:#fff;">${eq.armor.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eq.armor.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eq.armor.attr2}</span>)</div><div>📿 <strong>장신구:</strong> <span style="color:#fff;">${eq.accessory.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eq.accessory.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eq.accessory.attr2}</span>)</div></div>`;
                }

                return `<div class="officer-slot" style="${!cleanHName ? 'border:1px dashed #444; background-color:rgba(0,0,0,0.1);' : ''}"><div class="officer-meta"><span class="position-badge ${curPos}">${curPos==='front'?'전열':'후열'}</span><div class="officer-select-container"><select class="officer-dropdown" onchange="updateDeckState(${deck.originIdx}, 'off', this.value, ${offIdx})">${officerOptions}</select></div></div>${eqHtml}<div class="tactic-status-box" style="margin-top:8px;">${tacticRowsHtml}</div></div>`;
            }).join('');

            const fmtOptions = Object.keys(formationEffects).map(f => `<option value="${f}" ${deck.formation===f?'selected':''}>${f}</option>`).join('');
            const fb = generateStructuredFeedback(deck, heroDataMap, tacticDataMap);
            let fbHtml = '';
            
            if (currentComputedScore === 100 && fb.logs.length <= 1) { 
                fbHtml = `<div class="feedback-item success">★ 축하합니다! 랭커 메타와 100% 일치하는 무결성 최적화 명품 군단입니다.</div>`;
            } else {
                fbHtml = fb.logs.map(l => `<div class="feedback-item ${l.type === 'info' ? 'info' : (l.type === 'warning' ? 'warning' : 'success')}">${l.text}</div>`).join('');
            }
            if (fb.insight) fbHtml += `<div class="feedback-item" style="background-color:rgba(168,85,247,0.15); border-left-color:#a855f7;">${fb.insight}</div>`;

            deckCard.innerHTML = `
                <div class="deck-title" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <div><span contenteditable="true" onblur="updateDeckState(${deck.originIdx}, 'title', this.innerText.trim().replace(/\\s*\\[추천도:\\s*\\d+점\\]/g, '') || '${deck.title}')" style="outline:none;">${deck.title}</span><span style="color:#ff9f43; font-size:13px; margin-left:12px; font-weight:bold; user-select:none;">[추천도: ${currentComputedScore}점]</span></div>
                    <button class="reset-deck-btn" onclick="updateDeckState(${deck.originIdx}, 'reset')" style="background-color:#c82333; color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-size:12px; font-weight:bold;">부대 초기화</button>
                </div>
                <div class="bond-box"><span class="bond-highlight">부대 인연 효과 :</span> <span style="display:inline-block; outline:none;">${calculateActivatedBond(deck.officers)}</span></div>
                ${hawkHtml}
                <div class="officers-row">${officersHtml}</div>
                <div class="feedback-container-box"><div class="feedback-header-title">📋 AI 메타 역추적 기반 실시간 맞춤 처방전</div><div class="feedback-list-wrapper">${fbHtml}</div></div>
                <div class="deck-footer-bar"><div class="footer-left"><select class="formation-select" onchange="updateDeckState(${deck.originIdx}, 'formation', this.value)">${fmtOptions}</select></div><div class="footer-right">${formationEffects[deck.formation] || formationEffects["추형진"]}</div></div>
            `;
            container.appendChild(deckCard);
        });
    } catch(e) {
        container.style.display = 'block';
        container.innerHTML = `<div style="background-color:#ffe6e6; border:2px solid red; padding:20px; color:black; font-weight:bold; border-radius:8px; margin:20px;"><h3 style="color:red;">[시스템 에러 감지] 렌더링 중 치명적 오류가 발생했습니다.</h3><p>원인: ${e.message}</p><p style="font-size:12px; color:#555; white-space:pre-wrap;">${e.stack}</p><button onclick="localStorage.clear(); location.reload();" style="margin-top:10px; padding:10px; background:red; color:white; border:none; cursor:pointer; font-weight:bold; border-radius:5px;">데이터 강제 초기화 및 재시작</button></div>`;
    }
}

function exportData() {
    try {
        const jsonString = JSON.stringify({ samguk_hobby_data: JSON.parse(localStorage.getItem('samguk_hobby_data')), samguk_deck_text: JSON.parse(localStorage.getItem('samguk_deck_text')) }, null, 2);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([jsonString], { type: "application/json;charset=utf-8" }));
        a.download = "samguk_wangjeon_database_backup.json";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (err) { alert("백업 파일 생성 실패: " + err.message); }
}

function triggerImport() { document.getElementById('import-file-input')?.click(); }

function importData(input) {
    if (!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const db = JSON.parse(e.target.result);
            if (!db.samguk_hobby_data && !db.samguk_deck_text) return alert("유효한 데이터 백업 규격이 확인되지 않습니다.");
            if (db.samguk_hobby_data) localStorage.setItem('samguk_hobby_data', JSON.stringify(db.samguk_hobby_data));
            if (db.samguk_deck_text) localStorage.setItem('samguk_deck_text', JSON.stringify(db.samguk_deck_text));
            alert("데이터 베이스 인프라 복구 완료. 동기화 스냅샷 적용을 위해 시스템을 리로드합니다.");
            location.reload();
        } catch (err) { alert("파일 스트림 해석 오류: 구조가 파손된 JSON 파일입니다."); }
    };
    reader.readAsText(input.files[0], "utf-8");
}

window.toggleSortMode = function(){}; 
window.saveEditedText = function(){}; 
window.changeFormation = (i, el) => updateDeckState(i, 'formation', el.value);
window.changeOfficer = (i, oI, el) => updateDeckState(i, 'off', el.value, oI);
window.changeTactic = (i, oI, sI, el) => updateDeckState(i, 'tac', el.value, oI, sI);
window.resetDeck = i => updateDeckState(i, 'reset');
window.exportData = exportData;
window.triggerImport = triggerImport;
window.importData = importData;

const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key: key } }));
};

window.addEventListener('local-storage-update', e => { if (e.detail.key === 'samguk_hobby_data' && document.getElementById('deck-container')) renderDeckBuilder(); });
window.addEventListener('storage', e => { if (e.key === 'samguk_hobby_data' && document.getElementById('deck-container')) renderDeckBuilder(); });
document.addEventListener('DOMContentLoaded', () => { loadDeckTextData(); renderDeckBuilder(); });
window.addEventListener('load', () => { if(document.getElementById('deck-container')) renderDeckBuilder(); });

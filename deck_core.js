console.log("[시스템 분석] deck_core.js 병종 강제 지정 컨트롤러 및 무결성 판별 엔진 기동");

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
    "현호제세", "호령삼군", "혼수모어", "홍수첨향", "화소적벽", "횡소천군", "횡징폭렴", "휴양생식", "사소도",
    "파진최견", "천하무적", "일기당천", "귀신정정"
].sort((a, b) => a.localeCompare(b, 'ko'));

const tacticAlternativesMap = {
    "횡징폭렴": ["동구적개", "동장철벽"], "이퇴위진": ["미우주무", "천시지리"],
    "용맹무쌍": ["만부막적", "비사주석"], "질풍노도": ["암전난방", "교취호탈"],
    "문치무공": ["양초선행", "중정기고"], "혼수모어": ["사면초가", "이간계"],
    "반객위주": ["일고작기", "사생취의"], "유좌유용": ["휴양생식", "제곤부위"],
    "선등함진": ["만천과해", "만전제발"], "강유겸제": ["동장철벽", "천시지리"],
    "진퇴유도": ["위위구조", "동구적개"], "견진연봉": ["동장철벽", "순수견양"],
    "위위구조": ["태청단경", "현호제세"], 
    "용왕직전": ["천리추격", "암전난방"], 
    "만부막적": ["용왕직전", "천리추격"], 
    "전위위안": ["태청단경", "현호제세"], "안영찰채": ["위위구조", "미우주무"],
    "일고작기": ["사생취의", "용맹무쌍"], "여자동포": ["동구적개", "천시지리"],
    "양의화생": ["기문둔갑", "화소적벽"], "수상개화": ["요사여신", "사생취의"],
    "요사여신": ["수상개화", "사생취의"], "견불가최": ["동장철벽", "동구적개"],
    "분성지계": ["화소적벽", "기문둔갑"], "운주유악": ["태청단경", "미우주무"],
    "동구적개": ["안영찰채", "위위구조"], "사생취의": ["일고작기", "용맹무쌍"],
    "양초선행": ["문치무공", "휴양생식"], "휴양생식": ["양초선행", "현호제세"],
    "동장철벽": ["견불가최", "천시지리"], "사면초가": ["기문둔갑", "화소적벽"],
    "횡소천군": ["강유겸제", "용맹무쌍"], 
    "천리추격": ["극적제승", "암전난방"], "암전난방": ["극적제승", "질풍노도"],
    "사소도": ["이간계", "낙정하석"],
    "파진최견": ["천하무적", "만부막적"], "천하무적": ["파진최견", "용맹무쌍"], 
    "일기당천": ["귀신정정", "일고작기"], "귀신정정": ["사생취의", "용맹무쌍"],
    "미우주무": ["현호제세", "태청단경"]
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

const analyzedMetaArchetypes = [
    { id: "wei_assassin", name: "위나라 신속 암살 덱 (호도진)", concept: "조조와 악진이 유틸리티를 전담하고 장료가 반객위주의 무용 스택을 쌓아 적 주장을 정밀 저격하는 랭커 1위/5위 조합", formation: "호도진", officers: [{ name: "장료", chosenTactics: ["함진살적", "질풍노도", "반객위주"] }, { name: "조조", chosenTactics: ["군령여산", "혼수모어", "진퇴유도"] }, { name: "악진", chosenTactics: ["분용당선", "동구적개", "강유겸제"] }] },
    { id: "shu_combo_spear", name: "촉나라 연격 창병 덱 (구행진)", concept: "위연과 서서가 적을 교란하는 사이 구행진 후열 마초가 반객위주의 물리 스택을 쌓아 폭딜을 가하는 랭커 2위 조합", formation: "구행진", officers: [{ name: "위연", chosenTactics: ["실병제위", "진퇴유도", "이퇴위진"] }, { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "반객위주"] }, { name: "서서", chosenTactics: ["절절학문", "문치무공", "혼수모어"] }] },
    { id: "shu_evasion_bangwon", name: "촉나라 황제강 디버프 덱 (방원진)", concept: "황충이 전열에서 공방을 수행하고 제갈량의 보호 속에서 후열 강유가 적의 스탯을 무한 강탈하는 랭커 3위 조합", formation: "방원진", officers: [{ name: "황충", chosenTactics: ["적혈도", "강유겸제", "진퇴유도"] }, { name: "제갈량", chosenTactics: ["초선차전", "전위위안", "안영찰채"] }, { name: "강유", chosenTactics: ["담대여두", "반객위주", "일고작기"] }] },
    { id: "shu_emperor_chu", name: "촉나라 제유장강 돌격 덱 (추형진)", concept: "유비(제왕)의 전열 토템 탱킹 아래 후열 장비와 강유가 추형진 가피증을 받아 물리 돌격력을 몰아치는 랭커 4위 조합", formation: "추형진", officers: [{ name: "유비", chosenTactics: ["재주복주", "여자동포", "안영찰채"] }, { name: "장비", chosenTactics: ["연인노호", "진퇴유도", "이아환아"] }, { name: "강유", chosenTactics: ["담대여두", "천리추격", "일고작기"] }] },
    { id: "shu_defense_spear", name: "촉나라 철벽 방어 덱 (방덱 전용)", concept: "조운의 통찰 탱킹과 제갈량의 무한 힐링 텐트 안에서 강유가 지속 딜 축적으로 적을 파쇄하는 우주방어 조합", formation: "어린진", officers: [{ name: "조운", chosenTactics: ["칠진칠출", "강유겸제", "진퇴유도"] }, { name: "제갈량", chosenTactics: ["초선차전", "동장철벽", "미우주무"] }, { name: "강유", chosenTactics: ["담대여두", "일고작기", "수상개화"] }] },
    { id: "qun_cavalry", name: "군웅 돌격 기병 덱 (구행진)", concept: "원소와 동탁이 전열을 버티고 구행진 버프를 받은 여포가 완벽한 추격(돌격) 전법으로 적을 분쇄하는 조합", formation: "구행진", officers: [{ name: "원소", chosenTactics: ["사소도", "견진연봉", "위위구조"] }, { name: "여포", chosenTactics: ["천하무쌍", "용왕직전", "만부막적"] }, { name: "동탁", chosenTactics: ["전권난정", "운주유악", "횡징폭렴"] }] },
    { id: "wu_magic_bow", name: "오나라 모략 신기루 덱 (구행진)", concept: "육항과 노숙의 극단적인 버프를 손권에게 몰아주어 후열에서 압도적인 모략/물리 복합 피해를 뿜어내는 조합", formation: "구행진", officers: [{ name: "손권", chosenTactics: ["웅거", "진퇴유도", "강유겸제"] }, { name: "육항", chosenTactics: ["청백충근", "수상개화", "요사여신"] }, { name: "노숙", chosenTactics: ["탑상책", "분성지계", "여자동포"] }] },
    { id: "wei_nuke", name: "위나라 방패 핵폭탄 덱 (클래식)", concept: "사마의의 후반 캐리력과 조조(제왕)의 버프를 결합한 장기전 특화 방패병 조합", formation: "추형진", officers: [{ name: "하후돈", chosenTactics: ["발시담정", "견불가최", "유좌유용"] }, { name: "조조(제왕)", chosenTactics: ["군령여산", "횡징폭렴", "동구적개"] }, { name: "사마의", chosenTactics: ["응시낭고", "운주유악", "반객위주"] }] },
    { id: "shu_perfect", name: "촉나라 무상성 창병 덱 (공덱 클래식)", concept: "조운이 전열에서 적 제어를 무시하고 폭딜을 넣으며, 후열에서 제어와 힐을 지원하는 0티어 무결점 조합", formation: "어린진", officers: [{ name: "조운", chosenTactics: ["칠진칠출", "만부막적", "횡소천군"] }, { name: "제갈량", chosenTactics: ["초선차전", "혼수모어", "전위위안"] }, { name: "유비", chosenTactics: ["인정", "안영찰채", "동구적개"] }] },
    { id: "qun_evasion", name: "군웅 무쌍 궁병 덱 (클래식)", concept: "여포가 후열에서 연격 버프를 독식하여 1~2턴 만에 적 주장을 썰어버리는 클래식 1턴킬 조합", formation: "방원진", officers: [{ name: "좌자", chosenTactics: ["화겁생기", "운주유악", "횡징폭렴"] }, { name: "화타", chosenTactics: ["청낭제세", "동구적개", "동장철벽"] }, { name: "여포", chosenTactics: ["천하무쌍", "일기당천", "귀신정정"] }] }
];

const metaDeckUnitTypeMap = {
    "wei_assassin": "창병", "shu_combo_spear": "창병", "shu_evasion_bangwon": "궁병",
    "shu_emperor_chu": "기병", "shu_defense_spear": "창병", "qun_cavalry": "기병",
    "wu_magic_bow": "궁병", "wei_nuke": "방패병", "shu_perfect": "창병", "qun_evasion": "궁병"
};

const defaultPresetDecks = analyzedMetaArchetypes.slice(0, 5).map((d, i) => {
    let copy = JSON.parse(JSON.stringify(d));
    copy.title = `${i + 1}군`;
    copy.unitType = ""; // 신규 프로퍼티: 유저 강제 지정 병종
    copy.officers.forEach(off => {
        if(off.chosenTactics.length === 3) off.chosenTactics = off.chosenTactics.slice(1, 3);
    });
    return copy;
});

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

const metaHawkRecommendationMap = {
    "wei_assassin": { name: "능소 (SSR)", skill: "전투 시작 시 아군 전체 피해 30% 감소 및 [진시/전우] 스킬 연동 최적화" },
    "shu_combo_spear": { name: "능소 (SSR)", skill: "전투 시작 시 아군 [전우] 효과 활성화로 안정적 연격 딜 수급" },
    "shu_evasion_bangwon": { name: "결운 (SSR)", skill: "턴 시작 시 병력 최저 아군 치료 및 [호생] 기믹을 통한 궁병 생존력 보완" },
    "shu_emperor_chu": { name: "삭풍 (SSR)", skill: "턴 종료 시 무용 최고 아군의 물리 피해 15% 버프 및 [설조] 공격 발동" },
    "shu_defense_spear": { name: "감로 (SSR / 결운)", skill: "전투 시작 시 아군 [치유] 및 제어기 면역으로 수비력 극대화" },
    "qun_cavalry": { name: "열공 (SSR)", skill: "턴 시작 시 아군 무용/통솔 30% 증가. 여포의 돌파력 극대화" },
    "wu_magic_bow": { name: "능소 (SSR)", skill: "전투 시작 시 아군 전체 피해 30% 감소로 후반 예열을 돕는 방벽" },
    "wei_nuke": { name: "진시 (SSR / 능소)", skill: "전투 시작 시 아군 [절극] 부여. 매 턴 아군 전체 피해 30% 감소" },
    "shu_perfect": { name: "감로 (SSR / 결운)", skill: "전투 시작 시 아군 [치유] 및 1중첩 [각성] 주입하여 제어기 면역 극대화" },
    "qun_evasion": { name: "전광 (SSR / 열공)", skill: "턴 시작 시 아군 무용/통솔 30% 증가. 여포의 1턴 킬 확률 극대화" }
};

const metaHawkAlternativesMap = {
    "wei_assassin": ["전광 (SSR)", "설조 (SSR)"],
    "shu_combo_spear": ["전광 (SSR)", "설조 (SSR)"],
    "shu_evasion_bangwon": ["감로 (SSR)", "전우 (SSR)"],
    "shu_emperor_chu": ["전광 (SSR)", "성모 (SSR)"],
    "shu_defense_spear": ["호생 (SSR)", "능소 (SSR)"],
    "qun_cavalry": ["설조 (SSR)", "전광 (SSR)"],
    "wu_magic_bow": ["진시 (SSR)", "호생 (SSR)"],
    "wei_nuke": ["설조 (SSR)", "호생 (SSR)"],
    "shu_perfect": ["여천 (SSR)", "전광 (SSR)"],
    "qun_evasion": ["설조 (SSR)", "감로 (SSR)"]
};

const metaHawkRandomAttributesMap = {
    "wei_assassin": {
        attr1: { rank1: "속도 +25", rank2: "무용 +12%", rank3: "전능 +6%" },
        attr2: { rank1: "파갑(방어 관통) +12%", rank2: "가하는 피해 증가 +8%", rank3: "적 주장 타격 보너스" },
        attr3: { rank1: "첫 턴 확정 선공", rank2: "첫 턴 제어 면역", rank3: "적 회피 15% 무시" }
    },
    "shu_combo_spear": {
        attr1: { rank1: "무용 +12%", rank2: "속도 +20", rank3: "전능 +6%" },
        attr2: { rank1: "연격률 +10%", rank2: "확산 피해 +12%", rank3: "가하는 물리 피해 +10%" },
        attr3: { rank1: "평타 3회 후 무장해제", rank2: "첫 턴 확정 선공", rank3: "무용 타격 시 15% 흡혈" }
    },
    "shu_evasion_bangwon": {
        attr1: { rank1: "모략 +12%", rank2: "전능 +6%", rank3: "통솔 +10%" },
        attr2: { rank1: "가하는 모략 피해 +10%", rank2: "받는 피해 감소 +8%", rank3: "치유 효과 상승 +12%" },
        attr3: { rank1: "모면(회피) +6%", rank2: "매 턴 디버프 해제", rank3: "피격 시 10% 저항" }
    },
    "shu_emperor_chu": {
        attr1: { rank1: "무용 +12%", rank2: "속도 +20", rank3: "통솔 +10%" },
        attr2: { rank1: "가하는 물리 피해 +10%", rank2: "연격률 +8%", rank3: "가하는 피해 증가 +8%" },
        attr3: { rank1: "첫 턴 확정 선공", rank2: "돌격 전법 데미지 +15%", rank3: "무용 타격 시 15% 흡혈" }
    },
    "shu_defense_spear": {
        attr1: { rank1: "통솔 +12%", rank2: "전능 +6%", rank3: "최대 병력 +8%" },
        attr2: { rank1: "받는 피해 감소 +8%", rank2: "모략 피해 감소 +10%", rank3: "무용 피해 감소 +10%" },
        attr3: { rank1: "치유 효과 상승 +12%", rank2: "피격 시 10% 저항", rank3: "디버프 해제(확률)" }
    },
    "qun_cavalry": {
        attr1: { rank1: "무용 +12%", rank2: "속도 +20", rank3: "통솔 +10%" },
        attr2: { rank1: "파갑(방어 관통) +10%", rank2: "연격률 +8%", rank3: "가하는 물리 피해 +10%" },
        attr3: { rank1: "첫 턴 확정 선공", rank2: "돌격 전법 데미지 +15%", rank3: "평타 시 10% 혼란" }
    },
    "wu_magic_bow": {
        attr1: { rank1: "모략 +12%", rank2: "속도 +20", rank3: "통솔 +10%" },
        attr2: { rank1: "가하는 모략 피해 +10%", rank2: "능동 전법 발동률 +5%", rank3: "받는 피해 감소 +8%" },
        attr3: { rank1: "치유 효과 상승 +12%", rank2: "매 턴 디버프 해제", rank3: "모면(회피) +6%" }
    },
    "wei_nuke": {
        attr1: { rank1: "통솔 +12%", rank2: "모략 +10%", rank3: "최대 병력 +8%" },
        attr2: { rank1: "받는 피해 감소 +8%", rank2: "모략 피해 감소 +10%", rank3: "무용 피해 감소 +10%" },
        attr3: { rank1: "치유 효과 상승 +12%", rank2: "피격 시 10% 저항", rank3: "디버프 해제(확률)" }
    },
    "shu_perfect": {
        attr1: { rank1: "전능(모든 스탯) +6%", rank2: "무용 +10%", rank3: "통솔 +10%" },
        attr2: { rank1: "가하는 피해 증가 +8%", rank2: "받는 피해 감소 +8%", rank3: "전법 발동률 +4%" },
        attr3: { rank1: "첫 턴 제어 면역", rank2: "무용 타격 시 15% 흡혈", rank3: "모면(회피) +6%" }
    },
    "qun_evasion": {
        attr1: { rank1: "무용 +12%", rank2: "속도 +20", rank3: "통솔 +10%" },
        attr2: { rank1: "파갑(방어 관통) +10%", rank2: "연격률 +8%", rank3: "가하는 물리 피해 +10%" },
        attr3: { rank1: "첫 턴 확정 선공", rank2: "돌격 전법 데미지 +15%", rank3: "평타 시 10% 혼란" }
    },
    "custom": {
        attr1: { rank1: "전능 +5%", rank2: "통솔 +10%", rank3: "무용 +10%" },
        attr2: { rank1: "가하는 피해 증가 +6%", rank2: "받는 피해 감소 +6%", rank3: "전법 발동률 +3%" },
        attr3: { rank1: "첫 턴 제어 면역", rank2: "첫 턴 선공", rank3: "턴 종료 시 병력 회복" }
    }
};

const systemGuideInsights = {
    "wei_assassin": "💡 <strong style='color:#a855f7;'>[랭커 메타 교정 완료]</strong> 호도진을 활용한 장료의 적 주장 암살 덱입니다. 물리/모략 하이브리드 패시브인 '반객위주'로 장료의 연속 타격 스택을 극한으로 쌓아올립니다.",
    "shu_combo_spear": "💡 <strong style='color:#a855f7;'>[랭커 메타 교정 완료]</strong> 위연과 서서가 유틸리티를 챙기고 마초가 '반객위주'의 물리 스택을 폭발시켜 구행진 확산 딜을 뿜어냅니다.",
    "shu_evasion_bangwon": "💡 <strong style='color:#a855f7;'>[랭커 메타 교차 검증]</strong> 황충이 전열을 버티고 제갈량의 보호막 안에서 강유가 적의 스탯을 무한 강탈하는 변칙 방원진 덱입니다.",
    "shu_emperor_chu": "💡 <strong style='color:#a855f7;'>[랭커 메타 교차 검증]</strong> 유비(제왕)의 전열 토템 탱킹 아래 후열 장비와 강유가 추형진 가피증을 받아 물리 돌격력을 몰아치는 극공 덱입니다.",
    "shu_defense_spear": "💡 <strong style='color:#a855f7;'>[방어 덱 특화 로직]</strong> 공격적인 돌파를 포기하는 대신, 조운과 제갈량의 단단한 맷집에 강유의 유틸리티를 섞어 거점 수비 및 적 에이스 부대 소모전에 최적화된 우주방어 덱입니다.",
    "qun_cavalry": "💡 <strong style='color:#a855f7;'>[랭커 메타 교정 완료]</strong> 여포의 평타 다단히트에 폭발적으로 반응하는 추격 전법(용왕직전/만부막적)의 시너지가 핵심인 1턴킬 덱입니다.",
    "wu_magic_bow": "💡 <strong style='color:#a855f7;'>[랭커 메타 교차 검증]</strong> 육항과 노숙이 손권에게 스탯과 크리티컬 버프를 몰아주는 구행진 기반의 강력한 대기만성 복합 캐리 덱입니다.",
    "wei_nuke": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동]</strong> 조조(제왕)를 전열에 세워 탱킹을 전담하고, 사마의와 하후돈을 후열에 배치해 '추형진'의 가피증 버프를 독식하게 만드는 클래식 0티어 방패병 덱입니다.",
    "shu_perfect": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동]</strong> 금강불괴 조운을 전열에 배치해 적의 제어기를 온몸으로 흡수하고, 후열의 제갈량과 유비가 무한 동력으로 힐과 제어를 뿜어내는 0티어 무결점 공덱입니다.",
    "qun_evasion": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동]</strong> 여포를 후열에 혼자 두어 '방원진'의 연격률(+28%) 버프를 독식하게 만드는 클래식 1턴 킬 궁병 덱입니다."
};

const tacticalSet = new Set(["사마의", "순욱", "정욱", "가후", "곽가", "제갈량", "서서", "강유", "황월영", "육손", "주유", "육항", "노숙", "대교", "소교", "장각", "우길", "좌자", "화타", "채문희", "초선", "장녕", "장보"]);
const supportSet = new Set(["조조", "조조(제왕)", "유비", "유비(제왕)", "손권", "손권(제왕)", "화타", "좌자", "채문희", "노숙", "원소", "동탁"]);
const shieldSet = new Set(["장비", "조조", "조조(제왕)", "유비", "유비(제왕)", "전위", "동탁", "장각", "사마의", "손견"]);
const cavSet = new Set(["마초", "장료", "하후돈", "하후연", "여포", "서서", "곽가", "정욱", "가후", "손상향", "태사자", "원소", "악진"]);
const bowSet = new Set(["황충", "강유", "제갈량", "육손", "주유", "원소", "감녕", "황월영", "육항", "우길", "초선", "장보", "장녕", "손권", "노숙", "좌자"]);

// ==========================================================================
// LAYER 2: 3중 도감 복구 및 스마트 분류 엔진 인터페이스
// ==========================================================================
function getOfficerEquipment(officerName, deckUnitType = "방패병") {
    if (typeof window.getEquipmentRecommendationFromGuide === 'function') {
        const extEq = window.getEquipmentRecommendationFromGuide(officerName);
        if (extEq && extEq.helmet) return extEq;
    }

    let damageAttr = "무용 피해 가함"; 
    let accAttr1 = "무용 피해 가함";   

    if (tacticalSet.has(officerName)) {
        damageAttr = "모략 피해 가함";
        accAttr1 = "모략 피해 가함";
    }
    if (supportSet.has(officerName)) {
        damageAttr = "치유 효과 상승";
        accAttr1 = "치유 효과 상승";
    }

    return { 
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "통솔 증가" }, 
        armor: { name: "명재복", attr1: "피해 감소", attr2: damageAttr }, 
        accessory: { name: "박산로", attr1: accAttr1, attr2: `${deckUnitType} 피해 감소` } 
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

// ==========================================================================
// LAYER 3: 코어 연산 엔진 구역
// ==========================================================================
function calculateStrictDeckScore(deck) {
    if (!deck?.officers || !Array.isArray(deck.officers)) return 0;
    const curNamesClean = deck.officers.map(o => o?.name?.toString().trim().replace(/\s+/g, '') || "").filter(Boolean);
    if (!curNamesClean.length) return 0;

    let bestMatchDeck = analyzedMetaArchetypes[0], maxMatchScore = -1;

    analyzedMetaArchetypes.forEach(metaDeck => {
        let matchScore = 0;
        metaDeck.officers.forEach((mo, idx) => {
            const mName = mo.name.replace(/\s+/g, '');
            if (curNamesClean.includes(mName)) matchScore += 1; 
            if (curNamesClean[idx] === mName) matchScore += 0.5;
        });
        if (matchScore > maxMatchScore) { maxMatchScore = matchScore; bestMatchDeck = metaDeck; }
    });

    if (maxMatchScore === 0) return 0; 

    let score = 100;
    const curFmt = deck.formation?.toString().trim() || "";
    const idealFmt = bestMatchDeck.formation.trim();
    if (curFmt.replace(/\s+/g, '') !== idealFmt.replace(/\s+/g, '')) score -= 10;

    bestMatchDeck.officers.forEach((metaOff, metaIdx) => {
        const mName = metaOff.name.replace(/\s+/g, '');
        const userOffIdx = curNamesClean.indexOf(mName);

        if (userOffIdx === -1) {
            score -= 30; 
        } else {
            const curRow = formationPositions[curFmt]?.[userOffIdx] || "front";
            const idealRow = formationPositions[idealFmt]?.[metaIdx] || "front";
            if (curRow !== idealRow) score -= 10;

            const userOff = deck.officers[userOffIdx];
            const metaTacsClean = metaOff.chosenTactics.length === 3 ? [metaOff.chosenTactics[1].trim().replace(/\s+/g, ''), metaOff.chosenTactics[2].trim().replace(/\s+/g, '')] : metaOff.chosenTactics.map(t => t.trim().replace(/\s+/g, ''));
            let unmatchTac = [...metaTacsClean];
            
            let emptyOrWrongCount = 0;
            let altCount = 0;

            if (Array.isArray(userOff.chosenTactics)) {
                userOff.chosenTactics.forEach(tac => {
                    const cleanTac = tac?.toString().trim().replace(/\s+/g, '') || "";
                    const exactIdx = unmatchTac.indexOf(cleanTac);
                    if (exactIdx !== -1) unmatchTac.splice(exactIdx, 1);
                });

                userOff.chosenTactics.forEach(tac => {
                    const cleanTac = tac?.toString().trim().replace(/\s+/g, '') || "";
                    if (cleanTac !== "" && !metaTacsClean.includes(cleanTac)) {
                        let isAlt = false;
                        for (let i = 0; i < unmatchTac.length; i++) {
                            const pTac = unmatchTac[i];
                            const alts = tacticAlternativesMap[pTac] || [];
                            if (alts.includes(cleanTac)) {
                                isAlt = true;
                                unmatchTac.splice(i, 1);
                                break;
                            }
                        }
                        if (isAlt) altCount++;
                        else emptyOrWrongCount++;
                    } else if (cleanTac === "") {
                        emptyOrWrongCount++;
                    }
                });
            } else {
                emptyOrWrongCount += 2;
            }

            score -= (altCount * 2);
            score -= (emptyOrWrongCount * 5);
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

    if (maxMatchScore === 0) {
        fb.logs.push({ type: 'info', text: `💡 <strong>분석 완료:</strong> 시스템에 등록된 주류 메타와 일치하는 무장이 없는 <strong>[창작/커스텀 덱]</strong>입니다. 100점 달성을 원하신다면 코어 장수(예: 조조, 여포, 조운 등)를 기반으로 덱을 재설계해 보십시오.` });
        deck.officers.forEach((off, offIdx) => {
            if (!off?.name) return;
            const hName = off.name.toString().trim();
            if (!heroDataMap[hName]?.isOwned) fb.logs.push({ type: 'warning', text: `자원 경고: [${hName}] 장수가 미보유 상태입니다.` });

            if (Array.isArray(off.chosenTactics)) {
                off.chosenTactics.forEach((tac, tIdx) => {
                    const rawTac = tac?.toString().trim() || "";
                    if (rawTac !== "" && !tacticDataMap[rawTac.replace(/\s+/g, '')]?.isOwned) {
                        fb.logs.push({ type: 'warning', text: `자원 부족: [${hName}]의 ${tIdx + 2}번 슬롯 전법 <strong>[${rawTac}]</strong>이 미보유 상태입니다.` });
                    }
                });
            }
        });
        return fb;
    }

    fb.logs.push({ type: 'info', text: `🎯 <strong>메타 추적 완료:</strong> 현재 조합은 <strong>[${bestMatchDeck.name}]</strong> 기반입니다. 추천도 100점을 위해 아래의 처방을 완수하십시오. (${bestMatchDeck.concept})` });
    
    if (systemGuideInsights[bestMatchDeck.id]) fb.insight = systemGuideInsights[bestMatchDeck.id];

    const curFmt = deck.formation?.toString().trim() || "";
    const idealFmt = bestMatchDeck.formation.trim();
    if (curFmt.replace(/\s+/g, '') !== idealFmt.replace(/\s+/g, '')) {
        fb.logs.push({ type: 'warning', text: `진형 교정: [${curFmt}] ➔ <strong>[${idealFmt}]</strong> (해당 메타의 핵심 시너지 포지셔닝을 위해 변경을 권장합니다.)` });
    }

    const allEquippedTacticsInDeck = [];
    deck.officers.forEach(o => {
        o?.chosenTactics?.forEach(t => {
            if (t) allEquippedTacticsInDeck.push(t.toString().trim().replace(/\s+/g, ''));
        });
    });

    let missingMeta = bestMatchDeck.officers.filter(mo => !curNames.includes(mo.name.replace(/\s+/g, '')));

    deck.officers.forEach((off, offIdx) => {
        if (!off) return;
        const hName = off.name?.toString().trim() || "";
        const cleanHName = hName.replace(/\s+/g, '');
        
        if (!cleanHName) {
            if (missingMeta.length) fb.logs.push({ type: 'warning', text: `장수 배치: <strong>[빈 슬롯]</strong> ➔ <strong>[${missingMeta.shift().name}]</strong> 투입 (시너지 복구를 위한 강력 추천 코어 무장)` });
            return;
        }

        const heroInv = heroDataMap[hName] || { isOwned: false, star: 0 };
        if (!heroInv.isOwned) fb.logs.push({ type: 'warning', text: `자원 경고: [${hName}] 장수가 미보유 상태입니다. (장수 도감 확인 요망)` });

        const metaIdx = bestMatchDeck.officers.findIndex(mo => mo.name.replace(/\s+/g, '') === cleanHName);

        if (metaIdx !== -1) {
            const metaOff = bestMatchDeck.officers[metaIdx];
            const curRow = formationPositions[curFmt]?.[offIdx] || "front";
            const idealRow = formationPositions[idealFmt]?.[metaIdx] || "front";

            if (curRow !== idealRow) {
                fb.logs.push({ type: 'warning', text: `배치 교정: <strong>[${hName}]</strong> 장수는 메타 아키텍처상 <strong>${idealRow === 'front' ? '전열' : '후열'}</strong> 포지션이어야 하나, 현재 <strong>${curRow === 'front' ? '전열' : '후열'}</strong> 슬롯에 가 있습니다.` });
            }

            const metaTacsClean = metaOff.chosenTactics.length === 3 ? [metaOff.chosenTactics[1].trim().replace(/\s+/g, ''), metaOff.chosenTactics[2].trim().replace(/\s+/g, '')] : metaOff.chosenTactics.map(t => t.trim().replace(/\s+/g, ''));
            
            let unmatchTac = metaTacsClean.filter(t => {
                const cT = t.trim().replace(/\s+/g, '');
                return !allEquippedTacticsInDeck.includes(cT);
            });

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
                            let matchedPrimaryIdx = -1;
                            for (let i = 0; i < unmatchTac.length; i++) {
                                const pTac = unmatchTac[i];
                                const alts = tacticAlternativesMap[pTac] || [];
                                if (alts.includes(cleanTac)) {
                                    matchedPrimaryIdx = i;
                                    break;
                                }
                            }

                            if (matchedPrimaryIdx !== -1) {
                                const primaryTac = unmatchTac.splice(matchedPrimaryIdx, 1)[0];
                                fb.logs.push({ 
                                    type: 'info', 
                                    text: `📈 <strong>전법 빌드업:</strong> [${hName}]의 ${tIdx + 2}번 슬롯에 대체 전법 <strong>[${rawTac}]</strong>을(를) 유효하게 활용 중입니다. 훌륭한 선택이나, 추후 최고점을 위해 🥇1순위 <strong>[${primaryTac}]</strong>(으)로 업그레이드를 목표로 하십시오.` 
                                });
                            } else {
                                const primaryTac = unmatchTac.shift();
                                const alts = tacticAlternativesMap[primaryTac] || ["유사 역할 A급 전법", "유사 역할 B급 전법"];
                                fb.logs.push({ 
                                    type: 'warning', 
                                    text: `전법 튜닝: [${hName}]의 ${tIdx + 2}번 슬롯 [${rawTac}] 교체 요망 ➔ 🥇1순위: <strong>[${primaryTac}]</strong> / 🥈2순위: <strong>[${alts[0]}]</strong> / 🥉3순위: <strong>[${alts[1]}]</strong> 권장` 
                                });
                            }
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
                fb.logs.push({ type: 'warning', text: `🚀 <strong>100점 달성 장수 교체:</strong> 덱 컨셉에 맞지 않는 [${hName}]을(를) 빼고, 핵심 코어인 <strong>[${replaceWith.name}]</strong>(을)를 투입하십시오.` });
            } else {
                fb.logs.push({ type: 'warning', text: `🚀 <strong>100점 달성 장수 초과:</strong> [${hName}] 장수는 100점 메타 시너지에 포함되지 않으므로 제외하십시오.` });
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
                    deck.unitType = deck.unitType || ""; // [신규]: 병종 상태 유지
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
        deck.unitType = "";
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
            
            let matchScoreMax = -1, currentBestMetaId = null; 
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

            // [병종 판별 최적화]: 유저 수동 지정 > 메타 정답지 > 장수 풀 추론
            let deckUnitType = deck.unitType; 
            let hawkHtml = '';

            if (curNamesClean.length > 0) {
                if (matchScoreMax > 0 && currentBestMetaId) {
                    if (!deckUnitType) deckUnitType = metaDeckUnitTypeMap[currentBestMetaId];
                    const hawkData = metaHawkRecommendationMap[currentBestMetaId] || { name: "데이터 없음", skill: "누락" };
                    const hawkAlts = metaHawkAlternativesMap[currentBestMetaId] || ["범용 SSR 매", "범용 SR 매"];
                    const hawkAttr = metaHawkRandomAttributesMap[currentBestMetaId] || metaHawkRandomAttributesMap["custom"];
                    
                    hawkHtml = `<div class="hawk-recommend-box" style="margin-top:10px; padding:12px 15px; background:linear-gradient(90deg, rgba(56,189,248,0.15) 0%, rgba(20,20,20,0) 100%); border-left:4px solid #38bdf8; border-radius:4px; display:flex; flex-direction:column; gap:5px;">
                        <div style="font-size:13px; font-weight:bold; color:#38bdf8; letter-spacing:-0.5px;">🦅 메타 최적화 전투매 세팅</div>
                        <div style="font-size:12px; color:#ddd; line-height:1.4;">🥇1순위: <strong>${hawkData.name}</strong> (${hawkData.skill})</div>
                        <div style="font-size:11px; color:#bbb; line-height:1.4;">🥈2순위: <strong>${hawkAlts[0]}</strong> / 🥉3순위: <strong>${hawkAlts[1]}</strong> 권장</div>
                        <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed rgba(56,189,248,0.3);">
                            <div style="font-size:12px; font-weight:bold; color:#fff; margin-bottom: 2px;">🎲 권장 랜덤 속성 (1~3순위)</div>
                            <div style="font-size:11px; color:#ddd;">▪️ <strong>[속성1/기초]</strong> 🥇${hawkAttr.attr1.rank1} / 🥈${hawkAttr.attr1.rank2} / 🥉${hawkAttr.attr1.rank3}</div>
                            <div style="font-size:11px; color:#ddd;">▪️ <strong>[속성2/보정]</strong> 🥇${hawkAttr.attr2.rank1} / 🥈${hawkAttr.attr2.rank2} / 🥉${hawkAttr.attr2.rank3}</div>
                            <div style="font-size:11px; color:#ddd;">▪️ <strong>[속성3/기믹]</strong> 🥇${hawkAttr.attr3.rank1} / 🥈${hawkAttr.attr3.rank2} / 🥉${hawkAttr.attr3.rank3}</div>
                        </div>
                    </div>`;
                } else {
                    let typeCounts = { "방패병": 0, "기병": 0, "궁병": 0, "창병": 0 };
                    let roleCounts = { physical: 0, magic: 0, support: 0 };

                    curNamesClean.forEach(name => {
                        if (supportSet.has(name) || name === "순욱") roleCounts.support++;
                        else if (tacticalSet.has(name)) roleCounts.magic++;
                        else roleCounts.physical++;

                        if (shieldSet.has(name)) typeCounts["방패병"]++;
                        else if (cavSet.has(name)) typeCounts["기병"]++;
                        else if (bowSet.has(name)) typeCounts["궁병"]++;
                        else typeCounts["창병"]++;
                    });

                    if (!deckUnitType) {
                        deckUnitType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b) || "창병";
                    }

                    let hawkData = { name: "전광 (SSR / 열공)", skill: "턴 시작 시 아군 전체의 무용/통솔 30% 증가 (범용 무력 최적화)" };
                    let fallbackAlts = "🥇1순위: 전광 / 🥈2순위: 설조 / 🥉3순위: 진시";
                    let hawkAttr = metaHawkRandomAttributesMap["custom"];

                    if (roleCounts.magic > roleCounts.physical) {
                        hawkData = { name: "여천 (SSR / 열공)", skill: "턴 시작 시 아군 전체의 모략/통솔 30% 증가 (범용 모략 딜링 최적화)" };
                        fallbackAlts = "🥇1순위: 여천 / 🥈2순위: 성모 / 🥉3순위: 감로";
                        hawkAttr = {
                            attr1: { rank1: "모략 +10%", rank2: "전능 +5%", rank3: "통솔 +10%" },
                            attr2: { rank1: "모략 피해 증가 +8%", rank2: "받는 피해 감소 +6%", rank3: "전법 발동률 +3%" },
                            attr3: { rank1: "첫 턴 제어 면역", rank2: "첫 턴 선공", rank3: "치유 효과 +10%" }
                        };
                    }
                    if (roleCounts.support >= 2) {
                        hawkData = { name: "호생 (SSR / 결운)", skill: "턴 시작 시 병력 최저 2명 치료율 220% 즉시 세이브 (유지력 생존 최적화)" };
                        fallbackAlts = "🥇1순위: 호생 / 🥈2순위: 감로 / 🥉3순위: 진시";
                        hawkAttr = {
                            attr1: { rank1: "통솔 +12%", rank2: "전능 +5%", rank3: "속도 +15" },
                            attr2: { rank1: "받는 피해 감소 +8%", rank2: "치유 효과 상승 +10%", rank3: "전법 발동률 +3%" },
                            attr3: { rank1: "턴 종료 시 디버프 해제", rank2: "첫 턴 제어 면역", rank3: "모면(회피) +6%" }
                        };
                    }

                    hawkHtml = `<div class="hawk-recommend-box" style="margin-top:10px; padding:12px 15px; background:linear-gradient(90deg, rgba(248, 113, 113, 0.15) 0%, rgba(20,20,20,0) 100%); border-left:4px solid #f87171; border-radius:4px; display:flex; flex-direction:column; gap:5px;">
                        <div style="font-size:13px; font-weight:bold; color:#f87171; letter-spacing:-0.5px;">🦅 커스텀 분석 전투매 : ${hawkData.name}</div>
                        <div style="font-size:12px; color:#ddd; line-height:1.4; margin-bottom:2px;">${hawkData.skill}</div>
                        <div style="font-size:11px; color:#bbb; line-height:1.4;">📋 속성 대체 추천 ➔ ${fallbackAlts}</div>
                        <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed rgba(248, 113, 113, 0.3);">
                            <div style="font-size:12px; font-weight:bold; color:#fff; margin-bottom: 2px;">🎲 권장 랜덤 속성 (1~3순위)</div>
                            <div style="font-size:11px; color:#ddd;">▪️ <strong>[속성1/기초]</strong> 🥇${hawkAttr.attr1.rank1} / 🥈${hawkAttr.attr1.rank2} / 🥉${hawkAttr.attr1.rank3}</div>
                            <div style="font-size:11px; color:#ddd;">▪️ <strong>[속성2/보정]</strong> 🥇${hawkAttr.attr2.rank1} / 🥈${hawkAttr.attr2.rank2} / 🥉${hawkAttr.attr2.rank3}</div>
                            <div style="font-size:11px; color:#ddd;">▪️ <strong>[속성3/기믹]</strong> 🥇${hawkAttr.attr3.rank1} / 🥈${hawkAttr.attr3.rank2} / 🥉${hawkAttr.attr3.rank3}</div>
                        </div>
                    </div>`;
                }
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
                    eqHtml = `<div class="equipment-recommendation-box" style="margin-top:8px; padding:8px 12px; background:rgba(0,0,0,0.2); border:1px solid #555; border-radius:4px; font-size:11px; text-align:left; line-height:1.6; color:#ddd;"><div style="color:#ff9f43; font-weight:bold; margin-bottom:4px;">🛠️ 시스템 권장 장비 세트</div><div>🪖 <strong>투구:</strong> <span style="color:#fff;">${eq.helmet.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eq.helmet.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eq.helmet.attr2}</span>)</div><div>🛡️ <strong>갑옷:</strong> <span style="color:#fff;">${eq.armor.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eq.armor.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eq.armor.attr2}</span>)</div><div>📿 <strong>장신구:</strong> <span style="color:#fff;">${eq.accessory.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eq.accessory.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eq.accessory.attr2}</span>)</div></div>`;
                }

                return `<div class="officer-slot" style="${!cleanHName ? 'border:1px dashed #444; background-color:rgba(0,0,0,0.1);' : ''}"><div class="officer-meta"><span class="position-badge ${curPos}">${curPos==='front'?'전열':'후열'}</span><div class="officer-select-container"><select class="officer-dropdown" onchange="updateDeckState(${deck.originIdx}, 'off', this.value, ${offIdx})">${officerOptionsHtml}</select></div></div>${eqHtml}<div class="tactic-status-box" style="margin-top:8px;">${tacticRowsHtml}</div></div>`;
            }).join('');

            const fmtOptions = Object.keys(formationEffects).map(f => `<option value="${f}" ${deck.formation===f?'selected':''}>${f}</option>`).join('');
            
            // [UI 신규 기능]: 병종 강제 선택 드롭다운 옵션 HTML 생성
            const unitTypeOptionsHtml = ["자동 판별", "창병", "기병", "궁병", "방패병"]
                .map(u => `<option value="${u === '자동 판별' ? '' : u}" ${deck.unitType === (u === '자동 판별' ? '' : u) ? 'selected' : ''}>${u}</option>`)
                .join('');

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
                <div class="deck-footer-bar">
                    <div class="footer-left">
                        <select class="formation-select" onchange="updateDeckState(${deck.originIdx}, 'formation', this.value)">${fmtOptions}</select>
                        <select class="unit-type-select" style="margin-left: 8px; padding: 6px 10px; background-color: #2a2a2a; color: #feca57; border: 1px solid #555; border-radius: 4px; font-weight: bold; cursor: pointer; outline: none;" onchange="updateDeckState(${deck.originIdx}, 'unitType', this.value)">${unitTypeOptionsHtml}</select>
                    </div>
                    <div class="footer-right">${formationEffects[deck.formation] || formationEffects["추형진"]}</div>
                </div>
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

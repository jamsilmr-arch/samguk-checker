console.log("[시스템 분석] deck_core.js 3대 장비 명세서 기준 속성 동기화 엔진 기동 승인");

// ==========================================================================
// LAYER 1: 마스터 정적 데이터베이스 구역 (진형, 무장, 인연, 장비, 인사이트, 메타 아키타입)
// ==========================================================================
const formationEffects = {
    "일자진": "전열: 받는 피해 감소 6.0% | 후열: -",
    "구행진": "전열: 받는 피해 감소 5.0% | 후열: 가하는 피해 증가 12.0%",
    "추형진": "전열: 받는 피해 감소 6.0% | 후열: 가하는 피해 증가 8.0%",
    "기형진": "전열: 가하는 피해 증가 12.0% | 후열: 받는 피해 감소 5.0%",
    "어린진": "전열: 반격률 증가 20.0% | 후열: 받는 피해 감소 6.0%",
    "방원진": "전열: 받는 피해 감소 5.0% | 후열: 연격률 증가 28.0%",
    "안행진": "전열: 받는 피해 감소 5.0% | 후열: 강공 및 기습 증가 12.0%",
    "호도진": "전열: 가하는 피해 증가 10.0% | 후열: 받는 피해 감소 6.0%"
};

const formationPositions = {
    "일자진": ["front", "front", "front"],
    "구행진": ["front", "back", "front"],
    "추형진": ["back", "front", "back"],
    "기형진": ["back", "back", "front"],
    "어린진": ["front", "back", "back"],
    "방원진": ["front", "front", "back"],
    "안행진": ["back", "front", "front"],
    "호도진": ["front", "back", "front"]
};

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

const allTacticsList = [
    "가정지전", "강유겸제", "견불가최", "견진연봉", "공기불비", "과하탁교", "교취호탈", "극적제승", "금낭묘계", "금적금왕", "금창신", "금철교명", "기문둔갑", "낙정하석", "동구적개", "동장철벽", "동촉기선", "만부막적", "만전제발", "만천과해", "문치무공", "미우주무", "반객위주", "병량촌단", "분성지계", "비사주석", "사면초가", "사생취의", "선등함진", "수상개화", "순수견양", "심모원려", "안영찰채", "암전난방", "양의화생", "양초선행", "여자동포", "요사여신", "용맹무쌍", "용왕직전", "운주유악", "원성재도", "위위구조", "유좌유용", "이간계", "이아환아", "이일대로", "이퇴위진", "일고작기", "인세이도", "전위위안", "제곤부위", "중정기고", "지인선임", "진퇴유도", "진화타겁", "질풍노도", "천리추격", "천시지리", "체천행도", "축세대발", "축호과간", "태청단경", "토적격문", "현호제세", "호령삼군", "혼수모어", "홍수첨향", "화소적벽", "횡소천군", "횡징폭렴", "휴양생식"
];

// 정밀 확정본: 투구(helmet)의 attr1, attr2는 제공해주신 8대 정식 추가 속성 명세 파일 데이터 안에서만 100% 교차 매핑되도록 전면 세척 완료
const officerEquipmentMap = {
    "마초": {
        helmet: { name: "백옥잠", attr1: "연격률", attr2: "강공, 기습 상승" },
        armor: { name: "세린갑", attr1: "피해 감소", attr2: "치명타 저항률 상승" },
        accessory: { name: "쌍호뉴", attr1: "연격률 증가", attr2: "무용 추가 피해 증폭" }
    },
    "위연": {
        helmet: { name: "백옥잠", attr1: "강공, 기습 상승", attr2: "피해 감소" },
        armor: { name: "세린갑", attr1: "피해 감소", attr2: "치명타 저항률 상승" },
        accessory: { name: "쌍호뉴", attr1: "무용 무기 피해 증폭", attr2: "폭발력 증폭" }
    },
    "서서": {
        helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "모략 피해 감소" },
        armor: { name: "명재복", attr1: "피해 감소", attr2: "디버프 면역 확률 상승" },
        accessory: { name: "박산로", attr1: "공심 (모략흡혈)", attr2: "모략 추가 피해 증폭" }
    },
    "장료": {
        helmet: { name: "백옥잠", attr1: "연격률", attr2: "강공, 기습 상승" },
        armor: { name: "세린갑", attr1: "물리 파갑 증가", attr2: "추격 전법 발동률 상승" },
        accessory: { name: "쌍호뉴", attr1: "속도 수치 증가", attr2: "연격률 증가" }
    },
    "조조(제왕)": {
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "무용 피해 감소" },
        armor: { name: "세린갑", attr1: "피해 감소 상한", attr2: "제어 면역 확률 상승" },
        accessory: { name: "쌍호뉴", attr1: "속도 수치 증가", attr2: "지휘 효과 증폭" }
    },
    "조조": {
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "치유 효과 받음" },
        armor: { name: "세린갑", attr1: "피해 감소", attr2: "치유 효과 받음 상승" },
        accessory: { name: "쌍호뉴", attr1: "치유 효과 받음", attr2: "아군 피해 분담" }
    },
    "악진": {
        helmet: { name: "백옥잠", attr1: "강공, 기습 상승", attr2: "피해 감소" },
        armor: { name: "세린갑", attr1: "피해 감소", attr2: "강공 확률 상승" },
        accessory: { name: "쌍호뉴", attr1: "속도 수치 증가", attr2: "치명타 확률 상승" }
    },
    "동탁": {
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "치유 효과 받음" },
        armor: { name: "결운갑", attr1: "피해 감소 어품 상한", attr2: "초반 저항력 상승" },
        accessory: { name: "쌍호뉴", attr1: "배반 (물리흡혈)", attr2: "도발 성공률 상승" }
    },
    "원소": {
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "무용 피해 감소" },
        armor: { name: "세린갑", attr1: "피해 감소", attr2: "디버프 면역 확률 상승" },
        accessory: { name: "쌍호뉴", attr1: "배반 활성화", attr2: "실드 내구도 증가" }
    },
    "여포": {
        helmet: { name: "백옥잠", attr1: "연격률", attr2: "강공, 기습 상승" },
        armor: { name: "세린갑", attr1: "피해 감소", attr2: "치명타 피해량 증폭" },
        accessory: { name: "쌍호뉴", attr1: "연격률 증가", attr2: "무용 추가 피해 증폭" }
    },
    "제갈량": {
        helmet: { name: "진현관", attr1: "모략 피해 감소", attr2: "피해 감소" },
        armor: { name: "명재복", attr1: "치유 효과 상승", attr2: "피해 감소" },
        accessory: { name: "박산로", attr1: "겁전 제어 성공률", attr2: "모략 추가 피해 증폭" }
    },
    "황충": {
        helmet: { name: "백옥잠", attr1: "강공, 기습 상승", attr2: "무용 피해 감소" },
        armor: { name: "세린갑", attr1: "피해 감소", attr2: "치명타 저항률 상승" },
        accessory: { name: "박산로", attr1: "장공 (거리 증폭)", attr2: "무용 추가 피해 증폭" }
    },
    "강유": {
        helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "배반, 공심 상승" },
        armor: { name: "명재복", attr1: "피해 감소", attr2: "모략 추가 피해 증폭" },
        accessory: { name: "박산로", attr1: "속도 수치 증가", attr2: "공심 활성화" }
    },
    "좌자": {
        helmet: { name: "진현관", attr1: "모략 피해 감소", attr2: "피해 감소" },
        armor: { name: "명재복", attr1: "회피 확률 증가", attr2: "피해 감소" },
        accessory: { name: "박산로", attr1: "치유 효과 상승", attr2: "모략 추가 피해 증폭" }
    },
    "장녕": {
        helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "모략 피해 감소" },
        armor: { name: "명재복", attr1: "피해 감소", attr2: "지속 피해 증폭" },
        accessory: { name: "박산로", attr1: "공심 (모략흡혈)", attr2: "모략 추가 피해 증폭" }
    },
    "우길": {
        helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "모략 피해 감소" },
        armor: { name: "명재복", attr1: "피해 감소", attr2: "모략 피해 증폭" },
        accessory: { name: "박산로", attr1: "공심 (모략흡혈)", attr2: "모략 추가 피해 증폭" }
    },
    "사마의": {
        helmet: { name: "진현관", attr1: "모략 피해 감소", attr2: "피해 감소" },
        armor: { name: "명재복", attr1: "피해 감소 상한", attr2: "치명타 저항" },
        accessory: { name: "박산로", attr1: "공심 (모략흡혈)", attr2: "모략 추가 피해 증폭" }
    },
    "하후돈": {
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "치유 효과 받음" },
        armor: { name: "세린갑", attr1: "반격률 증가", attr2: "피해 감소 어품 상한" },
        accessory: { name: "쌍호뉴", attr1: "치유 효과 받음", attr2: "치명타 저항" }
    },
    "가후": {
        helmet: { name: "진현관", attr1: "치유 효과 받음", attr2: "모략 피해 감소" },
        armor: { name: "명재복", attr1: "피해 감소", attr2: "혼란 성공률 상승" },
        accessory: { name: "박산로", attr1: "치유 효과 받음 상한", attr2: "디버프 면역 확률" }
    },
    "손권": {
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "무용 피해 감소" },
        armor: { name: "명재복", attr1: "통찰 (제어 완벽 면역)", attr2: "피해 감소" },
        accessory: { name: "박산로", attr1: "속도 수치 증가", attr2: "버프 지속턴 증가" }
    },
    "손권(제왕)": {
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "무용 피해 감소" },
        armor: { name: "명재복", attr1: "통찰 (제어 완벽 면역)", attr2: "피해 감소" },
        accessory: { name: "박산로", attr1: "속도 수치 증가", attr2: "버프 지속턴 증가" }
    },
    "육항": {
        helmet: { name: "진현관", attr1: "치유 효과 부여", attr2: "모략 피해 감소" },
        armor: { name: "명재복", attr1: "피해 감소", attr2: "모략 추가 피해 증폭" },
        accessory: { name: "박산로", attr1: "치유 효과 상승", attr2: "치명타 확률 지원" }
    },
    "노숙": {
        helmet: { name: "진현관", attr1: "치유 효과 부여", attr2: "피해 감소" },
        armor: { name: "명재복", attr1: "피해 감소", attr2: "속도 속성 가산" },
        accessory: { name: "박산로", attr1: "속도 수치 증가", attr2: "치유 효과 상승" }
    },
    "유비(제왕)": {
        helmet: { name: "진현관", attr1: "치유 효과 부여", attr2: "치유 효과 받음" },
        armor: { name: "명재복", attr1: "치유 효과 상승", attr2: "피해 감소" },
        accessory: { name: "박산로", attr1: "피해 감소", attr2: "부활/생존 확률 상승" }
    },
    "유비": {
        helmet: { name: "진현관", attr1: "치유 효과 부여", attr2: "치유 효과 받음" },
        armor: { name: "명재복", attr1: "치유 효과 상승", attr2: "피해 감소" },
        accessory: { name: "박산로", attr1: "피해 감소", attr2: "부활/생존 확률 상승" }
    },
    "관우": {
        helmet: { name: "백옥잠", attr1: "강공, 기습 상승", attr2: "연격률" },
        armor: { name: "세린갑", attr1: "물리 파갑 증가", attr2: "피해 감소" },
        accessory: { name: "쌍호뉴", attr1: "장공 대폭 상승", attr2: "무용 추가 피해 증폭" }
    },
    "장비": {
        helmet: { name: "진현관", attr1: "피해 감소", attr2: "무용 피해 감소" },
        armor: { name: "결운갑", attr1: "피해 감소 어품 상한", attr2: "방패병 치유 효과 상승" },
        accessory: { name: "쌍호뉴", attr1: "반격률 증가", attr2: "도발 성공률 상승" }
    }
};

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

const systemGuideInsights = {
    "shu_combo": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 이 부대는 <strong>[연격률]</strong>과 <strong>[확산 피해]</strong> 기반의 무용 딜이 핵심입니다. 시스템 가이드에 명시된 대로 일반 공격 후 추가 공격을 발동하므로, 장비 세련 시 '무용' 및 '연격률' 추가 속성을 우선 확보하고, 전투매 훈련 시 삭풍 품종의 <strong>'설조'</strong>(무용 피해) 스킬을 조합하세요.",
    "wei_burst": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 적 주장을 선제 타격하는 속전속결 부대로 <strong>[속도]</strong> 스탯이 생명입니다. 행동 순서를 선점하기 위해 기본 속도가 붙어있는 장비인 <strong>'백옥잠(투구)', '세린갑(갑옷)', '쌍호뉴(장신구)'</strong>를 양품 이상으로 제련하여 속도 수치를 극대화하는 것을 권장합니다.",
    "qun_shield": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 방원진의 후열 연격률 효과와 <strong>[배반]</strong>(무용 피해 비례 병력 회복) 시너지를 노리는 덱입니다. 장기전 생존을 위해 투구와 갑옷 세련에서 <strong>[피해 감소]</strong> 옵션을 어품 등급 한계치까지 챙기고, 결운 품종의 <strong>'호생'</strong>(병력 회복) 매를 편성하세요.",
    "shu_magic_bow": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 제갈량의 <strong>[겁전]</strong>(능동 전법 발동 불가 제어)과 확정 모략 딜이 결합된 형태입니다. 모략 기반 덱이므로 장비의 기본 속성을 모략으로 맞추고(<strong>진현관, 명재복, 박산로</strong>), 열공 품종의 <strong>'여천'</strong>(모략 증가) 매 스킬과 조합하면 통계적 최고점을 달성합니다.",
    "qun_magic_spear": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 지속 피해와 회피 무효화 구조를 갖춘 덱입니다. 적을 갉아먹는 동안의 유지력을 위해 장비 추가 속성에서 <strong>[공심]</strong>(모략 피해 비례 병력 회복)을 챙기고, 상태이상 누적을 돕는 삭풍 품종의 <strong>'성모'</strong>(모략 피해) 매를 훈련시켜 탑재하세요.",
    "wei_magic_shield": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 가후의 <strong>[혼란]</strong>(무차별 대상 선택) 제어 상태와 하후돈의 <strong>[반격률]</strong>을 활용한 수비형 카운터 덱입니다. 피격 횟수가 많으므로 장비에서 <strong>'치유 효과 받음'</strong> 수치를 어품 등급 상한선(11.07%)까지 끌어올리는 것이 핵심입니다.",
    "wu_magic_bow": "💡 <strong style='color:#a855f7;'>[시스템 가이드 연동 인사이트]</strong> 구행진을 활용해 후열의 가하는 피해를 증폭시키는 덱입니다. 손권의 버프 중첩이 중요하므로 <strong>[통찰]</strong>(제어 상태 일시 무효화)을 보조할 수 있도록 결운 품종의 <strong>'감로'</strong>(각성 시전 및 치유) 매를 조합하면 안정성이 비약적으로 상승합니다."
};

let dynamicPresetDecks = [];
let currentSortMode = 'default'; 

// ==========================================================================
// LAYER 2: 코어 연산 엔진 구역
// ==========================================================================
function calculateStrictDeckScore(deck) {
    if (!deck || !deck.officers || !Array.isArray(deck.officers)) return 0;
    const currentNames = deck.officers.map(o => o && o.name ? o.name.toString().trim() : "").filter(n => n !== "");
    if (currentNames.length === 0) return 0;

    let bestMeta = analyzedMetaArchetypes[0];
    let maxMatch = -1;

    analyzedMetaArchetypes.forEach(meta => {
        let matchCount = 0;
        meta.officers.forEach((mo, idx) => {
            if (currentNames.includes(mo.name)) matchCount += 1;
            if (deck.officers[idx] && deck.officers[idx].name === mo.name) matchCount += 0.5;
        });
        if (matchCount > maxMatch) {
            maxMatch = matchCount;
            bestMeta = meta;
        }
    });

    let score = 100;
    if (deck.formation !== bestMeta.formation) score -= 10;

    bestMeta.officers.forEach((metaOff, idx) => {
        const userOff = deck.officers[idx];
        if (!userOff || !userOff.name) {
            score -= 30;
            return;
        }
        if (userOff.name !== metaOff.name) score -= 20;

        const metaTacs = metaOff.chosenTactics.map(t => t.toString().trim());
        if (userOff.chosenTactics && Array.isArray(userOff.chosenTactics)) {
            userOff.chosenTactics.forEach((userTac, tIdx) => {
                const cleanUserTac = userTac ? userTac.toString().trim() : "";
                if (cleanUserTac !== metaTacs[tIdx]) score -= 5;
            });
        } else {
            score -= 10;
        }
    });

    if (score < 0) score = 0;
    return score;
}

function generateDeckFeedback(deck, ownedHeroes, ownedTactics) {
    if (!deck || !deck.officers || !Array.isArray(deck.officers)) return [];
    const currentCleanNames = [];
    deck.officers.forEach(o => {
        if (o && o.name) currentCleanNames.push(o.name.toString().trim().replace(/\s+/g, ''));
    });

    if (currentCleanNames.length === 0) return [];

    let bestMatchDeck = analyzedMetaArchetypes[0]; 
    let maxMatchScore = -1;

    analyzedMetaArchetypes.forEach(metaDeck => {
        let matchScore = 0;
        metaDeck.officers.forEach((metaOff, idx) => {
            const metaName = metaOff.name.replace(/\s+/g, '');
            if (currentCleanNames.includes(metaName)) matchScore += 1; 
            if (currentCleanNames[idx] === metaName) matchScore += 0.5;
        });
        if (matchScore > maxMatchScore) {
            maxMatchScore = matchScore;
            bestMatchDeck = metaDeck;
        }
    });

    const idealDeck = bestMatchDeck;
    let feedbackList = [];
    feedbackList.push(`🎯 <strong>분석 완료:</strong> 현재 덱은 랭커 메타인 <strong>[${idealDeck.name}]</strong> 기반으로 세팅하는 것이 수학적 고점이 가장 높습니다. (${idealDeck.concept})`);
    
    if (systemGuideInsights[idealDeck.id]) feedbackList.push(systemGuideInsights[idealDeck.id]);

    const cleanOwnedHeroes = ownedHeroes.map(h => h.replace(/\s+/g, ''));
    const cleanOwnedTactics = ownedTactics.map(t => t.replace(/\s+/g, ''));
    const currentFormation = (deck.formation ? deck.formation : "").toString().trim();
    const idealFormation = (idealDeck.formation ? idealDeck.formation : "").toString().trim();

    if (currentFormation.replace(/\s+/g, '') !== idealFormation.replace(/\s+/g, '')) {
        feedbackList.push(`진형 교정: [${currentFormation}] ➔ <strong>[${idealFormation}]</strong> (해당 메타의 핵심 시너지 포지셔닝을 위해 변경을 권장합니다.)`);
    }

    let trulyMissingMetaOfficers = idealDeck.officers.filter(mo => !currentCleanNames.includes(mo.name.replace(/\s+/g, '')));

    deck.officers.forEach((off, offIdx) => {
        if (!off) return;
        const hName = (off.name || "").toString().trim();
        const cleanHName = hName.replace(/\s+/g, '');
        
        if (!cleanHName) {
            if (trulyMissingMetaOfficers.length > 0) {
                const replaceWith = trulyMissingMetaOfficers.shift();
                feedbackList.push(`장수 배치: <strong>[빈 슬롯]</strong> ➔ <strong>[${replaceWith.name}]</strong> 투입 (시너지 복구를 위한 강력 추천 코어 무장)`);
                feedbackList.push(`전법 권장: 투입할 <strong>[${replaceWith.name}]</strong>에게 <strong>[${replaceWith.chosenTactics[0]}]</strong>, <strong>[${replaceWith.chosenTactics[1]}]</strong> 장착을 지시합니다.`);
            } else {
                feedbackList.push(`장수 배치: <strong>[빈 슬롯]</strong> ➔ 타겟 메타에 부합하는 임의의 서포터 장수를 배치하세요.`);
            }
            return;
        }

        const isHeroOwned = cleanOwnedHeroes.includes(cleanHName); 
        if (!isHeroOwned) feedbackList.push(`자원 경고: [${hName}] 장수가 미보유 상태입니다. (장수 도감 확인 요망)`);

        const metaOfficerIndex = idealDeck.officers.findIndex(mo => mo.name.replace(/\s+/g, '') === cleanHName);

        if (metaOfficerIndex !== -1) {
            const metaOff = idealDeck.officers[metaOfficerIndex];
            const currentUserRow = (formationPositions[deck.formation] && formationPositions[deck.formation][offIdx]) ? formationPositions[deck.formation][offIdx] : "front";
            const idealRow = (formationPositions[idealDeck.formation] && formationPositions[idealDeck.formation][metaOfficerIndex]) ? formationPositions[idealDeck.formation][metaOfficerIndex] : "front";

            if (currentUserRow !== idealRow) {
                const idealRowKo = idealRow === 'front' ? '전열' : '후열';
                const currentRowKo = currentUserRow === 'front' ? '전열' : '후열';
                feedbackList.push(`배치 교정: <strong>[${hName}]</strong> 장수는 메타 아키텍처상 <strong>${idealRowKo}</strong> 포지션이어야 하나, 현재 <strong>${currentRowKo}</strong> 슬롯에 가 있습니다. 올바른 열 슬롯으로 배치 이동을 권장합니다.`);
            }

            const metaTacsClean = metaOff.chosenTactics.map(t => t.toString().trim().replace(/\s+/g, ''));
            let unmatchedMetaTactics = [...metaOff.chosenTactics];

            if (off.chosenTactics && Array.isArray(off.chosenTactics)) {
                off.chosenTactics.forEach(tac => {
                    if (!tac) return;
                    const cleanUserTac = tac.toString().trim().replace(/\s+/g, '');
                    if (unmatchedMetaTactics.includes(cleanUserTac)) {
                        const idx = unmatchedMetaTactics.indexOf(cleanUserTac);
                        unmatchedMetaTactics.splice(idx, 1);
                    }
                });

                off.chosenTactics.forEach((tac, tacIdx) => {
                    if (!tac) return;
                    const currentCleanTac = tac.toString().trim();
                    const cleanUserTac = currentCleanTac.replace(/\s+/g, '');

                    if (!metaTacsClean.includes(cleanUserTac)) {
                        if (unmatchedMetaTactics.length > 0) {
                            const replaceWith = unmatchedMetaTactics.shift();
                            feedbackList.push(`전법 튜닝: [${hName}]의 ${tacIdx + 2}번 슬롯 전법 [${currentCleanTac}] ➔ <strong>[${replaceWith}]</strong> (통계적 최고 승률 전법으로 교체를 권장합니다.)`);
                        }
                    }
                    if (!cleanOwnedTactics.includes(cleanUserTac)) feedbackList.push(`자원 부족: [${hName}]의 ${tacIdx + 2}번 슬롯 전법 <strong>[${currentCleanTac}]</strong>이 미보유 상태입니다.`);
                });
            }
        } else {
            if (trulyMissingMetaOfficers.length > 0) {
                const replaceWith = trulyMissingMetaOfficers.shift();
                feedbackList.push(`장수 교체: [${hName}] ➔ <strong>[${replaceWith.name}]</strong> (시너지 극대화를 위한 핵심 코어 장수입니다.)`);
                feedbackList.push(`전법 세팅: 투입할 <strong>[${replaceWith.name}]</strong>에게 <strong>[${replaceWith.chosenTactics[0]}]</strong>, <strong>[${replaceWith.chosenTactics[1]}]</strong> 장착을 권장합니다.`);
            } else {
                feedbackList.push(`장수 잉여: [${hName}] 장수는 현재 타겟 메타 시너지에 포함되지 않습니다.`);
            }
        }

        const inherentTactic = officerUniqueTacticMap[hName];
        if (inherentTactic) {
            const cleanInherent = inherentTactic.toString().trim().replace(/\s+/g, '');
            if (!isHeroOwned && !cleanOwnedTactics.includes(cleanInherent)) {
                feedbackList.push(`고유 전법 누락: [${hName}]의 고유 전법 <strong>[${inherentTactic.toString().trim()}]</strong>이 비활성화 상태입니다.`);
            }
        }
    });

    return feedbackList;
}

function calculateActivatedBond(officers) {
    if (!officers || !Array.isArray(officers)) return "활성화된 부대 인연 효과 없음";
    const currentOfficerNames = officers.map(o => (o && o.name) ? o.name.toString().trim() : "").filter(n => n !== "");
    if (currentOfficerNames.length === 0) return "활성화된 부대 인연 효과 없음";
    let matchedBonds = [];

    bondRules.forEach(rule => {
        const uniqueMatches = [];
        currentOfficerNames.forEach(name => {
            if (rule.heroes.includes(name) && !uniqueMatches.includes(name)) uniqueMatches.push(name);
        });
        const totalMatches = currentOfficerNames.filter(name => rule.heroes.includes(name)).length;
        if (totalMatches >= rule.req && uniqueMatches.length >= (rule.req === 3 ? 2 : 1)) {
            matchedBonds.push(`<strong>[${rule.name}]</strong> ${rule.effect}`);
        }
    });
    return matchedBonds.length > 0 ? matchedBonds.join(" / ") : "활성화된 부대 인연 효과 없음";
}

// ==========================================================================
// LAYER 3: UI 렌더링 및 생명주기 제어 구역
// ==========================================================================
function loadDeckTextData() {
    try {
        const savedText = localStorage.getItem('samguk_deck_text');
        if (savedText) {
            const parsed = JSON.parse(savedText);
            if (parsed && Array.isArray(parsed) && parsed.length > 0) {
                dynamicPresetDecks = parsed;
                if (dynamicPresetDecks.length > 5) dynamicPresetDecks.splice(5);

                if (dynamicPresetDecks.length < 5) {
                    for (let i = dynamicPresetDecks.length; i < 5; i++) {
                        dynamicPresetDecks.push(JSON.parse(JSON.stringify(defaultPresetDecks[i])));
                    }
                }

                dynamicPresetDecks.forEach((deck, idx) => {
                    if (!deck || typeof deck !== 'object') {
                        dynamicPresetDecks[idx] = JSON.parse(JSON.stringify(defaultPresetDecks[idx] ? defaultPresetDecks[idx] : defaultPresetDecks[0]));
                    }
                    const d = dynamicPresetDecks[idx];
                    d.originIdx = (d.originIdx !== undefined) ? d.originIdx : idx;
                    if (!d.title) d.title = (defaultPresetDecks[idx] ? defaultPresetDecks[idx].title : `${idx + 1}군`);
                    if (!d.formation) d.formation = (defaultPresetDecks[idx] ? defaultPresetDecks[idx].formation : "추형진");
                    if (!d.officers || !Array.isArray(d.officers) || d.officers.length === 0) {
                        d.officers = JSON.parse(JSON.stringify(defaultPresetDecks[idx] ? defaultPresetDecks[idx].officers : defaultPresetDecks[0].officers));
                    }
                    d.officers.forEach((off, oIdx) => {
                        if (!off || typeof off !== 'object') {
                            off = { name: "", chosenTactics: ["", ""] };
                            d.officers[oIdx] = off;
                        }
                        if (off.name === "제)조조") off.name = "조조(제왕)";
                        if (off.name === "제)유비") off.name = "유비(제왕)";
                        if (off.name === undefined || off.name === null) off.name = "";
                        if (!off.chosenTactics || !Array.isArray(off.chosenTactics)) off.chosenTactics = ["", ""];
                    });
                });
                localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
                return;
            }
        }
    } catch (e) {
        console.error("스토리지 복구 가동:", e);
    }
    dynamicPresetDecks = JSON.parse(JSON.stringify(defaultPresetDecks));
    dynamicPresetDecks.forEach((d, idx) => { d.originIdx = idx; });
}

function resetDeck(originIdx) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        targetDeck.formation = "추형진"; 
        if (targetDeck.officers && Array.isArray(targetDeck.officers)) {
            targetDeck.officers.forEach(off => {
                if (off) {
                    off.name = ""; 
                    off.chosenTactics = ["", ""]; 
                }
            });
        }
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder(); 
}

function toggleSortMode(mode) {
    renderDeckBuilder();
}

function saveEditedText(originIdx, propertyName, element) {
    let textValue = element.innerText.trim();
    textValue = textValue.replace(/\s*\[추천도:\s*\d+점\]/g, "").trim();
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        if (textValue.length === 0) textValue = defaultPresetDecks[originIdx] ? defaultPresetDecks[originIdx][propertyName] : "부대 명칭";
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
    if (targetDeck && targetDeck.officers && targetDeck.officers[officerIdx]) {
        targetDeck.officers[officerIdx].name = selectElement.value;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder(); 
}

function changeTactic(originIdx, officerIdx, slotIdx, selectElement) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck && targetDeck.officers && targetDeck.officers[officerIdx] && targetDeck.officers[officerIdx].chosenTactics) {
        targetDeck.officers[officerIdx].chosenTactics[slotIdx] = selectElement.value;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder(); 
}

function renderDeckBuilder() {
    const container = document.getElementById('deck-container');
    if (!container) return;
    
    try {
        container.style.display = 'block'; 
        container.innerHTML = '';

        const savedData = localStorage.getItem('samguk_hobby_data');
        let ownedHeroes = [];
        let ownedTactics = [];

        if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed && parsed.heroes) {
                ownedHeroes = parsed.heroes.filter(x => x && x.isOwned).map(x => {
                    let name = (x.name || "").toString().trim();
                    if (name === "제)조조") name = "조조(제왕)";
                    if (name === "제)유비") name = "유비(제왕)";
                    return name;
                });
            }
            if (parsed && parsed.tactics) ownedTactics = parsed.tactics.filter(x => x && x.isOwned).map(x => (x.name || "").toString().trim());
        }

        let displayDecks = [];
        for (let i = 0; i < dynamicPresetDecks.length; i++) displayDecks.push(dynamicPresetDecks[i]);
        displayDecks.sort((a, b) => (a.originIdx || 0) - (b.originIdx || 0));

        const sortedHeroNames = Object.keys(officerRoleMap).sort((a, b) => a.localeCompare(b, 'ko'));

        displayDecks.forEach((deck) => {
            if (!deck) return;
            const deckCard = document.createElement('div');
            deckCard.className = 'deck-card';

            const currentComputedScore = calculateStrictDeckScore(deck);
            const computedBondText = calculateActivatedBond(deck.officers);

            let officersHtml = '';
            if (deck.officers && Array.isArray(deck.officers)) {
                deck.officers.forEach((off, offIdx) => {
                    if (!off) return;
                    let tacticRowsHtml = '';
                    const hName = (off.name || "").toString().trim();
                    const cleanHName = hName.replace(/\s+/g, '');
                    const cleanOwnedHeroes = ownedHeroes.map(h => h.replace(/\s+/g, ''));
                    const cleanOwnedTactics = ownedTactics.map(t => t.replace(/\s+/g, ''));
                    const isHeroOwned = cleanOwnedHeroes.includes(cleanHName);

                    if (cleanHName) {
                        const inherentTactic = officerUniqueTacticMap[hName] || "효웅";
                        const cleanInherent = inherentTactic.trim().replace(/\s+/g, '');
                        const isInherentOwned = isHeroOwned || cleanOwnedTactics.includes(cleanInherent);
                        tacticRowsHtml += `
                            <div class="tactic-row ${isInherentOwned ? 'owned' : 'missing'}" style="border-left: 3px solid #cd9b33;">
                                <span>⭐ ${inherentTactic} (고유)</span>
                                <span>${isInherentOwned ? '보유중' : '미보유'}</span>
                            </div>
                        `;
                    } else {
                        tacticRowsHtml += `
                            <div class="tactic-row missing" style="border-left: 3px solid #555; background-color: rgba(255,255,255,0.02);">
                                <span style="color: #666;">⭐ 고유 전법 (미배치)</span>
                                <span style="color: #666;">-</span>
                            </div>
                        `;
                    }

                    if (off.chosenTactics && Array.isArray(off.chosenTactics)) {
                        off.chosenTactics.forEach((tacticName, slotIdx) => {
                            const cleanTac = (tacticName || "").toString().trim();
                            const isOwned = cleanOwnedTactics.includes(cleanTac.replace(/\s+/g, ''));
                            let optionsHtml = `<option value="" ${cleanTac === "" ? 'selected' : ''}>선택 안함</option>`;
                            allTacticsList.forEach(tName => {
                                const isSelected = cleanTac === tName ? 'selected' : '';
                                optionsHtml += `<option value="${tName}" ${isSelected}>${tName}</option>`;
                            });
                            tacticRowsHtml += `
                                <div class="tactic-row ${cleanTac === "" ? 'missing' : (isOwned ? 'owned' : 'missing')}" style="padding: 4px 12px;">
                                    <select class="tactic-dropdown" onchange="changeTactic(${deck.originIdx}, ${offIdx}, ${slotIdx}, this)">
                                        ${optionsHtml}
                                    </select>
                                    <span class="tactic-status-text" style="${cleanTac === "" ? 'color:#666;' : ''}">
                                        ${cleanTac === "" ? '슬롯 비어있음' : (isOwned ? '장착 완료' : '미보유')}
                                    </span>
                                </div>
                            `;
                        });
                    }

                    const currentPos = (formationPositions[deck.formation] && formationPositions[deck.formation][offIdx]) ? formationPositions[deck.formation][offIdx] : "front";
                    const posLabel = currentPos === 'front' ? '전열' : '후열';
                    const posClass = currentPos === 'front' ? 'front' : 'back';

                    let officerOptionsHtml = `<option value="" ${cleanHName === "" ? 'selected' : ''}>선택 안함</option>`;
                    sortedHeroNames.forEach(hKey => {
                        const isSelected = hName === hKey ? 'selected' : '';
                        officerOptionsHtml += `<option value="${hKey}" ${isSelected}>${hKey}</option>`;
                    });

                    const currentComputedRole = cleanHName ? (officerRoleMap[hName] || "보조, 버퍼") : "미배치";

                    let equipmentHtml = '';
                    if (cleanHName) {
                        const eqData = officerEquipmentMap[hName] || {
                            helmet: { name: "진현관", attr1: "피해 감소", attr2: "모략 피해 감소" },
                            armor: { name: "명재복", attr1: "피해 감소", attr2: "스탯 속성 가산" },
                            accessory: { name: "박산로", attr1: "치유 효과 상승", attr2: "속도 수치 보정" }
                        };
                        equipmentHtml = `
                            <div class="equipment-recommendation-box" style="margin-top: 8px; padding: 8px 12px; background: rgba(0,0,0,0.2); border: 1px dashed #555; border-radius: 4px; font-size: 11px; text-align: left; line-height: 1.6; color:#ddd;">
                                <div style="color: #ff9f43; font-weight: bold; margin-bottom: 4px;">🛠️ 시스템 권장 장비 세트</div>
                                <div>🪖 <strong>투구:</strong> <span style="color:#fff;">${eqData.helmet.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eqData.helmet.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eqData.helmet.attr2}</span>)</div>
                                <div>🛡️ <strong>갑옷:</strong> <span style="color:#fff;">${eqData.armor.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eqData.armor.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eqData.armor.attr2}</span>)</div>
                                <div>📿 <strong>장신구:</strong> <span style="color:#fff;">${eqData.accessory.name}</span> (추가속성1: <span style="color:#28a745; font-weight:bold;">${eqData.accessory.attr1}</span>, 추가속성2: <span style="color:#17a2b8; font-weight:bold;">${eqData.accessory.attr2}</span>)</div>
                            </div>
                        `;
                    }

                    officersHtml += `
                        <div class="officer-slot" style="${!cleanHName ? 'border: 1px dashed #444; background-color: rgba(0,0,0,0.1);' : ''}">
                            <div class="officer-meta">
                                <span class="position-badge ${posClass}">${posLabel}</span>
                                <div class="officer-select-container">
                                    <select class="officer-dropdown" onchange="changeOfficer(${deck.originIdx}, ${offIdx}, this)">
                                        ${officerOptionsHtml}
                                    </select>
                                </div>
                            </div>
                            <div class="officer-role-label" style="${!cleanHName ? 'color:#555;' : ''}">${currentComputedRole}</div>
                            
                            ${equipmentHtml}
                            
                            <div class="tactic-status-box" style="margin-top:8px;">
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
            
            if (feedbackArr.length === 0) {
                feedbackHtml = ''; 
            } else if (currentComputedScore === 100) { 
                feedbackHtml = `<div class="feedback-item success">★ 축하합니다! 랭커 메타와 100% 일치하는 무결성 최적화 명품 군단입니다.</div>
                                <div class="feedback-item" style="background-color:rgba(168,85,247,0.15); border-left-color:#a855f7;">${feedbackArr[1] || ""}</div>`;
            } else {
                feedbackArr.forEach((fb, index) => { 
                    if (index === 0) feedbackHtml += `<div class="feedback-item info">${fb}</div>`; 
                    else if (fb.includes('시스템 가이드 연동')) feedbackHtml += `<div class="feedback-item" style="background-color:rgba(168,85,247,0.15); border-left-color:#a855f7;">${fb}</div>`;
                    else feedbackHtml += `<div class="feedback-item warning">${fb}</div>`; 
                });
            }

            deckCard.innerHTML = `
                <div class="deck-title" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <div>
                        <span contenteditable="true" onblur="saveEditedText(${deck.originIdx}, 'title', this)" style="outline: none;">${deck.title}</span> 
                        <span style="color: #ff9f43; font-size: 13px; margin-left: 12px; font-weight: bold; user-select: none;">[추천도: ${currentComputedScore}점]</span>
                    </div>
                    <button class="reset-deck-btn" onclick="resetDeck(${deck.originIdx})" style="background-color: #c82333; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold; transition: background-color 0.2s;">부대 초기화</button>
                </div>
                <div class="bond-box">
                    <span class="bond-highlight">부대 인연 효과 :</span> 
                    <span style="display:inline-block; outline:none;">${computedBondText}</span>
                </div>
                <div class="officers-row">
                    ${officersHtml}
                </div>
                
                <div class="feedback-container-box">
                    <div class="feedback-header-title">📋 AI 메타 역추적 기반 실시간 맞춤 처방전</div>
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
    } catch(e) {
        container.style.display = 'block';
        container.innerHTML = `
            <div style="background-color:#ffe6e6; border:2px solid red; padding:20px; color:black; font-weight:bold; border-radius:8px; margin:20px;">
                <h3 style="color:red;">[시스템 에러 감지] 렌더링 중 치명적 오류가 발생했습니다.</h3>
                <p>원인: ${e.message}</p>
                <p style="font-size:12px; color:#555; white-space:pre-wrap;">${e.stack}</p>
                <button onclick="localStorage.clear(); location.reload();" style="margin-top:10px; padding:10px; background:red; color:white; border:none; cursor:pointer; font-weight:bold; border-radius:5px;">데이터 강제 초기화 및 재시작</button>
            </div>
        `;
    }
}

function exportData() {
    try {
        var hobbyData = localStorage.getItem('samguk_hobby_data');
        var deckData = localStorage.getItem('samguk_deck_text');
        var backupObject = {
            samguk_hobby_data: hobbyData ? JSON.parse(hobbyData) : null,
            samguk_deck_text: deckData ? JSON.parse(deckData) : null
        };
        var jsonString = JSON.stringify(backupObject, null, 2);
        var blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
        var downloadAnchor = document.createElement('a');
        downloadAnchor.href = URL.createObjectURL(blob);
        downloadAnchor.download = "samguk_wangjeon_database_backup.json";
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
    } catch (err) {
        alert("백업 파일 생성 실패: " + err.message);
    }
}

function triggerImport() {
    var fileInput = document.getElementById('import-file-input');
    if (fileInput) fileInput.click();
}

function importData(input) {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            var importedDatabase = JSON.parse(e.target.result);
            if (!importedDatabase.samguk_hobby_data && !importedDatabase.samguk_deck_text) {
                alert("삼국지 왕전의 유효한 데이터 백업 규격이 확인되지 않습니다.");
                return;
            }
            if (importedDatabase.samguk_hobby_data) localStorage.setItem('samguk_hobby_data', JSON.stringify(importedDatabase.samguk_hobby_data));
            if (importedDatabase.samguk_deck_text) localStorage.setItem('samguk_deck_text', JSON.stringify(importedDatabase.samguk_deck_text));
            alert("데이터 베이스 인프라 복구 완료. 동기화 스냅샷 적용을 위해 시스템을 리로드합니다.");
            location.reload();
        } catch (err) {
            alert("파일 스트림 해석 오류: 구조가 파손된 JSON 파일입니다.");
        }
    };
    reader.readAsText(file, "utf-8");
}

window.toggleSortMode = toggleSortMode;
window.saveEditedText = saveEditedText;
window.changeFormation = changeFormation;
window.changeOfficer = changeOfficer;
window.changeTactic = changeTactic;
window.resetDeck = resetDeck;
window.exportData = exportData;
window.triggerImport = triggerImport;
window.importData = importData;

function initDeckCoreEngine() {
    loadDeckTextData();
    renderDeckBuilder();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeckCoreEngine);
} else {
    initDeckCoreEngine();
}

// [시스템 분석] deck_core.js - 인게임 공식 명세(스크린샷 검증 완료) 및 고속 연산 경량화 종결 엔진

// ==========================================================================
// LAYER 1: 데이터 정규화 및 인게임 공식 속성 마스터 사전 바인딩
// ==========================================================================
const EQUIP_ATTR_DESCRIPTIONS = {
    "피해 가함": "무장 전투 중 가하는 피해 상승",
    "피해 감소": "무장 전투 중 받는 피해 감소",
    "무용 피해 가함": "무장 전투 중 가하는 무용 피해 상승",
    "무용 피해 감소": "무장 전투 중 받는 무용 피해 감소",
    "모략 피해 가함": "무장 전투 중 가하는 모략 피해 상승",
    "모략 피해 감소": "무장 전투 중 받는 모략 피해 감소",
    "배반": "무장 전투 중 무용 피해를 가할 때 피해에 따라 자신의 병력을 회복 (갑옷 1차 전용 단일)",
    "공심": "무장 전투 중 모략 피해를 가할 때 피해에 따라 자신의 병력을 회복 (장신구 1차 전용 단일)",
    "강공": "무장 전투 중 무용 피해를 가할 때 확률적으로 이번 피해가 50% 상승 (갑옷 1차 전용 단일)",
    "기습": "무장 전투 중 모략 피해를 가할 때 확률적으로 이번 피해가 50% 상승 (장신구 1차 전용 단일)",
    "치유 효과 부여": "무장 전투 중 가하는 치유 효과 상승",
    "치유 효과 받음": "무장 전투 중 받는 치유 효과 상승",
    "연격률": "무장 전투 중 통상 일반 공격 이후 확률적으로 추가 1회 일반 공격 발동",
    "배반, 공심 상승": "무장 전투 중 피해를 가할 때 피해에 따라 자신의 병력을 회복",
    "강공, 기습 상승": "무장 전투 중 피해를 가할 때 확률적으로 이번 피해가 50% 상승",
    "창병 피해 가함": "창병 편성 시 무장 전투 중 가하는 피해 상승 (어품 투구 전용)",
    "창병 피해 감소": "창병 편성 시 무장 전투 중 받는 피해 감소 (어품 갑옷/장신구 전용)",
    "창병 배반, 공심 상승": "창병 편성 시 무장 전투 중 피해를 가할 때 피해에 따라 자신의 병력을 회복 (어품 갑옷/장신구 전용)",
    "창병 강공, 기습 상승": "창병 편성 시 무장 전투 중 피해를 가할 때 확률적으로 이번 피해가 50% 상승 (어품 투구 전용)",
    "창병 치유 효과 상승": "창병 편성 시 무장 전투 중 가하는 치유 효과 상승 (힐러 전용)",
    "궁병 피해 가함": "궁병 편성 시 무장 전투 중 가하는 피해 상승 (어품 투구 전용)",
    "궁병 피해 감소": "궁병 편성 시 무장 전투 중 받는 피해 감소 (어품 갑옷/장신구 전용)",
    "궁병 배반, 공심 상승": "궁병 편성 시 무장 전투 중 피해를 가할 때 피해에 따라 자신의 병력을 회복 (어품 갑옷/장신구 전용)",
    "궁병 강공, 기습 증가": "궁병 편성 시 무장 전투 중 피해를 가할 때 확률적으로 이번 피해가 50% 상승 (어품 투구 전용)",
    "궁병 치유 효과 상승": "궁병 편성 시 무장 전투 중 가하는 치유 효과 상승 (힐러 전용)",
    "방패병 피해 가함": "방패병 편성 시 무장 전투 중 가하는 피해 상승 (어품 투구 전용)",
    "방패병 피해 감소": "방패병 편성 시 무장 전투 중 받는 피해 감소 (어품 갑옷/장신구 전용)",
    "방패병 배반, 공심 상승": "방패병 편성 시 무장 전투 중 피해를 가할 때 피해에 따라 자신의 병력을 회복 (어품 갑옷/장신구 전용)",
    "방패병 강공, 기습 증가": "방패병 편성 시 무장 전투 중 피해를 가할 때 확률적으로 이번 피해가 50% 상승 (어품 투구 전용)",
    "방패병 치유 효과 상승": "방패병 편성 시 무장 전투 중 가하는 치유 효과 상승 (힐러 전용)",
    "기병 피해 가함": "기병 편성 시 무장 전투 중 가하는 피해 상승 (어품 투구 전용)",
    "기병 피해 감소": "기병 편성 시 무장 전투 중 받는 피해 감소 (어품 갑옷/장신구 전용)",
    "기병 배반, 공심 상승": "기병 편성 시 무장 전투 중 피해를 가할 때 피해에 따라 자신의 병력을 회복 (어품 갑옷/장신구 전용)",
    "기병 강공, 기습 증가": "기병 편성 시 무장 전투 중 피해를 가할 때 확률적으로 이번 피해가 50% 상승 (어품 투구 전용)",
    "기병 치유 효과 상승": "기병 편성 시 무장 전투 중 가하는 치유 효과 상승 (힐러 전용)"
};

const OFFICER_MASTER = {
    "가후":["경달권변","wei","궁병/방패병","SUPPORT_STR"],"곽가":["산무유책","wei","궁병/방패병","SUPPORT_STR"],"사마의":["응시낭고","wei","방패병/궁병","STR_CARRY"],"순욱":["거중지중","wei","궁병/창병","SUPPORT_STR"],"악진":["분용당선","wei","창병/궁병","PHYS_CARRY"],"전위":["축호과간","wei","창병/방패병","TANK_COUNTER"],"정욱":["십면매복","wei","방패병/궁병","STR_CARRY"],"조조(제왕)":["군령여산","wei","창병/방패병","SUPPORT_HEAL"],"조조":["효웅","wei","방패병/기병","SUPPORT_HEAL"],"장료":["함진살적","wei","창병/기병","PHYS_COMBO"],"장합":["교변병기","wei","방패병/창병","SUPPORT_HEAL"],"하후돈":["발시담정","wei","창병/방패병","TANK_COUNTER"],"하후연":["충용","wei","창병/기병","PHYS_COMBO"],
    "관우":["무성","shu","창병/기병","PHYS_CARRY"],"강유":["담대여두","shu","방패병/기병","STR_CARRY"],"마대":["습참","shu","창병/방패병","PHYS_CARRY"],"마초":["출수법","shu","창병/기병","PHYS_COMBO"],"서서":["절절학문","shu","창병/궁병","STR_CARRY"],"사마가":["만왕","shu","창병/방패병","PHYS_CARRY"],"위연":["실병제위","shu","창병/궁병","PHYS_CARRY"],"유비":["인정","shu","창병/기병","SUPPORT_HEAL"],"유비(제왕)":["재주복주","shu","창병/방패병","SUPPORT_HEAL"],"장비":["연인노호","shu","창병/방패병","TANK_COUNTER"],"제갈량":["초선차전","shu","궁병/방패병","SUPPORT_STR"],"조운":["칠진칠출","shu","창병/방패병","PHYS_CARRY"],"황충":["적혈도","shu","창병/방패병","PHYS_CARRY"],"황월영":["묘산천기","shu","궁병/방패병","SUPPORT_STR"],
    "대교":["정수유심","wu","창병/궁병","SUPPORT_STR"],"노숙":["탑상책","wu","궁병/기병","SUPPORT_STR"],"소교":["화용욕모","wu","궁병/기병","SUPPORT_STR"],"손견":["강동맹호","wu","창병/방패병","TANK_COUNTER"],"손권":["웅거","wu","궁병/기병","STR_CARRY"],"손상향":["효희","wu","궁병/기병","PHYS_COMBO"],"손책":["강동패주","wu","창병/방패병","PHYS_CARRY"],"손권(제왕)":["겸권상계","wu","창병/궁병","STR_CARRY"],"여몽":["백의도강","wu","방패병/궁병","SUPPORT_STR"],"육손":["지변규려","wu","창병/기병","STR_CARRY"],"육항":["청백충근","wu","창병/궁병","SUPPORT_STR"],"주유":["봉화연천","wu","창병/궁병","STR_CARRY"],"주태":["청라산개","wu","기병/방패병","TANK_COUNTER"],"정보":["칠척사모","wu","기병/방패병","TANK_COUNTER"],"황개":["요원지화","wu","방패병/궁병","TANK_COUNTER"],
    "공손찬":["위진새북","qun","기병/창병","PHYS_COMBO"],"동탁":["전권난정","qun","방패병/기병","TANK_COUNTER"],"안량":["효장","qun","창병/기병","PHYS_CARRY"],"여포":["천하무쌍","qun","궁병/기병","PHYS_COMBO"],"우길":["태평경","qun","창병/궁병","STR_CARRY"],"원소":["사소도","qun","방패병/기병","TANK_COUNTER"],"장각":["황천당립","qun","궁병/기병","STR_CARRY"],"장녕":["천의난위","qun","궁병/방패병","STR_CARRY"],"장보":["요풍사기","qun","궁병/방패병","STR_CARRY"],"좌자":["화겁생기","qun","궁병/방패병","SUPPORT_STR"],"채문희":["비분시","qun","궁병/기병","SUPPORT_STR"],"초선":["폐월","qun","창병/기병","SUPPORT_STR"],"화타":["청낭제세","qun","궁병/방패병","SUPPORT_STR"]
};

// [경량화] 공백 및 특수문자 무시 고속 정규화 헬퍼
const cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

const internalMasterOfficerUniqueTacticMap = {}, internalMasterOfficerUnitMap = {}, officerFactionMap = {};
const internalMasterOfficerNames = Object.keys(OFFICER_MASTER).sort((a,b)=>a.localeCompare(b,'ko'));
for (let [k,v] of Object.entries(OFFICER_MASTER)) {
    internalMasterOfficerUniqueTacticMap[k] = v[0];
    officerFactionMap[k] = v[1];
    internalMasterOfficerUnitMap[k] = v[2];
}

const internalMasterTacticNames = ["가정지전","간담상조","강유겸제","견불가최","견진연봉","공기불비","과하탁교","교취호탈","극적제승","금낭묘계","금적금왕","금창신","금철교명","기문둔갑","낙정하석","동구적개","동장철벽","동촉기선","만부막적","만전제발","만천과해","문치무공","미우주무","반객위주","병량촌단","분성지계","비사주석","사면초가","사생취의","선등함진","수상개화","순수견양","승승장구","심모원려","안영찰채","암전난방","양의화생","양초선행","여자동포","요사여신","용맹무쌍","용왕직전","운주유악","원성재도","위위구조","유좌유용","이간계","이아환아","이일대로","이퇴위진","일고작기","인세이도","전위위안","제곤부위","중정기고","지인선임","진퇴유도","진화타겁","질풍노도","천리추격","천시지리","체천행도","축세대발","축호과간","태청단경","토적격문","현호제세","호령삼군","혼수모어","홍수첨향","화소적벽","횡소천군","횡징폭렴","휴양생식"].sort((a,b)=>a.localeCompare(b,'ko'));

const EQ_PRESETS = {
    PHYS_CARRY: ["호분관","강공, 기습 상승","창병 피해 가함","명광갑","무용 피해 가함","창병 배반, 공심 상승","치룡패","무용 피해 가함","창병 배반, 공심 상승"],
    PHYS_COMBO: ["백옥잠","연격률","창병 피해 가함","세린갑","무용 피해 가함","창병 배반, 공심 상승","쌍호뉴","연격률","창병 배반, 공심 상승"],
    STR_CARRY:  ["진현관","강공, 기습 상승","창병 피해 가함","명재복","모략 피해 가함","창병 배반, 공심 상승","박산로","배반, 공심 상승","창병 배반, 공심 상승"],
    TANK_COUNTER:["연함규","피해 감소","창병 피해 가함","청등갑","피해 감소","창병 피해 감소","사남패","피해 감소","창병 배반, 공심 상승"],
    SUPPORT_HEAL:["연함규","피해 감소","치유 효과 부여","청등갑","피해 감소","창병 치유 효과 상승","사남패","치유 효과 받음","창병 피해 감소"],
    SUPPORT_STR: ["진현관","피해 감소","치유 효과 부여","명재복","피해 감소","창병 피해 감소","박산로","치유 효과 부여","창병 피해 감소"]
};

const internalMasterEquipmentMap = {
    "서서": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "창병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "창병 피해 감소" } },
    "장료": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "기병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "기병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "강공, 기습 상승", attr2: "기병 배반, 공심 상승" } },
    "조조(제왕)": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "피해 감소", attr2: "방패병 피해 감소" } },
    "조조": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "장합": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "피해 감소", attr2: "방패병 피해 감소" } },
    "하후돈": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "배반", attr2: "방패병 배반, 공심 상승" } },
    "악진": { helmet: { name: "호분관", attr1: "피해 감소", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "기병 피해 감소" } },
    "전위": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "정욱": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 배반, 공심 상승" } },
    "사마의": { helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "공심", attr2: "방패병 배반, 공심 상승" } },
    "하후연": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "기병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "기병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "강공, 기습 상승", attr2: "기병 배반, 공심 상승" } },
    "가후": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "피해 감소", attr2: "방패병 배반, 공심 상승" } },
    "동탁": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "배반, 공심 상승", attr2: "방패병 피해 감소" } },
    "원소": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "배반, 공심 상승", attr2: "방패병 피해 감소" } },
    "여포": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "궁병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "연격률", attr2: "궁병 배반, 공심 상승" } },
    "제갈량": { helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "궁병 배반, 공심 상승" } },
    "황충": { helmet: { name: "호분관", attr1: "피해 감소", attr2: "궁병 피해 가함" }, armor: { name: "명광갑", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "궁병 배반, 공심 상승" } },
    "강유": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 배반, 공심 상승" } },
    "좌자": { helmet: { name: "진현관", attr1: "모략 피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "방패병 피해 감소" } },
    "장녕": { helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 치유 효과 상승" } },
    "우길": { helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 치유 효과 상승" } },
    "손권": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "궁병 배반, 공심 상승" } },
    "손권(제왕)": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "궁병 배반, 공심 상승" } },
    "육항": { helmet: { name: "진현관", attr1: "치유 효과 부여", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "노숙": { helmet: { name: "진현관", attr1: "치유 효과 부여", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "유비(제왕)": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "유비": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "관우": { helmet: { name: "호분관", attr1: "강공, 기습 상승", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "무용 피해 가함", attr2: "창병 배반, 공심 상승" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 배반, 공심 상승" } },
    "마초": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "창병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "연격률", attr2: "창병 배반, 공심 상승" } },
    "위연": { helmet: { name: "호분관", attr1: "피해 감소", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 피해 감소" } },
    "장비": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "창병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "사남패", attr1: "피해 감소", attr2: "방패병 피해 감소" } }
};

const tacticAlternativesMap = {"간담상조":["횡징폭렴","동장철벽","안영찰채","위위구조"],"횡징폭렴":["간담상조","동구적개","동장철벽"],"동장철벽":["간담상조","견불가최","천시지리","동구적개"],"전위위안":["간담상조","태청단경","현호제세","제곤부위"],"이퇴위진":["미우주무","천시지리"],"용맹무쌍":["만부막적","비사주석"],"질풍노도":["암전난방","교취호탈"],"문치무공":["양초선행","중정기고"],"혼수모어":["사면초가","이간계"],"반객위주":["일고작기","사생취의"],"유좌유용":["휴양생식","제곤부위"],"선등함진":["만천과해","만전제발"],"강유겸제":["동장철벽","천시지리"],"진퇴유도":["위위구조","동구적개"],"견진연봉":["동장철벽","순수견양"],"위위구조":["간담상조","태청단경","현호제세"],"용왕직전":["천리추격","암전난방"],"만부막적":["용왕직전","천리추격"],"안영찰채":["간담상조","위위구조","미우주무"],"일고작기":["사생취의","용맹무쌍"],"여자동포":["동구적개","천시지리"],"양의화생":["기문둔갑","화소적벽"],"수상개화":["요사여신","사생취의"],"요사여신":["수상개화","사생취의"],"견불가최":["동장철벽","동구적개"],"분성지계":["화소적벽","기문둔갑"],"운주유악":["태청단경","미우주무"],"동구적개":["안영찰채","위위구조"],"사생취의":["일고작기","용맹무쌍"],"양초선행":["문치무공","휴양생식"],"휴양생식":["양초선행","현호제세"],"사면초가":["기문둔갑","화소적벽"],"심모원려":["사면초가","기문둔갑"],"횡소천군":["강유겸제","용맹무쌍"],"천리추격":["극적제승","암전난방"],"암전난방":["극적제승","질풍노도"],"사소도":["이간계","낙정하석"],"미우주무":["현호제세","태청단경"],"이아환아":["금철교명","동장철벽"],"제곤부위":["태청단경","현호제세"],"금낭묘계":["만천과해","태청단경"]};

const internalTacticStatMap = {
    "재주복주":{healGiven:10,damageTakenRed:4},"연인노호":{physicalDmg:5,damageTakenRed:4},"무성":{physicalDmg:8,activeRate:5},"응시낭고":{strategyDmg:8,leech:4},"함진살적":{physicalDmg:8,comboRate:5},"초선차전":{healGiven:10},"칠진칠출":{physicalDmg:6,damageTakenRed:4},"천하무쌍":{physicalDmg:8,comboRate:5},
    "간담상조":{damageTakenRed:8,healGiven:6},"심모원려":{strategyDmg:6},"휴양생식":{healGiven:8},"혼수모어":{damageTakenRed:4,healGiven:6},"효웅":{damageTakenRed:5,healGiven:5},"반객위주":{stackingDmg:8},"실병제위":{damageDealtInc:5},"동구적개":{damageTakenRed:8},"강유겸제":{damageTakenRed:6},"횡징폭렴":{damageTakenRed:6,healGiven:5},"동장철벽":{damageTakenRed:5},"천시지리":{damageTakenRed:5},"진퇴유도":{damageTakenRed:4,damageDealtInc:4},"사생취의":{glassCannonDmg:8,physicalDmg:4},"일고작기":{damageDealtInc:6,comboRate:10},"용맹무쌍":{physicalDmg:6},"만부막적":{physicalDmg:5},"용왕직전":{physicalDmg:5},"태청단경":{healGiven:8},"현호제세":{healGiven:8},"홍수첨향":{healGiven:8,damageTakenRed:6},"위위구조":{healGiven:5,damageTakenRed:4},"안영찰채":{damageTakenRed:4,healGiven:4},"이간계":{damageTakenRed:4,strategyDmg:5},"군령여산":{damageDealtInc:5,damageTakenRed:5},"분용당선":{physicalDmg:5},"출수법":{physicalDmg:5,armorPen:5},"적혈도":{strategyDmg:5,healGiven:5},"전권난정":{physicalDmg:5,damageTakenRed:4},"수상개화":{activeRate:12,damageDealtInc:8},"요사여신":{strategyDmg:10},"만천과해":{damageTakenRed:6,healGiven:6},"화소적벽":{strategyDmg:8},"이퇴위진":{damageTakenRed:6,damageDealtInc:6},"금낭묘계":{healGiven:6},"제곤부위":{healGiven:6},"이아환아":{counterDmg:6,damageTakenRed:4},"만전제발":{physicalDmg:6},"선등함진":{physicalDmg:5},"축세대발":{physicalDmg:6,damageDealtInc:6},"인세이도":{damageTakenRed:8,healGiven:5},"유좌유용":{healGiven:6},"견진연봉":{comboRate:10},"전위위안":{healGiven:6,damageTakenRed:4},"천리추격":{strategyDmg:6,activeRate:3},"분성지계":{strategyDmg:5,damageTakenRed:4},"여자동포":{healGiven:6,damageTakenRed:4},"질풍노도":{physicalDmg:6,armorPen:8},"절절학문":{strategyDmg:6,damageDealtInc:5},"문치무공":{physicalDmg:5,strategyDmg:5,healGiven:6},"담대여두":{strategyDmg:6,physicalDmg:6},"인정":{healGiven:8,damageTakenRed:4},"사소도":{damageDealtInc:6,damageTakenRed:4},"위진새북":{activeRate:5,physicalDmg:5},"금철교명":{counterDmg:6}
};

const FORMATIONS = {
    "일자진": { eff: "전열: 피해 감소 6.0% | 후열: -", pos: ["front","front","front"] },
    "구행진": { eff: "전열: 피해 감소 5.0% | 후열: 피해 증가 12.0%", pos: ["front","back","front"] },
    "추형진": { eff: "전열: 피해 감소 6.0% | 후열: 피해 증가 8.0%", pos: ["back","front","back"] },
    "기형진": { eff: "전열: 피해 증가 12.0% | 후열: 피해 감소 5.0%", pos: ["back","back","front"] },
    "어린진": { eff: "전열: 반격률 20.0% | 후열: 피해 감소 6.0%", pos: ["front","back","back"] },
    "방원진": { eff: "전열: 피해 감소 5.0% | 후열: 연격률 28.0%", pos: ["front","front","back"] },
    "안행진": { eff: "전열: 피해 감소 5.0% | 후열: 강공/기습 12.0%", pos: ["back","front","front"] },
    "호도진": { eff: "전열: 피해 증가 10.0% | 후열: 피해 감소 6.0%", pos: ["front","back","front"] }
};

const analyzedMetaArchetypes = [
    {id:"wei_sima_sp_jojo",name:"[위나라] 사마의·제왕조조 종결 방패 덱",concept:"[공식] 사마의 방패·고급·2",formation:"안행진",officers:[{name:"사마의",chosenTactics:["응시낭고","수상개화","화소적벽"]},{name:"장합",chosenTactics:["교변병기","간담상조","강유겸제"]},{name:"조조(제왕)",chosenTactics:["군령여산","이퇴위진","혼수모어"]}]},
    {id:"wei_assassin_sp",name:"[위나라] 장료 무결점 신속 암살 덱",concept:"[공식] 신속창·2",formation:"호도진",officers:[{name:"장료",chosenTactics:["함진살적","만전제발","사면초가"]},{name:"조조(제왕)",chosenTactics:["군령여산","횡징폭렴","동장철벽"]},{name:"악진",chosenTactics:["분용당선","기문둔갑","선등함진"]}]},
    {id:"shu_dowon_spear",name:"[촉나라] 도원결의 종결 창병 덱",concept:"[공식] 도원창·2",formation:"추형진",officers:[{name:"유비(제왕)",chosenTactics:["재주복주","간담상조","금낭묘계"]},{name:"장비",chosenTactics:["연인노호","제곤부위","이아환아"]},{name:"관우",chosenTactics:["무성","만전제발","선등함진"]}]},
    {id:"shu_hwangchung_shield",name:"[촉나라] 황충·조운 견고 방패 덱",concept:"[공식] 황충 방패·고급·2",formation:"추형진",officers:[{name:"황충",chosenTactics:["적혈도","축세대발","인세이도"]},{name:"조운",chosenTactics:["칠진칠출","이아환아","횡징폭렴"]},{name:"유비(제왕)",chosenTactics:["재주복주","혼수모어","강유겸제"]}]},
    {id:"shu_gangyu_bangwon_2",name:"[촉나라] 강유·제갈 방원 방패 덱",concept:"[공식] 강유 방패·고급·2",formation:"방원진",officers:[{name:"제갈량",chosenTactics:["초선차전","간담상조","여자동포"]},{name:"황충",chosenTactics:["적혈도","견진연봉","위위구조"]},{name:"강유",chosenTactics:["담대여두","천리추격","반객위주"]}]},
    {id:"shu_gangyu_cav",name:"[촉나라] 강유·유비 불굴 기병 덱",concept:"[공식] 강유 기병·고급",formation:"방원진",officers:[{name:"황충",chosenTactics:["적혈도","견진연봉","위위구조"]},{name:"유비",chosenTactics:["인정","강유겸제","이퇴위진"]},{name:"강유",chosenTactics:["담대여두","천리추격","반객위주"]}]},
    {id:"shu_macho_spear_2",name:"[촉나라] 마초 안행 연격 창병 덱",concept:"[공식] 마초 창·고급·2",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","만전제발"]},{name:"위연",chosenTactics:["실병제위","이아환아","홍수첨향"]},{name:"유비",chosenTactics:["인정","혼수모어","이퇴위진"]}]},
    {id:"shu_xushu_spear",name:"[촉나라] 서서·마초 폭딜 창병 덱",concept:"[공식] 서서·창 고급",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","질풍노도"]},{name:"위연",chosenTactics:["실병제위","이퇴위진","강유겸제"]},{name:"서서",chosenTactics:["절절학문","문치무공","전위위안"]}]},
    {id:"wu_magic_bow",name:"[오나라] 동오 대도독 신기루 궁병 덱",concept:"[공식] 노숙 궁·고급",formation:"구행진",officers:[{name:"손권(제왕)",chosenTactics:["겸권상계","이퇴위진","강유겸제"]},{name:"주유",chosenTactics:["봉화연천","화소적벽","요사여신"]},{name:"노숙",chosenTactics:["탑상책","분성지계","여자동포"]}]},
    {id:"qun_cavalry",name:"[군진영] 여포 1턴 분쇄 기병 덱",concept:"[종결] 군웅 돌파 기병",formation:"구행진",officers:[{name:"원소",chosenTactics:["사소도","간담상조","위위구조"]},{name:"여포",chosenTactics:["천하무쌍","만부막적","용왕직전"]},{name:"동탁",chosenTactics:["전권난정","횡징폭렴","운주유악"]}]},
    {id:"qun_whitehorse_bow",name:"[군진영] 공손찬 백마 속공 궁병 덱",concept:"[종결] 백마의종 속공",formation:"구행진",officers:[{name:"원소",chosenTactics:["사소도","승승장구","화소적벽"]},{name:"공손찬",chosenTactics:["위진새북","극적제승","암전난방"]},{name:"여포",chosenTactics:["천하무쌍","만부막적","용왕직전"]}]}
];

const metaDeckUnitTypeMap = {"wei_sima_sp_jojo":"방패병","wei_assassin_sp":"창병","shu_dowon_spear":"창병","shu_hwangchung_shield":"방패병","shu_gangyu_bangwon_2":"방패병","shu_gangyu_cav":"기병","shu_macho_spear_2":"창병","shu_xushu_spear":"창병","wu_magic_bow":"궁병","qun_cavalry":"기병","qun_whitehorse_bow":"궁병"};
const defaultPresetDecks = analyzedMetaArchetypes.map((d, i) => ({ ...d, title: `${i + 1}군`, unitType: "", officers: d.officers.map(o => ({ name: o.name, chosenTactics: o.chosenTactics.length === 3 ? o.chosenTactics.slice(1, 3) : [...o.chosenTactics] })) }));

const internalBondRules = [
    {name:"도원결의",req:2,heroes:["유비","유비(제왕)","관우","장비"],effect:"저항 10%"},
    {name:"오호상장",req:2,heroes:["관우","장비","조운","황충","마초"],effect:"강공 8%"},
    {name:"연환계",req:2,heroes:["동탁","여포","초선","황충"],effect:"피해가함 4%, 치유효과 4%"},
    {name:"도법자연",req:2,heroes:["좌자","장각","우길"],effect:"모략피해 4%, 공심 4%"},
    {name:"가모정세",req:2,heroes:["조조","조조(제왕)","곽가"],effect:"모략피해 4%, 무용피해감소 4%"},
    {name:"위실주석",req:2,heroes:["하후돈","하후연"],effect:"파갑 8%"},
    {name:"백제탁고",req:2,heroes:["제갈량","조운"],effect:"배반 8%, 공심 8%"},
    {name:"오자양장",req:2,heroes:["장료","악진","장합","서황","우금"],effect:"배반 18%"},
    {name:"동오대도독",req:2,heroes:["주유","육손","여몽","육항","노숙"],effect:"모략피해 7%"},
    {name:"군신상기",req:2,heroes:["조조","조조(제왕)","사마의"],effect:"모략피해 4%, 공심 4%"}
];

const metaHawkRecommendationMap = {"wei_sima_sp_jojo":{name:"결운-호생",skill:"사마의 모략 폭딜 예열 턴 확보"},"wei_assassin_sp":{name:"열공-전광",skill:"장료 무용/속도 30% 확정 펌핑 및 1턴킬 지원"},"shu_dowon_spear":{name:"결운-감로",skill:"피격 시 확정 치료 및 저항 버프 매칭"},"shu_hwangchung_shield":{name:"결운-호생",skill:"황충 크리티컬 폭딜 안정성 확보"},"shu_gangyu_bangwon_2":{name:"결운-감로",skill:"제갈량/유비 케어 극대화 및 강유 스탯 강탈 보호"},"shu_gangyu_cav":{name:"결운-호생",skill:"기병 낮은 내구도를 유비 인정+호생으로 극복"},"shu_macho_spear_2":{name:"열공-전광",skill:"안행진 후열 마초 폭딜 및 어그로 제어 연계"},"shu_xushu_spear":{name:"열공-전광",skill:"서서 절절학문 버프와 마초 파갑 돌파 극대화"},"wu_magic_bow":{name:"능소-진시",skill:"50% 확률 피해 30% 감소 (예열 턴 확보)"},"qun_cavalry":{name:"열공-전광",skill:"여포 1턴킬 결정력을 위한 무용 30% 증폭"},"qun_whitehorse_bow":{name:"열공-전광",skill:"여포 및 액티브 선공 폭딜 확보"}};
const metaHawkAlternativesMap = {"wei_sima_sp_jojo":["결운-감로","능소-진시"],"wei_assassin_sp":["삭풍-설조","열공-여천"],"shu_dowon_spear":["결운-호생","능소-진시"],"shu_hwangchung_shield":["결운-감로","능소-진시"],"shu_gangyu_bangwon_2":["결운-호생","능소-진시"],"shu_gangyu_cav":["결운-감로","능소-진시"],"shu_macho_spear_2":["열공-여천","삭풍-설조"],"shu_xushu_spear":["열공-여천","삭풍-설조"],"wu_magic_bow":["능소-전우","결운-감로"],"qun_cavalry":["삭풍-설조","열공-여천"],"qun_whitehorse_bow":["삭풍-설조","능소-진시"]};
const metaHawkRandomAttributesMap = {"wei_sima_sp_jojo":{attr1:{rank1:"[20Lv] 통솔 +12%",rank2:"[20Lv] 모략 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 피해 감소 +10%",rank2:"[30Lv] 치유 효과 부여 +10%",rank3:"[30Lv] 모략 피해 가함 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},"wei_assassin_sp":{attr1:{rank1:"[20Lv] 속도 +25",rank2:"[20Lv] 무용 +12%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 파갑 +12%",rank2:"[30Lv] 피해 가함 +8%",rank3:"[30Lv] 발동률 +5%"},attr3:{rank1:"[40Lv 특성] 첫 턴 선공 부여",rank2:"[40Lv 특성] 전투 첫 턴 제어 면역(통찰)",rank3:"[40Lv 특성] 일반 공격 시 대상 혼란(1턴)"}},"shu_dowon_spear":{attr1:{rank1:"[20Lv] 통솔 +12%",rank2:"[20Lv] 무용 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 피해 감소 +10%",rank2:"[30Lv] 치유 효과 부여 +10%",rank3:"[30Lv] 무용 피해 가함 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},"shu_hwangchung_shield":{attr1:{rank1:"[20Lv] 통솔 +12%",rank2:"[20Lv] 무용 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 피해 감소 +10%",rank2:"[30Lv] 치유 효과 부여 +10%",rank3:"[30Lv] 무용 피해 가함 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},"shu_gangyu_bangwon_2":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 전능 +6%",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +12%"},attr3:{rank1:"[40Lv 특성] 저항 획득률 +6%",rank2:"[40Lv 특성] 행동 시 디버프 1개 해제",rank3:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩"}},"shu_gangyu_cav":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +12%"},attr3:{rank1:"[40Lv 특성] 저항 획득률 +6%",rank2:"[40Lv 특성] 행동 시 디버프 1개 해제",rank3:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩"}},"shu_macho_spear_2":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 일반 공격 3회 시 대상 무장해제(1턴)",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},"shu_xushu_spear":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 일반 공격 3회 시 대상 무장해제(1턴)",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},"wu_magic_bow":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 발동률 +5%",rank3:"[30Lv] 피해 감소 +8%"},attr3:{rank1:"[40Lv 특성] 치유 효과 부여 +12%",rank2:"[40Lv 특성] 행동 시 디버프 1개 해제",rank3:"[40Lv 특성] 저항 획득률 +6%"}},"qun_cavalry":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 파갑 +10%",rank2:"[30Lv] 연격률 +8%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 첫 턴 선공 부여",rank2:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank3:"[40Lv 특성] 일반 공격 시 대상 혼란(1턴)"}},"qun_whitehorse_bow":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 발동률 +5%",rank2:"[30Lv] 피해 가함 +8%",rank3:"[30Lv] 파갑 +10%"},attr3:{rank1:"[40Lv 특성] 첫 턴 선공 부여",rank2:"[40Lv 특성] 전투 첫 턴 제어 면역(통찰)",rank3:"[40Lv 특성] 추격(돌격) 전법 피해 +15%"}},"custom":{attr1:{rank1:"[20Lv] 전능 +5%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 무용 +10%"},attr2:{rank1:"[30Lv] 피해 가함 +6%",rank2:"[30Lv] 피해 감소 +6%",rank3:"[30Lv] 발동률 +3%"},attr3:{rank1:"[40Lv 특성] 전투 첫 턴 제어 면역(통찰)",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 턴 종료 시 병력 회복"}}};
const systemGuideInsights = {"wei_sima_sp_jojo":"💡 [공식 메타] 제왕조조 군령여산 기반 피해 증폭 극대화.","wei_assassin_sp":"💡 [공식 메타] 장료 정밀 타격 및 적 주장 저격.","shu_dowon_spear":"💡 [공식 메타] 유비/장비/관우 인연 및 방어 시너지.","shu_hwangchung_shield":"💡 [공식 메타] 조운/유비의 단단한 방어선 뒤 황충 폭딜.","shu_gangyu_bangwon_2":"💡 [공식 메타] 방원진 강유 스탯 강탈 + 제갈량 저항 부여.","shu_gangyu_cav":"💡 [공식 메타] 일반 유비 인정 힐량으로 기병 내구도 보강.","shu_macho_spear_2":"💡 [공식 메타] 안행진 후열 마초 격리 및 위연 반격 어그로.","shu_xushu_spear":"💡 [공식 메타] 서서 절절학문 버프 트리거 및 마초 파갑 돌파.","wu_magic_bow":"💡 [공식 메타] 손권/주유/노숙 모략 신기루 연계.","qun_cavalry":"💡 [종결 메타] 여포 일기토 연타 1턴 분쇄 기병.","qun_whitehorse_bow":"💡 [종결 메타] 공손찬 위진새북 기반 액티브 난사 궁병."};

const tacticalSet = new Set(["사마의","순욱","정욱","가후","곽가","제갈량","서서","강유","황월영","육손","주유","육항","노숙","대교","소교","장각","우길","좌자","화타","채문희","초선","장녕","장보"]);
const supportSet = new Set(["조조","조조(제왕)","유비","유비(제왕)","손권","손권(제왕)","화타","좌자","채문희","노숙","원소","동탁","공손찬"]);

// ==========================================================================
// LAYER 2: 통합 수치 연산 엔진 (방어/공격 키워드 충돌 100% 소거 및 정규화)
// ==========================================================================
function getOfficerEquipment(officerName, deckUnitType = "") {
    const unitPrefix = (deckUnitType && deckUnitType !== "자동 판별") ? deckUnitType : (internalMasterOfficerUnitMap[officerName]?.split('/')[0] || "방패병");
    const rawEq = internalMasterEquipmentMap[officerName];
    if (rawEq) {
        const eq = { helmet: { ...rawEq.helmet }, armor: { ...rawEq.armor }, accessory: { ...rawEq.accessory } };
        ['helmet', 'armor', 'accessory'].forEach(part => {
            ['attr1', 'attr2'].forEach(attr => {
                let val = eq[part][attr];
                if (val.match(/(창병|기병|궁병|방패병)/)) {
                    val = val.replace(/(창병|기병|궁병|방패병)\s*/g, `${unitPrefix} `);
                    eq[part][attr] = val.replace(unitPrefix === "창병" ? "강공, 기습 증가" : "강공, 기습 상승", unitPrefix === "창병" ? "강공, 기습 상승" : "강공, 기습 증가").trim();
                }
            });
        });
        return eq;
    }
    const profileId = OFFICER_MASTER[officerName]?.[3] || "PHYS_CARRY";
    const p = EQ_PRESETS[profileId];
    return {
        helmet: { name: p[0], attr1: p[1], attr2: p[2] },
        armor:  { name: p[3], attr1: p[4], attr2: p[5] },
        accessory: { name: p[6], attr1: p[7], attr2: p[8] === "UNIT_DMG_RED" ? `${unitPrefix} 피해 감소` : p[8] }
    };
}

function getOfficerDogamData(officerName) {
    if (window.getOfficerDataFromDogam) { 
        const d = window.getOfficerDataFromDogam(officerName); 
        if (d?.uniqueTactic && d.uniqueTactic !== "고유 전법 누락") return { ...d, unitSuitability: d.unitSuitability || internalMasterOfficerUnitMap[officerName] || "정보 없음" };
    }
    return { role: "지휘/능동/패시브", uniqueTactic: internalMasterOfficerUniqueTacticMap[officerName] || "고유 전법 누락", unitSuitability: internalMasterOfficerUnitMap[officerName] || "정보 없음" };
}

const getTacticListBridge = () => window.getAllTacticsFromDogam ? (window.getAllTacticsFromDogam()?.length > 5 ? window.getAllTacticsFromDogam() : [...internalMasterTacticNames]) : [...internalMasterTacticNames];
const getOfficerNamesBridge = () => window.getAllOfficerNamesFromDogam ? (window.getAllOfficerNamesFromDogam()?.length > 5 ? window.getAllOfficerNamesFromDogam().sort((a,b)=>a.localeCompare(b,'ko')) : [...internalMasterOfficerNames]) : [...internalMasterOfficerNames];

function aggregateIntegratedStats(deck, officerIndex) {
    const officer = deck.officers[officerIndex];
    if (!officer || !officer.name) return null;
    const hName = officer.name.trim();
    const stats = { damageTakenRed: 0, damageDealtInc: 0, strategyDmg: 0, physicalDmg: 0, healGiven: 0, leech: 0, comboRate: 0, activeRate: 0, armorPen: 0, critRate: 0 };
    
    const curNames = deck.officers.map(o => o?.name?.trim()).filter(Boolean);
    const matchMeta = getBestMetaMatch(curNames);
    const currentDeckUnit = (deck.unitType && deck.unitType !== "자동 판별") ? deck.unitType : (matchMeta?.bestMeta ? metaDeckUnitTypeMap[matchMeta.bestMeta.id] : "창병");

    const statKeywordMap = { 
        "피해 감소": "damageTakenRed", "피감": "damageTakenRed", "피해감소": "damageTakenRed", "저항": "damageTakenRed",
        "피해 가함": "damageDealtInc", "피해증가": "damageDealtInc", "피증": "damageDealtInc", "피해가함": "damageDealtInc",
        "모략 피해 가함": "strategyDmg", "모략피해가함": "strategyDmg", "모략 피해 상승": "strategyDmg", "모략피해상승": "strategyDmg",
        "무용 피해 가함": "physicalDmg", "무용피해가함": "physicalDmg", "무용 피해 상승": "physicalDmg", "무용피해상승": "physicalDmg",
        "치유 효과 부여": "healGiven", "치유 효과 받음": "healGiven", "치유 효과 상승": "healGiven", "치유": "healGiven", "회복": "healGiven", "보급": "healGiven",
        "배반": "leech", "공심": "leech", "흡혈": "leech",
        "연격률": "comboRate", "연격": "comboRate",
        "발동률": "activeRate", "발동": "activeRate",
        "강공": "critRate", "기습": "critRate", "크리": "critRate",
        "파갑": "armorPen", "간파": "armorPen",
        "glassCannonDmg": "damageDealtInc", "stackingDmg": "damageDealtInc", "counterDmg": "physicalDmg"
    };

    function parseAndAdd(textObj) {
        if (!textObj) return;
        const text = (typeof textObj === 'string' ? textObj : textObj.toString()).replace(/\s+/g, ' ');
        
        const unitMatch = text.match(/(창병|궁병|방패병|기병)/);
        if (unitMatch && unitMatch[1] !== currentDeckUnit && currentDeckUnit !== "자동 판별") {
            return;
        }

        function extractVal(str) {
            const numMatch = str.match(/([+-]?\d+(?:\.\d+)?)\s*%?/);
            return numMatch ? parseFloat(numMatch[1]) : 3.0;
        }

        const segments = /\d+%?,\s*\D+/.test(text) ? text.split(',') : [text];
        segments.forEach(seg => {
            const val = extractVal(seg);
            if (seg.includes('피해 감소') || seg.includes('피감') || seg.includes('피해감소') || seg.includes('저항')) {
                stats.damageTakenRed += val;
            } else if (seg.includes('무용 피해 가함') || seg.includes('무용피해가함') || seg.includes('무용 피해 상승') || seg.includes('무용피해상승')) {
                stats.physicalDmg += val;
            } else if (seg.includes('모략 피해 가함') || seg.includes('모략피해가함') || seg.includes('모략 피해 상승') || seg.includes('모략피해상승')) {
                stats.strategyDmg += val;
            } else if (seg.includes('피해 가함') || seg.includes('피해가함') || seg.includes('피해 증가') || seg.includes('피증')) {
                stats.damageDealtInc += val;
            } else if (seg.includes('치유') || seg.includes('회복') || seg.includes('보급')) {
                stats.healGiven += val;
            } else if (seg.includes('배반') || seg.includes('공심') || seg.includes('흡혈')) {
                stats.leech += val;
            } else if (seg.includes('강공') || seg.includes('기습') || seg.includes('크리')) {
                stats.critRate += val;
            } else if (seg.includes('연격')) {
                stats.comboRate += val;
            } else if (seg.includes('발동')) {
                stats.activeRate += val;
            } else if (seg.includes('파갑') || seg.includes('간파')) {
                stats.armorPen += val;
            }
        });
    }

    const eq = getOfficerEquipment(hName, currentDeckUnit);
    if (eq) { ['helmet', 'armor', 'accessory'].forEach(part => { parseAndAdd(eq[part].attr1); parseAndAdd(eq[part].attr2); }); }

    internalBondRules.filter(r => curNames.filter(n => r.heroes.includes(n)).length >= r.req && new Set(curNames.filter(n => r.heroes.includes(n))).size >= r.req)
        .forEach(bond => { if (bond.heroes.includes(hName)) parseAndAdd(bond.effect); });

    const hA = metaHawkRandomAttributesMap[matchMeta?.bestMeta?.id || "custom"];
    if (hA) { parseAndAdd(hA.attr1.rank1); parseAndAdd(hA.attr2.rank1); parseAndAdd(hA.attr3.rank1); }

    const dogamData = getOfficerDogamData(hName);
    [dogamData.uniqueTactic, ...(officer.chosenTactics || [])].filter(Boolean).forEach(tacName => {
        const tkMap = internalTacticStatMap[tacName.replace(/\s+/g, '')];
        if (tkMap) {
            Object.keys(tkMap).forEach(tk => {
                if (stats[tk] !== undefined) {
                    stats[tk] += tkMap[tk];
                } else if (statKeywordMap[tk] && stats[statKeywordMap[tk]] !== undefined) {
                    stats[statKeywordMap[tk]] += tkMap[tk];
                }
            });
        }
    });
    return stats;
}

function evaluateDeckPerfection(deck, metaId) {
    let totalDmgRed = 0, totalHeal = 0, totalDmgInc = 0, isComplete = true, recLogs = [];
    deck.officers.forEach((off, idx) => {
        const st = aggregateIntegratedStats(deck, idx);
        if (st) { totalDmgRed += st.damageTakenRed; totalHeal += st.healGiven + st.leech; totalDmgInc += st.damageDealtInc + st.strategyDmg + st.physicalDmg; }
        else isComplete = false;
    });
    if (!isComplete) return "";

    const isLongBattle = (metaId.includes('shield') || metaId.includes('sima') || metaId.includes('dowon') || metaId.includes('gangyu'));
    const isBurstDmg = (metaId.includes('assassin') || metaId.includes('combo') || metaId.includes('macho') || metaId.includes('xushu') || metaId.includes('cavalry') || metaId.includes('whitehorse'));

    if (totalDmgRed < 25) recLogs.push(`⚠️ <strong>[생존력 취약]</strong> 부대 총합 피해 감소(${totalDmgRed.toFixed(1)}%)가 25% 미만입니다. '동구적개', '횡징폭렴', '강유겸제' 등의 채용을 강력히 추천합니다.`);
    if (isBurstDmg && totalDmgInc < 30) recLogs.push(`⚠️ <strong>[결정력 부족]</strong> 암살/돌파 덱 메타임에도 피해 증가 스탯(${totalDmgInc.toFixed(1)}%)이 낮습니다. '사생취의', '일고작기' 등의 공격적 버프를 기용하십시오.`);
    if (isLongBattle && totalHeal < 15) recLogs.push(`⚠️ <strong>[유지력 경고]</strong> 장기전 메타 덱에서 회복/치유 보정(${totalHeal.toFixed(1)}%)이 부족합니다. '태청단경', '현호제세', '홍수첨향' 등 유지력 전법을 보충하십시오.`);

    const allTacticsFilled = deck.officers.every(o => o.chosenTactics && o.chosenTactics.length === 2 && o.chosenTactics[0] && o.chosenTactics[1]);
    if (recLogs.length === 0 && allTacticsFilled) return `<div class="feedback-item success" style="border: 1px solid #4ade80; background: rgba(74, 222, 128, 0.1); padding: 8px; margin-top: 10px;">✨ <strong>[최종 검증 완료: Perfect Synergy]</strong> 공방 밸런스 및 공식 가이드 사양을 완전 달성한 종결 세팅입니다. 실전에 즉시 투입하십시오.</div>`;
    return recLogs.length > 0 ? `<div style="margin-top: 10px; border-top: 1px dashed #475569; padding-top: 10px;">${recLogs.map(l => `<div class="feedback-item warning" style="color: #fca5a5;">${l}</div>`).join('')}</div>` : "";
}

function buildIntegratedStatsHtml(stats) {
    if (!stats) return '';
    let arr = [];
    if (stats.damageTakenRed > 0) arr.push(`피감 <span style="color:#4ade80">${stats.damageTakenRed.toFixed(1)}%</span>`);
    if (stats.damageDealtInc > 0) arr.push(`피증 <span style="color:#f87171">${stats.damageDealtInc.toFixed(1)}%</span>`);
    if (stats.strategyDmg > 0) arr.push(`모략 <span style="color:#c084fc">${stats.strategyDmg.toFixed(1)}%</span>`);
    if (stats.physicalDmg > 0) arr.push(`무용 <span style="color:#facc15">${stats.physicalDmg.toFixed(1)}%</span>`);
    if (stats.healGiven > 0) arr.push(`치유 <span style="color:#60a5fa">${stats.healGiven.toFixed(1)}%</span>`);
    if (stats.leech > 0) arr.push(`흡혈 <span style="color:#fb7185">${stats.leech.toFixed(1)}%</span>`);
    if (stats.comboRate > 0) arr.push(`연격 <span style="color:#fb923c">${stats.comboRate.toFixed(1)}%</span>`);
    if (stats.activeRate > 0) arr.push(`발동 <span style="color:#38bdf8">${stats.activeRate.toFixed(1)}%</span>`);
    if (stats.critRate > 0) arr.push(`강공/기습 <span style="color:#f43f5e">${stats.critRate.toFixed(1)}%</span>`);
    if (stats.armorPen > 0) arr.push(`파갑 <span style="color:#94a3b8">${stats.armorPen.toFixed(1)}%</span>`);
    return arr.length === 0 ? '' : `<div class="integrated-stats-box"><div class="istats-title">📊 통합 전투 속성 (추정치)</div><div class="istats-content">${arr.join(' | ')}</div></div>`;
}

// ==========================================================================
// LAYER 3: 맞춤형 대체 추천(Arrow Curation) 및 검증 엔진
// ==========================================================================
function getOwnedAlternativeOfficer(missingName, curNames, heroDataMap, deckUnitType = "") {
    const cleanMissing = missingName.toString().trim().replace(/\s+/g, '');
    const isMissingTac = tacticalSet.has(missingName), isMissingSup = supportSet.has(missingName);
    const missingFaction = officerFactionMap[missingName] || "", missingUnits = (internalMasterOfficerUnitMap[missingName] || "").split("/");

    let candidates = [];
    Object.keys(heroDataMap).forEach(cleanCand => {
        if (!heroDataMap[cleanCand]?.isOwned || curNames.some(cn => cn.replace(/\s+/g, '') === cleanCand) || cleanCand === cleanMissing) return;
        const originName = internalMasterOfficerNames.find(n => n.replace(/\s+/g, '') === cleanCand) || cleanCand;
        let score = 0;
        const isTac = tacticalSet.has(originName), isSup = supportSet.has(originName), faction = officerFactionMap[originName] || "", units = (internalMasterOfficerUnitMap[originName] || "").split("/");
        if ((isMissingTac && isTac) || (isMissingSup && isSup) || (!isMissingTac && !isMissingSup && !isTac && !isSup)) score += 5;
        if (missingFaction && faction === missingFaction) score += 3;
        if (deckUnitType && units.includes(deckUnitType)) score += 4; else if (missingUnits.some(u => units.includes(u))) score += 2;
        if (score > 0) candidates.push({ name: originName, score: score });
    });
    candidates.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'ko'));
    return candidates.length > 0 ? candidates[0].name : null;
}

function getOwnedAlternativeTactic(missingTacName, allEquipTacs, tacticDataMap, recommendedTacs = new Set()) {
    const cleanMissing = missingTacName.toString().trim().replace(/\s+/g, '');
    const alts = tacticAlternativesMap[missingTacName] || [];
    for (let t of alts) {
        const cleanT = t.toString().trim().replace(/\s+/g, '');
        if (tacticDataMap[cleanT]?.isOwned && !allEquipTacs.includes(t) && !recommendedTacs.has(t)) { recommendedTacs.add(t); return t; }
    }
    const targetStats = internalTacticStatMap[missingTacName];
    if (targetStats) {
        const targetKeys = Object.keys(targetStats);
        const isAttack = targetKeys.some(k => ['physicalDmg', 'strategyDmg', 'damageDealtInc', 'comboRate', 'armorPen'].includes(k));
        const isSupport = targetKeys.some(k => ['damageTakenRed', 'healGiven', 'leech'].includes(k));

        for (let cleanTName of Object.keys(tacticDataMap)) {
            if (!tacticDataMap[cleanTName]?.isOwned || allEquipTacs.some(et => et.replace(/\s+/g, '') === cleanTName) || recommendedTacs.has(cleanTName) || cleanTName === cleanMissing) continue;
            const originTName = internalMasterTacticNames.find(n => n.replace(/\s+/g, '') === cleanTName) || cleanTName;
            const candStats = internalTacticStatMap[originTName]; if (!candStats) continue;
            const candKeys = Object.keys(candStats);
            if ((isAttack && !candKeys.some(k => ['physicalDmg', 'strategyDmg', 'damageDealtInc', 'comboRate', 'armorPen'].includes(k))) || 
                (isSupport && !candKeys.some(k => ['damageTakenRed', 'healGiven', 'leech'].includes(k)))) continue;

            if (targetKeys.some(k => candStats[k] !== undefined)) { recommendedTacs.add(originTName); return originTName; }
        }
    }
    return null;
}

function getBestMetaMatch(curNamesClean) {
    if (!curNamesClean || !curNamesClean.length) return null;
    let bestMeta = analyzedMetaArchetypes[0], maxScore = -1;
    analyzedMetaArchetypes.forEach(meta => {
        let score = meta.officers.reduce((acc, mo, idx) => acc + (curNamesClean.includes(mo.name.replace(/\s+/g, '')) ? 1 : 0) + (curNamesClean[idx] === mo.name.replace(/\s+/g, '') ? 0.5 : 0), 0);
        if (score > maxScore) { maxScore = score; bestMeta = meta; }
    });
    return { bestMeta, maxScore };
}

function calculateStrictDeckScore(deck) {
    const curNamesClean = deck?.officers?.map(o => o?.name?.toString().trim().replace(/\s+/g, '') || "").filter(Boolean) || [];
    const match = getBestMetaMatch(curNamesClean);
    if (!match || match.maxScore === 0) return 0;
    
    let score = 100;
    const curFmt = deck.formation?.toString().trim() || "", idealFmt = match.bestMeta.formation.trim();
    if (curFmt.replace(/\s+/g, '') !== idealFmt.replace(/\s+/g, '')) score -= 10;

    match.bestMeta.officers.forEach((metaOff, metaIdx) => {
        const mName = metaOff.name.replace(/\s+/g, '');
        const userOffIdx = curNamesClean.indexOf(mName);
        if (userOffIdx === -1) score -= 30;
        else {
            if ((FORMATIONS[curFmt]?.pos[userOffIdx] || "front") !== (FORMATIONS[idealFmt]?.pos[metaIdx] || "front")) score -= 10;
            const userOff = deck.officers[userOffIdx];
            const metaTacs = metaOff.chosenTactics.length === 3 ? metaOff.chosenTactics.slice(1,3) : metaOff.chosenTactics;
            let unmatchTac = metaTacs.map(t => t.trim().replace(/\s+/g, '')), emptyOrWrong = 0, altCount = 0;
            
            (Array.isArray(userOff.chosenTactics) ? userOff.chosenTactics : ["",""]).forEach(tac => {
                const idx = unmatchTac.indexOf(tac?.toString().trim().replace(/\s+/g, '') || "");
                if (idx !== -1) unmatchTac.splice(idx, 1);
            });

            (Array.isArray(userOff.chosenTactics) ? userOff.chosenTactics : ["",""]).forEach(tac => {
                const cT = tac?.toString().trim().replace(/\s+/g, '') || "";
                if (cT !== "" && !metaTacs.map(t=>t.replace(/\s+/g,'')).includes(cT)) {
                    if (unmatchTac.some((pT, i) => tacticAlternativesMap[pT]?.includes(cT) && unmatchTac.splice(i, 1))) altCount++; else emptyOrWrong++;
                } else if (cT === "") emptyOrWrong++;
            });
            score -= (altCount * 2 + emptyOrWrong * 5);
        }
    });
    return Math.max(score, 0);
}

function generateStructuredFeedback(deck, heroDataMap, tacticDataMap) {
    const fb = { insight: "", logs: [] };
    const curNames = deck?.officers?.map(o => o?.name?.toString().trim().replace(/\s+/g, '') || "").filter(Boolean) || [];
    const match = getBestMetaMatch(curNames);

    if (!match || match.maxScore === 0) {
        if(curNames.length) fb.logs.push({ type: 'info', text: `💡 <strong>[커스텀 덱]</strong> 코어 장수를 기반으로 재설계해 보십시오.` });
        deck?.officers?.forEach((off, idx) => {
            const hName = off?.name?.toString().trim() || "", cleanH = hName.replace(/\s+/g, '');
            if (hName && !heroDataMap[cleanH]?.isOwned) fb.logs.push({ type: 'warning', text: `자원 부족: [${hName}] 미보유` });
            off?.chosenTactics?.forEach((t, i) => { 
                const cleanT = t?.toString().trim().replace(/\s+/g, '') || "";
                if(t && !tacticDataMap[cleanT]?.isOwned) fb.logs.push({ type:'warning', text:`전법 누락: ${i+2}번 슬롯 [${t}] 미보유` }); 
            });
        });
        return fb;
    }

    const { bestMeta: meta } = match;
    fb.logs.push({ type: 'info', text: `🎯 <strong>[${meta.name}]</strong> 기반 처방입니다.` });
    if (systemGuideInsights[meta.id]) fb.insight = systemGuideInsights[meta.id];

    const curFmt = deck.formation?.toString().trim() || "";
    if (curFmt.replace(/\s+/g, '') !== meta.formation.replace(/\s+/g, '')) fb.logs.push({ type: 'warning', text: `진형 교정: [${curFmt}] ➔ <strong>[${meta.formation}]</strong>` });

    const allEquipTacs = deck.officers.flatMap(o => o?.chosenTactics?.map(t => t?.toString().trim().replace(/\s+/g, ''))).filter(Boolean);
    let missingMeta = meta.officers.filter(mo => !curNames.includes(mo.name.replace(/\s+/g, '')));
    const recommendedTacs = new Set();

    deck.officers.forEach((off, offIdx) => {
        const hName = off?.name?.toString().trim() || "", cleanHName = hName.replace(/\s+/g, '');
        if (!cleanHName) {
            if (missingMeta.length) {
                const targetMissing = missingMeta.shift().name;
                const altHero = getOwnedAlternativeOfficer(targetMissing, curNames, heroDataMap, deck.unitType);
                const recText = altHero ? `➔ <strong>[${targetMissing}]</strong> (대체: <span style="color:#38bdf8;">${altHero}</span>)` : `➔ <strong>[${targetMissing}]</strong> <span style="color:#ef4444;">[보유 대체재 없음]</span>`;
                fb.logs.push({ type: 'warning', text: `빈 슬롯 ${recText} 권장` });
            }
            return;
        }
        
        if (!heroDataMap[cleanHName]?.isOwned) {
            const altHero = getOwnedAlternativeOfficer(hName, curNames, heroDataMap, deck.unitType);
            const recText = altHero ? `➔ 대체 추천: <span style="color:#38bdf8; font-weight:bold;">[${altHero}]</span>` : `➔ <span style="color:#ef4444;">[보유 대체재 없음]</span>`;
            fb.logs.push({ type: 'warning', text: `자원 경고: [${hName}] 미보유 ${recText}` });
        }

        const metaIdx = meta.officers.findIndex(mo => mo.name.replace(/\s+/g, '') === cleanHName);
        if (metaIdx !== -1) {
            if ((FORMATIONS[curFmt]?.pos[offIdx] || "front") !== (FORMATIONS[meta.formation]?.pos[metaIdx] || "front")) fb.logs.push({ type: 'warning', text: `배치 오류: [${hName}] 위치 교정 요망` });
            
            const mTacs = meta.officers[metaIdx].chosenTactics;
            const targetMetaTacs = mTacs.length === 3 ? mTacs.slice(1, 3) : mTacs;
            let unmatchTac = targetMetaTacs.map(t => t.trim().replace(/\s+/g, '')).filter(t => !allEquipTacs.includes(t));
            
            (off.chosenTactics || []).forEach((t, i) => {
                const cT = t?.toString().trim().replace(/\s+/g, '') || "";
                const slotNum = i + 2;

                if (!cT) {
                    if (unmatchTac.length > 0) {
                        const pTac = unmatchTac.shift();
                        const ownedAltTac = getOwnedAlternativeTactic(pTac, allEquipTacs, tacticDataMap, recommendedTacs);
                        const altsText = ownedAltTac ? `<span style="color:#38bdf8; font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#ef4444;">[보유 대체재 없음]</span>`;
                        fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백: 1순위 [${pTac}] / 대체 ➔ ${altsText} 권장` });
                    }
                } else {
                    const isMeta = targetMetaTacs.map(x => x.replace(/\s+/g, '')).includes(cT);
                    const isAlt = targetMetaTacs.some(mTac => (tacticAlternativesMap[mTac] || []).map(x => x.replace(/\s+/g, '')).includes(cT));

                    if (!isMeta && !isAlt) {
                        const pTac = unmatchTac.length > 0 ? unmatchTac.shift() : targetMetaTacs[i] || "정석 전법";
                        const ownedAltTac = getOwnedAlternativeTactic(pTac, allEquipTacs, tacticDataMap, recommendedTacs);
                        const altsText = ownedAltTac ? `<span style="color:#38bdf8; font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#ef4444;">[보유 대체재 없음]</span>`;
                        fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 오배치: <span style="color:#f87171; text-decoration:line-through;">[${t}]</span> (역시너지) ➔ 권장: [${pTac}] (또는 대체 ${altsText})` });
                    } else {
                        if (!tacticDataMap[cT]?.isOwned) {
                            const ownedAltTac = getOwnedAlternativeTactic(cT, allEquipTacs, tacticDataMap, recommendedTacs);
                            const altsText = ownedAltTac ? `➔ 대체 추천: <span style="color:#38bdf8; font-weight:bold;">[${ownedAltTac}]</span>` : `➔ <span style="color:#ef4444;">[보유 대체재 없음]</span>`;
                            fb.logs.push({ type: 'warning', text: `자원 부족: [${t}] 미보유 ${altsText}` });
                        }
                    }
                }
            });
        } else {
            if (missingMeta.length) {
                const targetMissing = missingMeta.shift().name;
                const altHero = getOwnedAlternativeOfficer(targetMissing, curNames, heroDataMap, deck.unitType);
                const recText = altHero ? `➔ <strong>[${targetMissing}]</strong> 투입 (대체: <span style="color:#38bdf8;">${altHero}</span>)` : `➔ <strong>[${targetMissing}]</strong> 투입 <span style="color:#ef4444;">[보유 대체재 없음]</span>`;
                fb.logs.push({ type: 'warning', text: `장수 교체: [${hName}] 제외 ${recText}` });
            } else {
                fb.logs.push({ type: 'warning', text: `장수 교체: [${hName}] 제외 요망` });
            }
        }
    });
    return fb;
}

function calculateActivatedBond(officers) {
    const curNames = officers?.map(o => o?.name?.toString().trim()).filter(Boolean) || [];
    if (!curNames.length) return "활성화 효과 없음";
    const matched = internalBondRules.filter(r => curNames.filter(n => r.heroes.includes(n)).length >= r.req && new Set(curNames.filter(n => r.heroes.includes(n))).size >= r.req);
    return matched.length ? matched.map(r => `<strong>[${r.name}]</strong> ${r.effect}`).join(" / ") : "활성화 효과 없음";
}

// ==========================================================================
// LAYER 4: UI 파이프라인 및 모달 컨트롤 (경량화 단일 통합 팝업 엔진)
// ==========================================================================
let dynamicPresetDecks = [], currentSortMode = 'default';
let draggedDeckOriginIdx = null, draggedOfficerSlotIdx = null;

let modalPopupEl = null;
function openModalPopup(e, title, meta1, desc1, meta2 = null, desc2 = null) {
    e.stopPropagation();
    if (!modalPopupEl) {
        modalPopupEl = document.createElement('div');
        modalPopupEl.id = 'tactic-popup-modal';
        document.body.appendChild(modalPopupEl);
        document.addEventListener('click', (evt) => {
            if (!evt.target.closest('.tactic-row') && !evt.target.closest('.eq-attr') && !evt.target.closest('#tactic-popup-modal')) {
                modalPopupEl.style.display = 'none';
            }
        });
    }
    let html = `<div class="p-title" style="color:#38bdf8;">${title}</div><div class="p-meta" style="color:#facc15;margin-top:6px;">${meta1}</div><div class="p-desc" style="margin-bottom:8px;">${desc1}</div>`;
    if (meta2 && desc2) html += `<div class="p-meta" style="color:#facc15;">${meta2}</div><div class="p-desc">${desc2}</div>`;
    modalPopupEl.innerHTML = html;
    modalPopupEl.style.display = 'block';
    const rect = e.currentTarget.getBoundingClientRect();
    let top = rect.top + window.scrollY - 10, left = rect.right + window.scrollX + 10;
    if (left + 280 > window.innerWidth) left = rect.left + window.scrollX - 290;
    modalPopupEl.style.top = `${top}px`;
    modalPopupEl.style.left = `${left}px`;
}

window.showTacticPopup = function(e, tacticName) {
    if (!tacticName || tacticName === "선택 안함" || tacticName === "고유 전법") return;
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') return;
    let pDesc = "상세 데이터 미등록 (도감 연동 필요)", pRole = "-", pTarget = "-";
    const grid = document.getElementById('tactic-card-grid');
    if (grid) {
        const targetCard = Array.from(grid.children).find(c => c.querySelector('div:first-child')?.innerText.trim() === tacticName);
        if (targetCard) {
            const metaText = targetCard.querySelector('div:nth-child(2)')?.innerText || "";
            const rM = metaText.match(/역할:\s*(.*?)\s*\|/), tM = metaText.match(/대상:\s*(.*)/);
            pRole = rM ? rM[1] : "-"; pTarget = tM ? tM[1] : "-";
            pDesc = targetCard.querySelector('div:nth-child(3)')?.innerText || pDesc;
        }
    }
    openModalPopup(e, `⭐ ${tacticName}`, `타입: ${pRole} | 대상: ${pTarget}`, pDesc);
};

window.showEquipPopup = function(e, attr1, attr2) {
    const getDesc = attr => EQUIP_ATTR_DESCRIPTIONS[attr] || EQUIP_ATTR_DESCRIPTIONS[attr.replace("상승", "증가")] || EQUIP_ATTR_DESCRIPTIONS[attr.replace("증가", "상승")] || "상세 데이터 미등록 (도감 연동 필요)";
    openModalPopup(e, "⚒️ 장비 추가 속성 설명", `🔹 1차: ${attr1}`, getDesc(attr1), `🔹 2차: ${attr2}`, getDesc(attr2));
};

const injectCustomUIStyles = () => {
    if (document.getElementById('deck-custom-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'deck-custom-ui-styles';
    style.innerHTML = `.deck-card select{background-color:#1e293b;color:#f8fafc;border:1px solid #475569;border-radius:4px;padding:6px 24px 6px 10px;font-size:13px;appearance:none;-webkit-appearance:none;outline:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;background-size:14px;transition:all 0.2s ease-in-out;width:100%;box-sizing:border-box;font-family:inherit}.deck-card select:focus,.deck-card select:hover{border-color:#8b5cf6;box-shadow:0 0 0 2px rgba(139,92,246,0.25);background-color:#0f172a}.deck-card select option{background-color:#0f172a;color:#f8fafc;padding:8px}.hawk-recommend-box{margin-top:10px;padding:12px;background-color:#1e293b;border-left:4px solid #3b82f6;border-radius:6px;font-size:13px;color:#e2e8f0;line-height:1.5}.hawk-recommend-box .hawk-highlight{color:#60a5fa;font-weight:bold}.hawk-recommend-box .hawk-subtext{color:#94a3b8;font-size:11px}.hawk-recommend-box .hawk-detail{margin-top:6px;padding-top:6px;border-top:1px dashed #334155;color:#cbd5e1;font-size:12px}.equipment-box{margin-top:6px;padding:6px;border:1px solid #334155;border-radius:4px;background-color:#0f172a;font-size:11px}.equipment-box .eq-item{margin-bottom:2px;color:#cbd5e1}.equipment-box .eq-item:last-child{margin-bottom:0}.equipment-box .eq-attr{color:#38bdf8;font-size:10px;margin-left:4px;cursor:pointer;transition:color 0.2s}.equipment-box .eq-attr:hover{color:#facc15}.integrated-stats-box{margin-top:6px;padding:8px;border-radius:4px;background:linear-gradient(145deg,#1e293b,#0f172a);border:1px solid #475569;font-size:11px;font-family:monospace}.integrated-stats-box .istats-title{color:#facc15;font-weight:bold;margin-bottom:4px;font-size:10px;text-transform:uppercase;letter-spacing:0.5px}.integrated-stats-box .istats-content{color:#e2e8f0;line-height:1.6}.unit-badge{display:inline-block;background-color:rgba(245,158,11,0.15);color:#fbbf24;font-size:10px;font-weight:600;padding:3px 6px;border-radius:4px;border:1px solid rgba(245,158,11,0.3);margin-top:4px;margin-bottom:4px}.feedback-item.success{color:#4ade80;font-weight:500}.feedback-item.warning{color:#facc15}.feedback-item.info{color:#60a5fa}.officer-meta select{margin-top:4px;margin-bottom:4px}.tactic-row select{margin-top:2px}.deck-footer-bar select{width:auto;min-width:120px;margin-right:12px}#tactic-popup-modal{display:none;position:absolute;z-index:9999;background:rgba(15,23,42,0.98);border:1px solid #a855f7;padding:12px;border-radius:6px;box-shadow:0 4px 15px rgba(0,0,0,0.6);width:280px;color:#f8fafc;font-size:12px;backdrop-filter:blur(4px);pointer-events:none}#tactic-popup-modal .p-title{font-size:14px;font-weight:700;color:#facc15;margin-bottom:6px;border-bottom:1px solid #334155;padding-bottom:6px;letter-spacing:0.5px}#tactic-popup-modal .p-meta{color:#38bdf8;font-size:11px;margin-bottom:8px;font-weight:600}#tactic-popup-modal .p-desc{line-height:1.6;color:#cbd5e1;word-break:keep-all}.tactic-row{cursor:pointer;position:relative;transition:all 0.2s;padding:6px 12px;border-radius:4px;margin-bottom:4px}.tactic-row:hover{background-color:rgba(168,85,247,0.15);border-color:#a855f7}.tactic-row select{width:76%;min-width:140px;margin:0 auto;display:block}`;
    document.head.appendChild(style);
};

window.handleOfficerDragStart = (e, dIdx, oIdx) => { draggedDeckOriginIdx = dIdx; draggedOfficerSlotIdx = oIdx; e.dataTransfer.effectAllowed = 'move'; setTimeout(() => { const s=e.target.closest('.officer-slot'); if(s)s.style.opacity='0.4'; }, 0); };
window.handleOfficerDragOver = e => { e.preventDefault(); const s=e.target.closest('.officer-slot'); if(s) { s.classList.add('drag-over-highlight'); s.style.boxShadow='0 0 10px 2px #a855f7 inset'; s.style.borderColor='#a855f7'; } };
window.handleOfficerDragLeave = e => { const s=e.target.closest('.officer-slot'); if(s) { s.classList.remove('drag-over-highlight'); s.style.boxShadow=''; s.style.borderColor=''; } };
window.handleOfficerDrop = (e, tDIdx, tOIdx) => {
    e.preventDefault(); const s=e.target.closest('.officer-slot'); if(s) { s.classList.remove('drag-over-highlight'); s.style.boxShadow=''; s.style.borderColor=''; }
    if (draggedDeckOriginIdx === null || draggedDeckOriginIdx !== tDIdx) return alert("동일 부대 내에서만 변경 가능합니다.");
    if (draggedOfficerSlotIdx === tOIdx) return;
    const d = dynamicPresetDecks.find(d => d.originIdx === draggedDeckOriginIdx);
    if (d) { [d.officers[draggedOfficerSlotIdx], d.officers[tOIdx]] = [d.officers[tOIdx], d.officers[draggedOfficerSlotIdx]]; localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); renderDeckBuilder(); }
};
window.handleOfficerDragEnd = e => { const s=e.target.closest('.officer-slot'); if(s) s.style.opacity='1'; draggedDeckOriginIdx = draggedOfficerSlotIdx = null; };

function loadDeckTextData() {
    try {
        const parsed = JSON.parse(localStorage.getItem('samguk_deck_text'));
        if (parsed?.length) {
            dynamicPresetDecks = parsed.slice(0, 5).map((d, i) => ({ ...defaultPresetDecks[i], ...d, originIdx: d.originIdx ?? i }));
            while(dynamicPresetDecks.length < 5) dynamicPresetDecks.push({...defaultPresetDecks[dynamicPresetDecks.length], originIdx: dynamicPresetDecks.length});
            return localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
        }
    } catch (e) {}
    dynamicPresetDecks = defaultPresetDecks.map((d, i) => ({ ...d, originIdx: i, officers: d.officers.map(o => ({ ...o, chosenTactics: [...o.chosenTactics] })) }));
}

function updateDeckState(oIdx, prop, val, offIdx=null, slotIdx=null) {
    const d = dynamicPresetDecks.find(x => x.originIdx === oIdx);
    if (!d) return;
    if (prop === 'reset') { d.formation = "추형진"; d.unitType = ""; d.officers.forEach(o => { o.name = ""; o.chosenTactics = ["", ""]; }); }
    else if (offIdx !== null) slotIdx !== null ? d.officers[offIdx].chosenTactics[slotIdx] = val : d.officers[offIdx].name = val;
    else d[prop] = val;
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); renderDeckBuilder();
}

window.autoFixDeck = oIdx => {
    const d = dynamicPresetDecks.find(x => x.originIdx === oIdx);
    const match = getBestMetaMatch(d?.officers?.map(o=>o?.name?.replace(/\s+/g,'')).filter(Boolean));
    if (!match || match.maxScore === 0) return alert("[교정 실패] 코어 장수가 없습니다.");
    d.formation = match.bestMeta.formation; d.unitType = metaDeckUnitTypeMap[match.bestMeta.id] || "";
    d.officers = match.bestMeta.officers.map(m => ({ name: m.name, chosenTactics: m.chosenTactics.length===3 ? m.chosenTactics.slice(1,3) : [...m.chosenTactics] }));
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); renderDeckBuilder(); alert(`[교정 성공] ${match.bestMeta.name} (으)로 수정됨`);
};

window.moveDeckAction = (cIdx, dir) => {
    const tIdx = cIdx + dir; if (tIdx < 0 || tIdx >= dynamicPresetDecks.length) return;
    [dynamicPresetDecks[cIdx], dynamicPresetDecks[tIdx]] = [dynamicPresetDecks[tIdx], dynamicPresetDecks[cIdx]];
    dynamicPresetDecks.forEach((d, i) => { d.originIdx = i; d.title = `${i + 1}군`; });
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); renderDeckBuilder();
};

function renderDeckBuilder() {
    const container = document.getElementById('deck-container'); if (!container) return;
    try {
        container.style.display = 'block'; container.innerHTML = '';
        const saved = JSON.parse(localStorage.getItem('samguk_hobby_data') || '{}');
        const hMap = {}, tMap = {};
        
        saved.heroes?.forEach(x => { 
            if(x && x.name) {
                const cleanKey = x.name.toString().trim().replace(/\s+/g, '');
                hMap[cleanKey] = { isOwned: !!x.isOwned };
            }
        });
        saved.tactics?.forEach(x => { 
            if(x && x.name) {
                const cleanKey = x.name.toString().trim().replace(/\s+/g, '');
                tMap[cleanKey] = { isOwned: !!x.isOwned };
            }
        });

        dynamicPresetDecks.sort((a,b) => (a.originIdx||0) - (b.originIdx||0)).forEach((deck, aIdx) => {
            const curNames = deck.officers.map(o => o?.name?.trim().replace(/\s+/g,'')).filter(Boolean);
            const match = getBestMetaMatch(curNames);
            let dType = deck.unitType || (match?.bestMeta ? metaDeckUnitTypeMap[match.bestMeta.id] : "창병"), hawkHtml = '';

            if (curNames.length > 0) {
                const hk = match?.bestMeta ? (metaHawkRecommendationMap[match.bestMeta.id] || {name:"-",skill:"-"}) : {name:"범용 전투매",skill:"기본 최적화"};
                const hkAlt = match?.bestMeta ? (metaHawkAlternativesMap[match.bestMeta.id] || ["-","-"]) : ["열공-전광","결운-호생"];
                const resolvedMetaId = match?.bestMeta?.id;
                const hA = (resolvedMetaId && metaHawkRandomAttributesMap[resolvedMetaId]) ? metaHawkRandomAttributesMap[resolvedMetaId] : metaHawkRandomAttributesMap["custom"];
                hawkHtml = `<div class="hawk-recommend-box"><span class="hawk-highlight">🦅 전투매: 🥇${hk.name}</span> (${hk.skill}) <span class="hawk-subtext">[대체: 🥈${hkAlt[0]} 🥉${hkAlt[1]}]</span><div class="hawk-detail">1순위 속성 ➔ 기초: ${hA.attr1.rank1} / 보정: ${hA.attr2.rank1} / 기믹: ${hA.attr3.rank1}</div></div>`;
            }

            const offHtml = deck.officers.map((off, oIdx) => {
                const hName = off?.name?.trim() || "", cName = hName.replace(/\s+/g,'');
                const dg = cName ? getOfficerDogamData(hName) : null;
                const unitBadgeHtml = cName && dg?.unitSuitability ? `<div class="unit-badge">🎖️ ${dg.unitSuitability}</div>` : '';
                
                const isHeroOwned = cName && !!hMap[cName]?.isOwned;
                const isUniqueOwned = dg?.uniqueTactic && !!tMap[dg.uniqueTactic.toString().trim().replace(/\s+/g,'')]?.isOwned;
                
                let tRows = `<div class="tactic-row ${cName&&(isHeroOwned||isUniqueOwned)?'owned':'missing'}" style="border-left:3px solid #cd9b33;display:flex;align-items:center;justify-content:center;" title="클릭하여 전법 상세 설명 보기" onclick="showTacticPopup(event, '${dg?.uniqueTactic||''}')"><span>⭐ ${dg?.uniqueTactic||'고유 전법'}</span></div>`;
                
                (off.chosenTactics||[]).forEach((t, sIdx) => {
                    const cT = t?.toString().trim() || "";
                    const isOwn = cT ? !!tMap[cT.replace(/\s+/g,'')]?.isOwned : false;
                    tRows += `<div class="tactic-row ${cT?(isOwn?'owned':'missing'):'missing'}" title="클릭하여 전법 상세 설명 보기" onclick="showTacticPopup(event, this.querySelector('select').value)"><select onchange="updateDeckState(${deck.originIdx},'tac',this.value,${oIdx},${sIdx})"><option value="">선택 안함</option>${getTacticListBridge().map(tx=>`<option value="${tx}" ${cT===tx?'selected':''}>${tx}</option>`).join('')}</select></div>`;
                });

                const eq = cName ? getOfficerEquipment(hName, dType) : null;
                const eqH = eq ? `<div class="equipment-box">
                    <div class="eq-item">🪖 ${eq.helmet.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.helmet.attr1}', '${eq.helmet.attr2}')" style="cursor:pointer; text-decoration:underline; text-underline-offset:2px;" title="클릭하여 공식 명세 보기">[${eq.helmet.attr1} / ${eq.helmet.attr2}]</span></div>
                    <div class="eq-item">🛡️ ${eq.armor.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.armor.attr1}', '${eq.armor.attr2}')" style="cursor:pointer; text-decoration:underline; text-underline-offset:2px;" title="클릭하여 공식 명세 보기">[${eq.armor.attr1} / ${eq.armor.attr2}]</span></div>
                    <div class="eq-item">📿 ${eq.accessory.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.accessory.attr1}', '${eq.accessory.attr2}')" style="cursor:pointer; text-decoration:underline; text-underline-offset:2px;" title="클릭하여 공식 명세 보기">[${eq.accessory.attr1} / ${eq.accessory.attr2}]</span></div>
                </div>` : '';
                const intStats = cName ? aggregateIntegratedStats(deck, oIdx) : null;
                const intStatsH = buildIntegratedStatsHtml(intStats);

                return `<div class="officer-slot" draggable="true" ondragstart="handleOfficerDragStart(event,${deck.originIdx},${oIdx})" ondragover="handleOfficerDragOver(event)" ondragleave="handleOfficerDragLeave(event)" ondrop="handleOfficerDrop(event,${deck.originIdx},${oIdx})" ondragend="handleOfficerDragEnd(event)" style="cursor:grab;${!cName?'border:1px dashed #444':''}"><div class="officer-meta"><span class="position-badge">${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}</span><select onchange="updateDeckState(${deck.originIdx},'off',this.value,${oIdx})"><option value="">선택 안함</option>${getOfficerNamesBridge().map(hx=>`<option value="${hx}" ${hName===hx?'selected':''}>${hx}</option>`).join('')}</select></div>${unitBadgeHtml}${eqH}${intStatsH}<div class="tactic-status-box">${tRows}</div></div>`;
            }).join('');

            const fb = generateStructuredFeedback(deck, hMap, tMap), score = calculateStrictDeckScore(deck);
            let fbH = fb.logs.map(l=>`<div class="feedback-item ${l.type}">${l.text}</div>`).join('') + (fb.insight?`<div class="feedback-item info">${fb.insight}</div>`:'');
            fbH += evaluateDeckPerfection(deck, match?.bestMeta?.id || "custom");

            container.insertAdjacentHTML('beforeend', `<div class="deck-card">
                <div class="deck-title" style="display:flex;justify-content:space-between;align-items:center;">
                    <div>
                        <button onclick="moveDeckAction(${aIdx},-1)" style="visibility:${aIdx>0?'visible':'hidden'};">▲</button>
                        <button onclick="moveDeckAction(${aIdx},1)" style="visibility:${aIdx<dynamicPresetDecks.length-1?'visible':'hidden'};">▼</button>
                        <span contenteditable="true" onblur="updateDeckState(${deck.originIdx},'title',this.innerText.replace(/\\[추천도:.*?\\]/g,'').trim()||'${deck.title}')">${deck.title}</span>
                        <span style="color:#ff9f43;font-size:13px;margin-left:12px;">[추천도: ${score}점]</span>
                    </div>
                    <div><button onclick="autoFixDeck(${deck.originIdx})" style="background:#8b5cf6;color:#fff;">✨ AI 교정</button> <button onclick="updateDeckState(${deck.originIdx},'reset')" style="background:#c82333;color:#fff;">초기화</button></div>
                </div>
                <div class="bond-box">부대 인연: ${calculateActivatedBond(deck.officers)}</div>${hawkHtml}<div class="officers-row">${offHtml}</div>
                <div class="feedback-container-box">${fbH}</div>
                <div class="deck-footer-bar">
                    <select onchange="updateDeckState(${deck.originIdx},'formation',this.value)">${Object.keys(FORMATIONS).map(f=>`<option value="${f}" ${deck.formation===f?'selected':''}>${f}</option>`).join('')}</select>
                    <select onchange="updateDeckState(${deck.originIdx},'unitType',this.value)">${["","창병","기병","궁병","방패병"].map(u=>`<option value="${u}" ${deck.unitType===u?'selected':''}>${u||'자동 판별'}</option>`).join('')}</select>
                    <span style="font-size:11px;margin-left:10px;">${FORMATIONS[deck.formation]?.eff||''}</span>
                </div>
            </div>`);
        });
    } catch(e) { container.innerHTML = `<div style="color:red;padding:20px;border:1px solid red;">렌더링 에러: ${e.message}</div>`; }
}

window.exportData = () => { const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify({samguk_hobby_data:JSON.parse(localStorage.getItem('samguk_hobby_data')),samguk_deck_text:JSON.parse(localStorage.getItem('samguk_deck_text'))})],{type:"application/json"})); a.download="backup.json"; a.click(); };
window.triggerImport = () => document.getElementById('import-file-input')?.click();
window.importData = inp => { const r=new FileReader(); r.onload=e=>{ const d=JSON.parse(e.target.result); if(d.samguk_hobby_data)localStorage.setItem('samguk_hobby_data',JSON.stringify(d.samguk_hobby_data)); if(d.samguk_deck_text)localStorage.setItem('samguk_deck_text',JSON.stringify(d.samguk_deck_text)); location.reload(); }; r.readAsText(inp.files[0]); };

const osi = localStorage.setItem; localStorage.setItem = function(k,v) { osi.apply(this,arguments); window.dispatchEvent(new CustomEvent('local-storage-update',{detail:{key:k}})); };
window.addEventListener('local-storage-update', e => { if(e.detail.key==='samguk_hobby_data') renderDeckBuilder(); });
window.addEventListener('storage', e => { if(e.key==='samguk_hobby_data') renderDeckBuilder(); });

document.addEventListener('DOMContentLoaded', () => { injectCustomUIStyles(); loadDeckTextData(); renderDeckBuilder(); });

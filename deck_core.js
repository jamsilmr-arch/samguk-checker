// [시스템 분석] deck_core.js - 최종 무결성 결선 (1~10위 메타 + 계층적 전법 배타성 완벽 통합) 기동
console.log("[시스템 분석] deck_core.js 최종 무결성 결선 (1~10위 메타 + 계층적 전법 배타성 완벽 통합) 기동");

const cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

// ==========================================================================
// LAYER 1: 초경량 자가 치유(Self-Healing) 통합 마스터 사전
// ==========================================================================
const FB_OFF_META = {
    "가후":["경달권변","궁병/방패병","wei"], "곽가":["산무유책","궁병/방패병","wei"], "사마의":["응시낭고","방패병/궁병","wei"], "순욱":["거중지중","궁병/창병","wei"], "악진":["분용당선","창병/궁병","wei"], "전위":["축호과간","창병/방패병","wei"], "정욱":["십면매복","방패병/궁병","wei"], "조조(제왕)":["군령여산","창병/방패병","wei"], "조조":["효웅","방패병/기병","wei"], "장료":["함진살적","창병/기병","wei"], "장합":["교변병기","방패병/창병","wei"], "하후돈":["발시담정","창병/방패병","wei"], "하후연":["충용","창병/기병","wei"],
    "관우":["무성","창병/기병","shu"], "강유":["담대여두","방패병/기병","shu"], "마대":["습참","창병/방패병","shu"], "마초":["출수법","창병/기병","shu"], "서서":["절절학문","창병/궁병","shu"], "사마가":["만왕","창병/방패병","shu"], "위연":["실병제위","창병/궁병","shu"], "유비":["인정","창병/기병","shu"], "유비(제왕)":["재주복주","창병/방패병","shu"], "장비":["연인노호","창병/방패병","shu"], "제갈량":["초선차전","궁병/방패병","shu"], "조운":["칠진칠출","창병/방패병","shu"], "황충":["적혈도","창병/방패병","shu"], "황월영":["묘산천기","궁병/방패병","shu"],
    "대교":["정수유심","창병/궁병","wu"], "노숙":["탑상책","궁병/기병","wu"], "소교":["화용욕모","궁병/기병","wu"], "손견":["강동맹호","창병/방패병","wu"], "손권":["웅거","궁병/기병","wu"], "손상향":["효희","궁병/기병","wu"], "손책":["강동패주","창병/방패병","wu"], "손권(제왕)":["겸권상계","창병/궁병","wu"], "여몽":["백의도강","방패병/궁병","wu"], "육손":["지변규려","창병/기병","wu"], "육항":["청백충근","창병/궁병","wu"], "주유":["봉화연천","창병/궁병","wu"], "주태":["청라산개","기병/방패병","wu"], "정보":["칠척사모","기병/방패병","wu"], "황개":["요원지화","방패병/궁병","wu"],
    "공손찬":["위진새북","기병/창병","qun"], "동탁":["전권난정","방패병/기병","qun"], "안량":["효장","창병/기병","qun"], "여포":["천하무쌍","궁병/기병","qun"], "우길":["태평경","창병/궁병","qun"], "원소":["사소도","방패병/기병","qun"], "장각":["황천당립","궁병/기병","qun"], "장녕":["천의난위","궁병/방패병","qun"], "장보":["요풍사기","궁병/방패병","qun"], "좌자":["화겁생기","궁병/방패병","qun"], "채문희":["비분시","궁병/기병","qun"], "초선":["폐월","창병/기병","qun"], "화타":["청낭제세","궁병/방패병","qun"]
};
const FB_OFFICERS = Object.keys(FB_OFF_META);
const FB_TACTICS = "가정지전,간담상조,강유겸제,견불가최,견진연봉,공기불비,과하탁교,교취호탈,극적제승,금낭묘계,금적금왕,금창신,금철교명,기문둔갑,낙정하석,동구적개,동장철벽,동촉기선,만부막적,만전제발,만천과해,문치무공,미우주무,반객위주,병량촌단,분성지계,비사주석,사면초가,사생취의,선등함진,수상개화,순수견양,승승장구,심모원려,안영찰채,암전난방,양의화생,양초선행,여자동포,요사여신,용맹무쌍,용왕직전,운주유악,원성재도,위위구조,유좌유용,이간계,이아환아,이일대로,이퇴위진,일고작기,인세이도,전위위안,제곤부위,중정기고,지인선임,진퇴유도,진화타겁,질풍노도,천리추격,천시지리,체천행도,축세대발,축호과간,태청단경,토적격문,현호제세,호령삼군,혼수모어,홍수첨향,화소적벽,횡소천군,횡징폭렴,휴양생식".split(',');

const EQ_PRESETS = {
    PHYS_CARRY: ["호분관","강공, 기습 상승","창병 피해 가함","명광갑","무용 피해 가함","창병 배반, 공심 상승","치룡패","무용 피해 가함","창병 배반, 공심 상승"],
    PHYS_COMBO: ["백옥잠","연격률","창병 피해 가함","세린갑","무용 피해 가함","창병 배반, 공심 상승","쌍호뉴","연격률","창병 배반, 공심 상승"],
    STR_CARRY:  ["진현관","강공, 기습 상승","창병 피해 가함","명재복","모략 피해 가함","창병 배반, 공심 상승","박산로","배반, 공심 상승","창병 배반, 공심 상승"],
    TANK_COUNTER:["연함규","피해 감소","창병 피해 가함","청등갑","피해 감소","창병 피해 감소","사남패","피해 감소","창병 배반, 공심 상승"],
    SUPPORT_HEAL:["연함규","피해 감소","치유 효과 부여","청등갑","피해 감소","창병 치유 효과 상승","사남패","치유 효과 받음","창병 피해 감소"],
    SUPPORT_STR: ["진현관","피해 감소","치유 효과 부여","명재복","피해 감소","창병 피해 감소","박산로","치유 효과 부여","창병 피해 감소"]
};

// [고도화] 사마의 투구(강공, 기습 상승), 가후 장신구(방패병 치유 효과 상승), 조조 3부위 종결 반영
const FB_EQUIP_MAP = {
    "가후": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" } },
    "곽가": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "사마의": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "공심", attr2: "방패병 배반, 공심 상승" } },
    "순욱": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "악진": { helmet: { name: "호분관", attr1: "피해 감소", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "기병 피해 감소" } },
    "전위": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "정욱": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 배반, 공심 상승" } },
    "조조(제왕)": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "피해 감소", attr2: "방패병 피해 감소" } },
    "조조": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "장료": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "기병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "기병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "강공, 기습 상승", attr2: "기병 배반, 공심 상승" } },
    "장합": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "피해 감소", attr2: "방패병 피해 감소" } },
    "하후돈": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "배반", attr2: "방패병 배반, 공심 상승" } },
    "하후연": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "기병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "기병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "강공, 기습 상승", attr2: "기병 배반, 공심 상승" } },
    "관우": { helmet: { name: "호분관", attr1: "강공, 기습 상승", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "무용 피해 가함", attr2: "창병 배반, 공심 상승" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 배반, 공심 상승" } },
    "강유": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 배반, 공심 상승" } },
    "마대": { helmet: { name: "호분관", attr1: "강공, 기습 상승", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "무용 피해 가함", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 배반, 공심 상승" } },
    "마초": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "창병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "연격률", attr2: "창병 배반, 공심 상승" } },
    "서서": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "창병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "창병 피해 감소" } },
    "사마가": { helmet: { name: "호분관", attr1: "강공, 기습 상승", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 피해 감소" } },
    "위연": { helmet: { name: "호분관", attr1: "피해 감소", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 피해 감소" } },
    "유비": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "유비(제왕)": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "장비": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "창병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "사남패", attr1: "피해 감소", attr2: "방패병 피해 감소" } },
    "제갈량": { helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "궁병 배반, 공심 상승" } },
    "조운": { helmet: { name: "호분관", attr1: "강공, 기습 상승", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "피해 감소", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 배반, 공심 상승" } },
    "황충": { helmet: { name: "호분관", attr1: "피해 감소", attr2: "궁병 피해 가함" }, armor: { name: "명광갑", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "궁병 배반, 공심 상승" } },
    "황월영": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "대교": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "노숙": { helmet: { name: "진현관", attr1: "치유 효과 부여", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "소교": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "손견": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "배반", attr2: "방패병 배반, 공심 상승" } },
    "손권": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "궁병 배반, 공심 상승" } },
    "손상향": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "궁병 피해 가함" }, armor: { name: "세린갑", attr1: "무용 피해 가함", attr2: "궁병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "강공, 기습 상승", attr2: "궁병 배반, 공심 상승" } },
    "손책": { helmet: { name: "호분관", attr1: "강공, 기습 상승", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "무용 피해 가함", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 배반, 공심 상승" } },
    "손권(제왕)": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "궁병 배반, 공심 상승" } },
    "여몽": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "모략 피해 가함", attr2: "방패병 피해 감소" } },
    "육손": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "창병 피해 가함" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "창병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "창병 배반, 공심 상승" } },
    "육항": { helmet: { name: "진현관", attr1: "치유 효과 부여", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "주유": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "궁병 배반, 공심 상승" } },
    "주태": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "정보": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "피해 감소", attr2: "방패병 피해 감소" } },
    "황개": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "배반", attr2: "방패병 피해 감소" } },
    "공손찬": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "궁병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "강공, 기습 상승", attr2: "궁병 배반, 공심 상승" } },
    "동탁": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "배반, 공심 상승", attr2: "방패병 피해 감소" } },
    "안량": { helmet: { name: "호분관", attr1: "강공, 기습 상승", attr2: "창병 피해 가함" }, armor: { name: "명광갑", attr1: "무용 피해 가함", attr2: "창병 피해 감소" }, accessory: { name: "치룡패", attr1: "무용 피해 가함", attr2: "창병 배반, 공심 상승" } },
    "여포": { helmet: { name: "백옥잠", attr1: "연격률", attr2: "궁병 피해 가함" }, armor: { name: "세린갑", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "쌍호뉴", attr1: "연격률", attr2: "궁병 배반, 공심 상승" } },
    "우길": { helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 치유 효과 상승" } },
    "원소": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "사남패", attr1: "배반, 공심 상승", attr2: "방패병 피해 감소" } },
    "장각": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "궁병 피해 가함" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "궁병 배반, 공심 상승" } },
    "장녕": { helmet: { name: "진현관", attr1: "배반, 공심 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 치유 효과 상승" } },
    "장보": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 피해 감소" } },
    "좌자": { helmet: { name: "진현관", attr1: "모략 피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "방패병 피해 감소" } },
    "채문희": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "초선": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } },
    "화타": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "궁병 치유 효과 상승" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "궁병 피해 감소" }, accessory: { name: "박산로", attr1: "치유 효과 부여", attr2: "궁병 피해 감소" } }
};

const STAT_KEY_RULES = [
    { k: 'damageTakenRed', words: ['피해 감소', '피감', '피해감소', '저항'] },
    { k: 'physicalDmg', words: ['무용 피해 가함', '무용피해가함', '무용 피해 상승', '무용피해상승'] },
    { k: 'strategyDmg', words: ['모략 피해 가함', '모략피해가함', '모략 피해 상승', '모략피해상승'] },
    { k: 'damageDealtInc', words: ['피해 가함', '피해가함', '피해 증가', '피증'] },
    { k: 'healGiven', words: ['치유', '회복', '보급'] },
    { k: 'leech', words: ['배반', '공심', '흡혈'] },
    { k: 'critRate', words: ['강공', '기습', '크리'] },
    { k: 'comboRate', words: ['연격'] },
    { k: 'activeRate', words: ['발동'] },
    { k: 'armorPen', words: ['파갑', '간파'] }
];

function aggregateIntegratedStats(deck, officerIndex) {
    const officer = deck.officers[officerIndex];
    if (!officer || !officer.name) return null;
    const hName = officer.name.trim();
    const stats = { damageTakenRed: 0, damageDealtInc: 0, strategyDmg: 0, physicalDmg: 0, healGiven: 0, leech: 0, comboRate: 0, activeRate: 0, armorPen: 0, critRate: 0 };
    
    const curNames = deck.officers.map(o => cStr(o?.name)).filter(Boolean);
    const matchMeta = getBestMetaMatch(curNames);
    const currentDeckUnit = (deck.unitType && deck.unitType !== "자동 판별") ? deck.unitType : (matchMeta?.bestMeta ? metaDeckUnitTypeMap[matchMeta.bestMeta.id] : "창병");

    function parseAndAdd(textObj) {
        if (!textObj) return;
        const text = (typeof textObj === 'string' ? textObj : textObj.toString()).replace(/\s+/g, ' ');
        const unitMatch = text.match(/(창병|궁병|방패병|기병)/);
        if (unitMatch && unitMatch[1] !== currentDeckUnit && currentDeckUnit !== "자동 판별") return;

        function extractVal(str) {
            const sanitized = str.replace(/\[.*?\]/g, '').replace(/\d+(?:\.\d+)?\s*%?\s*(?:의\s*)?확률/g, '').replace(/\d+\s*(?:턴|회|중첩|명|개|팀|강탈|소모|레벨|Lv)/g, '');
            const percMatch = sanitized.match(/([+-]?\d+(?:\.\d+)?)\s*%/);
            if (percMatch) return parseFloat(percMatch[1]);
            const numMatch = sanitized.match(/([+-]?\d+(?:\.\d+)?)/);
            return numMatch ? parseFloat(numMatch[1]) : 3.0;
        }

        const segments = /\d+%?,\s*\D+/.test(text) ? text.split(',') : [text];
        segments.forEach(seg => {
            const val = extractVal(seg);
            for (const rule of STAT_KEY_RULES) {
                if (rule.words.some(w => seg.includes(w))) {
                    stats[rule.k] += val;
                    break;
                }
            }
        });
    }

    const eq = getOfficerEquipment(hName, currentDeckUnit);
    if (eq) { ['helmet', 'armor', 'accessory'].forEach(part => { parseAndAdd(eq[part].attr1); parseAndAdd(eq[part].attr2); }); }

    internalBondRules.filter(r => curNames.filter(n => r.heroes.includes(cStr(n))).length >= r.req && new Set(curNames.filter(n => r.heroes.includes(cStr(n)))).size >= r.req)
        .forEach(bond => { if (bond.heroes.includes(hName)) parseAndAdd(bond.effect); });

    const hA = metaHawkRandomAttributesMap[matchMeta?.bestMeta?.id || "custom"];
    if (hA) { parseAndAdd(hA.attr1.rank1); parseAndAdd(hA.attr2.rank1); parseAndAdd(hA.attr3.rank1); }

    const dogamData = getOfficerDogamData(hName);
    [dogamData.uniqueTactic, ...(officer.chosenTactics || [])].filter(Boolean).forEach(tacName => {
        const tkMap = internalTacticStatMap[cStr(tacName)];
        if (tkMap) {
            Object.keys(tkMap).forEach(tk => {
                if (stats[tk] !== undefined) stats[tk] += tkMap[tk];
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

    const isLongBattle = (metaId.includes('shield') || metaId.includes('sima') || metaId.includes('dowon') || metaId.includes('gangyu') || metaId.includes('jangbo') || metaId.includes('jwaja') || metaId.includes('yubi') || metaId.includes('sogyo'));
    const isBurstDmg = (metaId.includes('assassin') || metaId.includes('macho') || metaId.includes('xushu') || metaId.includes('cavalry') || metaId.includes('whitehorse') || metaId.includes('gwanu') || metaId.includes('songwon'));

    if (totalDmgRed < 25) recLogs.push(`⚠️ <strong>[생존력 취약]</strong> 부대 총합 피해 감소(${totalDmgRed.toFixed(1)}%)가 25% 미만입니다. '동구적개', '횡징폭렴', '강유겸제' 등의 채용을 강력히 추천합니다.`);
    if (isBurstDmg && totalDmgInc < 30) recLogs.push(`⚠️ <strong>[결정력 부족]</strong> 암살/돌파 덱 메타임에도 피해 증가 스탯(${totalDmgInc.toFixed(1)}%)이 낮습니다. '사생취의', '일고작기', '체천행도', '승승장구' 등의 공격적 버프를 기용하십시오.`);
    if (isLongBattle && totalHeal < 15) recLogs.push(`⚠️ <strong>[유지력 경고]</strong> 장기전 메타 덱에서 회복/치유 보정(${totalHeal.toFixed(1)}%)이 부족합니다. '태청단경', '현호제세', '안영찰채', '홍수첨향' 등 유지력 전법을 보충하십시오.`);

    const allTacticsFilled = deck.officers.every(o => o.chosenTactics && o.chosenTactics.length === 2 && o.chosenTactics[0] && o.chosenTactics[1]);
    if (recLogs.length === 0 && allTacticsFilled) return `<div class="feedback-item success" style="border: 1px solid #4ade80; background: rgba(74, 222, 128, 0.1); padding: 8px; margin-top: 10px;">✨ <strong>[최종 검증 완료: Perfect Synergy]</strong> 전서버 랭커 상위 1% 공방 밸런스 및 종결 사양을 완전 달성한 세팅입니다. 실전에 즉시 투입하십시오.</div>`;
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
// LAYER 3: 조합 맞춤형 동적 대체 추천 및 도감 API 동적 바인딩 엔진
// ==========================================================================
function getOwnedAlternativeOfficer(missingName, curNames, heroDataMap, deckUnitType = "") {
    const cleanMissing = cStr(missingName);
    const missingInfo = getOfficerDogamData(missingName);
    const missingFaction = missingInfo.faction || "";
    const missingUnits = (missingInfo.unitSuitability || "").split("/");
    const missingStats = missingInfo.stats || { martial: 500, tactical: 500, command: 500 };

    const curFactions = curNames.map(n => getOfficerDogamData(n).faction).filter(Boolean);
    const majorFaction = curFactions.length > 0 ? curFactions[0] : missingFaction;

    const allNames = getOfficerNamesBridge();
    let candidates = [];

    Object.keys(heroDataMap).forEach(cleanCand => {
        if (!heroDataMap[cleanCand]?.isOwned || curNames.some(cn => cStr(cn) === cleanCand) || cleanCand === cleanMissing) return;
        const originName = allNames.find(n => cStr(n) === cleanCand) || cleanCand;
        const candInfo = getOfficerDogamData(originName);
        const candStats = candInfo.stats || { martial: 500, tactical: 500, command: 500 };
        const faction = candInfo.faction || "";
        const units = (candInfo.unitSuitability || "").split("/");

        let score = 0;
        if (faction === majorFaction || faction === missingFaction) score += 40;
        if (deckUnitType && deckUnitType !== "자동 판별" && units.includes(deckUnitType)) score += 35;
        else if (missingUnits.some(u => units.includes(u))) score += 20;

        const missingPrimary = missingStats.martial > missingStats.tactical ? 'martial' : 'tactical';
        const candPrimary = candStats.martial > candStats.tactical ? 'martial' : 'tactical';
        if (missingPrimary === candPrimary && Math.abs(missingStats[missingPrimary] - candStats[candPrimary]) < 150) score += 30;
        if (candStats.command > 580 && missingStats.command > 580) score += 20;

        if (score > 0) candidates.push({ name: originName, score: score });
    });

    candidates.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'ko'));
    return candidates.length > 0 ? candidates[0].name : null;
}

function getOwnedAlternativeTactic(missingTacName, allEquipTacs, tacticDataMap, recommendedTacs = new Set(), officerName = "", deckUnitType = "") {
    const cleanMissing = cStr(missingTacName);
    const alts = tacticAlternativesMap[missingTacName] || [];
    for (let t of alts) {
        const cleanT = cStr(t);
        if (tacticDataMap[cleanT]?.isOwned && !allEquipTacs.includes(t) && !recommendedTacs.has(t)) {
            recommendedTacs.add(t);
            return t;
        }
    }

    const offInfo = getOfficerDogamData(officerName);
    const stats = offInfo?.stats || { martial: 500, tactical: 500, command: 500, speed: 400 };
    
    const isPhysCarry = stats.martial >= stats.tactical && stats.martial > 520;
    const isStratCarry = stats.tactical > stats.martial && stats.tactical > 520;
    const isSupport = stats.command > 560 || (offInfo?.role && (offInfo.role.includes("지휘") || offInfo.role.includes("보조")));

    const allTacs = getTacticListBridge();
    let bestCandidate = null, maxScore = -1;

    for (let cleanTName of Object.keys(tacticDataMap)) {
        if (!tacticDataMap[cleanTName]?.isOwned || allEquipTacs.some(et => cStr(et) === cleanTName) || recommendedTacs.has(cleanTName) || cleanTName === cleanMissing) continue;
        
        const originTName = allTacs.find(n => cStr(n) === cleanTName) || cleanTName;
        const candStats = internalTacticStatMap[originTName] || {};
        const candDogam = window.getTacticDataFromDogam ? window.getTacticDataFromDogam(originTName) : null;
        const desc = candDogam?.desc || "";

        let score = 0;
        const candKeys = Object.keys(candStats);

        if (isPhysCarry) {
            if (candKeys.some(k => ['physicalDmg', 'comboRate', 'armorPen', 'damageDealtInc'].includes(k))) score += 50;
            if (desc.includes("무용 피해") || desc.includes("일반 공격") || desc.includes("연격")) score += 30;
        } else if (isStratCarry) {
            if (candKeys.some(k => ['strategyDmg', 'activeRate', 'damageDealtInc'].includes(k))) score += 50;
            if (desc.includes("모략 피해") || desc.includes("신산") || desc.includes("화상") || desc.includes("수공")) score += 30;
        } else if (isSupport) {
            if (candKeys.some(k => ['damageTakenRed', 'healGiven', 'leech', 'counterDmg'].includes(k))) score += 50;
            if (desc.includes("피해 감소") || desc.includes("병력 회복") || desc.includes("치유") || desc.includes("저항")) score += 30;
        } else {
            if (candKeys.length > 0) score += 30;
        }

        if (isPhysCarry && desc.includes("무용의 영향")) score += 25;
        if (isStratCarry && desc.includes("모략의 영향")) score += 25;
        if (isSupport && desc.includes("통솔의 영향")) score += 25;
        if (deckUnitType && deckUnitType !== "자동 판별" && desc.includes(deckUnitType)) score += 20;

        if (score > maxScore && score > 0) {
            maxScore = score;
            bestCandidate = originTName;
        }
    }

    if (bestCandidate) {
        recommendedTacs.add(bestCandidate);
        return bestCandidate;
    }
    return null;
}

function getBestMetaMatch(curNamesClean) {
    if (!curNamesClean || !curNamesClean.length) return null;
    let bestMeta = analyzedMetaArchetypes[0], maxScore = -1;
    analyzedMetaArchetypes.forEach(meta => {
        let score = meta.officers.reduce((acc, mo, idx) => acc + (curNamesClean.includes(cStr(mo.name)) ? 1 : 0) + (curNamesClean[idx] === cStr(mo.name) ? 0.5 : 0), 0);
        if (score > maxScore) { maxScore = score; bestMeta = meta; }
    });
    return { bestMeta, maxScore };
}

function calculateStrictDeckScore(deck) {
    const curNamesClean = deck?.officers?.map(o => cStr(o?.name)).filter(Boolean) || [];
    const match = getBestMetaMatch(curNamesClean);
    if (!match || match.maxScore === 0) return 0;
    
    let score = 100;
    const curFmt = cStr(deck.formation), idealFmt = cStr(match.bestMeta.formation);
    if (curFmt !== idealFmt) score -= 10;

    match.bestMeta.officers.forEach((metaOff, metaIdx) => {
        const mName = cStr(metaOff.name);
        const userOffIdx = curNamesClean.indexOf(mName);
        if (userOffIdx === -1) score -= 30;
        else {
            if ((FORMATIONS[deck.formation]?.pos[userOffIdx] || "front") !== (FORMATIONS[match.bestMeta.formation]?.pos[metaIdx] || "front")) score -= 10;
            const userOff = deck.officers[userOffIdx];
            const metaTacs = metaOff.chosenTactics.length === 3 ? metaOff.chosenTactics.slice(1,3) : metaOff.chosenTactics;
            let unmatchTac = metaTacs.map(t => cStr(t)), emptyOrWrong = 0, altCount = 0;
            
            (Array.isArray(userOff.chosenTactics) ? userOff.chosenTactics : ["",""]).forEach(tac => {
                const idx = unmatchTac.indexOf(cStr(tac));
                if (idx !== -1) unmatchTac.splice(idx, 1);
            });

            (Array.isArray(userOff.chosenTactics) ? userOff.chosenTactics : ["",""]).forEach(tac => {
                const cT = cStr(tac);
                if (cT !== "" && !metaTacs.map(t=>cStr(t)).includes(cT)) {
                    if (unmatchTac.some((pT, i) => tacticAlternativesMap[pT]?.includes(cT) && unmatchTac.splice(i, 1))) altCount++; else emptyOrWrong++;
                } else if (cT === "") emptyOrWrong++;
            });
            score -= (altCount * 2 + emptyOrWrong * 5);
        }
    });
    return Math.max(score, 0);
}

function generateStructuredFeedback(deck, heroDataMap, tacticDataMap, higherTierUsedTacs = []) {
    const fb = { insight: "", logs: [] };
    const curNames = deck?.officers?.map(o => cStr(o?.name)).filter(Boolean) || [];
    const match = getBestMetaMatch(curNames);

    if (!match || match.maxScore === 0) {
        if(curNames.length) fb.logs.push({ type: 'info', text: `💡 <strong>[커스텀 덱]</strong> 코어 장수를 기반으로 재설계해 보십시오.` });
        deck?.officers?.forEach((off, idx) => {
            const hName = off?.name?.toString().trim() || "", cleanH = cStr(hName);
            if (hName && !heroDataMap[cleanH]?.isOwned) fb.logs.push({ type: 'warning', text: `자원 부족: [${hName}] 미보유` });
            off?.chosenTactics?.forEach((t, i) => { 
                const cleanT = cStr(t);
                if(t && !tacticDataMap[cleanT]?.isOwned) fb.logs.push({ type:'warning', text:`전법 누락: ${i+2}번 슬롯 [${t}] 미보유` }); 
            });
        });
        return fb;
    }

    const { bestMeta: meta } = match;
    fb.logs.push({ type: 'info', text: `🎯 <strong>[${meta.name}]</strong> 기반 처방입니다.` });
    if (systemGuideInsights[meta.id]) fb.insight = systemGuideInsights[meta.id];

    const curFmt = cStr(deck.formation);
    if (curFmt !== cStr(meta.formation)) fb.logs.push({ type: 'warning', text: `진형 교정: [${deck.formation}] ➔ <strong>[${meta.formation}]</strong>` });

    const allEquipTacs = deck.officers.flatMap(o => o?.chosenTactics?.map(t => cStr(t))).filter(Boolean);
    const forbiddenTacs = [...new Set([...allEquipTacs, ...higherTierUsedTacs.map(t => cStr(t))])];
    let missingMeta = meta.officers.filter(mo => !curNames.includes(cStr(mo.name)));
    const recommendedTacs = new Set();

    deck.officers.forEach((off, offIdx) => {
        const hName = off?.name?.toString().trim() || "", cleanHName = cStr(hName);
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

        const metaIdx = meta.officers.findIndex(mo => cStr(mo.name) === cleanHName);
        if (metaIdx !== -1) {
            if ((FORMATIONS[deck.formation]?.pos[offIdx] || "front") !== (FORMATIONS[meta.formation]?.pos[metaIdx] || "front")) fb.logs.push({ type: 'warning', text: `배치 오류: [${hName}] 위치 교정 요망` });
            
            const mTacs = meta.officers[metaIdx].chosenTactics;
            const targetMetaTacs = mTacs.length === 3 ? mTacs.slice(1, 3) : mTacs;
            let unmatchTac = targetMetaTacs.map(t => cStr(t)).filter(t => !allEquipTacs.includes(t));
            
            (off.chosenTactics || []).forEach((t, i) => {
                const cT = cStr(t);
                const slotNum = i + 2;

                if (!cT) {
                    if (unmatchTac.length > 0) {
                        const pTac = unmatchTac.shift();
                        const isHigherUsed = higherTierUsedTacs.includes(cStr(pTac));
                        const ownedAltTac = getOwnedAlternativeTactic(pTac, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType);
                        
                        if (isHigherUsed) {
                            const altsText = ownedAltTac ? `<span style="color:#38bdf8; font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#ef4444;">[사용 가능한 대체 전법 없음]</span>`;
                            fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백: <span style="color:#f87171; text-decoration:line-through;">[${pTac}]</span>(상위 부대 사용) ➔ 1순위 대체 추천: ${altsText}` });
                        } else {
                            const altsText = ownedAltTac ? `<span style="color:#38bdf8; font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#ef4444;">[보유 대체재 없음]</span>`;
                            fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백 ➔ 1순위: [${pTac}] (대체 ${altsText})` });
                        }
                    }
                } else {
                    const isMeta = targetMetaTacs.map(x => cStr(x)).includes(cT);
                    const isAlt = targetMetaTacs.some(mTac => (tacticAlternativesMap[mTac] || []).map(x => cStr(x)).includes(cT));

                    if (!isMeta && !isAlt) {
                        const pTac = unmatchTac.length > 0 ? unmatchTac.shift() : targetMetaTacs[i] || "정석 전법";
                        const isHigherUsed = higherTierUsedTacs.includes(cStr(pTac));
                        const ownedAltTac = getOwnedAlternativeTactic(pTac, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType);
                        
                        if (isHigherUsed) {
                            const altsText = ownedAltTac ? `<span style="color:#38bdf8; font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#ef4444;">[사용 가능한 대체 전법 없음]</span>`;
                            fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 오배치: <span style="color:#f87171; text-decoration:line-through;">[${t}]</span> ➔ 권장: <span style="color:#f87171; text-decoration:line-through;">[${pTac}]</span>(상위 부대 사용) ➔ 1순위 대체 추천: ${altsText}` });
                        } else {
                            const altsText = ownedAltTac ? `<span style="color:#38bdf8; font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#ef4444;">[보유 대체재 없음]</span>`;
                            fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 오배치: <span style="color:#f87171; text-decoration:line-through;">[${t}]</span> (역시너지) ➔ 권장: [${pTac}] (또는 대체 ${altsText})` });
                        }
                    } else {
                        if (!tacticDataMap[cT]?.isOwned) {
                            const ownedAltTac = getOwnedAlternativeTactic(cT, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType);
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
    const matched = internalBondRules.filter(r => curNames.filter(n => r.heroes.includes(cStr(n))).length >= r.req && new Set(curNames.filter(n => r.heroes.includes(cStr(n)))).size >= r.req);
    return matched.length ? matched.map(r => `<strong>[${r.name}]</strong> ${r.effect}`).join(" / ") : "활성화 효과 없음";
}

// ==========================================================================
// LAYER 4: UI 파이프라인 및 모달 컨트롤
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
    
    const cleanName = cStr(tacticName);
    let pDesc = "상세 데이터 미등록 (도감 연동 필요)", pRole = "-", pTarget = "-";

    let tData = FB_TACTIC_DESC_MAP[cleanName];
    if (!tData && window.getTacticDataFromDogam) {
        tData = window.getTacticDataFromDogam(tacticName);
    }
    if (!tData && window.getAllOfficerNamesFromDogam && window.getOfficerDataFromDogam) {
        const allOfficers = window.getAllOfficerNamesFromDogam();
        for (let offName of allOfficers) {
            const offData = window.getOfficerDataFromDogam(offName);
            if (cStr(offData?.uniqueTactic) === cleanName) {
                tData = { 
                    role: offData.role || "고유 전법", 
                    target: offData.location ? `배치: ${offData.location}` : "전투 명세 참조", 
                    desc: offData.skillDesc || `[${offName}] 무장의 고유 전법입니다. (상세 도감 연동 필요)` 
                };
                break;
            }
        }
    }

    if (tData) {
        pRole = tData.role || tData.type || "-";
        pTarget = tData.target || "-";
        pDesc = tData.desc || tData.skillDesc || pDesc;
    } else if (internalTacticStatMap[cleanName]) {
        const st = internalTacticStatMap[cleanName];
        let summary = [];
        if (st.damageTakenRed) summary.push(`피해 감소 +${st.damageTakenRed}%`);
        if (st.damageDealtInc) summary.push(`피해 증가 +${st.damageDealtInc}%`);
        if (st.healGiven) summary.push(`치유 효과 +${st.healGiven}%`);
        if (st.physicalDmg) summary.push(`무용 피해 +${st.physicalDmg}%`);
        if (st.strategyDmg) summary.push(`모략 피해 +${st.strategyDmg}%`);
        pRole = "전술 기믹";
        pTarget = "부대 적용";
        pDesc = `추정 효과: [ ${summary.join(', ')} ] 보정이 적용되는 전투 전법입니다.`;
    }

    openModalPopup(e, `⭐ ${tacticName}`, `타입: ${pRole} | 대상: ${pTarget}`, pDesc);
};

window.showEquipPopup = function(e, attr1, attr2) {
    const getDesc = attr => window.getEquipDescFromGuide ? window.getEquipDescFromGuide(attr) : "상세 데이터 미등록 (가이드 연동 필요)";
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

// [복구 완료] 1~10위 실전 프리셋 및 초기화 로직
const analyzedMetaArchetypes = [
    {id:"wei_sima_sp_jojo",name:"[위나라] 사마의·조조·가후 종결 방패 덱",concept:"[실전 랭킹] 사마의·가후 혼란 방패",formation:"추형진",officers:[{name:"사마의",chosenTactics:["응시낭고","반객위주","요사여신"]},{name:"조조",chosenTactics:["효웅","간담상조","안영찰채"]},{name:"가후",chosenTactics:["경달권변","혼수모어","전위위안"]}]},
    {id:"wei_assassin_sp",name:"[위나라] 악진·조조·장료 기형 신속 덱",concept:"[실전 랭킹] 장료·악진 기형창",formation:"기형진",officers:[{name:"악진",chosenTactics:["분용당선","강유겸제","진퇴유도"]},{name:"조조",chosenTactics:["효웅","혼수모어","간담상조"]},{name:"장료",chosenTactics:["함진살적","질풍노도","반객위주"]}]},
    {id:"shu_macho_weiyeon_xushu",name:"[촉나라] 위연·마초·서서 구행 폭딜 창병 덱",concept:"[실전 랭킹] 마초·위연·서서 안행/구행창",formation:"구행진",officers:[{name:"위연",chosenTactics:["실병제위","홍수첨향","이퇴위진"]},{name:"마초",chosenTactics:["출수법","용맹무쌍","질풍노도"]},{name:"서서",chosenTactics:["절절학문","문치무공","전위위안"]}]},
    {id:"qun_jwaja_jangnyeong_ugil",name:"[군진영] 좌자·장녕·우길 구행 삼도사 덱",concept:"[실전 랭킹] 좌자·장녕·우길 모략궁",formation:"구행진",officers:[{name:"좌자",chosenTactics:["화겁생기","강유겸제","유좌유용"]},{name:"장녕",chosenTactics:["천의난위","양의화생","수상개화"]},{name:"우길",chosenTactics:["태평경","진퇴유도","기문둔갑"]}]},
    {id:"wu_sogyo_nosuk_yukson",name:"[오나라] 소교·노숙·육손 방원 모략 덱",concept:"[실전 랭킹] 소교·노숙·육손 방원기/궁",formation:"방원진",officers:[{name:"소교",chosenTactics:["화용욕모","진퇴유도","간담상조"]},{name:"노숙",chosenTactics:["탑상책","견진연봉","위위구조"]},{name:"육손",chosenTactics:["지변규려","천리추격","체천행도"]}]},
    {id:"shu_sp_yubi_jangbi_gangyu",name:"[촉나라] 제왕유비·장비·강유 추형 덱",concept:"[실전 랭킹] 제왕유비·장비·강유 추형방패",formation:"추형진",officers:[{name:"유비(제왕)",chosenTactics:["재주복주","여자동포","안영찰채"]},{name:"장비",chosenTactics:["연인노호","진퇴유도","선등함진"]},{name:"강유",chosenTactics:["담대여두","천리추격","일고작기"]}]},
    {id:"shu_gwanu_hwangchung_yubi",name:"[촉나라] 관우·황충·유비 안행 기병 덱",concept:"[실전 랭킹] 관우·황충·유비 안행기병",formation:"안행진",officers:[{name:"관우",chosenTactics:["무성","승승장구","질풍노도"]},{name:"황충",chosenTactics:["적혈도","횡징폭렴","강유겸제"]},{name:"유비",chosenTactics:["인정","혼수모어","홍수첨향"]}]},
    {id:"wu_songwon_yukhang_nosuk",name:"[오나라] 손권·육항·노숙 구행 궁병 덱",concept:"[실전 랭킹] 손권·육항·노숙 구행궁",formation:"구행진",officers:[{name:"손권",chosenTactics:["웅거","기문둔갑","간담상조"]},{name:"육항",chosenTactics:["청백충근","수상개화","요사여신"]},{name:"노숙",chosenTactics:["탑상책","분성지계","여자동포"]}]},
    {id:"qun_wonso_dongtak_yeopo",name:"[군진영] 원소·동탁·여포 방원 기병 덱",concept:"[실전 랭킹] 원소·동탁·여포 방원기병",formation:"방원진",officers:[{name:"원소",chosenTactics:["사소도","견진연봉","위위구조"]},{name:"동탁",chosenTactics:["전권난정","혼수모어","강유겸제"]},{name:"여포",chosenTactics:["천하무쌍","용왕직전","만부막적"]}]}
];

const metaDeckUnitTypeMap = {
    "wei_sima_sp_jojo":"방패병", "wei_assassin_sp":"창병", "shu_macho_weiyeon_xushu":"창병",
    "qun_jwaja_jangnyeong_ugil":"궁병", "wu_sogyo_nosuk_yukson":"방패병", "shu_sp_yubi_jangbi_gangyu":"방패병",
    "shu_gwanu_hwangchung_yubi":"기병", "wu_songwon_yukhang_nosuk":"궁병", "qun_wonso_dongtak_yeopo":"기병"
};

const defaultPresetDecks = analyzedMetaArchetypes.map((d, i) => ({ ...d, title: `${i + 1}군`, unitType: "", officers: d.officers.map(o => ({ name: o.name, chosenTactics: o.chosenTactics.length === 3 ? o.chosenTactics.slice(1, 3) : [...o.chosenTactics] })) }));

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
    const targetDeck = dynamicPresetDecks.find(x => x.originIdx === oIdx);
    const match = getBestMetaMatch(targetDeck?.officers?.map(o=>o?.name?.replace(/\s+/g,'')).filter(Boolean));
    if (!match || match.maxScore === 0) return alert("[교정 실패] 코어 장수가 없습니다.");
    
    const higherTacs = new Set();
    dynamicPresetDecks.sort((a,b) => (a.originIdx||0) - (b.originIdx||0)).forEach(d => {
        if (d.originIdx < oIdx) {
            d.officers.forEach(o => (o?.chosenTactics||[]).forEach(t => { if(t) higherTacs.add(cStr(t)); }));
        }
    });

    targetDeck.formation = match.bestMeta.formation; 
    targetDeck.unitType = metaDeckUnitTypeMap[match.bestMeta.id] || "";
    
    const saved = JSON.parse(localStorage.getItem('samguk_hobby_data') || '{}');
    const tMap = {};
    saved.tactics?.forEach(x => { if(x && x.name) tMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });

    targetDeck.officers = match.bestMeta.officers.map(m => {
        const idealTacs = m.chosenTactics.length === 3 ? m.chosenTactics.slice(1,3) : [...m.chosenTactics];
        const fixedTacs = idealTacs.map(tac => {
            const cTac = cStr(tac);
            if (higherTacs.has(cTac)) {
                const alt = getOwnedAlternativeTactic(tac, Array.from(higherTacs), tMap, new Set(), m.name, targetDeck.unitType);
                if (alt) {
                    higherTacs.add(cStr(alt));
                    return alt;
                }
                return "";
            }
            higherTacs.add(cTac);
            return tac;
        });
        return { name: m.name, chosenTactics: fixedTacs };
    });
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); 
    renderDeckBuilder(); 
    alert(`[AI 교정 성공] ${match.bestMeta.name} (상위 부대 사용 전법 자동 배제 완료)`);
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

        let accumulatedHigherTacs = new Set();
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

            const fb = generateStructuredFeedback(deck, hMap, tMap, Array.from(accumulatedHigherTacs)), score = calculateStrictDeckScore(deck);
            let fbH = fb.logs.map(l=>`<div class="feedback-item ${l.type}">${l.text}</div>`).join('') + (fb.insight?`<div class="feedback-item info">${fb.insight}</div>`:'');
            fbH += evaluateDeckPerfection(deck, match?.bestMeta?.id || "custom");

            deck.officers.forEach(o => (o?.chosenTactics || []).forEach(t => { if (t && cStr(t)) accumulatedHigherTacs.add(cStr(t)); }));

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

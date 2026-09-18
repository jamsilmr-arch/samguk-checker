// [시스템 분석] deck_core.js - 초경량 크로스 브릿지 엔진 (신무장 견희 / 신전법 2종 / 절품 장비 / 신규 매 '창림' 알고리즘 전면 최신화 완료)
console.log("[시스템 분석] deck_core.js 무결성 엔진 기동");

var cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

var FB_OFF_META = {
    "견희":["신복옥의","창병/기병","wei","SH"],
    "가후":["경달권변","궁병/방패병","wei","SS"], "곽가":["산무유책","궁병/방패병","wei","SH"], "사마의":["응시낭고","방패병/궁병","wei","SC"], "순욱":["거중지중","궁병/창병","wei","SH"], "악진":["분용당선","창병/궁병","wei","PC"], "전위":["축호과간","창병/방패병","wei","TC"], "정욱":["십면매복","방패병/궁병","wei","SC"], "조조(제왕)":["군령여산","창병/방패병","wei","TC"], "조조":["효웅","방패병/기병","wei","TC"], "장료":["함진살적","창병/기병","wei","PCm"], "장합":["교변병기","방패병/창병","wei","TC"], "하후돈":["발시담정","창병/방패병","wei","TC"], "하후연":["충용","창병/기병","wei","PCm"], "허저":["호치","창병/궁병","wei","TC"],
    "관우":["무성","창병/기병","shu","PC"], "강유":["담대여두","방패병/기병","shu","SC"], "마대":["습참","창병/방패병","shu","PC"], "마초":["출수법","창병/기병","shu","PCm"], "법정":["애자필보","방패병/궁병","shu","SS"], "서서":["절절학문","창병/궁병","shu","SS"], "사마가":["만왕","창병/방패병","shu","PC"], "위연":["실병제위","창병/궁병","shu","PC"], "유비":["인정","창병/기병","shu","SH"], "유비(제왕)":["재주복주","창병/방패병","shu","SH"], "장비":["연인노호","창병/방패병","shu","TC"], "제갈량":["초선차전","궁병/방패병","shu","SH"], "조운":["칠진칠출","창병/방패병","shu","PC"], "황충":["적혈도","창병/방패병","shu","PC"], "황월영":["묘산천기","궁병/방패병","shu","SH"],
    "대교":["정수유심","창병/궁병","wu","SH"], "노숙":["탑상책","궁병/기병","wu","SH"], "소교":["화용욕모","궁병/기병","wu","SH"], "손견":["강동맹호","창병/방패병","wu","TC"], "손권":["웅거","궁병/기병","wu","TC"], "손상향":["효희","궁병/기병","wu","PCm"], "손책":["강동패주","창병/방패병","wu","PC"], "손권(제왕)":["겸권상계","창병/궁병","wu","SS"], "여몽":["백의도강","방패병/궁병","wu","SS"], "육손":["지변규려","창병/기병","wu","SC"], "육항":["청백충근","창병/궁병","wu","SC"], "주유":["봉화연천","창병/궁병","wu","SC"], "주태":["청라산개","기병/방패병","wu","TC"], "정보":["칠척사모","기병/방패병","wu","TC"], "황개":["요원지화","방패병/궁병","wu","TC"],
    "공손찬":["위진새북","기병/창병","qun","PCm"], "동탁":["전권난정","방패병/기병","qun","TC"], "안량":["효장","창병/기병","qun","PC"], "여포":["천하무쌍","궁병/기병","qun","PCm"], "우길":["태평경","창병/궁병","qun","SS"], "원소":["사소도","방패병/기병","qun","TC"], "장각":["황천당립","궁병/기병","qun","SC"], "장녕":["천의난위","궁병/방패병","qun","SS"], "장보":["요풍사기","궁병/방패병","qun","SS"], "좌자":["화겁생기","궁병/방패병","qun","SH"], "채문희":["비분시","궁병/기병","qun","SH"], "초선":["폐월","창병/기병","qun","SH"], "화타":["청낭제세","궁병/방패병","qun","SH"], "황보숭":["강직불아","궁병/창병","qun","TC"]
};
var FB_OFFICERS = Object.keys(FB_OFF_META);

var FB_TACTICS = "가정지전,간담상조,강유겸제,견불가최,견진연봉,격안관화,공기불비,과하탁교,교취호탈,극적제승,금낭묘계,금적금왕,금창신,금철교명,기문둔갑,낙정하석,동구적개,동장철벽,동촉기선,만부막적,만전제발,만천과해,명찰추호,문치무공,미우주무,반객위주,병량촌단,부동여산,불노자위,분성지계,비사주석,사면초가,사생취의,선등함진,수상개화,순수견양,승승장구,심구고루,심모원려,안영찰채,암전난방,양의화생,양초선행,여자동포,요사여신,용맹무쌍,용왕직전,운주유악,원성재도,위위구조,유비무환,유좌유용,이간계,이아환아,이일대로,이퇴위진,일고작기,인세이도,전위위안,제곤부위,중정기고,지인선임,진퇴유도,진화타겁,질풍노도,천리추격,천시지리,체천행도,축세대발,태청단경,토적격문,포전인옥,현호제세,호령삼군,혼수모어,홍수첨향,화소적벽,후적박발,횡소천군,횡징폭렴,휴양생식".split(',');

var ABSOLUTE_ENDGAME_DECKS = [
    { id: "new_meta_wei_spear", priority: 10001, name: "[신규 0티어] 허저·견희·조조(제왕) 창병", concept: "[허저+견희 물리 폭딜]", formation: "방원진", officers: [ {name:"허저", chosenTactics:["호치", "부동여산", "만부막적"]}, {name:"견희", chosenTactics:["신복옥의", "유비무환", "포전인옥"]}, {name:"조조(제왕)", chosenTactics:["군령여산", "불노자위", "진퇴유도"]} ] },
    
    { id: "rank1_wu_yukson", priority: 10000, name: "[천공 1위] 소교·육손·노숙 구행 기병", concept: "[최신 천공 1위]", formation: "구행진", officers: [ {name:"소교", chosenTactics:["화용욕모", "진퇴유도", "간담상조"]}, {name:"육손", chosenTactics:["지변규려", "천리추격", "체천행도"]}, {name:"노숙", chosenTactics:["탑상책", "격안관화", "분성지계"]} ] },
    { id: "rank1_gun_jangnyeong", priority: 10000, name: "[천공 1위] 원소·장녕·좌자 구행 방패", concept: "[최신 천공 1위]", formation: "구행진", officers: [ {name:"원소", chosenTactics:["사소도", "강유겸제", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "수상개화"]}, {name:"좌자", chosenTactics:["화겁생기", "심구고루", "유비무환"]} ] },
    { id: "rank1_wei_heojeo", priority: 10000, name: "[천공 1위] 허저·가후·악진 호도 궁병", concept: "[최신 천공 1위]", formation: "호도진", officers: [ {name:"허저", chosenTactics:["호치", "부동여산", "반객위주"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "유좌유용"]}, {name:"악진", chosenTactics:["분용당선", "기문둔갑", "횡징폭렴"]} ] },
    
    { id: "rank3_shu_seo", priority: 9998, name: "[천공 3위] 서서·마초·위연 구행 창병", concept: "[최신 천공 3위]", formation: "구행진", officers: [ {name:"서서", chosenTactics:["절절학문", "전위위안", "심구고루"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "질풍노도"]}, {name:"위연", chosenTactics:["실병제위", "문치무공", "진퇴유도"]} ] },
    { id: "rank3_wu_yukhang", priority: 9998, name: "[천공 3위] 육항·손권·노숙 안행 궁병", concept: "[최신 천공 3위]", formation: "안행진", officers: [ {name:"육항", chosenTactics:["청백충근", "요사여신", "양의화생"]}, {name:"손권", chosenTactics:["웅거", "안영찰채", "여자동포"]}, {name:"노숙", chosenTactics:["탑상책", "분성지계", "만천과해"]} ] },
    { id: "rank3_wei_sima", priority: 9998, name: "[천공 3위] 조조·사마의·가후 구행 방패", concept: "[3군 타협의 현실]", formation: "구행진", officers: [ {name:"조조", chosenTactics:["효웅", "유좌유용", "간담상조"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "반객위주"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "유비무환"]} ] },

    { id: "absolute_beopjeong", priority: 9999, name: "[절대 종결] 유비·법정·강유 추형 방패", concept: "[0티어 정답지]", formation: "추형진", officers: [ {name:"유비(제왕)", chosenTactics:["재주복주", "안영찰채", "격안관화"]}, {name:"법정", chosenTactics:["애자필보", "심구고루", "유비무환"]}, {name:"강유", chosenTactics:["담대여두", "천리추격", "체천행도"]} ] },
    { id: "absolute_sima", priority: 9999, name: "[절대 종결] 사마의 추형 방패", concept: "[0티어 정답지]", formation: "추형진", officers: [ {name:"사마의", chosenTactics:["응시낭고", "후적박발", "반객위주"]}, {name:"조조", chosenTactics:["효웅", "불노자위", "진퇴유도"]}, {name:"가후", chosenTactics:["경달권변", "유비무환", "혼수모어"]} ] }
];

var EQ_PRESETS = {
    PC:  ["호분관","강공, 기습 상승","창병 피해 가함","용맹","명광갑","무용 피해 가함","창병 배반, 공심 상승","금왕","치룡패","무용 피해 가함","창병 배반, 공심 상승","양렬"],
    PCm: ["백옥잠","연격률","창병 피해 가함","신속","세린갑","무용 피해 가함","창병 배반, 공심 상승","치밀","쌍호뉴","연격률","창병 배반, 공심 상승","포위"],
    SC:  ["진현관","강공, 기습 상승","창병 피해 가함","기책","명재복","모략 피해 가함","창병 배반, 공심 상승","치밀","박산로","공심","창병 배반, 공심 상승","모산"],
    TC:  ["연함규","피해 감소","창병 치유 효과 상승","권어","청등갑","피해 감소","창병 피해 감소","무환","사남패","피해 감소","창병 배반, 공심 상승","천우"],
    SH:  ["연함규","피해 감소","치유 효과 부여","원촉","청등갑","피해 감소","창병 치유 효과 상승","지원","사남패","치유 효과 받음","창병 피해 감소","감림"],
    SS:  ["진현관","피해 감소","방패병 피해 감소","신속","명재복","피해 감소","방패병 치유 효과 상승","천안","박산로","피해 감소","방패병 피해 감소","천우"]
};

var FB_EQUIP_OVERRIDES = {
    "견희": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "창병 치유 효과 상승", attr3: "원촉" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "창병 피해 감소", attr3: "비호" }, accessory: { name: "사남패", attr1: "치유 효과 부여", attr2: "창병 피해 감소", attr3: "감림" } },
    "법정": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "방패병 피해 감소", attr3: "신속" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 치유 효과 상승", attr3: "천안" }, accessory: { name: "박산로", attr1: "치유 효과 받음", attr2: "방패병 피해 감소", attr3: "천우" } },
    "강유": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함", attr3: "겸비" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "방패병 피해 감소", attr3: "치밀" }, accessory: { name: "박산로", attr1: "배반, 공심 상승", attr2: "방패병 배반, 공심 상승", attr3: "고무" } },
    "유비(제왕)": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승", attr3: "원촉" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승", attr3: "비호" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소", attr3: "감림" } },
    "사마의": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함", attr3: "기책" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "방패병 피해 감소", attr3: "치밀" }, accessory: { name: "박산로", attr1: "공심", attr2: "방패병 배반, 공심 상승", attr3: "응변" } },
    "조조": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승", attr3: "권어" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승", attr3: "무환" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소", attr3: "천우" } },
    "가후": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "방패병 피해 가함", attr3: "신속" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소", attr3: "천안" }, accessory: { name: "박산로", attr1: "피해 감소", attr2: "방패병 치유 효과 상승", attr3: "영전" } },
    "손권": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "궁병 치유 효과 상승", attr3: "권어" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "궁병 피해 감소", attr3: "무환" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "궁병 피해 감소", attr3: "천우" } },
    "육항": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "궁병 피해 가함", attr3: "기책" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "궁병 피해 감소", attr3: "치밀" }, accessory: { name: "박산로", attr1: "공심", attr2: "궁병 배반, 공심 상승", attr3: "응변" } }
};

var FB_EQUIP_MAP = new Proxy({}, {
    get: (_, name) => {
        if (FB_EQUIP_OVERRIDES[name]) return FB_EQUIP_OVERRIDES[name];
        const meta = FB_OFF_META[name] || ["","방패병","qun","PC"];
        const p = EQ_PRESETS[meta[3] || "PC"], u = meta[1].split('/')[0];
        return {
            helmet: { name: p[0], attr1: p[1].replace(/(창병|기병|궁병|방패병)/g, u), attr2: p[2].replace(/(창병|기병|궁병|방패병)/g, u), attr3: p[3] },
            armor:  { name: p[4], attr1: p[5].replace(/(창병|기병|궁병|방패병)/g, u), attr2: p[6].replace(/(창병|기병|궁병|방패병)/g, u), attr3: p[7] },
            accessory: { name: p[8], attr1: p[9].replace(/(창병|기병|궁병|방패병)/g, u), attr2: p[10].replace(/(창병|기병|궁병|방패병)/g, u), attr3: p[11] }
        };
    }
});

var STAT_KEY_RULES = [
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

var internalBondRules = [
    {name:"도원결의",req:3,heroes:["유비","유비(제왕)","관우","장비"],effect:"저항 10%"},
    {name:"오호상장",req:3,heroes:["관우","장비","조운","황충","마초"],effect:"강공 8%"},
    {name:"군신상기",req:2,heroes:["조조","조조(제왕)","사마의"],effect:"모략피해 4%, 공심 4%"}
];

var DYNAMIC_TACTIC_POOLS = {
    "PC": ["만부막적", "질풍노도", "용왕직전", "용맹무쌍", "일고작기", "병량촌단", "비사주석", "축세대발", "암전난방", "횡소천군"],
    "PCm": ["반객위주", "승승장구", "천리추격", "교취호탈", "출수법", "강동패주"],
    "SC": ["후적박발", "사면초가", "심모원려", "양의화생", "낙정하석", "명찰추호", "화소적벽", "지변규려", "이간계", "동촉기선", "원성재도", "지인선임", "반객위주", "요사여신", "수상개화"],
    "TC": ["불노자위", "토적격문", "동구적개", "선등함진", "이아환아", "순수견양", "진화타겁", "견불가최", "이퇴위진", "부동여산"],
    "SH": ["불노자위", "포전인옥", "격안관화", "유비무환", "안영찰채", "동장철벽", "간담상조", "횡징폭렴", "휴양생식", "제곤부위", "미우주무", "홍수첨향", "여자동포", "중정기고", "현호제세"],
    "SS": ["불노자위", "포전인옥", "격안관화", "금창신", "애자필보", "태청단경", "심구고루", "기문둔갑", "만천과해", "수상개화", "이일대로", "천시지리", "진퇴유도", "유좌유용"]
};

var tacticAlternativesMap = {
    "간담상조":["불노자위","유비무환","격안관화","횡징폭렴","동장철벽","안영찰채","위위구조"], 
    "진퇴유도":["불노자위","간담상조","동구적개","유좌유용","천시지리"],
    "후적박발":["수상개화","요사여신","반객위주"],
    "안영찰채":["불노자위","포전인옥","격안관화","유비무환","간담상조","만천과해"]
};

var internalTacticStatMap = {
    "격안관화":{healGiven:8,damageTakenRed:8,comboRate:10}, "간담상조":{damageTakenRed:8,healGiven:6}, "진퇴유도":{damageTakenRed:4,damageDealtInc:4},
    "안영찰채":{damageTakenRed:4,healGiven:4}, "후적박발":{strategyDmg:15,leech:5}, "수상개화":{activeRate:12,damageDealtInc:8},
    "포전인옥":{healGiven:15, activeRate:10, strategyDmg:10}, "불노자위":{damageTakenRed:20, healGiven:14, damageDealtInc:12}
};

var defaultHawkAttr = { attr1: { rank1: "[20Lv] 속도/모략 보정" }, attr2: { rank1: "[30Lv] 전투 속성 보정" }, attr3: { rank1: "[40Lv] 행동 시 디버프 해제" } };

// 🚨 신규 '창림' 품종 메타 스펙 완벽 동기화 (질풍/맹우 매핑)
var metaHawkRandomAttributesMap = new Proxy({
    "new_meta_wei_spear":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 파갑 +10%",rank2:"[30Lv] 무용 피해 가함 +10%",rank3:"[30Lv] 연격률 +10%"},attr3:{rank1:"[40Lv 특성] 가하는 능동 전법 피해 계수 2배(60%) 상승",rank2:"[40Lv 특성] 일반 공격 시 대상 혼란",rank3:"[40Lv 특성] 첫 턴 선공 부여"}},
    "absolute_sima":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 아군 전체에게 [축예] 부여 확정화",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 행동 시 디버프 1개 해제"}},
    "rank1_wei_sima":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 아군 전체에게 [축예] 부여 확정화",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 행동 시 디버프 1개 해제"}},
    "rank2_wei_sima_hujuk":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 가하는 능동 전법 피해 계수 2배(60%) 상승",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    
    "rank1_shu_macho":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "rank1_gun_jang":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "rank1_wei_heo":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 무용 피해 가함 +10%",rank2:"[30Lv] 파갑 +10%",rank3:"[30Lv] 피해 감소 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "rank2_gun_yeopo":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 파갑 +10%",rank2:"[30Lv] 연격률 +8%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 일반 공격 시 대상 혼란(1턴)"}},
    "rank2_shu_macho_simgu":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "rank3_shu_macho":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 피해 감소 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "rank3_gun_jang_simgu":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "rank3_wei_sima_gu":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 아군 전체에게 [축예] 부여 확정화",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "rank4_shu_seo":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "rank4_wu_son":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 발동률 +5%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 치유 효과 부여 +12%",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "rank4_wei_sima":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 아군 전체에게 [축예] 부여 확정화",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "rank6_gun_jwa":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "rank6_wei_ak":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 파갑 +10%",rank2:"[30Lv] 연격률 +10%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "rank6_wei_jo":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "meta_shu_beopjeong_gang":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 무용 피해 가함 +10%",rank3:"[30Lv] 피해 감소 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}}
}, { get: (target, prop) => target[prop] || defaultHawkAttr });

// 🚨 메타 덱에 신규 전투매 창림(질풍/맹우) 완벽 매핑
var metaHawkRecommendationMap = new Proxy({
    "new_meta_wei_spear":{name:"창림-질풍",skill:"허저 능동 전법 폭딜 60% 펌핑 및 피해 경감"},
    "absolute_sima":{name:"창림-맹우",skill:"사마의 방패덱 5턴 무한 힐(축예) 및 철갑 생존"},
    "rank1_wei_sima":{name:"창림-맹우",skill:"사마의 방패덱 무한 유지력 및 철갑 탱킹"},
    "rank2_wei_sima_hujuk":{name:"창림-질풍",skill:"사마의 후적박발 액티브 60% 폭딜 펌핑"},
    
    "rank1_shu_macho":{name:"열공-전광",skill:"마초 반객위주 확산 타격 강화"},
    "rank1_gun_jang":{name:"삭풍-성모",skill:"좌자 장벽 및 장녕 모략 펌핑 지원"},
    "rank1_wei_heo":{name:"열공-전광",skill:"허저 통솔 강탈 후 연격 물리 폭딜"},
    "rank2_gun_yeopo":{name:"결운-호생",skill:"여포 천하무쌍 연타 및 동탁/원소 견고화"},
    "rank2_shu_macho_simgu":{name:"열공-전광",skill:"위연 도발 보호 아래 마초 확산 폭딜"},
    "rank3_shu_macho":{name:"결운-감로",skill:"마초 확산 폭딜 및 유비/위연 유지력 극대화"},
    "rank3_gun_jang_simgu":{name:"삭풍-성모",skill:"심구고루 좌자 방어망 및 장녕 후적박발 지원"},
    "rank3_wei_sima_gu":{name:"창림-맹우",skill:"사마의 방패덱 5턴 무한 힐(축예) 및 철갑 생존"},
    "rank4_shu_seo":{name:"능소-진시",skill:"마초 질풍노도 선공 파갑 연격 지원"},
    "rank4_wu_son":{name:"열공-전광",skill:"손권 도발 탱킹 및 육항 모략 폭딜 지원"},
    "rank4_wei_sima":{name:"창림-맹우",skill:"사마의 방패덱 5턴 무한 힐(축예) 및 철갑 생존"},
    "rank6_gun_jwa":{name:"삭풍-성모",skill:"좌자 회피 장벽 및 장녕 신산 폭딜 지원"},
    "rank6_wei_ak":{name:"열공-여천",skill:"조조(제왕) 도발 탱킹 및 장료/악진 암살"},
    "rank6_wei_jo":{name:"결운-호생",skill:"사마의 요사여신 모략 폭딜 및 가후 생존"},
    "meta_shu_beopjeong_gang":{name:"열공-여천",skill:"강유의 흡혈 및 피해 감소 생존력 강화"}
}, { get: (target, prop) => target[prop] || {name:"범용 전투매", skill:"기본 최적화"} });

window.getHawkDataFromGuide = function(metaId) {
    return {
        recommendation: metaHawkRecommendationMap[metaId || "custom"],
        attributes: metaHawkRandomAttributesMap[metaId || "custom"]
    };
};

function initGuideEngine() {
    renderGuideContent('equip');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuideEngine);
} else {
    initGuideEngine();
}

window.switchGuideTab = switchGuideTab;
window.getEquipmentRecommendationFromGuide = getEquipmentRecommendationFromGuide;

function getOfficerDogamData(officerName) {
    if (window.getOfficerDataFromDogam) { 
        const d = window.getOfficerDataFromDogam(officerName); 
        if (d && (d.uniqueTactic || d.skill)) {
            return {
                role: d.role || "-", location: d.location || "-",
                uniqueTactic: d.uniqueTactic || d.skill || (FB_OFF_META[officerName]?.[0] || "고유 전법 누락"),
                skillDesc: d.skillDesc || "",
                unitSuitability: d.unitSuitability || d.unit || (FB_OFF_META[officerName]?.[1] || "방패병"),
                faction: d.faction || d.group || (FB_OFF_META[officerName]?.[2] || "qun"),
                stats: d.stats || null
            };
        }
    }
    const [uTac = "고유 전법 누락", uUnit = "방패병", uFac = "qun"] = FB_OFF_META[officerName] || [];
    return { role: "-", location: "-", uniqueTactic: uTac, skillDesc: "", unitSuitability: uUnit, faction: uFac, stats: null };
}
window.getOfficerDogamData = getOfficerDogamData;

window.getTacticListBridge = function() {
    const externalList = (window.getAllTacticsFromDogam && window.getAllTacticsFromDogam()?.length > 5) ? window.getAllTacticsFromDogam() : [];
    const mergedList = [...new Set([...externalList, ...FB_TACTICS])];
    return mergedList.sort((a, b) => a.localeCompare(b, 'ko'));
};

window.getOfficerNamesBridge = function() {
    const externalList = (window.getAllOfficerNamesFromDogam && window.getAllOfficerNamesFromDogam()?.length > 5) ? window.getAllOfficerNamesFromDogam() : [];
    const mergedList = [...new Set([...externalList, ...FB_OFFICERS])];
    return mergedList.sort((a, b) => a.localeCompare(b, 'ko'));
};

function aggregateIntegratedStats(deck, officerIndex) {
    const officer = deck.officers[officerIndex];
    if (!officer || !officer.name) return null;
    const hName = officer.name.trim();
    const stats = { damageTakenRed: 0, damageDealtInc: 0, strategyDmg: 0, physicalDmg: 0, healGiven: 0, leech: 0, comboRate: 0, activeRate: 0, armorPen: 0, critRate: 0 };
    
    const curNames = deck.officers.map(o => cStr(o?.name)).filter(Boolean);
    const matchMeta = getBestMetaMatch(curNames);
    
    const metaData = window.getMetaDeckData ? window.getMetaDeckData() : { metaDeckUnitTypeMap: {} };
    const currentDeckUnit = (deck.unitType && deck.unitType !== "자동 판별") ? deck.unitType : (matchMeta?.bestMeta ? metaData.metaDeckUnitTypeMap[matchMeta.bestMeta.id] : "창병");

    function parseAndAdd(textObj) {
        if (!textObj) return;
        const text = textObj.toString().replace(/\s+/g, ' ');
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

    internalBondRules.filter(r => {
        const heroesInDeck = curNames.filter(n => r.heroes.includes(n));
        return new Set(heroesInDeck).size >= r.req;
    }).forEach(bond => { if (bond.heroes.includes(hName)) parseAndAdd(bond.effect); });

    const hawkData = window.getHawkDataFromGuide(matchMeta?.bestMeta?.id, curNames);
    const hA = hawkData.attributes;
    if (hA) { parseAndAdd(hA.attr1.rank1); parseAndAdd(hA.attr2.rank1); parseAndAdd(hA.attr3.rank1); }

    const dogamData = window.getOfficerDogamData(hName);
    [dogamData.uniqueTactic, ...(officer.chosenTactics || [])].filter(Boolean).forEach(tacName => {
        const tkMap = internalTacticStatMap[cStr(tacName)];
        if (tkMap) Object.keys(tkMap).forEach(tk => { if (stats[tk] !== undefined) stats[tk] += tkMap[tk]; });
    });
    return stats;
}

function evaluateDeckPerfection(deck, metaId, hMap, tMap) {
    let isPerfect = true, hasOfficer = false;
    for (let o of deck.officers) {
        const cleanName = cStr(o?.name);
        if (!cleanName) { isPerfect = false; break; }
        hasOfficer = true;
        if (!hMap[cleanName]?.isOwned) { isPerfect = false; break; }
        if (!o.chosenTactics || o.chosenTactics.length !== 2) { isPerfect = false; break; }
        for (let t of o.chosenTactics) {
            const cleanT = cStr(t);
            if (!cleanT || !tMap[cleanT]?.isOwned) { isPerfect = false; break; }
        }
    }
    if (hasOfficer && isPerfect) {
        return `<div class="feedback-item success" style="border:1px solid var(--success-text);background:var(--success-bg);padding:8px;margin-top:10px;">✨ <strong>[최종 검증 완료: Perfect Synergy]</strong> 전서버 랭커 수준의 공방 밸런스를 달성했습니다.</div>`;
    }
    return "";
}

function buildIntegratedStatsHtml(stats) {
    if (!stats) return '';
    let arr = [];
    if (stats.damageTakenRed > 0) arr.push(`피감 <span style="color:var(--success-text)">${stats.damageTakenRed.toFixed(1)}%</span>`);
    if (stats.damageDealtInc > 0) arr.push(`피증 <span style="color:#f87171">${stats.damageDealtInc.toFixed(1)}%</span>`);
    if (stats.strategyDmg > 0) arr.push(`모략 <span style="color:#c084fc">${stats.strategyDmg.toFixed(1)}%</span>`);
    if (stats.physicalDmg > 0) arr.push(`무용 <span style="color:var(--text-highlight)">${stats.physicalDmg.toFixed(1)}%</span>`);
    if (stats.healGiven > 0) arr.push(`치유 <span style="color:#60a5fa">${stats.healGiven.toFixed(1)}%</span>`);
    if (stats.leech > 0) arr.push(`흡혈 <span style="color:#fb7185">${stats.leech.toFixed(1)}%</span>`);
    if (stats.comboRate > 0) arr.push(`연격 <span style="color:#fb923c">${stats.comboRate.toFixed(1)}%</span>`);
    if (stats.activeRate > 0) arr.push(`발동 <span style="color:#38bdf8">${stats.activeRate.toFixed(1)}%</span>`);
    if (stats.critRate > 0) arr.push(`강공/기습 <span style="color:#f43f5e">${stats.critRate.toFixed(1)}%</span>`);
    if (stats.armorPen > 0) arr.push(`파갑 <span style="color:var(--text-muted)">${stats.armorPen.toFixed(1)}%</span>`);
    return arr.length === 0 ? '' : `<div class="integrated-stats-box"><div style="color:var(--text-highlight);font-weight:bold;margin-bottom:4px;font-size:10px;">📊 통합 전투 속성 (추정치)</div><div style="display:flex;flex-wrap:wrap;gap:4px 8px;line-height:1.4;">${arr.map(s=>`<span>${s}</span>`).join('')}</div></div>`;
}

function calculateActivatedBond(officers) {
    const curNames = officers?.map(o => cStr(o?.name)).filter(Boolean) || [];
    if (!curNames.length) return "활성화 효과 없음";
    const matched = internalBondRules.filter(r => {
        const heroesInDeck = curNames.filter(n => r.heroes.includes(n));
        return new Set(heroesInDeck).size >= r.req;
    });
    return matched.length ? matched.map(r => `<strong>[${r.name}]</strong> ${r.effect}`).join(" / ") : "활성화 효과 없음";
}

function getOwnedAlternativeTactic(missingTacName, allEquipTacs, tacticDataMap, recommendedTacs = new Set(), officerName = "", deckUnitType = "", returnList = false) {
    const cleanMissing = cStr(missingTacName);
    let role = "PC";
    if (officerName && FB_OFF_META[officerName]) role = FB_OFF_META[officerName][3] || "PC";

    let results = [];
    const addResult = (t) => { if (!results.includes(t)) results.push(t); };
    
    const excludeForDealers = ["가정지전", "동장철벽", "동구적개", "미우주무", "현호제세", "태청단경", "휴양생식", "제곤부위", "홍수첨향", "위위구조", "안영찰채"];
    const isInvalidForRole = (tStr) => {
        const cleanT = cStr(tStr);
        const isTacSC = DYNAMIC_TACTIC_POOLS["SC"].includes(cleanT);
        const isTacPC = DYNAMIC_TACTIC_POOLS["PC"].includes(cleanT) || DYNAMIC_TACTIC_POOLS["PCm"].includes(cleanT);
        if (["PC", "PCm", "SC"].includes(role) && excludeForDealers.includes(cleanT)) return true;
        if (["PC", "PCm", "TC"].includes(role) && isTacSC) return true;
        if (["SC"].includes(role) && isTacPC) return true;
        return false;
    };

    const checkAndAdd = (tStr) => {
        const cleanT = cStr(tStr);
        if (isInvalidForRole(cleanT)) return; 
        if (tacticDataMap[cleanT]?.isOwned && !allEquipTacs.includes(tStr) && !recommendedTacs.has(tStr) && cleanT !== cleanMissing) addResult(tStr);
    };

    const alts = tacticAlternativesMap[cleanMissing] || [];
    for (let t of alts) {
        checkAndAdd(t);
        if (!returnList && results.length > 0) return results[0];
        if (returnList && results.length >= 3) return results;
    }

    const pool = DYNAMIC_TACTIC_POOLS[role] || DYNAMIC_TACTIC_POOLS["PC"];
    for (let t of pool) {
        checkAndAdd(t);
        if (!returnList && results.length > 0) return results[0];
        if (returnList && results.length >= 3) return results;
    }

    const allTacs = window.getTacticListBridge();
    for (let cleanTName of Object.keys(tacticDataMap)) {
        if (tacticDataMap[cleanTName]?.isOwned && !allEquipTacs.includes(cleanTName) && !recommendedTacs.has(cleanTName) && cleanTName !== cleanMissing) {
            if (isInvalidForRole(cleanTName)) continue;
            const originTName = allTacs.find(n => cStr(n) === cleanTName) || cleanTName;
            addResult(originTName);
            if (!returnList && results.length > 0) return results[0];
            if (returnList && results.length >= 3) return results;
        }
    }
    if (returnList) return results;
    return results.length > 0 ? results[0] : null;
}

function generateStructuredFeedback(deck, heroDataMap, tacticDataMap, higherTierUsedTacs = []) {
    const fb = { insight: "", logs: [] };
    const curNames = deck?.officers?.map(o => cStr(o?.name)).filter(Boolean) || [];
    const match = getBestMetaMatch(curNames);
    const isCustom = !match || match.maxScore < 10000;

    if (isCustom) {
        fb.logs.push({ type: 'info', text: `💡 <strong>[오리지널 시너지]</strong> 메타를 초월한 독자적인 조합입니다. 진영과 역할군에 맞춰 전법을 배정했습니다.` });
    } else {
        const { bestMeta: meta } = match;
        fb.logs.push({ type: 'info', text: `🎯 <strong>${meta.name || meta.id}</strong> 기반 처방입니다.` });
        const metaData = window.getMetaDeckData ? window.getMetaDeckData() : { systemGuideInsights: {} };
        if (metaData && metaData.systemGuideInsights && metaData.systemGuideInsights[meta.id]) {
            fb.insight = metaData.systemGuideInsights[meta.id];
        } else if (meta.priority === 9999) {
            fb.insight = "🚨 [절대 0티어 종결 락온] 타협 없는 최고의 공방 시너지를 구축하는 이론상 0티어 덱입니다.";
        }
    }

    const allEquipTacs = deck.officers.flatMap(o => o?.chosenTactics?.map(t => cStr(t))).filter(Boolean);
    const forbiddenTacs = [...new Set([...allEquipTacs, ...higherTierUsedTacs.map(t => cStr(t))])];
    const recommendedTacs = new Set();

    deck.officers.forEach((off, oIdx) => {
        const hName = off?.name?.toString().trim() || "", cleanHName = cStr(hName);
        if (!cleanHName) {
            if (!isCustom && match && match.bestMeta.officers[oIdx]) fb.logs.push({ type: 'warning', text: `[${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}] 권장 무장 누락: <span style="color:var(--text-highlight);font-weight:bold;">[${match.bestMeta.officers[oIdx].name}]</span>`});
            else fb.logs.push({ type: 'warning', text: `[${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}] 무장 슬롯이 비어있습니다. 장수를 선택해주세요.`});
            return;
        }

        const isHeroOwned = !!heroDataMap[cleanHName]?.isOwned;
        if (!isHeroOwned && Object.keys(heroDataMap).length > 0) {
            fb.logs.push({ type: 'warning', text: `[${hName}] 미보유 상태입니다.` });
        }

        const metaIdx = (!isCustom) ? match.bestMeta.officers.findIndex(mo => cStr(mo.name) === cleanHName) : -1;
        const targetMetaTacs = metaIdx !== -1 ? (match.bestMeta.officers[metaIdx].chosenTactics.length === 3 ? match.bestMeta.officers[metaIdx].chosenTactics.slice(1, 3) : match.bestMeta.officers[metaIdx].chosenTactics) : ["", ""];

        (off.chosenTactics || []).forEach((t, i) => {
            const cT = cStr(t);
            const slotNum = i + 2;

            if (!cT) {
                if (!isCustom && targetMetaTacs[i]) {
                    const pTac = targetMetaTacs[i];
                    const isHigherUsed = higherTierUsedTacs.includes(cStr(pTac));
                    const ownedAlts = getOwnedAlternativeTactic(pTac, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType, true);
                    let altText = `<span style="color:var(--text-muted);">[대체 불가]</span>`;
                    
                    if (ownedAlts && ownedAlts.length > 0) {
                        recommendedTacs.add(ownedAlts[0]); 
                        altText = ownedAlts.map(x => `<span style="color:var(--success-text);font-weight:bold;">[${x}]</span>`).join(' <span style="color:var(--text-muted);font-size:11px;">/</span> ');
                    }
                    if (isHigherUsed) fb.logs.push({ type: 'warning', text: `[${hName}]${slotNum}슬롯 공백: <span style="color:#fca5a5;text-decoration:line-through;">[${pTac}]</span>(상위 부대 사용) ➔ 대체 추천: ${altText}` });
                    else fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백 ➔ 권장 전법: <span style="color:#38bdf8;font-weight:bold;">[${pTac}]</span>` });
                } else {
                    fb.logs.push({ type: 'warning', text: `[${hName}]${slotNum}슬롯 공백 ➔ AI 교정을 통해 시너지 전법을 추천받으세요.` });
                }
            } else {
                const isHigherUsed = higherTierUsedTacs.includes(cT);
                if (isHigherUsed) {
                    const ownedAlts = getOwnedAlternativeTactic(cT, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType, true);
                    let altText = `<span style="color:var(--text-muted);">[대체 불가]</span>`;
                    if (ownedAlts && ownedAlts.length > 0) {
                        recommendedTacs.add(ownedAlts[0]); 
                        altText = ownedAlts.map(x => `<span style="color:var(--success-text);font-weight:bold;">[${x}]</span>`).join(' <span style="color:var(--text-muted);font-size:11px;">/</span> ');
                    }
                    const issue = isHigherUsed ? "상위 부대 사용" : "미보유";
                    fb.logs.push({ type: 'warning', text: `[${hName}] <span style="color:#fca5a5;text-decoration:line-through;">[${t}]</span> (${issue}) ➔ 대체 추천: ${altText}` });
                }
            }
        });
    });
    return fb;
}

window.autoFixDeck = oIdx => {
    const targetDeck = dynamicPresetDecks.find(x => x.originIdx === oIdx);
    const saved = JSON.parse(localStorage.getItem('samguk_hobby_data') || '{}');
    const hMap = {};
    (Array.isArray(saved.heroes) ? saved.heroes : Object.values(saved.heroes || {})).forEach(x => { if(x && x.name) hMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });

    let currentOfficers = targetDeck.officers.map(o => cStr(o.name)).filter(Boolean);
    let bestMeta = null;
    let maxScore = -999999;

    if (currentOfficers.length > 0 || ABSOLUTE_ENDGAME_DECKS.length > 0) {
        for (const meta of ABSOLUTE_ENDGAME_DECKS) {
            let score = 0;
            let matchCount = 0;
            currentOfficers.forEach(co => { if (meta.officers.some(mo => cStr(mo.name) === co)) { score += 50000; matchCount++; } });
            if (currentOfficers.length > 0 && matchCount === 0) { score -= 100000; }
            meta.officers.forEach(mo => { if (hMap[cStr(mo.name)]?.isOwned) score += 10; });
            score += (meta.priority || 0);
            if (score > maxScore) { maxScore = score; bestMeta = meta; }
        }
    }

    let isMetaDriven = (bestMeta && maxScore >= 10000);

    if (isMetaDriven) {
        targetDeck.formation = bestMeta.formation;
        let userTacticMap = {};
        targetDeck.officers.forEach(o => { if (o.name) userTacticMap[o.name] = [...o.chosenTactics]; });
        targetDeck.officers.forEach((o, i) => {
            let targetName = bestMeta.officers[i].name;
            o.name = targetName;
            o.chosenTactics = userTacticMap[targetName] || ["", ""];
        });
    } else {
        if (currentOfficers.length > 0) {
            let baseFaction = FB_OFF_META[currentOfficers[0]]?.[2] || "qun";
            let placed = [...currentOfficers];
            const higherHeroes = new Set();
            dynamicPresetDecks.forEach(d => { if (d.originIdx < oIdx) d.officers.forEach(ho => { if (ho.name) higherHeroes.add(cStr(ho.name)); }); });
            targetDeck.officers.forEach(o => {
                if (!o.name) {
                    let cand = FB_OFFICERS.find(name => FB_OFF_META[name]?.[2] === baseFaction && hMap[name]?.isOwned && !placed.includes(name) && !higherHeroes.has(name));
                    if (!cand) cand = FB_OFFICERS.find(name => FB_OFF_META[name]?.[2] === baseFaction && !placed.includes(name) && !higherHeroes.has(name));
                    if (cand) { o.name = cand; placed.push(cand); }
                }
            });
        } else {
            let defaultMeta = ABSOLUTE_ENDGAME_DECKS[0];
            targetDeck.formation = defaultMeta.formation;
            targetDeck.officers = defaultMeta.officers.map(mo => ({ name: mo.name, chosenTactics: ["", ""] }));
        }
    }

    let usedInCurrentDeck = new Set();
    targetDeck.officers.forEach(o => { o.chosenTactics.forEach(t => { if(t) usedInCurrentDeck.add(cStr(t)); }); });

    let usedInAnyHigherDeck = new Set();
    dynamicPresetDecks.forEach(d => {
        if (d.originIdx < oIdx) {
            d.officers.forEach(ho => { ho.chosenTactics.forEach(t => { if(t) usedInAnyHigherDeck.add(cStr(t)); }); });
        }
    });

    targetDeck.officers.forEach((o, oIdx) => {
        if (!o.name) return;
        const metaOfficer = bestMeta && isMetaDriven ? bestMeta.officers.find(mo => mo.name === o.name) : null;
        const targetMetaTacs = metaOfficer ? (metaOfficer.chosenTactics.length === 3 ? metaOfficer.chosenTactics.slice(1,3) : metaOfficer.chosenTactics) : ["", ""];
        const role = FB_OFF_META[o.name]?.[3] || "PC";

        for (let i = 0; i < 2; i++) {
            if (o.chosenTactics[i]) continue;
            let bestFallback = "";
            let highestScore = -99999;

            window.getTacticListBridge().forEach(tac => {
                const cTac = cStr(tac);
                if (usedInCurrentDeck.has(cTac) || usedInAnyHigherDeck.has(cTac)) return; 

                let score = 0;
                const stats = internalTacticStatMap[cTac] || {};

                if (role === 'SC') { if (stats.strategyDmg) score += stats.strategyDmg * 15; if (stats.physicalDmg) score -= 1000; } 
                else if (['SH', 'SS'].includes(role)) { if (stats.healGiven) score += stats.healGiven * 15; if (stats.damageTakenRed) score += stats.damageTakenRed * 12; if (stats.strategyDmg) score -= 800; } 
                else if (['PC', 'PCm'].includes(role)) { if (stats.physicalDmg) score += stats.physicalDmg * 15; if (stats.strategyDmg) score -= 1000; } 
                else if (role === 'TC') { if (stats.damageTakenRed) score += stats.damageTakenRed * 20; if (stats.strategyDmg) score -= 1000; }

                if (targetMetaTacs.includes(tac)) score += 1500;
                if (score > highestScore) { highestScore = score; bestFallback = tac; }
            });

            if (bestFallback) {
                o.chosenTactics[i] = bestFallback;
                usedInCurrentDeck.add(cStr(bestFallback));
            }
        }
    });

    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    renderDeckBuilder();
    alert(`[AI 유연 교정 완료] 상위 부대(1·2군)가 사용 중인 전법을 완벽히 배제하고, 차선책(타협의 현실)을 계산하여 1순위로 채워 넣었습니다.`);
};

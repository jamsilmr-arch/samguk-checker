// [시스템 분석] deck_core.js - 초경량 크로스 브릿지 엔진 (상위 부대 전법 락온 및 천공 3등 추가 완료 / 증발했던 UI 기능 100% 복구)
console.log("[시스템 분석] deck_core.js 무결성 엔진 기동");

var cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

var FB_OFF_META = {
    "가후":["경달권변","궁병/방패병","wei","SS"], "곽가":["산무유책","궁병/방패병","wei","SH"], "사마의":["응시낭고","방패병/궁병","wei","SC"], "순욱":["거중지중","궁병/창병","wei","SH"], "악진":["분용당선","창병/궁병","wei","PC"], "전위":["축호과간","창병/방패병","wei","TC"], "정욱":["십면매복","방패병/궁병","wei","SC"], "조조(제왕)":["군령여산","창병/방패병","wei","TC"], "조조":["효웅","방패병/기병","wei","TC"], "장료":["함진살적","창병/기병","wei","PCm"], "장합":["교변병기","방패병/창병","wei","TC"], "하후돈":["발시담정","창병/방패병","wei","TC"], "하후연":["충용","창병/기병","wei","PCm"], "허저":["호치","창병/궁병","wei","TC"],
    "관우":["무성","창병/기병","shu","PC"], "강유":["담대여두","방패병/기병","shu","SC"], "마대":["습참","창병/방패병","shu","PC"], "마초":["출수법","창병/기병","shu","PCm"], "법정":["애자필보","방패병/궁병","shu","SS"], "서서":["절절학문","창병/궁병","shu","SS"], "사마가":["만왕","창병/방패병","shu","PC"], "위연":["실병제위","창병/궁병","shu","PC"], "유비":["인정","창병/기병","shu","SH"], "유비(제왕)":["재주복주","창병/방패병","shu","SH"], "장비":["연인노호","창병/방패병","shu","TC"], "제갈량":["초선차전","궁병/방패병","shu","SH"], "조운":["칠진칠출","창병/방패병","shu","PC"], "황충":["적혈도","창병/방패병","shu","PC"], "황월영":["묘산천기","궁병/방패병","shu","SH"],
    "대교":["정수유심","창병/궁병","wu","SH"], "노숙":["탑상책","궁병/기병","wu","SH"], "소교":["화용욕모","궁병/기병","wu","SH"], "손견":["강동맹호","창병/방패병","wu","TC"], "손권":["웅거","궁병/기병","wu","TC"], "손상향":["효희","궁병/기병","wu","PCm"], "손책":["강동패주","창병/방패병","wu","PC"], "손권(제왕)":["겸권상계","창병/궁병","wu","SS"], "여몽":["백의도강","방패병/궁병","wu","SS"], "육손":["지변규려","창병/기병","wu","SC"], "육항":["청백충근","창병/궁병","wu","SC"], "주유":["봉화연천","창병/궁병","wu","SC"], "주태":["청라산개","기병/방패병","wu","TC"], "정보":["칠척사모","기병/방패병","wu","TC"], "황개":["요원지화","방패병/궁병","wu","TC"],
    "공손찬":["위진새북","기병/창병","qun","PCm"], "동탁":["전권난정","방패병/기병","qun","TC"], "안량":["효장","창병/기병","qun","PC"], "여포":["천하무쌍","궁병/기병","qun","PCm"], "우길":["태평경","창병/궁병","qun","SS"], "원소":["사소도","방패병/기병","qun","TC"], "장각":["황천당립","궁병/기병","qun","SC"], "장녕":["천의난위","궁병/방패병","qun","SS"], "장보":["요풍사기","궁병/방패병","qun","SS"], "좌자":["화겁생기","궁병/방패병","qun","SH"], "채문희":["비분시","궁병/기병","qun","SH"], "초선":["폐월","창병/기병","qun","SH"], "화타":["청낭제세","궁병/방패병","qun","SH"], "황보숭":["강직불아","궁병/창병","qun","TC"]
};
var FB_OFFICERS = Object.keys(FB_OFF_META);
var FB_TACTICS = "가정지전,간담상조,강유겸제,견불가최,견진연봉,격안관화,공기불비,과하탁교,교취호탈,극적제승,금낭묘계,금적금왕,금창신,금철교명,기문둔갑,낙정하석,동구적개,동장철벽,동촉기선,만부막적,만전제발,만천과해,명찰추호,문치무공,미우주무,반객위주,병량촌단,부동여산,분성지계,비사주석,사면초가,사생취의,선등함진,수상개화,순수견양,승승장구,심구고루,심모원려,안영찰채,암전난방,양의화생,양초선행,여자동포,요사여신,용맹무쌍,용왕직전,운주유악,원성재도,위위구조,유비무환,유좌유용,이간계,이아환아,이일대로,이퇴위진,일고작기,인세이도,전위위안,제곤부위,중정기고,지인선임,진퇴유도,진화타겁,질풍노도,천리추격,천시지리,체천행도,축세대발,태청단경,토적격문,현호제세,호령삼군,혼수모어,홍수첨향,화소적벽,후적박발,횡소천군,횡징폭렴,휴양생식".split(',');

var ABSOLUTE_ENDGAME_DECKS = [
    { id: "rank1_wu_yukson", priority: 10000, name: "[천공 1위] 소교·육손·노숙 구행 기병", concept: "[최신 천공 1위]", formation: "구행진", officers: [ {name:"소교", chosenTactics:["화용욕모", "진퇴유도", "간담상조"]}, {name:"육손", chosenTactics:["지변규려", "천리추격", "체천행도"]}, {name:"노숙", chosenTactics:["탑상책", "격안관화", "분성지계"]} ] },
    { id: "rank1_gun_jangnyeong", priority: 10000, name: "[천공 1위] 원소·장녕·좌자 구행 방패", concept: "[최신 천공 1위]", formation: "구행진", officers: [ {name:"원소", chosenTactics:["사소도", "강유겸제", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "수상개화"]}, {name:"좌자", chosenTactics:["화겁생기", "심구고루", "유비무환"]} ] },
    { id: "rank1_wei_heojeo", priority: 10000, name: "[천공 1위] 허저·가후·악진 호도 궁병", concept: "[최신 천공 1위]", formation: "호도진", officers: [ {name:"허저", chosenTactics:["호치", "부동여산", "반객위주"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "유좌유용"]}, {name:"악진", chosenTactics:["분용당선", "기문둔갑", "횡징폭렴"]} ] },
    { id: "rank3_shu_seo", priority: 9998, name: "[천공 3위] 서서·마초·위연 구행 창병", concept: "[최신 천공 3위]", formation: "구행진", officers: [ {name:"서서", chosenTactics:["절절학문", "전위위안", "심구고루"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "질풍노도"]}, {name:"위연", chosenTactics:["실병제위", "문치무공", "진퇴유도"]} ] },
    { id: "rank3_wu_yukhang", priority: 9998, name: "[천공 3위] 육항·손권·노숙 안행 궁병", concept: "[최신 천공 3위]", formation: "안행진", officers: [ {name:"육항", chosenTactics:["청백충근", "요사여신", "양의화생"]}, {name:"손권", chosenTactics:["웅거", "안영찰채", "여자동포"]}, {name:"노숙", chosenTactics:["탑상책", "분성지계", "만천과해"]} ] },
    { id: "rank3_wei_sima", priority: 9998, name: "[천공 3위] 조조·사마의·가후 구행 방패", concept: "[3군 타협의 현실]", formation: "구행진", officers: [ {name:"조조", chosenTactics:["효웅", "유좌유용", "간담상조"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "반객위주"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "유비무환"]} ] },
    { id: "absolute_beopjeong", priority: 9999, name: "[절대 종결] 유비·법정·강유 추형 방패", concept: "[0티어 정답지]", formation: "추형진", officers: [ {name:"유비(제왕)", chosenTactics:["재주복주", "안영찰채", "격안관화"]}, {name:"법정", chosenTactics:["애자필보", "심구고루", "유비무환"]}, {name:"강유", chosenTactics:["담대여두", "천리추격", "체천행도"]} ] },
    { id: "absolute_sima", priority: 9999, name: "[절대 종결] 사마의 추형 방패", concept: "[0티어 정답지]", formation: "추형진", officers: [ {name:"사마의", chosenTactics:["응시낭고", "후적박발", "반객위주"]}, {name:"조조", chosenTactics:["효웅", "강유겸제", "진퇴유도"]}, {name:"가후", chosenTactics:["경달권변", "유비무환", "혼수모어"]} ] },
    { id: "absolute_macho", priority: 9999, name: "[절대 종결] 마초 안행 창병", concept: "[0티어 정답지]", formation: "안행진", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "진퇴유도", "간담상조"]}, {name:"서서", chosenTactics:["절절학문", "전위위안", "문치무공"]} ] },
    { id: "absolute_jangnyung", priority: 9999, name: "[절대 종결] 장녕 구행 궁병", concept: "[0티어 정답지]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "안영찰채", "유비무환"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "금창신", "간담상조"]} ] },
    { id: "absolute_yeopo", priority: 9999, name: "[절대 종결] 여포 방원 기병", concept: "[0티어 정답지]", formation: "방원진", officers: [ {name:"원소", chosenTactics:["사소도", "간담상조", "진퇴유도"]}, {name:"동탁", chosenTactics:["전권난정", "견진연봉", "위위구조"]}, {name:"여포", chosenTactics:["천하무쌍", "만부막적", "용왕직전"]} ] },
    { id: "absolute_jangryo", priority: 9999, name: "[절대 종결] 장료 기형 기병", concept: "[0티어 정답지]", formation: "기형진", officers: [ {name:"악진", chosenTactics:["분용당선", "여자동포", "유좌유용"]}, {name:"조조(제왕)", chosenTactics:["군령여산", "강유겸제", "심구고루"]}, {name:"장료", chosenTactics:["함진살적", "질풍노도", "반객위주"]} ] }
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
    {name:"연환계",req:3,heroes:["동탁","여포","초선","황충"],effect:"피해가함 4%, 치유효과 4%"},
    {name:"도법자연",req:3,heroes:["좌자","장각","우길"],effect:"모략피해 4%, 공심 4%"},
    {name:"가모정세",req:2,heroes:["조조","조조(제왕)","곽가"],effect:"모략피해 4%, 무용피해감소 4%"},
    {name:"위실주석",req:2,heroes:["하후돈","하후연"],effect:"파갑 8%"},
    {name:"백제탁고",req:2,heroes:["제갈량","조운"],effect:"배반 8%, 공심 8%"},
    {name:"오자양장",req:3,heroes:["장료","악진","장합","서황","우금"],effect:"배반 18%"},
    {name:"동오대도독",req:3,heroes:["주유","육손","여몽","육항","노숙"],effect:"모략피해 7%"},
    {name:"군신상기",req:2,heroes:["조조","조조(제왕)","사마의"],effect:"모략피해 4%, 공심 4%"},
    {name:"호위경주",req:3,heroes:["조조","조조(제왕)","전위","허저"],effect:"무용 4%, 통솔 4%"},
    {name:"촉한사모",req:2,heroes:["제갈량","서서","법정"],effect:"모략 피해 상승 5%, 치유 5%"},
    {name:"아애신정",req:2,heroes:["유비","유비(제왕)","법정"],effect:"피해 감소 4%"},
    {name:"문무정군",req:2,heroes:["황충","법정"],effect:"첫 3턴 치유 80%"}
];

var DYNAMIC_TACTIC_POOLS = {
    "PC": ["만부막적", "질풍노도", "용왕직전", "용맹무쌍", "일고작기", "병량촌단", "비사주석", "축세대발", "암전난방", "횡소천군"],
    "PCm": ["반객위주", "승승장구", "천리추격", "교취호탈", "출수법", "강동패주"],
    "SC": ["후적박발", "사면초가", "심모원려", "양의화생", "낙정하석", "명찰추호", "화소적벽", "지변규려", "이간계", "동촉기선", "원성재도", "지인선임", "반객위주", "요사여신", "수상개화"],
    "TC": ["토적격문", "동구적개", "선등함진", "이아환아", "순수견양", "진화타겁", "견불가최", "이퇴위진", "부동여산"],
    "SH": ["격안관화", "유비무환", "안영찰채", "동장철벽", "간담상조", "횡징폭렴", "휴양생식", "제곤부위", "미우주무", "홍수첨향", "여자동포", "중정기고", "현호제세"],
    "SS": ["격안관화", "금창신", "애자필보", "태청단경", "심구고루", "기문둔갑", "만천과해", "수상개화", "이일대로", "천시지리", "진퇴유도", "유좌유용"]
};

var tacticAlternativesMap = {
    "간담상조":["유비무환","격안관화","횡징폭렴","동장철벽","안영찰채","위위구조"], 
    "진퇴유도":["간담상조","동구적개","유좌유용","천시지리"],
    "후적박발":["수상개화","요사여신","반객위주"],
    "안영찰채":["격안관화","유비무환","간담상조","만천과해"]
};

var internalTacticStatMap = {
    "격안관화":{healGiven:8,damageTakenRed:8,comboRate:10},"재주복주":{healGiven:10,damageTakenRed:4},"연인노호":{physicalDmg:5,damageTakenRed:4},"무성":{physicalDmg:8,activeRate:5},"응시낭고":{strategyDmg:8,leech:4},"함진살적":{physicalDmg:8,comboRate:5},"초선차전":{healGiven:10},"칠진칠출":{physicalDmg:6,damageTakenRed:4},"천하무쌍":{physicalDmg:8,comboRate:5},
    "간담상조":{damageTakenRed:8,healGiven:6},"심모원려":{strategyDmg:6},"휴양생식":{healGiven:8},"혼수모어":{damageTakenRed:4,healGiven:6},"효웅":{damageTakenRed:5,healGiven:5},"반객위주":{stackingDmg:8},"실병제위":{damageDealtInc:5},"동구적개":{damageTakenRed:8},"강유겸제":{damageTakenRed:6},"횡징폭렴":{damageTakenRed:6,healGiven:5},"동장철벽":{damageTakenRed:5},"천시지리":{damageTakenRed:5},"진퇴유도":{damageTakenRed:4,damageDealtInc:4},"사생취의":{glassCannonDmg:8,physicalDmg:4},"일고작기":{damageDealtInc:6,comboRate:10},"용맹무쌍":{physicalDmg:6},"만부막적":{physicalDmg:5},"용왕직전":{physicalDmg:5},"태청단경":{healGiven:8},"현호제세":{healGiven:8},"홍수첨향":{healGiven:8,damageTakenRed:6},"위위구조":{healGiven:5,damageTakenRed:4},"안영찰채":{damageTakenRed:4,healGiven:4},"이간계":{damageTakenRed:4,strategyDmg:5},"군령여산":{damageDealtInc:5,damageTakenRed:5},"분용당선":{physicalDmg:5},"출수법":{physicalDmg:5,armorPen:5},"적혈도":{strategyDmg:5,healGiven:5},"전권난정":{physicalDmg:5,damageTakenRed:4},"수상개화":{activeRate:12,damageDealtInc:8},"요사여신":{strategyDmg:10},"만천과해":{damageTakenRed:6,healGiven:6},"화소적벽":{strategyDmg:8},"이퇴위진":{damageTakenRed:6,damageDealtInc:6},"금낭묘계":{healGiven:6},"제곤부위":{healGiven:6},"이아환아":{counterDmg:6,damageTakenRed:4},"만전제발":{physicalDmg:6},"선등함진":{physicalDmg:5},"축세대발":{physicalDmg:6,damageDealtInc:6},"인세이도":{damageTakenRed:8,healGiven:5},"유좌유용":{healGiven:6},"견진연봉":{comboRate:10},"전위위안":{healGiven:6,damageTakenRed:4},"천리추격":{strategyDmg:6,activeRate:3},"분성지계":{strategyDmg:5,damageTakenRed:4},"여자동포":{healGiven:6,damageTakenRed:4},"질풍노도":{physicalDmg:6,armorPen:8},"절절학문":{strategyDmg:6,damageDealtInc:5},"문치무공":{physicalDmg:5,strategyDmg:5,healGiven:6},"담대여두":{strategyDmg:6,physicalDmg:6},"인정":{healGiven:8,damageTakenRed:4},"사소도":{damageDealtInc:6,damageTakenRed:4},"위진새북":{activeRate:5,physicalDmg:5},"금철교명":{counterDmg:6},"체천행도":{strategyDmg:6,leech:4},"금창신":{damageTakenRed:8,strategyDmg:5},"승승장구":{physicalDmg:8,speed:5},"토적격문":{damageTakenRed:6},
    "호치":{physicalDmg:8,leech:5},"부동여산":{activeRate:10,physicalDmg:6},"후적박발":{strategyDmg:15,leech:5},
    "강직불아":{healGiven:8,damageTakenRed:6},"명찰추호":{strategyDmg:8,armorPen:5},"유비무환":{healGiven:8,damageTakenRed:8},
    "심구고루":{damageTakenRed:15, healGiven:10},"애자필보":{damageTakenRed:15}
};

var defaultHawkAttr = { attr1: { rank1: "[20Lv] 속도/모략 보정" }, attr2: { rank1: "[30Lv] 전투 속성 보정" }, attr3: { rank1: "[40Lv] 행동 시 디버프 해제" } };
var metaHawkRandomAttributesMap = new Proxy({}, { get: (target, prop) => target[prop] || defaultHawkAttr });
var metaHawkRecommendationMap = new Proxy({}, { get: (target, prop) => target[prop] || {name:"범용 전투매", skill:"기본 최적화"} });

window.getHawkDataFromGuide = function(metaId, officersArray = []) {
    const names = officersArray.map(o => cStr(o?.name || o));
    if (names.includes("강유") && names.includes("법정")) return { recommendation: {name:"삭풍-설조", skill:"강유 예열을 위한 버퍼진 극강 생존"}, attributes: { attr1:{rank1:"[20Lv] 모략 +12%"}, attr2:{rank1:"[30Lv] 모략 피해 가함 +10%"}, attr3:{rank1:"[40Lv 특성] 피격 시 50% 확률 저항"} } };
    if (names.includes("사마의")) return { recommendation: {name:"결운-호생", skill:"사마의 모략 폭딜 및 전열 호위"}, attributes: { attr1:{rank1:"[20Lv] 모략 +12%"}, attr2:{rank1:"[30Lv] 모략 피해 가함 +10%"}, attr3:{rank1:"[40Lv 특성] 피격 시 50% 확률 저항"} } };
    if (names.includes("마초")) return { recommendation: {name:"열공-전광", skill:"마초 반객위주 확산 타격 강화"}, attributes: { attr1:{rank1:"[20Lv] 무용 +12%"}, attr2:{rank1:"[30Lv] 연격률 +10%"}, attr3:{rank1:"[40Lv 특성] 추격 전법 피해 +15%"} } };
    if (names.includes("장녕")) return { recommendation: {name:"삭풍-성모", skill:"좌자 장벽 및 장녕 모략 펌핑 지원"}, attributes: { attr1:{rank1:"[20Lv] 모략 +12%"}, attr2:{rank1:"[30Lv] 모략 피해 가함 +10%"}, attr3:{rank1:"[40Lv 특성] 피격 시 50% 확률 저항"} } };
    if (names.includes("여포") || names.includes("허저")) return { recommendation: {name:"결운-호생", skill:"무력 폭딜 연타 및 아군 견고화"}, attributes: { attr1:{rank1:"[20Lv] 무용 +12%"}, attr2:{rank1:"[30Lv] 파갑 +10%"}, attr3:{rank1:"[40Lv 특성] 일반 공격 시 대상 혼란"} } };
    if (names.includes("강유")) return { recommendation: {name:"열공-여천", skill:"강유의 흡혈 및 피해 감소 생존력 강화"}, attributes: { attr1:{rank1:"[20Lv] 무용 +12%"}, attr2:{rank1:"[30Lv] 모략 피해 가함 +10%"}, attr3:{rank1:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"} } };
    if (names.includes("장료") || names.includes("악진")) return { recommendation: {name:"열공-전광", skill:"연격 폭격 및 장료 후열 암살"}, attributes: { attr1:{rank1:"[20Lv] 무용 +12%"}, attr2:{rank1:"[30Lv] 연격률 +10%"}, attr3:{rank1:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"} } };
    if (names.includes("육손") || names.includes("육항") || names.includes("손권")) return { recommendation: {name:"능소-진시", skill:"모략 치명타 폭딜 및 방벽 강화"}, attributes: { attr1:{rank1:"[20Lv] 모략 +12%"}, attr2:{rank1:"[30Lv] 치유 효과 부여 +10%"}, attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제"} } };
    if (names.includes("공손찬") || names.includes("초선")) return { recommendation: {name:"열공-전광", skill:"속도 버프 및 무용 타격 강화"}, attributes: { attr1:{rank1:"[20Lv] 속도 +20"}, attr2:{rank1:"[30Lv] 무용 피해 가함 +10%"}, attr3:{rank1:"[40Lv 특성] 첫 턴 선공 부여"} } };
    
    return { recommendation: {name:"범용 전투매", skill:"기본 최적화"}, attributes: { attr1:{rank1:"[20Lv] 속도/모략 보정"}, attr2:{rank1:"[30Lv] 전투 속성 보정"}, attr3:{rank1:"[40Lv] 행동 시 디버프 해제"} } };
};

window.getOfficerDogamData = function(officerName) {
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
};

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

function getOfficerEquipment(officerName, deckUnitType = "") {
    const cleanName = cStr(officerName);
    const dogamInfo = window.getOfficerDogamData(officerName);
    const unitPrefix = (deckUnitType && deckUnitType !== "자동 판별") ? deckUnitType : (dogamInfo.unitSuitability?.split('/')[0] || "방패병");
    
    let rawEq = window.getOfficerEquipmentFromDogam ? window.getOfficerEquipmentFromDogam(officerName) : null;
    if (!rawEq && FB_EQUIP_MAP[cleanName]) {
        const mEq = FB_EQUIP_MAP[cleanName];
        rawEq = { helmet: { ...mEq.helmet }, armor: { ...mEq.armor }, accessory: { ...mEq.accessory } };
    }

    if (rawEq) {
        const eq = { helmet: { ...rawEq.helmet }, armor: { ...rawEq.armor }, accessory: { ...rawEq.accessory } };
        ['helmet', 'armor', 'accessory'].forEach(part => {
            ['attr1', 'attr2', 'attr3'].forEach(attr => {
                let val = eq[part][attr];
                if (val && val.match(/(창병|기병|궁병|방패병)/)) {
                    val = val.replace(/(창병|기병|궁병|방패병)\s*/g, `${unitPrefix} `);
                    eq[part][attr] = val.replace(unitPrefix === "창병" ? "강공, 기습 증가" : "강공, 기습 상승", unitPrefix === "창병" ? "강공, 기습 상승" : "강공, 기습 증가").trim();
                }
            });
        });
        return eq;
    }

    const p = EQ_PRESETS["PC"];
    return { helmet: { name: p[0], attr1: p[1], attr2: p[2], attr3: p[3] }, armor: { name: p[4], attr1: p[5], attr2: p[6], attr3: p[7] }, accessory: { name: p[8], attr1: p[9], attr2: p[10], attr3: p[11] } };
}

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
        if (!o.chosenTactics || o.chosenTactics.length !== 2 || !o.chosenTactics[0] || !o.chosenTactics[1]) { isPerfect = false; break; }
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

function getBestMetaMatch(curNamesClean) {
    if (!curNamesClean || !curNamesClean.length) return null;
    
    let archetypes = [...ABSOLUTE_ENDGAME_DECKS];
    if (window.getMetaDeckData) {
        const metaData = window.getMetaDeckData();
        if (metaData && metaData.analyzedMetaArchetypes && metaData.analyzedMetaArchetypes.length > 0) {
            archetypes = [...archetypes, ...metaData.analyzedMetaArchetypes];
        }
    }

    let bestMeta = null, maxScore = -999999;
    
    archetypes.forEach(meta => {
        let score = 0;
        let matchCount = 0;
        
        curNamesClean.forEach(co => { 
            if (meta.officers.some(mo => cStr(mo.name) === co)) {
                score += 50000;
                matchCount++;
            } 
        });

        if (curNamesClean.length > 0 && matchCount === 0) {
            score -= 100000;
        }

        score += (meta.priority || 0);

        if (score > maxScore) { maxScore = score; bestMeta = meta; }
    });

    return { bestMeta, maxScore };
}

function calculateStrictDeckScore(deck) {
    const curNamesClean = deck?.officers?.map(o => cStr(o?.name)).filter(Boolean) || [];
    const match = getBestMetaMatch(curNamesClean);
    if (!match || match.maxScore < 10000) return 0;
    
    let score = 100;
    if (cStr(deck.formation) !== cStr(match.bestMeta.formation)) score -= 10;
    match.bestMeta.officers.forEach((metaOff) => { if (!curNamesClean.includes(cStr(metaOff.name))) score -= 30; });
    return Math.max(score, 0);
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
                        altText = ownedAlts.map(x => `<span style="color:var(--success-text);font-weight:bold;">[${x}]</span>`).join(' / ');
                    }
                    if (isHigherUsed) fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯: <span style="color:#fca5a5;text-decoration:line-through;">[${pTac}]</span>(상위 부대 사용) ➔ 타협 추천: ${altText}` });
                    else fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백 ➔ 권장 전법: <span style="color:#38bdf8;font-weight:bold;">[${pTac}]</span>` });
                } else {
                    fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백 ➔ AI 교정을 통해 시너지 전법을 추천받으세요.` });
                }
            } else {
                const isHigherUsed = higherTierUsedTacs.includes(cT);
                if (isHigherUsed) {
                    const ownedAlts = getOwnedAlternativeTactic(cT, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType, true);
                    let altText = `<span style="color:var(--text-muted);">[대체 불가]</span>`;
                    if (ownedAlts && ownedAlts.length > 0) {
                        recommendedTacs.add(ownedAlts[0]); 
                        altText = ownedAlts.map(x => `<span style="color:var(--success-text);font-weight:bold;">[${x}]</span>`).join(' / ');
                    }
                    fb.logs.push({ type: 'warning', text: `[${hName}] <span style="color:#fca5a5;text-decoration:line-through;">[${t}]</span> (상위 부대 사용) ➔ 타협 추천: ${altText}` });
                }
            }
        });
    });
    return fb;
}

var FORMATIONS = {
    "일자진": { eff: "전열: 피해 감소 6.0% | 후열: -", pos: ["front","front","front"] },
    "구행진": { eff: "전열: 피해 감소 5.0% | 후열: 피해 증가 12.0%", pos: ["front","back","front"] },
    "추형진": { eff: "전열: 피해 감소 6.0% | 후열: 피해 증가 8.0%", pos: ["back","front","back"] },
    "기형진": { eff: "전열: 피해 증가 12.0% | 후열: 피해 감소 5.0%", pos: ["back","back","front"] },
    "방원진": { eff: "전열: 피해 감소 5.0% | 후열: 연격률 28.0%", pos: ["front","front","back"] },
    "안행진": { eff: "전열: 피해 감소 5.0% | 후열: 강공/기습 12.0%", pos: ["back","front","front"] },
    "호도진": { eff: "전열: 방어 시 회복 | 후열: 피해 증가", pos: ["front","front","back"] }
};

var dynamicPresetDecks = [];
var draggedDeckOriginIdx = null, draggedOfficerSlotIdx = null;

var defaultPresetDecks = Array.from({ length: 5 }, (_, i) => ({
    title: `${i + 1}군`,
    formation: "구행진",
    unitType: "",
    originIdx: i,
    officers: [ { name: "", chosenTactics: ["", ""] }, { name: "", chosenTactics: ["", ""] }, { name: "", chosenTactics: ["", ""] } ]
}));

window.handleOfficerDragStart = (e, dIdx, oIdx) => { draggedDeckOriginIdx = dIdx; draggedOfficerSlotIdx = oIdx; e.target.style.opacity = '0.5'; };
window.handleOfficerDragEnd = e => { e.target.style.opacity = '1'; document.querySelectorAll('.officer-slot').forEach(el => el.style.border = 'none'); draggedDeckOriginIdx = null; draggedOfficerSlotIdx = null; };
window.handleOfficerDragOver = e => { e.preventDefault(); e.currentTarget.style.border = '2px dashed var(--border-accent)'; };
window.handleOfficerDragLeave = e => { e.preventDefault(); e.currentTarget.style.border = 'none'; };
window.handleOfficerDrop = (e, tDIdx, tOIdx) => {
    e.preventDefault(); e.currentTarget.style.border = 'none';
    if (draggedDeckOriginIdx === null || draggedOfficerSlotIdx === null) return;
    const srcD = dynamicPresetDecks.find(x => x.originIdx === draggedDeckOriginIdx);
    const tgtD = dynamicPresetDecks.find(x => x.originIdx === tDIdx);
    if (!srcD || !tgtD) return;
    const temp = srcD.officers[draggedOfficerSlotIdx];
    srcD.officers[draggedOfficerSlotIdx] = tgtD.officers[tOIdx];
    tgtD.officers[tOIdx] = temp;
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); 
    renderDeckBuilder();
};

var modalPopupEl = null, currentPopupTitle = null;
function openModalPopup(e, title, meta1, desc1) {
    e.stopPropagation();
    if (!modalPopupEl) {
        modalPopupEl = document.createElement('div');
        modalPopupEl.id = 'tactic-popup-modal';
        document.body.appendChild(modalPopupEl);
        document.addEventListener('click', (evt) => { if (!evt.target.closest('#tactic-popup-modal')) { modalPopupEl.style.display = 'none'; currentPopupTitle = null; } });
    }
    if (modalPopupEl.style.display === 'block' && currentPopupTitle === title) { modalPopupEl.style.display = 'none'; currentPopupTitle = null; return; }
    currentPopupTitle = title;
    modalPopupEl.innerHTML = `<div class="p-title" style="color:var(--text-highlight);font-weight:bold;border-bottom:1px solid var(--border-main);padding-bottom:6px;">${title}</div><div class="p-meta" style="color:var(--text-muted);margin-top:8px;font-size:11px;">${meta1}</div><div class="p-desc" style="margin-top:6px;color:var(--text-desc);line-height:1.5;">${desc1}</div>`;
    modalPopupEl.style.display = 'block';
    const rect = e.currentTarget.getBoundingClientRect();
    modalPopupEl.style.top = `${rect.top + window.scrollY - 10}px`;
    modalPopupEl.style.left = `${Math.min(rect.right + window.scrollX + 10, window.innerWidth - 290)}px`;
}
window.showEquipPopup = function(e, attr1, attr2, attr3) { if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') return; openModalPopup(e, "⚒️ 장비 추가 속성 및 특기", `🔹 1차: ${attr1}<br>🔹 2차: ${attr2}`, `🔸 특기: <span style="color:#f59e0b;font-weight:bold;">${attr3}</span>`); };

function initGuideModal() {
    if (document.getElementById('guide-modal-overlay')) return;
    const modalHtml = `
        <div id="guide-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:10000; justify-content:center; align-items:center; backdrop-filter:blur(2px);">
            <div style="background:var(--bg-panel); border:1px solid var(--border-accent); border-radius:8px; width:90%; max-width:500px; padding:20px; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-main); padding-bottom:10px; margin-bottom:15px;">
                    <h3 style="margin:0; color:var(--text-highlight);">💡 AI 덱 교정 시스템 사용 가이드</h3>
                    <button onclick="closeGuideModal()" style="background:none; border:none; color:var(--text-muted); font-size:24px; cursor:pointer; line-height:1;">&times;</button>
                </div>
                <div style="color:var(--text-main); font-size:13px; line-height:1.6;">
                    <p><strong>1. 🎯 배치 무장 절대 락온 (우선권 보장)</strong><br>원하는 핵심 장수를 배치하고 <span style="color:#8b5cf6; font-weight:bold;">[✨ AI 교정]</span>을 누르세요. AI는 유저의 배치를 최우선적으로 존중하며 해당 장수가 포함된 메타덱을 즉시 찾아 채워줍니다.</p>
                    <p><strong>2. 🛡️ 0티어 종결 전법 무조건 장착</strong><br>상위 부대의 전법 중복 사용 여부와 상관없이, 해당 무장과 진형에 가장 완벽한 0티어 종결 전법을 무조건 1순위로 장착합니다.</p>
                    <p><strong>3. 🛠️ 피드백 패널을 통한 타협 튜닝</strong><br>교정이 끝나면 각 부대 하단의 <span style="color:#fca5a5;">빨간색 피드백(상위 부대 사용)</span>을 확인하세요. 상위 부대가 이미 0티어 전법을 가져갔다면, 시스템이 제시하는 <b>대체 추천 전법</b>을 참고해 본인 상황에 맞게 수동으로 타협 변경하면 완성됩니다.</p>
                </div>
                <div style="margin-top:20px; text-align:right;">
                    <button onclick="closeGuideModal()" style="background:var(--bg-input); color:var(--text-main); border:1px solid var(--border-main); padding:6px 16px; border-radius:4px; cursor:pointer; font-weight:bold; transition: background 0.2s;">확인했습니다</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}
window.openGuideModal = () => { document.getElementById('guide-modal-overlay').style.display = 'flex'; };
window.closeGuideModal = () => { document.getElementById('guide-modal-overlay').style.display = 'none'; };

var injectCustomUIStyles = () => {
    if (document.getElementById('deck-custom-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'deck-custom-ui-styles';
    style.innerHTML = `
        .grid-layout { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px; }
        .deck-header-wrapper { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .deck-header-controls { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .deck-header-actions { display: flex; gap: 6px; }
        @media (max-width: 850px) { .grid-layout { grid-template-columns: 1fr; } .deck-header-wrapper { flex-direction: column; align-items: flex-start; gap: 10px; } .deck-card { padding: 10px !important; } }
        .deck-card select { background-color: var(--bg-input); color: var(--text-main); border: 1px solid var(--border-input); border-radius: 4px; padding: 6px 24px 6px 10px; font-size: 13px; width: 100%; box-sizing: border-box; font-family: inherit; transition: background-color 0.3s, color 0.3s; }
        .hawk-recommend-box { margin-top: 10px; padding: 12px; background-color: var(--bg-inner); border-left: 4px solid #3b82f6; border-radius: 6px; font-size: 13px; color: var(--text-desc); line-height: 1.5; transition: background-color 0.3s; }
        .equipment-box { margin-top: 6px; padding: 6px; border: 1px solid var(--border-main); border-radius: 4px; background-color: var(--bg-inner); font-size: 11px; color: var(--text-desc); transition: background-color 0.3s, border-color 0.3s; }
        .integrated-stats-box { margin-top: 6px; padding: 8px; border-radius: 4px; background-color: var(--bg-inner); border: 1px solid var(--border-main); font-size: 11px; transition: background-color 0.3s, border-color 0.3s; }
        .unit-badge { display: inline-block; background-color: rgba(245, 158, 11, 0.15); color: var(--text-highlight); font-size: 10px; padding: 3px 6px; border-radius: 4px; margin: 4px 0; }
        .feedback-item.success { color: var(--success-text); } .feedback-item.warning { color: var(--text-highlight); } .feedback-item.info { color: var(--text-muted); }
        #tactic-popup-modal { display: none; position: absolute; z-index: 9999; background: var(--bg-panel); border: 1px solid var(--border-main); padding: 12px; border-radius: 6px; width: 280px; color: var(--text-main); font-size: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .tactic-row { padding: 6px 12px; border-radius: 4px; margin-bottom: 4px; transition: all 0.2s; cursor: default; }
        .tactic-row select { width: 80%; margin: 0 auto; display: block; }
        .tactic-row.owned select { border: 1px solid var(--success-text); color: var(--success-text); background-color: var(--success-bg); }
        select option { background-color: var(--bg-panel) !important; color: var(--text-main) !important; font-weight: bold !important; }
        .tactic-row.missing { border: 1px dashed #f87171 !important; background-color: rgba(248, 113, 113, 0.05) !important; }
        .tactic-row.missing select { border: none; color: #fca5a5; background-color: transparent; }
    `;
    document.head.appendChild(style);
};

function loadDeckTextData() {
    try {
        const parsed = JSON.parse(localStorage.getItem('samguk_deck_text'));
        if (parsed?.length) {
            dynamicPresetDecks = parsed.slice(0, 5).map((d, i) => ({ ...defaultPresetDecks[i], ...d, originIdx: d.originIdx ?? i }));
            while(dynamicPresetDecks.length < 5) dynamicPresetDecks.push({...defaultPresetDecks[dynamicPresetDecks.length], originIdx: dynamicPresetDecks.length});
            return localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
        }
    } catch (e) {}
    dynamicPresetDecks = JSON.parse(JSON.stringify(defaultPresetDecks));
}

function updateDeckState(oIdx, prop, val, offIdx=null, slotIdx=null) {
    const d = dynamicPresetDecks.find(x => x.originIdx === oIdx);
    if (!d) return;
    if (prop === 'reset') { d.formation = "구행진"; d.unitType = ""; d.officers.forEach(o => { o.name = ""; o.chosenTactics = ["", ""]; }); }
    else if (offIdx !== null) slotIdx !== null ? d.officers[offIdx].chosenTactics[slotIdx] = val : d.officers[offIdx].name = val;
    else d[prop] = val;
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); renderDeckBuilder();
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

    // 🚨 1, 2군(상위 덱)에서 사용 중인 전법을 모조리 긁어옵니다. (타협 알고리즘 핵심)
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
                // 🚨 상위 부대 전법 배타적 잠금 로직: 현재 덱이나 상위 덱에서 쓰고 있으면 무조건 패스
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
        container.insertAdjacentHTML('beforeend', `
            <div style="display:flex; justify-content:flex-end; margin-bottom: 12px; margin-right: 4px;">
                <button onclick="openGuideModal()" style="background:#3b82f6; color:#fff; border:none; padding:6px 14px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:13px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">💡 사용 가이드 보기</button>
            </div>
        `);
        
        const saved = JSON.parse(localStorage.getItem('samguk_hobby_data') || '{}');
        const hMap = {}, tMap = {};
        const heroesList = Array.isArray(saved.heroes) ? saved.heroes : Object.values(saved.heroes || {});
        const tacticsList = Array.isArray(saved.tactics) ? saved.tactics : Object.values(saved.tactics || {});
        
        heroesList.forEach(x => { if(x && x.name) hMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });
        tacticsList.forEach(x => { if(x && x.name) tMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });

        let accumulatedHigherTacs = new Set();
        dynamicPresetDecks.sort((a,b) => (a.originIdx||0) - (b.originIdx||0)).forEach((deck, aIdx) => {
            const curNames = deck.officers.map(o => o?.name?.trim().replace(/\s+/g,'')).filter(Boolean);
            const match = getBestMetaMatch(curNames);
            
            const metaData = window.getMetaDeckData ? window.getMetaDeckData() : { metaDeckUnitTypeMap: {} };
            let dType = deck.unitType || (match?.bestMeta ? metaData.metaDeckUnitTypeMap[match.bestMeta.id] : "창병");

            const offHtml = deck.officers.map((off, oIdx) => {
                const hName = off?.name?.trim() || "", cName = cStr(hName);
                const dg = cName ? window.getOfficerDogamData(hName) : null;
                const isHeroOwned = cName ? !!hMap[cName]?.isOwned : false;
                const heroCssClass = isHeroOwned ? 'owned' : 'missing';
                const heroSpanColor = isHeroOwned ? 'var(--text-main)' : '#fca5a5';
                
                let tRows = `<div class="tactic-row ${heroCssClass}" style="border-left:3px solid var(--border-accent);"><span style="color:${heroSpanColor}; font-weight:bold;">⭐ ${dg?.uniqueTactic||'고유 전법'}</span></div>`;
                
                (off.chosenTactics||[]).forEach((t, sIdx) => {
                    const cT = cStr(t);
                    const isOwn = cT ? !!tMap[cT]?.isOwned : false;
                    const cssClass = cT ? (isOwn ? 'owned' : 'missing') : 'missing';
                    tRows += `<div class="tactic-row ${cssClass}"><select onchange="updateDeckState(${deck.originIdx},'tac',this.value,${oIdx},${sIdx})"><option value="">선택 안함</option>${window.getTacticListBridge().map(tx=>`<option value="${tx}" ${cT===cStr(tx)?'selected':''}>${tx}</option>`).join('')}</select></div>`;
                });

                const eq = cName ? getOfficerEquipment(hName, dType) : null;
                const eqH = eq ? `<div class="equipment-box"><div>🪖 ${eq.helmet.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.helmet.attr1}', '${eq.helmet.attr2}', '${eq.helmet.attr3}')">[${eq.helmet.attr1} / ${eq.helmet.attr2} / <span style="color:#f59e0b">${eq.helmet.attr3}</span>]</span></div><div>🛡️ ${eq.armor.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.armor.attr1}', '${eq.armor.attr2}', '${eq.armor.attr3}')">[${eq.armor.attr1} / ${eq.armor.attr2} / <span style="color:#f59e0b">${eq.armor.attr3}</span>]</span></div><div>📿 ${eq.accessory.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.accessory.attr1}', '${eq.accessory.attr2}', '${eq.accessory.attr3}')">[${eq.accessory.attr1} / ${eq.accessory.attr2} / <span style="color:#f59e0b">${eq.accessory.attr3}</span>]</span></div></div>` : '';

                return `<div class="officer-slot" draggable="true" ondragstart="handleOfficerDragStart(event,${deck.originIdx},${oIdx})" ondragover="handleOfficerDragOver(event)" ondragleave="handleOfficerDragLeave(event)" ondrop="handleOfficerDrop(event,${deck.originIdx},${oIdx})" ondragend="handleOfficerDragEnd(event)"><div style="display:flex;justify-content:space-between;"><span style="color:var(--text-highlight);font-size:11px;">${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}</span><select onchange="updateDeckState(${deck.originIdx},'off',this.value,${oIdx})"><option value="">선택 안함</option>${window.getOfficerNamesBridge().map(hx=>`<option value="${hx}" ${hName===hx?'selected':''}>${hx}</option>`).join('')}</select></div>${eqH}<div>${tRows}</div></div>`;
            }).join('');

            let statsHtmlInner = "";
            deck.officers.forEach((off, oIdx) => {
                const stats = aggregateIntegratedStats(deck, oIdx);
                statsHtmlInner += `<div>${buildIntegratedStatsHtml(stats)}</div>`;
            });

            const hawkData = window.getHawkDataFromGuide(match?.bestMeta?.id, curNames);
            const hawkRec = hawkData.recommendation;
            const hawkHtml = `<div class="hawk-recommend-box">🦅 <strong>추천 전투매: <span style="color:var(--text-highlight);">${hawkRec.name}</span></strong><br>💡 <span style="color:var(--text-muted);">${hawkRec.skill}</span></div>`;

            const fb = generateStructuredFeedback(deck, hMap, tMap, Array.from(accumulatedHigherTacs));
            const perfectionMsg = evaluateDeckPerfection(deck, match?.bestMeta?.id, hMap, tMap);
            let fbH = fb.logs.map(l=>`<div class="feedback-item ${l.type}">${l.text}</div>`).join('');

            deck.officers.forEach(o => (o?.chosenTactics || []).forEach(t => { if (t && cStr(t)) accumulatedHigherTacs.add(cStr(t)); }));
            
            const bondFeedback = `<div class="feedback-item info" style="margin-top:6px;">🤝 <strong>활성화 인연:</strong> <span style="color:var(--text-highlight);">${calculateActivatedBond(deck.officers)}</span></div>`;

            container.insertAdjacentHTML('beforeend', `<div class="deck-card" style="background-color:var(--bg-panel);border:1px solid var(--border-main);border-radius:8px;padding:16px;margin-bottom:16px; transition: background-color 0.3s, border-color 0.3s;">
                <div class="deck-header-wrapper">
                    <div class="deck-header-controls">
                        <button onclick="moveDeckAction(${aIdx},-1)" style="visibility:${aIdx>0?'visible':'hidden'}; background:var(--bg-inner); color:var(--text-main); border:1px solid var(--border-main); border-radius:3px; cursor:pointer; padding:2px 8px; font-size:12px;">▲</button>
                        <button onclick="moveDeckAction(${aIdx},1)" style="visibility:${aIdx<dynamicPresetDecks.length-1?'visible':'hidden'}; background:var(--bg-inner); color:var(--text-main); border:1px solid var(--border-main); border-radius:3px; cursor:pointer; padding:2px 8px; font-size:12px;">▼</button>
                        <span contenteditable="true" style="color:var(--text-main);font-weight:bold;font-size:18px;" onblur="updateDeckState(${deck.originIdx},'title',this.innerText.replace(/\\[추천도:.*?\\]/g,'').trim()||'${deck.title}')">${deck.title}</span>
                        
                        <select onchange="updateDeckState(${deck.originIdx},'formation',this.value)" style="margin-left:8px; width:auto; padding:2px 6px; font-weight:bold; background:var(--bg-inner); color:#38bdf8; border:1px solid var(--border-main); border-radius:4px; font-size:12px; cursor:pointer;">
                            ${Object.keys(FORMATIONS).map(f => `<option value="${f}" ${deck.formation===f?'selected':''}>${f}</option>`).join('')}
                        </select>
                        <select onchange="updateDeckState(${deck.originIdx},'unitType',this.value)" style="margin-left:4px; width:auto; padding:2px 6px; font-weight:bold; background:var(--bg-inner); color:#f59e0b; border:1px solid var(--border-main); border-radius:4px; font-size:12px; cursor:pointer;">
                            <option value="">병종 자동 판별</option>
                            ${['창병','기병','궁병','방패병'].map(u => `<option value="${u}" ${deck.unitType===u?'selected':''}>${u}</option>`).join('')}
                        </select>
                        
                        <span style="color:var(--text-highlight);font-size:13px;margin-left:8px;">[추천도: ${calculateStrictDeckScore(deck)}점]</span>
                    </div>
                    <div class="deck-header-actions">
                        <button onclick="autoFixDeck(${deck.originIdx})" style="background:#8b5cf6;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-weight:bold;">✨ AI 교정</button> 
                        <button onclick="updateDeckState(${deck.originIdx},'reset')" style="background:#ef4444;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-weight:bold;">초기화</button>
                    </div>
                </div>
                <div class="grid-layout">${offHtml}</div>
                <div class="grid-layout" style="margin-top:6px;">${statsHtmlInner}</div>
                <div style="margin-top:12px;">${hawkHtml}${fbH}${bondFeedback}${perfectionMsg}</div>
            </div>`);
        });
    } catch(e) { container.innerHTML = `<div style="color:red;padding:20px;">렌더링 에러: ${e.message}</div>`; }
}

if (!window.isOsiHooked) {
    var osi = localStorage.setItem;
    localStorage.setItem = function(k,v) { osi.apply(this,arguments); window.dispatchEvent(new CustomEvent('local-storage-update',{detail:{key:k}})); };
    window.isOsiHooked = true;
}

window.addEventListener('local-storage-update', e => { if(e.detail.key==='samguk_hobby_data') renderDeckBuilder(); });
window.addEventListener('storage', e => { if(e.key==='samguk_hobby_data') renderDeckBuilder(); });

document.addEventListener('DOMContentLoaded', () => { injectCustomUIStyles(); initGuideModal(); loadDeckTextData(); renderDeckBuilder(); });

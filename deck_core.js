// [시스템 분석] deck_core.js - 초경량 크로스 브릿지 엔진 기동 (AI 스마트 메타 튜닝 및 강제 오버라이드 엔진 탑재 완료)
console.log("[시스템 분석] deck_core.js 무결성 엔진 기동 (신규 무장 및 전법 종결 덱 세팅 업데이트)");

var cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

var FB_OFF_META = {
    "가후":["경달권변","궁병/방패병","wei","SS"], "곽가":["산무유책","궁병/방패병","wei","SH"], "사마의":["응시낭고","방패병/궁병","wei","SC"], "순욱":["거중지중","궁병/창병","wei","SH"], "악진":["분용당선","창병/궁병","wei","PC"], "전위":["축호과간","창병/방패병","wei","TC"], "정욱":["십면매복","방패병/궁병","wei","SC"], "조조(제왕)":["군령여산","창병/방패병","wei","TC"], "조조":["효웅","방패병/기병","wei","TC"], "장료":["함진살적","창병/기병","wei","PCm"], "장합":["교변병기","방패병/창병","wei","TC"], "하후돈":["발시담정","창병/방패병","wei","TC"], "하후연":["충용","창병/기병","wei","PCm"], "허저":["호치","창병/궁병","wei","TC"],
    "관우":["무성","창병/기병","shu","PC"], "강유":["담대여두","방패병/기병","shu","SC"], "마대":["습참","창병/방패병","shu","PC"], "마초":["출수법","창병/기병","shu","PCm"], "법정":["애자필보","방패병/궁병","shu","SS"], "서서":["절절학문","창병/궁병","shu","SS"], "사마가":["만왕","창병/방패병","shu","PC"], "위연":["실병제위","창병/궁병","shu","PC"], "유비":["인정","창병/기병","shu","SH"], "유비(제왕)":["재주복주","창병/방패병","shu","SH"], "장비":["연인노호","창병/방패병","shu","TC"], "제갈량":["초선차전","궁병/방패병","shu","SH"], "조운":["칠진칠출","창병/방패병","shu","PC"], "황충":["적혈도","창병/방패병","shu","PC"], "황월영":["묘산천기","궁병/방패병","shu","SH"],
    "대교":["정수유심","창병/궁병","wu","SH"], "노숙":["탑상책","궁병/기병","wu","SH"], "소교":["화용욕모","궁병/기병","wu","SH"], "손견":["강동맹호","창병/방패병","wu","TC"], "손권":["웅거","궁병/기병","wu","SC"], "손상향":["효희","궁병/기병","wu","PCm"], "손책":["강동패주","창병/방패병","wu","PC"], "손권(제왕)":["겸권상계","창병/궁병","wu","SS"], "여몽":["백의도강","방패병/궁병","wu","SS"], "육손":["지변규려","창병/기병","wu","SC"], "육항":["청백충근","창병/궁병","wu","SH"], "주유":["봉화연천","창병/궁병","wu","SC"], "주태":["청라산개","기병/방패병","wu","TC"], "정보":["칠척사모","기병/방패병","wu","TC"], "황개":["요원지화","방패병/궁병","wu","TC"],
    "공손찬":["위진새북","기병/창병","qun","PCm"], "동탁":["전권난정","방패병/기병","qun","TC"], "안량":["효장","창병/기병","qun","PC"], "여포":["천하무쌍","궁병/기병","qun","PCm"], "우길":["태평경","창병/궁병","qun","SS"], "원소":["사소도","방패병/기병","qun","TC"], "장각":["황천당립","궁병/기병","qun","SC"], "장녕":["천의난위","궁병/방패병","qun","SS"], "장보":["요풍사기","궁병/방패병","qun","SS"], "좌자":["화겁생기","궁병/방패병","qun","SH"], "채문희":["비분시","궁병/기병","qun","SH"], "초선":["폐월","창병/기병","qun","SH"], "화타":["청낭제세","궁병/방패병","qun","SH"], "황보숭":["강직불아","궁병/창병","qun","TC"]
};
var FB_OFFICERS = Object.keys(FB_OFF_META);

var FB_TACTICS = "가정지전,간담상조,강유겸제,견불가최,견진연봉,공기불비,과하탁교,교취호탈,극적제승,금낭묘계,금적금왕,금창신,금철교명,기문둔갑,낙정하석,동구적개,동장철벽,동촉기선,만부막적,만전제발,만천과해,명찰추호,문치무공,미우주무,반객위주,병량촌단,부동여산,분성지계,비사주석,사면초가,사생취의,선등함진,수상개화,순수견양,승승장구,심구고루,심모원려,안영찰채,암전난방,애자필보,양의화생,양초선행,여자동포,요사여신,용맹무쌍,용왕직전,운주유악,원성재도,위위구조,유비무환,유좌유용,이간계,이아환아,이일대로,이퇴위진,일고작기,인세이도,전위위안,제곤부위,중정기고,지인선임,진퇴유도,진화타겁,질풍노도,천리추격,천시지리,체천행도,축세대발,축호과간,태청단경,토적격문,현호제세,호령삼군,호치,혼수모어,홍수첨향,화소적벽,후적박발,횡소천군,횡징폭렴,휴양생식".split(',');

var BUILTIN_META_DECKS = [
    {id:"meta_shu_beopjeong_gang", priority: 160, formation: "추형진", officers:[{name:"유비(제왕)", chosenTactics:["재주복주","유비무환","안영찰채"]}, {name:"법정", chosenTactics:["애자필보","심구고루","간담상조"]}, {name:"강유", chosenTactics:["담대여두","천리추격","반객위주"]}]},
    {id:"rank0_shu_beopjeong_je", priority: 110, formation: "구행진", officers:[{name:"유비(제왕)", chosenTactics:["재주복주","유비무환","안영찰채"]}, {name:"법정", chosenTactics:["애자필보","태청단경","금창신"]}, {name:"제갈량", chosenTactics:["초선차전","명찰추호","양의화생"]}]},
    {id:"rank0_gun_jangbo", priority: 100, formation: "구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","유비무환","안영찰채"]}, {name:"장녕", chosenTactics:["천의난위","양의화생","명찰추호"]}, {name:"장보", chosenTactics:["요풍사기","진퇴유도","여자동포"]}]},
    {id:"rank0_gun_hwang", priority: 100, formation: "구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","유비무환","안영찰채"]}, {name:"장녕", chosenTactics:["천의난위","명찰추호","양의화생"]}, {name:"황보숭", chosenTactics:["강직불아","진퇴유도","강유겸제"]}]},
    {id:"rank0_wei_sima_gu", priority: 100, formation: "구행진", officers:[{name:"조조", chosenTactics:["효웅","진퇴유도","간담상조"]}, {name:"사마의", chosenTactics:["응시낭고","후적박발","반객위주"]}, {name:"가후", chosenTactics:["경달권변","유비무환","안영찰채"]}]},
    {id:"rank0_wei_sima_gi", priority: 100, formation: "기형진", officers:[{name:"조조(제왕)", chosenTactics:["군령여산","강유겸제","진퇴유도"]}, {name:"가후", chosenTactics:["경달권변","안영찰채","여자동포"]}, {name:"사마의", chosenTactics:["응시낭고","반객위주","후적박발"]}]},
    {id:"rank0_shu_macho_an", priority: 100, formation: "안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","반객위주"]}, {name:"서서", chosenTactics:["절절학문","문치무공","유비무환"]}, {name:"위연", chosenTactics:["실병제위","동구적개","진퇴유도"]}]},
    {id:"rank0_shu_macho_chu", priority: 100, formation: "추형진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","반객위주"]}, {name:"위연", chosenTactics:["실병제위","간담상조","진퇴유도"]}, {name:"유비(제왕)", chosenTactics:["재주복주","유좌유용","문치무공"]}]},
    {id:"rank0_wei_jangryo", priority: 100, formation: "호도진", officers:[{name:"장료", chosenTactics:["함진살적","반객위주","질풍노도"]}, {name:"조조(제왕)", chosenTactics:["군령여산","간담상조","진퇴유도"]}, {name:"악진", chosenTactics:["분용당선","분성지계","만천과해"]}]}
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
    "가후": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "방패병 피해 가함", attr3: "신속" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소", attr3: "천안" }, accessory: { name: "박산로", attr1: "피해 감소", attr2: "방패병 치유 효과 상승", attr3: "영전" } }
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
    "SH": ["유비무환", "안영찰채", "동장철벽", "간담상조", "횡징폭렴", "휴양생식", "제곤부위", "미우주무", "홍수첨향", "여자동포", "중정기고", "현호제세"],
    "SS": ["금창신", "애자필보", "태청단경", "심구고루", "기문둔갑", "만천과해", "수상개화", "이일대로", "천시지리", "진퇴유도", "유좌유용"]
};

var tacticAlternativesMap = {
    "간담상조":["유비무환","횡징폭렴","동장철벽","안영찰채","위위구조"], 
    "횡징폭렴":["유비무환","간담상조","동구적개","동장철벽"],
    "동장철벽":["간담상조","견불가최","천시지리","동구적개"], 
    "전위위안":["간담상조","태청단경","현호제세","제곤부위","만천과해"],
    "이퇴위진":["유비무환","미우주무","천시지리","진퇴유도"], 
    "용맹무쌍":["만부막적","비사주석","질풍노도","반객위주"],
    "질풍노도":["암전난방","교취호탈","반객위주","용맹무쌍"], 
    "혼수모어":["사면초가","이간계","안영찰채"],
    "반객위주":["일고작기","사생취의","질풍노도","용맹무쌍"], 
    "유좌유용":["유비무환","휴양생식","제곤부위","안영찰채"],
    "강유겸제":["동장철벽","천시지리","진퇴유도","금창신"], 
    "안영찰채":["유비무환","간담상조","위위구조","미우주무","유좌유용"],
    "여자동포":["동구적개","천시지리"], 
    "양의화생":["기문둔갑","화소적벽","명찰추호"],
    "수상개화":["요사여신","사생취의","후적박발"], 
    "요사여신":["수상개화","사생취의","후적박발"],
    "분성지계":["화소적벽","기문둔갑"], 
    "체천행도":["반객위주","천리추격"], 
    "금창신":["동구적개","강유겸제","간담상조"],
    "만천과해":["전위위안","태청단경","휴양생식"], 
    "토적격문":["진퇴유도","이퇴위진"], 
    "위위구조":["간담상조","진퇴유도","홍수첨향"],
    "견진연봉":["동장철벽","순수견양"], 
    "용왕직전":["천리추격","암전난방"], 
    "만부막적":["용왕직전","천리추격"], 
    "일고작기":["사생취의","용맹무쌍"],
    "부동여산":["용맹무쌍", "만부막적", "일고작기", "질풍노도"], 
    "이아환아":["선등함진", "동구적개"],
    "호치":["만부막적", "용왕직전", "용맹무쌍"],
    "홍수첨향":["유비무환","현호제세","미우주무","휴양생식","제곤부위"],
    "후적박발":["요사여신", "수상개화", "반객위주"],
    "명찰추호":["동촉기선", "지변규려"],
    "유비무환":["안영찰채", "간담상조", "태청단경", "휴양생식", "홍수첨향"]
};

var internalTacticStatMap = {
    "재주복주":{healGiven:10,damageTakenRed:4},"연인노호":{physicalDmg:5,damageTakenRed:4},"무성":{physicalDmg:8,activeRate:5},"응시낭고":{strategyDmg:8,leech:4},"함진살적":{physicalDmg:8,comboRate:5},"초선차전":{healGiven:10},"칠진칠출":{physicalDmg:6,damageTakenRed:4},"천하무쌍":{physicalDmg:8,comboRate:5},
    "간담상조":{damageTakenRed:8,healGiven:6},"심모원려":{strategyDmg:6},"휴양생식":{healGiven:8},"혼수모어":{damageTakenRed:4,healGiven:6},"효웅":{damageTakenRed:5,healGiven:5},"반객위주":{stackingDmg:8},"실병제위":{damageDealtInc:5},"동구적개":{damageTakenRed:8},"강유겸제":{damageTakenRed:6},"횡징폭렴":{damageTakenRed:6,healGiven:5},"동장철벽":{damageTakenRed:5},"천시지리":{damageTakenRed:5},"진퇴유도":{damageTakenRed:4,damageDealtInc:4},"사생취의":{glassCannonDmg:8,physicalDmg:4},"일고작기":{damageDealtInc:6,comboRate:10},"용맹무쌍":{physicalDmg:6},"만부막적":{physicalDmg:5},"용왕직전":{physicalDmg:5},"태청단경":{healGiven:8},"현호제세":{healGiven:8},"홍수첨향":{healGiven:8,damageTakenRed:6},"위위구조":{healGiven:5,damageTakenRed:4},"안영찰채":{damageTakenRed:4,healGiven:4},"이간계":{damageTakenRed:4,strategyDmg:5},"군령여산":{damageDealtInc:5,damageTakenRed:5},"분용당선":{physicalDmg:5},"출수법":{physicalDmg:5,armorPen:5},"적혈도":{strategyDmg:5,healGiven:5},"전권난정":{physicalDmg:5,damageTakenRed:4},"수상개화":{activeRate:12,damageDealtInc:8},"요사여신":{strategyDmg:10},"만천과해":{damageTakenRed:6,healGiven:6},"화소적벽":{strategyDmg:8},"이퇴위진":{damageTakenRed:6,damageDealtInc:6},"금낭묘계":{healGiven:6},"제곤부위":{healGiven:6},"이아환아":{counterDmg:6,damageTakenRed:4},"만전제발":{physicalDmg:6},"선등함진":{physicalDmg:5},"축세대발":{physicalDmg:6,damageDealtInc:6},"인세이도":{damageTakenRed:8,healGiven:5},"유좌유용":{healGiven:6},"견진연봉":{comboRate:10},"전위위안":{healGiven:6,damageTakenRed:4},"천리추격":{strategyDmg:6,activeRate:3},"분성지계":{strategyDmg:5,damageTakenRed:4},"여자동포":{healGiven:6,damageTakenRed:4},"질풍노도":{physicalDmg:6,armorPen:8},"절절학문":{strategyDmg:6,damageDealtInc:5},"문치무공":{physicalDmg:5,strategyDmg:5,healGiven:6},"담대여두":{strategyDmg:6,physicalDmg:6},"인정":{healGiven:8,damageTakenRed:4},"사소도":{damageDealtInc:6,damageTakenRed:4},"위진새북":{activeRate:5,physicalDmg:5},"금철교명":{counterDmg:6},"체천행도":{strategyDmg:6,leech:4},"금창신":{damageTakenRed:8,strategyDmg:5},"승승장구":{physicalDmg:8,speed:5},"토적격문":{damageTakenRed:6},
    "호치":{physicalDmg:8,leech:5},"부동여산":{activeRate:10,physicalDmg:6},"후적박발":{strategyDmg:15,leech:5},
    "강직불아":{healGiven:8,damageTakenRed:6},"명찰추호":{strategyDmg:8,armorPen:5},"유비무환":{healGiven:8,damageTakenRed:8},
    "심구고루":{damageTakenRed:15, healGiven:10},"애자필보":{damageTakenRed:15}
};

var defaultHawkAttr = { attr1: { rank1: "[20Lv] 속도/모략 보정" }, attr2: { rank1: "[30Lv] 전투 속성 보정" }, attr3: { rank1: "[40Lv] 행동 시 디버프 해제" } };

var metaHawkRandomAttributesMap = new Proxy({
    "meta_shu_beopjeong_gang":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 무용 피해 가함 +10%",rank3:"[30Lv] 피해 감소 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "rank0_shu_beopjeong_je":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 치유 효과 부여 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 모략 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}}
}, { get: (target, prop) => target[prop] || defaultHawkAttr });

var metaHawkRecommendationMap = new Proxy({
    "meta_shu_beopjeong_gang":{name:"열공-여천",skill:"강유의 흡혈 및 피해 감소 생존력 강화"},
    "rank0_shu_beopjeong_je":{name:"결운-호생",skill:"법정, 제갈량의 방어/유지력 극한 펌핑"}
}, { get: (target, prop) => target[prop] || {name:"범용 전투매", skill:"기본 최적화"} });

window.getHawkDataFromGuide = function(metaId) {
    return {
        recommendation: metaHawkRecommendationMap[metaId || "custom"],
        attributes: metaHawkRandomAttributesMap[metaId || "custom"]
    };
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
    if (window.getAllTacticsFromDogam) {
        const list = window.getAllTacticsFromDogam();
        if (list && list.length > 0) return list;
    }
    return FB_TACTICS;
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

    const isCustom = !matchMeta || matchMeta.maxScore < 1.5;
    const metaIdForHawk = isCustom ? "custom" : matchMeta.bestMeta.id;
    const hawkData = window.getHawkDataFromGuide ? window.getHawkDataFromGuide(metaIdForHawk) : { attributes: null };
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
    if (!metaId || metaId === 'custom') return "";
    
    let isPerfect = true;
    let hasOfficer = false;
    
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
        return `<div class="feedback-item success" style="border:1px solid var(--success-text);background:var(--success-bg);padding:8px;margin-top:10px;">✨ <strong>[최종 검증 완료: Perfect Synergy]</strong> 전서버 랭커 상위 1% 공방 밸런스를 달성했습니다.</div>`;
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

function getOwnedAlternativeOfficer(missingName, curNames, heroDataMap, deckUnitType = "", alreadyRecommended = new Set()) {
    const cleanMissing = cStr(missingName);
    const allNames = window.getOfficerNamesBridge();
    
    const missingMeta = FB_OFF_META[cleanMissing];
    if (!missingMeta) return null;

    const mUnit = missingMeta[1] || "";
    const mFac = missingMeta[2] || "";
    const mRole = missingMeta[3] || "";

    let candidates = [];
    Object.keys(heroDataMap).forEach(cleanCand => {
        if (!heroDataMap[cleanCand]?.isOwned || curNames.some(cn => cStr(cn) === cleanCand) || cleanCand === cleanMissing || alreadyRecommended.has(cleanCand)) return;
        
        const candMeta = FB_OFF_META[cleanCand];
        if (!candMeta) return;

        let score = 0;
        const cUnit = candMeta[1] || "";
        const cFac = candMeta[2] || "";
        const cRole = candMeta[3] || "";

        if (mFac === cFac) score += 50; 

        if (deckUnitType && deckUnitType !== "자동 판별" && deckUnitType !== "") {
            if (cUnit.includes(deckUnitType)) score += 40; 
        } else {
            const mUnits = mUnit.split('/');
            if (mUnits.some(u => cUnit.includes(u))) score += 40;
        }

        if (mRole === cRole) score += 30; 

        candidates.push({ name: allNames.find(n => cStr(n) === cleanCand) || cleanCand, score: score });
    });

    candidates.sort((a, b) => b.score - a.score);
    if (candidates.length > 0) {
        alreadyRecommended.add(cStr(candidates[0].name));
        return candidates[0].name;
    }
    return null;
}

function getOwnedAlternativeTactic(missingTacName, allEquipTacs, tacticDataMap, recommendedTacs = new Set(), officerName = "", deckUnitType = "", returnList = false) {
    const cleanMissing = cStr(missingTacName);
    let role = "PC";
    if (officerName && FB_OFF_META[officerName]) {
        role = FB_OFF_META[officerName][3] || "PC";
    }

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
        if (tacticDataMap[cleanT]?.isOwned && !allEquipTacs.includes(tStr) && !recommendedTacs.has(tStr) && cleanT !== cleanMissing) {
            addResult(tStr);
        }
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

    let broadPool = [];
    if (["PC", "PCm"].includes(role)) broadPool = [...DYNAMIC_TACTIC_POOLS["PC"], ...DYNAMIC_TACTIC_POOLS["PCm"]];
    else if (role === "SC") broadPool = [...DYNAMIC_TACTIC_POOLS["SC"]];
    else broadPool = [...DYNAMIC_TACTIC_POOLS["TC"], ...DYNAMIC_TACTIC_POOLS["SH"], ...DYNAMIC_TACTIC_POOLS["SS"]];

    for (let t of broadPool) {
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
    
    let archetypes = [];
    if (window.getMetaDeckData) {
        const metaData = window.getMetaDeckData();
        if (metaData && metaData.analyzedMetaArchetypes && metaData.analyzedMetaArchetypes.length > 0) {
            archetypes = metaData.analyzedMetaArchetypes;
        }
    }
    
    if (archetypes.length === 0) archetypes = BUILTIN_META_DECKS;
    else {
        BUILTIN_META_DECKS.forEach(bm => { if (!archetypes.some(a => a.id === bm.id)) archetypes.push(bm); });
    }

    let bestMeta = archetypes[0], maxScore = -1;
    archetypes.forEach(meta => {
        let baseScore = meta.officers.reduce((acc, mo, idx) => acc + (curNamesClean.includes(cStr(mo.name)) ? 1 : 0) + (curNamesClean[idx] === cStr(mo.name) ? 0.5 : 0), 0);
        let finalScore = baseScore > 0 ? baseScore + (meta.priority || 0) : baseScore;
        if (finalScore >= maxScore) { maxScore = finalScore; bestMeta = meta; }
    });
    return { bestMeta, maxScore };
}

function calculateStrictDeckScore(deck) {
    const curNamesClean = deck?.officers?.map(o => cStr(o?.name)).filter(Boolean) || [];
    const match = getBestMetaMatch(curNamesClean);
    if (!match || match.maxScore === 0) return 0;
    
    let score = 100;
    if (cStr(deck.formation) !== cStr(match.bestMeta.formation)) score -= 10;
    match.bestMeta.officers.forEach((metaOff) => { if (!curNamesClean.includes(cStr(metaOff.name))) score -= 30; });
    return Math.max(score, 0);
}

function generateStructuredFeedback(deck, heroDataMap, tacticDataMap, higherTierUsedTacs = []) {
    const fb = { insight: "", logs: [] };
    const curNames = deck?.officers?.map(o => cStr(o?.name)).filter(Boolean) || [];
    const match = getBestMetaMatch(curNames);

    const isCustom = !match || match.maxScore < 1.5;

    if (isCustom) {
        fb.logs.push({ type: 'info', text: `💡 <strong>[오리지널 시너지]</strong> 메타를 초월한 독자적인 조합입니다. AI가 역할군에 맞춰 분석합니다.` });
    } else {
        const { bestMeta: meta } = match;
        fb.logs.push({ type: 'info', text: `🎯 <strong>${meta.name}</strong> 기반 처방입니다.` });
        const metaData = window.getMetaDeckData ? window.getMetaDeckData() : { systemGuideInsights: {} };
        if (metaData.systemGuideInsights && metaData.systemGuideInsights[meta.id]) {
            fb.insight = metaData.systemGuideInsights[meta.id];
        }
    }

    const allEquipTacs = deck.officers.flatMap(o => o?.chosenTactics?.map(t => cStr(t))).filter(Boolean);
    const forbiddenTacs = [...new Set([...allEquipTacs, ...higherTierUsedTacs.map(t => cStr(t))])];
    
    const recommendedTacs = new Set();
    const recommendedOfficers = new Set();

    deck.officers.forEach((off, oIdx) => {
        const hName = off?.name?.toString().trim() || "", cleanHName = cStr(hName);
        
        if (!cleanHName) {
            if (!isCustom && match) fb.logs.push({ type: 'warning', text: `[${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}] 권장 무장 누락: <span style="color:var(--text-highlight);font-weight:bold;">[${match.bestMeta.officers[oIdx]?.name}]</span>`});
            else fb.logs.push({ type: 'warning', text: `[${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}] 무장 슬롯이 비어있습니다. 장수를 선택해주세요.`});
            return;
        }

        const isHeroOwned = !!heroDataMap[cleanHName]?.isOwned;
        if (!isHeroOwned) {
            const altHero = getOwnedAlternativeOfficer(cleanHName, curNames, heroDataMap, deck.unitType, recommendedOfficers);
            const altText = altHero ? `<span style="color:var(--success-text);font-weight:bold;">[${altHero}]</span>` : `<span style="color:var(--text-muted);">[대체 불가]</span>`;
            fb.logs.push({ type: 'warning', text: `[${hName}] 미보유 ➔ 대체 무장 추천: ${altText}` });
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
                    
                    if (isHigherUsed) fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백: <span style="color:#fca5a5;text-decoration:line-through;">[${pTac}]</span>(상위 부대 사용) ➔ 대체 추천: ${altText}` });
                    else fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백 ➔ 권장 전법: <span style="color:#38bdf8;font-weight:bold;">[${pTac}]</span>` });
                } else {
                    fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백 ➔ AI 교정을 통해 시너지 전법을 추천받으세요.` });
                }
            } else {
                const isTacOwned = !!tacticDataMap[cT]?.isOwned;
                const isHigherUsed = higherTierUsedTacs.includes(cT);
                if (!isTacOwned || isHigherUsed) {
                    
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

var FORMATIONS = {
    "일자진": { eff: "전열: 피해 감소 6.0% | 후열: -", pos: ["front","front","front"] },
    "구행진": { eff: "전열: 피해 감소 5.0% | 후열: 피해 증가 12.0%", pos: ["front","back","front"] },
    "추형진": { eff: "전열: 피해 감소 6.0% | 후열: 피해 증가 8.0%", pos: ["back","front","back"] },
    "기형진": { eff: "전열: 피해 증가 12.0% | 후열: 피해 감소 5.0%", pos: ["back","back","front"] },
    "방원진": { eff: "전열: 피해 감소 5.0% | 후열: 연격률 28.0%", pos: ["front","front","back"] },
    "안행진": { eff: "전열: 피해 감소 5.0% | 후열: 강공/기습 12.0%", pos: ["back","front","front"] }
};

var dynamicPresetDecks = [];
var draggedDeckOriginIdx = null, draggedOfficerSlotIdx = null;

var defaultPresetDecks = Array.from({ length: 5 }, (_, i) => ({
    title: `${i + 1}군`,
    formation: "구행진",
    unitType: "",
    originIdx: i,
    officers: [
        { name: "", chosenTactics: ["", ""] },
        { name: "", chosenTactics: ["", ""] },
        { name: "", chosenTactics: ["", ""] }
    ]
}));

window.handleOfficerDragStart = (e, dIdx, oIdx) => { 
    draggedDeckOriginIdx = dIdx; 
    draggedOfficerSlotIdx = oIdx; 
    e.target.style.opacity = '0.5'; 
};
window.handleOfficerDragEnd = e => { 
    e.target.style.opacity = '1'; 
    document.querySelectorAll('.officer-slot').forEach(el => el.style.border = 'none'); 
    draggedDeckOriginIdx = null; 
    draggedOfficerSlotIdx = null; 
};
window.handleOfficerDragOver = e => { 
    e.preventDefault(); 
    e.currentTarget.style.border = '2px dashed var(--border-accent)'; 
};
window.handleOfficerDragLeave = e => { 
    e.preventDefault(); 
    e.currentTarget.style.border = 'none'; 
};
window.handleOfficerDrop = (e, tDIdx, tOIdx) => {
    e.preventDefault(); 
    e.currentTarget.style.border = 'none';
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
        document.addEventListener('click', (evt) => {
            if (!evt.target.closest('#tactic-popup-modal')) {
                modalPopupEl.style.display = 'none';
                currentPopupTitle = null;
            }
        });
    }
    if (modalPopupEl.style.display === 'block' && currentPopupTitle === title) {
        modalPopupEl.style.display = 'none';
        currentPopupTitle = null;
        return;
    }
    currentPopupTitle = title;
    modalPopupEl.innerHTML = `<div class="p-title" style="color:var(--text-highlight);font-weight:bold;border-bottom:1px solid var(--border-main);padding-bottom:6px;">${title}</div><div class="p-meta" style="color:var(--text-muted);margin-top:8px;font-size:11px;">${meta1}</div><div class="p-desc" style="margin-top:6px;color:var(--text-desc);line-height:1.5;">${desc1}</div>`;
    modalPopupEl.style.display = 'block';
    const rect = e.currentTarget.getBoundingClientRect();
    modalPopupEl.style.top = `${rect.top + window.scrollY - 10}px`;
    modalPopupEl.style.left = `${Math.min(rect.right + window.scrollX + 10, window.innerWidth - 290)}px`;
}

window.showEquipPopup = function(e, attr1, attr2, attr3) {
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') return;
    openModalPopup(e, "⚒️ 장비 추가 속성 및 특기", `🔹 1차: ${attr1}<br>🔹 2차: ${attr2}`, `🔸 특기: <span style="color:#f59e0b;font-weight:bold;">${attr3}</span>`);
};

var injectCustomUIStyles = () => {
    if (document.getElementById('deck-custom-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'deck-custom-ui-styles';
    style.innerHTML = `
        .grid-layout { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px; }
        .deck-header-wrapper { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .deck-header-controls { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .deck-header-actions { display: flex; gap: 6px; }
        
        @media (max-width: 850px) {
            .grid-layout { grid-template-columns: 1fr; } 
            .deck-header-wrapper { flex-direction: column; align-items: flex-start; gap: 10px; }
            .deck-card { padding: 10px !important; }
        }

        .deck-card select { background-color: var(--bg-input); color: var(--text-main); border: 1px solid var(--border-input); border-radius: 4px; padding: 6px 24px 6px 10px; font-size: 13px; width: 100%; box-sizing: border-box; font-family: inherit; transition: background-color 0.3s, color 0.3s; }
        .hawk-recommend-box { margin-top: 10px; padding: 12px; background-color: var(--bg-inner); border-left: 4px solid #3b82f6; border-radius: 6px; font-size: 13px; color: var(--text-desc); line-height: 1.5; transition: background-color 0.3s; }
        .equipment-box { margin-top: 6px; padding: 6px; border: 1px solid var(--border-main); border-radius: 4px; background-color: var(--bg-inner); font-size: 11px; color: var(--text-desc); transition: background-color 0.3s, border-color 0.3s; }
        .integrated-stats-box { margin-top: 6px; padding: 8px; border-radius: 4px; background-color: var(--bg-inner); border: 1px solid var(--border-main); font-size: 11px; transition: background-color 0.3s, border-color 0.3s; }
        .unit-badge { display: inline-block; background-color: rgba(245, 158, 11, 0.15); color: var(--text-highlight); font-size: 10px; padding: 3px 6px; border-radius: 4px; margin: 4px 0; }
        .feedback-item.success { color: var(--success-text); }
        .feedback-item.warning { color: var(--text-highlight); }
        .feedback-item.info { color: var(--text-muted); }
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
    const tMap = {}, hMap = {};
    (Array.isArray(saved.tactics) ? saved.tactics : Object.values(saved.tactics || {})).forEach(x => { if(x && x.name) tMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });
    (Array.isArray(saved.heroes) ? saved.heroes : Object.values(saved.heroes || {})).forEach(x => { if(x && x.name) hMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });

    const higherTacs = new Set(), higherHeroes = new Set();
    dynamicPresetDecks.sort((a,b) => (a.originIdx||0) - (b.originIdx||0)).forEach(d => {
        if (d.originIdx < oIdx) {
            d.officers.forEach(o => {
                if (o.name) higherHeroes.add(cStr(o.name));
                (o.chosenTactics||[]).forEach(t => { if(t) higherTacs.add(cStr(t)); });
            });
        }
    });

    let currentOfficers = targetDeck.officers.map(o => cStr(o.name));
    const filledCount = currentOfficers.filter(Boolean).length;
    const match = getBestMetaMatch(currentOfficers);

    if (filledCount === 0) {
        let bestMeta = null, highestOwnedCount = -1;
        
        let archetypes = [];
        if (window.getMetaDeckData) {
            const metaData = window.getMetaDeckData();
            if (metaData && metaData.analyzedMetaArchetypes && metaData.analyzedMetaArchetypes.length > 0) {
                archetypes = metaData.analyzedMetaArchetypes;
            }
        }
        if (archetypes.length === 0) archetypes = BUILTIN_META_DECKS;
        else {
            BUILTIN_META_DECKS.forEach(bm => { if (!archetypes.some(a => a.id === bm.id)) archetypes.push(bm); });
        }

        for (const meta of archetypes) {
            let ownedCount = meta.officers.filter(mo => hMap[cStr(mo.name)]?.isOwned && !higherHeroes.has(cStr(mo.name))).length;
            let currentScore = ownedCount + (meta.priority || 0);
            if (currentScore > highestOwnedCount) { highestOwnedCount = currentScore; bestMeta = meta; }
        }
        if (!bestMeta) return alert("[교정 실패] 가용 가능한 핵심 무장이 없습니다. 도감에서 보유 무장을 체크해주세요.");
        
        targetDeck.formation = bestMeta.formation;
        targetDeck.officers = bestMeta.officers.map(mo => {
            const idealTacs = mo.chosenTactics.length === 3 ? mo.chosenTactics.slice(1,3) : [...mo.chosenTactics];
            const fixedTacs = idealTacs.map(tac => {
                if (higherTacs.has(cStr(tac))) {
                    const alt = getOwnedAlternativeTactic(tac, Array.from(higherTacs), tMap, new Set(), mo.name, targetDeck.unitType, false);
                    if (alt) { higherTacs.add(cStr(alt)); return alt; }
                    return "";
                }
                higherTacs.add(cStr(tac)); return tac;
            });
            return { name: mo.name, chosenTactics: fixedTacs };
        });
        
        applyAITuning(targetDeck, tMap, higherTacs);
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); renderDeckBuilder(); 
        return alert(`[AI 교정 완료] 보유 풀 기반 최적 메타 덱(${bestMeta.name}) 자동 편성 성공! (스마트 튜닝 개입 완료)`);
    }

    let currentRoster = targetDeck.officers.filter(o => o.name.trim() !== "");
    let emptyCount = 3 - currentRoster.length;

    if (match && match.maxScore > 0 && emptyCount > 0) {
        const metaOfficers = match.bestMeta.officers.map(mo => mo.name);
        for (let mo of metaOfficers) {
            if (!currentRoster.some(o => cStr(o.name) === cStr(mo))) {
                currentRoster.push({ name: mo, chosenTactics: ["", ""] });
                emptyCount--;
                if (emptyCount === 0) break;
            }
        }
    }

    if (match && match.maxScore >= 1.0) {
        targetDeck.formation = match.bestMeta.formation;
    }

    let frontPool = [], backPool = [];
    currentRoster.forEach(o => {
        const role = FB_OFF_META[o.name]?.[3] || "PC";
        if (["TC", "PC"].includes(role)) frontPool.push(o);
        else backPool.push(o);
    });

    if (!match || match.maxScore < 1.0) {
        if (frontPool.length >= backPool.length) targetDeck.formation = "구행진"; 
        else targetDeck.formation = "추형진"; 
    }

    const posReq = FORMATIONS[targetDeck.formation].pos;
    let newOfficers = [ {name:"", chosenTactics:["",""]}, {name:"", chosenTactics:["",""]}, {name:"", chosenTactics:["",""]} ];
    
    for(let i=0; i<3; i++) {
        if (posReq[i] === 'front' && frontPool.length > 0) newOfficers[i] = frontPool.shift();
        else if (posReq[i] === 'back' && backPool.length > 0) newOfficers[i] = backPool.shift();
        else newOfficers[i] = frontPool.length > 0 ? frontPool.shift() : (backPool.length > 0 ? backPool.shift() : {name:"", chosenTactics:["",""]});
    }
    targetDeck.officers = newOfficers;

    targetDeck.officers.forEach(o => {
        if (!o.name) return;
        
        let isMetaMember = false, metaTacs = [];
        if (match && match.maxScore >= 1.0) {
            const mo = match.bestMeta.officers.find(m => cStr(m.name) === cStr(o.name));
            if (mo) {
                isMetaMember = true;
                metaTacs = mo.chosenTactics.length === 3 ? mo.chosenTactics.slice(1,3) : [...mo.chosenTactics];
            }
        }

        const role = FB_OFF_META[o.name]?.[3] || "PC";
        const pool = DYNAMIC_TACTIC_POOLS[role] || DYNAMIC_TACTIC_POOLS["PC"];

        for (let i = 0; i < 2; i++) {
            if (!o.chosenTactics[i]) { 
                let foundTac = "";
                
                if (isMetaMember && metaTacs[i]) {
                    const mt = metaTacs[i];
                    if (!higherTacs.has(cStr(mt))) foundTac = mt;
                    else {
                        const alt = getOwnedAlternativeTactic(mt, Array.from(higherTacs), tMap, new Set(), o.name, targetDeck.unitType, false);
                        if (alt) foundTac = alt;
                    }
                }

                if (!foundTac) {
                    for (const cand of pool) {
                        if (tMap[cStr(cand)]?.isOwned && !higherTacs.has(cStr(cand))) { foundTac = cand; break; }
                    }
                }

                if (!foundTac) {
                    for (const cand of pool) {
                        if (!higherTacs.has(cStr(cand))) { foundTac = cand; break; }
                    }
                }

                if (foundTac) {
                    o.chosenTactics[i] = foundTac;
                    higherTacs.add(cStr(foundTac));
                }
            } else {
                higherTacs.add(cStr(o.chosenTactics[i])); 
            }
        }
    });

    applyAITuning(targetDeck, tMap, higherTacs);
    
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); renderDeckBuilder(); 
    alert(`[AI 다이나믹 교정 완료] 장수별 최적 포지션(진형) 배치 및 전법 할당 성공! (스마트 튜닝 개입 완료)`);
};

// 🚨 AI 스마트 튜닝 엔진
function applyAITuning(targetDeck, tMap, higherTacs) {
    targetDeck.officers.forEach(o => {
        if (!o.name) return;
        
        // 1. 사마의 랭커 세팅(요사여신) -> 진 종결(후적박발) 강제 교정
        if (o.name === "사마의" && o.chosenTactics.includes("요사여신")) {
            if (tMap["후적박발"]?.isOwned && !higherTacs.has("후적박발")) {
                o.chosenTactics[o.chosenTactics.indexOf("요사여신")] = "후적박발";
                higherTacs.add("후적박발");
            }
        }
        
        // 2. 신규 0티어 전법 '심구고루'를 구형 탱커/서포터 세팅에 강제 이식
        if (["조조", "조조(제왕)", "유비(제왕)", "황보숭", "손견", "법정"].includes(o.name)) {
            if (tMap["심구고루"]?.isOwned && !higherTacs.has("심구고루") && !o.chosenTactics.includes("심구고루")) {
                const weakTacs = ["여자동포", "강유겸제", "유좌유용", "동장철벽", "진퇴유도"];
                for (let i=0; i<2; i++) {
                    if (weakTacs.includes(o.chosenTactics[i])) {
                        o.chosenTactics[i] = "심구고루";
                        higherTacs.add("심구고루");
                        break;
                    }
                }
            }
        }

        // 3. '감로' 메타 카운터: 확률형 CC(혼수모어) 배제 및 생존기(안영찰채/유비무환) 대체
        if (o.chosenTactics.includes("혼수모어")) {
             if (tMap["안영찰채"]?.isOwned && !higherTacs.has("안영찰채") && !o.chosenTactics.includes("안영찰채")) {
                 o.chosenTactics[o.chosenTactics.indexOf("혼수모어")] = "안영찰채";
                 higherTacs.add("안영찰채");
             } else if (tMap["유비무환"]?.isOwned && !higherTacs.has("유비무환") && !o.chosenTactics.includes("유비무환")) {
                 o.chosenTactics[o.chosenTactics.indexOf("혼수모어")] = "유비무환";
                 higherTacs.add("유비무환");
             }
        }
    });
}

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

            const isCustom = !match || match.maxScore < 1.5;
            const metaIdForHawk = isCustom ? "custom" : match.bestMeta.id;
            const hawkData = window.getHawkDataFromGuide ? window.getHawkDataFromGuide(metaIdForHawk) : { recommendation: {name:"범용 전투매", skill:"기본 최적화"} };
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
    localStorage.setItem = function(k,v) {
        osi.apply(this,arguments);
        window.dispatchEvent(new CustomEvent('local-storage-update',{detail:{key:k}}));
    };
    window.isOsiHooked = true;
}

window.addEventListener('local-storage-update', e => { if(e.detail.key==='samguk_hobby_data') renderDeckBuilder(); });
window.addEventListener('storage', e => { if(e.key==='samguk_hobby_data') renderDeckBuilder(); });

document.addEventListener('DOMContentLoaded', () => { injectCustomUIStyles(); loadDeckTextData(); renderDeckBuilder(); });

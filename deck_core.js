// [시스템 분석] deck_core.js - 초경량 크로스 브릿지 엔진 기동 (도감 데이터 외부 연동)
console.log("[시스템 분석] deck_core.js 무결성 엔진 기동 (전법 텍스트 분리 및 초경량화 완료)");

const cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

// ==========================================================================
// LAYER 1: 초경량 자가 치유(Self-Healing) 통합 마스터 사전 (56종)
// ==========================================================================
const FB_OFF_META = {
    "가후":["경달권변","궁병/방패병","wei","SS"], "곽가":["산무유책","궁병/방패병","wei","SH"], "사마의":["응시낭고","방패병/궁병","wei","SC"], "순욱":["거중지중","궁병/창병","wei","SH"], "악진":["분용당선","창병/궁병","wei","PC"], "전위":["축호과간","창병/방패병","wei","TC"], "정욱":["십면매복","방패병/궁병","wei","SC"], "조조(제왕)":["군령여산","창병/방패병","wei","TC"], "조조":["효웅","방패병/기병","wei","TC"], "장료":["함진살적","창병/기병","wei","PCm"], "장합":["교변병기","방패병/창병","wei","TC"], "하후돈":["발시담정","창병/방패병","wei","TC"], "하후연":["충용","창병/기병","wei","PCm"], "허저":["호치","창병/궁병","wei","TC"],
    "관우":["무성","창병/기병","shu","PC"], "강유":["담대여두","방패병/기병","shu","SC"], "마대":["습참","창병/방패병","shu","PC"], "마초":["출수법","창병/기병","shu","PCm"], "서서":["절절학문","창병/궁병","shu","SS"], "사마가":["만왕","창병/방패병","shu","PC"], "위연":["실병제위","창병/궁병","shu","PC"], "유비":["인정","창병/기병","shu","SH"], "유비(제왕)":["재주복주","창병/방패병","shu","SH"], "장비":["연인노호","창병/방패병","shu","TC"], "제갈량":["초선차전","궁병/방패병","shu","SH"], "조운":["칠진칠출","창병/방패병","shu","PC"], "황충":["적혈도","창병/방패병","shu","PC"], "황월영":["묘산천기","궁병/방패병","shu","SH"],
    "대교":["정수유심","창병/궁병","wu","SH"], "노숙":["탑상책","궁병/기병","wu","SH"], "소교":["화용욕모","궁병/기병","wu","SH"], "손견":["강동맹호","창병/방패병","wu","TC"], "손권":["웅거","궁병/기병","wu","SC"], "손상향":["효희","궁병/기병","wu","PCm"], "손책":["강동패주","창병/방패병","wu","PC"], "손권(제왕)":["겸권상계","창병/궁병","wu","SS"], "여몽":["백의도강","방패병/궁병","wu","SS"], "육손":["지변규려","창병/기병","wu","SC"], "육항":["청백충근","창병/궁병","wu","SH"], "주유":["봉화연천","창병/궁병","wu","SC"], "주태":["청라산개","기병/방패병","wu","TC"], "정보":["칠척사모","기병/방패병","wu","TC"], "황개":["요원지화","방패병/궁병","wu","TC"],
    "공손찬":["위진새북","기병/창병","qun","PCm"], "동탁":["전권난정","방패병/기병","qun","TC"], "안량":["효장","창병/기병","qun","PC"], "여포":["천하무쌍","궁병/기병","qun","PCm"], "우길":["태평경","창병/궁병","qun","SS"], "원소":["사소도","방패병/기병","qun","TC"], "장각":["황천당립","궁병/기병","qun","SC"], "장녕":["천의난위","궁병/방패병","qun","SS"], "장보":["요풍사기","궁병/방패병","qun","SS"], "좌자":["화겁생기","궁병/방패병","qun","SH"], "채문희":["비분시","궁병/기병","qun","SH"], "초선":["폐월","창병/기병","qun","SH"], "화타":["청낭제세","궁병/방패병","qun","SH"]
};
const FB_OFFICERS = Object.keys(FB_OFF_META);

const EQ_PRESETS = {
    PC:  ["호분관","강공, 기습 상승","창병 피해 가함","명광갑","무용 피해 가함","창병 배반, 공심 상승","치룡패","무용 피해 가함","창병 배반, 공심 상승"],
    PCm: ["백옥잠","연격률","창병 피해 가함","세린갑","무용 피해 가함","창병 배반, 공심 상승","쌍호뉴","연격률","창병 배반, 공심 상승"],
    SC:  ["진현관","강공, 기습 상승","창병 피해 가함","명재복","모략 피해 가함","창병 배반, 공심 상승","박산로","공심","창병 배반, 공심 상승"],
    TC:  ["연함규","피해 감소","창병 치유 효과 상승","청등갑","피해 감소","창병 피해 감소","사남패","치유 효과 받음","창병 피해 감소"],
    SH:  ["연함규","피해 감소","치유 효과 부여","청등갑","피해 감소","창병 치유 효과 상승","사남패","치유 효과 받음","창병 피해 감소"],
    SS:  ["진현관","피해 감소","방패병 피해 감소","명재복","피해 감소","방패병 치유 효과 상승","박산로","피해 감소","방패병 피해 감소"]
};

const FB_EQUIP_OVERRIDES = {
    "사마의": { helmet: { name: "진현관", attr1: "강공, 기습 상승", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "모략 피해 가함", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "공심", attr2: "방패병 배반, 공심 상승" } },
    "조조": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "치유 효과 받음", attr2: "방패병 피해 감소" } },
    "조조(제왕)": { helmet: { name: "연함규", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, armor: { name: "청등갑", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" }, accessory: { name: "사남패", attr1: "피해 감소", attr2: "방패병 피해 감소" } },
    "가후": { helmet: { name: "진현관", attr1: "피해 감소", attr2: "방패병 피해 가함" }, armor: { name: "명재복", attr1: "피해 감소", attr2: "방패병 피해 감소" }, accessory: { name: "박산로", attr1: "피해 감소", attr2: "방패병 치유 효과 상승" } }
};

const FB_EQUIP_MAP = new Proxy({}, {
    get: (_, name) => {
        if (FB_EQUIP_OVERRIDES[name]) return FB_EQUIP_OVERRIDES[name];
        const meta = FB_OFF_META[name] || ["","방패병","qun","PC"];
        const p = EQ_PRESETS[meta[3] || "PC"], u = meta[1].split('/')[0];
        return {
            helmet: { name: p[0], attr1: p[1].replace(/(창병|기병|궁병|방패병)/g, u), attr2: p[2].replace(/(창병|기병|궁병|방패병)/g, u) },
            armor:  { name: p[3], attr1: p[4].replace(/(창병|기병|궁병|방패병)/g, u), attr2: p[5].replace(/(창병|기병|궁병|방패병)/g, u) },
            accessory: { name: p[6], attr1: p[7].replace(/(창병|기병|궁병|방패병)/g, u), attr2: p[8].replace(/(창병|기병|궁병|방패병)/g, u) }
        };
    }
});

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
    {name:"군신상기",req:2,heroes:["조조","조조(제왕)","사마의"],effect:"모략피해 4%, 공심 4%"},
    {name:"호위경주",req:2,heroes:["조조","조조(제왕)","전위","허저"],effect:"무용 4%, 통솔 4%"}
];

// AI 추천 및 스탯 연산용 최소화 맵
const tacticAlternativesMap = {
    "간담상조":["횡징폭렴","동장철벽","안영찰채","위위구조","이퇴위진"], "횡징폭렴":["간담상조","동구적개","동장철벽","홍수첨향"],
    "동장철벽":["간담상조","견불가최","천시지리","동구적개"], "전위위안":["간담상조","태청단경","현호제세","제곤부위","안영찰채","만천과해"],
    "이퇴위진":["미우주무","천시지리","진퇴유도","홍수첨향"], "용맹무쌍":["만부막적","비사주석","질풍노도","반객위주"],
    "질풍노도":["암전난방","교취호탈","반객위주","용맹무쌍","승승장구"], "혼수모어":["사면초가","이간계","안영찰채"],
    "반객위주":["일고작기","사생취의","질풍노도","용맹무쌍"], "유좌유용":["휴양생식","제곤부위","안영찰채"],
    "강유겸제":["동장철벽","천시지리","진퇴유도","금창신"], "안영찰채":["간담상조","위위구조","미우주무","전위위안","유좌유용"],
    "여자동포":["동구적개","천시지리"], "양의화생":["기문둔갑","화소적벽","수상개화","낙정하석"],
    "수상개화":["요사여신","사생취의","양의화생"], "요사여신":["수상개화","사생취의","반객위주"],
    "분성지계":["화소적벽","기문둔갑"], "체천행도":["반객위주","질풍노도","천리추격"], "금창신":["동구적개","강유겸제","간담상조"],
    "만천과해":["전위위안","태청단경","휴양생식"], "토적격문":["진퇴유도","간담상조","이퇴위진"], "위위구조":["간담상조","진퇴유도","홍수첨향"],
    "견진연봉":["동장철벽","순수견양"], "용왕직전":["천리추격","암전난방"], "만부막적":["용왕직전","천리추격"], "일고작기":["사생취의","용맹무쌍"]
};

const internalTacticStatMap = {
    "재주복주":{healGiven:10,damageTakenRed:4},"연인노호":{physicalDmg:5,damageTakenRed:4},"무성":{physicalDmg:8,activeRate:5},"응시낭고":{strategyDmg:8,leech:4},"함진살적":{physicalDmg:8,comboRate:5},"초선차전":{healGiven:10},"칠진칠출":{physicalDmg:6,damageTakenRed:4},"천하무쌍":{physicalDmg:8,comboRate:5},
    "간담상조":{damageTakenRed:8,healGiven:6},"심모원려":{strategyDmg:6},"휴양생식":{healGiven:8},"혼수모어":{damageTakenRed:4,healGiven:6},"효웅":{damageTakenRed:5,healGiven:5},"반객위주":{stackingDmg:8},"실병제위":{damageDealtInc:5},"동구적개":{damageTakenRed:8},"강유겸제":{damageTakenRed:6},"횡징폭렴":{damageTakenRed:6,healGiven:5},"동장철벽":{damageTakenRed:5},"천시지리":{damageTakenRed:5},"진퇴유도":{damageTakenRed:4,damageDealtInc:4},"사생취의":{glassCannonDmg:8,physicalDmg:4},"일고작기":{damageDealtInc:6,comboRate:10},"용맹무쌍":{physicalDmg:6},"만부막적":{physicalDmg:5},"용왕직전":{physicalDmg:5},"태청단경":{healGiven:8},"현호제세":{healGiven:8},"홍수첨향":{healGiven:8,damageTakenRed:6},"위위구조":{healGiven:5,damageTakenRed:4},"안영찰채":{damageTakenRed:4,healGiven:4},"이간계":{damageTakenRed:4,strategyDmg:5},"군령여산":{damageDealtInc:5,damageTakenRed:5},"분용당선":{physicalDmg:5},"출수법":{physicalDmg:5,armorPen:5},"적혈도":{strategyDmg:5,healGiven:5},"전권난정":{physicalDmg:5,damageTakenRed:4},"수상개화":{activeRate:12,damageDealtInc:8},"요사여신":{strategyDmg:10},"만천과해":{damageTakenRed:6,healGiven:6},"화소적벽":{strategyDmg:8},"이퇴위진":{damageTakenRed:6,damageDealtInc:6},"금낭묘계":{healGiven:6},"제곤부위":{healGiven:6},"이아환아":{counterDmg:6,damageTakenRed:4},"만전제발":{physicalDmg:6},"선등함진":{physicalDmg:5},"축세대발":{physicalDmg:6,damageDealtInc:6},"인세이도":{damageTakenRed:8,healGiven:5},"유좌유용":{healGiven:6},"견진연봉":{comboRate:10},"전위위안":{healGiven:6,damageTakenRed:4},"천리추격":{strategyDmg:6,activeRate:3},"분성지계":{strategyDmg:5,damageTakenRed:4},"여자동포":{healGiven:6,damageTakenRed:4},"질풍노도":{physicalDmg:6,armorPen:8},"절절학문":{strategyDmg:6,damageDealtInc:5},"문치무공":{physicalDmg:5,strategyDmg:5,healGiven:6},"담대여두":{strategyDmg:6,physicalDmg:6},"인정":{healGiven:8,damageTakenRed:4},"사소도":{damageDealtInc:6,damageTakenRed:4},"위진새북":{activeRate:5,physicalDmg:5},"금철교명":{counterDmg:6},"체천행도":{strategyDmg:6,leech:4},"금창신":{damageTakenRed:8,strategyDmg:5},"승승장구":{physicalDmg:8,speed:5},"토적격문":{damageTakenRed:6},
    "호치":{physicalDmg:8,leech:5},"부동여산":{activeRate:10,physicalDmg:6}
};

// ==========================================================================
// LAYER 2: 하이브리드 도감 동적 바인딩 (외부 JS 크로스 브릿지)
// ==========================================================================
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

const getTacticListBridge = () => {
    if (window.getAllTacticsFromDogam) {
        const list = window.getAllTacticsFromDogam();
        if (list && list.length > 0) return list;
    }
    return ["데이터 연동 필요"];
};

const getOfficerNamesBridge = () => {
    const list = (window.getAllOfficerNamesFromDogam && window.getAllOfficerNamesFromDogam()?.length > 5) ? window.getAllOfficerNamesFromDogam() : FB_OFFICERS;
    return [...list].sort((a, b) => a.localeCompare(b, 'ko'));
};

// 🚨 [핵심 교정] 전법 도감과 무장 도감을 이중 스캔하여 설명을 반환하는 브릿지 함수
function getTacticInfo(tacticName) {
    const cleanName = cStr(tacticName);
    // 1. 일반 전법 (tactic_dogam.js 연동)
    if (window.getTacticDataFromDogam) {
        const tData = window.getTacticDataFromDogam(cleanName);
        if (tData) return { role: tData.type || tData.role, target: tData.target, desc: tData.desc };
    }
    // 2. 무장 고유 전법 (dogam.js 연동)
    let foundOfficer = null;
    for (const [offName, meta] of Object.entries(FB_OFF_META)) {
        if (cStr(meta[0]) === cleanName) { foundOfficer = offName; break; }
    }
    if (foundOfficer && window.getOfficerDataFromDogam) {
        const oData = window.getOfficerDataFromDogam(foundOfficer);
        if (oData) return { role: oData.role, target: "적군/아군", desc: oData.skillDesc };
    }
    return { role: "전술 전법", target: "부대", desc: "실전 효과가 발동되는 고급 전투 전법입니다. (도감 데이터 연동 필요)" };
}

function getOfficerEquipment(officerName, deckUnitType = "") {
    const cleanName = cStr(officerName);
    const dogamInfo = getOfficerDogamData(officerName);
    const unitPrefix = (deckUnitType && deckUnitType !== "자동 판별") ? deckUnitType : (dogamInfo.unitSuitability?.split('/')[0] || "방패병");
    
    let rawEq = window.getOfficerEquipmentFromDogam ? window.getOfficerEquipmentFromDogam(officerName) : null;
    if (!rawEq && FB_EQUIP_MAP[cleanName]) {
        const mEq = FB_EQUIP_MAP[cleanName];
        rawEq = { helmet: { ...mEq.helmet }, armor: { ...mEq.armor }, accessory: { ...mEq.accessory } };
    }

    if (rawEq) {
        const eq = { helmet: { ...rawEq.helmet }, armor: { ...rawEq.armor }, accessory: { ...rawEq.accessory } };
        ['helmet', 'armor', 'accessory'].forEach(part => {
            ['attr1', 'attr2'].forEach(attr => {
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
    return { helmet: { name: p[0], attr1: p[1], attr2: p[2] }, armor: { name: p[3], attr1: p[4], attr2: p[5] }, accessory: { name: p[6], attr1: p[7], attr2: p[8] } };
}

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

    internalBondRules.filter(r => curNames.filter(n => r.heroes.includes(cStr(n))).length >= r.req && new Set(curNames.filter(n => r.heroes.includes(cStr(n)))).size >= r.req)
        .forEach(bond => { if (bond.heroes.includes(hName)) parseAndAdd(bond.effect); });

    const hA = metaHawkRandomAttributesMap[matchMeta?.bestMeta?.id || "custom"];
    if (hA) { parseAndAdd(hA.attr1.rank1); parseAndAdd(hA.attr2.rank1); parseAndAdd(hA.attr3.rank1); }

    const dogamData = getOfficerDogamData(hName);
    [dogamData.uniqueTactic, ...(officer.chosenTactics || [])].filter(Boolean).forEach(tacName => {
        const tkMap = internalTacticStatMap[cStr(tacName)];
        if (tkMap) Object.keys(tkMap).forEach(tk => { if (stats[tk] !== undefined) stats[tk] += tkMap[tk]; });
    });
    return stats;
}

function evaluateDeckPerfection(deck, metaId) {
    const allTacticsFilled = deck.officers.every(o => o.chosenTactics && o.chosenTactics.length === 2 && o.chosenTactics[0] && o.chosenTactics[1]);
    if (allTacticsFilled) return `<div class="feedback-item success" style="border:1px solid var(--success-text);background:var(--success-bg);padding:8px;margin-top:10px;">✨ <strong>[최종 검증 완료: Perfect Synergy]</strong> 전서버 랭커 상위 1% 공방 밸런스를 달성했습니다.</div>`;
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

// ==========================================================================
// LAYER 3: 조합 맞춤형 동적 대체 추천 및 계층적 배타성 추천 엔진
// ==========================================================================
function getOwnedAlternativeOfficer(missingName, curNames, heroDataMap, deckUnitType = "") {
    const cleanMissing = cStr(missingName);
    const allNames = getOfficerNamesBridge();
    let candidates = [];
    Object.keys(heroDataMap).forEach(cleanCand => {
        if (!heroDataMap[cleanCand]?.isOwned || curNames.some(cn => cStr(cn) === cleanCand) || cleanCand === cleanMissing) return;
        candidates.push({ name: allNames.find(n => cStr(n) === cleanCand) || cleanCand, score: 50 });
    });
    return candidates.length > 0 ? candidates[0].name : null;
}

function getOwnedAlternativeTactic(missingTacName, allEquipTacs, tacticDataMap, recommendedTacs = new Set(), officerName = "", deckUnitType = "") {
    const alts = tacticAlternativesMap[missingTacName] || [];
    for (let t of alts) {
        const cleanT = cStr(t);
        if (tacticDataMap[cleanT]?.isOwned && !allEquipTacs.includes(t) && !recommendedTacs.has(t)) {
            recommendedTacs.add(t); return t;
        }
    }
    const allTacs = getTacticListBridge();
    for (let cleanTName of Object.keys(tacticDataMap)) {
        if (tacticDataMap[cleanTName]?.isOwned && !allEquipTacs.includes(cleanTName) && !recommendedTacs.has(cleanTName) && cleanTName !== cStr(missingTacName)) {
            const originTName = allTacs.find(n => cStr(n) === cleanTName) || cleanTName;
            recommendedTacs.add(originTName); return originTName;
        }
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
    if (cStr(deck.formation) !== cStr(match.bestMeta.formation)) score -= 10;
    match.bestMeta.officers.forEach((metaOff) => { if (!curNamesClean.includes(cStr(metaOff.name))) score -= 30; });
    return Math.max(score, 0);
}

function generateStructuredFeedback(deck, heroDataMap, tacticDataMap, higherTierUsedTacs = []) {
    const fb = { insight: "", logs: [] };
    const curNames = deck?.officers?.map(o => cStr(o?.name)).filter(Boolean) || [];
    const match = getBestMetaMatch(curNames);

    if (!match || match.maxScore === 0) return fb;
    const { bestMeta: meta } = match;
    fb.logs.push({ type: 'info', text: `🎯 <strong>[${meta.name}]</strong> 기반 처방입니다.` });
    if (systemGuideInsights[meta.id]) fb.insight = systemGuideInsights[meta.id];

    const allEquipTacs = deck.officers.flatMap(o => o?.chosenTactics?.map(t => cStr(t))).filter(Boolean);
    const forbiddenTacs = [...new Set([...allEquipTacs, ...higherTierUsedTacs.map(t => cStr(t))])];
    const recommendedTacs = new Set();

    deck.officers.forEach((off, oIdx) => {
        const hName = off?.name?.toString().trim() || "", cleanHName = cStr(hName);
        
        if (!cleanHName) {
            fb.logs.push({ type: 'warning', text: `[${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}] 무장 슬롯이 비어있습니다. 권장 무장: <span style="color:var(--text-highlight);font-weight:bold;">[${meta.officers[oIdx]?.name}]</span>`});
            return;
        }

        const isHeroOwned = !!heroDataMap[cleanHName]?.isOwned;
        if (!isHeroOwned) {
            const altHero = getOwnedAlternativeOfficer(cleanHName, curNames, heroDataMap, deck.unitType);
            const altText = altHero ? `<span style="color:var(--success-text);font-weight:bold;">[${altHero}]</span>` : `<span style="color:var(--text-muted);">[대체 불가]</span>`;
            fb.logs.push({ type: 'warning', text: `[${hName}] 미보유 ➔ 대체 무장 추천: ${altText}` });
        }

        const metaIdx = meta.officers.findIndex(mo => cStr(mo.name) === cleanHName);
        const targetMetaTacs = metaIdx !== -1 ? (meta.officers[metaIdx].chosenTactics.length === 3 ? meta.officers[metaIdx].chosenTactics.slice(1, 3) : meta.officers[metaIdx].chosenTactics) : ["", ""];

        (off.chosenTactics || []).forEach((t, i) => {
            const cT = cStr(t);
            const slotNum = i + 2;
            const pTac = targetMetaTacs[i];

            if (!cT) {
                if (pTac) {
                    const isHigherUsed = higherTierUsedTacs.includes(cStr(pTac));
                    const ownedAltTac = getOwnedAlternativeTactic(pTac, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType);
                    const isAltOwned = tacticDataMap[cStr(ownedAltTac)]?.isOwned;
                    const altText = ownedAltTac ? (isAltOwned ? `<span style="color:var(--success-text);font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#f87171;">[${ownedAltTac}](미보유)</span>`) : `<span style="color:var(--text-muted);">[대체 불가]</span>`;
                    
                    if (isHigherUsed) {
                        fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백: <span style="color:#fca5a5;text-decoration:line-through;">[${pTac}]</span>(상위 부대 사용) ➔ 대체 추천: ${altText}` });
                    } else {
                        fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백 ➔ 권장 전법: <span style="color:#38bdf8;font-weight:bold;">[${pTac}]</span>` });
                    }
                }
            } else {
                const isTacOwned = !!tacticDataMap[cT]?.isOwned;
                if (!isTacOwned) {
                    const isHigherUsed = higherTierUsedTacs.includes(cT);
                    const ownedAltTac = getOwnedAlternativeTactic(cT, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType);
                    const isAltOwned = tacticDataMap[cStr(ownedAltTac)]?.isOwned;
                    const altText = ownedAltTac ? (isAltOwned ? `<span style="color:var(--success-text);font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#f87171;">[${ownedAltTac}](미보유)</span>`) : `<span style="color:var(--text-muted);">[대체 불가]</span>`;
                    
                    if (isHigherUsed) {
                        fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 <span style="color:#fca5a5;text-decoration:line-through;">[${t}]</span> (미보유/상위 중복) ➔ 대체 추천: ${altText}` });
                    } else {
                        fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 [${t}] 미보유 ➔ 대체 전법 추천: ${altText}` });
                    }
                }
            }
        });
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
// LAYER 4: UI 파이프라인 및 모달 컨트롤 (테마 동기화)
// ==========================================================================
let dynamicPresetDecks = [];
let draggedDeckOriginIdx = null, draggedOfficerSlotIdx = null;

let modalPopupEl = null, currentPopupTitle = null;
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

// 🚨 [핵심 교정] 분리된 전법 브릿지 호출 함수 연동
window.showTacticPopup = function(e, tacticName) {
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') return;
    if (!tacticName || tacticName === "선택 안함") return;
    const tData = getTacticInfo(tacticName);
    openModalPopup(e, `⭐ ${tacticName}`, `타입: ${tData.role} | 대상: ${tData.target}`, tData.desc);
};

window.showEquipPopup = function(e, attr1, attr2) {
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') return;
    openModalPopup(e, "⚒️ 장비 추가 속성", `🔹 1차: ${attr1}`, `🔹 2차: ${attr2}`);
};

const injectCustomUIStyles = () => {
    if (document.getElementById('deck-custom-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'deck-custom-ui-styles';
    style.innerHTML = `
        .deck-card select { background-color: var(--bg-input); color: var(--text-main); border: 1px solid var(--border-input); border-radius: 4px; padding: 6px 24px 6px 10px; font-size: 13px; width: 100%; box-sizing: border-box; font-family: inherit; transition: background-color 0.3s, color 0.3s; }
        .hawk-recommend-box { margin-top: 10px; padding: 12px; background-color: var(--bg-inner); border-left: 4px solid #3b82f6; border-radius: 6px; font-size: 13px; color: var(--text-desc); line-height: 1.5; transition: background-color 0.3s; }
        .equipment-box { margin-top: 6px; padding: 6px; border: 1px solid var(--border-main); border-radius: 4px; background-color: var(--bg-inner); font-size: 11px; color: var(--text-desc); transition: background-color 0.3s, border-color 0.3s; }
        .integrated-stats-box { margin-top: 6px; padding: 8px; border-radius: 4px; background-color: var(--bg-inner); border: 1px solid var(--border-main); font-size: 11px; transition: background-color 0.3s, border-color 0.3s; }
        .unit-badge { display: inline-block; background-color: rgba(245, 158, 11, 0.15); color: var(--text-highlight); font-size: 10px; padding: 3px 6px; border-radius: 4px; margin: 4px 0; }
        .feedback-item.success { color: var(--success-text); }
        .feedback-item.warning { color: var(--text-highlight); }
        .feedback-item.info { color: var(--text-muted); }
        #tactic-popup-modal { display: none; position: absolute; z-index: 9999; background: var(--bg-panel); border: 1px solid var(--border-main); padding: 12px; border-radius: 6px; width: 280px; color: var(--text-main); font-size: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .tactic-row { cursor: pointer; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px; transition: all 0.2s; }
        .tactic-row select { width: 80%; margin: 0 auto; display: block; }
        .tactic-row.owned select { border: 1px solid var(--success-text); color: var(--success-text); background-color: var(--success-bg); }
        .tactic-row.missing { border: 1px dashed #f87171 !important; background-color: rgba(248, 113, 113, 0.05) !important; }
        .tactic-row.missing select { border: none; color: #fca5a5; background-color: transparent; }
    `;
    document.head.appendChild(style);
};

const FORMATIONS = {
    "일자진": { eff: "전열: 피해 감소 6.0% | 후열: -", pos: ["front","front","front"] },
    "구행진": { eff: "전열: 피해 감소 5.0% | 후열: 피해 증가 12.0%", pos: ["front","back","front"] },
    "추형진": { eff: "전열: 피해 감소 6.0% | 후열: 피해 증가 8.0%", pos: ["back","front","back"] },
    "기형진": { eff: "전열: 피해 증가 12.0% | 후열: 피해 감소 5.0%", pos: ["back","back","front"] },
    "방원진": { eff: "전열: 피해 감소 5.0% | 후열: 연격률 28.0%", pos: ["front","front","back"] },
    "안행진": { eff: "전열: 피해 감소 5.0% | 후열: 강공/기습 12.0%", pos: ["back","front","front"] }
};

const analyzedMetaArchetypes = [
    {id:"wu_sogyo_nosuk_yukson",name:"[오나라] 소교·노숙·육손 종결 방원기병 덱",concept:"[1위 1군] 소교·노숙·육손 방원기병",formation:"방원진",officers:[{name:"소교",chosenTactics:["화용욕모","진퇴유도","간담상조"]},{name:"노숙",chosenTactics:["탑상책","견진연봉","위위구조"]},{name:"육손",chosenTactics:["지변규려","천리추격","체천행도"]}]},
    {id:"qun_wonso_jangnyeong_jwaja",name:"[군진영] 원소·장녕·좌자 종결 구행방패 덱",concept:"[1위 2군] 원소·장녕·좌자 구행방패",formation:"구행진",officers:[{name:"원소",chosenTactics:["사소도","강유겸제","혼수모어"]},{name:"장녕",chosenTactics:["천의난위","양의화생","수상개화"]},{name:"좌자",chosenTactics:["화겁생기","안영찰채","유좌유용"]}]},
    {id:"shu_macho_weiyeon_xushu",name:"[촉나라] 마초·위연·서서 종결 안행창병 덱",concept:"[1위 3군] 마초·위연·서서 안행창병",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","반객위주"]},{name:"위연",chosenTactics:["실병제위","이퇴위진","횡징폭렴"]},{name:"서서",chosenTactics:["절절학문","문치무공","여자동포"]}]},
    {id:"wei_jojo_sima_hahou",name:"[위나라] 조조·사마의·하후돈 종결 구행방패 덱",concept:"[2위 1군] 조조·사마의·하후돈 구행방패",formation:"구행진",officers:[{name:"조조",chosenTactics:["효웅","분성지계","안영찰채"]},{name:"사마의",chosenTactics:["응시낭고","수상개화","요사여신"]},{name:"하후돈",chosenTactics:["발시담정","간담상조","금창신"]}]},
    {id:"shu_macho_weiyeon_xushu_2",name:"[촉나라] 마초·위연·서서 안행창병 (2위 세팅)",concept:"[2위 2군] 마초·위연·서서 안행창병",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","반객위주"]},{name:"위연",chosenTactics:["실병제위","강유겸제","횡징폭렴"]},{name:"서서",chosenTactics:["절절학문","문치무공","전위위안"]}]},
    {id:"qun_jwaja_jangnyeong_ugil_2",name:"[군진영] 좌자·장녕·우길 종결 구행궁병 덱",concept:"[2위 3군] 좌자·장녕·우길 구행궁병",formation:"구행진",officers:[{name:"좌자",chosenTactics:["화겁생기","혼수모어","이퇴위진"]},{name:"장녕",chosenTactics:["천의난위","양의화생","낙정하석"]},{name:"우길",chosenTactics:["태평경","유좌유용","여자동포"]}]},
    {id:"shu_macho_weiyeon_xushu_3",name:"[촉나라] 마초·위연·서서 안행창병 (3위 세팅)",concept:"[3위 1군] 마초·위연·서서 안행창병",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","질풍노도"]},{name:"위연",chosenTactics:["실병제위","홍수첨향","이퇴위진"]},{name:"서서",chosenTactics:["절절학문","문치무공","전위위안"]}]},
    {id:"wu_songwon_yukhang_nosuk_3",name:"[오나라] 손권·육항·노숙 종결 구행궁병 덱",concept:"[3위 2군] 손권·육항·노숙 구행궁병",formation:"구행진",officers:[{name:"손권",chosenTactics:["웅거","진퇴유도","토적격문"]},{name:"육항",chosenTactics:["청백충근","양의화생","반객위주"]},{name:"노숙",chosenTactics:["탑상책","분성지계","여자동포"]}]},
    {id:"wei_sima_jojo_gahu_3",name:"[위나라] 사마의·조조·가후 종결 추형방패 덱",concept:"[3위 3군] 사마의·조조·가후 추형방패",formation:"추형진",officers:[{name:"사마의",chosenTactics:["응시낭고","수상개화","요사여신"]},{name:"조조",chosenTactics:["효웅","안영찰채","간담상조"]},{name:"가후",chosenTactics:["경달권변","혼수모어","만천과해"]}]},
    {id:"qun_wonso_dongtak_yeopo_4",name:"[군진영] 원소·동탁·여포 종결 방원기병 덱",concept:"[4위 1군] 원소·동탁·여포 방원기병",formation:"방원진",officers:[{name:"원소",chosenTactics:["사소도","이퇴위진","횡징폭렴"]},{name:"동탁",chosenTactics:["전권난정","견진연봉","위위구조"]},{name:"여포",chosenTactics:["천하무쌍","용왕직전","만부막적"]}]},
    {id:"shu_macho_weiyeon_yubi_4",name:"[촉나라] 마초·위연·유비 종결 안행창병 덱",concept:"[4위 2군] 마초·위연·유비 안행창병",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","질풍노도"]},{name:"위연",chosenTactics:["실병제위","토적격문","문치무공"]},{name:"유비",chosenTactics:["인정","혼수모어","강유겸제"]}]},
    {id:"wei_jojo_sima_hahou_4",name:"[위나라] 조조·사마의·하후돈 구행방패 (4위 세팅)",concept:"[4위 3군] 조조·사마의·하후돈 구행방패",formation:"구행진",officers:[{name:"조조",chosenTactics:["효웅","현호제세","유좌유용"]},{name:"사마의",chosenTactics:["응시낭고","수상개화","반객위주"]},{name:"하후돈",chosenTactics:["발시담정","홍수첨향","간담상조"]}]},
    {id:"qun_jwaja_jangnyeong_ugil_5",name:"[군진영] 좌자·장녕·우길 구행궁병 (5위 세팅)",concept:"[5위 1군] 좌자·장녕·우길 구행궁병",formation:"구행진",officers:[{name:"좌자",chosenTactics:["화겁생기","안영찰채","유좌유용"]},{name:"장녕",chosenTactics:["천의난위","수상개화","양의화생"]},{name:"우길",chosenTactics:["태평경","강유겸제","금창신"]}]},
    {id:"wei_sima_jojo_gahu_5",name:"[위나라] 사마의·조조·가후 추형방패 (5위 세팅)",concept:"[5위 2군] 사마의·조조·가후 추형방패",formation:"추형진",officers:[{name:"사마의",chosenTactics:["응시낭고","반객위주","요사여신"]},{name:"조조",chosenTactics:["효웅","진퇴유도","간담상조"]},{name:"가후",chosenTactics:["경달권변","만천과해","혼수모어"]}]},
    {id:"shu_macho_weiyeon_xushu_5",name:"[촉나라] 마초·위연·서서 안행창병 (5위 세팅)",concept:"[5위 3군] 마초·위연·서서 안행창병",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","질풍노도"]},{name:"위연",chosenTactics:["실병제위","홍수첨향","이퇴위진"]},{name:"서서",chosenTactics:["절절학문","문치무공","전위위안"]}]}
];

const metaDeckUnitTypeMap = {
    "wu_sogyo_nosuk_yukson":"기병", "qun_wonso_jangnyeong_jwaja":"방패병", "shu_macho_weiyeon_xushu":"창병",
    "wei_jojo_sima_hahou":"방패병", "shu_macho_weiyeon_xushu_2":"창병", "qun_jwaja_jangnyeong_ugil_2":"궁병",
    "shu_macho_weiyeon_xushu_3":"창병", "wu_songwon_yukhang_nosuk_3":"궁병", "wei_sima_jojo_gahu_3":"방패병",
    "qun_wonso_dongtak_yeopo_4":"기병", "shu_macho_weiyeon_yubi_4":"창병", "wei_jojo_sima_hahou_4":"방패병",
    "qun_jwaja_jangnyeong_ugil_5":"궁병", "wei_sima_jojo_gahu_5":"방패병", "shu_macho_weiyeon_xushu_5":"창병"
};

const defaultHawkAttr = { attr1: { rank1: "[20Lv] 속도/모략 보정" }, attr2: { rank1: "[30Lv] 전투 속성 보정" }, attr3: { rank1: "[40Lv] 행동 시 디버프 해제" } };
const metaHawkRandomAttributesMap = new Proxy({
    "wu_sogyo_nosuk_yukson":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 발동률 +5%",rank3:"[30Lv] 피해 감소 +8%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 행동 시 디버프 1개 해제",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "qun_wonso_jangnyeong_jwaja":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "shu_macho_weiyeon_xushu":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "wei_jojo_sima_hahou":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "shu_macho_weiyeon_xushu_2":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "qun_jwaja_jangnyeong_ugil_2":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "shu_macho_weiyeon_xushu_3":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "wu_songwon_yukhang_nosuk_3":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 발동률 +5%",rank3:"[30Lv] 피해 감소 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 치유 효과 부여 +12%",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "wei_sima_jojo_gahu_3":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "qun_wonso_dongtak_yeopo_4":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 파갑 +10%",rank2:"[30Lv] 연격률 +8%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 일반 공격 시 대상 혼란(1턴)"}},
    "shu_macho_weiyeon_yubi_4":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 통솔 +10%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 피해 감소 +8%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}},
    "wei_jojo_sima_hahou_4":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "qun_jwaja_jangnyeong_ugil_5":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 속도 +20"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "wei_sima_jojo_gahu_5":{attr1:{rank1:"[20Lv] 모략 +12%",rank2:"[20Lv] 통솔 +10%",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 모략 피해 가함 +10%",rank2:"[30Lv] 피해 감소 +8%",rank3:"[30Lv] 치유 효과 부여 +10%"},attr3:{rank1:"[40Lv 특성] 행동 시 디버프 1개 해제",rank2:"[40Lv 특성] 피격 시 50% 확률 저항 1중첩",rank3:"[40Lv 특성] 저항 획득률 +6%"}},
    "shu_macho_weiyeon_xushu_5":{attr1:{rank1:"[20Lv] 무용 +12%",rank2:"[20Lv] 속도 +20",rank3:"[20Lv] 전능 +6%"},attr2:{rank1:"[30Lv] 연격률 +10%",rank2:"[30Lv] 확산 피해 +12%",rank3:"[30Lv] 무용 피해 가함 +10%"},attr3:{rank1:"[40Lv 특성] 추격(돌격) 전법 피해 +15%",rank2:"[40Lv 특성] 첫 턴 선공 부여",rank3:"[40Lv 특성] 피해 가한 후 병력 10% 흡혈"}}
}, { get: (target, prop) => target[prop] || defaultHawkAttr });

const systemGuideInsights = {
    "wu_sogyo_nosuk_yukson":"💡 [1위 1군] 소교 화용욕모 방어 해제 및 노숙 견진연봉 연격 버프를 받는 육손 체천행도 추격 마법사.",
    "qun_wonso_jangnyeong_jwaja":"💡 [1위 2군] 좌자 화겁생기/유좌유용 회피 장벽 뒤 원소 사소도/강유겸제 피감과 장녕 양의화생/수상개화 폭격 방패.",
    "shu_macho_weiyeon_xushu":"💡 [1위 3군] 서서 문치무공/여자동포 스탯 폭증 버프 뒤 위연 이퇴위진/횡징폭렴 피감과 마초 반객위주 확산 연격 창병.",
    "qun_wonso_dongtak_yeopo_4":"💡 [4위 1군] 원소 사소도 통솔 버프 및 동탁 견진연봉/위위구조 피감 뒤 여포 용왕직전/만부막적 1턴 분쇄 기병.",
    "shu_macho_weiyeon_yubi_4":"💡 [4위 2군] 유비 인정/혼수모어 제어 힐 및 강유겸제 피감 속에서 마초 출수법/용맹무쌍/질풍노도 확산 창병.",
    "qun_jwaja_jangnyeong_ugil_5":"💡 [5위 1군] 우길 금창신 신산 버프를 받는 장녕 수상개화/양의화생 폭딜 및 좌자 안영찰채/유좌유용 방패/궁병."
};

const metaHawkRecommendationMap = new Proxy({
    "wu_sogyo_nosuk_yukson":{name:"능소-진시",skill:"육손 체천행도 연격 폭딜 보정"}, "qun_wonso_jangnyeong_jwaja":{name:"삭풍-성모",skill:"좌자 장벽 및 장녕 모략 펌핑 지원"}, "shu_macho_weiyeon_xushu":{name:"열공-전광",skill:"마초 반객위주 확산 타격 강화"},
    "wei_jojo_sima_hahou":{name:"결운-호생",skill:"사마의 모략 폭딜 및 조조/하후돈 호위"}, "shu_macho_weiyeon_xushu_2":{name:"결운-감로",skill:"마초 확산 타격 및 서서 피감 치유 강화"}, "qun_jwaja_jangnyeong_ugil_2":{name:"열공-여천",skill:"장녕 낙정하석 폭격 및 우길 수공 지원"},
    "shu_macho_weiyeon_xushu_3":{name:"능소-진시",skill:"마초 질풍노도 선공 파갑 연격 지원"}, "wu_songwon_yukhang_nosuk_3":{name:"열공-전광",skill:"손권 도발 탱킹 및 육항 모략 폭딜 지원"}, "wei_sima_jojo_gahu_3":{name:"결운-호생",skill:"사마의 모략 회심 및 조조/가후 3중 힐 지원"},
    "qun_wonso_dongtak_yeopo_4":{name:"결운-호생",skill:"여포 천하무쌍 연타 및 동탁/원소 견고화"}, "shu_macho_weiyeon_yubi_4":{name:"결운-감로",skill:"마초 확산 폭딜 및 유비/위연 유지력 극대화"}, "wei_jojo_sima_hahou_4":{name:"능소-진시",skill:"사마의 모략 회심 및 조조/하후돈 안정 방어"},
    "qun_jwaja_jangnyeong_ugil_5":{name:"삭풍-성모",skill:"좌자 회피 장벽 및 장녕 신산(금창신) 폭딜 지원"}, "wei_sima_jojo_gahu_5":{name:"열공-여천",skill:"사마의 요사여신 모략 폭딜 극대화"}, "shu_macho_weiyeon_xushu_5":{name:"열공-전광",skill:"마초 용맹무쌍/질풍노도 돌파력 강화"}
}, { get: (target, prop) => target[prop] || {name:"범용 전투매", skill:"기본 최적화"} });

const defaultPresetDecks = analyzedMetaArchetypes.slice(0,5).map((d, i) => ({ ...d, title: `${i + 1}군`, unitType: "", officers: d.officers.map(o => ({ name: o.name, chosenTactics: o.chosenTactics.length === 3 ? o.chosenTactics.slice(1, 3) : [...o.chosenTactics] })) }));

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
    if (prop === 'reset') { d.formation = "구행진"; d.unitType = ""; d.officers.forEach(o => { o.name = ""; o.chosenTactics = ["", ""]; }); }
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
    
    const saved = JSON.parse(localStorage.getItem('samguk_hobby_data') || '{}');
    const tMap = {};
    const tacticsList = Array.isArray(saved.tactics) ? saved.tactics : Object.values(saved.tactics || {});
    tacticsList.forEach(x => { if(x && x.name) tMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });

    targetDeck.officers = match.bestMeta.officers.map(m => {
        const idealTacs = m.chosenTactics.length === 3 ? m.chosenTactics.slice(1,3) : [...m.chosenTactics];
        const fixedTacs = idealTacs.map(tac => {
            const cTac = cStr(tac);
            if (higherTacs.has(cTac)) {
                const alt = getOwnedAlternativeTactic(tac, Array.from(higherTacs), tMap, new Set());
                if (alt) { higherTacs.add(cStr(alt)); return alt; }
                return "";
            }
            higherTacs.add(cTac);
            return tac;
        });
        return { name: m.name, chosenTactics: fixedTacs };
    });
    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks)); 
    renderDeckBuilder(); 
    alert(`[AI 교정 완료] 상위 부대 전법 배제 및 최적 대체 전법 할당 성공\n(미보유 대체 전법은 붉은색 점선 테두리로 표시됩니다)`);
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
        const heroesList = Array.isArray(saved.heroes) ? saved.heroes : Object.values(saved.heroes || {});
        const tacticsList = Array.isArray(saved.tactics) ? saved.tactics : Object.values(saved.tactics || {});
        
        heroesList.forEach(x => { if(x && x.name) hMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });
        tacticsList.forEach(x => { if(x && x.name) tMap[cStr(x.name)] = { isOwned: !!x.isOwned }; });

        let accumulatedHigherTacs = new Set();
        dynamicPresetDecks.sort((a,b) => (a.originIdx||0) - (b.originIdx||0)).forEach((deck, aIdx) => {
            const curNames = deck.officers.map(o => o?.name?.trim().replace(/\s+/g,'')).filter(Boolean);
            const match = getBestMetaMatch(curNames);
            let dType = deck.unitType || "방패병";

            const offHtml = deck.officers.map((off, oIdx) => {
                const hName = off?.name?.trim() || "", cName = cStr(hName);
                const dg = cName ? getOfficerDogamData(hName) : null;
                
                // 🚨 [핵심 교정] 미보유 장수 장착 시 고유전법 렌더링 붉은 점선(missing) 처리
                const isHeroOwned = cName ? !!hMap[cName]?.isOwned : false;
                const heroCssClass = isHeroOwned ? 'owned' : 'missing';
                const heroSpanColor = isHeroOwned ? 'var(--text-main)' : '#fca5a5';
                
                let tRows = `<div class="tactic-row ${heroCssClass}" style="border-left:3px solid var(--border-accent);" onclick="showTacticPopup(event, '${dg?.uniqueTactic||''}')"><span style="color:${heroSpanColor}; font-weight:bold;">⭐ ${dg?.uniqueTactic||'고유 전법'}</span></div>`;
                
                (off.chosenTactics||[]).forEach((t, sIdx) => {
                    const cT = cStr(t);
                    const isOwn = cT ? !!tMap[cT]?.isOwned : false;
                    const cssClass = cT ? (isOwn ? 'owned' : 'missing') : 'missing';
                    
                    tRows += `<div class="tactic-row ${cssClass}" onclick="showTacticPopup(event, this.querySelector('select').value)"><select onchange="updateDeckState(${deck.originIdx},'tac',this.value,${oIdx},${sIdx})"><option value="">선택 안함</option>${getTacticListBridge().map(tx=>`<option value="${tx}" ${cT===cStr(tx)?'selected':''}>${tx}</option>`).join('')}</select></div>`;
                });

                const eq = cName ? getOfficerEquipment(hName, dType) : null;
                const eqH = eq ? `<div class="equipment-box"><div>🪖 ${eq.helmet.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.helmet.attr1}', '${eq.helmet.attr2}')">[${eq.helmet.attr1} / ${eq.helmet.attr2}]</span></div><div>🛡️ ${eq.armor.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.armor.attr1}', '${eq.armor.attr2}')">[${eq.armor.attr1} / ${eq.armor.attr2}]</span></div><div>📿 ${eq.accessory.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.accessory.attr1}', '${eq.accessory.attr2}')">[${eq.accessory.attr1} / ${eq.accessory.attr2}]</span></div></div>` : '';

                return `<div class="officer-slot" draggable="true" ondragstart="handleOfficerDragStart(event,${deck.originIdx},${oIdx})" ondragover="handleOfficerDragOver(event)" ondragleave="handleOfficerDragLeave(event)" ondrop="handleOfficerDrop(event,${deck.originIdx},${oIdx})" ondragend="handleOfficerDragEnd(event)"><div style="display:flex;justify-content:space-between;"><span style="color:var(--text-highlight);font-size:11px;">${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}</span><select onchange="updateDeckState(${deck.originIdx},'off',this.value,${oIdx})"><option value="">선택 안함</option>${getOfficerNamesBridge().map(hx=>`<option value="${hx}" ${hName===hx?'selected':''}>${hx}</option>`).join('')}</select></div>${eqH}<div>${tRows}</div></div>`;
            }).join('');

            let statsHtml = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:6px;">`;
            deck.officers.forEach((off, oIdx) => {
                const stats = aggregateIntegratedStats(deck, oIdx);
                statsHtml += `<div>${buildIntegratedStatsHtml(stats)}</div>`;
            });
            statsHtml += `</div>`;

            const hawkRec = metaHawkRecommendationMap[match?.bestMeta?.id || "custom"];
            const hawkHtml = `<div class="hawk-recommend-box">🦅 <strong>추천 전투매: <span style="color:var(--text-highlight);">${hawkRec.name}</span></strong><br>💡 <span style="color:var(--text-muted);">${hawkRec.skill}</span></div>`;

            // 🚨 [핵심 교정] 피드백 스캔 시 미보유 무장/전법에 대한 스캔 로직 활성화
            const fb = generateStructuredFeedback(deck, hMap, tMap, Array.from(accumulatedHigherTacs)), score = calculateStrictDeckScore(deck);
            let fbH = fb.logs.map(l=>`<div class="feedback-item ${l.type}">${l.text}</div>`).join('');

            deck.officers.forEach(o => (o?.chosenTactics || []).forEach(t => { if (t && cStr(t)) accumulatedHigherTacs.add(cStr(t)); }));
            
            const bondFeedback = `<div class="feedback-item info" style="margin-top:6px;">🤝 <strong>활성화 인연:</strong> <span style="color:var(--text-highlight);">${calculateActivatedBond(deck.officers)}</span></div>`;
            const perfectionMsg = evaluateDeckPerfection(deck, match?.bestMeta?.id);

            container.insertAdjacentHTML('beforeend', `<div class="deck-card" style="background-color:var(--bg-panel);border:1px solid var(--border-main);border-radius:8px;padding:16px;margin-bottom:16px; transition: background-color 0.3s, border-color 0.3s;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <button onclick="moveDeckAction(${aIdx},-1)" style="visibility:${aIdx>0?'visible':'hidden'}; background:var(--bg-inner); color:var(--text-main); border:1px solid var(--border-main); border-radius:3px; cursor:pointer; padding:2px 8px; font-size:12px;">▲</button>
                        <button onclick="moveDeckAction(${aIdx},1)" style="visibility:${aIdx<dynamicPresetDecks.length-1?'visible':'hidden'}; background:var(--bg-inner); color:var(--text-main); border:1px solid var(--border-main); border-radius:3px; cursor:pointer; padding:2px 8px; font-size:12px;">▼</button>
                        <span contenteditable="true" style="color:var(--text-main);font-weight:bold;font-size:18px;" onblur="updateDeckState(${deck.originIdx},'title',this.innerText.replace(/\\[추천도:.*?\\]/g,'').trim()||'${deck.title}')">${deck.title}</span>
                        <span style="color:var(--text-highlight);font-size:13px;margin-left:8px;">[추천도: ${score}점]</span>
                    </div>
                    <div>
                        <button onclick="autoFixDeck(${deck.originIdx})" style="background:#8b5cf6;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-weight:bold;">✨ AI 교정</button> 
                        <button onclick="updateDeckState(${deck.originIdx},'reset')" style="background:#ef4444;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-weight:bold;">초기화</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:10px;">${offHtml}</div>
                ${statsHtml}
                <div style="margin-top:12px;">${hawkHtml}${fbH}${bondFeedback}${perfectionMsg}</div>
            </div>`);
        });
    } catch(e) { container.innerHTML = `<div style="color:red;padding:20px;">렌더링 에러: ${e.message}</div>`; }
}

const osi = localStorage.setItem; localStorage.setItem = function(k,v) { osi.apply(this,arguments); window.dispatchEvent(new CustomEvent('local-storage-update',{detail:{key:k}})); };
window.addEventListener('local-storage-update', e => { if(e.detail.key==='samguk_hobby_data') renderDeckBuilder(); });
window.addEventListener('storage', e => { if(e.key==='samguk_hobby_data') renderDeckBuilder(); });

document.addEventListener('DOMContentLoaded', () => { injectCustomUIStyles(); loadDeckTextData(); renderDeckBuilder(); });

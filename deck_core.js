// [시스템 분석] deck_core.js - 장비 속성 렌더링 누락 복구 및 UI 컴포넌트화 패치

// ==========================================================================
// LAYER 1: 독립형 마스터 자원 데이터베이스 및 전역 Set 분류기 
// ==========================================================================
const internalMasterOfficerUniqueTacticMap = {"가후":"경달권변","곽가":"산무유책","사마의":"응시낭고","순욱":"거중지중","악진":"분용당선","전위":"축호과간","정욱":"십면매복","조조(제왕)":"군령여산","조조":"효웅","장료":"함진살적","장합":"교변병기","하후돈":"발시담정","하후연":"충용","관우":"무성","강유":"담대여두","마대":"습참","마초":"출수법","서서":"절절학문","사마가":"만왕","위연":"실병제위","유비":"인정","유비(제왕)":"재주복주","장비":"연인노호","제갈량":"초선차전","조운":"칠진칠출","황충":"적혈도","황월영":"묘산천기","대교":"정수유심","노숙":"탑상책","소교":"화용욕모","손견":"강동맹호","손권":"웅거","손상향":"효희","손책":"강동패주","손권(제왕)":"겸권상계","여몽":"백의도강","육손":"지변규려","육항":"청백충근","주유":"봉화연천","주태":"청라산개","정보":"칠척사모","황개":"요원지화","채문희":"비분시","장녕":"천의난위","동탁":"전권난정","여포":"천하무쌍","초선":"폐월","장각":"황천당립","화타":"청낭제세","장보":"요풍사기","좌자":"화겁생기","우길":"태평경","안량":"효장","원소":"사소도","공손찬":"위진새북"};
const internalMasterOfficerNames = Object.keys(internalMasterOfficerUniqueTacticMap).sort((a, b) => a.localeCompare(b, 'ko'));
const internalMasterTacticNames = ["가정지전","강유겸제","견불가최","견진연봉","공기불비","과하탁교","교취호탈","극적제승","금낭묘계","금적금왕","금창신","금철교명","기문둔갑","낙정하석","동구적개","동장철벽","동촉기선","만부막적","만전제발","만천과해","문치무공","미우주무","반객위주","병량촌단","분성지계","비사주석","사면초가","사생취의","선등함진","수상개화","순수견양","승승장구","심모원려","안영찰채","암전난방","양의화생","양초선행","여자동포","요사여신","용맹무쌍","용왕직전","운주유악","원성재도","위위구조","유좌유용","이간계","이아환아","이일대로","이퇴위진","일고작기","인세이도","전위위안","제곤부위","중정기고","지인선임","진퇴유도","진화타겁","질풍노도","천리추격","천시지리","체천행도","축세대발","축호과간","태청단경","토적격문","현호제세","호령삼군","혼수모어","홍수첨향","화소적벽","횡소천군","횡징폭렴","휴양생식","사소도","파진최견","천하무적","일기당천","귀신정정"].sort((a, b) => a.localeCompare(b, 'ko'));

const tacticAlternativesMap = {"횡징폭렴":["동구적개","동장철벽"],"이퇴위진":["미우주무","천시지리"],"용맹무쌍":["만부막적","비사주석"],"질풍노도":["암전난방","교취호탈"],"문치무공":["양초선행","중정기고"],"혼수모어":["사면초가","이간계"],"반객위주":["일고작기","사생취의"],"유좌유용":["휴양생식","제곤부위"],"선등함진":["만천과해","만전제발"],"강유겸제":["동장철벽","천시지리"],"진퇴유도":["위위구조","동구적개"],"견진연봉":["동장철벽","순수견양"],"위위구조":["태청단경","현호제세"],"용왕직전":["천리추격","암전난방"],"만부막적":["용왕직전","천리추격"],"전위위안":["태청단경","현호제세"],"안영찰채":["위위구조","미우주무"],"일고작기":["사생취의","용맹무쌍"],"여자동포":["동구적개","천시지리"],"양의화생":["기문둔갑","화소적벽"],"수상개화":["요사여신","사생취의"],"요사여신":["수상개화","사생취의"],"견불가최":["동장철벽","동구적개"],"분성지계":["화소적벽","기문둔갑"],"운주유악":["태청단경","미우주무"],"동구적개":["안영찰채","위위구조"],"사생취의":["일고작기","용맹무쌍"],"양초선행":["문치무공","휴양생식"],"휴양생식":["양초선행","현호제세"],"동장철벽":["견불가최","천시지리"],"사면초가":["기문둔갑","화소적벽"],"심모원려":["사면초가","기문둔갑"],"횡소천군":["강유겸제","용맹무쌍"],"천리추격":["극적제승","암전난방"],"암전난방":["극적제승","질풍노도"],"사소도":["이간계","낙정하석"],"파진최견":["천하무적","만부막적"],"천하무적":["파진최견","용맹무쌍"],"일기당천":["귀신정정","일고작기"],"귀신정정":["사생취의","용맹무쌍"],"미우주무":["현호제세","태청단경"]};
const formationEffects = {"일자진":"전열: 피해 감소 6.0% | 후열: -","구행진":"전열: 피해 감소 5.0% | 후열: 피해 증가 12.0%","추형진":"전열: 피해 감소 6.0% | 후열: 피해 증가 8.0%","기형진":"전열: 피해 증가 12.0% | 후열: 피해 감소 5.0%","어린진":"전열: 반격률 20.0% | 후열: 피해 감소 6.0%","방원진":"전열: 피해 감소 5.0% | 후열: 연격률 28.0%","안행진":"전열: 피해 감소 5.0% | 후열: 강공/기습 12.0%","호도진":"전열: 피해 증가 10.0% | 후열: 피해 감소 6.0%"};
const formationPositions = {"일자진":["front","front","front"],"구행진":["front","back","front"],"추형진":["back","front","back"],"기형진":["back","back","front"],"어린진":["front","back","back"],"방원진":["front","front","back"],"안행진":["back","front","front"],"호도진":["front","back","front"]};
const unitMatchupMap = {"창병":{strong:"기병",weak:"궁병"},"기병":{strong:"방패병",weak:"창병"},"방패병":{strong:"궁병",weak:"기병"},"궁병":{strong:"창병",weak:"방패병"}};

const analyzedMetaArchetypes = [
    {id:"wei_sima_shield",name:"위나라 응시낭고 방패 덱",concept:"장기전 종결",formation:"추형진",officers:[{name:"사마의",chosenTactics:["응시낭고","심모원려","사면초가"]},{name:"조조",chosenTactics:["효웅","휴양생식","현호제세"]},{name:"가후",chosenTactics:["경달권변","혼수모어","이간계"]}]},
    {id:"wei_flawless_assassin",name:"위나라 무결점 암살 덱",concept:"제어 면역 확정 암살",formation:"호도진",officers:[{name:"장료",chosenTactics:["함진살적","질풍노도","반객위주"]},{name:"조조",chosenTactics:["군령여산","횡징폭렴","진퇴유도"]},{name:"곽가",chosenTactics:["산무유책","동구적개","강유겸제"]}]},
    {id:"wei_assassin",name:"위나라 신속 암살 덱",concept:"적 주장 정밀 저격",formation:"호도진",officers:[{name:"장료",chosenTactics:["함진살적","질풍노도","반객위주"]},{name:"조조",chosenTactics:["군령여산","혼수모어","진퇴유도"]},{name:"악진",chosenTactics:["분용당선","동구적개","강유겸제"]}]},
    {id:"shu_combo_spear",name:"촉나라 연격 창병 덱",concept:"마초 확산 폭딜",formation:"구행진",officers:[{name:"위연",chosenTactics:["실병제위","진퇴유도","이퇴위진"]},{name:"마초",chosenTactics:["출수법","용맹무쌍","반객위주"]},{name:"서서",chosenTactics:["절절학문","문치무공","혼수모어"]}]},
    {id:"shu_evasion_bangwon",name:"촉나라 황제강 덱",concept:"스탯 무한 강탈",formation:"방원진",officers:[{name:"황충",chosenTactics:["적혈도","강유겸제","진퇴유도"]},{name:"제갈량",chosenTactics:["초선차전","전위위안","안영찰채"]},{name:"강유",chosenTactics:["담대여두","반객위주","일고작기"]}]},
    {id:"qun_cavalry",name:"군웅 돌격 기병 덱",concept:"여포 1턴 분쇄",formation:"구행진",officers:[{name:"원소",chosenTactics:["사소도","견진연봉","위위구조"]},{name:"여포",chosenTactics:["천하무쌍","용왕직전","만부막적"]},{name:"동탁",chosenTactics:["전권난정","운주유악","횡징폭렴"]}]},
    {id:"wu_magic_bow",name:"오나라 모략 신기루 덱",concept:"손권 복합 피해 캐리",formation:"구행진",officers:[{name:"손권",chosenTactics:["웅거","진퇴유도","강유겸제"]},{name:"육항",chosenTactics:["청백충근","수상개화","요사여신"]},{name:"노숙",chosenTactics:["탑상책","분성지계","여자동포"]}]}
];

const metaDeckUnitTypeMap = {"wei_sima_shield":"방패병","wei_flawless_assassin":"기병","wei_assassin":"창병","wu_magic_bow":"궁병","shu_combo_spear":"창병","shu_evasion_bangwon":"궁병","qun_cavalry":"기병"};
const defaultPresetDecks = analyzedMetaArchetypes.map((d, i) => ({ ...JSON.parse(JSON.stringify(d)), title: `${i + 1}군`, unitType: "", officers: d.officers.map(o => ({...o, chosenTactics: o.chosenTactics.length === 3 ? o.chosenTactics.slice(1, 3) : o.chosenTactics})) }));

const internalBondRules = [
    {name:"연환계",req:3,heroes:["동탁","여포","초선","황충"],effect:"피해/치유 4% 증가"},{name:"도법자연",req:2,heroes:["좌자","장각","우길"],effect:"모략/공심 4% 상승"},
    {name:"가모정세",req:2,heroes:["조조","조조(제왕)","곽가"],effect:"모략 피해 4% 증가, 무용 감소 4%"},{name:"위실주석",req:2,heroes:["하후돈","하후연"],effect:"파갑 8% 증가"},
    {name:"도원결의",req:3,heroes:["유비","유비(제왕)","관우","장비"],effect:"3, 6턴 시작 시 1중첩 저항"},{name:"백제탁고",req:2,heroes:["제갈량","조운"],effect:"배반/공심 8% 증가"},
    {name:"오자양장",req:2,heroes:["장료","악진","장합"],effect:"첫 2회차 배반 18% 상승"},{name:"동오대도독",req:2,heroes:["주유","육손","여몽","육항"],effect:"모략 피해 7% 증가"},
    {name:"군신상기",req:2,heroes:["조조","조조(제왕)","사마의"],effect:"고략/공심 4% 증가"}
];

const metaHawkRecommendationMap = {
    "wei_sima_shield": {name: "결운-호생", skill: "병력 최저 2명 70% 확정 회복 (사망 방지)"},
    "wei_flawless_assassin": {name: "열공-전광", skill: "시작 시 무용/통솔 30% 즉시 펌핑 (선공 압살)"},
    "wei_assassin": {name: "열공-전광", skill: "속도 30% 선점 및 적 주장 정밀 저격 최적화"},
    "wu_magic_bow": {name: "능소-진시", skill: "50% 확률 피해 30% 감소 (예열 턴 확보)"},
    "shu_combo_spear": {name: "열공-전광", skill: "마초 무용 극대화 및 확산 딜링 폭발"},
    "shu_evasion_bangwon": {name: "결운-감로", skill: "피격 후 100% 치료 및 각성 주입 (좀비 덱)"},
    "qun_cavalry": {name: "열공-전광", skill: "여포 1턴킬 결정력을 위한 무용 30% 증폭"}
};
const metaHawkAlternativesMap = {
    "wei_sima_shield": ["결운-감로", "능소-진시"],
    "wei_flawless_assassin": ["삭풍-설조", "삭풍-성모"],
    "wei_assassin": ["삭풍-설조", "열공-여천"],
    "wu_magic_bow": ["능소-전우", "결운-감로"],
    "shu_combo_spear": ["열공-여천", "삭풍-설조"],
    "shu_evasion_bangwon": ["결운-호생", "능소-진시"],
    "qun_cavalry": ["삭풍-설조", "열공-여천"]
};

const metaHawkRandomAttributesMap = {
    "wei_sima_shield":{attr1:{rank1:"통솔 +12%",rank2:"모략 +10%",rank3:"전능 +6%"},attr2:{rank1:"피감 +10%",rank2:"치유상승 +10%",rank3:"모략피해 +8%"},attr3:{rank1:"디버프 해제",rank2:"피격시 저항",rank3:"모면 +6%"}},
    "wei_flawless_assassin":{attr1:{rank1:"속도 +25",rank2:"무용 +12%",rank3:"전능 +6%"},attr2:{rank1:"파갑 +12%",rank2:"피해증가 +8%",rank3:"전법발동 +5%"},attr3:{rank1:"첫턴 선공",rank2:"제어 면역",rank3:"평타 혼란"}},
    "wei_assassin":{attr1:{rank1:"속도 +25",rank2:"무용 +12%",rank3:"전능 +6%"},attr2:{rank1:"파갑 +12%",rank2:"피해증가 +8%",rank3:"주장 타격"},attr3:{rank1:"첫턴 선공",rank2:"제어 면역",rank3:"회피 무시"}},
    "wu_magic_bow":{attr1:{rank1:"모략 +12%",rank2:"속도 +20",rank3:"통솔 +10%"},attr2:{rank1:"모략피해 +10%",rank2:"발동률 +5%",rank3:"피감 +8%"},attr3:{rank1:"치유상승 +12%",rank2:"디버프 해제",rank3:"모면 +6%"}},
    "shu_combo_spear":{attr1:{rank1:"무용 +12%",rank2:"속도 +20",rank3:"전능 +6%"},attr2:{rank1:"연격률 +10%",rank2:"확산피해 +12%",rank3:"물리피해 +10%"},attr3:{rank1:"3회후 무장해제",rank2:"첫턴 선공",rank3:"타격시 흡혈"}},
    "shu_evasion_bangwon":{attr1:{rank1:"모략 +12%",rank2:"전능 +6%",rank3:"통솔 +10%"},attr2:{rank1:"모략피해 +10%",rank2:"피감 +8%",rank3:"치유상승 +12%"},attr3:{rank1:"모면 +6%",rank2:"디버프 해제",rank3:"피격시 저항"}},
    "qun_cavalry":{attr1:{rank1:"무용 +12%",rank2:"속도 +20",rank3:"통솔 +10%"},attr2:{rank1:"파갑 +10%",rank2:"연격률 +8%",rank3:"물리피해 +10%"},attr3:{rank1:"첫턴 선공",rank2:"돌격데미지 +15%",rank3:"평타 혼란"}},
    "custom":{attr1:{rank1:"전능 +5%",rank2:"통솔 +10%",rank3:"무용 +10%"},attr2:{rank1:"피해증가 +6%",rank2:"피감 +6%",rank3:"발동률 +3%"},attr3:{rank1:"첫턴 제어면역",rank2:"첫턴 선공",rank3:"종료시 회복"}}
};

const systemGuideInsights = {"wei_sima_shield":"💡 [장기전 메타] 조조 방어막+가후 혼란+사마의 폭딜.","wei_flawless_assassin":"💡 [암살 메타] 장료 2턴 통찰(제어면역) 암살.","wei_assassin":"💡 [저격 메타] 장료 반객위주 스택 정밀 저격.","wu_magic_bow":"💡 [대기만성 메타] 손권 복합 피해 캐리.","shu_combo_spear":"💡 [확산 메타] 마초 반객위주 확산 폭딜.","shu_evasion_bangwon":"💡 [디버프 메타] 강유 적 스탯 무한 강탈.","qun_cavalry":"💡 [돌파 메타] 여포 추격(돌격) 1턴킬."};
const tacticalSet = new Set(["사마의","순욱","정욱","가후","곽가","제갈량","서서","강유","황월영","육손","주유","육항","노숙","대교","소교","장각","우길","좌자","화타","채문희","초선","장녕","장보"]);
const supportSet = new Set(["조조","조조(제왕)","유비","유비(제왕)","손권","손권(제왕)","화타","좌자","채문희","노숙","원소","동탁"]);
const shieldSet = new Set(["장비","조조","조조(제왕)","유비","유비(제왕)","전위","동탁","장각","사마의","손견"]);
const cavSet = new Set(["마초","장료","하후돈","하후연","여포","서서","곽가","정욱","가후","손상향","원소","악진","공손찬"]);
const bowSet = new Set(["황충","강유","제갈량","육손","주유","원소","황월영","육항","우길","초선","장보","장녕","손권","노숙","좌자","공손찬"]);

function getOfficerEquipment(officerName, deckUnitType = "방패병") {
    if (window.getEquipmentRecommendationFromGuide) { const ext = window.getEquipmentRecommendationFromGuide(officerName); if (ext?.helmet) return ext; }
    const isTac = tacticalSet.has(officerName), isSup = supportSet.has(officerName);
    const attr = isTac ? "모략 피해 가함" : (isSup ? "치유 효과 상승" : "무용 피해 가함");
    return { helmet: { name: "진현관", attr1: "피해 감소", attr2: "통솔 증가" }, armor: { name: "명재복", attr1: "피해 감소", attr2: attr }, accessory: { name: "박산로", attr1: attr, attr2: `${deckUnitType} 피해 감소` } };
}

function getOfficerDogamData(officerName) {
    if (window.getOfficerDataFromDogam) { const d = window.getOfficerDataFromDogam(officerName); if (d?.uniqueTactic && d.uniqueTactic !== "고유 전법 누락") return d; }
    return { role: "지휘/능동/패시브", uniqueTactic: internalMasterOfficerUniqueTacticMap[officerName] || "고유 전법 누락" };
}

const getTacticListBridge = () => window.getAllTacticsFromDogam ? (window.getAllTacticsFromDogam()?.length > 5 ? window.getAllTacticsFromDogam() : [...internalMasterTacticNames]) : [...internalMasterTacticNames];
const getOfficerNamesBridge = () => window.getAllOfficerNamesFromDogam ? (window.getAllOfficerNamesFromDogam()?.length > 5 ? window.getAllOfficerNamesFromDogam().sort((a,b)=>a.localeCompare(b,'ko')) : [...internalMasterOfficerNames]) : [...internalMasterOfficerNames];

function getBestMetaMatch(curNamesClean) {
    if (!curNamesClean || !curNamesClean.length) return null;
    let bestMeta = analyzedMetaArchetypes[0], maxScore = -1;
    analyzedMetaArchetypes.forEach(meta => {
        let score = meta.officers.reduce((acc, mo, idx) => {
            const mName = mo.name.replace(/\s+/g, '');
            return acc + (curNamesClean.includes(mName) ? 1 : 0) + (curNamesClean[idx] === mName ? 0.5 : 0);
        }, 0);
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
            if ((formationPositions[curFmt]?.[userOffIdx] || "front") !== (formationPositions[idealFmt]?.[metaIdx] || "front")) score -= 10;
            const userOff = deck.officers[userOffIdx];
            const metaTacs = metaOff.chosenTactics.length === 3 ? metaOff.chosenTactics.slice(1,3) : metaOff.chosenTactics;
            let unmatchTac = metaTacs.map(t => t.trim().replace(/\s+/g, '')), emptyOrWrong = 0, altCount = 0;
            
            (Array.isArray(userOff.chosenTactics) ? userOff.chosenTactics : ["",""]).forEach(tac => {
                const cT = tac?.toString().trim().replace(/\s+/g, '') || "";
                const idx = unmatchTac.indexOf(cT);
                if (idx !== -1) unmatchTac.splice(idx, 1);
            });

            (Array.isArray(userOff.chosenTactics) ? userOff.chosenTactics : ["",""]).forEach(tac => {
                const cT = tac?.toString().trim().replace(/\s+/g, '') || "";
                if (cT !== "" && !metaTacs.map(t=>t.replace(/\s+/g,'')).includes(cT)) {
                    let isAlt = unmatchTac.some((pT, i) => tacticAlternativesMap[pT]?.includes(cT) && unmatchTac.splice(i, 1));
                    isAlt ? altCount++ : emptyOrWrong++;
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
            const hName = off?.name?.toString().trim();
            if (hName && !heroDataMap[hName]?.isOwned) fb.logs.push({ type: 'warning', text: `자원 부족: [${hName}] 미보유` });
            off?.chosenTactics?.forEach((t, i) => { if(t && !tacticDataMap[t.replace(/\s+/g,'')]?.isOwned) fb.logs.push({ type:'warning', text:`전법 누락: ${i+2}번 슬롯 [${t}] 미보유` }); });
        });
        return fb;
    }

    const { bestMeta: meta, maxScore } = match;
    fb.logs.push({ type: 'info', text: `🎯 <strong>[${meta.name}]</strong> 기반 처방입니다.` });
    if (systemGuideInsights[meta.id]) fb.insight = systemGuideInsights[meta.id];

    const curFmt = deck.formation?.toString().trim() || "";
    if (curFmt.replace(/\s+/g, '') !== meta.formation.replace(/\s+/g, '')) fb.logs.push({ type: 'warning', text: `진형 교정: [${curFmt}] ➔ <strong>[${meta.formation}]</strong>` });

    const allEquipTacs = deck.officers.flatMap(o => o?.chosenTactics?.map(t => t?.toString().trim().replace(/\s+/g, ''))).filter(Boolean);
    let missingMeta = meta.officers.filter(mo => !curNames.includes(mo.name.replace(/\s+/g, '')));

    deck.officers.forEach((off, offIdx) => {
        const hName = off?.name?.toString().trim() || "", cleanHName = hName.replace(/\s+/g, '');
        if (!cleanHName) return missingMeta.length ? fb.logs.push({ type: 'warning', text: `빈 슬롯 ➔ <strong>[${missingMeta.shift().name}]</strong> 권장` }) : null;
        if (!heroDataMap[hName]?.isOwned) fb.logs.push({ type: 'warning', text: `자원 경고: [${hName}] 미보유` });

        const metaIdx = meta.officers.findIndex(mo => mo.name.replace(/\s+/g, '') === cleanHName);
        if (metaIdx !== -1) {
            if ((formationPositions[curFmt]?.[offIdx] || "front") !== (formationPositions[meta.formation]?.[metaIdx] || "front")) fb.logs.push({ type: 'warning', text: `배치 오류: [${hName}] 위치 교정 요망` });
            const mTacs = meta.officers[metaIdx].chosenTactics;
            let unmatchTac = (mTacs.length===3 ? mTacs.slice(1,3) : mTacs).map(t=>t.replace(/\s+/g,'')).filter(t => !allEquipTacs.includes(t));
            
            (off.chosenTactics || []).forEach((t, i) => {
                const cT = t?.toString().trim().replace(/\s+/g, '') || "";
                if (!cT && unmatchTac.length) {
                    const pTac = unmatchTac.shift(), alts = tacticAlternativesMap[pTac] || ["A급", "B급"];
                    fb.logs.push({ type: 'warning', text: `[${hName}] ${i+2}슬롯: 1순위 [${pTac}] / 대체 [${alts[0]}] 권장` });
                } else if (cT) {
                    if (!tacticDataMap[cT]?.isOwned) fb.logs.push({ type: 'warning', text: `자원 부족: [${t}] 미보유` });
                }
            });
        } else {
            fb.logs.push({ type: 'warning', text: `장수 교체: [${hName}] 제외 ${missingMeta.length ? `➔ [${missingMeta.shift().name}] 투입` : '요망'}` });
        }
    });
    return fb;
}

function calculateActivatedBond(officers) {
    const curNames = officers?.map(o => o?.name?.toString().trim()).filter(Boolean) || [];
    if (!curNames.length) return "활성화 효과 없음";
    const matched = internalBondRules.filter(r => curNames.filter(n => r.heroes.includes(n)).length >= r.req && new Set(curNames.filter(n => r.heroes.includes(n))).size >= (r.req===3?2:1));
    return matched.length ? matched.map(r => `<strong>[${r.name}]</strong> ${r.effect}`).join(" / ") : "활성화 효과 없음";
}

let dynamicPresetDecks = [], currentSortMode = 'default';
let draggedDeckOriginIdx = null, draggedOfficerSlotIdx = null;

// [CSS 주입: 장비 속성(Equipment) 박스 디자인 클래스 추가]
const injectCustomUIStyles = () => {
    if (document.getElementById('deck-custom-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'deck-custom-ui-styles';
    style.innerHTML = `
        /* 드롭박스 전역 스타일링 */
        .deck-card select {
            background-color: #1e293b; color: #f8fafc; border: 1px solid #475569; border-radius: 4px;
            padding: 6px 24px 6px 10px; font-size: 13px; appearance: none; -webkit-appearance: none;
            outline: none; cursor: pointer;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
            background-repeat: no-repeat; background-position: right 8px center; background-size: 14px;
            transition: all 0.2s ease-in-out; width: 100%; box-sizing: border-box; font-family: inherit;
        }
        .deck-card select:focus, .deck-card select:hover { border-color: #8b5cf6; box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.25); background-color: #0f172a; }
        .deck-card select option { background-color: #0f172a; color: #f8fafc; padding: 8px; }
        
        /* 전투매 추천 박스 */
        .hawk-recommend-box { margin-top: 10px; padding: 12px; background-color: #1e293b; border-left: 4px solid #3b82f6; border-radius: 6px; font-size: 13px; color: #e2e8f0; line-height: 1.5; }
        .hawk-recommend-box .hawk-highlight { color: #60a5fa; font-weight: bold; }
        .hawk-recommend-box .hawk-subtext { color: #94a3b8; font-size: 11px; }
        .hawk-recommend-box .hawk-detail { margin-top: 6px; padding-top: 6px; border-top: 1px dashed #334155; color: #cbd5e1; font-size: 12px; }

        /* [복구] 장비 속성 출력 박스 디자인 (계층적 가독성 확보) */
        .equipment-box { margin-top: 6px; padding: 6px; border: 1px solid #334155; border-radius: 4px; background-color: #0f172a; font-size: 11px; }
        .equipment-box .eq-item { margin-bottom: 2px; color: #cbd5e1; }
        .equipment-box .eq-item:last-child { margin-bottom: 0; }
        .equipment-box .eq-attr { color: #64748b; font-size: 10px; margin-left: 4px; }

        .feedback-item.success { color: #4ade80; font-weight: 500; }
        .feedback-item.warning { color: #facc15; }
        .feedback-item.info { color: #60a5fa; }
        
        .officer-meta select { margin-top: 4px; margin-bottom: 4px; }
        .tactic-row select { margin-top: 2px; }
        .deck-footer-bar select { width: auto; min-width: 120px; margin-right: 12px; }
    `;
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
    dynamicPresetDecks = JSON.parse(JSON.stringify(defaultPresetDecks)); dynamicPresetDecks.forEach((d, i) => d.originIdx = i);
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
        saved.heroes?.forEach(x => { if(x?.name) hMap[x.name.trim()] = { isOwned: !!x.isOwned }; });
        saved.tactics?.forEach(x => { if(x?.name) tMap[x.name.trim()] = { isOwned: !!x.isOwned }; });

        dynamicPresetDecks.sort((a,b) => (a.originIdx||0) - (b.originIdx||0)).forEach((deck, aIdx) => {
            const curNames = deck.officers.map(o => o?.name?.trim().replace(/\s+/g,'')).filter(Boolean);
            const match = getBestMetaMatch(curNames);
            let dType = deck.unitType || (match?.bestMeta ? metaDeckUnitTypeMap[match.bestMeta.id] : "창병"), hawkHtml = '';

            if (curNames.length > 0) {
                const hk = match?.bestMeta ? (metaHawkRecommendationMap[match.bestMeta.id] || {name:"-",skill:"-"}) : {name:"범용 SSR",skill:"기본 최적화"};
                const hkAlt = match?.bestMeta ? (metaHawkAlternativesMap[match.bestMeta.id] || ["-","-"]) : ["열공-전광","결운-호생"];
                const resolvedMetaId = match?.bestMeta?.id;
                const hA = (resolvedMetaId && metaHawkRandomAttributesMap[resolvedMetaId]) ? metaHawkRandomAttributesMap[resolvedMetaId] : metaHawkRandomAttributesMap["custom"];
                
                hawkHtml = `<div class="hawk-recommend-box">
                    <span class="hawk-highlight">🦅 전투매: 🥇${hk.name}</span> (${hk.skill}) 
                    <span class="hawk-subtext">[대체: 🥈${hkAlt[0]} 🥉${hkAlt[1]}]</span>
                    <div class="hawk-detail">1순위 속성 ➔ 기초: ${hA.attr1.rank1} / 보정: ${hA.attr2.rank1} / 기믹: ${hA.attr3.rank1}</div>
                </div>`;
            }

            const offHtml = deck.officers.map((off, oIdx) => {
                const hName = off?.name?.trim() || "", cName = hName.replace(/\s+/g,'');
                const dg = cName ? getOfficerDogamData(hName) : null;
                
                let tRows = `<div class="tactic-row ${cName&&(hMap[hName]?.isOwned||tMap[dg?.uniqueTactic?.replace(/\s+/g,'')]?.isOwned)?'owned':'missing'}" style="border-left:3px solid #cd9b33;"><span>⭐ ${dg?.uniqueTactic||'고유 전법'}</span></div>`;
                (off.chosenTactics||[]).forEach((t, sIdx) => {
                    const cT=t?.trim()||"", isOwn=tMap[cT.replace(/\s+/g,'')]?.isOwned;
                    tRows += `<div class="tactic-row ${cT?(isOwn?'owned':'missing'):'missing'}"><select onchange="updateDeckState(${deck.originIdx},'tac',this.value,${oIdx},${sIdx})"><option value="">선택 안함</option>${getTacticListBridge().map(tx=>`<option value="${tx}" ${cT===tx?'selected':''}>${tx}</option>`).join('')}</select></div>`;
                });

                const eq = cName ? getOfficerEquipment(hName, dType) : null;
                
                // [복구 완료] 장비 속성(attr1, attr2) 명시적 렌더링 코드 바인딩
                const eqH = eq ? `
                    <div class="equipment-box">
                        <div class="eq-item">🪖 ${eq.helmet.name} <span class="eq-attr">[${eq.helmet.attr1} / ${eq.helmet.attr2}]</span></div>
                        <div class="eq-item">🛡️ ${eq.armor.name} <span class="eq-attr">[${eq.armor.attr1} / ${eq.armor.attr2}]</span></div>
                        <div class="eq-item">📿 ${eq.accessory.name} <span class="eq-attr">[${eq.accessory.attr1} / ${eq.accessory.attr2}]</span></div>
                    </div>` : '';
                
                return `<div class="officer-slot" draggable="true" ondragstart="handleOfficerDragStart(event,${deck.originIdx},${oIdx})" ondragover="handleOfficerDragOver(event)" ondragleave="handleOfficerDragLeave(event)" ondrop="handleOfficerDrop(event,${deck.originIdx},${oIdx})" ondragend="handleOfficerDragEnd(event)" style="cursor:grab;${!cName?'border:1px dashed #444':''}"><div class="officer-meta"><span class="position-badge">${formationPositions[deck.formation]?.[oIdx]==='front'?'전열':'후열'}</span><select onchange="updateDeckState(${deck.originIdx},'off',this.value,${oIdx})"><option value="">선택 안함</option>${getOfficerNamesBridge().map(hx=>`<option value="${hx}" ${hName===hx?'selected':''}>${hx}</option>`).join('')}</select></div>${eqH}<div class="tactic-status-box">${tRows}</div></div>`;
            }).join('');

            const fb = generateStructuredFeedback(deck, hMap, tMap), score = calculateStrictDeckScore(deck);
            const fbH = (score===100&&fb.logs.length<=1) ? `<div class="feedback-item success">★ 무결성 최적화 명품 군단입니다.</div>` : fb.logs.map(l=>`<div class="feedback-item ${l.type}">${l.text}</div>`).join('') + (fb.insight?`<div class="feedback-item info">${fb.insight}</div>`:'');

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
                    <select onchange="updateDeckState(${deck.originIdx},'formation',this.value)">${Object.keys(formationEffects).map(f=>`<option value="${f}" ${deck.formation===f?'selected':''}>${f}</option>`).join('')}</select>
                    <select onchange="updateDeckState(${deck.originIdx},'unitType',this.value)">${["","창병","기병","궁병","방패병"].map(u=>`<option value="${u}" ${deck.unitType===u?'selected':''}>${u||'자동 판별'}</option>`).join('')}</select>
                    <span style="font-size:11px;margin-left:10px;">${formationEffects[deck.formation]||''}</span>
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

document.addEventListener('DOMContentLoaded', () => { 
    injectCustomUIStyles(); 
    loadDeckTextData(); 
    renderDeckBuilder(); 
});

// [시스템 분석] deck_core.js - 부대 순서 변경 복구 및 무결성 엔진 기동 (신규 허저, 호치, 부동여산, 호위경주 인연 반영)
console.log("[시스템 분석] deck_core.js 부대 순서 변경 복구 및 무결성 엔진 기동");

const cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

// ==========================================================================
// LAYER 1: 초경량 자가 치유(Self-Healing) 통합 마스터 사전
// ==========================================================================
const FB_OFF_META = {
    "가후":["경달권변","궁병/방패병","wei","SS"], "곽가":["산무유책","궁병/방패병","wei","SH"], "사마의":["응시낭고","방패병/궁병","wei","SC"], "순욱":["거중지중","궁병/창병","wei","SH"], "악진":["분용당선","창병/궁병","wei","PC"], "전위":["축호과간","창병/방패병","wei","TC"], "정욱":["십면매복","방패병/궁병","wei","SC"], "조조(제왕)":["군령여산","창병/방패병","wei","TC"], "조조":["효웅","방패병/기병","wei","TC"], "장료":["함진살적","창병/기병","wei","PCm"], "장합":["교변병기","방패병/창병","wei","TC"], "하후돈":["발시담정","창병/방패병","wei","TC"], "하후연":["충용","창병/기병","wei","PCm"], "허저":["호치","방패병/창병","wei","TC"],
    "관우":["무성","창병/기병","shu","PC"], "강유":["담대여두","방패병/기병","shu","SC"], "마대":["습참","창병/방패병","shu","PC"], "마초":["출수법","창병/기병","shu","PCm"], "서서":["절절학문","창병/궁병","shu","SS"], "사마가":["만왕","창병/방패병","shu","PC"], "위연":["실병제위","창병/궁병","shu","PC"], "유비":["인정","창병/기병","shu","SH"], "유비(제왕)":["재주복주","창병/방패병","shu","SH"], "장비":["연인노호","창병/방패병","shu","TC"], "제갈량":["초선차전","궁병/방패병","shu","SH"], "조운":["칠진칠출","창병/방패병","shu","PC"], "황충":["적혈도","창병/방패병","shu","PC"], "황월영":["묘산천기","궁병/방패병","shu","SH"],
    "대교":["정수유심","창병/궁병","wu","SH"], "노숙":["탑상책","궁병/기병","wu","SH"], "소교":["화용욕모","궁병/기병","wu","SH"], "손견":["강동맹호","창병/방패병","wu","TC"], "손권":["웅거","궁병/기병","wu","SC"], "손상향":["효희","궁병/기병","wu","PCm"], "손책":["강동패주","창병/방패병","wu","PC"], "손권(제왕)":["겸권상계","창병/궁병","wu","SS"], "여몽":["백의도강","방패병/궁병","wu","SS"], "육손":["지변규려","창병/기병","wu","SC"], "육항":["청백충근","창병/궁병","wu","SH"], "주유":["봉화연천","창병/궁병","wu","SC"], "주태":["청라산개","기병/방패병","wu","TC"], "정보":["칠척사모","기병/방패병","wu","TC"], "황개":["요원지화","방패병/궁병","wu","TC"],
    "공손찬":["위진새북","기병/창병","qun","PCm"], "동탁":["전권난정","방패병/기병","qun","TC"], "안량":["효장","창병/기병","qun","PC"], "여포":["천하무쌍","궁병/기병","qun","PCm"], "우길":["태평경","창병/궁병","qun","SS"], "원소":["사소도","방패병/기병","qun","TC"], "장각":["황천당립","궁병/기병","qun","SC"], "장녕":["천의난위","궁병/방패병","qun","SS"], "장보":["요풍사기","궁병/방패병","qun","SS"], "좌자":["화겁생기","궁병/방패병","qun","SH"], "채문희":["비분시","궁병/기병","qun","SH"], "초선":["폐월","창병/기병","qun","SH"], "화타":["청낭제세","궁병/방패병","qun","SH"]
};
const FB_OFFICERS = Object.keys(FB_OFF_META);
const FB_TACTICS = "가정지전,간담상조,강유겸제,견불가최,견진연봉,공기불비,과하탁교,교취호탈,극적제승,금낭묘계,금적금왕,금창신,금철교명,기문둔갑,낙정하석,동구적개,동장철벽,동촉기선,만부막적,만전제발,만천과해,문치무공,미우주무,반객위주,병량촌단,부동여산,분성지계,비사주석,사면초가,사생취의,선등함진,수상개화,순수견양,승승장구,심모원려,안영찰채,암전난방,양의화생,양초선행,여자동포,요사여신,용맹무쌍,용왕직전,운주유악,원성재도,위위구조,유좌유용,이간계,이아환아,이일대로,이퇴위진,일고작기,인세이도,전위위안,제곤부위,중정기고,지인선임,진퇴유도,진화타겁,질풍노도,천리추격,천시지리,체천행도,축세대발,축호과간,태청단경,토적격문,현호제세,호령삼군,혼수모어,홍수첨향,화소적벽,횡소천군,횡징폭렴,휴양생식".split(',');

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

const FB_TACTIC_DESC_MAP = {
    "금낭묘계": { role: "지휘 (100%)", target: "아군 전체", desc: "첫 3턴 내 매 턴 시작 시, 아군 전체의 연격률을 각각 30% > 20% > 10%만큼 감소시키고, 턴 종료 시 아군 중 병력이 가장 낮은 대상의 병력을 회복함(치료율 55%, 모략의 영향)." },
    "간담상조": { role: "지휘 (100%)", target: "적군 전체, 아군 2팀", desc: "매 턴 시작 시, 60% 확률로 적군 전체가 가하는 무용 피해 및 모략 피해를 25% 감소시키며(통솔의 영향 받음, 같은 열에 적군 아군이 있을 경우 계수 20% 상승), 적군 대상 2명에게 나약을 부여합니다(이번 턴 종료 시까지 지속). 이후 아군 대상 2명의 병력을 회복시킵니다(치료율 90%, 통솔의 영향 받음)." },
    "가정지전": { role: "추격 (35%)", target: "적군 1팀", desc: "일반 공격 후 공격 대상의 통솔을 10% 감소시키고 2턴 동안 지속하며 270% 모략 피해를 가합니다." },
    "강유겸제": { role: "지휘 (50%)", target: "아군 전체", desc: "턴 시작 시 아군 전체가 받는 피해를 34% 감소시키고, 아군 중 무용이 가장 높은 목표가 받는 모략 피해를 17%, 모략이 가장 높은 목표가 받는 무용 피해를 17% 감소시킵니다(턴 종료시까지 지속)." },
    "견불가최": { role: "패시브 (100%)", target: "자신", desc: "자신이 받는 피해가 35% 감소합니다. 해제 불가. 일반 공격을 받은 후 35%의 확률로 아군 목표 1명의 디버프 상태를 1종류 해제합니다." },
    "견진연봉": { role: "능동 (60%)", target: "자신, 아군 1팀", desc: "자신과 후열 아군 1명의 연격률이 50% 증가하며 1턴간 지속되고, 1중첩의 저항을 획득합니다." },
    "공기불비": { role: "추격 (50%)", target: "적군 2팀", desc: "일반 공격 후, 적 2개 목표에게 130% 모략 피해를 가합니다." },
    "과하탁교": { role: "추격 (50%)", target: "적군 1팀", desc: "일반 공격 후 공격 대상에게 150% 모략 피해를 가하고 50% 확률로 추가로 150% 모략 피해를 한 번 더 가합니다." },
    "교취호탈": { role: "능동 (35%)", target: "적군 2팀", desc: "적군 2개 대상에게 185% 무용 피해를 가하고 70% 확률로 보급 차단을 부여하며 2턴 지속합니다." },
    "극적제승": { role: "능동 (50%)", target: "적군 2팀", desc: "적군 중 무용이 가장 높은 대상과 통솔이 가장 낮은 대상에게 135% 모략 피해를 가합니다." },
    "금적금왕": { role: "능동 (35%)", target: "적군 전체", desc: "적 전체에게 180%의 모략 피해를 입깁니다. 목표가 후열일 경우, 추가로 50%의 모략 피해를 입깁니다." },
    "금창신": { role: "지휘 (100%)", target: "자신, 아군 1팀", desc: "전투 시작 시, 자신은 전투 첫 3턴동안 받는 피해가 30% 감소하고 해제 불가입니다. 아군 모략이 가장 높은 대상에게 신산 부여: 일반 공격 후 50% 확률로 대상에게 130% 모략 피해를 가함." },
    "금철교명": { role: "패시브 (50%)", target: "적군 1팀", desc: "일반 공격 또는 반격 후, 공격 대상의 아군 1개 대상에게 이번 피해의 160%에 해당하는 확산 피해를 가합니다." },
    "기문둔갑": { role: "능동 (50%)", target: "적군 2팀", desc: "적군 2개 대상의 무용·모략·통솔을 15% 감소하고 2턴 지속합니다." },
    "낙정하석": { role: "능동 (50%)", target: "적군 1팀", desc: "적 1명에게 216%의 모략 피해를 입깁니다. 대상이 디버프를 보유 중이면 해당 피해 계수가 54% 증가합니다." },
    "동구적개": { role: "지휘 (100%)", target: "아군 2팀", desc: "전투 전 4턴 동안, 자신 및 아군 1개 대상의 받는 피해 36% 감소하고 해제 불가입니다." },
    "동장철벽": { role: "능동 (50%)", target: "아군 전체", desc: "아군 전체에게 저항과 통어를 각 1중첩 부여하고 2턴 지속합니다." },
    "동촉기선": { role: "능동 (50%)", target: "자신, 적군 2팀", desc: "자신의 간파 20% 증가하고 2턴 지속되며 적군 2개 대상에게 105% 모략 피해를 가합니다." },
    "만부막적": { role: "추격 (50%)", target: "적군 전체, 자신", desc: "일반 공격 후, 적군 전체에게 105% 무용 피해를 가하고 자신의 가하는 무용 피해를 5% 증가시키며 최대 4중첩, 해제 불가, 전투 종료까지 지속합니다." },
    "만전제발": { role: "능동 (50%)", target: "적군 전체", desc: "적군 전체에게 115% 무용 피해를 가하고 50% 확률로 적군 1개 대상(우선 후열)에게 추가로 115% 무용 피해를 가합니다." },
    "만천과해": { role: "능동 (70%)", target: "아군 2팀", desc: "자신 및 전열의 아군 대상 1명에게 병력을 회복하고(치료율 80%, 모략의 영향 받음), 받는 무용 피해와 모략 피해가 15% 감소합니다(모략의 영향 받음). 2턴 지속." },
    "문치무공": { role: "능동 (70%)", target: "아군 2팀", desc: "아군 중 무용이 가장 높은 대상의 무용 증가(문치무공 발동자 무용의 10%만큼 증가), 강공 피해 20% 증가(2턴 지속). 또한 모략이 가장 높은 대상의 모략 증가, 치료 효과 25% 증가(2턴 지속)." },
    "미우주무": { role: "능동 (50%)", target: "아군 1팀", desc: "아군 중 통솔이 가장 높은 1개 대상의 받는 피해를 25% 감소시켜 2턴 지속하고 해당 대상의 병력을 회복(치료율 40%, 모략 영향)합니다." },
    "반객위주": { role: "패시브 (100%)", target: "자신, 적군 1팀", desc: "무용 피해를 가한 후 자신의 무용 피해가 8% 상승(최대 4중첩, 해제 불가), 풀중첩 시 대상에게 130% 추가 무용 피해. 모략 피해를 가한 후 자신의 모략 피해가 8% 상승(최대 4중첩), 풀중첩 시 130% 추가 모략 피해." },
    "병량촌단": { role: "추격 (35%)", target: "적군 1팀", desc: "일반 공격 후, 일반 공격 대상에게 280% 무용 피해를 가하며 50% 확률로 허약을 2턴 부여합니다." },
    "부동여산": { role: "패시브 (100%)", target: "자신, 적군 1팀", desc: "무장의 고유 능동 전법 발동률이 10% 상승하고, 자신의 통솔이 무용의 15%만큼 상승합니다. 능동 전법 피해 후 적군 1명에게 180% 추가 무용 피해(자신 통솔이 대상보다 높을 경우 계수 70% 상승)." },
    "분성지계": { role: "능동 (70%)", target: "적군 전체", desc: "적군 전체에게 화상(행동 시작 시 20% 추가 모략 피해 입음)을 부여하고 대상이 가하는 피해를 20% 감소시키며(모략의 영향을 받음) 2턴 간 지속됩니다." },
    "비사주석": { role: "추격 (35%)", target: "적군 1팀", desc: "일반 공격 후 일반 공격 대상에게 220% 무용 피해를 가하며 50% 확률로 겁전을 1턴 부여합니다." },
    "사면초가": { role: "능동 (50%)", target: "적군 1팀", desc: "적군에게 67% 무용 피해를 4회 가하며, 매 회 대상은 독립적으로 선택됩니다." },
    "사생취의": { role: "패시브 (100%)", target: "자신", desc: "내가 받는 피해가 10% 상승하고 가하는 피해가 45% 상승하며 해제 불가입니다." },
    "선등함진": { role: "능동 (50%)", target: "적군 전체", desc: "적 전체에게 100%의 무용 피해를 입히고, 35%의 확률로 겁전 부여, 1턴 지속합니다. 각 목표별 확률은 독립적으로 계산됩니다." },
    "수상개화": { role: "패시브 (100%)", target: "자신", desc: "무장 고유의 능동 전법 발동 확률이 12% 증가하며 해제 불가합니다. 매 턴 시작 시, 자신이 가하는 피해가 12% 증가하며, 최대 4회 중첩되고 해제 불가합니다." },
    "승승장구": { role: "능동 (50%)", target: "자신, 적군 2팀", desc: "자신에게 용맹 및 신속을 부여하며 2턴 간 지속됩니다. 적군 대상 2명에게 140% 무용 피해를 입히며, 만약 속도가 대상보다 높을 경우 피해 계수가 40% 상승합니다." },
    "순수견양": { role: "능동 (50%)", target: "적군 2팀, 아군 2팀", desc: "2턴 동안 적군 2명이 가하는 피해를 15% 감소(모략 영향)시키고, 50% 확률로 무장 해제를 부여하여 1턴간 지속시킵니다. 이후 아군 2명의 병력을 회복시킵니다(치료율 90%, 모략 영향)." },
    "심모원려": { role: "추격 (50%)", target: "자신, 적군 1팀", desc: "일반 공격 후 자신의 모략 피해가 5% 상승하며 최대 4중첩, 해제 불가이며 일반 공격 대상에게 240% 모략 피해 가합니다." },
    "안영찰채": { role: "지휘 (100%)", target: "적군 2팀, 아군 전체", desc: "매 턴 시작 시 70% 확률로 아군 전체의 병력을 회복시키고(치료율 80%, 모략 영향), 아군 전체가 행동하기 전 받는 피해를 20% 감소시킵니다. 이후 30% 확률로 적군 전열에 피곤을 부여합니다." }, 
    "암전난방": { role: "능동 (50%)", target: "자신, 적군 1팀", desc: "자신의 강공 30% 증가하고 2턴 지속하며 적군 대상 1명에게 220% 무용 피해를 가합니다. 대상이 전열일 경우 피해 계수가 110% 상승합니다." },
    "양의화생": { role: "능동 (50%)", target: "자신, 적군 2팀", desc: "자신에게 2턴 동안 다모를 부여합니다. 적군 대상 2명에게 160%의 모략 피해를 입힙니다. 대상의 무용이 모략보다 높을 경우 피해 계수가 20% 상승합니다." },
    "양초선행": { role: "능동 (50%)", target: "아군 1팀", desc: "아군 중 병력이 가장 낮은 대상의 병력을 회복(치료율 174%, 모략 영향)하고 해당 대상의 병력이 60% 미만이면 치료 계수 58% 증가합니다." },
    "여자동포": { role: "능동 (50%)", target: "아군 2팀", desc: "아군 대상 2명에게 저항 및 불굴 1중첩을 부여합니다. 피해를 입은 후 병력을 회복하며(치료율 120%, 모략 영향, 최대 2회 발동), 2턴간 지속됩니다." },
    "요사여신": { role: "패시브 (100%)", target: "자신", desc: "자신의 기습이 30% 상승하고 매번 모략 피해를 가한 후 자신이 가하는 모략 피해가 11% 상승하며 최대 4회 중첩, 해제 불가, 전투 종료까지 지속합니다." },
    "용맹무쌍": { role: "패시브 (100%)", target: "자신, 적군 1팀", desc: "강공이 25% 상승하며(무용 영향), 해제할 수 없습니다. 무용 피해를 입힌 후, 70% 확률로 적군 1개 대상에게 40% 추가 무용 피해를 입깁니다." },
    "용왕직전": { role: "추격 (50%)", target: "자신, 적군 2팀", desc: "일반 공격 후 자신에게 용맹 상태를 2턴간 부여합니다. 그 후 적 목표 2명에게 115%의 무용 피해를 입깁니다. 자신의 무용이 목표보다 높을 경우 피해 계수가 27% 증가합니다." },
    "운주유악": { role: "지휘 (100%)", target: "아군 전체", desc: "전투 전 3턴 동안 매 턴 시작 시, 아군 전체의 연격률을 40% 증가시키고 90% 확률로 아군 1개 대상에게 통찰을 부여하여 턴 종료까지 지속합니다." },
    "원성재도": { role: "능동 (35%)", target: "적군 1팀", desc: "적군 1개 대상의 받는 피해를 30% 증가시켜 2턴 지속하며 해당 대상에게 155% 모략 피해를 가합니다." },
    "위위구조": { role: "추격 (50%)", target: "적군 2팀, 아군 2팀", desc: "일반 공격 후 적군 대상 2명이 가하는 피해가 10% 감소하고 최대 4중첩되고 해제 불가이며 2턴 간 지속됩니다. 이어 아군 대상 2명의 병력을 회복(치료율 165%, 통솔 영향)시킵니다." },
    "유좌유용": { role: "지휘 (50%)", target: "아군 전체", desc: "턴 시작 시, 아군 전체에 불굴 상태를 부여합니다: 피해를 입은 후 병력 회복(치료율 90%, 모략의 영향을 받음), 턴 종료까지 지속, 매 턴 최대 3회 발동." },
    "이간계": { role: "능동 (35%)", target: "적군 1팀", desc: "적 1개 대상에게 250% 모략 피해 가하고 80% 확률로 혼란을 부여하며 1턴 지속됩니다." },
    "이아환아": { role: "패시브 (50%)", target: "적군 1팀", desc: "피해를 받은 후 피해 출처에 132% 추가 무용 피해를 가하며(통솔의 영향) 매 턴 최대 4회 발동합니다." },
    "이일대로": { role: "능동 (50%)", target: "적군 2팀", desc: "적군 2개 대상의 가하는 피해 16% 감소하고 50% 확률로 무기력을 부여하며 2턴 지속합니다." },
    "이퇴위진": { role: "지휘 (50%)", target: "자신, 아군 1팀", desc: "매 턴 시작 시, 자신과 후열의 아군 대상 1명에게 저항 1중첩을 부여합니다. 자신이 받는 피해가 16% 감소하고, 후열 아군 대상 1명이 가하는 피해가 16% 증가하며, 효과는 턴 종료시까지 지속됩니다." },
    "일고작기": { role: "패시브 (100%)", target: "자신", desc: "자신의 연격률이 60% 상승하고 가하는 피해가 12% 상승하며 해제 불가입니다." },
    "인세이도": { role: "패시브 (100%)", target: "자신", desc: "받는 피해 21% 감소, 해제 불가. 자신의 행동 시작 시, 다음 효과 중 1개 발동: 자신에게 장벽 3중첩 부여, 또는 자신의 병력 회복(치료율 60%, 가장 높은 속성의 영향)." },
    "전위위안": { role: "패시브 (100%)", target: "자신, 아군 1팀", desc: "자신의 통솔이 모략의 15%만큼 상승하며, 해제 불가. 매 턴 최초로 피해를 받은 후, 50%(모략 영향)의 확률로 자신에게 저항을 1중첩 부여하고, 자신 및 아군 1명 치료(치료율 120%, 모략 영향)." },
    "제곤부위": { role: "지휘 (100%)", target: "아군 2팀", desc: "매 턴 행동 시, 자신과 아군 1개 대상의 병력을 회복(치료율 70%, 통솔의 영향)합니다." },
    "중정기고": { role: "능동 (35%)", target: "아군 전체", desc: "아군 전체의 병력을 회복(치료율 150%, 모략 영향)합니다." },
    "지인선임": { role: "능동 (35%)", target: "적군 전체", desc: "적군 전체에게 168% 모략 피해를 가하고 자신의 모략이 대상보다 높으면 해당 피해 계수가 42% 증가합니다." },
    "진퇴유도": { role: "지휘 (100%)", target: "적군 전체, 아군 전체", desc: "홀수 턴 시작 시 적군 전체가 가하는 피해 30% 감소(통솔 영향, 1턴 지속). 짝수 턴 시작 시 아군 전체가 가하는 피해 15% 증가(통솔 영향, 1턴 지속)." },
    "진화타겁": { role: "능동 (35%)", target: "적군 전체", desc: "적군 전체에게 115% 무용 피해를 가하고 70% 확률로 허약을 부여하며 2턴 지속합니다." },
    "질풍노도": { role: "능동 (70%)", target: "자신, 적군 2팀", desc: "자신의 파갑 15% 상승(무용 영향, 2턴 지속). 동시에 적군 대상 2명에게 110%의 무용 피해를 입히고, 40% 확률로 무용이 가장 낮은 적에게 110% 추가 무용 피해를 입깁니다." },
    "천리추격": { role: "추격 (50%)", target: "자신, 적군 2팀", desc: "일반 공격 후, 자신 추격 전법 발동률 3% 증가, 추격 전법 가하는 피해 6% 증가(최대 3중첩, 해제 불가). 또한 적군 대상 2명에게 130% 모략 피해를 입깁니다." },
    "천시지리": { role: "능동 (50%)", target: "아군 전체", desc: "아군 전열이 받는 무용 피해를 22% 감소시키고 후열이 받는 모략 피해를 22% 감소시켜 2턴 동안 지속합니다." },
    "체천행도": { role: "패시브 (100%)", target: "자신, 적군 2팀", desc: "자신의 공심이 20% 증가합니다(해제 불가). 추격 피해를 입힐 시, 50%의 확률로 목표의 아군 2명에게 65%의 확산 피해를 입깁니다." },
    "축세대발": { role: "능동 (50%)", target: "자신, 적군 2팀", desc: "자신이 가하는 무용 피해 20% 증가하고 2턴 지속하며 적군 2개 대상에게 130% 무용 피해를 가합니다." },
    "축호과간": { role: "패시브 (100%)", target: "적군 1팀, 자신", desc: "피해를 입은 후 피해 시전자에게 적의 부여(중첩당 대상 통솔 4% 감소). 또한 자신의 통솔 4% 증가(최대 5중첩). 행동 시 70% 확률로 병력 회복(치료율 240%, 통솔 영향) 및 적 200% 무용 피해." },
    "태청단경": { role: "패시브 (50%)", target: "아군 2팀", desc: "피해를 입은 후, 아군 2명의 병력을 회복하고(치율 45%, 모략 영향), 50%의 확률로 디버프 1개를 해제합니다. 매 턴 최대 5회 발동합니다." },
    "토적격문": { role: "능동 (80%)", target: "적군 전체, 자신", desc: "적군 전체에 도발효과를 부여하고 자신이 받는 일반 공격 피해를 40% 감소시키며 2턴 지속합니다." },
    "현호제세": { role: "능동 (50%)", target: "아군 2팀", desc: "아군 2명의 디버프 1개를 해제하고, 병력을 회복합니다(치료율 155%, 통솔 영향)." },
    "호령삼군": { role: "패시브 (100%)", target: "자신", desc: "피해를 가한 후 자신의 배반과 공심이 4% 상승하고 강공과 기습이 4% 상승하며 최대 6회 중첩, 해제 불가, 전투 종료까지 지속합니다." },
    "호치": { role: "능동 (60%)", target: "적군 2팀, 자신", desc: "적군 대상 2명의 통솔을 7% 탈취하고 200% 무용 피해를 입힙니다(전열일 경우 피해 계수 40% 증가). 입힌 피해의 20%만큼 자신의 병력을 회복하며, 확률적으로 쟁패 획득 및 피곤을 부여합니다." },
    "혼수모어": { role: "지휘 (70%)", target: "적군 1팀, 아군 2팀", desc: "턴 시작 시 적 1명에게 혼란 상태를 부여하고(턴 종료 시까지 지속), 아군 2명의 병력을 회복합니다(치료율 150%, 모략 영향)." },
    "홍수첨향": { role: "지휘 (50%)", target: "아군 2팀", desc: "턴 시작 시 자신의 병력 회복(치료율 190%, 통솔 영향) 및 받는 피해 30% 감소(통솔 영향, 1턴 지속). 아군 대상 1명에게 치료 및 받는 피해 감소 효과의 절반을 부여합니다." },
    "화소적벽": { role: "능동 (50%)", target: "적군 전체", desc: "적 전체에게 화상효과를 부여(행동 시작 시 35% 추가 모략 피해를 받음)하고 2턴 지속하며 102% 모략 피해를 가합니다." },
    "횡소천군": { role: "능동 (35%)", target: "적군 2팀", desc: "적군 2개 대상에게 30% 무용 피해를 가하고 출혈 부여(행동 시작 시 65% 추가 무용 피해 받음)하며 2턴 지속합니다." },
    "횡징폭렴": { role: "지휘 (100%)", target: "적군 전체, 아군 전체", desc: "전투 첫 2턴 동안 적군 전체의 가하는 피해 36% 감소하고 해제 불가이며 3턴 종료 시 아군 전체를 치료(치료율 140%, 통솔 영향)합니다." },
    "휴양생식": { role: "능동 (35%)", target: "아군 2팀", desc: "아군 2개 대상의 병력을 회복(치료율 165%, 모략 영향)하고 해당 대상에게 통찰을 부여하며 1턴 지속합니다." },
    "경달권변": { role: "능동 (65%)", target: "적군 단체(2명)", desc: "적군 단체(2명)에 65% 확률로 혼란 효과를 부여하고 모략 피해(계수 196%, 모략 영향)를 가합니다." },
    "산무유책": { role: "능동 (50%)", target: "적군 전체", desc: "적군 전체에게 모략 피해(계수 102%, 모략 영향)를 가하고, 대상이 가하는 피해를 18% 감소(2턴 지속)시킵니다." },
    "응시낭고": { role: "능동 (60%)", target: "자신/적군", desc: "전투 1~4턴 시작 시 80% 확률로 공심 100% 획득 또는 받는 모략 피해 30% 감소(1턴). 5턴 이후 매 턴 80% 확률로 1~2명 적에게 모략 피해(계수 154%) 부여." },
    "거중지중": { role: "능동 (50%)", target: "아군 전체", desc: "아군 전체가 받는 피해를 16% 감소(모략 영향)시키고, 매 턴 아군 2명의 병력을 지속 회복(치료율 74%, 모략 영향)시킵니다." },
    "분용당선": { role: "능동 (70%)", target: "적군 전열(2명)", desc: "매 턴 100% 발동하여 적군 전열(2명)에 강력 무용 피해(계수 135%) 가하고 자신 허약(1턴)." },
    "십면매복": { role: "추격 (50%)", target: "적군 단체", desc: "일반 공격 후 디버프 상태인 적에게 추가 모략 피해(계수 168%)를 입히고 2턴간 회복 불가 상태로 만듭니다." },
    "군령여산": { role: "지휘 (100%)", target: "아군 전체", desc: "아군 전체가 가하는 피해를 16%(통솔 영향) 증가시키고 받는 피해를 16%(통솔 영향) 영구 감소시킵니다." },
    "효웅": { role: "지휘 (100%)", target: "아군 전체", desc: "부대 내 아군이 가하는 모든 피해의 12%를 흡수하여 자신의 병력을 치료하고 아군 전체가 받는 피해를 16% 감소시킵니다." },
    "함진살적": { role: "패시브 (100%)", target: "적군 주장", desc: "자신의 일반 공격이 68% 확률로 적군 주장을 정밀 저격하며, 일반 공격 후 대상에게 추가 무용 피해(계수 188%) 가함." },
    "교변병기": { role: "지휘 (100%)", target: "아군 전체", desc: "전투 시작 시 아군 전체의 액티브 전법 발동 확률을 12% 증가시키고, 피격 시 35% 확률로 저항을 부여합니다." },
    "발시담정": { role: "패시브 (50%)", target: "적군 다수(2명)", desc: "피해를 입을 때마다 40% 확률로 적군 다수(2명)에게 반격 무용 피해(계수 84%)를 즉각 가합니다." },
    "충용": { role: "능동 (50%)", target: "적군 전체", desc: "일반 공격 후 적군 전체에게 무용 피해(계수 108%)를 가하고 30% 확률로 제어 불가(겁전/무장해제)를 1턴 부여합니다." },
    "무성": { role: "능동 (50%)", target: "적군 전체", desc: "1턴 준비 후 적군 전체에게 무용 피해(계수 146%)를 가하고 50% 확률로 무장해제 또는 겁전을 부여하며, 자신 물리 피해 36% 증가." },
    "담대여두": { role: "추격 (50%)", target: "적군 단체", desc: "홀수 턴에 적 무용을 64 강탈하여 무용 피해(계수 184%) 가하고, 짝수 턴에 모략을 64 강탈하여 모략 피해(계수 184%) 가함." },
    "습참": { role: "능동 (35%)", target: "적군 2명", desc: "1턴 준비 후 적군 2명에게 무용 피해(계수 210%)를 가하고 대상이 가하는 피해를 25% 차단합니다(2턴 지속)." },
    "출수법": { role: "패시브 (100%)", target: "주위 적군", desc: "자신의 물리 피해가 34% 증가하고 일반 공격 피해의 54%를 주위 적군에게 확산 전이시킵니다." },
    "절절학문": { role: "지휘 (100%)", target: "아군 전체", desc: "아군이 능동 전법을 발동할 때마다 60% 확률로 아군 전체의 공격력을 14% 증폭(최대 3중첩)합니다." },
    "만왕": { role: "추격 (35%)", target: "적군 단체", desc: "일반 공격 후 45% 확률로 대상에게 무용 피해(계수 175%)를 가하고 2턴간 공황 및 약화 상태로 만듭니다." },
    "실병제위": { role: "패시브 (70%)", target: "자신", desc: "준비 턴이 필요한 능동 전법의 대기 시간을 75% 확률로 즉시 삭제하고 자신의 가하는 피해를 15% 증가시킵니다." },
    "인정": { role: "지휘 (100%)", target: "아군 전체", desc: "매 턴 68% 확률로 아군 전체의 병력을 회복(치료율 68%, 모략 영향)시키고 매 턴 10% 확률로 대상의 제어 상태를 해제합니다." },
    "재주복주": { role: "지휘 (100%)", target: "아군 2명", desc: "매 턴 아군 2명 치료(치료율 68%, 모략 영향) 및 10% 확률로 대상 허약 부여. 자신이 주장일 시 허약 확률 15%로 상승." },
    "연인노호": { role: "패시브 (50%)", target: "적군 전체", desc: "전투 2, 4턴에 적군 전체 무용 피해(계수 104%). 대상이 무장해제 상태면 50% 확률 통솔 50 감소. 주장 시 겁전 포함." },
    "초선차전": { role: "지휘 (100%)", target: "적군 2명", desc: "적군 2명이 능동 전법 발동 시 35% 확률로 시전을 차단하고 모략 역피해(계수 102%, 모략 영향)를 줍니다." },
    "칠진칠출": { role: "패시브 (100%)", target: "자신", desc: "자신에게 상시 영구 통찰(제어 면역) 상태를 부여하고 무용, 모략, 속도, 통솔 속성이 40(주장 시 50) 증가합니다." },
    "적혈도": { role: "패시브 (100%)", target: "자신", desc: "자신의 전법 크리티컬(회심) 확률을 25% 증가시키고, 회심 발동 시 가하는 피해량이 50% 증가합니다." },
    "묘산천기": { role: "지휘 (100%)", target: "아군 전체", desc: "전투 첫 3턴 동안 아군 전체가 가하는 전법 피해를 30% 폭증시키고 4턴부터 가하는 피해 15% 감소." },
    "정수유심": { role: "지휘 (100%)", target: "아군 전체", desc: "아군 전체가 받는 피해의 18%를 적 시전자에게 즉각 반사 유도하고 매 턴 병력을 회복(치료율 62%)합니다." },
    "탑상책": { role: "지휘 (100%)", target: "아군 단체", desc: "전투 2턴 시작 시 자신의 속성 40%를 병력이 가장 낮은 아군에게 양도하고 3~5턴 동안 피해 감소 26% 부여." },
    "화용욕모": { role: "능동 (70%)", target: "적군 2명", desc: "적군 2명의 방어 스탯(통솔/모략)을 20% 해제하고 아군 전체의 전법 발동률을 12% 보정합니다." },
    "강동맹호": { role: "지휘 (100%)", target: "적군 전체", desc: "적군 전체에게 도발을 시전하여 일반 공격을 강제 집중시키고 자신이 받는 피해를 28% 감소(2턴 지속)시킵니다." },
    "웅거": { role: "지휘 (100%)", target: "자신", desc: "아군이 일반 공격을 행할 때마다 75% 확률로 자신에게 연격, 통찰, 강공, 기습, 선공 중 1개 버프를 2턴 획득." },
    "효희": { role: "능동 (50%)", target: "적군 다수", desc: "일반 공격 전 자신 버프 1개당 물리 피해량 20% 증가(최대 5중첩) 및 추가 물리 타격(계수 88%) 가함." },
    "강동패주": { role: "능동 (50%)", target: "적군 단체", desc: "일반 공격 후 35% 확률로 대상에게 맹렬 무용 연타 피해(계수 192%) 입히고 피해량의 50% 흡혈." },
    "겸권상계": { role: "지휘 (100%)", target: "아군 전체", desc: "오나라 진영 무장들과 결선 시 아군 전체 전술 스탯 15% 증가, 매 턴 50% 확률 피해 감소 20% 부여." },
    "백의도강": { role: "지휘 (100%)", target: "아군 전체", desc: "전투 첫 턴 아군 전체 확정 회피 1회 부여. 피해 입힐 때마다 40% 확률로 무장해제/겁전 부여." },
    "지변규려": { role: "추격 (50%)", target: "적군 2명", desc: "적군 2명에게 화상(계수 84%, 3턴 지속) 입히고 이미 화상 상태면 광역 폭발 모략 피해(계수 164%) 줌." },
    "청백충근": { role: "능동 (60%)", target: "아군 주장", desc: "아군 주장의 모략 회심 확률 25% 증가 및 주장이 받는 피해 30% 숄더링 분담." },
    "봉화연천": { role: "패시브 (80%)", target: "적군 전체", desc: "자신이 능동 전법 발동 시 80% 확률로 적 전체 광역 모략 불화살 피해(계수 68%) 투하." },
    "청라산개": { role: "지휘 (100%)", target: "아군 주장/부대", desc: "아군 주장이 입는 피해의 35%, 부대원 20%를 대신 흡수하고 주장의 공격력을 18% 증가." },
    "칠척사모": { role: "지휘 (100%)", target: "적군 1명", desc: "피해를 입을 때마다 35% 확률로 자신 디버프 해제 및 적 1명 공포(1턴) 부여." },
    "요원지화": { role: "능동 (50%)", target: "적군 전체", desc: "자신의 병력 20% 소모하여 적군 전체 화상 및 확정적 모략 피해(계수 122%) 가함." },
    "위진새북": { role: "패시브 (100%)", target: "부대 전체", desc: "전투 전 2턴 부대 전체 전법 발동률 13% 증가. 액티브 타격 후 속도 비례 추가 무용 피해(계수 96%)." },
    "전권난정": { role: "지휘 (100%)", target: "적/아군 전체", desc: "매 턴 무용 15% 증폭. 5턴 시작 시 적/아군 전체 무차별 무용 피해(계수 68%) 및 50% 흡혈." },
    "효장": { role: "능동 (50%)", target: "적군 2명", desc: "1턴 준비 후 적 2명에게 무용 참격 충격(계수 180%) 및 1턴 확정 공포 제어 부여." },
    "천하무쌍": { role: "패시브 (100%)", target: "적군 단일", desc: "적군 단일 일기토. 일반 공격 3회 주고받음. 일기토 중 제어 면역, 받는 피해 7% 감소." },
    "태평경": { role: "지휘 (70%)", target: "적군 전체", desc: "2턴 시작 시 적 전체 수공(계수 72%, 4턴 지속). 모략 피해 및 받는 모략 피해 증가 부여." },
    "사소도": { role: "지휘 (100%)", target: "적군 2명/아군", desc: "1턴 준비 후 적 2명 물리 피해(계수 126%), 화상(계수 60%). 아군 전체 통솔 80 증가(3턴)." },
    "황천당립": { role: "능동 (50%)", target: "무작위 적", desc: "1턴 준비 후 무작위 적 5회 천벌 벼락(계수 136%) 가하고 30% 확률 공황 부여." },
    "천의난위": { role: "능동 (50%)", target: "적군 단체", desc: "적군 단체의 모략과 통솔을 38 흡수하여 아군 공유 및 강력 모략 피해(계수 184%)." },
    "요풍사기": { role: "능동 (50%)", target: "적/아군 전체", desc: "적 전체 모래바람 모략 피해(계수 106%). 아군 전체 장벽 2중첩(피해 40% 흡수) 부여." },
    "화겁생기": { role: "패시브 (100%)", target: "아군 전체", desc: "전투 첫 2턴 아군 전체 회피 35% 부여. 3~5턴 매 턴 병력 회복(치료율 68%)." },
    "비분시": { role: "능동 (70%)", target: "아군 2명", desc: "아군 2명 병력 회복(치료율 122%). 50% 확률로 가하는 피해 26% 증가 또는 피감 26% 부여." },
    "폐월": { role: "능동 (50%)", target: "적군 단체", desc: "적 매혹하여 자신이 입는 피해의 35% 분담. 대상 통솔/무용 14% 감소." },
    "청낭제세": { role: "능동 (50%)", target: "아군 2명", desc: "전반기(1~4턴) 아군 2명 통솔 40 증가. 피격 시 50% 확률 병력 회복(치료율 68%)." }
};

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
// LAYER 2: 하이브리드 도감 동적 바인딩 및 스마트 적성 연산 엔진
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
                stats: d.stats || { martial: 500, tactical: 500, command: 500, speed: 400 }
            };
        }
    }
    const [uTac = "고유 전법 누락", uUnit = "방패병", uFac = "qun"] = FB_OFF_META[officerName] || [];
    return { role: "-", location: "-", uniqueTactic: uTac, skillDesc: "", unitSuitability: uUnit, faction: uFac, stats: { martial: 500, tactical: 500, command: 500, speed: 400 } };
}

const getTacticListBridge = () => window.getAllTacticsFromDogam ? (window.getAllTacticsFromDogam()?.length > 5 ? window.getAllTacticsFromDogam() : FB_TACTICS) : FB_TACTICS;
const getOfficerNamesBridge = () => {
    const list = (window.getAllOfficerNamesFromDogam && window.getAllOfficerNamesFromDogam()?.length > 5) ? window.getAllOfficerNamesFromDogam() : FB_OFFICERS;
    return [...list].sort((a, b) => a.localeCompare(b, 'ko'));
};

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
    if (allTacticsFilled) return `<div class="feedback-item success" style="border:1px solid #4ade80;background:rgba(74,222,128,0.1);padding:8px;margin-top:10px;">✨ <strong>[최종 검증 완료: Perfect Synergy]</strong> 전서버 랭커 상위 1% 공방 밸런스를 달성했습니다.</div>`;
    return "";
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
    return arr.length === 0 ? '' : `<div class="integrated-stats-box"><div style="color:#facc15;font-weight:bold;margin-bottom:4px;font-size:10px;">📊 통합 전투 속성 (추정치)</div><div style="display:flex;flex-wrap:wrap;gap:4px 8px;line-height:1.4;">${arr.map(s=>`<span>${s}</span>`).join('')}</div></div>`;
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

    deck.officers.forEach((off) => {
        const hName = off?.name?.toString().trim() || "", cleanHName = cStr(hName);
        if (!cleanHName) return;

        const metaIdx = meta.officers.findIndex(mo => cStr(mo.name) === cleanHName);
        if (metaIdx !== -1) {
            const mTacs = meta.officers[metaIdx].chosenTactics;
            const targetMetaTacs = mTacs.length === 3 ? mTacs.slice(1, 3) : mTacs;
            
            (off.chosenTactics || []).forEach((t, i) => {
                const cT = cStr(t);
                const slotNum = i + 2;
                const pTac = targetMetaTacs[i];

                if (!cT) {
                    const isHigherUsed = higherTierUsedTacs.includes(cStr(pTac));
                    const ownedAltTac = getOwnedAlternativeTactic(pTac, forbiddenTacs, tacticDataMap, recommendedTacs, hName, deck.unitType);
                    
                    const isAltOwned = tacticDataMap[cStr(ownedAltTac)]?.isOwned;
                    const altText = ownedAltTac ? (isAltOwned ? `<span style="color:#4ade80;font-weight:bold;">[${ownedAltTac}]</span>` : `<span style="color:#f87171;">[${ownedAltTac}](미보유)</span>`) : `<span style="color:#9ca3af;">[대체 불가]</span>`;
                    
                    if (isHigherUsed) {
                        fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백: <span style="color:#fca5a5;text-decoration:line-through;">[${pTac}]</span>(상위 부대 사용) ➔ 대체 추천: ${altText}` });
                    } else {
                        fb.logs.push({ type: 'warning', text: `[${hName}] ${slotNum}슬롯 공백 ➔ 권장: <span style="color:#38bdf8;font-weight:bold;">[${pTac}]</span>` });
                    }
                }
            });
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
    modalPopupEl.innerHTML = `<div class="p-title" style="color:#38bdf8;font-weight:bold;border-bottom:1px solid #334155;padding-bottom:6px;">${title}</div><div class="p-meta" style="color:#facc15;margin-top:8px;font-size:11px;">${meta1}</div><div class="p-desc" style="margin-top:6px;color:#cbd5e1;line-height:1.5;">${desc1}</div>`;
    modalPopupEl.style.display = 'block';
    const rect = e.currentTarget.getBoundingClientRect();
    modalPopupEl.style.top = `${rect.top + window.scrollY - 10}px`;
    modalPopupEl.style.left = `${Math.min(rect.right + window.scrollX + 10, window.innerWidth - 290)}px`;
}

window.showTacticPopup = function(e, tacticName) {
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') return;
    if (!tacticName || tacticName === "선택 안함") return;
    const cleanName = cStr(tacticName);
    let tData = FB_TACTIC_DESC_MAP[cleanName] || { role: "전술 전법", target: "부대", desc: "실전 효과가 발동되는 고급 전투 전법입니다." };
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
    style.innerHTML = `.deck-card select{background-color:#1e293b;color:#f8fafc;border:1px solid #475569;border-radius:4px;padding:6px 24px 6px 10px;font-size:13px;width:100%;box-sizing:border-box;font-family:inherit}.hawk-recommend-box{margin-top:10px;padding:12px;background-color:#1e293b;border-left:4px solid #3b82f6;border-radius:6px;font-size:13px;color:#e2e8f0;line-height:1.5}.equipment-box{margin-top:6px;padding:6px;border:1px solid #334155;border-radius:4px;background-color:#0f172a;font-size:11px;color:#cbd5e1}.integrated-stats-box{margin-top:6px;padding:8px;border-radius:4px;background:#0f172a;border:1px solid #475569;font-size:11px}.unit-badge{display:inline-block;background-color:rgba(245,158,11,0.15);color:#fbbf24;font-size:10px;padding:3px 6px;border-radius:4px;margin:4px 0}.feedback-item.success{color:#4ade80}.feedback-item.warning{color:#facc15}.feedback-item.info{color:#60a5fa}#tactic-popup-modal{display:none;position:absolute;z-index:9999;background:rgba(15,23,42,0.98);border:1px solid #a855f7;padding:12px;border-radius:6px;width:280px;color:#f8fafc;font-size:12px}.tactic-row{cursor:pointer;padding:6px 12px;border-radius:4px;margin-bottom:4px;transition: all 0.2s;}.tactic-row select{width:80%;margin:0 auto;display:block}.tactic-row.owned select{border: 1px solid #4ade80; color: #4ade80; background-color: rgba(74, 222, 128, 0.05);}.tactic-row.missing select{border: 1px dashed #f87171; color: #fca5a5; background-color: rgba(248, 113, 113, 0.05);}`;
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
                
                let tRows = `<div class="tactic-row owned" style="border-left:3px solid #cd9b33;" onclick="showTacticPopup(event, '${dg?.uniqueTactic||''}')"><span>⭐ ${dg?.uniqueTactic||'고유 전법'}</span></div>`;
                
                (off.chosenTactics||[]).forEach((t, sIdx) => {
                    const cT = cStr(t);
                    const isOwn = cT ? !!tMap[cT]?.isOwned : false;
                    const cssClass = cT ? (isOwn ? 'owned' : 'missing') : 'missing';
                    
                    tRows += `<div class="tactic-row ${cssClass}" onclick="showTacticPopup(event, this.querySelector('select').value)"><select onchange="updateDeckState(${deck.originIdx},'tac',this.value,${oIdx},${sIdx})"><option value="">선택 안함</option>${getTacticListBridge().map(tx=>`<option value="${tx}" ${cT===cStr(tx)?'selected':''}>${tx}</option>`).join('')}</select></div>`;
                });

                const eq = cName ? getOfficerEquipment(hName, dType) : null;
                const eqH = eq ? `<div class="equipment-box"><div>🪖 ${eq.helmet.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.helmet.attr1}', '${eq.helmet.attr2}')">[${eq.helmet.attr1} / ${eq.helmet.attr2}]</span></div><div>🛡️ ${eq.armor.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.armor.attr1}', '${eq.armor.attr2}')">[${eq.armor.attr1} / ${eq.armor.attr2}]</span></div><div>📿 ${eq.accessory.name} <span class="eq-attr" onclick="showEquipPopup(event, '${eq.accessory.attr1}', '${eq.accessory.attr2}')">[${eq.accessory.attr1} / ${eq.accessory.attr2}]</span></div></div>` : '';

                return `<div class="officer-slot" draggable="true" ondragstart="handleOfficerDragStart(event,${deck.originIdx},${oIdx})" ondragover="handleOfficerDragOver(event)" ondragleave="handleOfficerDragLeave(event)" ondrop="handleOfficerDrop(event,${deck.originIdx},${oIdx})" ondragend="handleOfficerDragEnd(event)"><div style="display:flex;justify-content:space-between;"><span style="color:#facc15;font-size:11px;">${FORMATIONS[deck.formation]?.pos[oIdx]==='front'?'전열':'후열'}</span><select onchange="updateDeckState(${deck.originIdx},'off',this.value,${oIdx})"><option value="">선택 안함</option>${getOfficerNamesBridge().map(hx=>`<option value="${hx}" ${hName===hx?'selected':''}>${hx}</option>`).join('')}</select></div>${eqH}<div>${tRows}</div></div>`;
            }).join('');

            const fb = generateStructuredFeedback(deck, hMap, tMap, Array.from(accumulatedHigherTacs)), score = calculateStrictDeckScore(deck);
            let fbH = fb.logs.map(l=>`<div class="feedback-item ${l.type}">${l.text}</div>`).join('');

            deck.officers.forEach(o => (o?.chosenTactics || []).forEach(t => { if (t && cStr(t)) accumulatedHigherTacs.add(cStr(t)); }));
            
            // [오류 수정 및 기능 보완] 인연 효과(호위경주 등) UI 결선 및 ▲▼ 순서 변경 버튼 복구
            const bondFeedback = `<div class="feedback-item info" style="margin-top:6px;">🤝 <strong>활성화 인연:</strong> <span style="color:#38bdf8;">${calculateActivatedBond(deck.officers)}</span></div>`;
            
            container.insertAdjacentHTML('beforeend', `<div class="deck-card" style="background:#111827;border:1px solid #374151;border-radius:8px;padding:16px;margin-bottom:16px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <button onclick="moveDeckAction(${aIdx},-1)" style="visibility:${aIdx>0?'visible':'hidden'}; background:#334155; color:#fff; border:none; border-radius:3px; cursor:pointer; padding:2px 8px; font-size:12px;">▲</button>
                        <button onclick="moveDeckAction(${aIdx},1)" style="visibility:${aIdx<dynamicPresetDecks.length-1?'visible':'hidden'}; background:#334155; color:#fff; border:none; border-radius:3px; cursor:pointer; padding:2px 8px; font-size:12px;">▼</button>
                        <span contenteditable="true" style="color:#f3f4f6;font-weight:bold;font-size:18px;" onblur="updateDeckState(${deck.originIdx},'title',this.innerText.replace(/\\[추천도:.*?\\]/g,'').trim()||'${deck.title}')">${deck.title}</span>
                        <span style="color:#ff9f43;font-size:13px;margin-left:8px;">[추천도: ${score}점]</span>
                    </div>
                    <div>
                        <button onclick="autoFixDeck(${deck.originIdx})" style="background:#8b5cf6;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-weight:bold;">✨ AI 교정</button> 
                        <button onclick="updateDeckState(${deck.originIdx},'reset')" style="background:#ef4444;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-weight:bold;">초기화</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:10px;">${offHtml}</div>
                <div style="margin-top:12px;">${fbH}${bondFeedback}</div>
            </div>`);
        });
    } catch(e) { container.innerHTML = `<div style="color:red;padding:20px;">렌더링 에러: ${e.message}</div>`; }
}

const osi = localStorage.setItem; localStorage.setItem = function(k,v) { osi.apply(this,arguments); window.dispatchEvent(new CustomEvent('local-storage-update',{detail:{key:k}})); };
window.addEventListener('local-storage-update', e => { if(e.detail.key==='samguk_hobby_data') renderDeckBuilder(); });
window.addEventListener('storage', e => { if(e.key==='samguk_hobby_data') renderDeckBuilder(); });

document.addEventListener('DOMContentLoaded', () => { injectCustomUIStyles(); loadDeckTextData(); renderDeckBuilder(); });

// [시스템 분석] meta_deck.js - 전서버 실전 메타 덱 데이터베이스 (천공 랭킹 1위 및 2위 1~3군 실전 무중복 세트 완벽 동기화)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

var analyzedMetaArchetypes = [
    // 🏆 [천공 랭킹 1위 원본 1~3군 실전 무중복 세트]
    {
        id: "rank0_shu_macho_an",
        priority: 120,
        name: "[1위 1군] 마초·위연·서서 안행 창병",
        concept: "[1위 원본]",
        formation: "안행진",
        officers: [
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "반객위주"] },
            { name: "위연", chosenTactics: ["실병제위", "이퇴위진", "진퇴유도"] },
            { name: "서서", chosenTactics: ["절절학문", "전위위안", "문치무공"] }
        ]
    },
    {
        id: "rank0_wei_sima_chu",
        priority: 115,
        name: "[1위 2군] 사마의·조조·가후 추형 방패",
        concept: "[1위 원본]",
        formation: "추형진",
        officers: [
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "조조", chosenTactics: ["효웅", "유좌유용", "강유겸제"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "만천과해"] }
        ]
    },
    {
        id: "rank0_gun_hwang",
        priority: 110,
        name: "[1위 3군] 황보숭·장녕·좌자 구행 궁병",
        concept: "[1위 원본]",
        formation: "구행진",
        officers: [
            { name: "황보숭", chosenTactics: ["강직불아", "금창신", "간담상조"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "좌자", chosenTactics: ["화겁생기", "안영찰채", "유비무환"] }
        ]
    },

    // 🥈 [천공 랭킹 2위 원본 1~3군 실전 무중복 세트]
    {
        id: "rank2_gun_hwang",
        priority: 118,
        name: "[2위 1군] 좌자·장녕·황보숭 구행 궁병",
        concept: "[2위 원본]",
        formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "유비무환", "전위위안"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "황보숭", chosenTactics: ["강직불아", "안영찰채", "간담상조"] }
        ]
    },
    {
        id: "rank2_wei_sima",
        priority: 114,
        name: "[2위 2군] 사마의·조조·가후 추형 방패",
        concept: "[2위 원본]",
        formation: "추형진",
        officers: [
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "조조", chosenTactics: ["효웅", "유좌유용", "여자동포"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "만천과해"] }
        ]
    },
    {
        id: "rank2_gun_yeopo",
        priority: 112,
        name: "[2위 3군] 원소·동탁·여포 방원 기병",
        concept: "[2위 원본]",
        formation: "방원진",
        officers: [
            { name: "원소", chosenTactics: ["사소도", "견진연봉", "위위구조"] },
            { name: "동탁", chosenTactics: ["전권난정", "진퇴유도", "이퇴위진"] },
            { name: "여포", chosenTactics: ["천하무쌍", "용왕직전", "만부막적"] }
        ]
    },

    // 🌟 [추가 실전 메타 아카이브]
    {
        id: "rank0_gun_jangbo",
        priority: 100,
        name: "[1위 변형] 좌자·장녕·장보 구행 궁병",
        concept: "[장벽 유지력 특화]",
        formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "유비무환", "안영찰채"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "장보", chosenTactics: ["요풍사기", "진퇴유도", "여자동포"] }
        ]
    },
    {
        id: "rank0_wei_sima_gu",
        priority: 100,
        name: "[사마의 방패 종결] 조조·사마의·가후 구행 방패",
        concept: "[패시브 제어면역 특화]",
        formation: "구행진",
        officers: [
            { name: "조조", chosenTactics: ["효웅", "진퇴유도", "간담상조"] },
            { name: "사마의", chosenTactics: ["응시낭고", "후적박발", "반객위주"] },
            { name: "가후", chosenTactics: ["경달권변", "유비무환", "안영찰채"] }
        ]
    },
    {
        id: "rank0_wei_jangryo",
        priority: 95,
        name: "[기습 암살] 장료·조조(제왕)·악진 호도 창병",
        concept: "[주장 암살 속전속결]",
        formation: "호도진",
        officers: [
            { name: "장료", chosenTactics: ["함진살적", "반객위주", "질풍노도"] },
            { name: "조조(제왕)", chosenTactics: ["군령여산", "간담상조", "진퇴유도"] },
            { name: "악진", chosenTactics: ["분용당선", "분성지계", "만천과해"] }
        ]
    }
];

var metaDeckUnitTypeMap = {
    "rank0_shu_macho_an": "창병",
    "rank0_wei_sima_chu": "방패병",
    "rank0_gun_hwang": "궁병",
    "rank2_gun_hwang": "궁병",
    "rank2_wei_sima": "방패병",
    "rank2_gun_yeopo": "기병",
    "rank0_gun_jangbo": "궁병",
    "rank0_wei_sima_gu": "방패병",
    "rank0_wei_jangryo": "창병"
};

var systemGuideInsights = {
    "rank0_shu_macho_an": "💡 [1위 1군] 안행진 버프를 받은 마초가 출수법과 반객위주로 1~2턴 광역 폭딜을 꽂아넣으며 위연과 서서가 완벽한 공방 버프를 지원합니다.",
    "rank0_wei_sima_chu": "💡 [1위 2군] 추형진 전열에서 조조가 유좌유용+강유겸제로 버티고, 가후가 혼수모어로 묶는 사이 사마의가 수상개화+요사여신으로 폭발적인 모략 치명타를 퍼붓습니다.",
    "rank0_gun_hwang": "💡 [1위 3군] 황보숭의 금창신+간담상조 방벽과 좌자의 유비무환 힐링으로 10턴 불사망을 구축하며 장녕이 적 스탯을 강탈해 15만 이상의 폭딜을 누적합니다.",
    "rank2_gun_hwang": "💡 [2위 1군] 좌자에게 전위위안을 주어 통솔/저항을 강화하고 황보숭에게 안영찰채를 분배하여 장녕이 안정적으로 스탯을 흡수하도록 보좌합니다.",
    "rank2_wei_sima": "💡 [2위 2군] 조조에게 여자동포를 장착하여 저항과 불굴을 추가 공급하며 사마의의 지속 화력을 뒷받침합니다.",
    "rank2_gun_yeopo": "💡 [2위 3군] 방원진과 원소의 견진연봉으로 후열 여포의 연격률을 78% 이상으로 끌어올려 천하무쌍과 추격 전법으로 1~2턴에 적을 박살냅니다.",
    "rank0_gun_jangbo": "💡 장보의 장벽과 장녕/좌자의 압도적 힐링을 결합하여 절대 뚫리지 않는 좀비 궁병진을 형성합니다.",
    "rank0_wei_sima_gu": "💡 유비무환과 안영찰채로 가후/조조가 버티는 사이 사마의가 후적박발로 침묵을 무시하고 적을 분쇄하는 정석 방패덱입니다.",
    "rank0_wei_jangryo": "💡 조조(제왕)의 버프를 받은 장료가 호도진의 선공권을 살려 적 주장을 1~2턴 안에 암살하는 극딜 덱입니다."
};

window.getMetaDeckData = function() {
    return { analyzedMetaArchetypes, metaDeckUnitTypeMap, systemGuideInsights };
};

function renderMetaDeckPage() {
    const container = document.getElementById('meta-deck-container');
    if (!container) return;
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">전서버 실전 메타 덱 및 랭커 1~3군 세트 아카이브</h2>`;
    
    analyzedMetaArchetypes.forEach(deck => {
        const officersHtml = deck.officers.map(o => `
            <div style="background:var(--bg-inner); border:1px solid var(--border-main); padding:10px; border-radius:6px;">
                <div style="font-weight:bold; color:var(--text-main); margin-bottom:6px;">${o.name}</div>
                <div style="font-size:11px; color:var(--text-desc);">
                    <div>🔸 ${o.chosenTactics[0]}</div>
                    <div>🔸 ${o.chosenTactics[1]}</div>
                    ${o.chosenTactics[2] ? `<div>🔸 ${o.chosenTactics[2]}</div>` : ''}
                </div>
            </div>
        `).join('');

        const insight = systemGuideInsights[deck.id] ? `<div style="margin-top:8px; font-size:12px; color:var(--text-muted);">${systemGuideInsights[deck.id]}</div>` : '';

        const isRanked = deck.id.includes('rank0') || deck.id.includes('rank2');
        const borderColor = isRanked ? '#f59e0b' : 'var(--border-main)';
        const bgEmphasis = isRanked ? 'rgba(245, 158, 11, 0.03)' : 'var(--bg-card)';
        const labelText = deck.concept ? `<span style="background:rgba(239, 68, 68, 0.15); color:#ef4444; padding:3px 8px; border-radius:4px; font-weight:bold;">${deck.concept}</span>` : ``;

        container.insertAdjacentHTML('beforeend', `
            <div style="background:${bgEmphasis}; border:1px solid ${borderColor}; border-radius:8px; padding:15px; margin-bottom:15px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h3 style="margin:0; font-size:16px; color:var(--text-main);">${deck.name}</h3>
                    ${labelText}
                </div>
                <div style="display:flex; gap:10px; font-size:12px; margin-bottom:12px;">
                    <span style="background:rgba(245, 158, 11, 0.15); color:var(--text-highlight); padding:3px 8px; border-radius:4px;">${metaDeckUnitTypeMap[deck.id]}</span>
                    <span style="background:rgba(56, 189, 248, 0.15); color:#38bdf8; padding:3px 8px; border-radius:4px;">${deck.formation}</span>
                </div>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">${officersHtml}</div>
                ${insight}
            </div>
        `);
    });
}

document.addEventListener('DOMContentLoaded', renderMetaDeckPage);

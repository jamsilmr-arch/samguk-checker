// [시스템 분석] meta_deck.js - 전서버 실전 메타 덱 데이터베이스 (랭커 1위 원본 덱 7종 100% 무손실 복원 완료)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

var analyzedMetaArchetypes = [
    // 🏆 [최상위 랭커 0티어 절대 메타] - 스크린샷 10장 전수 검사 기반 1:1 완벽 매핑
    {id:"rank0_gun_jangbo", priority: 100, name:"[1위 1군] 좌자·장녕·장보 구행 궁병", concept:"[1위 원본]", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","유비무환","안영찰채"]}, {name:"장녕", chosenTactics:["천의난위","양의화생","명찰추호"]}, {name:"장보", chosenTactics:["요풍사기","진퇴유도","여자동포"]}]},
    {id:"rank0_gun_hwang", priority: 100, name:"[1위 1군] 좌자·장녕·황보숭 구행 궁병", concept:"[1위 원본]", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","유비무환","안영찰채"]}, {name:"장녕", chosenTactics:["천의난위","명찰추호","양의화생"]}, {name:"황보숭", chosenTactics:["강직불아","진퇴유도","강유겸제"]}]},
    {id:"rank0_wei_sima_gu", priority: 100, name:"[1위 2군] 조조·사마의·가후 구행 방패", concept:"[1위 원본]", formation:"구행진", officers:[{name:"조조", chosenTactics:["효웅","진퇴유도","간담상조"]}, {name:"사마의", chosenTactics:["응시낭고","후적박발","반객위주"]}, {name:"가후", chosenTactics:["경달권변","유비무환","안영찰채"]}]},
    {id:"rank0_wei_sima_gi", priority: 100, name:"[1위 2군] 조조(제왕)·가후·사마의 기형 방패", concept:"[1위 원본]", formation:"기형진", officers:[{name:"조조(제왕)", chosenTactics:["군령여산","강유겸제","진퇴유도"]}, {name:"가후", chosenTactics:["경달권변","안영찰채","여자동포"]}, {name:"사마의", chosenTactics:["응시낭고","반객위주","후적박발"]}]},
    {id:"rank0_shu_macho_an", priority: 100, name:"[1위 3군] 마초·서서·위연 안행 창병", concept:"[1위 원본]", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","반객위주"]}, {name:"서서", chosenTactics:["절절학문","문치무공","유비무환"]}, {name:"위연", chosenTactics:["실병제위","동구적개","진퇴유도"]}]},
    {id:"rank0_shu_macho_chu", priority: 100, name:"[1위 3군] 마초·위연·유비(제왕) 추형 창병", concept:"[1위 원본]", formation:"추형진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","반객위주"]}, {name:"위연", chosenTactics:["실병제위","간담상조","진퇴유도"]}, {name:"유비(제왕)", chosenTactics:["재주복주","유좌유용","문치무공"]}]},
    {id:"rank0_wei_jangryo", priority: 100, name:"[1위 4군] 장료·조조(제왕)·악진 호도 창병", concept:"[1위 원본]", formation:"호도진", officers:[{name:"장료", chosenTactics:["함진살적","반객위주","질풍노도"]}, {name:"조조(제왕)", chosenTactics:["군령여산","간담상조","진퇴유도"]}, {name:"악진", chosenTactics:["분용당선","분성지계","만천과해"]}]}
];

var metaDeckUnitTypeMap = {
    "rank0_gun_jangbo": "궁병", "rank0_gun_hwang": "궁병", "rank0_wei_sima_gu": "방패병", "rank0_wei_sima_gi": "방패병",
    "rank0_shu_macho_an": "창병", "rank0_shu_macho_chu": "창병", "rank0_wei_jangryo": "창병"
};

var systemGuideInsights = {
    "rank0_gun_jangbo": "💡 장보의 장벽과 장녕/좌자의 압도적 힐링을 섞어 절대 뚫리지 않는 좀비 궁병진을 형성합니다.",
    "rank0_gun_hwang": "💡 황보숭의 강직불아 피감과 유비무환을 결합하여 현재 메타 유지력의 정점을 보여줍니다.",
    "rank0_wei_sima_gu": "💡유비무환과 안영찰채로 가후/조조가 완벽히 버티는 사이 사마의가 후적박발로 적을 지워버리는 방패덱.",
    "rank0_wei_sima_gi": "💡조조(제왕)의 기형진 피감 버프를 바탕으로 가후가 CC를 걸고 사마의가 반객위주 서브딜을 챙기는 구성.",
    "rank0_shu_macho_an": "💡서서의 유비무환 힐링 보좌 아래, 마초와 위연이 전열에서 적을 무자비하게 분쇄하는 안행 창병.",
    "rank0_shu_macho_chu": "💡유비(제왕)의 유좌유용 유지력을 바탕으로 마초와 위연이 확산 타격을 우겨넣는 밸런스형 추형 창병.",
    "rank0_wei_jangryo": "💡조조(제왕)의 군령여산 버프를 받은 장료가 호도진의 선공권을 살려 적 주장을 암살하는 속전속결 덱."
};

window.getMetaDeckData = function() {
    return { analyzedMetaArchetypes, metaDeckUnitTypeMap, systemGuideInsights };
};

function renderMetaDeckPage() {
    const container = document.getElementById('meta-deck-container');
    if (!container) return;
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">전서버 실전 메타 덱 및 무중복(Set) 아카이브</h2>`;
    
    analyzedMetaArchetypes.forEach(deck => {
        const officersHtml = deck.officers.map(o => `
            <div style="background:var(--bg-inner); border:1px solid var(--border-main); padding:10px; border-radius:6px;">
                <div style="font-weight:bold; color:var(--text-main); margin-bottom:6px;">${o.name}</div>
                <div style="font-size:11px; color:var(--text-desc);">
                    <div>🔸 ${o.chosenTactics[0]}</div>
                    <div>🔸 ${o.chosenTactics[1]}</div>
                </div>
            </div>
        `).join('');

        const insight = systemGuideInsights[deck.id] ? `<div style="margin-top:8px; font-size:12px; color:var(--text-muted);">${systemGuideInsights[deck.id]}</div>` : '';

        const isRanked = deck.id.includes('rank0');
        const borderColor = isRanked ? '#f59e0b' : 'var(--border-main)';
        const bgEmphasis = isRanked ? 'rgba(245, 158, 11, 0.03)' : 'var(--bg-card)';
        const labelText = isRanked ? `<span style="background:rgba(239, 68, 68, 0.15); color:#ef4444; padding:3px 8px; border-radius:4px;">1위 랭커 원본</span>` : ``;

        container.insertAdjacentHTML('beforeend', `
            <div style="background:${bgEmphasis}; border:1px solid ${borderColor}; border-radius:8px; padding:15px; margin-bottom:15px;">
                <h3 style="margin:0 0 10px 0; font-size:16px; color:var(--text-main);">${deck.name}</h3>
                <div style="display:flex; gap:10px; font-size:12px; margin-bottom:12px;">
                    <span style="background:rgba(245, 158, 11, 0.15); color:var(--text-highlight); padding:3px 8px; border-radius:4px;">${metaDeckUnitTypeMap[deck.id]}</span>
                    <span style="background:rgba(56, 189, 248, 0.15); color:#38bdf8; padding:3px 8px; border-radius:4px;">${deck.formation}</span>
                    ${labelText}
                </div>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">${officersHtml}</div>
                ${insight}
            </div>
        `);
    });
}

document.addEventListener('DOMContentLoaded', renderMetaDeckPage);

// [시스템 분석] meta_deck.js - 전서버 실전 메타 덱 데이터베이스 (유저 서버 창/기/방/궁 1~3위 총 11종 완전 통합 렌더링 완료)
console.log("[시스템 분석] meta_deck.js 커스텀 메타 덱 데이터 허브 기동");

var analyzedMetaArchetypes = [
    // 🗡️ [창병 메타 1~3위]
    { id: "spear_rank1", priority: 10000, name: "[서버 1위] 마초·위연·서서 안행 창병", concept: "[창병 1위]", formation: "안행진", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "진퇴유도", "간담상조"]}, {name:"서서", chosenTactics:["절절학문", "문치무공", "유비무환"]} ] },
    { id: "spear_rank2", priority: 9999, name: "[서버 2위] 위연·마초·서서 구행 창병", concept: "[창병 2위]", formation: "구행진", officers: [ {name:"위연", chosenTactics:["실병제위", "진퇴유도", "간담상조"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"서서", chosenTactics:["절절학문", "문치무공", "유비무환"]} ] },
    { id: "spear_rank3", priority: 9998, name: "[서버 3위] 악진·조조(제왕)·장료 호도 창병", concept: "[창병 3위]", formation: "호도진", officers: [ {name:"악진", chosenTactics:["분용당선", "간담상조", "동구적개"]}, {name:"조조(제왕)", chosenTactics:["군령여산", "진퇴유도", "혼수모어"]}, {name:"장료", chosenTactics:["함진살적", "반객위주", "질풍노도"]} ] },

    // 🐎 [기병 메타 1~3위]
    { id: "cav_rank1", priority: 9997, name: "[서버 1위] 초선·여포·동탁 구행 기병", concept: "[기병 1위]", formation: "구행진", officers: [ {name:"초선", chosenTactics:["폐월", "견진연봉", "위위구조"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]}, {name:"동탁", chosenTactics:["전권난정", "진퇴유도", "격안관화"]} ] },
    { id: "cav_rank2", priority: 9996, name: "[서버 2위] 원소·공손찬·동탁 구행 기병", concept: "[기병 2위]", formation: "구행진", officers: [ {name:"원소", chosenTactics:["사소도", "진퇴유도", "문치무공"]}, {name:"공손찬", chosenTactics:["위진새북", "승승장구", "질풍노도"]}, {name:"동탁", chosenTactics:["전권난정", "불노자위", "간담상조"]} ] },
    { id: "cav_rank3", priority: 9995, name: "[서버 3위] 동탁·원소·여포 방원 기병", concept: "[기병 3위]", formation: "방원진", officers: [ {name:"동탁", chosenTactics:["전권난정", "견진연봉", "위위구조"]}, {name:"원소", chosenTactics:["사소도", "강유겸제", "진퇴유도"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]} ] },

    // 🛡️ [방패병 메타 1~2위]
    { id: "shield_rank1", priority: 9994, name: "[서버 1위] 조조(제왕)·사마의·가후 구행 방패", concept: "[방패병 1위]", formation: "구행진", officers: [ {name:"조조(제왕)", chosenTactics:["군령여산", "간담상조", "안영찰채"]}, {name:"사마의", chosenTactics:["응시낭고", "반객위주", "후적박발"]}, {name:"가후", chosenTactics:["경달권변", "유비무환", "혼수모어"]} ] },
    { id: "shield_rank2", priority: 9993, name: "[서버 2위] 가후·사마의·조조 구행 방패", concept: "[방패병 2위]", formation: "구행진", officers: [ {name:"가후", chosenTactics:["경달권변", "혼수모어", "유비무환"]}, {name:"사마의", chosenTactics:["응시낭고", "반객위주", "후적박발"]}, {name:"조조", chosenTactics:["효웅", "진퇴유도", "안영찰채"]} ] },

    // 🏹 [궁병 메타 1~3위]
    { id: "bow_rank1", priority: 9992, name: "[서버 1위] 좌자·장녕·황보숭 구행 궁병", concept: "[궁병 1위]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "유비무환", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "진퇴유도", "간담상조"]} ] },
    { id: "bow_rank2", priority: 9991, name: "[서버 2위] 장녕·좌자·황보숭 추형 궁병", concept: "[궁병 2위]", formation: "추형진", officers: [ {name:"장녕", chosenTactics:["천의난위", "명찰추호", "양의화생"]}, {name:"좌자", chosenTactics:["화겁생기", "유비무환", "안영찰채"]}, {name:"황보숭", chosenTactics:["강직불아", "진퇴유도", "간담상조"]} ] },
    { id: "bow_rank3", priority: 9990, name: "[서버 3위] 좌자·장녕·황보숭 구행 궁병", concept: "[궁병 3위]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "전위위안", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "진퇴유도", "간담상조"]} ] }
];

var metaDeckUnitTypeMap = {};
analyzedMetaArchetypes.forEach(deck => {
    if (deck.name.includes("기병")) metaDeckUnitTypeMap[deck.id] = "기병";
    else if (deck.name.includes("방패")) metaDeckUnitTypeMap[deck.id] = "방패병";
    else if (deck.name.includes("궁병")) metaDeckUnitTypeMap[deck.id] = "궁병";
    else if (deck.name.includes("창병")) metaDeckUnitTypeMap[deck.id] = "창병";
    else metaDeckUnitTypeMap[deck.id] = "자동 판별";
});

var systemGuideInsights = {
    "spear_rank1": "💡 [마초 1군 정석] 마초의 무자비한 확산 폭딜과 위연/서서의 유지력이 맞물린 현재 메타의 가장 전형적인 0티어 정석 창병 조합입니다.",
    "spear_rank2": "💡 [마초 1군 변형] 1위 덱과 전법이 100% 동일하지만, 무장 배치 순서와 진형(구행진)을 변경하여 마초를 후열로 내린 전술적 변형 스탠스입니다.",
    "spear_rank3": "💡 [변칙 돌파형] 악진과 장료의 극한 전열 타격 능력을 조조(제왕)가 호도진과 혼수모어 제어기로 억지 연장시키는, 기형적이지만 파괴적인 암살 세팅입니다.",
    "cav_rank1": "💡 [초선-여포 기병] 초선의 매혹(폐월)과 동탁의 도발/피감을 고기방패 삼아 여포가 천하무쌍으로 적의 목을 따는 정석 기병 덱입니다.",
    "cav_rank2": "💡 [신전법 채용] 동탁에게 신전법 '불노자위'를 쥐여주어 1~3턴 극한의 피감을 챙기고, 4~5턴에 폭힐과 함께 공손찬/원소의 스윕을 노리는 최신 실험 덱입니다.",
    "cav_rank3": "💡 [방원진 여포] 동탁과 원소가 전열에서 확정 피감막을 콘크리트처럼 두르고, 여포가 방원진의 연격률 버프를 받아 난사하는 원맨 캐리 덱입니다.",
    "shield_rank1": "🚨 [기형적 진형 배치] 사마의가 후적박발/반객위주를 들어 딜량은 훌륭하나, '구행진(전/후/전)' 배치로 인해 맷집이 약한 가후가 전열에서 쳐맞고 끔살당하는 랭커의 치명적인 함정 세팅입니다. 무조건 '추형진'으로 바꿔야 합니다.",
    "shield_rank2": "🚨 [기형적 진형 배치] 역시 구행진을 채용하여 가후와 조조가 전열에 섭니다. 조조에게 0티어 피감기인 진퇴유도가 들어간 점은 1위 덱보다 낫지만, 구행진 배치는 여전히 사마의 덱의 방어 메커니즘을 거스르는 심각한 실수입니다.",
    "bow_rank1": "💡 [장녕 종결 세팅] 신규 전투매 '창림(질풍)'을 빠르게 채용하여 장녕의 액티브 폭딜 계수를 60%나 펌핑한 현 궁병 메타의 가장 완벽한 정답지입니다.",
    "bow_rank2": "⚠️ [매 세팅 미스] 추형진으로 좌자를 전열 탱커로 세운 판단은 좋으나, 모략 덱임에도 전투매를 물리 덱용인 '열공-여천'으로 사용하여 심각한 화력 누수가 발생하고 있습니다.",
    "bow_rank3": "⚠️ [전법 타협] 좌자에게 유비무환 대신 전위위안을 주었고, 매 역시 '열공-여천'으로 타협하여 1위 덱에 비해 전체적인 체급과 폭발력이 크게 떨어지는 하위 호환 세팅입니다."
};

window.getMetaDeckData = function() {
    return { analyzedMetaArchetypes, metaDeckUnitTypeMap, systemGuideInsights };
};

function renderMetaDeckPage() {
    const container = document.getElementById('meta-deck-container');
    if (!container) return;
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">전서버 실전 메타 덱 아카이브 (유저 서버 최신 창/기/방/궁 1~3위 락온)</h2>`;
    
    analyzedMetaArchetypes.forEach(deck => {
        const officersHtml = deck.officers.map(o => `
            <div style="background:var(--bg-inner); border:1px solid var(--border-main); padding:10px; border-radius:6px;">
                <div style="font-weight:bold; color:var(--text-main); margin-bottom:6px;">${o.name}</div>
                <div style="font-size:11px; color:var(--text-desc);">
                    <div>🔸 ${o.chosenTactics[0]}</div>${o.chosenTactics[1] ? `<div>🔸 ${o.chosenTactics[1]}</div>` : '<div style="color:#ef4444;">🔸 미장착</div>'}
                    ${o.chosenTactics[2] ? `<div>🔸 ${o.chosenTactics[2]}</div>` : '<div style="color:#ef4444;">🔸 미장착</div>'}
                </div>
            </div>
        `).join('');

        const insightText = systemGuideInsights[deck.id] || "💡 [분석 보류] 랭커의 일반적인 스탯 분배 덱입니다.";
        const isWarning = insightText.includes('⚠️') || insightText.includes('🚨');
        
        let insightHtml = `<div style="margin-top:8px; font-size:12px; color:${isWarning ? '#ef4444' : 'var(--text-muted)'}; font-weight:${isWarning ? 'bold' : 'normal'};">${insightText}</div>`;
        
        let borderColor = '#3b82f6';
        let bgEmphasis = 'rgba(59, 130, 246, 0.05)';
        let labelColor = '#3b82f6';
        let labelBg = 'rgba(59, 130, 246, 0.15)';
        
        if (isWarning) {
            borderColor = '#ef4444';
            bgEmphasis = 'rgba(239, 68, 68, 0.03)';
            labelColor = '#ef4444';
            labelBg = 'rgba(239, 68, 68, 0.15)';
        }

        const labelText = deck.concept ? `<span style="background:${labelBg}; color:${labelColor}; padding:3px 8px; border-radius:4px; font-weight:bold;">${deck.concept}</span>` : ``;

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
                ${insightHtml}
            </div>
        `);
    });
}

document.addEventListener('DOMContentLoaded', renderMetaDeckPage);

// [시스템 분석] meta_deck.js - 전서버 최상위 천공 랭커 1위 ~ 9위 총 27개 부대 완전 통합
console.log("[시스템 분석] meta_deck.js 1~9위 최상위 랭커 통합 데이터베이스 기동 완료");

var analyzedMetaArchetypes = [
    // 👑 [천공 1위 랭커 덱]
    { id: "rank1_deck1", priority: 10027, name: "[천공 1위] 1군 - 노숙·정보·육손SP 방원 기병", concept: "[열화장천 연격 폭격]", formation: "방원진", unitType: "기병", officers: [ {name:"노숙", chosenTactics:["탑상책", "분성지계", "격안관화"]}, {name:"정보", chosenTactics:["칠척사모", "진퇴유도", "불노자위"]}, {name:"육손SP", chosenTactics:["화공이릉", "천리추격", "열화장천"]} ] },
    { id: "rank1_deck2", priority: 10026, name: "[천공 1위] 2군 - 견희·허저·전위 구행 방패", concept: "[물리 딜탱 및 반격]", formation: "구행진", unitType: "방패병", officers: [ {name:"견희", chosenTactics:["신복옥의", "유비무환", "심구고루"]}, {name:"허저", chosenTactics:["호치", "부동여산", "수상개화"]}, {name:"전위", chosenTactics:["축호과간", "간담상조", "문치무공"]} ] },
    { id: "rank1_deck3", priority: 10025, name: "[천공 1위] 3군 - 황보숭·장녕·좌자 구행 궁병", concept: "[스탯 강탈 및 회피]", formation: "구행진", unitType: "궁병", officers: [ {name:"황보숭", chosenTactics:["강직불아", "강유겸제", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"좌자", chosenTactics:["화겁생기", "혼수모어", "유좌유용"]} ] },

    // 🏅 [천공 2위 랭커 덱]
    { id: "rank2_deck1", priority: 10024, name: "[천공 2위] 1군 - 법정·황충·강유 방원 방패", concept: "[방원진 추격 극대화]", formation: "방원진", unitType: "방패병", officers: [ {name:"법정", chosenTactics:["애자필보", "불노자위", "격안관화"]}, {name:"황충", chosenTactics:["적혈도", "간담상조", "견진연봉"]}, {name:"강유", chosenTactics:["담대여두", "천리추격", "반객위주"]} ] },
    { id: "rank2_deck2", priority: 10023, name: "[천공 2위] 2군 - 마초·위연·서서 안행 창병", concept: "[마초 안행진 확산 폭딜]", formation: "안행진", unitType: "창병", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "질풍노도"]}, {name:"위연", chosenTactics:["실병제위", "문치무공", "진퇴유도"]}, {name:"서서", chosenTactics:["절절학문", "심구고루", "전위위안"]} ] },
    { id: "rank2_deck3", priority: 10022, name: "[천공 2위] 3군 - 황보숭·장녕·좌자 구행 궁병", concept: "[서브 딜링 타협 세팅]", formation: "구행진", unitType: "궁병", officers: [ {name:"황보숭", chosenTactics:["강직불아", "금창신", "분성지계"]}, {name:"장녕", chosenTactics:["천의난위", "명찰추호", "양의화생"]}, {name:"좌자", chosenTactics:["화겁생기", "유비무환", "안영찰채"]} ] },

    // 🏅 [천공 3위 랭커 덱]
    { id: "rank3_deck1", priority: 10021, name: "[천공 3위] 1군 - 서서·마초·위연 구행 기병", concept: "[구행진 마초 몰빵]", formation: "구행진", unitType: "기병", officers: [ {name:"서서", chosenTactics:["절절학문", "문치무공", "심구고루"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "질풍노도"]}, {name:"위연", chosenTactics:["실병제위", "불노자위", "진퇴유도"]} ] },
    { id: "rank3_deck2", priority: 10020, name: "[천공 3위] 2군 - 원소·동탁·여포 방원 기병", concept: "[여포 1캐리 연타 폭딜]", formation: "방원진", unitType: "기병", officers: [ {name:"원소", chosenTactics:["사소도", "이퇴위진", "강유겸제"]}, {name:"동탁", chosenTactics:["전권난정", "견진연봉", "위위구조"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]} ] },
    { id: "rank3_deck3", priority: 10019, name: "[천공 3위] 3군 - 조조·사마의·가후 구행 방패", concept: "[유지력 기반 스탯 누적]", formation: "구행진", unitType: "방패병", officers: [ {name:"조조", chosenTactics:["효웅", "유좌유용", "간담상조"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "반객위주"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "포전인옥"]} ] },

    // 🏅 [천공 4위 랭커 덱]
    { id: "rank4_deck1", priority: 10018, name: "[천공 4위] 1군 - 좌자·장녕·황보숭 구행 궁병", concept: "[스탯 강탈 및 회피]", formation: "구행진", unitType: "궁병", officers: [ {name:"좌자", chosenTactics:["화겁생기", "유비무환", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "간담상조", "진퇴유도"]} ] },
    { id: "rank4_deck2", priority: 10017, name: "[천공 4위] 2군 - 조조(제왕)·사마의·가후 구행 방패", concept: "[제왕 조조 피감 극대화]", formation: "구행진", unitType: "방패병", officers: [ {name:"조조(제왕)", chosenTactics:["군령여산", "여자동포", "강유겸제"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "반객위주"]}, {name:"가후", chosenTactics:["경달권변", "포전인옥", "혼수모어"]} ] },
    { id: "rank4_deck3", priority: 10016, name: "[천공 4위] 3군 - 동탁·원소·여포 방원 기병", concept: "[방원진 1캐리 폭딜]", formation: "방원진", unitType: "기병", officers: [ {name:"동탁", chosenTactics:["전권난정", "견진연봉", "위위구조"]}, {name:"원소", chosenTactics:["사소도", "불노자위", "격안관화"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]} ] },

    // 🏅 [천공 5위 랭커 덱]
    { id: "rank5_deck1", priority: 10015, name: "[천공 5위] 1군 - 조조·사마의·가후 구행 방패", concept: "[사마의 절대 종결 정답지]", formation: "구행진", unitType: "방패병", officers: [ {name:"조조", chosenTactics:["효웅", "간담상조", "안영찰채"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "요사여신"]}, {name:"가후", chosenTactics:["경달권변", "포전인옥", "분성지계"]} ] },
    { id: "rank5_deck2", priority: 10014, name: "[천공 5위] 2군 - 마초·위연·서서 안행 창병", concept: "[마초 안행진 확산 폭딜]", formation: "안행진", unitType: "창병", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "불노자위", "진퇴유도"]}, {name:"서서", chosenTactics:["절절학문", "문치무공", "유비무환"]} ] },
    { id: "rank5_deck3", priority: 10013, name: "[천공 5위] 3군 - 좌자·장녕·황보숭 구행 궁병", concept: "[서브 딜링 타협 세팅]", formation: "구행진", unitType: "궁병", officers: [ {name:"좌자", chosenTactics:["화겁생기", "전위위안", "심구고루"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "홍수첨향", "여자동포"]} ] },

    // 🏅 [천공 6위 랭커 덱]
    { id: "rank6_deck1", priority: 10012, name: "[천공 6위] 1군 - 마초·위연·서서 안행 창병", concept: "[창병 0티어 정답지]", formation: "안행진", unitType: "창병", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "진퇴유도", "불노자위"]}, {name:"서서", chosenTactics:["절절학문", "전위위안", "문치무공"]} ] },
    { id: "rank6_deck2", priority: 10011, name: "[천공 6위] 2군 - 좌자·장녕·황보숭 구행 궁병", concept: "[안정성 극대화 궁병]", formation: "구행진", unitType: "궁병", officers: [ {name:"좌자", chosenTactics:["화겁생기", "유비무환", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "홍수첨향", "간담상조"]} ] },
    { id: "rank6_deck3", priority: 10010, name: "[천공 6위] 3군 - 조조·사마의·가후 구행 방패", concept: "[사마의 절대 종결 정답지]", formation: "구행진", unitType: "방패병", officers: [ {name:"조조", chosenTactics:["효웅", "심구고루", "강유겸제"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "요사여신"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "포전인옥"]} ] },

    // 🏅 [천공 7위 랭커 덱]
    { id: "rank7_deck1", priority: 10009, name: "[천공 7위] 1군 - 서서·마초·위연 구행 창병", concept: "[마초 구행진 몰빵]", formation: "구행진", unitType: "창병", officers: [ {name:"서서", chosenTactics:["절절학문", "문치무공", "유비무환"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "진퇴유도", "간담상조"]} ] },
    { id: "rank7_deck2", priority: 10008, name: "[천공 7위] 2군 - 유비(제왕)·법정·강유 추형 방패", concept: "[촉방패 절대 종결]", formation: "추형진", unitType: "방패병", officers: [ {name:"유비(제왕)", chosenTactics:["재주복주", "격안관화", "견진연봉"]}, {name:"법정", chosenTactics:["애자필보", "심구고루", "전위위안"]}, {name:"강유", chosenTactics:["담대여두", "천리추격", "체천행도"]} ] },
    { id: "rank7_deck3", priority: 10007, name: "[천공 7위] 3군 - 황충·관우·유비 구행 기병", concept: "[하이브리드 기병 변형]", formation: "구행진", unitType: "기병", officers: [ {name:"황충", chosenTactics:["적혈도", "강유겸제", "인세이도"]}, {name:"관우", chosenTactics:["무성", "질풍노도", "부동여산"]}, {name:"유비", chosenTactics:["인정", "여자동포", "홍수첨향"]} ] },

    // 🏅 [천공 8위 랭커 덱]
    { id: "rank8_deck1", priority: 10006, name: "[천공 8위] 1군 - 법정·황충·강유 방원 방패", concept: "[방원진 추격 극대화]", formation: "방원진", unitType: "방패병", officers: [ {name:"법정", chosenTactics:["애자필보", "심구고루", "유비무환"]}, {name:"황충", chosenTactics:["적혈도", "진퇴유도", "격안관화"]}, {name:"강유", chosenTactics:["담대여두", "반객위주", "천리추격"]} ] },
    { id: "rank8_deck2", priority: 10005, name: "[천공 8위] 2군 - 위연·마초·서서 구행 창병", concept: "[마초 구행진 타협]", formation: "구행진", unitType: "창병", officers: [ {name:"위연", chosenTactics:["실병제위", "간담상조", "불노자위"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "질풍노도"]}, {name:"서서", chosenTactics:["절절학문", "문치무공", "전위위안"]} ] },
    { id: "rank8_deck3", priority: 10004, name: "[천공 8위] 3군 - 좌자·장녕·황보숭 구행 궁병", concept: "[서브 딜링 타협 세팅]", formation: "구행진", unitType: "궁병", officers: [ {name:"좌자", chosenTactics:["화겁생기", "안영찰채", "여자동포"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "만천과해", "강유겸제"]} ] },

    // 🏅 [천공 9위 랭커 덱]
    { id: "rank9_deck1", priority: 10003, name: "[천공 9위] 1군 - 좌자·장녕·황보숭 구행 궁병", concept: "[안정성 극대화 궁병]", formation: "구행진", unitType: "궁병", officers: [ {name:"좌자", chosenTactics:["화겁생기", "유비무환", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "진퇴유도", "간담상조"]} ] },
    { id: "rank9_deck2", priority: 10002, name: "[천공 9위] 2군 - 조조·사마의·가후 구행 방패", concept: "[사마의 타협의 한계]", formation: "구행진", unitType: "방패병", officers: [ {name:"조조", chosenTactics:["효웅", "홍수첨향", "동구적개"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "후적박발"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "만천과해"]} ] },
    { id: "rank9_deck3", priority: 10001, name: "[천공 9위] 3군 - 동탁·원소·여포 방원 기병", concept: "[방원진 1캐리 폭딜]", formation: "방원진", unitType: "기병", officers: [ {name:"동탁", chosenTactics:["전권난정", "견진연봉", "위위구조"]}, {name:"원소", chosenTactics:["사소도", "횡징폭렴", "이퇴위진"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]} ] }
];

var metaDeckUnitTypeMap = {};
analyzedMetaArchetypes.forEach(deck => {
    metaDeckUnitTypeMap[deck.id] = deck.unitType || "자동 판별";
});

var systemGuideInsights = {
    // 1~3위 핵심 인사이트
    "rank1_deck1": "👑 [1위의 완벽한 0티어] 방원진과 노숙(격안관화)을 통해 육손SP의 연격률을 극한으로 끌어올리고, 노숙이 건 화상을 통해 '열화장천' 60% 딜뻥을 확정으로 터뜨리는 현존 최고점의 덱입니다.",
    "rank1_deck2": "💡 [전위 고기방패 최적화] 전열에 전위와 견희를 세워 어그로와 힐을 전담시키고, 구행진 후열에서 허저가 '수상개화'로 능동 스킬 발동률을 펌핑해 뚝배기를 깨는 실전 압축 딜탱덱입니다.",
    "rank2_deck2": "💡 [안행진 촉창병 정석] 마초가 안행진 후열에서 확산 폭딜을 넣고 위연이 서포트하는 0티어 창병 정답지입니다.",
    "rank3_deck1": "🚨 [구행진의 치명적 함정] 마초 딜을 올리겠다고 구행진을 썼으나, 맷집이 약한 서서가 전열에서 맨몸으로 적의 폭딜을 받아내야 하는 매우 위험하고 기형적인 배치입니다. 무조건 안행진으로 교정해야 합니다.",
    "rank3_deck3": "🚨 [가후 객사 오답 노트] 구행진 전열에 가후를 세웠지만, 조조에게 0티어 피감기(강유겸제/안영찰채)가 없어 적의 1턴 폭딜에 가후가 객사할 확률이 높습니다.",
    
    // 4~6위 핵심 인사이트
    "rank4_deck2": "💡 [제왕 조조 방패덱] 조조(제왕)를 투입하여 강유겸제로 극한의 피감을 두르고 사마의 구행진의 폭발력을 살린 종결급 세팅입니다.",
    "rank5_deck1": "👑 [사마의 방패 절대 종결] 가후의 '포전인옥'과 사마의의 '수상개화+요사여신'이 맞물린 0티어 종결 정답지입니다. 구행진 전열의 약점은 조조의 간담상조/안영찰채로 완벽히 커버했습니다.",
    "rank6_deck3": "👑 [사마의 방패 절대 종결] 5위 랭커의 1군과 동일하게 구행진 + 사마의(수상개화/요사여신) + 가후(포전인옥)를 채용한 절대 종결 세팅입니다. 조조에게 강유겸제와 심구고루를 주어 가후 객사 리스크를 지워버렸습니다.",
    
    // 7~9위 핵심 인사이트
    "rank7_deck2": "👑 [촉방패 절대 종결] 추형진을 채용하여 법정을 전열 메인 탱커로, 강유를 후열 메인 딜러로 완벽하게 배치한 0티어 정답지입니다.",
    "rank8_deck1": "💡 [방원진 촉방패 하이브리드] 방원진을 기용해 황충과 강유의 연격 및 추격 딜을 극대화하고, 법정이 전열에서 애자필보/유비무환으로 끔살을 막아내는 훌륭한 하이브리드 조합입니다.",
    "rank8_deck2": "🚨 [구행진 타협] 서서 대신 위연이 전열에 서서 7위 유저보다는 덜 위험하지만, 여전히 안행진 정석보다 안정성이 크게 떨어지는 타협 세팅입니다.",
    "rank9_deck1": "💡 [안정성 극대화 궁병 정석] 황보숭에게 진퇴유도와 간담상조를 쥐여주어 덱 전체의 유지력과 피감을 극한으로 끌어올린 0티어 정석 세팅입니다.",
    "rank9_deck2": "🚨 [사마의 타협의 한계] 코어 전법(포전인옥, 요사여신, 간담상조 등)이 없어 만천과해, 후적박발 등으로 억지 타협한 하위 호환 덱입니다. 최상위 랭커(5, 6위)의 절대 종결 세팅에 비해 유지력과 딜 고점이 모두 떨어집니다."
};

window.getMetaDeckData = function() {
    return { analyzedMetaArchetypes, metaDeckUnitTypeMap, systemGuideInsights };
};

function renderMetaDeckPage() {
    const container = document.getElementById('meta-deck-container');
    if (!container) return;
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">천공 랭킹 최상위 1~9위 실전 메타 덱 (총 27개 부대 락온 완료)</h2>`;
    
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
        
        let insightHtml = `<div style="margin-top:8px; font-size:12px; color:${isWarning ? '#ef4444' : 'var(--text-muted)'}; font-weight:${isWarning ? 'bold' : 'normal'}; line-height: 1.4;">${insightText}</div>`;
        
        let borderColor = '#3b82f6';
        let bgEmphasis = 'rgba(59, 130, 246, 0.05)';
        let labelColor = '#3b82f6';
        let labelBg = 'rgba(59, 130, 246, 0.15)';
        
        if (isWarning) {
            borderColor = '#ef4444';
            bgEmphasis = 'rgba(239, 68, 68, 0.03)';
            labelColor = '#ef4444';
            labelBg = 'rgba(239, 68, 68, 0.15)';
        } else if (deck.concept.includes('종결')) {
            borderColor = '#f59e0b';
            bgEmphasis = 'rgba(245, 158, 11, 0.05)';
            labelColor = '#f59e0b';
            labelBg = 'rgba(245, 158, 11, 0.15)';
        }

        const labelText = deck.concept ? `<span style="background:${labelBg}; color:${labelColor}; padding:3px 8px; border-radius:4px; font-weight:bold;">${deck.concept}</span>` : ``;

        container.insertAdjacentHTML('beforeend', `
            <div style="background:${bgEmphasis}; border:1px solid ${borderColor}; border-radius:8px; padding:15px; margin-bottom:15px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h3 style="margin:0; font-size:16px; color:var(--text-main);">${deck.name}</h3>
                    ${labelText}
                </div>
                <div style="display:flex; gap:10px; font-size:12px; margin-bottom:12px;">
                    <span style="background:rgba(245, 158, 11, 0.15); color:var(--text-highlight); padding:3px 8px; border-radius:4px; font-weight:bold;">${metaDeckUnitTypeMap[deck.id]}</span>
                    <span style="background:rgba(56, 189, 248, 0.15); color:#38bdf8; padding:3px 8px; border-radius:4px; font-weight:bold;">${deck.formation}</span>
                </div>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">${officersHtml}</div>
                ${insightHtml}
            </div>
        `);
    });
}

document.addEventListener('DOMContentLoaded', renderMetaDeckPage);

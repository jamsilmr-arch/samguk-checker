// [시스템 분석] meta_deck.js - 전서버 실전 메타 덱 데이터베이스 (천공 랭킹 1위~6위 실전 무중복 세트 + 최신 심구고루 메타 통합 완료)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

var analyzedMetaArchetypes = [
    // 🏆 [천공 랭킹 1위 & 5위 동일 원본 1~3군 세트]
    {
        id: "rank1_shu_macho", priority: 130, name: "[1위/5위 1군] 마초·위연·서서 안행 창병", concept: "[천공 1/5위 세트]", formation: "안행진",
        officers: [
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "반객위주"] },
            { name: "위연", chosenTactics: ["실병제위", "이퇴위진", "진퇴유도"] },
            { name: "서서", chosenTactics: ["절절학문", "전위위안", "문치무공"] }
        ]
    },
    {
        id: "rank1_wei_sima", priority: 129, name: "[1위/5위 2군] 사마의·조조·가후 추형 방패", concept: "[천공 1/5위 세트]", formation: "추형진",
        officers: [
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "조조", chosenTactics: ["효웅", "유좌유용", "강유겸제"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "만천과해"] }
        ]
    },
    {
        id: "rank1_gun_jang", priority: 128, name: "[1위/5위 3군] 황보숭·장녕·좌자 구행 궁병", concept: "[천공 1/5위 세트]", formation: "구행진",
        officers: [
            { name: "황보숭", chosenTactics: ["강직불아", "금창신", "간담상조"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "좌자", chosenTactics: ["화겁생기", "안영찰채", "유비무환"] }
        ]
    },

    // 🥈 [천공 랭킹 2위 원본 1~3군 세트]
    {
        id: "rank2_gun_yeopo", priority: 125, name: "[2위 1군] 원소·동탁·여포 방원 기병", concept: "[천공 2위 세트]", formation: "방원진",
        officers: [
            { name: "원소", chosenTactics: ["사소도", "견진연봉", "위위구조"] },
            { name: "동탁", chosenTactics: ["전권난정", "강유겸제", "홍수첨향"] },
            { name: "여포", chosenTactics: ["천하무쌍", "용왕직전", "만부막적"] }
        ]
    },
    {
        id: "rank2_wei_sima_hujuk", priority: 124, name: "[2위 2군] 사마의·조조·가후 추형 방패", concept: "[천공 2위 세트]", formation: "추형진",
        officers: [
            { name: "사마의", chosenTactics: ["응시낭고", "반객위주", "후적박발"] },
            { name: "조조", chosenTactics: ["효웅", "간담상조", "기문둔갑"] },
            { name: "가후", chosenTactics: ["경달권변", "만천과해", "혼수모어"] }
        ]
    },
    {
        id: "rank2_shu_macho_simgu", priority: 123, name: "[2위 3군] 마초·위연·서서 안행 창병", concept: "[천공 2위 세트]", formation: "안행진",
        officers: [
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "질풍노도"] },
            { name: "위연", chosenTactics: ["실병제위", "심구고루", "유좌유용"] },
            { name: "서서", chosenTactics: ["절절학문", "전위위안", "문치무공"] }
        ]
    },

    // 🥉 [천공 랭킹 3위 원본 1~3군 세트]
    {
        id: "rank3_shu_macho", priority: 120, name: "[3위 1군] 마초·위연·서서 안행 창병", concept: "[천공 3위 세트]", formation: "안행진",
        officers: [
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "반객위주"] },
            { name: "위연", chosenTactics: ["실병제위", "진퇴유도", "간담상조"] },
            { name: "서서", chosenTactics: ["절절학문", "유비무환", "문치무공"] }
        ]
    },
    {
        id: "rank3_gun_jang_simgu", priority: 119, name: "[3위 2군] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 3위 세트]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "전위위안", "심구고루"] },
            { name: "장녕", chosenTactics: ["천의난위", "후적박발", "명찰추호"] },
            { name: "황보숭", chosenTactics: ["강직불아", "홍수첨향", "여자동포"] }
        ]
    },
    {
        id: "rank3_wei_sima_gu", priority: 118, name: "[3위 3군] 조조·사마의·가후 구행 방패", concept: "[천공 3위 세트]", formation: "구행진",
        officers: [
            { name: "조조", chosenTactics: ["효웅", "위위구조", "안영찰채"] },
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "만천과해"] }
        ]
    },

    // 🏅 [천공 랭킹 4위 원본 1~3군 세트]
    {
        id: "rank4_shu_seo", priority: 115, name: "[4위 1군] 서서·마초·위연 구행 창병", concept: "[천공 4위 세트]", formation: "구행진",
        officers: [
            { name: "서서", chosenTactics: ["절절학문", "전위위안", "문치무공"] },
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "질풍노도"] },
            { name: "위연", chosenTactics: ["실병제위", "강유겸제", "진퇴유도"] }
        ]
    },
    {
        id: "rank4_wu_son", priority: 114, name: "[4위 2군] 육항·손권·노숙 안행 궁병", concept: "[천공 4위 세트]", formation: "안행진",
        officers: [
            { name: "육항", chosenTactics: ["청백충근", "요사여신", "양의화생"] },
            { name: "손권", chosenTactics: ["웅거", "안영찰채", "여자동포"] },
            { name: "노숙", chosenTactics: ["탑상책", "분성지계", "만천과해"] }
        ]
    },
    {
        id: "rank4_wei_sima", priority: 113, name: "[4위 3군] 조조·사마의·가후 구행 방패", concept: "[천공 4위 세트]", formation: "구행진",
        officers: [
            { name: "조조", chosenTactics: ["효웅", "유좌유용", "간담상조"] },
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "반객위주"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "유비무환"] }
        ]
    },

    // 🎖️ [천공 랭킹 6위 원본 1~3군 세트]
    {
        id: "rank6_gun_jwa", priority: 110, name: "[6위 1군] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 6위 세트]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "유비무환", "안영찰채"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "진퇴유도"] },
            { name: "황보숭", chosenTactics: ["강직불아", "횡징폭렴", "동구적개"] }
        ]
    },
    {
        id: "rank6_wei_ak", priority: 109, name: "[6위 2군] 악진·조조(제왕)·장료 기형 기병", concept: "[천공 6위 세트 - 심구고루]", formation: "기형진",
        officers: [
            { name: "악진", chosenTactics: ["분용당선", "여자동포", "유좌유용"] },
            { name: "조조(제왕)", chosenTactics: ["군령여산", "심구고루", "견불가최"] },
            { name: "장료", chosenTactics: ["함진살적", "질풍노도", "반객위주"] }
        ]
    },
    {
        id: "rank6_wei_jo", priority: 108, name: "[6위 3군] 조조·사마의·가후 구행 방패", concept: "[천공 6위 세트]", formation: "구행진",
        officers: [
            { name: "조조", chosenTactics: ["효웅", "간담상조", "혼수모어"] },
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "가후", chosenTactics: ["경달권변", "강유겸제", "이퇴위진"] }
        ]
    },

    // 🌟 [미래 메타 아카이브: 법정 0티어 적용]
    {
        id: "meta_shu_beopjeong_gang",
        priority: 150,
        name: "[미래 0티어] 유비(제왕)·법정·강유 추형 방패",
        concept: "[패시브 완벽 카운터 브루저]",
        formation: "추형진",
        officers: [
            { name: "유비(제왕)", chosenTactics: ["재주복주", "유비무환", "안영찰채"] },
            { name: "법정", chosenTactics: ["애자필보", "심구고루", "간담상조"] },
            { name: "강유", chosenTactics: ["담대여두", "천리추격", "반객위주"] }
        ]
    }
];

var metaDeckUnitTypeMap = {
    "rank1_shu_macho": "창병", "rank1_wei_sima": "방패병", "rank1_gun_jang": "궁병",
    "rank2_gun_yeopo": "기병", "rank2_wei_sima_hujuk": "방패병", "rank2_shu_macho_simgu": "창병",
    "rank3_shu_macho": "창병", "rank3_gun_jang_simgu": "궁병", "rank3_wei_sima_gu": "방패병",
    "rank4_shu_seo": "창병", "rank4_wu_son": "궁병", "rank4_wei_sima": "방패병",
    "rank6_gun_jwa": "궁병", "rank6_wei_ak": "기병", "rank6_wei_jo": "방패병",
    "meta_shu_beopjeong_gang": "방패병"
};

var systemGuideInsights = {
    "rank1_shu_macho": "💡 [1위/5위] 안행진 버프를 받은 마초가 출수법과 반객위주로 광역 폭딜을 꽂아넣으며 위연과 서서가 완벽한 공방 버프를 지원합니다.",
    "rank1_wei_sima": "💡 [1위/5위] 조조가 유좌유용+강유겸제로 버티고 사마의가 수상개화+요사여신으로 폭발적인 모략 치명타를 퍼붓습니다.",
    "rank1_gun_jang": "💡 [1위/5위] 황보숭의 방벽과 좌자의 유비무환 힐링으로 불사망을 구축하며 장녕이 적 스탯을 강탈해 15만 폭딜을 누적합니다.",
    "rank2_gun_yeopo": "💡 [2위] 방원진과 원소의 견진연봉으로 후열 여포의 연격률을 78% 이상으로 끌어올려 적을 찢어버립니다.",
    "rank2_wei_sima_hujuk": "💡 [2위] 사마의가 침묵/겁전을 무시하는 후적박발과 반객위주 패시브 깡딜로 무장한 방패덱입니다.",
    "rank3_shu_macho": "💡 [3위] 서서에게 유비무환을 주어 안정적인 유지력 아래 마초가 폭딜을 쏟아냅니다.",
    "rank4_shu_seo": "💡 [4위] 구행진 전열에 서서를 세워 고기방패 및 힐러로 쓰고 마초와 위연이 뒤에서 프리딜을 넣습니다.",
    "rank4_wu_son": "💡 [4위] 노숙과 육항이 손권에게 버프를 몰아주어 손권의 웅거 스택을 극한으로 터뜨리는 오나라 1티어 덱입니다.",
    "rank6_wei_ak": "💡 [6위] 조조(제왕)에게 신전법 '심구고루'를 장착시켜 평타를 흡수하고, 악진과 장료가 안전하게 적 주장을 암살합니다.",
    "meta_shu_beopjeong_gang": "🚨 [최신 메타 브레이커] 법정의 '피곤'으로 적 패시브를 잠그고, 심구고루 도발과 강유의 스탯 강탈로 찍어누르는 0티어 방패덱입니다."
};

window.getMetaDeckData = function() {
    return { analyzedMetaArchetypes, metaDeckUnitTypeMap, systemGuideInsights };
};

function renderMetaDeckPage() {
    const container = document.getElementById('meta-deck-container');
    if (!container) return;
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">전서버 실전 메타 덱 및 최신 랭커 1~6위 아카이브</h2>`;
    
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

        const isRanked = deck.id.includes('rank');
        const borderColor = isRanked ? '#f59e0b' : '#ec4899';
        const bgEmphasis = isRanked ? 'rgba(245, 158, 11, 0.03)' : 'rgba(236, 72, 153, 0.05)';
        const labelText = deck.concept ? `<span style="background:${isRanked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(236, 72, 153, 0.2)'}; color:${isRanked ? '#ef4444' : '#f472b6'}; padding:3px 8px; border-radius:4px; font-weight:bold;">${deck.concept}</span>` : ``;

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

// [시스템 분석] meta_deck.js - 전서버 랭커 실전 메타 덱 마스터 데이터베이스 (1위~5위 생태계 우선순위 탑재)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

const analyzedMetaArchetypes = [
    // 🏆 [전서버 1위 생태계] 우선순위(Priority): 2
    {id:"rank1_1gun_wu", priority: 2, name:"[1위 1군] 소교·노숙·육손 방원기병", concept:"[1위 1군] 소교·노숙·육손 방원기병", formation:"방원진", officers:[{name:"소교", chosenTactics:["화용욕모","진퇴유도","간담상조"]}, {name:"노숙", chosenTactics:["탑상책","견진연봉","위위구조"]}, {name:"육손", chosenTactics:["지변규려","천리추격","체천행도"]}]},
    {id:"rank1_2gun_qun", priority: 2, name:"[1위 2군] 원소·장녕·좌자 구행방패", concept:"[1위 2군] 원소·장녕·좌자 구행방패", formation:"구행진", officers:[{name:"원소", chosenTactics:["사소도","강유겸제","여자동포"]}, {name:"장녕", chosenTactics:["천의난위","양의화생","수상개화"]}, {name:"좌자", chosenTactics:["화겁생기","안영찰채","유좌유용"]}]},
    {id:"rank1_3gun_wei", priority: 2, name:"[1위 3군] 허저·가후·악진 호도창", concept:"[1위 3군] 허저·가후·악진 호도창", formation:"호도진", officers:[{name:"허저", chosenTactics:["호치","부동여산","반객위주"]}, {name:"가후", chosenTactics:["경달권변","혼수모어","분성지계"]}, {name:"악진", chosenTactics:["분용당선","기문둔갑","횡징폭렴"]}]},

    // 🥈 [전서버 2위 생태계] 우선순위(Priority): 1
    {id:"rank2_1gun_qun", priority: 1, name:"[2위 1군] 좌자·장녕·우길 구행궁병", concept:"[2위 1군] 좌자·장녕·우길 구행궁병", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","안영찰채","유좌유용"]}, {name:"장녕", chosenTactics:["천의난위","수상개화","양의화생"]}, {name:"우길", chosenTactics:["태평경","강유겸제","금창신"]}]},
    {id:"rank2_2gun_wei", priority: 1, name:"[2위 2군] 사마의·조조·가후 추형방패", concept:"[2위 2군] 사마의·조조·가후 추형방패", formation:"추형진", officers:[{name:"사마의", chosenTactics:["응시낭고","반객위주","요사여신"]}, {name:"조조", chosenTactics:["효웅","이퇴위진","간담상조"]}, {name:"가후", chosenTactics:["경달권변","만천과해","혼수모어"]}]},
    {id:"rank2_3gun_shu", priority: 1, name:"[2위 3군] 마초·위연·서서 안행창병", concept:"[2위 3군] 마초·위연·서서 안행창병", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","질풍노도"]}, {name:"위연", chosenTactics:["실병제위","홍수첨향","진퇴유도"]}, {name:"서서", chosenTactics:["절절학문","문치무공","전위위안"]}]},

    // 🥉 [전서버 3위 생태계] 우선순위(Priority): 0
    {id:"rank3_1gun_shu", priority: 0, name:"[3위 1군] 마초·위연·서서 안행창병", concept:"[3위 1군] 마초·위연·서서 안행창병", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","질풍노도"]}, {name:"위연", chosenTactics:["실병제위","홍수첨향","이퇴위진"]}, {name:"서서", chosenTactics:["절절학문","문치무공","전위위안"]}]},
    {id:"rank3_2gun_wu", priority: 0, name:"[3위 2군] 손권·육항·노숙 구행궁병", concept:"[3위 2군] 손권·육항·노숙 구행궁병", formation:"구행진", officers:[{name:"손권", chosenTactics:["웅거","진퇴유도","토적격문"]}, {name:"육항", chosenTactics:["청백충근","양의화생","반객위주"]}, {name:"노숙", chosenTactics:["탑상책","분성지계","여자동포"]}]},
    {id:"rank3_3gun_wei", priority: 0, name:"[3위 3군] 사마의·조조·가후 추형방패", concept:"[3위 3군] 사마의·조조·가후 추형방패", formation:"추형진", officers:[{name:"사마의", chosenTactics:["응시낭고","수상개화","요사여신"]}, {name:"조조", chosenTactics:["효웅","안영찰채","간담상조"]}, {name:"가후", chosenTactics:["경달권변","혼수모어","만천과해"]}]},

    // 🏅 [전서버 4위 생태계] 우선순위(Priority): 0
    {id:"rank4_1gun_qun", priority: 0, name:"[4위 1군] 원소·동탁·여포 방원기병", concept:"[4위 1군] 원소·동탁·여포 방원기병", formation:"방원진", officers:[{name:"원소", chosenTactics:["사소도","이퇴위진","횡징폭렴"]}, {name:"동탁", chosenTactics:["전권난정","견진연봉","위위구조"]}, {name:"여포", chosenTactics:["천하무쌍","용왕직전","만부막적"]}]},
    {id:"rank4_2gun_shu", priority: 0, name:"[4위 2군] 마초·위연·유비 안행창병", concept:"[4위 2군] 마초·위연·유비 안행창병", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","질풍노도"]}, {name:"위연", chosenTactics:["실병제위","토적격문","문치무공"]}, {name:"유비", chosenTactics:["인정","혼수모어","강유겸제"]}]},
    {id:"rank4_3gun_wei", priority: 0, name:"[4위 3군] 조조·사마의·하후돈 구행방패", concept:"[4위 3군] 조조·사마의·하후돈 구행방패", formation:"구행진", officers:[{name:"조조", chosenTactics:["효웅","진퇴유도","유좌유용"]}, {name:"사마의", chosenTactics:["응시낭고","수상개화","반객위주"]}, {name:"하후돈", chosenTactics:["발시담정","홍수첨향","간담상조"]}]},

    // 🎖️ [전서버 5위 생태계] 우선순위(Priority): 0
    {id:"rank5_1gun_wei", priority: 0, name:"[5위 1군] 악진·조조(제왕)·장료 기형창병", concept:"[5위 1군] 악진·조조(제왕)·장료 기형창병", formation:"기형진", officers:[{name:"악진", chosenTactics:["분용당선","여자동포","유좌유용"]}, {name:"조조(제왕)", chosenTactics:["군령여산","간담상조","강유겸제"]}, {name:"장료", chosenTactics:["함진살적","질풍노도","반객위주"]}]},
    {id:"rank5_2gun_wei", priority: 0, name:"[5위 2군] 사마의·조조·가후 안행방패", concept:"[5위 2군] 사마의·조조·가후 안행방패", formation:"안행진", officers:[{name:"사마의", chosenTactics:["응시낭고","수상개화","요사여신"]}, {name:"조조", chosenTactics:["효웅","횡징폭렴","혼수모어"]}, {name:"가후", chosenTactics:["경달권변","만천과해","안영찰채"]}]},
    {id:"rank5_3gun_qun", priority: 0, name:"[5위 3군] 좌자·장녕·우길 구행궁병", concept:"[5위 3군] 좌자·장녕·우길 구행궁병", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","동구적개","홍수첨향"]}, {name:"장녕", chosenTactics:["천의난위","동촉기선","양의화생"]}, {name:"우길", chosenTactics:["태평경","진퇴유도","이퇴위진"]}]},

    // 🔮 [유저 커스텀 종결 덱 아카이브]
    {id:"var_jegaryang_hwangchung_gangyu", priority: 0, name:"[클래식] 제갈량·황충·강유 방원궁병", concept:"[클래식] 제갈량·황충·강유 방원궁병", formation:"방원진", officers:[{name:"제갈량", chosenTactics:["초선차전","전위위안","안영찰채"]}, {name:"황충", chosenTactics:["적혈도","강유겸제","진퇴유도"]}, {name:"강유", chosenTactics:["담대여두","반객위주","일고작기"]}]}
];

const metaDeckUnitTypeMap = {
    "rank1_1gun_wu":"기병", "rank1_2gun_qun":"방패병", "rank1_3gun_wei":"창병",
    "rank2_1gun_qun":"궁병", "rank2_2gun_wei":"방패병", "rank2_3gun_shu":"창병",
    "rank3_1gun_shu":"창병", "rank3_2gun_wu":"궁병", "rank3_3gun_wei":"방패병",
    "rank4_1gun_qun":"기병", "rank4_2gun_shu":"창병", "rank4_3gun_wei":"방패병",
    "rank5_1gun_wei":"창병", "rank5_2gun_wei":"방패병", "rank5_3gun_qun":"궁병",
    "var_jegaryang_hwangchung_gangyu":"궁병"
};

const systemGuideInsights = {
    "rank1_1gun_wu":"💡 [1위 1군] 소교의 진퇴유도/간담상조 뎀감망과 노숙의 견진연봉 버프를 통해 육손이 극강의 추격 폭딜을 넣는 기병.",
    "rank1_2gun_qun":"💡 [1위 2군] 원소의 강유겸제/여자동포 피감과 장녕/좌자의 압도적인 힐/디버프 유지력을 바탕으로 한 좀비 방패병.",
    "rank1_3gun_wei":"💡 [1위 3군] 허저의 부동여산/반객위주 폭딜을 가후와 악진이 기문둔갑과 다중 제어기로 보좌하는 창병 조합.",
    "rank2_1gun_qun":"💡 [2위 1군] 좌자/우길/장녕의 시너지로 회피와 신산을 극대화하여 1군을 완벽히 카운터치는 궁병 조합.",
    "rank2_2gun_wei":"💡 [2위 2군] 사마의가 반객위주와 요사여신으로 고점을 뚫고, 조조와 가후가 유지력과 디버프를 전담하는 방패병.",
    "rank2_3gun_shu":"💡 [2위 3군] 서서의 전위위안 버프를 등에 업고 마초와 위연이 확산 및 연격 폭딜을 가하는 창병 조합.",
    "rank3_1gun_shu":"💡 [3위 1군] 서서의 스탯 폭증 버프 속에서 마초와 위연이 전선을 갈아버리는 확산 피해 창병입니다.",
    "rank3_2gun_wu":"💡 [3위 2군] 손권의 진퇴/토적 유틸성과 육항, 노숙의 무상성 버프가 결합된 극강의 밸런스 궁병 덱입니다.",
    "rank3_3gun_wei":"💡 [3위 3군] 수상개화와 요사여신의 쌍버프를 통해 사마의의 모략 딜을 한 방에 폭발시키는 추형 방패병.",
    "rank4_1gun_qun":"💡 [4위 1군] 원소의 통솔 버프와 동탁의 피감 속에서 여포가 적의 핵심을 분쇄하는 방원 기병.",
    "rank4_2gun_shu":"💡 [4위 2군] 유비의 혼수모어/강유겸제 완벽 힐망 속에서 마초와 위연이 날뛰는 안행 창병.",
    "rank4_3gun_wei":"💡 [4위 3군] 유좌유용과 반객위주를 통해 딜 누수를 방지하고 사마의의 지속 화력을 극대화한 구행 방패병.",
    "rank5_1gun_wei":"💡 [5위 1군] 조조(제왕)의 완벽한 뎀감망 위에서 장료와 악진이 첫 턴 선제 폭격을 가하는 기형 창병.",
    "rank5_2gun_wei":"💡 [5위 2군] 횡징폭렴과 혼수모어, 만천과해의 3중 제어기로 적을 봉쇄하는 사마의 안행 방패병.",
    "rank5_3gun_qun":"💡 [5위 3군] 좌자와 장녕의 폭풍 같은 시너지 위에 우길이 태평경/이퇴위진으로 전선을 굳히는 구행 궁병.",
    "var_jegaryang_hwangchung_gangyu":"💡 [클래식] 제갈량, 황충, 강유의 스탯 시너지와 완벽한 방원진 유틸성이 결합된 범용 1티어 궁병."
};

window.getMetaDeckData = function() {
    return { analyzedMetaArchetypes, metaDeckUnitTypeMap, systemGuideInsights };
};

function renderMetaDeckPage() {
    const container = document.getElementById('meta-deck-container');
    if (!container) return;
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">전서버 최상위 랭커 실전 메타 덱 아카이브</h2>`;
    
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

        // 1위, 2위 덱은 특별한 UI 강조
        const borderColor = deck.id.includes('rank1') ? '#f59e0b' : (deck.id.includes('rank2') ? '#94a3b8' : 'var(--border-main)');
        const bgEmphasis = deck.id.includes('rank1') ? 'rgba(245, 158, 11, 0.03)' : (deck.id.includes('rank2') ? 'rgba(148, 163, 184, 0.03)' : 'var(--bg-card)');

        container.insertAdjacentHTML('beforeend', `
            <div style="background:${bgEmphasis}; border:1px solid ${borderColor}; border-radius:8px; padding:15px; margin-bottom:15px;">
                <h3 style="margin:0 0 10px 0; font-size:16px; color:var(--text-main);">${deck.name}</h3>
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

// [시스템 분석] meta_deck.js - 전서버 랭커 실전 메타 덱 마스터 데이터베이스 (1위/2위 무중복 3덱 세트 완벽 동기화)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

const analyzedMetaArchetypes = [
    // 🏆 [전서버 1위 생태계] 전법 중복률 0% 검증 완료
    {id:"rank1_1gun_wu", name:"[1위 1군] 소교·노숙·육손 방원기병", concept:"[1위 1군] 소교·노숙·육손 방원기병", formation:"방원진", officers:[{name:"소교", chosenTactics:["화용욕모","진퇴유도","간담상조"]}, {name:"노숙", chosenTactics:["탑상책","견진연봉","위위구조"]}, {name:"육손", chosenTactics:["지변규려","천리추격","체천행도"]}]},
    {id:"rank1_2gun_qun", name:"[1위 2군] 원소·장녕·좌자 구행방패", concept:"[1위 2군] 원소·장녕·좌자 구행방패", formation:"구행진", officers:[{name:"원소", chosenTactics:["사소도","강유겸제","여자동포"]}, {name:"장녕", chosenTactics:["천의난위","양의화생","수상개화"]}, {name:"좌자", chosenTactics:["화겁생기","안영찰채","유좌유용"]}]},
    {id:"rank1_3gun_wei", name:"[1위 3군] 허저·가후·악진 호도창", concept:"[1위 3군] 허저·가후·악진 호도창", formation:"호도진", officers:[{name:"허저", chosenTactics:["호치","부동여산","반객위주"]}, {name:"가후", chosenTactics:["경달권변","혼수모어","분성지계"]}, {name:"악진", chosenTactics:["분용당선","기문둔갑","횡징폭렴"]}]},

    // 🥈 [전서버 2위 생태계] 전법 중복률 0% 검증 완료
    {id:"rank2_1gun_qun", name:"[2위 1군] 좌자·장녕·우길 구행궁병", concept:"[2위 1군] 좌자·장녕·우길 구행궁병", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","안영찰채","유좌유용"]}, {name:"장녕", chosenTactics:["천의난위","수상개화","양의화생"]}, {name:"우길", chosenTactics:["태평경","강유겸제","금창신"]}]},
    {id:"rank2_2gun_wei", name:"[2위 2군] 사마의·조조·가후 추형방패", concept:"[2위 2군] 사마의·조조·가후 추형방패", formation:"추형진", officers:[{name:"사마의", chosenTactics:["응시낭고","반객위주","요사여신"]}, {name:"조조", chosenTactics:["효웅","이퇴위진","간담상조"]}, {name:"가후", chosenTactics:["경달권변","만천과해","혼수모어"]}]},
    {id:"rank2_3gun_shu", name:"[2위 3군] 마초·위연·서서 안행창병", concept:"[2위 3군] 마초·위연·서서 안행창병", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","질풍노도"]}, {name:"위연", chosenTactics:["실병제위","홍수첨향","진퇴유도"]}, {name:"서서", chosenTactics:["절절학문","문치무공","전위위안"]}]},

    // --- [클래식 메타 및 유저 커스텀 종결 덱 아카이브 보존] ---
    {id:"wei_akjin_jojo_king_jangryo", name:"[위나라] 악진·조조(제왕)·장료 기형창병 덱", concept:"[신규] 악진·조조(제왕)·장료 기형창병", formation:"기형진", officers:[{name:"악진", chosenTactics:["분용당선","동구적개","진퇴유도"]}, {name:"조조(제왕)", chosenTactics:["군령여산","횡징폭렴","간담상조"]}, {name:"장료", chosenTactics:["함진살적","질풍노도","반객위주"]}]},
    {id:"wei_jojo_sima_hahou_bangaek_susang", name:"[위나라] 조조·사마의·하후돈 종결 구행방패 (안정형)", concept:"[종결] 사마의 안정형 투트랙 캐리", formation:"구행진", officers:[{name:"조조", chosenTactics:["효웅","분성지계","안영찰채"]}, {name:"사마의", chosenTactics:["응시낭고","수상개화","반객위주"]}, {name:"하후돈", chosenTactics:["발시담정","간담상조","금창신"]}]},
    {id:"wei_jojo_sima_hahou_bangaek_yosa", name:"[위나라] 조조·사마의·하후돈 종결 구행방패 (극딜형)", concept:"[종결] 사마의 극딜형 투트랙 캐리", formation:"구행진", officers:[{name:"조조", chosenTactics:["효웅","분성지계","안영찰채"]}, {name:"사마의", chosenTactics:["응시낭고","요사여신","반객위주"]}, {name:"하후돈", chosenTactics:["발시담정","간담상조","금창신"]}]},
    {id:"shu_macho_weiyeon_yubi_4", name:"[촉나라] 마초·위연·유비 종결 안행창병 덱", concept:"[변형] 마초·위연·유비 안행창병", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","질풍노도"]}, {name:"위연", chosenTactics:["실병제위","토적격문","문치무공"]}, {name:"유비", chosenTactics:["인정","혼수모어","강유겸제"]}]},
    {id:"wu_songwon_yukhang_nosuk_3", name:"[오나라] 손권·육항·노숙 종결 구행궁병 덱", concept:"[클래식] 손권·육항·노숙 구행궁병", formation:"구행진", officers:[{name:"손권", chosenTactics:["웅거","진퇴유도","토적격문"]}, {name:"육항", chosenTactics:["청백충근","양의화생","반객위주"]}, {name:"노숙", chosenTactics:["탑상책","분성지계","여자동포"]}]},
    {id:"qun_wonso_dongtak_yeopo_4", name:"[군진영] 원소·동탁·여포 종결 방원기병 덱", concept:"[클래식] 원소·동탁·여포 방원기병", formation:"방원진", officers:[{name:"원소", chosenTactics:["사소도","이퇴위진","횡징폭렴"]}, {name:"동탁", chosenTactics:["전권난정","견진연봉","위위구조"]}, {name:"여포", chosenTactics:["천하무쌍","용왕직전","만부막적"]}]}
];

const metaDeckUnitTypeMap = {
    "rank1_1gun_wu":"기병", "rank1_2gun_qun":"방패병", "rank1_3gun_wei":"창병",
    "rank2_1gun_qun":"궁병", "rank2_2gun_wei":"방패병", "rank2_3gun_shu":"창병",
    "wei_akjin_jojo_king_jangryo":"창병", "wei_jojo_sima_hahou_bangaek_susang":"방패병", "wei_jojo_sima_hahou_bangaek_yosa":"방패병",
    "shu_macho_weiyeon_yubi_4":"창병", "wu_songwon_yukhang_nosuk_3":"궁병", "qun_wonso_dongtak_yeopo_4":"기병"
};

const systemGuideInsights = {
    "rank1_1gun_wu":"💡 [1위 1군] 소교의 진퇴유도/간담상조 뎀감망과 노숙의 견진연봉 버프를 통해 육손이 극강의 추격 폭딜을 넣는 기병.",
    "rank1_2gun_qun":"💡 [1위 2군] 원소의 강유겸제/여자동포 피감과 장녕/좌자의 압도적인 힐/디버프 유지력을 바탕으로 한 좀비 방패병.",
    "rank1_3gun_wei":"💡 [1위 3군] 허저의 부동여산/반객위주 폭딜을 가후와 악진이 기문둔갑과 다중 제어기로 보좌하는 창병 조합.",
    "rank2_1gun_qun":"💡 [2위 1군] 좌자/우길/장녕의 시너지로 회피와 신산을 극대화하여 1군을 완벽히 카운터치는 궁병 조합.",
    "rank2_2gun_wei":"💡 [2위 2군] 사마의가 반객위주와 요사여신으로 고점을 뚫고, 조조와 가후가 유지력과 디버프를 전담하는 방패병.",
    "rank2_3gun_shu":"💡 [2위 3군] 서서의 전위위안 버프를 등에 업고 마초와 위연이 확산 및 연격 폭딜을 가하는 창병 조합.",
    "wei_akjin_jojo_king_jangryo":"💡 [클래식] 장료와 악진의 압도적인 물리 연타 폭딜을 조조(제왕)의 철벽 케어로 보좌하는 최상위 창병 조합.",
    "wei_jojo_sima_hahou_bangaek_susang":"💡 [클래식/안정형] 수상개화의 피증 및 발동률 버프를 통해 사마의의 저점을 완벽히 틀어막은 투 트랙 캐리 덱.",
    "wei_jojo_sima_hahou_bangaek_yosa":"💡 [클래식/극딜형] 요사여신의 극단적인 모략 펌핑을 통해 고유기와 반객위주의 고점을 폭발시키는 투 트랙 캐리 덱.",
    "shu_macho_weiyeon_yubi_4":"💡 [변형] 유비 인정/혼수모어 제어 힐 및 강유겸제 피감 속에서 마초가 확산 피해를 가하는 창병.",
    "wu_songwon_yukhang_nosuk_3":"💡 [변형] 손권·육항·노숙 조합으로 버프와 디버프 밸런스를 잡은 오나라 궁병.",
    "qun_wonso_dongtak_yeopo_4":"💡 [변형] 1턴 분쇄를 노리는 여포 하이퍼 캐리 기병 덱."
};

window.getMetaDeckData = function() {
    return {
        analyzedMetaArchetypes,
        metaDeckUnitTypeMap,
        systemGuideInsights
    };
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

        // 1위, 2위 덱은 특별한 UI 강조 (보더 컬러 변경)
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

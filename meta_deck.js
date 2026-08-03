// [시스템 분석] meta_deck.js - 전서버 랭커 실전 메타 덱 마스터 데이터베이스 (사마의 반객위주 2종 세팅 추가)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

const analyzedMetaArchetypes = [
    // --- [기존 메타 덱] ---
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
    {id:"shu_macho_weiyeon_xushu_5",name:"[촉나라] 마초·위연·서서 안행창병 (5위 세팅)",concept:"[5위 3군] 마초·위연·서서 안행창병",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","질풍노도"]},{name:"위연",chosenTactics:["실병제위","홍수첨향","이퇴위진"]},{name:"서서",chosenTactics:["절절학문","문치무공","전위위안"]}]},
    
    // --- [기존 변형/신규 덱] ---
    {id:"qun_wonso_jangnyeong_jwaja_var1",name:"[군진영] 원소·장녕·좌자 구행방패 덱 (변형)",concept:"[변형] 원소·장녕·좌자 구행방패",formation:"구행진",officers:[{name:"원소",chosenTactics:["사소도","강유겸제","여자동포"]},{name:"장녕",chosenTactics:["천의난위","양의화생","수상개화"]},{name:"좌자",chosenTactics:["화겁생기","안영찰채","유좌유용"]}]},
    {id:"wei_heojeo_gahu_akjin",name:"[위나라] 허저·가후·악진 호도창 덱",concept:"[신규] 허저·가후·악진 호도창",formation:"호도진",officers:[{name:"허저",chosenTactics:["호치","부동여산","반객위주"]},{name:"가후",chosenTactics:["경달권변","혼수모어","분성지계"]},{name:"악진",chosenTactics:["분용당선","기문둔갑","횡징폭렴"]}]},
    {id:"wei_jojo_sima_gahu_var1",name:"[위나라] 조조·사마의·가후 구행방패 덱 (변형)",concept:"[변형] 조조·사마의·가후 구행방패",formation:"구행진",officers:[{name:"조조",chosenTactics:["효웅","간담상조","안영찰채"]},{name:"사마의",chosenTactics:["응시낭고","수상개화","요사여신"]},{name:"가후",chosenTactics:["경달권변","혼수모어","금창신"]}]},
    {id:"shu_macho_weiyeon_xushu_var2",name:"[촉나라] 마초·위연·서서 안행창병 덱 (변형)",concept:"[변형] 마초·위연·서서 안행창병",formation:"안행진",officers:[{name:"마초",chosenTactics:["출수법","용맹무쌍","반객위주"]},{name:"위연",chosenTactics:["실병제위","강유겸제","진퇴유도"]},{name:"서서",chosenTactics:["절절학문","문치무공","전위위안"]}]},
    {id:"qun_jwaja_jangnyeong_ugil_var1",name:"[군진영] 좌자·장녕·우길 구행방패 덱 (변형)",concept:"[변형] 좌자·장녕·우길 구행방패",formation:"구행진",officers:[{name:"좌자",chosenTactics:["화겁생기","유좌유용","이퇴위진"]},{name:"장녕",chosenTactics:["천의난위","양의화생","낙정하석"]},{name:"우길",chosenTactics:["태평경","분성지계","여자동포"]}]},
    {id:"wei_akjin_jojo_king_jangryo",name:"[위나라] 악진·조조(제왕)·장료 기형창병 덱",concept:"[신규] 악진·조조(제왕)·장료 기형창병",formation:"기형진",officers:[{name:"악진",chosenTactics:["분용당선","동구적개","진퇴유도"]},{name:"조조(제왕)",chosenTactics:["군령여산","횡징폭렴","간담상조"]},{name:"장료",chosenTactics:["함진살적","질풍노도","반객위주"]}]},

    // 🚨 [신규 추가] 사마의 반객위주 투 트랙 캐리 덱
    {id:"wei_jojo_sima_hahou_bangaek_susang",name:"[위나라] 조조·사마의·하후돈 종결 구행방패 (안정형)",concept:"[종결] 사마의 안정형 투트랙 캐리",formation:"구행진",officers:[{name:"조조",chosenTactics:["효웅","분성지계","안영찰채"]},{name:"사마의",chosenTactics:["응시낭고","수상개화","반객위주"]},{name:"하후돈",chosenTactics:["발시담정","간담상조","금창신"]}]},
    {id:"wei_jojo_sima_hahou_bangaek_yosa",name:"[위나라] 조조·사마의·하후돈 종결 구행방패 (극딜형)",concept:"[종결] 사마의 극딜형 투트랙 캐리",formation:"구행진",officers:[{name:"조조",chosenTactics:["효웅","분성지계","안영찰채"]},{name:"사마의",chosenTactics:["응시낭고","요사여신","반객위주"]},{name:"하후돈",chosenTactics:["발시담정","간담상조","금창신"]}]}
];

const metaDeckUnitTypeMap = {
    "wu_sogyo_nosuk_yukson":"기병", "qun_wonso_jangnyeong_jwaja":"방패병", "shu_macho_weiyeon_xushu":"창병",
    "wei_jojo_sima_hahou":"방패병", "shu_macho_weiyeon_xushu_2":"창병", "qun_jwaja_jangnyeong_ugil_2":"궁병",
    "shu_macho_weiyeon_xushu_3":"창병", "wu_songwon_yukhang_nosuk_3":"궁병", "wei_sima_jojo_gahu_3":"방패병",
    "qun_wonso_dongtak_yeopo_4":"기병", "shu_macho_weiyeon_yubi_4":"창병", "wei_jojo_sima_hahou_4":"방패병",
    "qun_jwaja_jangnyeong_ugil_5":"궁병", "wei_sima_jojo_gahu_5":"방패병", "shu_macho_weiyeon_xushu_5":"창병",
    "qun_wonso_jangnyeong_jwaja_var1":"방패병", "wei_heojeo_gahu_akjin":"창병", "wei_jojo_sima_gahu_var1":"방패병",
    "shu_macho_weiyeon_xushu_var2":"창병", "qun_jwaja_jangnyeong_ugil_var1":"방패병", "wei_akjin_jojo_king_jangryo":"창병",
    "wei_jojo_sima_hahou_bangaek_susang":"방패병", "wei_jojo_sima_hahou_bangaek_yosa":"방패병" // 🚨 신규 매핑
};

const systemGuideInsights = {
    "wu_sogyo_nosuk_yukson":"💡 [1위 1군] 소교 화용욕모 방어 해제 및 노숙 견진연봉 연격 버프를 받는 육손 체천행도 추격 마법사.",
    "qun_wonso_jangnyeong_jwaja":"💡 [1위 2군] 좌자 화겁생기/유좌유용 회피 장벽 뒤 원소 사소도/강유겸제 피감과 장녕 양의화생/수상개화 폭격 방패.",
    "shu_macho_weiyeon_xushu":"💡 [1위 3군] 서서 문치무공/여자동포 스탯 폭증 버프 뒤 위연 이퇴위진/횡징폭렴 피감과 마초 반객위주 확산 연격 창병.",
    "qun_wonso_dongtak_yeopo_4":"💡 [4위 1군] 원소 사소도 통솔 버프 및 동탁 견진연봉/위위구조 피감 뒤 여포 용왕직전/만부막적 1턴 분쇄 기병.",
    "shu_macho_weiyeon_yubi_4":"💡 [4위 2군] 유비 인정/혼수모어 제어 힐 및 강유겸제 피감 속에서 마초 출수법/용맹무쌍/질풍노도 확산 창병.",
    "qun_jwaja_jangnyeong_ugil_5":"💡 [5위 1군] 우길 금창신 신산 버프를 받는 장녕 수상개화/양의화생 폭딜 및 좌자 안영찰채/유좌유용 방패/궁병.",
    "qun_wonso_jangnyeong_jwaja_var1":"💡 [변형] 원소에 여자동포를 주어 안정성을 한층 더 끌어올린 방패병 조합입니다.",
    "wei_heojeo_gahu_akjin":"💡 [신규] 허저의 묵직한 물리 타격과 가후, 악진의 변수 창출이 어우러진 창병 덱입니다.",
    "wei_jojo_sima_gahu_var1":"💡 [변형] 가후에게 금창신을 쥐여주어 모략 신산 딜링을 폭발시키는 방패병 조합입니다.",
    "shu_macho_weiyeon_xushu_var2":"💡 [변형] 위연에 진퇴유도를 장착해 팀 단위 공방 시너지를 극대화한 창병 조합입니다.",
    "qun_jwaja_jangnyeong_ugil_var1":"💡 [변형] 우길에 분성지계를 더해 광역 화상 딜링과 디버프를 강화한 방패병 조합입니다.",
    "wei_akjin_jojo_king_jangryo":"💡 [신규] 장료와 악진의 압도적인 물리 연타 폭딜을 조조(제왕)의 철벽 케어로 보좌하는 최상위 창병 조합입니다.",
    "wei_jojo_sima_hahou_bangaek_susang":"💡 [종결/안정형] 수상개화의 피증 및 발동률 버프를 통해 사마의의 저점을 완벽히 틀어막은 투 트랙 캐리 덱입니다.",
    "wei_jojo_sima_hahou_bangaek_yosa":"💡 [종결/극딜형] 요사여신의 극단적인 모략 펌핑을 통해 고유기와 반객위주의 고점을 폭발시키는 투 트랙 캐리 덱입니다."
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
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">전서버 랭커 실전 메타 덱 아카이브</h2>`;
    
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

        container.insertAdjacentHTML('beforeend', `
            <div style="background:var(--bg-card); border:1px solid var(--border-main); border-radius:8px; padding:15px; margin-bottom:15px;">
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

// [시스템 분석] meta_deck.js - 전서버 실전 메타 덱 데이터베이스 (강유·관우·유비 신규 메타 편입 완료)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

const analyzedMetaArchetypes = [
    // 🏆 [전서버 1위/2위 생태계] 최우선순위 가중치 락인
    {id:"rank1_1", priority: 2, name:"[1위 1군] 소교·노숙·육손 방원기병", concept:"[1위 1군]", formation:"방원진", officers:[{name:"소교", chosenTactics:["화용욕모","진퇴유도","간담상조"]}, {name:"노숙", chosenTactics:["탑상책","견진연봉","위위구조"]}, {name:"육손", chosenTactics:["지변규려","천리추격","체천행도"]}]},
    {id:"rank1_2", priority: 2, name:"[1위 2군] 원소·장녕·좌자 구행방패", concept:"[1위 2군]", formation:"구행진", officers:[{name:"원소", chosenTactics:["사소도","강유겸제","여자동포"]}, {name:"장녕", chosenTactics:["천의난위","양의화생","수상개화"]}, {name:"좌자", chosenTactics:["화겁생기","안영찰채","유좌유용"]}]},
    {id:"rank1_3", priority: 2, name:"[1위 3군] 허저·가후·악진 호도창", concept:"[1위 3군]", formation:"호도진", officers:[{name:"허저", chosenTactics:["호치","부동여산","반객위주"]}, {name:"가후", chosenTactics:["경달권변","혼수모어","분성지계"]}, {name:"악진", chosenTactics:["분용당선","기문둔갑","횡징폭렴"]}]},

    {id:"rank2_1", priority: 1, name:"[2위 1군] 좌자·장녕·우길 구행궁병", concept:"[2위 1군]", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","안영찰채","유좌유용"]}, {name:"장녕", chosenTactics:["천의난위","수상개화","양의화생"]}, {name:"우길", chosenTactics:["태평경","강유겸제","금창신"]}]},
    {id:"rank2_2", priority: 1, name:"[2위 2군] 사마의·조조·가후 추형방패", concept:"[2위 2군]", formation:"추형진", officers:[{name:"사마의", chosenTactics:["응시낭고","반객위주","요사여신"]}, {name:"조조", chosenTactics:["효웅","이퇴위진","간담상조"]}, {name:"가후", chosenTactics:["경달권변","만천과해","혼수모어"]}]},
    {id:"rank2_3", priority: 1, name:"[2위 3군] 마초·위연·서서 안행창병", concept:"[2위 3군]", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","질풍노도"]}, {name:"위연", chosenTactics:["실병제위","홍수첨향","진퇴유도"]}, {name:"서서", chosenTactics:["절절학문","문치무공","전위위안"]}]},

    // 💠 [메타 세트 A~I 유지]
    {id:"set_a_1", priority: 0, name:"[메타 세트 A] 마초·위연·서서 안행창병", concept:"[세트 A]", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","질풍노도"]}, {name:"위연", chosenTactics:["실병제위","홍수첨향","이퇴위진"]}, {name:"서서", chosenTactics:["절절학문","문치무공","전위위안"]}]},
    {id:"set_a_2", priority: 0, name:"[메타 세트 A] 손권·육항·노숙 구행궁병", concept:"[세트 A]", formation:"구행진", officers:[{name:"손권", chosenTactics:["웅거","진퇴유도","토적격문"]}, {name:"육항", chosenTactics:["청백충근","양의화생","반객위주"]}, {name:"노숙", chosenTactics:["탑상책","분성지계","여자동포"]}]},
    {id:"set_a_3", priority: 0, name:"[메타 세트 A] 사마의·조조·가후 추형방패", concept:"[세트 A]", formation:"추형진", officers:[{name:"사마의", chosenTactics:["응시낭고","수상개화","요사여신"]}, {name:"조조", chosenTactics:["효웅","안영찰채","간담상조"]}, {name:"가후", chosenTactics:["경달권변","혼수모어","만천과해"]}]},

    {id:"set_b_1", priority: 0, name:"[메타 세트 B] 원소·동탁·여포 방원기병", concept:"[세트 B]", formation:"방원진", officers:[{name:"원소", chosenTactics:["사소도","이퇴위진","횡징폭렴"]}, {name:"동탁", chosenTactics:["전권난정","견진연봉","위위구조"]}, {name:"여포", chosenTactics:["천하무쌍","용왕직전","만부막적"]}]},
    {id:"set_b_2", priority: 0, name:"[메타 세트 B] 마초·위연·유비 안행창병", concept:"[세트 B]", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","질풍노도"]}, {name:"위연", chosenTactics:["실병제위","토적격문","문치무공"]}, {name:"유비", chosenTactics:["인정","혼수모어","강유겸제"]}]},
    {id:"set_b_3", priority: 0, name:"[메타 세트 B] 조조·사마의·하후돈 구행방패", concept:"[세트 B]", formation:"구행진", officers:[{name:"조조", chosenTactics:["효웅","진퇴유도","유좌유용"]}, {name:"사마의", chosenTactics:["응시낭고","수상개화","반객위주"]}, {name:"하후돈", chosenTactics:["발시담정","홍수첨향","간담상조"]}]},

    {id:"set_c_1", priority: 0, name:"[메타 세트 C] 악진·조조(제왕)·장료 기형창병", concept:"[세트 C]", formation:"기형진", officers:[{name:"악진", chosenTactics:["분용당선","여자동포","유좌유용"]}, {name:"조조(제왕)", chosenTactics:["군령여산","간담상조","강유겸제"]}, {name:"장료", chosenTactics:["함진살적","질풍노도","반객위주"]}]},
    {id:"set_c_2", priority: 0, name:"[메타 세트 C] 사마의·조조·가후 안행방패", concept:"[세트 C]", formation:"안행진", officers:[{name:"사마의", chosenTactics:["응시낭고","수상개화","요사여신"]}, {name:"조조", chosenTactics:["효웅","횡징폭렴","혼수모어"]}, {name:"가후", chosenTactics:["경달권변","만천과해","안영찰채"]}]},
    {id:"set_c_3", priority: 0, name:"[메타 세트 C] 좌자·장녕·우길 구행궁병", concept:"[세트 C]", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","동구적개","홍수첨향"]}, {name:"장녕", chosenTactics:["천의난위","동촉기선","양의화생"]}, {name:"우길", chosenTactics:["태평경","진퇴유도","이퇴위진"]}]},

    {id:"set_d_1", priority: 0, name:"[메타 세트 D] 원소·동탁·여포 방원기병", concept:"[세트 D]", formation:"방원진", officers:[{name:"원소", chosenTactics:["사소도","진퇴유도","견진연봉"]}, {name:"동탁", chosenTactics:["전권난정","이퇴위진","위위구조"]}, {name:"여포", chosenTactics:["천하무쌍","용왕직전","만부막적"]}]},
    {id:"set_d_2", priority: 0, name:"[메타 세트 D] 사마의·조조·가후 추형방패", concept:"[세트 D]", formation:"추형진", officers:[{name:"사마의", chosenTactics:["응시낭고","요사여신","반객위주"]}, {name:"조조", chosenTactics:["효웅","홍수첨향","간담상조"]}, {name:"가후", chosenTactics:["경달권변","혼수모어","만천과해"]}]},
    {id:"set_d_3", priority: 0, name:"[메타 세트 D] 우길·장녕·좌자 구행궁병", concept:"[세트 D]", formation:"구행진", officers:[{name:"우길", chosenTactics:["태평경","횡징폭렴","강유겸제"]}, {name:"장녕", chosenTactics:["천의난위","수상개화","양의화생"]}, {name:"좌자", chosenTactics:["화겁생기","유좌유용","안영찰채"]}]},

    {id:"set_e_1", priority: 0, name:"[메타 세트 E] 마초·위연·서서 안행창병", concept:"[세트 E]", formation:"안행진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","반객위주"]}, {name:"위연", chosenTactics:["실병제위","강유겸제","진퇴유도"]}, {name:"서서", chosenTactics:["절절학문","문치무공","전위위안"]}]},
    {id:"set_e_2", priority: 0, name:"[메타 세트 E] 좌자·장녕·우길 구행궁병", concept:"[세트 E]", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","유좌유용","이퇴위진"]}, {name:"장녕", chosenTactics:["천의난위","양의화생","낙정하석"]}, {name:"우길", chosenTactics:["태평경","분성지계","여자동포"]}]},
    {id:"set_e_3", priority: 0, name:"[메타 세트 E] 조조·사마의·가후 구행방패", concept:"[세트 E]", formation:"구행진", officers:[{name:"조조", chosenTactics:["효웅","간담상조","안영찰채"]}, {name:"사마의", chosenTactics:["응시낭고","수상개화","요사여신"]}, {name:"가후", chosenTactics:["경달권변","혼수모어","금창신"]}]},

    {id:"set_f_1", priority: 0, name:"[메타 세트 F] 동탁·원소·여포 방원기병", concept:"[세트 F]", formation:"방원진", officers:[{name:"동탁", chosenTactics:["전권난정","견진연봉","위위구조"]}, {name:"원소", chosenTactics:["사소도","홍수첨향","간담상조"]}, {name:"여포", chosenTactics:["천하무쌍","용왕직전","만부막적"]}]},
    {id:"set_f_2", priority: 0, name:"[메타 세트 F] 마초·위연·유비(제왕) 추형창병", concept:"[세트 F]", formation:"추형진", officers:[{name:"마초", chosenTactics:["출수법","용맹무쌍","반객위주"]}, {name:"위연", chosenTactics:["실병제위","횡징폭렴","강유겸제"]}, {name:"유비(제왕)", chosenTactics:["재주복주","기문둔갑","진퇴유도"]}]},
    {id:"set_f_3", priority: 0, name:"[메타 세트 F] 좌자·장녕·우길 구행궁병", concept:"[세트 F]", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","안영찰채","여자동포"]}, {name:"장녕", chosenTactics:["천의난위","양의화생","수상개화"]}, {name:"우길", chosenTactics:["태평경","만천과해","혼수모어"]}]},

    {id:"set_g_1", priority: 0, name:"[메타 세트 G] 서서·마초·위연 구행창병", concept:"[세트 G]", formation:"구행진", officers:[{name:"서서", chosenTactics:["절절학문","문치무공","혼수모어"]}, {name:"마초", chosenTactics:["출수법","용맹무쌍","반객위주"]}, {name:"위연", chosenTactics:["실병제위","간담상조","이퇴위진"]}]},
    {id:"set_g_2", priority: 0, name:"[메타 세트 G] 제갈량·황충·강유 방원궁병", concept:"[세트 G]", formation:"방원진", officers:[{name:"제갈량", chosenTactics:["초선차전","전위위안","안영찰채"]}, {name:"황충", chosenTactics:["적혈도","강유겸제","진퇴유도"]}, {name:"강유", chosenTactics:["담대여두","일고작기","체천행도"]}]},
    {id:"set_g_3", priority: 0, name:"[메타 세트 G] 유비(제왕)·장비·관우 추형창병", concept:"[세트 G]", formation:"추형진", officers:[{name:"유비(제왕)", chosenTactics:["재주복주","여자동포","홍수첨향"]}, {name:"장비", chosenTactics:["연인노호","이아환아","횡징폭렴"]}, {name:"관우", chosenTactics:["무성","질풍노도","부동여산"]}]},

    {id:"set_h_1", priority: 0, name:"[메타 세트 H] 조조·사마의·가후 구행방패", concept:"[세트 H]", formation:"구행진", officers:[{name:"조조", chosenTactics:["효웅","횡징폭렴","진퇴유도"]}, {name:"사마의", chosenTactics:["응시낭고","반객위주","요사여신"]}, {name:"가후", chosenTactics:["경달권변","혼수모어","안영찰채"]}]},
    {id:"set_h_2", priority: 0, name:"[메타 세트 H] 좌자·장녕·우길 구행궁병", concept:"[세트 H]", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","만천과해","전위위안"]}, {name:"장녕", chosenTactics:["천의난위","양의화생","수상개화"]}, {name:"우길", chosenTactics:["태평경","유좌유용","이퇴위진"]}]},

    {id:"set_i_1", priority: 0, name:"[메타 세트 I] 좌자·장녕·우길 구행궁병", concept:"[세트 I]", formation:"구행진", officers:[{name:"좌자", chosenTactics:["화겁생기","토적격문","전위위안"]}, {name:"장녕", chosenTactics:["천의난위","수상개화","양의화생"]}, {name:"우길", chosenTactics:["태평경","안영찰채","이퇴위진"]}]},
    {id:"set_i_2", priority: 0, name:"[메타 세트 I] 사마의·조조·가후 안행방패", concept:"[세트 I]", formation:"안행진", officers:[{name:"사마의", chosenTactics:["응시낭고","반객위주","요사여신"]}, {name:"조조", chosenTactics:["효웅","강유겸제","여자동포"]}, {name:"가후", chosenTactics:["경달권변","만천과해","혼수모어"]}]},

    // 🚨 [신규 편입] 강유·관우·유비 오피셜 도원창병 덱 추가 완료
    {id:"var_gangyu_gwanu_yubi", priority: 0, name:"[변형] 관우·유비·강유 도원기병", concept:"[커스텀]", formation:"추형진", officers:[{name:"관우", chosenTactics:["무성","용맹무쌍","질풍노도"]}, {name:"유비", chosenTactics:["인정","강유겸제","간담상조"]}, {name:"강유", chosenTactics:["담대여두","반객위주","화소적벽"]}]}
];

const metaDeckUnitTypeMap = {
    "rank1_1":"기병", "rank1_2":"방패병", "rank1_3":"창병",
    "rank2_1":"궁병", "rank2_2":"방패병", "rank2_3":"창병",
    "set_a_1":"창병", "set_a_2":"궁병", "set_a_3":"방패병",
    "set_b_1":"기병", "set_b_2":"창병", "set_b_3":"방패병",
    "set_c_1":"창병", "set_c_2":"방패병", "set_c_3":"궁병",
    "set_d_1":"기병", "set_d_2":"방패병", "set_d_3":"궁병",
    "set_e_1":"창병", "set_e_2":"궁병", "set_e_3":"방패병",
    "set_f_1":"기병", "set_f_2":"창병", "set_f_3":"궁병",
    "set_g_1":"창병", "set_g_2":"궁병", "set_g_3":"창병",
    "set_h_1":"방패병", "set_h_2":"궁병",
    "set_i_1":"궁병", "set_i_2":"방패병",
    "var_gangyu_gwanu_yubi":"창병"
};

const systemGuideInsights = {
    "rank1_1":"💡 [1위 1군] 소교의 진퇴유도/간담상조 뎀감망과 노숙의 견진연봉 버프를 통해 육손이 극강의 추격 폭딜을 넣는 기병.",
    "rank1_2":"💡 [1위 2군] 원소의 강유겸제/여자동포 피감과 장녕/좌자의 압도적인 힐/디버프 유지력을 바탕으로 한 좀비 방패병.",
    "rank1_3":"💡 [1위 3군] 허저의 부동여산/반객위주 폭딜을 가후와 악진이 기문둔갑과 다중 제어기로 보좌하는 창병 조합.",
    "rank2_1":"💡 [2위 1군] 좌자/우길/장녕의 시너지로 회피와 신산을 극대화하여 1군을 완벽히 카운터치는 궁병 조합.",
    "rank2_2":"💡 [2위 2군] 사마의가 반객위주와 요사여신으로 고점을 뚫고, 조조와 가후가 유지력과 디버프를 전담하는 방패병.",
    "rank2_3":"💡 [2위 3군] 서서의 전위위안 버프를 등에 업고 마초와 위연이 확산 및 연격 폭딜을 가하는 창병 조합.",
    "set_a_1":"💡 [세트 A] 서서의 스탯 폭증 버프 속에서 마초와 위연이 전선을 갈아버리는 확산 피해 창병.",
    "set_a_2":"💡 [세트 A] 손권의 진퇴/토적 유틸성과 육항, 노숙의 무상성 버프가 결합된 극강의 밸런스 궁병.",
    "set_a_3":"💡 [세트 A] 수상개화와 요사여신의 쌍버프를 통해 사마의의 모략 딜을 한 방에 폭발시키는 추형 방패병.",
    "set_b_1":"💡 [세트 B] 원소의 통솔 버프와 동탁의 피감 속에서 여포가 적의 핵심을 분쇄하는 방원 기병.",
    "set_b_2":"💡 [세트 B] 유비의 혼수모어/강유겸제 완벽 힐망 속에서 마초와 위연이 날뛰는 안행 창병.",
    "set_b_3":"💡 [세트 B] 유좌유용과 반객위주를 통해 딜 누수를 방지하고 사마의의 지속 화력을 극대화한 구행 방패병.",
    "set_c_1":"💡 [세트 C] 조조(제왕)의 완벽한 뎀감망 위에서 장료와 악진이 첫 턴 선제 폭격을 가하는 기형 창병.",
    "set_c_2":"💡 [세트 C] 횡징폭렴과 혼수모어, 만천과해의 3중 제어기로 적을 봉쇄하는 사마의 안행 방패병.",
    "set_c_3":"💡 [세트 C] 좌자와 장녕의 폭풍 같은 시너지 위에 우길이 태평경/이퇴위진으로 전선을 굳히는 구행 궁병.",
    "set_d_1":"💡 [세트 D] 원소와 동탁이 진퇴/이퇴 쌍벽으로 뎀감을 챙기고 여포가 용왕/만부로 전선을 터뜨리는 기병.",
    "set_d_2":"💡 [세트 D] 홍수첨향 힐을 받은 조조가 버티는 사이 사마의가 요사/반객 쌍발로 적을 궤멸시키는 방패병.",
    "set_d_3":"💡 [세트 D] 횡징폭렴과 화겁생기로 공방을 챙긴 우길/장녕/좌자 궁병.",
    "set_e_1":"💡 [세트 E] 마초가 반객위주 서브딜을 챙기고 위연/서서가 완벽한 유틸을 뿜어내는 안행 창병.",
    "set_e_2":"💡 [세트 E] 낙정하석과 분성지계를 섞어 적의 진형을 붕괴시키는 변칙 궁병.",
    "set_e_3":"💡 [세트 E] 수상/요사여신 2버프 사마의의 폭발력을 조조/가후가 뒷받침하는 구행 방패병.",
    "set_f_1":"💡 [세트 F] 동탁의 전권난정과 견진연봉 보좌 속에서 여포가 천하무쌍으로 적을 유린하는 방원 기병.",
    "set_f_2":"💡 [세트 F] 유비(제왕)의 완벽한 뎀감망 위에서 마초와 위연이 날뛰는 추형 창병.",
    "set_f_3":"💡 [세트 F] 화겁생기와 천의난위의 시너지를 극대화한 좌자/장녕/우길 구행 궁병.",
    "set_g_1":"💡 [세트 G] 서서의 절절학문/문치무공 유틸을 바탕으로 마초와 위연이 적진을 휩쓰는 구행 창병.",
    "set_g_2":"💡 [세트 G] 제갈량/황충/강유 클래식 조합의 안정성을 극한으로 끌어올린 방원 궁병.",
    "set_g_3":"💡 [세트 G] 유비(제왕), 장비, 관우의 완벽한 공방 밸런스를 갖춘 묵직한 추형 창병.",
    "set_h_1":"💡 [세트 H] 진퇴유도와 횡징폭렴으로 공방을 잡고 사마의가 폭발하는 구행 방패병.",
    "set_h_2":"💡 [세트 H] 좌자와 우길이 전선을 유지하고 장녕이 폭격하는 구행 궁병.",
    "set_i_1":"💡 [세트 I] 토적격문과 안영찰채로 버티며 장녕의 딜을 극대화한 구행 궁병.",
    "set_i_2":"💡 [세트 I] 조조의 강유겸제와 사마의 쌍버프(반객/요사)가 빛나는 안행 방패병.",
    "var_gangyu_gwanu_yubi":"💡 [변형] 강유의 모략 서브딜과 관우의 맹공, 유비의 철벽 힐이 어우러진 밸런스형 도원기병."
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

        const isRanked = deck.id.includes('rank1') || deck.id.includes('rank2');
        const borderColor = deck.id.includes('rank1') ? '#f59e0b' : (deck.id.includes('rank2') ? '#94a3b8' : 'var(--border-main)');
        const bgEmphasis = deck.id.includes('rank1') ? 'rgba(245, 158, 11, 0.03)' : (deck.id.includes('rank2') ? 'rgba(148, 163, 184, 0.03)' : 'var(--bg-card)');
        const labelText = isRanked ? `<span style="background:rgba(239, 68, 68, 0.15); color:#ef4444; padding:3px 8px; border-radius:4px;">최고 가중치 덱</span>` : `<span style="background:rgba(16, 185, 129, 0.15); color:#10b981; padding:3px 8px; border-radius:4px;">전법 무충돌 세트</span>`;

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

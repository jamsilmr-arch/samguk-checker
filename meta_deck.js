// [시스템 분석] meta_deck.js - 전서버 실전 메타 덱 데이터베이스 (천공 1등~14등 총 41종 실전 덱 완벽 통합 아카이브)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

var analyzedMetaArchetypes = [
    // 🏆 [천공 1위]
    { id: "rank1_wu_yukson", priority: 10000, name: "[천공 1위] 소교·육손·노숙 구행 기병", concept: "[천공 1위 1군]", formation: "구행진", officers: [ {name:"소교", chosenTactics:["화용욕모", "진퇴유도", "간담상조"]}, {name:"육손", chosenTactics:["지변규려", "천리추격", "체천행도"]}, {name:"노숙", chosenTactics:["탑상책", "격안관화", "분성지계"]} ] },
    { id: "rank1_gun_jangnyeong", priority: 10000, name: "[천공 1위] 원소·장녕·좌자 구행 방패", concept: "[천공 1위 2군]", formation: "구행진", officers: [ {name:"원소", chosenTactics:["사소도", "강유겸제", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "수상개화"]}, {name:"좌자", chosenTactics:["화겁생기", "심구고루", "유비무환"]} ] },
    { id: "rank1_wei_heojeo", priority: 10000, name: "[천공 1위] 허저·가후·악진 호도 궁병", concept: "[천공 1위 3군]", formation: "호도진", officers: [ {name:"허저", chosenTactics:["호치", "부동여산", "반객위주"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "유좌유용"]}, {name:"악진", chosenTactics:["분용당선", "기문둔갑", "횡징폭렴"]} ] },
    
    // 🥈 [천공 2위]
    { id: "rank2_shu_macho", priority: 9999, name: "[천공 2위] 마초·위연·서서 안행 창병", concept: "[천공 2위 1군]", formation: "안행진", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "문치무공", "진퇴유도"]}, {name:"서서", chosenTactics:["절절학문", "전위위안", "심구고루"]} ] },
    { id: "rank2_wei_sima", priority: 9999, name: "[천공 2위] 사마의·조조·가후 추형 방패", concept: "[천공 2위 2군]", formation: "추형진", officers: [ {name:"사마의", chosenTactics:["응시낭고", "수상개화", "요사여신"]}, {name:"조조", chosenTactics:["효웅", "간담상조", "강유겸제"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "만천과해"]} ] },
    { id: "rank2_gun_hwang", priority: 9999, name: "[천공 2위] 황보숭·장녕·좌자 구행 궁병", concept: "[천공 2위 3군]", formation: "구행진", officers: [ {name:"황보숭", chosenTactics:["강직불아", "금창신", "여자동포"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"좌자", chosenTactics:["화겁생기", "안영찰채", "유비무환"]} ] },
    
    // 🥉 [천공 3위]
    { id: "rank3_shu_seo", priority: 9998, name: "[천공 3위] 서서·마초·위연 구행 창병", concept: "[천공 3위 1군]", formation: "구행진", officers: [ {name:"서서", chosenTactics:["절절학문", "전위위안", "심구고루"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "질풍노도"]}, {name:"위연", chosenTactics:["실병제위", "문치무공", "진퇴유도"]} ] },
    { id: "rank3_wu_yukhang", priority: 9998, name: "[천공 3위] 육항·손권·노숙 안행 궁병", concept: "[천공 3위 2군]", formation: "안행진", officers: [ {name:"육항", chosenTactics:["청백충근", "요사여신", "양의화생"]}, {name:"손권", chosenTactics:["웅거", "안영찰채", "여자동포"]}, {name:"노숙", chosenTactics:["탑상책", "분성지계", "만천과해"]} ] },
    { id: "rank3_wei_sima", priority: 9998, name: "[천공 3위] 조조·사마의·가후 구행 방패", concept: "[천공 3위 3군]", formation: "구행진", officers: [ {name:"조조", chosenTactics:["효웅", "유좌유용", "간담상조"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "반객위주"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "유비무환"]} ] },
    
    // 🏅 [천공 4위]
    { id: "rank4_gun_jang", priority: 9997, name: "[천공 4위] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 4위 1군]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "전위위안", "심구고루"]}, {name:"장녕", chosenTactics:["천의난위", "명찰추호", "후적박발"]}, {name:"황보숭", chosenTactics:["강직불아", "홍수첨향", "여자동포"]} ] },
    { id: "rank4_shu_ma", priority: 9997, name: "[천공 4위] 마초·위연·서서 안행 창병", concept: "[천공 4위 2군]", formation: "안행진", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "강유겸제", "진퇴유도"]}, {name:"서서", chosenTactics:["절절학문", "문치무공", "유비무환"]} ] },
    { id: "rank4_wei_sima", priority: 9997, name: "[천공 4위] 조조·사마의·가후 구행 방패", concept: "[천공 4위 3군]", formation: "구행진", officers: [ {name:"조조", chosenTactics:["효웅", "간담상조", "안영찰채"]}, {name:"사마의", chosenTactics:["응시낭고", "요사여신", "수상개화"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "격안관화"]} ] },
    
    // 🎖️ [천공 5위]
    { id: "rank5_shu_ma", priority: 9996, name: "[천공 5위] 마초·위연·서서 안행 창병", concept: "[천공 5위 1군]", formation: "안행진", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "진퇴유도", "심구고루"]}, {name:"서서", chosenTactics:["절절학문", "유비무환", "문치무공"]} ] },
    { id: "rank5_gun_jang", priority: 9996, name: "[천공 5위] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 5위 2군]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "전위위안", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "후적박발", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "홍수첨향", "간담상조"]} ] },
    { id: "rank5_wei_sima", priority: 9996, name: "[천공 5위] 조조·사마의·가후 구행 방패", concept: "[천공 5위 3군]", formation: "구행진", officers: [ {name:"조조", chosenTactics:["효웅", "위위구조", "여자동포"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "요사여신"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "만천과해"]} ] },
    
    // 🎗️ [천공 6위]
    { id: "rank6_gun_jang", priority: 9995, name: "[천공 6위] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 6위 1군]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "유비무환", "전위위안"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "안영찰채", "간담상조"]} ] },
    { id: "rank6_wei_sima", priority: 9995, name: "[천공 6위] 사마의·조조·가후 추형 방패", concept: "[천공 6위 2군]", formation: "추형진", officers: [ {name:"사마의", chosenTactics:["응시낭고", "수상개화", "요사여신"]}, {name:"조조", chosenTactics:["효웅", "여자동포", "강유겸제"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "만천과해"]} ] },
    { id: "rank6_gun_yeopo", priority: 9995, name: "[천공 6위] 원소·동탁·여포 방원 기병", concept: "[천공 6위 3군]", formation: "방원진", officers: [ {name:"원소", chosenTactics:["사소도", "진퇴유도", "이퇴위진"]}, {name:"동탁", chosenTactics:["전권난정", "견진연봉", "위위구조"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]} ] },
    
    // 🏵️ [천공 7위]
    { id: "rank7_gun_jang", priority: 9994, name: "[천공 7위] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 7위 1군]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "유비무환", "전위위안"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "안영찰채", "간담상조"]} ] },
    { id: "rank7_wei_akjin", priority: 9994, name: "[천공 7위] 악진·조조(제왕)·장료 기형 기병", concept: "[천공 7위 2군]", formation: "기형진", officers: [ {name:"악진", chosenTactics:["분용당선", "여자동포", "유좌유용"]}, {name:"조조(제왕)", chosenTactics:["군령여산", "강유겸제", "심구고루"]}, {name:"장료", chosenTactics:["함진살적", "질풍노도", "반객위주"]} ] },
    { id: "rank7_wei_sima", priority: 9994, name: "[천공 7위] 조조·사마의·가후 구행 방패", concept: "[천공 7위 3군]", formation: "구행진", officers: [ {name:"조조", chosenTactics:["효웅", "격안관화", "횡징폭렴"]}, {name:"사마의", chosenTactics:["응시낭고", "수상개화", "요사여신"]}, {name:"가후", chosenTactics:["경달권변", "동구적개", "혼수모어"]} ] },
    
    // 💎 [천공 8위]
    { id: "rank8_shu_macho", priority: 9993, name: "[천공 8위] 마초·위연·서서 안행 창병", concept: "[천공 8위 1군]", formation: "안행진", officers: [ {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "진퇴유도", "간담상조"]}, {name:"서서", chosenTactics:["절절학문", "문치무공", "전위위안"]} ] },
    { id: "rank8_gun_yeopo", priority: 9993, name: "[천공 8위] 채문희·동탁·여포 방원 기병", concept: "[천공 8위 2군]", formation: "방원진", officers: [ {name:"채문희", chosenTactics:["비분시", "격안관화", "기문둔갑"]}, {name:"동탁", chosenTactics:["전권난정", "유좌유용", "혼수모어"]}, {name:"여포", chosenTactics:["천하무쌍", "만부막적", "용왕직전"]} ] },
    { id: "rank8_shu_beop", priority: 9993, name: "[천공 8위] 법정·황충·강유 방원 방패", concept: "[천공 8위 3군]", formation: "방원진", officers: [ {name:"법정", chosenTactics:["애자필보", "심구고루", "유비무환"]}, {name:"황충", chosenTactics:["적혈도", "견진연봉", "위위구조"]}, {name:"강유", chosenTactics:["담대여두", "체천행도", "천리추격"]} ] },
    
    // ✨ [천공 9위]
    { id: "rank9_shu_beop", priority: 9992, name: "[천공 9위] 법정·황충·강유 방원 방패", concept: "[천공 9위 1군]", formation: "방원진", officers: [ {name:"법정", chosenTactics:["애자필보", "심구고루", "유비무환"]}, {name:"황충", chosenTactics:["적혈도", "격안관화", "진퇴유도"]}, {name:"강유", chosenTactics:["담대여두", "반객위주", "천리추격"]} ] },
    { id: "rank9_shu_wi", priority: 9992, name: "[천공 9위] 위연·마초·서서 구행 창병", concept: "[천공 9위 2군]", formation: "구행진", officers: [ {name:"위연", chosenTactics:["실병제위", "간담상조", "횡징폭렴"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "질풍노도"]}, {name:"서서", chosenTactics:["절절학문", "문치무공", "혼수모어"]} ] },
    { id: "rank9_gun_jang", priority: 9992, name: "[천공 9위] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 9위 3군]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "안영찰채", "전위위안"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "여자동포", "강유겸제"]} ] },
    
    // 🔥 [천공 10위]
    { id: "rank10_gun_won", priority: 9991, name: "[천공 10위] 원소·동탁·여포 방원 기병", concept: "[천공 10위 1군]", formation: "방원진", officers: [ {name:"원소", chosenTactics:["사소도", "이퇴위진", "격안관화"]}, {name:"동탁", chosenTactics:["전권난정", "혼수모어", "간담상조"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]} ] },
    { id: "rank10_wu_hwang", priority: 9991, name: "[천공 10위] 황개·육항·노숙 구행 궁병", concept: "[천공 10위 2군]", formation: "구행진", officers: [ {name:"황개", chosenTactics:["요원지화", "심구고루", "진퇴유도"]}, {name:"육항", chosenTactics:["청백충근", "수상개화", "명찰추호"]}, {name:"노숙", chosenTactics:["탑상책", "안영찰채", "분성지계"]} ] },
    { id: "rank10_wei_sima", priority: 9991, name: "[천공 10위] 사마의·조조·가후 안행 방패", concept: "[천공 10위 3군]", formation: "안행진", officers: [ {name:"사마의", chosenTactics:["응시낭고", "반객위주", "후적박발"]}, {name:"조조", chosenTactics:["효웅", "강유겸제", "동장철벽"]}, {name:"가후", chosenTactics:["경달권변", "만천과해", "유비무환"]} ] },

    // ⚡ [천공 11위]
    { id: "rank11_gun_jang", priority: 9990, name: "[천공 11위] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 11위 1군]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "유비무환", "안영찰채"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "진퇴유도", "여자동포"]} ] },
    { id: "rank11_gun_dong", priority: 9990, name: "[천공 11위] 동탁·원소·여포 방원 기병", concept: "[천공 11위 2군]", formation: "방원진", officers: [ {name:"동탁", chosenTactics:["전권난정", "격안관화", "강유겸제"]}, {name:"원소", chosenTactics:["사소도", "간담상조", "견진연봉"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]} ] },
    
    // 🌪️ [천공 12위]
    { id: "rank12_1", priority: 9989, name: "[천공 12위] 원소·동탁·여포 방원 기병", concept: "[천공 12위 1군]", formation: "방원진", officers: [ {name:"원소", chosenTactics:["사소도", "진퇴유도", "이퇴위진"]}, {name:"동탁", chosenTactics:["전권난정", "견진연봉", "위위구조"]}, {name:"여포", chosenTactics:["천하무쌍", "용왕직전", "만부막적"]} ] },
    { id: "rank12_2", priority: 9989, name: "[천공 12위] 사마의·조조·가후 추형 방패", concept: "[천공 12위 2군]", formation: "추형진", officers: [ {name:"사마의", chosenTactics:["응시낭고", "수상개화", "후적박발"]}, {name:"조조", chosenTactics:["효웅", "홍수첨향", "횡징폭렴"]}, {name:"가후", chosenTactics:["경달권변", "혼수모어", "만천과해"]} ] },
    { id: "rank12_3", priority: 9989, name: "[천공 12위] 좌자·장녕·황보숭 구행 궁병", concept: "[천공 12위 3군]", formation: "구행진", officers: [ {name:"좌자", chosenTactics:["화겁생기", "전위위안", "심구고루"]}, {name:"장녕", chosenTactics:["천의난위", "양의화생", "명찰추호"]}, {name:"황보숭", chosenTactics:["강직불아", "안영찰채", "간담상조"]} ] },
    
    // ⚔️ [천공 13위 - 길드 마스터]
    { id: "rank13_1", priority: 9988, name: "[천공 13위] 서서·마초·위연 구행 창병", concept: "[천공 13위 1군]", formation: "구행진", officers: [ {name:"서서", chosenTactics:["절절학문", "전위위안", "문치무공"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "진퇴유도", "간담상조"]} ] },
    { id: "rank13_2", priority: 9988, name: "[천공 13위] 유비(제왕)·법정·강유 추형 방패", concept: "[천공 13위 2군]", formation: "추형진", officers: [ {name:"유비(제왕)", chosenTactics:["재주복주", "안영찰채", "격안관화"]}, {name:"법정", chosenTactics:["애자필보", "심구고루", "유비무환"]}, {name:"강유", chosenTactics:["담대여두", "천리추격", "체천행도"]} ] },
    { id: "rank13_3", priority: 9988, name: "[천공 13위] 관우·황충·유비 안행 궁병", concept: "[기형적 짬통 세팅]", formation: "안행진", officers: [ {name:"관우", chosenTactics:["무성", "수상개화", "질풍노도"]}, {name:"황충", chosenTactics:["적혈도", "강유겸제", "횡징폭렴"]}, {name:"유비", chosenTactics:["인정", "이퇴위진", "유좌유용"]} ] },
    
    // 🛡️ [천공 14위]
    { id: "rank14_1", priority: 9987, name: "[천공 14위] 서서·마초·위연 구행 창병", concept: "[천공 14위 1군]", formation: "구행진", officers: [ {name:"서서", chosenTactics:["절절학문", "문치무공", "혼수모어"]}, {name:"마초", chosenTactics:["출수법", "용맹무쌍", "반객위주"]}, {name:"위연", chosenTactics:["실병제위", "진퇴유도", "간담상조"]} ] },
    { id: "rank14_2", priority: 9987, name: "[천공 14위] 황충·법정·강유 방원 방패", concept: "[천공 14위 2군]", formation: "방원진", officers: [ {name:"황충", chosenTactics:["적혈도", "견진연봉", "위위구조"]}, {name:"법정", chosenTactics:["애자필보", "유비무환", "격안관화"]}, {name:"강유", chosenTactics:["담대여두", "천리추격", "체천행도"]} ] },
    { id: "rank14_3", priority: 9987, name: "[천공 14위] 관우·장비·유비(제왕) 추형 방패", concept: "[천공 14위 3군]", formation: "추형진", officers: [ {name:"관우", chosenTactics:["무성", "부동여산", "질풍노도"]}, {name:"장비", chosenTactics:["연인노호", "홍수첨향", "이아환아"]}, {name:"유비(제왕)", chosenTactics:["재주복주", "이퇴위진", "강유겸제"]} ] }
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
    "rank1_wu_yukson": "💡 [1군 정석] 노숙의 스탯 펌핑과 격안관화를 육손에게 몰아주어 추격 폭딜을 극대화하는 정석 오기병입니다.",
    "rank1_gun_jangnyeong": "💡 [1군 정석] 좌자가 심구고루로 도발 탱킹을 전담하고 장녕이 수상개화로 액티브 발동률을 확정 확보한 극한 방어/폭딜 하이브리드덱입니다.",
    "rank1_wei_heojeo": "💡 [1군 정석] 호도진을 채용하여 허저가 통솔 강탈 후 반객위주+부동여산으로 확정 폭딜을 꽂아넣는 위궁덱입니다.",
    "rank2_wei_sima": "⚠️ [2군 타협] 진퇴유도를 1군에 뺏겨 간담상조로 방어를 타협했고, 사마의 역시 후적박발 없이 액티브 확률 도박(수상개화+요사여신)에 의존하는 불안정한 세팅입니다.",
    "rank3_wei_sima": "⚠️ [3군 타협] 조조가 0티어 방어기를 모두 뺏겨 '유좌유용'과 '간담상조'라는 처참한 스킬로 버텨야 하는 전형적인 짬통 덱입니다.",
    "rank4_wei_sima": "⚠️ [3군 타협] 조조의 탱킹 부재는 물론, 사마의는 액티브 도박을 하고 가후가 '격안관화'를 들고 평타 딜러도 없는 곳에서 연격률 버프를 허공에 뿌리는 최악의 세팅입니다.",
    "rank5_wei_sima": "⚠️ [3군 타협] 방어 전법이 완전히 고갈된 조조가 추격 힐 전법인 '위위구조'를 억지로 들고 전열에 서는 타협의 끝판왕입니다.",
    "rank6_wei_sima": "⚠️ [2군 타협] 진퇴유도를 3군 원소에게 양보하고 조조가 '여자동포'로 데미지 숄더링을 전담하며 아슬아슬하게 버티는 세팅입니다.",
    "rank7_wei_sima": "⚠️ [3군 타협] 메인 딜러인 사마의가 마법(액티브) 딜러임에도 불구하고 조조가 평타 버프인 '격안관화'를 허공에 시전하는 기형적 구성입니다.",
    "rank13_shu_gwan": "🚨 [길마 3군 분석] 1·2군에 핵심 딜/탱 전법을 모조리 뺏긴 참혹한 타협의 결과물입니다. 치명타 딜러 황충에게 방어 전법(강유겸제/횡징폭렴)을 둘둘 감아 억지 고기방패로 쓰고, 관우가 혼자 B급 전법(질풍노도)으로 독박 딜을 해야 하는 껍데기뿐인 덱입니다. 번뜩이는 세팅이 절대 아닙니다."
};

window.getMetaDeckData = function() {
    return { analyzedMetaArchetypes, metaDeckUnitTypeMap, systemGuideInsights };
};

function renderMetaDeckPage() {
    const container = document.getElementById('meta-deck-container');
    if (!container) return;
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">전서버 실전 메타 덱 아카이브 (천공 1등~14등 총 41종 통합)</h2>`;
    
    analyzedMetaArchetypes.forEach(deck => {
        const officersHtml = deck.officers.map(o => `
            <div style="background:var(--bg-inner); border:1px solid var(--border-main); padding:10px; border-radius:6px;">
                <div style="font-weight:bold; color:var(--text-main); margin-bottom:6px;">${o.name}</div>
                <div style="font-size:11px; color:var(--text-desc);">
                    <div>🔸 ${o.chosenTactics[0]}</div>
                    ${o.chosenTactics[1] ? `<div>🔸 ${o.chosenTactics[1]}</div>` : '<div style="color:#ef4444;">🔸 미장착</div>'}
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

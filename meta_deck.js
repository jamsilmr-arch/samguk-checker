// [시스템 분석] meta_deck.js - 전서버 실전 메타 덱 데이터베이스 (천공 27종 + 연무장 10종 = 총 37종 실전 덱 완벽 통합 아카이브)
console.log("[시스템 분석] meta_deck.js 메타 덱 데이터 허브 기동");

var analyzedMetaArchetypes = [
    // 🏆 [오늘자 천공 랭커 1세트]
    {
        id: "rank_today_set1_wu_yuk", priority: 160, name: "[천공 1세트 1군] 소교·노숙·육손 방원 기병", concept: "[오늘자 최신 메타]", formation: "방원진",
        officers: [
            { name: "소교", chosenTactics: ["화용욕모", "진퇴유도", "분성지계"] },
            { name: "노숙", chosenTactics: ["탑상책", "견진연봉", "위위구조"] },
            { name: "육손", chosenTactics: ["지변규려", "천리추격", "체천행도"] }
        ]
    },
    {
        id: "rank_today_set1_gun_jang", priority: 159, name: "[천공 1세트 2군] 원소·장녕·좌자 구행 방패", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "원소", chosenTactics: ["사소도", "간담상조", "강유겸제"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "좌자", chosenTactics: ["화겁생기", "안영찰채", "유비무환"] }
        ]
    },
    {
        id: "rank_today_set1_wei_heo", priority: 158, name: "[천공 1세트 3군] 허저·가후·악진 호도 궁병", concept: "[오늘자 최신 메타]", formation: "호도진",
        officers: [
            { name: "허저", chosenTactics: ["호치", "부동여산", "반객위주"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "유좌유용"] },
            { name: "악진", chosenTactics: ["분용당선", "기문둔갑", "횡징폭렴"] }
        ]
    },
    // 🥈 [오늘자 천공 랭커 2세트]
    {
        id: "rank_today_set2_shu_macho", priority: 155, name: "[천공 2세트 1군] 마초·위연·서서 안행 창병", concept: "[오늘자 최신 메타]", formation: "안행진",
        officers: [
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "반객위주"] },
            { name: "위연", chosenTactics: ["실병제위", "문치무공", "진퇴유도"] },
            { name: "서서", chosenTactics: ["절절학문", "전위위안", "심구고루"] }
        ]
    },
    {
        id: "rank_today_set2_wei_sima", priority: 154, name: "[천공 2세트 2군] 사마의·조조·가후 추형 방패", concept: "[액티브 치명 고점형]", formation: "추형진",
        officers: [
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "조조", chosenTactics: ["효웅", "간담상조", "강유겸제"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "만천과해"] }
        ]
    },
    {
        id: "rank_today_set2_gun_hwang", priority: 153, name: "[천공 2세트 3군] 황보숭·장녕·좌자 구행 궁병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "황보숭", chosenTactics: ["강직불아", "금창신", "여자동포"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "좌자", chosenTactics: ["화겁생기", "안영찰채", "유비무환"] }
        ]
    },

    // 🥈 [오늘자 천공 랭커 2세트]
    {
        id: "rank_today_set2_shu_macho", priority: 155, name: "[천공 2세트 1군] 마초·위연·서서 안행 창병", concept: "[오늘자 최신 메타]", formation: "안행진",
        officers: [
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "반객위주"] },
            { name: "위연", chosenTactics: ["실병제위", "문치무공", "진퇴유도"] },
            { name: "서서", chosenTactics: ["절절학문", "전위위안", "심구고루"] }
        ]
    },
    {
        id: "rank_today_set2_wei_sima", priority: 154, name: "[천공 2세트 2군] 사마의·조조·가후 추형 방패", concept: "[오늘자 최신 메타]", formation: "추형진",
        officers: [
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "조조", chosenTactics: ["효웅", "유좌유용", "강유겸제"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "만천과해"] }
        ]
    },
    {
        id: "rank_today_set2_gun_hwang", priority: 153, name: "[천공 2세트 3군] 황보숭·장녕·좌자 구행 궁병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "황보숭", chosenTactics: ["강직불아", "금창신", "간담상조"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "좌자", chosenTactics: ["화겁생기", "안영찰채", "유비무환"] }
        ]
    },

    // 🥉 [오늘자 천공 랭커 3세트]
    {
        id: "rank_today_set3_gun_yeopo", priority: 150, name: "[천공 3세트 1군] 원소·동탁·여포 방원 기병", concept: "[오늘자 최신 메타]", formation: "방원진",
        officers: [
            { name: "원소", chosenTactics: ["사소도", "진퇴유도", "간담상조"] },
            { name: "동탁", chosenTactics: ["전권난정", "견진연봉", "위위구조"] },
            { name: "여포", chosenTactics: ["천하무쌍", "용왕직전", "만부막적"] }
        ]
    },
    {
        id: "rank_today_set3_wei_sima", priority: 149, name: "[천공 3세트 2군] 사마의·조조·가후 추형 방패", concept: "[오늘자 최신 메타]", formation: "추형진",
        officers: [
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "후적박발"] },
            { name: "조조", chosenTactics: ["효웅", "홍수첨향", "횡징폭렴"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "만천과해"] }
        ]
    },
    {
        id: "rank_today_set3_gun_jwa", priority: 148, name: "[천공 3세트 3군] 좌자·장녕·황보숭 구행 궁병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "유비무환", "금창신"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "황보숭", chosenTactics: ["강직불아", "안영찰채", "이퇴위진"] }
        ]
    },

    // 🏅 [오늘자 천공 랭커 4세트]
    {
        id: "rank_today_set4_shu_seo", priority: 145, name: "[천공 4세트 1군] 서서·마초·위연 구행 창병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "서서", chosenTactics: ["절절학문", "전위위안", "문치무공"] },
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "질풍노도"] },
            { name: "위연", chosenTactics: ["실병제위", "강유겸제", "진퇴유도"] }
        ]
    },
    {
        id: "rank_today_set4_wu_yuk", priority: 144, name: "[천공 4세트 2군] 육항·손권·노숙 안행 궁병", concept: "[오늘자 최신 메타]", formation: "안행진",
        officers: [
            { name: "육항", chosenTactics: ["청백충근", "요사여신", "양의화생"] },
            { name: "손권", chosenTactics: ["웅거", "안영찰채", "여자동포"] },
            { name: "노숙", chosenTactics: ["탑상책", "분성지계", "만천과해"] }
        ]
    },
    {
        id: "rank_today_set4_wei_sima", priority: 143, name: "[천공 4세트 3군] 조조·사마의·가후 구행 방패", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "조조", chosenTactics: ["효웅", "유좌유용", "간담상조"] },
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "반객위주"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "유비무환"] }
        ]
    },

    // 🎖️ [오늘자 천공 랭커 5세트]
    {
        id: "rank_today_set5_wei_sima", priority: 140, name: "[천공 5세트 1군] 조조·사마의·가후 구행 방패", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "조조", chosenTactics: ["효웅", "간담상조", "안영찰채"] },
            { name: "사마의", chosenTactics: ["응시낭고", "요사여신", "수상개화"] },
            { name: "가후", chosenTactics: ["경달권변", "혼수모어", "만천과해"] }
        ]
    },
    {
        id: "rank_today_set5_shu_macho", priority: 139, name: "[천공 5세트 2군] 마초·위연·서서 안행 창병", concept: "[오늘자 최신 메타]", formation: "안행진",
        officers: [
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "반객위주"] },
            { name: "위연", chosenTactics: ["실병제위", "강유겸제", "진퇴유도"] },
            { name: "서서", chosenTactics: ["절절학문", "문치무공", "유비무환"] }
        ]
    },
    {
        id: "rank_today_set5_gun_jwa", priority: 138, name: "[천공 5세트 3군] 좌자·장녕·황보숭 구행 궁병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "전위위안", "심구고루"] },
            { name: "장녕", chosenTactics: ["천의난위", "명찰추호", "후적박발"] },
            { name: "황보숭", chosenTactics: ["강직불아", "여자동포", "홍수첨향"] }
        ]
    },

    // 🎗️ [오늘자 천공 랭커 6세트]
    {
        id: "rank_today_set6_gun_jwa", priority: 135, name: "[천공 6세트 1군] 좌자·장녕·황보숭 구행 궁병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "유비무환", "안영찰채"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "황보숭", chosenTactics: ["강직불아", "진퇴유도", "동구적개"] }
        ]
    },
    {
        id: "rank_today_set6_wei_ak", priority: 134, name: "[천공 6세트 2군] 악진·조조(제왕)·장료 기형 기병", concept: "[오늘자 최신 메타]", formation: "기형진",
        officers: [
            { name: "악진", chosenTactics: ["분용당선", "여자동포", "유좌유용"] },
            { name: "조조(제왕)", chosenTactics: ["군령여산", "강유겸제", "간담상조"] },
            { name: "장료", chosenTactics: ["함진살적", "질풍노도", "반객위주"] }
        ]
    },
    {
        id: "rank_today_set6_wei_sima", priority: 133, name: "[천공 6세트 3군] 조조·사마의·가후 구행 방패", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "조조", chosenTactics: ["효웅", "심구고루", "견불가최"] },
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "가후", chosenTactics: ["경달권변", "전위위안", "혼수모어"] }
        ]
    },

    // 🏵️ [오늘자 천공 랭커 7세트]
    {
        id: "rank_today_set7_shu_beop", priority: 130, name: "[천공 7세트 1군] 법정·황충·강유 방원 방패", concept: "[오늘자 최신 메타]", formation: "방원진",
        officers: [
            { name: "법정", chosenTactics: ["애자필보", "심구고루", "유비무환"] },
            { name: "황충", chosenTactics: ["적혈도", "견진연봉", "위위구조"] },
            { name: "강유", chosenTactics: ["담대여두", "반객위주", "천리추격"] }
        ]
    },
    {
        id: "rank_today_set7_shu_wi", priority: 129, name: "[천공 7세트 2군] 위연·마초·서서 구행 창병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "위연", chosenTactics: ["실병제위", "간담상조", "진퇴유도"] },
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "질풍노도"] },
            { name: "서서", chosenTactics: ["절절학문", "문치무공", "혼수모어"] }
        ]
    },
    {
        id: "rank_today_set7_gun_jwa", priority: 128, name: "[천공 7세트 3군] 좌자·장녕·황보숭 구행 궁병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "안영찰채", "전위위안"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "황보숭", chosenTactics: ["강직불아", "강유겸제", "여자동포"] }
        ]
    },

    // 💎 [오늘자 천공 랭커 8세트]
    {
        id: "rank_today_set8_gun_jwa", priority: 125, name: "[천공 8세트 1군] 좌자·장녕·황보숭 구행 궁병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "유비무환", "안영찰채"] },
            { name: "장녕", chosenTactics: ["천의난위", "양의화생", "명찰추호"] },
            { name: "황보숭", chosenTactics: ["강직불아", "진퇴유도", "여자동포"] }
        ]
    },
    {
        id: "rank_today_set8_gun_dong", priority: 124, name: "[천공 8세트 2군] 동탁·원소·여포 방원 기병", concept: "[오늘자 최신 메타]", formation: "방원진",
        officers: [
            { name: "동탁", chosenTactics: ["전권난정", "이퇴위진", "강유겸제"] },
            { name: "원소", chosenTactics: ["사소도", "견진연봉", "홍수첨향"] },
            { name: "여포", chosenTactics: ["천하무쌍", "용왕직전", "만부막적"] }
        ]
    },
    {
        id: "rank_today_set8_gun_cho", priority: 123, name: "[천공 8세트 3군] 초선·공손찬·우길 구행 창병", concept: "[오늘자 최신 메타]", formation: "구행진",
        officers: [
            { name: "초선", chosenTactics: ["폐월", "분성지계", "심구고루"] },
            { name: "공손찬", chosenTactics: ["위진새북", "승승장구", "질풍노도"] },
            { name: "우길", chosenTactics: ["태평경", "간담상조", "혼수모어"] }
        ]
    },

    // ✨ [오늘자 천공 랭커 9세트]
    {
        id: "rank_today_set9_shu_ma", priority: 120, name: "[천공 9세트 1군] 마초·위연·서서 안행 창병", concept: "[오늘자 최신 메타]", formation: "안행진",
        officers: [
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "질풍노도"] },
            { name: "위연", chosenTactics: ["실병제위", "진퇴유도", "간담상조"] },
            { name: "서서", chosenTactics: ["절절학문", "문치무공", "전위위안"] }
        ]
    },
    {
        id: "rank_today_set9_gun_won", priority: 119, name: "[천공 9세트 2군] 원소·동탁·여포 방원 기병", concept: "[오늘자 최신 메타]", formation: "방원진",
        officers: [
            { name: "원소", chosenTactics: ["사소도", "견불가최", "동구적개"] },
            { name: "동탁", chosenTactics: ["전권난정", "횡징폭렴", "강유겸제"] },
            { name: "여포", chosenTactics: ["천하무쌍", "만부막적", "용왕직전"] }
        ]
    },
    {
        id: "rank_today_set9_shu_beop", priority: 118, name: "[천공 9세트 3군] 법정·황충·강유 방원 방패", concept: "[오늘자 최신 메타]", formation: "방원진",
        officers: [
            { name: "법정", chosenTactics: ["애자필보", "이퇴위진", "견진연봉"] },
            { name: "황충", chosenTactics: ["적혈도", "", ""] }, 
            { name: "강유", chosenTactics: ["담대여두", "체천행도", "반객위주"] }
        ]
    },

    // ⚔️ [연무장 랭커 1위~10위 세트 (로컬 서버 기준)]
    {
        id: "rank_local_1", priority: 110, name: "[연무장 1위] 좌자·장녕·황보숭 구행 궁병", concept: "[연무장 랭커]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "유비무환", "안영찰채"] },
            { name: "장녕", chosenTactics: ["천의난위", "명찰추호", "양의화생"] },
            { name: "황보숭", chosenTactics: ["강직불아", "진퇴유도", "강유겸제"] }
        ]
    },
    {
        id: "rank_local_2", priority: 109, name: "[연무장 2위] 악진·조조·장료 호도 기병", concept: "[연무장 랭커]", formation: "호도진",
        officers: [
            { name: "악진", chosenTactics: ["분용당선", "분성지계", "진퇴유도"] },
            { name: "조조", chosenTactics: ["군령여산", "강유겸제", "간담상조"] },
            { name: "장료", chosenTactics: ["함진살적", "반객위주", "질풍노도"] }
        ]
    },
    {
        id: "rank_local_3", priority: 108, name: "[연무장 3위] 악진·조조·장료 호도 기병", concept: "[연무장 랭커]", formation: "호도진",
        officers: [
            { name: "악진", chosenTactics: ["분용당선", "간담상조", "동구적개"] },
            { name: "조조", chosenTactics: ["군령여산", "강유겸제", "진퇴유도"] },
            { name: "장료", chosenTactics: ["함진살적", "반객위주", "질풍노도"] }
        ]
    },
    {
        id: "rank_local_4", priority: 107, name: "[연무장 4위] 가후·사마의·조조 구행 방패", concept: "[연무장 랭커]", formation: "구행진",
        officers: [
            { name: "가후", chosenTactics: ["경달권변", "유비무환", "안영찰채"] },
            { name: "사마의", chosenTactics: ["응시낭고", "후적박발", "반객위주"] },
            { name: "조조", chosenTactics: ["군령여산", "여자동포", "진퇴유도"] }
        ]
    },
    {
        id: "rank_local_5", priority: 106, name: "[연무장 5위] 위연·마초·서서 구행 창병", concept: "[연무장 랭커]", formation: "구행진",
        officers: [
            { name: "위연", chosenTactics: ["실병제위", "진퇴유도", "간담상조"] },
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "질풍노도"] },
            { name: "서서", chosenTactics: ["절절학문", "문치무공", "전위위안"] }
        ]
    },
    {
        id: "rank_local_6", priority: 105, name: "[연무장 6위] 황보숭·장녕·좌자 구행 궁병", concept: "[연무장 랭커]", formation: "구행진",
        officers: [
            { name: "황보숭", chosenTactics: ["강직불아", "진퇴유도", "간담상조"] },
            { name: "장녕", chosenTactics: ["천의난위", "명찰추호", "양의화생"] },
            { name: "좌자", chosenTactics: ["화겁생기", "안영찰채", "유비무환"] }
        ]
    },
    {
        id: "rank_local_7", priority: 104, name: "[연무장 7위] 좌자·장녕·황보숭 구행 궁병", concept: "[연무장 랭커]", formation: "구행진",
        officers: [
            { name: "좌자", chosenTactics: ["화겁생기", "전위위안", "안영찰채"] },
            { name: "장녕", chosenTactics: ["천의난위", "명찰추호", "양의화생"] },
            { name: "황보숭", chosenTactics: ["강직불아", "진퇴유도", "간담상조"] }
        ]
    },
    {
        id: "rank_local_8", priority: 103, name: "[연무장 8위] 가후·사마의·조조 구행 방패", concept: "[연무장 랭커]", formation: "구행진",
        officers: [
            { name: "가후", chosenTactics: ["경달권변", "안영찰채", "유비무환"] },
            { name: "사마의", chosenTactics: ["응시낭고", "수상개화", "요사여신"] },
            { name: "조조", chosenTactics: ["효웅", "강유겸제", "진퇴유도"] }
        ]
    },
    {
        id: "rank_local_9", priority: 102, name: "[연무장 9위] 황충·법정·강유 방원 방패", concept: "[연무장 랭커]", formation: "방원진",
        officers: [
            { name: "황충", chosenTactics: ["적혈도", "견진연봉", "위위구조"] },
            { name: "법정", chosenTactics: ["애자필보", "심구고루", "유비무환"] },
            { name: "강유", chosenTactics: ["담대여두", "반객위주", "천리추격"] }
        ]
    },
    {
        id: "rank_local_10", priority: 101, name: "[연무장 10위] 위연·마초·서서 구행 창병", concept: "[연무장 랭커]", formation: "구행진",
        officers: [
            { name: "위연", chosenTactics: ["실병제위", "간담상조", "진퇴유도"] },
            { name: "마초", chosenTactics: ["출수법", "용맹무쌍", "반객위주"] },
            { name: "서서", chosenTactics: ["절절학문", "문치무공", "전위위안"] }
        ]
    },

    // 🌟 [미래 메타 아카이브: 법정 0티어 적용]
    {
        id: "meta_shu_beopjeong_gang",
        priority: 200,
        name: "[미래 0티어] 유비(제왕)·법정·강유 추형 방패",
        concept: "[패시브 완벽 카운터 브루저]",
        formation: "추형진",
        officers: [
            { name: "유비(제왕)", chosenTactics: ["재주복주", "유비무환", "태청단경"] },
            { name: "법정", chosenTactics: ["애자필보", "심구고루", "간담상조"] },
            { name: "강유", chosenTactics: ["담대여두", "일고작기", "천리추격"] }
        ]
    }
];

var metaDeckUnitTypeMap = {
    "rank_today_set1_wu_yuk": "기병", "rank_today_set1_gun_jang": "방패병", "rank_today_set1_wei_heo": "궁병",
    "rank_today_set2_shu_macho": "창병", "rank_today_set2_wei_sima": "방패병", "rank_today_set2_gun_hwang": "궁병",
    "rank_today_set3_gun_yeopo": "기병", "rank_today_set3_wei_sima": "방패병", "rank_today_set3_gun_jwa": "궁병",
    "rank_today_set4_shu_seo": "창병", "rank_today_set4_wu_yuk": "궁병", "rank_today_set4_wei_sima": "방패병",
    "rank_today_set5_wei_sima": "방패병", "rank_today_set5_shu_macho": "창병", "rank_today_set5_gun_jwa": "궁병",
    "rank_today_set6_gun_jwa": "궁병", "rank_today_set6_wei_ak": "기병", "rank_today_set6_wei_sima": "방패병",
    "rank_today_set7_shu_beop": "방패병", "rank_today_set7_shu_wi": "창병", "rank_today_set7_gun_jwa": "궁병",
    "rank_today_set8_gun_jwa": "궁병", "rank_today_set8_gun_dong": "기병", "rank_today_set8_gun_cho": "창병",
    "rank_today_set9_shu_ma": "창병", "rank_today_set9_gun_won": "기병", "rank_today_set9_shu_beop": "방패병",
    "rank_local_1": "궁병", "rank_local_2": "기병", "rank_local_3": "기병", "rank_local_4": "방패병", "rank_local_5": "창병",
    "rank_local_6": "궁병", "rank_local_7": "궁병", "rank_local_8": "방패병", "rank_local_9": "방패병", "rank_local_10": "창병",
    "meta_shu_beopjeong_gang": "방패병"
};

var systemGuideInsights = {
    "rank_today_set1_wu_yuk": "💡 [오늘자 1세트 1군] 방원진 후열 연격 버프(28%)와 노숙의 견진연봉(50%)을 육손에게 몰아주고, 천리추격+체천행도로 적 스탯을 강탈하며 마법 추격 폭딜을 꽂아넣는 오나라 기병 덱입니다.",
    "rank_today_set1_gun_jang": "💡 [오늘자 1세트 2군] 원소가 간담상조+강유겸제로 전열에서 버티고, 좌자의 안영찰채+유비무환 2중 힐링 아래 장녕이 안전하게 적 스탯을 훔쳐 15만 폭딜을 누적하는 방패형 장녕 덱입니다.",
    "rank_today_set1_wei_heo": "💡 [오늘자 1세트 3군] 신규 호도진을 채용하여 허저가 통솔 강탈 후 반객위주+부동여산으로 물리 폭딜을 꽂고 가후/악진이 혼란과 피감으로 턴을 버는 위나라 궁병 덱입니다.",
    "rank_today_set2_shu_macho": "💡 [오늘자 2세트 1군] 서서에게 '심구고루'를 장착시켜 도발 탱킹 및 힐을 전담시키고, 위연의 진퇴유도 피감 지원 아래 마초가 반객위주로 적 전열을 도륙하는 촉창 덱입니다.",
    "rank_today_set2_wei_sima": "💡 [오늘자 2세트 2군] 조조가 유좌유용+강유겸제로 버티고 사마의가 수상개화+요사여신으로 폭발적인 모략 치명타를 퍼붓는 정통 추형 방패덱입니다.",
    "rank_today_set2_gun_hwang": "💡 [오늘자 2세트 3군] 황보숭이 금창신+간담상조로 전열을 철벽 방어하고 좌자의 안영찰채+유비무환 케어 아래 장녕이 폭딜을 넣는 밸런스형 궁병 덱입니다.",
    "rank_today_set3_gun_yeopo": "💡 [오늘자 3세트 1군] 원소(진퇴유도+간담상조)와 동탁(견진연봉+위위구조)이 전열을 지키며 후열 여포의 연격률을 78% 이상으로 폭증시켜 적을 찢어버리는 기병 덱입니다.",
    "rank_today_set3_wei_sima": "💡 [오늘자 3세트 2군] 조조에게 홍수첨향+횡징폭렴을 주어 힐과 피감을 동시에 챙기고, 사마의가 후적박발로 침묵/겁전을 무시하며 확정 딜을 넣는 변형 방패덱입니다.",
    "rank_today_set3_gun_jwa": "💡 [오늘자 3세트 3군] 좌자에게 유비무환+금창신을 쥐여주어 유지력을 극대화하고 황보숭이 안영찰채+이퇴위진으로 서포트하는 구행 궁병 덱입니다.",
    "rank_today_set4_shu_seo": "💡 [오늘자 4세트 1군] 서서를 구행진 전열에 세워 고기방패 및 힐러로 쓰고 마초와 위연이 뒤에서 프리딜을 넣는 창덱입니다.",
    "rank_today_set4_wu_yuk": "💡 [오늘자 4세트 2군] 노숙과 육항이 손권에게 버프를 몰아주어 손권의 웅거 스택을 극한으로 터뜨리는 안행 오궁 덱입니다.",
    "rank_today_set4_wei_sima": "💡 [오늘자 4세트 3군] 조조가 1선에서 유좌유용과 간담상조로 철벽 방어를 세우고, 사마의가 수상개화+반객위주로 후반 폭딜을 터뜨리는 구행 방패덱입니다.",
    "rank_today_set5_wei_sima": "💡 [오늘자 5세트 1군] 조조에게 안영찰채를 추가로 쥐여주어 유지력을 극강으로 끌어올린 좀비형 구행 방패 덱입니다.",
    "rank_today_set5_shu_macho": "💡 [오늘자 5세트 2군] 안행진을 활용하여 마초의 강공/기습 확률을 12% 높인 뒤, 강유겸제+진퇴유도 피감 아래 적을 분쇄합니다.",
    "rank_today_set5_gun_jwa": "💡 [오늘자 5세트 3군] 좌자가 심구고루로 도발 탱킹을 전담하고, 황보숭의 보조 아래 장녕이 명찰추호로 적의 방어 버프를 찢어버립니다.",
    "rank_today_set6_gun_jwa": "💡 [오늘자 6세트 1군] 장녕의 명찰추호에 더해 황보숭이 진퇴유도로 적의 공격력을 30% 확정 감소시키는 높은 안정성의 장녕 덱입니다.",
    "rank_today_set6_wei_ak": "💡 [오늘자 6세트 2군] 기형진으로 전열 장료의 딜을 12% 증폭시킨 뒤, 질풍노도+반객위주로 적 주장을 최단 시간에 암살하는 기병 덱입니다.",
    "rank_today_set6_wei_sima": "💡 [오늘자 6세트 3군] 전열 조조에게 '심구고루'와 '견불가최'를 모두 몰아주어 절대 뚫리지 않는 극단적인 방어선을 구축한 사마의 구행 방패 덱입니다.",
    "rank_today_set7_shu_beop": "💡 [오늘자 7세트 1군] 방원진의 연격 버프를 받는 강유와 황충이 법정의 완벽한 힐/보호 아래 물리/모략 하이브리드 폭딜을 넣는 방패덱입니다.",
    "rank_today_set7_shu_wi": "💡 [오늘자 7세트 2군] 서서가 혼수모어로 변수를 창출하고 마초, 위연이 구행진의 후열 딜 증폭을 받아 적을 분쇄하는 창덱입니다.",
    "rank_today_set7_gun_jwa": "💡 [오늘자 7세트 3군] 좌자와 황보숭이 극강의 방어 시너지를 구축하고 장녕이 명찰추호로 적 방어력을 뚫어버리는 궁덱입니다.",
    "rank_today_set8_gun_jwa": "💡 [오늘자 8세트 1군] 좌자가 화겁생기로 회피를 부여하고 장녕이 스탯 강탈 후 폭딜을 꽂는 정통 장녕 구행 궁덱입니다.",
    "rank_today_set8_gun_dong": "💡 [오늘자 8세트 2군] 동탁과 원소가 전열에서 버티는 동안 여포가 방원진 연격 버프를 받아 천하무쌍을 난사하는 기병덱입니다.",
    "rank_today_set8_gun_cho": "💡 [오늘자 8세트 3군] 공손찬이 위진새북과 승승장구로 속도/무용 버프를 챙기며 초선, 우길과 함께 적을 깎아먹는 변칙 창덱입니다.",
    "rank_today_set9_shu_ma": "💡 [오늘자 9세트 1군] 안행진으로 전열 마초의 생존력을 약간 타협하는 대신 위연, 서서와 함께 극공으로 밀어붙이는 창덱입니다.",
    "rank_today_set9_gun_won": "💡 [오늘자 9세트 2군] 동탁과 원소가 전권난정, 횡징폭렴 등 극단적인 피감/회복으로 버티고 여포가 모든 딜을 책임지는 방원 기병덱입니다.",
    "rank_today_set9_shu_beop": "💡 [오늘자 9세트 3군] 법정이 이퇴위진, 견진연봉으로 후열 강유의 연격과 방어를 극대화하는 방패덱입니다.",
    "rank_local_1": "💡 [연무장 1위] 장녕의 명찰추호 딜을 보조하기 위해 황보숭이 강유겸제로 전체 피감을 극한으로 끌어올린 구행 궁덱입니다.",
    "rank_local_2": "💡 [연무장 2위] 호도진을 활용하여 장료를 보호하고, 조조(제왕)가 군령여산으로 팀의 안정성을 책임지는 기병덱입니다.",
    "rank_local_3": "💡 [연무장 3위] 악진이 간담상조와 동구적개로 전열 방어력을 극대화하여 장료가 프리딜을 넣을 환경을 만드는 기병덱입니다.",
    "rank_local_4": "💡 [연무장 4위] 사마의가 후적박발과 반객위주로 폭딜을 담당하고 조조(제왕)가 여자동포, 진퇴유도로 유지력을 챙기는 방패덱입니다.",
    "rank_local_5": "💡 [연무장 5위] 위연을 전열로 세워 실병제위와 진퇴유도로 버티고 서서가 후방 힐러 역할을 하는 변칙 창덱입니다.",
    "rank_local_6": "💡 [연무장 6위] 1위와 유사하지만 황보숭이 강유겸제 대신 간담상조를 채용하여 힐량을 조금 더 챙긴 구행 궁덱입니다.",
    "rank_local_7": "💡 [연무장 7위] 좌자가 전위위안과 안영찰채를 들어 회복과 피감을 챙기고, 장녕이 프리딜을 하는 구행 궁덱입니다.",
    "rank_local_8": "💡 [연무장 8위] 일반 조조를 사용하여 효웅으로 버티고, 사마의가 수상개화, 요사여신으로 치명적인 마법 딜을 꽂는 방패덱입니다.",
    "rank_local_9": "💡 [연무장 9위] 황충과 강유가 방원진 연격을 받아 딜을 넣고 법정이 도발(심구고루)로 보호하는 형태의 방패덱입니다.",
    "rank_local_10": "💡 [연무장 10위] 마초가 반객위주로 스택 딜을 넣고 위연이 전열 탱킹을 전담하는 구행 창덱입니다.",
    "meta_shu_beopjeong_gang": "🚨 [최신 메타 브레이커] 법정의 '피곤'으로 적 패시브를 잠그고, 심구고루 도발과 강유의 스탯 강탈로 찍어누르는 0티어 방패덱입니다."
};

window.getMetaDeckData = function() {
    return { analyzedMetaArchetypes, metaDeckUnitTypeMap, systemGuideInsights };
};

function renderMetaDeckPage() {
    const container = document.getElementById('meta-deck-container');
    if (!container) return;
    
    container.innerHTML = `<h2 style="color:var(--text-highlight); border-bottom:2px solid var(--border-main); padding-bottom:10px;">전서버 실전 메타 덱 아카이브 (천공 27종 + 연무장 10종)</h2>`;
    
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

        const insight = systemGuideInsights[deck.id] ? `<div style="margin-top:8px; font-size:12px; color:var(--text-muted);">${systemGuideInsights[deck.id]}</div>` : '';

        const isTodayRank = deck.id.includes('rank_today');
        const isLocalRank = deck.id.includes('rank_local');
        
        let borderColor = '#ec4899';
        let bgEmphasis = 'rgba(236, 72, 153, 0.05)';
        let labelColor = '#f472b6';
        let labelBg = 'rgba(236, 72, 153, 0.2)';
        
        if (isTodayRank) {
            borderColor = '#f59e0b';
            bgEmphasis = 'rgba(245, 158, 11, 0.03)';
            labelColor = '#ef4444';
            labelBg = 'rgba(239, 68, 68, 0.15)';
        } else if (isLocalRank) {
            borderColor = '#8b5cf6';
            bgEmphasis = 'rgba(139, 92, 246, 0.03)';
            labelColor = '#8b5cf6';
            labelBg = 'rgba(139, 92, 246, 0.15)';
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
                ${insight}
            </div>
        `);
    });
}

document.addEventListener('DOMContentLoaded', renderMetaDeckPage);

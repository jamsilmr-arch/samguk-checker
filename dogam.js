// [시스템 분석] dogam.js 전서버 랭커 엔진 기동 (데이터 무손실 배열 압축 및 EQ_PRESETS 누락 버그 픽스 완료)
console.log("[시스템 분석] dogam.js 전서버 랭커 엔진 기동 (전체 데이터 복원 및 최적화)");

var cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

var EQ_PRESETS = {
    PC:  ["호분관","강공, 기습 상승","창병 피해 가함","용맹","명광갑","무용 피해 가함","창병 배반, 공심 상승","금왕","치룡패","무용 피해 가함","창병 배반, 공심 상승","양렬"],
    PCm: ["백옥잠","연격률","창병 피해 가함","신속","세린갑","무용 피해 가함","창병 배반, 공심 상승","치밀","쌍호뉴","연격률","창병 배반, 공심 상승","포위"],
    SC:  ["진현관","강공, 기습 상승","창병 피해 가함","기책","명재복","모략 피해 가함","창병 배반, 공심 상승","치밀","박산로","공심","창병 배반, 공심 상승","모산"],
    TC:  ["연함규","피해 감소","창병 피해 가함","권어","청등갑","피해 감소","창병 피해 감소","무환","사남패","피해 감소","창병 배반, 공심 상승","천우"],
    SH:  ["연함규","피해 감소","치유 효과 부여","원촉","청등갑","피해 감소","창병 치유 효과 상승","지원","사남패","치유 효과 받음","창병 피해 감소","감림"],
    SS:  ["진현관","피해 감소","치유 효과 부여","신속","명재복","피해 감소","창병 피해 감소","천안","박산로","치유 효과 부여","창병 피해 감소","천우"]
};

// 🚨 무장 41종 도감 데이터 무손실 배열 압축 (속성 키 반복 제거)
const rawHeroDogam = [
    ['h_gahu','가후','wei','능동 (65%)','후열','경달권변','적군 단체(2명)에 65% 확률로 혼란 효과를 부여하고 모략 피해(계수 196%, 모략 영향)를 가합니다.',437,634,503,469,'궁병/방패병','SS','혼수모어','전위위안'],
    ['h_gwa_ga','곽가','wei','능동 (50%)','후열','산무유책','적군 전체에게 모략 피해(계수 102%, 모략 영향)를 가하고, 대상이 가하는 피해를 18% 감소(2턴 지속)시킵니다.',378,634,539,362,'궁병/방패병','SH','간담상조','강유겸제'],
    ['h_samy','사마의','wei','능동 (60%)','후열','응시낭고','전투 1~4턴 시작 시 80% 확률로 공심 100% 획득 또는 받는 모략 피해 30% 감소(1턴). 5턴 이후 매 턴 80% 확률로 1~2명 적에게 모략 피해(계수 154%) 부여.',414,664,652,332,'방패병/궁병','SC','반객위주','요사여신'],
    ['h_sunuk','순욱','wei','능동 (50%)','후열','거중지중','아군 전체가 받는 피해를 16% 감소(모략 영향)시키고, 매 턴 아군 2명의 병력을 지속 회복(치료율 74%, 모략 영향)시킵니다.',408,646,467,374,'궁병/창병','SH','간담상조','강유겸제'],
    ['h_akjin','악진','wei','능동 (70%)','전열','분용당선','매 턴 100% 발동하여 적군 전열(2명)에 강력 무용 피해(계수 135%, 무용 영향)를 가하고 자신에게 허약(1턴 지속)을 부여합니다.',568,461,586,618,'창병/궁병','PC','강유겸제','진퇴유도'],
    ['h_jeonwi','전위','wei','패시브 (100%)','전열','축호과간','아군 주장이 일반 공격을 받을 시 대신 매서운 반격 무용 피해(계수 152%)를 가하고 공격자의 통솔을 10% 감소시킵니다.',658,402,598,367,'창병/방패병','TC','이아환아','동장철벽'],
    ['h_jeonguk','정욱','wei','추격 (50%)','후열','십면매복','일반 공격 후 디버프 상태인 적에게 추가 모략 피해(계수 168%, 모략 영향)를 입히고 2턴간 회복 불가 상태로 만듭니다.',402,592,503,487,'방패병/궁병','SC','사면초가','심모원려'],
    ['h_jojo_sp','조조(제왕)','wei','지휘 (100%)','후열','군령여산','아군 전체가 가하는 피해를 16%(통솔 영향) 증가시키고 받는 피해를 16%(통솔 영향) 영구 감소시킵니다.',420,580,675,362,'창병/방패병','TC','이퇴위진','진퇴유도'],
    ['h_jojo','조조','wei','지휘 (100%)','후열','효웅','부대 내 아군이 가하는 모든 피해의 12%를 흡수하여 자신의 병력을 치료하고 아군 전체가 받는 피해를 16% 감소시킵니다.',420,580,675,362,'방패병/기병','TC','간담상조','안영찰채'],
    ['h_jangryo','장료','wei','패시브 (100%)','전열','함진살적','자신의 일반 공격이 68% 확률로 적군 주장을 정밀 저격하며, 일반 공격 후 대상에게 추가 무용 피해(계수 188%, 무용 영향)를 가합니다.',622,467,586,612,'창병/기병','PCm','질풍노도','반객위주'],
    ['h_janghap','장합','wei','지휘 (100%)','후열','교변병기','전투 시작 시 아군 전체의 액티브 전법 발동 확률을 12% 증가시키고, 일반 공격 피격 시 35% 확률로 저항을 부여합니다.',580,426,592,463,'방패병/창병','TC','간담상조','강유겸제'],
    ['h_hahoudon','하후돈','wei','패시브 (50%)','전열','발시담정','피해를 입을 때마다 40% 확률로 적군 다수(2명)에게 반격 무용 피해(계수 84%, 무용 영향)를 즉각 가합니다.',604,396,622,427,'창병/방패병','TC','이아환아','동장철벽'],
    ['h_hahouyeon','하후연','wei','능동 (50%)','후열','충용','일반 공격 후 적군 전체에게 무용 피해(계수 108%, 무용 영향)를 가하고 30% 확률로 제어 불가(겁전/무장해제)를 1턴 부여합니다.',592,408,562,641,'창병/기병','PCm','일고작기','암전난방'],
    ['h_heojeo','허저','wei','능동 (60%)','전열','호치','적군 2명의 통솔을 7% 탈취하고 200% 무용 피해를 입힙니다(전열 피해 40% 증가). 입힌 피해 20% 병력 회복.',680,409,642,550,'창병/궁병','TC','부동여산','동장철벽'],
    ['h_gyeonhui','견희','wei','능동 (60%)','후열','신복옥의','아군 전체 병력 회복(치료율 90%) 및 받는 피해 10% 감소, 통솔 10% 상승(50% 확률로 해제 불가 및 계수 20%). 속도가 가장 높은 적군 1명의 통솔 15% 탈취. 40% 확률로 혼란 부여.',456,657,650,596,'창병/기병','SH','안영찰채','유비무환'],
    ['h_gwanu','관우','shu','능동 (50%)','전열','무성','1턴 준비 후 적군 전체에게 맹렬한 무용 피해(계수 146%, 무용 영향)를 가하고 50% 확률로 무장해제 또는 겁전을 1턴간 부여.',658,503,628,558,'창병/기병','PC','승승장구','질풍노도'],
    ['h_gangyu','강유','shu','추격 (50%)','후열','담대여두','홀수 턴에 적군 단체의 무용을 64 강탈하여 무용 피해(계수 184%)를 가하고, 짝수 턴에 모략을 64 강탈하여 모략 피해(계수 184%)를 가합니다.',556,622,574,475,'방패병/기병','SC','천리추격','일고작기'],
    ['h_madae','마대','shu','능동 (35%)','전열','습참','1턴 준비 후 적군 2명에게 무용 피해(계수 210%)를 가하고 대상이 가하는 피해를 25% 차단합니다(2턴 지속).',485,485,568,552,'창병/방패병','PC','일고작기','만전제발'],
    ['h_macho','마초','shu','패시브 (100%)','전열','출수법','자신의 물리 피해가 34% 증가하고 일반 공격 피해의 54%를 주위 적군에게 확산 전이시킵니다.',646,414,539,564,'창병/기병','PCm','용맹무쌍','질풍노도'],
    ['h_beopjeong','법정','shu','지휘 (100%)','후열','애자필보','턴 시작 시, 60% 확률(모략 영향)로 자신이 받는 무용 및 모략 피해를 30% 감소시키고 아군 전체에게 절반의 효과를 부여하며, 이후 30% 확률로 적군 1명에게 제어 효과 1개(겁전, 피곤)를 부여합니다.',48,92,81,65,'방패병/궁병','SS','태청단경','심구고루'],
    ['h_seoseo','서서','shu','지휘 (100%)','후열','절절학문','아군이 능동 전법을 발동할 때마다 60% 확률로 아군 전체의 공격력을 14% 증폭(최대 3중첩)합니다.',545,598,503,570,'창병/궁병','SS','문치무공','전위위안'],
    ['h_samaga','사마가','shu','추격 (35%)','전열','만왕','일반 공격 후 45% 확률로 대상에게 무용 피해(계수 175%)를 가하고 2턴간 공황 및 약화 상태로 만듭니다.',556,372,461,487,'창병/방패병','PC','만전제발','용왕직전'],
    ['h_wuyeon','위연','shu','패시브 (70%)','전열','실병제위','준비 턴이 필요한 능동 전법의 대기 시간을 75% 확률로 즉시 삭제하고 자신의 가하는 피해를 15% 증가시킵니다.',604,503,622,362,'창병/궁병','PC','홍수첨향','이퇴위진'],
    ['h_yubi','유비','shu','지휘 (100%)','후열','인정','매 턴 68% 확률로 아군 전체의 병력을 회복(치료율 68%, 모략 영향)시키고 매 턴 10% 확률로 대상의 제어 상태를 해제합니다.',509,568,652,368,'창병/기병','SH','혼수모어','홍수첨향'],
    ['h_yubi_sp','유비(제왕)','shu','지휘 (100%)','후열','재주복주','매 턴 아군 2명 치료(치료율 68%, 모략 영향) 및 10% 확률로 허약 상태 부여(1턴). 주장일 시 허약 15%.',509,568,652,368,'창병/방패병','SH','여자동포','안영찰채'],
    ['h_jangbi','장비','shu','패시브 (50%)','전열','연인노호','전투 2, 4턴에 적군 전체에게 무용 피해(계수 104%)를 가하고, 무장해제 상태 대상에게 50% 확률로 통솔 50 감소.',652,414,545,487,'창병/방패병','TC','진퇴유도','선등함진'],
    ['h_jegaryang','제갈량','shu','지휘 (100%)','후열','초선차전','적군 2명이 능동 전법 발동 시 35% 확률로 시전을 차단하고 모략 역피해(계수 102%, 모략 영향)를 줍니다.',402,681,634,362,'궁병/방패병','SH','전위위안','안영찰채'],
    ['h_joun','조운','shu','패시브 (100%)','전열','칠진칠출','자신에게 상시 영구 통찰(제어 면역) 상태를 부여하고 무용, 모략, 속도, 통솔 속성이 40(주장 시 50) 증가합니다.',658,473,622,487,'창병/방패병','PC','이아환아','횡징폭렴'],
    ['h_hwangchung','황충','shu','패시브 (100%)','후열','적혈도','자신의 전법 크리티컬(회심) 확률을 25% 증가시키고, 회심 발동 시 가하는 피해량이 50% 증가합니다.',622,503,521,481,'창병/방패병','PC','횡징폭렴','강유겸제'],
    ['h_hwangworyeong','황월영','shu','지휘 (100%)','후열','묘산천기','전투 첫 3턴 동안 아군 전체가 가하는 전법 피해를 30% 폭증시키고 4턴부터 가하는 피해 15% 감소.',432,628,521,522,'궁병/방패병','SH','간담상조','혼수모어'],
    ['h_daegyo','대교','wu','지휘 (100%)','후열','정수유심','아군 전체가 받는 피해의 18%를 적 시전자에게 즉각 반사 유도하고 매 턴 병력을 회복(치료율 62%)합니다.',372,562,562,368,'창병/궁병','SH','간담상조','동장철벽'],
    ['h_nosuk','노숙','wu','지휘 (100%)','후열','탑상책','전투 2턴 시작 시 자신의 속성 40%를 병력이 가장 낮은 아군에게 양도하고 3~5턴 동안 피해 감소 26% 부여.',443,580,515,528,'궁병/기병','SH','분성지계','여자동포'],
    ['h_sogyo','소교','wu','능동 (70%)','후열','화용욕모','적군 2명의 방어 스탯(통솔/모략)을 20% 해제하고 아군 전체의 전법 발동률을 12% 보정합니다.',437,568,539,552,'궁병/기병','SH','진퇴유도','간담상조'],
    ['h_songyeon','손견','wu','지휘 (100%)','전열','강동맹호','적군 전체에게 도발을 시전하여 일반 공격을 강제 집중시키고 자신이 받는 피해를 28% 감소(2턴 지속)시킵니다.',568,414,658,427,'창병/방패병','TC','이아환아','동장철벽'],
    ['h_songwon','손권','wu','지휘 (100%)','후열','웅거','아군이 일반 공격을 행할 때마다 75% 확률로 자신에게 연격, 통찰, 강공, 기습, 선공 중 1개의 버프를 2턴간 획득합니다.',568,568,598,528,'궁병/기병','SC','기문둔갑','간담상조'],
    ['h_sonsanghyang','손상향','wu','능동 (50%)','후열','효희','일반 공격 전 자신에게 걸린 버프 1개당 물리 피해량 20% 증가(최대 5중첩) 및 추가 물리 타격(계수 88%)을 가합니다.',574,408,539,558,'궁병/기병','PCm','일고작기','천리추격'],
    ['h_sonchaek','손책','wu','능동 (50%)','전열','강동패주','일반 공격 후 35% 확률로 대상에게 맹렬한 무용 연타 피해(계수 192%)를 입히고 피해량의 50%를 흡혈합니다.',616,437,634,546,'창병/방패병','PC','용맹무쌍','일고작기'],
    ['h_songwon_sp','손권(제왕)','wu','지휘 (100%)','후열','겸권상계','오나라 진영 무장들과 결선 시 아군 전체의 전술 스탯을 15% 증가시키고 매 턴 50% 확률로 피해 감소 20% 부여.',568,568,598,528,'창병/궁병','SS','이퇴위진','강유겸제'],
    ['h_yeomong','여몽','wu','지휘 (100%)','전열','백의도강','전투 첫 턴에 아군 전체에 1회의 확정 회피(도피)를 부여하고, 피해를 입힐 때마다 40% 확률로 무장해제/겁전을 겁니다.',527,568,556,534,'방패병/궁병','SS','화소적벽','기문둔갑'],
    ['h_yukson','육손','wu','추격 (50%)','후열','지변규려','적군 2명에게 화상(계수 84%, 3턴 지속)을 입히고 이미 화상 상태면 광역 폭발 모략 피해(계수 164%)를 줍니다.',443,658,592,368,'창병/기병','SC','천리추격','체천행도'],
    ['h_yukhang','육항','wu','능동 (60%)','후열','청백충근','아군 주장의 모략 회심 확률을 25% 증가시키고 주장이 받는 피해의 30%를 대신 숄더링하여 분담합니다.',509,628,574,439,'창병/궁병','SH','수상개화','요사여신'],
    ['h_juyu','주유','wu','패시브 (80%)','후열','봉화연천','자신이 능동 전법을 발동할 때마다 80% 확률로 적 전체에게 광역 모략 불화살 피해(계수 68%, 모략 영향) 투하.',443,646,580,403,'창병/궁병','SC','화소적벽','요사여신'],
    ['h_jutae','주태','wu','지휘 (100%)','전열','청라산개','아군 주장이 입는 피해의 35%, 부대원이 입는 피해의 20%를 대신 흡수하고 주장의 공격력을 18% 증가시킵니다.',562,479,622,481,'기병/방패병','TC','이아환아','동장철벽'],
    ['h_jeongbo','정보','wu','지휘 (100%)','전열','칠척사모','피해를 입을 때마다 35% 확률로 자신에게 걸린 디버프를 해제하고 적 1명에게 공포(1턴)를 부여합니다.',503,503,610,433,'기병/방패병','TC','간담상조','동구적개'],
    ['h_hwanggae','황개','wu','능동 (50%)','전열','요원지화','자신의 병력 20%를 소모하여 적군 전체에게 화상 및 확정적 모략 피해(계수 122%, 2턴 지속)를 가합니다.',497,491,652,481,'방패병/궁병','TC','화소적벽','횡소천군'],
    ['h_gongsonchan','공손찬','qun','패시브 (100%)','전열','위진새북','전투 전 2턴 간 부대 전체의 전법 발동률을 13% 증가시키고 액티브 타격 후 속도 비례 추가 무용 피해 입힘.',604,527,592,582,'기병/창병','PCm','극적제승','암전난방'],
    ['h_dongtak','동탁','qun','지휘 (100%)','전열','전권난정','매 턴 자신의 무용을 15% 증폭시키며, 5턴 시작 시 적과 아군 전체에 무차별 무용 피해(계수 68%) 및 50% 흡혈 시전.',556,491,646,481,'방패병/기병','TC','혼수모어','강유겸제'],
    ['h_anryang','안량','qun','능동 (50%)','전열','효장','1턴 준비 후 적 2명에게 무용 참격 충격(계수 180%)을 가하고 1턴간 확정적 공포 제어 상태로 격리합니다.',598,384,515,534,'창병/기병','PC','만전제발','용왕직전'],
    ['h_yeopo','여포','qun','패시브 (100%)','전열','천하무쌍','적 단일과 일기토 신청. 서로 일반 공격을 3회 주고받음. 일기토 중 제어 면역, 받는 피해 감소 및 추격 발동.',675,378,556,546,'궁병/기병','PCm','용왕직전','만부막적'],
    ['h_ugil','우길','qun','지휘 (70%)','후열','태평경','2턴 시작 시 적군 전체에게 수공(계수 72%, 모략 영향, 4턴 지속)을 걸어 지속적인 모략 피해 줍니다.',443,592,527,516,'창병/궁병','SS','진퇴유도','기문둔갑'],
    ['h_wonso','원소','qun','지휘 (100%)','후열','사소도','1턴 준비 후 적 2명에게 물리 피해(계수 126%) 및 화상(계수 60%)을 입히고 아군 전체 통솔 80 증가.',515,521,634,493,'방패병/기병','TC','견진연봉','위위구조'],
    ['h_janggak','장각','qun','능동 (50%)','후열','황천당립','1턴 준비 후 무작위 적에게 5회의 천벌 벼락 모략 타격(계수 136%)을 가하고 30% 확률로 공황 부여.',473,610,616,368,'궁병/기병','SC','사면초가','화소적벽'],
    ['h_jangnyeong','장녕','qun','능동 (50%)','후열','천의난위','적군 단체의 모략과 통솔을 38 흡수하여 아군에게 공유하고 강력 모략 피해(계수 184%)를 줍니다.',461,598,556,457,'궁병/방패병','SS','수상개화','양의화생'],
    ['h_jangbo','장보','qun','능동 (50%)','후열','요풍사기','적 전체에 모래바람 모략 피해(계수 106%)를 입히고 아군 전체에게 장벽 2중첩(피해 40% 흡수)을 부여합니다.',414,562,551,433,'궁병/방패병','SS','강유겸제','진퇴유도'],
    ['h_jwaja','좌자','qun','패시브 (100%)','후열','화겁생기','전투 첫 2턴 간 아군 전체에게 회피 35%를 부여하고 3~5턴 동안 매 턴 병력을 회복(치료율 68%)시킵니다.',437,658,497,403,'궁병/방패병','SH','안영찰채','유좌유용'],
    ['h_chaemunhui','채문희','qun','능동 (70%)','후열','비분시','아군 2명의 병력을 회복(치료율 122%, 모략 영향)시키고 50% 확률로 가하는 피해 26% 증가 또는 받는 피해 26% 감소.',372,598,509,558,'궁병/기병','SH','간담상조','강유겸제'],
    ['h_choseon','초선','qun','능동 (50%)','후열','폐월','적군 단체를 매혹하여 자신이 입는 피해의 35%를 해당 적이 대신 분담하게 만들고 대상의 통솔/무용을 감소.',372,592,556,433,'창병/기병','SH','혼수모어','위위구조'],
    ['h_hwata','화타','qun','능동 (50%)','후열','청낭제세','전투 전반기(1~4턴) 동안 아군 2명의 통솔을 40 증가시키고 피격 시 50% 확률로 즉각 병력 회복.',372,598,432,362,'궁병/방패병','SH','간담상조','휴양생식'],
    ['h_hwangbosung','황보숭','qun','지휘 (100%)','전열','강직불아','매 턴 60% 확률(통솔 영향)로 자신 및 속도가 낮은 아군에게 패시브 전법 피해 20% 감소 부여 및 병력 회복(치료율 120%). 전열 아군 1명에게 받는 피해 10% 감소(대상 속도 낮으면 20% 추가) 부여.',545,545,719,498,'궁병/창병','TC','초선차전','동장철벽']
];

var heroDogamData = rawHeroDogam.map(r => ({
    id: r[0], name: r[1], group: r[2], role: r[3], location: r[4], skill: r[5], skillDesc: r[6],
    stats: { martial: r[7], tactical: r[8], command: r[9], speed: r[10] }, unit: r[11], eq: r[12], tacs: [r[13], r[14]]
}));

// 🚨 장비 세팅 32종 데이터 무손실 배열 압축 (중첩 프로퍼티 제거)
const rawEqOverrides = [
    ["법정","진현관|피해 감소|방패병 피해 감소|신속","명재복|피해 감소|방패병 치유 효과 상승|천안","박산로|치유 효과 받음|방패병 피해 감소|천우"],
    ["마초","백옥잠|연격률|창병 피해 가함|용맹","세린갑|피해 감소|창병 피해 감소|치밀","쌍호뉴|연격률|창병 배반, 공심 상승|포위"],
    ["위연","호분관|피해 감소|창병 피해 가함|위명","명광갑|피해 감소|창병 피해 감소|비호","치룡패|무용 피해 가함|창병 피해 감소|양렬"],
    ["서서","진현관|피해 감소|창병 피해 가함|원촉","명재복|피해 감소|창병 피해 감소|지원","박산로|배반, 공심 상승|창병 피해 감소|감림"],
    ["장료","백옥잠|연격률|기병 피해 가함|신속","세린갑|피해 감소|기병 피해 감소|치밀","쌍호뉴|강공, 기습 상승|기병 배반, 공심 상승|포위"],
    ["조조(제왕)","연함규|피해 감소|방패병 치유 효과 상승|권어","청등갑|피해 감소|방패병 치유 효과 상승|무환","사남패|피해 감소|방패병 피해 감소|천우"],
    ["조조","연함규|피해 감소|방패병 치유 효과 상승|권어","청등갑|피해 감소|방패병 치유 효과 상승|무환","사남패|치유 효과 받음|방패병 피해 감소|천우"],
    ["장합","연함규|피해 감소|방패병 치유 효과 상승|권어","청등갑|피해 감소|방패병 피해 감소|무환","사남패|피해 감소|방패병 피해 감소|천우"],
    ["하후돈","연함규|피해 감소|방패병 피해 가함|위명","청등갑|피해 감소|방패병 피해 감소|여전","사남패|배반|방패병 배반, 공심 상승|응변"],
    ["악진","호분관|피해 감소|창병 피해 가함|속공","명광갑|피해 감소|창병 피해 감소|치밀","치룡패|무용 피해 가함|기병 피해 감소|영전"],
    ["전위","연함규|피해 감소|방패병 치유 효과 상승|위명","청등갑|피해 감소|방패병 피해 감소|무환","사남패|치유 효과 받음|방패병 피해 감소|응변"],
    ["정욱","진현관|강공, 기습 상승|방패병 피해 가함|기책","명재복|피해 감소|방패병 피해 감소|천안","박산로|배반, 공심 상승|방패병 배반, 공심 상승|영전"],
    ["사마의","진현관|강공, 기습 상승|방패병 피해 가함|기책","명재복|모략 피해 가함|방패병 피해 감소|치밀","박산로|공심|방패병 배반, 공심 상승|응변"],
    ["하후연","백옥잠|연격률|기병 피해 가함|속공","세린갑|피해 감소|기병 피해 감소|금왕","쌍호뉴|강공, 기습 상승|기병 배반, 공심 상승|포위"],
    ["가후","진현관|피해 감소|방패병 피해 가함|신속","명재복|피해 감소|방패병 피해 감소|천안","박산로|피해 감소|방패병 치유 효과 상승|영전"],
    ["동탁","연함규|피해 감소|방패병 피해 가함|권어","청등갑|피해 감소|방패병 피해 감소|무환","사남패|배반, 공심 상승|방패병 피해 감소|천우"],
    ["원소","연함규|피해 감소|방패병 피해 가함|권어","청등갑|피해 감소|방패병 피해 감소|무환","사남패|배반, 공심 상승|방패병 피해 감소|천우"],
    ["여포","백옥잠|연격률|궁병 피해 가함|용맹","세린갑|피해 감소|궁병 피해 감소|치밀","쌍호뉴|연격률|궁병 배반, 공심 상승|포위"],
    ["제갈량","진현관|배반, 공심 상승|궁병 피해 가함|원촉","명재복|치유 효과 부여|궁병 피해 감소|비호","박산로|배반, 공심 상승|궁병 배반, 공심 상승|영전"],
    ["황충","호분관|피해 감소|궁병 피해 가함|용맹","명광갑|피해 감소|궁병 피해 감소|금왕","치룡패|무용 피해 가함|궁병 배반, 공심 상승|양렬"],
    ["강유","진현관|강공, 기습 상승|방패병 피해 가함|겸비","명재복|모략 피해 가함|방패병 피해 감소|치밀","박산로|배반, 공심 상승|방패병 배반, 공심 상승|고무"],
    ["좌자","진현관|모략 피해 감소|방패병 치유 효과 상승|원촉","명재복|피해 감소|방패병 피해 감소|비호","박산로|치유 효과 부여|방패병 피해 감소|감림"],
    ["장녕","진현관|배반, 공심 상승|방패병 피해 가함|기책","명재복|피해 감소|방패병 피해 감소|비호","박산로|배반, 공심 상승|방패병 치유 효과 상승|영전"],
    ["우길","진현관|배반, 공심 상승|방패병 피해 가함|기책","명재복|피해 감소|방패병 피해 감소|비호","박산로|배반, 공심 상승|방패병 치유 효과 상승|모산"],
    ["손권","연함규|피해 감소|궁병 치유 효과 상승|권어","청등갑|피해 감소|궁병 피해 감소|무환","사남패|치유 효과 받음|궁병 피해 감소|천우"],
    ["손권(제왕)","진현관|피해 감소|궁병 피해 가함|속공","명재복|피해 감소|궁병 피해 감소|치밀","박산로|배반, 공심 상승|궁병 배반, 공심 상승|포위"],
    ["육항","진현관|강공, 기습 상승|궁병 피해 가함|기책","명재복|모략 피해 가함|궁병 피해 감소|치밀","박산로|공심|궁병 배반, 공심 상승|응변"],
    ["노숙","진현관|치유 효과 부여|궁병 치유 효과 상승|원촉","명재복|피해 감소|궁병 피해 감소|지원","박산로|치유 효과 부여|궁병 피해 감소|감림"],
    ["유비(제왕)","연함규|피해 감소|방패병 치유 효과 상승|원촉","청등갑|피해 감소|방패병 치유 효과 상승|비호","사남패|치유 효과 받음|방패병 피해 감소|감림"],
    ["유비","연함규|피해 감소|방패병 치유 효과 상승|원촉","청등갑|피해 감소|방패병 치유 효과 상승|비호","사남패|치유 효과 받음|방패병 피해 감소|감림"],
    ["관우","호분관|강공, 기습 상승|창병 피해 가함|용맹","명광갑|무용 피해 가함|창병 배반, 공심 상승|치밀","치룡패|무용 피해 가함|창병 배반, 공심 상승|양렬"],
    ["황보숭","연함규|피해 감소|창병 치유 효과 상승|권어","청등갑|피해 감소|창병 피해 감소|통제","사남패|피해 감소|창병 피해 감소|천우"],
    ["장비","연함규|피해 감소|창병 피해 가함|위명","청등갑|피해 감소|창병 피해 감소|치밀","사남패|피해 감소|방패병 피해 감소|양렬"]
];

var masterEquipmentMap = {};
rawEqOverrides.forEach(r => {
    const h = r[1].split('|'), a = r[2].split('|'), c = r[3].split('|');
    masterEquipmentMap[r[0]] = {
        helmet: {name:h[0], attr1:h[1], attr2:h[2], attr3:h[3]},
        armor:  {name:a[0], attr1:a[1], attr2:a[2], attr3:a[3]},
        accessory: {name:c[0], attr1:c[1], attr2:c[2], attr3:c[3]}
    };
});

var masterHeroLookupMap = {};
heroDogamData.forEach(h => { if (h?.name) masterHeroLookupMap[cStr(h.name)] = h; });

var injectDogamStyles = () => {
    if (document.getElementById('dogam-custom-styles')) return;
    const style = document.createElement('style');
    style.id = 'dogam-custom-styles';
    style.innerHTML = `
        .dogam-card-item{background-color:var(--bg-card);border:1px solid var(--border-main);border-radius:6px;padding:15px 20px;cursor:pointer;transition:all .3s ease;position:relative;display:flex;flex-direction:column;justify-content:flex-start;box-sizing:border-box;min-height:180px;opacity:.45;filter:grayscale(100%)}
        .dogam-card-item.owned{background-color:var(--bg-panel);border-color:var(--success-text);box-shadow:0 4px 12px var(--success-bg);opacity:1;filter:grayscale(0%)}
        .dogam-card-item.wei{border-top:5px solid #2270b5} .dogam-card-item.shu{border-top:5px solid #b82d2d} .dogam-card-item.wu{border-top:5px solid #2a9d8f} .dogam-card-item.qun{border-top:5px solid #cd9b33}
        .dogam-card-item .d-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px solid var(--border-main);padding-bottom:8px; transition:border-color 0.3s;}
        .dogam-card-item .d-name{font-size:18px;font-weight:700;color:var(--text-muted);letter-spacing:1px; transition:color 0.3s;}
        .dogam-card-item.owned .d-name{color:var(--text-main)}
        .dogam-card-item .d-faction{font-size:11px;font-weight:700}
        .dogam-card-item.wei .d-faction{color:#2270b5} .dogam-card-item.shu .d-faction{color:#b82d2d} .dogam-card-item.wu .d-faction{color:#2a9d8f} .dogam-card-item.qun .d-faction{color:#cd9b33}
        .dogam-card-item .d-status{font-size:10px;padding:3px 6px;border-radius:4px;background-color:var(--bg-inner);color:var(--text-muted);font-weight:700;white-space:nowrap; transition:background-color 0.3s, color 0.3s;}
        .dogam-card-item.owned .d-status{background-color:var(--success-text);color:#fff}
        .dogam-card-item .d-meta{display:flex;gap:12px;font-size:11px;color:var(--text-desc);margin-bottom:4px; transition:color 0.3s;}
        .dogam-card-item .d-meta span{color:var(--text-highlight);font-weight:700}
        .dogam-card-item .d-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;background-color:var(--bg-inner);border:1px solid var(--border-main);border-radius:4px;padding:8px;margin:10px 0;font-size:11px; transition:background-color 0.3s, border-color 0.3s;}
        .dogam-card-item .d-equip{background-color:var(--bg-inner);border:1px solid var(--border-main);border-radius:4px;padding:8px;margin-bottom:8px;font-size:11px; transition:background-color 0.3s, border-color 0.3s;}
        .dogam-card-item .d-equip-title{color:var(--text-highlight);font-weight:700;margin-bottom:4px}
        .dogam-card-item .d-equip-list{display:flex;flex-direction:column;gap:3px;color:var(--text-desc); transition:color 0.3s;}
        .dogam-card-item .d-tactic{background-color:rgba(168,85,247,.08);border:1px solid #c084fc;border-left:3px solid #a855f7;border-radius:4px;padding:8px;margin-bottom:10px;font-size:11px}
        .dogam-card-item .d-tactic-title{color:#c084fc;font-weight:700;margin-bottom:4px}
        .dogam-card-item .d-tactic-list{display:flex;flex-direction:column;gap:3px;color:var(--text-desc); transition:color 0.3s;}
        .dogam-card-item .d-tactic-item{cursor:pointer}
        .dogam-card-item .d-tactic-item span{color:var(--text-main);font-weight:700;text-decoration:underline;text-underline-offset:2px; transition:color 0.3s;}
        .dogam-card-item .d-desc{background-color:var(--bg-inner);border:1px solid var(--border-main);border-radius:4px;padding:8px;font-size:11px;line-height:1.5;margin-top:auto; transition:background-color 0.3s, border-color 0.3s;}
        .dogam-card-item .d-desc-title{color:#38bdf8;font-weight:700;margin-bottom:3px}
        .dogam-card-item .d-desc-text{color:var(--text-desc);word-break:keep-all; transition:color 0.3s;}
    `;
    document.head.appendChild(style);
};

window.getAllOfficerNamesFromDogam = () => heroDogamData.map(h => h.name).sort((a, b) => a.localeCompare(b, 'ko'));

window.getOfficerDataFromDogam = function(officerName) {
    const target = masterHeroLookupMap[cStr(officerName)];
    return {
        role: target?.role || "보조, 버퍼",
        location: target?.location || "-",
        uniqueTactic: target?.skill || "고유 전법 누락",
        skillDesc: target?.skillDesc || "",
        unitSuitability: target?.unit || "정보 없음",
        faction: target?.group || "qun",
        stats: target?.stats || null
    };
};

window.getOfficerEquipmentFromDogam = function(officerName) {
    const cleanName = cStr(officerName);
    const target = masterHeroLookupMap[cleanName];
    if (!target) return null;

    let eq = masterEquipmentMap[cleanName] ? JSON.parse(JSON.stringify(masterEquipmentMap[cleanName])) : null;
    if (!eq) {
        const p = EQ_PRESETS[target.eq || 'PC'] || EQ_PRESETS['PC'];
        eq = {
            helmet: { name: p[0], attr1: p[1], attr2: p[2], attr3: p[3] },
            armor: { name: p[4], attr1: p[5], attr2: p[6], attr3: p[7] },
            accessory: { name: p[8], attr1: p[9], attr2: p[10], attr3: p[11] }
        };
    }
    const unitPrefix = target.unit?.split('/')[0] || "방패병";
    ['helmet', 'armor', 'accessory'].forEach(part => {
        ['attr1', 'attr2', 'attr3'].forEach(attr => {
            let val = eq[part][attr];
            if (val && val.match(/(창병|기병|궁병|방패병)/)) {
                eq[part][attr] = val.replace(/(창병|기병|궁병|방패병)\s*/g, `${unitPrefix} `);
            }
        });
    });
    return eq;
};

window.getOfficerRecommendedTacticsFromDogam = function(officerName) {
    const target = masterHeroLookupMap[cStr(officerName)];
    return target?.tacs || ["간담상조", "동장철벽"];
};

var currentDogamState = [];
var currentFactionFilter = 'all';

function loadDogamData() {
    let savedHeroes = [];
    try {
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) {
            const parsed = JSON.parse(rawData);
            if (parsed?.heroes && Array.isArray(parsed.heroes)) savedHeroes = parsed.heroes;
        }
    } catch (e) { console.error("장수 도감 데이터 로드 실패:", e); }

    const hMap = savedHeroes.reduce((acc, sh) => { if (sh?.name) acc[cStr(sh.name)] = sh; return acc; }, {});
    currentDogamState = heroDogamData.map(origin => {
        const found = hMap[cStr(origin.name)];
        return {
            name: origin.name, faction: origin.group, isOwned: !!found?.isOwned,
            star: found?.star !== undefined && found?.star !== null ? parseInt(found.star, 10) : 0,
            role: origin.role, location: origin.location, skill: origin.skill,
            skillDesc: origin.skillDesc, stats: origin.stats, unit: origin.unit, eq: origin.eq, tacs: origin.tacs
        };
    });
}

function saveDogamData() {
    try {
        let rootData = { heroes: [], tactics: [] };
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) rootData = JSON.parse(rawData);
        rootData.heroes = currentDogamState.map(h => ({ name: h.name, isOwned: h.isOwned, star: h.star }));
        localStorage.setItem('samguk_hobby_data', JSON.stringify(rootData));
    } catch (e) { console.error("장수 도감 세이브 실패:", e); }
}

function toggleOfficerOwnership(officerName) {
    const target = currentDogamState.find(h => h.name === officerName);
    if (target) { target.isOwned = !target.isOwned; saveDogamData(); renderDogamGrid(); }
}

window.filterCountry = function(faction) {
    currentFactionFilter = faction;
    document.querySelectorAll('.filter-bar .filter-btn').forEach(btn => {
        btn.classList.remove('active');
        const txt = btn.innerText.trim();
        if ((faction === 'all' && txt === '전체') || (faction === 'wei' && txt.includes('위')) ||
            (faction === 'shu' && txt.includes('촉')) || (faction === 'wu' && txt.includes('오')) ||
            (faction === 'qun' && (txt.includes('군') || txt.includes('군웅')))) btn.classList.add('active');
    });
    renderDogamGrid();
};

function renderDogamUI() {
    let nativeContainer = document.getElementById('hero-list') || document.getElementById('dogam-list') || document.getElementById('hero-container');
    if (!nativeContainer && !document.getElementById('samguk-dogam-wrapper')) return;

    let container = document.getElementById('samguk-dogam-wrapper');
    if (!container) {
        container = document.createElement('div');
        container.id = 'samguk-dogam-wrapper';
        container.style.cssText = 'width:100%;flex:1 1 100%;align-self:stretch;display:block;box-sizing:border-box;padding:10px 0;';
        if (nativeContainer) { nativeContainer.style.cssText = 'width:100%;flex:1 1 100%;align-self:stretch;display:block;'; nativeContainer.appendChild(container); }
        else document.body.appendChild(container);
    }

    container.innerHTML = `
        <div id="dogam-stats-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:2px solid var(--border-main);padding-bottom:10px;">
            <h2 style="color:var(--text-highlight);margin:0;font-size:22px;">장수 도감 마스터 보드</h2>
            <span id="dogam-count-badge" style="color:var(--text-muted);font-weight:bold;font-size:15px;">보유율: </span>
        </div>
        <div id="dogam-card-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:15px;width:100%;align-items:stretch;"></div>
    `;
    renderDogamGrid();
}

function renderDogamGrid() {
    const gridContainer = document.getElementById('dogam-card-grid');
    const countBadge = document.getElementById('dogam-count-badge');
    if (!gridContainer) return;

    const filteredHeroes = currentDogamState.filter(h => currentFactionFilter === 'all' || currentFactionFilter === '전체' || h.faction === currentFactionFilter);
    const ownedCount = filteredHeroes.filter(h => h.isOwned).length;
    if (countBadge) countBadge.innerHTML = `[${{wei:'위나라',shu:'촉나라',wu:'오나라',qun:'군진영'}[currentFactionFilter]||'전체'}] 보유율: <span style="color:#38bdf8;font-size:18px;">${ownedCount}</span> / ${filteredHeroes.length}`;

    gridContainer.innerHTML = filteredHeroes.map(hero => {
        const eq = window.getOfficerEquipmentFromDogam(hero.name);
        return `
            <div class="dogam-card-item ${hero.isOwned ? 'owned' : ''} ${hero.faction}" data-hero-name="${hero.name}">
                <div class="d-header">
                    <div class="d-name">${hero.name}</div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span class="d-faction">${{wei:'위나라',shu:'촉나라',wu:'오나라',qun:'군진영'}[hero.faction]||'전체'}</span>
                        <div class="d-status">${hero.isOwned ? '보유' : '미보유'}</div>
                    </div>
                </div>
                <div class="d-meta">
                    <div><span>역할:</span> ${hero.role}</div>
                    <div><span>배치:</span> ${hero.location}</div>
                    ${hero.unit && hero.unit !== "-" ? `<div><span>병종:</span> ${hero.unit}</div>` : ''}
                </div>
                ${hero.stats ? `<div class="d-stats"><div><span style="color:#ff9f43;margin-right:4px;">⚔️ 무용:</span><span style="color:var(--text-main);font-weight:bold;">${hero.stats.martial}</span></div><div><span style="color:#38bdf8;margin-right:4px;">🔮 모략:</span><span style="color:var(--text-main);font-weight:bold;">${hero.stats.tactical}</span></div><div><span style="color:#2ec4b6;margin-right:4px;">🛡️ 통솔:</span><span style="color:var(--text-main);font-weight:bold;">${hero.stats.command}</span></div><div><span style="color:#a855f7;margin-right:4px;">⚡ 속도:</span><span style="color:var(--text-main);font-weight:bold;">${hero.stats.speed}</span></div></div>` : ''}
                <div class="d-equip">
                    <div class="d-equip-title">🛠️ 추천 장비 및 세련 속성</div>
                    <div class="d-equip-list">
                        <div>🪖 <span style="color:var(--text-main);font-weight:bold;">${eq.helmet.name}</span> <span style="color:#38bdf8;">[${eq.helmet.attr1} / ${eq.helmet.attr2} / <span style="color:#f59e0b">${eq.helmet.attr3}</span>]</span></div>
                        <div>🛡️ <span style="color:var(--text-main);font-weight:bold;">${eq.armor.name}</span> <span style="color:#38bdf8;">[${eq.armor.attr1} / ${eq.armor.attr2} / <span style="color:#f59e0b">${eq.armor.attr3}</span>]</span></div>
                        <div>📿 <span style="color:var(--text-main);font-weight:bold;">${eq.accessory.name}</span> <span style="color:#38bdf8;">[${eq.accessory.attr1} / ${eq.accessory.attr2} / <span style="color:#f59e0b">${eq.accessory.attr3}</span>]</span></div>
                    </div>
                </div>
                <div class="d-tactic">
                    <div class="d-tactic-title">📜 추천 전법 (2~3번 슬롯)</div>
                    <div class="d-tactic-list">
                        <div class="d-tactic-item" onclick="event.stopPropagation();window.showTacticPopup&&window.showTacticPopup(event,'${hero.tacs[0]}')" title="클릭하여 전법 설명 보기">🔸 2번 슬롯: <span>${hero.tacs[0]}</span></div>
                        <div class="d-tactic-item" onclick="event.stopPropagation();window.showTacticPopup&&window.showTacticPopup(event,'${hero.tacs[1]}')" title="클릭하여 전법 설명 보기">🔸 3번 슬롯: <span>${hero.tacs[1]}</span></div>
                    </div>
                </div>
                <div class="d-desc">
                    <div class="d-desc-title">고유: ${hero.skill}</div>
                    <div class="d-desc-text">${hero.skillDesc}</div>
                </div>
            </div>`;
    }).join('');

    gridContainer.onclick = e => {
        const card = e.target.closest('.dogam-card-item');
        if (card) { const name = card.getAttribute('data-hero-name'); if (name) toggleOfficerOwnership(name); }
    };
}

function initDogamEngine() { injectDogamStyles(); loadDogamData(); renderDogamUI(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDogamEngine);
else initDogamEngine();

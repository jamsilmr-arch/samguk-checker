// [시스템 분석] tactic_dogam.js - 전법 도감 테마 동기화 및 100% 무손실 엔진 (법정, 심구고루, 애자필보 업데이트 완료)
console.log("[시스템 분석] tactic_dogam.js 고속 해시 맵 렌더러 기동 (전체 데이터 복원)");

var cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

// 🚨 [데이터 복원] 신규 전법 '심구고루', '애자필보' 포함 (총 80종)
var tacticDogamData = [
    { id: 't_gandam', name: '간담상조', type: '지휘 (100%)', target: '적군 전체, 아군 2팀', desc: '매 턴 시작 시, 60% 확률로 적군 전체가 가하는 무용 피해 및 모략 피해를 25% 감소시키며(통솔의 영향 받음, 같은 열에 적군 아군이 있을 경우 계수 20% 상승), 적군 대상 2명에게 나약을(를) 부여합니다(이번 턴 종료 시까지 지속). 이후 아군 대상 2명의 병력을 회복시킵니다(치료율 90%, 통솔의 영향 받음).' },
    { id: 't_gajeong', name: '가정지전', type: '추격 (35%)', target: '적군 1팀', desc: '일반 공격 후 공격 대상의 통솔을 10% 감소시키고 2턴 동안 지속하며 270% 모략 피해를 가합니다.' },
    { id: 't_gajeong_t', name: '강유겸제', type: '지휘 (50%)', target: '아군 전체', desc: '턴 시작 시 아군 전체가 받는 피해를 34% 감소시키고, 아군 중 무용이 가장 높은 목표가 받는 모략 피해를 17%, 모략이 가장 높은 목표가 받는 무용 피해를 17% 감소시킵니다(턴 종료시까지 지속).' },
    { id: 't_gyeonbul', name: '견불가최', type: '패시브 (100%)', target: '자신', desc: '자신이 받는 피해가 35% 감소합니다. 해제 불가. 일반 공격을 받은 후 35%의 확률로 아군 목표 1명의 디버프 상태를 1종류 해제합니다.' },
    { id: 't_gyeonjin', name: '견진연봉', type: '능동 (60%)', target: '자신, 아군 1팀', desc: '자신과 후열 아군 1명의 연격률이(가) 50% 증가하며 1턴간 지속되고, 1중첩의 저항을(를) 획득합니다.' },
    { id: 't_gonggi', name: '공기불비', type: '추격 (50%)', target: '적군 2팀', desc: '일반 공격 후, 적 2개 목표에게 130% 모략 피해를 가합니다.' },
    { id: 't_gwaha', name: '과하탁교', type: '추격 (50%)', target: '적군 1팀', desc: '일반 공격 후 공격 대상에게 150% 모략 피해를 가하고 50% 확률로 추가로 150% 모략 피해를 한 번 더 가합니다.' },
    { id: 't_gyochwi', name: '교취호탈', type: '능동 (35%)', target: '적군 2팀', desc: '적군 2개 대상에게 185% 무용 피해를 가하고 70% 확률로 보급 차단을 부여하며 2턴 지속합니다.' },
    { id: 't_geukjeok', name: '극적제승', type: '능동 (50%)', target: '적군 2팀', desc: '적군 중 무용이 가장 높은 대상과 통솔이 가장 낮은 대상에게 135% 모략 피해를 가합니다.' },
    { id: 't_geumnang', name: '금낭묘계', type: '지휘 (100%)', target: '아군 전체', desc: '첫 3턴 내 매 턴 시작 시, 아군 전체의 연격률을 각각 30% > 20% > 10%만큼 감소시키고, 턴 종료 시 아군 중 병력이 가장 낮은 대상의 병력을 회복함(치료율 55%, 모략의 영향).' },
    { id: 't_geumjeok', name: '금적금왕', type: '능동 (35%)', target: '적군 전체', desc: '적 전체에게 180%의 모략 피해를 입힙니다. 목표가 후열일 경우, 추가로 50%의 모략 피해를 입힙니다.' },
    { id: 't_geumchang', name: '금창신', type: '지휘 (100%)', target: '자신, 아군 1팀', desc: '전투 시작 시, 자신은전투 첫 3턴동안 받는 피해가 30% 감소하고 해제 불가입니다. 아군 모략이 가장 높은 대상에게 "신산" 부여: 일반 공격 후, 50% 확률로 대상에게 130% 모략 피해를 가함.' },
    { id: 't_geumcheol', name: '금철교명', type: '패시브 (50%)', target: '적군 1팀', desc: '일반 공격 또는 반격 후, 공격 대상의 아군 1개 대상에게 이번 피해의 160%에 해당하는 확산 피해를 가합니다.' },
    { id: 't_gimun', name: '기문둔갑', type: '능동 (50%)', target: '적군 2팀', desc: '적군 2개 대상의 무용·모략·통솔을 15% 감소하고 2턴 지속합니다.' },
    { id: 't_nakjeong', name: '낙정하석', type: '능동 (50%)', target: '적군 1팀', desc: '적 1명에게 216%의 모략 피해를 입힙니다. 대상이 디버프를 보유 중이면 해당 피해 계수가 54% 증가합니다.' },
    { id: 't_donggu', name: '동구적개', type: '지휘 (100%)', target: '아군 2팀', desc: '전투 전 4턴 동안, 자신 및 아군 1개 대상의 받는 피해 36% 감소하고 해제 불가입니다.' },
    { id: 't_dongjang', name: '동장철벽', type: '능동 (50%)', target: '아군 전체', desc: '아군 전체에게 저항과 통어를 각 1중첩 부여하고 2턴 지속합니다.' },
    { id: 't_dongchok', name: '동촉기선', type: '능동 (50%)', target: '자신, 적군 2팀', desc: '자신의 간파 20% 증가하고 2턴 지속되며 적군 2개 대상에게 105% 모략 피해를 가합니다.' },
    { id: 't_manbu', name: '만부막적', type: '추격 (50%)', target: '적군 전체, 자신', desc: '일반 공격 후, 적군 전체에게 105% 무용 피해를 가하고 자신의 가하는 무용 피해를 5% 증가시키며 최대 4중첩, 해제 불가, 전투 종료까지 지속합니다.' },
    { id: 't_manjeon', name: '만전제발', type: '능동 (50%)', target: '적군 전체', desc: '적군 전체에게 115% 무용 피해를 가하고 50% 확률로 적군 1개 대상(우선 후열)에게 추가로 115% 무용 피해를 가합니다.' },
    { id: 't_mancheon', name: '만천과해', type: '능동 (70%)', target: '아군 2팀', desc: '자신 및 전열의 아군 대상 1명에게 병력을 회복하고(치료율 80%, 모략의 영향 받음), 받는 무용 피해와 모략 피해가 15% 감소합니다(모략의 영향 받음). 2턴 지속.' },
    { id: 't_myeongchal', name: '명찰추호', type: '능동 (50%)', target: '자신, 적군 2팀', desc: '자신의 간파이(가) 20% 상승하며(2턴 지속), 적군 대상 2명에게 130% 모략 피해를 입힙니다. 이후 50% 확률(모략의 영향 받음)로 적군 중 무용이 가장 높은 대상에게 65% 모략 피해를 입히며, 대상의 통솔이 자신보다 높을 경우 피해 계수가 30% 상승합니다.' },
    { id: 't_munchi', name: '문치무공', type: '능동 (70%)', target: '아군 2팀', desc: '아군 중 무용이 가장 높은 대상의 무용 증가(문치무공 발동자 무용의 10%만큼 증가), 강공 피해 20% 증가, 2턴 동안 지속됩니다. 또한 아군 중 모략이 가장 높은 대상의 모략 증가(문치무공 발동자 모략의 10%만큼 증가), 치료 효과 25% 증가, 2턴 동안 지속됩니다.' },
    { id: 't_miu', name: '미우주무', type: '능동 (50%)', target: '아군 1팀', desc: '아군 중 통솔이 가장 높은 1개 대상의 받는 피해를 25% 감소시켜 2턴 지속하고 해당 대상의 병력을 회복(치료율 40%, 모략 영향)합니다.' },
    { id: 't_bangaek', name: '반객위주', type: '패시브 (100%)', target: '자신, 적군 1팀', desc: '무용 피해를 가한 후 자신의 무용 피해가 8% 상승하여 최대 4중첩되고 해제 불가이며, 중첩이 모두 쌓인 경우 대상에게 130% 추가 무용 피해 입힙니다. 모략 피해를 가한 후 자신의 모략 피해가 8% 상승하여 최대 4중첩되고 해제 불가이며, 중첩이 모두 쌓인 경우 대상에게 130% 추가 모략 피해 입힙니다. 해당 피해 효과는 매 턴 최대 2회 발동.' },
    { id: 't_byeongryang', name: '병량촌단', type: '추격 (35%)', target: '적군 1팀', desc: '일반 공격 후, 일반 공격 대상에게 280% 무용 피해를 가하며 50% 확률로 허약을 2턴 부여합니다.' },
    { id: 't_budong', name: '부동여산', type: '패시브 (100%)', target: '자신, 적군 1팀', desc: '무장의 고유 능동 전법 발동률이 10% 상승하고, 자신의 통솔이 무용의 15%만큼 상승합니다(해제 불가). 능동 전법으로 피해를 입힌 후, 적군 대상 1명에게 180%의 추가 무용 피해를 입히며, 자신의 통솔이 대상보다 높을 경우 피해 계수가 70% 상승하고, 매 턴 최대 1회 발동합니다.' },
    { id: 't_bunseong', name: '분성지계', type: '능동 (70%)', target: '적군 전체', desc: '적군 전체에게 화상(행동 시작 시 20% 추가 모략 피해 입음)을 부여하고 대상이 가하는 피해를 20% 감소시키며(모략의 영향을 받음) 2턴 간 지속됩니다.' },
    { id: 't_bisa', name: '비사주석', type: '추격 (35%)', target: '적군 1팀', desc: '일반 공격 후 일반 공격 대상에게 220% 무용 피해를 가하며 50% 확률로 겁전을 1턴 부여합니다.' },
    { id: 't_samyeon', name: '사면초가', type: '능동 (50%)', target: '적군 1팀', desc: '적군에게 67% 무용 피해를 4회 가하며, 매 회 대상은 독립적으로 선택됩니다.' },
    { id: 't_sasaeng', name: '사생취의', type: '패시브 (100%)', target: '자신', desc: '내가 받는 피해가 10% 상승하고 가하는 피해가 45% 상승하며 해제 불가입니다.' },
    { id: 't_seondeung', name: '선등함진', type: '능동 (50%)', target: '적군 전체', desc: '적 전체에게 100%의 무용 피해를 입히고, 35%의 확률로 겁전 부여, 1턴 지속합니다. 각 목표별 확률은 독립적으로 계산됩니다.' },
    { id: 't_susang', name: '수상개화', type: '패시브 (100%)', target: '자신', desc: '무장 고유의 능동 전법 발동 확률이 12% 증가하며 해제 불가합니다. 매 턴 시작 시, 자신이 가하는 피해가 12% 증가하며, 최대 4회 중첩되고 해제 불가합니다.' },
    { id: 't_sunsu', name: '순수견양', type: '능동 (50%)', target: '적군 2팀, 아군 2팀', desc: '2턴 동안 적군 2명이 가하는 피해를 15% 감소(모략의 영향을 받음)시키고, 50% 확률로 무장 해제를 부여하여 1턴간 지속시킵니다. 이후 아군 2명의 병력을 회복시킵니다(치료율 90%, 모략의 영향을 받음).' },
    { id: 't_seungseung', name: '승승장구', type: '능동 (50%)', target: '자신, 적군 2팀', desc: '자신에게 용맹 및 신속을 부여하며 2턴 간 지속됩니다. 적군 대상 2명에게 140% 무용 피해를 입히며, 만약 속도가 대상보다 높을 경우 피해 계수가 40% 상승합니다.' },
    { id: 't_simgu', name: '심구고루', type: '지휘 (100%)', target: '적군 전체, 아군 2팀', desc: '첫 2턴 동안 매 턴 시작 시, 100% 확률로 자신 및 후열 아군 대상 1명의 병력을 회복시키며(치료율 140%, 모략 영향), 받는 피해를 30% 감소시킵니다(모략 영향). 또한 적군 전체에게 도발을 부여합니다(턴 종료 시까지 지속). 제3턴 시작 시, 발동 확률이 50%로 감소합니다.' },
    { id: 't_simmo', name: '심모원려', type: '추격 (50%)', target: '자신, 적군 1팀', desc: '일반 공격 후 자신의 모략 피해가 5% 상승하며 최대 4중첩, 해제 불가이며 일반 공격 대상에게 240% 모략 피해 가합니다.' },
    { id: 't_aeja', name: '애자필보', type: '지휘 (100%)', target: '아군 전체', desc: '턴 시작 시, 60% 확률(모략 영향)로 자신이 받는 무용 및 모략 피해를 30% 감소시키고 아군 전체에게 절반의 효과를 부여하며, 이후 30% 확률로 적군 1명에게 제어 효과 1개(겁전, 피곤)를 부여합니다. 또한 35% 확률(모략 영향)로 통솔이 가장 낮은 아군에게 축세 1중첩을 부여합니다.' },
    { id: 't_anyoung', name: '안영찰채', type: '지휘 (100%)', target: '적군 2팀, 아군 전체', desc: '매 턴 시작 시 70% 확률로 아군 전체의 병력을 회복시키고(치료율 80%, 모략의 영향 받음), 아군 전체가 행동하기 전 받는 피해를 20% 감소시킵니다(대상의 모략이 무용보다 높을 경우 계수 30% 상승). 이후 30% 확률로 적군 전열에 피곤을 부여.' }, 
    { id: 't_amjeon', name: '암전난방', type: '능동 (50%)', target: '자신, 적군 1팀', desc: '자신의 강공 30% 증가하고 2턴 지속하며 적군 대상 1명에게 220% 무용 피해를 가합니다. 대상이 전열일 경우 피해 계수가 110% 상승합니다.' },
    { id: 't_yangui', name: '양의화생', type: '능동 (50%)', target: '자신, 적군 2팀', desc: '자신에게 2턴 동안 다모를 부여합니다. 적군 대상 2명에게 160%의 모략 피해를 입힙니다. 대상의 무용이 모략보다 높을 경우 피해 계수가 20% 상승합니다. 반대로 대상의 모략이 더 높을 경우 입힌 피해의 30%만큼 자신의 병력을 회복합니다.' },
    { id: 't_yangcho', name: '양초선행', type: '능동 (50%)', target: '아군 1팀', desc: '아군 중 병력이 가장 낮은 대상의 병력을 회복(치료율174%, 모략 영향)하고 해당 대상의 병력이 60% 미만이면 치료 계수 58% 증가합니다.' },
    { id: 't_yeoja', name: '여자동포', type: '능동 (50%)', target: '아군 2팀', desc: '아군 대상 2명에게 저항 및 불굴 1중첩을 부여합니다. 피해를 입은 후 병력을 회복하며(치료율 120%, 모략 영향, 최대 2회 발동), 2턴간 지속됩니다. 이후 50% 확률로 아군 중 병력이 가장 낮은 대상에게 동일한 저항 및 불굴을 다시 부여합니다.' },
    { id: 't_yosa', name: '요사여신', type: '패시브 (100%)', target: '자신', desc: '자신의 기습이 30% 상승하고 매번 모략 피해를 가한 후 자신이 가하는 모략 피해가 11% 상승하며 최대 4회 중첩, 해제 불가, 전투 종료까지 지속합니다.' },
    { id: 't_yongmaeng', name: '용맹무쌍', type: '패시브 (100%)', target: '자신, 적군 1팀', desc: '강공이 25% 상승하며(무용 영향), 해제할 수 없습니다. 무용 피해를 입힌 후, 70% 확률로 적군 1개 대상에게 40% 추가 무용 피해를 입힙니다. 자신의 행동 시 발동될 경우 피해 계수가 40% 상승하며, 매 턴 최대 4회 발동됩니다.' },
    { id: 't_yongwang', name: '용왕직전', type: '추격 (50%)', target: '자신, 적군 2팀', desc: '일반 공격 후 자신에게 용맹 상태를 2턴간 부여합니다. 그 후 적 목표 2명에게 115%의 무용 피해를 입힙니다. 자신의 무용이 목표보다 높을 경우 피해 계수가 27% 증가합니다.' },
    { id: 't_unju', name: '운주유악', type: '지휘 (100%)', target: '아군 전체', desc: '전투 전 3턴 동안 매 턴 시작 시, 아군 전체의 연격률을 40% 증가시키고 90% 확률로 아군 1개 대상에게 통찰을 부여하여 턴 종료까지 지속합니다.' },
    { id: 't_wonseong', name: '원성재도', type: '능동 (35%)', target: '적군 1팀', desc: '적군 1개 대상의 받는 피해를 30% 증가시켜 2턴 지속하며 해당 대상에게 155% 모략 피해를 가합니다.' },
    { id: 't_wiwi', name: '위위구조', type: '추격 (50%)', target: '적군 2팀, 아군 2팀', desc: '일반 공격 후 적군 대상 2명이 가하는 피해가 10% 감소하고 최대 4중첩되고 해제 불가이며 2턴 간 지속됩니다. 이어 아군 대상 2명의 병력을 회복(치료율 165%, 통솔의 영향 받음)시키고 40% 확률로 면역 1중첩 부여.' },
    { id: 't_yujwa', name: '유좌유용', type: '지휘 (50%)', target: '아군 전체', desc: '턴 시작 시, 아군 전체에 불굴 상태를 부여합니다: 피해를 입은 후 병력 회복(치료율 90%, 모략의 영향을 받음), 턴 종료까지 지속, 매 턴 최대 3회 발동.' },
    { id: 't_igan', name: '이간계', type: '능동 (35%)', target: '적군 1팀', desc: '적 1개 대상에게 250% 모략 피해 가하고 80% 확률로 혼란을 부여하며 1턴 지속됩니다.' },
    { id: 't_iahwan', name: '이아환아', type: '패시브 (50%)', target: '적군 1팀', desc: '피해를 받은 후 피해 출처에 132% 추가 무용 피해를 가하며(통솔의 영향) 매 턴 최대 4회 발동합니다.' },
    { id: 't_iil', name: '이일대로', type: '능동 (50%)', target: '적군 2팀', desc: '적군 2개 대상의 가하는 피해 16% 감소하고 50% 확률로 무기력을 부여하며 2턴 지속합니다.' },
    { id: 't_itoe', name: '이퇴위진', type: '지휘 (50%)', target: '자신, 아군 1팀', desc: '매 턴 시작 시, 자신과 후열의 아군 대상 1명에게 저항 1중첩을 부여합니다. 자신이 받는 피해가 16% 감소하고, 후열 아군 대상 1명이 가하는 피해가 16% 증가하며, 효과는 턴 종료시까지 지속됩니다.' },
    { id: 't_ilgo', name: '일고작기', type: '패시브 (100%)', target: '자신', desc: '자신의 연격률이 60% 상승하고 가하는 피해가 12% 상승하며 해제 불가입니다.' },
    { id: 't_inse', name: '인세이도', type: '패시브 (100%)', target: '자신', desc: '받는 피해 21% 감소, 해제 불가. 자신의 행동 시작 시, 다음 효과 중 1개 발동: 자신에게 장벽 3중첩 부여, 또는 자신의 병력 회복(치료율 60%, 가장 높은 속성의 영향).' },
    { id: 't_jangsu_j', name: '전위위안', type: '패시브 (100%)', target: '자신, 아군 1팀', desc: '자신의 통솔이 모략의 15%만큼 상승하며, 해제 불가. 매 턴 최초로 피해를 받은 후, 50%(모략의 영향 받음)의 확률로 자신에게 저항을(를) 1중첩 부여하고, 자신 및 아군 대상 1명의 병력을 회복시키며(치료율 120%, 모략 영향), 디버프 1개 해제.' },
    { id: 't_jegon', name: '제곤부위', type: '지휘 (100%)', target: '아군 2팀', desc: '매 턴 행동 시, 자신과 아군 1개 대상의 병력을 회복(치료율 70%, 통솔의 영향)합니다.' },
    { id: 't_jungjeong', name: '중정기고', type: '능동 (35%)', target: '아군 전체', desc: '아군 전체의 병력을 회복(치료율 150%, 모략 영향)합니다.' },
    { id: 't_jiin', name: '지인선임', type: '능동 (35%)', target: '적군 전체', desc: '적군 전체에게 168% 모략 피해를 가하고 자신의 모략이 대상보다 높으면 해당 피해 계수가 42% 증가합니다.' },
    { id: 't_jintoe', name: '진퇴유도', type: '지휘 (100%)', target: '적군 전체, 아군 전체', desc: '홀수 턴 시작 시, 적군 전체가 가하는 무용 및 모략 피해 30% 감소(통솔의 영향 받음), 턴 종료 시까지 지속됩니다. 짝수 턴 시작 시, 아군 전체가 가하는 무용 및 모략 피해 15% 증가(통솔의 영향 받음), 턴 종료 시까지 지속됩니다.' },
    { id: 't_jinhwa', name: '진화타겁', type: '능동 (35%)', target: '적군 전체', desc: '적군 전체에게 115% 무용 피해를 가하고 70% 확률로 허약을 부여하며 2턴 지속합니다.' },
    { id: 't_jilpung', name: '질풍노도', type: '능동 (70%)', target: '자신, 적군 2팀', desc: '자신의 파갑 15% 상승(무용의 영향 받음), 2턴 동안 지속됩니다. 동시에 적군 대상 2명에게 110%의 무용 피해를 입힙니다. 40%의 확률(무용의 영향 받음)로 무용이 가장 낮은 적군 대상에게 110%의 무용 피해를 추가로 입힙니다.' },
    { id: 't_cheonri', name: '천리추격', type: '추격 (50%)', target: '자신, 적군 2팀', desc: '일반 공격 후, 자신 추격 전법 발동률 3% 증가, 추격 전법 가하는 피해 6% 증가, 최대 3중첩, 해제 불가, 전투 종료 시까지 지속됩니다. 또한 적군 대상 2명에게 130% 모략 피해를 입힙니다.' },
    { id: 't_cheonsi', name: '천시지리', type: '능동 (50%)', target: '아군 전체', desc: '아군 전열이 받는 무용 피해를 22% 감소시키고 후열이 받는 모략 피해를 22% 감소시켜 2턴 동안 지속합니다.' },
    { id: 't_checheon', name: '체천행도', type: '패시브 (100%)', target: '자신, 적군 2팀', desc: '자신의 공심이(가) 20% 증가합니다. 해제 불가. 추격 피해를 입힐 시, 50%의 확률로 목표의 아군 2명에게 65%의 확산 피해를 입힙니다.' },
    { id: 't_chukse', name: '축세대발', type: '능동 (50%)', target: '자신, 적군 2팀', desc: '자신이 가하는 무용 피해 20% 증가하고 2턴 지속하며 적군 2개 대상에게 130% 무용 피해 가합니다.' },
    { id: 't_chukho', name: '축호과간', type: '패시브 (100%)', target: '적군 1팀, 자신', desc: '피해를 입은 후, 피해 시전자에게 \'적의\'를 부여합니다(중첩당 대상의 통솔 4% 감소). 또한 자신의 통솔이 4% 증가하며, 최대 5중첩, 턴 종료 시까지 지속됩니다. 자신의 행동 시, 70% 확률로 자신의 병력 회복(치료율 240%, 통솔 영향), \'적의\' 중첩이 가장 높은 적군에게 200% 무용 피해 및 가장 낮은 적군에게 멸시 부여(1턴).' },
    { id: 't_taecheong', name: '태청단경', type: '패시브 (50%)', target: '아군 2팀', desc: '피해를 입은 후, 아군 2명의 병력을 회복하고(치율 45%, 모략에 영향받음), 50%의 확률로 디버프 1개를 해제합니다. 매 턴 최대 5회 발동합니다.' },
    { id: 't_tojeok', name: '토적격문', type: '능동 (80%)', target: '적군 전체, 자신', desc: '적군 전체에 도발효과를 부여하고 자신이 받는 일반 공격 피해를 40% 감소시키며 2턴 지속합니다.' },
    { id: 't_hyeonho', name: '현호제세', type: '능동 (50%)', target: '아군 2팀', desc: '아군 2명의 디버프 1개를 해제하고, 병력을 회복합니다(치료율 155%, 통솔에 영향받음).' },
    { id: 't_horyeong', name: '호령삼군', type: '패시브 (100%)', target: '자신', desc: '피해를 가한 후 자신의 배반과 공심이 4% 상승하고 강공과 기습이 4% 상승하며 최대 6회 중첩, 해제 불가, 전투 종료까지 지속합니다.' },
    { id: 't_hochi', name: '호치', type: '능동 (60%)', target: '적군 2팀, 자신', desc: '적군 대상 2명의 통솔을 7% 탈취하고 200% 무용 피해를 입힙니다(전열일 경우 피해 계수 40% 증가). 입힌 피해의 20%만큼 자신의 병력을 회복하며, 확률적으로 쟁패 획득 및 피곤을 부여합니다.' },
    { id: 't_horyeong_m', name: '혼수모어', type: '지휘 (70%)', target: '적군 1팀, 아군 2팀', desc: '턴 시작 시 적 1명에게 혼란 상태를 부여하고(턴 종료 시까지 지속), 아군 2명의 병력을 회복합니다(치료율 150%, 모략의 영향 받음).' },
    { id: 't_hongsu', name: '홍수첨향', type: '지휘 (50%)', target: '아군 2팀', desc: '턴 시작 시, 자신의 병력을 회복하고(치율 190%, 통솔의 영향을 받음), 자신이 받는 피해가 30% 감소합니다(통솔의 영향을 받음). 턴 종료 시까지 지속되며, 아군 대상 1명에게 치료 및 받는 피해 감소 효과의 절반을 부여합니다.' },
    { id: 't_hwaso', name: '화소적벽', type: '능동 (50%)', target: '적군 전체', desc: '적 전체에게 화상효과를 부여(행동 시작 시 35% 추가 모략 피해를 받음)하고 2턴 지속하며 102% 모략 피해를 가합니다.' },
    { id: 't_hujeok', name: '후적박발', type: '패시브 (100%)', target: '자신, 적군 1팀', desc: '적군의 제어기(침묵/겁전)를 무시하고 턴 종료 시 무작위 적군 1명에게 강력한 모략 피해를 확정적으로 가합니다. 전투가 지속될수록 피해 계수가 상승합니다.' },
    { id: 't_hoengso', name: '횡소천군', type: '능동 (35%)', target: '적군 2팀', desc: '적군 2개 대상에게 30% 무용 피해를 가하고 출혈 부여(행동 시작 시 65% 추가 무용 피해 받음)하며 2턴 지속합니다.' },
    { id: 't_hoengjing', name: '횡징폭렴', type: '지휘 (100%)', target: '적군 전체, 아군 전체', desc: '전투 첫 2턴 동안 적군 전체의 가하는 피해 36% 감소하고 해제 불가이며 3턴 종료 시 아군 전체를 치료(치료율 140%, 통솔 영향)합니다.' },
    { id: 't_huyang', name: '휴양생식', type: '능동 (35%)', target: '아군 2팀', desc: '아군 2개 대상의 병력을 회복(치료율 165%, 모략 영향)하고 해당 대상에게 통찰을 부여하며 1턴 지속합니다.' }
];

var TACTIC_MASTER_DESC = {
    "재주복주": { role: "지휘 (100%)", target: "아군 2명", desc: "매 턴 아군 2명 치료(치료율 68%, 모략 영향) 및 10% 확률로 대상에게 허약 상태 부여(1턴 지속). 자신이 주장일 시 허약 부여 확률 15%로 상승." },
    "연인노호": { role: "패시브 (100%)", target: "적군 전체", desc: "전투 2, 4턴에 적군 전체에게 무용 피해(계수 104%)를 가하고, 대상이 무장해제 상태일 경우 50% 확률로 통솔 50 감소(2턴 지속). 주장일 시 통솔 감소 효과가 겁전 상태 대상에게도 적용." },
    "무성": { role: "액티브 (35%)", target: "적군 전체", desc: "1턴 준비 후 적군 전체에게 맹렬한 무용 피해(계수 146%)를 가하고, 50% 확률로 대상에게 무장해제 또는 겁전 상태 부여(1턴 지속). 또한 자신이 가하는 무용 피해 36% 증가(2턴 지속)." },
    "응시낭고": { role: "능동 (60%)", target: "자신", desc: "자신의 모략과 통솔이 증가하며(최대 6회 중첩), 중첩이 모두 쌓이면 저항을 획득합니다. 이후 적군 2명에게 모략 피해를 가합니다." },
    "함진살적": { role: "패시브 (100%)", target: "자신", desc: "일반 공격 후 대상에게 추가 무용 피해(계수 188%)를 가하며, 해당 타격은 대상의 통솔을 일정 비율 무시. 주장의 타격 우선권이 대폭 상승." },
    "초선차전": { role: "액티브 (40%)", target: "아군 다수", desc: "아군 2명의 제어 상태를 모두 해제하고, 피해를 입을 때마다 일정 비율로 병력을 회복하는 상태 부여(2턴 지속)." },
    "칠진칠출": { role: "패시브 (100%)", target: "자신", desc: "전투 중 자신은 모든 제어 상태에 면역(통찰)되며, 무용, 모략, 속도, 통솔 속성이 40 증가. 자신이 주장일 경우 증가 수치가 50으로 상승." },
    "천하무쌍": { role: "액티브 (35%)", target: "적군 단일", desc: "적군 단일에게 일기토를 신청하여 서로 일반 공격을 3회 주고받음. 일기토 중 자신은 제어에 면역되고 받는 피해가 감소하며, 일반 공격 후 추격 전법 정상 발동." },
    "경달권변": { role: "능동 (65%)", target: '적군 단체', desc: '적군 단체에 혼란 효과를 부여하고 강력한 모략 피해를 가합니다.' },
    "산무유책": { role: "능동 (50%)", target: '적군 전체', desc: '적군 전체에 모략 피해를 가하고 가하는 피해를 감소시킵니다.' },
    "거중지중": { role: "능동 (50%)", target: '아군 전체', desc: '아군 전체가 받는 피해를 상시 억제하고 병력을 지속 회복시킵니다.' },
    "분용당선": { role: "능동 (70%)", target: '적군 전열', desc: '적군 전열에 강력한 무용 피해를 가하고 자신에게 허약을 부여합니다.' },
    "축호과간": { role: "패시브 (100%)", target: '적군 1팀', desc: '아군 주장이 일반 공격을 받을 시 대신 매서운 반격 무용 피해를 가합니다.' },
    "호치": { role: "능동 (60%)", target: '적군 2팀, 자신', desc: '적군 대상 2명의 통솔을 7% 탈취하고 200% 무용 피해를 입힙니다(전열일 경우 피해 계수 40% 증가). 입힌 피해의 20%만큼 자신의 병력을 회복하며, 확률적으로 쟁패 획득 및 피곤을 부여합니다.' },
    "십면매복": { role: "추격 (50%)", target: '적군 단체', desc: '일반 공격 후 디버프 상태인 적에게 추가 모략 피해를 입힙니다.' },
    "군령여산": { role: "지휘 (100%)", target: '아군 전체', desc: '아군 전체의 가하는 피해를 통솔에 비례하여 영구 증폭시킵니다.' },
    "효웅": { role: "지휘 (100%)", target: '아군 전체', desc: '부대 내 아군이 가하는 모든 피해의 일정 비율을 흡수하여 치료합니다.' },
    "교변병기": { role: "지휘 (100%)", target: '아군 전체', desc: '전투 시작 시 아군 전체의 전법 발동 확률을 유의미하게 끌어올립니다.' },
    "발시담정": { role: "패시브 (50%)", target: '적군 전체', desc: '피해를 입을 때마다 일정 확률로 적군 전체에 즉각 반격을 가합니다.' },
    "충용": { role: "능동 (50%)", target: '적군 전체', desc: '적군 전체에 무용 피해를 입히고 확률적으로 제어 불가를 부여합니다.' },
    "담대여두": { role: "추격 (50%)", target: '적군 단체', desc: '일반 공격 후 적의 스탯을 빼앗아 자신에게 흡수 누적시킵니다.' },
    "습참": { role: "능동 (35%)", target: '적군 단체', desc: '적군 단체에 피해를 입히고 가하는 피해량을 일정 비율 차단합니다.' },
    "출수법": { role: "패시브 (100%)", target: '적군 다수', desc: '자신의 일반 공격 피해를 주위 적들에게 확산 전이시킵니다.' },
    "절절학문": { role: "지휘 (100%)", target: '아군 전체', desc: '아군이 능동 전법을 발동할 때마다 아군 전체의 공격력을 증폭합니다.' },
    "만왕": { role: "추격 (35%)", target: '적군 단체', desc: '일반 공격 후 대상을 변칙적인 공황 및 약화 상태로 빠뜨립니다.' },
    "실병제위": { role: "패시브 (70%)", target: '자신', desc: '준비 턴이 필요한 능동 전법의 대기 시간을 확률적으로 즉시 삭제합니다.' },
    "인정": { role: "지휘 (100%)", target: '아군 전체', desc: '매 턴 아군 전체의 병력을 안정적으로 정량 회복시키고 속성을 높입니다.' },
    "적혈도": { role: "패시브 (100%)", target: '자신', desc: '자신의 전법 크리티컬(회심) 확률을 상시 임계점 이상으로 유지합니다.' },
    "묘산천기": { role: "지휘 (100%)", target: '아군 전체', desc: '전투 첫 3턴 동안 아군 전체가 가하는 전법 피해를 강제로 폭증시킵니다.' },
    "정수유심": { role: "지휘 (100%)", target: '아군 전체', desc: '아군 전체가 받는 피해의 일부를 적 시전자에게 즉각 반사 유도합니다.' },
    "탑상책": { role: "지휘 (100%)", target: '아군 단체', desc: '자신의 속성 절반을 아군에게 양도하고 병력이 낮은 아군을 집중 보호합니다.' },
    "화용욕모": { role: "능동 (70%)", target: '적군 단체', desc: '적군 단체의 방어선을 완전 해제하고 아군의 전법 발동률을 보정합니다.' },
    "강동맹호": { role: "지휘 (100%)", target: '적군 전체', desc: '적군 전체에 도발을 시전하여 모든 일반 공격을 자신에게 강제 집중시킵니다.' },
    "웅거": { role: "지휘 (100%)", target: '자신', desc: '아군이 일반 공격을 행할 때마다 자신에게 연격, 통찰 등의 영웅 버프를 중첩합니다.' },
    "효희": { role: "능동 (50%)", target: '적군 다수', desc: '자신에게 걸린 버프 개수에 비례하여 무용 타격 횟수와 화력이 증가합니다.' },
    "강동패주": { role: "능동 (50%)", target: '적군 단체', desc: '일반 공격 시 확률적으로 파괴적인 연타 피해를 입히고 병력을 흡혈합니다.' },
    "겸권상계": { role: "지휘 (100%)", target: '아군 전체', desc: '오나라 진영 무장들과 결선 시 아군 전체의 전술 스탯을 최대치로 개방합니다.' },
    "백의도강": { role: "지휘 (100%)", target: '아군 전체', desc: '전투 첫 턴에 아군 전체에 도피를 부여하고 무용/모략 차단 제어를 독립 연산합니다.' },
    "지변규려": { role: "추격 (50%)", target: '적군 단체', desc: '일반 공격 후 대상에게 화상을 입히고 이미 화상 상태면 폭발 확산 피해를 줍니다.' },
    "청백충근": { role: "능동 (60%)", target: '아군 주장', desc: '아군 주장이 모략 크리티컬 확률을 증폭하고 피해를 대신 숄더링합니다.' },
    "봉화연천": { role: "패시브 (80%)", target: '적군 전체', desc: '자신이 신산 버프를 획득할 때마다 적 전체에 광역 신성 모략 불화살을 투하합니다.' },
    "청라산개": { role: "지휘 (100%)", target: '아군 주장', desc: '아군 주장이 입는 치명상을 대신 유기적으로 흡수하고 주장의 공격력을 높입니다.' },
    "칠척사모": { role: "지휘 (100%)", target: '적군 단체', desc: '피해를 입으면 자신에게 걸린 디버프를 세척하고 적 전체 중 1명에게 공포를 부여합니다.' },
    "요원지화": { role: "능동 (50%)", target: '적군 전체', desc: '자신의 병력을 일정량 소모하여 적군 전체에 확정적 강한 화상 피해를 가합니다.' },
    "위진새북": { role: "패시브 (100%)", target: '자신', desc: '턴 시작 시 확률적으로 무용과 속도를 증폭하고 액티브 타격 후 속도 비례 확산 피해를 입힙니다.' },
    "전권난정": { role: "지휘 (100%)", target: '적/아군 전체', desc: '매 턴 자신의 무용을 증폭시키며 후반 라운드 진입 시 적과 아군 전체를 무차별 난사 공격합니다.' },
    "효장": { role: "능동 (50%)", target: '적군 단체', desc: '적 단체에 고배율 무용 참격 충격을 가하고 1턴간 확정적 공포 제어 상태로 격리합니다.' },
    "태평경": { role: "지휘 (70%)", target: '적군 전체', desc: '매 턴 고정 확률로 적군 전체에 수공 상태를 걸어 지속적인 내구도 붕괴 모략 피해를 줍니다.' },
    "사소도": { role: "지휘 (100%)", target: '아군 전체', desc: '매 턴 아군 전체의 통솔력을 누적 증폭시키며 가하는 광역 무용 화살 피해 화력을 보정합니다.' },
    "황천당립": { role: "능동 (50%)", target: '적군 전체', desc: '1턴 준비 후 적 전체에 강력한 천벌 벼락 모략 타격을 5회 연쇄적으로 내리꽂습니다.' },
    "천의난위": { role: "능동 (50%)", target: '적군 단체', desc: '적군의 속성을 흡수하여 아군에게 공유하고 강력한 모략 피해를 줍니다.' },
    "요풍사기": { role: "능동 (50%)", target: '적/아군 전체', desc: '적 전체에 강한 모래바람 결계를 치고 아군 전체에게 장벽 수치를 중첩 부여합니다.' },
    "화겁생기": { role: "패시브 (100%)", target: '아군 전체', desc: '부대 아군 전체에게 상시 신기루 도피 버프를 부여하여 전법 및 평타 회피율을 극대화합니다.' },
    "비분시": { role: "능동 (70%)", target: '아군 단체', desc: '아군 단체의 병력을 회복시키고 가하는 피해를 유의미하게 증가시킵니다.' },
    "폐월": { role: "능동 (50%)", target: '적군 단체', desc: '적군 단체를 매혹하여 자신이 입는 피해의 상당량을 해당 적이 대신 분담하게 만듭니다.' },
    "청낭제세": { role: "능동 (50%)", target: '아군 전체', desc: '전투 전반기 동안 아군 전체의 통솔 방어력을 임계점까지 높이고 피격 시 즉각 치료합니다.' },
    "명찰추호": { role: "능동 (50%)", target: '자신, 적군 2팀', desc: '자신의 간파를 대폭 상승시키고, 적 2명에게 모략 피해를 주며 무용이 가장 높은 적에게 조건부 추가 모략 타격을 입힙니다.' },
    "후적박발": { role: "패시브 (100%)", target: '자신, 적군 1팀', desc: '적군의 제어기(침묵/겁전)를 무시하고 턴 종료 시 무작위 적군 1명에게 강력한 모략 피해를 확정적으로 가합니다.' },
    "심구고루": { role: "지휘 (100%)", target: "적군 전체, 아군 2팀", desc: "초반 턴 동안 확정적으로 자신 및 후열의 받는 피해를 경감시키고 적 전체를 도발하여 일반 공격을 흡수합니다." },
    "애자필보": { role: "지휘 (100%)", target: "아군 전체", desc: "아군 전체에 상시 피감 효과를 제공하며, 적군에게 '피곤' 디버프를 부여해 패시브 발동을 완벽히 차단합니다." }
};

var masterLookupMap = {};
tacticDogamData.forEach(t => {
    if (t?.name) masterLookupMap[cStr(t.name)] = { ...t, role: t.type || t.role };
});
Object.entries(TACTIC_MASTER_DESC).forEach(([k, v]) => {
    const cleanKey = cStr(k);
    if (!masterLookupMap[cleanKey]) {
        masterLookupMap[cleanKey] = { name: k, ...v, type: v.role };
    }
});

var injectTacticStyles = () => {
    if (document.getElementById('tactic-dogam-custom-styles')) return;
    const style = document.createElement('style');
    style.id = 'tactic-dogam-custom-styles';
    style.innerHTML = `
        .tactic-card-item { background-color: var(--bg-card); border: 1px solid var(--border-main); border-top: 5px solid #7b2cb0; border-radius: 6px; padding: 15px; cursor: pointer; transition: all 0.3s ease; position: relative; display: flex; flex-direction: column; justify-content: flex-start; box-sizing: border-box; min-height: 130px; opacity: 0.45; }
        .tactic-card-item.owned { background-color: var(--bg-panel); border-color: #a855f7; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.15); opacity: 1; }
        .tactic-card-item .t-name { font-size: 18px; font-weight: bold; color: var(--text-muted); margin-bottom: 8px; letter-spacing: 1px; transition: color 0.3s; }
        .tactic-card-item.owned .t-name { color: var(--text-main); }
        .tactic-card-item .t-meta { font-size: 11px; margin-bottom: 8px; color: var(--text-desc); transition: color 0.3s; }
        .tactic-card-item .t-desc { background-color: var(--bg-inner); border: 1px solid var(--border-main); border-radius: 4px; padding: 10px; font-size: 11px; color: var(--text-desc); text-align: left; line-height: 1.5; word-break: keep-all; margin-top: auto; transition: background-color 0.3s, border-color 0.3s, color 0.3s; }
        .tactic-card-item .t-badge { position: absolute; top: 12px; right: 12px; font-size: 10px; padding: 3px 6px; border-radius: 4px; background-color: var(--bg-inner); color: var(--text-muted); font-weight: bold; transition: background-color 0.3s, color 0.3s; }
        .tactic-card-item.owned .t-badge { background-color: #a855f7; color: #fff; }
    `;
    document.head.appendChild(style);
};

window.getAllTacticsFromDogam = function() {
    return tacticDogamData.map(t => t.name).sort((a, b) => a.localeCompare(b, 'ko'));
};

window.getTacticDataFromDogam = function(tacticName) {
    if (!tacticName) return null;
    return masterLookupMap[cStr(tacticName)] || null;
};

var currentTacticState = [];

function loadTacticData() {
    const defaultNames = tacticDogamData.map(t => t.name).sort((a, b) => a.localeCompare(b, 'ko'));
    let savedTactics = [];
    
    try {
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) {
            const parsed = JSON.parse(rawData);
            if (parsed?.tactics && Array.isArray(parsed.tactics)) {
                savedTactics = parsed.tactics;
            }
        }
    } catch (e) {
        console.error("전법 도감 데이터 로드 실패:", e);
    }

    const tMap = savedTactics.reduce((acc, st) => {
        if (st?.name) acc[cStr(st.name)] = st;
        return acc;
    }, {});

    currentTacticState = defaultNames.map(name => {
        const cleanName = cStr(name);
        const found = tMap[cleanName];
        const originData = masterLookupMap[cleanName];
        return {
            name: name,
            desc: originData ? originData.desc : "전법 설명 누락",
            type: originData ? (originData.type || originData.role) : "-",
            target: originData ? originData.target : "-",
            isOwned: found ? !!found.isOwned : false,
            star: (found && found.star !== undefined && found.star !== null) ? parseInt(found.star, 10) : 0
        };
    });
}

function saveTacticData() {
    try {
        let rootData = { heroes: [], tactics: [] };
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) rootData = JSON.parse(rawData);
        
        rootData.tactics = currentTacticState.map(t => ({ name: t.name, isOwned: t.isOwned, star: t.star }));
        localStorage.setItem('samguk_hobby_data', JSON.stringify(rootData));
    } catch (e) {
        console.error("전법 도감 세이브 실패:", e);
    }
}

function toggleTacticOwnership(tacticName) {
    const cleanName = cStr(tacticName);
    const target = currentTacticState.find(t => cStr(t.name) === cleanName);
    if (target) {
        target.isOwned = !target.isOwned;
        saveTacticData();
        renderTacticGrid();
    }
}

function renderTacticDogamUI() {
    let nativeContainer = document.getElementById('tactic-list') || document.getElementById('tactic-container');
    
    if (!nativeContainer && !document.getElementById('tactic-dogam-wrapper')) return;

    let container = document.getElementById('tactic-dogam-wrapper');
    if (!container) {
        container = document.createElement('div');
        container.id = 'tactic-dogam-wrapper';
        container.style.cssText = 'width: 100%; flex: 1 1 100%; align-self: stretch; display: block; box-sizing: border-box; padding: 10px 0;';
        
        if (nativeContainer) {
            nativeContainer.style.cssText = 'width: 100%; flex: 1 1 100%; align-self: stretch; display: block;';
            nativeContainer.appendChild(container);
        } else {
            document.body.appendChild(container);
        }
    }

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px solid var(--border-main); padding-bottom: 10px;">
            <h2 style="color: var(--text-highlight); margin: 0; font-size: 22px;">전법 도감 마스터 보드</h2>
            <span id="tactic-count-badge" style="color: var(--text-muted); font-weight: bold; font-size: 15px;">보유율: </span>
        </div>
        <div id="tactic-card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 15px; width: 100%; align-items: stretch;"></div>
    `;
    
    renderTacticGrid();
}

function renderTacticGrid() {
    const gridContainer = document.getElementById('tactic-card-grid');
    const countBadge = document.getElementById('tactic-count-badge');
    if (!gridContainer) return;

    const ownedCount = currentTacticState.filter(t => t.isOwned).length;
    const totalCount = currentTacticState.length;
    
    if (countBadge) {
        countBadge.innerHTML = `보유율: <span style="color: #38bdf8; font-size: 18px;">${ownedCount}</span> / ${totalCount}`;
    }

    gridContainer.innerHTML = currentTacticState.map(tactic => `
        <div class="tactic-card-item ${tactic.isOwned ? 'owned' : ''}" data-tactic-name="${tactic.name}">
            <div class="t-name">${tactic.name}</div>
            <div class="t-meta">
                <span style="color: var(--text-highlight); font-weight: bold;">역할:</span> ${tactic.type} &nbsp;|&nbsp; <span style="color: var(--text-highlight); font-weight: bold;">대상:</span> ${tactic.target}
            </div>
            <div class="t-desc">${tactic.desc}</div>
            <div class="t-badge">${tactic.isOwned ? '보유' : '미보유'}</div>
        </div>
    `).join('');

    gridContainer.onclick = function(e) {
        const card = e.target.closest('.tactic-card-item');
        if (card) {
            const name = card.getAttribute('data-tactic-name');
            if (name) toggleTacticOwnership(name);
        }
    };
}

function initTacticDogamEngine() {
    injectTacticStyles();
    loadTacticData();
    renderTacticDogamUI();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTacticDogamEngine);
} else {
    initTacticDogamEngine();
}

console.log("[시스템 분석] tactic_dogam.js 강제 가로 확장 반응형 그리드 렌더링 엔진 기동");

// ==========================================================================
// LAYER 1: 전법 마스터 데이터베이스 구역
// ==========================================================================
const tacticDogamData = [
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
    { id: 't_munchi', name: '문치무공', type: '능동 (70%)', target: '아군 2팀', desc: '아군 중 무용이 가장 높은 대상의 무용 증가(문치무공 발동자 무용의 10%만큼 증가), 강공 피해 20% 증가, 2턴 동안 지속됩니다. 또한 아군 중 모략이 가장 높은 대상의 모략 증가(문치무공 발동자 모략의 10%만큼 증가), 치료 효과 25% 증가, 2턴 동안 지속됩니다.' },
    { id: 't_miu', name: '미우주무', type: '능동 (50%)', target: '아군 1팀', desc: '아군 중 통솔이 가장 높은 1개 대상의 받는 피해를 25% 감소시켜 2턴 지속하고 해당 대상의 병력을 회복(치료율 40%, 모략 영향)합니다.' },
    { id: 't_bangaek', name: '반객위주', type: '패시브 (100%)', target: '자신, 적군 1팀', desc: '무용 피해를 가한 후 자신의 무용 피해가 8% 상승하여 최대 4중첩되고 해제 불가이며, 중첩이 모두 쌓인 경우 대상에게 130% 추가 무용 피해 입힙니다. 모략 피해를 가한 후 자신의 모략 피해가 8% 상승하여 최대 4중첩되고 해제 불가이며, 중첩이 모두 쌓인 경우 대상에게 130% 추가 모략 피해 입힙니다. 해당 피해 효과는 매 턴 최대 2회 발동하며, 두 효과의 발동 횟수는 각각 독립적으로 계산됩니다.' },
    { id: 't_byeongryang', name: '병량촌단', type: '추격 (35%)', target: '적군 1팀', desc: '일반 공격 후, 일반 공격 대상에게 280% 무용 피해를 가하며 50% 확률로 허약을 2턴 부여합니다.' },
    { id: 't_bunseong', name: '분성지계', type: '능동 (70%)', target: '적군 전체', desc: '적군 전체에게 화상(행동 시작 시 20% 추가 모략 피해 입음)을 부여하고 대상이 가하는 피해를 20% 감소시키며(모략의 영향을 받음) 2턴 간 지속됩니다.' },
    { id: 't_bisa', name: '비사주석', type: '추격 (35%)', target: '적군 1팀', desc: '일반 공격 후 일반 공격 대상에게 220% 무용 피해를 가하며 50% 확률로 겁전을 1턴 부여합니다.' },
    { id: 't_samyeon', name: '사면초가', type: '능동 (50%)', target: '적군 1팀', desc: '적군에게 67% 무용 피해를 4회 가하며, 매 회 대상은 독립적으로 선택됩니다.' },
    { id: 't_sasaeng', name: '사생취의', type: '패시브 (100%)', target: '자신', desc: '내가 받는 피해가 10% 상승하고 가하는 피해가 45% 상승하며 해제 불가입니다.' },
    { id: 't_seondeung', name: '선등함진', type: '능동 (50%)', target: '적군 전체', desc: '적 전체에게 100%의 무용 피해를 입히고, 35%의 확률로 겁전 부여, 1턴 지속합니다. 각 목표별 확률은 독립적으로 계산됩니다.' },
    { id: 't_susang', name: '수상개화', type: '패시브 (100%)', target: '자신', desc: '무장 고유의 능동 전법 발동 확률이 12% 증가하며 해제 불가합니다. 매 턴 시작 시, 자신이 가하는 피해가 12% 증가하며, 최대 4회 중첩되고 해제 불가합니다.' },
    
    // [신규 추가] 승승장구 데이터베이스 등재[cite: 4]
    { id: 't_seungseung', name: '승승장구', type: '능동 (50%)', target: '자신, 적군 2팀', desc: '자신에게 용맹 및 신속을 부여하며 2턴 간 지속됩니다. 적군 대상 2명에게 140% 무용 피해를 입히며, 만약 속도가 대상보다 높을 경우 피해 계수가 40% 상승합니다.' },
    
    { id: 't_sunsu', name: '순수견양', type: '능동 (50%)', target: '적군 2팀, 아군 2팀', desc: '2턴 동안 적군 2명이 가하는 피해를 15% 감소(모략의 영향을 받음)시키고, 50% 확률로 무장 해제를 부여하여 1턴간 지속시킵니다. 이후 아군 2명의 병력을 회복시킵니다(치료율 90%, 모략의 영향을 받음).' },
    { id: 't_simmo', name: '심모원려', type: '추격 (50%)', target: '자신, 적군 1팀', desc: '일반 공격 후 자신의 모략 피해가 5% 상승하며 최대 4중첩, 해제 불가이며 일반 공격 대상에게 240% 모략 피해 가합니다.' },
    { id: 't_anyoung', name: '안영찰채', type: '지휘 (100%)', target: '적군 2팀, 아군 전체', desc: '매 턴 시작 시 70% 확률로 아군 전체의 병력을 회복시키고(치료율 80%, 모략의 영향 받음), 아군 전체가 행동하기 전 받는 피해를 20% 감소시킵니다(대상의 모략이 무용보다 높을 경우 계수 30% 상승). 이후 30% 확률(모략의 영향 받음)로 적군 전열에 피곤을 부여합니다(턴 종료 시까지 지속).' }, 
    { id: 't_amjeon', name: '암전난방', type: '능동 (50%)', target: '자신, 적군 1팀', desc: '자신의 강공 30% 증가하고 2턴 지속하며 적군 대상 1명에게 220% 무용 피해를 가합니다. 대상이 전열일 경우 피해 계수가 110% 상승합니다.' },
    { id: 't_yangui', name: '양의화생', type: '능동 (50%)', target: '자신, 적군 2팀', desc: '자신에게 2턴 동안 다모를 부여합니다. 적군 대상 2명에게 160%의 모략 피해를 입힙니다. 대상의 무용이 모략보다 높을 경우 피해 계수가 20% 상승합니다. 반대로 대상의 모략이 더 높을 경우, [양의화생]으로 입힌 피해의 30%만큼 자신의 병력을 회복합니다.' },
    { id: 't_yangcho', name: '양초선행', type: '능동 (50%)', target: '아군 1팀', desc: '아군 중 병력이 가장 낮은 대상의 병력을 회복(치료율174%, 모략 영향)하고 해당 대상의 병력이 60% 미만이면 치료 계수 58% 증가합니다.' },
    { id: 't_yeoja', name: '여자동포', type: '능동 (50%)', target: '아군 2팀', desc: '아군 대상 2명에게 저항 및 불굴 1중첩을 부여합니다. 피해를 입은 후 병력을 회복하며(치료율 120%, 모략 영향, 최대 2회 발동), 2턴간 지속됩니다. 이후 50%(모략 영향)의 확률로 아군 중 병력이 가장 낮은 대상에게 동일한 저항 및 불굴을 다시 부여합니다.' },
    { id: 't_yosa', name: '요사여신', type: '패시브 (100%)', target: '자신', desc: '자신의 기습이 30% 상승하고 매번 모략 피해를 가한 후 자신이 가하는 모략 피해가 11% 상승하며 최대 4회 중첩, 해제 불가, 전투 종료까지 지속합니다.' },
    { id: 't_yongmaeng', name: '용맹무쌍', type: '패시브 (100%)', target: '자신, 적군 1팀', desc: '강공이 25% 상승하며(무용 영향), 해제할 수 없습니다. 무용 피해를 입힌 후, 70% 확률로 적군 1개 대상에게 40% 추가 무용 피해 피해를 입힙니다. 자신의 행동 시 발동될 경우 피해 계수가 40% 상승하며, 매 턴 최대 4회 발동됩니다.' },
    { id: 't_yongwang', name: '용왕직전', type: '추격 (50%)', target: '자신, 적군 2팀', desc: '일반 공격 후 자신에게 용맹 상태를 2턴간 부여합니다. 그 후 적 목표 2명에게 115%의 무용 피해를 입힙니다. 자신의 무용이 목표보다 높을 경우 피해 계수가 27% 증가합니다.' },
    { id: 't_unju', name: '운주유악', type: '지휘 (100%)', target: '아군 전체', desc: '전투 전 3턴 동안 매 턴 시작 시, 아군 전체의 연격률을 40% 증가시키고 90% 확률로 아군 1개 대상에게 통찰을 부여하여 턴 종료까지 지속합니다.' },
    { id: 't_wonseong', name: '원성재도', type: '능동 (35%)', target: '적군 1팀', desc: '적군 1개 대상의 받는 피해를 30% 증가시켜 2턴 지속하며 해당 대상에게 155% 모략 피해를 가합니다.' },
    { id: 't_wiwi', name: '위위구조', type: '추격 (50%)', target: '적군 2팀, 아군 2팀', desc: '일반 공격 후 적군 대상 2명이 가하는 피해가 10% 감소하고 최대 4중첩되고 해제 불가이며 2턴 간 지속됩니다. 이어 아군 대상 2명의 병력을 회복(치료율 165%, 통솔의 영향 받음)시키고 40% 확률(통솔의 영향 받음)로 면역 1중첩을 부여합니다.' },
    { id: 't_yujwa', name: '유좌유용', type: '지휘 (50%)', target: '아군 전체', desc: '턴 시작 시, 아군 전체에 불굴 상태를 부여합니다: 피해를 입은 후 병력 회복(치료율 90%, 모략의 영향을 받음), 턴 종료까지 지속, 매 턴 최대 3회 발동.' },
    { id: 't_igan', name: '이간계', type: '능동 (35%)', target: '적군 1팀', desc: '적 1개 대상에게 250% 모략 피해 가하고 80% 확률로 혼란을 부여하며 1턴 지속됩니다.' },
    { id: 't_iahwan', name: '이아환아', type: '패시브 (50%)', target: '적군 1팀', desc: '피해를 받은 후 피해 출처에 132% 추가 무용 피해를 가하며(통솔의 영향) 매 턴 최대 4회 발동합니다.' },
    { id: 't_iil', name: '이일대로', type: '능동 (50%)', target: '적군 2팀', desc: '적군 2개 대상의 가하는 피해 16% 감소하고 50% 확률로 무기력을 부여하며 2턴 지속합니다.' },
    { id: 't_itoe', name: '이퇴위진', type: '지휘 (50%)', target: '자신, 아군 1팀', desc: '매 턴 시작 시, 자신과 후열의 아군 대상 1명에게 저항 1중첩을 부여합니다. 자신이 받는 피해가 16% 감소하고, 후열 아군 대상 1명이 가하는 피해가 16% 증가하며, 효과는 턴 종료시까지 지속됩니다.' },
    { id: 't_ilgo', name: '일고작기', type: '패시브 (100%)', target: '자신', desc: '자신의 연격률이 60% 상승하고 가하는 피해가 12% 상승하며 해제 불가입니다.' },
    { id: 't_inse', name: '인세이도', type: '패시브 (100%)', target: '자신', desc: '받는 피해 21% 감소, 해제 불가. 자신의 행동 시작 시, 다음 효과 중 1개 발동: 자신에게 장벽 3중첩 부여, 또는 자신의 병력 회복(치료율 60%, 가장 높은 속성의 영향).' },
    { id: 't_jangsu_j', name: '전위위안', type: '패시브 (100%)', target: '자신, 아군 1팀', desc: '자신의 통솔이 모략의 15%만큼 상승하며, 해제 불가. 매 턴 최초로 피해를 받은 후, 50%(모략의 영향 받음)의 확률로 자신에게 저항을(를) 1중첩 부여하고, 자신 및 아군 대상 1명의 병력을 회복시키며(치료율 120%, 모략의 영향 받음), 디버프 상태를 1개 해제합니다. 치료받은 대상이 전열에 있을 경우, 치료 계수가 36% 증가합니다.' },
    { id: 't_jegon', name: '제곤부위', type: '지휘 (100%)', target: '아군 2팀', desc: '매 턴 행동 시, 자신과 아군 1개 대상의 병력을 회복(치료율 70%, 통솔의 영향)합니다.' },
    { id: 't_jungjeong', name: '중정기고', type: '능동 (35%)', target: '아군 전체', desc: '아군 전체의 병력을 회복(치료율 150%, 모략 영향)합니다.' },
    { id: 't_jiin', name: '지인선임', type: '능동 (35%)', target: '적군 전체', desc: '적군 전체에게 168% 모략 피해를 가하고 자신의 모략이 대상보다 높으면 해당 피해 계수가 42% 증가합니다.' },
    { id: 't_jintoe', name: '진퇴유도', type: '지휘 (100%)', target: '적군 전체, 아군 전체', desc: '홀수 턴 시작 시, 적군 전체가 가하는 무용 및 모략 피해 30% 감소(통솔의 영향 받음), 턴 종료 시까지 지속됩니다. 짝수 턴 시작 시, 아군 전체가 가하는 무용 및 모략 피해 15% 증가(통솔의 영향 받음), 턴 종료 시까지 지속됩니다.' },
    { id: 't_jinhwa', name: '진화타겁', type: '능동 (35%)', target: '적군 전체', desc: '적군 전체에게 115% 무용 피해를 가하고 70% 확률로 허약을 부여하며 2턴 지속합니다.' },
    { id: 't_jilpung', name: '질풍노도', type: '능동 (70%)', target: '자신, 적군 2팀', desc: '자신의 파갑 15% 상승(무용의 영향 받음), 2턴 동안 지속됩니다. 동시에 적군 대상 2명에게 110%의 무용 피해를 입힙니다. 40%의 확률(무용의 영향 받음)로 무용이 가장 낮은 적군 대상에게 110%의 무용 피해를 추가로 입힙니다.' },
    { id: 't_cheonri', name: '천리추격', type: '추격 (50%)', target: '자신, 적군 2팀', desc: '일반 공격 후, 자신 추격 전법 발동률 3% 증가, 추격 전법 가하는 피해 6% 증가, 최대 3중첩, 해제 불가, 전투 종료 시까지 지속됩니다. 또한 적군 대상 2명에게 130% 모략 피해를 입힙니다.' },
    { id: 't_cheonsi', name: '천시지리', type: '능동 (50%)', target: '아군 전체', desc: '아군 전열이 받는 무용 피해를 22% 감소시키고 후열이 받는 모략 피해를 22% 감소시켜 2턴 동안 지속합니다.' },
    { id: 't_checheon', name: '체천행도', type: '패시브 (100%)', target: '자신, 적군 2팀', desc: '자신의 공심이(가) 20% 증가합니다. 해제 불가. 추격 피해를 입힐 시, 50%의 확률로 목표의 아군 2명에게 65%의 확산 피해를 입힙니다.' },
    { id: 't_chukse', name: '축세대발', type: '능동 (50%)', target: '자신, 적군 2팀', desc: '자신이 가하는 무용 피해 20% 증가하고 2턴 지속하며 적군 2개 대상에게 130% 무용 피해를 가합니다.' },
    { id: 't_chukho', name: '축호과간', type: '패시브 (100%)', target: '적군 1팀, 자신', desc: '피해를 입은 후, 피해 시전자에게 \'적의\'를 부여합니다(중첩당 대상의 통솔 4% 감소). 또한 자신의 통솔이 4% 증가하며, 최대 5중첩, 턴 종료 시까지 지속됩니다. 자신의 행동 시, 70% 확률로 자신의 병력 회복(치료율 240%, 통솔의 영향 받음), \'적의\' 중첩이 가장 높은 적군 대상에게 200%의 무용 피해를 입히고(통솔의 영향 받음) \'적의\' 중첩이 가장 낮은 적군 대상에게 멸시 부여, 1턴 지속합니다.' },
    { id: 't_taecheong', name: '태청단경', type: '패시브 (50%)', target: '아군 2팀', desc: '피해를 입은 후, 아군 2명의 병력을 회복하고(치율 45%, 모략에 영향받음), 50%의 확률로 디버프 1개를 해제합니다. 매 턴 최대 5회 발동합니다.' },
    { id: 't_tojeok', name: '토적격문', type: '능동 (80%)', target: '적군 전체, 자신', desc: '적군 전체에 도발효과를 부여하고 자신이 받는 일반 공격 피해를 40% 감소시키며 2턴 지속합니다.' },
    { id: 't_hyeonho', name: '현호제세', type: '능동 (50%)', target: '아군 2팀', desc: '아군 2명의 디버프 1개를 해제하고, 병력을 회복합니다(치료율 155%, 통솔에 영향받음).' },
    { id: 't_horyeong', name: '호령삼군', type: '패시브 (100%)', target: '자신', desc: '피해를 가한 후 자신의 배반과 공심이 4% 상승하고 강공과 기습이 4% 상승하며 최대 6회 중첩, 해제 불가, 전투 종료까지 지속합니다.' },
    { id: 't_honsu', name: '혼수모어', type: '지휘 (70%)', target: '적군 1팀, 아군 2팀', desc: '턴 시작 시 적 1명에게 혼란 상태를 부여하고(턴 종료 시까지 지속), 아군 2명의 병력을 회복합니다(치료율 150%, 모략의 영향 받음).' },
    { id: 't_hongsu', name: '홍수첨향', type: '지휘 (50%)', target: '아군 2팀', desc: '턴 시작 시, 자신의 병력을 회복하고(치율 190%, 통솔의 영향을 받음), 자신이 받는 피해가 30% 감소합니다(통솔의 영향을 받음). 턴 종료 시까지 지속되며, 아군 대상 1명에게 치료 및 받는 피해 감소 효과의 절반을 부여합니다.' },
    { id: 't_hwaso', name: '화소적벽', type: '능동 (50%)', target: '적군 전체', desc: '적 전체에게 화상효과를 부여(행동 시작 시 35% 추가 모략 피해를 받음)하고 2턴 지속하며 102% 모략 피해를 가합니다.' },
    { id: 't_hoengso', name: '횡소천군', type: '능동 (35%)', target: '적군 2팀', desc: '적군 2개 대상에게 30% 무용 피해를 가하고 출혈 부여(행동 시작 시 65% 추가 무용 피해 받음)하며 2턴 지속합니다.' },
    { id: 't_hoengjing', name: '횡징폭렴', type: '지휘 (100%)', target: '적군 전체, 아군 전체', desc: '전투 첫 2턴 동안 적군 전체의 가하는 피해 36% 감소하고 해제 불가이며 3턴 종료 시 아군 전체를 치료(치료율 140%, 통솔 영향)합니다.' },
    { id: 't_huyang', name: '휴양생식', type: '능동 (35%)', target: '아군 2팀', desc: '아군 2개 대상의 병력을 회복(치료율 165%, 모략 영향)하고 해당 대상에게 통찰을 부여하며 1턴 지속합니다.' }
];

// ==========================================================================
// LAYER 2: API 브릿지 개방 구역
// ==========================================================================
window.getAllTacticsFromDogam = function() {
    return tacticDogamData.map(t => t.name).sort((a, b) => a.localeCompare(b, 'ko'));
};

// ==========================================================================
// LAYER 3: 도감 UI 렌더링 및 백데이터 보존 구역
// ==========================================================================
let currentTacticState = [];

function loadTacticData() {
    const defaultNames = tacticDogamData.map(t => t.name).sort((a, b) => a.localeCompare(b, 'ko'));
    let savedTactics = [];
    
    try {
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) {
            const parsed = JSON.parse(rawData);
            if (parsed && Array.isArray(parsed.tactics)) {
                savedTactics = parsed.tactics;
            }
        }
    } catch (e) {
        console.error("전법 도감 데이터 로드 실패:", e);
    }

    currentTacticState = defaultNames.map(name => {
        const found = savedTactics.find(t => t.name === name);
        const originData = tacticDogamData.find(t => t.name === name);
        return {
            name: name,
            desc: originData ? originData.desc : "전법 설명 누락",
            type: originData ? originData.type : "-",
            target: originData ? originData.target : "-",
            isOwned: found ? !!found.isOwned : false,
            star: (found && found.star !== undefined && found.star !== null) ? parseInt(found.star) : 0
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
    const target = currentTacticState.find(t => t.name === tacticName);
    if (target) {
        target.isOwned = !target.isOwned;
        saveTacticData();
        renderTacticGrid();
    }
}

function renderTacticDogamUI() {
    let nativeContainer = document.getElementById('tactic-list') || document.getElementById('tactic-container');
    
    let container = document.getElementById('tactic-dogam-wrapper');
    if (!container) {
        container = document.createElement('div');
        container.id = 'tactic-dogam-wrapper';
        
        // [해결 조치] 컨테이너에 강제 폭 확장 스타일(important) 주입
        container.style.setProperty('width', '100%', 'important');
        container.style.setProperty('flex', '1 1 100%', 'important');
        container.style.setProperty('align-self', 'stretch', 'important');
        container.style.setProperty('display', 'block', 'important');
        container.style.boxSizing = 'border-box';
        container.style.padding = '10px 0';
        
        if (nativeContainer) {
            // [해결 조치] 상위 부모 요소의 Flex 압축 현상 타파
            nativeContainer.style.setProperty('width', '100%', 'important');
            nativeContainer.style.setProperty('flex', '1 1 100%', 'important');
            nativeContainer.style.setProperty('align-self', 'stretch', 'important');
            nativeContainer.style.setProperty('display', 'block', 'important');
            nativeContainer.appendChild(container);
        } else {
            document.body.appendChild(container);
        }
    }

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0; font-size: 22px;">전법 도감 마스터 보드</h2>
            <span id="tactic-count-badge" style="color: #aaa; font-weight: bold; font-size: 15px;">보유율: </span>
        </div>
        <div id="tactic-card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 15px; width: 100%; align-items: stretch;"></div>
    `;
    
    renderTacticGrid();
}

function renderTacticGrid() {
    const gridContainer = document.getElementById('tactic-card-grid');
    const countBadge = document.getElementById('tactic-count-badge');
    if(!gridContainer) return;

    gridContainer.innerHTML = '';
    
    const ownedCount = currentTacticState.filter(t => t.isOwned).length;
    const totalCount = currentTacticState.length;
    
    if(countBadge) {
        countBadge.innerHTML = `보유율: <span style="color: #38bdf8; font-size: 18px;">${ownedCount}</span> / ${totalCount}`;
    }

    currentTacticState.forEach(tactic => {
        const card = document.createElement('div');
        card.style.cssText = `
            background-color: ${tactic.isOwned ? '#1c1c1c' : '#111'};
            border: 1px solid ${tactic.isOwned ? '#a855f7' : '#2d2d2d'};
            border-top: 5px solid #7b2cb0;
            border-radius: 6px;
            padding: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            box-sizing: border-box;
            min-height: 130px;
            box-shadow: ${tactic.isOwned ? '0 0 12px rgba(168, 85, 247, 0.15)' : 'none'};
        `;
        
        if (!tactic.isOwned) {
            card.style.opacity = '0.4';
            card.style.filter = 'grayscale(100%)';
        }

        card.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; color: ${tactic.isOwned ? '#fff' : '#888'}; margin-bottom: 8px; letter-spacing: 1px;">${tactic.name}</div>
            <div style="font-size: 11px; margin-bottom: 8px; color: #bbb;">
                <span style="color: #feca57; font-weight: bold;">역할:</span> ${tactic.type} &nbsp;|&nbsp; <span style="color: #feca57; font-weight: bold;">대상:</span> ${tactic.target}
            </div>
            <div style="background-color: rgba(20,20,20,0.6); border: 1px solid #2a2a2a; border-radius: 4px; padding: 10px; font-size: 11px; color: #ddd; text-align: left; line-height: 1.5; word-break: keep-all; margin-top: auto;">
                ${tactic.desc}
            </div>
            <div style="position: absolute; top: 12px; right: 12px; font-size: 10px; padding: 3px 6px; border-radius: 4px; background-color: ${tactic.isOwned ? '#a855f7' : '#333'}; color: ${tactic.isOwned ? '#fff' : '#777'}; font-weight: bold;">
                ${tactic.isOwned ? '보유' : '미보유'}
            </div>
        `;
        
        card.addEventListener('click', () => toggleTacticOwnership(tactic.name));
        gridContainer.appendChild(card);
    });
}

function initTacticDogamEngine() {
    loadTacticData();
    setTimeout(renderTacticDogamUI, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTacticDogamEngine);
} else {
    initTacticDogamEngine();
}

// 삼국지 전략판 실제 무장/전법 도감 데이터 베이스 (총 54명 무결성 정렬)
const dogamData = [
    // ================= 위나라 (13명) =================
    {
        name: '조조', country: 'wei', isOwned: true,
        role: '지휘 (100%)', basis: '아군 전체', army: '방패병 / 기병',
        skillType: '지휘', skillName: '효웅',
        skillDesc: '전투 시작 시, 아군 중 통솔이 가장 낮은 대상에게 \'호주\'를 부여 (행동 시 적군 2개 목표에게 85% 피해를 입힘. 피해 유형은 기초 무용 또는 모략 중 높은 항목으로 결정). 매 턴 시작 시 아군 전체에 통어효과를 부여하며 이번 턴 종료시까지 지속.'
    },
    {
        name: '순욱', country: 'wei', isOwned: true,
        role: '능동 (50%)', basis: '아군 2팀', army: '궁병 / 창병',
        skillType: '능동', skillName: '거중지중',
        skillDesc: '아군 2개 대상의 병력을 회복(치료율 175%, 모략 영향)하고 통어 효과를 부여하며 2턴 지속됨.'
    },
    {
        name: '곽가', country: 'wei', isOwned: true,
        role: '능동 (50%)', basis: '적군 1팀', army: '궁병 / 방패병',
        skillType: '능동', skillName: '산무유책',
        skillDesc: '적에게 70% 모략 피해를 5회 가함. 자신이 통어 효과를 보유 중이면 피해 계수가 22% 상승하며, 매회 대상은 독립적으로 선택됨.'
    },
    {
        name: '장합', country: 'wei', isOwned: true,
        role: '지휘 (100%)', basis: '아군 전체', army: '방패병 / 창병',
        skillType: '지휘', skillName: '교변병기',
        skillDesc: '매 턴 종료 시, 아군 목표 2명의 병력을 회복함 (치료율 115%, 통솔 영향). 전투 시작 후 4턴 동안, 매 턴 시작 시 아군 전체가 행동 전 받는 무용 피해와 책략 피해를 35% 감소 시킴. 해제불가.'
    },
    {
        name: '하후돈', country: 'wei', isOwned: true,
        role: '패시브 (50%)', basis: '적군 2팀', army: '창병 / 방패병',
        skillType: '패시브', skillName: '발시담정',
        skillDesc: '피해를 받을 때, 적군 2명이 가하는 피해를 38% 감소시키고 받는 피해를 38% 증가시킴. 1턴 지속되고 이 효과는 턴마다 최대 1회 발동함.'
    },
    {
        name: '악진', country: 'wei', isOwned: true,
        role: '능동 (70%)', basis: '자신, 아군 1팀', army: '창병 / 궁병',
        skillType: '능동', skillName: '분용당선',
        skillDesc: '자신 and 전열 아군 1개 대상의 가하는 피해 30% 증가하고 받는 피해 30% 감소하며 1턴 지속됨. 또한 전열 아군 1개 대상이 적 전체에게 50% 무용 피해를 가함.'
    },
    {
        name: '전위', country: 'wei', isOwned: true,
        role: '패시브 (100%)', basis: '적군 1팀, 자신', army: '창병 / 방패병',
        skillType: '패시브', skillName: '축호과간',
        skillDesc: '피해를 입은 후, 피해 시전자에게 \'적의\'를 부여합니다(중첩당 대상의 통솔 4% 감소). 또한 자신의 통솔이 4% 증가하며, 최대 5중첩, 턴 종료시까지 지속됩니다. 자신의 행동시, 70% 확률로 자신의 병력 회복(치료율 240%, 통솔의 영향 받음), \'적의\' 중첩이 가장 높은 적군 대상에게 200%의 무용피해를 입히고 \'적의\' 중첩이 가장 낮은 적군 대상에게 멸시 부여, 1턴 지속합니다.'
    },
    {
        name: '정욱', country: 'wei', isOwned: true,
        role: '추격 (50%)', basis: '적군 1팀', army: '방패병 / 궁병',
        skillType: '추격', skillName: '십면매복',
        skillDesc: '일반 공격 대상에게 240% 모략 피해를 가하고 대상이 전열이면 해당 피해 계수가 100% 증가함.'
    },
    {
        name: '장료', country: 'wei', isOwned: true,
        role: '패시브 (100%)', basis: '자신, 적군 1팀', army: '창병 / 기병',
        skillType: '패시브', skillName: '함진살적',
        skillDesc: '자신의 파갑이 30% 증가하고 해제 불가이며, 무용 피해를 가한 후, 50% 확률로 대상에게 100% 추가 무용 피해 효과를 부여하며, 턴당 최대 4회 발동함.'
    },
    {
        name: '사마의', country: 'wei', isOwned: true,
        role: '능동 (60%)', basis: '자신, 적군 2팀', army: '방패병 / 궁병',
        skillType: '능동', skillName: '응시낭고',
        skillDesc: '자신의 모략과 통솔이 5% 증가함. 최대 6회 중첩되며 해제 불가하고 최대 중첩 시 자신에게 저항 1중첩을 부여함. 적군 2명에게 115% 모략 피해를 가하며, 매 발동 시 피해 계수가 10% 증가함(최대 60% 증가). 해당 스킬은 40% 확률(모략 영향)로 1회 추가 발동함.'
    },
    {
        name: '하후연', country: 'wei', isOwned: true,
        role: '능동 (50%)', basis: '적군 1팀', army: '창병 / 기병',
        skillType: '능동', skillName: '충용',
        skillDesc: '적군 속도가 가장 낮은 목표에게 110% 무용 피해를 가하고, 아군 무용이 가장 높은 대상이 해당 적군 목표에게 110%의 무용 피해를 추가로 가함.'
    },
    {
        name: '제)조조', country: 'wei', isOwned: true,
        role: '지휘 (100%)', basis: '아군 전체', army: '창병 / 방패병',
        skillType: '지휘', skillName: '군령여산',
        skillDesc: '매 턴 시작 시, 아군 전체의 주는 피해 12%, 속도 4% 증가 (최대 4중첩, 해제 불가). 4턴 시작 시, 아군 전체의 모든 디버프를 해제하고 병력을 회복함 (치료율 160%, 통솔 영향). 3성 강화: 치료 효과 대상이 아군 전체로 변경 / 5성 강화: 버프 효과 대상이 아군 전체로 변경.'
    },
    {
        name: '가후', country: 'wei', isOwned: true,
        role: '능동 (65%)', basis: '적군 1팀, 자신', army: '궁병 / 방패병',
        skillType: '능동', skillName: '경달권변',
        skillDesc: '혼란 상태가 아닌 적군 대상 1명에게 우선적으로 혼란을 부여하고 자신은 통솔을 획득함 (1턴 지속). 이후 75%(모략 영향) 확률로 모략이 가장 높은 아군이 적군 대상 2명에게 130% 피해를 입히며, 피격 대상이 혼란 시 피해 40% 증가. 모략이 높은 적군이 아군 2명의 병력을 회복(치료율 220%) 조종 대상이 혼란 시 치료 계수 60% 증가.'
    },

    // ================= 촉나라 (14명) =================
    {
        name: '유비', country: 'shu', isOwned: true,
        role: '지휘 (100%)', basis: '아군 전체', army: '창병 / 기병',
        skillType: '지휘', skillName: '인정',
        skillDesc: '턴 시작 시, 70%의 확률로 아군 전체의 디버프 상태를 1개 해제하고 정비 상태를 부여함 (치료율 55%, 지력 영향, 1턴 지속). 70% 확률로 아군 전열 목표 1명이 받는 피해를 우선적으로 20% 감소시키며 이번 턴 종료까지 지속됨.'
    },
    {
        name: '마대', country: 'shu', isOwned: true,
        role: '능동 (35%)', basis: '아군 2팀', army: '창병 / 방패병',
        skillType: '능동', skillName: '습참',
        skillDesc: '아군 2개 대상의 배반과 공심 15% 증가하고 가하는 피해 22% 증가하며 2턴간 지속됨.'
    },
    {
        name: '관우', country: 'shu', isOwned: true,
        role: '능동 (50%)', basis: '자신, 적군 전체', army: '창병 / 기병',
        skillType: '능동', skillName: '무성',
        skillDesc: '자신의 액티브 전법 피해가 10% 상승하며 2턴간 지속됨. 또한 적군 전체에게 75% 무용 피해를 입히고 이어서 적군 1개 대상에게 3회 75% 추가 무용 피해를 입힘. 후속 3회 피해의 대상은 독립적으로 선택됨. 대상이 디버프 상태일 경우 피해 계수가 15% 상승함.'
    },
    {
        name: '위연', country: 'shu', isOwned: true,
        role: '패시브 (70%)', basis: '아군 2팀, 적군 2팀', army: '창병 / 궁병',
        skillType: '패시브', skillName: '실병제위',
        skillDesc: '피해를 입은 후, 적 2명의 버프 상태 2개를 해제하고 둔화 효과를 부여하며, 2턴간 지속됨. 또한 자신과 후열 아군 1명의 병력을 회복함 (치료율 80%, 통솔 영향). 매 턴 최대 2회 발동함.'
    },
    {
        name: '장비', country: 'shu', isOwned: true,
        role: '패시브 (50%)', basis: '자신, 적군 1팀', army: '창병 / 방패병',
        skillType: '패시브', skillName: '연인노호',
        skillDesc: '피해를 받은 후, 자신의 병력을 회복(치료율 76%, 통솔 영향)하고 피해 출처에 무기력 효과를 2턴 부여함.'
    },
    {
        name: '사마가', country: 'shu', isOwned: true,
        role: '추격 (35%)', basis: '적군 1팀', army: '창병 / 방패병',
        skillType: '추격', skillName: '만왕',
        skillDesc: '일반 공격 후, 일반 공격 대상에게 320% 무용 피해를 가하고 50% 확률로 동일한 피해를 한번 더 가함.'
    },
    {
        name: '황충', country: 'shu', isOwned: true,
        role: '패시브 (100%)', basis: '적군 2팀', army: '창병 / 방패병',
        skillType: '패시브', skillName: '적혈도',
        skillDesc: '통솔이 증가하며, 증가량은 자신 무력의 15%이고 해제 할 수 없음. 매 턴 처음으로 피해를 입을 때, 70% 확률로 적 2명의 버프 상태 2개를 해제하고 140%의 무용피해를 주며(통솔 영향) 50% 확률로 숙살 효과를 부여하며 1턴간 지속. 각 대상별 확률은 독립적으로 계산된다. 대상이 전열일 경우 피해 계수가 70% 증가함.'
    },
    {
        name: '황월영', country: 'shu', isOwned: true,
        role: '지휘 (100%)', basis: '아군 2팀, 아군 1팀', army: '궁병 / 방패병',
        skillType: '지휘', skillName: '묘산천기',
        skillDesc: '아군 2개 대상의 배반, 공심, 치유 효과를 10% 상승시키고, 해제 불가이며 전투 종료까지 지속됨. 제 3턴 시작부터 자신의 행동 시 아군중 모략이 가장 높은 대상이 적군 중 모략이 가장 낮은 대상에게 100% 모략 피해를 가하게 함.'
    },
    {
        name: '제갈량', country: 'shu', isOwned: true,
        role: '지휘 (100%)', basis: '적군 1팀, 자신', army: '궁병 / 방패병',
        skillType: '지휘', skillName: '초선차전',
        skillDesc: '턴 시작 시, 적군 중 모략이 가장 높은 대상의 모략 15% 탈취하고 자신의 간파 40% 증가하며 턴 종료까지 지속됨. 추가로 50% 확률로 자신에게 통찰을 부여하며 턴 종료까지 지속함.'
    },
    {
        name: '제)유비', country: 'shu', isOwned: true,
        role: '지휘 (100%)', basis: '적군 전체, 아군 1팀', army: '창병 / 방패병',
        skillType: '지휘', skillName: '재주복주',
        skillDesc: '턴 시작 시, 적군 전체에게 허약을 부여하고, 우선적으로 같은 열의 아군 대상 1명이 주는 피해를 20% 증가시키며, 강공 및 기습을 20% 상승 시킴(이번 턴 종료 시까지 지속). 우선적으로 같은 열의 아군 대상 1명에게 다음 효과 중 하나를 발동함. [- 저항 1중첩 부여 / 2개의 디버프 상태 해제] 3성 강화: 허약 상태 대상을 적군 전체로 변경 / 5성 강화: 아군 대상에게 저항을 부여하거나 디버프 상태를 해제.'
    },
    {
        name: '조운', country: 'shu', isOwned: true,
        role: '패시브 (100%)', basis: '자신, 적군 1팀', army: '창병 / 방패병',
        skillType: '패시브', skillName: '칠진칠출',
        skillDesc: '배반 15% 증가하고 해제 불가이며, 피해를 받은 후, 피해 출처에 50% 추가 무용 피해를 가하며 매 턴 최대 7회 발동함.'
    },
    {
        name: '마초', country: 'shu', isOwned: true,
        role: '패시브 (100%)', basis: '자신, 적군 2팀', army: '창병 / 기병',
        skillType: '패시브', skillName: '출수법',
        skillDesc: '강공이 24% 상승함 (무용 영향, 해제 불가). 행동 시작 시 50% 확률로 강공 피해 10%(강공 영향, 최대 30%까지 상승) 상승 (턴 종료시까지 지속). 적군 2개 대상에게 2회 100%의 무용 피해를 입힘. 강공이 발동될 경우 발동된 피해의 40% 만큼 마초의 병력을 회복함.'
    },
    {
        name: '서서', country: 'shu', isOwned: true,
        role: '지휘 (100%)', basis: '아군 2팀', army: '창병 / 궁병',
        skillType: '지휘', skillName: '절절학문',
        skillDesc: '전투 시작 시, 아군 후열 대상 1명의 강공 15% 증가 (해제 불가). 또한 협기 [행동 종료 시 70%의 확률로 적군 대상 2명에게 110% 무용 피해를 입힙니다] 부여. 아군 중 모략이 가장 높은 대상에게 구학 [행동 종료 시 70%의 확률로 자신 및 아군 대상 1명의 병력 회복(치료율 110%)], 대상이 전열일 경우 치료 계수 40% 증가함.'
    },
    {
        name: '강유', country: 'shu', isOwned: true,
        role: '추격 (50%)', basis: '자신, 적군 2팀', army: '방패병 / 기병',
        skillType: '추격', skillName: '담대여두',
        skillDesc: '일반 공격 후 자신의 무용 및 모략이 자신 무용 및 모략의 8%만큼 상승하여 최대 4중첩되고 해제 불가이며 전투 종료까지 지속됩니다. 이어 적군 대상 2명에게 95% 무용 피해 및 190% 모략 피해를 입히며, 담대여두로 가한 피해의 30%만큼 강유의 병력을 회복시키고 50%(모략의 영향을 받음) 확률로 대상에게 붙은 불운 1중첩을 부여합니다.'
    },

    // ================= 오나라 (15명) =================
    {
        name: '손권', country: 'wu', isOwned: true,
        role: '지휘 (100%)', basis: '아군 전체', army: '궁병 / 기병',
        skillType: '지휘', skillName: '웅거',
        skillDesc: '자신이 받는 피해 25% 감소하고 아군 전체의 능동 전법 발동률 10% 상승하며 해제 불가함.'
    },
    {
        name: '손견', country: 'wu', isOwned: true,
        role: '지휘 (100%)', basis: '적군 전체', army: '창병 / 방패병',
        skillType: '지휘', skillName: '강동맹호',
        skillDesc: '시작 4턴 동안 매 턴 시작 시, 적군 전체의 가하는 피해를 각각 36% / 27% / 18% / 9% 감소하고 턴 종료까지 지속됨.'
    },
    {
        name: '주유', country: 'wu', isOwned: true,
        role: '패시브 (80%)', basis: '적군 2팀', army: '창병 / 궁병',
        skillType: '패시브', skillName: '봉화연천',
        skillDesc: '모략 피해를 입힌 후, 적 2명에게 60%의 추가 모략 피해 효과를 시전하고 만약 대상에게 화상 상태가 있다면 이 피해 계수가 20% 증가하며 매 턴 최대 4회 발동함.'
    },
    {
        name: '대교', country: 'wu', isOwned: true,
        role: '지휘 (100%)', basis: '아군 2팀', army: '창병 / 궁병',
        skillType: '지휘', skillName: '정수유심',
        skillDesc: '매 턴 시작 시, 아군 2개 대상의 병력을 회복 (치료율 60%, 모략 영향). 아군 1개 대상(동일 열 우선)의 무용 피해가 20% 상승하며 턴 종료까지 지속함.'
    },
    {
        name: '황개', country: 'wu', isOwned: true,
        role: '능동 (50%)', basis: '아군 전체, 적군 2팀', army: '방패병 / 궁병',
        skillType: '능동', skillName: '요원지화',
        skillDesc: '아군 전체의 통솔이 16% 상승하고 적군 2개 대상에게 화상 효과를 부여하며 (행동 전에 65% 추가 모략 피해를 받음) 2턴간 지속됨.'
    },
    {
        name: '여몽', country: 'wu', isOwned: true,
        role: '지휘 (100%)', basis: '적군 전체', army: '방패병 / 궁병',
        skillType: '지휘', skillName: '백의도강',
        skillDesc: '매 턴 시작 시, 70%의 확률로 적군 전체에 화상 상태를 부여하고(행동 전 38%의 추가 모략 피해를 받음), 2턴간 지속됨. 적군 목표 1명에게 겁전 상태를 부여하며, 턴 종료까지 지속됨. 행동 시작 시, 70%의 확률로 아군 중 지력이 가장 높은 목표의 디버프 상태를 2개 해제함.'
    },
    {
        name: '육손', country: 'wu', isOwned: true,
        role: '추격 (50%)', basis: '적군 2팀', army: '창병 / 기병',
        skillType: '추격', skillName: '지변규려',
        skillDesc: '일반 공격 후 적군 2개 대상에게 145% 모략 피해를 가하고 75% 확률로 적군 병력 비율이 가장 낮은 대상에게 추가로 145% 모략 피해를 가함.'
    },
    {
        name: '소교', country: 'wu', isOwned: true,
        role: '능동 (70%)', basis: '아군 2팀', army: '궁병 / 기병',
        skillType: '능동', skillName: '화용욕모',
        skillDesc: '아군 2명의 병력을 회복하고 (치료율 155%, 가장 높은 속성에 영향 받음), 그 후열 아군 1명의 연격률을 35% 증가시키고 추격 전법 피해를 35% 증가시키며 1턴간 지속됨. 만약 해당 대상이 아직 행동전이면, 즉시 행동 하게함.'
    },
    {
        name: '손상향', country: 'wu', isOwned: true,
        role: '능동 (50%)', basis: '아군 2팀', army: '궁병 / 기병',
        skillType: '능동', skillName: '효희',
        skillDesc: '아군 2개 대상의 연격률 40% 상승하고 공심 15% 상승하며 2턴 지속됨.'
    },
    {
        name: '육항', country: 'wu', isOwned: true,
        role: '능동 (60%)', basis: '적군 전체, 자신', army: '창병 / 궁병',
        skillType: '능동', skillName: '청백충근',
        skillDesc: '적군 전체에게 \'업화\' 1중첩을 부여(목표는 행동 전 중첩당 50% 추가 모략 피해를 받으며, \'업화\'로 가한 피해의 20% 만큼 육항의 병력을 회복) 40% 확률로(모략 영향) \'업화\' 1중첩을 추가 부여함. \'업화\'는 최대 5회 중첩되며, 해제 불가하고, 2턴간 지속되며, 중복 부여 시 지속 시간이 갱신됨. 목표가 화상을 보유 중일 경우, \'업화\'의 중첩당 피해 계수가 10% 증가함.'
    },
    {
        name: '손책', country: 'wu', isOwned: true,
        role: '능동 (50%)', basis: '적군 2팀', army: '창병 / 방패병',
        skillType: '능동', skillName: '강동패주',
        skillDesc: '적군 2개 대상에게 160% 무용 피해를 가하고 50% 확률로 대상에게 다시 90% 무용 피해를 가함.'
    },
    {
        name: '제)손권', country: 'wu', isOwned: true,
        role: '지휘 (100%)', basis: '적군 전체', army: '창병 / 궁병',
        skillType: '지휘', skillName: '겸권상계',
        skillDesc: '전투 시작 시, 자신의 무용이 모략 이상이면 이후 매 턴 행동 시 아군 중 무용이 가장 높은 대상이 적군 전체에게 85% 무용 피해를 입힘. 자신의 모략이 무용보다 높으면 매 턴 행동 시 아군 중 모략이 가장 높은 대상이 적군 전체에게 85% 모략 피해를 입힘. \'겸권상계\'로 가한 피해의 50%만큼 아군의 병력을 회복시킴. 3성 강화: 가한 피해로 아군의 병력을 회복함 / 5성 강화: 피해 대상이 적군 전체로 변경.'
    },
    {
        name: '주태', country: 'wu', isOwned: true,
        role: '지휘 (100%)', basis: '자신, 아군 1팀', army: '기병 / 방패병',
        skillType: '지휘', skillName: '청라산개',
        skillDesc: '자신의 통솔이 20% 증가하며, 해제 불가함. 자신의 행동 시 30%의 확률로 아군 중 모략이 가장 높은 대상의 디버프 1개를 해제하고 해당 아군이 적에게 일반 공격을 1회 가하게 함.'
    },
    {
        name: '정보', country: 'wu', isOwned: true,
        role: '지휘 (100%)', basis: '자신, 아군 1팀', army: '기병 / 방패병',
        skillType: '지휘', skillName: '칠척사모',
        skillDesc: '홀수 턴 시작 시, 아군 전체가 받는 능동 전법 및 추격 전법 피해 35% 감소 (통솔 영향, 턴 종료시까지). 2턴 마다 행동 시, 아군 중 병력 비율이 가장 낮은 대상의 병력 회복 (회복률 75%, 통솔 영향), 75% 확률로 아군 후열 대상 1명이 우선적으로 적군 대상에게 일반 공격 1회를 발동하게 합니다.'
    },
    {
        name: '노숙', country: 'wu', isOwned: true,
        role: '지휘 (100%)', basis: '자신, 적군 전체, 아군 1팀', army: '궁병 / 기병',
        skillType: '지휘', skillName: '탑상책',
        skillDesc: '매 턴 시작 시, 70% 확률(모략의 영향)로 자신에게 통찰효과를 부여하여 적 전체가 주는 피해를 20% 감소시킵니다. 목표의 무용이 모략보다 높을 경우 계수가 40% 증가하며, 이번 턴 종료까지 지속됩니다. 자신이 액티브 전법 또는 추격 전법을 발동한 후(턴당 최대 1회), 아군 병력이 가장 낮은 대상의 병력을 회복하고(회복률 100%, 모략의 영향), 다음 효과 중 하나를 발동합니다. 아군 전열에 면역 1중첩 부여 또는 적군 전열의 대상 1개에 겁전 부여(1턴 지속).'
    },

    // ================= 군진영 (12명) =================
    {
        name: '동탁', country: 'qun', isOwned: true,
        role: '지휘 (100%)', basis: '적군 전체', army: '방패병 / 기병',
        skillType: '지휘', skillName: '전권난정',
        skillDesc: '턴 시작 시, 적군 전체의 통솔 17%를 탈취하고 둔화를 부여하며 이번 턴 종료까지 지속됨.'
    },
    {
        name: '좌자', country: 'qun', isOwned: true,
        role: '패시브 (100%)', basis: '아군 전체', army: '궁병 / 방패병',
        skillType: '패시브', skillName: '화겁생기',
        skillDesc: '자신이 받는 피해가 25% 감소하고 아군 2개 대상에 매라운드 시작부터 해당 대상의 행동 전까지 받는 피해가 12% 감소하며 해제 불가. 피해를 받은 후 60% 확률로 다음 효과 중 1개가 발동 [- 아군 중 모략이 가장 높은 대상의 모략 피해가 10% 증가 (최대 3중첩, 해제불가, 전투 종료시까지 지속) / 자신의 병력을 회복 (치료율 100%, 모략 영향) / 아군 중 모략이 가장 높은 대상의 능동 전법 발동률 5% 상승 (최대 3회 중첩, 해제불가, 전투 종료시까지 지속)]'
    },
    {
        name: '여포', country: 'qun', isOwned: true,
        role: '패시브 (100%)', basis: '자신', army: '궁병 / 기병',
        skillType: '패시브', skillName: '천하무쌍',
        skillDesc: '매 턴 시작 시 축세 1중첩을 획득하고 해제 불가이며, 전투 종료까지 지속됨. 50% 확률로 강공이 45% 상승하며, 이번 턴 종료까지 지속됨.'
    },
    {
        name: '우길', country: 'qun', isOwned: true,
        role: '지휘 (70%)', basis: '적군 전체', army: '창병 / 궁병',
        skillType: '지휘', skillName: '태평경',
        skillDesc: '매 턴 시작 시, 적 전체가 주는 피해를 25% 감소시키며(자신의 모략이 대상보다 높을 경우, 대상이 주는 무력 피해를 추가로 25% 감소), \'방술\'을 부여함 (대상이 피해를 입힌 후, 20%의 추가 모략 피해 효과를 받음, 자신의 모략이 대상보다 높으면 피해 계수 20% 증가, 매 턴 최대 7회 발동). 이 효과는 턴 종료 시까지 지속됨.'
    },
    {
        name: '초선', country: 'qun', isOwned: true,
        role: '능동 (50%)', basis: '아군 2팀', army: '창병 / 기병',
        skillType: '능동', skillName: '폐월',
        skillDesc: '아군 2개 대상의 병력 회복 (회복률 94%, 모략 영향) 하고 저항 1중첩을 부여함.'
    },
    {
        name: '안량', country: 'qun', isOwned: true,
        role: '능동 (50%)', basis: '적군 2팀', army: '창병 / 기병',
        skillType: '능동', skillName: '효장',
        skillDesc: '적군 2개 대상에게 125% 무용 피해를 가하고 출혈 효과 (행동 전 50% 추가 무용 피해를 받음) 를 부여하며 2턴 지속됨.'
    },
    {
        name: '장각', country: 'qun', isOwned: true,
        role: '능동 (50%)', basis: '자신, 적군 전체', army: '궁병 / 기병',
        skillType: '능동', skillName: '황천당립',
        skillDesc: '자신의 기습이 20% 증가하고 최대 3중첩이며, 해제 불가 및 전투 종료시까지 지속됨. 또한 적군 전체에게 135% 모략 피해를 가함.'
    },
    {
        name: '원소', country: 'qun', isOwned: true,
        role: '지휘 (100%)', basis: '적군 2팀, 아군 2팀', army: '방패병 / 기병',
        skillType: '지휘', skillName: '사소도',
        skillDesc: '홀수 턴 시작 시, 적군 대상 2명이 주는 피해를 32% 감소 (통솔 영향) 시키고, 50% 확률로 피곤을 부여함 (턴 종료시까지 지속). 짝수 턴 시작 시, 병력 비율이 가장 낮은 아군 대상 2명의 디버프 상태를 1개 해제하고 병력을 회복시킴 (치료율 160%, 통솔의 영향을 받음).'
    },
    {
        name: '장보', country: 'qun', isOwned: true,
        role: '능동 (50%)', basis: '적군 2팀', army: '궁병 / 방패병',
        skillType: '능동', skillName: '요풍사기',
        skillDesc: '적군 2개 대상에게 94% 모략 피해를 가하고, 해당 대상의 가하는 피해를 25% 감소시켜 2턴 지속됨.'
    },
    {
        name: '채문희', country: 'qun', isOwned: true,
        role: '능동 (70%)', basis: '아군 1팀', army: '궁병 / 기병',
        skillType: '능동', skillName: '비분시',
        skillDesc: '아군 병력 비율이 가장 낮은 목표의 병력을 회복 (치료율 120%, 목표의 최고 속성의 영향을 받음) 시키고 아군 무용이 가장 높은 목표의 연격률 20%를 증가시키고 2턴간 지속됨.'
    },
    {
        name: '화타', country: 'qun', isOwned: true,
        role: '능동 (50%)', basis: '아군 2팀', border: '궁병 / 방패병',
        skillType: '능동', skillName: '청낭제세',
        skillDesc: '아군 2개 대상을 치료 (치료율 160%, 모략 영향) 하고 다모 효과를 부여하며 2턴 지속됨.',
        army: '궁병 / 방패병'
    },
    {
        name: '장녕', country: 'qun', isOwned: true,
        role: '능동 (50%)', basis: '자신, 적군 2팀, 아군 2팀', army: '궁병 / 방패병',
        skillType: '능동', skillName: '천의난위',
        skillDesc: '관통 2중첩을 획득하며, 1턴 동안 자신의 능동 전법 발동률이 10% 증가 (모략 영향), 적군 대상 2명에게 250% 모략 피해 (대상 병력이 75% 이상일 경우 피해계수 50% 증가) 를 입히고 보급 차단을 부여함 (1턴 지속). 천의난위로 입힌 피해의 30%만큼 장녕의 병력을 회복하고, 아군 대상 2명에게 면역 1중첩을 부여함.'
    }
];

window.onload = function() {
    renderDogam('all');
};

// 핵심 UI 축소 가이드라인 적용: card-check 파트를 템플릿 엔진 구조에서 완벽 삭제하여 텍스트 하이드 연동
function renderDogam(countryFilter) {
    const container = document.getElementById('dogam-list');
    if (!container) return;
    container.innerHTML = '';

    dogamData.forEach(data => {
        if (countryFilter !== 'all' && data.country !== countryFilter) return;

        const card = document.createElement('div');
        card.className = `dogam-card ${data.country}`;
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">${data.name}</div>
            </div>
            <div class="card-body">
                <div class="profile-info">
                    <div><span class="label-orange">역할:</span>${data.role}</div>
                    <div><span class="label-orange">대상:</span>${data.basis}</div>
                    <div><span class="label-orange">병종:</span>${data.army}</div>
                </div>
            </div>
            <div class="skill-box">
                <div class="skill-name">[${data.skillType}] ${data.skillName}</div>
                <div>${data.skillDesc}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterCountry(country) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const countryMap = { 'all': 0, 'wei': 1, 'shu': 2, 'wu': 3, 'qun': 4 };
    const targetIdx = countryMap[country];
    
    if (buttons[targetIdx]) {
        buttons[targetIdx].classList.add('active');
    }
    
    renderDogam(country);
}
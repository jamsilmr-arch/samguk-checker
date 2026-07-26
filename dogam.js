// [시스템 분석] dogam.js - 전서버 랭커 실전 1~10위 추천 전법 100% 동기화 및 초경량 종결 엔진
console.log("[시스템 분석] dogam.js 전서버 랭커 실전 최상위 추천 전법 100% 동기화 및 초경량 엔진 기동");

const cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

// ==========================================================================
// LAYER 1: 55명 무장 단일 원자성 마스터 데이터베이스
// [id, 이름, 진영, 역할, 배치, 고유전법, 전법설명, 스탯, 병종, 장비코드(SC/SH/TC/PC/PCm/SS), 추천전법]
// ==========================================================================
const heroDogamData = [
    // 위나라 (13명)
    { id: 'h_gahu', name: '가후', group: 'wei', role: '능동 (65%)', location: '후열', skill: '경달권변', skillDesc: '적군 단체(2명)에 65% 확률로 혼란 효과를 부여하고 모략 피해(계수 196%, 모략 영향)를 가합니다.', stats: { martial: 437, tactical: 634, command: 503, speed: 469 }, unit: '궁병/방패병', eq: 'SS', tacs: ["혼수모어", "전위위안"] },
    { id: 'h_gwa_ga', name: '곽가', group: 'wei', role: '능동 (50%)', location: '후열', skill: '산무유책', skillDesc: '적군 전체에게 모략 피해(계수 102%, 모략 영향)를 가하고, 대상이 가하는 피해를 18% 감소(2턴 지속)시킵니다.', stats: { martial: 378, tactical: 634, command: 539, speed: 362 }, unit: '궁병/방패병', eq: 'SH', tacs: ["간담상조", "강유겸제"] },
    { id: 'h_samy', name: '사마의', group: 'wei', role: '능동 (60%)', location: '후열', skill: '응시낭고', skillDesc: '전투 1~4턴 시작 시 80% 확률로 공심 100% 획득 또는 받는 모략 피해 30% 감소(1턴). 5턴 이후 매 턴 80% 확률로 1~2명 적에게 모략 피해(계수 154%) 부여.', stats: { martial: 414, tactical: 664, command: 652, speed: 332 }, unit: '방패병/궁병', eq: 'SC', tacs: ["반객위주", "요사여신"] },
    { id: 'h_sunuk', name: '순욱', group: 'wei', role: '능동 (50%)', location: '후열', skill: '거중지중', skillDesc: '아군 전체가 받는 피해를 16% 감소(모략 영향)시키고, 매 턴 아군 2명의 병력을 지속 회복(치료율 74%, 모략 영향)시킵니다.', stats: { martial: 408, tactical: 646, command: 467, speed: 374 }, unit: '궁병/창병', eq: 'SH', tacs: ["간담상조", "강유겸제"] },
    { id: 'h_akjin', name: '악진', group: 'wei', role: '능동 (70%)', location: '전열', skill: '분용당선', skillDesc: '매 턴 100% 발동하여 적군 전열(2명)에 강력한 무용 피해(계수 135%, 무용 영향)를 가하고 자신에게 허약(1턴 지속)을 부여합니다.', stats: { martial: 568, tactical: 461, command: 586, speed: 618 }, unit: '창병/궁병', eq: 'PC', tacs: ["강유겸제", "진퇴유도"] },
    { id: 'h_jeonwi', name: '전위', group: 'wei', role: '패시브 (100%)', location: '전열', skill: '축호과간', skillDesc: '아군 주장이 일반 공격을 받을 시 대신 매서운 반격 무용 피해(계수 152%)를 가하고 공격자의 통솔을 10% 감소시킵니다.', stats: { martial: 658, tactical: 402, command: 598, speed: 367 }, unit: '창병/방패병', eq: 'TC', tacs: ["이아환아", "동장철벽"] },
    { id: 'h_jeonguk', name: '정욱', group: 'wei', role: '추격 (50%)', location: '후열', skill: '십면매복', skillDesc: '일반 공격 후 디버프 상태인 적에게 추가 모략 피해(계수 168%, 모략 영향)를 입히고 2턴간 회복 불가 상태로 만듭니다.', stats: { martial: 402, tactical: 592, command: 503, speed: 487 }, unit: '방패병/궁병', eq: 'SC', tacs: ["사면초가", "심모원려"] },
    { id: 'h_jojo_sp', name: '조조(제왕)', group: 'wei', role: '지휘 (100%)', location: '후열', skill: '군령여산', skillDesc: '아군 전체가 가하는 피해를 16%(통솔 영향) 증가시키고 받는 피해를 16%(통솔 영향) 영구 감소시킵니다.', stats: { martial: 420, tactical: 580, command: 675, speed: 362 }, unit: '창병/방패병', eq: 'TC', tacs: ["이퇴위진", "진퇴유도"] },
    { id: 'h_jojo', name: '조조', group: 'wei', role: '지휘 (100%)', location: '후열', skill: '효웅', skillDesc: '부대 내 아군이 가하는 모든 피해의 12%를 흡수하여 자신의 병력을 치료하고 아군 전체가 받는 피해를 16% 감소시킵니다.', stats: { martial: 420, tactical: 580, command: 675, speed: 362 }, unit: '방패병/기병', eq: 'TC', tacs: ["간담상조", "안영찰채"] },
    { id: 'h_jangryo', name: '장료', group: 'wei', role: '패시브 (100%)', location: '전열', skill: '함진살적', skillDesc: '자신의 일반 공격이 68% 확률로 적군 주장을 정밀 저격하며, 일반 공격 후 대상에게 추가 무용 피해(계수 188%, 무용 영향)를 가합니다.', stats: { martial: 622, tactical: 467, command: 586, speed: 612 }, unit: '창병/기병', eq: 'PCm', tacs: ["질풍노도", "반객위주"] },
    { id: 'h_janghap', name: '장합', group: 'wei', role: '지휘 (100%)', location: '후열', skill: '교변병기', skillDesc: '전투 시작 시 아군 전체의 액티브 전법 발동 확률을 12% 증가시키고, 일반 공격 피격 시 35% 확률로 저항을 부여합니다.', stats: { martial: 580, tactical: 426, command: 592, speed: 463 }, unit: '방패병/창병', eq: 'TC', tacs: ["간담상조", "강유겸제"] },
    { id: 'h_hahoudon', name: '하후돈', group: 'wei', role: '패시브 (50%)', location: '전열', skill: '발시담정', skillDesc: '피해를 입을 때마다 40% 확률로 적군 다수(2명)에게 반격 무용 피해(계수 84%, 무용 영향)를 즉각 가합니다.', stats: { martial: 604, tactical: 396, command: 622, speed: 427 }, unit: '창병/방패병', eq: 'TC', tacs: ["이아환아", "동장철벽"] },
    { id: 'h_hahouyeon', name: '하후연', group: 'wei', role: '능동 (50%)', location: '후열', skill: '충용', skillDesc: '일반 공격 후 적군 전체에게 무용 피해(계수 108%, 무용 영향)를 가하고 30% 확률로 제어 불가(겁전/무장해제)를 1턴 부여합니다.', stats: { martial: 592, tactical: 408, command: 562, speed: 641 }, unit: '창병/기병', eq: 'PCm', tacs: ["일고작기", "암전난방"] },

    // 촉나라 (14명)
    { id: 'h_gwanu', name: '관우', group: 'shu', role: '능동 (50%)', location: '전열', skill: '무성', skillDesc: '1턴 준비 후 적군 전체에게 맹렬한 무용 피해(계수 146%, 무용 영향)를 가하고 50% 확률로 무장해제 또는 겁전을 1턴간 부여하며, 자신의 물리 피해 36% 증가(2턴).', stats: { martial: 658, tactical: 503, command: 628, speed: 558 }, unit: '창병/기병', eq: 'PC', tacs: ["승승장구", "질풍노도"] },
    { id: 'h_gangyu', name: '강유', group: 'shu', role: '추격 (50%)', location: '후열', skill: '담대여두', skillDesc: '홀수 턴에 적군 단체의 무용을 64 강탈하여 무용 피해(계수 184%)를 가하고, 짝수 턴에 모략을 64 강탈하여 모략 피해(계수 184%)를 가합니다.', stats: { martial: 556, tactical: 622, command: 574, speed: 475 }, unit: '방패병/기병', eq: 'SC', tacs: ["천리추격", "일고작기"] },
    { id: 'h_madae', name: '마대', group: 'shu', role: '능동 (35%)', location: '전열', skill: '습참', skillDesc: '1턴 준비 후 적군 2명에게 무용 피해(계수 210%)를 가하고 대상이 가하는 피해를 25% 차단합니다(2턴 지속).', stats: { martial: 485, tactical: 485, command: 568, speed: 552 }, unit: '창병/방패병', eq: 'PC', tacs: ["일고작기", "만전제발"] },
    { id: 'h_macho', name: '마초', group: 'shu', role: '패시브 (100%)', location: '전열', skill: '출수법', skillDesc: '자신의 물리 피해가 34% 증가하고 일반 공격 피해의 54%를 주위 적군에게 확산 전이시킵니다.', stats: { martial: 646, tactical: 414, command: 539, speed: 564 }, unit: '창병/기병', eq: 'PCm', tacs: ["용맹무쌍", "질풍노도"] },
    { id: 'h_seoseo', name: '서서', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '절절학문', skillDesc: '아군이 능동 전법을 발동할 때마다 60% 확률로 아군 전체의 공격력을 14% 증폭(최대 3중첩)합니다.', stats: { martial: 545, tactical: 598, command: 503, speed: 570 }, unit: '창병/궁병', eq: 'SS', tacs: ["문치무공", "전위위안"] },
    { id: 'h_samaga', name: '사마가', group: 'shu', role: '추격 (35%)', location: '전열', skill: '만왕', skillDesc: '일반 공격 후 45% 확률로 대상에게 무용 피해(계수 175%)를 가하고 2턴간 공황 및 약화 상태로 만듭니다.', stats: { martial: 556, tactical: 372, command: 461, speed: 487 }, unit: '창병/방패병', eq: 'PC', tacs: ["만전제발", "용왕직전"] },
    { id: 'h_wuyeon', name: '위연', group: 'shu', role: '패시브 (70%)', location: '전열', skill: '실병제위', skillDesc: '준비 턴이 필요한 능동 전법의 대기 시간을 75% 확률로 즉시 삭제하고 자신의 가하는 피해를 15% 증가시킵니다.', stats: { martial: 604, tactical: 503, command: 622, speed: 362 }, unit: '창병/궁병', eq: 'PC', tacs: ["홍수첨향", "이퇴위진"] },
    { id: 'h_yubi', name: '유비', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '인정', skillDesc: '매 턴 68% 확률로 아군 전체의 병력을 회복(치료율 68%, 모략 영향)시키고 매 턴 10% 확률로 대상의 제어 상태를 해제합니다.', stats: { martial: 509, tactical: 568, command: 652, speed: 368 }, unit: '창병/기병', eq: 'SH', tacs: ["혼수모어", "홍수첨향"] },
    { id: 'h_yubi_sp', name: '유비(제왕)', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '재주복주', skillDesc: '매 턴 아군 2명 치료(치료율 68%, 모략 영향) 및 10% 확률로 대상에게 허약 상태 부여(1턴 지속). 자신이 주장일 시 허약 부여 확률 15%로 상승.', stats: { martial: 509, tactical: 568, command: 652, speed: 368 }, unit: '창병/방패병', eq: 'SH', tacs: ["여자동포", "안영찰채"] },
    { id: 'h_jangbi', name: '장비', group: 'shu', role: '패시브 (50%)', location: '전열', skill: '연인노호', skillDesc: '전투 2, 4턴에 적군 전체에게 무용 피해(계수 104%)를 가하고, 대상이 무장해제 상태일 경우 50% 확률로 통솔 50 감소(2턴). 주장일 시 겁전 대상도 포함.', stats: { martial: 652, tactical: 414, command: 545, speed: 487 }, unit: '창병/방패병', eq: 'TC', tacs: ["진퇴유도", "선등함진"] },
    { id: 'h_jegaryang', name: '제갈량', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '초선차전', skillDesc: '적군 2명이 능동 전법 발동 시 35% 확률로 시전을 차단하고 모략 역피해(계수 102%, 모략 영향)를 줍니다.', stats: { martial: 402, tactical: 681, command: 634, speed: 362 }, unit: '궁병/방패병', eq: 'SH', tacs: ["전위위안", "안영찰채"] },
    { id: 'h_joun', name: '조운', group: 'shu', role: '패시브 (100%)', location: '전열', skill: '칠진칠출', skillDesc: '자신에게 상시 영구 통찰(제어 면역) 상태를 부여하고 무용, 모략, 속도, 통솔 속성이 40(주장 시 50) 증가합니다.', stats: { martial: 658, tactical: 473, command: 622, speed: 487 }, unit: '창병/방패병', eq: 'PC', tacs: ["이아환아", "횡징폭렴"] },
    { id: 'h_hwangchung', name: '황충', group: 'shu', role: '패시브 (100%)', location: '후열', skill: '적혈도', skillDesc: '자신의 전법 크리티컬(회심) 확률을 25% 증가시키고, 회심 발동 시 가하는 피해량이 50% 증가합니다.', stats: { martial: 622, tactical: 503, command: 521, speed: 481 }, unit: '창병/방패병', eq: 'PC', tacs: ["횡징폭렴", "강유겸제"] },
    { id: 'h_hwangworyeong', name: '황월영', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '묘산천기', skillDesc: '전투 첫 3턴 동안 아군 전체가 가하는 전법 피해를 30% 폭증시키고 4턴부터 가하는 피해 15% 감소.', stats: { martial: 432, tactical: 628, command: 521, speed: 522 }, unit: '궁병/방패병', eq: 'SH', tacs: ["간담상조", "혼수모어"] },

    // 오나라 (15명)
    { id: 'h_daegyo', name: '대교', group: 'wu', role: '지휘 (100%)', location: '후열', skill: '정수유심', skillDesc: '아군 전체가 받는 피해의 18%를 적 시전자에게 즉각 반사 유도하고 매 턴 병력을 회복(치료율 62%)합니다.', stats: { martial: 372, tactical: 562, command: 562, speed: 368 }, unit: '창병/궁병', eq: 'SH', tacs: ["간담상조", "동장철벽"] },
    { id: 'h_nosuk', name: '노숙', group: 'wu', role: '지휘 (100%)', location: '후열', skill: '탑상책', skillDesc: '전투 2턴 시작 시 자신의 속성 40%를 병력이 가장 낮은 아군에게 양도하고 3~5턴 동안 피해 감소 26% 부여.', stats: { martial: 443, tactical: 580, command: 515, speed: 528 }, unit: '궁병/기병', eq: 'SH', tacs: ["분성지계", "여자동포"] },
    { id: 'h_sogyo', name: '소교', group: 'wu', role: '능동 (70%)', location: '후열', skill: '화용욕모', skillDesc: '적군 2명의 방어 스탯(통솔/모략)을 20% 해제하고 아군 전체의 전법 발동률을 12% 보정합니다.', stats: { martial: 437, tactical: 568, command: 539, speed: 552 }, unit: '궁병/기병', eq: 'SH', tacs: ["진퇴유도", "간담상조"] },
    { id: 'h_songyeon', name: '손견', group: 'wu', role: '지휘 (100%)', location: '전열', skill: '강동맹호', skillDesc: '적군 전체에게 도발을 시전하여 일반 공격을 강제 집중시키고 자신이 받는 피해를 28% 감소(2턴 지속)시킵니다.', stats: { martial: 568, tactical: 414, command: 658, speed: 427 }, unit: '창병/방패병', eq: 'TC', tacs: ["이아환아", "동장철벽"] },
    { id: 'h_songwon', name: '손권', group: 'wu', role: '지휘 (100%)', location: '후열', skill: '웅거', skillDesc: '아군이 일반 공격을 행할 때마다 75% 확률로 자신에게 연격, 통찰, 강공, 기습, 선공 중 1개의 버프를 2턴간 획득합니다.', stats: { martial: 568, tactical: 568, command: 598, speed: 528 }, unit: '궁병/기병', eq: 'SC', tacs: ["기문둔갑", "간담상조"] },
    { id: 'h_sonsanghyang', name: '손상향', group: 'wu', role: '능동 (50%)', location: '후열', skill: '효희', skillDesc: '일반 공격 전 자신에게 걸린 버프 1개당 물리 피해량 20% 증가(최대 5중첩) 및 추가 물리 타격(계수 88%)을 가합니다.', stats: { martial: 574, tactical: 408, command: 539, speed: 558 }, unit: '궁병/기병', eq: 'PCm', tacs: ["일고작기", "천리추격"] },
    { id: 'h_sonchaek', name: '손책', group: 'wu', role: '능동 (50%)', location: '전열', skill: '강동패주', skillDesc: '일반 공격 후 35% 확률로 대상에게 맹렬한 무용 연타 피해(계수 192%)를 입히고 피해량의 50%를 흡혈합니다.', stats: { martial: 616, tactical: 437, command: 634, speed: 546 }, unit: '창병/방패병', eq: 'PC', tacs: ["용맹무쌍", "일고작기"] },
    { id: 'h_songwon_sp', name: '손권(제왕)', group: 'wu', role: '지휘 (100%)', location: '후열', skill: '겸권상계', skillDesc: '오나라 진영 무장들과 결선 시 아군 전체의 전술 스탯을 15% 증가시키고 매 턴 50% 확률로 피해 감소 20% 부여.', stats: { martial: 568, tactical: 568, command: 598, speed: 528 }, unit: '창병/궁병', eq: 'SS', tacs: ["이퇴위진", "강유겸제"] },
    { id: 'h_yeomong', name: '여몽', group: 'wu', role: '지휘 (100%)', location: '전열', skill: '백의도강', skillDesc: '전투 첫 턴에 아군 전체에 1회의 확정 회피(도피)를 부여하고, 피해를 입힐 때마다 40% 확률로 무장해제 또는 겁전을 겁니다.', stats: { martial: 527, tactical: 568, command: 556, speed: 534 }, unit: '방패병/궁병', eq: 'SS', tacs: ["화소적벽", "기문둔갑"] },
    { id: 'h_yukson', name: '육손', group: 'wu', role: '추격 (50%)', location: '후열', skill: '지변규려', skillDesc: '적군 2명에게 화상(계수 84%, 3턴 지속)을 입히고 이미 화상 상태면 광역 폭발 모략 피해(계수 164%)를 줍니다.', stats: { martial: 443, tactical: 658, command: 592, speed: 368 }, unit: '창병/기병', eq: 'SC', tacs: ["천리추격", "체천행도"] },
    { id: 'h_yukhang', name: '육항', group: 'wu', role: '능동 (60%)', location: '후열', skill: '청백충근', skillDesc: '아군 주장의 모략 회심 확률을 25% 증가시키고 주장이 받는 피해의 30%를 대신 숄더링하여 분담합니다.', stats: { martial: 509, tactical: 628, command: 574, speed: 439 }, unit: '창병/궁병', eq: 'SH', tacs: ["수상개화", "요사여신"] },
    { id: 'h_juyu', name: '주유', group: 'wu', role: '패시브 (80%)', location: '후열', skill: '봉화연천', skillDesc: '자신이 능동 전법을 발동할 때마다 80% 확률로 적 전체에게 광역 모략 불화살 피해(계수 68%, 모략 영향)를 투하합니다.', stats: { martial: 443, tactical: 646, command: 580, speed: 403 }, unit: '창병/궁병', eq: 'SC', tacs: ["화소적벽", "요사여신"] },
    { id: 'h_jutae', name: '주태', group: 'wu', role: '지휘 (100%)', location: '전열', skill: '청라산개', skillDesc: '아군 주장이 입는 피해의 35%, 부대원이 입는 피해의 20%를 대신 흡수하고 주장의 공격력을 18% 증가시킵니다.', stats: { martial: 562, tactical: 479, command: 622, speed: 481 }, unit: '기병/방패병', eq: 'TC', tacs: ["이아환아", "동장철벽"] },
    { id: 'h_jeongbo', name: '정보', group: 'wu', role: '지휘 (100%)', location: '전열', skill: '칠척사모', skillDesc: '피해를 입을 때마다 35% 확률로 자신에게 걸린 디버프를 해제하고 적 1명에게 공포(1턴)를 부여합니다.', stats: { martial: 503, tactical: 503, command: 610, speed: 433 }, unit: '기병/방패병', eq: 'TC', tacs: ["간담상조", "동구적개"] },
    { id: 'h_hwanggae', name: '황개', group: 'wu', role: '능동 (50%)', location: '전열', skill: '요원지화', skillDesc: '자신의 병력 20%를 소모하여 적군 전체에게 화상 및 확정적 모략 피해(계수 122%, 2턴 지속)를 가합니다.', stats: { martial: 497, tactical: 491, command: 652, speed: 481 }, unit: '방패병/궁병', eq: 'TC', tacs: ["화소적벽", "횡소천군"] },

    // 군진영 (13명)
    { id: 'h_gongsonchan', name: '공손찬', group: 'qun', role: '패시브 (100%)', location: '전열', skill: '위진새북', skillDesc: '전투 전 2턴 간 부대 전체의 전법 발동률을 13% 증가시키고 액티브 타격 후 속도 비례 추가 무용 피해(계수 96%)를 입힙니다.', stats: { martial: 604, tactical: 527, command: 592, speed: 582 }, unit: '기병/창병', eq: 'PCm', tacs: ["극적제승", "암전난방"] },
    { id: 'h_dongtak', name: '동탁', group: 'qun', role: '지휘 (100%)', location: '전열', skill: '전권난정', skillDesc: '매 턴 자신의 무용을 15% 증폭시키며, 5턴 시작 시 적과 아군 전체에 무차별 무용 피해(계수 68%) 및 50% 흡혈을 시전합니다.', stats: { martial: 556, tactical: 491, command: 646, speed: 481 }, unit: '방패병/기병', eq: 'TC', tacs: ["혼수모어", "강유겸제"] },
    { id: 'h_anryang', name: '안량', group: 'qun', role: '능동 (50%)', location: '전열', skill: '효장', skillDesc: '1턴 준비 후 적 2명에게 무용 참격 충격(계수 180%)을 가하고 1턴간 확정적 공포 제어 상태로 격리합니다.', stats: { martial: 598, tactical: 384, command: 515, speed: 534 }, unit: '창병/기병', eq: 'PC', tacs: ["만전제발", "용왕직전"] },
    { id: 'h_yeopo', name: '여포', group: 'qun', role: '패시브 (100%)', location: '전열', skill: '천하무쌍', skillDesc: '적군 단일에게 일기토를 신청하여 서로 일반 공격을 3회 주고받음. 일기토 중 자신은 제어에 면역되고 받는 피해가 7% 감소하며 일반 공격 후 추격 전법 정상 발동.', stats: { martial: 675, tactical: 378, command: 556, speed: 546 }, unit: '궁병/기병', eq: 'PCm', tacs: ["용왕직전", "만부막적"] },
    { id: 'h_ugil', name: '우길', group: 'qun', role: '지휘 (70%)', location: '후열', skill: '태평경', skillDesc: '2턴 시작 시 적군 전체에게 수공(계수 72%, 모략 영향, 4턴 지속)을 걸어 지속적인 모략 피해 및 받는 모략 피해 10% 증가 부여.', stats: { martial: 443, tactical: 592, command: 527, speed: 516 }, unit: '창병/궁병', eq: 'SS', tacs: ["진퇴유도", "기문둔갑"] },
    { id: 'h_wonso', name: '원소', group: 'qun', role: '지휘 (100%)', location: '후열', skill: '사소도', skillDesc: '1턴 준비 후 적 2명에게 물리 피해(계수 126%) 및 화상(계수 60%, 2턴 지속)을 입히고 아군 전체의 통솔 80 증가(3턴 지속).', stats: { martial: 515, tactical: 521, command: 634, speed: 493 }, unit: '방패병/기병', eq: 'TC', tacs: ["견진연봉", "위위구조"] },
    { id: 'h_janggak', name: '장각', group: 'qun', role: '능동 (50%)', location: '후열', skill: '황천당립', skillDesc: '1턴 준비 후 무작위 적에게 5회의 천벌 벼락 모략 타격(계수 136%)을 가하고 30% 확률로 공황(1턴)을 부여합니다.', stats: { martial: 473, tactical: 610, command: 616, speed: 368 }, unit: '궁병/기병', eq: 'SC', tacs: ["사면초가", "화소적벽"] },
    { id: 'h_jangnyeong', name: '장녕', group: 'qun', role: '능동 (50%)', location: '후열', skill: '천의난위', skillDesc: '적군 단체의 모략과 통솔을 38 흡수하여 아군에게 공유하고 강력한 모략 피해(계수 184%)를 줍니다.', stats: { martial: 461, tactical: 598, command: 556, speed: 457 }, unit: '궁병/방패병', eq: 'SS', tacs: ["수상개화", "양의화생"] },
    { id: 'h_jangbo', name: '장보', group: 'qun', role: '능동 (50%)', location: '후열', skill: '요풍사기', skillDesc: '적 전체에 모래바람 모략 피해(계수 106%)를 입히고 아군 전체에게 장벽 2중첩(피해 40% 흡수)을 부여합니다.', stats: { martial: 414, tactical: 562, command: 551, speed: 433 }, unit: '궁병/방패병', eq: 'SS', tacs: ["강유겸제", "진퇴유도"] },
    { id: 'h_jwaja', name: '좌자', group: 'qun', role: '패시브 (100%)', location: '후열', skill: '화겁생기', skillDesc: '전투 첫 2턴 간 아군 전체에게 회피 35%를 부여하고 3~5턴 동안 매 턴 병력을 회복(치료율 68%)시킵니다.', stats: { martial: 437, tactical: 658, command: 497, speed: 403 }, unit: '궁병/방패병', eq: 'SH', tacs: ["안영찰채", "유좌유용"] },
    { id: 'h_chaemunhui', name: '채문희', group: 'qun', role: '능동 (70%)', location: '후열', skill: '비분시', skillDesc: '아군 2명의 병력을 회복(치료율 122%, 모략 영향)시키고 50% 확률로 가하는 피해 26% 증가 또는 받는 피해 26% 감소를 부여.', stats: { martial: 372, tactical: 598, command: 509, speed: 558 }, unit: '궁병/기병', eq: 'SH', tacs: ["간담상조", "강유겸제"] },
    { id: 'h_choseon', name: '초선', group: 'qun', role: '능동 (50%)', location: '후열', skill: '폐월', skillDesc: '적군 단체를 매혹하여 자신이 입는 피해의 35%를 해당 적이 대신 분담하게 만들고 대상의 통솔/무용을 14% 감소시킵니다.', stats: { martial: 372, tactical: 592, command: 556, speed: 433 }, unit: '창병/기병', eq: 'SH', tacs: ["혼수모어", "위위구조"] },
    { id: 'h_hwata', name: '화타', group: 'qun', role: '능동 (50%)', location: '후열', skill: '청낭제세', skillDesc: '전투 전반기(1~4턴) 동안 아군 2명의 통솔을 40 증가시키고 피격 시 50% 확률로 즉각 병력을 회복(치료율 68%)시킵니다.', stats: { martial: 372, tactical: 598, command: 432, speed: 362 }, unit: '궁병/방패병', eq: 'SH', tacs: ["간담상조", "휴양생식"] }
];

const EQ_PRESETS = {
    PC: ["호분관","강공, 기습 상승","창병 피해 가함","명광갑","무용 피해 가함","창병 배반, 공심 상승","치룡패","무용 피해 가함","창병 배반, 공심 상승"],
    PCm: ["백옥잠","연격률","창병 피해 가함","세린갑","무용 피해 가함","창병 배반, 공심 상승","쌍호뉴","연격률","창병 배반, 공심 상승"],
    SC:  ["진현관","강공, 기습 상승","창병 피해 가함","명재복","모략 피해 가함","창병 배반, 공심 상승","박산로","배반, 공심 상승","창병 배반, 공심 상승"],
    TC: ["연함규","피해 감소","창병 피해 가함","청등갑","피해 감소","창병 피해 감소","사남패","피해 감소","창병 배반, 공심 상승"],
    SH: ["연함규","피해 감소","치유 효과 부여","청등갑","피해 감소","창병 치유 효과 상승","사남패","치유 효과 받음","창병 피해 감소"],
    SS: ["진현관","피해 감소","치유 효과 부여","명재복","피해 감소","창병 피해 감소","박산로","치유 효과 부여","창병 피해 감소"]
};

const masterHeroLookupMap = {};
heroDogamData.forEach(h => { if (h?.name) masterHeroLookupMap[cStr(h.name)] = h; });

const injectDogamStyles = () => {
    if (document.getElementById('dogam-custom-styles')) return;
    const style = document.createElement('style');
    style.id = 'dogam-custom-styles';
    style.innerHTML = `
        .dogam-card-item{background:#111;border:1px solid #2d2d2d;border-radius:6px;padding:15px 20px;cursor:pointer;transition:all .2s ease;position:relative;display:flex;flex-direction:column;justify-content:flex-start;box-sizing:border-box;min-height:180px;opacity:.4;filter:grayscale(100%)}.dogam-card-item.owned{background:#1c1c1c;border-color:#4ade80;box-shadow:0 0 12px rgba(74,222,128,.15);opacity:1;filter:grayscale(0%)}.dogam-card-item.wei{border-top:5px solid #2270b5}.dogam-card-item.shu{border-top:5px solid #b82d2d}.dogam-card-item.wu{border-top:5px solid #2a9d8f}.dogam-card-item.qun{border-top:5px solid #cd9b33}.dogam-card-item .d-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px solid #333;padding-bottom:8px}.dogam-card-item .d-name{font-size:18px;font-weight:700;color:#888;letter-spacing:1px}.dogam-card-item.owned .d-name{color:#fff}.dogam-card-item .d-faction{font-size:11px;font-weight:700}.dogam-card-item.wei .d-faction{color:#2270b5}.dogam-card-item.shu .d-faction{color:#b82d2d}.dogam-card-item.wu .d-faction{color:#2a9d8f}.dogam-card-item.qun .d-faction{color:#cd9b33}.dogam-card-item .d-status{font-size:10px;padding:3px 6px;border-radius:4px;background:#333;color:#777;font-weight:700;white-space:nowrap}.dogam-card-item.owned .d-status{background:#28a745;color:#fff}.dogam-card-item .d-meta{display:flex;gap:12px;font-size:11px;color:#bbb;margin-bottom:4px}.dogam-card-item .d-meta span{color:#feca57;font-weight:700}.dogam-card-item .d-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;background:rgba(0,0,0,.4);border:1px solid #333;border-radius:4px;padding:8px;margin:10px 0;font-size:11px}.dogam-card-item .d-equip{background:rgba(0,0,0,.5);border:1px solid #333;border-radius:4px;padding:8px;margin-bottom:8px;font-size:11px}.dogam-card-item .d-equip-title{color:#feca57;font-weight:700;margin-bottom:4px}.dogam-card-item .d-equip-list{display:flex;flex-direction:column;gap:3px;color:#ccc}.dogam-card-item .d-tactic{background:rgba(168,85,247,.08);border:1px solid #44315f;border-left:3px solid #a855f7;border-radius:4px;padding:8px;margin-bottom:10px;font-size:11px}.dogam-card-item .d-tactic-title{color:#c084fc;font-weight:700;margin-bottom:4px}.dogam-card-item .d-tactic-list{display:flex;flex-direction:column;gap:3px;color:#ccc}.dogam-card-item .d-tactic-item{cursor:pointer}.dogam-card-item .d-tactic-item span{color:#fff;font-weight:700;text-decoration:underline;text-underline-offset:2px}.dogam-card-item .d-desc{background:rgba(20,20,20,.6);border:1px solid #2a2a2a;border-radius:4px;padding:8px;font-size:11px;line-height:1.5;margin-top:auto}.dogam-card-item .d-desc-title{color:#38bdf8;font-weight:700;margin-bottom:3px}.dogam-card-item .d-desc-text{color:#ddd;word-break:keep-all}
    `;
    document.head.appendChild(style);
};

// ==========================================================================
// LAYER 2: API 브릿지 개방 구역 (deck_core.js 동기화 및 초경량 조회 엔진)
// ==========================================================================
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
    const target = masterHeroLookupMap[cStr(officerName)];
    if (!target) return null;
    const p = EQ_PRESETS[target.eq || 'PC'] || EQ_PRESETS['PC'];
    const unitPrefix = target.unit?.split('/')[0] || "방패병";
    return {
        helmet: { name: p[0], attr1: p[1].replace(/(창병|기병|궁병|방패병)/g, unitPrefix), attr2: p[2].replace(/(창병|기병|궁병|방패병)/g, unitPrefix) },
        armor: { name: p[3], attr1: p[4].replace(/(창병|기병|궁병|방패병)/g, unitPrefix), attr2: p[5].replace(/(창병|기병|궁병|방패병)/g, unitPrefix) },
        accessory: { name: p[6], attr1: p[7].replace(/(창병|기병|궁병|방패병)/g, unitPrefix), attr2: p[8].replace(/(창병|기병|궁병|방패병)/g, unitPrefix) }
    };
};

window.getOfficerRecommendedTacticsFromDogam = function(officerName) {
    const target = masterHeroLookupMap[cStr(officerName)];
    return target?.tacs || ["간담상조", "동장철벽"];
};

// ==========================================================================
// LAYER 3: 도감 와이드 렌더링 및 백데이터 보존 파이프라인
// ==========================================================================
let currentDogamState = [];
let currentFactionFilter = 'all';

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
        <div id="dogam-stats-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:2px solid #333;padding-bottom:10px;">
            <h2 style="color:#cd9b33;margin:0;font-size:22px;">장수 도감 마스터 보드</h2>
            <span id="dogam-count-badge" style="color:#aaa;font-weight:bold;font-size:15px;">보유율: </span>
        </div>
        <div id="dogam-card-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:15px;width:100%;align-items:stretch;"></div>
    `;
    renderDogamGrid();
}

function formatEqAttr(val, unitPrefix) {
    if (!val) return "-";
    return val.replace(/(창병|기병|궁병|방패병)/g, unitPrefix).replace(unitPrefix === "창병" ? "강공, 기습 증가" : "강공, 기습 상승", unitPrefix === "창병" ? "강공, 기습 상승" : "강공, 기습 증가").trim();
}

function renderDogamGrid() {
    const gridContainer = document.getElementById('dogam-card-grid');
    const countBadge = document.getElementById('dogam-count-badge');
    if (!gridContainer) return;

    const filteredHeroes = currentDogamState.filter(h => currentFactionFilter === 'all' || currentFactionFilter === '전체' || h.faction === currentFactionFilter);
    const ownedCount = filteredHeroes.filter(h => h.isOwned).length;
    if (countBadge) countBadge.innerHTML = `[${{wei:'위나라',shu:'촉나라',wu:'오나라',qun:'군진영'}[currentFactionFilter]||'전체'}] 보유율: <span style="color:#38bdf8;font-size:18px;">${ownedCount}</span> / ${filteredHeroes.length}`;

    gridContainer.innerHTML = filteredHeroes.map(hero => {
        const primaryUnit = hero.unit?.split('/')[0] || "방패병";
        const eqP = EQ_PRESETS[hero.eq || 'PC'] || EQ_PRESETS['PC'];
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
                ${hero.stats ? `<div class="d-stats"><div><span style="color:#ff9f43;margin-right:4px;">⚔️ 무용:</span><span style="color:#fff;font-weight:bold;">${hero.stats.martial}</span></div><div><span style="color:#38bdf8;margin-right:4px;">🔮 모략:</span><span style="color:#fff;font-weight:bold;">${hero.stats.tactical}</span></div><div><span style="color:#2ec4b6;margin-right:4px;">🛡️ 통솔:</span><span style="color:#fff;font-weight:bold;">${hero.stats.command}</span></div><div><span style="color:#a855f7;margin-right:4px;">⚡ 속도:</span><span style="color:#fff;font-weight:bold;">${hero.stats.speed}</span></div></div>` : ''}
                <div class="d-equip">
                    <div class="d-equip-title">🛠️ 추천 장비 및 세련 속성</div>
                    <div class="d-equip-list">
                        <div>🪖 <span style="color:#fff;font-weight:bold;">${eqP[0]}</span> <span style="color:#38bdf8;">[${formatEqAttr(eqP[1], primaryUnit)} / ${formatEqAttr(eqP[2], primaryUnit)}]</span></div>
                        <div>🛡️ <span style="color:#fff;font-weight:bold;">${eqP[3]}</span> <span style="color:#38bdf8;">[${formatEqAttr(eqP[4], primaryUnit)} / ${formatEqAttr(eqP[5], primaryUnit)}]</span></div>
                        <div>📿 <span style="color:#fff;font-weight:bold;">${eqP[6]}</span> <span style="color:#38bdf8;">[${formatEqAttr(eqP[7], primaryUnit)} / ${formatEqAttr(eqP[8], primaryUnit)}]</span></div>
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

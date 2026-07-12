console.log("[시스템 분석] dogam.js 강제 가로 확장 반응형 그리드 렌더링 엔진 기동");

// ==========================================================================
// LAYER 1: 무장 마스터 데이터베이스 (원본 스탯 및 설명 데이터 완전 복구)
// ==========================================================================
const heroDogamData = [
    // 위나라 (13명)
    { 
        id: 'h_gahu', name: '가후', group: 'wei', role: '능동 (65%)', location: '후열', skill: '경달권변', 
        skillDesc: '적군 단체에 혼란 효과를 부여하고 모략 피해를 가합니다.',
        stats: { martial: 437, tactical: 634, command: 503, speed: 469 }
    },
    { 
        id: 'h_gwa_ga', name: '곽가', group: 'wei', role: '능동 (50%)', location: '후열', skill: '산무유책', 
        skillDesc: '적군 전체에 모략 피해를 가하고 가하는 피해를 감소시킵니다.',
        stats: { martial: 378, tactical: 634, command: 539, speed: 362 }
    },
    { 
        id: 'h_samy', name: '사마의', group: 'wei', role: '능동 (60%)', location: '후열', skill: '응시낭고', 
        skillDesc: '턴이 진행될수록 가하는 모략 피해가 점진적으로 폭발 상승합니다.',
        stats: { martial: 414, tactical: 664, command: 652, speed: 332 }
    },
    { 
        id: 'h_sunuk', name: '순욱', group: 'wei', role: '능동 (50%)', location: '후열', skill: '거중지중', 
        skillDesc: '아군 전체가 받는 피해를 상시 억제하고 병력을 지속 회복시킵니다.',
        stats: { martial: 408, tactical: 646, command: 467, speed: 374 }
    },
    { 
        id: 'h_akjin', name: '악진', group: 'wei', role: '능동 (70%)', location: '전열', skill: '분용당선', 
        skillDesc: '적군 전열에 강력한 무용 피해를 가하고 자신에게 허약을 부여합니다.',
        stats: { martial: 568, tactical: 461, command: 586, speed: 618 }
    },
    { 
        id: 'h_jeonwi', name: '전위', group: 'wei', role: '패시브 (100%)', location: '전열', skill: '축호과간', 
        skillDesc: '아군 주장이 일반 공격을 받을 시 대신 매서운 반격을 가합니다.',
        stats: { martial: 658, tactical: 402, command: 598, speed: 367 }
    },
    { 
        id: 'h_jeonguk', name: '정욱', group: 'wei', role: '추격 (50%)', location: '후열', skill: '십면매복', 
        skillDesc: '일반 공격 후 디버프 상태인 적에게 추가 모략 피해를 입립니다.',
        stats: { martial: 402, tactical: 592, command: 503, speed: 487 }
    },
    { 
        id: 'h_jojo_sp', name: '조조(제왕)', group: 'wei', role: '지휘 (100%)', location: '후열', skill: '군령여산', 
        skillDesc: '아군 전체의 가하는 피해를 통솔에 비례하여 영구 증폭시킵니다.',
        stats: { martial: 420, tactical: 580, command: 675, speed: 362 }
    },
    { 
        id: 'h_jojo', name: '조조', group: 'wei', role: '지휘 (100%)', location: '후열', skill: '효웅', 
        skillDesc: '부대 내 아군이 가하는 모든 피해의 일정 비율을 흡수하여 치료합니다.',
        stats: { martial: 420, tactical: 580, command: 675, speed: 362 }
    },
    { 
        id: 'h_jangryo', name: '장료', group: 'wei', role: '패시브 (100%)', location: '전열', skill: '함진살적', 
        skillDesc: '자신의 일반 공격이 적군 주장을 정밀 저격하도록 타겟을 고정합니다.',
        stats: { martial: 622, tactical: 467, command: 586, speed: 612 }
    },
    { 
        id: 'h_janghap', name: '장합', group: 'wei', role: '지휘 (100%)', location: '후열', skill: '교변병기', 
        skillDesc: '전투 시작 시 아군 전체의 전법 발동 확률을 유의미하게 끌어올립니다.',
        stats: { martial: 580, tactical: 426, command: 592, speed: 463 }
    },
    { 
        id: 'h_hahoudon', name: '하후돈', group: 'wei', role: '패시브 (50%)', location: '전열', skill: '발시담정', 
        skillDesc: '피해를 입을 때마다 일정 확률로 적군 전체에 즉각 반격을 가합니다.',
        stats: { martial: 604, tactical: 396, command: 622, speed: 427 }
    },
    { 
        id: 'h_hahouyeon', name: '하후연', group: 'wei', role: '능동 (50%)', location: '후열', skill: '충용', 
        skillDesc: '적군 전체에 무용 피해를 입히고 확률적으로 제어 불가를 부여합니다.',
        stats: { martial: 592, tactical: 408, command: 562, speed: 641 }
    },

    // 촉나라 (14명)
    { 
        id: 'h_gwanu', name: '관우', group: 'shu', role: '능동 (50%)', location: '전열', skill: '무성', 
        skillDesc: '1턴 준비 후 적군 전체에 치명적인 무용 피해를 가하고 무장 해제를 겁니다.',
        stats: { martial: 658, tactical: 503, command: 628, speed: 558 }
    },
    { 
        id: 'h_gangyu', name: '강유', group: 'shu', role: '추격 (50%)', location: '후열', skill: '담대여두', 
        skillDesc: '일반 공격 후 적의 스탯을 빼앗아 자신에게 흡수 누적시킵니다.',
        stats: { martial: 556, tactical: 622, command: 574, speed: 475 }
    },
    { 
        id: 'h_madae', name: '마대', group: 'shu', role: '능동 (35%)', location: '전열', skill: '습참', 
        skillDesc: '적군 단체에 피해를 입히고 가하는 피해량을 일정 비율 차단합니다.',
        stats: { martial: 485, tactical: 485, command: 568, speed: 552 }
    },
    { 
        id: 'h_macho', name: '마초', group: 'shu', role: '패시브 (100%)', location: '전열', skill: '출수법', 
        skillDesc: '자신의 일반 공격 피해를 주위 적들에게 확산 전이시킵니다.',
        stats: { martial: 646, tactical: 414, command: 539, speed: 564 }
    },
    { 
        id: 'h_seoseo', name: '서서', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '절절학문', 
        skillDesc: '아군이 능동 전법을 발동할 때마다 아군 전체의 공격력을 증폭합니다.',
        stats: { martial: 545, tactical: 598, command: 503, speed: 570 }
    },
    { 
        id: 'h_samaga', name: '사마가', group: 'shu', role: '추격 (35%)', location: '전열', skill: '만왕', 
        skillDesc: '일반 공격 후 대상을 변칙적인 공황 및 약화 상태로 빠뜨립니다.',
        stats: { martial: 556, tactical: 372, command: 461, speed: 487 }
    },
    { 
        id: 'h_wuyeon', name: '위연', group: 'shu', role: '패시브 (70%)', location: '전열', skill: '실병제위', 
        skillDesc: '준비 턴이 필요한 능동 전법의 대기 시간을 확률적으로 즉시 삭제합니다.',
        stats: { martial: 604, tactical: 503, command: 622, speed: 362 }
    },
    { 
        id: 'h_yubi', name: '유비', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '인정', 
        skillDesc: '매 턴 아군 전체의 병력을 안정적으로 정량 회복시키고 속성을 높입니다.',
        stats: { martial: 509, tactical: 568, command: 652, speed: 368 }
    },
    { 
        id: 'h_yubi_sp', name: '유비(제왕)', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '재주복주', 
        skillDesc: '부대 전체의 방어력을 극대화하고 치명적인 디버프를 아군 대신 상쇄합니다.',
        stats: { martial: 509, tactical: 568, command: 652, speed: 368 }
    },
    { 
        id: 'h_jangbi', name: '장비', group: 'shu', role: '패시브 (50%)', location: '전열', skill: '연인노호', 
        skillDesc: '2, 4턴 시작 시 적군 전체의 방어 스탯을 붕괴시키고 공포를 겁니다.',
        stats: { martial: 652, tactical: 414, command: 545, speed: 487 }
    },
    { 
        id: 'h_jegaryang', name: '제갈량', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '초선차전', 
        skillDesc: '적군이 능동 전법을 시도할 시 높은 확률로 차단하고 역피해를 줍니다.',
        stats: { martial: 402, tactical: 681, command: 634, speed: 362 }
    },
    { 
        id: 'h_joun', name: '조운', group: 'shu', role: '패시브 (100%)', location: '전열', skill: '칠진칠출', 
        skillDesc: '자신에게 상시 영구 통찰 상태를 부여하고 모든 고유 스탯을 폭증시킵니다.',
        stats: { martial: 658, tactical: 473, command: 622, speed: 487 }
    },
    { 
        id: 'h_hwangchung', name: '황충', group: 'shu', role: '패시브 (100%)', location: '후열', skill: '적혈도', 
        skillDesc: '자신의 전법 크리티컬(회심) 확률을 상시 임계점 이상으로 유지합니다.',
        stats: { martial: 622, tactical: 503, command: 521, speed: 481 }
    },
    { 
        id: 'h_hwangworyeong', name: '황월영', group: 'shu', role: '지휘 (100%)', location: '후열', skill: '묘산천기', 
        skillDesc: '전투 첫 3턴 동안 아군 전체가 가하는 전법 피해를 강제로 폭증시킵니다.',
        stats: { martial: 432, tactical: 628, command: 521, speed: 522 }
    },

    // 오나라 (15명)
    { 
        id: 'h_daegyo', name: '대교', group: 'wu', role: '지휘 (100%)', location: '후열', skill: '정수유심', 
        skillDesc: '아군 전체가 받는 피해의 일부를 적 시전자에게 즉각 반사 유도합니다.',
        stats: { martial: 372, tactical: 562, command: 562, speed: 368 }
    },
    { 
        id: 'h_nosuk', name: '노숙', group: 'wu', role: '지휘 (100%)', location: '후열', skill: '탑상책', 
        skillDesc: '자신의 속성 절반을 아군에게 양도하고 병력이 낮은 아군을 집중 보호합니다.',
        stats: { martial: 443, tactical: 580, command: 515, speed: 528 }
    },
    { 
        id: 'h_sogyo', name: '소교', group: 'wu', role: '능동 (70%)', location: '후열', skill: '화용욕모', 
        skillDesc: '적군 단체의 방어선을 완전 해제하고 아군의 전법 발동률을 보정합니다.',
        stats: { martial: 437, tactical: 568, command: 539, speed: 552 }
    },
    { 
        id: 'h_songyeon', name: '손견', group: 'wu', role: '지휘 (100%)', location: '전열', skill: '강동맹호', 
        skillDesc: '적군 전체에 도발을 시전하여 모든 일반 공격을 자신에게 강제 집중시킵니다.',
        stats: { martial: 568, tactical: 414, command: 658, speed: 427 }
    },
    { 
        id: 'h_songwon', name: '손권', group: 'wu', role: '지휘 (100%)', location: '후열', skill: '웅거', 
        skillDesc: '아군이 일반 공격을 행할 때마다 자신에게 연격, 통찰 등의 영웅 버프를 중첩합니다.',
        stats: { martial: 568, tactical: 568, command: 598, speed: 528 }
    },
    { 
        id: 'h_sonsanghyang', name: '손상향', group: 'wu', role: '능동 (50%)', location: '후열', skill: '효희', 
        skillDesc: '자신에게 걸린 버프 개수에 비례하여 무용 타격 횟수와 화력이 증가합니다.',
        stats: { martial: 574, tactical: 408, command: 539, speed: 558 }
    },
    { 
        id: 'h_sonchaek', name: '손책', group: 'wu', role: '능동 (50%)', location: '전열', skill: '강동패주', 
        skillDesc: '일반 공격 시 확률적으로 파괴적인 연타 피해를 입히고 병력을 흡혈합니다.',
        stats: { martial: 616, tactical: 437, command: 634, speed: 546 }
    },
    { 
        id: 'h_songwon_sp', name: '손권(제왕)', group: 'wu', role: '지휘 (100%)', location: '후열', skill: '겸권상계', 
        skillDesc: '오나라 진영 무장들과 결선 시 아군 전체의 전술 스탯을 최대치로 개방합니다.',
        stats: { martial: 568, tactical: 568, command: 598, speed: 528 }
    },
    { 
        id: 'h_yeomong', name: '여몽', group: 'wu', role: '지휘 (100%)', location: '전열', skill: '백의도강', 
        skillDesc: '전투 첫 턴에 아군 전체에 도피를 부여하고 무용/모략 차단 제어를 독립 연산합니다.',
        stats: { martial: 527, tactical: 568, command: 556, speed: 534 }
    },
    { 
        id: 'h_yukson', name: '육손', group: 'wu', role: '추격 (50%)', location: '후열', skill: '지변규려', 
        skillDesc: '일반 공격 후 대상에게 화상을 입히고 이미 화상 상태면 폭발 확산 피해를 줍니다.',
        stats: { martial: 443, tactical: 658, command: 592, speed: 368 }
    },
    { 
        id: 'h_yukhang', name: '육항', group: 'wu', role: '능동 (60%)', location: '후열', skill: '청백충근', 
        skillDesc: '아군 주장의 모략 크리티컬 확률을 증폭하고 피해를 대신 숄더링합니다.',
        stats: { martial: 509, tactical: 628, command: 574, speed: 439 }
    },
    { 
        id: 'h_juyu', name: '주유', group: 'wu', role: '패시브 (80%)', location: '후열', skill: '봉화연천', 
        skillDesc: '자신이 신산 버프를 획득할 때마다 적 전체에 광역 신성 모략 불화살을 투하합니다.',
        stats: { martial: 443, tactical: 646, command: 580, speed: 403 }
    },
    { 
        id: 'h_jutae', name: '주태', group: 'wu', role: '지휘 (100%)', location: '전열', skill: '청라산개', 
        skillDesc: '아군 주장이 입는 치명상을 대신 유기적으로 흡수하고 주장의 공격력을 높입니다.',
        stats: { martial: 562, tactical: 479, command: 622, speed: 481 }
    },
    { 
        id: 'h_jeongbo', name: '정보', group: 'wu', role: '지휘 (100%)', location: '전열', skill: '칠척사모', 
        skillDesc: '피해를 입으면 자신에게 걸린 디버프를 세척하고 적 전체 중 1명에게 공포를 부여합니다.',
        stats: { martial: 503, tactical: 503, command: 610, speed: 433 }
    },
    { 
        id: 'h_hwanggae', name: '황개', group: 'wu', role: '능동 (50%)', location: '전열', skill: '요원지화', 
        skillDesc: '자신의 병력을 일정량 소모하여 적군 전체에 확정적 강한 화상 피해를 가합니다.',
        stats: { martial: 497, tactical: 491, command: 652, speed: 481 }
    },

    // 군진영 (12명)
    { 
        id: 'h_chaemunhui', name: '채문희', group: 'qun', role: '능동 (70%)', location: '후열', skill: '비분시', 
        skillDesc: '아군 단체의 병력을 회복시키고 가하는 피해를 증가시킵니다.',
        stats: { martial: 372, tactical: 598, command: 509, speed: 558 }
    },
    { 
        id: 'h_jangnyeong', name: '장녕', group: 'qun', role: '능동 (50%)', location: '후열', skill: '천의난위', 
        skillDesc: '적군의 속성을 흡수하여 아군에게 공유하고 모략 피해를 줍니다.',
        stats: { martial: 461, tactical: 598, command: 556, speed: 457 }
    },
    { 
        id: 'h_dongtak', name: '동탁', group: 'qun', role: '지휘 (100%)', location: '전열', skill: '전권난정', 
        skillDesc: '매 턴 자신의 무용을 증폭시키며 후반 라운드 진입 시 적과 아군 전체를 무차별 난사 공격합니다.',
        stats: { martial: 556, tactical: 491, command: 646, speed: 481 }
    },
    { 
        id: 'h_yeopo', name: '여포', group: 'qun', role: '패시브 (100%)', location: '전열', skill: '천하무쌍', 
        skillDesc: '일반 공격 시 높은 확률로 대상과 3회 연속 확정 일기토 평타 연격을 주고받습니다.',
        stats: { martial: 675, tactical: 378, command: 556, speed: 546 }
    },
    { 
        id: 'h_choseon', name: '초선', group: 'qun', role: '능동 (50%)', location: '후열', skill: '폐월', 
        skillDesc: '적군 단체를 매혹하여 자신이 입는 피해의 상당량을 해당 적이 대신 분담하게 만듭니다.',
        stats: { martial: 372, tactical: 592, command: 556, speed: 433 }
    },
    { 
        id: 'h_janggak', name: '장각', group: 'qun', role: '능동 (50%)', location: '후열', skill: '황천당립', 
        skillDesc: '1턴 준비 후 적 전체에 강력한 천벌 벼락 모략 타격을 5회 연쇄적으로 내리꽂습니다.',
        stats: { martial: 473, tactical: 610, command: 616, speed: 368 }
    },
    { 
        id: 'h_hwata', name: '화타', group: 'qun', role: '능동 (50%)', location: '후열', skill: '청낭제세', 
        skillDesc: '전투 전반기 동안 아군 전체의 통솔 방어력을 임계점까지 높이고 피격 시 즉각 치료합니다.',
        stats: { martial: 372, tactical: 598, command: 432, speed: 362 }
    },
    { 
        id: 'h_jangbo', name: '장보', group: 'qun', role: '능동 (50%)', location: '후열', skill: '요풍사기', 
        skillDesc: '적 전체에 강한 모래바람 결계를 치고 아군 전체에게 장벽 수치를 중첩 부여합니다.',
        stats: { martial: 414, tactical: 562, command: 551, speed: 433 }
    },
    { 
        id: 'h_jwaja', name: '좌자', group: 'qun', role: '패시브 (100%)', location: '후열', skill: '화겁생기', 
        skillDesc: '부대 아군 전체에게 상시 신기루 도피 버프를 부여하여 전법 및 평타 회피율을 극대화합니다.',
        stats: { martial: 437, tactical: 658, command: 497, speed: 403 }
    },
    { 
        id: 'h_ugil', name: '우길', group: 'qun', role: '지휘 (70%)', location: '후열', skill: '태평경', 
        skillDesc: '매 턴 고정 확률로 적군 전체에 수공 상태를 걸어 지속적인 내구도 붕괴 모략 피해를 줍니다.',
        stats: { martial: 443, tactical: 592, command: 527, speed: 516 }
    },
    { 
        id: 'h_anryang', name: '안량', group: 'qun', role: '능동 (50%)', location: '전열', skill: '효장', 
        skillDesc: '적 단체에 고배율 무용 참격 충격을 가하고 1턴간 확정적 공포 제어 상태로 격리합니다.',
        stats: { martial: 598, tactical: 384, command: 515, speed: 534 }
    },
    { 
        id: 'h_wonso', name: '원소', group: 'qun', role: '지휘 (100%)', location: '후열', skill: '사소도', 
        skillDesc: '매 턴 아군 전체의 통솔력을 누적 증폭시키며 가하는 광역 무용 화살 피해 화력을 보정합니다.',
        stats: { martial: 515, tactical: 521, command: 634, speed: 493 }
    }
];

// ==========================================================================
// LAYER 2: API 브릿지 개방 구역 (deck_core 연동)
// ==========================================================================
window.getAllOfficerNamesFromDogam = function() {
    return heroDogamData.map(h => h.name).sort((a, b) => a.localeCompare(b, 'ko'));
};

window.getOfficerDataFromDogam = function(officerName) {
    const target = heroDogamData.find(h => h.name === officerName);
    return {
        role: target ? target.role : "보조, 버퍼",
        uniqueTactic: target ? target.skill : "고유 전법 누락"
    };
};

// ==========================================================================
// LAYER 3: 도감 와이드 렌더링 및 백데이터 보존 파이프라인
// ==========================================================================
let currentDogamState = [];
let currentFactionFilter = '전체';

function loadDogamData() {
    const defaultNames = heroDogamData.map(h => h.name).sort((a, b) => a.localeCompare(b, 'ko'));
    let savedHeroes = [];
    
    try {
        const rawData = localStorage.getItem('samguk_hobby_data');
        if (rawData) {
            const parsed = JSON.parse(rawData);
            if (parsed && Array.isArray(parsed.heroes)) savedHeroes = parsed.heroes;
        }
    } catch (e) {
        console.error("장수 도감 데이터 로드 실패:", e);
    }

    currentDogamState = defaultNames.map(name => {
        const found = savedHeroes.find(h => h.name === name);
        const originData = heroDogamData.find(h => h.name === name);
        return {
            name: name,
            faction: originData ? originData.group : "qun",
            isOwned: found ? !!found.isOwned : false,
            star: (found && found.star !== undefined && found.star !== null) ? parseInt(found.star) : 0, 
            role: originData ? originData.role : "-",
            location: originData ? originData.location : "-",
            skill: originData ? originData.skill : "-",
            skillDesc: originData ? originData.skillDesc : "-",
            stats: originData ? originData.stats : null
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
    } catch (e) {
        console.error("장수 도감 세이브 실패:", e);
    }
}

function toggleOfficerOwnership(officerName) {
    const target = currentDogamState.find(h => h.name === officerName);
    if (target) {
        target.isOwned = !target.isOwned;
        saveDogamData();
        renderDogamGrid(); 
    }
}

function bindFilterButtons() {
    const buttons = document.querySelectorAll('button, .tab-btn, .filter-btn, li');
    const filterKeywords = ['전체', '위나라', '촉나라', '오나라', '군웅'];
    
    buttons.forEach(btn => {
        const txt = btn.innerText.trim();
        if (filterKeywords.some(kw => txt.includes(kw) || txt === '군' || txt.includes('군진영'))) {
            btn.style.cursor = 'pointer';
            btn.onclick = (e) => {
                if (txt.includes('전체')) currentFactionFilter = '전체';
                else if (txt.includes('위나라')) currentFactionFilter = 'wei';
                else if (txt.includes('촉나라')) currentFactionFilter = 'shu';
                else if (txt.includes('오나라')) currentFactionFilter = 'wu';
                else if (txt.includes('군웅') || txt === '군' || txt.includes('군진영')) currentFactionFilter = 'qun';

                buttons.forEach(b => {
                    const bTxt = b.innerText.trim();
                    if(filterKeywords.some(kw => bTxt.includes(kw) || bTxt === '군' || bTxt.includes('군진영'))) {
                        b.style.backgroundColor = 'transparent';
                        b.style.color = '#888';
                        b.style.border = '1px solid #444';
                    }
                });
                let targetBtn = e.target;
                if(targetBtn.tagName !== 'BUTTON' && targetBtn.tagName !== 'LI') targetBtn = targetBtn.closest('button') || targetBtn.closest('li');
                if(targetBtn) {
                    targetBtn.style.backgroundColor = '#fff';
                    targetBtn.style.color = '#000';
                }
                renderDogamGrid();
            };
        }
    });
}

function renderDogamUI() {
    let nativeContainer = document.getElementById('hero-list') || document.getElementById('dogam-list') || document.getElementById('hero-container');
    
    let container = document.getElementById('samguk-dogam-wrapper');
    if (!container) {
        container = document.createElement('div');
        container.id = 'samguk-dogam-wrapper';
        
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
            let filterBtn = Array.from(document.querySelectorAll('button, li')).find(b => b.innerText.trim().includes('전체'));
            if (filterBtn && filterBtn.parentElement) {
                let filterRow = filterBtn.parentElement;
                filterRow.parentElement.insertBefore(container, filterRow.nextSibling);
            } else {
                document.body.appendChild(container);
            }
        }
    }

    container.innerHTML = `
        <div id="dogam-stats-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
            <h2 style="color: #cd9b33; margin: 0; font-size: 22px;">장수 도감 마스터 보드</h2>
            <span id="dogam-count-badge" style="color: #aaa; font-weight: bold; font-size: 15px;">보유율: </span>
        </div>
        <div id="dogam-card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; width: 100%; align-items: stretch;"></div>
    `;
    
    bindFilterButtons();
    renderDogamGrid();
}

function getGroupNameKorean(group) {
    if (group === 'wei') return '위나라';
    if (group === 'shu') return '촉나라';
    if (group === 'wu') return '오나라';
    if (group === 'qun') return '군진영';
    return '전체';
}

function renderDogamGrid() {
    const gridContainer = document.getElementById('dogam-card-grid');
    const countBadge = document.getElementById('dogam-count-badge');
    if(!gridContainer) return;

    gridContainer.innerHTML = '';
    
    const filteredHeroes = currentDogamState.filter(h => currentFactionFilter === '전체' || h.faction === currentFactionFilter);
    const ownedCount = filteredHeroes.filter(h => h.isOwned).length;
    const totalCount = filteredHeroes.length;
    
    const filterName = getGroupNameKorean(currentFactionFilter);
    if(countBadge) {
        countBadge.innerHTML = `[${filterName}] 보유율: <span style="color: #38bdf8; font-size: 18px;">${ownedCount}</span> / ${totalCount}`;
    }

    const groupColors = { wei: '#2270b5', shu: '#b82d2d', wu: '#2a9d8f', qun: '#cd9b33' };

    filteredHeroes.forEach(hero => {
        const card = document.createElement('div');
        card.style.cssText = `
            background-color: ${hero.isOwned ? '#1c1c1c' : '#111'};
            border: 1px solid ${hero.isOwned ? '#4ade80' : '#2d2d2d'};
            border-top: 5px solid ${groupColors[hero.faction] || '#444'};
            border-radius: 6px;
            padding: 15px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            box-sizing: border-box;
            min-height: 160px;
            box-shadow: ${hero.isOwned ? '0 0 12px rgba(74, 222, 128, 0.15)' : 'none'};
        `;
        
        if (!hero.isOwned) {
            card.style.opacity = '0.4';
            card.style.filter = 'grayscale(100%)';
        }

        let statsHtml = '';
        if (hero.stats) {
            statsHtml = `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; background-color: rgba(0,0,0,0.4); border: 1px solid #333; border-radius: 4px; padding: 8px; margin: 10px 0; font-size: 11px;">
                    <div><span style="color: #ff9f43; margin-right: 4px;">⚔️ 무용:</span><span style="color: #fff; font-weight:bold;">${hero.stats.martial}</span></div>
                    <div><span style="color: #38bdf8; margin-right: 4px;">🔮 모략:</span><span style="color: #fff; font-weight:bold;">${hero.stats.tactical}</span></div>
                    <div><span style="color: #2ec4b6; margin-right: 4px;">🛡️ 통솔:</span><span style="color: #fff; font-weight:bold;">${hero.stats.command}</span></div>
                    <div><span style="color: #a855f7; margin-right: 4px;">⚡ 속도:</span><span style="color: #fff; font-weight:bold;">${hero.stats.speed}</span></div>
                </div>
            `;
        }

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 8px;">
                <div style="font-size: 18px; font-weight: bold; color: ${hero.isOwned ? '#fff' : '#888'}; letter-spacing: 1px;">${hero.name}</div>
                <div style="font-size: 11px; font-weight: bold; color: ${groupColors[hero.faction]};">${getGroupNameKorean(hero.faction)}</div>
            </div>
            
            <div style="display: flex; gap: 12px; font-size: 11px; color: #bbb; margin-bottom: 4px;">
                <div><span style="color: #feca57; font-weight: bold;">역할:</span> ${hero.role}</div>
                <div><span style="color: #feca57; font-weight: bold;">배치:</span> ${hero.location}</div>
            </div>
            
            ${statsHtml}

            <div style="background-color: rgba(20,20,20,0.6); border: 1px solid #2a2a2a; border-radius: 4px; padding: 8px; font-size: 11px; line-height: 1.5; margin-top: auto;">
                <div style="color: #38bdf8; font-weight: bold; margin-bottom: 3px;">고유: ${hero.skill}</div>
                <div style="color: #ddd; word-break: keep-all;">${hero.skillDesc}</div>
            </div>

            <div style="position: absolute; top: 15px; right: 15px; font-size: 10px; padding: 3px 6px; border-radius: 4px; background-color: ${hero.isOwned ? '#28a745' : '#333'}; color: ${hero.isOwned ? '#fff' : '#777'}; font-weight: bold;">
                ${hero.isOwned ? '보유' : '미보유'}
            </div>
        `;

        card.addEventListener('click', () => toggleOfficerOwnership(hero.name));
        gridContainer.appendChild(card);
    });
}

function initDogamEngine() {
    loadDogamData();
    setTimeout(renderDogamUI, 100); 
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDogamEngine);
} else {
    initDogamEngine();
}

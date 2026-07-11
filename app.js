// ==========================================================================
// LAYER 1: 마스터 정적 인벤토리 데이터 구역 (총 48명 장수 & 72종 전법 가나다 정렬)[cite: 6]
// ==========================================================================

const heroList = [
    // 위나라 (13명)[cite: 6]
    { id: 'h_gahu', name: '가후', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_gwa_ga', name: '곽가', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_samy', name: '사마의', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_sunuk', name: '순욱', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_akjin', name: '악진', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_jeonwi', name: '전위', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_jeonguk', name: '정욱', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_jojo_sp', name: '조조(제왕)', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_jojo', name: '조조', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_jangryo', name: '장료', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_janghap', name: '장합', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_hahoudon', name: '하후돈', group: 'wei', isOwned: false },[cite: 6]
    { id: 'h_hahouyeon', name: '하후연', group: 'wei', isOwned: false },[cite: 6]
    
    // 촉나라 (14명)[cite: 6]
    { id: 'h_gwanu', name: '관우', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_gangyu', name: '강유', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_madae', name: '마대', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_macho', name: '마초', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_seoseo', name: '서서', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_samaga', name: '사마가', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_wuyeon', name: '위연', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_yubi', name: '유비', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_yubi_sp', name: '유비(제왕)', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_jangbi', name: '장비', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_jegaryang', name: '제갈량', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_joun', name: '조운', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_hwangchung', name: '황충', group: 'shu', isOwned: false },[cite: 6]
    { id: 'h_hwangworyeong', name: '황월영', group: 'shu', isOwned: false },[cite: 6]
    
    // 오나라 (15명)[cite: 6]
    { id: 'h_daegyo', name: '대교', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_nosuk', name: '노숙', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_sogyo', name: '소교', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_songyeon', name: '손견', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_songwon', name: '손권', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_sonsanghyang', name: '손상향', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_sonchaek', name: '손책', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_songwon_sp', name: '손권(제왕)', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_yeomong', name: '여몽', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_yukson', name: '육손', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_yukhang', name: '육항', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_juyu', name: '주유', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_jutae', name: '주태', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_jeongbo', name: '정보', group: 'wu', isOwned: false },[cite: 6]
    { id: 'h_hwanggae', name: '황개', group: 'wu', isOwned: false },[cite: 6]
    
    // 군진영 (12명)[cite: 6]
    { id: 'h_dongtak', name: '동탁', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_anryang', name: '안량', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_yeopo', name: '여포', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_ugil', name: '우길', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_wonso', name: '원소', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_janggak', name: '장각', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_jangnyeong', name: '장녕', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_jangbo', name: '장보', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_jwaja', name: '좌자', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_chaemunhui', name: '채문희', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_choseon', name: '초선', group: 'qun', isOwned: false },[cite: 6]
    { id: 'h_hwata', name: '화타', group: 'qun', isOwned: false }[cite: 6]
];

const tacticList = [
    { id: 't_gajeong', name: '가정지전', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_gajeong_t', name: '강유겸제', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_gyeonbul', name: '견불가최', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_gyeonjin', name: '견진연봉', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_gonggi', name: '공기불비', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_gwaha', name: '과하탁교', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_gyochwi', name: '교취호탈', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_geukjeok', name: '극적제승', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_geumnang', name: '금낭묘계', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_geumjeok', name: '금적금왕', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_geumchang', name: '금창신', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_geumcheol', name: '금철교명', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_gimun', name: '기문둔갑', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_nakjeong', name: '낙정하석', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_donggu', name: '동구적개', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_dongjang', name: '동장철벽', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_dongchok', name: '동촉기선', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_manbu', name: '만부막적', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_manjeon', name: '만전제발', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_mancheon', name: '만천과해', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_munchi', name: '문치무공', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_miu', name: '미우주무', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_bangaek', name: '반객위주', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_byeongryang', name: '병량촌단', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_bunseong', name: '분성지계', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_bisa', name: '비사주석', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_samyeon', name: '사면초가', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_sasaeng', name: '사생취의', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_seondeung', name: '선등함진', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_susang', name: '수상개화', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_sunsu', name: '순수견양', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_simmo', name: '심모원려', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_anyoung', name: '안영찰채', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_amjeon', name: '암전난방', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_yangui', name: '양의화생', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_yangcho', name: '양초선행', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_yeoja', name: '여자동포', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_yosa', name: '요사여신', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_yongmaeng', name: '용맹무쌍', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_yongwang', name: '용왕직전', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_unju', name: '운주유악', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_wonseong', name: '원성재도', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_wiwi', name: '위위구조', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_yujwa', name: '유좌유용', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_igan', name: '이간계', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_iahwan', name: '이아환아', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_iil', name: '이일대로', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_itoe', name: '이퇴위진', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_ilgo', name: '일고작기', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_inse', name: '인세이도', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_jangsu_j', name: '전위위안', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_jegon', name: '제곤부위', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_jungjeong', name: '중정기고', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_jiin', name: '지인선임', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_jintoe', name: '진퇴유도', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_jinhwa', name: '진화타겁', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_jilpung', name: '질풍노도', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_cheonri', name: '천리추격', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_cheonsi', name: '천시지리', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_checheon', name: '체천행도', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_chukse', name: '축세대발', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_chukho', name: '축호과간', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_taecheong', name: '태청단경', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_tojeok', name: '토적격문', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_hyeonho', name: '현호제세', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_horyeong', name: '호령삼군', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_honsu', name: '혼수모어', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_hongsu', name: '홍수첨향', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_hwaso', name: '화소적벽', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_hoengso', name: '횡소천군', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_hoengjing', name: '횡징폭렴', group: 'tactic', isOwned: false },[cite: 6]
    { id: 't_huyang', name: '휴양생식', group: 'tactic', isOwned: false }[cite: 6]
];

// ==========================================================================
// LAYER 2: 기본 비즈니스 렌더링 및 상태 제어 제어선 구역[cite: 6]
// ==========================================================================

window.onload = function() {
    loadSavedData();[cite: 6]
    renderButtons();[cite: 6]
};

function renderButtons() {
    const containers = {
        wei: document.getElementById('hero-container-wei'),[cite: 6]
        shu: document.getElementById('hero-container-shu'),[cite: 6]
        wu: document.getElementById('hero-container-wu'),[cite: 6]
        qun: document.getElementById('hero-container-qun')[cite: 6]
    };
    const tacticContainer = document.getElementById('tactic-container');[cite: 6]

    Object.values(containers).forEach(c => { if (c) c.innerHTML = ''; });[cite: 6]
    if (tacticContainer) tacticContainer.innerHTML = '';[cite: 6]

    heroList.forEach(hero => {
        const targetContainer = containers[hero.group];[cite: 6]
        if (!targetContainer) return;[cite: 6]

        const btn = document.createElement('button');[cite: 6]
        btn.id = hero.id;[cite: 6]
        btn.innerText = hero.name;[cite: 6]
        btn.className = `card-btn ${hero.group} ${hero.isOwned ? 'owned' : ''}`;[cite: 6]
        btn.onclick = () => toggleState(hero.id, 'hero');[cite: 6]
        
        targetContainer.appendChild(btn);[cite: 6]
    });

    tacticList.forEach(tactic => {
        const btn = document.createElement('button');[cite: 6]
        btn.id = tactic.id;[cite: 6]
        btn.innerText = tactic.name;[cite: 6]
        btn.className = `card-btn ${tactic.group} ${tactic.isOwned ? 'owned' : ''}`;[cite: 6]
        btn.onclick = () => toggleState(tactic.id, 'tactic');[cite: 6]
        if (tacticContainer) tacticContainer.appendChild(btn);[cite: 6]
    });
}

function toggleState(id, type) {
    const list = (type === 'hero') ? heroList : tacticList;[cite: 6]
    const target = list.find(x => x.id === id);[cite: 6]
    
    if (target) {
        target.isOwned = !target.isOwned;[cite: 6]
        const btn = document.getElementById(id);[cite: 6]
        if (btn) {
            if (target.isOwned) btn.classList.add('owned');[cite: 6]
            else btn.classList.remove('owned');[cite: 6]
        }
    }
}

function saveData() {
    const data = { heroes: heroList, tactics: tacticList };[cite: 6]
    localStorage.setItem('samguk_hobby_data', JSON.stringify(data));[cite: 6]
    alert('체크 현황이 저장되었습니다.');[cite: 6]
}

function loadSavedData() {
    const saved = localStorage.getItem('samguk_hobby_data');[cite: 6]
    if (!saved) return;[cite: 6]
    
    const parsed = JSON.parse(saved);[cite: 6]
    if (parsed.heroes && Array.isArray(parsed.heroes)) {
        parsed.heroes.forEach(sh => {
            const h = heroList.find(x => x.id === sh.id);[cite: 6]
            if (h) h.isOwned = sh.isOwned;[cite: 6]
        });
    }
    if (parsed.tactics && Array.isArray(parsed.tactics)) {
        parsed.tactics.forEach(st => {
            const t = tacticList.find(x => x.id === st.id);[cite: 6]
            if (t) t.isOwned = st.isOwned;[cite: 6]
        });
    }
}

// ==========================================================================
// LAYER 3: 무결성 교차 호환형 영구 자원 백업(내보내기) 및 복구(가져오기) 엔진 구역
// ==========================================================================

function exportData() {
    try {
        var hobbyData = localStorage.getItem('samguk_hobby_data');
        var deckData = localStorage.getItem('samguk_deck_text');
        
        // 두 핵심 저장 스냅샷을 단일 객체 안에 주입하여 통합 원자성 백업 보장
        var backupObject = {
            samguk_hobby_data: hobbyData ? JSON.parse(hobbyData) : null,
            samguk_deck_text: deckData ? JSON.parse(deckData) : null
        };
        
        var jsonString = JSON.stringify(backupObject, null, 2);
        var blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
        
        var downloadAnchor = document.createElement('a');
        downloadAnchor.href = URL.createObjectURL(blob);
        downloadAnchor.download = "samguk_wangjeon_database_backup.json";
        
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click(); // 강제 수동 트리거 다운로드 발동
        document.body.removeChild(downloadAnchor);
        
        console.log("[백업 시스템] 나의 장수/전법 페이지 데이터 내보내기 성공");
    } catch (err) {
        alert("백업 파일 생성 중 오류가 발생했습니다: " + err.message);
    }
}

function triggerImport() {
    var fileInput = document.getElementById('import-file-input');
    if (fileInput) {
        fileInput.click();
    }
}

function importData(input) {
    var file = input.files[0];
    if (!file) return;
    
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            var importedDatabase = JSON.parse(e.target.result);
            
            // 데이터 무결성 1차 검수선 필터링
            if (!importedDatabase.samguk_hobby_data && !importedDatabase.samguk_deck_text) {
                alert("삼국지 왕전의 유효한 백업 데이터 포맷이 아닙니다.");
                return;
            }
            
            // 덮어쓰기 로컬 스토리지 데이터 마이그레이션 실행
            if (importedDatabase.samguk_hobby_data) {
                localStorage.setItem('samguk_hobby_data', JSON.stringify(importedDatabase.samguk_hobby_data));
            }
            if (importedDatabase.samguk_deck_text) {
                localStorage.setItem('samguk_deck_text', JSON.stringify(importedDatabase.samguk_deck_text));
            }
            
            alert("🎉 자원 데이터 동기화 완료! 복구된 보유 현황을 인벤토리에 즉시 갱신하기 위해 페이지를 재시작합니다.");
            location.reload(); // 브라우저 하드 리로드로 체크박스 즉시 실시간 동기화
            
        } catch (err) {
            alert("파일 해석 오류: 손상된 JSON 백업 파일입니다.");
            console.error(err);
        }
    };
    reader.readAsText(file, "utf-8");
}

// 글로벌 전역 스코프 온클릭 바인딩 브릿지 완결
window.exportData = exportData;
window.triggerImport = triggerImport;
window.importData = importData;

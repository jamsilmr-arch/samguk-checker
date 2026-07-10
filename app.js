// 초기 무장 데이터 세팅 (총 48명 진영별 정렬 체계)
const heroList = [
    // 위나라 (13명)
    { id: 'h_gahu', name: '가후', group: 'wei', isOwned: false },
    { id: 'h_gwa_ga', name: '곽가', group: 'wei', isOwned: false },
    { id: 'h_samy', name: '사마의', group: 'wei', isOwned: false },
    { id: 'h_sunuk', name: '순욱', group: 'wei', isOwned: false },
    { id: 'h_akjin', name: '악진', group: 'wei', isOwned: false },
    { id: 'h_jeonwi', name: '전위', group: 'wei', isOwned: false },
    { id: 'h_jeonguk', name: '정욱', group: 'wei', isOwned: false },
    { id: 'h_jojo_sp', name: '조조(제왕)', group: 'wei', isOwned: false },
    { id: 'h_jojo', name: '조조', group: 'wei', isOwned: false },
    { id: 'h_jangryo', name: '장료', group: 'wei', isOwned: false },
    { id: 'h_janghap', name: '장합', group: 'wei', isOwned: false },
    { id: 'h_hahoudon', name: '하후돈', group: 'wei', isOwned: false },
    { id: 'h_hahouyeon', name: '하후연', group: 'wei', isOwned: false },
    
    // 촉나라 (14명)
    { id: 'h_gwanu', name: '관우', group: 'shu', isOwned: false },
    { id: 'h_gangyu', name: '강유', group: 'shu', isOwned: false },
    { id: 'h_madae', name: '마대', group: 'shu', isOwned: false },
    { id: 'h_macho', name: '마초', group: 'shu', isOwned: false },
    { id: 'h_seoseo', name: '서서', group: 'shu', isOwned: false },
    { id: 'h_samaga', name: '사마가', group: 'shu', isOwned: false },
    { id: 'h_wuyeon', name: '위연', group: 'shu', isOwned: false },
    { id: 'h_yubi', name: '유비', group: 'shu', isOwned: false },
    { id: 'h_yubi_sp', name: '유비(제왕)', group: 'shu', isOwned: false },
    { id: 'h_jangbi', name: '장비', group: 'shu', isOwned: false },
    { id: 'h_jegaryang', name: '제갈량', group: 'shu', isOwned: false },
    { id: 'h_joun', name: '조운', group: 'shu', isOwned: false },
    { id: 'h_hwangchung', name: '황충', group: 'shu', isOwned: false },
    { id: 'h_hwangworyeong', name: '황월영', group: 'shu', isOwned: false },
    
    // 오나라 (15명)
    { id: 'h_daegyo', name: '대교', group: 'wu', isOwned: false },
    { id: 'h_nosuk', name: '노숙', group: 'wu', isOwned: false },
    { id: 'h_sogyo', name: '소교', group: 'wu', isOwned: false },
    { id: 'h_songyeon', name: '손견', group: 'wu', isOwned: false },
    { id: 'h_songwon', name: '손권', group: 'wu', isOwned: false },
    { id: 'h_sonsanghyang', name: '손상향', group: 'wu', isOwned: false },
    { id: 'h_sonchaek', name: '손책', group: 'wu', isOwned: false },
    { id: 'h_songwon_sp', name: '손권(제왕)', group: 'wu', isOwned: false },
    { id: 'h_yeomong', name: '여몽', group: 'wu', isOwned: false },
    { id: 'h_yukson', name: '육손', group: 'wu', isOwned: false },
    { id: 'h_yukhang', name: '육항', group: 'wu', isOwned: false },
    { id: 'h_juyu', name: '주유', group: 'wu', isOwned: false },
    { id: 'h_jutae', name: '주태', group: 'wu', isOwned: false },
    { id: 'h_jeongbo', name: '정보', group: 'wu', isOwned: false },
    { id: 'h_hwanggae', name: '황개', group: 'wu', isOwned: false },
    
    // 군진영 (12명)
    { id: 'h_dongtak', name: '동탁', group: 'qun', isOwned: false },
    { id: 'h_anryang', name: '안량', group: 'qun', isOwned: false },
    { id: 'h_yeopo', name: '여포', group: 'qun', isOwned: false },
    { id: 'h_ugil', name: '우길', group: 'qun', isOwned: false },
    { id: 'h_wonso', name: '원소', group: 'qun', isOwned: false },
    { id: 'h_janggak', name: '장각', group: 'qun', isOwned: false },
    { id: 'h_jangnyeong', name: '장녕', group: 'qun', isOwned: false },
    { id: 'h_jangbo', name: '장보', group: 'qun', isOwned: false },
    { id: 'h_jwaja', name: '좌자', group: 'qun', isOwned: false },
    { id: 'h_chaemunhui', name: '채문희', group: 'qun', isOwned: false },
    { id: 'h_choseon', name: '초선', group: 'qun', isOwned: false },
    { id: 'h_hwata', name: '화타', group: 'qun', isOwned: false }
];

// 초기 전법 데이터 세팅 (신규 5종 반영 총 70종 가나다 사전식 정렬 구조 완료)
const tacticList = [
    { id: 't_gajeong', name: '가정지전', group: 'tactic', isOwned: false },
    { id: 't_gajeong_t', name: '강유겸제', group: 'tactic', isOwned: false },
    { id: 't_gyeonbul', name: '견불가최', group: 'tactic', isOwned: false }, // 신규 이식
    { id: 't_gyeonjin', name: '견진연봉', group: 'tactic', isOwned: false },
    { id: 't_gonggi', name: '공기불비', group: 'tactic', isOwned: false },
    { id: 't_gwaha', name: '과하탁교', group: 'tactic', isOwned: false },
    { id: 't_gyochwi', name: '교취호탈', group: 'tactic', isOwned: false },
    { id: 't_geukjeok', name: '극적제승', group: 'tactic', isOwned: false },
    { id: 't_geumnang', name: '금낭묘계', group: 'tactic', isOwned: false },
    { id: 't_geumjeok', name: '금적금왕', group: 'tactic', isOwned: false },
    { id: 't_geumchang', name: '금창신', group: 'tactic', isOwned: false },
    { id: 't_geumcheol', name: '금철교명', group: 'tactic', isOwned: false },
    { id: 't_gimun', name: '기문둔갑', group: 'tactic', isOwned: false },
    { id: 't_nakjeong', name: '낙정하석', group: 'tactic', isOwned: false },
    { id: 't_donggu', name: '동구적개', group: 'tactic', isOwned: false }, // 신규 이식
    { id: 't_dongjang', name: '동장철벽', group: 'tactic', isOwned: false },
    { id: 't_dongchok', name: '동촉기선', group: 'tactic', isOwned: false }, // 신규 이식
    { id: 't_manbu', name: '만부막적', group: 'tactic', isOwned: false },
    { id: 't_manjeon', name: '만전제발', group: 'tactic', isOwned: false },
    { id: 't_mancheon', name: '만천과해', group: 'tactic', isOwned: false },
    { id: 't_munchi', name: '문치무공', group: 'tactic', isOwned: false },
    { id: 't_miu', name: '미우주무', group: 'tactic', isOwned: false },
    { id: 't_bangaek', name: '반객위주', group: 'tactic', isOwned: false },
    { id: 't_byeongryang', name: '병량촌단', group: 'tactic', isOwned: false },
    { id: 't_bunseong', name: '분성지계', group: 'tactic', isOwned: false },
    { id: 't_bisa', name: '비사주석', group: 'tactic', isOwned: false },
    { id: 't_samyeon', name: '사면초가', group: 'tactic', isOwned: false },
    { id: 't_sasaeng', name: '사생취의', group: 'tactic', isOwned: false },
    { id: 't_seondeung', name: '선등함진', group: 'tactic', isOwned: false },
    { id: 't_susang', name: '수상개화', group: 'tactic', isOwned: false },
    { id: 't_sunsu', name: '순수견양', group: 'tactic', isOwned: false },
    { id: 't_simmo', name: '심모원려', group: 'tactic', isOwned: false },
    { id: 't_amjeon', name: '암전난방', group: 'tactic', isOwned: false },
    { id: 't_yangui', name: '양의화생', group: 'tactic', isOwned: false },
    { id: 't_yangcho', name: '양초선행', group: 'tactic', isOwned: false }, // 신규 이식
    { id: 't_yeoja', name: '여자동포', group: 'tactic', isOwned: false },
    { id: 't_yosa', name: '요사여신', group: 'tactic', isOwned: false },
    { id: 't_yongmaeng', name: '용맹무쌍', group: 'tactic', isOwned: false },
    { id: 't_yongwang', name: '용왕직전', group: 'tactic', isOwned: false },
    { id: 't_unju', name: '운주유악', group: 'tactic', isOwned: false },
    { id: 't_wonseong', name: '원성재도', group: 'tactic', isOwned: false },
    { id: 't_wiwi', name: '위위구조', group: 'tactic', isOwned: false },
    { id: 't_yujwa', name: '유좌유용', group: 'tactic', isOwned: false },
    { id: 't_igan', name: '이간계', group: 'tactic', isOwned: false },
    { id: 't_iahwan', name: '이아환아', group: 'tactic', isOwned: false },
    { id: 't_iil', name: '이일대로', group: 'tactic', isOwned: false },
    { id: 't_itoe', name: '이퇴위진', group: 'tactic', isOwned: false },
    { id: 't_ilgo', name: '일고작기', group: 'tactic', isOwned: false },
    { id: 't_inse', name: '인세이도', group: 'tactic', isOwned: false },
    { id: 't_jangsu_j', name: '전위위안', group: 'tactic', isOwned: false },
    { id: 't_jegon', name: '제곤부위', group: 'tactic', isOwned: false },
    { id: 't_jungjeong', name: '중정기고', group: 'tactic', isOwned: false },
    { id: 't_jiin', name: '지인선임', group: 'tactic', isOwned: false },
    { id: 't_jintoe', name: '진퇴유도', group: 'tactic', isOwned: false },
    { id: 't_jinhwa', name: '진화타겁', group: 'tactic', isOwned: false },
    { id: 't_jilpung', name: '질풍노도', group: 'tactic', isOwned: false },
    { id: 't_cheonri', name: '천리추격', group: 'tactic', isOwned: false },
    { id: 't_cheonsi', name: '천시지리', group: 'tactic', isOwned: false },
    { id: 't_checheon', name: '체천행도', group: 'tactic', isOwned: false },
    { id: 't_chukse', name: '축세대발', group: 'tactic', isOwned: false },
    { id: 't_chukho', name: '축호과간', group: 'tactic', isOwned: false },
    { id: 't_taecheong', name: '태청단경', group: 'tactic', isOwned: false },
    { id: 't_tojeok', name: '토적격문', group: 'tactic', isOwned: false }, // 신규 이식
    { id: 't_hyeonho', name: '현호제세', group: 'tactic', isOwned: false },
    { id: 't_horyeong', name: '호령삼군', group: 'tactic', isOwned: false },
    { id: 't_honsu', name: '혼수모어', group: 'tactic', isOwned: false },
    { id: 't_hongsu', name: '홍수첨향', group: 'tactic', isOwned: false },
    { id: 't_hoengso', name: '횡소천군', group: 'tactic', isOwned: false },
    { id: 't_hoengjing', name: '횡징폭렴', group: 'tactic', isOwned: false },
    { id: 't_huyang', name: '휴양생식', group: 'tactic', isOwned: false }
];

// 브라우저 돔(DOM) 로딩 완료 후 비즈니스 로직 구동 개시
window.onload = function() {
    loadSavedData();  // 1. 로컬 저장소 캐시 상태 조회 및 마이그레이션
    renderButtons();  // 2. 구획별 타겟 바둑판 버튼 동적 조립
};

// 화면 UI 컴포넌트 자동 조립 렌더링 엔진
function renderButtons() {
    const containers = {
        wei: document.getElementById('hero-container-wei'),
        shu: document.getElementById('hero-container-shu'),
        wu: document.getElementById('hero-container-wu'),
        qun: document.getElementById('hero-container-qun')
    };
    const tacticContainer = document.getElementById('tactic-container');

    // 리렌더링 시 기존 마크업 중복 누적 적층 현상 원천 차단
    Object.values(containers).forEach(c => { if (c) c.innerHTML = ''; });
    if (tacticContainer) tacticContainer.innerHTML = '';

    // 장수 구획 버튼 생성 및 도킹
    heroList.forEach(hero => {
        const targetContainer = containers[hero.group];
        if (!targetContainer) return; // 예외 처리: 타겟 돔 인프라 부재 시 탈락

        const btn = document.createElement('button');
        btn.id = hero.id;
        btn.innerText = hero.name;
        btn.className = `card-btn ${hero.group} ${hero.isOwned ? 'owned' : ''}`;
        btn.onclick = () => toggleState(hero.id, 'hero');
        
        targetContainer.appendChild(btn);
    });

    // 전법 구획 버튼 생성 및 도킹 (70종 가나다순 주입)
    tacticList.forEach(tactic => {
        const btn = document.createElement('button');
        btn.id = tactic.id;
        btn.innerText = tactic.name;
        btn.className = `card-btn ${tactic.group} ${tactic.isOwned ? 'owned' : ''}`;
        btn.onclick = () => toggleState(tactic.id, 'tactic');
        if (tacticContainer) tacticContainer.appendChild(btn);
    });
}

// 보유 체크 미보유 스위칭 제어 로직
function toggleState(id, type) {
    const list = (type === 'hero') ? heroList : tacticList;
    const target = list.find(x => x.id === id);
    
    if (target) {
        target.isOwned = !target.isOwned; // 데이터 반전 연산
        const btn = document.getElementById(id);
        if (btn) {
            if (target.isOwned) btn.classList.add('owned');
            else btn.classList.remove('owned');
        }
    }
}

// 현 상태 압축 직렬화 보존 보관 로직
function saveData() {
    const data = { heroes: heroList, tactics: tacticList };
    localStorage.setItem('samguk_hobby_data', JSON.stringify(data));
    alert('체크 현황이 저장되었습니다.');
}

// 로컬 스토리지 데이터 파싱 복원 로직
function loadSavedData() {
    const saved = localStorage.getItem('samguk_hobby_data');
    if (!saved) return;
    
    const parsed = JSON.parse(saved);
    parsed.heroes.forEach(sh => {
        const h = heroList.find(x => x.id === sh.id);
        if (h) h.isOwned = sh.isOwned;
    });
    parsed.tactics.forEach(st => {
        const t = tacticList.find(x => x.id === st.id);
        if (t) t.isOwned = st.isOwned;
    });
}

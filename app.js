// [시스템 분석] app.js 인벤토리 연동 및 자동 백업 엔진 (신규 무장/전법 추가)
console.log("[시스템 분석] app.js 구글 계정 동기화 연동 백업 엔진 기동");

const heroList = [
    { id: 'h_gahu', name: '가후', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_gwa_ga', name: '곽가', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_samy', name: '사마의', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_sunuk', name: '순욱', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_akjin', name: '악진', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_jeonwi', name: '전위', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_jeonguk', name: '정욱', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_jojo_sp', name: '조조(제왕)', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_jojo', name: '조조', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_jangryo', name: '장료', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_janghap', name: '장합', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_hahoudon', name: '하후돈', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_hahouyeon', name: '하후연', group: 'wei', isOwned: false, star: 0, transcend: false },
    { id: 'h_heojeo', name: '허저', group: 'wei', isOwned: false, star: 0, transcend: false },
    
    { id: 'h_gwanu', name: '관우', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_gangyu', name: '강유', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_madae', name: '마대', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_macho', name: '마초', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_seoseo', name: '서서', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_samaga', name: '사마가', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_wuyeon', name: '위연', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_yubi', name: '유비', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_yubi_sp', name: '유비(제왕)', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_jangbi', name: '장비', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_jegaryang', name: '제갈량', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_joun', name: '조운', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_hwangchung', name: '황충', group: 'shu', isOwned: false, star: 0, transcend: false },
    { id: 'h_hwangworyeong', name: '황월영', group: 'shu', isOwned: false, star: 0, transcend: false },
    
    { id: 'h_daegyo', name: '대교', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_nosuk', name: '노숙', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_sogyo', name: '소교', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_songyeon', name: '손견', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_songwon', name: '손권', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_sonsanghyang', name: '손상향', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_sonchaek', name: '손책', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_songwon_sp', name: '손권(제왕)', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_yeomong', name: '여몽', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_yukson', name: '육손', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_yukhang', name: '육항', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_juyu', name: '주유', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_jutae', name: '주태', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_jeongbo', name: '정보', group: 'wu', isOwned: false, star: 0, transcend: false },
    { id: 'h_hwanggae', name: '황개', group: 'wu', isOwned: false, star: 0, transcend: false },
    
    { id: 'h_gongsonchan', name: '공손찬', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_dongtak', name: '동탁', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_anryang', name: '안량', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_yeopo', name: '여포', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_ugil', name: '우길', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_wonso', name: '원소', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_janggak', name: '장각', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_jangnyeong', name: '장녕', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_jangbo', name: '장보', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_jwaja', name: '좌자', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_chaemunhui', name: '채문희', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_choseon', name: '초선', group: 'qun', isOwned: false, star: 0, transcend: false },
    { id: 'h_hwata', name: '화타', group: 'qun', isOwned: false, star: 0, transcend: false }
];

const tacticList = [
    { id: 't_gandam', name: '간담상조', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_gajeong', name: '가정지전', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_gajeong_t', name: '강유겸제', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_gyeonbul', name: '견불가최', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_gyeonjin', name: '견진연봉', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_gonggi', name: '공기불비', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_gwaha', name: '과하탁교', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_gyochwi', name: '교취호탈', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_geukjeok', name: '극적제승', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_geumnang', name: '금낭묘계', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_geumjeok', name: '금적금왕', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_geumchang', name: '금창신', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_geumcheol', name: '금철교명', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_gimun', name: '기문둔갑', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_nakjeong', name: '낙정하석', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_donggu', name: '동구적개', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_dongjang', name: '동장철벽', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_dongchok', name: '동촉기선', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_manbu', name: '만부막적', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_manjeon', name: '만전제발', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_mancheon', name: '만천과해', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_munchi', name: '문치무공', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_miu', name: '미우주무', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_bangaek', name: '반객위주', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_byeongryang', name: '병량촌단', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_budong', name: '부동여산', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_bunseong', name: '분성지계', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_bisa', name: '비사주석', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_samyeon', name: '사면초가', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_sasaeng', name: '사생취의', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_seondeung', name: '선등함진', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_susang', name: '수상개화', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_seungseung', name: '승승장구', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_sunsu', name: '순수견양', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_simmo', name: '심모원려', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_anyoung', name: '안영찰채', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_amjeon', name: '암전난방', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_yangui', name: '양의화생', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_yangcho', name: '양초선행', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_yeoja', name: '여자동포', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_yosa', name: '요사여신', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_yongmaeng', name: '용맹무쌍', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_yongwang', name: '용왕직전', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_unju', name: '운주유악', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_wonseong', name: '원성재도', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_wiwi', name: '위위구조', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_yujwa', name: '유좌유용', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_igan', name: '이간계', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_iahwan', name: '이아환아', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_iil', name: '이일대로', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_itoe', name: '이퇴위진', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_ilgo', name: '일고작기', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_inse', name: '인세이도', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_jangsu_j', name: '전위위안', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_jegon', name: '제곤부위', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_jungjeong', name: '중정기고', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_jiin', name: '지인선임', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_jintoe', name: '진퇴유도', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_jinhwa', name: '진화타겁', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_jilpung', name: '질풍노도', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_cheonri', name: '천리추격', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_cheonsi', name: '천시지리', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_checheon', name: '체천행도', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_chukse', name: '축세대발', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_chukho', name: '축호과간', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_taecheong', name: '태청단경', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_tojeok', name: '토적격문', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_hyeonho', name: '현호제세', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_horyeong', name: '호령삼군', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_horyeong_m', name: '혼수모어', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_hongsu', name: '홍수첨향', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_hwaso', name: '화소적벽', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_hoengso', name: '횡소천군', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_hoengjing', name: '횡징폭렴', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_huyang', name: '휴양생식', group: 'tactic', isOwned: false, star: 0 }
];

const cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

const injectAppStyles = () => {
    if (document.getElementById('app-custom-styles')) return;
    const style = document.createElement('style');
    style.id = 'app-custom-styles';
    style.innerHTML = `
        .card-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; min-height: 55px; cursor: pointer; padding: 6px 4px; box-sizing: border-box; border: 1px solid #475569; border-radius: 6px; transition: all 0.2s ease; }
        .card-btn.owned { border-color: #4ade80; background-color: rgba(74, 222, 128, 0.15); box-shadow: inset 0 0 8px rgba(74, 222, 128, 0.1); }
        .card-btn.owned .card-name { color: #4ade80; font-weight: 800; }
        .card-btn:not(.owned) { border-color: #f87171; background-color: rgba(248, 113, 113, 0.05); opacity: 0.6; border-style: dashed; }
        .card-btn:not(.owned) .card-name { color: #fca5a5; }
        .card-btn .card-name { pointer-events: none; font-size: 13px; }
        .card-btn select { width: 85%; max-width: 65px; padding: 2px; font-size: 12px; background: rgba(15,23,42,0.9); color: #feca57; border: 1px solid #475569; border-radius: 4px; cursor: pointer; outline: none; text-align: center; text-align-last: center; }
        .card-btn .trans-btn { width: 85%; max-width: 65px; padding: 2px 0; font-size: 11px; background: rgba(255,255,255,0.1); color: #9ca3af; border: 1px solid #475569; border-radius: 4px; cursor: pointer; font-weight: bold; outline: none; text-align: center; transition: all 0.15s ease; }
        .card-btn .trans-btn.active { background: #38bdf8; color: #ffffff; border-color: #38bdf8; text-shadow: 0 0 3px rgba(0,0,0,0.5); box-shadow: 0 0 5px rgba(56,189,248,0.4); }
    `;
    document.head.appendChild(style);
};

function renderButtons() {
    const buildCardHtml = (item, isHero) => {
        const isTrans = isHero && !!item.transcend;
        const selectHtml = item.isOwned ? `
            <select onclick="event.stopPropagation();" onchange="window.updateStar(event, '${item.id}', '${isHero ? 'hero' : 'tactic'}', this.value)">
                ${[0, 1, 2, 3, 4, 5].map(s => `<option value="${s}" ${item.star === s ? 'selected' : ''}>${s}성</option>`).join('')}
            </select>` : '';
        const transHtml = (item.isOwned && isHero) ? `
            <button onclick="event.stopPropagation(); window.toggleTranscend(event, '${item.id}')" class="trans-btn ${isTrans ? 'active' : ''}">
                초월
            </button>` : '';
        
        return `
            <div id="${item.id}" class="card-btn ${item.group} ${item.isOwned ? 'owned' : ''}" onclick="window.toggleState('${item.id}', '${isHero ? 'hero' : 'tactic'}')">
                <span class="card-name">${item.name}</span>
                ${selectHtml}
                ${transHtml}
            </div>`;
    };

    const heroGroups = { wei: 'hero-container-wei', shu: 'hero-container-shu', wu: 'hero-container-wu', qun: 'hero-container-qun' };
    Object.entries(heroGroups).forEach(([group, containerId]) => {
        const el = document.getElementById(containerId);
        if (el) el.innerHTML = heroList.filter(h => h.group === group).map(h => buildCardHtml(h, true)).join('');
    });

    const tacticEl = document.getElementById('tactic-container');
    if (tacticEl) tacticEl.innerHTML = tacticList.map(t => buildCardHtml(t, false)).join('');
}

function toggleState(id, type) {
    const list = (type === 'hero') ? heroList : tacticList;
    const target = list.find(x => x.id === id);
    if (target) {
        target.isOwned = !target.isOwned;
        renderButtons();
        window.saveDataToLocalStorage();
    }
}

window.updateStar = function(event, id, type, value) {
    event.stopPropagation();
    const list = (type === 'hero') ? heroList : tacticList;
    const target = list.find(x => x.id === id);
    if (target) {
        target.star = parseInt(value, 10);
        window.saveDataToLocalStorage();
    }
};

window.toggleTranscend = function(event, id) {
    event.stopPropagation();
    const target = heroList.find(x => x.id === id);
    if (target) {
        target.transcend = !target.transcend;
        renderButtons();
        window.saveDataToLocalStorage();
    }
};

window.saveDataToLocalStorage = function() {
    const data = { heroes: heroList, tactics: tacticList };
    localStorage.setItem('samguk_hobby_data', JSON.stringify(data));
};

function loadSavedData() {
    try {
        const saved = localStorage.getItem('samguk_hobby_data');
        if (!saved) return;
        
        const parsed = JSON.parse(saved);
        
        const heroesSource = Array.isArray(parsed.heroes) ? parsed.heroes : Object.values(parsed.heroes || {});
        const hMap = heroesSource.reduce((acc, sh) => {
            if (sh?.name) acc[cStr(sh.name)] = sh;
            return acc;
        }, {});
        
        heroList.forEach(h => {
            const sh = hMap[cStr(h.name)];
            if (sh) {
                h.isOwned = !!sh.isOwned;
                h.star = (sh.star !== undefined && sh.star !== null) ? parseInt(sh.star, 10) : 0;
                h.transcend = !!sh.transcend;
            }
        });
        
        const tacticsSource = Array.isArray(parsed.tactics) ? parsed.tactics : Object.values(parsed.tactics || {});
        const tMap = tacticsSource.reduce((acc, st) => {
            if (st?.name) acc[cStr(st.name)] = st;
            return acc;
        }, {});
        
        tacticList.forEach(t => {
            const st = tMap[cStr(t.name)];
            if (st) {
                t.isOwned = !!st.isOwned;
                t.star = (st.star !== undefined && st.star !== null) ? parseInt(st.star, 10) : 0;
            }
        });
    } catch(e) {
        console.error("[시스템 에러] 인벤토리 복구 필터 우회 가동:", e);
    }
}

function initAppEngine() {
    injectAppStyles();
    loadSavedData();
    renderButtons();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppEngine);
} else {
    initAppEngine();
}

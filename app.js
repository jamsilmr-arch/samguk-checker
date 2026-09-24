// [시스템 분석] app.js 인벤토리 초월 연동 및 자동 백업 엔진 (데이터 무손실 압축 및 정크 보일러플레이트 코드 제거 완료)
console.log("[시스템 분석] app.js 구글 계정 동기화 및 로컬 파일 백업 엔진 기동");

var cStr = s => s?.toString().trim().replace(/\s+/g, '') || "";

// 🚨 데이터 무손실 압축 매핑 로직 적용 (중복 프로퍼티 제거)
var heroList = [
    ...[['h_gahu','가후'],['h_gwa_ga','곽가'],['h_samy','사마의'],['h_sunuk','순욱'],['h_akjin','악진'],['h_jeonwi','전위'],['h_jeonguk','정욱'],['h_jojo_sp','조조(제왕)'],['h_jojo','조조'],['h_jangryo','장료'],['h_janghap','장합'],['h_hahoudon','하후돈'],['h_hahouyeon','하후연'],['h_heojeo','허저'],['h_gyeonhui','견희']].map(h => ({id:h[0], name:h[1], group:'wei'})),
    ...[['h_gwanu','관우'],['h_gangyu','강유'],['h_madae','마대'],['h_macho','마초'],['h_beopjeong','법정'],['h_seoseo','서서'],['h_samaga','사마가'],['h_wuyeon','위연'],['h_yubi','유비'],['h_yubi_sp','유비(제왕)'],['h_jangbi','장비'],['h_jegaryang','제갈량'],['h_joun','조운'],['h_hwangchung','황충'],['h_hwangworyeong','황월영']].map(h => ({id:h[0], name:h[1], group:'shu'})),
    // [수정됨] 오나라 진영 배열 마지막에 'h_yukson_sp' 육손SP 추가 완료
    ...[['h_daegyo','대교'],['h_nosuk','노숙'],['h_sogyo','소교'],['h_songyeon','손견'],['h_songwon','손권'],['h_sonsanghyang','손상향'],['h_sonchaek','손책'],['h_songwon_sp','손권(제왕)'],['h_yeomong','여몽'],['h_yukson','육손'],['h_yukhang','육항'],['h_juyu','주유'],['h_jutae','주태'],['h_jeongbo','정보'],['h_hwanggae','황개'],['h_yukson_sp','육손SP']].map(h => ({id:h[0], name:h[1], group:'wu'})),
    ...[['h_gongsonchan','공손찬'],['h_dongtak','동탁'],['h_anryang','안량'],['h_yeopo','여포'],['h_ugil','우길'],['h_wonso','원소'],['h_janggak','장각'],['h_jangnyeong','장녕'],['h_jangbo','장보'],['h_jwaja','좌자'],['h_chaemunhui','채문희'],['h_choseon','초선'],['h_hwata','화타'],['h_hwangbosung','황보숭']].map(h => ({id:h[0], name:h[1], group:'qun'}))
].map(h => ({...h, isOwned:false, star:0, transcend:false}));

var tacticList = [
    ['t_gandam','간담상조'],['t_gajeong','가정지전'],['t_gajeong_t','강유겸제'],['t_gyeonbul','견불가최'],['t_gyeonjin','견진연봉'],['t_gyeokan','격안관화'],['t_gonggi','공기불비'],['t_gwaha','과하탁교'],['t_gyochwi','교취호탈'],['t_geukjeok','극적제승'],['t_geumnang','금낭묘계'],['t_geumjeok','금적금왕'],['t_geumchang','금창신'],['t_geumcheol','금철교명'],['t_gimun','기문둔갑'],['t_nakjeong','낙정하석'],['t_donggu','동구적개'],['t_dongjang','동장철벽'],['t_dongchok','동촉기선'],['t_manbu','만부막적'],['t_manjeon','만전제발'],['t_mancheon','만천과해'],['t_myeongchal','명찰추호'],['t_munchi','문치무공'],['t_miu','미우주무'],['t_bangaek','반객위주'],['t_byeongryang','병량촌단'],['t_budong','부동여산'],['t_bunseong','분성지계'],['t_bisa','비사주석'],['t_samyeon','사면초가'],['t_sasaeng','사생취의'],['t_seondeung','선등함진'],['t_susang','수상개화'],['t_sunsu','순수견양'],['t_seungseung','승승장구'],['t_simgu','심구고루'],['t_simmo','심모원려'],['t_anyoung','안영찰채'],['t_amjeon','암전난방'],['t_yangui','양의화생'],['t_yangcho','양초선행'],['t_yeoja','여자동포'],['t_yosa','요사여신'],['t_yongmaeng','용맹무쌍'],['t_yongwang','용왕직전'],['t_unju','운주유악'],['t_wonseong','원성재도'],['t_wiwi','위위구조'],['t_yubi','유비무환'],['t_yujwa','유좌유용'],['t_igan','이간계'],['t_iahwan','이아환아'],['t_iil','이일대로'],['t_itoe','이퇴위진'],['t_ilgo','일고작기'],['t_inse','인세이도'],['t_jangsu_j','전위위안'],['t_jegon','제곤부위'],['t_jungjeong','중정기고'],['t_jiin','지인선임'],['t_jintoe','진퇴유도'],['t_jinhwa','진화타겁'],['t_jilpung','질풍노도'],['t_cheonri','천리추격'],['t_cheonsi','천시지리'],['t_checheon','체천행도'],['t_chukse','축세대발'],['t_taecheong','태청단경'],['t_tojeok','토적격문'],['t_hyeonho','현호제세'],['t_horyeong','호령삼군'],['t_horyeong_m','혼수모어'],['t_hongsu','홍수첨향'],['t_hwaso','화소적벽'],['t_hujeok','후적박발'],['t_hoengso','횡소천군'],['t_hoengjing','횡징폭렴'],['t_huyang','휴양생식'],['t_pojeon','포전인옥'],['t_bulno','불노자위']
].map(t => ({ id: t[0], name: t[1], group: 'tactic', isOwned: false, star: 0 }));

var injectAppStyles = () => {
    if (document.getElementById('app-custom-styles')) return;
    const style = document.createElement('style');
    style.id = 'app-custom-styles';
    style.innerHTML = `
        .card-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; min-height: 55px; cursor: pointer; padding: 6px 4px; box-sizing: border-box; border: 1px solid var(--border-input); border-radius: 6px; transition: all 0.2s ease; background-color: var(--bg-card); }
        .card-btn:not(.owned) { border-style: dashed; opacity: 0.65; }
        .card-btn .card-name { pointer-events: none; font-size: 13px; color: var(--text-desc); font-weight: normal; }
        
        .card-btn.wei.owned { border-color: #3b82f6 !important; background-color: rgba(59, 130, 246, 0.15) !important; box-shadow: inset 0 0 8px rgba(59, 130, 246, 0.1); }
        .card-btn.wei.owned .card-name { color: #93c5fd !important; font-weight: bold; }
        .card-btn.shu.owned { border-color: #10b981 !important; background-color: rgba(16, 185, 129, 0.15) !important; box-shadow: inset 0 0 8px rgba(16, 185, 129, 0.1); }
        .card-btn.shu.owned .card-name { color: #6ee7b7 !important; font-weight: bold; }
        .card-btn.wu.owned { border-color: #ef4444 !important; background-color: rgba(239, 68, 68, 0.15) !important; box-shadow: inset 0 0 8px rgba(239, 68, 68, 0.1); }
        .card-btn.wu.owned .card-name { color: #fca5a5 !important; font-weight: bold; }
        .card-btn.qun.owned { border-color: #a855f7 !important; background-color: rgba(168, 85, 247, 0.15) !important; box-shadow: inset 0 0 8px rgba(168, 85, 247, 0.1); }
        .card-btn.qun.owned .card-name { color: #d8b4fe !important; font-weight: bold; }
        .card-btn.tactic.owned { border-color: var(--success-text) !important; background-color: var(--success-bg) !important; }
        .card-btn.tactic.owned .card-name { color: var(--success-text) !important; font-weight: bold; }

        .card-btn select { width: 85%; max-width: 65px; padding: 2px; font-size: 12px; background: var(--bg-input); color: var(--text-highlight); border: 1px solid var(--border-input); border-radius: 4px; cursor: pointer; outline: none; text-align: center; text-align-last: center; }
        .card-btn .trans-btn { width: 85%; max-width: 65px; padding: 2px 0; font-size: 11px; background: var(--bg-inner); color: var(--text-muted); border: 1px solid var(--border-input); border-radius: 4px; cursor: pointer; font-weight: bold; outline: none; text-align: center; transition: all 0.15s ease; }
        .card-btn .trans-btn.active { background: #38bdf8; color: #ffffff; border-color: #38bdf8; text-shadow: 0 0 3px rgba(0,0,0,0.5); box-shadow: 0 0 5px rgba(56,189,248,0.4); }
    `;
    document.head.appendChild(style);
};

var injectBackupUI = () => {
    if (document.getElementById('backup-ui-container')) return;
    const container = document.createElement('div');
    container.id = 'backup-ui-container';
    container.style.cssText = 'padding: 15px 30px; display: flex; gap: 10px; justify-content: flex-end; align-items: center; border-bottom: 1px solid var(--border-main); background-color: var(--bg-panel);';
    container.innerHTML = `
        <span style="color: var(--text-muted); font-size: 12px; margin-right: auto;">※ 내 장수/전법 데이터를 PC나 기기에 보관하고 언제든 복구할 수 있습니다.</span>
        <button onclick="window.exportDataToFile()" style="background:#3b82f6; color:#fff; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:13px; box-shadow:0 2px 4px rgba(0,0,0,0.2); transition: background 0.2s;">💾 파일로 저장</button>
        <button onclick="window.triggerImportData()" style="background:#10b981; color:#fff; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:13px; box-shadow:0 2px 4px rgba(0,0,0,0.2); transition: background 0.2s;">📂 파일 불러오기</button>
    `;
    
    const navBar = document.querySelector('.global-nav-bar');
    if (navBar) navBar.insertAdjacentElement('afterend', container);
    else document.body.insertBefore(container, document.body.firstChild);
};

window.exportDataToFile = function() {
    const dataStr = JSON.stringify({ heroes: heroList, tactics: tacticList }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    const d = new Date();
    a.download = `삼국지왕전_백업_${d.getFullYear()}${(d.getMonth()+1).toString().padStart(2,'0')}${d.getDate().toString().padStart(2,'0')}_${d.getHours().toString().padStart(2,'0')}${d.getMinutes().toString().padStart(2,'0')}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// 🚨 중복 정크 코드를 제거하기 위한 공통 데이터 병합(Sync) 헬퍼 함수
function syncListData(sourceArr, targetList, isHero) {
    const src = Array.isArray(sourceArr) ? sourceArr : Object.values(sourceArr || {});
    const map = src.reduce((acc, obj) => { if(obj?.name) acc[cStr(obj.name)] = obj; return acc; }, {});
    
    targetList.forEach(item => {
        const sItem = map[cStr(item.name)];
        if(sItem) {
            item.isOwned = !!sItem.isOwned;
            item.star = (sItem.star !== undefined && sItem.star !== null) ? parseInt(sItem.star, 10) : 0;
            if (isHero) item.transcend = !!sItem.transcend;
        }
    });
}

window.triggerImportData = function() {
    let fileInput = document.getElementById('samguk-file-input');
    if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'samguk-file-input';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
        
        fileInput.onchange = function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const parsed = JSON.parse(event.target.result);
                    if (!parsed.heroes && !parsed.tactics) throw new Error("유효하지 않은 데이터 형식입니다.");
                    
                    syncListData(parsed.heroes, heroList, true);
                    syncListData(parsed.tactics, tacticList, false);
                    
                    window.saveDataToLocalStorage();
                    renderButtons();
                    alert("데이터 복구가 성공적으로 완료되었습니다.");
                } catch (err) {
                    alert("파일을 읽는 중 오류가 발생했습니다: " + err.message);
                }
                fileInput.value = ""; 
            };
            reader.readAsText(file);
        };
        document.body.appendChild(fileInput);
    }
    fileInput.click();
};

function renderButtons() {
    heroList.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    tacticList.sort((a, b) => a.name.localeCompare(b.name, 'ko'));

    const buildCardHtml = (item, isHero) => {
        const isTrans = isHero && !!item.transcend;
        const selectHtml = item.isOwned ? `<select onclick="event.stopPropagation();" onchange="window.updateStar(event, '${item.id}', '${isHero ? 'hero' : 'tactic'}', this.value)">${[0, 1, 2, 3, 4, 5].map(s => `<option value="${s}" ${item.star === s ? 'selected' : ''}>${s}성</option>`).join('')}</select>` : '';
        const transHtml = (item.isOwned && isHero) ? `<button onclick="event.stopPropagation(); window.toggleTranscend(event, '${item.id}')" class="trans-btn ${isTrans ? 'active' : ''}">초월</button>` : '';
        return `<div id="${item.id}" class="card-btn ${item.group} ${item.isOwned ? 'owned' : ''}" onclick="window.toggleState('${item.id}', '${isHero ? 'hero' : 'tactic'}')"><span class="card-name">${item.name}</span>${selectHtml}${transHtml}</div>`;
    };

    const heroGroups = { wei: 'hero-container-wei', shu: 'hero-container-shu', wu: 'hero-container-wu', qun: 'hero-container-qun' };
    Object.entries(heroGroups).forEach(([group, containerId]) => {
        const el = document.getElementById(containerId);
        if (el) el.innerHTML = heroList.filter(h => h.group === group).map(h => buildCardHtml(h, true)).join('');
    });

    const tacticEl = document.getElementById('tactic-container');
    if (tacticEl) tacticEl.innerHTML = tacticList.map(t => buildCardHtml(t, false)).join('');
}

window.toggleState = function(id, type) {
    const list = (type === 'hero') ? heroList : tacticList;
    const target = list.find(x => x.id === id);
    if (target) { target.isOwned = !target.isOwned; renderButtons(); window.saveDataToLocalStorage(); }
}

window.updateStar = function(event, id, type, value) {
    event.stopPropagation();
    const list = (type === 'hero') ? heroList : tacticList;
    const target = list.find(x => x.id === id);
    if (target) { target.star = parseInt(value, 10); window.saveDataToLocalStorage(); }
};

window.toggleTranscend = function(event, id) {
    event.stopPropagation();
    const target = heroList.find(x => x.id === id);
    if (target) { target.transcend = !target.transcend; renderButtons(); window.saveDataToLocalStorage(); }
};

window.saveDataToLocalStorage = function() {
    localStorage.setItem('samguk_hobby_data', JSON.stringify({ heroes: heroList, tactics: tacticList }));
};

function loadSavedData() {
    try {
        const saved = localStorage.getItem('samguk_hobby_data');
        if (!saved) return;
        const parsed = JSON.parse(saved);
        
        syncListData(parsed.heroes, heroList, true);
        syncListData(parsed.tactics, tacticList, false);
    } catch(e) { console.error("[시스템 에러] 인벤토리 복구 필터 우회 가동:", e); }
}

function initAppEngine() { injectAppStyles(); injectBackupUI(); loadSavedData(); renderButtons(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAppEngine);
else initAppEngine();

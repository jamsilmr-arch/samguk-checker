console.log("[시스템 분석] app.js 인벤토리 초월(Transcend) 연동 백업·복구 엔진 기동");

// ==========================================================================
// LAYER 1: 마스터 정적 인벤토리 데이터 구역
// ==========================================================================
const heroList = [
    // 위나라 (13명)
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
    
    // 촉나라 (14명)
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
    
    // 오나라 (15명)
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
    
    // 군진영 (12명)
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
    { id: 't_geum창', name: '금창신', group: 'tactic', isOwned: false, star: 0 },
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
    { id: 't_bunseong', name: '분성지계', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_bisa', name: '비사주석', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_samyeon', name: '사면초가', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_sasaeng', name: '사생취의', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_seondeung', name: '선등함진', group: 'tactic', isOwned: false, star: 0 },
    { id: 't_susang', name: '수상개화', group: 'tactic', isOwned: false, star: 0 },
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

// ==========================================================================
// LAYER 2: 비즈니스 렌더링 및 보유 상향 체크 다이렉트 컨트롤러
// ==========================================================================
function renderButtons() {
    const containers = {
        wei: document.getElementById('hero-container-wei'),
        shu: document.getElementById('hero-container-shu'),
        wu: document.getElementById('hero-container-wu'),
        qun: document.getElementById('hero-container-qun')
    };
    const tacticContainer = document.getElementById('tactic-container');

    Object.keys(containers).forEach(key => {
        if (containers[key]) containers[key].innerHTML = '';
    });
    if (tacticContainer) tacticContainer.innerHTML = '';

    const createCard = (item, type, container) => {
        const cardNode = document.createElement('div');
        cardNode.id = item.id;
        cardNode.className = `card-btn ${item.group} ${item.isOwned ? 'owned' : ''}`;
        cardNode.style.display = 'flex';
        cardNode.style.flexDirection = 'column';
        cardNode.style.alignItems = 'center';
        cardNode.style.justifyContent = 'center';
        cardNode.style.gap = '5px';
        cardNode.style.minHeight = '55px'; 
        cardNode.style.cursor = 'pointer';
        cardNode.style.padding = '6px 4px';
        cardNode.style.boxSizing = 'border-box';
        
        cardNode.onclick = function() { toggleState(item.id, type); };

        let innerHtml = `<span style="font-weight: bold; pointer-events: none; font-size: 13px;">${item.name}</span>`;
        
        if (item.isOwned) {
            innerHtml += `
                <select onclick="event.stopPropagation();" onchange="updateStar(event, '${item.id}', '${type}', this.value)" style="width: 85%; max-width: 65px; padding: 2px; font-size: 12px; background: rgba(0,0,0,0.8); color: #feca57; border: 1px solid #555; border-radius: 4px; cursor: pointer; outline: none; text-align: center; text-align-last: center;">
                    <option value="0" ${item.star === 0 ? 'selected' : ''}>0성</option>
                    <option value="1" ${item.star === 1 ? 'selected' : ''}>1성</option>
                    <option value="2" ${item.star === 2 ? 'selected' : ''}>2성</option>
                    <option value="3" ${item.star === 3 ? 'selected' : ''}>3성</option>
                    <option value="4" ${item.star === 4 ? 'selected' : ''}>4성</option>
                    <option value="5" ${item.star === 5 ? 'selected' : ''}>5성</option>
                </select>
            `;
            
            if (type === 'hero') {
                const isTrans = !!item.transcend;
                innerHtml += `
                    <button onclick="event.stopPropagation(); window.toggleTranscend(event, '${item.id}')" style="width: 85%; max-width: 65px; padding: 2px 0; font-size: 11px; background: ${isTrans ? '#00b0ff' : 'rgba(255,255,255,0.1)'}; color: ${isTrans ? '#ffffff' : '#888888'}; border: 1px solid ${isTrans ? '#00b0ff' : '#444444'}; border-radius: 4px; cursor: pointer; font-weight: bold; outline: none; text-align: center; text-shadow: ${isTrans ? '0 0 3px rgba(0,0,0,0.5)' : 'none'}; box-shadow: ${isTrans ? '0 0 5px rgba(0,176,255,0.4)' : 'none'}; transition: all 0.15s ease;">
                        ${isTrans ? '초월' : '초월'}
                    </button>
                `;
            }
        }
        
        cardNode.innerHTML = innerHtml;
        if (container) container.appendChild(cardNode);
    };

    heroList.forEach(hero => createCard(hero, 'hero', containers[hero.group]));
    tacticList.forEach(tactic => createCard(tactic, 'tactic', tacticContainer));
}

function toggleState(id, type) {
    const list = (type === 'hero') ? heroList : tacticList;
    const target = list.find(x => x.id === id);
    
    if (target) {
        target.isOwned = !target.isOwned;
        renderButtons();
    }
}

window.updateStar = function(event, id, type, value) {
    event.stopPropagation();
    const list = (type === 'hero') ? heroList : tacticList;
    const target = list.find(x => x.id === id);
    if (target) {
        target.star = parseInt(value);
    }
};

window.toggleTranscend = function(event, id) {
    event.stopPropagation();
    const target = heroList.find(x => x.id === id);
    if (target) {
        target.transcend = !target.transcend;
        renderButtons();
    }
};

function saveData() {
    const data = { heroes: heroList, tactics: tacticList };
    localStorage.setItem('samguk_hobby_data', JSON.stringify(data));
    alert('체크 현황이 안전하게 저장되었습니다.');
}

function loadSavedData() {
    try {
        const saved = localStorage.getItem('samguk_hobby_data');
        if (!saved) return;
        
        const parsed = JSON.parse(saved);
        if (parsed && parsed.heroes && Array.isArray(parsed.heroes)) {
            parsed.heroes.forEach(sh => {
                if (!sh) return;
                const h = heroList.find(x => x.id === sh.id);
                if (h) {
                    h.isOwned = !!sh.isOwned;
                    h.star = (sh.star !== undefined && sh.star !== null) ? parseInt(sh.star) : 0;
                    h.transcend = !!sh.transcend; 
                }
            });
        }
        if (parsed && parsed.tactics && Array.isArray(parsed.tactics)) {
            parsed.tactics.forEach(st => {
                if (!st) return;
                const t = tacticList.find(x => x.id === st.id);
                if (t) {
                    t.isOwned = !!st.isOwned;
                    t.star = (st.star !== undefined && st.star !== null) ? parseInt(st.star) : 0;
                }
            });
        }
    } catch(e) {
        console.error("[시스템 에러] 인벤토리 복구 필터 우회 가동:", e);
    }
}

// ==========================================================================
// LAYER 3: 교차 호환형 영구 자원 백업 및 복구 엔진 (초월 및 실시간 상태 동기화)
// ==========================================================================
function exportData() {
    try {
        // [핵심 패치]: 로컬 스토리지 대신 현재 메모리(Live memory)의 초월/성급 객체를 즉시 빌드하여 누락 전면 방어
        const liveHobbyData = { heroes: heroList, tactics: tacticList };
        var deckData = localStorage.getItem('samguk_deck_text');
        
        var backupObject = {
            samguk_hobby_data: liveHobbyData,
            samguk_deck_text: deckData ? JSON.parse(deckData) : null
        };
        
        var jsonString = JSON.stringify(backupObject, null, 2);
        var blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
        
        var downloadAnchor = document.createElement('a');
        downloadAnchor.href = URL.createObjectURL(blob);
        downloadAnchor.download = "samguk_wangjeon_database_backup.json";
        
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
        
        console.log("[백업 인프라] 메모리 상의 실시간 초월 및 성급 파라미터 백업 직렬화 마감 완료");
    } catch (err) {
        alert("백업 생성 실패: " + err.message);
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
            
            if (!importedDatabase.samguk_hobby_data && !importedDatabase.samguk_deck_text) {
                alert("삼국지 왕전의 정식 백업 스냅샷 파일이 아닙니다.");
                return;
            }
            
            // [하위 호환 패치]: 구버전 백업 파일 로드 시 꼬임 방지를 위해 transcend/star 누락분 복구 튜닝 사전 연산
            if (importedDatabase.samguk_hobby_data && importedDatabase.samguk_hobby_data.heroes) {
                importedDatabase.samguk_hobby_data.heroes.forEach(h => {
                    if (h && h.transcend === undefined) h.transcend = false;
                    if (h && h.star === undefined) h.star = 0;
                });
            }
            if (importedDatabase.samguk_hobby_data && importedDatabase.samguk_hobby_data.tactics) {
                importedDatabase.samguk_hobby_data.tactics.forEach(t => {
                    if (t && t.star === undefined) t.star = 0;
                });
            }
            
            if (importedDatabase.samguk_hobby_data) {
                localStorage.setItem('samguk_hobby_data', JSON.stringify(importedDatabase.samguk_hobby_data));
            }
            if (importedDatabase.samguk_deck_text) {
                localStorage.setItem('samguk_deck_text', JSON.stringify(importedDatabase.samguk_deck_text));
            }
            
            alert("보유 및 초월 데이터 마이그레이션 완료. 인벤토리 동기화를 위해 화면을 리로드합니다.");
            location.reload();
            
        } catch (err) {
            alert("JSON 구조 파싱 에러: 파손된 아카이브 파일입니다.");
        }
    };
    reader.readAsText(file, "utf-8");
}

// 전역 윈도우 인라인 맵핑 바인딩
window.toggleSortMode = function() {};
window.toggleState = toggleState;
window.saveData = saveData;
window.exportData = exportData;
window.triggerImport = triggerImport;
window.importData = importData;

// 강제 실행 돔 생명주기 엔진
function initAppEngine() {
    loadSavedData();
    renderButtons();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppEngine);
} else {
    initAppEngine();
}

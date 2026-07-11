import { formationEffects, formationPositions, officerRoleMap, officerUniqueTacticMap, allTacticsList, defaultPresetDecks } from './deck_data.js';
import { calculateDeckScore, generateDeckFeedback, calculateActivatedBond } from './deck_engine.js';

let dynamicPresetDecks = [];
let currentSortMode = 'default'; 

window.addEventListener('DOMContentLoaded', () => {
    loadDeckTextData();
    renderDeckBuilder();
});

// 자가 치유형 데이터 복구 파이프라인 (Null 참조 오염 원천 청소)
function loadDeckTextData() {
    try {
        const savedText = localStorage.getItem('samguk_deck_text');
        if (savedText) {
            const parsed = JSON.parse(savedText);
            if (Array.isArray(parsed) && parsed.length > 0) {
                dynamicPresetDecks = parsed;
                
                if (dynamicPresetDecks.length > 5) {
                    dynamicPresetDecks.splice(5);
                    localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
                }

                if (dynamicPresetDecks.length < 5) {
                    for (let i = dynamicPresetDecks.length; i < 5; i++) {
                        dynamicPresetDecks.push(JSON.parse(JSON.stringify(defaultPresetDecks[i])));
                    }
                }

                dynamicPresetDecks.forEach((deck, idx) => {
                    if (!deck || typeof deck !== 'object') {
                        dynamicPresetDecks[idx] = JSON.parse(JSON.stringify(defaultPresetDecks[idx] || defaultPresetDecks[0]));
                    }
                    const d = dynamicPresetDecks[idx];
                    d.originIdx = (d.originIdx !== undefined) ? d.originIdx : idx;
                    if (!d.title) d.title = defaultPresetDecks[idx]?.title || `${idx + 1}군`;
                    if (!d.formation) d.formation = defaultPresetDecks[idx]?.formation || "추형진";
                    if (!Array.isArray(d.officers) || d.officers.length === 0) {
                        d.officers = JSON.parse(JSON.stringify(defaultPresetDecks[idx]?.officers || defaultPresetDecks[0].officers));
                    }
                    
                    // 핵심 안전장치: 내부에 축적되었던 훼손된 Null 객체 무조건 초기화 필터[cite: 6]
                    d.officers.forEach((off, oIdx) => {
                        if (!off || typeof off !== 'object') {
                            off = { name: "", chosenTactics: ["", ""] };
                            d.officers[oIdx] = off;
                        }
                        if (off.name === "제)조조") off.name = "조조(제왕)";
                        if (off.name === "제)유비") off.name = "유비(제왕)";
                        if (off.name === undefined || off.name === null) off.name = "";
                        if (!Array.isArray(off.chosenTactics)) {
                            off.chosenTactics = ["", ""];
                        }
                    });
                });

                localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
                return;
            }
        }
    } catch (e) {
        console.error("스토리지 클리닝 가동:", e);
    }
    dynamicPresetDecks = JSON.parse(JSON.stringify(defaultPresetDecks));
    dynamicPresetDecks.forEach((d, idx) => { d.originIdx = idx; });
}

function resetDeck(originIdx) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        targetDeck.officers.forEach(off => {
            if (off) {
                off.name = ""; 
                off.chosenTactics = ["", ""]; 
            }
        });
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder(); 
}

function toggleSortMode(mode) {
    currentSortMode = mode;
    document.querySelectorAll('.control-sort-btn').forEach(btn => btn.classList.remove('active'));
    if (mode === 'default') document.getElementById('sort-default-btn').classList.add('active');
    else document.getElementById('sort-score-btn').classList.add('active');
    renderDeckBuilder();
}

function saveEditedText(originIdx, propertyName, element) {
    let textValue = element.innerText.trim();
    textValue = textValue.replace(/\s*\[추천도:\s*\d+점\]/g, "").trim();

    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        if (textValue.length === 0) {
            textValue = defaultPresetDecks[originIdx] ? defaultPresetDecks[originIdx][propertyName] : "부대 명칭";
        }
        targetDeck[propertyName] = textValue;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder();
}

function changeFormation(originIdx, selectElement) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck) {
        targetDeck.formation = selectElement.value;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder();
}

function changeOfficer(originIdx, officerIdx, selectElement) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === officerIdx);
    if (targetDeck && targetDeck.officers[officerIdx]) {
        targetDeck.officers[officerIdx].name = selectElement.value;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder(); 
}

function changeTactic(originIdx, officerIdx, slotIdx, selectElement) {
    const targetDeck = dynamicPresetDecks.find(d => d.originIdx === originIdx);
    if (targetDeck && targetDeck.officers[officerIdx]) {
        targetDeck.officers[officerIdx].chosenTactics[slotIdx] = selectElement.value;
        localStorage.setItem('samguk_deck_text', JSON.stringify(dynamicPresetDecks));
    }
    renderDeckBuilder(); 
}

function renderDeckBuilder() {
    const container = document.getElementById('deck-container');
    if (!container) return;
    container.innerHTML = '';

    const savedData = localStorage.getItem('samguk_hobby_data');
    let ownedHeroes = [];
    let ownedTactics = [];

    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            ownedHeroes = parsed.heroes ? parsed.heroes.filter(x => x.isOwned).map(x => {
                let name = (x.name || "").toString().trim();
                if (name === "제)조조") name = "조조(제왕)";
                if (name === "제)유비") name = "유비(제왕)";
                return name;
            }) : [];
            ownedTactics = parsed.tactics ? parsed.tactics.filter(x => x.isOwned).map(x => (x.name || "").toString().trim()) : [];
        } catch (e) {
            console.error("데이터 동기화 실패 우회:", e);
        }
    }

    let displayDecks = [...dynamicPresetDecks];
    
    if (currentSortMode === 'score') {
        displayDecks.sort((a, b) => {
            const scoreA = calculateDeckScore(a, ownedHeroes, ownedTactics);
            const scoreB = calculateDeckScore(b, ownedHeroes, ownedTactics);
            return scoreB - scoreA;
        });
    } else {
        displayDecks.sort((a, b) => (a.originIdx || 0) - (b.originIdx || 0));
    }

    const sortedHeroNames = Object.keys(officerRoleMap).sort((a, b) => a.localeCompare(b, 'ko'));

    displayDecks.forEach((deck) => {
        const deckCard = document.createElement('div');
        deckCard.className = 'deck-card';

        const currentComputedScore = calculateDeckScore(deck, ownedHeroes, ownedTactics);
        const computedBondText = calculateActivatedBond(deck.officers);

        let officersHtml = '';
        if (Array.isArray(deck.officers)) {
            deck.officers.forEach((off, offIdx) => {
                if (!off) return;
                let tacticRowsHtml = '';
                const hName = (off.name || "").toString().trim();
                const cleanHName = hName.replace(/\s+/g, '');
                const cleanOwnedHeroes = ownedHeroes.map(h => h.replace(/\s+/g, ''));
                const cleanOwnedTactics = ownedTactics.map(t => t.replace(/\s+/g, ''));

                const isHeroOwned = cleanOwnedHeroes.includes(cleanHName);

                if (cleanHName) {
                    const inherentTactic = officerUniqueTacticMap[hName] || "효웅";
                    const cleanInherent = inherentTactic.trim().replace(/\s+/g, '');
                    const isInherentOwned = isHeroOwned || cleanOwnedTactics.includes(cleanInherent);

                    tacticRowsHtml += `
                        <div class="tactic-row ${isInherentOwned ? 'owned' : 'missing'}" style="border-left: 3px solid #cd9b33;">
                            <span>⭐ ${inherentTactic} (고유)</span>
                            <span>${isInherentOwned ? '보유중' : '미보유'}</span>
                        </div>
                    `;
                } else {
                    tacticRowsHtml += `
                        <div class="tactic-row missing" style="border-left: 3px solid #555; background-color: rgba(255,255,255,0.02);">
                            <span style="color: #666;">⭐ 고유 전법 (미배치)</span>
                            <span style="color: #666;">-</span>
                        </div>
                    `;
                }

                if (Array.isArray(off.chosenTactics)) {
                    off.chosenTactics.forEach((tacticName, slotIdx) => {
                        const cleanTac = (tacticName || "").toString().trim();
                        const isOwned = cleanOwnedTactics.includes(cleanTac.replace(/\s+/g, ''));
                        
                        let optionsHtml = `<option value="" ${cleanTac === "" ? 'selected' : ''}>선택 안함</option>`;
                        allTacticsList.forEach(tName => {
                            const isSelected = cleanTac === tName ? 'selected' : '';
                            optionsHtml += `<option value="${tName}" ${isSelected}>${tName}</option>`;
                        });
                        
                        tacticRowsHtml += `
                            <div class="tactic-row ${cleanTac === "" ? 'missing' : (isOwned ? 'owned' : 'missing')}" style="padding: 4px 12px;">
                                <select class="tactic-dropdown" onchange="changeTactic(${deck.originIdx}, ${offIdx}, ${slotIdx}, this)">
                                    ${optionsHtml}
                                </select>
                                <span class="tactic-status-text" style="${cleanTac === "" ? 'color:#666;' : ''}">
                                    ${cleanTac === "" ? '슬롯 비어있음' : (isOwned ? '장착 완료' : '미보유')}
                                </span>
                            </div>
                        `;
                    });
                }

                const currentPos = formationPositions[deck.formation]?.[offIdx] || "front";
                const posLabel = currentPos === 'front' ? '전열' : '후열';
                const posClass = currentPos === 'front' ? 'front' : 'back';

                let officerOptionsHtml = `<option value="" ${cleanHName === "" ? 'selected' : ''}>선택 안함</option>`;
                sortedHeroNames.forEach(hKey => {
                    const isSelected = hName === hKey ? 'selected' : '';
                    officerOptionsHtml += `<option value="${hKey}" ${isSelected}>${hKey}</option>`;
                });

                const currentComputedRole = cleanHName ? (officerRoleMap[hName] || "보조, 버퍼") : "미배치";

                officersHtml += `
                    <div class="officer-slot" style="${!cleanHName ? 'border: 1px dashed #444; background-color: rgba(0,0,0,0.1);' : ''}">
                        <div class="officer-meta">
                            <span class="position-badge ${posClass}">${posLabel}</span>
                            <div class="officer-select-container">
                                <select class="officer-dropdown" onchange="changeOfficer(${deck.originIdx}, ${offIdx}, this)">
                                    ${officerOptionsHtml}
                                </select>
                            </div>
                        </div>
                        <div class="officer-role-label" style="${!cleanHName ? 'color:#555;' : ''}">${currentComputedRole}</div>
                        <div class="tactic-status-box">
                            ${tacticRowsHtml}
                        </div>
                    </div>
                `;
            });
        }

        let formationOptionsHtml = '';
        Object.keys(formationEffects).forEach(fName => {
            const isSelected = deck.formation === fName ? 'selected' : '';
            formationOptionsHtml += `<option value="${fName}" ${isSelected}>${fName}</option>`;
        });

        const currentEffectText = formationEffects[deck.formation] || formationEffects["추형진"];
        const feedbackArr = generateDeckFeedback(deck, ownedHeroes, ownedTactics);
        let feedbackHtml = '';
        
        if (currentComputedScore === 100 && feedbackArr.length === 2) { 
            feedbackHtml = `<div class="feedback-item success">★ 축하합니다! ${feedbackArr[0].split(']')[0]}] 과 완벽히 일치하는 무결성 최적화 군단입니다.</div>
                            <div class="feedback-item" style="background-color:rgba(168,85,247,0.15); border-left-color:#a855f7;">${feedbackArr[1]}</div>`;
        } else if (currentComputedScore === 100 && feedbackArr.length > 2) {
            feedbackHtml = `<div class="feedback-item success">✓ 현재 덱 방향성으로 100점 점수를 달성했습니다. 아래의 분석을 참고하여 통계적 고점을 추가 확보할 수 있습니다.</div>`;
            feedbackArr.forEach((fb) => {
                if (fb.includes('시스템 가이드 연동')) {
                    feedbackHtml += `<div class="feedback-item" style="background-color:rgba(168,85,247,0.15); border-left-color:#a855f7;">${fb}</div>`;
                } else {
                    feedbackHtml += `<div class="feedback-item info">${fb}</div>`;
                }
            });
        } else {
            feedbackArr.forEach((fb, index) => { 
                if (index === 0) {
                    feedbackHtml += `<div class="feedback-item info">${fb}</div>`; 
                } else if (fb.includes('시스템 가이드 연동')) {
                    feedbackHtml += `<div class="feedback-item" style="background-color:rgba(168,85,247,0.15); border-left-color:#a855f7;">${fb}</div>`;
                } else {
                    feedbackHtml += `<div class="feedback-item warning">${fb}</div>`; 
                }
            });
        }

        deckCard.innerHTML = `
            <div class="deck-title" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div>
                    <span contenteditable="true" onblur="saveEditedText(${deck.originIdx}, 'title', this)" style="outline: none;">${deck.title}</span> 
                    <span style="color: #ff9f43; font-size: 13px; margin-left: 12px; font-weight: bold; user-select: none;">[추천도: ${currentComputedScore}점]</span>
                </div>
                <button class="reset-deck-btn" onclick="resetDeck(${deck.originIdx})" style="background-color: #c82333; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold; transition: background-color 0.2s;">부대 초기화</button>
            </div>
            <div class="bond-box">
                <span class="bond-highlight">부대 인연 효과 :</span> 
                <span style="display:inline-block; outline:none;">${computedBondText}</span>
            </div>
            <div class="officers-row">
                ${officersHtml}
            </div>
            
            <div class="feedback-container-box">
                <div class="feedback-header-title">📋 AI 메타 역추적 기반 실시간 맞춤 처방전</div>
                <div class="feedback-list-wrapper">${feedbackHtml}</div>
            </div>

            <div class="deck-footer-bar">
                <div class="footer-left">
                    <select class="formation-select" onchange="changeFormation(${deck.originIdx}, this)">
                        ${formationOptionsHtml}
                    </select>
                </div>
                <div class="footer-right">${currentEffectText}</div>
            </div>
        `;
        container.appendChild(deckCard);
    });
}

window.toggleSortMode = toggleSortMode;
window.saveEditedText = saveEditedText;
window.changeFormation = changeFormation;
window.changeOfficer = changeOfficer;
window.changeTactic = changeTactic;
window.resetDeck = resetDeck;
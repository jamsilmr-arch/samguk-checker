import { officerUniqueTacticMap, analyzedMetaArchetypes, systemGuideInsights, bondRules, formationPositions } from './deck_data.js';

// 보유 현황 가중치 평가 점수 연산 함수[cite: 6]
export function calculateDeckScore(deck, ownedHeroes, ownedTactics) {
    if (!deck || !Array.isArray(deck.officers)) return 0;
    
    let heroMatchCount = 0;
    let tacticMatchCount = 0;
    const totalTacticSlots = 9;

    const cleanOwnedHeroes = ownedHeroes.map(h => h.replace(/\s+/g, ''));
    const cleanOwnedTactics = ownedTactics.map(t => t.replace(/\s+/g, ''));

    deck.officers.forEach(off => {
        if (!off || !off.name) return;
        const hName = off.name.toString().trim();
        const cleanHName = hName.replace(/\s+/g, '');
        if (!cleanHName) return;
        
        const isHeroOwned = cleanOwnedHeroes.includes(cleanHName);
        if (isHeroOwned) {
            heroMatchCount += 1;
        }
        
        const inherentTactic = officerUniqueTacticMap[hName];
        if (inherentTactic) {
            const cleanInherent = inherentTactic.toString().trim().replace(/\s+/g, '');
            if (isHeroOwned || cleanOwnedTactics.includes(cleanInherent)) {
                tacticMatchCount += 1;
            }
        }
        
        if (Array.isArray(off.chosenTactics)) {
            off.chosenTactics.forEach(tac => {
                if (tac) {
                    const cleanTac = tac.toString().trim().replace(/\s+/g, '');
                    if (cleanOwnedTactics.includes(cleanTac)) {
                        tacticMatchCount += 1;
                    }
                }
            });
        }
    });

    const finalHeroScore = heroMatchCount * 20;
    const finalTacticScore = (tacticMatchCount / totalTacticSlots) * 40;

    return Math.round(finalHeroScore + finalTacticScore);
}

// 무장 및 전법 순서 변경 노이즈 필터링이 반영된 AI 처방전 도출 알고리즘[cite: 6]
export function generateDeckFeedback(deck, ownedHeroes, ownedTactics) {
    let bestMatchDeck = analyzedMetaArchetypes[0]; 
    let maxMatchScore = -1;

    const currentCleanNames = [];
    if (Array.isArray(deck?.officers)) {
        deck.officers.forEach(o => currentCleanNames.push((o?.name || "").toString().trim().replace(/\s+/g, '')));
    }

    analyzedMetaArchetypes.forEach(metaDeck => {
        let matchScore = 0;
        metaDeck.officers.forEach((metaOff, idx) => {
            const metaName = metaOff.name.replace(/\s+/g, '');
            if (currentCleanNames.includes(metaName)) {
                matchScore += 1; 
            }
            if (currentCleanNames[idx] === metaName) {
                matchScore += 0.5;
            }
        });
        
        if (matchScore > maxMatchScore) {
            maxMatchScore = matchScore;
            bestMatchDeck = metaDeck;
        }
    });

    const idealDeck = bestMatchDeck;
    let feedbackList = [];
    
    feedbackList.push(`🎯 <strong>분석 완료:</strong> 현재 덱은 랭커 메타인 <strong>[${idealDeck.name}]</strong> 기반으로 세팅하는 것이 수학적 고점이 가장 높습니다. (${idealDeck.concept})`);
    
    if (systemGuideInsights[idealDeck.id]) {
        feedbackList.push(systemGuideInsights[idealDeck.id]);
    }

    const cleanOwnedHeroes = ownedHeroes.map(h => h.replace(/\s+/g, ''));
    const cleanOwnedTactics = ownedTactics.map(t => t.replace(/\s+/g, ''));

    const currentFormation = (deck?.formation || "").toString().trim();
    const idealFormation = (idealDeck?.formation || "").toString().trim();

    if (currentFormation.replace(/\s+/g, '') !== idealFormation.replace(/\s+/g, '')) {
        feedbackList.push(`진형 교정: [${currentFormation}] ➔ <strong>[${idealFormation}]</strong> (해당 메타의 핵심 시너지 포지셔닝을 위해 변경을 권장합니다.)`);
    }

    let trulyMissingMetaOfficers = idealDeck.officers.filter(mo => !currentCleanNames.includes(mo.name.replace(/\s+/g, '')));

    if (Array.isArray(deck?.officers)) {
        deck.officers.forEach((off, offIdx) => {
            const hName = (off?.name || "").toString().trim();
            const cleanHName = hName.replace(/\s+/g, '');
            if (!cleanHName) return;

            const isHeroOwned = cleanOwnedHeroes.includes(cleanHName);
            if (!isHeroOwned) {
                feedbackList.push(`자원 경고: [${hName}] 장수가 미보유 상태입니다. (장수 도감 확인 요망)`);
            }

            const metaOfficerIndex = idealDeck.officers.findIndex(mo => mo.name.replace(/\s+/g, '') === cleanHName);

            if (metaOfficerIndex !== -1) {
                const metaOff = idealDeck.officers[metaOfficerIndex];

                // [수정 핵심 반영]: 단순 순서 스왑은 패스하고 전열/후열 열 배치가 꼬인 경우만 저격 체크[cite: 6]
                const currentUserRow = formationPositions[deck.formation]?.[offIdx];
                const idealRow = formationPositions[idealDeck.formation]?.[metaOfficerIndex];

                if (currentUserRow && idealRow && currentUserRow !== idealRow) {
                    const idealRowKo = idealRow === 'front' ? '전열' : '후열';
                    const currentRowKo = currentUserRow === 'front' ? '전열' : '후열';
                    feedbackList.push(`배치 교정: <strong>[${hName}]</strong> 장수는 메타 아키텍처상 <strong>${idealRowKo}</strong> 포지션이어야 하나, 현재 <strong>${currentRowKo}</strong> 슬롯에 가 있습니다. 올바른 열 슬롯으로 배치 이동을 권장합니다.`);
                }

                // 전법 순서 무관 풀 검증 레이어[cite: 6]
                const metaTacsClean = metaOff.chosenTactics.map(t => t.toString().trim().replace(/\s+/g, ''));
                let unmatchedMetaTactics = [...metaOff.chosenTactics];

                if (Array.isArray(off?.chosenTactics)) {
                    off.chosenTactics.forEach(tac => {
                        if (!tac) return;
                        const cleanUserTac = tac.toString().trim().replace(/\s+/g, '');
                        const idx = unmatchedMetaTactics.findIndex(mt => mt.toString().trim().replace(/\s+/g, '') === cleanUserTac);
                        if (idx !== -1) {
                            unmatchedMetaTactics.splice(idx, 1);
                        }
                    });

                    off.chosenTactics.forEach((tac, tacIdx) => {
                        if (!tac) return;
                        const cleanTac = tacticName => tacticName.toString().trim();
                        const currentCleanTac = cleanTac(tac);
                        const cleanUserTac = currentCleanTac.replace(/\s+/g, '');

                        if (!metaTacsClean.includes(cleanUserTac)) {
                            if (unmatchedMetaTactics.length > 0) {
                                const replaceWith = unmatchedMetaTactics.shift();
                                feedbackList.push(`전법 튜닝: [${hName}]의 ${tacIdx + 2}번 슬롯 전법 [${currentCleanTac}] ➔ <strong>[${replaceWith}]</strong> (통계적 최고 승률 전법으로 교체를 권장합니다.)`);
                            }
                        }

                        if (!cleanOwnedTactics.includes(cleanUserTac)) {
                            feedbackList.push(`자원 부족: [${hName}]의 ${tacIdx + 2}번 슬롯 전법 <strong>[${currentCleanTac}]</strong>이 미보유 상태입니다.`);
                        }
                    });
                }
            } else {
                if (trulyMissingMetaOfficers.length > 0) {
                    const replaceWith = trulyMissingMetaOfficers.shift();
                    feedbackList.push(`장수 교체: [${hName}] ➔ <strong>[${replaceWith.name}]</strong> (시너지 극대화를 위한 핵심 코어 장수입니다.)`);
                    feedbackList.push(`전법 세팅: 투입할 <strong>[${replaceWith.name}]</strong>에게 <strong>[${replaceWith.chosenTactics[0]}]</strong>, <strong>[${replaceWith.chosenTactics[1]}]</strong> 장착을 권장합니다.`);
                } else {
                    feedbackList.push(`장수 잉여: [${hName}] 장수는 현재 타겟 메타 시너지에 포함되지 않습니다.`);
                }
            }

            const inherentTactic = officerUniqueTacticMap[hName];
            if (inherentTactic) {
                const cleanInherent = inherentTactic.toString().trim().replace(/\s+/g, '');
                if (!isHeroOwned && !cleanOwnedTactics.includes(cleanInherent)) {
                    feedbackList.push(`고유 전법 누락: [${hName}]의 고유 전법 <strong>[${inherentTactic.toString().trim()}]</strong>이 비활성화 상태입니다.`);
                }
            }
        });
    }

    return feedbackList;
}

// 26종 공식 인연 효과 데이터 세트 판독기[cite: 6]
export function calculateActivatedBond(officers) {
    if (!Array.isArray(officers)) return "활성화된 부대 인연 효과 없음";
    const currentOfficerNames = officers.map(o => (o && o.name) ? o.name.toString().trim() : "");
    let matchedBonds = [];

    bondRules.forEach(rule => {
        const uniqueMatches = [...new Set(currentOfficerNames.filter(name => rule.heroes.includes(name)))];
        const totalMatches = currentOfficerNames.filter(name => rule.heroes.includes(name)).length;
        
        if (totalMatches >= rule.req && uniqueMatches.length >= (rule.req === 3 ? 2 : 1)) {
            matchedBonds.push(`<strong>[${rule.name}]</strong> ${rule.effect}`);
        }
    });

    return matchedBonds.length > 0 ? matchedBonds.join(" / ") : "활성화된 부대 인연 효과 없음";
}

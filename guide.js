// 카테고리별 마스터 데이터베이스 (텍스트 및 이미지 데이터 구조화)
const guideDatabase = {
    equip: {
        title: "장비 시스템",
        sections: [
            {
                title: "● 장비 제작",
                content: `<ul>
                    <li>주조소에서 상의, 포복, 장신구 3종의 평품 장비를 직접 제작할 수 있습니다.</li>
                    <li>평품 장비는 제작 완료 시 한 가지 기본 속성이 부여됩니다. (두관: 모략 / 포복: 통솔 / 장신구: 무용)</li>
                    <li>장비 제작 시, 두 번째 기본 속성 유형을 직접 선택할 수 있으며, 이는 장비를 파란 등급으로 올리면 자동 획득됩니다.</li>
                    <li>장비 제작에는 재료가 필요하며, 연무장 상점 구매, 군연 획득, 동맹 연무 보상으로 얻을 수 있습니다.</li>
                </ul>`
            },
            {
                title: "● 장비 강화 및 승급",
                content: `<ul>
                    <li>장비의 레벨과 등급을 올리면 속성이 상승하며, 일정 등급 도달 시 추가 속성을 획득합니다 (보라 등급: 추가 속성 1개 / 주황 등급: 추가 속성 1개 더 획득).</li>
                    <li>장비 등급이 높을수록 공예 점수가 오르며, 가방 내 최고 36개 장비의 공예 점수 합계와 관청 레벨이 충족되어야 등급 상승이 가능합니다.</li>
                    <li>관청 12레벨(양품), 16레벨(진품), 24레벨(명품) 조건이 존재합니다.</li>
                </ul>`
            },
            {
                title: "● 장비 세련 및 재주조, 분해",
                content: `<ul>
                    <li><strong>세련:</strong> 장비의 추가 속성 값을 재추첨합니다. 매회 1개 속성만 세련 가능하며, 보라 등급 이하 장비는 세련할 수 없습니다. 동일 속성 세련 횟수가 많을수록 높은 수치 획득 확률이 상승합니다.</li>
                    <li><strong>재주조:</strong> 장비의 추가 속성 유형을 재추첨합니다. 추첨된 유형은 기존과 반드시 다르게 배정되며, 수치 값(단계)은 그대로 유지됩니다.</li>
                    <li><strong>분해:</strong> 파란 등급 이하는 제작/승급 재료 100% 환급, 파란 등급 초과분은 재료의 90%가 환급됩니다.</li>
                </ul>`
            },
            {
                title: "● 부위별 핵심 추가 속성 (진품/어품 수치)",
                content: `<ul>
                    <li><strong>투구:</strong> 피해 감소(1~3.75%), 무용/모략 피해 감소(1.66~6.25%), 연격률(2.3~8.65%), 병종별(창/궁/방패/기병) 피해 가함 등 어품 전용 속성 존재.</li>
                    <li><strong>갑옷:</strong> 피해 가함(1~3.75%), 무용/모략 피해 가함(1.2~4.5%), 배반/강공, 연격률(2.3~8.65%), 병종별 피해 감소 등 어품 전용 속성 존재.</li>
                    <li><strong>장신구:</strong> 피해 가함/감소, 공심/기습 상승, 연격률, 병종별 피해 감소 어품 전용 속성.</li>
                </ul>`
            },
            {
                title: "● 부위별 기본 종류 (양품 향상 시 획득)",
                content: `<ul>
                    <li><strong>투구:</strong> 호분관(무용), 진현관(모략), 연함규(통솔), 백옥잠(속도)</li>
                    <li><strong>갑옷:</strong> 명광갑(무용), 명재복(모략), 청등갑(통솔), 세린갑(속도)</li>
                    <li><strong>장신구:</strong> 치룡패(무용), 박산로(모략), 사남패(통솔), 쌍호뉴(속도)</li>
                </ul>`
            }
        ]
    },
    hawk: {
        title: "매 시스템 (전투매)",
        sections: [
            {
                title: "● 매 획득 및 개요",
                content: `<ul>
                    <li>매 알을 사용하여 획득하며, 훈련 시 기본/랜덤 속성 및 스킬을 획득합니다.</li>
                    <li>기본 속성(N, R, SR, SSR, UR), 스킬(N, R, SR, SSR), 랜덤 속성(R, SR, SSR)의 품질이 존재합니다.</li>
                    <li>부대 내 모든 무장의 진영과 병종이 완벽히 일치해야만 매가 전투에서 효과를 발휘합니다.</li>
                </ul>`
            },
            {
                title: "● 육성, 방생 및 반박",
                content: `<ul>
                    <li>매 레벨 및 스킬 레벨(10레벨마다 돌파)을 올릴 수 있으며, 20/30/40레벨 도달 시 모든 랜덤 속성이 1단계씩 상승합니다.</li>
                    <li><strong>방생:</strong> 매의 혼 100개 획득 및 소모 재료(호각, 팔보호대) 70% 환환.</li>
                    <li><strong>반박:</strong> 매 박옥 1개 소모. 본체는 유지되나 레벨이 1로 초기화되며 재료 70% 반환.</li>
                </ul>`
            },
            {
                title: "● 매 스킬 효과 종류",
                content: `<ul>
                    <li><strong>능소 (전우/진시):</strong> 지휘/패시브 효과. 아군이 받는 피해 감소.</li>
                    <li><strong>삭풍 (설조/성모):</strong> 물리/모략 계열. 아군이 적군에게 무용(설조) 또는 모략(성모) 피해를 입힘.</li>
                    <li><strong>열공 (여천/전광):</strong> 지휘/패시브 효과. 아군 모략(여천) 또는 무용(전광) 증가.</li>
                    <li><strong>결운 (호생/감로):</strong> 회복/유틸 계열. 병력 회복(호생) 또는 각성 시전 및 치유 부여(감로).</li>
                </ul>`
            }
        ]
    },
    officer: {
        title: "무장 시스템 개요",
        sections: [
            {
                title: "● 무장 및 도감, 병종 개요",
                content: `<ul>
                    <li>무장 일러스트 선택 시 상세 화면으로 이동하여 승성, 전법 승급/교체, 레벨 초기화 및 알림 설정이 가능합니다.</li>
                    <li>각 무장은 기본적으로 2개의 병종에 적합하며, 대응하는 2종의 병서를 갖습니다. 병서 탭에서 자유롭게 전환 및 양성이 가능합니다.</li>
                </ul>`
            },
            {
                title: "● 시너지 증폭 개요 (병종 / 진영)",
                content: `<ul>
                    <li><strong>병종 증폭:</strong> 동일 병종 무장 2명 시 공/방 증폭 +7.5%, 3명 시 +15.0%</li>
                    <li><strong>진영 증폭:</strong> 동일 진영 무장 2명 시 공/방 증폭 +7.5%, 3명 시 +15.0%</li>
                </ul>`
            },
            {
                title: "● 초월 무장 및 성급 승급 효과",
                content: `<ul>
                    <li><strong>초월 무장:</strong> 무장/전법이 최대 성급일 때 증표를 소모해 모집하며, 무용/모략/통솔 각 +50 속성 보너스가 적용됩니다. 중복 획득 시 무장 증표로 변환됩니다.</li>
                    <li><strong>성급 승급:</strong> 1성부터 5성까지 승급할 때마다 공통적으로 [속성 포인트 +30, 최종 추가 피해 +2%, 받는 피해 감소 +2%, 치유 효과 +2%] 효과가 중첩 누적됩니다.</li>
                </ul>`
            }
        ]
    },
    status: {
        title: "속성 및 상태 이상 명세",
        tables: [
            {
                tableTitle: "전투 속성 설명",
                badgeClass: "badge-attr",
                rows: [
                    { name: "무용", desc: "무장이 전투에서 가하는 무용 피해와 받는 무용 피해에 영향을 미칩니다." },
                    { name: "모략", desc: "무장이 전투에서 가하는 모략 피해와 받는 모략 피해에 영향을 미칩니다." },
                    { name: "통솔", desc: "무장이 전투에서 받는 무용 피해와 모략 피해에 영향을 미칩니다." },
                    { name: "속도", desc: "전투 중 매 턴의 행동 순서에 영향을 미칩니다." },
                    { name: "배반", desc: "무용 피해를 가할 때, 피해량에 비례해 자신의 병력을 회복합니다." },
                    { name: "공심", desc: "모략 피해를 가할 때, 피해량에 비례해 자신의 병력을 회복합니다." },
                    { name: "강공 / 기습", desc: "무용(강공) 또는 모략(기습) 피해 가할 시 일정 확률로 피해량이 50% 증가합니다." },
                    { name: "연격률", desc: "정상적인 일반 공격 이후, 일정 확률로 추가 1회 일반 공격을 발동합니다." },
                    { name: "반격률", desc: "일반 공격을 받은 뒤, 일정 확률로 공격자에게 1회 반격합니다." },
                    { name: "파갑 / 간파", desc: "무용(파갑) 또는 모략(간파) 피해 가할 시 대상 통솔의 일정 비율을 무시합니다." }
                ]
            },
            {
                tableTitle: "제어 상태 (치명적 디버프)",
                badgeClass: "badge-control",
                rows: [
                    { name: "무장해제", desc: "디버프 및 제어 상태. 일반 공격 불가." },
                    { name: "겁전", desc: "디버프 및 제어 상태. 능동 전법 발동 불가." },
                    { name: "공황", desc: "디버프 및 제어 상태. 능동 전법 및 일반 공격 발동 불가." },
                    { name: "도발", desc: "디버프 및 제어 상태. 도발 시전자를 일반 공격의 강제 대상으로 지정." },
                    { name: "혼란", desc: "디버프 및 제어 상태. 공격 및 전법이 무차별적으로 대상을 무작위 선택." },
                    { name: "멸시", desc: "디버프 및 제어 상태. 보유자의 피격률을 90% 감소시켜 아군 보호를 뚫게 만듦." },
                    { name: "피곤", desc: "디버프 및 제어 상태. 패시브 전법 발동 불가 (이미 발동된 효과는 유지)." }
                ]
            },
            {
                tableTitle: "기능 상태 (버프 / 디버프)",
                badgeClass: "badge-buff", 
                rows: [
                    { name: "무기력 / 허약", type: "디버프", desc: "무기력: 가하는 피해 10% 감소 / 허약: 받는 피해 10% 증가." },
                    { name: "보급 차단 / 둔화", type: "디버프", desc: "보급 차단: 받는 치유 효과 50% 감소 / 둔화: 속도 10% 감소." },
                    { name: "출혈 / 화상", type: "디버프", desc: "행동 시작 시 각각 추가 무용(출혈) 또는 모략(화상) 피해를 지속적으로 받음." },
                    { name: "용맹 / 다모 / 통어 / 신속", type: "버프", desc: "각각 무용 / 모략 / 통솔 / 속도를 10% 상승시킵니다." },
                    { name: "정비 / 불굴", type: "버프", desc: "정비: 행동 시작 시 병력 회복 / 불굴: 피해를 입은 후 병력 회복." },
                    { name: "통찰", type: "버프", desc: "제어 상태를 일시적으로 완전히 무효화합니다." },
                    { name: "저항 / 숙살", type: "버프/디버프", desc: "저항: 받는 피해 90% 감소(최대 2중첩) / 숙살: 최종 피해 70% 감소." },
                    { name: "축세", type: "버프", desc: "중첩 소모 시 무장해제, 공황을 무시하고 추가 일반 공격 강제 집행." },
                    { name: "각성 / 면역", type: "버프", desc: "각성: 다음 제어 효과 1회 저항 / 면역: 다음 디버프 효과 1회 저항 (최대 2중첩)." }
                ]
            }
        ]
    }
};

window.onload = function() {
    renderGuideContent('equip');
};

function switchGuideTab(categoryKey, btnElement) {
    document.querySelectorAll('.guide-tab-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    renderGuideContent(categoryKey);
}

function renderGuideContent(categoryKey) {
    const container = document.getElementById('guide-content-box');
    const data = guideDatabase[categoryKey];
    if (!data) return;

    let htmlBuilder = `<h2 class="guide-section-title">${data.title}</h2>`;

    if (data.sections) {
        data.sections.forEach(sec => {
            htmlBuilder += `
                <div class="info-card">
                    <h3>${sec.title}</h3>
                    ${sec.content}
                </div>
            `;
        });
    }

    if (data.tables) {
        data.tables.forEach(tbl => {
            let trs = '';
            tbl.rows.forEach(r => {
                const typeBadge = r.type === "디버프" ? "badge-debuff" : tbl.badgeClass;
                trs += `
                    <tr>
                        <td style="width: 25%; font-weight: bold;">
                            <span class="badge ${typeBadge}">${r.name}</span>
                        </td>
                        <td>${r.desc}</td>
                    </tr>
                `;
            });

            htmlBuilder += `
                <div class="data-table-wrapper">
                    <h3>${tbl.tableTitle}</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>명칭</th>
                                <th>효과 및 상세 설명</th>
                            </tr>
                        </thead>
                        <tbody>${trs}</tbody>
                    </table>
                </div>
            `;
        });
    }

    container.innerHTML = htmlBuilder;
}

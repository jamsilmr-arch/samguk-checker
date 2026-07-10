(function() {
    // 구조 무관형 글로벌 내비게이션 바 동적 도킹 인젝션 엔진
    function injectGlobalNavbarEngine() {
        // 이중 주입 및 렌더링 중복 충돌 차단 방어선
        if (document.getElementById('dynamic-global-nav-bar')) return;

        // 마스터 메뉴 데이터 세트
        const globalMenuItems = [
            { name: "나의 장수/전법", url: "index.html" },
            { name: "덱 구성", url: "deck.html" },
            { name: "장수 도감", url: "dogam.html" },
            { name: "전법 도감", url: "tactic_dogam.html" },
            { name: "시스템 가이드", url: "guide.html" }
        ];

        // 브라우저 런타임 현재 파일 명칭 정밀 추출 파서
        const locationPath = window.location.pathname;
        let currentFile = locationPath.split('/').pop().split('?')[0].split('#')[0];
        
        if (!currentFile || currentFile === "") {
            currentFile = "index.html"; // 루트 경로 진입 시 기본값 매핑
        }
        
        // 내비게이션 DOM 노드 동적 생성 및 레이아웃 순위 고정
        const navContainer = document.createElement('nav');
        navContainer.id = 'dynamic-global-nav-bar';
        navContainer.className = 'global-nav-bar';
        navContainer.style.position = 'relative';
        navContainer.style.zIndex = '9999'; 

        const menuUl = document.createElement('ul');
        menuUl.className = 'nav-menu-list';

        globalMenuItems.forEach(item => {
            const menuLi = document.createElement('li');
            menuLi.className = 'nav-menu-item';
            
            if (currentFile.trim() === item.url.trim()) {
                menuLi.classList.add('active');
            }

            const anchorLink = document.createElement('a');
            anchorLink.href = item.url;
            anchorLink.innerText = item.name;
            
            menuLi.appendChild(anchorLink);
            menuUl.appendChild(menuLi);
        });
        navContainer.appendChild(menuUl);

        // [3중 폴백 가드 필터]: 페이지 구조 분석 및 자동 위치 판독 도킹 실행
        const standardTarget = document.querySelector('.top-title-header') || 
                               document.querySelector('header') || 
                               document.querySelector('.header') || 
                               document.querySelector('.top-bar');

        if (standardTarget) {
            // 1단계: 정식 규격 헤더나 클래스 배너 뒤에 주입
            standardTarget.after(navContainer);
        } else if (document.body && document.body.firstElementChild) {
            // 2단계: 클래스명이 없는 일반 div 타이틀 배너인 경우 그 바로 밑에 노드 삽입
            document.body.firstElementChild.after(navContainer);
        } else if (document.body) {
            // 3단계: 최악의 경우 body 최상단에 강제 우선 주입
            document.body.prepend(navContainer);
        }
    }

    // 돔 파싱 주기 방어선
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    } else {
        injectGlobalNavbarEngine();
    }
})();

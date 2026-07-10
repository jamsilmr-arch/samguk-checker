(function() {
    // 공통 글로벌 내비게이션 바 동적 주입 코어 엔진
    function injectGlobalNavbarEngine() {
        // 모든 페이지의 공통 분모인 상단 헤더 엘리먼트 추적
        const topHeader = document.querySelector('.top-title-header') || document.querySelector('header');
        if (!topHeader) return;

        // 중복 인젝션 방어선 구축
        if (document.getElementById('dynamic-global-nav-bar')) return;

        // 실시간 연동 메뉴 마스터 데이터베이스 (메뉴 추가/변경 시 여기만 수정하면 완료)
        const globalMenuItems = [
            { name: "나의 장수/전법", url: "index.html" },
            { name: "덱 구성", url: "deck.html" },
            { name: "장수 도감", url: "dogam.html" },
            { name: "전법 도감", url: "tactic_dogam.html" },
            { name: "시스템 가이드", url: "guide.html" }
        ];

        // 현재 웹 브라우저가 위치한 파일 경로 락온
        const currentPathname = window.location.pathname;
        
        // 내비게이션 돔 트리 동적 생성
        const navContainer = document.createElement('nav');
        navContainer.id = 'dynamic-global-nav-bar';
        navContainer.className = 'global-nav-bar';

        const menuUl = document.createElement('ul');
        menuUl.className = 'nav-menu-list';

        globalMenuItems.forEach(item => {
            const menuLi = document.createElement('li');
            menuLi.className = 'nav-menu-item';
            
            // 핵심 정형화 로직: 현재 URL 주소값을 분석하여 해당하는 탭에 활성화 스타일 동적 할당
            const isMatch = currentPathname.endsWith(item.url) || 
                            (currentPathname === '/' && item.url === 'index.html') ||
                            (currentPathname.substring(currentPathname.lastIndexOf('/') + 1) === item.url);
            
            if (isMatch) {
                menuLi.classList.add('active');
            }

            const anchorLink = document.createElement('a');
            anchorLink.href = item.url;
            anchorLink.innerText = item.name;
            
            menuLi.appendChild(anchorLink);
            menuUl.appendChild(menuLi);
        });

        navContainer.appendChild(menuUl);
        
        // 헤더 컴포넌트 바로 밑 칸에 레이아웃 파괴 없이 기하학적 정밀 도킹
        topHeader.after(navContainer);
    }

    // 브라우저 파싱 주기 상태에 따른 예외 차단형 실행 밸브
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    } else {
        injectGlobalNavbarEngine();
    }
})();

(function() {
    // 글로벌 내비게이션 바 동적 주입 및 주소 추적 고도화 코어 엔진
    function injectGlobalNavbarEngine() {
        const topHeader = document.querySelector('.top-title-header') || document.querySelector('header');
        if (!topHeader) return;

        if (document.getElementById('dynamic-global-nav-bar')) return;

        // 글로벌 메뉴 세팅 데이터 마스터 사주
        const globalMenuItems = [
            { name: "나의 장수/전법", url: "index.html" },
            { name: "덱 구성", url: "deck.html" },
            { name: "장수 도감", url: "dogam.html" },
            { name: "전법 도감", url: "tactic_dogam.html" },
            { name: "시스템 가이드", url: "guide.html" }
        ];

        // 핵심 로직 개정: 로컬 환경(file://) 및 파라미터 난입 환경에서도 순수 파일명만 정확히 발라내는 정제 파서
        const locationPath = window.location.pathname;
        let currentFile = locationPath.split('/').pop().split('?')[0].split('#')[0];
        
        // 메인 루트 진입 시 기본 예외 폴백 매칭
        if (!currentFile || currentFile === "") {
            currentFile = "index.html";
        }
        
        const navContainer = document.createElement('nav');
        navContainer.id = 'dynamic-global-nav-bar';
        navContainer.className = 'global-nav-bar';
        navContainer.style.position = 'relative';
        navContainer.style.zIndex = '9999'; // 레이어 가림 현상 원천 방어

        const menuUl = document.createElement('ul');
        menuUl.className = 'nav-menu-list';

        globalMenuItems.forEach(item => {
            const menuLi = document.createElement('li');
            menuLi.className = 'nav-menu-item';
            
            // 공백 및 오차를 소거한 순수 텍스트 정형화 매칭 대조
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
        topHeader.after(navContainer);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    } else {
        injectGlobalNavbarEngine();
    }
})();

(function() {
    // 글로벌 네비게이션 스타일 동적 주입 및 스크롤바 강제 소거
    if (!document.getElementById('dynamic-navbar-styles')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'dynamic-navbar-styles';
        styleTag.textContent = `
            .global-nav-bar {
                background-color: #2b1a1a;
                border-bottom: 2px solid #cd9b33;
                display: flex;
                justify-content: flex-end;
                padding: 0 30px;
                overflow: hidden; /* 스크롤바 및 스크롤 기능 흔적 기능 완전 차단 */
                position: relative;
                z-index: 9999;
            }
            .nav-menu-list { display: flex; list-style: none; margin: 0; padding: 0; }
            .nav-menu-item a { display: block; color: #bbbbbb; text-decoration: none; padding: 14px 20px; font-size: 13px; font-weight: bold; white-space: nowrap; }
            .nav-menu-item:hover a { color: #ffffff; }
            .nav-menu-item.active { background-color: #1c1111; border-bottom: 3px solid #cd9b33; margin-bottom: -2px; }
            .nav-menu-item.active a { color: #ffcc00; }
        `;
        document.head.appendChild(styleTag);
    }

    function injectGlobalNavbarEngine() {
        if (document.getElementById('dynamic-global-nav-bar')) return;

        const globalMenuItems = [
            { name: "나의 장수/전법", url: "index.html" },
            { name: "덱 구성", url: "deck.html" },
            { name: "장수 도감", url: "dogam.html" },
            { name: "전법 도감", url: "tactic_dogam.html" },
            { name: "시스템 가이드", url: "guide.html" }
        ];

        const locationPath = window.location.pathname;
        let currentFile = locationPath.split('/').pop().split('?')[0].split('#')[0];
        
        if (!currentFile || currentFile === "") {
            currentFile = "index.html";
        }
        
        const navContainer = document.createElement('nav');
        navContainer.id = 'dynamic-global-nav-bar';
        navContainer.className = 'global-nav-bar';

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

        const standardTarget = document.querySelector('.top-title-header') || document.querySelector('header');
        if (standardTarget) {
            standardTarget.after(navContainer);
        } else {
            document.body.prepend(navContainer);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectGlobalNavbarEngine);
    } else {
        injectGlobalNavbarEngine();
    }
})();

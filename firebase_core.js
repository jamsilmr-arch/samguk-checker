// [시스템 분석] firebase_core.js - 양방향 스마트 동기화 및 실시간 상태 감지 엔진
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMJ96D8OBfivUXFs-jJhjt7DxlPTBrThs",
    authDomain: "samguk-checker.firebaseapp.com",
    databaseURL: "https://samguk-checker-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "samguk-checker",
    storageBucket: "samguk-checker.firebasestorage.app",
    messagingSenderId: "653002634547",
    appId: "1:653002634547:web:242c1bbb4c169b3fa6fa46",
    measurementId: "G-6TVYWWVSMK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 동기화 버튼 실시간 UI 렌더링 함수
function updateSyncButtonUI(user) {
    const btn = document.getElementById('global-google-sync-btn');
    if (!btn) return;
    
    if (user) {
        // 로그인 상태 (ON)
        btn.innerHTML = `☁️ 동기화 ON (${user.email.split('@')[0]})`;
        btn.style.background = "#10b981"; // 에메랄드 그린
        btn.style.color = "#ffffff";
    } else {
        // 비로그인 상태 (OFF)
        btn.innerHTML = `☁️ 구글 계정 동기화 (OFF)`;
        btn.style.background = "#f97316"; // 오렌지
        btn.style.color = "#ffffff";
    }
}

// 로그인 상태 실시간 감지 리스너 부착
onAuthStateChanged(auth, (user) => {
    updateSyncButtonUI(user);
});

window.handleGoogleSync = async () => {
    const btn = document.getElementById('global-google-sync-btn');
    const originalText = btn.innerText;
    btn.innerText = "⏳ 통신 중...";

    try {
        // 1. 로그인 세션 확인 및 팝업 유도
        let user = auth.currentUser;
        if (!user) {
            const result = await signInWithPopup(auth, provider);
            user = result.user;
        }

        // 2. 클라우드 데이터 조회 (가져오기 목적)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const cloudData = docSnap.exists() ? docSnap.data() : null;

        // 3. 현재 로컬 기기 데이터 조회
        if (window.saveDataToLocalStorage) window.saveDataToLocalStorage();
        const localHobby = localStorage.getItem('samguk_hobby_data');
        const localDeck = localStorage.getItem('samguk_deck_text');
        const hasLocalData = (localHobby && localHobby.length > 10) || (localDeck && localDeck.length > 10);

        // 4. 양방향 스마트 동기화 분기 처리
        let action = 'push'; // 기본값: 클라우드로 업로드

        if (!cloudData && !hasLocalData) {
            throw new Error("동기화할 로컬 데이터가 없고 클라우드에도 백업된 데이터가 없습니다.");
        } else if (cloudData && !hasLocalData) {
            // 기기 데이터는 없고 클라우드에만 있는 경우 (시크릿 창 등) -> 무조건 다운로드
            action = 'pull';
        } else if (cloudData && hasLocalData) {
            // 기기와 클라우드 양쪽에 데이터가 존재하는 경우 -> 유저에게 덮어쓰기 방향 질문
            const cloudTime = new Date(cloudData.lastUpdated).toLocaleString();
            const confirmMessage = `클라우드에 저장된 백업 데이터가 존재합니다.\n(마지막 백업: ${cloudTime})\n\n[확인] : 클라우드 데이터를 기기로 불러옵니다. (현재 화면 초기화)\n[취소] : 현재 기기의 상태로 클라우드를 덮어씁니다.`;
            
            if (confirm(confirmMessage)) {
                action = 'pull';
            } else {
                action = 'push';
            }
        }

        // 5. 확정된 액션(Pull / Push) 실행
        if (action === 'pull') {
            if (cloudData.hobbyData) localStorage.setItem('samguk_hobby_data', JSON.stringify(cloudData.hobbyData));
            if (cloudData.deckText) localStorage.setItem('samguk_deck_text', JSON.stringify(cloudData.deckText));
            alert("☁️ 클라우드 데이터를 성공적으로 불러왔습니다. 시스템을 리로드합니다.");
            location.reload(); // 데이터 갱신을 위한 강제 새로고침
        } else if (action === 'push') {
            const syncData = {
                hobbyData: localHobby ? JSON.parse(localHobby) : null,
                deckText: localDeck ? JSON.parse(localDeck) : null,
                lastUpdated: new Date().toISOString(),
                userEmail: user.email
            };
            await setDoc(docRef, syncData);
            alert(`☁️ [${user.email}] 계정에 현재 데이터가 완벽히 백업되었습니다.`);
        }
    } catch (error) {
        alert("❌ 동기화 실패 또는 취소: " + error.message);
    } finally {
        // 통신 종료 후 UI 상태 원복
        updateSyncButtonUI(auth.currentUser);
    }
};

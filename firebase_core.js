// [시스템 분석] firebase_core.js - 중앙 집중형 클라우드 동기화 및 구글 인증 마스터 모듈
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

window.handleGoogleSync = async () => {
    // 1. 현재 화면 데이터 로컬 스토리지 최신화 (해당 함수가 존재하는 페이지 한정)
    if (window.saveDataToLocalStorage) window.saveDataToLocalStorage();
    
    const hobbyData = localStorage.getItem('samguk_hobby_data');
    const deckText = localStorage.getItem('samguk_deck_text');

    if (!hobbyData && !deckText) {
        throw new Error("동기화할 로컬 데이터가 없습니다. 먼저 장수/전법이나 부대를 세팅해 주세요.");
    }

    // 2. 구글 인증 세션 확인 및 팝업
    let user = auth.currentUser;
    if (!user) {
        try {
            const result = await signInWithPopup(auth, provider);
            user = result.user;
        } catch (error) {
            throw new Error("구글 로그인이 취소되었거나 팝업이 차단되었습니다.");
        }
    }

    // 3. 데이터 패키징
    const syncData = {
        hobbyData: hobbyData ? JSON.parse(hobbyData) : null,
        deckText: deckText ? JSON.parse(deckText) : null,
        lastUpdated: new Date().toISOString(),
        userEmail: user.email
    };

    // 4. 유저 고유 UID 폴더에 덮어쓰기
    await setDoc(doc(db, "users", user.uid), syncData);
    alert(`☁️ [${user.email}] 계정에 동기화 완료!\n데이터가 안전하게 서버에 저장되었습니다.`);
};

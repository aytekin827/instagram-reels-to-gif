// content.js

// 페이지에서 비디오 URL을 찾는 함수
function getReelsVideoUrl() {
    let videoElement = document.querySelector("video");
    return videoElement ? videoElement.src : null;
}

// 백그라운드 스크립트와 통신하여 URL 전송
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getReelsVideoUrl") {
        let videoUrl = getReelsVideoUrl();
        sendResponse({ videoUrl: videoUrl });
    }
});

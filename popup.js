document.getElementById("convertBtn").addEventListener("click", async () => {
    document.getElementById("status").innerText = "loading reels...";
    
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getReelsVideoUrl
        }, (results) => {
            if (results && results[0] && results[0].result) {
                let videoUrl = results[0].result;
                document.getElementById("status").innerText = "converting to GIF...";
                
                // 백그라운드 스크립트에서 다운로드 실행
                chrome.runtime.sendMessage({ action: "convertToGIF", videoUrl: videoUrl });
            } else {
                document.getElementById("status").innerText = "can't find reels video";
            }
        });
    });
});

// 인스타그램 릴스 비디오 URL 가져오는 함수
function getReelsVideoUrl() {
    let videoElement = document.querySelector("video");
    return videoElement ? videoElement.src : null;
}

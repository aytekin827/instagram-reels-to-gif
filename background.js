chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "convertToGIF") {
        let videoUrl = message.videoUrl;

        if (!videoUrl) {
            console.error("릴스 URL을 찾을 수 없습니다.");
            return;
        }

        // FFmpeg.js로 GIF 변환
        const ffmpeg = await import('./ffmpeg.min.js');
        await ffmpeg.load();

        const response = await fetch(videoUrl);
        const videoBlob = await response.blob();
        const inputFile = new File([videoBlob], "input.mp4", { type: "video/mp4" });

        await ffmpeg.FS('writeFile', 'input.mp4', new Uint8Array(await inputFile.arrayBuffer()));
        await ffmpeg.run('-i', 'input.mp4', '-vf', 'fps=10,scale=320:-1', 'output.gif');

        const data = await ffmpeg.FS('readFile', 'output.gif');
        const gifBlob = new Blob([data.buffer], { type: 'image/gif' });

        const gifUrl = URL.createObjectURL(gifBlob);
        chrome.downloads.download({ url: gifUrl, filename: "reels.gif" });

        console.log("GIF 변환 완료! 다운로드 시작");
    }
});

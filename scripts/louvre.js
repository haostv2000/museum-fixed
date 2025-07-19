const video = document.getElementById("videoPlayer");
const progressBar = document.getElementById("progressBar");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseBtnSmall = document.getElementById("playPauseBtnSmall");
const thumb = document.getElementById("thumb");

const allVideos = document.querySelectorAll("video, iframe");

let isPlayed = true;

function stopAllVideos() {
  allVideos.forEach((vid) => {
    if (vid.tagName === "video") {
      vid.pause(); 
    } else if (vid.tagName === "iframe" && vid.src.includes("youtube.com")) {
      const iframeWindow = vid.contentWindow;
      iframeWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  });
}


playPauseBtn.addEventListener("click", () => {
  playPauseBtn.style.display = "none";
  if (video.paused) {
    stopAllVideos(); 
    video.play();
    playPauseBtnSmall.src = "./assets/images/svg/pause-btn.svg"; 
  } else {
    video.pause();
    playPauseBtnSmall.src = "./assets/images/svg/video-play-small-btn.svg"; 
  }                                  
});


playPauseBtnSmall.addEventListener("click", () => {
  playPauseBtn.style.display = "none";
  if (video.paused) {
    stopAllVideos();
    video.play();
    playPauseBtnSmall.src = "./assets/images/svg/pause-btn.svg"; 
  } else {
    video.pause();
    playPauseBtnSmall.src = "./assets/images/svg/video-play-small-btn.svg"; 
  }                   
});


video.addEventListener("timeupdate", () => {
  const duration = video.duration;
  const currentTime = video.currentTime;
  const progressWidth = progressBar.offsetWidth;

  const percentage = currentTime / duration;
  const thumbLeft = percentage * progressWidth;

  thumb.style.left = `${thumbLeft}px`;
  progressFill.style.width = `${thumbLeft}px`;
});


const youtubeVideos = document.querySelectorAll('iframe');
youtubeVideos.forEach((iframe) => {
  iframe.addEventListener('click', function() {
    stopAllVideos(); 
    const iframeWindow = iframe.contentWindow;
    iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*'); 
  });
});




const container = document.getElementById('sliderContainer');
const handle = document.getElementById('sliderHandle');
const lightImage = document.getElementById('lightImage');

let isDragging = false;

handle.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const rect = container.getBoundingClientRect();
  const handleWidth = handle.offsetWidth;
  let offsetX = e.clientX - rect.left;

  const minX = 0;
  const maxX = rect.width;

  offsetX = Math.max(minX, Math.min(offsetX, maxX));

  lightImage.style.width = `${offsetX}px`;

 
  let handleLeft = offsetX - handleWidth / 2;

  handleLeft = Math.max(-20, Math.min(handleLeft, rect.width - handleWidth + 20));
  handle.style.left = `${handleLeft}px`;
});







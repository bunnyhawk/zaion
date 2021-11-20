

(function () {
  const videoList = [
    'feel_good_lost.mp4',
    'ukoo.mp4'
  ];
  const sections = document.querySelectorAll('section');
  const loginBg = document.querySelector('.section-login');

  const resetSections = () => sections.forEach((section) => {
    section.addEventListener('click', event => { event.stopPropagation() }, false);
    section.classList.add('hidden');
  });

  resetSections();

  document.querySelector('.wrapper').addEventListener("click", event => { resetSections() }, false);
  loginBg.addEventListener("click", event => { resetSections() }, false);
  loginBg.addEventListener("click", event => { resetSections() }, false);
  document.getElementById('guestbook-close').addEventListener("click", event => { resetSections() }, false);
  document.querySelector('.submit-form').addEventListener("click", event => { event.stopPropagation() }, false);

  document.querySelectorAll('[data-section]').forEach((link) => {
    link.addEventListener('click', event => {
      event.stopPropagation();
      const sectionContainer = document.querySelector(`.${link.dataset.section}`);
      resetSections();
      sectionContainer.classList.toggle('hidden');
    }, false);
  });

  const pauseVideo = document.getElementById('video-pause');
  const playVideo = document.getElementById('video-play');
  const muteVideo = document.getElementById('video-mute');
  const video = document.getElementById('video');
  const source = document.createElement('source');
  let currentVideo = 0;

  source.setAttribute('src', `videos/${videoList[currentVideo]}`);
  source.setAttribute('type', 'video/mp4');

  video.appendChild(source);
  video.muted = true;
  video.play();
  video.addEventListener('ended', () => { changeSource(true) }, false);

  const toggleMute = () => {
    muteVideo.classList.toggle('muted');
    if (video.muted === true) {
      video.muted = false;
    }
    else if (video.muted === false) {
      video.muted = true;
    }
  }

  muteVideo.addEventListener('click', toggleMute);

  const changeSource = (isNext) => {
    const vidListLength = videoList.length - 1;
    if (isNext) {
      currentVideo === vidListLength ? currentVideo = 0 : currentVideo++;
    } else {
      currentVideo === 0 ? currentVideo = vidListLength : currentVideo--;
    }

    video.pause();

    source.setAttribute('src', `videos/${videoList[currentVideo]}`);
    video.muted = true;
    video.load();
    video.play();
    video.addEventListener('ended', () => { changeSource(true) }, false);
  };

  const togglePlayPause = (isPlay) => {
    isPlay ? video.play() : video.pause();
    playVideo.classList.toggle('hidden');
    pauseVideo.classList.toggle('hidden');
  };

  document.getElementById('video-previous').addEventListener('click', changeSource)
  document.getElementById('video-next').addEventListener('click', () => { changeSource(true) }, false);
  pauseVideo.addEventListener('click', () => togglePlayPause());
  playVideo.addEventListener('click', () => { togglePlayPause(true) }, false);
})();

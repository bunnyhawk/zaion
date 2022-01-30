import 'dotenv/config';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

const s3 = new AWS.S3();

const params = {
  Bucket: 'zaion-videos',
  Delimiter: '/',
}
const videoList = [];
s3.listObjects(params, function (err, data) {
  if (err) throw err;
  data.Contents.forEach(video => {
    videoList.push(video.Key)
  })
});

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
// document.getElementById('guestbook-close').addEventListener("click", event => { resetSections() }, false);
document.querySelector('.submit-form').addEventListener("click", event => { event.stopPropagation() }, false);

document.querySelectorAll('[data-section]').forEach((link) => {
  link.addEventListener('click', event => {
    event.stopPropagation();
    const sectionContainer = document.querySelector(`.${link.dataset.section}`);
    resetSections();
    sectionContainer.classList.toggle('hidden');
  }, false);
});

setTimeout(() => {
  const pauseVideo = document.getElementById('video-pause');
  const playVideo = document.getElementById('video-play');
  const muteVideo = document.getElementById('video-mute');
  const video = document.getElementById('video');
  const source = document.createElement('source');
  let currentVideo = 0;

  source.setAttribute('src', `https://zaion-videos.s3.us-west-2.amazonaws.com/${videoList[currentVideo]}`);
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
}, 500);

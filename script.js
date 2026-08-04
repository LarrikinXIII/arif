const parallaxNodes = [...document.querySelectorAll('[data-parallax]')];
let ticking = false;
function updateParallax(){
  const y = window.scrollY;
  parallaxNodes.forEach(node => {
    const speed = Number(node.dataset.parallax || 0);
    node.style.translate = `0 ${y * speed}px`;
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if(!ticking){ requestAnimationFrame(updateParallax); ticking = true; }
}, {passive:true});
updateParallax();

// Dummy Spotify-style data source. DummyJSON stands in for a real Spotify API.
async function loadPlaylist(){
  const list = document.querySelector('#track-list');
  try{
    const response = await fetch('https://dummyjson.com/products/category/mens-watches?limit=5');
    if(!response.ok) throw new Error('API unavailable');
    const data = await response.json();
    const names = ['Dark Intentions','Rave Machine','Acid Nights','Bassline Movement','Underground Flow'];
    document.querySelector('#playlist-title').textContent = 'DJ Mysterioo Arif Essentials';
    document.querySelector('#playlist-subtitle').textContent = 'Dummy API playlist · updated weekly';
    list.innerHTML = data.products.map((item,i) => `<li>${names[i] || item.title}<span>${['5:24','6:02','5:41','6:35','5:09'][i]}</span></li>`).join('');
  }catch(error){
    list.innerHTML = '<li>Dark Intentions <span>5:24</span></li><li>Rave Machine <span>6:02</span></li><li>Acid Nights <span>5:41</span></li>';
  }
}
loadPlaylist();

const playButton = document.querySelector('#play-button');
const progressBar = document.querySelector('#progress-bar');
const currentTime = document.querySelector('#current-time');
let playing = false, elapsed = 0, timer;
function formatTime(seconds){return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`}
playButton.addEventListener('click', () => {
  playing = !playing;
  playButton.textContent = playing ? '❚❚' : '▶';
  clearInterval(timer);
  if(playing){
    timer = setInterval(() => {
      elapsed = (elapsed + 1) % 276;
      currentTime.textContent = formatTime(elapsed);
      progressBar.style.width = `${(elapsed / 275) * 100}%`;
    },1000);
  }
});

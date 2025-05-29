// Your script here.
const speakBtn = document.getElementById(‘speak’);
const stopBtn = document.getElementById(‘stop’);
const voicesDropdown = document.getElementById(‘voices’);
let voices=[];

//load voices
function loadVoices() {
voices = speechSynthesis.getVoices();
voices.forEach(voice => {
const option = document.createElement(‘option’);
option.value = voice.name;
option.textContent = `${voice.name} ${voice.lang}`;
voicesDropdown.appendChild(option);
});
}
//event listener for voice change
window.speechSynthesis.onvoiceschanged = loadVoices;

speakBtn.addEventListener(“click”, () => {
let text = document.querySelector(‘textarea’).value;
if(text) {
const utterance = new SpeechSynthesisUtterance(text);
const selectedVoice = voicesDropdown.value;
utterance.voice = voices.find(voice => voice.name === selectedVoice);
utterance.rate = document.querySelector(‘[name=“rate”]’).value;
utterance.pitch = document.querySelector(‘[name=“pitch”]’).value;
	speechSynthesis.speak(utterance);
}
});
stopBtn.addEventListener(“click”, () => {
window.speechSynthesis.cancel();
});

//initial call to load voices when the page loads
loadVoices();
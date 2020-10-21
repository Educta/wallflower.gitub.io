// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
	{
		name: "Little Do You Know",
		artist: "Alex & Seirra",
		image: "Image URL",
		path: "y2mate.com - Alex & Sierra - Little Do You Know (Audio).mp3",
	},
{
	name: "If the world was ending",
	artist: "JP Saxe, Julia Michaels",
	image: "image URL",
	path: "if-the-world-was-ending-lyrics-ft-julia-michaels.mp3"
},

{
	name: "As long as you love me",
	artist: "Backstreet Boys",
	image: "Image URL",
	path: "y2mate.com - As Long as You Love Me.mp3",
},

{
	name: "Main agar kahoon",
	artist: "Sonu Nigam, Shreya Ghoshal",
	image: "Image URL",
	path: "videoplayback.m4a"
},
{
	name: "Zaalima",
	artist: "Arijit Singh",
	image: "Image URL",
	path: "y2mate.com - Zaalima _ Raees _ Shah Rukh Khan & Mahira Khan _ Arijit Singh & Harshdeep Kaur _ JAM8 _ Pritam",
},
{
	name: "Khairiyat",
	artist: "Arijit Singh",
	image: "Image URL",
	path: "y2mate.com - Full Song_ KHAIRIYAT (BONUS TRACK) _ CHHICHHORE _ Sushant, Shraddha _ Pritam, Amitabh B_Arijit Singh.mp3",
},
{
	name: "Heaven",
	artist: "Julia Michaels",
	image: "Image URL",
	path: "heaven-audio.mp3",
},
{
	name: "Can we kiss forever",
	artist: "Kina",
	image: "Image URL",
	path: "y2mate.com - Kina - Can We Kiss Forever_ (ft. Adriana Proenza).mp3",
},
{
	name: "You & I",
	artist: "PVRIS",
	image: "Image URL",
	path: "y2mate.com - PVRIS - You and I (Audio).mp3",
},

{
	name: "Ghunghroo",
	artist: "Vishal & Shekhar",
	image: "Image URL",
	path: "y2mate.com - Lyrical _ Ghungroo Full Song with Lyrics _ War _ Hrithik Roshan, Vaani _ Vishal & Shekhar _ Kumaar.mp3",
},
	{
	name: "Raabta",
	artist: "Arijit Singh",
	image: "Image URL",
	path: "y2mate.com - Raabta Title Song (Full Video) _ Deepika Padukone, Sushant Singh Rajput, Kriti Sanon _ Pritam.mp3",
},

{
	name: "Thin White Lies",
	artist: "5sos",
	image: "Image URL",
	path: "y2mate.com - 5 Seconds of Summer - Thin White Lies (Official Audio).mp3",
},
{
	name: "This is what you came for",
	artist: "Rihanna, Calvin Harris",
	image: "Image URL",
	path: "y2mate.com - Calvin Harris  - This Is What You Came For Feat. Rihanna (Original Mix).mp3",
},
{
	name: "Saturday Nights Remix",
	artist: "Khalid, Kane Brown",
	image: "Image URL",
	path: "y2mate.com - Khalid & Kane Brown - Saturday Nights REMIX (Official Audio).mp3",
},
{
	name: "Chura Liya Hai tumne",
	artist: "",
	image: "Image URL",
	path: "",
},
{
	name: "In ankhon ki masti",
	artist: "",
	image: "Image URL",
	path: "",
},
{
	name: "Sathiya Tune Kya Kiya",
	artist: "",
	image: "Image URL",
	path: "",
},
{
	name: "American Boy",
	artist: "Little Mix",
	image: "Image URL",
	path: "y2mate.com - Little Mix - American Boy (Official Audio).mp3",
},
{
	name: "Helium",
	artist: "Sia",
	image: "Image URL",
	path: "y2mate.com - Helium.mp3",
},

{
	name: "Call you mine",
	artist: "Bebe Rexha, The Chainsmokers",
	image: "Image URL",
	path: "y2mate.com - The Chainsmokers, Bebe Rexha - Call You Mine (Lyric Video).mp3",
},
];


function loadTrack(track_index) {
// Clear the previous seek timer
clearInterval(updateTimer);
resetValues();

// Load a new track
curr_track.src = track_list[track_index].path;
curr_track.load();

// Update details of the track
track_art.style.backgroundImage =
	"url(" + track_list[track_index].image + ")";
track_name.textContent = track_list[track_index].name;
track_artist.textContent = track_list[track_index].artist;
now_playing.textContent =
	"PLAYING " + (track_index + 1) + " OF " + track_list.length;

// Set an interval of 1000 milliseconds
// for updating the seek slider
updateTimer = setInterval(seekUpdate, 1000);

// Move to the next track if the current finishes playing
// using the 'ended' event
curr_track.addEventListener("ended", nextTrack);

// Apply a random background color
random_bg_color();
}

function random_bg_color() {
// Get a random number between 64 to 256
// (for getting lighter colors)
let red = Math.floor(Math.random() * 256) + 64;
let green = Math.floor(Math.random() * 256) + 64;
let blue = Math.floor(Math.random() * 256) + 64;

// Construct a color withe the given values
let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

// Set the background to the new color
document.body.style.background = bgColor;
}

// Functiom to reset all values to their default
function resetValues() {
curr_time.textContent = "00:00";
total_duration.textContent = "00:00";
seek_slider.value = 0;
}

function playpauseTrack() {
// Switch between playing and pausing
// depending on the current state
if (!isPlaying) playTrack();
else pauseTrack();
}

function playTrack() {
// Play the loaded track
curr_track.play();
isPlaying = true;

// Replace icon with the pause icon
playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
// Pause the loaded track
curr_track.pause();
isPlaying = false;

// Replace icon with the play icon
playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
// Go back to the first track if the
// current one is the last in the track list
if (track_index < track_list.length - 1)
	track_index += 1;
else track_index = 0;

// Load and play the new track
loadTrack(track_index);
playTrack();
}

function prevTrack() {
// Go back to the last track if the
// current one is the first in the track list
if (track_index > 0)
	track_index -= 1;
else track_index = track_list.length;

// Load and play the new track
loadTrack(track_index);
playTrack();
}

function seekTo() {
// Calculate the seek position by the
// percentage of the seek slider
// and get the relative duration to the track
seekto = curr_track.duration * (seek_slider.value / 100);

// Set the current track position to the calculated seek position
curr_track.currentTime = seekto;
}

function setVolume() {
// Set the volume according to the
// percentage of the volume slider set
curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
let seekPosition = 0;

// Check if the current track duration is a legible number
if (!isNaN(curr_track.duration)) {
	seekPosition = curr_track.currentTime * (100 / curr_track.duration);
	seek_slider.value = seekPosition;

	// Calculate the time left and the total duration
	let currentMinutes = Math.floor(curr_track.currentTime / 60);
	let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
	let durationMinutes = Math.floor(curr_track.duration / 60);
	let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

	// Add a zero to the single digit time values
	if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
	if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
	if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
	if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

	// Display the updated duration
	curr_time.textContent = currentMinutes + ":" + currentSeconds;
	total_duration.textContent = durationMinutes + ":" + durationSeconds;
}
}
// Load the first track in the tracklist
loadTrack(track_index);

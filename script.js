const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable Button
const toggleButton = () => button.disabled = !button.disabled;


// Passing joke to VoiceRSS API
const tellMe = joke => {
  VoiceRSS.speech({
    key: '4a3dc24ecbe04b31adc4ab068e055d4e',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}


// Get jokes from Joke API
const getJokes = async () => {
  try {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Pass joke to VoiceRSS API
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    console.log(error, 'There was an error fetching a joke.')
  }
}


// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
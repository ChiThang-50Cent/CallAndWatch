const callFunc = {};

callFunc.openStream = async () => {
  const config = { 
    audio: true, 
    video: true
  };
  let stream = null;
  try{
    stream = await navigator.mediaDevices.getUserMedia(config);
    return stream
  } catch (err) {
    console.log(err)
  } 
};

callFunc.playedStream = (idVideoNode,idAudioNode, stream) => {
  const video = document.getElementById(idVideoNode);
  const audio = document.getElementById(idAudioNode)
  if (video && audio) {
    video.srcObject = stream;
    audio.srcObject = stream;
    let playVideoPromise = video.play();
    let playAudioPromise = audio.play();
    if (playVideoPromise !== undefined) {
      playVideoPromise
        .then((_) => {})
        .catch((err) => {
          console.log(err.message);
        });
    }
    if (playAudioPromise !== undefined) {
      playAudioPromise
        .then((_) => {})
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
};

export default callFunc;

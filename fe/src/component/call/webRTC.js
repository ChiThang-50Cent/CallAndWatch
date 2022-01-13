const callFunc = {};

callFunc.openStream = async () => {
  const config = { 
    audio: false, 
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

callFunc.playedStream = (idVideoNode, stream) => {
  const video = document.getElementById(idVideoNode);
  if (video) {
    video.srcObject = stream;
    let playVideoPromise = video.play();
    if (playVideoPromise !== undefined) {
      playVideoPromise
        .then((_) => {})
        .catch((err) => {
          console.log(err.message);
        });
    }

  }
};

export default callFunc;

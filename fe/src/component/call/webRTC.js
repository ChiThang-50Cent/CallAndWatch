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

callFunc.playedStream = (idStreamNode, stream) => {
  const video = document.getElementById(idStreamNode);
  if (video) {
    video.srcObject = stream;
    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {})
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
};

export default callFunc;

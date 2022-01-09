const callFunc = {};

callFunc.openStream = () => {
  const config = { audio: false, video: true };
  return navigator.mediaDevices.getUserMedia(config);
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

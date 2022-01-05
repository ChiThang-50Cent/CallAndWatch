const callFunc = {}

callFunc.openStream = () => {
    const config = {audio : false, video : true} 
    return navigator.mediaDevices.getUserMedia(config)
}

callFunc.playedStream = (idStreamNode, stream) =>{
    const video = document.getElementById(idStreamNode)
    video.srcObject = stream
    video.play();
}

export default callFunc
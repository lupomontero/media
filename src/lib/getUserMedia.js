const sources = {
  audio: { audio: true },
  camera: { video: true },
  screen: { video: { mediaSource: 'screen' } },
};


const createVideoSource = (stream) => {
  const streamSettings = stream.getVideoTracks()[0].getSettings();
  const video = document.createElement('video');
  video.setAttribute('width', streamSettings.width);
  video.setAttribute('height', streamSettings.height);
  video.srcObject = stream;
  video.play();
  return { stream, video };
};


const createAudioSource = (stream) => {
  // meter?
  return { stream };
};


export default type => navigator.mediaDevices.getUserMedia(sources[type])
  .then(stream => (
    (type === 'audio')
      ? createAudioSource(stream)
      : createVideoSource(stream)
  ));

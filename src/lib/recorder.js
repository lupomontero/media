export const createRecorder = (canvas, sources) => {
  const outputStream = new MediaStream();
  const inputStreams = [
    ...(sources.audio && sources.audio.stream ? [sources.audio.stream] : []),
    ...(sources.camera || sources.screen ? [canvas.captureStream()] : []),
  ];

  inputStreams.forEach(
    stream => stream.getTracks().forEach(
      track => outputStream.addTrack(track),
    ),
  );

  const recordedBlobs = [];
  const recorder = new MediaRecorder(outputStream, {
    mimeType: 'video/webm',
  });

  recorder.addEventListener('dataavailable', (e) => {
    if (e.data && e.data.size > 0) {
      recordedBlobs.push(e.data);
    }
  });

  recorder.start(1000);

  return { canvas, recorder, recordedBlobs };
};


export const stopRecorder = (recorder, recordedBlobs) => {
  recorder.stop();

  const blob = new Blob(recordedBlobs, { type: 'video/webm' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();

  return new Promise((resolve, reject) => setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    resolve();
  }, 100));
};

import createElement from '../lib/createElement.js';


const resolutions = {
  '1080p':{ width: 1920, height: 1080 },
  '720p': { width: 1280, height: 720 },
};


const drawScreen = (screen, canvas, ctx) => {
  const canvasAspectRatio = canvas.width / canvas.height;
  const screenAspectRatio = screen.video.videoWidth / screen.video.videoHeight;
  const [screenWidth, screenHeight, screenX, screenY] = (
    (canvasAspectRatio > screenAspectRatio)
      ? [
        canvas.height * screenAspectRatio,
        canvas.height,
        (canvas.width - (canvas.height * screenAspectRatio)) / 2,
        0,
      ]
      : [
        canvas.width,
        canvas.width * screenAspectRatio,
        0,
        (canvas.height - (canvas.width * screenAspectRatio)) / 2,
      ]
  );
  ctx.drawImage(
    screen.video,
    screenX,
    screenY,
    screenWidth,
    screenHeight,
  );
};


const drawCamera = (camera, canvas, ctx) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(
    (canvas.width - (camera.video.videoWidth / 4)) + 20,
    (canvas.height - (camera.video.videoHeight / 4)) - 15,
    camera.video.videoHeight / 4,
    0,
    2 * Math.PI,
  );
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(
    camera.video,
    (canvas.width - (camera.video.videoWidth / 2)) + 20,
    (canvas.height - (camera.video.videoHeight / 2)) - 15,
    camera.video.videoWidth / 2,
    camera.video.videoHeight / 2,
  );
  ctx.restore();
};


const update = (canvas, sources) => {
  const { audio, camera, screen } = sources;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (screen && screen.video) {
    drawScreen(screen, canvas, ctx);
  }

  if (camera && camera.video) {
    drawCamera(camera, canvas, ctx);
  }

  if (audio) {
    // update meter??
  }
};


const styles = {
  root: {
    width: '100%',
    backgroundColor: '#111',
  },
};


export default ({ store }) => {
  const { sources, resolution, canvas } = store.getState();
  const el = canvas || createElement('canvas', {
    id: 'Preview',
    width: resolutions[resolution].width,
    height: resolutions[resolution].height,
    style: styles.root,
  });

  if (!sources.audio && !sources.camera && !sources.screen) {
    // no input source...
    return el;
  }

  let isDestroyed = false;
  const unsubscribe = store.subscribe(() => {
    isDestroyed = true;
    unsubscribe();
  });
  const doUpdate = () => {
    if (isDestroyed) {
      return;
    }
    update(el, sources);
    window.requestAnimationFrame(doUpdate);
  };

  doUpdate();

  return el;
};

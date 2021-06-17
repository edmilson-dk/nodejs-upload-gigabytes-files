let bytesAmount = 0;

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  )
}

const updateStatus = (size) => {
  const message = `Peding Bytes to Upload: <strong>${formatBytes(size)}</strong>`;
  document.getElementById("size").innerHTML = message;
}

const showSize = () => {
  const { files: filesElement } = document.getElementById("file");
  if (!filesElement.length) return;

  const files = Array.from(filesElement);
  const { size } = files
    .reduce((prev, next) => ({ size: prev.size + next.size }), { size: 0});

  bytesAmount = size;
  updateStatus(bytesAmount);

  const interval = setInterval(() => {
    const result = bytesAmount - 5e6;
    bytesAmount = result < 0 ? 0 : result;
    updateStatus(bytesAmount);

    if (bytesAmount === 0) clearInterval(interval);
  }, 50);
}

const onload = () => {
  console.log('load');
}


window.showSize = showSize;
window.onload = onload;
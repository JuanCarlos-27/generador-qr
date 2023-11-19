import '../style.css'
import QrCode from 'https://danielgjackson.github.io/qrcodejs/qrcode.mjs';
import Atropos from 'https://cdn.jsdelivr.net/npm/atropos@2/atropos.min.mjs';

const imageContainer = document.getElementById('qr');

document.addEventListener('DOMContentLoaded', () => {
  Atropos({
    el: '.my-atropos',
    activeOffset: 50,
    rotateXMax: 30,
    rotateYMax: 30,
    shadowScale: 1.05,
  });

})

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const receivedData = urlParams.get('url');

  if (!receivedData) {
    window.location.href = 'index.html';
  }

  const source = generateQrCode(receivedData);

  imageContainer.src = source;

  downloadQrCode(source, 'qr-code.svg');
});


const downloadQrCode = (url, name) => {
  const btnDownload = document.querySelector('#download');
  btnDownload.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.click();
  });
}


const btnShare = document.querySelector('#share');

btnShare.addEventListener('click', () => shareQrCode());

const shareQrCode = async () => {
  try {
    await navigator.share({
      title: 'Compartir QR',
      text: 'Aquí está tu código QR:',
      url: window.location.href
    });
  } catch (err) {
    console.error('Error al compartir', err);
  }
}


const generateQrCode = (url) => {
  const matrix = QrCode.generate(url);
  const uri = QrCode.render('svg-uri', matrix);
  return uri;
}
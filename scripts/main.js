import '../style.css'

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { url } = Object.fromEntries(new FormData(form));
  
  const uri = `pages/qr-result.html?url=${encodeURIComponent(url)}`;
  window.location.href = uri;
})



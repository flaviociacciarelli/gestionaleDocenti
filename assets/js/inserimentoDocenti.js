document.getElementById('formDocente').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  fetch('/api/docenti', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert("Errore nel salvataggio"));
});

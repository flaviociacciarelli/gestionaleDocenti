document.getElementById("formDocente").addEventListener("submit", function (e) {
  e.preventDefault();
  const dati = {
    infoPersonali: {
      nome: document.getElementById("nome").value.trim(),
      cognome: document.getElementById("cognome").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      dataNascita: document.getElementById("dataNascita").value.trim(),
      cf: document.getElementById("cf").value.trim(),
    },

    lavoro: {
      materiaInsegnata: document
        .getElementById("materiaInsegnata")
        .value.trim(),
      dataAssunzione: document.getElementById("dataAssunzione").value.trim(),
    },

    residenza: {
      via: document.getElementById("via").value.trim(),
      cap: document.getElementById("cap").value.trim(),
      comune: document.getElementById("comune").value.trim(),
      provincia: document.getElementById("provincia").value.trim(),
      nazione: document.getElementById("nazione").value.trim(),
    },

    note: document.getElementById("note").value.trim(),
  };

  fetch("/api/docenti", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dati),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message))
    .catch((err) => alert("Errore nel salvataggio"));
});

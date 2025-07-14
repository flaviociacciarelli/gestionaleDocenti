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
  inviaDatiAlServer(dati);



  /*========= invia al form ========*/
  async function inviaDatiAlServer(dati) {
    console.log("Invio dei dati al server in corso...");

    try {
      const res = await fetch('http://localhost:3000/api/docenti');
      if (!res.ok) throw new Error("Impossibile leggere i docenti esistenti");
      const docenti = await res.json();

      let id;
      const esisteID = (id) => docenti.some(u => u.id === id);

      // Genera un ID unico
      do {
        id = Math.random().toString(36).substring(2, 6);
      } while (esisteID(id));

      dati.id = id;

      const postResponse = await fetch('http://localhost:3000/api/docenti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dati)
      });

      if (!postResponse.ok) {
        const errorText = await postResponse.text();
        throw new Error("Errore HTTP " + postResponse.status + ": " + errorText);
      }

      const data = await postResponse.json();
      console.log("Risposta del server (JSON Server):", data);
      alert("Dati inviati con successo al server locale!");
    } catch (error) {
      console.error("Errore durante l'invio:", error.message);
      alert("Errore durante l'invio dei dati: " + error.message);
    }
  }
});

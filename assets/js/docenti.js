fetch("http://localhost:3000/api/docenti")
  .then((response) => {
    if (!response.ok) {
      throw new Error("non sono riuscito a recuperare i dati");
    }
    return response.json();
  })
  .then((docenti) => {
    const table = document.getElementById("tabellaDocenti");
    docenti.forEach((docente) => {
        console.log(docente);
        
      const row = document.createElement("tr");

      row.innerHTML = `
      <td class="col">${docente.infoPersonali.nome}</td>
      <td class="col">${docente.infoPersonali.cognome}</td>
    <td class="col">${docente.infoPersonali.sesso}</td>
      <td class="col">${docente.infoPersonali.email}</td>
      <td class="col">${docente.infoPersonali.telefono}</td>
      <td class="col">${docente.infoPersonali.dataNascita}</td>
      <td class="col">${docente.infoPersonali.cf}</td>
      <td class="col">${docente.lavoro.materiaInsegnata}</td>
      <td class="col">${docente.lavoro.dataAssunzione}</td>
      `;

        table.appendChild(row);

    });
  })

  .catch((error) => {
    document.body.innerHTML += `<p style="color:red;">${error.message}</p>`;
    console.error("errore nelle fetch", error);
  });

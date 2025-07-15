fetch("http://localhost:3000/api/docenti")
  .then((response) => {
    if (!response.ok) {
      throw new Error("non sono riuscito a recuperare i dati");
    }
    return response.json();
  })
  .then((docenti) => {
    const table = document.getElementById("tabellaDocenti");

    let maschi = 0;
    let femmine = 0;
    let altro = 0;

    docenti.forEach((docente) => {
      console.log(docente);

      const row = document.createElement("tr");

      row.innerHTML = `
      <td class="tdNome">${docente.infoPersonali.nome}</td>
      <td id="striped">${docente.infoPersonali.cognome}</td>
    <td>${docente.infoPersonali.sesso}</td>
      <td id="striped">${docente.infoPersonali.email}</td>
      <td>${docente.infoPersonali.telefono}</td>
      <td id="striped">${docente.infoPersonali.dataNascita}</td>
      <td>${docente.infoPersonali.cf}</td>
      <td id="striped">${docente.lavoro.materiaInsegnata}</td>
      <td>${docente.lavoro.dataAssunzione}</td>
      `;

      table.appendChild(row);

      const sesso = docente.infoPersonali.sesso.toLowerCase();
      if (sesso === "m") {
        maschi += 1;
      } else if (sesso === "f") {
        femmine += 1;
      } else {
        altro += 1;
      }
    });

    // Pie Chart (dopo il conteggio)
    const ctxGender = document.getElementById("genderChart").getContext("2d");
    new Chart(ctxGender, {
      type: "pie",
      data: {
        labels: ["Maschi", "Femmine", "Altro"],
        datasets: [
          {
            data: [maschi, femmine, altro],
            backgroundColor: ["#36A2EB", "#FF6384", "#5D5D5D"],
            borderColor: "#fff",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } },
      },
    });
  })
  .catch((error) => {
    document.body.innerHTML += `<p style="color:red;">${error.message}</p>`;
    console.error("errore nella fetch", error);
  });

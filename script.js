fetch("data.json")
  .then(response => response.json())
  .then(data => {

    // Parent
    const parentDiv = document.getElementById("parent");

    parentDiv.innerHTML = `
      <div class="person">
        <img src="${data.photo}" alt="">
        <div class="person-name">${data.name}</div>
      </div>
    `;

    // Enfants
    const childrenDiv = document.getElementById("children");

    data.children.forEach(child => {
      const childHTML = `
        <div class="person">
          <img src="${child.photo}" alt="">
          <div class="person-name">${child.name}</div>
        </div>
      `;
      childrenDiv.innerHTML += childHTML;
    });

  })
  .catch(error => console.error("Erreur :", error));

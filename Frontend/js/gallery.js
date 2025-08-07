import { deleteWork, getWorks } from "./api.js";

//Fonction pour afficher dynamiquement les travaux dans la galerie
export function afficherTravaux(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Supprimer du html statique

  //Ajouter dynamique les travaux à la galerie
  // Pour chaque "work" dans le tableau "works", créer dynamiquement un bloc <figure>
  works.forEach((work) => {
    const figure = document.createElement("figure");
    figure.dataset.id = work.id; //pratique de trouver id

    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;
    const caption = document.createElement("figcaption");
    caption.textContent = work.title;

    figure.appendChild(image);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

export function afficherGalerieModal(works) {
  const container = document.getElementById("media-thumbnails");
  container.innerHTML = "";

  //Créer du bouton supprimer si administrateur
  const isLogged = localStorage.getItem("token"); //simple vérification

  works.forEach((work) => {
    const figure = document.createElement("figure");
    figure.dataset.id = work.id; //pratique de trouver id

    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;

    if (isLogged) {
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      //Conteneur pour positionner le bouton
      const figureWrapper = document.createElement("div");
      figureWrapper.style.position = "relative";
      figureWrapper.appendChild(image);
      figureWrapper.appendChild(deleteBtn);
      figure.appendChild(figureWrapper);

      //Ajouter deleter d'un écouteur d’événement au bouton
      deleteBtn.addEventListener("click", async () => {
        const confirmDelete = confirm("Voulez-vous supprimer cette image?");
        if (confirmDelete) {
          await deleteWork(work.id);
          const newWorks = await getWorks();
          afficherGalerieModal(newWorks);
          afficherTravaux(newWorks); //rafraîcher la galerie
        }
      });
    } else {
      figure.appendChild(image);
    }
    container.appendChild(figure);
  });
}

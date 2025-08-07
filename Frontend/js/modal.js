import { resetPreviewZone } from "./upload.js";
import { form,submitBtn } from "./upload.js";
import { afficherGalerieModal } from "./gallery.js";
import { getWorks } from "./api.js";

export function setupModal() {
  //Récuperer l'id utilisateur stocké localement dans le navigateur
  const userId = localStorage.getItem("userId");
  //Sélectionne le lien de modification dans l'en-tête avec la classe ".modifier-button"
  const modifierButton = document.querySelector(".modifier-button");
  // Selectionner le modal & la croix
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelectorAll(".modal-close");
  const modalContent = document.querySelector(".modal-content");
  const modalGallery = document.getElementById("modal-gallery-view");
  const modalAjout = document.getElementById("modal-add-photo-view");
  const openAjoutBtn = document.getElementById("open-add-photo");
  const returnBtn = document.getElementById("return-to-gallery");

  //resetModalToGalleryView est une fonction qui réinitialise le modal à la vue galerie
  function resetModalToGalleryView() {
    modalAjout.style.display = "none";
    modalGallery.style.display = "block";
 }
  
   function resetForm(){
    form.reset(); // Réinitialise le formulaire
    resetPreviewZone(); // Réinitialise la zone de prévisualisation
    submitBtn.disabled = true; // Désactive le bouton de soumission
   }

   async function refreshGallery() {
    const works = await getWorks();
    afficherGalerieModal(works); // Rafraîchit la galerie dans le modal
   }

 //Affiche l'id utilisateur dans la console pour le débogage
  console.log("UserId from localStorage:", userId);

  // Si l'utilisateur est l'administrateur (userId égal à "1"),on affiche le lien de button modifier
  if (userId !== "") {
    modifierButton.style.display = "flex";
  }

  //Ouvrir le modal
  modifierButton.addEventListener("click", function (event) {
    event.preventDefault();
    modal.classList.remove("hidden");

    resetModalToGalleryView(); // Réinitialiser la vue du modal à la galerie
    resetForm(); // Réinitialiser le formulaire
    refreshGallery(); // Rafraîchir la galerie dans le modal
    
  });

  //Fermer le modal avec tous les boutons croix
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      modal.classList.add("hidden");
      resetModalToGalleryView(); // Réinitialiser la vue du modal à la galerie
      resetForm(); // Réinitialiser le formulaire
    });
  });

  //Fermer quand on clique en dehors du contenu sur le fond
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
      resetModalToGalleryView(); // Réinitialiser la vue du modal à la galerie
      resetForm(); // Réinitialiser le formulaire
    }
  });

  //Empêcher fermeture si clic sur le contenu
  modalContent.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  //Aller à la vue "ajout photo"
  openAjoutBtn.addEventListener("click", function () {
    modalGallery.style.display = "none";
    modalAjout.style.display = "block";
  });

  //Retour à la galerie
  returnBtn.addEventListener("click", function () {
    modalAjout.style.display = "none";
    modalGallery.style.display = "block";
    resetForm(); // Réinitialiser le formulaire
    refreshGallery(); // Rafraîchir la galerie dans le modal
  });
}

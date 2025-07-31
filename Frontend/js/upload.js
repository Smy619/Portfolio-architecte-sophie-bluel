import { uploadWork, getWorks } from "./api.js";
import { afficherTravaux, afficherGalerieModal } from "./gallery.js";

// Récupération des éléments HTML nécessaires pour le formulaire d'upload
const fileInput = document.getElementById("photo-file"); // Input pour sélectionner le fichier
const previewZone = document.getElementById("previewZone"); // Zone de prévisualisation de l'image
const titleInput = document.getElementById("photo-title"); // Input pour le titre de l'œuvre
const categorySelect = document.getElementById("photo-category"); // Select pour choisir la catégorie
const submitBtn = document.getElementById("photo-submit"); // Bouton de soumission du formulaire
const form = document.getElementById("photo-upload-form"); // Formulaire complet

//Écouteur d'événement pour détecter quand un fichier est sélectionné
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0]; // Récupération du premier fichier sélectionné
  previewZone.innerHTML = ""; // Réinitialisation de la zone de prévisualisation

  if (file) {
    // Création d'un FileReader pour lire le contenu du fichier
    const reader = new FileReader();

    // Fonction appelée quand le fichier est lu avec succès
    reader.onload = (e) => {
      // Création d'un élément image pour la prévisualisation
      const img = document.createElement("img");
      img.src = e.target.result; // Source de l'image (données en base64)
      img.alt = "Prévisualisation"; // Texte alternatif pour l'accessibilité

      // Application des styles CSS pour la prévisualisation
      img.style.maxHeight = "169px";
      img.style.width = "auto";
      img.style.borderRadius = "5px";

      // Ajout de l'image à la zone de prévisualisation
      previewZone.appendChild(img);

      // Vérification de la validité du formulaire après chargement de l'image
      checkFormValidity();
    };

    // Lecture du fichier en tant qu'URL de données (base64)
    reader.readAsDataURL(file);
  }
});

// Écouteurs d'événements pour vérifier la validité en temps réel
titleInput.addEventListener("input", checkFormValidity); // Vérification lors de la saisie du titre
categorySelect.addEventListener("change", checkFormValidity); // Vérification lors du changement de catégorie

// Vérifie si tous les champs requis sont remplis et active/désactive le bouton de soumission
function checkFormValidity() {
  // Validation : fichier sélectionné + titre non vide + catégorie sélectionnée
  const isValid =
    fileInput.files.length > 0 &&
    titleInput.value.trim() !== "" &&
    categorySelect.value !== "";
  submitBtn.disabled = !isValid; // Désactive le bouton si le formulaire n'est pas valide
}

// Fonction pour passer de la vue d'ajout de photo à la vue galerie
function switchToGalleryView() {
  const addView = document.getElementById("modal-add-photo-view"); // Vue d'ajout de photo
  const galleryView = document.getElementById("modal-gallery-view"); // Vue galerie

  // Masquage de la vue d'ajout
  addView.classList.remove("active");
  addView.style.display = "none";

  // Affichage de la vue galerie
  galleryView.classList.add("active");
  galleryView.style.display = "block";
}

// Fonction pour passer de la vue galerie à la vue d'ajout de photo
function switchToAddPhotoView() {
  const galleryView = document.getElementById("modal-gallery-view"); // Vue galerie
  const addView = document.getElementById("modal-add-photo-view"); // Vue d'ajout de photo

  // Masquage de la vue galerie
  galleryView.classList.remove("active");
  galleryView.style.display = "none";

  // Affichage de la vue d'ajout
  addView.classList.add("active");
  addView.style.display = "block";

  // Réinitialisation de la zone de prévisualisation avec le contenu par défaut
  previewZone.innerHTML = `
      <i class="fa-solid fa-image"></i>
      <label for="photo-file" class="upload-btn">+ Ajouter photo</label>
      <p>jpg.png : 4mo max</p>
    `;
  // Vérifie si le formulaire est encore valide après le reset
  checkFormValidity();
}

// Gestion des clics sur les boutons de navigation entre les vues
document
  .getElementById("open-add-photo")
  .addEventListener("click", switchToAddPhotoView); // Bouton pour ouvrir la vue d'ajout
document
  .getElementById("return-to-gallery")
  .addEventListener("click", switchToGalleryView); // Bouton pour retourner à la galerie

// Remet la zone de prévisualisation dans son état initial
function resetPreviewZone() {
  previewZone.innerHTML = `
    <i class="fa-solid fa-image"></i>
    <label for="photo-file" class="upload-btn">+ Ajouter photo</label>
    <p>jpg.png : 4mo max</p>
  `;
}

// Écouteur d'événement pour la soumission du formulaire d'upload
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Empêche le comportement par défaut du formulaire

  // Récupération des données du formulaire
  const file = fileInput.files[0]; // Fichier sélectionné
  const title = titleInput.value.trim(); // Titre de l'œuvre (sans espaces en début/fin)
  const category = categorySelect.value; // Catégorie sélectionnée

  // Vérification que tous les champs sont remplis
  if (!file || !title || !category) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // Création d'un objet FormData pour l'envoi des données
  const formData = new FormData();
  formData.append("image", file); // Ajout du fichier image
  formData.append("title", title); // Ajout du titre
  formData.append("category", category); // Ajout de la catégorie

  try {
    // Envoi de l'œuvre au serveur
    await uploadWork(formData);

    // Récupération de la liste mise à jour des œuvres
    const updated = await getWorks();

    // Mise à jour de l'affichage dans la galerie principale et modale
    afficherTravaux(updated);
    afficherGalerieModal(updated);

    // RÉINITIALISATION DU FORMULAIRE
    form.reset(); // Remet tous les champs à zéro
    resetPreviewZone(); // Remet la zone de prévisualisation à l'état initial
    submitBtn.disabled = true; // Désactive le bouton de soumission

    // Retour à la vue galerie après succès
    switchToGalleryView();
  } catch (err) {
    // Gestion des erreurs en cas d'échec de l'upload
    console.error("Erreur lors de l'envoi :", err);
    alert("Echec de l'envoi du fichier.");
  }
});

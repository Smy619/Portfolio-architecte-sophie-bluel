import { afficherTravaux } from "./gallery.js";

export function setupCategoryButtons(works) {
  //Crée un ensemble (Set) pour stocker les catégories uniques sous forme de chaînes JSON
  const categoriesSet = new Set();
  works.forEach((work) => {
    const categoryObjet = {
      id: work.category.id,
      name: work.category.name,
    };

    //Ajouter la catégorie à l'ensemble, en la convertissant en chaine JSON pour garantir l'unicité
    categoriesSet.add(JSON.stringify(categoryObjet));
  });

  //Convertit l'ensemble en tableau d'objets
  const categories = Array.from(categoriesSet).map((item) => JSON.parse(item));

  //Afficher les catégories uniques dans la console
  console.log(categories);

  const categoryContainer = document.querySelector(".categories");
  if (!categoryContainer) return;

  //Ajouter le bouton active
  function setActiveButton(clickedButton) {
    const buttons = categoryContainer.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("active"));
    clickedButton.classList.add("active");
  }

  //Créer et ajouter le bouton "tous" en premier
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.id = "all";

  allButton.addEventListener("click", () => {
    afficherTravaux(works);
    setActiveButton(allButton);
  });
  categoryContainer.prepend(allButton); //Confirmer le button "tous" qui comme par défaut

  //Créer les boutons pours chaque catégorie
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.id = category.id;
    button.addEventListener("click", () => {
      //Filtrer les travaux pour n'afficher que ceux de la catégorie sélectionnée
      const filteredWorks = works.filter(
        (work) => work.category.id === category.id
      );
      afficherTravaux(filteredWorks);
      setActiveButton(button);
    });
    categoryContainer.appendChild(button);
  });
}
// Masque le conteneur des boutons de catégorie
export function hideCategoryButtons() {
  const categoryContainer = document.querySelector(".categories");
  if (categoryContainer) {
    categoryContainer.style.display = "none";
  }
}
// Affiche le conteneur des boutons de catégorie
export function showCategoryButtons() {
  const categoryContainer = document.querySelector(".categories");
  if (categoryContainer) {
    categoryContainer.style.display = "block";
  }
}

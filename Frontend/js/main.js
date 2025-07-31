import { getWorks } from "./api.js";
import { afficherTravaux } from "./gallery.js";
import {
  setupCategoryButtons,
  hideCategoryButtons,
  showCategoryButtons,
} from "./category.js";
import {
  isUserLoggedIn,
  setupLoginButton,
  displayAdminBanner,
} from "./auth.js";
import { setupModal } from "./modal.js";
import "./upload.js";
import { setupNavActive } from "./nav.js";

//Charger les données au lancement
(async () => {
  const works = await getWorks();
  afficherTravaux(works);

  setupLoginButton();
  displayAdminBanner();
  setupNavActive();

  if (isUserLoggedIn()) {
    hideCategoryButtons();
  } else {
    setupCategoryButtons(works);
  }
  setupModal();
})();

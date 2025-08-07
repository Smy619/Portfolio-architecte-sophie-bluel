import { getWorks } from "./api.js";
import { afficherTravaux } from "./gallery.js";
import {
  setupCategoryButtons,
  hideCategoryButtons,
} from "./category.js";
import {
  isUserLoggedIn,
  setupLoginButton,
  displayAdminBanner,
} from "./auth.js";

import { setupModal } from "./modal.js";
import "./upload.js";

//Charger les données au lancement
(async () => {
  const works = await getWorks();
  afficherTravaux(works);

  setupLoginButton();
  displayAdminBanner();

  if (isUserLoggedIn()) {
    hideCategoryButtons();
  } else {
    setupCategoryButtons(works);
  }
  setupModal();
})();

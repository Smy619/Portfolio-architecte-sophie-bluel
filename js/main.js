import { getWorks } from './api.js';
import { afficherTravaux } from './gallery.js';
import { setupCategoryButtons } from './category.js';
import { setupModal } from './modal.js';
import './upload.js';

 //Charger les données au lancement
(async () => {
  const works = await getWorks();
  afficherTravaux(works);
  setupCategoryButtons(works);
  setupModal();
})();
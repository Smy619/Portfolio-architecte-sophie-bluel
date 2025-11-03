import { getWorks } from './api.js';
import { afficherTravaux } from './gallery.js';
import { setupCategoryButtons } from './category.js';
import { setupModal } from './modal.js';
import './upload.js';

(async () => {
  const works = await getWorks();
  afficherTravaux(works);
  setupCategoryButtons(works);
  setupModal();

  // Vérifier la connexion
  const token = localStorage.getItem("token");
  const loginLink = document.querySelector('nav a[href="login.html"]');
  const filterSection = document.querySelector(".categories"); // ou .filtres selon ton HTML

  if (token) {
    console.log("Mode édition activé");
    loginLink.textContent = "logout";
    loginLink.href = "#";
    loginLink.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "index.html";
    });

    // ✅ 登录后显示分类栏
    if (filterSection) filterSection.style.display = "flex";
  } else {
    console.log("Mode visiteur");
    if (filterSection) filterSection.style.display = "none";
  }
})();
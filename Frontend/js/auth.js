
export function isUserLoggedIn() {
  return localStorage.getItem("token") != null;
}

export function setupLoginButton() {
  const loginLink = document.querySelector(".login-link");
  if (!loginLink) return;

  const token = localStorage.getItem("token");
  
  if (token) {
    loginLink.textContent = "logout";
    loginLink.href = "#";
    loginLink.addEventListener("click",(e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.reload();
    });
  }else {
     loginLink.textContent ="login";
     loginLink.href = "login.html";
  }
}

export function displayAdminBanner(){
  const banner = document.querySelector(".admin-banner");
  if (!banner) return;
  
  const token =localStorage.getItem("token");

  if (token) {
    banner.style.display = "block";
  }else {
    banner.style.display = "none";
  }
}
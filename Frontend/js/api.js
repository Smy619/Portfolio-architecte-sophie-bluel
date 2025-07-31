//Fonction pour récupérer les works depuis l’API
export async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

//Fontion deleteWork pour supprimer un travail depuis l'api
export async function deleteWork(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }
  } catch (error) {
    console.error("Suppression échouée :", error);
  }
}
//Fonction pour déposer la photo depuis l'API
export async function uploadWork(formData) {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Upload échoué");
  }
  return await response.json();
}

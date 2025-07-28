//selection du formulaire sur la page
const form = document.querySelector("form");

//ajouter d'un écouteur d'événement sur la soumission du formulaire
form.addEventListener("submit",async (event) => {
      event.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      //récupération des valeurs saisies par l'utilisateur
      console.log("Email:", email);
      console.log("Mot de passe:",password);
      try {
        //envoi de la requête POST à l'API pour la connexion
           const response = await fetch("http://localhost:5678/api/users/login",{
            method:"POST",
            headers :{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({email,password}),
      }); 
     
        
      //si la réponse est positive(statut 200)
         if(response.ok) {
          const data =await response.json();//récuperer les données de la réponse
          console.log(data);
          const token = data.token;//Extraction du token depuis la réponse

          //stocker le token
          localStorage.setItem("token",token);
          localStorage.setItem("userId", data.userId);

          //redirection vers la page d'accueil
          window.location.href = "index.html";
         }
           else {
            //si la connexsion échoue
            //supprimer un ancien messsage d'erreur s'il existe déjà
            const oldMessage = document.querySelector(".error-message");
            if(oldMessage) oldMessage.remove();

            //créer et afficher un nouveau message d'erreur
          const messageErreur = document.createElement("p");
           messageErreur.innerText="Erreur dans l'identifiant ou le mot de passe";
           messageErreur.classList.add("error-message");
           messageErreur.style.color ="red";
           form.appendChild(messageErreur);//ajouter le message dans le formulaire
        }

      }catch(error) {
        //en cas d'erreur de serveur ou de réseau
        console.error("Erreur lors de la connexion :",error);
        alert("Erreur serveur.Veuillez réessayer plus tard");
      }
});
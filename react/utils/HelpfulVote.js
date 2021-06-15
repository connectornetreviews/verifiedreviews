import FingerprintJS from "@fingerprintjs/fingerprintjs";

const helpfulMethods = () => {
  let avhelpfulExec = false;
  let avHelpfulCookie = {};
  const avHelpfulURL =
    "<?php echo $GENERAL_URL_WWW; ?>index.php?action=act_api_product_reviews_helpful";

  const avHelpfulErrorMessage = "Error";
  const avHelpfulSuccessMessage = "Your vote has been registered";

  function avHasClass(element, cls) {
    return ` ${element.className} `.indexOf(` ${cls} `) > -1;
  }

  function avLoadCookie() {
    const name = "netreviews_helpful=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");

    avHelpfulCookie = {};
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        avHelpfulCookie = JSON.parse(c.substring(name.length, c.length));
      }
    }
  }

  function avSaveCookie() {
    const expiration_date = new Date();

    expiration_date.setFullYear(expiration_date.getFullYear() + 1);
    const cookie_value = JSON.stringify(avHelpfulCookie);
    const cookie_string = `netreviews_helpful=${cookie_value}; path=/; expires=${expiration_date.toUTCString()}`;

    document.cookie = cookie_string;
  }

  function avDisplayVotes() {
    const voteButtons = document.getElementsByClassName("netreviewsVote");

    for (let i = 0; i < voteButtons.length; i++) {
      const idProduct = voteButtons[i].getAttribute("data-review-id");

      if (typeof idProduct !== "undefined" && idProduct != "") {
        const existingVote = getExistingVote(idProduct);

        if (typeof existingVote.vote !== "undefined") {
          avColorButton(idProduct, existingVote.vote);
        }
      }
    }
  }

  function getExistingVote(idProduct) {
    if (typeof avHelpfulCookie[idProduct] !== "undefined") {
      return avHelpfulCookie[idProduct];
    }

    return {};
  }

  // Au clic de l'internaute sur un vote
  function avHelpfulClick(idProduct, vote, sign) {
    // Si double click pas d'action
    if (avhelpfulExec) {
      return false;
    }

    avhelpfulExec = true;
    // On recupère l'element <a>
    const link = document.getElementById(`${idProduct}_${vote}`);
    // On check si le lien est déjà actif ou non
    const linkIsActive = avHasClass(link, "active");

    // Affichage en direct de l'action
    if (!linkIsActive) {
      // Le lien n'est pas déjà actif > color
      avColorButton(idProduct, vote);
      avShowMessage(idProduct, avHelpfulSuccessMessage, "success");
    } else {
      // Le lien est déjà actif > uncolor
      avUnColorButtons(idProduct);
      avShowMessage(idProduct, "", "");
    }

    // On calcul le fingerPrint de l'internaute
    (async () => {
      // We recommend to call `load` at application startup.
      const fp = await FingerprintJS.load();

      await fp.get(function(result, components) {
        // On recharge les coockies
        avLoadCookie();
        // new vote > create
        if (!linkIsActive) {
          avCallHelpfulWebservice("create", idProduct, vote, sign, result);
        }
        // vote already sent > delete
        else {
          avCallHelpfulWebservice("delete", idProduct, vote, sign, result);
        }
      });
    })();
  }

  // Appel au webservice
  function avCallHelpfulWebservice(method, idProduct, vote, sign, fingerPrint) {
    // Si un vote existe déjà pour cet avis on récupère le fingerPrint existant
    const existingVote = getExistingVote(idProduct);
    const avHelpfulIdwebsite = document.getElementById("netreviews-idWebsite")
      .value;

    if (
      typeof existingVote.fingerPrint !== "undefined" &&
      existingVote.fingerPrint != ""
    ) {
      fingerPrint = existingVote.fingerPrint;
    }

    // Appel au webservice
    const http = new XMLHttpRequest();
    const params = `method=${method}&idWebsite=${avHelpfulIdwebsite}&idProduct=${idProduct}&isHelpful=${vote}&fingerPrint=${fingerPrint}&sign=${sign}`;

    http.open("POST", avHelpfulURL, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        try {
          const obj = JSON.parse(http.responseText);

          if (typeof obj.success !== "undefined") {
            // SUCCESS
            if (obj.success == "1") {
              if (obj.method == "create") {
                // save cookie
                avHelpfulCookie[obj.idProduct] = {};
                avHelpfulCookie[obj.idProduct].vote = obj.isHelpful;
                avHelpfulCookie[obj.idProduct].fingerPrint = obj.fingerPrint;
                avSaveCookie();
              }

              if (obj.method == "delete") {
                // remove cookie
                if (typeof avHelpfulCookie[obj.idProduct] !== "undefined") {
                  delete avHelpfulCookie[obj.idProduct];
                  avSaveCookie();
                }
              }
            }

            // ERROR
            if (obj.success == "0") {
              avUnColorButtons(obj.idProduct);
              avShowMessage(obj.idProduct, avHelpfulErrorMessage, "error");
              console.log(
                `[NetReviews] Error ${obj.errorCode} : ${obj.errorMessage}`
              );
            }
          }
        } catch (e) {
          console.error("Parsing error:", e);
          avUnColorButtons(idProduct);
          avShowMessage(idProduct, avHelpfulErrorMessage, "error");
          console.log("[NetReviews] Unknown error.");
        }
      }

      avhelpfulExec = false;
    };

    http.send(params);
  }

  // Met en avant le vote de l'internaute
  function avColorButton(idProduct, isHelpful) {
    const link = document.getElementById(`${idProduct}_${isHelpful}`);
    const linkIsActive = avHasClass(link, "active");

    if (!linkIsActive) {
      link.classList.add("active");
    }

    if (isHelpful == "0") {
      var otherLink = document.getElementById(`${idProduct}_1`);
    } else {
      var otherLink = document.getElementById(`${idProduct}_0`);
    }

    otherLink.classList.remove("active");
  }

  // Masque le vote de l'internaute
  function avUnColorButtons(idProduct) {
    const link_yes = document.getElementById(`${idProduct}_1`);
    const link_no = document.getElementById(`${idProduct}_0`);

    link_yes.classList.remove("active");
    link_no.classList.remove("active");
  }

  // Affiche un message de confirmation ou d'erreur
  function avShowMessage(idProduct, message, type) {
    const p = document.getElementById(`${idProduct}_msg`);

    if (typeof p !== "undefined" && p != "null") {
      p.innerHTML = message;
      if (message != "") {
        p.style.display = "block";
      }

      if (message == "") {
        p.style.display = "none";
      }

      if (type == "success") {
        p.style.color = "#0c9c5b";
      }

      if (type == "error") {
        p.style.color = "#bf2525";
      }
    }
  }
};

export default helpfulMethods;

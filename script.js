document.addEventListener("DOMContentLoaded", function () {
  // nämä muuttujat ovat vapaaehtoisia
  const form = document.getElementById("pancakeForm");
  const totalPriceDisplay = document.getElementById("totalPriceDisplay");
  const totalPriceBanner = document.getElementById("totalPrice");
  const seeOrderButton = document.getElementById("seeOrder");
  const summaryText = document.getElementById("summaryText");
  const typeSelect = document.getElementById("type");
  // nämä taulukot tarvitaan
  let toppings = [];
  let extras = [];
  //yksi tapahtumakuuntelija koko lomakeelle
  form.addEventListener("change", function (event) {
    const target = event.target;
    //tarkista kumpaan listaan checkboxit lisätään
    if (target.classList.contains("topping")) {
      handleToppings(target);
    } else if (target.classList.contains("extra")) {
      handleExtras(target);
    }
    updatePrice();
    console.log("täytteet", toppings, "lisukeet", extras);
  });
  function handleToppings(checkbox) {
    const toppingName = checkbox.parentElement.textContent.trim(); // .trim()-poista ylimääräiset välilyönnit
    if (checkbox.checked) {
      toppings.push(toppingName);
    } else {
      toppings = toppings.filter((topping) => topping !== toppingName); //.filter - filtruet, v dannom sluchae !==, v tu zhe tablicu toppings dobavljaet novye dannye toppings.filter((topping), esli chto-to ne vybrano etot filter ubiraet
    }
  }
  function handleExtras(checkbox) {
    const extraName = checkbox.parentElement.textContent.trim(); // .trim()-poista ylimääräiset välilyönnit
    if (checkbox.checked) {
      extras.push(extraName);
    } else {
      extras = extras.filter((e) => e !== extraName); //.filter - filtruet, v dannom sluchae !==, v tu zhe tablicu toppings dobavljaet novye dannye toppings.filter((topping), esli chto-to ne vybrano etot filter ubiraet
    }
  }
  function updatePrice() {
    const pancakeType = document.getElementById("type");
    const selectedType = pancakeType.options[pancakeType.selectedIndex]; //vybiraem iz vypadajushego spsiska
    let total = parseFloat(selectedType.getAttribute("data-price")); //parseFloat menjaet na nomer
    //lisätään loppusummaan jokaisesta täyteestä 1€
    total += toppings.length * 1;

    let extraChoices = document.querySelectorAll(".extra");
    extraChoices.forEach((checkbox) => {
      if (checkbox.checked) {
        total = total + parseFloat(checkbox.getAttribute("data-price"));
      }
    });
    //haetaan kuljetuksen arvo ja lisätään hinta (hinta voi olla nolla)
    let delivery = document.querySelector("input[name='delivery']:checked");
    total += parseFloat(delivery.getAttribute("data-price"));
    //muotoillaan kokonaishinta desimaaliluvuksi
    let formattedTotal = total.toFixed(2) + "€";

    totalPriceBanner.textContent = formattedTotal;
    totalPriceDisplay.textContent = formattedTotal;
  }
  //lisätään napille kuuntelija

  seeOrderButton.addEventListener("click", function () {
    //haetaan tilajan tiedot
    const customerName = document.getElementById("customerName").value.trim();
    const selectedType = typeSelect.options[typeSelect.selectedIndex];
    const delivery = document
      .querySelector("input[name=delivery]:checked")
      .parentElement.textContent.trim();
    //näytetään tilauksen tiedot
    let summary = `<strong>Asiakas:</strong> ${
      customerName || " (ei nimiä)"
    }<br>`;
    summary += `<strong>Tyyppi:</strong> ${selectedType.value}<br>`;
    summary += `<strong>Täytteet:</strong> ${
      toppings.length > 0 ? toppings.join(", ") : "Ei täytteitä"
    }<br>`;
    summary += `<strong>Lisukkeet:</strong> ${
      extras.length > 0 ? extras.join(", ") : "Ei lisukeitä"
    }<br>`;
    summary += `<strong>Toimitustapa:</strong> ${delivery}<br>`;
    summary += `<strong>Kokonaishinta:</strong> ${totalPriceDisplay.textContent}<br>`;
    summaryText.innerHTML = summary;
    //luon uuden muutujan "tilaukset"
    let tilaukset = JSON.parse(localStorage.getItem("tilaukset")) || [];
    //lisätään uuen tilauksen listaan summary
    tilaukset.push(summary);
    //tallenna tilauksen
    localStorage.setItem("tilaukset", JSON.stringify(tilaukset));
  });
});

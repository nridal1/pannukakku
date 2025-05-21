const totalPriceDisplay = document.getElementById("totalPriceDisplay");
const summaryText = document.getElementById("summaryText");
const form = document.getElementById("pancakeForm");

let selectedToppings = [];
let selectedExtras = [];
let basePrice = 5;
let deliveryPrice = 0;

function updateTotalPrice() {
  let toppingsPrice = selectedToppings.length * 1;
  let extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  let totalPrice = basePrice + toppingsPrice + extrasPrice + deliveryPrice;
  totalPriceDisplay.textContent = `${totalPrice}€`;
}
function getLableText(inputElement) {
  return inputElement.parentElement.textContent.replace(/\+\s*\d+€/, "").trim();
}

form.addEventListener("change", (e) => {
  const target = e.target;
  if (target.id === "type") {
    basePrice = parseFloat(target.selectedToppings[0].dataset.price);
  }
  if (target.classList.contains("topping")) {
    const toppingName = getLableText(target);

    if (target.cheked) {
      if (!selectedToppings.includes(toppingName)) {
        selectedToppings.push(toppingName);
      }
    } else {
      selectedToppings = selectedToppings.filter(
        (name) => name !== toppingName
      );
    }
    if (target.classList.contains("extra")) {
      const extraName = getLableText(target);
      const extraPrice = parseFloat(target.dataset.price);

      if (target.checked) {
        selectedExtras.push({ name: extraName, price: extraPrice });
      } else {
        selectedExtras = selectedExtras.filter(
          (extra) => extra.name !== extraName
        );
      }
    }

    if (target.classList.contains("delivery")) {
      deliveryPrice = parseFloat(target.dataset.price);
    }

    updateTotalPrice();
  }
});
document.getElementById("seeOrder").addEventListener("click", () => {
  const customerName = document.getElementById("customerName").value;
  const pancakeType =
    document.getElementById("type").selectedOptions[0].textContent;
  const toppingsList =
    selectedToppings.length > 0 ? selectedToppings.join(", ") : "Ei täytteitä";
  const extrasList =
    selectedExtras.length > 0
      ? selectedExtras.map((extra) => extra.name).join(", ")
      : "Ei lisukkeita";
  const deliveryMethod = form
    .querySelector(".delivery:checked")
    .parentElement.textContent.trim();
  const total = totalPriceDisplay.textContent;

  summaryText.innerHTML = `
    <strong>Asiakas:</strong> ${customerName}<br>
    <strong>Pannukakku:</strong> ${pancakeType}<br>
    <strong>Täytteet:</strong> ${toppingsList}<br>
    <strong>Lisukkeet:</strong> ${extrasList}<br>
    <strong>Toimitus:</strong> ${deliveryMethod}<br>
    <strong>Kokonaishinta:</strong> ${total}
  `;
});

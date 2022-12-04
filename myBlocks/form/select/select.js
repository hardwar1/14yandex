// механика кастомного СЕЛЕКТА
const selectHeader = qAll(".select__header");
if (selectHeader) {
  for (let item of selectHeader) {
    let select = item.closest(".select"),
      options = select.querySelectorAll("option"),
      itemID = 0;

    select.querySelector("span").innerText = options[0].innerText;

    for (let option of options) {
      itemID = itemID + 1;
      option
        .closest(".select")
        .querySelector(
          "ul"
        ).innerHTML += `<li><button class="select__item"
        type="button" id="${itemID}"> ${option.innerText}</button></li>`;

      if (option.hasAttribute("selected")) {
        option.closest(".select").querySelector("span").innerText =
          option.innerText;
      }
    }

    let selectItem = select.querySelectorAll("li");
    for (let i = 0; i < selectItem.length; i++) {
      selectItem[i].addEventListener("click", function () {
        let itemID = this.querySelector('button').getAttribute('id'),
          options = this.closest('.select').querySelectorAll(`option`);
        itemID -= 1;
        for (const i of options) {
          i.setAttribute("selected", false);
        }

        options[itemID].setAttribute("selected", true);
        select.querySelector("span").innerText = selectItem[i].innerText;
        select.classList.remove("select--active");
      });
    }
  }

  const selects = qAll("select");
  for (const select of selects) {
    select.addEventListener("click", function () {
      select.closest(".select").classList.toggle("select--active");
    });
  }
}
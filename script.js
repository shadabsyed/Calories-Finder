$(document).ready(async function () {
  async function fetchFruits() {
    try {
      const response = await fetch("https://onlydev.ml/sh/get-all-fruits.php");
      const data = await response.json();
      return data;
    } catch (e) {
      console.log("There was a problem fetching the fruit api.");
      return null;
    }
  }

  async function fetchFruitData(fruitName) {
    try {
      const response = await fetch(
        `https://onlydev.ml/sh/get-fruit-by-id.php?id=${fruitName}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(`There was a problem fetching data for ${fruitName}`);
      return null;
    }
  }

  async function selectFruitNames() {
    const fruitNames = await fetchFruits();
    if (fruitNames) {
      const fruitSelect = document.querySelector("#single");
      let options_html = "<option>Select a fruit</option>";
      //
      fruitNames.forEach((fruit) => {
        options_html += `<option value='${fruit.name}'>${fruit.name}</option>`;
      });

      fruitSelect.innerHTML = options_html;

      //

      // fruitNames.forEach((fruit) => {
      //   const option = document.createElement("option");
      //   option.value = fruit.name;
      //   option.text = fruit.name;
      //   fruitSelect.appendChild(option);
      // });
    }
  }
  await selectFruitNames();

  $("button").click(async function () {
    const fruitName = $("#single").val();
    const fruitNames = await fetchFruits();
    fruitNames.forEach((fruit) => {
      if (fruit.name === fruitName) {
        const calories = fruit.nutritions.calories;
        $("#displayCalories").text(`${fruitName} has ${calories} calories.`);
        return;
      }
    });
  });

  new SlimSelect({
    select: "#single",
  });
});

// w.salam  library aw g aw g

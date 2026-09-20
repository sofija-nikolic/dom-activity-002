document.addEventListener("DOMContentLoaded", function () {
    // "content" is the JSON text loaded from paintings.json
    const paintings = JSON.parse(content);
    const list = document.querySelector("#paintings ul");

    // Build one thumbnail per painting
    for (const p of paintings) {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = "images/small/" + p.id + ".jpg";
        img.alt = p.title;
        img.dataset.id = p.id;   // remember which painting this thumbnail is
        li.appendChild(img);
        list.appendChild(li);
    }

    // (Steps 2-4 go here)
});/* add your code here */

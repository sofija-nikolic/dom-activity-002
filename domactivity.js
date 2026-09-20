document.addEventListener("DOMContentLoaded", function () {
    // "content" is the JSON text loaded from paintings.js
    const paintings = JSON.parse(content);
    const list = document.querySelector("#paintings ul");
    const figure = document.querySelector("figure");
    const description = document.querySelector("#description");

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

    // event delegation: one click handler on the list handles every thumbnail
    list.addEventListener("click", function (e) {
        if (e.target.nodeName !== "IMG") return;   // ignore clicks that aren't on a thumbnail

        figure.innerHTML = "";            // clear the old image and boxes
        description.textContent = "";

        // find the painting whose id matches the clicked thumbnail
        const painting = paintings.find(p => p.id === e.target.dataset.id);

        const big = document.createElement("img");
        big.id = "full";                  // the CSS styles #full
        big.src = "images/large/" + painting.id + ".jpg";
        big.alt = painting.title;
        figure.appendChild(big);

        document.querySelector("#title").textContent = painting.title;
        document.querySelector("#artist").textContent = painting.artist;

        // draw one rectangle (a div) for each feature of the painting
        for (const f of painting.features) {
            const box = document.createElement("div");
            box.className = "box";                       // CSS gives it the red border
            box.style.position = "absolute";
            box.style.left = f.upperLeft[0] + "px";
            box.style.top = f.upperLeft[1] + "px";
            box.style.width = (f.lowerRight[0] - f.upperLeft[0]) + "px";
            box.style.height = (f.lowerRight[1] - f.upperLeft[1]) + "px";
            figure.appendChild(box);

            // (Step 4 goes here)
        }
    });
});
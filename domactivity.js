document.addEventListener("DOMContentLoaded", function () {
    // paintings.js gives me a string called content, so I parse it into an array of objects
    const paintings = JSON.parse(content);

    const list = document.querySelector("#paintings ul");
    const figure = document.querySelector("figure");
    const description = document.querySelector("#description");

    // loop through the data and add a thumbnail to the list for each painting
    for (const p of paintings) {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = "images/small/" + p.id + ".jpg";
        img.alt = p.title;
        img.dataset.id = p.id;   // store the painting id on the image so I can look it up when it's clicked
        li.appendChild(img);
        list.appendChild(li);
    }

    // one listener on the <ul> handles clicks for all thumbnails (event delegation)
    list.addEventListener("click", function (e) {
        if (e.target.nodeName !== "IMG") return;   // if the click landed on the list but not on an image, do nothing

        figure.innerHTML = "";            // clear the previous painting and its rectangles
        description.textContent = "";

        // look up the painting in the array using the clicked thumbnail's id
        const painting = paintings.find(p => p.id === e.target.dataset.id);

        // show the large version of the painting
        const big = document.createElement("img");
        big.id = "full";                  // the CSS styles #full
        big.src = "images/large/" + painting.id + ".jpg";
        big.alt = painting.title;
        figure.appendChild(big);

        document.querySelector("#title").textContent = painting.title;
        document.querySelector("#artist").textContent = painting.artist;

        // make a div for each feature and place it on top of the painting
        for (const f of painting.features) {
            const box = document.createElement("div");
            box.className = "box";                       // CSS gives it the red border
            box.style.position = "absolute";
            box.style.left = f.upperLeft[0] + "px";
            box.style.top = f.upperLeft[1] + "px";
            // width = right x minus left x, height = bottom y minus top y
            box.style.width = (f.lowerRight[0] - f.upperLeft[0]) + "px";
            box.style.height = (f.lowerRight[1] - f.upperLeft[1]) + "px";
            figure.appendChild(box);

            // display this feature's text under the painting on hover
            box.addEventListener("mouseover", function () {
                description.textContent = f.description;
            });

            // remove the text when the mouse moves away
            box.addEventListener("mouseout", function () {
                description.textContent = "";
            });
        }
    });
});
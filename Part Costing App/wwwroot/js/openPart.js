function loadPartPage(partId) {
    var storedData = JSON.parse(localStorage.getItem("partData")) || [];
    var part = storedData.find(function (item) { return item.id === partId; });
    console.log(part.name)

    window.location.href = `/Privacy?name=${part.name}&id=${part.id}&material=${part.material}&finish=${part.finish}&units=${part.units}&discountPrice=${part.discountPrice}&discountPercent=${part.discountPercent}&priceBeforeDiscount=${part.priceBeforeDiscount}&cost=${part.cost}`;
}

function renderMenuParts() {
    console.log("Rendering Menu Parts...");
    var parentDiv = document.getElementById("menuListContainer");
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }

    var storedData = JSON.parse(localStorage.getItem("partData")) || [];
    storedData.forEach(function (part) {
        addPartToMenu(part);
    });
}

function addPartToMenu(part) {
    var newPart = document.createElement("div");
    var listContainer = document.getElementById("menuListContainer");

    listContainer.appendChild(newPart);
    newPart.setAttribute("part-id", part.id);

    newPart.innerHTML =
        `<button class="open-part" onclick="loadPartPage(${part.id})">
        <svg class="button-span" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="m212.24 83.76l-56-56A6 6 0 0 0 152 26H56a14 14 0 0 0-14 14v176a14 14 0 0 0 14 14h144a14 14 0 0 0 14-14V88a6 6 0 0 0-1.76-4.24ZM158 46.48L193.52 82H158ZM200 218H56a2 2 0 0 1-2-2V40a2 2 0 0 1 2-2h90v50a6 6 0 0 0 6 6h50v122a2 2 0 0 1-2 2Z" /></svg>
        <p>${part.name}</p>
    </button>
    <div>
        <button onclick="downloadPDF(${part.id})"> <svg class="button-span" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"/></svg></button>
        <button onclick="renamePart(${part.id})"> <svg class="button-span" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m15 16l-4 4h10v-4h-6m-2.94-8.81L3 16.25V20h3.75l9.06-9.06l-3.75-3.75M5.92 18H5v-.92L12.06 10l.94.94L5.92 18m12.79-9.96c.39-.39.39-1.04 0-1.41l-2.34-2.34a1.001 1.001 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83Z" /></svg></button>
        <button onclick="deletePart(${part.id})"> <svg class="button-span" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z" /></svg></button>
    </div>`;
}

function clearLocalStorage() {
    localStorage.removeItem("partData");
}

renderMenuParts()
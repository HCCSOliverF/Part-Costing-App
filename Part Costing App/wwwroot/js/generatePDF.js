async function createPart(form) {
    fetch(`/Index?handler=CreatePart&Name=${form.name}&Units=${form.units}&Material=${form.material}&Finish=${form.finish}`)
        .then(response => response.json())
        .then(part => {
            console.log("Response .. ... ... ... ...");
            console.log(part);
            console.log("... ... ... ... ... ... ...");
            console.log(part.name);
            console.log(part.id)
            console.log(part.material)
            console.log(part.finish)
            console.log(part.units)
            console.log(part.discountPrice)
            console.log(part.discountPercent)
            console.log(part.priceBeforeDiscount)
            console.log(part.cost);

            // Retrieve existing data from localStorage
            let existingData = JSON.parse(localStorage.getItem("partData")) || [];

            // If existingData is not an array, initialize it as an empty array
            if (!Array.isArray(existingData)) {
                existingData = [];
            }

            // Append the new part to the existing data
            existingData.push(part);

            // Store the updated data back into localStorage
            localStorage.setItem("partData", JSON.stringify(existingData));

            console.log("... ... ... ... ... ... ...");
            console.log(existingData)


            /*----------------------------------------------------------------------------------------------------*/
/*            console.log("Next... Rendering Menu ... Next");
            var parentDiv = document.getElementById("menuListContainer");
            while (parentDiv.firstChild) {
                parentDiv.removeChild(parentDiv.firstChild);
            }

            var storedData = JSON.parse(localStorage.getItem("partData")) || [];
            storedData.forEach(function (part) {
                addPartToMenu(part);
            });*/
/*----------------------------------------------------------------------------------------------------*/
            renderMenuParts();
            setTimeout(function () { closePopup("partWindowOverlay") }, 2000);
        })
        .catch(error => {
            console.error("Error fetching or storing part data:", error);
        });
}

/*-----------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------*/




// Part Download Icon - onClick
function downloadPDF(partID) {
    savePdfCopy()
    console.log("downloaded")
}
// Part Rename Icon - onClick
function renamePart(partID) {
    console.log("renamed")
    renderMenuParts()
}
// Part Bin Icon - onClick
/*function deletePart(partID) {
    var existingData = JSON.parse(localStorage.getItem("userData")) || [];
    var newData = existingData.filter(function (part) { return part.id !== partID;});
    localStorage.setItem("userData", JSON.stringify(newData));

    console.log("deleted")
    renderMenuParts()
}*/


function deletePart(partID) {
    console.log("Delete Part")
    var existingData = JSON.parse(localStorage.getItem("partData")) || [];

    var newData = existingData.filter(function (part) {return part.id !==partID;});

    localStorage.setItem("partData", JSON.stringify(newData));
    renderMenuParts();
}
// Delete All Parts - onClick

function deleteAllParts() {
    console.log("--All parts deleted--")
    clearLocalStorage()
    renderMenuParts()
}
// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
function openHomePage() { window.location.href = `/Index`; }

// Reset New Part Popup
function resetPartPopup() {
    document.getElementById('uploadFileContent').style.display = 'flex';
    document.getElementById('questionnaireContent').style.display = 'none';

    document.getElementById('partWindowPopup').style.width = '1000px';
    document.getElementById('partWindowPopup').style.height = '550px';

    currentSlide = 0; showSlide(currentSlide);
    document.getElementById('next').style.display = "flex";
    document.getElementById('finish').style.display = "none";

    // - - - - -

    document.getElementById('questionnaireContent').style.padding = "50px";

    document.getElementById('questionnaireTitle').style.display = "flex";
    document.getElementById('progressBar').style.display = "flex";
    document.getElementById('buttons').style.display = "flex";
    document.getElementById('closeButton_PartWindow').style.display = "flex";

/*    document.getElementById('form').reset();*/
}

// Open / Close Popups

// Open
function openPopup(targetPopupId, targetOverlayId) {
    var popup = document.getElementById(targetPopupId);
    var overlay = document.getElementById(targetOverlayId);

    overlay.style.display = 'flex';
    popup.style.opacity = '0%';

    setTimeout(function () { popup.style.animation = `popupAniation_Open .31s cubic-bezier(0.7,0.2,0.05,1.0)`; popup.style.opacity = '100%'; }, 200);
    popup.addEventListener('animationend', function () { popup.style.animation = 'none'; }, { once: true });

    overlay.style.animation = `overlayAniation_Open .4s cubic-bezier(0.7,0.2,0.05,1.0)`;
    overlay.addEventListener('animationend', function () { overlay.style.animation = 'none'; }, { once: true });
}

// Close
function closePopup(targetOverlayId) {
    var overlay = document.getElementById(targetOverlayId);

    overlay.style.animation = `overlayAniation_Close .21s cubic-bezier(0.7,0.2,0.05,1.0)`;
    setTimeout(function () {
        overlay.style.animation = 'none'; overlay.style.display = 'none'

        if (targetPopupId = 'partWindowOverlay') { resetPartPopup() }
    }, 200);
}
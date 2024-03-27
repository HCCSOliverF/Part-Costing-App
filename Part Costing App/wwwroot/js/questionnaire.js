// Proceed to Questionnaire

function proceedToQuestionnaire() {
    console.log("Proceeding...")

    var popup = document.getElementById('partWindowPopup');
    var popupContent = document.getElementById('popup-content');
    var uploadContent = document.getElementById('uploadFileContent');
    var questionnaireContent = document.getElementById('questionnaireContent');

    const timing = 1;
    const animationTime = .2;

    popup.style.animation = `transitionToQuestionnaire ${timing}s cubic-bezier(0.7,0.2,0.05,1.0)`;

    popup.addEventListener('animationend', function () {
        popup.style.width = '1000px';
        popup.style.height = '700px';
    }, { once: true });


    uploadContent.style.animation = `fade-out ${animationTime}s cubic-bezier(0.7,0.2,0.05,1.0)`;
    setTimeout(function () { uploadContent.style.display = 'none'; }, animationTime);

    setTimeout(function () {
        questionnaireContent.style.display = 'flex';
        questionnaireContent.style.animation = `fade-in ${animationTime}s cubic-bezier(0.7,0.2,0.05,1.0)`;
    }, 1000 * (timing - animationTime));
}


// QUESTIONNAIRE - QUESTIONNAIRE

let currentSlide = 0;
const slides = document.querySelectorAll('.form-slide');
const progressBarInner = document.querySelector('.progress-bar-inner');

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((currentSlide) / (slides.length - 2)) * 100;
    progressBarInner.style.width = `${progress}%`;
}

function nextSlide() {
    if (currentSlide < slides.length - 2) {
        currentSlide++;
        showSlide(currentSlide);
    } if (currentSlide == slides.length - 2) {
        document.getElementById('next').style.display = "none";
        document.getElementById('finish').style.display = "flex";
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    } if (currentSlide == slides.length - 3) {
        document.getElementById('next').style.display = "flex";
        document.getElementById('finish').style.display = "none";
    }
}

function finishForm() {
    const formData = {
        name: document.getElementById('q1').value,
        units: document.getElementById('q2').value,
        material: document.getElementById('q3').value,
        finish: document.getElementById('q4').value
    };

    if (Object.values(formData).some(val => val === "")) {
        alert("You have not entered a value for one or more questions")
    } else {
        pdfLoadingScreen()
        createPart(formData)
        console.log(`Form data:\nQ1: ${formData.name}\nQ2: ${formData.units}\nQ3: ${formData.material}`);
    }
}

function pdfLoadingScreen() {
    showSlide(slides.length - 1)
    document.getElementById('questionnaireContent').style.padding = "10px";

    document.getElementById('questionnaireTitle').style.display = "none";
    document.getElementById('progressBar').style.display = "none";
    document.getElementById('buttons').style.display = "none";
    document.getElementById('closeButton_PartWindow').style.display = "none";

    let counter = 1;
    const loadingText = document.getElementById('loadingText');
    setInterval(function updateLoadingTXT() {
        let dots = '.'.repeat(counter);
        loadingText.textContent = `Generating PDF${dots}`;

        if (counter == 3) { counter = 0 }; counter++
    }, 400);
}
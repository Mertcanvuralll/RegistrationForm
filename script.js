document.addEventListener("DOMContentLoaded", function () {
    const areaCodeSelect = document.getElementById("areaCode");
    const companySelect = document.getElementById("company");
    const subjectSelect = document.getElementById("subject");
    const ads = document.querySelectorAll(".sticky-ad");

    const areaCodes = [
        "530", "531", "532", "533", "534", "535", "536", "537", "538", "539",
        "540", "541", "542", "543", "544", "545", "546", "547", "548", "549",
        "500", "501", "502", "503", "504", "505", "506", "507", "508", "509"
    ];

    areaCodes.forEach(code => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = `+90 ${code}`;
        areaCodeSelect.appendChild(option);
    });

    const mockyUrl = "https://run.mocky.io/v3/af4ddd7f-bb1e-4131-b2a2-783a4ff0e70b";

    fetch(mockyUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            companySelect.innerHTML = '<option value="">Company</option>';
            subjectSelect.innerHTML = '<option value="">Choose option...</option>';

            data.companies.forEach((company, index) => {
                const option = document.createElement("option");
                option.value = index + 1;
                option.textContent = company;
                companySelect.appendChild(option);
            });

            data.subjects.forEach((subject, index) => {
                const option = document.createElement("option");
                option.value = index + 1;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching Mocky data:", error);
            alert("Could not load dropdown data. Please try again later.");
        });

    ads.forEach(ad => {
        ad.querySelector(".close-ad").addEventListener("click", function () {
            ad.style.display = "none";
        });
    });

    document.getElementById("registrationForm").addEventListener("submit", function (e) {
        const phoneInput = document.getElementById("phone");
        const phonePattern = /^[0-9]{7}$/;
        if (!phonePattern.test(phoneInput.value)) {
            e.preventDefault();
            alert("Please enter a valid Turkish phone number!");
        }
    });
});

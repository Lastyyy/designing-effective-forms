let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            const countrySelect = document.getElementById('country');
            if (countrySelect) {
                const options = countrySelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === country) {
                        options[i].selected = true;
                        break;
                    }
                }
            } else {
                console.error('Element o id "country" nie istnieje');
            }
            
            getCountryCode();
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

getCountryByIP();

function getCountryCode() {
    const countryName = document.getElementById('country').value;
    console.log(countryName)
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("");
        const countryCodeElem = document.getElementById("countryCode");
        countryCodeElem.value = countryCode;
        const vatCode = data[0].cca2;
        const europeanCountry = data[0].region;
        console.log(europeanCountry);
        const vatUE = document.getElementById("vatUE");
        if(europeanCountry == "Europe")
        {
            vatUE.checked = true;
        }
        else
        {
            vatUE.checked = false;
        }
        const vatNumberInput = document.getElementById('vatNumber');
        if (vatNumberInput) {
            vatNumberInput.value = vatCode;
        } else {
            console.error('Element o id "vatNumber" nie istnieje');
        }
        
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}

// Funkcja do aktualizacji danych w polu "Dane do faktury"
function fillInvoiceData() {
    // Pobierz wartości z pól formularza
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('exampleInputEmail1').value;
    const city = document.getElementById('city').value;
    const zipCode = document.getElementById('zipCode').value;

    // Utwórz ciąg znaków zawierający dane do faktury
    const invoiceData = `Imię: ${firstName}\nNazwisko: ${lastName}\nEmail: ${email}\nMiasto: ${city}\nKod pocztowy: ${zipCode}`;

    // Ustaw wartość pola textarea o id "invoiceData" na utworzony ciąg znaków
    const invoiceDataTextarea = document.getElementById('invoiceData');
    if (invoiceDataTextarea) {
        invoiceDataTextarea.value = invoiceData;
    } else {
        console.error('Element o id "invoiceData" nie istnieje');
    }
}

document.getElementById('country').addEventListener('change', getCountryCode)

// Dodaj nasłuchiwania na zdarzenie zmiany wartości w polach formularza
document.getElementById('firstName').addEventListener('change', fillInvoiceData);
document.getElementById('lastName').addEventListener('change', fillInvoiceData);
document.getElementById('exampleInputEmail1').addEventListener('change', fillInvoiceData);
document.getElementById('city').addEventListener('change', fillInvoiceData);
document.getElementById('zipCode').addEventListener('change', fillInvoiceData);




(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);
    
    fetchAndFillCountries();
})()

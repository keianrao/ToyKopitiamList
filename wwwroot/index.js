
var domKopitiams;

const tiamlistAPI = "http://localhost:5289";

function verifyResponse(response)
{
    if (!response.ok) return Promise.reject();

    let ct = response.headers.get("Content-Type");
    let ect = "application/json; charset=utf-8";
    if (ct !== ect) return Promise.reject();

    return response.json();
}

function render(kopitiams)
{
    if (kopitiams.length == 0) return;

    domKopitiams.innerText = "";

    for (let kopitiam of kopitiams)
    {
        let addee = document.createElement("div");
        addee.setAttribute("class", "kopitiam");

        let domName = document.createElement("h3");
        domName.innerText = kopitiam["name"];

        let domAddress = document.createElement("span");
        domAddress.setAttribute("class", "address")
        domAddress.innerText = kopitiam["address"];

        let domDateAdded = document.createElement("span");
        domDateAdded.setAttribute("class", "dateAdded");
        domDateAdded.innerText = kopitiam["dateAdded"];
        // (未) Parse the date into something readable & relative

        // (未) Use coordinates to init an OSM thumbnail

        addee.appendChild(domName);
        addee.appendChild(domAddress);
        addee.appendChild(domDateAdded);
        domKopitiams.appendChild(addee);
    }
}

window.addEventListener("load", function() {
    domKopitiams = document.getElementById("kopitiams");
    fetch(tiamlistAPI + "/entries")
        .then(verifyResponse)
        .then(render);
});

var domKopitiams;
const tiamlistAPI = "http://localhost:5289";

/*
function createOSMMap(latitude, longitude, target) {
    let layer = new ol.renderer.canvas.TileLayer({
        source: new ol.source.OSM()
    });
    let view = new ol.View({
        center: ol.proj.fromLonLat([latitude, longitude]),
        zoom: 8
    });
    return new ol.Map({
        target: target,
        layers: [ layer ],
        view: view,
        controls: []
    });
}
*/

function verifyResponse(response)
{
    if (!response.ok) return Promise.reject();

    let ct = response.headers.get("Content-Type");
    let ect = "application/json; charset=utf-8";
    if (ct !== ect) return Promise.reject();

    return response.json();
}

function toRelativeTime(seconds)
{
    let returnee = {};

    returnee.future = seconds < 0;

    returnee.days = Math.floor(seconds / (60*60*24));
    seconds -= returnee.days * 60*60*24;

    returnee.hours = Math.floor(seconds / (60*60));
    seconds -= returnee.hours * 60*60;

    returnee.minutes = Math.floor(seconds / 60);
    seconds -= returnee.minutes * 60;

    returnee.seconds = seconds;

    return returnee;
}

function toRelativeTimeString(rt)
{
    if (rt.future) return "future";

    let suffix = function(quantity, singularSuffix) {
        let prefix = quantity + " ";
        if (quantity == 1) return prefix + singularSuffix;
        else return prefix + singularSuffix + "s";
    }

    let returnee = "";
    if (rt.days) returnee += suffix(rt.days, "day") + " ";
    if (rt.hours) returnee += suffix(rt.hours, "hour") + " ";
    if (rt.minutes) returnee += suffix(rt.minutes, "minute") + " ";
    if (returnee === "") returnee = "just now";
    else returnee += " ago";
    return returnee;
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

        let dateAdded = new Date(kopitiam["dateAdded"]);
        let passageSeconds = (Date.now() - dateAdded) / 1000;
        let passage = toRelativeTime(passageSeconds);
        domDateAdded.innerText = toRelativeTimeString(passage);

        let domMap = document.createElement("div");
        domMap.setAttribute("class", "map");

        let domPanel1 = document.createElement("div");
        domPanel1.setAttribute("class", "panel");
        
        addee.appendChild(domMap);
        domPanel1.appendChild(domName);
        domPanel1.appendChild(domAddress);
        addee.appendChild(domPanel1);
        addee.appendChild(domDateAdded);
        domKopitiams.appendChild(addee);

        /*
        createOSMMap(
            kopitiam["latitude"],
            kopitiam["longitude"],
            domMap);
        */
    }
}

function renderError(error) {
    console.error(error);
    let placeholder = document.getElementsByClassName(
        "kopitiam placeholder")[0];
    if (placeholder) {
        placeholder.innerText = "(Failed to fetch list of kopitiams.)";
        placeholder.setAttribute("class", "kopitiam placeholder error");
    }
}

window.addEventListener("load", async function() {
    domKopitiams = document.getElementById("kopitiams");
    await fetch(tiamlistAPI + "/entries")
        .then(verifyResponse)
        .then(render)
        .catch(renderError);
});
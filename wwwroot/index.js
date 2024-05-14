
var domKopitiams;
const TIAMLIST_API = "http://localhost:5289";

const BINGMAPS_API = "https://dev.virtualearth.net/REST/v1/Imagery/Map";

const BINGMAPS_KEY = atob(
    "QW1QRWRNUzA4VHB1OXN6Nm45dFJldE" +
    "10ZWg1UDdySm5uVkl5UUctQXk0SkVt" +
    "QUR5RlNMZGlkMENXd0xXa1BoWg==");
/*
* Needs an active Bing Maps API key here. The current
* one may be expired shortly, so substitute your own..!
* And obfuscating not for actual security, but just basic
* defence against scrapers..
*/

function createEmbedMap(latitude, longitude, target) {
    /*
    OpenLayers 9. Failed to reference itself properly in code;
    errors during render.

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
    */
    /*
    OpenLayers 2. Fails to render anything.

    let mapnik = new OpenLayers.Layer.OSM();
    let coords = new OpenLayers.LonLat(longitude, latitude);
    coords = coords.transform("EPSG:4326", "EPSG900913");
    let zoom = 15;

    let map = new OpenLayers.Map(target);
    map.addLayer(mapnik);
    map.setCenter(coords, zoom);
    */

    let imagerySet = "Road";
    let coords = latitude + "," + longitude;
    let zoomLevel = 18;

    let url = BINGMAPS_API;
    url += "/" + imagerySet;
    url += "/" + coords;
    url += "/" + zoomLevel;
    url += "?key=" + BINGMAPS_KEY;

    target.setAttribute("src", url);
}

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

        let domMap = document.createElement("img");
        domMap.setAttribute("class", "map");

        let domPanel1 = document.createElement("div");
        domPanel1.setAttribute("class", "panel");
        
        addee.appendChild(domMap);
        domPanel1.appendChild(domName);
        domPanel1.appendChild(domAddress);
        addee.appendChild(domPanel1);
        addee.appendChild(domDateAdded);
        domKopitiams.appendChild(addee);

        createEmbedMap(
            kopitiam["latitude"],
            kopitiam["longitude"],
            domMap);
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
    await fetch(TIAMLIST_API + "/entries")
        .then(verifyResponse)
        .then(render)
        .catch(renderError);
});
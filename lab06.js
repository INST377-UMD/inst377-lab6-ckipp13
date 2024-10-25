var map = L.map('map').setView([39.50, -98.35], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

const coordinates = [];
for (let i = 0; i < 3; i++) {
    const lat = getRandomInRange(30, 35, 3);
    const lon = getRandomInRange(-100, -90, 3);
    coordinates.push({ lat, lon });
}
    
async function getLocalities() {
    for (let i = 0; i < coordinates.length; i++) {
        const latitude = coordinates[i].lat;
        const longitude = coordinates[i].lon;
        await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
                var marker = L.marker([latitude, longitude]).addTo(map);
                //how to keep markers in numerical order?
                const info = document.getElementById("markers");
                info.innerHTML += `Marker ${i + 1}: Latitude: ${latitude}, Longitude: ${longitude}<br>Locality: ${data.locality}<br>`;
        });
    }
    map.fitBounds(coordinates.map(coord => [coord.lat, coord.lon]));
}
window.onload = getLocalities;
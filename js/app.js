// Random number from 1 - 10

let randomNumber = Math.floor(Math.random() * 10) + 1;
console.log(randomNumber);

//Select image
const searchSection = document.querySelector(".search-section");

//Background Media Queries
const mediaQuery = window.matchMedia("(min-width: 789px)");

function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    console.log("Media Query Matched!");
    searchSection.style.background = `url('./images/summer/${randomNumber}.jpeg') center/cover no-repeat`;
  } else {
    searchSection.style.background = `darkturquoise`;
  }
}

// Register event listener
mediaQuery.addListener(handleTabletChange);

// Initial check
handleTabletChange(mediaQuery);

/*
=============
Gooogle Map Implement
=============
*/

function initMap() {
  // The location of NYC
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.78343, lng: -73.96625 },
    zoom: 11,
  });

  // Input field where you search a city
  var input = document.getElementById("searchInput");
  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Autocomplete
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  // The Marker
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  //autocomplete eventListener
  autocomplete.addListener("place_changed", function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    var theValue = input.value;
    var res = theValue.split(",");
    console.log(res);
    console.log(res[0]);
    console.log(theValue);
    console.log(input.value);

    // If the place doesn't have a geometry, alert a message
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Marker icon, size and location
    marker.setIcon({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35),
    });
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    //   Join marker window names
    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    //   styling marker window
    infowindow.setContent(
      "<div><strong>" + place.name + "</strong><br>" + address
    );
    infowindow.open(map, marker);
  });
}

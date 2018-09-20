var myExtObject = (function () {
    return {
        resetImage: function (url, image) {
            //$("#profile-img-tag").attr("src", url + "/assets/images/employeeimages/" + image);
            $("#profile-img-tag").attr("src", url + "/" + image);
        },

        GetLocation: function (country, state, city) {
            debugger
            //var country = ""; var state = ""; var city = ""; 
            var address1 = ""; var address2 = ""; var postalcode = "";
            // < !--postalcode = $("#txtPostalCode").val(); -->
            // < !--country = $("#country :selected").text(); -->
            // < !--state = $("#State :selected").text(); -->
            // < !-- if (state == "--Select--")-->
            // < !--{ state = ""; } -->
            // < !-- if (country == "--Select--")-->
            // < !--{ country = ""; } -->
            // < !--city = $("#txtCity").val(); -->
            // < !--address1 = $("#txtAddress1").val(); -->
            // < !--address2 = $("#txtAddress2").val(); -->
            postalcode = "";

            // country = country;
            // state = state;

            // country = "Afghanistan";
            // state = "Badakhshan";

            // country = "Pakistan";
            // state = "Punjab";

            country = "India";
            state = "Uttar Pradesh";

            // < !-- if (state == "--Select--")-->
            // < !--{ state = ""; } -->
            // < !-- if (country == "--Select--")-->
            // < !--{ country = ""; } -->
            // < !--city = $("#txtCity").val(); -->

            //city = city;

            city = "Lucknow";

            //     < !--address1 = $("#txtAddress1").val(); -->
            // < !--address2 = $("#txtAddress2").val(); -->
            address1 = "";
            address2 = "";
            var geocoder = new google.maps.Geocoder();
            var address = country + " " + state + " " + city + " " + address1 + " " + address2 + " " + postalcode;
            //alert(city);
            //  alert(address);
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    // alert("Latitude: " + latitude + "\nLongitude: " + longitude);
                    getmap(latitude, longitude);
                } else {
                    //  alert("Request failed to Load Map.")
                }
            });
        },


        //   ,func2: function() {
        //     alert('function 2 called');
        //   }

    }
})(myExtObject || {})

// $(document).ready(function () {
// });

getmap = function (lati, longi) {
    var lat = lati == "" ? '26.846695' : lati;// document.getElementById('txtlat').value;
    var lon = longi == "" ? '80.946167' : longi;// document.getElementById('txtlon').value;

    var myLatlng = new google.maps.LatLng(lat, lon) // This is used to center the map to show our markers
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        maxZoom: 14,
        minZoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        marker: true
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng
    });
    marker.setMap(map);
}

selectFile = function () {
    $("#photo").click();
};

readURL = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.profile-img-tag').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
};



// remove_class = function () {
//     var pass = $("#password").val();
//     var conPass = $("#confirm_password").val();
//     var email = $("#user_email").val();
//     var isInvalidClass = $("#user_email").parent().parent().parent().parent().hasClass("mat-form-field-invalid");
//     if (pass == conPass) {
//         $("#confirm_password").parent().parent().parent().parent().removeClass("mat-form-field-invalid");
//         if (!isInvalidClass && email != "") {
//             $("#btnRegister").removeAttr("disabled");
//         }
//         else {
//             $("#btnRegister").attr("disabled", "disabled");
//         }
//     }
//     else {
//         $("#confirm_password").parent().parent().parent().parent().addClass("mat-form-field-invalid");
//         $("#btnRegister").attr("disabled", "disabled");
//     }
// };
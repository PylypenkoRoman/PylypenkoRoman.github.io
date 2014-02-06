            function initialize() {
                        var myLatlng = new google.maps.LatLng(50.44906075,30.5281198);
                        var myOptions = {
                        zoom: 17,
                        center: myLatlng,
                        markers: myLatlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                                        }
                        var map = new google.maps.Map(document.getElementById("geolocation"), myOptions);
                        var marker = new google.maps.Marker({
                                     position: myLatlng,
                                     map: map,
                                     title: "maidan"
                                     });
		}
            function loadScript() {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
                document.body.appendChild(script);
            }
            window.onload = loadScript;
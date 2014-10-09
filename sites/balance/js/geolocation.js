            function initialize() {
                        var myLatlng = new google.maps.LatLng(56.36125646,37.52896428);
                        var myOptions = {
                        zoom: 15,
                        center: myLatlng,
                        markers: myLatlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                                        }
                        var map = new google.maps.Map(document.getElementById("geolocation"), myOptions);
                        var marker = new google.maps.Marker({
                                     position: myLatlng,
                                     map: map,
                                     title: " OOO Вертикаль "
                                     });
		}
            function loadScript() {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
                document.body.appendChild(script);
            }
            window.onload = loadScript;
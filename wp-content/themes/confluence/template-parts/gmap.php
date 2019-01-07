<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 1/3/19
 * Time: 4:17 PM
 */

?>

<div class="map" style="">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12 nopad">

                <div id="googleMap" style="width:100%;height:400px;"></div>

                <script>
                    function myMap() {
                        var mapProp= {
                            center:new google.maps.LatLng(39.655263,-106.828651),
                            zoom:10,
                        };
                        var myCenter = new google.maps.LatLng(39.655263,-106.828651);
                        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
                        var marker = new google.maps.Marker({position:myCenter});
                        marker.setMap(map);
                        var infowindow = new google.maps.InfoWindow({
                            content:"A5 Adventures llc."
                        });

                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map,marker);
                        });
                    }
                </script>

                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqmzh0V1FRIbjJZ8oqJfE6AZnAX94XuRQ&callback=myMap"></script>

            </div>
        </div><div class="row">
            <div class="col-xs-12">

                <?php
                $address = a5_get_option('address');
                $lat = a5_get_option('latitude');
                $lon = a5_get_option('longitude');
                ?>
                <div class="map-wrapper">
                    <?php
                    $args = array(
                        "address" => $address,
                        "latitude" => $lat,
                        "longitude" => $lon,
                        "height" => '500px',
                        "zoom" => '17',
                    );
                    //echo my_map($args);
                    ?>

                </div>
            </div>
        </div>
    </div>
</div>

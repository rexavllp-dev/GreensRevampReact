import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import "./GoogleMap.scss"
import CustomInput from "@/library/input/custominput/CustomInput";
import { Skeleton } from "@nextui-org/react";


const libraries = ["places"]; // Load the 'places' library for the Places API
const apiKey = "AIzaSyAW9GXjTPVClacipiHAb1moz-c9RaaoJIw";
const Maps = ({ formData, handleInputChange, setFormData, citiesByCountryCode }) => {
    const [mapCenter, setMapCenter] = useState({ lat: parseFloat(formData.location_lat), lng: parseFloat(formData.location_long) });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCJc4SaSyYy4gApcLv0cQTWsasP5d2Kd5w",
        libraries
    });

    const [map, setMap] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    // useEffect(() => {
    //     const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyCJc4SaSyYy4gApcLv0cQTWsasP5d2Kd5w`;
    //     // https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY

    //     try {
    //         const response = fetch(url);
    //         const data = response.json();

    //         if (data.status === "OK") {
    //             const placeDetails = data.result;
    //             console.log("Place Details:", placeDetails);
    //         } else {
    //             console.error("Error fetching place details:", data.status);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching place details:", error);
    //     }
    // }, [])

    const onMapLoad = (map) => {
        setMap(map);
    };

    useEffect(() => {
        console.log(parseFloat(formData.location_lat), parseFloat(formData.location_long))
        if (isLoaded && formData.location_lat && formData.location_long) {
            setMapCenter({ lat: parseFloat(formData.location_lat), lng: parseFloat(formData?.location_long) });

        }
    }, [formData, isLoaded])

    const onAutocompleteLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    };


    const handlePlaceSelect = async () => {
        if (autocomplete !== null) {
            // Get selected place from autocomplete
            const place = autocomplete?.getPlace();
            console.log("Selected Place:", place);
            setSelectedPlace(place);
            // console.log(place.place_id);
            // console.log(place.name);
            // console.log(place.formatted_address);

            const placeName = place.name || '';
            const formattedAddress = place.formatted_address || '';
            let combinedLocation = "";
            combinedLocation = `${placeName}, ${formattedAddress}`;

            let countryName = '';
            let countryCode = '';
            
            // Find the country component in address_components
            const countryComponent = place.address_components.find(
                (component) => component.types.includes("country")
            );

            if (countryComponent) {
                countryName = countryComponent.long_name;
                countryCode = countryComponent.short_name;
            }

            setFormData({
                ...formData,
                // event_venue_id: combinedLocation,
                place: placeName,
                address_line_1: combinedLocation,
                longitude: place.geometry?.location.lng(),
                latitude: place.geometry?.location.lat(),
                country_code: countryCode
            });

            // Update the map's center to the selected place's location
            if (place.geometry && place.geometry?.location) {
                const location = place.geometry.location;
                setMapCenter({ lat: location.lat(), lng: location.lng() });
            }
        }
    };



    return (
        <div className="googlemap" >
            {!isLoaded ? (
                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                <div className="h-24 rounded-lg bg-secondary">Loading...</div>
              </Skeleton>
            ) : (
                <>
                    <div className="form_section">
                        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={handlePlaceSelect}>
                            {/* <CustomInputText placeholder='Enter Venue Name'
                                name='address_line_1' label='Venue Name'
                                value={formData.address_line_1} onChange={handleInputChange}
                                required={true}
                            /> */}
                             <CustomInput name='address_line_1' type='text'
                                maxLength={100}
                                placeholder='Address Line 1' label={'Address Line 1'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.address_line_1}
                            />
                        </Autocomplete>
                    </div>

                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "333px", marginTop: '24px' }}
                        mapContainerClassName="map-container"
                        center={mapCenter}
                        zoom={15}
                    >
                        {selectedPlace &&
                            <Marker
                                position={{
                                    lat: selectedPlace?.geometry?.location?.lat(),
                                    lng: selectedPlace?.geometry?.location?.lng(),
                                }}
                            />
                        }
                    </GoogleMap>

                </>
            )}
        </div>
    )
}

export default Maps
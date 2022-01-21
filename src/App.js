import { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import { getPlacesData, getWeatherData } from "./api";
function App() {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [mapChildClicked, setMapChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState(0);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoordinates({ lat: latitude, lng: longitude });
            }
        );
    }, []);

    useEffect(() => {
        const filterPlaces = places?.filter((place) => place.rating > rating);
        setFilteredPlaces(filterPlaces);
    }, [rating]);

    useEffect(() => {
        // console.log("coordinates", coordinates);
        // console.log("bounds", bounds);
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);
            getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
                setWeatherData(data);
            });
            getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
                // console.log(data);
                setPlaces(
                    data?.filter((place) => place.name && place.num_reviews > 0)
                );
                setFilteredPlaces([]);
                setIsLoading(false);
            });
        }
    }, [type, bounds]);
    return (
        <>
            <CssBaseline />

            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        mapChildClicked={mapChildClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setBounds={setBounds}
                        setCoordinates={setCoordinates}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setMapChildClicked={setMapChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;

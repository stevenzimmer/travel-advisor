import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
// import LocationOutlinedIcon from "@material-ui/icons/LocationOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
import { mapStyles } from "./mapStyles";

const Map = ({
    coordinates,
    setCoordinates,
    setBounds,
    places,
    setMapChildClicked,
    weatherData,
}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery("(min-width:600px)");

    console.log("props weather data", weatherData);

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: mapStyles,
                }}
                onChange={(e) => {
                    console.log("on change e", e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                margin={[50, 50, 50, 50]}
                onChildClick={(e) => {
                    // console.log(e);
                    setMapChildClicked(e);
                }}
            >
                {places?.map((place, i) => {
                    return (
                        <div
                            className={classes.markerContainer}
                            lat={place.latitude}
                            lng={place.longitude}
                            key={i}
                        >
                            {!isDesktop ? (
                                <>
                                    <LocationOnOutlinedIcon
                                        color="primary"
                                        fontSize="large"
                                    />
                                </>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography
                                        className={classes.Typography}
                                        variant="subtitle2"
                                    >
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={
                                            place.photo
                                                ? place.photo.images.large.url
                                                : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                                        }
                                        alt={place.name}
                                    />
                                    <Rating
                                        size="small"
                                        value={Number(place.rating)}
                                        readOnly
                                    />
                                </Paper>
                            )}
                        </div>
                    );
                })}
                {/* {weatherData?.list?.map((data, i) => {
                    console.log("weather data", data);
                    return (
                        <div
                            className="weather-data"
                            key={i}
                            lat={data.coord.lat}
                            lng={data.coord.lon}
                        >
                            <img
                                alt={data.weather[0].description}
                                height="100"
                                width="100"
                                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                            />
                        </div>
                    );
                })} */}
            </GoogleMapReact>
        </div>
    );
};

export default Map;

import { useState, useEffect, useRef, createRef } from "react";
import {
    CircularProgress,
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@material-ui/core";
import useStyles from "./styles";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
export default function List({
    places,
    mapChildClicked,
    isLoading,
    type,
    setType,
    rating,
    setRating,
}) {
    const classes = useStyles();

    const [elRefs, setElRefs] = useState([]);
    // console.log({ mapChildClicked });

    useEffect(() => {
        const refs = Array(places?.length)
            .fill()
            .map((_, i) => elRefs[i] || createRef());
        setElRefs(refs);
    }, [places]);
    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Restaurants, Hotels, Attractions around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <MenuItem value={0}>All</MenuItem>

                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => {
                            return (
                                <Grid ref={elRefs[i]} item key={i} xs={12}>
                                    <PlaceDetails
                                        place={place}
                                        selected={Number(mapChildClicked) === i}
                                        refProp={elRefs[i]}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
            {places.length === 0 && (
                <Typography>There are no {type} in this area</Typography>
            )}
        </div>
    );
}

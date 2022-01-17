import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard'
import DetailsTable from "./DetailsTable";
import Spinner from './Spinner';
// import Header from './Header';

export const Main = () => {

    const [initialData, setInitialData] = useState(null);
    const [propertyApiUrl, setPropertyApiUrl] = useState(null);
    const [token, setToken] = useState(null);
    const [propertiesData, setPropertiesData] = useState([]);
    const [propertyData, setPropertyData] = useState([]);
    const [detailsShown, setPropertiesShown] = useState(false);
    const [propertySelected, setPropertySelected] = useState(null);
    const [hasDetails, setHasDetails] = useState(null);
    const [fetching, setFetching] = useState(true);

    const loadPropertiesData = (url, token) => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({token}),
        })
            .then(res => res.json())
            .then(res => {
                setPropertiesData(res)
                setFetching(false);
            })
            .catch((err) => {
                alert(err);
            })
    }

    const getPropertyData = (propertyId) => {
        if (propertyId !== propertySelected) {
            setFetching(true);
            setPropertySelected(propertyId);
            fetch(propertyApiUrl.replace('[PROPERTY ID]', propertyId), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({token}),
            })
                .then(res => res.json())
                .then(res => {
                    setPropertyData(res)
                    setPropertiesShown(true);
                    setFetching(false);
                    res.length === 0
                        ? setHasDetails(false)
                        : setHasDetails(true)
                })
                .catch((err) => {
                    alert(err);
                })
        }
    }

    const init = () => {
        fetch('https://talent.ender.com/fe-challenge/instructions', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
        })
            .then(res => res.json())
            .then(res => {
                setInitialData(res);
                setPropertyApiUrl(res.api.propertyApiUrl);
                //  I know this isn't super secure but due to
                //  time restraints this is what I am doing for now
                setToken(res.api.token);
                loadPropertiesData(res.api.propertiesApiUrl, res.api.token);
            })
            .catch((err) => {
            alert(err);
            })
    }

    useEffect(() => {
        if (!initialData) {
            init();
        }
    });

    if (fetching) return <Spinner/>

    return (
        <>
            <div id='main-component'>
                <section id='cardContainer'>
                    {
                        propertiesData.map((item) => {
                            return (
                                <PropertyCard
                                    data={item}
                                    callBack={(propertyId) => getPropertyData(propertyId)}
                                />
                            )
                        })
                    }
                </section>
                {detailsShown && hasDetails && (
                    <DetailsTable propertyData={propertyData}/>
                )}
                {
                    hasDetails === false && (
                    <h1 id='noDetailsMessage'>No details for this property...</h1>
                    )
                }
            </div>
        </>
    )
}

export default Main;
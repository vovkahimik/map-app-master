import React from 'react';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {useSelector} from "react-redux";
import {AppRootStateType} from '../state/store';
import '../App.css'

type PropsType = {}

export const MapPage = React.memo((props: PropsType) => {

    const cityCoordinates = useSelector<AppRootStateType, Array<number>>(state => state.cityData.cityCoordinates)
    const schools = useSelector<AppRootStateType, Array<any>>(state => state.cityData.schools)
    return (
        <div>
            <YMaps>
                <div className="mapWrapper">
                    <Map state={{center: cityCoordinates, zoom: 12}} width={'100%'} height={'100vh'}
                         modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    >

                        {schools.map((school) =>
                          <Placemark geometry={school.geometry.coordinates}
                                     properties={{ iconCaption: school.properties.name,
                                                   balloonContentHeader: school.properties.name,
                                                   balloonContentBody: school.properties.description,
                                                   hintContent: school.properties.name
                                                 }}
                                     options={{
                                       preset: "islands#blueLeisureIcon",
                                       hideIconOnBalloonOpen: false
                                     }}

                          />)}
                    </Map>
                </div>
            </YMaps>
        </div>
    )
})

// key={school.properties.CompanyMetaData.id}


import {getCoordinate} from "../api/geocoder-api";
import {getSchoolsApi} from "../api/search-org-api";
import React from "react";

type PropertiesType = {
    name: {} | null | undefined
    description: React.ReactNode
    CompanyMetaData: any;
}
type GeometryType = {
    coordinates: Array<number>
    type: string
}
export type SchoolType = {
    geometry: GeometryType
    properties: PropertiesType
    type: string
}
type InitialStateType = {
    cityCoordinates: Array<number>,
    schools: Array<SchoolType>
}

const initialState = {
    cityCoordinates: [53.90, 27.56],
    schools: [{
        geometry: {
            coordinates: [1, 2],
            type: ''
        },
        properties: {
            name: {},
            description: null,
            CompanyMetaData: {
              id: '',
              name: '',
              address: '',
              url: '',
            },

        },
        type: ''
    }]
}

export const geocodeReducer = (state: InitialStateType = initialState, action: ActionType) => {

console.log(JSON.stringify(state))

    switch (action.type) {
        case 'GET_CITY_COORDINATES':
            return {
                ...state,
                cityCoordinates: action.cityCoordinates,
                schools: action.schools
            }
        case 'SET_CITY_COORDINATES':
          return {
            ...state,
            cityCoordinates: action.cityCoordinates,
          }
        default :
            return state;
    }
}

type ActionType = ReturnType<typeof addCityCoordinates> | ReturnType<typeof setCityCoordinates>

export const addCityCoordinates = (cityCoordinates: Array<number>, schools: Array<any>) => ({
    type: 'GET_CITY_COORDINATES',
    cityCoordinates,
    schools
} as const)

export const setCityCoordinates = (cityCoordinates: Array<number>) => ({
    type: 'SET_CITY_COORDINATES',
    cityCoordinates,
} as const)

export const getCityCoordinates = (country: string, city: string) => async (dispatch: any) => {
    const arr = ['средняя', 'гимназия']
    const value = new RegExp(arr.join('|'), 'i')
    const cityCoordinates = (await getCoordinate(country + ' ' + city))
        .GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse().map((el: string) => +el)
    const schools = (await getSchoolsApi(country + ' ' + city))
        .features.filter((s: any) => !s.properties.name.toLowerCase().match(value)).map((s: any) => ({
            ...s,
            coordinates: s.geometry.coordinates.reverse()
        }))
  console.log(schools)
    dispatch(addCityCoordinates(cityCoordinates, schools))
}


import { ILocation } from "../location/location.model";
import { IPagination } from "../utils/pagination.model";

export interface ICharacterResponse {
    info: IPagination,
    results: ICharacter[]
}

export interface ICharacter {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: ILocation,
    location: ILocation,
    image: string,
    episode: string [],
    url: string,
    created: string,
    info: IPagination
}

export interface ICharacterFilter {
    page: string | null,
    name: string | null,
    species: string | null,
    status: string | null,
    gender: string | null
}
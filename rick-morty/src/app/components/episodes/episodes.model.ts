import { IPagination } from "../utils/pagination.model";

// me creo la estructura de la respuesta que voy a recibir por parte del API
// de Rick y Morty. Esta estructura se puede ver en 
//https://rickandmortyapi.com/documentation/#get-all-episodes
export interface IEpisodeResponse {
    info: IPagination;
    results: IEpisodes[];
}

export interface IEpisodes {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string [],
    url: string,
    created: string
}
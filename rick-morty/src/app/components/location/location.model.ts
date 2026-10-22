import { IPagination } from "../utils/pagination.model";

export interface ILocation {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string [],
    url: string,
    created: string
}

export interface ILocationResponse {
    info: IPagination;
    results: ILocation[];
}
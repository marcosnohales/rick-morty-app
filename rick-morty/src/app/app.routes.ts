import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CharactersComponent } from './components/characters/characters.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LocationComponent } from './components/location/location.component';

export const routes: Routes = [
    {
        path: '', // Ruta vacía
        redirectTo: 'main', // redirige a la ruta /main
        pathMatch: 'full', // indica que al ruta debe coincidir completamente
    },
    {
        path: 'main',
        component: MainComponent // muestras el MainComponent
    },
    {
        path: 'characters',
        component: CharactersComponent,
        pathMatch: 'full'
    },
    {
        path: 'episodes',
        component: EpisodesComponent,
        pathMatch: 'full'
    },
    {
        path: 'locations',
        component: LocationComponent,
        pathMatch: 'full'
    },
    {
        path: '**', // tiene que ser si o si la última oprque angular evalúa todas
        component: NotFoundComponent
    }
];
    
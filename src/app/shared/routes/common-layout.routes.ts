import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [

   
    {
        path: 'administrador',
        loadChildren: () => import('../../pages/admin/admin.module').then(m => m.AdminModule),
    },
    
    {
        path: 'mercaderia',
        loadChildren: () => import('../../pages/mercaderia/mercaderia.module').then(m => m.MercaderiaModule),
    },/*
    {
        path: 'solicitante',
        loadChildren: () => import('../../pages/solicitante/solicitante.module').then(m => m.SolicitanteModule),
    },
    */
    //Component
   
    
];

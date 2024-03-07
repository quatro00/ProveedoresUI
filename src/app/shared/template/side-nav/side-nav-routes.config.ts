import {
  SideNavInterface
} from '../../interfaces/side-nav.type';

export const AdminRoutes: SideNavInterface[] = [
  
  {
    path: 'administrador/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/catalogoarticulos',
    title: 'Catalogo de articulos',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/usuarios',
    title: 'Usuarios',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: '',
    title: 'Catalogos',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[
      {
        path: 'administrador/catalogo-pacientes',
        title: 'Pacientes',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'administrador/catalogo-medicamentos',
        title: 'Medicamentos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'administrador/catalogo-sucursales',
        title: 'Sucursales',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      }
    ]
  },
  {
    path: '',
    title: 'Inventarios',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[
      {
        path: 'inventario/entrada-inventario',
        title: 'Entrada de inventario',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'inventario/equivalencia-inventario',
        title: 'Equivalencias',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      }
    ]
  },
  {
    path: '',
    title: 'Solicitudes',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[
      {
        path: 'solicitante/nueva-solicitud',
        title: 'Registrar solicitud',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
    ]
  },
  
]

export const InventarioRoutes: SideNavInterface[] = [
  
  {
    path: 'inventario/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[]
},
{
  path: 'inventario/entrada-inventario',
  title: 'Entrada de inventario',
  iconType: 'nzIcon',
  iconTheme: 'outline',
  icon: 'appstore-add',
  submenu:[]
}]

  export const ClienteRoutes: SideNavInterface[] = [
  
    {
      path: 'cliente/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'home',
      submenu:[]
    },
   
]

  export const SupervisorRoutes: SideNavInterface[] = [

    {
      path: 'supervisor/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'appstore-add',
      submenu:[]
    },
]

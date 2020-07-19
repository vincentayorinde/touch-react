// Pages
import {
    Calendar,
    Home,
    Media,
    Widgets,
    AddCandidate,
    AddElectoralArea,
    ListElectoralArea,
    AddPosition,
    ListPositions,
    AddModule,
    ListModules,
    AddPeople,
    ListPeople,
    AddDues,
    ListDues
} from './pages';

import AppsIcon from '@material-ui/icons/Apps';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EqualizerIcon from '@material-ui/icons/Equalizer';
// Icons
import FaceIcon from '@material-ui/icons/Face';
import PersonIcon from '@material-ui/icons/Person';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

export default {
    items: [
        {
            path: '/',
            name: 'Dashboard',
            type: 'link',
            icon: ViewColumnIcon,
            component: Home,
        },
        {
            path: '/electoral-areas',
            name: 'Electoral Areas',
            type: 'submenu',
            icon: AppsIcon,
            children: [
                {
                    path: '/add-electoral-area',
                    name: 'Add Electoral Area',
                    component: AddElectoralArea,
                },
                {
                    path: '/list-electoral-areas',
                    name: 'List Electoral Areas',
                    component: ListElectoralArea,
                },
            ],
        },
        {
            path: '/positions',
            name: 'Positions',
            type: 'submenu',
            icon: PersonIcon,
            children: [
                {
                    path: '/add-position',
                    name: 'Add Position',
                    component: AddPosition,
                },
                {
                    path: '/list-positions',
                    name: 'List Positions',
                    component: ListPositions,
                },
            ],
        },
        {
            path: '/modules',
            name: 'Modules',
            type: 'submenu',
            icon: PersonIcon,
            children: [
                {
                    path: '/add-module',
                    name: 'Add Module',
                    component: AddModule,
                },
                {
                    path: '/list-modules',
                    name: 'List Modules',
                    component: ListModules,
                },
            ],
        },
        {
            path: '/members',
            name: 'Members',
            type: 'submenu',
            icon: FaceIcon,
            children: [
                {
                    path: '/add-memeber/',
                    name: 'Add Memebr',
                    component: AddPeople,
                },
                {
                    path: '/list-members',
                    name: 'List Members',
                    component: ListPeople,
                },
            ],
        },
        {
            path: '/dues',
            name: 'Dues',
            type: 'submenu',
            icon: FaceIcon,
            children: [
                {
                    path: '/add-dues/',
                    name: 'Add Dues',
                    component: AddDues,
                },
                {
                    path: '/list-dues',
                    name: 'List Dues',
                    component: ListDues,
                },
            ],
        },
        {
            path: 'https://encrisoft.com',
            name: 'Powered by Encrisoft',
            type: 'external',
            icon: BookmarkIcon,
        },
    ],
};

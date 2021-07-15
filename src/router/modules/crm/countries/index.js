import {userGuard} from "../../../middleware/guards";
import Countries from "../../../../components/pages/Crm/Countries/Index";
import Create from "../../../../components/pages/Crm/Countries/Create";
import All from "../../../../components/pages/Crm/Countries/All";
import Edit from "../../../../components/pages/Crm/Countries/Edit";

export default [
    {
        path: '/admin/settings/countries',
        component: Countries,
        children: [
            {
                path: '',
                name: 'All Countries',
                component: All,
                beforeEnter: userGuard
            },
            {
                path: 'new',
                name: 'Create country',
                component: Create,
                meta: {
                    middleware: {
                        roles: ['admin']
                    },
                },
                beforeEnter: userGuard
            },
            {
                path: ':id/edit',
                name: 'Edit country',
                props: true,
                component: Edit,
                meta: {
                    middleware: {
                        roles: ['admin']
                    },
                },
                beforeEnter: userGuard
            },

        ],
        beforeEnter: userGuard
    },
]


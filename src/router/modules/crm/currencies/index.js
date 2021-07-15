import {userGuard} from "../../../middleware/guards";
import Currencies from "../../../../components/pages/Crm/Currencies/Index";
import Create from "../../../../components/pages/Crm/Currencies/Create";
import All from "../../../../components/pages/Crm/Currencies/All";
import Edit from "../../../../components/pages/Crm/Currencies/Edit";

export default [
    {
        path: '/admin/settings/currencies',
        component: Currencies,
        children: [
            {
                path: '',
                name: 'All Currencies',
                component: All,
                beforeEnter: userGuard
            },
            {
                path: 'new',
                name: 'Create currency',
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
                name: 'Edit currency',
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


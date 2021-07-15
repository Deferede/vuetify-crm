import {userGuard} from "../../../middleware/guards";
import Offers from "../../../../components/pages/Crm/Offers/Index";
import Create from "../../../../components/pages/Crm/Offers/Create";
import All from "../../../../components/pages/Crm/Offers/All";
import Edit from "../../../../components/pages/Crm/Offers/Edit";

export default [
    {
        path: '/admin/settings/offers',
        component: Offers,
        children: [
            {
                path: '',
                name: 'All Offers',
                component: All,
                beforeEnter: userGuard
            },
            {
                path: 'new',
                name: 'Create offer',
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
                name: 'Edit offer',
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


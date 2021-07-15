import {userGuard} from "../../../middleware/guards";
import Products from "../../../../components/pages/Crm/Products/Index";
import Create from "../../../../components/pages/Crm/Products/Create";
import All from "../../../../components/pages/Crm/Products/All";
import Edit from "../../../../components/pages/Crm/Products/Edit";

export default [
    {
        path: '/admin/settings/products',
        component: Products,
        children: [
            {
                path: '',
                name: 'All Products',
                component: All,
                beforeEnter: userGuard
            },
            {
                path: 'new',
                name: 'Create product',
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
                name: 'Edit product',
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


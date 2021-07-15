import store from "../../store";

const guestGuard = (to, from, next) => {
    store.dispatch('user/loadAuthUser')
        .then(() => {
            if (store.getters["user/hasRole"]('guest')) {
                next();
            }
            if (!store.getters["user/hasRole"]('guest')) {
                next("/")
            }
        })
        .catch(() => {
            next()
        })
}

const userGuard = async (to, from, next) => {
    if (!localStorage.getItem("TOKEN")) {
        next('/login')
    } else {
        await store.dispatch('user/loadAuthUser')
    }
    const user = store.getters['user/authUser']

    let access = false

    if (to.name === "Home") {
        access = true
    } else if (to.meta.middleware === undefined) {
        access = true
    } else if (to.meta.middleware.permissions !== undefined && (to.meta.middleware.permissions.some(p => user.permissions.includes(p)) || user.role.includes("admin"))) {
        access = true
    } else if (to.meta.middleware.roles !== undefined && (to.meta.middleware.roles.some(r => user.role.includes(r)) || user.role.includes("admin"))) {
        access = true
    }

    if (access) {
        next()
    } else {
        next("/403")
    }
}

export {userGuard, guestGuard}

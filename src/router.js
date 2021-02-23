import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetails from '@/components/coaches/CoachDetails'; // Default import
const CoachDetails = () => import('@/components/coaches/CoachDetails'); // CMP Lazy load sample
// Component groupped lazy load
// const CoachDetails = () =>
//     import(
//         /* webpackChunkName: "coaches-page" */ '@/components/coaches/CoachDetails'
//     );

// import CoachesList from '@/components/pages/coaches/CoachesList'; // Default import
const CoachesList = () =>
    import(
        /* webpackChunkName: "coaches-page" */ '@/components/pages/coaches/CoachesList'
    );

import CoachRegistration from '@/components/pages/coaches/CoachRegistration';
import ContactCoach from '@/components/pages/requests/ContactCoach';
import RequestsReceived from '@/components/pages/requests/RequestsReceived';

import NotFound from '@/components/pages/NotFound';
import UserAuth from '@/components/pages/auth/UserAuth';

// eslint-disable-next-line no-unused-vars
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'coaches' }
        },
        {
            path: '/coaches',
            name: 'coaches',
            component: CoachesList,
            children: [
                {
                    path: ':coachId',
                    name: 'coach-details',
                    component: CoachDetails,
                    props: true,
                    children: [
                        {
                            path: 'contact',
                            name: 'contact-coach',
                            component: ContactCoach,
                            props: true
                        }
                    ]
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: CoachRegistration,
            meta: {
                requriedAuth: true
            }
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: UserAuth,
            meta: {
                requriedUnAuth: true
            }
        },
        {
            path: '/requests',
            name: 'requests',
            component: RequestsReceived,
            meta: {
                requriedAuth: true
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active-exact',
    // this will scroll to top if we hit a new page, and if that page has no savedPosition.
    scrollBehavior(_, _2, savedPosition) {
        // console.log(to, from, savedPosition)
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 };
    }
});

router.beforeEach(function(to, from, next) {
    if (to.meta.requriedAuth && !store.getters['authModule/isAuthenticated']) {
        next('/sign-in');
    } else if (
        to.meta.requriedUnAuth &&
        store.getters['authModule/isAuthenticated']
    ) {
        next('/coaches');
    } else {
        next();
    }
});

export default router;

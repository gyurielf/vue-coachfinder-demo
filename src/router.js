import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from '@/components/pages/CoachesList';
import RequestsList from '@/components/pages/RequestsList';
import CoachDetails from '@/components/coaches/CoachDetails';
// const CoachDetails = () => import('@/components/coaches/CoachDetails');
import Contact from '@/components/pages/Contact';
import NotFound from '@/components/pages/NotFound';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: { needAuth: true },
            redirect: { name: 'coaches' }
        },
        {
            path: '/coaches',
            name: 'coaches',
            meta: { needAuth: true },
            component: CoachesList,
            children: [
                {
                    path: ':coachId',
                    name: 'mentor',
                    component: CoachDetails,
                    props: true
                }
            ]
        },
        {
            path: '/coaches/:coachId/contact',
            name: 'contactPage',
            component: Contact,
            props: true
        },
        {
            path: '/requests',
            name: 'requests',
            meta: { needAuth: true },
            component: RequestsList
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

export default router;

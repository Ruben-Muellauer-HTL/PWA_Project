import { createRouter, createWebHistory } from 'vue-router';
import TravelView from '../views/TravelView.vue';
import AboutView from '../views/AboutView.vue';
import HomeView from '../views/HomeView.vue';
import TourView from '../views/TourView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: '/travel',
      name: 'travel',
      component: TravelView,
    },
    {
      path: '/travel/:id',
      name: 'tour',
      component: TourView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
});

export default router;

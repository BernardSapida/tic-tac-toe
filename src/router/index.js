import { createRouter, createWebHistory } from 'vue-router';
import App from '../App';
import NewGame from '../views/NewGame.vue';
import SinglePlayer from '../views/SinglePlayer.vue';
import Multiplayer from '../views/Multiplayer.vue';
import Volume from '../views/Volume.vue';
import Theme from '../views/Theme.vue';
import NotFound from '../views/NotFound.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/newgame',
    name: 'newgame',
    component: NewGame
  },
  {
    path: '/singleplayer/difficulty=:difficulty&human-mark=:humanMark&ai-mark=:aiMark',
    name: 'singleplayer',
    component: SinglePlayer
  },
  {
    path: '/multiplayer',
    name: 'multiplayer',
    component: Multiplayer
  },
  {
    path: '/volume',
    name: 'volume',
    component: Volume
  },
  {
    path: '/theme',
    name: 'theme',
    component: Theme
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
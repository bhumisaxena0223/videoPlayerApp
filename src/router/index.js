import { createWebHistory, createRouter } from "vue-router";
import VideoPreview from "@/view/VideoPreview";
import VideoList from "@/components/VideoList";
// import About from "@/views/About.vue";

const routes = [
  {
    path: "/video/:id",
    name: "Home",
    component: VideoPreview,
    props: true
  },
  {
    path: "/",
    name: "Video List",
    component: VideoList
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
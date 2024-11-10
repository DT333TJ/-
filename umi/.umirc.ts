import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/umi' },
    { path: '/umi', component: '@/pages/index' },
  ],
  fastRefresh: {},
  base: '/umi/',
  qiankun: {
    slave: {},
  },
});

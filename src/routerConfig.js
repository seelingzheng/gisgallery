// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideLayout from './layouts/HeaderAsideLayout';
import NoneLayout from './layouts/NoneLayout';

import BaseMapPage from "./pages/OL/BaseMapPage";

import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

const routerConfig = [{
    path: '/',
    layout: NoneLayout,
    component: HomePage
  }, {
    path: '/login',
    layout: NoneLayout,
    component: Login
  },
  {
    path: '/ol',
    layout: HeaderAsideLayout,
    component: BaseMapPage,
    children: [{
      path: '/ol/basemap',
      layout: HeaderAsideLayout,
      component: BaseMapPage,
    }]
  },
  {
    path: '/dashboard',
    layout: HeaderAsideLayout,
    component: Dashboard,
    children: [{
        path: '/dashboard/analysis',
        layout: HeaderAsideLayout,
        component: Dashboard,
      },
      {
        path: '/dashboard/monitor',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: '/dashboard/workplace',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/table',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [{
        path: '/table/basic',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: '/table/fixed',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/form',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [{
        path: '/form/basic',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: '/form/signup',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/charts',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [{
        path: '/charts/line',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: '/charts/histogram',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: '/charts/bar',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/profile',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [{
        path: '/profile/success',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: '/profile/fail',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/result',
    layout: HeaderAsideLayout,
    component: NotFound,
    children: [{
        path: '/result/success',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
      {
        path: '/result/fail',
        layout: HeaderAsideLayout,
        component: NotFound,
      },
    ],
  },

  {
    path: '*',
    layout: HeaderAsideLayout,
    component: NotFound,
  },
];

export default routerConfig;
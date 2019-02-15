// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [{
    path: '/base',
    name: '基础地图',
    icon: 'el-icon-menu',
    children: [{
        path: '/lf',
        name: 'Leaflet',
      }, {
        path: '/lfmulti',
        name: '多色系底图LF',
      },
      {
        path: '/ol',
        name: 'Openlayers',
      },
      // {
      //   path: '/olmulti',
      //   name: '多色系底图',
      // },
      {
        path: '/c3d',
        name: 'Cesium 3D',
      }
    ]

  },

  {
    path: '/view',
    name: '可视化',
    icon: 'el-icon-menu',
    children: [{
        path: '/aqi',
        name: '空气质量',
      },
      {
        path: '/c3aqi',
        name: '空气质量(3D)',
      },
      {
        path: '/split',
        name: 'Split',
      },
      {
        path: '/terrain',
        name: '高程图',
      },
    ],
  },
  {
    path: '/three',
    name: 'Three',
    icon: 'el-icon-date',
    children: [{
        path: '/3earth',
        name: 'ThreeEarth',
      },
      // {
      //   path: '/fixed',
      //   name: '固定表格',
      // },
    ],
  },
  // {
  //   path: '/form',
  //   name: '表单页',
  //   icon: 'el-icon-edit-outline',
  //   children: [{
  //       path: '/basic',
  //       name: '典型表单',
  //     },
  //     {
  //       path: '/signup',
  //       name: '注册表单',
  //     },
  //   ],
  // },
  // {
  //   path: '/charts',
  //   name: '图表页',
  //   icon: 'el-icon-picture-outline',
  //   children: [{
  //       path: '/line',
  //       name: '折线图',
  //     },
  //     {
  //       path: '/histogram',
  //       name: '柱状图',
  //     },
  //     {
  //       path: '/bar',
  //       name: '条形图',
  //     },
  //   ],
  // },
  // {
  //   path: '/profile',
  //   name: '详情页',
  //   icon: 'el-icon-tickets',
  //   children: [{
  //       path: '/success',
  //       name: '基础详情页',
  //     },
  //     {
  //       path: '/fail',
  //       name: '失败',
  //     },
  //   ],
  // },
  // {
  //   path: '/result',
  //   name: '结果页',
  //   icon: 'el-icon-circle-check-outline',
  //   children: [{
  //       path: '/success',
  //       name: '成功',
  //     },
  //     {
  //       path: '/fail',
  //       name: '失败',
  //     },
  //   ],
  // },
  // {
  //   name: 'Login',
  //   path: '/',
  //   icon: 'home',
  // },
];

export {
  headerMenuConfig,
  asideMenuConfig
};
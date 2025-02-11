
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/addtask"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/navbar"
  },
  {
    "renderMode": 2,
    "route": "/report"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 22125, hash: '5a1e8d906f0137bf62ca4bee473ad95f3410ecab7aaa8d6c2a9264c44008c442', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17204, hash: '19229fade7e0ac8e8536bdcb2135780d3f31bf79314487076a407e47f644bed0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 26210, hash: '83c4761fd5c07d6c3e0faeabf873b2c0a783301ee2061cbe6d47fbd864390e45', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'addtask/index.html': {size: 38902, hash: '7d601012d473c242f9e9b89195a950ee85e5821ab1b7614e7b523e15ee139e53', text: () => import('./assets-chunks/addtask_index_html.mjs').then(m => m.default)},
    'navbar/index.html': {size: 33320, hash: 'eb2c7328d4f24e313d5e63e1bba0fdc73321d2da647d5817ab233cfafa721748', text: () => import('./assets-chunks/navbar_index_html.mjs').then(m => m.default)},
    'report/index.html': {size: 42883, hash: '60af98ed1568c651a55e8ee561d253c5b6282f6ab0ad8084fb9187d80f0c481c', text: () => import('./assets-chunks/report_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 48686, hash: '91e68f7c8d3cebbaaa3027bc9b2ac90dd8d92cf03206be1df33d4ac4e7a0b5e7', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 36120, hash: '3010abd8f093b890728e08ca9c9594f8f55fa9b25dc560a7cc96dec99a4c5ed7', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'styles-52MLMBUH.css': {size: 305393, hash: 'i5Ul9JtP3Zc', text: () => import('./assets-chunks/styles-52MLMBUH_css.mjs').then(m => m.default)}
  },
};

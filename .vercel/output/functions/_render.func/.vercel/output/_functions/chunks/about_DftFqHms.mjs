export { renderers } from '../renderers.mjs';

const page = () => import('./pages/about_CFReq-QY.mjs').then(n => n.b);

export { page };

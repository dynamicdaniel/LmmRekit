// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Page403,
  Layout,
  AgentListPage,
} from './';

export default {
  path: 'admin',
  name: 'Admin',
  component: Layout,
  childRoutes: [
    { path: 'default-page',role:"admin", name: 'Default page', component: DefaultPage, isIndex: true },
    { path: '403', name: 'Page403', component: Page403, isIndex: true },
    { path: 'agent/list', name: 'Agent list page', component: AgentListPage ,isIndex: true},
  ],
};

const meta = require.main.require('./src/meta');

const controllers = require('./lib/controllers');

const plugin = {};

plugin.init = async (params) => {
  const { router } = params;
  const hostMiddleware = params.middleware;
  // const hostControllers = params.controllers;

  router.get(
    '/admin/plugins/sanitizeconfig',
    hostMiddleware.admin.buildHeader,
    controllers.renderAdminPage,
  );
  router.get('/api/admin/plugins/sanitizeconfig', controllers.renderAdminPage);
};

plugin.addAdminNavigation = async (header) => {
  header.plugins.push({
    route: '/plugins/sanitizeconfig',
    icon: 'fa-tint',
    name: 'Sanitize Config',
  });
  return header;
};

plugin.modConfig = async (data) => {
  let newAllowedTags = await meta.settings.getOne('sanitizeconfig', 'newAllowedTags') || '';
  newAllowedTags = newAllowedTags.split('\n')
    .map(tag => tag.trim())
    .filter(tag => tag);
  const allowedTags = [...data.allowedTags, ...newAllowedTags];
  return { ...data, allowedTags };
};


module.exports = plugin;

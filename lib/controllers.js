const Controllers = {};

Controllers.renderAdminPage = (req, res/* , next */) => {
  res.render('admin/plugins/sanitizeconfig', {});
};

module.exports = Controllers;

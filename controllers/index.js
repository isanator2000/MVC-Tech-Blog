const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./HomeRoutes');
const dashboardRoutes = require('./DashboardRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
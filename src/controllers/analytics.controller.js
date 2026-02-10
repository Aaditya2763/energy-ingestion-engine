const analyticsService = require("../services/analytics.service");

exports.getPerformance = async (req, res) => {
    try {
        const data = await analyticsService.calculatePerformance(req.params.vehicleId);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

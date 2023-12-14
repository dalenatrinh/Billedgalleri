const HeartModal = require("../../imageModal");

// Opdateringsroute handler
module.exports = async (req, res) => {
    const { reqIsActivated, reqImageName } = req.body;

    try {
        console.log(reqIsActivated);
        // Find et eksisterende dokument med imageName og opdater det
        let imgUpdateData = { isActive: reqIsActivated }

        let result = await HeartModal.updateOne({ imageName: reqImageName }, imgUpdateData, { upsert: true, new: true });



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



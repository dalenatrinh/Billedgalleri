const HeartModal = require("../../imageModal");

module.exports = async (req, res) => {
    console.log("activated");
    let { reqIsActivated, reqImageName } = req.body;
    console.log(req.body);
    try {
        let newImage = new HeartModal({
            isActive: reqIsActivated,
            imageName: reqImageName
        });

        await newImage.save();
        res.json(newImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
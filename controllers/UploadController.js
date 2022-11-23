export default (req, res) => {
	res.status(201).json({
		success: true,
		url: `/uploads/${req.file.orginalname}`,
	});
};

import { PostModel } from "../models/index.js";

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate("user").exec();

		return res.json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Не удалось получить статьи",
		});
	}
};

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id;

		PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: "after",
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						message: "Не удалось вернуть статью",
					});
				}

				if (!doc) {
					return res.status(404).json({
						message: "Статья не найдено",
					});
				}

				res.json(doc);
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Не удалось получить статью",
		});
	}
};

export const remove = async (req, res) => {
	try {
		const postId = req.params.id;

		PostModel.findOneAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						message: "Не удалось удалить статью",
					});
				}

				if (!doc) {
					return res.status(404).json({
						message: "Статья не найдено",
					});
				}

				res.json({
					_id: postId,
					success: true,
					message: "Статья удалено",
				});
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Не удалось удалить статью",
		});
	}
};

export const create = async (req, res) => {
	try {
		const doc = PostModel({
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		});

		const post = await doc.save();

		res.status(201).json(post);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Не удалось создать статью",
		});
	}
};

export const update = async (req, res) => {
	try {
		const postId = req.params.id;

		const updatedDoc = await PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				tags: req.body.tags,
				imageUrl: req.body.imageUrl,
				user: req.userId,
			}
		);

		res.status(201).json({
			...updatedDoc,
			success: true,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Не удалось обновить статью",
		});
	}
};

const joi = require("joi");

//Todo Validation Schema
const validatePostTodo = (req, res, next) => {
    const postSchema = joi.object({
        task: joi.string().min(3).max(100).required(),
        completed: joi.boolean().required(),
        dueDate: joi.alternatives().try(joi.string().isoDate(), joi.valid(null)).required()
    });

    const {error} = postSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    };
    next();
};

module.exports = { validatePostTodo };
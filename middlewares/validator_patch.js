const Joi = require('joi');

const validatePatchTodo = (req, res, next) => {
    const patchSchema = Joi.object({
        task: Joi.string().min(3).max(100),
        completed: Joi.boolean(),
        dueDate: Joi.alternatives().try(Joi.string().isoDate(), Joi.valid(null))
    }).min(1); // require at least one field
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, error: 'Request body required for patch' });
    }

    if ('id' in req.body) {
        return res.status(400).json({ success: false, error: 'Cannot modify id field' });
    }

    const { error, value } = patchSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

    if (error) {
        const msg = error.details.map((d) => d.message).join(', ');
        return res.status(400).json({ success: false, error: msg });
    }

    // replace body with validated/cleaned value (optional)
    req.body = value;
    next();
};

module.exports = { validatePatchTodo };
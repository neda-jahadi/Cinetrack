const Labels = {
  name: 'Name',
  description: 'Description',
  regionId: 'Region',
  municipalityId: 'Municipality',
  wordMode: 'Work Mode',
  contactEmail: 'Contact Email',
  contactPhone: 'Contact Phone',
};

export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0];
    const fieldName = firstError.path[0];

    const label = Labels[fieldName] ? Labels[fieldName] : String(fieldName);

    let message = firstError.message;

    if (
      firstError.code === 'invalid_type' &&
      req.body[fieldName] === undefined
    ) {
      message = `${label} is required`;
    }

    return res.status(400).json({
      success: false,
      message,
    });
  }

  req.body = result.data;
  next();
};

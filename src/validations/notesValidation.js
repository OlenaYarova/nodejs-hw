
import { Joi, Segments } from "celebrate";
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constans/tags.js';


const ObjectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Page must be a number",
      "number.min": "Page must be at least {#limit}",
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      "number.base": "PerPage must be a number",
      "number.min": "PerPage must be at least {#limit}",
      "number.max": "Page must be at most {#limit}",
    }),

    tag: Joi.string()
      .valid(...TAGS)
      .optional().messages({
        "string.base": "Tag must be a string",
        "any.only": `Tag must be one of: ${TAGS.join(', ')}`,
      }),

    search: Joi.string().trim().allow('').optional().messages({
      "string.base": "Search must be a string",
    }),
  }),
};


export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom(ObjectIdValidator)
      .required().messages({
        "string.base": "Note ID must be a string",
        "any.required": "Note ID is required",
      }),
  }),
};


export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),

    content: Joi.string().trim().allow('').optional().messages({
      "string.base": "Content must be a string",
    }),

    tag: Joi.string()
      .valid(...TAGS)
      .optional().messages({
        "string.base": "Tag must be a string",
        "any.only": `Tag must be one of: ${TAGS.join(', ')}`,
      }),
  }),
};


export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom(ObjectIdValidator)
      .required().messages({
        "string.base": "Note ID must be a string",
        "any.required": "Note ID is required",
      }),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional().messages({
      "string.base": "Title must be a string",
      "string.min": "Title must be at least {#limit} characters long",
    }),

    content: Joi.string().allow('').optional().messages({
      "string.base": "Content must be a string",
    }),

    tag: Joi.string()
      .valid(...TAGS)
      .optional().messages({
        "string.base": "Tag must be a string",
        "any.only": `Tag must be one of: ${TAGS.join(', ')}`,
      }),
  }).min(1),
};

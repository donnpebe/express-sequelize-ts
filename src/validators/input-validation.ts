import { body } from 'express-validator';

// export const signupInputValidation = [
//   body('email').trim().isEmail().withMessage('must provide a valid email'),
//   body('name')
//     .trim()
//     .optional({ checkFalsy: true })
//     .isLength({ max: 80 })
//     .withMessage('name must be maximum 80 characters'),
//   body('password')
//     .trim()
//     .isLength({ min: 8, max: 64 })
//     .withMessage('password must be between 8 and 64 characters'),
// ];

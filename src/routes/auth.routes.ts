import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/auth.controller';

// import { validateRequest } from '../middlewares/validate-request';
// import { signupInputValidation } from '../validators/input-validation';

export const routes = (): Router => {
  const router = Router();

  const controller = container.resolve(AuthController);

  // router.post('/signup', signupInputValidation, validateRequest, controller.signup);
  router.post('/signin', controller.signIn);
  router.post('/signup', controller.signUp);
  return router;
};

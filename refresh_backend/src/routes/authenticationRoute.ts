import express from 'express';
import { login, register,verifyUser, resendverifyUser,logout, forgetpassword, resetpassword, staffregister, verifyStaff } from '../controllers/authenticationController';

export default (router: express.Router) => {
  router.post('/auth/register', register as any);
  router.post('/auth/login', login as any);
  router.post('/auth/verify', verifyUser as any);
  router.post('/auth/resend', resendverifyUser as any);
  router.post('/auth/logout', logout as any);
  router.post('/auth/forgot', forgetpassword as any);
  router.post('/auth/reset', resetpassword as any);

// endpoint: POST http://localhost:8080/auth/logout
//header: Cookie: 5H-AUTH=your-session-token



router.post('/auth/staffregister', staffregister as any);
router.post('/auth/verifystaff', verifyStaff as any);


}

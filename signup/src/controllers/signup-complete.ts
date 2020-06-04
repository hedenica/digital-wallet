import signupRepo from '@src/ports/repos/signup';

export default async (token: string): Promise<void> => {
  const signup = await signupRepo.getByToken(token);
  await signupRepo.updateStatus(signup, "COMPLETE")
};
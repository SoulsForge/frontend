import { mutation } from 'astraql';

const resetPasswordMutation = mutation`
resetPassword($resetData: ResetPasswordInput!) {
  resetPassword(data: $resetData) {
    success
    message
  }
}
`;

export default resetPasswordMutation;

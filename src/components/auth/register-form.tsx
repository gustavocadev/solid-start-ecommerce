import { loginOrRegister } from '~/server/session';
import { Button } from '../ui/button';
import { TextFieldLabel, TextFieldInput, TextField } from '../ui/text-field';
import { useSubmission } from '@solidjs/router';

type Props = {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
};

const RegisterForm = (props: Props) => {
  const showPassword = () => props.showPassword;
  const loggingIn = useSubmission(loginOrRegister);
  return (
    <form method="post" action={loginOrRegister}>
      <input type="hidden" name="intent" value="register" />
      <div class="space-y-4">
        {/* <TextField class="space-y-2">
          <TextFieldLabel for="name">First Name</TextFieldLabel>

          <TextFieldInput
            id="name"
            type="text"
            name="firstName"
            placeholder="John Doe"
            required
          />
        </TextField> */}
        <TextField class="space-y-2">
          <TextFieldLabel for="username">Username</TextFieldLabel>

          <TextFieldInput
            id="username"
            type="text"
            placeholder="kody"
            name="username"
            required
          />
        </TextField>
        <TextField class="space-y-2">
          <TextFieldLabel for="password">Password</TextFieldLabel>

          <TextFieldInput
            id="password"
            type={showPassword() ? 'text' : 'password'}
            name="password"
            required
          />
        </TextField>
      </div>

      <Button class="w-full mt-6" type="submit" disabled={loggingIn.pending}>
        Create Account
      </Button>
    </form>
  );
};
export default RegisterForm;

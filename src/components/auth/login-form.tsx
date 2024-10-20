import { TextField, TextFieldInput, TextFieldLabel } from '../ui/text-field';
import { Button } from '../ui/button';
import { useSubmission } from '@solidjs/router';
import { loginOrRegister } from '~/server/session';

type Props = {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
};

const LoginForm = (props: Props) => {
  const showPassword = () => props.showPassword;
  const loggingIn = useSubmission(loginOrRegister);
  return (
    <form action={loginOrRegister} method="post">
      <input type="hidden" name="intent" value="login" />

      <div class="space-y-4">
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
        Sign In
      </Button>
    </form>
  );
};
export default LoginForm;

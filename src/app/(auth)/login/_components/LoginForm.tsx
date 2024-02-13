'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { TextField } from '@/components/ui/TextField';
import { Form } from 'react-aria-components';
import { login } from '../_actions';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
  error: '',
};

export function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

  console.log({ state });

  return (
    <Form action={formAction}>
      <TextField className="flex flex-col" name="username" type="username">
        <Label>Username</Label>
        <Input />
      </TextField>

      <TextField
        className="flex flex-col"
        name="password"
        type="password"
        isRequired
      >
        <Label>Password</Label>
        <Input />
      </TextField>

      {state.error && <p className="text-red-500">{state.error}</p>}
      <Button type="submit">Login</Button>
    </Form>
  );
}

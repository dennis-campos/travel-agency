'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { TextField } from '@/components/ui/TextField';
import { Form } from 'react-aria-components';
import { register } from '../_actions';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
  error: '',
};

export const RegisterForm = () => {
  const [state, formAction] = useFormState(register, initialState);

  return (
    <>
      <Form action={formAction}>
        <TextField className="flex flex-col" name="username" type="text">
          <Label>username</Label>
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

        {state.error ? <p className="text-red-500">{state.error}</p> : null}

        <Button type="submit">Sign up</Button>
      </Form>
      <Link href="/login">Sign in</Link>
    </>
  );
};

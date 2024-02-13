'use client';

import { Form } from 'react-aria-components';
import { useRouter } from 'next/navigation';

type LuciaFormProps = {
  children: React.ReactNode;
  action: string;
};

export const LuciaForm = ({ children, action }: LuciaFormProps) => {
  const router = useRouter();

  return (
    <Form
      action={action}
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          redirect: 'manual',
        });

        if (response.status === 0) {
          return router.refresh();
        }
      }}
    >
      {children}
    </Form>
  );
};

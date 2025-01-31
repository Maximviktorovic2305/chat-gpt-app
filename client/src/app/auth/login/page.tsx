'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useActions } from '@/hooks/useActions'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { IAUthRegister } from '@/types';
import { Label } from '@/components/ui/label';

const Page = () => {
  const { login } = useActions()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<IAUthRegister>()  
  const [loginError, setLoginError] = useState<string | null>(null); 

  const onSubmit = async (data: IAUthRegister) => {
    setLoginError('')
    try {
			const response = await login(data)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
				if (response.error && response.error.code === "ERR_BAD_REQUEST") {
					setLoginError('Неверный email или пароль')
				} else {
					router.push(ROUTES.chat)
					router.refresh()
				}
		} catch (error) {   
			console.log(error)
		}

  };

  return (
    <div className='size-full min-h-screen text-white fixed flex items-center justify-center'>
      <div className='fixed bg-secondary px-3  top-0 left-0 right-0 bottom-0' style={{ backgroundImage: 'url(/fon.jpg)', backgroundSize: 'cover' }}>
        <div className='flex items-center shadow-md shadow-primary justify-center mt-[10%] rounded-lg bg-blue2 max-w-xl p-5 mx-auto bg-slate-800'>
          <form
            className='w-full max-w-[400px] flex flex-col gap-3'
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className='text-center text-xl'>Вход</span>
            <div className='flex flex-col gap-1'>
              <Label className='text-[12px]' htmlFor='email'>
                Почта
              </Label>
              <Input
                className='border-white'
                type='email'
                id='email'
                placeholder='Почта...'
                {...register('email', { 
                  required: 'Почта обязательна',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Некорректный адрес почты'
                  }
                })}
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>{errors.email.message}</span>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='text-[12px]' htmlFor='password'>
                Пароль
              </Label>
              <Input
                className='border-white'
                type='password'
                id='password'
                placeholder='Пароль...'
                autoComplete='off'
                {...register('password', { 
                  required: 'Пароль обязателен' 
                })}
              />
              {errors.password && (
                <span className='text-red-500 text-sm'>{errors.password.message}</span>
              )}
            </div>

            {loginError && (
                <span className='text-red-500 text-sm'>{loginError}</span>
              )}

            <Button variant='secondary' type='submit'>
              Войти
            </Button>
            <div className='text-[12px] text-center'>
              Нет аккаунта?{' '}
              <Link
                href={ROUTES.register}
                className='text-blue-400 hover:text-blue-500 duration-200 cursor-pointer underline'>
                Зарегистироваться
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import clsxm from '@/service/mergeStyle';
import Hide from 'public/images/hide-password-icon.svg';
import Show from 'public/images/show-password-icon.svg';

import ElInput from '../elements/ElInput';

export default function PwdField({
	name,
	show,
	handleInputType,
	register,
}: {
	name: 'password' | 'passwordConfirm';
	show: boolean;
	handleInputType: (name: string) => void;
	register: UseFormRegisterReturn;
}) {
	const buttonClasses = clsxm('absolute', 'top-[50%]', 'translate-y-[-50%]', 'right-[7.69%]');

	return (
		<div className="relative">
			<ElInput
				id={name}
				type={show ? 'text' : 'password'}
				placeholder={name === 'password' ? '비밀번호를 입력해주세요' : '비밀번호를 재입력해주세요'}
				padding="py-[4.65%] pl-[7.69%] pr-[15.38%]"
				register={register}
			/>
			<button type="button" className={buttonClasses} onClick={() => handleInputType(name)}>
				{show ? <Hide /> : <Show />}
			</button>
		</div>
	);
}

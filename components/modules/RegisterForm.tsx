'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import useNavigation from '@/hooks/useNavigation';

import ElButton from '../elements/ElButton';
import ElInput from '../elements/ElInput';

import CheckBox from './CheckBox';
import FormField from './FormField';
import PwdField from './PwdField';

const registerSchema = yup
	.object({
		email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해 주세요.'),
		password: yup
			.string()
			.min(8, '대소문자, 특수문자, 숫자 포함 8자리 이상 입력해주세요.')
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/,
				'대소문자, 특수문자, 숫자 포함 8자리 이상 입력해주세요.',
			)
			.required('대소문자, 특수문자, 숫자 포함 8자리 이상 입력해주세요.'),
		passwordConfirm: yup.string().oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
		name: yup
			.string()
			.matches(/^[가-힣a-zA-Z]+$/, '한글 혹은 영어만 입력 가능합니다.')
			.required('한글 혹은 영어만 입력 가능합니다.'),
	})
	.required();

type UserInfo = yup.InferType<typeof registerSchema>;

interface RegisterError extends Error {
	message: string;
	__type: string;
}

interface ShowIconState {
	[key: string]: boolean;
}

export default function RegisterForm() {
	const navigation = useNavigation();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UserInfo>({ mode: 'onChange', resolver: yupResolver(registerSchema) });

	const handleRegister: SubmitHandler<UserInfo> = async (data) => {
		const { email, password, name } = data;

		try {
			const { user } = await Auth.signUp({
				username: email,
				password,
				attributes: {
					nickname: name,
				},
				autoSignIn: {
					enabled: false,
				},
			});
			console.log(user);
			alert('가입완료! 이메일 인증 후 로그인 하세요.');
			navigation.push('/');
		} catch (err: unknown) {
			const registerError = err as RegisterError;

			switch (registerError.message) {
				case 'An account with the given email already exists.':
					alert('이미 가입한 이메일입니다.');
					break;
				default:
					break;
			}

			console.log(err);
		}
	};

	const [show, setShow] = useState<ShowIconState>({ password: false, passwordConfirm: false });

	const handleInputType = (name: string) => {
		if (show[name]) {
			setShow((prev) => {
				return { ...prev, [name]: false };
			});
		} else {
			setShow((prev) => {
				return { ...prev, [name]: true };
			});
		}
	};

	const [checkList, setCheckList] = useState<number[]>([]);

	const handleAllCheck = (checked: boolean) => {
		if (checked) {
			setCheckList([0, 1, 2, 3]);
		} else {
			setCheckList([]);
		}
	};

	const handleListCheck = (num: number) => {
		if (checkList.includes(num)) {
			setCheckList(checkList.filter((el) => el !== num));
		} else {
			setCheckList((prev) => [...prev, num]);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleRegister)}>
			<FormField
				tilte="이메일"
				textHelper={!watch().email || errors.email ? 'text-gray070' : 'text-green050'}
				iconHelper={!watch().email || errors.email ? '[&>path]:stroke-gray070' : '[&>path]:stroke-green050'}
				helper={errors.email?.message || '이메일을 입력해 주세요.'}
				margin="mb-[7.69%]"
			>
				<ElInput id="email" type="text" placeholder="이메일을 입력해주세요" register={register('email')} />
			</FormField>
			<FormField
				tilte="비밀번호"
				textHelper={!watch().password || errors.password ? 'text-gray070' : 'text-green050'}
				iconHelper={!watch().password || errors.password ? '[&>path]:stroke-gray070' : '[&>path]:stroke-green050'}
				helper="대소문자, 숫자, 특수문자 포함 8~20자 내로 입력해주세요"
				margin="mb-[7.69%]"
			>
				<PwdField
					name="password"
					show={show.password}
					handleInputType={handleInputType}
					register={register('password')}
				/>
			</FormField>
			<FormField
				tilte="비밀번호 확인"
				textHelper={!watch().passwordConfirm || errors.passwordConfirm ? 'text-gray070' : 'text-green050'}
				iconHelper={
					!watch().passwordConfirm || errors.passwordConfirm ? '[&>path]:stroke-gray070' : '[&>path]:stroke-green050'
				}
				helper={
					!watch().passwordConfirm || errors.passwordConfirm ? '입력한 비밀번호를 한번 더 확인할게요' : '일치합니다'
				}
				margin="mb-[7.69%]"
			>
				<PwdField
					name="passwordConfirm"
					show={show.passwordConfirm}
					handleInputType={handleInputType}
					register={register('passwordConfirm')}
				/>
			</FormField>
			<FormField
				tilte="이름"
				textHelper={!watch().name || errors.name ? 'text-gray070' : 'text-green050'}
				iconHelper={!watch().name || errors.name ? '[&>path]:stroke-gray070' : '[&>path]:stroke-green050'}
				helper={errors.name?.message || '한글 혹은 영어만 입력 가능합니다.'}
				margin="mb-[7.69%]"
			>
				<ElInput id="name" type="text" placeholder="이름을 입력해주세요" register={register('name')} />
			</FormField>
			<hr className="border-none w-full h-[1px] bg-blue030 mb-[7.69%]" />
			<div className="mb-[7.69%]">
				<h3 className="text-h7 text-gray090 mb-[2.56%]">이용약관동의</h3>
				<CheckBox onChange={handleAllCheck} check={checkList.length === 4} title="전체 동의합니다." />
				<CheckBox
					onChange={() => handleListCheck(0)}
					check={checkList.includes(0)}
					title="만 14세 이상입니다"
					span="(필수)"
				/>
				<CheckBox
					onChange={() => handleListCheck(1)}
					check={checkList.includes(1)}
					title="이용약관 동의"
					span="(필수)"
				/>
				<CheckBox
					onChange={() => handleListCheck(2)}
					check={checkList.includes(2)}
					title="개인정보 수집·이용 동의"
					span="(필수)"
				/>
				<CheckBox
					onChange={() => handleListCheck(3)}
					check={checkList.includes(3)}
					title="혜택/정보 수신 동의"
					span="(선택)"
				/>
			</div>
			<ElButton
				type="submit"
				disabled={
					Object.entries(errors).length > 0 ||
					Object.values(watch()).length === 0 ||
					Object.values(watch()).includes('') ||
					checkList.length !== 4
				}
			>
				가입하기
			</ElButton>
		</form>
	);
}

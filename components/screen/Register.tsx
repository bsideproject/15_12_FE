'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Amplify, Auth } from 'aws-amplify';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import ElInput from '@/components/elements/ElInput';
import useNavigation from '@/hooks/useNavigation';
import awsConfig from 'aws-exports';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import BackHead from '../modules/BackHead';
import FormField from '../modules/FormField';
import PwdField from '../modules/PwdField';

Amplify.configure(awsConfig);

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

interface ShowIconState {
	[key: string]: boolean;
}

export default function ScreenRegister() {
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
		} catch (error) {
			console.log('error signing up:', error);
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

	return (
		<ElGrid autoHeight bottomSm>
			<BackHead>회원가입</BackHead>
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
				<ElButton
					type="submit"
					disabled={
						Object.entries(errors).length > 0 ||
						Object.values(watch()).length === 0 ||
						Object.values(watch()).includes('')
					}
				>
					가입하기
				</ElButton>
			</form>
		</ElGrid>
	);
}

'use client';

import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';

import clsxm from '@/service/mergeStyle';
import Google from 'public/images/google-icon.svg';
import Kakao from 'public/images/kakao-icon.svg';

export default function LoginSocial() {
	const iconWrapClasses = clsxm('border', 'bg-gray000', 'w-[48px]', 'h-[48px]', 'rounded-[50%]');

	return (
		<div className="text-center mb-[10.26%]">
			<span className="text-p3 text-gray070">또는 SNS 계정으로 로그인하기</span>
			<div className="flex justify-center items-center mt-[3.85%] mb-[5.13%]">
				<button
					className={`${iconWrapClasses} border-gray020`}
					type="button"
					onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
				>
					<Google className="mx-auto" />
				</button>
				<button
					className={`${iconWrapClasses} border-gray020 ml-[3.21%]`}
					type="button"
					onClick={() => Auth.federatedSignIn({ customProvider: 'kakao' })}
				>
					<Kakao className="mx-auto" />
				</button>
			</div>
			<hr className="border-none w-[19.23%] h-[1px] bg-blue030 mx-auto" />
		</div>
	);
}

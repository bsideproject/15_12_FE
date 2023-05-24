'use client';

import getSession from '@/service/getSession';

export default async function ScreenMain() {
	const getUserInfo = await getSession();

	return <h2>{`회원 이메일: ${getUserInfo?.attributes.email}`}</h2>;
}

'use client';

import { useRecoilValue } from 'recoil';

import { useCount } from '@/atoms/socketAtoms';
import MixingImg from 'public/images/mixing-img.svg';

export default function ThankMixing() {
	const count = useRecoilValue(useCount);

	return (
		<div className="flex justify-center items-center h-real-screen">
			<div>
				<MixingImg className="mb-[6.94%] mx-auto" />
				<h2 className="text-h3 text-gray090 text-center">
					순서를
					<br />
					섞고 있어요.
				</h2>
				<p className="text-p2 text-gray070 text-center">참여자 {count}명</p>
			</div>
		</div>
	);
}

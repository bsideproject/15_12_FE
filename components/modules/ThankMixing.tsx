'use client';

import MixingImg from 'public/images/mixing-img.svg';

export default function ThankMixing() {
	return (
		<div className="flex justify-center items-center h-real-screen">
			<div>
				<MixingImg className="mb-[6.94%] mx-auto" />
				<h2 className="text-h3 text-gray090 text-center">
					순서를
					<br />
					섞고 있어요.
				</h2>
			</div>
		</div>
	);
}

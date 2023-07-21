'use client';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

interface MiniNetworkingReslutProps {
	position: string;
	handleClose: () => void;
}

export default function MiniNetworkingReslut({ position, handleClose }: MiniNetworkingReslutProps) {
	return (
		<ElGrid between bottomSm>
			<div />
			{position === 'organizer' && (
				<div>
					<ElButton type="button" _onClick={handleClose}>
						완료하기
					</ElButton>
				</div>
			)}
		</ElGrid>
	);
}

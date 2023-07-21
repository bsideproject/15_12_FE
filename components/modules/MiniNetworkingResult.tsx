'use client';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

interface MiniNetworkingResultProps {
	position: string;
	handleClose: () => void;
}

export default function MiniNetworkingResult({ position, handleClose }: MiniNetworkingResultProps) {
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

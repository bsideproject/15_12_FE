'use client';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

interface MoodCheckinResultProps {
	position: string;
	handleClose: () => void;
}

export default function MoodCheckinResult({ position, handleClose }: MoodCheckinResultProps) {
	return (
		<ElGrid between bottomSm>
			<div />
			{position === 'organizer' && (
				<div>
					<ElButton outline type="button" margin="mb-[2.56%]">
						다른 사람 확인하기
					</ElButton>
					<ElButton type="button" _onClick={handleClose}>
						완료하기
					</ElButton>
				</div>
			)}
		</ElGrid>
	);
}

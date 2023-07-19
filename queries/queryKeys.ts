import { QuestionProps } from '@/components/screen/SpeedGame';

const queryKeys = {
	activities: () => ['activities'],
	speedGamePost: (questions: QuestionProps[]) => ['speedGamePost', questions],
	speedGame: (room: string) => ['speedGame', room],
	moodCheckin: (room: string) => ['moodCheckin', room],
	thankCircle: (room: string) => ['moodCheckin', room],
};

export default queryKeys;

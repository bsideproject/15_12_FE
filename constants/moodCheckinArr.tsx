import MoodCheckin01 from 'public/images/mood-checkin-icon01.svg';
import MoodCheckin02 from 'public/images/mood-checkin-icon02.svg';
import MoodCheckin03 from 'public/images/mood-checkin-icon03.svg';
import MoodCheckin04 from 'public/images/mood-checkin-icon04.svg';
import MoodCheckin05 from 'public/images/mood-checkin-icon05.svg';

const moodCheckinArr: React.ReactElement<React.SVGProps<SVGSVGElement>>[] = [
	<MoodCheckin01 key="MoodCheckin01" />,
	<MoodCheckin02 key="MoodCheckin02" />,
	<MoodCheckin03 key="MoodCheckin03" />,
	<MoodCheckin04 key="MoodCheckin04" />,
	<MoodCheckin05 key="MoodCheckin05" />,
];

export default moodCheckinArr;

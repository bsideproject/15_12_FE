import ActivitySmIcon01 from 'public/images/activity01-sm-icon.svg';
import ActivitySmIcon02 from 'public/images/activity02-sm-icon.svg';
import ActivitySmIcon03 from 'public/images/activity03-sm-icon.svg';
import ActivitySmIcon04 from 'public/images/activity04-sm-icon.svg';

interface ActivityFigcaptionType {
	[key: string]: { color: string; icon: React.ReactElement<React.SVGProps<SVGSVGElement>> };
}

const ACTIVITY_FIGCAPTION: ActivityFigcaptionType = {
	'스피드 게임': { color: '#E1DEBF', icon: <ActivitySmIcon01 /> },
	'감사 서클': { color: '#CADDD4', icon: <ActivitySmIcon02 /> },
	'기분 체크인': { color: '#CAD1DD', icon: <ActivitySmIcon03 /> },
	'미니 네트워킹': { color: '#D0CADD', icon: <ActivitySmIcon04 /> },
};

export default ACTIVITY_FIGCAPTION;

import ActivityIcon01 from 'public/images/activity01-icon.svg';
import ActivityIcon02 from 'public/images/activity02-icon.svg';
import ActivityIcon03 from 'public/images/activity03-icon.svg';
import ActivityIcon04 from 'public/images/activity04-icon.svg';

interface ActivityFigcaptionType {
	[key: string]: { color: string; icon: React.ReactElement<React.SVGProps<SVGSVGElement>> };
}

const ACTIVITY_FIGCAPTION: ActivityFigcaptionType = {
	'스피드 게임': { color: '#E1DEBF', icon: <ActivityIcon01 /> },
	'감사 서클': { color: '#CADDD4', icon: <ActivityIcon03 /> },
	'기분 체크인': { color: '#CAD1DD', icon: <ActivityIcon04 /> },
	'미니 네트워킹': { color: '#D0CADD', icon: <ActivityIcon02 /> },
};

export default ACTIVITY_FIGCAPTION;

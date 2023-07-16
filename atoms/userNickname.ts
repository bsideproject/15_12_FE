import { atom } from 'recoil';

const userNickname = atom<string>({
	key: 'userNickname',
	default: '',
});

export default userNickname;

import { atom } from 'recoil';

const usePublish = atom<
	(
		sendUrl: string,
		value?:
			| {
					[key: string]: string | number;
			  }
			| undefined,
	) => void
>({
	key: 'publish',
	default: () => {},
});

const usePayload = atom<any>({
	key: 'payload',
	default: '',
});

const useDisconnect = atom<() => void>({
	key: 'disconnect',
	default: () => {},
});

export { usePublish, usePayload, useDisconnect };

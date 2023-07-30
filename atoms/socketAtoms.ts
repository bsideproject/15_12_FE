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

const useResult = atom<any>({
	key: 'result ',
	default: '',
});

const useCount = atom<number>({
	key: 'count',
	default: 1,
});

const useSubmitCount = atom<number>({
	key: 'submitCount',
	default: 0,
});

const useDisconnect = atom<() => void>({
	key: 'disconnect',
	default: () => {},
});

export { usePublish, usePayload, useResult, useCount, useSubmitCount, useDisconnect };

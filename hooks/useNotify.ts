import { toast } from 'react-toastify';

const useNotify = () => {
	const notify = {
		success: (message: string) => toast.success(message),
		error: (message: string) => toast.error(message),
		warning: (message: string) => toast.warning(message),
		info: (message: string) => toast.info(message),
	};

	return notify;
};

export default useNotify;

import { toast } from "react-toastify";

const error = (message: string) => toast.error(message, {});

const success = (message: string) => toast.success(message, {});

const warning = (message: string) => toast.warning(message, {});

const info = (message: string) => toast.info(message, {});

export { error, success, warning, info };

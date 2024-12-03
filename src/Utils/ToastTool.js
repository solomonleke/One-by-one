import { toast } from 'react-toastify';



import 'react-toastify/dist/ReactToastify.css';

export function showToast({
    type,
    message,
}) {
    if (type === 'error') toast.error(message);
   if (type === 'success') toast.success(message);
    return;
}
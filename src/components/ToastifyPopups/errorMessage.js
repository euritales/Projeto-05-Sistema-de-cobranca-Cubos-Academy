import { toast } from "react-toastify";

function ErrorMessage(message) {
  return toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    draggable: true,
  });
}

export default ErrorMessage;

import { toast } from "react-toastify";

function SucessMessage(message) {
  return toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
}

export default SucessMessage;

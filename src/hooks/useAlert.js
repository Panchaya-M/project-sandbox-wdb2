// useAlert.js
import Swal from "sweetalert2";

const useAlert = () => {
  const success = (title = "Success", timer = 8000) => {
    Swal.fire({
      toast: true,
      position: "top-right",
      icon: "success",
      title,
      showConfirmButton: false,
      timer,
    });
  };

  const error = (title = "Error", timer = 8000) => {
    Swal.fire({
      toast: true,
      position: "top-right",
      icon: "error",
      title,
      showConfirmButton: false,
      timer,
    });
  };

  const warning = (title = "Warning", timer = 2000) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title,
      showConfirmButton: false,
      timer,
    });
  };

  return { success, error, warning };
};

export default useAlert;

import Close from "../../assets/close.svg";

/* eslint-disable react/prop-types */
function Modal({ header = "", children, footer, closeModal }) {
  return (
    <div
      className="relative z-[1000]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-[900px]">
            <div className="bg-white p-4">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="flex justify-between items-center">
                  <h6 className="text-h6Bold text-black-900" id="modal-title">
                    {header}
                  </h6>
                  <button onClick={closeModal}>
                    <img src={Close} alt="close" />
                  </button>
                </div>

                <div className="mt-2">{children}</div>
              </div>
            </div>
            <div className="p-4 modal-footer">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

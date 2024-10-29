import SecondaryButton from "./SecondaryButton";
import Arrow from "../../assets/arrow_down.svg";
import { useEffect, useRef, useState } from "react";

function Dropdown({
  width = "25%",
  options = [],
  disabled = false,
  selectedItem,
  setSelectedItem,
}) {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="pr-2 relative" style={{ width: width }}>
      <SecondaryButton
        text={selectedItem}
        icon={Arrow}
        onClick={() => setIsOpenOptions(!isOpenOptions)}
        customClassName="w-full"
        customStyle={{
          justifyContent: "space-between",
          paddingRight: "20px",
        }}
        customIconStyle={{ width: "14px" }}
        disabled={disabled}
      />

      {/* options */}
      <div
        className={`absolute w-full top-[100%] right-1 grid whitespace-nowrap mt-1 border border-grey-300 bg-white z-10 ${
          isOpenOptions ? "" : "hidden"
        }`}
        onBlur={() => setIsOpenOptions(false)}
      >
        {options.map((option) => {
          return (
            <button
              key={`options-${option}`}
              className={`w-full flex justify-start items-center gap-x-4 px-6 py-2 hover:bg-[#F2F2F2] ${
                selectedItem === option ? "bg-limeGreen" : ""
              }`}
              onClick={() => {
                setSelectedItem(option);
                setIsOpenOptions(false);
              }}
            >
              <span className="text-sm">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Dropdown;

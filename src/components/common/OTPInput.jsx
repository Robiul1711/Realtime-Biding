import React, { useRef, useState } from "react";

const OtpInput = () => {
  const [autoOtp, setAutoOtp] = useState("");
  const navigationInputs = useRef([]);

  const length = 4;

  const onChange = (value) => {
    setAutoOtp(value);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...navigationInputs.current.map((input) => input.value)];

    if (/^[0-9]$/.test(value) && value.length === 1) {
      newOtp[index] = value;
      onChange(newOtp.join(""));
    } else if (value === "") {
      newOtp[index] = "";
      onChange(newOtp.join(""));
    } else {
      e.target.value = value.slice(0, 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-[10px] w-full xl:w-[50%]">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (navigationInputs.current[index] = el)}
            className="p-3 text-center dark:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#bcbcbc] rounded-md outline-none focus:border-[#001767]"
            onWheel={(e) => e.target.blur()}
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
      </div>
      <p className="text-[#4B5563] text-sm md:text-[16px] my-6">
        We've sent a 6 desist verification code to your email. Check your spam,
        folder in case you didn't receive the code.{" "}
      </p>
    </div>
  );
};

export default OtpInput;

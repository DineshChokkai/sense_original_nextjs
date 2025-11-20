import React, { useState } from "react";
import {
  BsEyeSlash,
  BsEye,
  BsEnvelope,
  BsLock,
  BsSearch,
  BsPersonPlus,
  BsWrench,
} from "react-icons/bs";

const iconMap = {
  icon1: BsEnvelope,
  icon2: BsLock,
  icon3: BsSearch,
  icon4: BsPersonPlus,
  icon5: BsWrench,
};

const FormInput = ({
  title,
  type,
  value,
  onChange,
  name,
  placeholder,
  icon,
  onKeyDown,
  disabled,
  maxLength,
  min,
  max,
  className,
  mandatory = false,
  error,
}) => {
  const IconComponent = iconMap[icon];
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className={`relative w-full ${className || ""}`}>
      <span className="text-dark-gray text-base pb-2.5 font-semibold md:text-base">
        {title}
        {mandatory && <span className="text-red-500 ml-1">*</span>}
      </span>

      <div
        className={`flex items-center border border-gray-200 rounded-md bg-white p-3 mt-1.5 relative
          ${icon ? "pl-11" : ""}
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}
          focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-200`}
      >
        {IconComponent && (
          <div className="absolute left-4 flex items-center">
            <IconComponent className="text-gray-500 w-4 h-4" />
          </div>
        )}

        <input
          className={`border-none w-full bg-transparent text-dark-gray text-base font-medium
            focus:outline-none placeholder:text-gray-500 placeholder:font-normal
            disabled:cursor-not-allowed`}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          disabled={disabled}
          min={min}
          max={max}
          step="0.1"
        />

        {type === "password" && (
          <div
            className="absolute right-4 cursor-pointer flex items-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <BsEye className="text-gray-500 w-4 h-4" />
            ) : (
              <BsEyeSlash className="text-gray-500 w-4 h-4" />
            )}
          </div>
        )}
      </div>

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default FormInput;

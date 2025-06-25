export const Title26 = ({ className, children }) => {
  return (
    <p
      className={` ${className} text-[26px] text-custom-black font-bold leading-[26px]`}
    >
      {" "}
      {children}
    </p>
  );
};
export const Title12 = ({ className, children }) => {
  return (
    <p
      className={` ${className} text-xs text-customSecondary font-normal leading-[12px] traking-[1px]`}
    >
      {" "}
      {children}
    </p>
  );
};

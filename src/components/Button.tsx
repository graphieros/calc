import "../styles/button.css";

const Button = ({
  action,
  value,
  type,
  className,
}: {
  action: (e: any) => void;
  value: number | string;
  type: string;
  className: string;
}) => {
  return (
    <button
      data-value={value}
      data-type={type}
      className={className}
      onClick={action}
    >
      {value}
    </button>
  );
};

export default Button;

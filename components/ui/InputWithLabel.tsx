interface InputWithLabelProps {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  id: string;
  name: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  active?: boolean;
  minLength?: number;
  maxLength?: number;
}

export default function InputWithLabel({ label, type, placeholder, required = true, id, name, className, value, onChange, active = true, minLength, maxLength }: InputWithLabelProps) {


  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {

  };

  return (<div>
    <label htmlFor={name} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}>{label}</label>
    <input type={type} name={name} disabled={!active} id={name} placeholder={placeholder} value={value} onChange={onChange} autoComplete={type === "password" ? "current-password" : ""} className={`${active ? "cursor-pointer bg-gray-50 border-gray-300 text-gray-900" : "bg-neutral-600 text-neutral-400 border-neutral-700"} border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required={required} minLength={minLength} maxLength={maxLength} />
  </div>)
}
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
}

export default function InputWithLabel({ label, type, placeholder, required = true, id, name, className, value, onChange }: InputWithLabelProps) {

  return (<div>
    <label htmlFor={name} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}>{label}</label>
    <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={required} />
  </div>)
}
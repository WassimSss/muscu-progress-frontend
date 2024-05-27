interface optionObject {
  value: string;
  label: string;
}

interface SelectWithLabelProps {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  className?: string;
  option: optionObject[];
}

export default function SelectWithLabel({ label, name, required, className, option }: SelectWithLabelProps) {

  const optionJSX = option.map((option, i) => {
    return <option value={option.value} key={i}>{option.label}</option>
  });

  return (<div>
    <label htmlFor={name} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}>{label}</label>
    <select id={name} required={required} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      {optionJSX}
    </select>
  </div >);
}
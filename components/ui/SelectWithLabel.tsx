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
  onChange: (value: string) => void;
  active?: boolean;
  text?: string | null;
}

export default function SelectWithLabel({ label, name, required, className, option, onChange, active = true, text = null }: SelectWithLabelProps) {


  const optionJSX = [active ? {
    value: "",
    label: text ? text : "Sélectionner une option"
  } : null, ...option].map((option, i) => {
    if (option) {
      return <option value={option.value} key={i}>{option.label}</option>
    }
    return null;
  });

  // const optionJSX = option.map((option, i) => {
  //   return <option value={option.value} key={i}>{option.label}</option>
  // });

  return (<div>
    <label htmlFor={name} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}>{label}</label>
    <select id={name} required={required} disabled={!active} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (onChange(e.target.value))} className={`${active ? "cursor-pointer bg-gray-50 border-gray-300 text-gray-900" : "bg-neutral-600 text-neutral-400 border-neutral-700"}   border    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
      {active ? optionJSX : <option value="" disabled selected>Non disponible</option>}
    </select>
  </div >);
}
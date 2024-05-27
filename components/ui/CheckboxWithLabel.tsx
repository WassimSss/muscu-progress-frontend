interface CheckboxWithLabelProps {
  label?: string;
  id: string;
  name: string;
  required?: boolean;
  textLink?: string;
  url?: string;
}

export default function CheckboxWithLabel({ label, id, name, required = true, textLink, url }: CheckboxWithLabelProps) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={required} />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">{label} {textLink && <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href={url}>{textLink}</a>}</label>
      </div>
    </div>
  )
}
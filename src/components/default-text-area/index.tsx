import { Textarea } from '@material-tailwind/react';

interface IDefaultTextAreaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DefaultTextArea = ({ label, value, onChange, placeholder }: IDefaultTextAreaProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <Textarea value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default DefaultTextArea;

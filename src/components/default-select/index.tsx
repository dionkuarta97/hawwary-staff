import { Select } from '@material-tailwind/react';

interface IDefaultSelectProps {
  options: { label: string; value: string }[];
  placeholder: string;
  onSelect: (value: string) => void;
  value: string;
}

const DefaultSelect = ({ options, placeholder, onSelect, value }: IDefaultSelectProps) => {
  return (
    <Select size="md">
      <Select.Trigger value={value} defaultValue={value} placeholder={placeholder} />
      <Select.List>
        {options.map(option => (
          <Select.Option
            key={option.value}
            value={option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </Select.Option>
        ))}
      </Select.List>
    </Select>
  );
};

export default DefaultSelect;

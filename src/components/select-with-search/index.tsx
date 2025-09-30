import { useState, useRef } from 'react';
import { Menu, Input } from '@material-tailwind/react';
import InputWithLabel from '../input-with-label';

interface ISelectWithSearchProps {
  label?: string;
  content: React.ReactNode;
  onSearch?: (searchTerm: string) => void;
  value?: string;
}

function SelectWithSearch({ label, content, onSearch, value }: ISelectWithSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <Menu>
      <Menu.Trigger>
        <div ref={triggerRef} className="w-full">
          <InputWithLabel
            label={label || ''}
            placeholder="Select an option"
            value={value}
            onChange={e => {
              setSearchTerm(e.target.value);
              onSearch?.(e.target.value);
            }}
          />
        </div>
      </Menu.Trigger>
      <Menu.Content style={{ width: triggerRef.current?.offsetWidth }}>
        <div className="p-2 w-full">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              onSearch?.(e.target.value);
            }}
          />
        </div>
        {content}
      </Menu.Content>
    </Menu>
  );
}

export default SelectWithSearch;

'use client';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface AddressInputProps {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<AddressInputProps> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="3f0961cf1762b8c3bab8ecf84e93b142a82bf659"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};

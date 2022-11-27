import { FC } from 'react';
import { Button as Btn } from '@mui/material';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  click?: () => void;
}

export const Button: FC<ButtonProps> = ({
  label,
  disabled = false,
  click = () => null,
}) => (
  <Btn disabled={disabled} variant="contained" type="submit" onClick={click} style={{ color: 'red' }}>
    {label}
  </Btn>
);

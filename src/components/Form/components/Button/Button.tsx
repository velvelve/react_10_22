import { FC } from 'react';
import { Button as Btn } from '@mui/material';

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  click?: () => void;
  render?: (label: string) => JSX.Element;
}

export const Button: FC<ButtonProps> = ({
  disabled = false,
  click = () => null,
  render,
}) => (
  <Btn
    disabled={disabled}
    variant="contained"
    type="submit"
    onClick={click}
    style={{ color: 'red' }}
    data-testid="button"
  >
    {render && render('Send')}
  </Btn>
);

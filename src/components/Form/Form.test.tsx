/** @jest-environment jsdom */
import { Form } from './Form';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
describe('Form', () => {
  it('render component', () => {
    render(<Form />);
  });

  it('input change with fireEvent', () => {
    render(<Form />);

    const input = screen.getByTestId<HTMLInputElement>('input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');
  });

  it('input change with userEvent', async () => {
    render(<Form />);

    const input = screen.getByTestId<HTMLInputElement>('input');

    await userEvent.type(input, 'new value');
    expect(input.value).toBe('new value');
  });

  it('button click with fireEvent', () => {
    const addMessage = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        chatId: '21312',
      }),
      useRouteMatch: () => ({ url: '/chats/21312' }),
    }));
    render(<Form />);

    const input = screen.getByTestId<HTMLInputElement>('input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');

    const button = screen.getByTestId<HTMLButtonElement>('button');
    fireEvent.click(button);
    expect(addMessage).toHaveBeenCalledTimes(0);
  });
});

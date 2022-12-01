/** @jest-environment jsdom */
import { App } from './App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('App test', () => {
  it('render component', () => {
    render(<App />);
  });

  it('send user message', async () => {
    render(<App />);

    const input = screen.getByTestId<HTMLInputElement>('input');
    await userEvent.type(input, 'Hello world');

    const button = screen.getByTestId<HTMLButtonElement>('button');
    await userEvent.click(button);

    expect(screen.getAllByTestId('li').length).toBe(1);
  });

  it('bot answer', async () => {
    render(<App />);

    const input = screen.getByTestId<HTMLInputElement>('input');
    await userEvent.type(input, 'Hello world');

    const button = screen.getByTestId<HTMLButtonElement>('button');
    await userEvent.click(button);

    expect(
      await screen.findByText(/Human/, undefined, { timeout: 1600 })
    ).toBeInTheDocument();
  });
});

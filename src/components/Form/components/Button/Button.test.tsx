/** @jest-environment jsdom */
import { Button } from './Button';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('render component', () => {
    render(<Button />);
  });

  it('render multiply components', () => {
    render(
      <>
        <Button />
        <Button />
      </>
    );
    expect(screen.queryAllByRole('button').length).toBe(2);
  });

  it('button is disabled', () => {
    render(<Button disabled />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('button click with userEvent', async () => {
    const mockHandler = jest.fn();
    render(<Button click={mockHandler} />);

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockHandler).toHaveBeenCalledTimes(1));
  });

  it('button async click', async () => {
    const mockHandler = jest.fn();
    render(<Button click={() => setTimeout(mockHandler, 1500)} />);

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockHandler).toHaveBeenCalledTimes(1), {
      timeout: 1600,
    });
  });

  it('test example', async () => {
    const onChange = jest.fn();
    render(<input type="checkbox" onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');

    await userEvent.dblClick(checkbox);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });
});

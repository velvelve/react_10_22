/** @jest-environment jsdom */
import { MessageList } from './MessageList';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MessageList test', () => {
  it('render component', () => {
    render(<MessageList messages={[]} />);
  });

  it('message list is empty', () => {
    render(<MessageList messages={[]} />);

    expect(screen.queryAllByTestId('li').length).toBe(0);
  });
});

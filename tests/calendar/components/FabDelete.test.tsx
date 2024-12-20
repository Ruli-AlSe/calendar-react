import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

jest.mock('../../../src/hooks/useCalendarStore');

describe('Testing <FabDelete />', () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should render the component correctly', () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');

    expect(btn.classList).toContain('btn');
    expect(btn.classList).toContain('btn-danger');
    expect(btn.classList).toContain('fab-danger');
    expect(btn.style.display).toBe('none');
  });

  test('should show the button if there is an activeEvent', () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      hasEventSelected: true,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');

    expect(btn.style.display).toBe('');
  });

  test('should call startDeletingEvent when click', () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');
    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});

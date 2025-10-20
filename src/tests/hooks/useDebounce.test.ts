import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

jest.useFakeTimers();

test('useDebounce updates value after delay', () => {
  const { result, rerender } = renderHook(({ val, delay }) => useDebounce(val, delay), {
    initialProps: { val: 'a', delay: 500 }
  });

  expect(result.current).toBe('a');

  rerender({ val: 'b', delay: 500 });
  expect(result.current).toBe('a');

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(result.current).toBe('b');
});

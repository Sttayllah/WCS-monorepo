import { Avatar } from './components/static/Avatar';
import { render, screen } from '@testing-library/react';

describe('Avatar', () => {
  it('render an image', () => {
    render(<Avatar src="test" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('render an avatar if no img', () => {
    render(<Avatar avatarColor="#000" />);
    expect(screen.getByText(/person-fill/)).toBeInTheDocument();
  });
});

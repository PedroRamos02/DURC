import { Submitbutton } from ".";
import { render, screen } from '@testing-library/react';

describe('SubmitButton', () => {
  it('Renderiza botão com texto correto', () => {
    render(<Submitbutton text={'logar'} />);
    expect(screen.getByText)
  })
})
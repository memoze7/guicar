/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  render(<Home />)
  const linkSignIn = screen.getByText('Iniciar sesión')

  it('The login link exists and is not invisible', () => {
    expect(linkSignIn).toBeInTheDocument()
  })

  it('The login link is visible', () => {
    expect(linkSignIn).not.toBeVisible()
  })
})

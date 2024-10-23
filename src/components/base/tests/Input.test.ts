import { render, screen } from '@testing-library/svelte'
import { describe } from 'vitest'

import Input from '../Input.svelte'

describe('Input.svelte', () => {
  test('displays an error message when passed as props', () => {
    render(Input, { errorMessage: 'Invalid value' })

    const span = screen.getByText('Invalid value')

    expect(span).toBeDefined()
  })

  test('not displays an error when there is no error message', () => {
    render(Input)

    const span = screen.queryByText('Error message')

    expect(span).toBeNull()
  })

  test('adds an error class to the input with an error', () => {
    const label = 'test label'

    render(Input, { label, errorMessage: 'Error message' })

    const input = screen.getByLabelText(label)

    expect(input.classList).toContain('error-input')
  })
})

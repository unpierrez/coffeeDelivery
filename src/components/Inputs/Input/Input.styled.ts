import styled, { css } from 'styled-components'
import { InputStyleContainerProps } from './Input.types'

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;

  & > p {
    color: ${({ theme }) => theme.colors['base-error']};
  }
`

export const InputStyleContainer = styled.div<InputStyleContainerProps>`
  height: 2.625rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors['base-button']};
  background: ${({ theme }) => theme.colors['base-input']};
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors['brand-yellow-dark']};
  }

  ${({ theme, hasError }) =>
    hasError &&
    css`
      border-color: ${theme.colors['base-error']};
    `}
`

export const InputStyled = styled.input`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  font-size: 0.75rem;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors['base-text']};
`

export const RightText = styled.p`
  font-size: 0.75rem;
  font-style: italic;
  margin-right: 0.75rem;
  color: ${({ theme }) => theme.colors['base-label']};
`

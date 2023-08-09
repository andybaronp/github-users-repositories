'use client'
import Image from 'next/image'
import { styled } from 'styled-components'

export const ImageContainer = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  width: 120px;
  height: 120px;
`

export const ImageAvatar = styled(ImageContainer)`
 margin-right: 36px;
  border-radius: 50%;
  height: 117px;
  width: 117px;

`

export const MainSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--bg-secondary);
  box-shadow: 0 16px 30px -10px rgba(70, 96, 187, 0.2);
  border-radius: 15px;
  padding: 48px;
`

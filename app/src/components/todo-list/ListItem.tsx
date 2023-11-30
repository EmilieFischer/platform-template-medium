'use client'
import { MdCheckCircle, MdPanoramaFishEye } from 'react-icons/md'
import { FC, useState } from 'react'
import { ListItem as ChakraListItem, ListIcon, Box } from '@chakra-ui/react'
import Link from 'next/link'
import { Todo } from '@prisma/client'

type Props = {
  todo: Todo
}

const ListItem: FC<Props> = ({ todo }) => {
  const [completed, setCompleted] = useState(false)
  const icon = completed ? MdCheckCircle : MdPanoramaFishEye

  const handleClick = () => {
    if (completed) {
      const isConfirmed = window.confirm(
        'This will mark the TODO item as non-completed. Are you sure?',
      )
      if (isConfirmed) {
        setCompleted(false)
      }
    } else {
      setCompleted(!completed)
    }
  }

  return (
    <>
      <ChakraListItem onClick={handleClick}>
        <ListIcon as={icon} color={completed ? 'green.500' : 'gray.500'} />
        <Link href={`/todo/${todo.id}`}>{todo.text}</Link>
      </ChakraListItem>
    </>
  )
}

export default ListItem

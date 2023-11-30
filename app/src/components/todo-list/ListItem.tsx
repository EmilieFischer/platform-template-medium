'use client'
import { MdCheckCircle, MdPanoramaFishEye } from 'react-icons/md'
import { FC, useState } from 'react'
import { ListItem as ChakraListItem, ListIcon, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { Todo } from '@prisma/client'
import { FaArrowRight } from 'react-icons/fa'

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
    <Flex alignItems='center'>
      <ListIcon as={icon} color={completed ? 'green.500' : 'gray.500'} />
      <ChakraListItem
        onClick={handleClick}
        cursor='pointer'
        key={todo.id}
        mr={5}
      >
        {todo.text}
      </ChakraListItem>
      <Link href={`/todo/${todo.id}`}>
        <FaArrowRight />
      </Link>
    </Flex>
  )
}

export default ListItem

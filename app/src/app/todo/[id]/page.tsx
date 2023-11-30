import { Text, Badge } from '@chakra-ui/react'
import { fetchTodo } from '../../../components/todo-list/lib/data'
import { Metadata } from 'next'
import { FC } from 'react'
import BackLink from '@/components/common/BackLink'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Todo',
}

type Params = {
  params: {
    id: string
  }
}

const TodoPage: FC<Params> = async ({ params }) => {
  const todo = await fetchTodo(parseInt(params.id, 10))

  if (!todo) {
    return <div>Todo not found</div>
  }

  return (
    <>
      <BackLink />
      <Text fontSize='2em' mb={4}>
        {todo.text}
      </Text>
      <Text mb={2}>
        Created date: {format(new Date(todo.createdAt), 'MMMM dd, yyyy, HH:mm')}
      </Text>
      <Text mb={2}>
        Type:
        <Badge colorScheme={todo.type === 'WORK' ? 'blue' : 'orange'} ml={2}>
          {todo.type}
        </Badge>
      </Text>
      <Text borderBottom='1px' borderColor='black' pb={2} mb={2}>
        Completed:
        <Badge colorScheme={todo.completed ? 'green' : 'red'} ml={2}>
          {todo.completed ? 'Completed' : 'Incomplete'}
        </Badge>
      </Text>
      <Text mb={2}>{todo.description}</Text>
    </>
  )
}

export default TodoPage

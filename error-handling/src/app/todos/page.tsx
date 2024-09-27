import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import TodosComponent from '@/components/TodosComponent';
import prisma from '@/lib/db';

export default async function TodosPage() {
  const todos = await prisma.todo.findMany();


  return (
    <MaxWidthWrapper>
      <main className='flex min-h-screen flex-col items-center 
      w-full p-24'>
        <h1 className="text-3xl font-bold">Todos Page</h1>
    
        <TodosComponent todos={todos}/>

      
      </main>
    </MaxWidthWrapper>
  )
}

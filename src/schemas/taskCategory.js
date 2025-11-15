import z from 'zod';

const taskCategorySchema = z.object({
  name: z.string().min(2).max(25)
});

export  function validateTaskCategory (input){
  return taskCategorySchema.safeParse(input);
}
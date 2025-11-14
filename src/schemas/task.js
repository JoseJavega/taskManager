import z from 'zod';

const taskSchema = z.object({
  title: z.string().min(3).max(25),
  description: z.string().max(25).optional(),
  completed: z.boolean().optional(),
  createdAt: z.string().optional().refine(v => !v || !isNaN(Date.parse(v)), {
    message: "Invalid date format createAt"
  }),
  updatedAt: z.string().optional().refine(v => !v || !isNaN(Date.parse(v)), {
    message: "Invalid date format updateAt"
  }),
    finishedAt: z.string().optional().refine(v => !v || !isNaN(Date.parse(v)), {
    message: "Invalid date format finishedAt"
  })
});

export  function validateTask (input){
  return taskSchema.safeParse(input);
}

export function validatePartialTask (input){
  return taskSchema.partial().safeParse(input);
}
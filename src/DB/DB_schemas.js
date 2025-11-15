import DBlocal from 'db-local';

//ubicacion de la DBlocal
const { Schema } = new DBlocal ({path: './src/DB'});

export const Tasks = Schema('tasks',{
  _id: { type: String, required: true},
  title: { type: String, required: true},
  description: { type: String },
  completed: { type : Boolean, default:false},
  createdAt: { type: String, required: true},
  updatedAt: { type: String},
  finishedAt: { type: String}
});

export const TaskCategories = Schema('taskCategories',{
  _id: { type: String, required: true},
  name:  { type: String, required: true}
});

export class TaskService {
  constructor(apiUrl){
    this.apiClient= `${apiUrl}/tasks`;
  };

  async getAll(){
    try {
      const result= await fetch(this.apiClient);
      const data= await result.json();
      return data;
    } catch (error) {
      return [];
    };
  };

  async getById(id){
  try {
    const result= await fetch(`${this.apiClient}/${id}`);
    const data= await result.json();
    return data;
  } catch (error) {
    console.log('error:',error);
    };
  };

  async save(data) {
    if (!data) { return };

    const taskCompleted = data.finished==='on'? true : false;
    const categoryId = data.categoryId==='none'? '' : data.categoryId;

    try {
      const result = await fetch(`${this.apiClient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          completed: taskCompleted,
          categoryId: categoryId
        })
      });

      const newTask= await result.json()
      return newTask;
    } catch (error) {
      console.error(error);
    };
  };

  async update(data){
    if (!data.id) { return }
    const taskCompleted = data.finished==='on'? true : false;
    try {
      const result = await fetch(`${this.apiClient}/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          completed: taskCompleted
        })
      });

      const updatedTask= await result.json()
      return updatedTask;
    } catch (error) {
      console.log(error);
    ;}
  };

  async delete(id){
    try {
      await fetch(`${this.apiClient}/${id}`,{
        method: 'DELETE'
      });
     return id;
    } catch (error) {
      throw new Error(error);
    };
  };

}
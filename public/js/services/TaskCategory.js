export class TaskCategoryService {
  constructor(apiUrl) {
    this.apiClient = `${apiUrl}/taskCategories`;
  }

  async getAll() {
    try {
      const result = await fetch(this.apiClient);
      const data = await result.json();
      return data;
    } catch (error) {
      return [];
    }
  }

  async getById(id) {
    try {
      const result = await fetch(`${this.apiClient}/${id}`);
      const data = await result.json();
      return data;
    } catch (error) {
      console.log("error:", error);
    }
  }

  async save(data) {
    if (!data) {
      return;
    }
    try {
      const result = await fetch(`${this.apiClient}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data,
        }),
      });

      const newCategory = await result.json();
      return newCategory;
    } catch (error) {
      console.error(error);
    }
  }

  async update(data) {
    if (!data.id) {
      return;
    }
    try {
      const result = await fetch(`${this.apiClient}/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
        }),
      });

      const updatedCategory = await result.json();
      return updatedCategory;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      await fetch(`${this.apiClient}/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      throw new Error(error);
    }
  }
}

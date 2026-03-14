import Todo from "../models/task.model.js";

export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: req.body.completed,
      user: req.userId, // assosiated todo with loggedin user
    });
    await newTodo.save();
    res.status(201).json({ msg: " todo created succesfully", newTodo });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Error creating todo", error });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }); // fetch todos for the logged-in user
    res.status(200).json({ msg: "todo fetched succesfully ", todos });
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true } // accept the new update value
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};

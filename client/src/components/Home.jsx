import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Circle, Trash2, Plus, LogOut, Sparkles, Loader2, Calendar } from "lucide-react";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("jwt");

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchtodos = async () => {
      if(!token) return;
      try {
        setLoading(true);
        const response = await axios.get("https://task-managment-server-p2am.onrender.com/api/todo/fetch", {
          headers: {
            token: token
          }
        });
        setTodos(response.data.todos || []);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, [token]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername("Guest");
    }
  }, []);

  const todoCreate = async (e) => {
    e?.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(
        "https://task-managment-server-p2am.onrender.com/api/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          headers: {
            token: token
          }
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
      toast.success("Task added smoothly! ✨");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if(!todo) return;
    
    // Optimistic UI update
    setTodos(todos.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t)));
    
    try {
      const response = await axios.put(
        `https://task-managment-server-p2am.onrender.com/api/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          headers: {
            token: token
          }
        }
      );
      // Ensure backend returned state matches
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      // Revert if error
      setTodos(todos.map((t) => (t._id === id ? { ...t, completed: todo.completed } : t)));
      toast.error("Failed to update status");
    }
  };

  const todoDelete = async (id) => {
    const previousTodos = [...todos];
    // Optimistic update
    setTodos(todos.filter((t) => t._id !== id));
    
    try {
      await axios.delete(`https://task-managment-server-p2am.onrender.com/api/todo/delete/${id}`, {
        headers: {
          token: token
        }
      });
      toast.success("Task cleared! 🧹");
    } catch (error) {
      // Revert
      setTodos(previousTodos);
      toast.error("Failed to delete task");
    }
  };

  const logout = () => {
    toast.success("Logged out successfully 👋");
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    navigateTo("/login");
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header Bar */}
        <header className="flex justify-between items-center mb-10 glass-card px-6 py-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Hi, {username}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Calendar className="w-3 h-3" /> {dateStr}
              </p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </header>

        {/* Main Content Area */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">My Tasks</h2>
            <p className="text-slate-500">
              {remainingTodos > 0 
                ? `You have ${remainingTodos} pending task${remainingTodos.length > 1 ? 's' : ''}. Let's get them done!` 
                : "You're all caught up! Enjoy your day or add something new."}
            </p>
          </div>

          {/* Input Area */}
          <form onSubmit={todoCreate} className="relative group mb-10 shadow-sm transition-all duration-300 hover:shadow-md rounded-2xl">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full px-6 py-4 pr-16 bg-white/60 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!newTodo.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          {/* Task List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-indigo-500">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="font-medium text-sm">Loading your workspace...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100">
              {error}
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-16 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">No tasks yet</h3>
              <p className="text-slate-500 text-sm">Add a task above to start organizing your day.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${
                    todo.completed 
                      ? "bg-slate-50 border-slate-100 shadow-sm" 
                      : "bg-white border-white hover:border-indigo-100 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 cursor-pointer overflow-hidden" onClick={() => todoStatus(todo._id)}>
                    <button 
                      className={`flex-shrink-0 transition-colors ${
                        todo.completed ? "text-indigo-500" : "text-slate-300 hover:text-indigo-400"
                      }`}
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="w-6 h-6 animate-in zoom-in" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    
                    <span
                      className={`text-base truncate transition-all duration-300 ${
                        todo.completed
                          ? "line-through text-slate-400 font-medium"
                          : "text-slate-700 font-semibold"
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => todoDelete(todo._id)}
                    className="flex-shrink-0 ml-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
                    title="Delete task"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm font-medium">Keep up the great momentum! 🚀</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

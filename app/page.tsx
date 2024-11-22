"use client";
import React, { useState, useEffect, Suspense } from "react";
import { createTodo, updateTodo, deleteTodo } from "./lib/actions";
import TodoItem from "./ui/todo-item";
import { fetchAllTodos } from "./lib/data";
import SkeletonLoader from "./ui/SkeletonLoader"; // Import SkeletonLoader

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const allTodos = await fetchAllTodos();
        setTodos(allTodos);
      } catch (err) {
        setError("Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) =>
    todo.task_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("task_name", newTodo);
      formData.append("completed", "false");

      await createTodo(formData);

      setNewTodo("");
      const updatedTodos = await fetchAllTodos();
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to add todo.");
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("task_name", todos.find((todo) => todo.id === id).task_name);
      formData.append("completed", (!completed).toString());

      await updateTodo(id, formData);

      const updatedTodos = await fetchAllTodos();
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to update todo.");
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (id, newTaskName) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("task_name", newTaskName);
      formData.append("completed", todos.find((todo) => todo.id === id).completed.toString());

      await updateTodo(id, formData);

      const updatedTodos = await fetchAllTodos();
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to edit todo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteTodo(id);
      const updatedTodos = await fetchAllTodos();
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to delete todo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#1e1e1e", minHeight: "100vh", color: "#fff" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks"
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "90%",
          borderRadius: "4px",
          border: "1px solid #555",
          backgroundColor: "#333",
          color: "#fff",
        }}
      />

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          style={{
            padding: "10px",
            flex: 1,
            borderRadius: "4px",
            border: "1px solid #555",
            backgroundColor: "#333",
            color: "#fff",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          + Add Task
        </button>
      </div>

      <Suspense fallback={<SkeletonLoader />}>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo}
              onToggleComplete={() => toggleComplete(todo.id, todo.completed)}
            onEdit={(id, newTaskName) => editTodo(id, newTaskName)}
            onDelete={() => handleDelete(todo.id)}
              /* Add your props here */ />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Home;
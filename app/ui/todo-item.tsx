// app/components/todo-item.tsx

import React, { useState } from 'react';
import { Todo } from '../interfaces/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number, task_name: string) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTaskName: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.task_name);

  const handleEdit = () => {
    if (newText.trim() && newText !== todo.task_name) {
      onEdit(todo.id, newText);
      setIsEditing(false);  // Close edit mode
    }
  };

  return (
    <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0',
    padding: '10px 15px',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
    color: '#fff',
  }}
>
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => onToggleComplete(todo.id, todo.task_name)}
    style={{
      marginRight: '15px',
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: '#28a745', // Modern browsers support this for styling checkboxes
    }}
  />
  {isEditing ? (
    <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
      <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        style={{
          marginRight: '10px',
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #555',
          width: '100%',
          backgroundColor: '#2a2a2a',
          color: '#fff',
        }}
      />
      <button
        onClick={handleEdit}
        style={{
          padding: '6px 12px',
          cursor: 'pointer',
          borderRadius: '4px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          transition: 'background-color 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
      >
        Save
      </button>
    </div>
  ) : (
    <span
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        flexGrow: 1,
        padding: '0 10px',
        fontSize: '16px',
        textAlign: 'left'
      }}
    >
      {todo.task_name}
    </span>
  )}
  <div style={{ display: 'flex', gap: '8px' }}>
    <button
      onClick={() => onDelete(todo.id)}
      style={{
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        transition: 'background-color 0.2s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
    >
      Delete
    </button>
    {!isEditing && !todo.completed && (
      <button
        onClick={() => setIsEditing(true)}
        style={{
          padding: '6px 12px',
          cursor: 'pointer',
          borderRadius: '4px',
          backgroundColor: '#ffc107',
          color: '#000',
          border: 'none',
          transition: 'background-color 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0a800')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffc107')}
      >
        Edit
      </button>
    )}
  </div>
</div>

  );
};

export default TodoItem;

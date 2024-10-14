import React, { useEffect, useState } from 'react';
import './index.css';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa'; // Importamos los iconos de Font Awesome

import InstallButton from './InstallButton';

function ToDoList() {
  const [tareas, setTareas] = useState([
    {
      id: 1,
      texto: 'Comprar leche',
      completada: false
    },
    {
      id: 2,
      texto: 'Hacer ejercicio',
      completada: false
    },
  ]);

  const [nuevaTarea, setNuevaTarea] = useState({
    texto: '',
    completada: false
  });

  const agregarTarea = (e) => {
    e.preventDefault();
    const nuevaTareaId = tareas.length + 1;
    const nuevaTareaCompleta = { id: nuevaTareaId, ...nuevaTarea };
    setTareas([...tareas, nuevaTareaCompleta]);
    setNuevaTarea({ texto: '', completada: false });
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: !tarea.completada };
      }
      return tarea;
    }));
  };

  return (
    <div className="to-do-list">
      <h1>Lista de tareas</h1>
      
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
            <span>{tarea.texto}</span>
            <button className="eliminar" onClick={() => eliminarTarea(tarea.id)}>
              <FaTrash /> 
            </button>
            <button className="completar" onClick={() => toggleCompletada(tarea.id)}>
              <FaCheck />
            </button>
          </li>
        ))}
      </ul>
      
      <form onSubmit={agregarTarea}>
        <h2>Agregar tarea</h2>
        <label>
          Tarea:
          <input 
            type="text" 
            value={nuevaTarea.texto} 
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, texto: e.target.value })} 
          />
        </label>
        <button type="submit">
          <FaPlus /> 
        </button>
      </form>

      <h1>Bienvenido a Mi PWA</h1>
      <InstallButton />
      
    </div>
  );
}

export default ToDoList;


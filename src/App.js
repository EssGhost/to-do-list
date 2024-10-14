import React, { useEffect, useState } from 'react';
import './index.css';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa'; // Importamos los iconos de Font Awesome


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

//
const [deferredPrompt, setDeferredPrompt] = useState(null);
const [showInstallPrompt, setShowInstallPrompt] = useState(false);

useEffect(() => {
  const handleBeforeInstallPrompt = (e) => {
    e.preventDefault(); // Previene que el prompt se muestre automáticamente
    setDeferredPrompt(e); // Almacena el evento para usarlo más tarde
    setShowInstallPrompt(true); // Muestra el botón de instalación
  };

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

  return () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  };
}, []);

const handleInstallClick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Muestra el prompt de instalación
    const { outcome } = await deferredPrompt.userChoice; // Espera la elección del usuario
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null); // Reinicia el estado
    setShowInstallPrompt(false); // Oculta el botón de instalación
  }
};
//
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
      
      <h1>Bienvenido a mi PWA</h1>
      {showInstallPrompt && (
        <button onClick={handleInstallClick}>Instalar App</button>
      )}
    </div>
    
  );
}

export default ToDoList;


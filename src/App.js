import React, { useEffect, useState } from 'react';
import './index.css';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa'; // Importamos los iconos de Font Awesome


function ToDoList() {

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevenir el prompt automático
      e.preventDefault();
      // Guardar el evento para lanzarlo manualmente más tarde
      setDeferredPrompt(e);
      // Mostrar un botón o cualquier UI para instalar
      setShowInstallButton(true);
    };

    // Escuchar el evento 'beforeinstallprompt'
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Lanzar el prompt de instalación
      deferredPrompt.prompt();

      // Ver qué decide el usuario
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó la instalación');
        } else {
          console.log('El usuario rechazó la instalación');
        }
        setDeferredPrompt(null);  // Resetear el deferredPrompt
        setShowInstallButton(false);  // Ocultar el botón
      });
    }
  };

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
      
      {/* Mostrar botón solo si el evento beforeinstallprompt fue capturado */}
      {showInstallButton && (
        <button onClick={handleInstallClick}>
          Instalar PWA
        </button>
      )}

    </div>
  );
}

export default ToDoList;


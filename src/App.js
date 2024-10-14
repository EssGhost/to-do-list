// import React, { useState } from 'react';
// import './index.css';
// import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa'; // Importamos los iconos de Font Awesome


// function ToDoList() {
//   const [tareas, setTareas] = useState([
//     {
//       id: 1,
//       texto: 'Comprar leche',
//       completada: false
//     },
//     {
//       id: 2,
//       texto: 'Hacer ejercicio',
//       completada: false
//     },
//   ]);

//   const [nuevaTarea, setNuevaTarea] = useState({
//     texto: '',
//     completada: false
//   });

//   const agregarTarea = (e) => {
//     e.preventDefault();
//     const nuevaTareaId = tareas.length + 1;
//     const nuevaTareaCompleta = { id: nuevaTareaId, ...nuevaTarea };
//     setTareas([...tareas, nuevaTareaCompleta]);
//     setNuevaTarea({ texto: '', completada: false });
//   };

//   const eliminarTarea = (id) => {
//     setTareas(tareas.filter((tarea) => tarea.id !== id));
//   };

//   const toggleCompletada = (id) => {
//     setTareas(tareas.map((tarea) => {
//       if (tarea.id === id) {
//         return { ...tarea, completada: !tarea.completada };
//       }
//       return tarea;
//     }));
//   };

//   return (
//     <div className="to-do-list">
//       <h1>Lista de tareas</h1>
      
//       <ul>
//         {tareas.map((tarea) => (
//           <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
//             <span>{tarea.texto}</span>
//             <button className="eliminar" onClick={() => eliminarTarea(tarea.id)}>
//               <FaTrash /> 
//             </button>
//             <button className="completar" onClick={() => toggleCompletada(tarea.id)}>
//               <FaCheck />
//             </button>
//           </li>
//         ))}
//       </ul>
      
//       <form onSubmit={agregarTarea}>
//         <h2>Agregar tarea</h2>
//         <label>
//           Tarea:
//           <input 
//             type="text" 
//             value={nuevaTarea.texto} 
//             onChange={(e) => setNuevaTarea({ ...nuevaTarea, texto: e.target.value })} 
//           />
//         </label>
//         <button type="submit">
//           <FaPlus /> 
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ToDoList;


import React, { useState, useEffect } from 'react';
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

  const [deferredPrompt, setDeferredPrompt] = useState(null); // Estado para guardar el evento beforeinstallprompt
  const [isInstallable, setIsInstallable] = useState(false); // Estado para manejar la visibilidad del botón de instalación

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Evitamos que el prompt de instalación se dispare automáticamente
      setDeferredPrompt(e); // Guardamos el evento en el estado
      setIsInstallable(true); // Mostramos el botón de instalación
    };

    // Escuchamos el evento 'beforeinstallprompt'
    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler); // Limpiamos el evento al desmontar el componente
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Mostramos el prompt de instalación
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null); // Limpiamos el evento después de que el usuario interactúa
        setIsInstallable(false); // Ocultamos el botón de instalación
      });
    }
  };

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

      {/* Botón de instalación personalizado */}
      {isInstallable && (
        <button onClick={handleInstallClick}>
          Instalar App
        </button>
      )}
    </div>
  );
}

export default ToDoList;




const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(
        /^127(?:\.\d+){0,2}\.\d+$/
      )
  );
  
  const register = (config) => {
    if ('serviceWorker' in navigator) {
      const publicUrl = new URL(
        process.env.PUBLIC_URL,
        window.location.href
      );
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          checkValidServiceWorker(swUrl, config);
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'Este PWA se está ejecutando en modo local.'
            );
          });
        } else {
          registerValidSW(swUrl, config);
        }
      });
    }
  };
  
  const registerValidSW = (swUrl, config) => {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log(
                  'Nuevo contenido disponible; recarga de la página.'
                );
              } else {
                console.log(
                  'Contenido instalado por primera vez; recarga de la página.'
                );
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  };
  
  const checkValidServiceWorker = (swUrl, config) => {
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          'No se pudo conectar al Service Worker. ¿Estás en modo offline?'
        );
      });
  };
  
  export { register };
  
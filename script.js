/* script.js
   - Cuenta regresiva hacia 21 Nov 2025 19:00 (7:00 PM)
   - Evita números negativos: pone 0 cuando pase la fecha
   - Inicia al cargar y actualiza cada segundo
*/

(function(){
  // Fecha objetivo (ajustada a zona local del navegador)
  const target = new Date("2025-11-21T19:00:00");

  // Elementos DOM
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');

  function pad(n){ return String(n).padStart(2,'0'); }

  function update() {
    const now = new Date();
    let diff = target - now;

    if (diff <= 0) {
      // Evento pasado o en curso: mostrar ceros y detener count
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);
  }

  // Safety: si algún elemento no existe, no fallar
  if (elDays && elHours && elMinutes && elSeconds) {
    update();
    const timer = setInterval(update, 1000);
  } else {
    // no hay elementos (por si pruebas fragmentadas)
    console.warn("Elementos del countdown no encontrados en DOM.");
  }
})();
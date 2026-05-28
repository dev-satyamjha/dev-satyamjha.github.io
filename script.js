document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrix-bg");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    function updateClock() {
      const clockElements = document.querySelectorAll(".live-clock");
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const timeString = `${hours}:${minutes}:${seconds}`;

      clockElements.forEach((clock) => {
        clock.textContent = timeString;
      });
    }
    setInterval(updateClock, 1000);
    updateClock();
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    let drops = Array(Math.floor(columns)).fill(1);

    window.addEventListener("resize", () => {
      columns = canvas.width / fontSize;
      drops = Array(Math.floor(columns)).fill(1);
    });

    function drawMatrix() {
      ctx.fillStyle = "rgba(15, 20, 25, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#4fd6be";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 50);
  }

  const typeElements = document.querySelectorAll(".type-text");

  function typeText(element, text, callback) {
    let i = 0;
    element.innerHTML = "";
    const interval = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 40);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("typed")) {
          const element = entry.target;
          const textToType = element.getAttribute("data-text");

          const promptGroup =
            element.closest(".prompt-group") || element.closest(".window-body");

          element.classList.add("typed");

          typeText(element, textToType, () => {
            const outputDiv = promptGroup.querySelector(".output");
            if (outputDiv) {
              outputDiv.classList.add("fade-in");
            }

            const searchPrompts =
              promptGroup.querySelectorAll(".search-prompt");
            searchPrompts.forEach((prompt, index) => {
              setTimeout(
                () => {
                  prompt.classList.add("fade-in");
                },
                500 * (index + 1),
              );
            });
          });
        }
      });
    },
    { threshold: 0.3 },
  );

  typeElements.forEach((el) => observer.observe(el));
});

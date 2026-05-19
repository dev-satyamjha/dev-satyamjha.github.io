document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("matrix-bg");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const chars = "01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = "rgba(20, 27, 34, 0.05)";
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
                    const windowBody = element.closest(".window-body");

                    element.classList.add("typed");

                    typeText(element, textToType, () => {
                        const outputDiv = windowBody.querySelector(".output");
                        if (outputDiv) {
                            outputDiv.classList.add("fade-in");
                        }

                        const searchPrompts = windowBody.querySelectorAll(".search-prompt");
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

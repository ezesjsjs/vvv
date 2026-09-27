/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const cursorBlur = document.querySelector(".cursor-blur");

document.addEventListener("mousemove", (e) => {

  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  cursorBlur.style.left = `${e.clientX}px`;
  cursorBlur.style.top = `${e.clientY}px`;

});


/* =========================
   START BUTTON
========================= */

const startBtn = document.getElementById("startBtn");
const letterSection = document.getElementById("letter");

startBtn.addEventListener("click", () => {

  letterSection.scrollIntoView({
    behavior: "smooth"
  });

});


/* =========================
   ENVELOPE
========================= */

const envelopeWrapper =
  document.getElementById("envelopeWrapper");

const envelope =
  document.querySelector(".envelope");

const typingText =
  document.getElementById("typingText");


let letterOpened = false;

envelopeWrapper.addEventListener("click", () => {

  if (letterOpened) return;

  letterOpened = true;

  envelope.classList.add("open");

  setTimeout(() => {

    typeWriter(
      "Aku nggak tahu harus mulai dari mana. Jadi mungkin cukup dari satu hal sederhana: terima kasih sudah menjadi seseorang yang berarti."
    );

  }, 1000);

});


/* =========================
   TYPEWRITER
========================= */

function typeWriter(text) {

  let index = 0;

  typingText.innerHTML = "";

  const interval = setInterval(() => {

    typingText.innerHTML += text.charAt(index);

    index++;

    if (index >= text.length) {

      clearInterval(interval);

    }

  }, 35);

}


/* =========================
   MUSIC
========================= */

const musicBtn =
  document.getElementById("musicBtn");

const music =
  document.getElementById("bgMusic");

let playing = false;

musicBtn.addEventListener("click", () => {

  if (!playing) {

    music.play();

    musicBtn.innerHTML = "❚❚";

    playing = true;

  } else {

    music.pause();

    musicBtn.innerHTML = "♫";

    playing = false;

  }

});


/* =========================
   PARTICLE SYSTEM
========================= */

const canvas =
  document.getElementById("particles");

const ctx =
  canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

  constructor() {

    this.x =
      Math.random() * canvas.width;

    this.y =
      Math.random() * canvas.height;

    this.size =
      Math.random() * 1.5 + .3;

    this.speedX =
      (Math.random() - .5) * .3;

    this.speedY =
      (Math.random() - .5) * .3;

    this.opacity =
      Math.random() * .6;

  }

  update() {

    this.x += this.speedX;

    this.y += this.speedY;

    if (this.x < 0) this.x = canvas.width;

    if (this.x > canvas.width) this.x = 0;

    if (this.y < 0) this.y = canvas.height;

    if (this.y > canvas.height) this.y = 0;

  }

  draw() {

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${this.opacity})`;

    ctx.fill();

  }

}


for (let i = 0; i < 100; i++) {

  particles.push(new Particle());

}


function animateParticles() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(particle => {

    particle.update();

    particle.draw();

  });

  requestAnimationFrame(animateParticles);

}

animateParticles();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(
    ".message-container, .gallery-header, .photo-card, .timeline-item, .final-content"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

        }

      });

    },
    {
      threshold: .15
    }
  );


revealElements.forEach(element => {

  element.style.opacity = "0";

  element.style.transform =
    "translateY(60px)";

  element.style.transition =
    "opacity 1s ease, transform 1s ease";

  observer.observe(element);

});


/* =========================
   AGAIN BUTTON
========================= */

const againBtn =
  document.getElementById("againBtn");

againBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

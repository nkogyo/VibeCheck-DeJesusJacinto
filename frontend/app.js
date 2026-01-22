const out = document.getElementById("out");
const dot = document.getElementById("dot");
const statusText = document.getElementById("statusText");
const baseText = document.getElementById("baseText");

// If you change backend port, update this:
const API_BASE = "http://localhost:3000";
baseText.textContent = `API: ${API_BASE}`;

function show(obj) {
  out.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
}

function setStatus(ok, msg) {
  statusText.textContent = msg;
  if (ok) {
    dot.style.background = "#34d399"; // green
    dot.style.boxShadow = "0 0 0 4px rgba(52,211,153,0.18)";
  } else {
    dot.style.background = "#f87171"; // red
    dot.style.boxShadow = "0 0 0 4px rgba(248,113,113,0.18)";
  }
}

async function getJSON(url) {
  const res = await fetch(url);
  return res.json();
}

async function checkBackend() {
  try {
    await getJSON(`${API_BASE}/api/smashes`);
    setStatus(true, "Backend: connected");
  } catch (e) {
    setStatus(false, "Backend: offline");
  }
}

async function safeRun(fn) {
  try {
    // disable buttons briefly to prevent spam clicks
    document.querySelectorAll("button").forEach(b => (b.disabled = true));
    await fn();
  } catch (err) {
    show({
      error: "Request failed",
      hint: "Is your backend running? Try: cd backend && node index.js",
      details: String(err),
    });
    setStatus(false, "Backend: offline");
  } finally {
    document.querySelectorAll("button").forEach(b => (b.disabled = false));
  }
}

document.getElementById("btnFortune").addEventListener("click", () =>
  safeRun(async () => show(await getJSON(`${API_BASE}/api/fortune`)))
);

document.getElementById("btnJoke").addEventListener("click", () =>
  safeRun(async () => show(await getJSON(`${API_BASE}/api/joke`)))
);

document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", () =>
    safeRun(async () => {
      const mood = btn.dataset.mood;
      show(await getJSON(`${API_BASE}/api/vibe?mood=${mood}`));
    })
  );
});

document.getElementById("btnSmash").addEventListener("click", () =>
  safeRun(async () => {
    const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
    const data = await res.json();
    show({ message: "SMASH registered 💥", ...data });
  })
);

document.getElementById("btnSecret").addEventListener("click", () =>
  safeRun(async () => show(await getJSON(`${API_BASE}/api/secret?code=411L`)))
);

document.getElementById("btnClear").addEventListener("click", () => {
  show("Ready…");
});

// Run once on load
checkBackend();

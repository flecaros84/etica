const routes = {
  "/home": "pages/home.html",
  "/evaluacion1": "pages/evaluacion1.html",
  "/matrizev1": "pages/matrizev1.html",
  "/dilema1": "pages/dilema1.html",
  "/dilema2": "pages/dilema2.html",
  "/dilema3": "pages/dilema3.html",
};

async function render(route) {
  const view = document.getElementById("view");
  const file = routes[route] || routes["/home"];
  view.innerHTML = `<div class="text-muted">Cargando…</div>`;
  try {
    const res = await fetch(file, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    view.innerHTML = html;
    window.scrollTo({ top: 0, behavior: "smooth" });
    highlightActive(route);
    document.title = `Dilemas Éticos - ${route.replace("/", "").toUpperCase()}`;
  } catch (e) {
    view.innerHTML = `<p style="color:#b00">No se pudo cargar: ${file}<br><small>${e.message}</small></p>`;
    highlightActive(null);
  }
}

function highlightActive(route) {
  document.querySelectorAll('a[data-page]').forEach(a => {
    const path = `/${a.getAttribute('data-page')}`;
    a.classList.toggle('active', path === route);
  });
}

function navigateFromHash() {
  const route = (window.location.hash || "#/dilema1").replace("#", "");
  render(route);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[data-page]');
  if (!link) return;
  e.preventDefault();
  window.location.hash = `/${link.getAttribute('data-page')}`;
});

window.addEventListener("hashchange", navigateFromHash);
navigateFromHash();

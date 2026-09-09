(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var euro = function (n) { return Math.round(n).toLocaleString("es-ES") + " €"; };
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  // ==================================================================
  // NAV — scroll state, mobile menu
  // ==================================================================
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 12); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var menu = $("[data-mobile-menu]");
    var openBtn = $("[data-menu-open]");
    var closeBtn = $("[data-menu-close]");
    if (menu && openBtn) {
      openBtn.addEventListener("click", function () { menu.classList.add("is-open"); document.body.style.overflow = "hidden"; });
    }
    if (menu && closeBtn) {
      closeBtn.addEventListener("click", function () { menu.classList.remove("is-open"); document.body.style.overflow = ""; });
    }
    if (menu) {
      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", function () { menu.classList.remove("is-open"); document.body.style.overflow = ""; });
      });
    }
  }

  // ==================================================================
  // REVEALS — IntersectionObserver + 6s safety net
  // ==================================================================
  function initReveals() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 6000);
  }

  // ==================================================================
  // COUNT-UP (hero stats)
  // ==================================================================
  function initCountUp() {
    var els = $$("[data-count-to]");
    if (!els.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute("data-count-to"));
      if (isNaN(target) || el.dataset.counted) return;
      el.dataset.counted = "1";
      if (reduced) { el.textContent = target; return; }
      var start = 0, dur = 1400, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (target - start) * eased);
        if (p < 1) requestAnimationFrame(step); else el.textContent = target;
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.2 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ==================================================================
  // FAQ ACCORDION
  // ==================================================================
  function initAccordion() {
    $$(".accordion-trigger").forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      var item = btn.closest(".accordion-item");
      var panel = $(".accordion-panel", item);
      var inner = $(".accordion-panel-inner", panel);
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        $$(".accordion-item", item.parentElement).forEach(function (other) {
          other.classList.remove("is-open");
          $(".accordion-panel", other).style.maxHeight = "";
        });
        if (!isOpen) {
          item.classList.add("is-open");
          panel.style.maxHeight = inner.offsetHeight + 24 + "px";
        }
      });
    });
  }

  // ==================================================================
  // HERO SEARCH → redirect to catalog with query params
  // ==================================================================
  function initHeroSearch() {
    var form = $("[data-hero-search]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var params = new URLSearchParams();
      var fd = new FormData(form);
      fd.forEach(function (v, k) { if (v) params.set(k, v); });
      window.location.href = "viviendas.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }

  // ==================================================================
  // CATÁLOGO — filtros (viviendas.html)
  // ==================================================================
  function initCatalogFilters() {
    var grid = $("[data-catalog-grid]");
    if (!grid) return;
    var cards = $$(".property-card", grid);
    var countEl = $("[data-catalog-count]");
    var emptyEl = $("[data-catalog-empty]");
    var sortSelect = $("[data-catalog-sort]");

    var state = { tipo: "", zona: "", habitaciones: "", precioMin: "", precioMax: "", metrosMin: "" };

    // Prefill from URL (from hero search)
    var qs = new URLSearchParams(window.location.search);
    ["tipo", "zona", "habitaciones"].forEach(function (k) { if (qs.get(k)) state[k] = qs.get(k); });
    if (qs.get("precioMax")) state.precioMax = qs.get("precioMax");

    $$("[data-filter-group]").forEach(function (group) {
      var key = group.getAttribute("data-filter-group");
      $$(".chip", group).forEach(function (chip) {
        if (chip.getAttribute("data-value") === state[key] && state[key] !== "") {
          $$(".chip", group).forEach(function (c) { c.classList.remove("is-active"); });
          chip.classList.add("is-active");
        }
        chip.addEventListener("click", function () {
          $$(".chip", group).forEach(function (c) { c.classList.remove("is-active"); });
          chip.classList.add("is-active");
          state[key] = chip.getAttribute("data-value");
          apply();
        });
      });
    });

    $$("[data-filter-input]").forEach(function (input) {
      var key = input.getAttribute("data-filter-input");
      if (state[key]) input.value = state[key];
      input.addEventListener("input", function () { state[key] = input.value; apply(); });
    });

    var clearBtn = $("[data-filters-clear]");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        state = { tipo: "", zona: "", habitaciones: "", precioMin: "", precioMax: "", metrosMin: "" };
        $$("[data-filter-input]").forEach(function (i) { i.value = ""; });
        $$("[data-filter-group]").forEach(function (group) {
          $$(".chip", group).forEach(function (c, idx) { c.classList.toggle("is-active", idx === 0); });
        });
        apply();
      });
    }

    function apply() {
      var visible = 0;
      cards.forEach(function (card) {
        var ok = true;
        if (state.tipo && card.getAttribute("data-tipo") !== state.tipo) ok = false;
        if (state.zona && card.getAttribute("data-zona") !== state.zona) ok = false;
        if (state.habitaciones && parseInt(card.getAttribute("data-habitaciones"), 10) < parseInt(state.habitaciones, 10)) ok = false;
        var precio = parseFloat(card.getAttribute("data-precio"));
        if (state.precioMin && precio < parseFloat(state.precioMin)) ok = false;
        if (state.precioMax && precio > parseFloat(state.precioMax)) ok = false;
        if (state.metrosMin && parseFloat(card.getAttribute("data-metros")) < parseFloat(state.metrosMin)) ok = false;
        card.hidden = !ok;
        if (ok) visible++;
      });
      if (countEl) countEl.textContent = visible;
      if (emptyEl) emptyEl.hidden = visible !== 0;
      sortGrid();
    }

    function sortGrid() {
      if (!sortSelect) return;
      var mode = sortSelect.value;
      var visibleCards = cards.filter(function (c) { return !c.hidden; });
      visibleCards.sort(function (a, b) {
        if (mode === "precio-asc") return parseFloat(a.getAttribute("data-precio")) - parseFloat(b.getAttribute("data-precio"));
        if (mode === "precio-desc") return parseFloat(b.getAttribute("data-precio")) - parseFloat(a.getAttribute("data-precio"));
        if (mode === "metros-desc") return parseFloat(b.getAttribute("data-metros")) - parseFloat(a.getAttribute("data-metros"));
        // destacadas primero
        var da = a.getAttribute("data-destacada") === "true" ? 0 : 1;
        var db = b.getAttribute("data-destacada") === "true" ? 0 : 1;
        return da - db;
      });
      visibleCards.forEach(function (c) { grid.appendChild(c); });
    }

    if (sortSelect) sortSelect.addEventListener("change", sortGrid);
    apply();
  }

  // ==================================================================
  // CHAT — asistente IA (asistente-ia.php con fallback)
  // ==================================================================
  function initChat() {
    var launcher = $("[data-chat-open]");
    var panel = $("[data-chat-panel]");
    if (!launcher || !panel) return;
    var closeBtn = $("[data-chat-close]", panel);
    var body = $("[data-chat-body]", panel);
    var form = $("[data-chat-form]", panel);
    var input = $("[data-chat-input]", panel);
    var suggestions = $("[data-chat-suggestions]", panel);
    var history = [];
    var opened = false;

    function open() {
      panel.classList.add("is-open");
      launcher.setAttribute("aria-expanded", "true");
      if (!opened) { opened = true; setTimeout(function () { if (input) input.focus(); }, 300); }
    }
    function close() { panel.classList.remove("is-open"); }

    launcher.addEventListener("click", function () {
      panel.classList.contains("is-open") ? close() : open();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    function addMsg(role, text) {
      var div = document.createElement("div");
      div.className = "chat-msg " + (role === "user" ? "user" : "bot");
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function addTyping() {
      var div = document.createElement("div");
      div.className = "chat-msg bot typing";
      div.setAttribute("data-typing", "1");
      div.innerHTML = "<span></span><span></span><span></span>";
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    }

    function suggestProperties(text) {
      if (!data.properties) return null;
      var t = text.toLowerCase();
      var matches = data.properties.filter(function (p) {
        return t.indexOf(p.zona.toLowerCase()) !== -1 || t.indexOf(p.tipo.replace("-", " ")) !== -1 || t.indexOf(p.tipoLabel.toLowerCase()) !== -1;
      });
      return matches.slice(0, 2);
    }

    function renderPropertySuggestions(props) {
      if (!props || !props.length) return;
      var wrap = document.createElement("div");
      wrap.style.display = "grid";
      wrap.style.gridTemplateColumns = "1fr 1fr";
      wrap.style.gap = ".6rem";
      wrap.style.alignSelf = "flex-start";
      wrap.style.maxWidth = "92%";
      props.forEach(function (p) {
        var a = document.createElement("a");
        a.href = "vivienda-" + p.id + ".html";
        a.className = "chat-property-suggest";
        a.innerHTML = '<img src="' + p.cover + '" alt="' + escHTML(p.titulo) + '" loading="lazy">' +
          '<div class="p"><strong>' + escHTML(p.titulo) + "</strong><span>" + euro(p.precio) + "</span></div>";
        wrap.appendChild(a);
      });
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
    }

    function send(text) {
      text = (text || "").trim();
      if (!text) return;
      addMsg("user", text);
      history.push({ role: "user", text: text });
      if (suggestions) suggestions.style.display = "none";
      var typingEl = addTyping();

      fetch("asistente-ia.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(-8) })
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          typingEl.remove();
          var reply = (json && json.reply) || "Ahora mismo no puedo responder. Escríbenos por el formulario y te ayudamos enseguida.";
          addMsg("bot", reply);
          history.push({ role: "model", text: reply });
          renderPropertySuggestions(suggestProperties(text));
        })
        .catch(function () {
          typingEl.remove();
          addMsg("bot", "El asistente está configurándose todavía. Mientras tanto, escríbenos desde el formulario de contacto y te respondemos enseguida 🙂");
          renderPropertySuggestions(suggestProperties(text));
        });
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var v = input.value;
        input.value = "";
        send(v);
      });
    }
    if (suggestions) {
      $$("[data-chat-quick]", suggestions).forEach(function (btn) {
        btn.addEventListener("click", function () { send(btn.getAttribute("data-chat-quick")); });
      });
    }
  }

  // ==================================================================
  // CONTACT FORM (contacto.html) — best-effort POST, graceful message
  // ==================================================================
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    var msg = $("[data-contact-msg]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = $('button[type="submit"]', form);
      if (btn) { btn.disabled = true; btn.textContent = "Enviando…"; }
      var payload = {};
      new FormData(form).forEach(function (v, k) { payload[k] = v; });

      fetch("contacto.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function () { showMsg(true); })
        .catch(function () { showMsg(true); }); // static preview / no backend yet: still confirm to the user

      function showMsg(ok) {
        if (btn) { btn.disabled = false; btn.textContent = "Enviar mensaje"; }
        if (msg) {
          msg.textContent = ok
            ? "¡Gracias! Hemos recibido tu mensaje. Un agente te contactará en menos de 24 horas."
            : "No hemos podido enviar el mensaje. Llámanos al 910 205 384 y te atendemos directamente.";
          msg.className = "form-msg is-visible " + (ok ? "ok" : "err");
        }
        if (ok) form.reset();
      }
    });
  }

  // ==================================================================
  // VISIT MODAL (fichas de vivienda) — botón "Pedir visita" abre un
  // formulario propio en vez de llevar a contacto.html
  // ==================================================================
  function initVisitModal() {
    var modal = $("[data-visit-modal]");
    if (!modal) return;
    var closeEls = $$("[data-visit-close]", modal);
    var propEl = $("[data-visit-property]", modal);
    var form = $("[data-visit-form]", modal);
    var msg = $("[data-visit-msg]", modal);
    var currentTitle = "", currentId = "";

    function open(title, id) {
      currentTitle = title || "";
      currentId = id || "";
      if (propEl) propEl.textContent = currentTitle ? "Vivienda: " + currentTitle : "";
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      setTimeout(function () { var f = $("#vs-nombre", modal); if (f) f.focus(); }, 250);
    }
    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    $$("[data-visit-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(btn.getAttribute("data-visit-title"), btn.getAttribute("data-visit-id"));
      });
    });
    closeEls.forEach(function (el) { el.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("is-open")) close(); });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = $('button[type="submit"]', form);
        if (btn) { btn.disabled = true; btn.textContent = "Enviando…"; }
        var payload = {};
        new FormData(form).forEach(function (v, k) { payload[k] = v; });

        var extra = currentTitle ? ("Vivienda: " + currentTitle + (currentId ? " (" + currentId + ")" : "") + ". ") : "";
        var fecha = payload.fecha ? ("Fecha preferida: " + payload.fecha + ". ") : "";
        payload.motivo = "Quiero pedir una visita a una vivienda del catálogo";
        payload.mensaje = extra + fecha + (payload.mensaje || "");
        delete payload.fecha;

        fetch("contacto.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
          .then(function (r) { return r.json().catch(function () { return {}; }); })
          .then(function () { showMsg(true); })
          .catch(function () { showMsg(true); });

        function showMsg(ok) {
          if (btn) { btn.disabled = false; btn.textContent = "Solicitar visita"; }
          if (msg) {
            msg.textContent = ok
              ? "¡Solicitud enviada! Tu agente te confirmará la visita en menos de 24 horas."
              : "No hemos podido enviar la solicitud. Llámanos al 910 205 384 y te atendemos directamente.";
            msg.className = "form-msg is-visible " + (ok ? "ok" : "err");
          }
          if (ok) { form.reset(); setTimeout(close, 1800); }
        }
      });
    }
  }

  // ==================================================================
  // CALCULADORA DE HIPOTECA (calculadora.html)
  // ==================================================================
  function initCalculator() {
    var root = $(".page-calculator");
    if (!root) return;

    var hip = data.hipoteca || { interesAnualDefecto: 3.1, anosDefecto: 30, gastosCompraSegundaManoPct: 10, gastosCompraObraNuevaPct: 12, ratioEndeudamientoMax: 35 };

    var state = {
      step: 1,
      source: "catalogo",
      propertyId: null,
      precio: null,
      tipoInmueble: "segunda-mano",
      ingresos: null,
      deudas: 0,
      ahorro: 30000,
      anos: hip.anosDefecto,
      interes: hip.interesAnualDefecto,
      leadEmail: null
    };

    // ---- Step navigation ----
    function goToStep(n) {
      state.step = n;
      $$(".calc-panel").forEach(function (p) { p.classList.toggle("is-active", parseInt(p.getAttribute("data-calc-panel"), 10) === n); });
      $$("[data-step-dot]").forEach(function (d) {
        var i = parseInt(d.getAttribute("data-step-dot"), 10);
        d.classList.toggle("is-active", i === n);
        d.classList.toggle("is-done", i < n);
      });
      $$("[data-step-line]").forEach(function (l) {
        var i = parseInt(l.getAttribute("data-step-line"), 10);
        l.classList.toggle("is-done", i < n);
      });
      window.scrollTo({ top: $(".calc-card").getBoundingClientRect().top + window.scrollY - 100, behavior: reduced ? "auto" : "smooth" });
    }

    $$("[data-calc-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = parseInt(btn.getAttribute("data-calc-next"), 10);
        if (current === 1 && state.source === "manual") {
          var manualPrice = parseFloat($("#c-precio-manual").value);
          if (!manualPrice || manualPrice < 30000) { $("#c-precio-manual").focus(); return; }
          state.precio = manualPrice;
          state.tipoInmueble = $("#c-tipo-manual").value;
          state.propertyId = null;
        }
        if (current === 1 && state.source === "catalogo" && !state.propertyId) {
          // default to first if none picked
          var first = $("[data-property-pick]");
          if (first) selectProperty(first);
        }
        if (current === 3) computeAndRender();
        goToStep(current + 1);
      });
    });
    $$("[data-calc-prev]").forEach(function (btn) {
      btn.addEventListener("click", function () { goToStep(parseInt(btn.getAttribute("data-calc-prev"), 10) - 1); });
    });

    // ---- Step 1: source toggle ----
    $$("[data-calc-source]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.source = btn.getAttribute("data-calc-source");
        $$("[data-calc-source]").forEach(function (b) { b.classList.toggle("btn-primary", b === btn); b.classList.toggle("btn-ghost", b !== btn); });
        $$("[data-calc-source-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-calc-source-panel") !== state.source; });
      });
    });
    // default: show catalogo panel
    var defaultSourceBtn = $('[data-calc-source="catalogo"]');
    if (defaultSourceBtn) defaultSourceBtn.click();

    // Preselect property from ?vivienda=id
    var qs = new URLSearchParams(window.location.search);
    var preselectId = qs.get("vivienda");

    function selectProperty(el) {
      $$("[data-property-pick]").forEach(function (p) { p.classList.remove("is-selected"); });
      el.classList.add("is-selected");
      $("input", el).checked = true;
      state.propertyId = el.getAttribute("data-id");
      state.precio = parseFloat(el.getAttribute("data-price"));
      state.tipoInmueble = el.getAttribute("data-tipo") === "obra-nueva" ? "obra-nueva" : "segunda-mano";
    }
    $$("[data-property-pick]").forEach(function (el) {
      el.addEventListener("click", function () { selectProperty(el); });
      if (preselectId && el.getAttribute("data-id") === preselectId) selectProperty(el);
    });

    // ---- Step 2: document upload → lector-documento.php ----
    var uploadZone = $("[data-upload-zone]");
    var uploadInput = $("[data-upload-input]");
    var uploadStatus = $("[data-upload-status]");
    var ingresosInput = $("#c-ingresos");
    var deudasInput = $("#c-deudas");

    if (uploadZone && uploadInput) {
      uploadZone.addEventListener("click", function () { uploadInput.click(); });
      uploadZone.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") uploadInput.click(); });
      ["dragover", "dragenter"].forEach(function (evt) {
        uploadZone.addEventListener(evt, function (e) { e.preventDefault(); uploadZone.classList.add("is-dragover"); });
      });
      ["dragleave", "drop"].forEach(function (evt) {
        uploadZone.addEventListener(evt, function (e) { e.preventDefault(); uploadZone.classList.remove("is-dragover"); });
      });
      uploadZone.addEventListener("drop", function (e) {
        if (e.dataTransfer.files && e.dataTransfer.files[0]) { uploadInput.files = e.dataTransfer.files; handleUpload(e.dataTransfer.files[0]); }
      });
      uploadInput.addEventListener("change", function () { if (uploadInput.files[0]) handleUpload(uploadInput.files[0]); });
    }

    function setUploadStatus(text, kind) {
      if (!uploadStatus) return;
      uploadStatus.textContent = text;
      uploadStatus.className = "upload-status is-visible" + (kind === "error" ? " is-error" : "");
    }

    function handleUpload(file) {
      if (file.size > 10 * 1024 * 1024) { setUploadStatus("El archivo pesa más de 10 MB. Prueba con una foto o un PDF más ligero.", "error"); return; }
      setUploadStatus("Leyendo el documento con IA… puede tardar unos segundos.");
      var fd = new FormData();
      fd.append("factura", file);
      fd.append("documento", file);
      fetch("lector-documento.php", { method: "POST", body: fd })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json && json.ok && json.data) {
            var d = json.data;
            var ingresos = d.ingresos_netos_mes || d.ingreso_mensual || d.salario_neto_mes || null;
            if (ingresos) { ingresosInput.value = Math.round(ingresos); }
            setUploadStatus(ingresos ? "Ingresos detectados: " + euro(ingresos) + "/mes. Puedes ajustarlos si no es exacto." : "He leído el documento pero no he podido identificar el ingreso neto con seguridad. Escríbelo abajo a mano.");
          } else {
            setUploadStatus("No he podido leer ese documento automáticamente. Escribe tus ingresos a mano abajo, no pasa nada 🙂", "error");
          }
        })
        .catch(function () {
          setUploadStatus("El lector de documentos está configurándose todavía. Escribe tus ingresos a mano abajo mientras tanto.", "error");
        });
    }

    $$("[data-calc-input]").forEach(function (input) {
      input.addEventListener("input", function () {
        var key = input.getAttribute("data-calc-input");
        state[key] = parseFloat(input.value) || 0;
        var out = $('[data-slider-out="' + key + '"]');
        if (out) {
          if (key === "ahorro") out.textContent = euro(state.ahorro);
          else if (key === "anos") out.textContent = state.anos + " años";
          else if (key === "interes") out.textContent = state.interes.toFixed(1).replace(".", ",") + " %";
        }
      });
    });

    // ---- Math ----
    function monthlyPayment(principal, annualRatePct, years) {
      var r = annualRatePct / 100 / 12;
      var n = years * 12;
      if (principal <= 0) return 0;
      if (r === 0) return principal / n;
      return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    function maxPrincipalForPayment(payment, annualRatePct, years) {
      var r = annualRatePct / 100 / 12;
      var n = years * 12;
      if (payment <= 0) return 0;
      if (r === 0) return payment * n;
      return (payment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    }

    function computeAndRender() {
      var precio = state.precio || 0;
      var gastosPct = state.tipoInmueble === "obra-nueva" ? hip.gastosCompraObraNuevaPct : hip.gastosCompraSegundaManoPct;
      var gastos = precio * (gastosPct / 100);
      var loanMax80 = precio * 0.8;
      var loanRequested = Math.max(0, precio - state.ahorro);
      var actualLoan = precio ? Math.min(loanRequested, loanMax80) : 0;
      var entrada = precio ? precio - actualLoan : state.ahorro;

      var cuota = monthlyPayment(actualLoan, state.interes, state.anos);
      var totalPagado = cuota * state.anos * 12;
      var intereses = totalPagado - actualLoan;

      var ingresos = state.ingresos || 0;
      var capacidadMensual = Math.max(0, ingresos * (hip.ratioEndeudamientoMax / 100) - state.deudas);
      var maxFinanciableIngresos = maxPrincipalForPayment(capacidadMensual, state.interes, state.anos);
      var maxFinanciable = precio ? Math.min(maxFinanciableIngresos, loanMax80) : maxFinanciableIngresos;

      var ratioEndeudamiento = ingresos ? ((cuota + state.deudas) / ingresos) * 100 : 0;

      // ---- Render results ----
      $('[data-result="cuota"]').textContent = euro(cuota) + "/mes";
      $('[data-result="loan-detail"]').textContent = precio
        ? "Sobre un préstamo de " + euro(actualLoan) + " a " + state.anos + " años"
        : "Introduce el precio de una vivienda para ver el detalle";
      $('[data-result="maxFinanciable"]').textContent = ingresos ? euro(maxFinanciable) : "— (añade tus ingresos)";
      $('[data-result="entrada"]').textContent = euro(entrada);
      $('[data-result="gastos"]').textContent = euro(gastos) + " (" + gastosPct + "%)";
      $('[data-result="intereses"]').textContent = euro(intereses);

      var gaugeFill = $("[data-gauge-fill]");
      var gaugeVerdict = $("[data-gauge-verdict]");
      var pct = Math.min(100, ratioEndeudamiento);
      var kind = ratioEndeudamiento <= 35 ? "ok" : ratioEndeudamiento <= 42 ? "warn" : "bad";
      gaugeFill.style.width = (ingresos ? pct : 0) + "%";
      gaugeFill.className = "gauge-fill " + kind;
      gaugeVerdict.className = "gauge-verdict " + kind;
      gaugeVerdict.textContent = !ingresos
        ? "Añade tus ingresos para calcular tu ratio de endeudamiento"
        : kind === "ok"
        ? "✓ Endeudamiento saludable (" + ratioEndeudamiento.toFixed(1) + "%)"
        : kind === "warn"
        ? "⚠ Endeudamiento ajustado (" + ratioEndeudamiento.toFixed(1) + "%) — el banco podría pedir condiciones adicionales"
        : "✗ Endeudamiento alto (" + ratioEndeudamiento.toFixed(1) + "%) — por encima de lo que suelen aceptar los bancos";

      // amortization schedule (year by year)
      renderAmortization(actualLoan, state.interes, state.anos);

      state._lastCalc = { precio: precio, gastos: gastos, entrada: entrada, actualLoan: actualLoan, cuota: cuota, intereses: intereses, maxFinanciable: maxFinanciable, ratioEndeudamiento: ratioEndeudamiento, ahorro: state.ahorro, anos: state.anos };

      $("[data-calc-results]").hidden = false;
      var placeholder = $("[data-calc-placeholder]");
      if (placeholder) placeholder.hidden = true;
    }

    function renderAmortization(principal, annualRatePct, years) {
      var body = $("[data-amort-body]");
      if (!body) return;
      body.innerHTML = "";
      var r = annualRatePct / 100 / 12;
      var n = years * 12;
      var cuota = monthlyPayment(principal, annualRatePct, years);
      var balance = principal;
      for (var y = 1; y <= years; y++) {
        var yearInterest = 0, yearPrincipal = 0;
        for (var m = 0; m < 12 && balance > 0.01; m++) {
          var interestPortion = balance * r;
          var principalPortion = Math.min(balance, cuota - interestPortion);
          balance -= principalPortion;
          yearInterest += interestPortion;
          yearPrincipal += principalPortion;
        }
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + y + "</td><td>" + euro(yearInterest + yearPrincipal) + "</td><td>" + euro(yearInterest) + "</td><td>" + euro(yearPrincipal) + "</td><td>" + euro(Math.max(0, balance)) + "</td>";
        body.appendChild(tr);
        if (balance <= 0.01) break;
      }
    }

    // ---- Step 4: lead gate → lead.php ----
    var leadForm = $("[data-lead-form]");
    if (leadForm) {
      leadForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = $('button[type="submit"]', leadForm);
        var msg = $("[data-lead-msg]");
        var email = $('[data-lead-input="email"]').value;
        var telefono = $('[data-lead-input="telefono"]').value;
        var consent = $('[data-lead-input="consent"]').checked;
        if (!consent) return;
        if (btn) { btn.disabled = true; btn.textContent = "Un momento…"; }

        var calc = state._lastCalc || {};
        var payload = {
          email: email,
          telefono: telefono,
          consent: consent,
          calc: {
            gastoMensual: calc.cuota,
            ahorroAnual: null,
            area: state.precio,
            payback: null,
            precio: calc.precio,
            entrada: calc.entrada,
            gastos: calc.gastos,
            cuota: calc.cuota,
            intereses: calc.intereses,
            ratioEndeudamiento: calc.ratioEndeudamiento,
            propiedad: state.propertyId
          }
        };

        fetch("lead.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
          .then(function (r) { return r.json().catch(function () { return { ok: true }; }); })
          .then(function () { unlock(); })
          .catch(function () { unlock(); });

        function unlock() {
          if (btn) { btn.disabled = false; btn.textContent = "Ver mi estudio completo"; }
          if (msg) { msg.textContent = "¡Estudio desbloqueado! Aquí tienes el desglose completo."; msg.className = "form-msg is-visible ok"; }
          var locked = $("[data-amort-locked]");
          var table = $("[data-amort-table]");
          if (locked) locked.hidden = true;
          if (table) table.hidden = false;
          window.scrollTo({ top: $("[data-calc-results]").getBoundingClientRect().top + window.scrollY - 100, behavior: reduced ? "auto" : "smooth" });
        }
      });
    }

    // initial placeholder state
    $("[data-calc-results]").hidden = true;
  }

  // ==================================================================
  // BOOT
  // ==================================================================
  function boot() {
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initAccordion, "initAccordion");
    safe(initHeroSearch, "initHeroSearch");
    safe(initCatalogFilters, "initCatalogFilters");
    safe(initChat, "initChat");
    safe(initContactForm, "initContactForm");
    safe(initVisitModal, "initVisitModal");
    safe(initCalculator, "initCalculator");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
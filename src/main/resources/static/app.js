/* =========================
   Konfiguration
========================= */
// alt
// const API_URL = 'http://localhost:8080/cars';

// neu
const API_URL = 'https://car-manager-backend-nte1.onrender.com/cars';


/* =========================
   DOM-Refs
========================= */
// Filter
const elFBrand    = document.getElementById('fBrand');
const elFStatus   = document.getElementById('fStatus');
const elFYearFrom = document.getElementById('fYearFrom');
const elFYearTo   = document.getElementById('fYearTo');
const btnSearch   = document.getElementById('btnSearch');
const btnReset    = document.getElementById('btnReset');

// Tabelle
const tbody      = document.getElementById('carsTbody');
const emptyState = document.getElementById('emptyState');

// Create-Form
const formCreate = document.getElementById('carForm');
const elBrand    = document.getElementById('brand');
const elModel    = document.getElementById('model');
const elFarbe    = document.getElementById('farbe');
const elYear     = document.getElementById('year');
const elVin      = document.getElementById('vin');
const elStatus   = document.getElementById('status');
const elMileage  = document.getElementById('mileage');
const elPrice    = document.getElementById('price');
const elLastServ = document.getElementById('lastServiceDate');

// Optionales Edit-Modal (falls vorhanden)
const modal            = document.getElementById('editModal');
const editForm         = document.getElementById('editForm');
const editCloseBtn     = document.getElementById('editCloseBtn');
const editCancelBtn    = document.getElementById('editCancelBtn');
const eBrand           = document.getElementById('eBrand');
const eModel           = document.getElementById('eModel');
const eColor           = document.getElementById('eColor');
const eYear            = document.getElementById('eYear');
const eStatus          = document.getElementById('eStatus');
const eMileage         = document.getElementById('eMileage');
const ePrice           = document.getElementById('ePrice');
const eVin             = document.getElementById('eVin');
const eLastService     = document.getElementById('eLastService');

let selectedId = null; // aktuell im Modal bearbeitetes Auto

/* =========================
   Utils
========================= */
function toQuery(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      q.append(k, String(v).trim());
    }
  });
  const s = q.toString();
  return s ? `?${s}` : '';
}

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.content)) return data.content;
  return [];
}

function fmtDate(d) {
  if (!d) return '';
  return String(d).slice(0, 10);
}

function openModal()  { if (modal) modal.classList.remove('hidden'); }
function closeModal() { if (modal) modal.classList.add('hidden'); selectedId = null; }

/* =========================
   Filter-Helpers
========================= */
function collectFilters() {
  return {
    brand:    elFBrand?.value?.trim() || '',
    status:   elFStatus?.value || '',
    yearFrom: elFYearFrom?.value || '',
    yearTo:   elFYearTo?.value || ''
  };
}

function hasAnyFilter(p) {
  return (p.brand || p.status || p.yearFrom || p.yearTo);
}

/* =========================
   Laden & Rendern
========================= */
async function loadCars() {
  tbody.innerHTML = '';
  emptyState.hidden = true;

  const params = collectFilters();
  const query  = toQuery(params);

  const endpoint = hasAnyFilter(params)
      ? `${API_URL}/search${query}`
      : `${API_URL}`;

  try {
    const res = await fetch(endpoint);
    console.log(`GET ${endpoint} status`, res.status);
    if (!res.ok) {
      throw new Error(`Fehler beim Laden (${res.status})`);
    }
    const data = await res.json();
    console.log('Body:', data);

    const cars = normalizeList(data);
    if (cars.length === 0) {
      emptyState.textContent = 'Keine Fahrzeuge gefunden.';
      emptyState.hidden = false;
      return;
    }
    cars.forEach(car => tbody.appendChild(renderRow(car)));
  } catch (err) {
    console.error(err);
    emptyState.textContent = 'Fehler beim Laden';
    emptyState.hidden = false;
  }
}

function renderRow(car) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${car.id ?? ''}</td>
    <td>${car.brand ?? ''}</td>
    <td>${car.model ?? ''}</td>
    <td>${car.farbe ?? ''}</td>
    <td>${car.year ?? ''}</td>
    <td>${car.vin ?? ''}</td>
    <td>${car.status ?? ''}</td>
    <td>${car.kilometerstand ?? ''}</td>
    <td>${car.price ?? ''}</td>
    <td>${fmtDate(car.lastServiceDate)}</td>
    <td>
      <button class="no-row-open btn btn-sm btn-outline-danger" title="Löschen"
              data-action="delete" data-id="${car.id}">🗑️</button>
    </td>
  `;

  tr.querySelector('[data-action="delete"]').addEventListener('click', (e) => {
    e.stopPropagation();
    deleteCar(car.id);
  });

  if (modal && editForm) {
    tr.style.cursor = 'pointer';
    tr.addEventListener('click', () => {
      selectedId         = car.id;
      eBrand.value       = car.brand ?? '';
      eModel.value       = car.model ?? '';
      eColor.value       = car.farbe ?? '';
      eYear.value        = car.year ?? '';
      eStatus.value      = car.status ?? '';
      eMileage.value     = car.kilometerstand ?? '';
      ePrice.value       = car.price ?? '';
      eVin.value         = car.vin ?? '';
      eLastService.value = fmtDate(car.lastServiceDate);
      openModal();
    });
  }

  return tr;
}

/* =========================
   Create
========================= */
if (formCreate) {
  formCreate.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      brand: (elBrand?.value ?? '').trim(),
      model: (elModel?.value ?? '').trim(),
      farbe: (elFarbe?.value ?? '').trim(),
      year:  parseInt(elYear?.value ?? '0', 10) || null,
      vin:   (elVin?.value ?? '').trim() || null,
      status: elStatus?.value || null,
      kilometerstand: parseInt(elMileage?.value ?? '0', 10) || 0,
      price: parseFloat(elPrice?.value ?? '0') || 0,
      lastServiceDate: elLastServ?.value || null
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text() || 'Fehler beim Speichern');

      formCreate.reset();
      await loadCars();
    } catch (err) {
      alert('Fehler: ' + err.message);
    }
  });
}

/* =========================
   Delete
========================= */
async function deleteCar(id) {
  if (!confirm(`Fahrzeug #${id} wirklich löschen?`)) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Löschen fehlgeschlagen');
    await loadCars();
  } catch (err) {
    alert('Fehler beim Löschen: ' + err.message);
  }
}
window.deleteCar = deleteCar;

/* =========================
   Edit (optional mit Modal)
========================= */
if (modal && editForm) {
  editCloseBtn?.addEventListener('click', closeModal);
  editCancelBtn?.addEventListener('click', closeModal);

  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!selectedId) return;

    const payload = {
      brand: (eBrand?.value ?? '').trim(),
      model: (eModel?.value ?? '').trim(),
      farbe: (eColor?.value ?? '').trim(),
      year:  parseInt(eYear?.value ?? '0', 10) || null,
      status: eStatus?.value || null,
      kilometerstand: parseInt(eMileage?.value ?? '0', 10) || 0,
      price: parseFloat(ePrice?.value ?? '0') || 0,
      vin: (eVin?.value ?? '').trim() || null,
      lastServiceDate: eLastService?.value || null
    };

    try {
      const res = await fetch(`${API_URL}/${selectedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text() || 'Update fehlgeschlagen');

      closeModal();
      await loadCars();
    } catch (err) {
      alert('Fehler: ' + err.message);
    }
  });
}

/* =========================
   Suche / Reset
========================= */
btnSearch?.addEventListener('click', () => {
  loadCars();
});

btnReset?.addEventListener('click', () => {
  if (elFBrand)    elFBrand.value = '';
  if (elFStatus)   elFStatus.value = '';
  if (elFYearFrom) elFYearFrom.value = '';
  if (elFYearTo)   elFYearTo.value = '';
  loadCars();
});

/* =========================
   Start
========================= */
document.addEventListener('DOMContentLoaded', () => {
  loadCars();
});


const API_URL = '/cars';


document.addEventListener('DOMContentLoaded',() => loadCars() );
document.getElementById('carForm').addEventListener('submit',  async function (e) {
e.preventDefault();

  const car = {
    brand: document.getElementById('brand').value,
    model: document.getElementById('model').value,
    farbe: document.getElementById('farbe').value,
    year: parseInt(document.getElementById('year').value)
  };

  try {

const res= await fetch (API_URL, {
method: 'POST',
headers: {'Content-Type': 'application/json' },
body: JSON.stringify(car)
});
 if(!res.ok) {
 throw new Error ('Fehler beim Speichern' );

 }

 document.getElementById ("carForm").reset();
 loadCars();

 }catch (err) {
 alert('Fehler: ' + err.message );
}

  });
async function loadCars() {
  const list = document.getElementById('carList');
  list.innerHTML = '';

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    data.forEach(car => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${car.brand} - ${car.model} (${car.year}) [${car.farbe}]
        <span class="delete-btn" onclick="deleteCar(${car.id})">🗑️</span>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = 'Fehler beim Laden';
  }
}

async function deleteCar(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadCars();
  } catch (err) {
    alert('Fehler beim Löschen');
  }


  }
# 🚗 Car Manager – Fleet Management System

Ein Full-Stack Projekt zur Verwaltung von Fahrzeugen, entwickelt mit **Java Spring Boot** im Backend und einem **HTML/JavaScript-Frontend**.  
Das System erlaubt es, Fahrzeuge anzulegen, zu bearbeiten, zu löschen und nach verschiedenen Kriterien zu durchsuchen (Marke, Baujahr, Status etc.).

🌍 **Live Demo:** [Car Manager auf Render](https://DEIN-LINK.onrender.com)  
*(Hinweis: Beim ersten Start kann es bis zu 1 Minute dauern, da die Free-Instanz „aufwacht“.)*

---

## ✨ Features
- ✅ REST API mit **Spring Boot**
- ✅ CRUD-Operationen für Fahrzeuge (*Create, Read, Update, Delete*)
- ✅ Suche & Filter nach Marke, Baujahr und Status
- ✅ Fahrzeugstatus: *Verfügbar*, *Im Einsatz*, *In Wartung*
- ✅ Persistente Speicherung mit **PostgreSQL**
- ✅ Deployment via **Docker** & **Render Cloud**
- ✅ Einfaches Web-Frontend (HTML, CSS, JavaScript)

---

## 🛠️ Tech Stack
**Backend:**
- Java 17  
- Spring Boot (Web, Data JPA, Validation)  
- Hibernate ORM  
- PostgreSQL (Cloud DB auf Render)  

**Frontend:**
- HTML, CSS, Vanilla JavaScript  
- REST-API-Anbindung  

**DevOps:**
- Docker (Multi-Stage Build)  
- Render Deployment  
- GitHub Repository  

---

## 🚀 Installation (Lokal starten)

### Voraussetzungen
- Java 17+  
- Maven  
- Docker (optional)  
- PostgreSQL oder MySQL lokal  

### Schritte
1. Repository klonen:
   ```bash
   git clone https://github.com/DEIN-USERNAME/car-manager.git
   cd car-manager
   ```

2. Backend starten:
   ```bash
   ./mvnw spring-boot:run
   ```
   oder mit Docker:
   ```bash
   docker build -t car-manager .
   docker run -p 8080:8080 car-manager
   ```

3. Frontend öffnen:  
   Öffne die Datei **`src/main/resources/static/index.html`** im Browser.  

4. REST API testen:  
   - `GET http://localhost:8080/cars` → alle Fahrzeuge  
   - `POST http://localhost:8080/cars` → neues Fahrzeug anlegen  
   - `PUT http://localhost:8080/cars/{id}` → Fahrzeug aktualisieren  
   - `DELETE http://localhost:8080/cars/{id}` → Fahrzeug löschen  

---

## 📸 Screenshots

<img width="1910" height="978" alt="image" src="https://github.com/user-attachments/assets/6a19e40c-b2f5-40f0-bec2-2b838f44fd3a" />


## 📌 Hinweise
- Dieses Projekt wurde im Rahmen der Vorbereitung auf mein Praxissemester entwickelt.  
- Fokus: **Enterprise-nahe Entwicklung mit Spring Boot & Datenbank**.  
- Ziel: Demonstration von Full-Stack-Fähigkeiten (Java + Web + DevOps).  

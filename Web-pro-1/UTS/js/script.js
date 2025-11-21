// Import semua modul
import { initLogin } from './modules/login.js';
import { initRegister } from './modules/register.js';
import { initIndex } from './modules/index.js';
import { initDetail } from './modules/detail.js';
import { initDashboard } from './modules/dashboard.js';

// Ambil nama file dari URL (misal: login.html)
const path = window.location.pathname;
const page = path.split("/").pop(); 

// Routing Sederhana
console.log("Current Page:", page); // Untuk debugging

if (page === 'login.html') {
    initLogin();
} 
else if (page === 'register.html') {
    initRegister();
} 
else if (page === 'index.html' || page === '') { // Handle root url juga
    initIndex();
} 
else if (page === 'detail.html') {
    initDetail();
} 
else if (page === 'dashboard.html') {
    initDashboard();
}
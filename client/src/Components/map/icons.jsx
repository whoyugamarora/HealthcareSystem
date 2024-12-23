import L from 'leaflet';
import '@fortawesome/fontawesome-free/css/all.css';

export const hospital = L.divIcon({
    className: 'custom-icon',  // Custom class for styling
    html: '<i class="fa-solid fa-hospital fa-xl hover:text-green-800"></i>',
    iconSize: [50, 50],  // Size of the icon
});
  
export const dentist = L.divIcon({
    className: 'custom-icon',  // Custom class for styling
    html: '<i class="fa-solid fa-tooth fa-xl hover:text-green-800"></i>',
    iconSize: [50, 50],  // Size of the icon
});

export const family = L.divIcon({
    className: 'custom-icon',  // Custom class for styling
    html: '<i class="fa-solid fa-user-doctor fa-xl hover:text-green-800"></i>',
    iconSize: [50, 50],  // Size of the icon
});

export const childcare = L.divIcon({
    className: 'custom-icon',  // Custom class for styling
    html: '<i class="fa-solid fa-children fa-xl hover:text-green-800"></i>',
    iconSize: [50, 50],  // Size of the icon
});

export const defaultpin = L.divIcon({
    className: 'custom-icon',  // Custom class for styling
    html: '<i class="fa-solid fa-location-pin fa-xl hover:text-green-800"></i>',
    iconSize: [50, 50],  // Size of the icon
});


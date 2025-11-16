// ========================================
// FORMATAGE DE NOMBRES ET MONNAIE
// ========================================

/**
 * Formate un nombre en devise (CAD par défaut)
 * @param {number} amount - Montant à formater
 * @param {string} currency - Code de devise (CAD, USD, EUR)
 * @returns {string} Montant formaté
 */
export const formatCurrency = (amount, currency = 'CAD') => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Formate un nombre avec séparateurs de milliers
 * @param {number} number - Nombre à formater
 * @returns {string} Nombre formaté
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('fr-CA').format(number);
};

/**
 * Convertit un nombre en format compact (1.2K, 3.5M, etc.)
 * @param {number} number - Nombre à formater
 * @returns {string} Nombre compact
 */
export const formatCompactNumber = (number) => {
  return new Intl.NumberFormat('fr-CA', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(number);
};

// ========================================
// FORMATAGE DE DATES
// ========================================

/**
 * Formate une date en format lisible
 * @param {string|Date} date - Date à formater
 * @param {string} format - Format souhaité ('short', 'long', 'relative')
 * @returns {string} Date formatée
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  
  switch (format) {
    case 'short':
      return new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(d);
    
    case 'long':
      return new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(d);
    
    case 'relative':
      return formatRelativeTime(d);
    
    case 'datetime':
      return new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(d);
    
    default:
      return d.toLocaleDateString('fr-CA');
  }
};

/**
 * Formate une date en temps relatif (il y a X minutes/heures/jours)
 * @param {Date} date - Date à formater
 * @returns {string} Temps relatif
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'À l\'instant';
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 30) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  if (months < 12) return `Il y a ${months} mois`;
  return `Il y a ${years} an${years > 1 ? 's' : ''}`;
};

/**
 * Calcule les jours restants entre maintenant et une date
 * @param {string|Date} endDate - Date de fin
 * @returns {number} Nombre de jours restants
 */
export const getDaysRemaining = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// ========================================
// CALCULS D'IMPACT
// ========================================

/**
 * Calcule l'impact d'un don
 * @param {number} amount - Montant du don
 * @returns {object} Impact calculé
 */
export const calculateImpact = (amount) => {
  return {
    nights: Math.floor(amount / 25),
    meals: Math.floor(amount / 10),
    workshops: Math.floor(amount / 50),
    hours: Math.floor(amount / 30)
  };
};

/**
 * Calcule le pourcentage de progression
 * @param {number} current - Montant actuel
 * @param {number} goal - Objectif
 * @returns {number} Pourcentage (0-100)
 */
export const calculateProgress = (current, goal) => {
  if (goal === 0) return 0;
  return Math.min(Math.round((current / goal) * 100), 100);
};

/**
 * Calcule le montant restant pour atteindre un objectif
 * @param {number} current - Montant actuel
 * @param {number} goal - Objectif
 * @returns {number} Montant restant
 */
export const calculateRemaining = (current, goal) => {
  return Math.max(goal - current, 0);
};

// ========================================
// VALIDATION
// ========================================

/**
 * Valide une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} True si valide
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valide un numéro de téléphone canadien
 * @param {string} phone - Téléphone à valider
 * @returns {boolean} True si valide
 */
export const isValidPhone = (phone) => {
  const regex = /^(\+1|1)?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return regex.test(phone);
};

/**
 * Valide un montant (positif et avec max 2 décimales)
 * @param {number} amount - Montant à valider
 * @returns {boolean} True si valide
 */
export const isValidAmount = (amount) => {
  return amount > 0 && Number.isFinite(amount);
};

/**
 * Valide un numéro de carte de crédit (algorithme de Luhn)
 * @param {string} cardNumber - Numéro de carte
 * @returns {boolean} True si valide
 */
export const isValidCreditCard = (cardNumber) => {
  const sanitized = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(sanitized)) return false;
  if (sanitized.length < 13 || sanitized.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// ========================================
// MANIPULATION DE STRINGS
// ========================================

/**
 * Tronque un texte à une longueur donnée
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur max
 * @returns {string} Texte tronqué
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} text - Texte à capitaliser
 * @returns {string} Texte capitalisé
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Convertit un texte en slug (URL-friendly)
 * @param {string} text - Texte à convertir
 * @returns {string} Slug
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/--+/g, '-') // Replace multiple - with single -
    .trim();
};

/**
 * Génère des initiales à partir d'un nom
 * @param {string} name - Nom complet
 * @returns {string} Initiales (max 2 lettres)
 */
export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// ========================================
// MANIPULATION DE TABLEAUX
// ========================================

/**
 * Trie un tableau d'objets par une clé
 * @param {Array} array - Tableau à trier
 * @param {string} key - Clé de tri
 * @param {string} order - Ordre ('asc' ou 'desc')
 * @returns {Array} Tableau trié
 */
export const sortByKey = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Groupe un tableau d'objets par une clé
 * @param {Array} array - Tableau à grouper
 * @param {string} key - Clé de groupement
 * @returns {Object} Objet groupé
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Calcule la somme d'une propriété dans un tableau
 * @param {Array} array - Tableau
 * @param {string} key - Clé à sommer
 * @returns {number} Somme
 */
export const sumBy = (array, key) => {
  return array.reduce((sum, item) => sum + (item[key] || 0), 0);
};

/**
 * Calcule la moyenne d'une propriété dans un tableau
 * @param {Array} array - Tableau
 * @param {string} key - Clé pour la moyenne
 * @returns {number} Moyenne
 */
export const averageBy = (array, key) => {
  if (array.length === 0) return 0;
  return sumBy(array, key) / array.length;
};

// ========================================
// COULEURS ET STYLES
// ========================================

/**
 * Génère une couleur aléatoire en hexadécimal
 * @returns {string} Couleur hex
 */
export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Génère une couleur basée sur un string (toujours la même pour le même string)
 * @param {string} str - String de base
 * @returns {string} Couleur hex
 */
export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const color = Math.abs(hash).toString(16).substring(0, 6);
  return '#' + '0'.repeat(6 - color.length) + color;
};

/**
 * Obtient une classe de couleur Tailwind basée sur un type
 * @param {string} type - Type (success, error, warning, info)
 * @returns {object} Classes Tailwind
 */
export const getStatusColor = (type) => {
  const colors = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-500'
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-500'
    },
    warning: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-500'
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-500'
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-500'
    }
  };

  return colors[type] || colors.info;
};

// ========================================
// STOCKAGE LOCAL
// ========================================

/**
 * Sauvegarde dans localStorage avec support JSON
 * @param {string} key - Clé
 * @param {any} value - Valeur
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Récupère depuis localStorage avec parsing JSON
 * @param {string} key - Clé
 * @param {any} defaultValue - Valeur par défaut
 * @returns {any} Valeur
 */
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Supprime une clé du localStorage
 * @param {string} key - Clé
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// ========================================
// UTILITAIRES DIVERS
// ========================================

/**
 * Copie du texte dans le presse-papier
 * @param {string} text - Texte à copier
 * @returns {Promise<boolean>} True si succès
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

/**
 * Télécharge un fichier
 * @param {string} data - Données à télécharger
 * @param {string} filename - Nom du fichier
 * @param {string} type - Type MIME
 */
export const downloadFile = (data, filename, type = 'text/plain') => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Génère un ID unique
 * @returns {string} ID unique
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Debounce une fonction
 * @param {Function} func - Fonction à debouncer
 * @param {number} wait - Délai en ms
 * @returns {Function} Fonction debouncée
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Mélange un tableau (Fisher-Yates)
 * @param {Array} array - Tableau à mélanger
 * @returns {Array} Tableau mélangé
 */
export const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Attend un délai (async sleep)
 * @param {number} ms - Millisecondes
 * @returns {Promise} Promise qui résout après le délai
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Vérifie si on est sur mobile
 * @returns {boolean} True si mobile
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Scroll smooth vers un élément
 * @param {string} elementId - ID de l'élément
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Export par défaut de toutes les fonctions
export default {
  // Formatage
  formatCurrency,
  formatNumber,
  formatCompactNumber,
  formatDate,
  formatRelativeTime,
  getDaysRemaining,
  
  // Impact
  calculateImpact,
  calculateProgress,
  calculateRemaining,
  
  // Validation
  isValidEmail,
  isValidPhone,
  isValidAmount,
  isValidCreditCard,
  
  // Strings
  truncateText,
  capitalize,
  slugify,
  getInitials,
  
  // Tableaux
  sortByKey,
  groupBy,
  sumBy,
  averageBy,
  
  // Couleurs
  randomColor,
  stringToColor,
  getStatusColor,
  
  // Storage
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  
  // Divers
  copyToClipboard,
  downloadFile,
  generateId,
  debounce,
  shuffle,
  sleep,
  isMobile,
  scrollToElement
};
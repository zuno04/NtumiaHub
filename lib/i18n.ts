export const locales = ['en', 'fr'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const translations = {
  en: {
    nav: {
      dashboard: 'Dashboard',
      marketplace: 'Marketplace',
      team: 'Team',
      uploads: 'Uploads',
      history: 'History',
      settings: 'Settings'
    },
    common: {
      search: 'Search',
      filter: 'Filter',
      upload: 'Upload',
      download: 'Download',
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel'
    }
  },
  fr: {
    nav: {
      dashboard: 'Tableau de bord',
      marketplace: 'Marché',
      team: 'Équipe',
      uploads: 'Téléchargements',
      history: 'Historique',
      settings: 'Paramètres'
    },
    common: {
      search: 'Rechercher',
      filter: 'Filtrer',
      upload: 'Télécharger',
      download: 'Télécharger',
      delete: 'Supprimer',
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler'
    }
  }
} as const;

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

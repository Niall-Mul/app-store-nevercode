/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

export default {
  // we init with resources
  resources: {
    en: {
      map: {
        filter: 'Filter',
        find_a_store: 'Find a store...',
      },
      store: {
        all: 'All',
        call: 'Call',
        car: 'Car',
        close: 'Close',
        close_stores_list: 'Close Stores List',
        closed: 'Closed',
        closing: 'Closing',
        cycle: 'Cycle',
        destination: 'Destination',
        directions: 'Directions',
        distance: 'Distance',
        duration: 'Duration',
        edit: 'Edit',
        from: 'From',
        my_location: 'My Location',
        open: 'Open',
        opened: 'Opened',
        opening_times: 'Opening Times',
        opens: 'Opens',
        reset: 'Reset',
        reviews: 'Reviews',
        services: 'Services',
        show: 'Show',
        show_open_stores: 'Show Open Stores',
        show_results: 'Show Results',
        show_steps: 'Show steps',
        show_stores_list: 'Show Stores List',
        start_navigation: 'Start navigation',
        store_detail: 'Store Detail',
        train: 'Train',
        walk: 'Walk',
        // Services
        broadband: 'Broadband',
        bizAdvisor: 'Business Advisor',
        franchise: 'Franchise',
        rechargePoint: 'Recharge',
        techTeam: 'Tech Team',
        tradeIn: 'Trade-In',
        topUp: 'Top-Up',
      },
      common: {
        submit: 'Submit',
        // Days of the week
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
        Saturday: 'Saturday',
        Sunday: 'Sunday',
      },
    },
    el: {
      map: {
        filter: 'Φίλτρο',
        find_a_store: 'Βρές Κατάστημα...',
      },
      store: {
        all: 'Όλα',
        call: 'Κλήση',
        car: 'Αυτοκίνητο',
        close: 'Κλείνει',
        close_stores_list: 'Κλείσιμο λίστας καταστημάτων',
        closed: 'Κλειστό',
        closing: 'Κλείνει',
        cycle: 'Ποδήλατο',
        destination: 'Προορισμός',
        directions: 'Οδηγίες',
        distance: 'Απόσταση',
        duration: 'Διάρκεια',
        edit: 'Επεξεργασία',
        from: 'Απο',
        my_location: 'Η τοποθεσία μου',
        open: 'Ανοίγει',
        opened: 'Ανοιχτό',
        opening_times: 'Ωρες Λειτουργίας',
        opens: 'Ανοίγει',
        reset: 'Επαναφορά',
        reviews: 'Αξιολογήσεις',
        services: 'Υπηρεσίες',
        show: 'Εμφάνισε',
        show_open_stores: 'Εμφάνισε  Ανοιχτά Καταστήματα',
        show_results: 'Εμφάνιση Αποτελέσματων',
        show_steps: 'Εμφάνιση βημάτων',
        show_stores_list: 'Εμφάνιση λίστας καταστημάτων',
        start_navigation: 'Εκκίνηση πλοήγησης',
        store_detail: 'Πληροφοριες Καταστηματος',
        train: 'Τρένο',
        walk: 'Περπάτημα',
        // Services
        broadband: 'Ευρυζωνικότητα',
        bizAdvisor: 'Επιχειρηματικό Σύμβουλο',
        franchise: 'Προνόμιο',
        rechargePoint: 'Επαναφορτίστε',
        techTeam: 'Τεχνική ομάδα',
        tradeIn: 'Εμπορία',
        topUp: 'Συμπλήρωση',
      },
      common: {
        submit: 'υποβάλλουν',
        // Days of the week
        Monday: 'Δευτέρα',
        Tuesday: 'Τρίτη',
        Wednesday: 'Τετάρτη',
        Thursday: 'Πέμπτη',
        Friday: 'Παρασκευή',
        Saturday: 'Σάββατο',
        Sunday: 'Κυριακή',
      },
    },
  },
  fallbackLng: 'gr',
  debug: true,

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
};

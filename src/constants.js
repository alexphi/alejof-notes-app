export default {
  Mutations: {
    SET_AUTH_DATA: 'SET_AUTH_DATA',
    SET_NOT_ALLOWED: 'SET_NOT_ALLOWED',
  },
  EntryTypes: {
    TEXT: 'text',
    LINK: 'link'
  },
  Events: {
    ENTRY_SAVED: 'saved',
    ENTRY_DELETED: 'deleted',

    ENTRY_EDIT: 'edit',
    ENTRY_PREVIEW: 'preview',
  }
}

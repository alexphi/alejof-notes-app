export default {
    Mutations: {
        SET_LOGGED_IN: 'SET_LOGGED_IN',
        SET_NOT_ALLOWED: 'SET_NOT_ALLOWED',
    },
    EntryTypes: {
        TEXT: 'text',
        LINK: 'link',
        QUOTE: 'quote'
    },
    Events: {
        ENTRY_SAVED: 'saved',
        ENTRY_DELETED: 'deleted',
        ENTRY_UNPUBLISHED: 'unpublished'
    }
}

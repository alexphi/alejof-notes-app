export default {
    Mutations: {
        SET_AUTH_DATA: 'SET_AUTH_DATA',
        SET_NOT_ALLOWED: 'SET_NOT_ALLOWED',
        SET_HEADER_TYPE: 'SET_HEADER_TYPE',
    },
    EntryTypes: {
        TEXT: 'text',
        LINK: 'link'
    },
    HeaderTypes: {
        NORMAL: 'normal',
        SMALL: 'small'
    },
    Events: {
        ENTRY_SAVED: 'saved',
        ENTRY_DELETED: 'deleted',

        ENTRY_EDIT: 'edit',
        ENTRY_PREVIEW: 'preview',
    }
}

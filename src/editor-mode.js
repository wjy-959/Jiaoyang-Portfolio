// Editing is available only through the local development preview.
// Production builds cannot enable it with a URL or browser storage flag.
export const canEdit=import.meta.env.DEV&&['127.0.0.1','localhost','[::1]'].includes(window.location.hostname);

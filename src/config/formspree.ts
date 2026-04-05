/** Formulário de contato / leads via Formspree (https://formspree.io) */
const trim = (s: string | undefined) => (s ?? "").trim();

export const FORMSPREE_FORM_ID = trim(import.meta.env.VITE_FORMSPREE_FORM_ID) || "mbdppnkr";

export const FORMSPREE_SUBMIT_URL = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

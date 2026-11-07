// Cliente de autenticação para as telas. Território: Igor; usado pelo PH.
//
// await authClient.signUp.email({ name, email, password });
// await authClient.signIn.email({ email, password });
// await authClient.signOut();
//
// Valide os formulários antes com os schemas de @/contracts/sessao.
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

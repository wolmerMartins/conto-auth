import 'svelte'

import App from './App.svelte'
import { configureUseAccounts } from './hooks/use-accounts'
import { checkAccountByEmail } from './services/accounts.service'

configureUseAccounts(checkAccountByEmail)

const app = new App({ target: document.body })

export default app

import 'svelte'

import App from './App.svelte'
import { configureUseAccounts } from './hooks/use-accounts'
import { checkAccountByEmail, configureAccountServices } from './services/accounts.service'
import { httpClient } from './commons/http.client'

configureAccountServices(httpClient('http://localhost:5000'))
configureUseAccounts(checkAccountByEmail)

const app = new App({ target: document.body })

export default app

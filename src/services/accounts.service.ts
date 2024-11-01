import type { GetResult, HttpClient } from '../commons/http.client'

type CheckAccountSuccess = {
  success: true
  exists: boolean
}

type CheckAccountError = {
  success: false
  message: string
}

export type CheckAccountResult = CheckAccountSuccess | CheckAccountError

export type CheckAccountByEmail = (email: string) => Promise<CheckAccountResult>

export function isValidEmail(email?: string): boolean {
  if (!email) return false

  const [address, domain] = email.split('@')
  if (!domain) return false

  const [domainName, domainExtension] = domain.split('.')

  return Boolean(address && domainName && domainExtension)
}

function configureCheckAccountByEmail(httpClient: HttpClient): CheckAccountByEmail {
  function handleCheckAccountByEmailResult(result: GetResult): CheckAccountResult {
    if (!result.success) {
      return {
        success: result.success,
        message: 'It was not possible to check the account. Please try again.'
      }
    }

    return {
      success: result.success,
      exists: result.data.exists
    }
  }

  return async function(email: string): Promise<CheckAccountResult> {
    if (!isValidEmail(email)) {
      return {
        success: false,
        message: 'The email is not valid'
      }
    }

    const result = await httpClient.get(`accounts/${email}/exists`)

    return handleCheckAccountByEmailResult(result)
  }
}

let checkAccountByEmail: CheckAccountByEmail

function configureAccountServices(httpClient: HttpClient): void {
  checkAccountByEmail = configureCheckAccountByEmail(httpClient)
}

export { configureAccountServices, checkAccountByEmail }

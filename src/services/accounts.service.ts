export type CheckAccountResult = {
  success: boolean
  exists?: boolean
  message?: string
}

export type CheckAccountByEmail = (email: string) => Promise<CheckAccountResult>

export function isValidEmail(email: string): boolean {
  const [address, domain] = email.split('@')
  if (!domain) return false

  const [domainName, domainExtension] = domain.split('.')

  return Boolean(address && domainName && domainExtension)
}

export async function checkAccountByEmail(email: string): Promise<CheckAccountResult> {
  try {
    const response = await fetch(`http://localhost:5000/accounts/${email}/exists`)

    const { exists } = await response.json()

    return {
      success: true,
      exists
    }
  } catch {
    return {
      success: false,
      message: 'It was not possible to check the account. Please try again.'
    }
  }
}

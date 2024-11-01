type GetSuccess = {
  success: true
  data: any
}

type GetError = {
  success: false
  error: any
}

export type GetResult = GetSuccess | GetError

export type HttpClient = {
  get: (path: string) => Promise<GetResult>
}

async function get(url: string): Promise<GetResult> {
  try {
    const response = await fetch(url)

    const { data } = await response.json()

    if (!response.ok)
      return { success: false, error: data }

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

export function httpClient(baseUrl: string): HttpClient {
  return {
    get: (path: string) => get(`${baseUrl}/${path}`)
  }
}

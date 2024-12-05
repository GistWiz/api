import { GistQuickSearchItem } from '../../types'

export const parseResponse = async (response: Response) =>{
  const json = (await response.json()) as GistQuickSearchItem[] | { code: string; message: string }

  if (!response.ok || "message" in json) {
    throw new Error("message" in json ? json.message : response.statusText)
  }

  return json.map((gist) => {
    return {
      id: gist.id,
      description: gist.description,
      url: gist.url
    }
  })
}
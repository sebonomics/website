declare namespace MusicKit {
  interface ConfigureOptions {
    developerToken: string
    app: { name: string; build: string }
  }

  interface Artwork {
    url: string
    width: number
    height: number
  }

  interface MediaItemAttributes {
    name: string
    artistName: string
    albumName?: string
    artwork?: Artwork
    url?: string
  }

  interface MediaItem {
    id: string
    type: string
    attributes: MediaItemAttributes
  }

  interface ResourceCollection {
    data: MediaItem[]
  }

  interface APIResponse {
    data: MediaItem[]
  }

  interface MusicKitInstance {
    authorize(): Promise<string>
    isAuthorized: boolean
    musicUserToken: string
    api: {
      music(path: string, options?: { limit?: number }): Promise<APIResponse>
    }
  }

  interface MusicKitStatic {
    configure(options: ConfigureOptions): Promise<MusicKitInstance>
    getInstance(): MusicKitInstance
  }
}

interface Window {
  MusicKit?: MusicKit.MusicKitStatic
}

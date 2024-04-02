class InvalidLinkURL extends Error {
  constructor(platform: string) {
    super(`Invalid ${platform} link.`)
  }
}

export { InvalidLinkURL }

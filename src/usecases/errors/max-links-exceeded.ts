class MaxLinksExceededError extends Error {
  constructor() {
    super('Max links exceeded.')
  }
}

export { MaxLinksExceededError }

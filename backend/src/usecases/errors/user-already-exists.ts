class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists.')
  }
}

export { UserAlreadyExistsError }

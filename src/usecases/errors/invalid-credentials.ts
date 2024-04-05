class InvalidCredentialsError extends Error {
  constructor() {
    super('The email or password is incorrect.')
  }
}

export { InvalidCredentialsError }

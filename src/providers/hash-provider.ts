interface HashProvider {
  encryptPassword: (password: string) => Promise<string>
  comparePassword: (
    password: string,
    hashedPassword: string
  ) => Promise<boolean>
}

export type { HashProvider }

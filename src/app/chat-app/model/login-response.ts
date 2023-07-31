export interface LoginResponse {
  token: string,
  refreshToken: string,
  issuedAt: Date,
  duration: number,
  refreshValidFrom: Date,
  refreshDuration: number
}
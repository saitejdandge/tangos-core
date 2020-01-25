export class Config {

  public static collectionNames = {
    user_sessions: 'user_sessions',
    users: 'users',
  };
  public isOAuthEnabled: boolean;

  private readonly authFreeEndPoints: string[] = [];

  constructor(isOAuthEnabled: boolean, authFreeEndPoints: string[]) {
    this.isOAuthEnabled = isOAuthEnabled;
    if (authFreeEndPoints != null) this.authFreeEndPoints = authFreeEndPoints;
  }

  public getAuthFreeEndPoints(): string[] {
    return this.authFreeEndPoints;
  }
}

export class Config {
  public isOAuthEnabled: boolean;

  private readonly authFreeEndPoints: string[] = [];

  public static collectionNames = {
    user_sessions: 'user_sessions',
    users: 'users'
  };

  public getAuthFreeEndPoints(): string[] {
    return this.authFreeEndPoints;
  }

  constructor(isOAuthEnabled: boolean, authFreeEndPoints: string[]) {
    this.isOAuthEnabled = isOAuthEnabled;
    if (authFreeEndPoints != null) this.authFreeEndPoints = authFreeEndPoints;
  }
}

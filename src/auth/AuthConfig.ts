export class AuthConfig {

  public static collectionNames = {
    user_sessions: 'user_sessions',
    users: 'users',
  };
  public secret: string;
  public isOAuthEnabled: boolean;

  private readonly authFreeEndPoints: string[] = [];

  constructor(secret: string, isOAuthEnabled: boolean, authFreeEndPoints: string[]) {
    this.secret = secret;
    this.isOAuthEnabled = isOAuthEnabled;
    if (authFreeEndPoints != null) this.authFreeEndPoints = authFreeEndPoints;
  }

  public getAuthFreeEndPoints(): string[] {
    return this.authFreeEndPoints;
  }
}

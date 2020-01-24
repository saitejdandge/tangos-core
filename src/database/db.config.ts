export class DbConfig {
  private readonly mongoUser: string;
  private readonly mongoPassword: string;
  private readonly mongoPath: string;
  public mongoUri: string;
  public options: any;

  constructor(
    mongoUser: any,
    mongoPassword: any,
    mongoPath: any,
    options: any
  ) {
    this.mongoUser = mongoUser;
    this.mongoPassword = mongoPassword;
    this.mongoPath = mongoPath;
    this.mongoUri = this.generateUri();
    this.options = options;
  }

  private generateUri(): string {
    return `mongodb://${this.mongoUser}:${this.mongoPassword}${this.mongoPath}`;
  }
}

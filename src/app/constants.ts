export class AppConstants {
  public static env = 'qa-nelumbo'; // dev, qa, qa-nelumbo

  public static get apiBienestar(): string {
    if (this.env == 'dev') return 'http://20.44.111.201:8080';
    if (this.env == 'qa') return 'https://apibienestar-qa.azurewebsites.net';
    if (this.env == 'qa-nelumbo') return 'http://20.44.111.201:8082';
  }
}

export interface Article {
  _id: string;
  headline: { main: string };
  byline?: { original?: string };
  pub_date: string;
  snippet?: string;
  lead_paragraph?: string;
  web_url: string;
}

import { SPHttpClient } from '@microsoft/sp-http';
export interface IRecruitmentDashboardWebPartProps {
  description: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  listName: string;
}

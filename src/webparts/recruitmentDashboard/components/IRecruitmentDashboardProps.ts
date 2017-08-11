import { SPHttpClient } from '@microsoft/sp-http';
export interface IRecruitmentDashboardProps {
  description: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  listName: string;
}

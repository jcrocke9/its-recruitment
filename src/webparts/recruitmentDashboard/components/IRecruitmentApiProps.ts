import { SPHttpClient } from '@microsoft/sp-http';
export interface IRecruitmentApiProps {
    listName: string;
    spHttpClient: SPHttpClient;
    siteUrl: string;
}
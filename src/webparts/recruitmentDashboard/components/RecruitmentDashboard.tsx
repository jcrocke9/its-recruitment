import * as React from 'react';
import styles from './RecruitmentDashboard.module.scss';
import { IRecruitmentDashboardProps } from './IRecruitmentDashboardProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { RecruitmentApi } from './RecruitmentApi';

export default class RecruitmentDashboard extends React.Component<IRecruitmentDashboardProps, void> {
  public render(): React.ReactElement<IRecruitmentDashboardProps> {
    const spHttpClient = this.props.spHttpClient;
    const siteUrl = this.props.siteUrl;
    const listName = this.props.listName;

    return (
      <div className={styles.recruitmentDashboard}>
        <div className={styles.container}>
          <div >
            <RecruitmentApi
              spHttpClient={spHttpClient}
              siteUrl={siteUrl}
              listName={listName}
            />
          </div>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'recruitmentDashboardStrings';
import RecruitmentDashboard from './components/RecruitmentDashboard';
import { IRecruitmentDashboardProps } from './components/IRecruitmentDashboardProps';
import { IRecruitmentDashboardWebPartProps } from './IRecruitmentDashboardWebPartProps';

export default class RecruitmentDashboardWebPart extends BaseClientSideWebPart<IRecruitmentDashboardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRecruitmentDashboardProps > = React.createElement(
      RecruitmentDashboard,
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

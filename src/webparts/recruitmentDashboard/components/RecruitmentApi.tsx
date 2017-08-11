import * as React from 'react';
import styles from './RecruitmentDashboard.module.scss';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IRecruitmentApiProps } from './IRecruitmentApiProps';
import { IRecruitmentApiState } from './IRecruitmentApiState';
import { IListItem } from './IListItem';
export class RecruitmentApi extends React.Component<IRecruitmentApiProps, IRecruitmentApiState> {
    private listItemEntityTypeName: string = undefined;
    constructor(props: IRecruitmentApiProps, state: IRecruitmentApiState) {
        super(props);

        this.state = {
            status: this.listNotConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
            items: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    public componentWillReceiveProps(nextProps: IRecruitmentApiProps): void {
        this.listItemEntityTypeName = undefined;
        this.setState({
            status: this.listNotConfigured(nextProps) ? 'Please configure list in Web Part properties' : 'Ready',
            items: []
        });
    }

    public handleChange(event: any): void {
        this.setState({
            status: '',
            items: []
        })
    }

    public render(): React.ReactElement<IRecruitmentApiProps> {
        const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {
            let stepDesc: string = item.vrStep;
            let step: string = stepDesc.slice(1, 3);
            let lane: number = this.figureOutLaneFromStep(step);
            let bgColor: string = this.figureOutAssignmentFromStep(step);
            return (
                <li className={`${styles.li}`}>
                    <div className="ms-Grid-row">
                        <div className={`ms-bgColor-${bgColor} ms-fontColor-white ms-Grid-col ms-u-lg1 ms-u-lgPush${lane}`}>
                            {item.Title} {lane}
                        </div>
                    </div>
                </li>
            );
        });

        const disabled: string = this.listNotConfigured(this.props) ? styles.disabled : '';


        return (
            <div>
                {this.state.status}
                <div >
                    <a href="#" className={`${styles.button} ${disabled}`} onClick={() => this.readItems()}>
                        <span className={styles.label}>Read all items</span>
                    </a>
                </div>
                <div className={`ms-Grid-row  ${styles.row}`}>
                    <div className="ms-Grid-col ms-u-lg1">1</div>
                    <div className="ms-Grid-col ms-u-lg2">2</div>
                    <div className="ms-Grid-col ms-u-lg3">3</div>
                    <div className="ms-Grid-col ms-u-lg4">4</div>
                    <div className="ms-Grid-col ms-u-lg5">5</div>
                    <div className="ms-Grid-col ms-u-lg6">6</div>
                    <div className="ms-Grid-col ms-u-lg7">7</div>
                    <div className="ms-Grid-col ms-u-lg8">8</div>
                    <div className="ms-Grid-col ms-u-lg9">9</div>
                    <div className="ms-Grid-col ms-u-lg10">10</div>
                    <div className="ms-Grid-col ms-u-lg11">11</div>
                    <div className="ms-Grid-col ms-u-lg12">12</div>
                </div>
                <div >
                    <ul className={`${styles.ul}`}>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
    private readItems(): void {
        this.setState({
            status: 'Loading all items...',
            items: []
        });
        this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=Title,Id,vrStep`,
            SPHttpClient.configurations.v1,
            {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            })
            .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
                return response.json();
            })
            .then((response: { value: IListItem[] }): void => {
                this.setState({
                    status: `Successfully loaded ${response.value.length} items`,
                    items: response.value
                });
            }, (error: any): void => {
                this.setState({
                    status: 'Loading all items failed with error: ' + error,
                    items: []
                });
            });
    }
    private listNotConfigured(props: IRecruitmentApiProps): boolean {
        return props.listName === undefined ||
            props.listName === null ||
            props.listName.length === 0;
    }

    private figureOutLaneFromStep(stepStr: string): number {
        let lane: number;
        let stepNum: number = Number(stepStr);
        if (stepNum <= 2) {
            lane = 1;
        } else if (stepNum === 3) {
            lane = 2;
        } else if (stepNum <= 7) {
            lane = 3;
        } else if (stepNum === 8) {
            lane = 4;
        } else if (stepNum === 9) {
            lane = 4;
        } else if (stepNum <= 11) {
            lane = 5;
        } else if (stepNum === 12) {
            lane = 6;
        } else if (stepNum <= 17) {
            lane = 7;
        } else if (stepNum <= 19) {
            lane = 8;
        } else if (stepNum <= 25) {
            lane = 9;
        } else if (stepNum === 26) {
            lane = 9;
        } else if (stepNum <= 30) {
            lane = 10;
        } else if (stepNum <= 36) {
            lane = 11;
        } else if (stepNum === 37) {
            lane = 12;
        } else {
            lane = 1;
        }
        return lane;
    }
    private figureOutAssignmentFromStep(stepStr: string): string {
        let bgColor: string;
        let stepNum: number = Number(stepStr);
        if (stepNum <= 2) {
            bgColor = "themeDark";
        } else if (stepNum === 3) {
            bgColor = "yellowLight";
        } else if (stepNum <= 7) {
            bgColor = "themeDark";
        } else if (stepNum === 8) {
            bgColor = "themeDark";
        } else if (stepNum === 9) {
            bgColor = "blueMid";
        } else if (stepNum <= 11) {
            bgColor = "green";
        } else if (stepNum === 12) {
            bgColor = "themeDark";
        } else if (stepNum <= 17) {
            bgColor = "themeDark";
        } else if (stepNum <= 19) {
            bgColor = "themeDark";
        } else if (stepNum <= 25) {
            bgColor = "themeDark";
        } else if (stepNum === 26) {
            bgColor = "green";
        } else if (stepNum <= 30) {
            bgColor = "themeDark";
        } else if (stepNum <= 36) {
            bgColor = "themeDark";
        } else if (stepNum === 37) {
            bgColor = "blueMid";
        } else {
            bgColor = "themeDark";
        }
        return bgColor;
    }
}

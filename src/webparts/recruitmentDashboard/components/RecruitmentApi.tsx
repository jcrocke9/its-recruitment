import * as React from 'react';
import styles from './RecruitmentDashboard.module.scss';
import './Modal.Basic.Example.scss';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IRecruitmentApiProps } from './IRecruitmentApiProps';
import { IRecruitmentApiState } from './IRecruitmentApiState';
import { IListItem } from './IListItem';
import { IStep } from './IStep';
import { VrDetailsModal } from './vrDetailsModal';
export class RecruitmentApi extends React.Component<IRecruitmentApiProps, IRecruitmentApiState> {
    private listItemEntityTypeName: string = undefined;

    constructor(props: IRecruitmentApiProps, state: IRecruitmentApiState) {
        super(props);

        this.state = {
            status: this.listNotConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
            items: [],
            vrDetailsVisible: false,
            item: undefined,
            filter: 0
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
        });
    }

    public componentDidMount():void {
        let load: boolean = this.listNotConfigured(this.props);
        if (!load) {
            this.readItems();
        }
    }

    public render(): React.ReactElement<IRecruitmentApiProps> {

        const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {
            let stepDesc: string = item.vrStep;
            let step: string = stepDesc.slice(1, 3);
            let modified: string = item.Modified;
            let lane: number = (this.figureOutLaneFromStep(step)).lane;
            let lanePush: number = lane - 1;
            let lanePushSm: number = lane - 3;
            // let bgColor: string = (this.figureOutLaneFromStep(step)).bgColor;
            let bgColor: string = this.figureOutModified(modified);
            this.figureOutModified(modified);
            return (
                <li className={`${styles.li}`}>
                    <div className="ms-Grid-row">
                        <div
                            className={`${styles.boxShadow} ms-bgColor-${bgColor} ms-fontColor-white ms-Grid-col ms-u-sm4 ms-u-smPush${lanePushSm} ms-u-lg2 ms-u-lgPush${lanePush}`}
                            onClick={this._showDetails.bind(this, item.Id, item)}
                        >
                            {item.vrDashNote}
                        </div>
                    </div>
                    
                </li>
            );
        });

        return (
            <div>
                {this.state.status}
                <VrDetailsModal
                        filter={this.state.filter}
                        item={this.state.item}
                        vrDetailsVisible={this.state.vrDetailsVisible}
                        _closeModal={this._closeModal.bind(this)}
                    />
                <div >
                    <ul className={`${styles.ul}`}>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg2">Decision</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg2">OMB</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg2">Recruit</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg2">Screen/Interview</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg2">Offer</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg2">Onboard</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div >
                    <ul className={`${styles.ul}`}>
                        {items}
                    </ul>
                </div>
                {/*<div className={`${styles.key}`}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-lg3">
                            <p>Color Key</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-bgColor-themeDark ms-fontColor-white ms-Grid-col ms-u-lg3">
                            <p>HR Liaison</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-bgColor-green ms-fontColor-white ms-Grid-col ms-u-lg3">
                            <p>Human Resources</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-bgColor-yellowLight ms-Grid-col ms-u-lg3">
                            <p>OMB</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-bgColor-blueMid ms-fontColor-white ms-Grid-col ms-u-lg3">
                            <p>NeoGov</p>
                        </div>
                    </div>
                </div>*/}
            </div>
        );
    }
    private readItems(): void {
        this.setState({
            status: 'Loading all items...',
            items: []
        });
        this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=Id,Title,vrDashNote,vrFormerlyHeldBy,vrGradeStep,Modified,vrNotes,vrApplications,vrNeoGovHits,vrState,vrStep,vrVacancyNo`,
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
                    status: `${response.value.length} vacancies in the pipeline.`,
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

    private figureOutLaneFromStep(stepStr: string): IStep {
        let lane: number;
        let bgColor: string = "themeDark";
        let stepNum: number = Number(stepStr);
        if (stepNum <= 7) {
            lane = 1;
        } else if (stepNum === 8) { // stepNum === 3
            lane = 3;
            // bgColor = "yellowLight";
        } else if (stepNum <= 11) { // stepNum <= 7
            lane = 5;
        } else if (stepNum <= 23) { // stepNum === 8
            lane = 7;
        } /* else if () { // stepNum === 9
            lane = 4;
            bgColor = "blueMid";
        } */ else if (stepNum <= 28) { // stepNum <= 11
            lane = 9;
        } else if (stepNum >= 29) { // stepNum === 12
            lane = 11;
        } /* else if (stepNum <= 17) {
            lane = 7;
        } else if (stepNum <= 19) {
            lane = 8;
        } else if (stepNum <= 25) {
            lane = 9;
        } else if (stepNum === 26) {
            lane = 9;
            bgColor = "green";
        } else if (stepNum <= 30) {
            lane = 10;
        } else if (stepNum <= 36) {
            lane = 11;
        } else if (stepNum === 37) {
            lane = 12;
            bgColor = "blueMid";
        } */ else {
            lane = 1;
            bgColor = "themeDark";
        }
        let stepOutput: IStep = {
            lane: lane,
            bgColor: bgColor
        };
        return stepOutput;
    }

    private figureOutModified(modified: string): string {
        let date:Date = new Date();
        let threeDaysAgo:Date = new Date(date.setDate(date.getDate() - 3));
        let modifiedDate:Date = new Date(Date.parse(modified));
        if (modifiedDate >= threeDaysAgo) {
            let bgColor: string = "themeDark";
            return bgColor;
        } else {
            let bgColor: string = "themeSecondary";
            return bgColor;
        }
    }

    private _showDetails(filter: number, item: IListItem):void {
        this.setState({
            vrDetailsVisible: true,
            filter: filter,
            item: item
        });
    }

    public _closeModal():void {
        this.setState({ vrDetailsVisible: false });
    }

}

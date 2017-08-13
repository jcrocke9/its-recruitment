import * as React from 'react';
import styles from './RecruitmentDashboard.module.scss';
import './Modal.Basic.Example.scss';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { IRecruitmentApiProps } from './IRecruitmentApiProps';
import { IRecruitmentApiState } from './IRecruitmentApiState';
import { IListItem } from './IListItem';
import { IStep } from './IStep';
export class RecruitmentApi extends React.Component<IRecruitmentApiProps, IRecruitmentApiState> {
    private listItemEntityTypeName: string = undefined;

    constructor(props: IRecruitmentApiProps, state: IRecruitmentApiState) {
        super(props);

        this.state = {
            status: this.listNotConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
            items: [],
            vrDetailsVisible: false
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

    componentDidMount() {
        let load: boolean = this.listNotConfigured(this.props);
        if (!load) {
            this.readItems();
        }
    }

    public render(): React.ReactElement<IRecruitmentApiProps> {

        const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {
            let stepDesc: string = item.vrStep;
            let step: string = stepDesc.slice(1, 3);
            let lane: number = (this.figureOutLaneFromStep(step)).lane;
            let lanePush: number = lane - 1;
            let bgColor: string = (this.figureOutLaneFromStep(step)).bgColor;
            return (
                <li className={`${styles.li}`}>
                    <div className="ms-Grid-row">
                        <div className={`ms-bgColor-${bgColor} ms-fontColor-white ms-Grid-col ms-u-lg1 ms-u-lgPush${lanePush}`} onClick={this._showDetails.bind(this)} >
                            {item.Title}
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.vrDetailsVisible}
                        onDismiss={this._closeModal.bind(this)}
                        isBlocking={false}
                        containerClassName='ms-modalExample-container'
                    >
                        <div className="ms-font-l ms-modalExample-header">
                            <span>{item.Title}</span>
                        </div>
                        <div className='ms-font-m ms-modalExample-body'>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg3">Step</div>
                                <div className="ms-Grid-col ms-u-lg9">{item.vrStep}</div>
                            </div>
                        </div>
                    </Modal>
                </li>
            );
        });

        return (
            <div>
                {this.state.status}
                <div >
                    <ul className={`${styles.ul}`}>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">1</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">2</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">3</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">4</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">5</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">6</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">7</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">8</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">9</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">10</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">11</div>
                            </div>
                        </li>
                        <li className={`${styles.li}`}>
                            <div className={`${styles.fakerow}`}>
                                <div className="ms-Grid-col ms-u-lg1">12</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div >
                    <ul className={`${styles.ul}`}>
                        {items}
                    </ul>
                </div>
                <div className={`${styles.key}`}>
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
        if (stepNum <= 2) {
            lane = 1;
        } else if (stepNum === 3) {
            lane = 2;
            bgColor = "yellowLight";
        } else if (stepNum <= 7) {
            lane = 3;
        } else if (stepNum === 8) {
            lane = 4;
        } else if (stepNum === 9) {
            lane = 4;
            bgColor = "blueMid";
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
            bgColor = "green";
        } else if (stepNum <= 30) {
            lane = 10;
        } else if (stepNum <= 36) {
            lane = 11;
        } else if (stepNum === 37) {
            lane = 12;
            bgColor = "blueMid";
        } else {
            lane = 1;
            bgColor = "themeDark";
        }
        let stepOutput: IStep = {
            lane: lane,
            bgColor: bgColor
        }
        return stepOutput;
    }

    private _showDetails() {
        this.setState({ vrDetailsVisible: true })
    }
    private _closeModal() {
        this.setState({ vrDetailsVisible: false })
    }
}

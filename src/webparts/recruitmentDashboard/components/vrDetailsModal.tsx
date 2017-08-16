import * as React from 'react';
import './Modal.Basic.Example.scss';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { IvrDetailsModalProps } from './IvrDetailsModalProps';
import { IListItem } from './IListItem';

export class VrDetailsModal extends React.Component<IvrDetailsModalProps, void> {
    constructor(props: IvrDetailsModalProps) {
        super(props);
        this._closeModal = this._closeModal.bind(this);
    }

    public render(): React.ReactElement<IvrDetailsModalProps> {
        const modal: IListItem = this.props.item;
        if (typeof modal !== "undefined") {
            const modalId: number = modal.Id;
            const filterId: number = this.props.filter;
            if (modalId === filterId) {
                return (
                    <Modal
                        isOpen={this.props.vrDetailsVisible}
                        onDismiss={this._closeModal.bind(this)}
                        isBlocking={false}
                        containerClassName='ms-modalExample-container'
                    >
                        <div className="ms-font-l ms-modalExample-header">
                            <span>{this.props.item.vrDashNote}</span>
                        </div>
                        <div className='ms-font-m ms-modalExample-body'>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">State</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrState}</div>
                            </div>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">Step</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrStep}</div>
                            </div>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">Vacancy Position Number</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrVacancyNo}</div>
                            </div>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">Formerly Held By</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrFormerlyHeldBy}</div>
                            </div>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">Funding Budgeted for Grade/Step</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrGradeStep}</div>
                            </div>
                            {/* <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">As Of</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrDateAsOf}</div>
                            </div> */}
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">Number of Applications</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrApplications}</div>
                            </div>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">Number of NeoGov Hits</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrNeoGovHits}</div>
                            </div>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-lg2">Notes</div>
                                <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrNotes}</div>
                            </div>
                        </div>
                    </Modal>
                );
            }
        } else {
            return (
                <div></div>
            );
        }
    }
    private _closeModal():void {
        let vrDetailsVisible: boolean = false;
        this.props._closeModal(vrDetailsVisible);
    }
}
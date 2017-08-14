import * as React from 'react';
import './Modal.Basic.Example.scss';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { IvrDetailsModalProps } from './IvrDetailsModalProps';

export class VrDetailsModal extends React.Component<IvrDetailsModalProps, void> {
    constructor(props: IvrDetailsModalProps) {
        super(props);
        this._closeModal = this._closeModal.bind(this);
    }

    public render(): React.ReactElement<IvrDetailsModalProps> {
        const modalId: number = this.props.item.Id;
        const filterId: number = this.props.filter;
        console.log("modalId " + modalId + " filterId " + filterId);
        if (modalId === filterId) {
            return (
                <Modal
                    isOpen={this.props.vrDetailsVisible}
                    onDismiss={this._closeModal.bind(this)}
                    isBlocking={false}
                    containerClassName='ms-modalExample-container'
                >
                    <div className="ms-font-l ms-modalExample-header">
                        <span>{this.props.item.Title}</span>
                    </div>
                    <div className='ms-font-m ms-modalExample-body'>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-lg2">Step</div>
                            <div className="ms-Grid-col ms-u-lg10">{this.props.item.vrStep}</div>
                        </div>
                    </div>
                </Modal>
            );
        }
    }
    private _closeModal() {
        let vrDetailsVisible: boolean = false;
        this.props._closeModal(vrDetailsVisible);
    }
}
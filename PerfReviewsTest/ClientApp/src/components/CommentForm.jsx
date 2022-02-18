import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/** User comment form */
export function CommentForm(props) {
    const [text, setText] = React.useState(props.item?.comment);

    const submit = () => {
        props.onClosing(true, text);
        setText(null);
    };

    const cancel = () => {
        props.onClosing(false);
        setText(null);
    };

    const onTextInput = (e) => setText(e.target.value);

    if (text == null && props.item?.comment != null) {
        setText(props.item.comment);
    }

    return (
        <Modal isOpen={props.item != null} toggle={cancel}>
            <ModalHeader>
                Write comment on {props.item?.targetUser.name}
            </ModalHeader>
            <ModalBody>
                <form className="form">
                    <textarea
                        rows="5"
                        className="form-control w-100"
                        placeholder="Write your comment"
                        value={text || ''}
                        onChange={onTextInput} />
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={submit}>Save</button>
                <button className="btn btn-secondary" onClick={cancel}>Cancel</button>
            </ModalFooter>
        </Modal>
    );
}
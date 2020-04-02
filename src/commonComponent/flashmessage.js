import React from 'react';
import FlashMessage from 'react-flash-message';

export default React.memo((props) => {

    return (
        <FlashMessage duration={5000}  persistOnHover={true}>
            <div  className = {"p-3 mb-2 text-white " + props.type}  >
                    <strong className = "flashColor">{props.flashMsg}</strong>
            </div>
        </FlashMessage>
    )
})
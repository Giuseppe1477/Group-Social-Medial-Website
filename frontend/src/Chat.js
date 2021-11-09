
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Services from "./Services";


const Chat = (props) => {

    const { user_recipient_id } = useParams();
    const [ dms, setDMs ] = useState([]);
    const [ currentText, setCurrentText ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        Services.list_dms({
            'user_id': props.user_id,
            'user_recipient_id': user_recipient_id
        })
            .then(r => {
                console.log(r);
                return r;
            })

            .then(res => setDMs(res.dms))
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }, [])

    const onTextChange = e => setCurrentText(e.target.value);


    return ( 
        <div>
            CHAT
            { isLoading ?
                <div>
                    Loading ...
                </div>
            :
                <div>
                    {dms.map((dm, i) =>
                        <div key={i}>
                            {dm.user_id}
                            {dm.text}
                        </div>
                    )}
                </div>
            }
            <textarea
                value={currentText}
                onChange={onTextChange}
            />
            
        </div>
     );
}
 
export default Chat;
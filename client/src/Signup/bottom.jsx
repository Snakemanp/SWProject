import { FaPhone } from 'react-icons/fa';
import './bottom.css'
function Bottom(){
    return(
        <div className='bottom'>
            <h2 id="bottom-head">Contact us</h2>
            <li className="bottom-li">
                <FaPhone className='bottom-icon' />
                <h2>+91-9346801728</h2>
            </li>
            <li className="bottom-li">
                <FaPhone className='bottom-icon' />
                <h2>+91-9346801728</h2>
            </li>
            <li className="bottom-li">
                <FaPhone className='bottom-icon' />
                <h2>+91-9346801728</h2>
            </li>
        </div>
    )
}
export default Bottom;
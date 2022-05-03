import React,{useState} from 'react'
import './Shipping.css';
import { useSelector,useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../Layout/MetaData';
import {useAlert} from 'react-alert';
import {Country,State} from 'country-state-city';
import CheckOutSteps from './CheckOutSteps'
import {useNavigate} from 'react-router-dom'




const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert()
    const navigate = useNavigate()

    const {shippingInfo} = useSelector((state)=> state.cart)

    const [address, setAddress] = useState(shippingInfo.address);
    const [state, setState] = useState(shippingInfo.state);
    const [city, setCity] = useState(shippingInfo.city);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)


    const shippingSubmit = (e)=>{
        e.preventDefault();

        if(phoneNo.length < 10 || phoneNo.length > 10){
            alert.error("Phone Number should be 10 Digit.");
            return;
        }
        dispatch(saveShippingInfo({address,state,city,country,pinCode,phoneNo}))
        navigate('/order/confirm')
    }


  return (
    <>
    <MetaData title="Shipping Details"/>

    <CheckOutSteps activeStep={0}/>

        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className='shippingHeading'>Shipping Detail</h2>

                <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>

                    <div>
                    <i className="fa-solid fa-house i-login"></i>
                    <input type="text"  placeholder='Address' required value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    </div>

                    <div>
                    <i className="fa-solid fa-city i-login"></i>
                    <input type="text"  placeholder='City' required value={city} onChange={(e)=>setCity(e.target.value)}/>
                    </div>

                    <div>
                    <i className="fa-solid fa-location-dot i-login"></i>
                    <input type="text"  placeholder='Pin Code' required value={pinCode} onChange={(e)=>setPinCode(e.target.value)}/>
                    </div>

                    <div>
                    <i className="fa-solid fa-phone i-login"></i>
                    <input type="Number"  placeholder='Phone Number' required value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/>
                    </div>

                    <div>
                        <i className="fa-solid fa-earth-americas i-login"></i>
                        <select required value={country} onChange={(e)=> setCountry(e.target.value)}>
                            <option value="">Country</option>
                            {Country && Country.getAllCountries().map((item)=>{
                                return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            })}
                        </select>
                    </div>

                    {country && (
                        <div>
                            <i className="fa-solid fa-location-crosshairs i-login"></i>
                            <select required value={state} onChange={(e)=> setState(e.target.value)}>
                                <option value="">State</option>
                                {State && 
                                State.getStatesOfCountry(country).map((item)=>{
                                    return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                })}
                            </select>
                        </div>
                    )}

                    <input type="submit" value="Continue" className='shippingBtn' disabled={state? false: true}/>

                </form>
            </div>
        </div>
    </>
  )
}

export default Shipping
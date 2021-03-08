import React, {useState} from 'react'
import RegisterForm from '../../components/HeroComponents/RegisterForm/RegisterForm'

export default function RegisterPage() {

    const [RegisterInfo, setRegisterInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function onChange(e) {
        const {value, name} = e.target;

        setRegisterInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function onSubmit(e) {
        // prevent the default submit action
        e.preventDefault();
        console.log(RegisterInfo);
    }

    return (
        <div>
            <RegisterForm NewUser={RegisterInfo} onChange={onChange} onSubmit={onSubmit} />
        </div>
    )
}

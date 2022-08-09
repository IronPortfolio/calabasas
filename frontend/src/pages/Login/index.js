import React, {useState} from "react";  
import {Link} from "react-router-dom"; 
import { toast } from "react-toastify"; 

import logo from "../../logo.svg"; 

import api from "../../services/api"; 
import { login } from "../../services/auth"; 

import { Container, FormContainer, Form, Footer } from "../Register/styles"; 
import ErrorMessage from "../../components/ErrorMessage";

export default function Login({history}){
    const initialState = {
        username: "", 
        password: "", 
    }; 

    const [user, setUser] = useState(initialState); 
    const [errors, setErrors] = useState([]); 

    const handleInputs = e =>{
        setUser({
            ...user, 
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e =>{
        e.preventDefault(); 
        const {username, password} = user 

        if(! username.trim() || !password.trim()){
            toast.error(`S'il vous plait veuillez completer tous les champs!`); 
            return;
        }

        try{
            const res = await api.post("/auth", {username, password}); 
            if(res.status === 200){
                const {token} = res.data;
                login(token); 
                history.push("/");
            }
        } catch(err){
            const arrayErrors = err.response.data.errors; 
            setErrors(arrayErrors); 

            err.response.data.message && toast.error(` ${err.response.data.message}`);
        }
    };

    return (
        <Container>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <img src={logo} alt="logo" width="230"/>
                    <span>Veuillez vous connecter pour acceder aux photos et albums de vos amis!</span> 
                    <hr/>
                    <input 
                        type="text" 
                        name="username" 
                        value={user.username} 
                        onChange={handleInputs}
                        placeholder="Nom d'utilisateur"/>
                    {errors && errors.map(
                        (error, index) => 
                            error.param === "password" && (
                                <ErrorMessage key={index} error={error.msg}/>
                            )
                    )}
                    <input  
                        type="password" 
                        name="password" 
                        value={user.password} 
                        onChange={handleInputs} 
                        placeholdre="mot de passe"
                    />
                    {errors && 
                        errors.map(
                            (error, index) => 
                                error.param === "password" && (
                                    <ErrorMessage key={index} error={error.msb}/>
                                )
                        )}
                    <input className="button" type="submit" value="Entrer"/>
                    <hr/>

                    <span className="footer">
                        Profitez de tout ce que vos amis ont à offrir
                    </span>
                </Form>
                <Footer>
                    <p>
                       Vous n'etes pas connecté? <Link to="/register">Connexion</Link>
                    </p>
                </Footer>
            </FormContainer>
        </Container>
    );
}
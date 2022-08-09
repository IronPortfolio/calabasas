import React, { useState } from "react"; 
import { Link } from "react-router-dom"; 
import { toast } from "react-toastify"; 

import logo from "../../logo.svg"; 

import api from "../../services/api"; 
import { login } from "../../services/auth"; 

import { Container, Gif, FormContainer, Form, Footer } from "./styles"; 

import ErrorMessage from "../../components/ErrorMessage"; 

export default function Register({ history }){
    const initialState = {
        name: "", 
        email: "", 
        username: "",  
        password: ""
    }

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
        const {name , email, username, password } = user; 

        try{
            const res = await api.post("/users", {name, email, username, password}); 
            if(res.status === 200){
                const {token } = res.data;  
                login(token);
                history.push("/");
            }
        } catch(err){
            const arrayErrors = err.response.data.errors; 
            setErrors(arrayErrors); 

            err.response.data.message && 
            toast.error(`:-( ${err.response.data.message}`)
        }
    }; 

    return (
        <Container>
            <Gif src="./img/mobilegif.gif" alt="gif" height="620"/>

            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <img src={logo} alt="logo" width="230"/>
                    <span>Enregistrez vous pour voir les photos de vos amis!</span>
                    <hr/>
                    <input 
                        type="text" 
                        name="name" 
                        value={user.name} 
                        onChange={handleInputs} 
                        placeholder="Votre nom complet"/>

                    {errors && 
                    errors.map(
                        (error, index) => 
                            error.param === "name" && (
                                <ErrorMessage key={index} error={error.msg}/>
                            )
                    )}
                    <input 
                        type="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleInputs} 
                        placeholder="Votre Addresse Email"/>

                    {errors && errors.map(
                        (error, index) => 
                            error.param === "email" && (
                                <ErrorMessage key={index} error={error.msg}/>
                            )
                    )}

                    <input 
                        type="text" 
                        name="username" 
                        value={user.username} 
                        onChange={handleInputs}
                        placeholder="Votre nom d'utilisateur"/>
                    {errors && errors.map(
                        (error, index) => 
                            error.param === "username" && (
                                <ErrorMessage key={index} error={error.msg}/>
                            )
                    )}

                    <input 
                        type="password" 
                        name="password" 
                        value={user.password} 
                        onChange={handleInputs} 
                        placeholder="Votre mot de passe"/>
                    {errors && errors.map(
                        (error, index) => 
                            error.param === "password" && (
                                <ErrorMessage key={index} error={error.msg}/>
                            )
                    )}

                    <input className="button" type="submit" value="Enregistrer"/>
                    <hr/>

                    <span className="footer">
                        En vous enregistrant vous acceptez nos termes, conditions et notre politique 
                        de confidentialité
                    </span>
                </Form>
                <Footer>
                    <p>
                        Vous avez déjà un compte? <Link to="/login">Entrer</Link>
                    </p>
                </Footer>
            </FormContainer>
        </Container>
    );
}
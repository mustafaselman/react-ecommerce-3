//// kayıtlı olmayan kulllanıcılar için kayıt sayfası
import React, { useState } from 'react'
import styles from "./auth.module.scss"
import registerImg from "../../assets/register.png"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"

const Register = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [cPassword,setCPassword] = useState("")

  const registerUser = (e) => {
    e.preventDefault();
    // console.log(email,password,cPassword)
    if (password !== cPassword) {
      toast.error("Password do not match")
    }
  }
  return (
    <section className={`container ${styles.auth}`}>
      <Card cardClass={styles.form}>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <input type="text" placeholder='Email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <input type="password" placeholder='Confirm Password' required value={cPassword} onChange={(e)=> setCPassword(e.target.value)}/>
          <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
        </form>
        <span className={styles.register}>
          <p>Already an account ?</p>&nbsp;
          <Link to="/login">Login</Link>
        </span>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt='registerImage' width="400"/>
      </div>
    </section>
  )
}

export default Register
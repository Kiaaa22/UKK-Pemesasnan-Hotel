import React from "react";
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            isModalOpen: false,
            logged: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            email: this.state.email_user,
            password: this.state.password_user
        }
        let url = "http://localhost:8000/user/login"
        axios
        .post(url, data)
            .then((response) => {
                this.setState({ logged: response.data.data.logged })
                if (response.status === 200) {
                    let id_user = response.data.data.id_user
                    let token = response.data.data.token
                    let role = response.data.data.role
                    let email = response.data.data.email
                    let nama_user = response.data.data.nama_user
                    localStorage.setItem("id_user", id_user)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    localStorage.setItem("email", email)
                    localStorage.setItem("nama_user", nama_user)
                    alert("Success Login")
                    window.location.href = "/dashboard"
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500 || error.response.status === 404) {
                    window.alert("Hayo gabisa login");
                }
            })
    }

    render() {
        return (
            <div className="dashboard1">
                <div class="flex">
                    <div class="w-1/2 bg-gray-200 text-left">
                        <form class="bg-gray-100 shadow-md rounded px-8 pt-6 p-8 m-24 mt-30" onSubmit={(e) => this.handleLogin(e)}>
                            <p class="text-gray-700 text-2xl font-bold mb-8 text-center">Login Dashboard REDflag</p>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input type="text" id="email" name="email_user" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" value={this.state.email_user} onChange={this.handleChange} required />
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input type="password" id="password" name="password_user" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" value={this.state.password_user} onChange={this.handleChange} required />
                            </div>
                            <div class="flex items-center justify-between">
                                <button type="submit" name="login" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="w-1/2 bg-gray-500 text-center">
                        <img src="/assets/loginnn.jpeg" className="w-screen h-screen" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

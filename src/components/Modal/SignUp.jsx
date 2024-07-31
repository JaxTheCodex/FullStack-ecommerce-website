import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation pattern
        if (!emailRegex.test(email)) {
            errors.email = "Invalid email format";
        }

        if (password.length < 8) { // Basic password length check
            errors.password = "Password must be at least 8 characters long";
        }

        if (password !== confirmpassword) {
            errors.confirmpassword = "Passwords do not match";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/signup', {
                name,
                email,
                password,
                confirmpassword,
            });

            console.log(response);
            navigate('/login'); // Navigate to the login page after successful sign-up
        } catch (err) {
            console.error(err);
            setErrors({ submit: "An error occurred during sign-up" });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 signup">
            <div className="background p-3 rounded w-25">
                <center><h2>SignUp Here</h2></center>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmpassword"><strong>Confirm Password</strong></label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            name="confirmpassword"
                            className="form-control rounded-0"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmpassword}
                        />
                        {errors.confirmpassword && <div className="text-danger">{errors.confirmpassword}</div>}
                    </div>

                    <button type="submit" className="btn btn-default bg-success w-100 rounded-0"> 
                        Sign Up  
                    </button>

                    {errors.submit && <div className="text-danger text-center mt-3">{errors.submit}</div>}

                    <p>Already have an account?</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

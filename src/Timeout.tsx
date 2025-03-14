/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { getSkipifyClient } from "./util"
import "./Checkout.css"; // Import the CSS file for styling

const Timeout = () => {
    const ref = useRef(null)
    const skipifyButton = useRef<any>(null);
    const timeoutOrder = 1000 * 10 // 10 seconds
    const timeoutId = useRef<any>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedFormData = {
                ...prevState,
                [name]: value
            };

            if (updatedFormData.phoneNumber && updatedFormData.email) {
                skipifyButton.current.setOptions({ email: updatedFormData.email, phone: updatedFormData.phoneNumber })
            }

            return updatedFormData;
        });
    };

    useEffect(() => {
        const scriptUrl = import.meta.env.VITE_SCRIPT_URL as string;

        // Check if the script is already added
        if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
            console.log('Initializing Skipify');
            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.onload = initializeSkipify; // Ensure it loads before running
            document.body.appendChild(script);
        } else if ((window as any).skipify) {
            initializeSkipify(); // If already loaded, initialize immediately
        }

        function initializeSkipify() {
            if (!(window as any).skipify || skipifyButton.current || !ref.current) return;


            const skipifySdk = getSkipifyClient();

            const options = {
                onClose: (myRef: string, success: boolean) => {
                    console.log("On close");
                    if (timeoutId.current) {
                        clearTimeout(timeoutId.current);
                    }
                },
                onApprove: (myRef: string, data: any) => {
                    console.log("On approve");
                },
                onClick: (myRef: string) => {
                    timeoutId.current = setTimeout(() => {  // Set a timeout to close the checkout
                        window.location.href = "/skipify-react-snippets/";  // Redirect to home
                    }, timeoutOrder);
                },
            };

            skipifyButton.current = skipifySdk.button("my-ref", options);
            skipifyButton.current.render(ref.current);
        }
    }, []);

    return (
        <div className="checkout-container">
            <h2>10s timeout</h2>
            <form className="checkout-form">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-input"
                />
            </form>
            <div id="skipify-button" ref={ref}></div>
        </div>
    );
};

export default Timeout;
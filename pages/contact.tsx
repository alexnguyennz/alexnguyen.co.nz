import Layout from '@components/layout';

// React Hook Form
import React from 'react';
import { useForm } from 'react-hook-form';



/*type KeyOfType = {
    'form-name'?: string;
    name: string;
    email: string;
    message: string;
}

const color: { [key: string]: any } = {
    'form-name': null,
    name: null,
    email: null,
    message: null
}; */

interface Data {
    'form-name'?: string;
    name: string;
    email: string;
    message: string;
    'data.key': Options;
}



interface Options {
    key: string;
    name: string;
    email: string;
    message: string;
}

function encode(data: any) {

    return  Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
}

export default function Contact():JSX.Element {

    const pageTitle = "Contact";

    const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm();
    const [isSubmitted, setIsSubmitted] = React.useState(false);


    
    const onSubmit = async (data: Data) => { // form is only 'submitted' when there are no validation errors

        //console.log(encode({ 'form-name': 'contact', ...data }));

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': 'contact', ...data })
        }).then(() => {
            setIsSubmitted(true); // display success message
            reset(); // clear form
        }).catch(error => console.log(error));
        
    };

    const onError = () => setIsSubmitted(false); // clear success message if another form submission is made and invalidates 

    return (
        <Layout title={pageTitle}>
            <form className="w-full max-w-3xl mx-auto" name="contact" method="post" onSubmit={handleSubmit(onSubmit, onError)} noValidate data-netlify="true">
                <input type="hidden" name="form-name" value="contact" /> {/* Netlify Form hook */}

                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 md:pr-2 mb-6 md:mb-0">
                        <label className="block uppercase text-xs font-semibold mb-2" htmlFor="name">Name</label>
                        <input className="block w-full text-gray-700 border border-gray-200 rounded p-3 focus:outline-none focus:border-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500" type="text" placeholder="Your Name" id="name" {...register("name", { required: true, pattern: /^[A-Za-z" "]+$/i })} disabled={isSubmitting} required pattern='[A-Za-z" "]+' />
                        {errors.name && errors.name.type === "required" && <span className="text-xs text-pink-500">Required.</span>}
                        {errors.name && errors.name.type === "pattern" && <span className="text-xs text-pink-500">No special characters or numbers allowed.</span>}
                    </div>

                    <div className="w-full md:w-1/2 md:pl-2">
                        <label className="block uppercase text-xs font-semibold mb-2" htmlFor="email">Email</label>
                        <input className="block w-full text-gray-700 border border-gray-200 rounded p-3 focus:outline-none focus:border-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500" type="email" placeholder="Your Email" id="email" {...register("email", { required: true, pattern: /^[A-Za-z0-9.]+@[A-Za-z0-9]+\.[A-Za-z0-9.]+$/i })} disabled={isSubmitting} required pattern='[A-Za-z0-9.]+@[A-Za-z0-9]+\.[A-Za-z0-9.]+' />
                        {errors.email && errors.email.type === "required" && <span className="text-xs text-pink-500">Required.</span>}
                        {errors.email && errors.email.type === "pattern" && <span className="text-xs text-pink-500">A valid email address is required e.g. art@vandelay.com.</span>}
                    </div>
                </div>

                <div className="flex flex-wrap mb-6">
                    <div className="w-full">
                        <label className="block uppercase text-xs font-semibold mb-2" htmlFor="message">Message</label>
                        <textarea className="block w-full text-gray-700 border border-gray-200 rounded p-3 focus:outline-none focus:border-gray-500 h-40 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500" placeholder="Your Message" id="message" {...register("message", { required: true })} disabled={isSubmitting} required />
                        {errors.message && errors.message.type === "required" && <span className="text-xs text-pink-500">Required.</span>}
                    </div>
                </div>

                <div className="flex flex-wrap">
                    <div className="w-full">
                        <input type="submit" className="w-full text-white font-semibold bg-gray-600 hover:bg-gray-700 p-2 rounded transition cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-700" />
                        {isSubmitted && <p className="text-base text-green-500 mt-3 text-center">Message sent! I&apos;ll get back to you as soon as possible.</p>} 
                    </div>
                </div>
            </form>

        </Layout>
    )
}
